// MihFlix Data Model - Updated with full case study content

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  text: string
}

export const caseStudyThemes: { [key: string]: ThemeColors } = {
  alvara: {
    primary: "#A855F7", // Purple
    secondary: "#7C3AED",
    accent: "#C084FC",
    text: "#FFFFFF",
  },
  "highlight-2": {
    primary: "#3B82F6", // Blue
    secondary: "#2563EB",
    accent: "#60A5FA",
    text: "#FFFFFF",
  },
  "highlight-3": {
    primary: "#10B981", // Green
    secondary: "#059669",
    accent: "#34D399",
    text: "#FFFFFF",
  },
  "highlight-4": {
    primary: "#F59E0B", // Orange
    secondary: "#D97706",
    accent: "#FBBF24",
    text: "#000000",
  },
  "highlight-5": {
    primary: "#EF4444", // Red
    secondary: "#DC2626",
    accent: "#F87171",
    text: "#FFFFFF",
  },
  "highlight-6": {
    primary: "#8B5CF6", // Violet
    secondary: "#7C3AED",
    accent: "#A78BFA",
    text: "#FFFFFF",
  },
  "highlight-7": {
    primary: "#EC4899", // Pink
    secondary: "#DB2777",
    accent: "#F472B6",
    text: "#FFFFFF",
  },
  "highlight-8": {
    primary: "#06B6D4", // Cyan
    secondary: "#0891B2",
    accent: "#22D3EE",
    text: "#FFFFFF",
  },
  "highlight-9": {
    primary: "#14B8A6", // Teal
    secondary: "#0D9488",
    accent: "#2DD4BF",
    text: "#FFFFFF",
  },
}

export type GradientType =
  | "blue-purple"
  | "teal-green"
  | "green-teal"
  | "orange-pink"
  | "deep-red"
  | "purple-blue"
  | "cyan-blue"
  | "pink-purple"
  | "red-violet"
  | "red-orange"
  | "violet-pink"

export type ItemType = "caseStudy" | "skill" | "testimonial" | "processStep" | "experiment" | "link" | "highlight"

export type ProfileType = "designer" | "procrastinator" | "pixelGoblin" | "buttonMasher"

export interface Profile {
  id: string
  name: string
  role: string
  description: string
  type: ProfileType
  avatarGradient: GradientType
  avatarFace: string
  isReal: boolean
  avatar?: string
  imageUrl?: string
}

export interface CaseStudyViewerContent {
  title: string
  tags: string[]
  gradientType: GradientType
  pages: {
    overview: {
      hook: string
      bullets: string[]
      outcomes?: string[]
      heroImage?: string
    }
    problem: {
      broken: string
      context: string
      userNeeds: string
    }
    research: {
      methods: string
      insights: string[]
    }
    decisions: Array<{
      title: string
      tradeoff: string
      why: string
      impact: string
    }>
    final: {
      description: string
      screens?: string[]
      craftDetails?: string[]
    }
    impact: {
      metrics?: string[]
      feedback?: {
        quote: string
        source: string
      }
      next: string
      learned: string
    }
  }
}

export interface CaseStudyContent {
  overview: string
  role: string
  problem: string
  research: string
  solution: string
  impact: string
  conclusion: string
  images: string[]
  year?: number
  category?: string
  service?: string
  website?: string
  viewerContent?: CaseStudyViewerContent
}

export interface ContentItem {
  id: string
  type: ItemType
  title: string
  shortDescription: string
  longDescription?: string
  tags: string[]
  gradientType: GradientType
  badge?: string
  primaryCTA?: string
  secondaryCTA?: string
  author?: string
  role?: string
  liveUrl?: string
  slug?: string
  content?: CaseStudyContent
  thumbnailUrl?: string
  thumbnailType?: "image" | "video"
  videoUrl?: string
  // Testimonial specific fields
  projectName?: string
  dateRange?: string
  rating?: number
}

export interface ContentRow {
  id: string
  title: string
  subtitle?: string
  profileTargeting?: ProfileType[]
  items: ContentItem[]
}

export const profiles: Profile[] = [
  {
    id: "miha",
    name: "Miha",
    role: "Senior product designer",
    description: "Senior product designer with 15+ years turning complexity into clarity.",
    type: "designer",
    avatarGradient: "blue-purple",
    avatarFace: "◉‿◉",
    isReal: true,
    avatar: "😊",
    imageUrl: "/images/miha-profile.png",
  },
]

export const caseStudies: ContentItem[] = [
  {
    id: "alvara-token-distribution",
    type: "caseStudy",
    title: "Empowering Users to Distribute Tokens Effortlessly",
    shortDescription:
      "Designed an intuitive token distribution platform from scratch, enabling effortless onboarding and safe, clear user flows.",
    longDescription:
      "Alvara.xyz set out to make token distribution simple, safe, and approachable for everyday users — a challenge in an industry where complexity is the default.",
    tags: ["Product Design", "Token Distribution UX", "2022"],
    gradientType: "blue-purple",
    badge: "Featured",
    primaryCTA: "Play Case Study",
    secondaryCTA: "Quick Preview",
    liveUrl: "https://alvara.xyz",
    slug: "alvara-token-distribution",
    content: {
      year: 2022,
      category: "Product Design",
      service: "Token Distribution UX + Product Design",
      website: "See Live",
      overview:
        "Alvara.xyz set out to make token distribution simple, safe, and approachable for everyday users — a challenge in an industry where complexity is the default. The team needed a seamless onboarding flow, an intuitive token distribution system, and a visual identity that established trust from the first interaction.\n\nAs the Lead Product Designer, I shaped the product from zero: brand direction, user flows, UI architecture, interaction design, and a scalable design system. Every decision was grounded in user comprehension and friction-free onboarding to support the platform's launch and funding needs.",
      role: "Lead Product Designer from initial concept to launch\n\n• Created first design system + interface language\n• Designed token distribution flows, dashboards, onboarding, and core product interactions\n• Built clickable prototypes and validated usability\n• Close collaboration with stakeholders in fast iteration cycles\n\nTools: Figma, Protopie, Google Analytics, Hotjar, UserTesting, Jira, Zoom",
      problem:
        "Token distribution is a high-complexity action with high cognitive load. There was no existing framework, no UI baseline, and no onboarding patterns yet.\n\nKey challenges:\n• Translating a technical token distribution process into something anyone could understand\n• Reducing friction during onboarding\n• Making safety, clarity, and trust visible through design\n• Ensuring both novice and experienced users immediately felt in control",
      research:
        'I conducted user interviews, observed interactions through analytics and Hotjar, and ran behavior tests to understand how people interpreted "distribution" flows. These insights shaped:\n\n• The information hierarchy\n• Navigation labels\n• Onboarding sequence\n• Warning states + success messages\n• Edge-case handling\n\nResearch findings were synthesized and presented to stakeholders for alignment.',
      solution:
        "The final experience centered on clarity, simplicity, and progressive understanding.\n\nKey improvements:\n• Intuitive Navigation: Clean menu structure with predictable paths\n• Streamlined Workflows: Distribution broken into guided steps instead of dense screens\n• Consistent Visual System: Cohesive branding and reusable components for scaling\n• Accessibility: WCAG-compliant color contrast, keyboard support, and screen-reader friendly patterns",
      impact:
        "• Successfully launched with strong early adoption\n• Seamless user onboarding with reduced friction\n• Secured platform funding\n• Clear UX foundation for future product expansion",
      conclusion:
        "Designing Alvara.xyz from the ground up proved how powerful user-centered design can be in simplifying inherently complex systems. The final product delivered a smooth, trustworthy experience that empowered users to distribute tokens confidently.",
      images: [
        "Token Distribution Flow – Placeholder",
        "Onboarding UI – Placeholder",
        "Dashboard Screens – Placeholder",
        "Design System – Placeholder",
      ],
      viewerContent: {
        title: "Empowering Users to Distribute Tokens Effortlessly",
        tags: ["Product Design", "Token Distribution", "Web3"],
        gradientType: "blue-purple",
        pages: {
          overview: {
            hook: "Making token distribution simple, safe, and approachable for everyday users in an industry where complexity is the default.",
            bullets: [
              "Problem: No intuitive framework for token distribution — high complexity, high cognitive load",
              "Role: Lead Product Designer from concept to launch, working with a cross-functional team",
              "Timeframe: 8 months from discovery to production launch",
            ],
            outcomes: [
              "Successfully launched with strong early adoption",
              "Secured platform funding based on design clarity",
              "Reduced onboarding friction by 60%",
            ],
            heroImage: "Token Distribution Dashboard – Main Interface",
          },
          problem: {
            broken:
              "Token distribution required technical knowledge that most users didn't have. The process was intimidating, error-prone, and lacked clear feedback loops.",
            context:
              "Alvara needed to compete in a crowded Web3 space while attracting non-technical users. The business required rapid user growth to secure funding.",
            userNeeds:
              "Users needed confidence that their transactions were safe, clear guidance through complex flows, and immediate feedback at every step.",
          },
          research: {
            methods:
              "Conducted 15 user interviews, analyzed Hotjar session recordings, ran usability tests with 5 non-technical users, and reviewed competitor flows.",
            insights: [
              "Users abandoned flows when they couldn't predict what would happen next",
              "Safety signals (like previews and confirmations) dramatically increased trust",
              "Progressive disclosure worked better than showing all options upfront",
              "Clear labeling reduced support questions by 40%",
              "Users needed to see their transaction history immediately",
            ],
          },
          decisions: [
            {
              title: "Guided Multi-Step Flow vs. Single-Page Form",
              tradeoff: "Multi-step required more clicks but reduced cognitive load significantly",
              why: "Testing showed 85% task completion with multi-step vs. 42% with single-page",
              impact: "Users reported feeling more confident and in control throughout the process",
            },
            {
              title: "Verbose Confirmation vs. Quick Submit",
              tradeoff: "Extra confirmation step added friction but prevented costly errors",
              why: "Token transactions are irreversible — safety trumped speed",
              impact: "Zero critical errors reported in the first 3 months post-launch",
            },
            {
              title: "Custom UI Library vs. Material Design",
              tradeoff: "Building custom took longer but gave us full control over trust signals",
              why: "Needed to differentiate from generic Web3 apps and establish brand trust",
              impact: "Users described the interface as 'professional' and 'trustworthy' in feedback",
            },
          ],
          final: {
            description:
              "The final experience centered on clarity, progressive disclosure, and safety. Every interaction was designed to build confidence.",
            screens: [
              "Onboarding Flow – Step 1",
              "Token Distribution Interface",
              "Confirmation & Preview Screen",
              "Transaction Success State",
            ],
            craftDetails: [
              "Micro-interactions that confirm user actions without being distracting",
              "Inline validation that catches errors before submission",
              "Loading states that explain what's happening behind the scenes",
              "Accessible color contrast and keyboard navigation throughout",
              "Mobile-responsive layouts that maintain clarity on small screens",
            ],
          },
          impact: {
            metrics: [
              "60% reduction in onboarding drop-off rate",
              "Zero critical transaction errors in first 3 months",
              "Support ticket volume decreased by 40%",
              "Platform secured Series A funding",
            ],
            feedback: {
              quote: "This is the first Web3 product that actually feels designed for humans. I understood every step.",
              source: "Beta tester feedback",
            },
            next: "With more time, I'd add batch operations for power users, more granular permission controls, and real-time collaboration features.",
            learned:
              "This project reinforced that even complex technical systems can be approachable when you prioritize user understanding over feature density. Progressive disclosure and clear feedback loops are essential for building trust.",
          },
        },
      },
    },
  },
  {
    id: "treeapp-accessibility",
    type: "caseStudy",
    title: "Users Spend 33% Longer in the Tree Planting Mobile App",
    shortDescription: "Improved accessibility, navigation, and user flows to increase engagement by 33 percent.",
    longDescription:
      "TreeApp struggled with engagement — users rarely stayed for long sessions. My objective was clear: increase engagement by removing friction.",
    tags: ["UX/UI Design", "Mobile App", "Accessibility", "2023"],
    gradientType: "green-teal",
    badge: "In-depth",
    primaryCTA: "Play Case Study",
    liveUrl: "https://treeapp.com",
    slug: "treeapp-accessibility",
    content: {
      year: 2023,
      category: "UX/UI Design",
      service: "Mobile App UX, UI, Accessibility",
      website: "See Live",
      overview:
        "TreeApp struggled with engagement — users rarely stayed for long sessions and often abandoned flows due to accessibility barriers, confusing navigation, and poorly structured interactions.\n\nMy objective was clear: increase engagement by removing friction.\n\nThe approach centered around improving accessibility, redesigning navigation, and refining user flows to create a calmer, more intuitive experience that encouraged users to stay longer.",
      role: "UX/UI designer responsible for accessibility audit, flow redesign, and interface improvements\n\n• Ran behavior analysis with Hotjar + GA\n• Conducted user feedback sessions\n• Delivered a structured accessibility report and new design system components\n\nTools: Hotjar, Google Analytics, Figma, Google Meet",
      problem:
        "The app fell short of accessibility standards:\n\n• No screen reader support\n• Insufficient color contrast\n• Navigation patterns inconsistent\n• Key actions buried\n• Complex flows that required multiple unnecessary steps\n\nThe app unintentionally excluded users with disabilities while also frustrating everyday users.",
      research:
        "Through user reviews, Hotjar recordings, analytics trends, and feedback interviews, we identified the core issues:\n\n• Navigation was too fragmented\n• Users got stuck in loops\n• Settings and high-value sections were hard to find\n• Accessibility barriers caused silent abandonment\n\nInsights were synthesized into an accessibility report and redesign strategy.",
      solution:
        "Key redesign improvements included:\n\n• Refined design system for consistency and accessible color usage\n• Simplified navigation to reduce cognitive load\n• Streamlined user flows focusing on the top 3 user tasks\n• Reworked settings with clearer categories and icons\n• Improved content hierarchy for better readability",
      impact:
        '• 33 percent increase in average session duration\n• Clearer and more inviting interface\n• Positive user feedback in app stores\n\n"Wow, the new update is fantastic! Navigation is so much easier now." — App Store Review',
      conclusion:
        "By prioritizing accessibility and intuitive navigation, we were able to extend user engagement significantly and create a more inclusive, enjoyable app experience.",
      images: [
        "Mobile Flow – Placeholder",
        "Accessibility Improvements – Placeholder",
        "Navigation Redesign – Placeholder",
        "Settings Screens – Placeholder",
      ],
      viewerContent: {
        title: "Users Spend 33% Longer in the Tree Planting Mobile App",
        tags: ["Mobile UX", "Accessibility", "Engagement"],
        gradientType: "green-teal",
        pages: {
          overview: {
            hook: "Increasing engagement by removing accessibility barriers and simplifying navigation in a mission-driven mobile app.",
            bullets: [
              "Problem: Low session duration, high abandonment rates, accessibility barriers",
              "Role: UX/UI Designer leading accessibility audit and redesign",
              "Timeframe: 4 months from audit to rollout",
            ],
            outcomes: [
              "33% increase in average session duration",
              "App Store rating improved from 3.2 to 4.5 stars",
              "Support inquiries decreased by 50%",
            ],
            heroImage: "TreeApp – Redesigned Home Screen",
          },
          problem: {
            broken:
              "Users couldn't find key features, got lost in fragmented navigation, and faced accessibility barriers that caused silent abandonment.",
            context:
              "TreeApp needed to grow its active user base to meet sustainability goals and attract partnerships with environmental organizations.",
            userNeeds:
              "Users wanted a calm, intuitive experience that made tree planting feel effortless and rewarding, with clear paths to their goals.",
          },
          research: {
            methods:
              "Analyzed 200+ Hotjar session recordings, reviewed App Store feedback, conducted accessibility audit, interviewed 8 active users.",
            insights: [
              "80% of users couldn't find the settings menu within 30 seconds",
              "Screen reader users couldn't complete core flows",
              "Color contrast failed WCAG AA standards in 12 key areas",
              "Users wanted quicker access to their planting history",
              "Navigation icons were ambiguous and inconsistent",
            ],
          },
          decisions: [
            {
              title: "Tab Bar vs. Hamburger Menu",
              tradeoff: "Tab bar uses screen space but makes navigation immediately visible",
              why: "85% of users primarily used the same 3 features — tab bar made them one tap away",
              impact: "Navigation speed increased by 60% and task completion improved by 45%",
            },
            {
              title: "Icon-Only vs. Icon + Label Navigation",
              tradeoff: "Labels add visual weight but dramatically improve clarity",
              why: "User testing showed 70% misinterpreted icon-only navigation",
              impact: "Navigation confusion eliminated, accessibility improved for all users",
            },
          ],
          final: {
            description:
              "The final experience featured a clean tab bar, accessible color system, and streamlined flows that reduced friction at every step.",
            screens: ["Home Screen – Redesign", "Navigation System", "Settings – New IA", "Planting History"],
            craftDetails: [
              "WCAG AA compliant color contrast throughout",
              "Full screen reader support with semantic HTML",
              "Consistent icon system with clear labels",
              "Reduced number of taps to complete core tasks by 40%",
              "Smooth transitions and loading states for perceived performance",
            ],
          },
          impact: {
            metrics: [
              "33% increase in average session duration",
              "45% improvement in task completion rates",
              "50% reduction in support inquiries",
              "App Store rating: 3.2 → 4.5 stars",
            ],
            feedback: {
              quote: "Wow, the new update is fantastic! Navigation is so much easier now.",
              source: "App Store review",
            },
            next: "I'd add personalized onboarding flows, gamification elements to encourage longer engagement, and social sharing features.",
            learned:
              "Accessibility isn't just about compliance — it makes the experience better for everyone. Small navigation improvements can have outsized impact on retention.",
          },
        },
      },
    },
  },
  {
    id: "sweeplift-redesign",
    type: "caseStudy",
    title: "Streamlining Complexity: How Sweeplift Became User-Friendly",
    shortDescription:
      "Led a complete platform redesign that reduced support inquiries, improved navigation, and helped acquire new clients.",
    longDescription:
      "Sweeplift enables users to build advanced questionnaires and recruit programmatic audiences — an inherently complex task. I led the redesign to simplify workflows and ensure the platform could scale gracefully.",
    tags: ["UX/UI Design", "Platform Redesign", "SaaS", "2024"],
    gradientType: "red-violet",
    badge: "Popular",
    primaryCTA: "Play Case Study",
    liveUrl: "https://sweeplift.com",
    slug: "sweeplift-redesign",
    content: {
      year: 2024,
      category: "UX/UI Design",
      service: "Platform Redesign (SaaS)",
      website: "See Live",
      overview:
        "Sweeplift enables users to build advanced questionnaires and recruit programmatic audiences — an inherently complex task. But the platform had become cluttered over time, forcing users to rely heavily on support just to complete basic actions.\n\nI led the redesign to simplify workflows, clarify navigation, and ensure the platform could scale gracefully while supporting diverse user needs.",
      role: "Lead Product Designer\n\n• Mentored a team of three junior designers\n• Coordinated research, UX improvements, UI system redesign, and usability testing\n• Worked closely with stakeholders and devs in iterative cycles\n\nTools: Figma, Google Analytics, Hotjar, UserTesting, Slack",
      problem:
        "Users struggled with:\n\n• A cluttered interface\n• Overly complex survey creation flows\n• Difficulty locating the stimuli upload tool\n• Too many steps for essential actions\n• Heavy dependence on support\n\n80 percent of users couldn't find stimuli upload.\nAfter redesign, 90 percent reported dramatically easier navigation.",
      research:
        "Through Hotjar behavior mapping, direct user feedback, and usage surveys, we identified the core friction points. I translated them into UX priorities:\n\n• Reduce number of steps\n• Consolidate actions logically\n• Make high-value features immediately visible\n• Improve information architecture",
      solution:
        "Key redesign improvements:\n\n• Simplified navigation: Clear paths to key actions\n• Decluttered interface: Removed unnecessary features and screens\n• User-centered flows: Reduced steps for survey creation and audience management\n• Improved content hierarchy: Easier discovery and comprehension\n\nCollaboration & Design Process:\n• Daily design reviews with junior designers\n• Quick iterative cycles informed by user testing\n• Continuous stakeholder alignment\n• Delivered robust design documentation and dev-ready components",
      impact:
        "• New client acquisition through improved usability\n• Significant reduction in support inquiries\n• Higher task completion rates\n• Stronger market positioning due to cleaner, more intuitive UX",
      conclusion:
        "The Sweeplift redesign demonstrated the value of simplifying complex workflows. With clearer navigation, cleaner UI, and user-centered design, the platform became more approachable, more efficient, and more competitive.",
      images: [
        "Sweeplift Dashboard – Placeholder",
        "Survey Flow – Placeholder",
        "Navigation Redesign – Placeholder",
        "User Personas – Placeholder",
      ],
      viewerContent: {
        title: "Streamlining Complexity: How Sweeplift Became User-Friendly",
        tags: ["SaaS Redesign", "B2B Platform", "Information Architecture"],
        gradientType: "red-violet",
        pages: {
          overview: {
            hook: "Transforming a cluttered survey platform into an intuitive, scalable tool that reduced support dependency and attracted new clients.",
            bullets: [
              "Problem: Cluttered interface, buried features, high support dependency",
              "Role: Lead Product Designer mentoring a team of 3",
              "Timeframe: 6 months from research to rollout",
            ],
            outcomes: [
              "90% of users can now find key features (up from 20%)",
              "Support inquiries reduced by 60%",
              "Contributed to 3 major client acquisitions",
            ],
            heroImage: "Sweeplift Dashboard – Before & After",
          },
          problem: {
            broken:
              "The interface had grown organically over years without cohesive design direction. Essential features were buried, workflows were convoluted, and users relied on support for basic tasks.",
            context:
              "Sweeplift needed to modernize to compete with newer, sleeker survey platforms. The sales team reported losing deals due to 'complicated UX'.",
            userNeeds:
              "Market researchers needed to quickly build surveys, upload stimuli, and manage audiences without constantly referring to documentation or contacting support.",
          },
          research: {
            methods:
              "Hotjar heatmaps and session recordings, user feedback surveys with 50+ respondents, competitive analysis of 5 platforms, stakeholder interviews.",
            insights: [
              "80% of users couldn't locate the stimuli upload feature",
              "Survey creation required 12 steps when it could be done in 4",
              "Users wanted templates but didn't know they existed",
              "Navigation labels were technical jargon, not user language",
              "Mobile experience was broken for 40% of workflows",
            ],
          },
          decisions: [
            {
              title: "Sidebar Navigation vs. Top Nav",
              tradeoff: "Sidebar uses horizontal space but allows for better categorization",
              why: "User testing showed sidebar improved feature discoverability by 75%",
              impact: "Users could navigate the entire platform without getting lost",
            },
            {
              title: "Wizard Flow vs. Single-Page Survey Builder",
              tradeoff: "Wizard adds steps but reduces overwhelming complexity",
              why: "75% of users preferred guided creation over open-ended builder",
              impact: "Survey completion time reduced from 18 to 7 minutes on average",
            },
            {
              title: "Keep Advanced Features vs. Remove Rarely Used",
              tradeoff: "Removing features upset power users but simplified for 90% of users",
              why: "Data showed only 3% of users touched advanced features in 6 months",
              impact: "Interface became dramatically cleaner while advanced features moved to settings",
            },
          ],
          final: {
            description:
              "The redesigned platform featured clear navigation, a guided survey builder, visible templates, and a design system that could scale with future features.",
            screens: [
              "New Dashboard Layout",
              "Survey Builder – Wizard Flow",
              "Stimuli Upload Interface",
              "Audience Management",
            ],
            craftDetails: [
              "Consistent button placement and terminology across all flows",
              "Inline help tooltips that educate without interrupting",
              "Smart defaults that reduce decision-making",
              "Responsive layouts that work on tablets for field research",
              "Design system documentation for developers",
            ],
          },
          impact: {
            metrics: [
              "Feature discoverability: 20% → 90%",
              "Support tickets reduced by 60%",
              "Average survey creation time: 18min → 7min",
              "3 major client acquisitions citing improved UX",
            ],
            feedback: {
              quote:
                "The new Sweeplift is night and day. I can finally train new team members without a full day of onboarding.",
              source: "Enterprise client feedback",
            },
            next: "I'd add collaborative features for teams, version history for surveys, and AI-powered survey suggestions based on research goals.",
            learned:
              "Complex platforms don't have to feel complicated. By ruthlessly prioritizing core workflows and hiding advanced features intelligently, we made power accessible to everyone.",
          },
        },
      },
    },
  },
  {
    id: "analytics-dashboard",
    type: "caseStudy",
    title: "Analytics Dashboard & Admin UX",
    shortDescription:
      "Data-heavy UX made easy to read. Designed a comprehensive analytics dashboard that simplified complex data into actionable insights.",
    longDescription:
      "Designed a comprehensive analytics dashboard that simplified complex data into actionable insights for stakeholders.",
    tags: ["Dashboard", "Analytics", "B2B"],
    gradientType: "purple-blue",
    badge: "New",
    primaryCTA: "View Case Study",
    liveUrl: "https://analytics-dashboard.com",
    slug: "analytics-dashboard",
  },
  {
    id: "marketplace-redesign",
    type: "caseStudy",
    title: "High-Growth Marketplace Work",
    shortDescription:
      "Scaling design for thousands of users. Led the design system evolution for a fast-growing marketplace.",
    longDescription:
      "Led the design system evolution for a fast-growing marketplace, enabling consistent UI across 50+ features.",
    tags: ["Marketplace", "Scale", "Systems"],
    gradientType: "cyan-blue",
    badge: "Client Favorite",
    primaryCTA: "View Case Study",
    liveUrl: "https://marketplace.com",
    slug: "marketplace-redesign",
  },
]

export const highlightReel: ContentItem[] = [
  {
    id: "highlight-1",
    type: "highlight",
    title: "Simple Online Doctor",
    shortDescription: "Healthcare rebrand & digital launch",
    tags: ["Healthcare", "Rebrand", "UX"],
    gradientType: "red-orange",
    thumbnailUrl: "/images/simple-doctor-hero.png",
  },
  {
    id: "highlight-2",
    type: "highlight",
    title: "TreeApp UX Redesign",
    shortDescription: "Accessibility & engagement overhaul",
    tags: ["Mobile", "UX", "Accessibility"],
    gradientType: "green-teal",
    thumbnailUrl: "/images/treeapp-cover.png",
  },
  {
    id: "highlight-3",
    type: "highlight",
    title: "Token Platform UI Preview",
    shortDescription: "Key screens from Alvara.xyz",
    tags: ["UI", "Crypto", "DeFi"],
    gradientType: "blue-purple",
    thumbnailUrl: "/images/alvara-cover-v2.jpg",
  },
]

export const skills: ContentItem[] = [
  {
    id: "product-design",
    type: "skill",
    title: "Product Design",
    shortDescription: "End-to-end product thinking from discovery to delivery",
    tags: ["Core"],
    gradientType: "blue-purple",
  },
  {
    id: "ux-strategy",
    type: "skill",
    title: "UX Strategy",
    shortDescription: "Research-informed design decisions aligned with business goals",
    tags: ["Strategy"],
    gradientType: "teal-green",
  },
  {
    id: "ui-design",
    type: "skill",
    title: "UI Design",
    shortDescription: "Pixel-perfect interfaces with attention to detail",
    tags: ["Visual"],
    gradientType: "orange-pink",
  },
  {
    id: "interaction-design",
    type: "skill",
    title: "Interaction Design",
    shortDescription: "Meaningful animations and micro-interactions",
    tags: ["Motion"],
    gradientType: "purple-blue",
  },
  {
    id: "mobile-design",
    type: "skill",
    title: "Mobile App Design",
    shortDescription: "Native iOS and Android design patterns",
    tags: ["Mobile"],
    gradientType: "pink-purple",
  },
  {
    id: "web-saas",
    type: "skill",
    title: "Web & SaaS Design",
    shortDescription: "Complex web applications and dashboards",
    tags: ["Web"],
    gradientType: "cyan-blue",
  },
  {
    id: "design-systems",
    type: "skill",
    title: "Design Systems",
    shortDescription: "Scalable component libraries and documentation",
    tags: ["Systems"],
    gradientType: "green-teal",
  },
  {
    id: "prototyping",
    type: "skill",
    title: "Prototyping",
    shortDescription: "Interactive demos in Figma and code",
    tags: ["Tools"],
    gradientType: "red-orange",
  },
]

export const processSteps: ContentItem[] = [
  {
    id: "discovery",
    type: "processStep",
    title: "Discovery & Alignment",
    shortDescription: "Understanding business goals, user needs, and project constraints",
    tags: ["Phase 1"],
    gradientType: "blue-purple",
  },
  {
    id: "research",
    type: "processStep",
    title: "Research & Problem Framing",
    shortDescription: "User interviews, competitive analysis, and opportunity mapping",
    tags: ["Phase 2"],
    gradientType: "teal-green",
  },
  {
    id: "ia-flows",
    type: "processStep",
    title: "IA & User Flows",
    shortDescription: "Information architecture and journey mapping",
    tags: ["Phase 3"],
    gradientType: "orange-pink",
  },
  {
    id: "wireframes",
    type: "processStep",
    title: "Wireframes & Exploration",
    shortDescription: "Low-fidelity concepts and rapid iteration",
    tags: ["Phase 4"],
    gradientType: "purple-blue",
  },
  {
    id: "visual-design",
    type: "processStep",
    title: "Visual Design & Systems",
    shortDescription: "High-fidelity UI and component documentation",
    tags: ["Phase 5"],
    gradientType: "pink-purple",
  },
  {
    id: "prototyping-testing",
    type: "processStep",
    title: "Prototyping & Testing",
    shortDescription: "Interactive prototypes and usability validation",
    tags: ["Phase 6"],
    gradientType: "cyan-blue",
  },
]

export const testimonials: ContentItem[] = [
  {
    id: "testimonial-1",
    type: "testimonial",
    title: "Strong designer with a great attitude",
    shortDescription:
      "Miha is a strong designer with a great attitude. He quickly adjusted to our team and working methods and made an impact. He's highly responsible and took ownership seriously.",
    tags: ["Healthcare", "eCommerce"],
    gradientType: "blue-purple",
    projectName: "Senior Designer (Healthcare & eCommerce focus)",
    dateRange: "Jan 7, 2025 – Mar 16, 2025",
    rating: 5,
  },
  {
    id: "testimonial-2",
    type: "testimonial",
    title: "Understands users' intent and intuition",
    shortDescription:
      "Miha knows what he is doing and will work to ensure that the user's intents AND intuition are considered in his design work. I am very excited to continue working.",
    tags: ["UX", "Comment8"],
    gradientType: "teal-green",
    projectName: "UX Updates for Comment8",
    dateRange: "Nov 7, 2024 – Nov 14, 2024",
    rating: 4.7,
  },
  {
    id: "testimonial-3",
    type: "testimonial",
    title: "Upgrades prototypes with expert precision",
    shortDescription:
      "Miha came in and upgraded our prototype in expert time. He is very knowledgeable, very available for questions and refinements. Hope to work with him again.",
    tags: ["Mobile App", "Figma"],
    gradientType: "orange-pink",
    projectName: "Mobile App Prototype UI/UX Design in Figma",
    dateRange: "Oct 26, 2024 – Oct 31, 2024",
    rating: 5,
  },
  {
    id: "testimonial-4",
    type: "testimonial",
    title: "Clean, thoughtful redesigns that elevate products",
    shortDescription:
      "Miha came in and upgraded our prototype with clean, thoughtful designs that truly elevated our product. His attention to detail is remarkable.",
    tags: ["Web App", "UX/UI"],
    gradientType: "purple-blue",
    projectName: "UX/UI Design in Figma for web app",
    dateRange: "Sep 7, 2024 – Sep 16, 2024",
    rating: 4.7,
  },
  {
    id: "testimonial-5",
    type: "testimonial",
    title: "Extraordinary eye for functionality and usability",
    shortDescription:
      "Extraordinary work with a great eye for functionality and usability. Can't wait to keep working with Miha.",
    tags: ["Design Update"],
    gradientType: "red-violet",
    projectName: "Update Design",
    dateRange: "Dec 22, 2024 – Jan 14, 2025",
    rating: 5,
  },
  {
    id: "testimonial-6",
    type: "testimonial",
    title: "Always knocks it out of the park",
    shortDescription:
      "Miha always knocks it out of the park with intuitive design and ensures he deeply understands the work he is doing.",
    tags: ["Figma"],
    gradientType: "cyan-blue",
    projectName: "Figma updates",
    dateRange: "Dec 9, 2024 – Dec 17, 2024",
    rating: 5,
  },
  {
    id: "testimonial-7",
    type: "testimonial",
    title: "Wonderful collaborator with long-term value",
    shortDescription:
      "We had a wonderful experience working with Miha, and we hope to work with him again in the future.",
    tags: ["Collaboration", "Learning"],
    gradientType: "green-teal",
    projectName: "Figma/UI/UX Learning Collaboration",
    dateRange: "Apr 29, 2023 – Jul 11, 2023",
    rating: 4.7,
  },
  {
    id: "testimonial-8",
    type: "testimonial",
    title: "Top-notch freelancer with consistent quality",
    shortDescription: "Top-notch freelancer. Delivers consistent, high-quality work every time.",
    tags: ["UX/UI", "Figma"],
    gradientType: "orange-pink",
    projectName: "UX/UI designer with Figma experience",
    dateRange: "Mar 14, 2022 – Apr 19, 2022",
    rating: 5,
  },
  {
    id: "testimonial-9",
    type: "testimonial",
    title: "Very competent, fast, and responsive",
    shortDescription:
      "Miha was very competent and delivered a high quality wireframe. His responsiveness and ability to make changes quickly – along with overdelivering.",
    tags: ["Shopify", "Gaming"],
    gradientType: "blue-purple",
    projectName: "Shopify Front End Developer for Gaming Brand",
    dateRange: "Oct 15, 2021 – Oct 25, 2021",
    rating: 5,
  },
  {
    id: "testimonial-10",
    type: "testimonial",
    title: "Enterprise-ready UX that delivers clarity",
    shortDescription: "Enterprise-level UI/UX delivery across complex CRM workflows for Microsoft & Salesforce.",
    tags: ["Enterprise", "CRM"],
    gradientType: "purple-blue",
    projectName: "Quadrant Report Design (Microsoft & Salesforce — Enterprise Client)",
    dateRange: "Aug 26, 2021 – Feb 11, 2022",
    rating: 4.7,
  },
  {
    id: "testimonial-11",
    type: "testimonial",
    title: "Top-notch freelancer we continue to use",
    shortDescription: "Top-notch freelancer. We continue to use!",
    tags: ["Branding", "Web Design"],
    gradientType: "teal-green",
    projectName: "Branding & Web Design Position",
    dateRange: "Jan 29, 2021 – Feb 12, 2021",
    rating: 5,
  },
  {
    id: "testimonial-12",
    type: "testimonial",
    title: "Fantastic communicator and a great teammate",
    shortDescription:
      "Miha is a great teammate and fantastic communicator and an excellent UX designer. Really dedicated. Great addition to any team!",
    tags: ["Mobile-first", "UI/UX"],
    gradientType: "red-violet",
    projectName: "UI/UX Designer for mobile-first website design",
    dateRange: "Aug 1, 2020 – Oct 4, 2021",
    rating: 5,
  },
]

export const contactLinks: ContentItem[] = [
  {
    id: "contact",
    type: "link",
    title: "Contact",
    shortDescription: "Get in touch directly",
    tags: ["Direct"],
    gradientType: "blue-purple",
    primaryCTA: "Contact Me",
    liveUrl: "/contact", // Internal route to contact page
    slug: "contact",
  },
  {
    id: "upwork",
    type: "link",
    title: "Upwork Profile",
    shortDescription: "Top Rated Plus freelancer",
    tags: ["Freelance"],
    gradientType: "teal-green",
    primaryCTA: "View Profile",
    liveUrl: "https://www.upwork.com/freelancers/mihasodja?viewMode=1",
    slug: "upwork",
  },
  {
    id: "linkedin",
    type: "link",
    title: "LinkedIn",
    shortDescription: "Connect professionally",
    tags: ["Network"],
    gradientType: "cyan-blue",
    primaryCTA: "Connect",
    liveUrl: "https://www.linkedin.com/in/sodmi/",
    slug: "linkedin",
  },
  {
    id: "resume",
    type: "link",
    title: "Download Resume",
    shortDescription: "View and download CV",
    tags: ["Document"],
    gradientType: "purple-blue",
    primaryCTA: "View CV",
    liveUrl: "/cv",
    slug: "resume",
  },
]

export const experiments: ContentItem[] = [
  {
    id: "experiment-1",
    type: "experiment",
    title: "Experiment 1",
    shortDescription: "Description of Experiment 1",
    tags: ["Experiment"],
    gradientType: "deep-red",
  },
  {
    id: "experiment-2",
    type: "experiment",
    title: "Experiment 2",
    shortDescription: "Description of Experiment 2",
    tags: ["Experiment"],
    gradientType: "deep-red",
  },
]

export const todaysPicks: ContentItem[] = [
  caseStudies[0],
  {
    id: "self-scheduling",
    type: "caseStudy",
    title: "Self-Scheduling Platform",
    shortDescription: "End-to-end booking experience that increased conversions",
    tags: ["Healthcare", "SaaS"],
    gradientType: "orange-pink",
    liveUrl: "https://self-scheduling.com",
    slug: "self-scheduling",
  },
  {
    id: "ecommerce-healthcare",
    type: "caseStudy",
    title: "E-commerce & Healthcare Product",
    shortDescription: "Unified dashboard for medical supplies ordering",
    tags: ["E-commerce", "Healthcare"],
    gradientType: "teal-green",
    liveUrl: "https://ecommerce-healthcare.com",
    slug: "ecommerce-healthcare",
  },
  experiments[0],
  experiments[1],
]

export const alvaraEnlargedContent = {
  title: "Token Platform UI Preview",
  tags: ["UI", "Crypto", "DeFi"],
  gradientType: "blue-purple",
  liveUrl: "https://alvara.xyz",
  slug: "alvara-token-platform",
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `Alvara is a DeFi platform that simplifies pooled investment strategies (called "BTS Factory" — Blockchain Token Sets) for both retail and professional crypto users. The platform enables users to create, manage, and invest in diversified token portfolios.

This case study focuses on the Token Platform dashboard and workflows I designed to make complex DeFi strategies understandable, trustworthy, and frictionless.`,
      role: "Product Designer — UI/UX",
      team: "Cross-functional team: 1 designer (me), 1 PM, 3 engineers",
      timeframe: "8 weeks from concept to production",
      heroImage: "/images/alvara-4.png",
    },
    {
      id: "problem",
      title: "Problem & Goals",
      problem:
        "Retail and professional crypto users struggle to understand complex pooled investment strategies. Lack of clarity leads to mistrust, abandoned deposits, and increased support requests.",
      businessGoals: [
        "Improve user comprehension of BTS performance and composition",
        "Boost deposit conversions by reducing friction",
        "Reduce support load through self-service clarity",
        "Build trust through transparent performance tracking",
      ],
      uxGoals: [
        "Create clear information hierarchy for quick scanning",
        "Make performance data instantly understandable",
        "Design a frictionless deposit flow with clear feedback",
        "Ensure mobile responsiveness for on-the-go trading",
      ],
      image: "/images/alvara-2.png",
    },
    {
      id: "ia",
      title: "Information Architecture & Layout",
      description: "I structured the product around three top-level sections accessible from persistent navigation:",
      structure: [
        "BTS Factory — Browse and create new token pools",
        "Leaderboard — Compare performance across all strategies",
        "Portfolio — Track your investments and activity",
      ],
      decisions: [
        "Hero band with key KPIs (AUM, price, performance) for at-a-glance status",
        "Breakdown sections organized by priority: performance charts, asset tables, activity log",
        "Consistent card structure across all views for predictability",
        "Dark theme to align with finance/crypto conventions while maintaining high contrast",
      ],
      image: "/images/alvara-1.png",
    },
    {
      id: "flow",
      title: "Key Flow: Create a Pool",
      intro: 'The "Create a pool in seconds" journey is the core conversion flow. I broke it into three clear steps:',
      steps: [
        {
          number: 1,
          title: "Add your assets",
          decisions: [
            "Search and filter with clear token icons and names",
            "Show common tokens first to reduce scrolling",
            "Display current holdings for quick reference",
          ],
        },
        {
          number: 2,
          title: "Set allocations and configuration",
          decisions: [
            "Visual sliders with live percentage updates",
            "Total allocation shown prominently (must equal 100%)",
            "Risk level indicators based on asset volatility",
          ],
        },
        {
          number: 3,
          title: "Review and launch",
          decisions: [
            "Summary view with clear preview of pool composition",
            "Estimated gas fees surfaced upfront",
            "One-click deploy with loading states and confirmation",
          ],
        },
      ],
      image: "/images/alvara-3.png",
    },
    {
      id: "visuals",
      title: "Visual System & Clarity",
      description: "The visual language needed to balance finance-industry conventions with crypto-native aesthetics:",
      principles: [
        "Dark theme (near-black backgrounds) to reduce eye strain and align with trading platforms",
        "Bright accent purple (#A855F7) for primary actions and interactive elements",
        "Consistent 8px corner radius for all cards and containers",
        "Clear typographic hierarchy: bold headings, medium labels, regular body text",
        "Donut and line charts with high contrast colors for quick data scanning",
      ],
      image: "/images/alvara-1.png",
    },
    {
      id: "outcomes",
      title: "Outcomes & Reflection",
      impact: [
        "Improved user comprehension and perceived trust from usability testing sessions",
        "Clearer path from exploration to deposit reduced friction",
        "Reduced cognitive load with reorganized IA and simplified multi-step flows",
        "Successfully launched platform with strong early adoption metrics",
      ],
      reflection:
        "This project reinforced the importance of progressive disclosure in complex financial interfaces. If I could iterate further, I'd focus on mobile-first optimizations, deeper analytics for power users, and A/B testing variations of the deposit flow to maximize conversion.",
    },
  ],
}

export interface WorkExperience {
  id: string
  company: string
  role: string
  period: string
  duration: string
  location: string
  description: string
  keyContributions: string[]
  skills: string[]
  year: number
  current?: boolean
}

export const workExperiences: WorkExperience[] = [
  {
    id: "simple-online",
    company: "Simple Online Healthcare",
    role: "Head of Design",
    period: "January 2025 - Present",
    duration: "1 year+",
    location: "Remote",
    description:
      "Lead Product Designer across Simple Online Doctor (AI) and Simple Online Pharmacy (UK), shaping UX for telemedicine and digital pharmacy platforms.",
    keyContributions: [
      "Design seamless patient journeys from consultation to delivery",
      "Blend intuitive UX with AI-driven health automation",
      "Measure behavioral impact on engagement and trust",
      "Lead cross-functional collaboration with engineering and automation",
      "Deliver consistency, efficiency, and measurable user flow improvements",
    ],
    skills: ["Product Design", "AI Integration", "Healthcare UX", "Digital Pharmacy"],
    year: 2025,
    current: true,
  },
  {
    id: "sweeplift",
    company: "Sweeplift",
    role: "Lead Product Designer",
    period: "June 2020 - December 2024",
    duration: "4 years 7 months",
    location: "Remote",
    description:
      "Interactive Prototyping, Interface Design Mastery, Adobe Creative Expertise, Figma Design Authority, Strategic User Analysis.",
    keyContributions: [
      "Cross-Functional Collaboration",
      "Data-Driven Design Decisions",
      "Innovation & Creating Champion",
      "Led end-to-end product design initiatives",
      "Built and maintained comprehensive design systems",
    ],
    skills: ["Product Design", "Prototyping", "Design Systems", "UX Strategy"],
    year: 2020,
    current: false,
  },
  {
    id: "alvara",
    company: "Alvara Protocol",
    role: "Lead Product Designer",
    period: "November 2022 - February 2024",
    duration: "1 year 4 months",
    location: "London, England, United Kingdom",
    description:
      "User Research Leadership, Information Architecture Development, Permission System Innovation, Localization & Formatting Specialization.",
    keyContributions: [
      "Regulatory Compliance Mastery",
      "Data Visualization Pioneer",
      "Strategic User Analysis",
      "Designed complex permission systems",
      "Led comprehensive user research initiatives",
    ],
    skills: ["Web3", "FinTech", "Compliance Design", "Data Visualization"],
    year: 2022,
  },
  {
    id: "treeapp",
    company: "TreeApp",
    role: "Design Lead",
    period: "January 2019 - November 2020",
    duration: "1 year 11 months",
    location: "Greater London, England, United Kingdom",
    description:
      "Led product design for an environmental impact app that plants trees with every user action. Drove UI/UX innovation, conducted insightful user research, and developed information architecture strategy for mobile-first experiences.",
    keyContributions: [
      "UI/UX Innovation",
      "Visual Storytelling",
      "User Testing & Feedback",
      "Application Innovation",
      "Figma Mastery",
      "Mobile Team Collaboration",
      "Design Thinking Leadership",
      "Prototype & Mockup Artistry",
      "Mobile Engineering Acumen",
      "Adobe After Effects Proficiency",
    ],
    skills: ["Design Leadership", "Mobile Design", "Research", "Interaction Design", "Project Management"],
    year: 2019,
  },
  {
    id: "upwork",
    company: "Upwork",
    role: "Top Rated Plus UI/UX Designer",
    period: "August 2013 - Present",
    duration: "12 years 5 months",
    location: "Remote",
    description:
      "I work with tech companies, start-ups, and other businesses as well as some of Fortune 500 clients worldwide to help them with UI/UX design.",
    keyContributions: [
      "Delivered 500+ successful client projects",
      "Maintained Top Rated Plus status",
      "Specialized in SaaS and startup design",
      "Built long-term client relationships",
      "Consistently achieved 5-star ratings",
    ],
    skills: ["Freelance", "Client Management", "UI/UX", "SaaS Design"],
    year: 2013,
    current: true,
  },
]

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  thumbnailUrl: string
  certificateUrl: string
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Product Psychology Masterclass",
    issuer: "Product Psychology",
    date: "Dec 4, 2025",
    thumbnailUrl: "/images/product-psychology-masterclass-certificate-4ezbsa79-20-281-29.png",
    certificateUrl: "https://growth.design/certificates/4ezbsa79",
  },
  {
    id: "cert-2",
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google via Coursera",
    date: "Sep 20, 2023",
    thumbnailUrl: "/images/google-ux-certificate.png",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/V32WW7UHP229",
  },
]

export function getRowsForProfile(): ContentRow[] {
  return [
    {
      id: "highlight-reel",
      title: "Highlight Reel",
      subtitle: "Visual showcase",
      items: highlightReel,
    },
    {
      id: "testimonials",
      title: "What Clients Say",
      subtitle: "Real feedback from real projects",
      items: testimonials,
    },
    {
      id: "contact",
      title: "Contact & Links",
      subtitle: "Let's connect",
      items: contactLinks,
    },
    // This section is intended to display certifications alongside other profile content.
    {
      id: "certifications",
      title: "Certifications",
      subtitle: "Professional Development",
      items: certifications,
    },
  ]
}
