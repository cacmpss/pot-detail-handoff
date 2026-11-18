// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=165-5180
// source=src/components/pots/GoalProgress.tsx
// component=GoalProgress
import figma from 'figma'
const instance = figma.selectedInstance

// Figma exposes three display strings ("Saved €300", "Scheduled €2,450", "To go €250").
// Code takes numbers and derives the labels and bar widths, so they can never disagree.
const toNumber = (text: string) => Number(text.replace(/[^\d.]/g, ''))
const saved = toNumber(instance.getString('Saved'))
const scheduled = toNumber(instance.getString('Scheduled'))
const toGo = toNumber(instance.getString('To go'))
const goal = saved + scheduled + toGo

export default {
  example: figma.code`<GoalProgress saved={${saved}} scheduled={${scheduled}} goal={${goal}} />`,
  imports: ['import { GoalProgress } from "@/components/pots/GoalProgress"'],
  id: 'pots-goal-progress',
  metadata: { nestable: true },
}
