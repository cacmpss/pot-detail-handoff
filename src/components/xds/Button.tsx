import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonElevation = 'none' | 'low' | 'med' | 'high'

/**
 * Stand-in for the XDS Button (remote library component "Button").
 * Hover / Pressed / Focused are interaction states handled by CSS, not props.
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  elevation?: ButtonElevation
  /** Leading icon. Figma: Icon (boolean) + Icon Source (instance swap). */
  icon?: ReactNode
  /** Figma: Type = Icon Only. The label becomes the accessible name. */
  iconOnly?: boolean
  /** Figma: Has End Content + End Content (slot). */
  endContent?: ReactNode
  /** Figma: State = Loading. */
  loading?: boolean
  /** Visible label, or accessible name when iconOnly. */
  children: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  elevation = 'none',
  icon,
  iconOnly = false,
  endContent,
  loading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const className = [
    'xds-button',
    `xds-button--${variant}`,
    `xds-button--${size}`,
    `xds-elevation--${elevation}`,
    iconOnly && 'xds-button--icon-only',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={iconOnly ? children : undefined}
      {...rest}
    >
      {icon && <span className="xds-button__icon" aria-hidden="true">{icon}</span>}
      {!iconOnly && <span className="xds-button__label">{children}</span>}
      {endContent}
    </button>
  )
}
