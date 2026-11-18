// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=150-4601
// source=src/components/home/TransactionRow.tsx
// component=TransactionRow
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Debit': 'debit',
  'Credit': 'credit',
  'Pot': 'pot',
  'Scheduled': 'scheduled',
})
const label = instance.getString('Label')
const showDescription = instance.getBoolean('Show description')
const description = showDescription ? instance.getString('Description') : undefined
// Type sets the sign, so code takes the absolute value ("+€300.00" → 300).
const amount = Number(instance.getString('Amount').replace(/[^\d.]/g, ''))
const date = instance.getString('Date')
const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<TransactionRow
  type="${type}"
  label="${label}"${description ? figma.code`
  description="${description}"` : ''}
  amount={${amount}}
  date="${date}"${iconCode ? figma.code`
  icon={${iconCode}}` : ''}
/>`,
  imports: ['import { TransactionRow } from "@/components/home/TransactionRow"'],
  id: 'home-transaction-row',
  metadata: { nestable: true },
}
