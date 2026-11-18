// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=221-5032
// source=src/components/pots/PotHero.tsx
// component=PotHero
import figma from 'figma'
const instance = figma.selectedInstance

const name = instance.getString('Name')
const goal = instance.getString('Goal')
// The category icon is not a component property yet (see SPEC.md › Gaps), so `icon` is not emitted.

export default {
  example: figma.code`<PotHero name="${name}" goal="${goal}" />`,
  imports: ['import { PotHero } from "@/components/pots/PotHero"'],
  id: 'pots-pot-hero',
  metadata: { nestable: true },
}
