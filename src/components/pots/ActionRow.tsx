import type { ReactNode } from 'react'

/** Figma: Pots / Action row (221:5016). Lays out three ActionTile children. */
export interface ActionRowProps {
  children: ReactNode
}

export function ActionRow({ children }: ActionRowProps) {
  return <div className="pots-action-row" role="group" aria-label="Pot actions">{children}</div>
}
