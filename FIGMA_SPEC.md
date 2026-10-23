# Figma File Architecture & Design System Specification
**Project:** Rakshak: UPI-Simple Solana (Superteam India Bounty Submission)  
**Author / Contender:** Rudra (@rudhu29) — Solana Ecosystem Designer  
**Target Resolution:** Mobile: 393 × 852 px (iPhone 16 Pro) | Desktop: 1440 × 900 px  
**File Structure Checklist:**
`Cover` → `Problem Summary & Qualitative Research` → `3 Core Pillars + Secondary Touches (Before/After Mobile & Desktop)` → `Signature Frames: Rakshak Mode & Undo Window` → `Prototype Flows` → `Design System Tokens`

---

## Page 1: Cover & Project Metadata
* **Dimensions:** 1920 × 1080 px
* **Background:** Radial gradient `#080A12` with 20% opacity `#9945FF` and `#14F195` light orbs
* **Components:**
  - Main Title: "Rakshak: UPI-Simple Solana" (Typography: Plus Jakarta Sans Bold, 72px)
  - Subtitle: "India-First Solana Wallet with Rakshak Mode (Hindi/Hinglish + Voice) & 10s Pre-Broadcast Undo Window" (24px, `#94A3B8`)
  - Badges: `Figma Config Bengaluru 2026` • `Solana Summit India` • `Superteam India Design Bounty`
  - Author: Rudra (@rudhu29)
  - Live Prototype: `https://solana-upi-redesign.vercel.app`
  - GitHub Repository: `https://github.com/rudhu29/Solana_App`

---

## Page 2: Problem Summary & Qualitative Research
* **Layout:** Auto-layout vertical (Padding: 80px, Spacing: 48px)
* **Frames:**
  1. `Problem Context`: 400M+ UPI users in India executing 13B+ monthly transactions vs standard crypto wallets with steep friction.
  2. `Research Table`: Summary of 5 non-crypto Indian UPI daily users (Sneha in Bengaluru, Kabir in Pune, Ananya in Bengaluru, Vikram in Delhi, Rohan in Pune).
  3. `Empirical UX Findings Cards`: 
     - Send time: ~42s verification hesitation → ~11s completion with .sol contacts
     - Comprehension: Raw bytecode guessing → 4 explicit safety audit checks passed
     - Fee understanding: Lamports confusion → Instant clarity with upfront ₹0.08 Rupee display
     - Failure recovery: Assumption of lost funds → Clear understanding of atomic rollback + 1-tap retry

---

## Page 3: Feature Frames (Before vs After with Annotations)

### Pillar 1: Send Flow & 10-Second Pre-Broadcast Undo Window (Signature Idea)
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Raw 44-character address (`7xKXtg...sAsU`) causes extreme paste anxiety"
  - Annotated Red Callout 2: "No avatar, no verified badge, no previous transaction history"
  - Annotated Red Callout 3: "Immediate irreversible broadcast to RPC with zero cancellation pause"
* **After Screen (Rakshak: UPI-Simple Solana):**
  - Mobile Frame: Search bar with `.sol` / contact auto-lookup
  - First-Time Recipient Alert: Yellow alert border (`#FFB800`), avatar badge, safety rating
  - Micro-transfer option: "Send ₹10 first to verify recipient"
  - Swipe-to-Pay slider: Full width pill with green gradient track and sound chime trigger
  - **Signature Sub-Frame: 10-Second Undo Countdown Overlay:**
    - Animated SVG countdown ring ticking down (10s ➔ 0s)
    - Prominent high-contrast red button: **`🛑 UNDO SEND (CANCEL)`**
    - Client-side holding queue buffer transparency disclosure
* **Desktop Variant:**
  - Right drawer overlay (390px width) within dApp window, persistent recipient verification card.

### Pillar 2: Signing Screen & "Rakshak Mode" (Signature Idea)
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
    - 🟢 Green Safe Shield (4 Checks Passed)
    - 🔴 Red Threat Banner ("Malicious drainer intercepted - 0 SOL permitted")
  - Financial summary: "You Give: 1.50 SOL (≈ ₹24,663 INR) | You Receive: 296.85 USDC (≈ ₹24,639 INR)"
  - Security checklist (4 explicit checks):
    1. Verified Program ID: Raydium AMM V4 (`675kPX9...22`)
    2. Official Token Mint: Circle USDC (`EPjFWdd...y9z`)
    3. Exact Balance Delta: -1.50 SOL / +296.85 USDC
    4. Zero arbitrary delegate authority or freeze authority requested
  - **Two-Button Scam Shield Layout:**
    - Primary CTA: "🛡️ Don't Proceed (Recommended)" (High-contrast green/safe)
    - Secondary CTA: "Proceed anyway" (Small, muted grey outline for advanced users)
* **Desktop Variant:**
  - Expanded side-panel inspector with raw transaction drawer toggle for advanced power users.

### Pillar 3: Status Pipeline, Atomic Rollback & Fee Transparency
* **Before Screen (Phantom Legacy):**
  - Annotated Red Callout 1: "Vague red 'Transaction failed: Error 0x1771'"
  - Annotated Red Callout 2: "User assumes ₹25,000 vanished; triggers panic"
  - Annotated Red Callout 3: "Fee shown in lamports (0.000005 SOL) with no Rupee reference"
* **After Screen (UPI-Simple Solana):**
  - Big prominent fee display: `₹0.08` with subtitle `(0.000005 SOL)`
  - Educational comparison: "Solana vs Bank Transfer (IMPS) Fees (₹2–₹5 IMPS vs ₹0.08 Solana settlement)"
  - Animated 4-step status timeline: Sent (0.08s) → Broadcast (0.22s) → Validator Slot (0.39s) → Confirmed (~400ms)
  - Honest Peace-of-Mind Guarantee:
    - **"🛡️ NO FUNDS MOVED • PRINCIPAL SAFE"**
    - "Solana transactions are strictly atomic. No funds moved. A small network fee (≈ ₹0.08) may apply for validator compute consumed."
  - 1-tap recovery: "⚡ 1-Tap Retry with Auto-Adjusted Slippage (0.8%)"
* **Desktop Variant:**
  - Transaction drawer with Solscan explorer link and downloadable receipt.

### Secondary Touches: Onboarding & WhatsApp Receipts
* **Passkey Biometrics:** 3-second biometric login with progressive "Protect Your Wallet" circular progress ring (starts at 40%, nudging cloud backup as balance grows).
* **WhatsApp-Shareable Receipt:** 1-tap receipt card formatted with Rupee amounts and verified badges for instant proof-of-payment sharing.

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
