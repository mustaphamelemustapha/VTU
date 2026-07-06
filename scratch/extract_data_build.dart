
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final compact = size.width < 360 || size.height < 760;
    final selected = _selectedPlan;
    final hasPhone = _normalizePhone(_phoneCtrl.text).length >= 10;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ServiceShell(
      title: 'Data',
      subtitle: 'Lightning fast top-up.',
      icon: Icons.wifi_rounded,
      scrollController: _scrollController,
      footer: (hasPhone && selected != null)
          ? Padding(
              padding: const EdgeInsets.only(top: 8),
              child: _EpicCheckoutButton(
                network: _network,
                amount: '₦${_planPrice(selected)}',
                loading: _submitting,
                onBuy: _showSummaryModal,
                netColor: _getNetworkColor(_network),
              ),
            ).animate().slideY(begin: 1, duration: const Duration(milliseconds: 400), curve: Curves.easeOutCubic)
          : null,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 16),
          
          // 1. Epic Massive Input
          Center(
            child: TextFormField(
              controller: _phoneCtrl,
              keyboardType: TextInputType.phone,
              style: TextStyle(
                fontSize: 42,
                fontWeight: FontWeight.w900,
                letterSpacing: 2,
                color: Theme.of(context).colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
              decoration: InputDecoration(
                hintText: '080...',
                hintStyle: TextStyle(
                  fontSize: 42,
                  fontWeight: FontWeight.w900,
                  color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.15),
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                suffixIcon: _network.isNotEmpty 
                  ? Container(
                      padding: const EdgeInsets.all(8),
                      child: _networkLogoByName(_network),
                    ).animate().scale(duration: const Duration(milliseconds: 300)).fade()
                  : IconButton(
                      icon: Icon(Icons.contact_phone_rounded, size: 32, color: Theme.of(context).colorScheme.primary),
                      onPressed: _pickContact,
                    ),
              ),
              onChanged: (v) => _onPhoneChanged(),
            ),
          ),
          
          const SizedBox(height: 24),

          // 2. Animated Recent Avatars
          if (_recentNumbers.isNotEmpty) ...[
            SizedBox(
              height: 60,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _recentNumbers.length,
                separatorBuilder: (_, __) => const SizedBox(width: 16),
                itemBuilder: (context, index) {
                  final number = _recentNumbers[index];
                  return GestureDetector(
                    onTap: () => _applySuggestedNumber(number),
                    child: Column(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9),
                            border: Border.all(color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.1)),
                          ),
                          child: Center(
                            child: Text(
                              number.length > 4 ? number.substring(number.length - 4) : number,
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Theme.of(context).colorScheme.primary),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ).animate().fade(delay: Duration(milliseconds: 50 * index)).scale();
                },
              ),
            ),
            const SizedBox(height: 32),
          ],

          // 3. Network fallback (if empty)
          if (_network.isEmpty && !hasPhone) ...[
            Center(
              child: Text(
                'Or tap to select network',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.3),
                ),
              ),
            ),
            const SizedBox(height: 16),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _NetworkCard(key: const ValueKey('mtn'), name: 'mtn', isSelected: _network == 'mtn', onTap: () => _selectNetwork('mtn'), isDark: isDark, netColor: const Color(0xFFEAB308)),
                  _NetworkCard(key: const ValueKey('airtel'), name: 'airtel', isSelected: _network == 'airtel', onTap: () => _selectNetwork('airtel'), isDark: isDark, netColor: const Color(0xFFEF4444)),
                  _NetworkCard(key: const ValueKey('glo'), name: 'glo', isSelected: _network == 'glo', onTap: () => _selectNetwork('glo'), isDark: isDark, netColor: const Color(0xFF22C55E)),
                  _NetworkCard(key: const ValueKey('9mobile'), name: '9mobile', isSelected: _network == '9mobile', onTap: () => _selectNetwork('9mobile'), isDark: isDark, netColor: const Color(0xFF166534)),
                ],
              ),
            ),
          ],

          // 4. Glowing Glassmorphic Plans
          if (_network.isNotEmpty) AnimatedSize(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOutCubic,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Category Tabs
                if (_networkPlans.isNotEmpty) ...[
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: ['All', 'SME', 'Corporate', 'Gifting', 'Awoof'].where((cat) {
                        if (cat == 'All') return true;
                        return _networkPlans.any((p) => _extractCategory(p) == cat);
                      }).map((cat) {
                        final isSelected = _selectedCategory == cat;
                        final netColor = _getNetworkColor(_network);
                        return GestureDetector(
                          onTap: () {
                            HapticFeedback.selectionClick();
                            setState(() => _selectedCategory = cat);
                          },
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 250),
                            margin: const EdgeInsets.only(right: 12),
                            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                            decoration: BoxDecoration(
                              color: isSelected 
                                  ? netColor.withValues(alpha: 0.15)
                                  : (isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: isSelected 
                                    ? netColor
                                    : Colors.transparent,
                                width: 1.5,
                              ),
                            ),
                            child: Text(
                              cat,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                                color: isSelected 
                                    ? netColor
                                    : (isDark ? Colors.white70 : Colors.black54),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                if (_loadingPlans && _sortedNetworkPlans.isEmpty)
                  const Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator()))
                else if (_sortedNetworkPlans.isEmpty)
                  Center(
                    child: TextButton.icon(
                      onPressed: () => _loadPlans(forceRefresh: true),
                      icon: const Icon(Icons.refresh),
                      label: const Text('Retry Loading Plans'),
                    ),
                  )
                else
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _sortedNetworkPlans.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 16),
                    itemBuilder: (context, index) {
                      final plan = _sortedNetworkPlans[index];
                      final code = plan['plan_code']?.toString();
                      final isSelected = _selectedPlanCode == code;
                      final netColor = _getNetworkColor(_network);

                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeOutCubic,
                        decoration: BoxDecoration(
                          color: isSelected 
                              ? netColor.withValues(alpha: 0.08) 
                              : (isDark ? const Color(0xFF161E2E) : const Color(0xFFF8FAFC)),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: isSelected 
                                ? netColor 
                                : (isDark ? const Color(0xFF2A3A52) : const Color(0xFFE2E8F0)),
                            width: isSelected ? 2 : 1,
                          ),
                          boxShadow: isSelected ? [
                            BoxShadow(
                              color: netColor.withValues(alpha: 0.15),
                              blurRadius: 20,
                              spreadRadius: -2,
                            )
                          ] : [],
                        ),
                        child: InkWell(
                          onTap: () {
                            HapticFeedback.lightImpact();
                            setState(() => _selectedPlanCode = code);
                          },
                          borderRadius: BorderRadius.circular(24),
                          child: Padding(
                            padding: const EdgeInsets.all(20),
                            child: Row(
                              children: [
                                // Capacity Badge
                                Container(
                                  width: 56,
                                  height: 56,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withValues(alpha: 0.05),
                                        blurRadius: 10,
                                        offset: const Offset(0, 4),
                                      ),
                                    ],
                                  ),
                                  child: Center(
                                    child: Text(
                                      _planCapacity(plan).replaceAll('GB', '').replaceAll('MB', ''),
                                      style: TextStyle(
                                        fontSize: 20, 
                                        fontWeight: FontWeight.w900, 
                                        color: isSelected ? netColor : Theme.of(context).colorScheme.onSurface
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        _planCapacity(plan),
                                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, letterSpacing: -0.5),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        _planValidity(plan),
                                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5)),
                                      ),
                                    ],
                                  ),
                                ),
                                Text(
                                  '₦${_planPrice(plan)}',
                                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, letterSpacing: -0.5),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ).animate().fade(delay: Duration(milliseconds: 30 * index)).slideY(begin: 0.2);
                    },
                  ),
              ],
            ),
          ),
          
          if (!(hasPhone && selected != null)) const SizedBox(height: 40),
        ],
      ),
    );
