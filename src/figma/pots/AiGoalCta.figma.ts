// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=165-5247
// source=src/components/pots/AiGoalCta.tsx
// component=AiGoalCta
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
// The nested Button is passed in as the `action` prop.
const button = instance.findConnectedInstance('button')
let actionCode
if (button && button.type === 'INSTANCE') {
  actionCode = button.executeTemplate().example
}

export default {
  example: figma.code`<AiGoalCta
  title="${title}"
  description="${description}"${actionCode ? figma.code`
  action={${actionCode}}` : ''}
/>`,
  imports: ['import { AiGoalCta } from "@/components/pots/AiGoalCta"'],
  id: 'pots-ai-goal-cta',
  metadata: { nestable: true },
}
