// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=221-4986
// source=src/components/pots/TopBar.tsx
// component=TopBar
import figma from 'figma'
const instance = figma.selectedInstance

// The back button is rendered by TopBar itself, so its nested instance is not mapped here.
const showHelp = instance.getBoolean('Show help')

export default {
  example: figma.code`<TopBar
  onBack={() => {}}${showHelp ? figma.code`
  showHelp
  onHelp={() => {}}` : ''}
/>`,
  imports: ['import { TopBar } from "@/components/pots/TopBar"'],
  id: 'pots-top-bar',
  metadata: { nestable: true },
}
