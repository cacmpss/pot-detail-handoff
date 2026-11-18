import { Button } from '../xds/Button'

/**
 * Figma: Pots / Schedule card (165:5195).
 * The two buttons have fixed labels inside the component, so code exposes
 * their handlers instead of the buttons themselves.
 */
export interface ScheduleCardProps {
  /** Figma: Deposit, e.g. "€350 a month · 7 deposits". */
  deposit: string
  /** Figma: Day, e.g. "Every 5th, Feb to Aug 2027". */
  day: string
  /** Figma: From, e.g. "Current account ending 0372". */
  from: string
  /** Figma: Good to know. */
  note: string
  onChangeDay: () => void
  onPause: () => void
}

export function ScheduleCard({ deposit, day, from, note, onChangeDay, onPause }: ScheduleCardProps) {
  const rows: [string, string][] = [
    ['Deposit', deposit],
    ['Day', day],
    ['From', from],
    ['Good to know', note],
  ]
  return (
    <section className="pots-schedule-card" aria-labelledby="schedule-title">
      <h2 id="schedule-title" className="pots-schedule-card__title">How it’s scheduled</h2>
      <dl>
        {rows.map(([term, value]) => (
          <div key={term} className="pots-schedule-card__row">
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="pots-schedule-card__actions">
        <Button variant="secondary" onClick={onChangeDay}>Change day</Button>
        <Button variant="ghost" onClick={onPause}>Pause plan</Button>
      </div>
    </section>
  )
}
