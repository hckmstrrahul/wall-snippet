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
| Action Count             | #9D615C    | 📌 1 action (not "pending")                            |
| Onboarding Progress      | #A1B55C    | 🌀 25% left (not "Your onboarding is")                 |
| Meeting Info             | #C7A865    | 🗓️ 1 meeting today / 🗓️ 1 upcoming meeting (not "in X days") |
| Outdated Portfolio Alert | #808FA3    | ⏱️ outdated (not "some of your portfolio may be")      |

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
- If no state is active → "Hi Rahul, you are all caught up!"
- If 1 item → "You have [fragment]"
- If 2 items → "You have [fragment1] and [fragment2]"
- If 3+ → "You have [fragment1], [fragment2] and [fragment3]" (no comma before "and")
- No period at the end of sentences 