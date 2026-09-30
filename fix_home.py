import sys

with open('axisvtu_flutter/lib/screens/home_screen.dart', 'r') as f:
    content = f.read()

# I need to remove this block:
'''
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
'''

import re
# Use regex to remove the block
pattern = re.compile(r'                  if \(accounts\.length > 1\) \.\.\.\[.*?const SizedBox\(height: 12\),\n                  \],', re.DOTALL)
new_content = pattern.sub('', content)

with open('axisvtu_flutter/lib/screens/home_screen.dart', 'w') as f:
    f.write(new_content)
print("Removed horizontal scroll from home_screen")
