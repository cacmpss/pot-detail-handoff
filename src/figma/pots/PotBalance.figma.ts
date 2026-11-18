// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=221-5039
// source=src/components/pots/PotBalance.tsx
// component=PotBalance
import figma from 'figma'
const instance = figma.selectedInstance

// Figma stores display text ("€300.00"); code takes a number and formats it.
const amount = Number(instance.getString('Amount').replace(/[^\d.]/g, ''))

// Badge and Goal progress are nested instances, not properties. Resolve them through their own templates.
const status = instance.findConnectedInstance('badge')
let statusCode
if (status && status.type === 'INSTANCE') {
  statusCode = status.executeTemplate().example
}
const progress = instance.findConnectedInstance('pots-goal-progress')
let progressCode
if (progress && progress.type === 'INSTANCE') {
  progressCode = progress.executeTemplate().example
}

export default {
  example: figma.code`<PotBalance
  amount={${amount}}${statusCode ? figma.code`
  status={${statusCode}}` : ''}${progressCode ? figma.code`
  progress={${progressCode}}` : ''}
/>`,
  imports: ['import { PotBalance } from "@/components/pots/PotBalance"'],
  id: 'pots-pot-balance',
  metadata: { nestable: true },
}
