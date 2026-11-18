import type { ReactNode } from 'react'
import { formatMoney } from '../../lib/format'

/** Figma: Pots / Pot balance (221:5039). */
export interface PotBalanceProps {
  /** Figma: Amount, as a number. Formatted with 2 decimals. */
  amount: number
  currency?: string
  /** Plan status. Figma: nested Badge. */
  status?: ReactNode
  /** Figma: nested Pots / Goal progress. */
  progress?: ReactNode
}

export function PotBalance({ amount, currency = 'EUR', status, progress }: PotBalanceProps) {
  return (
    <section className="pots-pot-balance" aria-label="Pot balance">
      <div className="pots-pot-balance__row">
        <p className="pots-pot-balance__amount">{formatMoney(amount, { currency, fractionDigits: 2 })}</p>
        {status}
      </div>
      {progress}
    </section>
  )
}
