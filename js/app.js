/**
 * Solana UPI Redesign - Interactive Prototype Controller
 */

// Application State
const state = {
  currentView: 'prototype', // 'prototype', 'comparison', 'casestudy', 'figma'
  currentFeature: 'send',   // 'send', 'signing', 'fees', 'status', 'onboarding'
  deviceMode: 'mobile',     // 'mobile' or 'desktop'
  currency: 'INR',          // 'INR', 'USD', 'SOL'
  soundEnabled: false,

  // Balances
  balanceSol: 4.82,
  
  // Feature 1 State (Send)
  selectedContact: BOUNTY_DATA.contacts[0], // Rahul Sharma (.sol)
  sendAmountInr: 1500,

  // Feature 2 State (Signing)
  isScamMode: false,

  // Feature 3 State (Fees)
  selectedTier: 'standard', // 'standard', 'fast', 'turbo'

  // Feature 4 State (Status & Pipeline)
  pipelineState: 'idle', // 'idle', 'running', 'success', 'failed'

  // Feature 5 State (Onboarding)
  securityPercent: 40
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDeviceSwitch();
  initSoundToggle();
  initFeatureTabs();
  initDynamicIsland();
  renderQuickContactsCarousel();
  initSendFlow();
  initSigningFlow();
  initFeesFlow();
  initStatusFlow();
  initOnboardingFlow();
  initCaseStudyExports();
  updateBalanceDisplay();
});

/* ==========================================================================
   NAVIGATION & VIEW CONTROLLERS
   ========================================================================== */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-tab-btn');
  const viewPanels = document.querySelectorAll('.view-panel');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine.playClick();
      const targetView = btn.dataset.view;
      state.currentView = targetView;

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      viewPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `view-${targetView}`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

function initDeviceSwitch() {
  const deviceButtons = document.querySelectorAll('.device-btn');
  const phoneWrapper = document.getElementById('phoneMockup');
  const desktopWrapper = document.getElementById('desktopMockup');

  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine.playClick();
      const mode = btn.dataset.mode;
      state.deviceMode = mode;

      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'mobile') {
        phoneWrapper.style.display = 'block';
        desktopWrapper.classList.remove('active');
      } else {
        phoneWrapper.style.display = 'none';
        desktopWrapper.classList.add('active');
      }
    });
  });
}

function initSoundToggle() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    window.soundEngine.enabled = state.soundEnabled;

    if (state.soundEnabled) {
      soundBtn.classList.add('active');
      soundBtn.innerHTML = `<span>🔊</span> Sound: ON`;
      window.soundEngine.playClick();
    } else {
      soundBtn.classList.remove('active');
      soundBtn.innerHTML = `<span>🔇</span> Sound: OFF`;
    }
  });
}

function initFeatureTabs() {
  const featureButtons = document.querySelectorAll('.feature-btn');
  const featureContainers = document.querySelectorAll('.feature-view-container');

  featureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine.playClick();
      const featureId = btn.dataset.feature;
      switchFeature(featureId);
    });
  });
}

function switchFeature(featureId) {
  state.currentFeature = featureId;

  // Update button active states
  document.querySelectorAll('.feature-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.feature === featureId);
  });

  // Update containers
  document.querySelectorAll('.feature-view-container').forEach(c => {
    c.classList.toggle('active', c.id === `fview-${featureId}`);
  });

  // Update explainer banner
  const featData = BOUNTY_DATA.features.find(f => f.id === featureId);
  if (featData) {
    const titleEl = document.getElementById('explainerTitle');
    const descEl = document.getElementById('explainerDesc');
    const statValEl = document.getElementById('explainerStatVal');
    const statLblEl = document.getElementById('explainerStatLbl');

    if (titleEl) titleEl.textContent = `Feature ${featData.number}: ${featData.title}`;
    if (descEl) descEl.textContent = featData.summary;

    if (statValEl && statLblEl) {
      const keys = Object.keys(featData.metrics);
      const firstMetric = featData.metrics[keys[0]];
      statValEl.textContent = firstMetric.improvement;
      statLblEl.textContent = `Tested with 5 users`;
    }
  }
}

/* ==========================================================================
   BALANCE & CURRENCY HELPERS
   ========================================================================== */
function updateBalanceDisplay() {
  const inrVal = state.balanceSol * BOUNTY_DATA.exchangeRate.solInr;
  const usdVal = state.balanceSol * BOUNTY_DATA.exchangeRate.solUsd;

  const mainDisplay = document.getElementById('mainBalanceDisplay');
  const secondaryDisplay = document.getElementById('secondaryBalanceDisplay');
  const currBtn = document.getElementById('currencyToggleBtn');

  if (!mainDisplay) return;

  if (state.currency === 'INR') {
    mainDisplay.textContent = `₹${inrVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    secondaryDisplay.textContent = `≈ ${state.balanceSol.toFixed(2)} SOL ($${usdVal.toFixed(0)})`;
    if (currBtn) currBtn.textContent = 'Currency: ₹ INR';
  } else if (state.currency === 'SOL') {
    mainDisplay.textContent = `${state.balanceSol.toFixed(2)} SOL`;
    secondaryDisplay.textContent = `≈ ₹${inrVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    if (currBtn) currBtn.textContent = 'Currency: SOL';
  } else {
    mainDisplay.textContent = `$${usdVal.toFixed(2)}`;
    secondaryDisplay.textContent = `≈ ₹${inrVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    if (currBtn) currBtn.textContent = 'Currency: $ USD';
  }
}

// Global currency switcher
window.toggleCurrency = function() {
  window.soundEngine.playClick();
  if (state.currency === 'INR') state.currency = 'SOL';
  else if (state.currency === 'SOL') state.currency = 'USD';
  else state.currency = 'INR';

  updateBalanceDisplay();
};

/* ==========================================================================
   FEATURE 1: HUMAN-FIRST SEND CONTROLLER
   ========================================================================== */
function initSendFlow() {
  renderContactsList();

  const searchInput = document.getElementById('sendSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      renderContactsList(query);
    });
  }

  const amountInput = document.getElementById('sendAmountInput');
  if (amountInput) {
    amountInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      state.sendAmountInr = val;
      updateSendAmountSecondary(val);
    });
  }

  // Micro-transfer button (₹10 test send)
  const microBtn = document.getElementById('microTransferBtn');
  if (microBtn) {
    microBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      if (amountInput) {
        amountInput.value = '10';
        state.sendAmountInr = 10;
        updateSendAmountSecondary(10);
      }
    });
  }

  initSwipeToSend();
}

function renderContactsList(filter = '') {
  const listEl = document.getElementById('contactsPickerGroup');
  if (!listEl) return;

  const filtered = BOUNTY_DATA.contacts.filter(c => 
    c.name.toLowerCase().includes(filter) || c.handle.toLowerCase().includes(filter)
  );

  listEl.innerHTML = '';
  filtered.forEach(contact => {
    const card = document.createElement('div');
    card.className = `contact-item-card ${contact.id === state.selectedContact.id ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="contact-left-col">
        <div class="c-avatar">${contact.avatar}</div>
        <div class="c-info">
          <h4>${contact.name} ${contact.verified ? '<span class="verified-tick">✓</span>' : ''}</h4>
          <p>${contact.handle} • ${contact.history}</p>
        </div>
      </div>
      <div class="contact-badge-col">
        <span class="badge ${contact.verified ? 'badge-safe' : 'badge-warning'}">${contact.badge}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      window.soundEngine.playClick();
      selectContact(contact);
    });

    listEl.appendChild(card);
  });
}

function selectContact(contact) {
  state.selectedContact = contact;
  renderContactsList();

  // Update first-time alert visibility
  const alertCard = document.getElementById('firstTimeAlertCard');
  if (alertCard) {
    if (contact.riskLevel === 'warning') {
      alertCard.style.display = 'flex';
      const nameSpan = document.getElementById('alertContactName');
      if (nameSpan) nameSpan.textContent = contact.handle;
    } else {
      alertCard.style.display = 'none';
    }
  }

  // Update desktop side-panel recipient if present
  const desktopRecip = document.getElementById('desktopRecipientPreview');
  if (desktopRecip) {
    desktopRecip.textContent = `${contact.name} (${contact.handle})`;
  }
}

function updateSendAmountSecondary(inr) {
  const secEl = document.getElementById('sendSecondaryCalc');
  if (!secEl) return;
  const solEquiv = inr / BOUNTY_DATA.exchangeRate.solInr;
  secEl.textContent = `≈ ${solEquiv.toFixed(4)} SOL (Network fee: ₹0.08)`;
}

// Swipe to Send micro-interaction
function initSwipeToSend() {
  const handle = document.getElementById('swipeHandle');
  const container = document.getElementById('swipeContainer');
  const fill = document.getElementById('swipeFill');
  if (!handle || !container || !fill) return;

  let isDragging = false;
  let startX = 0;
  let maxDrag = 0;

  function onStart(clientX) {
    isDragging = true;
    startX = clientX;
    maxDrag = container.clientWidth - handle.clientWidth - 6;
    handle.style.transition = 'none';
    fill.style.transition = 'none';
  }

  function onMove(clientX) {
    if (!isDragging) return;
    const deltaX = Math.max(0, Math.min(clientX - startX, maxDrag));
    handle.style.transform = `translateX(${deltaX}px)`;
    fill.style.width = `${deltaX + 48}px`;

    // Ratchet sound feedback at intervals
    if (Math.floor(deltaX) % 35 === 0) {
      window.soundEngine.playTick();
    }

    if (deltaX >= maxDrag * 0.92) {
      completeSwipe();
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    handle.style.transition = 'transform 200ms ease';
    fill.style.transition = 'width 200ms ease';
    handle.style.transform = 'translateX(0px)';
    fill.style.width = '48px';
  }

  function completeSwipe() {
    isDragging = false;
    handle.style.transform = `translateX(${maxDrag}px)`;
    fill.style.width = '100%';

    // Soft tick
    window.soundEngine.playTick();

    // Trigger the 10-Second Undo Window (Signature Moment 2)
    startUndoWindow();

    // Reset handle after delay
    setTimeout(() => {
      handle.style.transform = 'translateX(0px)';
      fill.style.width = '48px';
    }, 1500);
  }

  // Mouse handlers
  handle.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);

  // Touch handlers
  handle.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX));
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX));
  window.addEventListener('touchend', onEnd);
}

/* ==========================================================================
   SIGNATURE MOMENT 2: 10-SECOND UNDO WINDOW CONTROLLER
   ========================================================================== */
function startUndoWindow() {
  const modal = document.getElementById('undoModal');
  const secEl = document.getElementById('undoSecNum');
  const ring = document.getElementById('undoProgressRing');
  const recipName = document.getElementById('undoRecipientName');

  if (!modal || !secEl || !ring) {
    completeBroadcast();
    return;
  }

  if (recipName) {
    recipName.textContent = `${state.selectedContact.name} (${state.selectedContact.handle})`;
  }

  state.undoSecondsLeft = 10;
  secEl.textContent = '10';

  // Ring circumference = 2 * PI * 45 ≈ 283
  const circumference = 283;
  ring.style.strokeDashoffset = '0';
  modal.classList.add('active');

  clearInterval(state.undoTimer);
  state.undoTimer = setInterval(() => {
    state.undoSecondsLeft--;
    secEl.textContent = state.undoSecondsLeft;
    window.soundEngine.playTick();

    const progress = (10 - state.undoSecondsLeft) / 10;
    ring.style.strokeDashoffset = `${progress * circumference}`;

    if (state.undoSecondsLeft <= 0) {
      clearInterval(state.undoTimer);
      modal.classList.remove('active');
      completeBroadcast();
    }
  }, 1000);
}

window.cancelUndoWindow = function() {
  clearInterval(state.undoTimer);
  window.soundEngine.playCancel();

  const modal = document.getElementById('undoModal');
  if (modal) modal.classList.remove('active');

  // Friendly reassurance toast
  alert('🛡️ Transfer Cancelled! ₹0 was sent. Your money remained safe in your wallet.');
};

window.skipUndoAndBroadcast = function() {
  clearInterval(state.undoTimer);
  const modal = document.getElementById('undoModal');
  if (modal) modal.classList.remove('active');
  completeBroadcast();
};

function completeBroadcast() {
  // Play distinctive UPI chord
  window.soundEngine.playUpiSuccess();

  // Deduct balance
  const solSent = (state.sendAmountInr / BOUNTY_DATA.exchangeRate.solInr).toFixed(4);
  state.balanceSol = Math.max(0, state.balanceSol - parseFloat(solSent));
  updateBalanceDisplay();

  // Show Success Overlay
  showSuccessReceipt();
}

function showSuccessReceipt() {
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const solSent = (state.sendAmountInr / BOUNTY_DATA.exchangeRate.solInr).toFixed(4);
  const amtEl = document.getElementById('receiptAmount');
  const toEl = document.getElementById('receiptTo');
  if (amtEl) amtEl.textContent = `₹${state.sendAmountInr.toLocaleString('en-IN')} (${solSent} SOL)`;
  if (toEl) toEl.textContent = `${state.selectedContact.name} (${state.selectedContact.handle})`;

  modal.classList.add('active');
  triggerConfetti();
}

window.closeSuccessModal = function() {
  window.soundEngine.playClick();
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   FEATURE 2: PLAIN-LANGUAGE SIGNING CARD CONTROLLER
   ========================================================================== */
function initSigningFlow() {
  const scamBtn = document.getElementById('toggleScamBtn');
  if (!scamBtn) return;

  scamBtn.addEventListener('click', () => {
    state.isScamMode = !state.isScamMode;

    if (state.isScamMode) {
      window.soundEngine.playWarning();
      scamBtn.classList.add('danger-active');
      scamBtn.textContent = 'Simulating: Scam Intercept ⚠️';
      renderScamSigningView();
    } else {
      window.soundEngine.playClick();
      scamBtn.classList.remove('danger-active');
      scamBtn.textContent = 'Simulate Scam Intercept';
      renderSafeSigningView();
    }
  });
}

function renderSafeSigningView() {
  const phone = document.getElementById('phoneMockup');
  if (phone) phone.classList.remove('scam-glow');

  const shield = document.getElementById('riskShieldBanner');
  const shieldTitle = document.getElementById('shieldTitle');
  const shieldDesc = document.getElementById('shieldDesc');
  const shieldIcon = document.getElementById('shieldIcon');
  const approveBtn = document.getElementById('signApproveBtn');
  const checklist = document.getElementById('securityChecklist');

  if (shield) {
    shield.className = 'risk-shield-banner safe';
    if (shieldIcon) shieldIcon.textContent = '🛡️';
    if (shieldTitle) shieldTitle.textContent = '4 Safety Checks Passed';
    if (shieldDesc) shieldDesc.textContent = 'Raydium AMM V4 • Circle USDC Mint • 0 malicious signatures';
  }

  if (checklist) {
    checklist.innerHTML = `
      <div class="check-item ok"><span>✓</span> Verified Program ID: Raydium AMM (675kPX9...22)</div>
      <div class="check-item ok"><span>✓</span> Official Token Mint: Circle USDC (EPjFWdd...y9z)</div>
      <div class="check-item ok"><span>✓</span> Exact Balance Delta: -1.50 SOL / +296.85 USDC</div>
      <div class="check-item ok"><span>✓</span> Zero arbitrary delegate or freeze authority requested</div>
    `;
  }

  const actions = document.getElementById('signActionButtons');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-secondary" onclick="switchFeature('send')">Reject</button>
      <button class="btn btn-upi" id="signApproveBtn" onclick="simulatePipeline(true); switchFeature('status');">Approve Swap</button>
    `;
  }
}

function renderScamSigningView() {
  const phone = document.getElementById('phoneMockup');
  if (phone) phone.classList.add('scam-glow');

  const shield = document.getElementById('riskShieldBanner');
  const shieldTitle = document.getElementById('shieldTitle');
  const shieldDesc = document.getElementById('shieldDesc');
  const shieldIcon = document.getElementById('shieldIcon');
  const checklist = document.getElementById('securityChecklist');

  if (shield) {
    shield.className = 'risk-shield-banner danger';
    if (shieldIcon) shieldIcon.textContent = '🚨';
    if (shieldTitle) shieldTitle.textContent = '🚨 MALICIOUS DRAINER INTERCEPTED';
    if (shieldDesc) shieldDesc.textContent = 'Why this warning? Token minted 2h ago • 98% held by 1 wallet • Drainer signature';
  }

  if (checklist) {
    checklist.innerHTML = `
      <div class="check-item fail"><span>✕</span> Unverified Program ID (created 2h ago, zero audits)</div>
      <div class="check-item fail"><span>✕</span> Requests SetAuthority permissions to drain all wallet SOL</div>
      <div class="check-item fail"><span>✕</span> 98.4% token supply concentrated in single deployer wallet</div>
    `;
  }

  const actions = document.getElementById('signActionButtons');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-upi" style="flex: 2; background: var(--upi-green-primary); font-weight: 700;" onclick="window.soundEngine.playUpiSuccess(); switchFeature('send');">🛡️ Don't Proceed (Recommended)</button>
      <button class="btn btn-secondary" style="flex: 1; font-size: 11px; opacity: 0.6;" onclick="window.soundEngine.playWarning(); alert('⚠️ Warning: Proceeding will expose your wallet to malicious drainer code. Transaction simulation blocked for your safety.');">Proceed anyway</button>
    `;
  }
}

/* ==========================================================================
   FEATURE 3: RUPEE-NATIVE NETWORK FEES CONTROLLER
   ========================================================================== */
function initFeesFlow() {
  const tierCards = document.querySelectorAll('.tier-card');
  const feeDisplay = document.getElementById('feeHeroPrice');
  const feeSolEquiv = document.getElementById('feeSolEquiv');

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      window.soundEngine.playClick();
      const tier = card.dataset.tier;
      state.selectedTier = tier;

      tierCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (tier === 'standard') {
        if (feeDisplay) feeDisplay.textContent = '≈ ₹0.08';
        if (feeSolEquiv) feeSolEquiv.textContent = 'Paid in 0.000005 SOL • ~400ms speed';
      } else if (tier === 'fast') {
        if (feeDisplay) feeDisplay.textContent = '≈ ₹0.15';
        if (feeSolEquiv) feeSolEquiv.textContent = 'Paid in 0.000009 SOL • ~200ms speed';
      } else {
        if (feeDisplay) feeDisplay.textContent = '≈ ₹0.35';
        if (feeSolEquiv) feeSolEquiv.textContent = 'Paid in 0.000021 SOL • ~100ms ultra-priority';
      }
    });
  });
}

/* ==========================================================================
   FEATURE 4: PEACE-OF-MIND RECOVERY TIMELINE CONTROLLER
   ========================================================================== */
function initStatusFlow() {
  const btnSuccess = document.getElementById('simSuccessBtn');
  const btnFailed = document.getElementById('simFailBtn');

  if (btnSuccess) {
    btnSuccess.addEventListener('click', () => simulatePipeline(true));
  }
  if (btnFailed) {
    btnFailed.addEventListener('click', () => simulatePipeline(false));
  }
}

function simulatePipeline(isSuccess) {
  window.soundEngine.playClick();
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const banner = document.getElementById('safetyGuaranteeBanner');
  const bannerTitle = document.getElementById('guaranteeTitle');
  const bannerDesc = document.getElementById('guaranteeDesc');
  const retryBtn = document.getElementById('statusRetryBtn');

  // Reset steps
  [step1, step2, step3, step4].forEach(s => {
    if (s) {
      s.className = 'pipe-step pending';
      const dot = s.querySelector('.pipe-step-dot');
      if (dot) dot.textContent = '⋯';
    }
  });

  if (banner) banner.style.display = 'none';
  if (retryBtn) retryBtn.style.display = 'none';

  // Step 1: Sent
  setTimeout(() => {
    window.soundEngine.playTick();
    if (step1) {
      step1.className = 'pipe-step done';
      step1.querySelector('.pipe-step-dot').textContent = '✓';
    }
  }, 400);

  // Step 2: Broadcast
  setTimeout(() => {
    window.soundEngine.playTick();
    if (step2) {
      step2.className = 'pipe-step done';
      step2.querySelector('.pipe-step-dot').textContent = '✓';
    }
  }, 900);

  // Step 3 & 4
  setTimeout(() => {
    if (isSuccess) {
      window.soundEngine.playUpiSuccess();
      if (step3) {
        step3.className = 'pipe-step done';
        step3.querySelector('.pipe-step-dot').textContent = '✓';
      }
      if (step4) {
        step4.className = 'pipe-step done';
        step4.querySelector('.pipe-step-dot').textContent = '✓';
      }
      if (banner) {
        banner.className = 'safety-guarantee-banner';
        banner.style.display = 'flex';
        if (bannerTitle) bannerTitle.textContent = 'Optimistically Confirmed (~400ms)';
        if (bannerDesc) bannerDesc.textContent = 'Recipient balance updated in 420ms (slot #289,140,211). Rooted finality locks in ~12s (31+ slots).';
      }
    } else {
      window.soundEngine.playWarning();
      if (step3) {
        step3.className = 'pipe-step done';
        step3.querySelector('.pipe-step-dot').textContent = '✓';
      }
      if (step4) {
        step4.className = 'pipe-step failed';
        step4.querySelector('.pipe-step-dot').textContent = '✕';
      }
      if (banner) {
        banner.className = 'safety-guarantee-banner reversal';
        banner.style.display = 'flex';
        const lang = state.rakshakLang || 'en';
        const t = BOUNTY_DATA.translations[lang] || BOUNTY_DATA.translations.en;
        if (bannerTitle) bannerTitle.textContent = t.failedTxTitle;
        if (bannerDesc) bannerDesc.textContent = t.failedTxDesc;
      }
      if (retryBtn) {
        retryBtn.style.display = 'inline-flex';
      }
    }
  }, 1600);
}

window.retrySmartSwap = function() {
  window.soundEngine.playClick();
  simulatePipeline(true);
};

/* ==========================================================================
   FEATURE 5: PROGRESSIVE ONBOARDING & SECURITY RING
   ========================================================================== */
function initOnboardingFlow() {
  const backupBtn = document.getElementById('completeBackupBtn');
  const passkeyBtn = document.getElementById('createPasskeyBtn');

  if (passkeyBtn) {
    passkeyBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      passkeyBtn.textContent = '✓ Passkey Created via FaceID';
      passkeyBtn.disabled = true;
    });
  }

  if (backupBtn) {
    backupBtn.addEventListener('click', () => {
      window.soundEngine.playUpiSuccess();
      animateSecurityRing(100);
      backupBtn.textContent = '✓ 100% Shield Active (Google Drive Encrypted)';
      backupBtn.disabled = true;
    });
  }
}

function animateSecurityRing(targetPercent) {
  state.securityPercent = targetPercent;
  const ring = document.getElementById('progressRingIndicator');
  const numEl = document.getElementById('ringPercentDisplay');

  // Circumference = 2 * PI * r = 2 * 3.14159 * 60 ≈ 377
  const circumference = 377;
  const offset = circumference - (targetPercent / 100) * circumference;

  if (ring) {
    ring.style.strokeDashoffset = offset;
  }
  if (numEl) {
    numEl.textContent = `${targetPercent}%`;
  }
}

/* ==========================================================================
   CASE STUDY & EXPORT HELPERS
   ========================================================================== */
function initCaseStudyExports() {
  const copyBtn = document.getElementById('copyWriteupBtn');
  const rawTextarea = document.getElementById('rawWriteupArea');

  if (copyBtn && rawTextarea) {
    copyBtn.addEventListener('click', () => {
      window.soundEngine.playUpiSuccess();
      rawTextarea.select();
      navigator.clipboard.writeText(rawTextarea.value).then(() => {
        copyBtn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy Full Write-Up Markdown';
        }, 2500);
      });
    });
  }
}

/* ==========================================================================
   DYNAMIC ISLAND INTERACTION
   ========================================================================== */
function initDynamicIsland() {
  const island = document.getElementById('dynamicIsland');
  if (!island) return;

  island.addEventListener('click', () => {
    window.soundEngine.playClick();
    island.classList.toggle('expanded');
  });
}

/* ==========================================================================
   FEATURE 1 ENHANCEMENTS: QUICK CONTACTS & PRESET AMOUNTS
   ========================================================================== */
function renderQuickContactsCarousel() {
  const container = document.getElementById('quickContactsCarousel');
  if (!container) return;

  container.innerHTML = '';
  BOUNTY_DATA.contacts.forEach(contact => {
    const chip = document.createElement('div');
    chip.className = `h-contact-chip ${contact.id === state.selectedContact.id ? 'selected' : ''}`;
    chip.innerHTML = `
      <div class="h-avatar-wrap">
        <span>${contact.avatar}</span>
        ${contact.verified ? '<div class="h-online-dot"></div>' : ''}
      </div>
      <span class="h-name-lbl">${contact.name.split(' ')[0]}</span>
    `;

    chip.addEventListener('click', () => {
      window.soundEngine.playClick();
      selectContact(contact);
      renderQuickContactsCarousel();
    });

    container.appendChild(chip);
  });
}

window.setPresetAmount = function(val) {
  window.soundEngine.playClick();
  const input = document.getElementById('sendAmountInput');
  if (input) {
    input.value = val;
    state.sendAmountInr = val;
    updateSendAmountSecondary(val);
  }
};

/* ==========================================================================
   FEATURE 2 ENHANCEMENTS: VIEW MODE SWITCHER (LEGACY BYTECODE)
   ========================================================================== */
window.setSigningViewMode = function(mode) {
  window.soundEngine.playClick();
  const btnPlain = document.getElementById('modeBtnPlain');
  const btnLegacy = document.getElementById('modeBtnLegacy');
  const plainWrapper = document.getElementById('plainSigningWrapper');
  const legacyBox = document.getElementById('legacyBytecodeBox');

  if (mode === 'plain') {
    if (btnPlain) btnPlain.classList.add('active');
    if (btnLegacy) btnLegacy.classList.remove('active');
    if (plainWrapper) plainWrapper.style.display = 'block';
    if (legacyBox) legacyBox.classList.remove('active');
  } else {
    if (btnPlain) btnPlain.classList.remove('active');
    if (btnLegacy) btnLegacy.classList.add('active');
    if (plainWrapper) plainWrapper.style.display = 'none';
    if (legacyBox) legacyBox.classList.add('active');
  }
};

/* ==========================================================================
   FEATURE 3 ENHANCEMENTS: LIVE SAVINGS CALCULATOR
   ========================================================================== */
window.updateSavingsCalculator = function(amount) {
  const amtNum = parseFloat(amount) || 5000;
  const labelEl = document.getElementById('sliderAmountLabel');
  const cardFeeEl = document.getElementById('cardFeeCalc');
  const saveLabelEl = document.getElementById('youSaveLabel');

  const cardFee = (amtNum * 0.02).toFixed(2);
  const solFee = 0.08;
  const savings = (cardFee - solFee).toFixed(2);

  if (labelEl) labelEl.textContent = `₹${amtNum.toLocaleString('en-IN')}`;
  if (cardFeeEl) cardFeeEl.textContent = `₹${cardFee}`;
  if (saveLabelEl) saveLabelEl.textContent = `🎉 You save ₹${savings} on this transaction!`;
};

/* ==========================================================================
   FEATURE 4 ENHANCEMENTS: EXPANDABLE ATOMIC ROLLBACK DRAWER
   ========================================================================== */
window.toggleRollbackDrawer = function() {
  window.soundEngine.playClick();
  const drawer = document.getElementById('rollbackDrawer');
  const arrow = document.getElementById('rollbackToggleArrow');

  if (drawer) {
    drawer.classList.toggle('open');
    if (arrow) {
      arrow.textContent = drawer.classList.contains('open') ? '▲' : '▼';
    }
  }
};

/* ==========================================================================
   FEATURE 5 ENHANCEMENTS: PROGRESSIVE ONBOARDING STAGE STEPPER
   ========================================================================== */
window.setOnboardingStage = function(stage) {
  window.soundEngine.playClick();
  const b1 = document.getElementById('stageBtn1');
  const b2 = document.getElementById('stageBtn2');
  const b3 = document.getElementById('stageBtn3');
  const cloudItem = document.getElementById('tierCloudItem');
  const cloudIcon = document.getElementById('tierCloudIcon');
  const backupBtn = document.getElementById('completeBackupBtn');

  [b1, b2, b3].forEach(b => { if (b) b.classList.remove('active'); });

  if (stage === 1) {
    if (b1) b1.classList.add('active');
    animateSecurityRing(40);
    if (cloudItem) cloudItem.classList.remove('active');
    if (cloudIcon) { cloudIcon.textContent = '○'; cloudIcon.style.color = 'var(--text-tertiary)'; }
    if (backupBtn) { backupBtn.textContent = 'Enable'; backupBtn.disabled = false; }
  } else if (stage === 2) {
    if (b2) b2.classList.add('active');
    animateSecurityRing(75);
    if (cloudItem) cloudItem.classList.add('active');
    if (cloudIcon) { cloudIcon.textContent = '⋯'; cloudIcon.style.color = 'var(--risk-amber)'; }
    if (backupBtn) { backupBtn.textContent = 'Sync Cloud'; backupBtn.disabled = false; }
  } else {
    if (b3) b3.classList.add('active');
    window.soundEngine.playUpiSuccess();
    animateSecurityRing(100);
    if (cloudItem) cloudItem.classList.add('active');
    if (cloudIcon) { cloudIcon.textContent = '✓'; cloudIcon.style.color = 'var(--sol-emerald)'; }
    if (backupBtn) { backupBtn.textContent = '✓ 100% Vault Protected'; backupBtn.disabled = true; }
    triggerConfetti();
  }
};

/* ==========================================================================
   LIGHTWEIGHT HIGH-PERFORMANCE CANVAS CONFETTI ENGINE
   ========================================================================== */
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#14F195', '#9945FF', '#00C2FF', '#00F08B', '#FFB800', '#FFFFFF'];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 2 - 80,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -10 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 15,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vr;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

/* ==========================================================================
   SIGNATURE MOMENT 1: RAKSHAK MODE (HINDI / HINGLISH / VOICE CONTROLLER)
   ========================================================================== */
window.setRakshakLanguage = function(lang) {
  state.rakshakLang = lang;
  window.soundEngine.playClick();

  // Update button active state
  document.querySelectorAll('.rakshak-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const t = BOUNTY_DATA.translations[lang];
  if (!t) return;

  // Update voice button text
  const vText = document.getElementById('voiceBtnText');
  if (vText) vText.textContent = lang === 'hi' ? 'बोलकर सुनाएं' : (lang === 'hinglish' ? 'Suniye' : 'Listen');

  // Update shield card copy
  const shieldTitle = document.getElementById('shieldTitle');
  const shieldDesc = document.getElementById('shieldDesc');
  if (shieldTitle && shieldDesc) {
    if (state.isScamMode) {
      shieldTitle.textContent = t.signingDrainerTitle;
      shieldDesc.textContent = t.signingDrainerDesc;
    } else {
      shieldTitle.textContent = t.signingSafeTitle;
      shieldDesc.textContent = t.signingSafeDesc;
    }
  }

  // Update You Give / You Receive labels
  const giveLabel = document.querySelector('.flow-label.give');
  const getLabel = document.querySelector('.flow-label.get');
  if (giveLabel) giveLabel.textContent = t.youGiveLbl;
  if (getLabel) getLabel.textContent = t.youGetLbl;

  // Brief voice sample
  const samplePhrase = lang === 'hi' ? 'रक्षाक मोड सक्रिय' : (lang === 'hinglish' ? 'Rakshak mode ready' : 'Rakshak mode active');
  window.soundEngine.speak(samplePhrase, lang);
};

window.speakCurrentCard = function() {
  const btn = document.getElementById('rakshakVoiceBtn');
  if (btn) {
    btn.classList.add('speaking');
    setTimeout(() => btn.classList.remove('speaking'), 3500);
  }

  const lang = state.rakshakLang || 'en';
  const t = BOUNTY_DATA.translations[lang] || BOUNTY_DATA.translations.en;
  const speechText = state.isScamMode ? t.signingDrainerSpeech : t.signingSafeSpeech;

  window.soundEngine.playTick();
  window.soundEngine.speak(speechText, lang);
};

/* ==========================================================================
   WHATSAPP SHAREABLE RECEIPT GENERATOR
   ========================================================================== */
window.shareOnWhatsApp = function() {
  window.soundEngine.playUpiSuccess();

  const solSent = (state.sendAmountInr / BOUNTY_DATA.exchangeRate.solInr).toFixed(4);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const shareText = 
`⚡ *Solana Payment Receipt via Rakshak*
━━━━━━━━━━━━━━━━━━
💰 *Amount Paid:* ₹${state.sendAmountInr.toLocaleString('en-IN')} (${solSent} SOL)
👤 *Paid To:* ${state.selectedContact.name} (${state.selectedContact.handle})
🕒 *Time:* Today at ${timeStr}
⚡ *Network Fee:* ₹0.08 (0.000005 SOL)
⏱️ *Finality:* 398 ms
🛡️ *Status:* Optimistically Confirmed (~400ms) on Solana L1
🔗 *Solscan Verified:* solscan.io/tx/4s8F...9vW1
━━━━━━━━━━━━━━━━━━
_Protected by Rakshak: UPI-Simple Solana_`;

  // Copy to clipboard
  navigator.clipboard.writeText(shareText).then(() => {
    alert('📋 WhatsApp Receipt copied to clipboard! Opening WhatsApp share...');
  }).catch(() => {});

  // Open WhatsApp Web / App
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank');
};
