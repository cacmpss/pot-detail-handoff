# Pot detail · Handoff spec

**Figma:** [Chat · 10 — Pot detail · Summer holiday](https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=278-53697) · scrolled state: [10b](https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=278-53716)
**Code:** [`src/screens/PotDetailScreen.tsx`](src/screens/PotDetailScreen.tsx) · components in [`src/components`](src/components) · Code Connect in [`src/figma`](src/figma) · tokens in [`src/styles/tokens.css`](src/styles/tokens.css)

## 1. Overview

The screen the person lands on after the plan is scheduled (*View pot* on step 7) or from the Pots list. It answers three questions: **how much is in the pot**, **how the plan will get me to the goal**, and **what I can do about the gap**. It is also the way back into the conversation: *Show me ways* opens the assistant with this pot as context.

The screen is built only from design-system components. Each one has a matching React component with the same props, and a Code Connect template that maps them.

## 2. Anatomy

Single column, 16 px side margins (`Spacing/4`), 16 px between blocks. Only the content scrolls; the status bar and the assistant FAB stay fixed.

| # | Block | Figma component | Code component | Main tokens |
|---|---|---|---|---|
| 1 | Back (+ optional help) | `Pots / Top bar` | `TopBar` | `Element/Medium`, `Radius/Element`, `Core/Neutral` |
| 2 | Pot name and goal | `Pots / Pot hero` | `PotHero` | `Core/Accent Muted`, `Heading/Heading 2`, `Text/Supporting` |
| 3 | Balance, plan status, progress | `Pots / Pot balance` › `Badge`, `Pots / Goal progress` | `PotBalance`, `Badge`, `GoalProgress` | `Heading/Heading 1`, `Component/Badge/Success Bg`, `Core/Accent` |
| 4 | Deposit · Withdraw · Modify | `Pots / Action row` › 3× `Pots / Action tile` | `ActionRow`, `ActionTile` | `Surface/Card`, `Border/Default`, `Radius/Container`, `Icon/Accent` |
| 5 | Gap to goal + assistant entry | `Pots / AI goal CTA` › `Button` (Primary) | `AiGoalCta`, `Button` | `Surface/Card`, `Core/Background Inverted` |
| 6 | How the plan runs | `Pots / Schedule card` › 2× `Button` | `ScheduleCard` | `Text/Label`, `Text/Body`, `Text/Supporting` |
| 7 | Activity title + See all | `Pots / List header` (Trailing = Action) | `ListHeader` | `Heading/Heading 4` |
| 8 | Activity rows | `Home / Transaction row` (Scheduled, Pot) | `TransactionRow` | `Text/Body`, `Text/Supporting` |

## 3. Figma properties → code props

Rules applied everywhere:
- **Values that drive logic become numbers.** Figma holds display text (`"€300.00"`, `"Saved €300"`); code receives `300` and formats it with `formatMoney`. The progress bar and its legend are computed from the same numbers, so they can never disagree.
- **Interaction states are not props.** Hover, Pressed and Focused are CSS states; only Disabled and Loading become props.
- **Nested instances become `ReactNode` props** (`status`, `progress`, `action`, `trailing`) and are rendered through their own templates.

| Figma component | Figma property | Type | Code prop |
|---|---|---|---|
| **Button** (XDS) | Label | Text | `children` |
| | Variant: Primary · Secondary · Ghost · Destructive | Variant | `variant` |
| | Size: SM · MD · LG | Variant | `size` |
| | State: Rest · Hover · Pressed · Focused · Disabled · Loading | Variant | `disabled` / `loading` (others → CSS) |
| | Type: Default · Icon Only | Variant | `iconOnly` |
| | Elevation: none · low · med · high | Variant | `elevation` |
| | Icon + Icon Source | Boolean + Instance swap | `icon` |
| | Has End Content + End Content | Boolean + Slot | `endContent` |
| **Badge** (XDS) | Label | Text | `children` |
| | Variant (14 values) | Variant | `variant` |
| | Shape: Pill · Dot | Variant | `shape` |
| | Icon | Boolean | `withIcon` |
| **Pots / Top bar** | Show help | Boolean | `showHelp` (+ `onBack`, `onHelp`) |
| **Pots / Pot hero** | Name · Goal | Text | `name` · `goal` |
| **Pots / Pot balance** | Amount | Text → number | `amount` |
| | *(nested Badge, Goal progress)* | Instance | `status` · `progress` |
| **Pots / Goal progress** | Saved · Scheduled · To go | Text → number | `saved` · `scheduled` · `goal` (= sum of the three) |
| **Pots / Action row** | *(3 nested Action tiles)* | Instance | `children` |
| **Pots / Action tile** | Label | Text | `label` |
| | Icon | Instance swap | `icon` |
| | State: Rest · Pressed · Disabled | Variant | `disabled` |
| **Pots / AI goal CTA** | Title · Description | Text | `title` · `description` |
| | *(nested Button)* | Instance | `action` |
| **Pots / Schedule card** | Deposit · Day · From · Good to know | Text | `deposit` · `day` · `from` · `note` (+ `onChangeDay`, `onPause`) |
| **Pots / List header** | Title | Text | `title` |
| | Trailing: Count · Action | Variant | `trailing` (Badge or Button) |
| **Home / Transaction row** | Type: Debit · Credit · Pot · Scheduled | Variant | `type` (sets sign and colour) |
| | Label · Date | Text | `label` · `date` |
| | Description + Show description | Text + Boolean | `description` (omitted = hidden) |
| | Amount | Text → number | `amount` (always positive) |
| | Icon | Instance swap | `icon` |

## 4. Data

The screen receives one `PotDetail` object from the pots API (see [`PotDetailScreen.tsx`](src/screens/PotDetailScreen.tsx)). Nothing on this screen is generated by the AI.

| Shown | Source | Rule |
|---|---|---|
| €300.00 | `balance` | Exact, 2 decimals |
| Scheduled · €350 · 5 Feb | `plan.monthlyAmount`, `plan.nextDepositLabel` | Next pending deposit |
| Saved / Scheduled / To go | `balance`, `plan.scheduledTotal`, `goal.amount` | To go = goal − saved − scheduled, never below 0 |
| You're €250 short… | same as *To go* | Card hidden when the gap is 0 |
| Activity | `activity[]` | Newest first; scheduled deposits on top |

## 5. States

| State | What changes |
|---|---|
| **Plan scheduled** (default) | Badge `Success` "Scheduled · €350 · 5 Feb"; Schedule card visible. |
| **Next deposit tomorrow** (10b) | *Next deposit* info banner appears under the balance. |
| **Plan paused** | Badge `Warning` "Paused"; Schedule card shows *Resume plan* instead of *Pause plan* *(to design)*. |
| **No plan** | No badge, no Schedule card; Goal progress shows only *Saved* and *To go*. |
| **Goal reached** | AI goal CTA hidden; progress bar full. |
| **Balance €0** | *Withdraw* tile `disabled` *(proposed rule)*. |
| **Loading** | Skeleton for amount, progress and activity; actions disabled until data arrives. |
| **Error loading** | Inline error with *Try again*; top bar stays usable. |

## 6. Behaviour

| Element | Action | Result |
|---|---|---|
| Back | Tap | Returns to where the person came from (chat step 7 or Pots list). |
| Deposit / Withdraw | Tap | Opens the amount sheet for this pot. |
| Modify | Tap | Opens plan editing (Interactive plan) with current values. |
| **Show me ways** | Tap | Opens the assistant with `potId`, goal and gap as context; starts the "close the gap" path. |
| Change day | Tap | Day picker (1–28). |
| Pause plan | Tap | Confirmation sheet explaining the impact on the August total. Nothing changes until confirmed. |
| See all | Tap | Full activity list for this pot. |
| Assistant FAB | Tap | Opens the assistant with this pot as context. |

## 7. Accessibility

- **Headings:** pot name is the page `h1`; *How it’s scheduled* and *Activity* are `h2`.
- **Progress bar:** one `role="img"` with a full sentence ("€300 saved, €2,450 scheduled, €250 to go of €3,000"); the visual legend is hidden from screen readers to avoid reading it twice.
- **Status badge:** the meaning is in the text, not the colour.
- **Icon-only buttons** (Back, Help) use their label as the accessible name.
- **Schedule details** use a description list (`dl`), so each value is read with its label.
- **Targets:** action tiles and buttons are at least 44 × 44 pt.
- **Focus order:** Back → balance → actions → *Show me ways* → schedule actions → See all → FAB.

## 8. Tokens

All colours, spacing, radii and type sizes on the screen are bound to Figma variables; [`tokens.css`](src/styles/tokens.css) lists them with their light-mode values. Every Wit colour, spacing, radius and size variable has a WEB code syntax (`var(--wit-…)`), and the CSS uses those names. The base XDS variables come from the remote library and have no code syntax, so their `--xds-…` names are proposed (see Gaps).

## 9. Code Connect

### Status

The templates are **written but not published**. Publishing needs an Organization or Enterprise Figma plan and the components published to a team library; this file is on an individual plan. The mapping is complete and can be published as is once those conditions are met.

| Figma component | Node | Template | Code |
|---|---|---|---|
| Button (XDS) | library | [`xds/Button.figma.ts`](src/figma/xds/Button.figma.ts) | [`Button.tsx`](src/components/xds/Button.tsx) |
| Badge (XDS) | library | [`xds/Badge.figma.ts`](src/figma/xds/Badge.figma.ts) | [`Badge.tsx`](src/components/xds/Badge.tsx) |
| Pots / Top bar | `221:4986` | [`pots/TopBar.figma.ts`](src/figma/pots/TopBar.figma.ts) | [`TopBar.tsx`](src/components/pots/TopBar.tsx) |
| Pots / Pot hero | `221:5032` | [`pots/PotHero.figma.ts`](src/figma/pots/PotHero.figma.ts) | [`PotHero.tsx`](src/components/pots/PotHero.tsx) |
| Pots / Pot balance | `221:5039` | [`pots/PotBalance.figma.ts`](src/figma/pots/PotBalance.figma.ts) | [`PotBalance.tsx`](src/components/pots/PotBalance.tsx) |
| Pots / Goal progress | `165:5180` | [`pots/GoalProgress.figma.ts`](src/figma/pots/GoalProgress.figma.ts) | [`GoalProgress.tsx`](src/components/pots/GoalProgress.tsx) |
| Pots / Action row | `221:5016` | [`pots/ActionRow.figma.ts`](src/figma/pots/ActionRow.figma.ts) | [`ActionRow.tsx`](src/components/pots/ActionRow.tsx) |
| Pots / Action tile | `165:5179` | [`pots/ActionTile.figma.ts`](src/figma/pots/ActionTile.figma.ts) | [`ActionTile.tsx`](src/components/pots/ActionTile.tsx) |
| Pots / AI goal CTA | `165:5247` | [`pots/AiGoalCta.figma.ts`](src/figma/pots/AiGoalCta.figma.ts) | [`AiGoalCta.tsx`](src/components/pots/AiGoalCta.tsx) |
| Pots / Schedule card | `165:5195` | [`pots/ScheduleCard.figma.ts`](src/figma/pots/ScheduleCard.figma.ts) | [`ScheduleCard.tsx`](src/components/pots/ScheduleCard.tsx) |
| Pots / List header | `221:5011` | [`pots/ListHeader.figma.ts`](src/figma/pots/ListHeader.figma.ts) | [`ListHeader.tsx`](src/components/pots/ListHeader.tsx) |
| Home / Transaction row | `150:4601` | [`home/TransactionRow.figma.ts`](src/figma/home/TransactionRow.figma.ts) | [`TransactionRow.tsx`](src/components/home/TransactionRow.tsx) |

### How the templates are built

- **Format:** parserless templates (`.figma.ts` with `figma.code`), one per component, each with a stable `id` (e.g. `pots-goal-progress`).
- **Every variant value is mapped**, including the ones that become CSS states, so no value renders as `undefined`.
- **Nested instances are never hard-coded.** Parents find children by Code Connect id (`findConnectedInstance('badge')`) and render them with the child's own template. Changing the badge in Figma changes the snippet in Dev Mode.
- **Text that carries numbers is parsed** in the template (`"Scheduled €2,450"` → `2450`), so Dev Mode shows the props the code really takes.

Example: selecting **Pots / Pot balance** in Dev Mode would show:

```tsx
<PotBalance
  amount={300}
  status={<Badge variant="success">Scheduled · €350 · 5 Feb</Badge>}
  progress={<GoalProgress saved={300} scheduled={2450} goal={3000} />}
/>
```

### To publish later

1. Publish the *Pots* and *Home* components to a team library; replace `<XDS_LIBRARY_FILE_KEY>` in the two XDS templates with the library file key.
2. `npm install`, then `npx figma connect publish` with a Figma access token.
3. In Dev Mode, select each component and check the snippet.

### Gaps found in Figma

| Gap | Status | Impact | Next step |
|---|---|---|---|
| Variables without WEB code syntax | **Partly fixed.** All Wit collections (Color, Spacing, Radius, Size, Border, Primitives) now have it. **Wit Typography** (0/32) and **Message AI • Astryx** (0/31) don't. Base XDS variables (Color, Spacing, Typography) come from the remote library and can only be changed there. | Dev Mode shows raw values for those variables | Add code syntax to Wit Typography; ask the XDS owners for the base variables. Until then the `--xds-…` names in `tokens.css` are proposed. |
| Layer names in `Pots / Action row` | **Partly fixed.** The main component now matches its labels (Create · Deposit · Withdraw), but the Pot detail instance overrides the labels to Deposit · Withdraw · Modify, so *Action · Create* still shows "Deposit" there. | Confusing in Dev Mode | Use neutral layer names (*Action 1/2/3*) or add a `Context = List · Detail` variant with its own names. |
| `Pots / Pot hero` category icon is not a property | **Open** | Code Connect can't pass the icon | Add an `Icon` instance-swap property; then add `icon` to `PotHero.figma.ts`. |
| Screen padding (80 / 120), hero tile (56) and progress bar height (8) aren't variables | **Open** | Hard-coded in CSS | Add size tokens or document them as fixed. |
