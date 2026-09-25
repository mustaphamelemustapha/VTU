import re

def update_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Add is9PSB
    if 'final is9PSB = ' not in content:
        content = content.replace(
            "final isPalmpay = bank.toLowerCase().contains('palmpay');",
            "final isPalmpay = bank.toLowerCase().contains('palmpay');\n                              final is9PSB = bank.toLowerCase().contains('9psb');"
        )
        content = content.replace(
            "final isPalmpay = bankName.toLowerCase().contains('palmpay');",
            "final isPalmpay = bankName.toLowerCase().contains('palmpay');\n    final is9PSB = bankName.toLowerCase().contains('9psb');"
        )
    
    # 2. Add isBranded logic in wallet_screen
    if 'isPalmpay || is9PSB' not in content:
        content = content.replace(
            "isPaystack || isPalmpay;",
            "isPaystack || isPalmpay || is9PSB;"
        )

    # 3. Add to cardGradient
    if 'is9PSB\n' not in content and 'is9PSB ?' not in content:
        gradient_replacement = """isPalmpay
                                                  ? const LinearGradient(
                                                      colors: [Color(0xFF0A0F30), Color(0xFF1F124A), Color(0xFF361875)],
                                                      begin: Alignment.topLeft,
                                                      end: Alignment.bottomRight,
                                                    )
                                                  : is9PSB
                                                      ? const LinearGradient(
                                                          colors: [Color(0xFF002244), Color(0xFF004488), Color(0xFF0066CC)],
                                                          begin: Alignment.topLeft,
                                                          end: Alignment.bottomRight,
                                                        )
                                                      : LinearGradient("""
        content = content.replace("""isPalmpay
                                                  ? const LinearGradient(
                                                      colors: [Color(0xFF0A0F30), Color(0xFF1F124A), Color(0xFF361875)],
                                                      begin: Alignment.topLeft,
                                                      end: Alignment.bottomRight,
                                                    )
                                                  : LinearGradient(""", gradient_replacement)
                                                  
        gradient_replacement_wallet = """isPalmpay
        ? const LinearGradient(
            colors: [Color(0xFF0A0F30), Color(0xFF1F124A), Color(0xFF361875)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          )
        : is9PSB
            ? const LinearGradient(
                colors: [Color(0xFF002244), Color(0xFF004488), Color(0xFF0066CC)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : LinearGradient("""
        content = content.replace("""isPalmpay
        ? const LinearGradient(
            colors: [Color(0xFF0A0F30), Color(0xFF1F124A), Color(0xFF361875)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          )
        : LinearGradient(""", gradient_replacement_wallet)

    # 4. Add to cardBorderColor
    content = content.replace("""isPalmpay
                                                  ? Colors.deepPurple.withValues(alpha: 0.3)
                                                  : Colors.white.withValues(alpha: 0.05);""",
                              """isPalmpay
                                                  ? Colors.deepPurple.withValues(alpha: 0.3)
                                                  : is9PSB
                                                      ? Colors.blueAccent.withValues(alpha: 0.3)
                                                      : Colors.white.withValues(alpha: 0.05);""")

    content = content.replace("""isPalmpay
        ? Colors.deepPurple.withValues(alpha: 0.3)
        : Colors.white.withValues(alpha: 0.05);""",
                              """isPalmpay
        ? Colors.deepPurple.withValues(alpha: 0.3)
        : is9PSB
            ? Colors.blueAccent.withValues(alpha: 0.3)
            : Colors.white.withValues(alpha: 0.05);""")
                                                      
    # 5. Add to badgeBg
    content = content.replace("""isPalmpay
                                                  ? Colors.purple.withValues(alpha: 0.15)
                                                  : Colors.white.withValues(alpha: 0.08);""",
                              """isPalmpay
                                                  ? Colors.purple.withValues(alpha: 0.15)
                                                  : is9PSB
                                                      ? Colors.blue.withValues(alpha: 0.15)
                                                      : Colors.white.withValues(alpha: 0.08);""")

    content = content.replace("""isPalmpay
        ? Colors.purple.withValues(alpha: 0.15)
        : Colors.white.withValues(alpha: 0.08);""",
                              """isPalmpay
        ? Colors.purple.withValues(alpha: 0.15)
        : is9PSB
            ? Colors.blue.withValues(alpha: 0.15)
            : Colors.white.withValues(alpha: 0.08);""")
                                                      
    # 6. Add to badgeText
    content = content.replace("""isPalmpay
                                                  ? Colors.purple.shade300
                                                  : Colors.white.withValues(alpha: 0.5);""",
                              """isPalmpay
                                                  ? Colors.purple.shade300
                                                  : is9PSB
                                                      ? Colors.blue.shade300
                                                      : Colors.white.withValues(alpha: 0.5);""")
                                                      
    content = content.replace("""isPalmpay
        ? Colors.purple.shade300
        : Colors.white.withValues(alpha: 0.5);""",
                              """isPalmpay
        ? Colors.purple.shade300
        : is9PSB
            ? Colors.blue.shade300
            : Colors.white.withValues(alpha: 0.5);""")

    # 7. Add to routeName
    content = content.replace("""isPalmpay
                                                  ? 'PALMPAY SECURE ROUTE'
                                                  : 'AUTOMATED PAYMENTS';""",
                              """isPalmpay
                                                  ? 'PALMPAY SECURE ROUTE'
                                                  : is9PSB
                                                      ? '9PSB AUTOMATED ROUTE'
                                                      : 'AUTOMATED PAYMENTS';""")
                                                      
    content = content.replace("""isPalmpay
        ? 'PALMPAY SECURE ROUTE'
        : 'AUTOMATED PAYMENTS';""",
                              """isPalmpay
        ? 'PALMPAY SECURE ROUTE'
        : is9PSB
            ? '9PSB AUTOMATED ROUTE'
            : 'AUTOMATED PAYMENTS';""")

    # 8. Add to active tab text color in home_screen
    content = content.replace(""": (isPalmpay
                                                                    ? Colors.purple.shade300
                                                                    : Colors.blue.withAlpha(230))))),""",
                              """: (isPalmpay
                                                                    ? Colors.purple.shade300
                                                                    : (is9PSB
                                                                        ? Colors.blue.shade300
                                                                        : Colors.blue.withAlpha(230)))))),""")

    with open(file_path, 'w') as f:
        f.write(content)

update_file('axisvtu_flutter/lib/screens/home_screen.dart')
update_file('axisvtu_flutter/lib/screens/wallet_screen.dart')
print("Done")
