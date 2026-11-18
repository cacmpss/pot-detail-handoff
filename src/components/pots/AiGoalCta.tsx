import type { ReactNode } from 'react'
import { SparkleIcon } from '../icons'

/** Figma: Pots / AI goal CTA (165:5247). Entry point to the assistant with this pot as context. */
export interface AiGoalCtaProps {
  /** Figma: Title. */
  title: string
  /** Figma: Description. */
  description: string
  /** Figma: nested Button ("Ask the assistant"). */
  action: ReactNode
}

export function AiGoalCta({ title, description, action }: AiGoalCtaProps) {
  return (
    <section className="pots-ai-goal-cta">
      <div className="pots-ai-goal-cta__text">
        <SparkleIcon />
        <h2 className="pots-ai-goal-cta__title">{title}</h2>
      </div>
      <p className="pots-ai-goal-cta__description">{description}</p>
      {action}
    </section>
  )
}
