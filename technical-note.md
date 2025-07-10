🧾 Technical Note: Interactive Status Snippet Playground

🧩 Purpose

The Status Snippet Playground is an interactive UI tool designed to dynamically generate a single sentence summary of the user's onboarding and engagement state. It simulates various real-world scenarios—actions pending, upcoming meetings, onboarding progress, and portfolio freshness—to preview how the message snippet would appear in production.

It's intended for teams across product, content, and engineering to:
- Validate tone and clarity
- Ensure proper color/emoji mapping
- Test edge cases in preview

⚙️ Core Logic

### 1. Data Structure
```ts
interface StatusState {
  actions: number;
  meeting: { time: "now" | "today" | string } | null;
  onboardingLeft: number | null;
  isOutdated: boolean;
}
```

### 2. Message Fragment Logic

The generated message is formatted in two lines:
```
Hi Rahul,
You have ...
```

Then conditionally includes fragments in this order:

| Condition         | Fragment Construction                                                  |
|------------------|------------------------------------------------------------------------|
| actions > 0      | `📌 <count> action(s)> pending`                                          |
| meeting          | `🗓️ <1 meeting happening now>` / `🗓️ <1 meeting today>` / `🗓️ <1 upcoming meeting> in X days` |
| onboardingLeft > 0   | `Your onboarding is 🌀 <onboardingLeft% left>`                          |
| isOutdated       | `some of your portfolio may be ⏱️ <outdated>`                            |

### 3. Sentence Construction Rules

```ts
const fragments = [...generated message parts];

if (fragments.length === 0) {
  return (
    <>
      <div>Hi Rahul,</div>
      <div>you are all caught up!</div>
    </>
  );
}

let messageContent;
if (fragments.length === 1) {
  messageContent = "You have " + fragments[0];
} else if (fragments.length === 2) {
  messageContent = "You have " + fragments.join(" and ");
} else {
  // 3 or more items
  const fragmentsCopy = [...fragments];
  const last = fragmentsCopy.pop();
  messageContent = "You have " + fragmentsCopy.join(", ") + " and " + last;
}

return (
  <>
    <div>Hi Rahul,</div>
    <div>{messageContent}</div>
  </>
);
```

🎨 Color-Coding Rules

| Fragment Component       | Color Code | Usage Example                                                  |
|--------------------------|------------|----------------------------------------------------------------|
| Action Count             | #9D615C    | `📌 <span style="color:#9D615C">1 action</span> pending`       |
| Onboarding Progress      | #A1B55C    | `Your onboarding is 🌀 <span style="color:#A1B55C">25% left</span>` |
| Meeting Info             | #C7A865    | `🗓️ <span style="color:#C7A865">1 meeting today</span>` / `🗓️ <span style="color:#C7A865">1 upcoming meeting</span> in 3 days`    |
| Outdated Portfolio Alert | #808FA3    | `some of your portfolio may be ⏱️ <span style="color:#808FA3">outdated</span>` |

💡 UI/UX Overview

### Playground Interface
- 📌 Add/remove actions via buttons
- 🗓️ Set a meeting time: now, today, or in X days (with editable day input)
- 🌀 Set or clear onboarding completion (1-50% range, hidden when 0%)
- ⏱️ Toggle data freshness flag

### Message Preview
Example:
```
Hi Rahul,
You have 📌 2 actions pending, 🗓️ 1 upcoming meeting in 3 days and Your onboarding is 🌀 25% left
```

🧱 Extensibility

| Feature                     | Type     | Example                                       |
|----------------------------|----------|-----------------------------------------------|
| Localized messages         | i18n     | `"Hola Rahul, tienes 2 acciones pendientes"`  |
| Framer/Component props     | design   | Hooked into preview controls                  |
| JSON export for state      | dev tool | Copy current playground state                 |
| Mobile responsiveness      | layout   | Wrap lines at safe breakpoints                |
| Theme toggle               | UX       | Light/dark message preview support            |

📐 Design Guidelines

- Message is formatted in two lines:
  - First line: "Hi Rahul,"
  - Second line: The rest of the message
- No period at the end of the sentence
- Emoji placement:
  - Before colored text for actions
  - Before colored text for meeting info
  - Before colored percentage for onboarding
  - Before colored "outdated" word for portfolio freshness
- Color coding:
  - Only color "action(s)" for actions (not "pending")
  - Only color "1 meeting" or "1 upcoming meeting" for meetings (not "in X days")
  - Only color "X% left" for onboarding
  - Only color "outdated" for portfolio freshness
- Fixed phrasing:
  - `pending` is appended to action count (in default color)
  - `Your onboarding is` prepends onboarding percentage (in default color)
  - `in X days` is appended for meetings not today or now (in default color)
  - Use `upcoming meeting` instead of just `meeting` for future dates
- Onboarding:
  - Range is 1-50% (not 0-100%)
  - Hidden when value is 0%
- Use consistent color tone mapping
- Avoid duplicated sentence parts or ambiguous phrases

🧪 Testing Scenarios

| Scenario                                 | Expected Output                                                             |
|------------------------------------------|------------------------------------------------------------------------------|
| All empty                                | `Hi Rahul,`<br>`you are all caught up!`                                          |
| 1 action only                            | `Hi Rahul,`<br>`You have 📌 1 action pending`                                    |
| Action + Meeting Today                   | `Hi Rahul,`<br>`You have 📌 1 action pending and 🗓️ 1 meeting today`             |
| Meeting in Future                        | `Hi Rahul,`<br>`You have 🗓️ 1 upcoming meeting in 8 days`                        |
| All 4 states                             | `Hi Rahul,`<br>`You have 📌 2 actions pending, 🗓️ 1 upcoming meeting in 3 days and Your onboarding is 🌀 25% left and some of your portfolio may be ⏱️ outdated` |

📎 File Organization

```
/components/
  ├── MobileFrame.tsx            # Container component
  ├── StatusSnippet.tsx          # Message generator
  ├── ControlPanel.tsx           # Controls container
  └── controls/
      ├── ActionControls.tsx     # Action count controls
      ├── MeetingControls.tsx    # Meeting time controls
      ├── OnboardingControls.tsx # Onboarding progress controls
      └── FreshnessToggle.tsx    # Portfolio freshness toggle
```

✅ Summary

The Status Snippet Playground now reflects a consistent, modular sentence generator with:
- Two-line message structure with greeting on first line
- One-sentence structure with clear grammar (no ending period)
- Specific color coding only for key information
- Strategic emoji placement
- Customized onboarding range (1-50%)
- Editable meeting day input
- "Upcoming meeting" phrasing for future dates
- Fully modular UI and logic

Perfect for aligning UX writing, frontend state logic, and edge case validation.