// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=165-5195
// source=src/components/pots/ScheduleCard.tsx
// component=ScheduleCard
import figma from 'figma'
const instance = figma.selectedInstance

const deposit = instance.getString('Deposit')
const day = instance.getString('Day')
const from = instance.getString('From')
const note = instance.getString('Good to know')
// "Change day" and "Pause plan" have fixed labels inside the component; code exposes their handlers.

export default {
  example: figma.code`<ScheduleCard
  deposit="${deposit}"
  day="${day}"
  from="${from}"
  note="${note}"
  onChangeDay={() => {}}
  onPause={() => {}}
/>`,
  imports: ['import { ScheduleCard } from "@/components/pots/ScheduleCard"'],
  id: 'pots-schedule-card',
  metadata: { nestable: true },
}
