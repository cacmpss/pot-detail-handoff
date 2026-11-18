import { Button } from '../xds/Button'
import { ArrowLeftIcon, HelpIcon } from '../icons'

/** Figma: Pots / Top bar (221:4986). */
export interface TopBarProps {
  onBack: () => void
  /** Figma: Show help. */
  showHelp?: boolean
  onHelp?: () => void
}

export function TopBar({ onBack, showHelp = false, onHelp }: TopBarProps) {
  return (
    <header className="pots-top-bar">
      <Button variant="secondary" iconOnly icon={<ArrowLeftIcon />} onClick={onBack}>
        Back
      </Button>
      {showHelp && (
        <Button variant="ghost" iconOnly icon={<HelpIcon />} onClick={onHelp}>
          Help
        </Button>
      )}
    </header>
  )
}
