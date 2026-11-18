export type BadgeVariant =
  | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  | 'blue' | 'green' | 'purple' | 'cyan' | 'orange' | 'pink' | 'red' | 'teal' | 'yellow'

export type BadgeShape = 'pill' | 'dot'

/** Stand-in for the XDS Badge (remote library component "Badge"). */
export interface BadgeProps {
  variant?: BadgeVariant
  shape?: BadgeShape
  /** Figma: Icon (boolean). Shows the variant's status icon before the label. */
  withIcon?: boolean
  /** Status text. Never rely on colour alone: the label carries the meaning. */
  children: string
}

export function Badge({ variant = 'neutral', shape = 'pill', withIcon = false, children }: BadgeProps) {
  return (
    <span className={`xds-badge xds-badge--${variant} xds-badge--${shape}`}>
      {withIcon && <span className="xds-badge__icon" aria-hidden="true" />}
      {shape === 'dot' ? <span className="visually-hidden">{children}</span> : children}
    </span>
  )
}
