# Status Snippet Playground

An interactive UI tool designed to dynamically generate a single sentence summary of the user's onboarding and engagement state. It simulates various real-world scenarios—actions pending, upcoming meetings, onboarding progress, and portfolio freshness—to preview how the message snippet would appear in production.

## Features

- 📌 Add/remove pending actions via buttons
- 🗓️ Set a meeting time: now, today, or in X days (with editable day input)
- 🌀 Set or clear onboarding completion percentage (1-50% range)
- ⏱️ Toggle portfolio up-to-date status
- Mobile-first design with phone mockup frame
- Two-line message format with greeting on first line

## Color-Coding Rules

| Element                  | Color Code | Usage                                                  |
|--------------------------|------------|--------------------------------------------------------|
| Action Count             | #9D615C    | 📌 1 action                           |
| Onboarding Progress      | #A1B55C    | 🌀 25% left                 |
| Meeting Info             | #C7A865    | 🗓️ 1 meeting today / 🗓️ 1 upcoming meeting  |
| Outdated Portfolio Alert | #808FA3    | ⏱️ outdated      |

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js
- React
- TypeScript
- TailwindCSS

## Grammar & Punctuation Logic

- Two-line format:
  - First line: "Hi Rahul,"
  - Second line: The rest of the message
- If no state is active → "Hi Rahul, You are all caught up!" (with capital Y)
- If 1 item:
  - For actions or meetings → "You have [fragment]"
  - For onboarding or portfolio → "[fragment]" (no "You have" prefix)
- If 2 items:
  - If both are onboarding/portfolio → "[fragment1] and [fragment2]" (no "You have" prefix)
  - If any is action/meeting → "You have [fragment1] and [fragment2]"
- If 3+ items:
  - If all are onboarding/portfolio → "[fragment1], [fragment2] and [fragment3]" (no "You have" prefix)
  - If any is action/meeting → "You have [fragment1], [fragment2] and [fragment3]" 
- No comma before "and" (Oxford comma not used)
- No period at the end of sentences
- "Some of your portfolio may be..." (with capital S) when it appears alone
- "some of your portfolio may be..." (with lowercase s) when it appears with other fragments 