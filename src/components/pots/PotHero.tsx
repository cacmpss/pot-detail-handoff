import type { ReactNode } from 'react'

/** Figma: Pots / Pot hero (221:5032). */
export interface PotHeroProps {
  /** Figma: Name. */
  name: string
  /** Figma: Goal. Display-ready text, e.g. "Goal €3,000 by Aug 2027". */
  goal: string
  /**
   * Category icon in the mint tile. Not exposed as a property in Figma yet
   * (see SPEC.md › Gaps), so Code Connect does not set it.
   */
  icon?: ReactNode
}

export function PotHero({ name, goal, icon }: PotHeroProps) {
  return (
    <div className="pots-pot-hero">
      <span className="pots-pot-hero__tile" aria-hidden="true">{icon}</span>
      <div>
        <h1 className="pots-pot-hero__name">{name}</h1>
        <p className="pots-pot-hero__goal">{goal}</p>
      </div>
    </div>
  )
}
