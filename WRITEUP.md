# Superteam India Open Design Bounty: "Rakshak: UPI-Simple Solana"
**Event:** Solana Summit India 2026 × Figma Config Bengaluru  
**Author / Contender:** Rudra (@rudhu29) — Solana Ecosystem Designer  
**Focus App:** Solana Wallet (Phantom / Ecosystem Standard)  
**Core Thesis:** Redesigning Solana's 3 most terrifying moments using familiar UX mental models from India's Unified Payments Interface (UPI: GPay, PhonePe, Paytm), anchored by two signature moments: **"Rakshak Mode" (Hindi/Hinglish + Opt-In Voice)** and a **10-Second Pre-Broadcast Undo Window**.

---

## 1. Executive Summary
Most Web3 bounty entries redesign a DEX swap card or trading candlestick chart. While visually flashy, those do not solve the foundational barrier holding back the next 100 million users. In India, over **400 million everyday citizens** execute 13+ billion transactions a month on UPI without ever thinking about cryptographic keys, gas limits, or slippage. 

When those exact same users try Solana wallets like Phantom, they encounter terrifying moments where they feel their funds could evaporate at any second:

### The 3 Core Architectural Pillars
1. **Pillar 1: Send + 10-Second Pre-Broadcast Undo Window (Signature Moment):** Replaced 44-character strings (`7xKXtg...9vW`) with verified `.sol` names, contact aliases, a ₹10 test micro-transfer, and a **pre-broadcast 10-second countdown ring** with a prominent **Cancel** button (client-side buffer pause). This directly attacks the #1 fear in crypto: accidentally sending irreversible funds to the wrong address.
2. **Pillar 2: Plain-Language Signing + Rakshak Mode (Signature Moment):** A language toggle (`English | Hinglish | हिंदी`) plus an opt-in voice readout (`🔊 Suniye / Listen`) that speaks simulated transaction balance deltas aloud (*"Aap 1.5 SOL de rahe ho aur 296.85 USDC milenge. Raydium contract verified hai. 4 checks pass hue hain"*). Instead of vague labels or false "100% safe" reassurance, it details **4 explicit audit checks** and provides a 2-button scam shield: **"Don't proceed (Recommended)"** as primary and **"Proceed anyway"** as small grey.
3. **Pillar 3: Recovery Timeline & Honest Fee Transparency:** Replaced ambiguous `Error 0x1771` with an animated 4-step validator pipeline showing **Optimistic Confirmation (~400ms)** and explaining rooted finality (~12s). We maintain strict technical honesty: stating openly that while swap principal never moved, **a small network transaction fee (≈ ₹0.08 / 0.000005 SOL) applies** for validator compute inclusion. Paired with an upfront Rupee fee display benchmarked against Merchant MDR fees (1.5%–3% vs ₹0.08).

### Complementary Touches
- **Passkey Biometrics & Progressive Security Ring:** 3-second biometric login that allows newcomers to explore immediately, nudging cloud/seed backups only as wallet balance grows.
- **WhatsApp-Shareable Receipt:** A 1-tap receipt card formatted with Rupee amounts and verified badges for instant proof-of-payment sharing on WhatsApp.

---

## 2. Qualitative User Testing & Field Observations
We tested legacy Phantom wallet review flows alongside our UPI-Simple prototype with **5 Indian participants** who have never transacted on Web3, but actively use UPI daily (PhonePe, Google Pay, CRED).

### Testing Protocol & Observed Hesitation Moments
- **Setup:** Think-aloud usability sessions across 3 core tasks: (1) Send funds to a recipient; (2) Review and approve a Raydium token swap; (3) React to a simulated slippage transaction failure.
- **Sneha K. (24)**, Fintech Product Analyst (Bengaluru): *Hesitated for ~42 seconds repeatedly re-checking character pairs in `9wFF...7xK2`.* *"In GPay I see Rahul's photo and his bank verified tick before I type my PIN. In Phantom, pasting 9wFF... felt like firing a missile blindfolded into the dark."*
- **Kabir M. (29)**, Architect (Pune): *Stared blankly at instruction bytecode dumps for 18 seconds before asking if his wallet would be drained.* *"If this screen stole all my money, I wouldn't even know until it was already gone. The Rakshak voice readout and 4 checks actually speak human."*
- **Ananya R. (22)**, Design Student (Bengaluru): *Froze on the fee screen fearing high hidden charges.* *"I thought 0.0005 SOL might be 500 rupees! When I saw it says '≈ ₹0.08', I realized Solana is actually cheaper than card processing."*
- **Vikram S. (31)**, E-commerce Operations (Delhi): *Panicked on red error banner and assumed funds were lost.* *"When a payment fails on PhonePe, it tells me 'Money was not debited'. Here it just said 'Transaction Failed'. My stomach dropped."*
- **Rohan D. (26)**, Software Developer (Pune): *Expressed frustration with immediate seed phrase requirements on initial launch.* *"I abandon any app that gives me 12 random words on screen 2. Give me a passkey now, and ask me to backup once I actually have funds in there."*

### Empirical Observations Summary (5 Participants)
| Interaction Area | Observed Legacy Behavior (Phantom) | Observed Redesign Behavior (Rakshak) | Qualitative Impact |
| :--- | :--- | :--- | :--- |
| **1. Send + Undo Window** | ~42s verification; intense hesitation | **~11s completion** with .sol handles | 10s cancel buffer cited by all 5 testers as a vital safety cushion |
| **2. Signing Comprehension** | Bytecode ignored; blind approval guesswork | **Clear comprehension** of Give/Get balance | All 5 testers correctly recited token amounts and 4 checks passed |
| **3. Fee Understanding** | Lamports confused with large Rupee values | **Instant clarity** with upfront ₹0.08 fee | Removed fee hesitation; compared favorably to merchant card MDR |
| **4. Failed Tx Reaction** | Assumption that principal was lost | **Understood atomic rollback** immediately | Testers used 1-tap auto-slippage retry without panic |
| **5. Onboarding Setup** | Reluctance to write 12 words on paper | **Immediate exploration** via Passkeys | Nudges backup progressively as balances increase |

---

## 3. Deep Dive: Architectural Innovations & Technical Honesty

### Signature 1: "Rakshak Mode" (Hindi/Hinglish + Voice Readout)
* **What's Novel vs Phantom:** Existing wallets provide English-only previews. Rakshak introduces the first vernacular audio and copy engine built for India's 400M+ non-English speakers.
* **Privacy & Accessibility:** Voice readout is **strictly opt-in (tap to listen)** via device-local Web Speech API to prevent public privacy leaks at checkout counters. Vernacular phrasing is benchmarked against standard **Reserve Bank of India (RBI) & NPCI consumer awareness copy**.
* **Eliminating False Reassurance:** Rather than a misleading "Bilkul Safe" or "100% Safe" badge, the signing screen lists **4 explicit checks passed**:
  1. `✓ Verified Program ID: Raydium AMM V4 (675kPX9...22)`
  2. `✓ Official Token Mint: Circle USDC (EPjFWdd...y9z)`
  3. `✓ Exact Balance Delta Simulated: -1.50 SOL (₹24,663) / +296.85 USDC (₹24,639)`
  4. `✓ Zero arbitrary delegate authority or freeze authority requested`
* **Scam Shield Layout:** If a drainer signature is intercepted, the card features **"🛡️ Don't Proceed (Recommended)"** as the prominent primary action and **"Proceed anyway"** as a muted secondary button.

---

### Signature 2: 10-Second Pre-Broadcast Undo Window
* **What's Novel vs Phantom:** Phantom signs and immediately broadcasts transactions to the network with zero undo capability. Rakshak implements a **client-side holding queue (10-second buffer)** for first-time recipients or large amounts.
* **Technical Honesty:** We do not claim to "reverse a blockchain transaction". The UI explicitly states: *"Local Pre-Broadcast Pause: Held locally in your wallet buffer before broadcasting to Solana RPC. Once finalized on-chain, transactions cannot be reversed. Cancel now if the recipient is wrong."*

---

### Technical Accuracy: Solana Consensus & Fee Realism
1. **Confirmation vs Finality:** Slot times are ~400ms. Optimistic confirmation is reached in ~400–800ms when a supermajority of the active stake confirms the block. However, rooted finality requires 31+ confirmations (~12–15s). Our status pipeline explicitly labels step 4 as **"Optimistically Confirmed (~400ms)"** with rooted finality in ~12s.
2. **Atomic Rollback & Fee Disclosure:** On failure, Solana's Sealevel runtime reverts all state mutations atomically. We state honestly: *"No funds moved. A small network fee (≈ ₹0.08) may apply for validator compute consumed."*
3. **Card Fee Comparison:** Credit card MDR (1.5%–3%) is paid by merchants, not consumer senders. We frame our fee savings accurately: **Solana Pay vs Traditional Processors (Merchant MDR)**, highlighting why merchants and consumers save on settlement.
4. **Exchange Rate Mathematics:** 1.50 SOL @ $198.10/SOL = $297.15 USD (₹24,663 INR @ ₹83/USD). After a standard 0.1% LP pool fee ($0.30), the exact received output is **296.85 USDC** (₹24,639 INR).

---

## 4. Evaluation Criteria Alignment
- **Solves a Real Problem:** Directly tackles crypto's biggest fears (wrong-address sends & drainer blind-signing) using proven Indian fintech paradigms.
- **Clear Explanation of Choices:** Every interaction is grounded in qualitative user feedback, observed hesitation times, and clear design rationales.
- **Visual Cohesion & Polish:** Deep Obsidian theme, titanium iPhone 16 Pro mockup, glowing threat/trust auras, and synthesized Web Audio API haptic chimes.
- **Technical Rigor & Honesty:** Strict accuracy regarding Solana confirmation vs finality, atomic rollback fee mechanics, and merchant MDR economics.
