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
        if (bannerTitle) bannerTitle.textContent = 'Confirmed';
        if (bannerDesc) bannerDesc.textContent = 'Recipient balance credited in ~420ms (slot #289,140,211). Cluster confirmation completed.';
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
🛡️ *Status:* Confirmed on Solana L1 (Slot #289,140,211)
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

// ==========================================================================
// FIGMA INTERACTIVE CANVAS CONTROLLER
// ==========================================================================
window.switchFigmaPage = function(pageNum) {
  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`figtab-${i}`);
    if (btn) btn.classList.toggle('active', i === pageNum);
  }

  const titleEl = document.getElementById('figmaCurrentTitle');
  const dimEl = document.getElementById('figmaCurrentDim');
  const boardEl = document.getElementById('figmaDynamicArtboard');
  if (!boardEl) return;

  if (pageNum === 1) {
    if (titleEl) titleEl.textContent = 'Page 1: Project Canvas & Metadata Cover';
    if (dimEl) dimEl.textContent = '1920 × 1080 px';
    boardEl.innerHTML = `
      <div class="figma-artboard-display">
        <img src="assets/rakshak_figma_cover.svg" alt="Figma 1920x1080 Cover Artboard" class="figma-cover-hero-img">
      </div>
    `;
  } else if (pageNum === 2) {
    if (titleEl) titleEl.textContent = 'Page 2: Problem Summary (400M UPI vs Crypto Anxiety)';
    if (dimEl) dimEl.textContent = '1920 × 1080 px';
    boardEl.innerHTML = `
      <div class="figma-artboard-display" style="padding: 40px; background: #0A0D18;">
        <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <div style="border-left: 4px solid var(--sol-purple); padding-left: 16px;">
            <h4 style="font-size: 26px; font-weight: 800; color: #FFF;">400 Million UPI Users vs 100k Active Solana Wallets</h4>
            <p style="font-size: 14px; color: var(--text-secondary); margin-top: 6px;">Every day in India, 400M citizens execute 13B+ UPI transactions with 0% cognitive friction. When they open Solana wallets, they encounter 3 terrifying friction points.</p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
            <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 24px; margin-bottom: 8px;">😱</div>
              <h5 style="font-size: 14px; font-weight: 700; color: var(--risk-danger);">1. The 44-Char Panic</h5>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Pasting 44-character strings with no avatar, verified badge, or undo capability.</p>
            </div>
            <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 24px; margin-bottom: 8px;">🙈</div>
              <h5 style="font-size: 14px; font-weight: 700; color: var(--risk-amber);">2. Signing Blindness</h5>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Cryptic bytecode instructions causing non-technical users to approve blindfolded.</p>
            </div>
            <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 24px; margin-bottom: 8px;">📉</div>
              <h5 style="font-size: 14px; font-weight: 700; color: var(--sol-cyan);">3. Cryptic Errors</h5>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Error 0x1771 leaving users terrified that their hard-earned money was debited.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (pageNum === 3) {
    if (titleEl) titleEl.textContent = 'Page 3: The 3 Core Feature Frames (Before / After Mobile & Desktop)';
    if (dimEl) dimEl.textContent = '393×852 (Mobile) & 1440×900 (Desktop Side-Panel)';
    boardEl.innerHTML = `
      <div class="figma-artboard-display" style="padding: 24px; background: #0A0D18;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge badge-solana">Pillar 1: Send Flow & 10s Pre-Broadcast Undo Window</span>
              <span style="font-size: 11px; color: var(--text-tertiary);">Mobile (393×852) & Desktop Side Panel</span>
            </div>
            <p style="font-size: 12px; color: var(--text-secondary);">Before: Phantom unverified 44-char paste (Red Callouts 1–4) ➔ After: Verified .sol contacts, ₹10 test transfer, and 10s pre-broadcast buffer ring with 1-tap Cancel (Green Callouts 1–4).</p>
          </div>
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge badge-upi">Pillar 2: Plain-Language Signing & Rakshak Mode</span>
              <span style="font-size: 11px; color: var(--text-tertiary);">Mobile (393×852) & Desktop Side Panel</span>
            </div>
            <p style="font-size: 12px; color: var(--text-secondary);">Before: Bytecode instruction dump ➔ After: Simulated balance delta in INR (1.5 SOL = 296.85 USDC), 4 explicit checks passed, and opt-in Hindi/Hinglish voice readout.</p>
          </div>
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge badge-safe">Pillar 3: Status Pipeline & Honest Fee Transparency</span>
              <span style="font-size: 11px; color: var(--text-tertiary);">Mobile (393×852) & Desktop Side Panel</span>
            </div>
            <p style="font-size: 12px; color: var(--text-secondary);">Before: Vague Error 0x1771 ➔ After: 4-stage validator pipeline with Confirmed status, honest fee disclosure ("No funds moved. A small network fee of ≈ ₹0.08 may apply"), and 1-tap auto-slippage retry.</p>
          </div>
        </div>
      </div>
    `;
  } else if (pageNum === 4) {
    if (titleEl) titleEl.textContent = 'Page 4: Prototype Micro-Interaction State Flows';
    if (dimEl) dimEl.textContent = 'Smart-Animate State Machine';
    boardEl.innerHTML = `
      <div class="figma-artboard-display" style="padding: 30px; background: #0A0D18;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <h5 style="font-size: 14px; font-weight: 700; color: #FFF; margin-bottom: 8px;">⚡ Swipe-To-Pay Interaction Machine</h5>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); line-height: 1.8;">
              State 01: [Idle] Slider pill positioned left<br>
              State 02: [OnDrag] Dynamic spring track fill & haptic pulse<br>
              State 03: [Threshold 90%] Triggers 10s Undo countdown buffer<br>
              State 04: [Buffer Expire / Skip] Broadcast to Solana RPC ➔ Confetti Modal
            </div>
          </div>
          <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <h5 style="font-size: 14px; font-weight: 700; color: #FFF; margin-bottom: 8px;">🛡️ Rakshak Audio & Scam Shield State</h5>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); line-height: 1.8;">
              State 01: [Language Select] EN / Hinglish / Hindi toggle<br>
              State 02: [Tap to Listen] Device Web Speech synthesis with waveform chime<br>
              State 03: [Threat Detected] Phone chassis pulses red aura<br>
              State 04: [Scam Shield CTA] "Don't Proceed (Recommended)" takes primary focus
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (pageNum === 5) {
    if (titleEl) titleEl.textContent = 'Page 5: Unified Mini Design System Tokens';
    if (dimEl) dimEl.textContent = 'Strict Color & Typography Tokens';
    boardEl.innerHTML = `
      <div class="figma-artboard-display" style="padding: 24px; background: #0A0D18;">
        <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px;">1. Strict Risk Color Set</div>
        <div class="figma-tokens-grid">
          <div class="token-swatch-card">
            <div class="swatch-color-bar" style="background: #00F08B;"></div>
            <div class="swatch-meta">
              <h6>Safe / Verified / Trust</h6>
              <p>#00F08B • Background: 12% • Border: 35%</p>
            </div>
          </div>
          <div class="token-swatch-card">
            <div class="swatch-color-bar" style="background: #FFB800;"></div>
            <div class="swatch-meta">
              <h6>Warning / Caution / Slippage</h6>
              <p>#FFB800 • Background: 12% • Border: 30%</p>
            </div>
          </div>
          <div class="token-swatch-card">
            <div class="swatch-color-bar" style="background: #FF3B69;"></div>
            <div class="swatch-meta">
              <h6>Danger / Drainer Threat</h6>
              <p>#FF3B69 • Background: 15% • Border: 40%</p>
            </div>
          </div>
        </div>

        <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-top: 24px; margin-bottom: 12px;">2. Unified Typography Scale</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 18px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;">Display Bold</div>
            <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">Plus Jakarta Sans • 72px / 32px / 24px</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 15px; font-weight: 500; font-family: 'Inter', sans-serif;">Body Medium</div>
            <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">Inter • 14px / 13px / 12px</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 13px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--sol-emerald);">Mono Data 0x1771</div>
            <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">JetBrains Mono • 13px / 11px</div>
          </div>
        </div>

        <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-top: 24px; margin-bottom: 8px;">3. Unified Iconography Style</div>
        <p style="font-size: 12px; color: var(--text-secondary);">All icons strictly styled as 20px rounded stroke geometry (1.75px stroke width, Phosphor / Feather geometry) for visual calm.</p>
      </div>
    `;
  }
};

window.copyFigmaSvgCode = function() {
  fetch('assets/rakshak_figma_cover.svg')
    .then(res => res.text())
    .then(svgText => {
      navigator.clipboard.writeText(svgText).then(() => {
        alert('📋 Official Figma Cover SVG copied to clipboard! You can paste it directly into any Figma canvas.');
      });
    })
    .catch(() => {
      alert('Official Figma Cover SVG ready in assets/rakshak_figma_cover.svg');
    });
};

// ==========================================================================
// EDGE STATES SIMULATOR CONTROLLER
// ==========================================================================
window.setEdgeState = function(stateType, chipEl) {
  const chips = document.querySelectorAll('.edge-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');

  const phone = document.getElementById('phoneMockup');

  if (stateType === 'compact_screen') {
    if (phone) phone.classList.toggle('compact-viewport');
    return;
  } else {
    if (phone) phone.classList.remove('compact-viewport');
  }

  if (stateType === 'normal') {
    state.selectedContact = BOUNTY_DATA.contacts[0];
    state.sendAmountInr = 1000;
    renderSendForm();
    alert('Reset to Standard Normal State: Rahul Sharma (1.50 SOL balance)');
  } else if (stateType === 'error_gas') {
    state.sendAmountInr = 25000;
    const warning = document.createElement('div');
    warning.id = 'gasErrorToast';
    warning.style.cssText = 'background: rgba(255, 59, 105, 0.15); border: 1px solid var(--risk-danger); color: #FFF; padding: 10px; border-radius: 8px; font-size: 11px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;';
    warning.innerHTML = '<span>⚠️ Insufficient SOL for network fee (0.000005 SOL needed).</span> <button class="btn btn-secondary" style="padding: 2px 6px; font-size: 10px;" onclick="this.parentElement.remove()">Add ₹50</button>';
    const form = document.querySelector('.send-form-card');
    if (form && !document.getElementById('gasErrorToast')) {
      form.prepend(warning);
    }
  } else if (stateType === 'empty_wallet') {
    const list = document.getElementById('contactsScroll');
    if (list) {
      list.innerHTML = '<div style="font-size: 12px; color: var(--text-tertiary); padding: 12px; width: 100%; text-align: center;">📭 No recent contacts found. Search .sol or scan QR to get started.</div>';
    }
    const bal = document.getElementById('walletBalanceInr');
    if (bal) bal.textContent = '₹0';
  } else if (stateType === 'long_name') {
    state.selectedContact = {
      name: "Siddharth Narayanaswamy Long Name",
      handle: "siddharth-narayanaswamy-very-long-name.sol",
      avatar: "👨🏽‍🎓",
      safetyRating: "verified",
      isFirstTime: true
    };
    renderSendForm();
  }
};

// ==========================================================================
// 60-SECOND GUIDED DEMO TOUR CONTROLLER
// ==========================================================================
let currentTourStep = 1;

window.start60sTour = function() {
  currentTourStep = 1;
  const modal = document.getElementById('tourModalBackdrop');
  if (modal) modal.classList.add('active');
  renderTourStep(1);
};

window.close60sTour = function() {
  const modal = document.getElementById('tourModalBackdrop');
  if (modal) modal.classList.remove('active');
};

window.nextTourStep = function() {
  if (currentTourStep < 4) {
    currentTourStep++;
    renderTourStep(currentTourStep);
  } else {
    window.close60sTour();
    alert('🎉 60-second walkthrough complete! You can now freely interact with the prototype.');
  }
};

window.prevTourStep = function() {
  if (currentTourStep > 1) {
    currentTourStep--;
    renderTourStep(currentTourStep);
  }
};

function renderTourStep(step) {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`tdot-${i}`);
    if (dot) dot.classList.toggle('active', i === step);
  }

  const tag = document.getElementById('tourStepTag');
  const title = document.getElementById('tourStepTitle');
  const desc = document.getElementById('tourStepDesc');
  const visual = document.getElementById('tourStepVisual');
  const nextBtn = document.getElementById('tourNextBtn');
  const prevBtn = document.getElementById('tourPrevBtn');

  if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';

  if (step === 1) {
    switchFeature('send');
    if (tag) tag.textContent = 'Step 1 of 4 • 0:00–0:15';
    if (title) title.textContent = 'The Problem: 44-Character Hash Panic';
    if (desc) desc.textContent = 'In India, 400M+ people use UPI with verified names and bank ticks. Pasting 44-character strings like 9wFF...7xK2 in Phantom feels like firing a missile blindfolded into the dark.';
    if (visual) visual.innerHTML = '<strong>Legacy Phantom Flaw:</strong> Raw bytecode instruction dump, unverified recipient, and zero undo window once approved.';
    if (nextBtn) nextBtn.textContent = 'Next: Send + Undo →';
  } else if (step === 2) {
    switchFeature('send');
    if (tag) tag.textContent = 'Step 2 of 4 • 0:15–0:30';
    if (title) title.textContent = 'Pillar 1: Send + 10s Pre-Broadcast Undo Window';
    if (desc) desc.textContent = 'Rakshak introduces verified .sol contact cards, a ₹10 test micro-transfer, and a 10-second client-side buffer pause with an animated countdown ring and prominent Cancel button.';
    if (visual) visual.innerHTML = '<strong>The Innovation:</strong> A local holding queue gives users a real safety buffer to catch mistakes before irreversible on-chain broadcast.';
    if (nextBtn) nextBtn.textContent = 'Next: Rakshak Signing →';
  } else if (step === 3) {
    switchFeature('signing');
    if (tag) tag.textContent = 'Step 3 of 4 • 0:30–0:45';
    if (title) title.textContent = 'Pillar 2: Plain-Language Signing & Rakshak Mode';
    if (desc) desc.textContent = 'Approvals show plain Give/Get Rupee breakdown (1.50 SOL = 296.85 USDC). Rakshak Mode adds a Hindi/Hinglish copy toggle and opt-in voice readout (🔊 Suniye) to eliminate signing blindness.';
    if (visual) visual.innerHTML = '<strong>4 Explicit Checks Passed:</strong> Raydium AMM verified • Circle USDC Mint • Exact Simulated Balance • Zero Malicious Delegations.';
    if (nextBtn) nextBtn.textContent = 'Next: Status & Recovery →';
  } else if (step === 4) {
    switchFeature('status');
    if (tag) tag.textContent = 'Step 4 of 4 • 0:45–1:00';
    if (title) title.textContent = 'Pillar 3: Confirmed Status, Honest Fee & WhatsApp Receipt';
    if (desc) desc.textContent = '4-step validator pipeline shows Confirmed in ~400ms. On failure, it transparently discloses that principal never moved (noting ~₹0.08 compute fee), paired with a 1-tap auto-slippage retry and shareable WhatsApp receipt.';
    if (visual) visual.innerHTML = '<strong>Result:</strong> Zero panic, complete fee transparency, and an intuitive experience tailored for the next 100M Indian users.';
    if (nextBtn) nextBtn.textContent = 'Finish Tour 🚀';
  }
}

