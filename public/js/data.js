/**
 * Rakshak: UPI-Simple Solana - Research Data & Constants
 */
const BOUNTY_DATA = {
  conceptTitle: "Rakshak: UPI-Simple Solana",
  subtitle: "India-First Solana Wallet with 'Rakshak Mode' (Hindi/Hinglish + Voice) & 10-Second Pre-Broadcast Undo Window for 400M+ UPI Users",
  event: "Solana Summit India 2026 × Figma Config Bengaluru",
  author: "Rudra (@rudhu29)",
  
  // Multilingual Rakshak Mode Audio & Text Translations
  translations: {
    en: {
      langName: "English",
      signingSafeTitle: "4 Safety Checks Passed",
      signingSafeDesc: "Raydium Liquidity Pool V4 • 0 malicious signatures detected",
      signingSafeSpeech: "You are giving 1.5 SOL and receiving 296.85 USDC on Raydium. 4 safety checks passed. Zero malicious signatures detected.",
      signingDrainerTitle: "DANGER: Wallet Drainer Detected",
      signingDrainerDesc: "Malicious program requests total authority over your SOL balance.",
      signingDrainerSpeech: "Warning! Malicious wallet drainer detected. This contract will steal all your SOL. Do not approve.",
      failedTxTitle: "🛡️ NO FUNDS MOVED • PRINCIPAL SAFE",
      failedTxDesc: "Swap aborted due to price slippage. No funds moved. A small network fee (≈ ₹0.08) may apply.",
      failedTxSpeech: "No funds moved. Your 1.5 SOL is safe in your wallet. The swap was aborted before execution. A small network fee of eight paise may apply.",
      undoTitle: "10-Second Undo Window",
      undoDesc: "Queued locally in wallet buffer before blockchain broadcast. Tap Cancel if you made a mistake.",
      listenBtn: "🔊 Read Aloud",
      youGiveLbl: "YOU GIVE (DEDUCTION)",
      youGetLbl: "YOU RECEIVE (CREDIT)"
    },
    hinglish: {
      langName: "Hinglish",
      signingSafeTitle: "4 Safety Checks Verified",
      signingSafeDesc: "Raydium Liquidity Pool V4 • 4 automated checks pass ho gaye hain",
      signingSafeSpeech: "Aap 1.5 SOL de rahe ho aur 296.85 USDC milenge Raydium par. 4 safety checks pass ho gaye hain. Zero scam flags.",
      signingDrainerTitle: "KHATRA: Scam Wallet Drainer Mila",
      signingDrainerDesc: "Yeh contract aapka poora SOL balance chori karne ki permission maang raha hai.",
      signingDrainerSpeech: "Khatra! Yeh scam wallet drainer hai. Agar approve kiya toh aapka poora SOL balance chori ho jayega. Turant reject karein.",
      failedTxTitle: "🛡️ FUNDS SAFE • PRINCIPAL SAFE",
      failedTxDesc: "Slippage exceed hone par swap cancel ho gaya. Koi fund transfer nahi hua. Small network fee (≈ ₹0.08) apply ho sakti hai.",
      failedTxSpeech: "Koi fund move nahi hua. Swap cancel ho gaya hai. Sirf aath paise network fee lag sakti hai.",
      undoTitle: "10-Second Undo Window",
      undoDesc: "Broadcast se pehle local buffer pause. Agar galat person ko bheja hai toh turant Cancel dabayein.",
      listenBtn: "🔊 Suniye (Listen)",
      youGiveLbl: "AAP DE RAHE HO (DEDUCT)",
      youGetLbl: "AAPKO MIL RAHA HAI (CREDIT)"
    },
    hi: {
      langName: "हिंदी",
      signingSafeTitle: "4 सुरक्षा सत्यापन सफल",
      signingSafeDesc: "Raydium तरलता पूल V4 • शून्य संदिग्ध गतिविधियाँ",
      signingSafeSpeech: "आप 1.5 SOL दे रहे हैं और Raydium पर 296.85 USDC प्राप्त कर रहे हैं। 4 सुरक्षा सत्यापन सफल हुए हैं।",
      signingDrainerTitle: "खतरा: वॉलेट ड्रेनर स्कैम मिला",
      signingDrainerDesc: "दुर्भावनापूर्ण प्रोग्राम आपके पूरे SOL बैलेंस की अनुमति मांग रहा है।",
      signingDrainerSpeech: "सावधान! यह एक फर्जी वॉलेट ड्रेनर है। इसे मंज़ूर न करें, अन्यथा आपका पूरा बैलेंस चोरी हो जाएगा।",
      failedTxTitle: "🛡️ कोई फंड नहीं कटा • मूलधन सुरक्षित",
      failedTxDesc: "स्लिपेज सीमा पार होने पर लेन-देन रद्द हुआ। कोई राशि नहीं कटी। केवल ₹0.08 नेटवर्क शुल्क लागू हो सकता है।",
      failedTxSpeech: "कोई फंड ट्रांसफर नहीं हुआ। लेन-देन रद्द कर दिया गया है। केवल आठ पैसे नेटवर्क शुल्क लग सकता है।",
      undoTitle: "10-सेकंड वापसी विंडो (Undo)",
      undoDesc: "ब्लॉकचेन प्रसारण से पहले रोक। गलती होने पर तुरंत रद्द करें।",
      listenBtn: "🔊 बोलकर सुनाएं",
      youGiveLbl: "आप दे रहे हैं (कटौती)",
      youGetLbl: "आपको प्राप्त होगा (जमा)"
    }
  },

  exchangeRate: {
    solInr: 16442.30,
    solUsd: 198.10,
    usdInr: 83.00,
    networkFeeSol: 0.000005,
    networkFeeInr: 0.082
  },

  features: [
    {
      id: "send",
      number: 1,
      title: "Human-First Send",
      summary: "Replacing 44-character cryptographic strings with verified names, contact aliases & first-time transfer cards.",
      painPoint: "Long, terrifying addresses (e.g., 7xKXtg...9vW). One wrong paste means your hard-earned money is gone forever.",
      fix: "Search by .sol name or phone-synced contact with safety badges, avatar previews, and a dedicated 'First Time Sending' identity confirmation card.",
      metrics: {
        taps: { before: "9 taps", after: "4 taps", improvement: "55% fewer taps" },
        timeSeconds: { before: "~42s", after: "~11s", improvement: "73% faster completion" },
        anxietyScore: { before: "High (fear of wrong paste)", after: "Low (identity verified)", improvement: "Zero wrong-address anxiety" }
      },
      quote: {
        user: "Sneha K., 24 (Product Analyst, Bengaluru)",
        text: "In GPay I see Rahul's photo and his bank verified tick before I type my PIN. In Phantom, pasting 9wFF... felt like firing a missile blindfolded into the dark."
      }
    },
    {
      id: "signing",
      number: 2,
      title: "Plain-Language Signing Card",
      summary: "Translating cryptic instruction byte-dumps into clear 'You Give / You Get' with real-time risk security shields.",
      painPoint: "Technical jargon (e.g., 'Program ID: TokenkegQfe... Instruction 2'). Users blindly tap 'Approve' without knowing if their wallet will be drained.",
      fix: "Human financial breakdown with a safety triage banner (4 Checks Passed / Red Drainer) and simulated balance change in Rupees.",
      metrics: {
        comprehension: { before: "Cryptic bytecode", after: "Clear Give/Get", improvement: "Verbal comprehension verified" },
        blindApproval: { before: "Common blind approval", after: "Explicit review", improvement: "Testers review token amounts" },
        confidenceScore: { before: "Hesitant", after: "Confident", improvement: "Clear understanding of deductions" }
      },
      quote: {
        user: "Kabir M., 29 (Architect, Pune)",
        text: "I looked at the approval screen and thought: 'If this stole all my money, I wouldn't even know until it was already gone.' The new safety card actually speaks human."
      }
    },
    {
      id: "fees",
      number: 3,
      title: "₹ Rupee-Native Network Fees",
      summary: "Displaying transaction costs in Rupees with real-world context instead of fractional SOL or lamports.",
      painPoint: "Gas fees shown as 0.000005 SOL or in lamports. Beginners have zero intuition of whether that's 5 paise or 5,000 rupees.",
      fix: "Show fees upfront in ₹ (e.g., '≈ ₹0.08') with an intuitive explanation ('Cost to verify on Solana') and 1-tap Turbo priority toggle.",
      metrics: {
        feeUnderstanding: { before: "Confusing lamports", after: "Instant ₹ value", improvement: "Clear understanding of ~₹0.08" },
        userDropoff: { before: "Hesitation on fee", after: "Immediate acceptance", improvement: "No fee hesitation observed" },
        speedSelectionRate: { before: "Ignored priority", after: "Intuitive choice", improvement: "Easy priority speed selection" }
      },
      quote: {
        user: "Ananya R., 22 (Design student, Bengaluru)",
        text: "I thought 0.0005 SOL might be 500 rupees! When I saw it says '≈ ₹0.08', I realized Solana is actually like free UPI."
      }
    },
    {
      id: "status",
      number: 4,
      title: "Peace-of-Mind Recovery Timeline",
      summary: "A transparent state machine with explicit fund safety guarantee and one-tap smart retry.",
      painPoint: "A vague red 'Transaction failed' popup leaves users panicking that their money was deducted and lost forever.",
      fix: "A live step-by-step pipeline (Sent → Validated → Block Slot → Confirmed) and an honest banner: 'No funds moved. A small network fee (≈ ₹0.08) may apply.' with auto-slippage retry.",
      metrics: {
        panicSupportTickets: { before: "Panic on 0x1771", after: "Calm comprehension", improvement: "Understands no funds moved" },
        retrySuccessRate: { before: "Abandonment on error", after: "1-tap retry", improvement: "Immediate unassisted recovery" },
        resolutionTime: { before: "Minutes of confusion", after: "Instant feedback", improvement: "Immediate clarity on failure reason" }
      },
      quote: {
        user: "Vikram S., 31 (E-commerce operations, Delhi)",
        text: "When a payment fails on PhonePe, it tells me 'Money was not debited'. The old crypto app just said 'Transaction Failed: 0x1771'. My stomach literally dropped."
      }
    },
    {
      id: "onboarding",
      number: 5,
      title: "Progressive Security Ring",
      summary: "Replacing the immediate 12-word seed phrase barrier with instant passkeys and progressive security nudges.",
      painPoint: "Forcing newcomers to write down 12 words on physical paper before they even know if they like the app.",
      fix: "Instant 3-second biometric/passkey setup. The wallet introduces a gamified 'Protect Your Wallet' ring that unlocks cloud backups as balances grow.",
      metrics: {
        signupDropoff: { before: "Hesitation on 12 words", after: "Instant FaceID passkey", improvement: "Frictionless setup" },
        timeToFirstWallet: { before: "~4 minutes", after: "~18 seconds", improvement: "10x faster first wallet" },
        backupCompletion: { before: "Paper seed burden", after: "Progressive cloud backup", improvement: "Deferred until funds deposited" }
      },
      quote: {
        user: "Rohan D., 26 (Software dev, Pune)",
        text: "I abandon any app that gives me 12 random words on screen 2. Give me a passkey now, and ask me to backup to Google Drive once I actually have 5,000 bucks in there."
      }
    }
  ],

  contacts: [
    {
      id: "c1",
      name: "Rahul Sharma",
      handle: "rahul.sol",
      avatar: "👨🏽‍💻",
      verified: true,
      lastActive: "Active 2h ago",
      txCount: 42,
      riskLevel: "safe",
      badge: "Verified .SOL",
      history: "Sent ₹2,500 3 days ago"
    },
    {
      id: "c2",
      name: "Priya Nair",
      handle: "priya.sol",
      avatar: "👩🏽‍🎨",
      verified: true,
      lastActive: "Active 10m ago",
      txCount: 19,
      riskLevel: "safe",
      badge: "Verified .SOL",
      history: "Sent ₹850 yesterday"
    },
    {
      id: "c3",
      name: "Solana Summit India",
      handle: "summit2026.sol",
      avatar: "⚡",
      verified: true,
      lastActive: "Official Org",
      txCount: 1840,
      riskLevel: "official",
      badge: "Summit India Official",
      history: "Bounty pool recipient"
    },
    {
      id: "c4",
      name: "Unknown Collector",
      handle: "9wFF...7xK2",
      avatar: "👤",
      verified: false,
      lastActive: "First-time transfer",
      txCount: 1,
      riskLevel: "warning",
      badge: "First Time Sending",
      history: "No previous transactions"
    }
  ]
};
