import { formatMoney } from '../../lib/format'

/**
 * Figma: Pots / Goal progress (165:5180).
 * Figma exposes three display strings (Saved, Scheduled, To go). In code the
 * component takes numbers and derives labels and bar widths, so the bar can
 * never disagree with the text.
 */
export interface GoalProgressProps {
  saved: number
  scheduled: number
  goal: number
  currency?: string
}

export function GoalProgress({ saved, scheduled, goal, currency = 'EUR' }: GoalProgressProps) {
  const toGo = Math.max(goal - saved - scheduled, 0)
  const pct = (v: number) => `${Math.min((v / goal) * 100, 100)}%`
  const fmt = (v: number) => formatMoney(v, { currency })

  return (
    <div className="pots-goal-progress">
      <div
        className="pots-goal-progress__bar"
        role="img"
        aria-label={`${fmt(saved)} saved, ${fmt(scheduled)} scheduled, ${fmt(toGo)} to go of ${fmt(goal)}`}
      >
        <span className="pots-goal-progress__saved" style={{ width: pct(saved) }} />
        <span className="pots-goal-progress__scheduled" style={{ width: pct(scheduled) }} />
      </div>
      <ul className="pots-goal-progress__legend" aria-hidden="true">
        <li data-segment="saved">Saved {fmt(saved)}</li>
        <li data-segment="scheduled">Scheduled {fmt(scheduled)}</li>
        <li data-segment="to-go">To go {fmt(toGo)}</li>
      </ul>
    </div>
  )
}
