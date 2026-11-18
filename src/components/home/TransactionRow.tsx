import type { ReactNode } from 'react'
import { formatMoney } from '../../lib/format'

export type TransactionType = 'debit' | 'credit' | 'pot' | 'scheduled'

/**
 * Figma: Home / Transaction row (150:4601).
 * Type sets the sign and the amount colour, so `amount` is always positive.
 */
export interface TransactionRowProps {
  type: TransactionType
  /** Figma: Label. */
  label: string
  /** Figma: Description. Omit to hide (Figma: Show description = false). */
  description?: string
  /** Figma: Amount, as a positive number. */
  amount: number
  /** Figma: Date. Display-ready, e.g. "5 Feb". */
  date: string
  /** Figma: Icon (instance swap). */
  icon: ReactNode
  currency?: string
}

const SIGN: Record<TransactionType, string> = { debit: '−', credit: '+', pot: '+', scheduled: '' }

export function TransactionRow({ type, label, description, amount, date, icon, currency = 'EUR' }: TransactionRowProps) {
  return (
    <li className={`home-transaction-row home-transaction-row--${type}`}>
      <span className="home-transaction-row__icon" aria-hidden="true">{icon}</span>
      <div className="home-transaction-row__text">
        <p className="home-transaction-row__label">{label}</p>
        {description && <p className="home-transaction-row__description">{description}</p>}
      </div>
      <div className="home-transaction-row__meta">
        <p className="home-transaction-row__amount">
          {SIGN[type]}{formatMoney(amount, { currency, fractionDigits: 2 })}
        </p>
        <p className="home-transaction-row__date">{date}</p>
      </div>
    </li>
  )
}
