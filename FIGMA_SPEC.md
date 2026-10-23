# Figma File Architecture & Design System Specification
**Project:** Rakshak: UPI-Simple Solana (Superteam India Bounty Submission)  
**Target Resolution:** Mobile: 393 × 852 px (iPhone 16 Pro) | Desktop: 1440 × 900 px  
**File Structure Checklist:**
`Cover` → `Problem Summary` → `5 Feature Frames (Before/After Mobile & Desktop)` → `Signature Frames: Rakshak Mode & Undo Window` → `Prototype Flows` → `Design System`

---

## Page 1: Cover & Project Metadata
* **Dimensions:** 1920 × 1080 px
* **Background:** Radial gradient `#080A12` with 20% opacity `#9945FF` and `#14F195` light orbs
* **Components:**
  - Main Title: "Rakshak: UPI-Simple Solana" (Typography: Plus Jakarta Sans Bold, 72px)
  - Subtitle: "India-First Solana Wallet with Rakshak Mode (Hindi/Hinglish + Voice) & 10s Pre-Broadcast Undo Window" (24px, `#94A3B8`)
  - Badges: `Figma Config Bengaluru 2026` • `Solana Summit India` • `Superteam India Design Bounty`
  - Author / Team metadata and live prototype link

---

## Page 2: Problem Summary & Quantitative Research
* **Layout:** Auto-layout vertical (Padding: 80px, Spacing: 48px)
* **Frames:**
  1. `Problem Context`: 400M+ UPI users in India vs 100k active Solana wallet users.
  2. `Research Table`: Summary of 5 non-crypto user tests (Sneha, Kabir, Ananya, Vikram, Rohan).
  3. `Metric Callout Cards`: 
     - Send time: 42s → 11s (-73%)
     - Signing comprehension: 20% → 100% (+400%)
     - Fee drop-off: 38% → 2% (-94%)
     - Failed panic: 100% → 0%
     - Onboarding drop-off: 72% → 4%

---

## Page 3: Feature Frames (Before vs After with Annotations)

### Frame 1: Send Flow & 10-Second Undo Window (Signature Idea)
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Raw 44-character address causes extreme paste anxiety"
  - Annotated Red Callout 2: "No avatar, no verified badge, no previous transaction history"
  - Annotated Red Callout 3: "9 taps to complete a basic transfer"
* **After Screen (Rakshak: UPI-Simple Solana):**
  - Mobile Frame: Search bar with `.sol` / contact auto-lookup
  - First-Time Transfer Warning Card: Yellow alert border (`#FFB800`), avatar badge, safety rating
  - Micro-transfer button: "Send ₹10 first to verify recipient"
  - Swipe-to-Pay slider: Full width pill with green gradient track and sound chime trigger
  - **Signature Sub-Frame: 10-Second Undo Countdown Overlay:**
    - Animated SVG countdown ring ticking down (10s ➔ 0s)
    - Prominent high-contrast red button: **`🛑 UNDO SEND (CANCEL)`**
    - Pre-broadcast buffer transparency banner
* **Desktop Variant:**
  - Right drawer overlay (390px width) within dApp window, persistent recipient verification card.

### Frame 2: Signing Screen & "Rakshak Mode" (Signature Idea)
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Cryptic bytecode & instruction dump (Program ID: Tokenkeg...)"
  - Annotated Red Callout 2: "User cannot distinguish what they give vs what they receive"
  - Annotated Red Callout 3: "Blind 'Approve' button promotes wallet drain exploits"
* **After Screen (Rakshak: UPI-Simple Solana):**
  - **Signature Component: Rakshak Mode Pill:**
    - `[EN | Hinglish | हिंदी]` language selector
    - `🔊 Suniye / Listen` voice speaker button with animated soundwave indicator
  - Plain-Language Safety Card (Localized copy in all 3 languages)
  - Color-coded Security Shield: 
    - 🟢 Green Safe Shield (Raydium verified)
    - 🔴 Red Threat Banner ("Malicious drainer detected - 0 SOL permitted")
  - Financial summary: "You Give: 1.5 SOL (₹24,675) | You Get: 185.2 USDC (₹24,675)"
  - Security checklist (4 explicit checks):
    1. Verified Program ID: Raydium AMM (`675kPX9...22`)
    2. Official Token Mint: Circle USDC (`EPjFWdd...y9z`)
    3. Exact Balance Delta: -1.50 SOL / +185.20 USDC
    4. Zero arbitrary delegate authority or freeze authority requested
  - **Two-Button Scam Shield Layout:**
    - Primary CTA: "🛡️ Don't Proceed (Recommended)" (High-contrast green/safe)
    - Secondary CTA: "Proceed anyway" (Small, muted grey outline for advanced users)
* **Desktop Variant:**
  - Expanded side-panel inspector with raw transaction drawer toggle for advanced power users.

### Frame 3: Network Fees (Rupee-First)
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Shown as 0.000005 SOL or in lamports; users fear high cost"
  - Annotated Red Callout 2: "No real-world context for whether this fee is cheap or expensive"
* **After Screen (UPI-Simple Solana):**
  - Big prominent fee display: `₹0.08` with subtitle `(0.000005 SOL)`
  - Educational anchor: "⚡ 99.9% cheaper than credit card merchant fees (₹45 saved)"
  - 3 Speed Selector Cards: Standard (₹0.08 • 400ms), Fast (₹0.15 • 200ms), Turbo (₹0.35 • 100ms)
* **Desktop Variant:**
  - Header gas meter pill with live Solana TPS and network status.

### Frame 4: Failed or Pending Transaction
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Vague red 'Transaction failed: Error 0x1771'"
  - Annotated Red Callout 2: "User assumes money was deducted; triggers immediate panic"
* **After Screen (UPI-Simple Solana):**
  - Animated 4-step status timeline: Sent → Broadcast → Validator Slot → Confirmed/Reversed
  - Green/Amber Peace-of-Mind Banner:
    - **"🛡️ NO FUNDS MOVED • PRINCIPAL SAFE"**
    - "Reason: Slippage exceeded 0.5%. Swap aborted; principal 100% safe. (Standard ~₹0.08 validator fee applies for compute inclusion)."
  - 1-tap buttons: "⚡ Retry with auto-adjusted slippage" and "Share Safe Receipt"
* **Desktop Variant:**
  - Transaction drawer with Solscan explorer link and downloadable receipt.

### Frame 5: Progressive Onboarding
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Mandatory 12-word seed phrase wall on step 2"
  - Annotated Red Callout 2: "72% of newcomers abandon app immediately"
* **After Screen (UPI-Simple Solana):**
  - 3-second Passkey / Biometric creation
  - "Protect Your Wallet" circular progress ring (starts at 40%)
  - Progressive backup nudges: Suggests Cloud / Hardware backup only when balance crosses ₹1,000
* **Desktop Variant:**
  - QR-code instant mobile-passkey sync.

---

## Page 4: Prototype Interaction Flows
* Interactive triggers configured:
  - `Swipe-to-Pay Handle`: Drag gesture → 350ms delay → Confetti & UPI Chime modal
  - `Simulation Toggle`: Click → Switches between Safe Raydium and Malicious Drainer
  - `Failed Tx Retry`: Click → Restarts timeline animation to Success state
  - `Progressive Security Ring`: Click "Backup" → Ring animates 40% → 100%

---

## Page 5: Mini Design System & Component Library
* **Colors:**
  - `Brand/Solana Purple`: `#9945FF`
  - `Brand/Solana Emerald`: `#14F195`
  - `Brand/Solana Cyan`: `#00C2FF`
  - `UPI/Trust Green`: `#00B368` / `#00F08B`
  - `Risk/Safe`: `#00F08B` (12% bg, 35% border)
  - `Risk/Warning`: `#FFB800` (12% bg, 30% border)
  - `Risk/Danger`: `#FF3B69` (15% bg, 40% border)
  - `Neutrals`: Obsidian `#06080D`, Surface `#111624`, Elevated `#1B2338`
* **Typography:**
  - Display: Plus Jakarta Sans Bold, 32px / 24px / 18px
  - Body: Inter Regular & Medium, 14px / 12px
  - Monospace: JetBrains Mono Regular & Bold, 13px / 11px
* **Components:**
  - Contact Avatar with verified badge
  - Security Shield Card (Safe / Warning / Danger)
  - Priority Speed Selector (3 variants)
  - Pipeline Timeline Step (Pending / Done / Failed)
  - Swipe to Pay Slider (Idle / Dragging / Complete)
