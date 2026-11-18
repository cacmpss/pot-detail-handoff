import type { ReactNode } from 'react'

/** Figma: Pots / Action tile (165:5179). Pressed is a CSS :active state, not a prop. */
export interface ActionTileProps {
  /** Figma: Label. */
  label: string
  /** Figma: Icon (instance swap). */
  icon: ReactNode
  /** Figma: State = Disabled. */
  disabled?: boolean
  onPress?: () => void
}

export function ActionTile({ label, icon, disabled = false, onPress }: ActionTileProps) {
  return (
    <button type="button" className="pots-action-tile" disabled={disabled} onClick={onPress}>
      <span className="pots-action-tile__icon" aria-hidden="true">{icon}</span>
      <span className="pots-action-tile__label">{label}</span>
    </button>
  )
}
