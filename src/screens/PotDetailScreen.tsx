import type { ReactNode } from 'react'
import { Badge } from '../components/xds/Badge'
import { Button } from '../components/xds/Button'
import { TopBar } from '../components/pots/TopBar'
import { PotHero } from '../components/pots/PotHero'
import { PotBalance } from '../components/pots/PotBalance'
import { GoalProgress } from '../components/pots/GoalProgress'
import { ActionRow } from '../components/pots/ActionRow'
import { ActionTile } from '../components/pots/ActionTile'
import { AiGoalCta } from '../components/pots/AiGoalCta'
import { ScheduleCard } from '../components/pots/ScheduleCard'
import { ListHeader } from '../components/pots/ListHeader'
import { TransactionRow, type TransactionType } from '../components/home/TransactionRow'
import { formatMoney } from '../lib/format'

/** Data the screen needs. Comes from the pots API; nothing here is computed by the AI. */
export interface PotDetail {
  name: string
  goal: { amount: number; by: string /* "Aug 2027" */ }
  balance: number
  plan: {
    status: 'scheduled' | 'paused'
    monthlyAmount: number
    deposits: number
    dayLabel: string // "Every 5th, Feb to Aug 2027"
    nextDepositLabel: string // "5 Feb"
    sourceAccountLabel: string // "Current account ending 0372"
    scheduledTotal: number
  } | null
  activity: { id: string; type: TransactionType; label: string; description?: string; amount: number; date: string; icon: ReactNode }[]
}

export interface PotDetailScreenProps {
  pot: PotDetail
  icons: { category: ReactNode; deposit: ReactNode; withdraw: ReactNode; modify: ReactNode; sparkle: ReactNode }
  onBack: () => void
  onDeposit: () => void
  onWithdraw: () => void
  onModify: () => void
  /** Opens the assistant with this pot as context. */
  onAskAssistant: () => void
  onChangeDay: () => void
  onPausePlan: () => void
  onSeeAllActivity: () => void
}

export function PotDetailScreen({ pot, icons, ...on }: PotDetailScreenProps) {
  const { plan } = pot
  const scheduled = plan?.scheduledTotal ?? 0
  const gap = Math.max(pot.goal.amount - pot.balance - scheduled, 0)

  return (
    <main className="pot-detail">
      <TopBar onBack={on.onBack} />

      <PotHero
        name={pot.name}
        goal={`Goal ${formatMoney(pot.goal.amount)} by ${pot.goal.by}`}
        icon={icons.category}
      />

      <PotBalance
        amount={pot.balance}
        status={
          plan && (
            <Badge variant={plan.status === 'scheduled' ? 'success' : 'warning'}>
              {plan.status === 'scheduled'
                ? `Scheduled · ${formatMoney(plan.monthlyAmount)} · ${plan.nextDepositLabel}`
                : 'Paused'}
            </Badge>
          )
        }
        progress={<GoalProgress saved={pot.balance} scheduled={scheduled} goal={pot.goal.amount} />}
      />

      <ActionRow>
        <ActionTile label="Deposit" icon={icons.deposit} onPress={on.onDeposit} />
        <ActionTile label="Withdraw" icon={icons.withdraw} disabled={pot.balance === 0} onPress={on.onWithdraw} />
        <ActionTile label="Modify" icon={icons.modify} onPress={on.onModify} />
      </ActionRow>

      {gap > 0 && (
        <AiGoalCta
          title={`You're ${formatMoney(gap)} short of your ${formatMoney(pot.goal.amount)} goal`}
          description="Want to see ways to close the gap?"
          action={
            <Button variant="primary" icon={icons.sparkle} onClick={on.onAskAssistant}>
              Show me ways
            </Button>
          }
        />
      )}

      {plan && (
        <ScheduleCard
          deposit={`${formatMoney(plan.monthlyAmount)} a month · ${plan.deposits} deposits`}
          day={plan.dayLabel}
          from={plan.sourceAccountLabel}
          note="If the 5th falls on a weekend or holiday, it moves to the next working day. We'll remind you the day before."
          onChangeDay={on.onChangeDay}
          onPause={on.onPausePlan}
        />
      )}

      <ListHeader
        title="Activity"
        trailing={<Button variant="ghost" size="sm" onClick={on.onSeeAllActivity}>See all</Button>}
      />
      <ul className="pot-detail__activity">
        {pot.activity.map(({ id, ...row }) => (
          <TransactionRow key={id} {...row} />
        ))}
      </ul>
    </main>
  )
}
