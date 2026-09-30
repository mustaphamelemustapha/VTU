import sys

with open('axisvtu_flutter/lib/screens/home_screen.dart', 'r') as f:
    lines = f.readlines()

build_idx = -1
for i, line in enumerate(lines):
    if "Widget build(BuildContext context) {" in line:
        build_idx = i
        break

method_str = """
  Widget _buildUnifiedWalletCard(BuildContext context, double balance, bool isDark, Color heroText, Color heroSoftText) {
    String latestTxBadge = '';
    Color latestTxColor = Colors.transparent;
    
    if (_cachedTransactionsData != null && _cachedTransactionsData!.isNotEmpty) {
      final tx = _cachedTransactionsData!.first;
      final isCredit = _txIsCredit(tx);
      final amountStr = _txAmountLabel(tx);
      latestTxBadge = amountStr;
      latestTxColor = isCredit ? Colors.green : Colors.red;
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(isDark ? 0.3 : 0.05),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Colors.blue,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Account Balance',
                    style: TextStyle(
                      color: heroSoftText,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.blue.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.money, size: 12, color: Colors.blue.shade400),
                        const SizedBox(width: 4),
                        Text(
                          'NGN',
                          style: TextStyle(
                            color: Colors.blue.shade400,
                            fontSize: 10,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  GestureDetector(
                    onTap: _toggleBalanceVisibility,
                    child: Icon(
                      _hideBalance ? Icons.visibility_off_rounded : Icons.visibility_rounded,
                      size: 20,
                      color: heroSoftText,
                    ),
                  ),
                ],
              )
            ],
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                '₦',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: heroText,
                ),
              ),
              const SizedBox(width: 2),
              Expanded(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Flexible(
                      child: FittedBox(
                        fit: BoxFit.scaleDown,
                        alignment: Alignment.centerLeft,
                        child: Text(
                          _hideBalance ? '••••' : NumberFormat('#,##0.00').format(balance),
                          style: TextStyle(
                            fontSize: 42,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -1.5,
                            color: heroText,
                            height: 1.0,
                          ),
                        ),
                      ),
                    ),
                    if (!_hideBalance && latestTxBadge.isNotEmpty) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: latestTxColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Text(
                          latestTxBadge,
                          style: TextStyle(
                            color: latestTxColor,
                            fontSize: 12,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                    ]
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          // Accounts Section
          FutureBuilder<Map<String, dynamic>>(
            future: _accountsFuture,
            initialData: _cachedAccountsData,
            builder: (context, snapshot) {
              final data = snapshot.data;
              final rawAccounts = (data?['accounts'] as List?) ?? [];
              
              if (rawAccounts.isEmpty) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SizedBox(
                    height: 56,
                    child: Center(child: CircularProgressIndicator(strokeWidth: 2)),
                  );
                }
                return GestureDetector(
                  onTap: _showAccountActivationDialog,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.info_outline, size: 20, color: Colors.blue),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            'No automated account. Tap to setup.',
                            style: TextStyle(color: heroSoftText, fontSize: 13),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }
              
              final accounts = List<Map<String, dynamic>>.from(
                rawAccounts.map((item) => Map<String, dynamic>.from(item as Map))
              );
              accounts.sort((a, b) {
                final aName = (a['bank_name'] ?? '').toString().toLowerCase();
                final bName = (b['bank_name'] ?? '').toString().toLowerCase();
                if (aName.contains('moniepoint') && !bName.contains('moniepoint')) return -1;
                if (!aName.contains('moniepoint') && bName.contains('moniepoint')) return 1;
                return 0;
              });

              final activeIndex = _activeAccountIndex.clamp(0, accounts.length - 1);
              final activeAccount = accounts[activeIndex];
              final rawBank = (activeAccount['bank_name'] ?? 'Bank').toString().trim();
              final bank = rawBank.toLowerCase().contains('titan') || rawBank.toLowerCase().contains('paystack')
                  ? 'Paystack-Titan'
                  : rawBank.toLowerCase().contains('moniepoint')
                      ? 'Moniepoint MFB'
                      : rawBank;
              final number = activeAccount['account_number'] ?? '';

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (accounts.length > 1) ...[
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: List.generate(accounts.length, (idx) {
                          final acc = accounts[idx];
                          final isSel = activeIndex == idx;
                          return GestureDetector(
                            onTap: () => setState(() => _activeAccountIndex = idx),
                            child: Container(
                              margin: const EdgeInsets.only(right: 8),
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: isSel ? Colors.blue.withOpacity(0.1) : Colors.transparent,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Text(
                                (acc['bank_name'] ?? '').toString(),
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                                  color: isSel ? Colors.blue : heroSoftText,
                                ),
                              ),
                            ),
                          );
                        }),
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      children: [
                        Text(
                          bank,
                          style: TextStyle(
                            color: heroSoftText,
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          number.toString(),
                          style: TextStyle(
                            color: heroText,
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 1.0,
                          ),
                        ),
                        const SizedBox(width: 12),
                        GestureDetector(
                          onTap: () => _copyAccountNumber(number.toString()),
                          child: Icon(Icons.copy_rounded, size: 18, color: heroSoftText),
                        ),
                      ],
                    ),
                  ),
                ],
              );
            },
          ),
          const SizedBox(height: 32),
          // Action Buttons
          Row(
            children: [
              Expanded(
                flex: 3,
                child: FilledButton.icon(
                  onPressed: () => FundWalletSheet.show(context),
                  icon: const Icon(Icons.add_rounded, size: 20),
                  label: const Text('+ Balance'),
                  style: FilledButton.styleFrom(
                    backgroundColor: Colors.blue.shade600,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    elevation: 0,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                flex: 3,
                child: ElevatedButton.icon(
                  onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const TransferScreen())),
                  icon: const Icon(Icons.send_rounded, size: 20),
                  label: const Text('Transfer'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isDark ? const Color(0xFF0F172A) : Colors.white,
                    foregroundColor: isDark ? Colors.white : Colors.blue.shade700,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    elevation: isDark ? 0 : 2,
                    shadowColor: Colors.black.withOpacity(0.05),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isDark ? const Color(0xFF0F172A) : Colors.white,
                    foregroundColor: heroText,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    elevation: isDark ? 0 : 2,
                    shadowColor: Colors.black.withOpacity(0.05),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.sync_alt_rounded, size: 20, color: Colors.green.shade500),
                      const SizedBox(width: 4),
                      const Text('Pay', style: TextStyle(fontWeight: FontWeight.w700)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
"""

lines.insert(build_idx, method_str)

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "// THE MASTERPIECE: Floating Balance Section" in line:
        start_idx = i
    if "            const SizedBox(height: 32);" in line and start_idx != -1 and i > start_idx:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    lines[start_idx:end_idx] = [
        "            _buildUnifiedWalletCard(context, balance, isDark, heroText, heroSoftText),\n"
    ]

with open('axisvtu_flutter/lib/screens/home_screen.dart', 'w') as f:
    f.writelines(lines)
print("Replaced floating balance section successfully.")
