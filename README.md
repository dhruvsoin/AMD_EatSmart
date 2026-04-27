# 🌾 Annam AI
### The Intelligent Nutrition Decision Engine for the Modern Indian.

**Annam** (Sanskrit for "sacred food") is a next-generation nutritional decision engine built specifically for the **AMD Prompt-A-Thon**. Unlike traditional trackers that focus on the past (calories already eaten), Annam focuses on the **future**: telling you exactly what to eat *right now* based on your body, your goals, and your current context.

---

## 🌟 Why Annam?
In a world of information overload, Annam provides clarity. By leveraging the low-latency reasoning of **Google Gemini 2.5 Flash**, Annam acts as a proactive nutritional coach that understands the nuances of Indian diets and the constraints of a modern lifestyle.

## ✨ Core Pillars
- **🧠 Agentic Decision Engine:** Don't just log. Ask "What should I eat right now?" and receive context-aware suggestions (Budget, Time of Day, Health Goal).
- **🎨 Premium Editorial UI:** A bespoke "Saffron & Ivory" theme using the high-contrast **Playfair Display** serif font, designed for an organic and premium lifestyle experience.
- **🛡️ Resilience-First Design:** Built-in fail-safes and local-first data persistence (Zustand) ensure the app works flawlessly even under heavy API load or offline conditions.
- **📊 Behavioral Insights:** Beyond numbers. Get a deep AI analysis of your eating habits to understand the "why" behind your choices.

## 🚀 Key Features
1. **Contextual Onboarding:** Dynamic profiling for Muscle Gain, Weight Loss, or Healthy Living.
2. **Food Intelligence Scanner:** Instant Health Scores (Green/Yellow/Red) with AI-powered "Smart Swaps."
3. **AI Daily Menu:** A curated 24-hour food plan generated uniquely for your body metrics.
4. **Interactive Dashboard:** Beautifully rendered progress tracking with Recharts.

## 🛠 Tech Stack & Architecture
- **AI Core:** Google Gemini 2.5 Flash (via `@google/generative-ai`)
- **Framework:** React 19 + Vite (Single Page Application)
- **Design System:** Tailwind CSS + Framer Motion (Spring Physics animations)
- **State Engine:** Zustand (with LocalStorage Persist)
- **Deployment:** Containerized via Docker + Nginx for high-performance GCP Cloud Run hosting.

## 📦 Getting Started

1. **Clone & Install:**
   ```bash
   git clone https://github.com/dhruvsoin/AMD_EatSmart.git
   cd AMD_EatSmart
   npm install
   ```

2. **Configure Environment:**
   Create a `.env.local` file:
   ```env
   VITE_GEMINI_API_KEY=your_google_ai_studio_key
   ```

3. **Launch:**
   ```bash
   npm run dev
   ```

## 🎯 AMD Prompt-A-Thon Submission Details
- **Repository Size:** ~280 KB (Optimized for <1MB constraint)
- **Branching:** Main branch only.
- **Privacy:** Public repository.
- **Performance:** Optimized for sub-second AI reasoning and smooth 60fps animations.

---
*Built with ❤️ for the AMD Prompt-A-Thon.*
