import type { ReactNode } from 'react'

/**
 * Figma: Pots / List header (221:5011).
 * Trailing = Count → a neutral Badge; Trailing = Action → a ghost Button.
 */
export interface ListHeaderProps {
  /** Figma: Title. */
  title: string
  trailing?: ReactNode
}

export function ListHeader({ title, trailing }: ListHeaderProps) {
  return (
    <div className="pots-list-header">
      <h2 className="pots-list-header__title">{title}</h2>
      {trailing}
    </div>
  )
}
