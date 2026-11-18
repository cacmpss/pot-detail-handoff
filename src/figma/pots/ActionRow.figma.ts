// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=221-5016
// source=src/components/pots/ActionRow.tsx
// component=ActionRow
import figma from 'figma'
const instance = figma.selectedInstance

// The row always holds three Action tiles. Each one renders through its own template.
const tiles = instance.findConnectedInstances((node) => node.codeConnectId() === 'pots-action-tile')
const first = tiles[0]?.executeTemplate().example
const second = tiles[1]?.executeTemplate().example
const third = tiles[2]?.executeTemplate().example

export default {
  example: figma.code`<ActionRow>
  ${first}
  ${second}
  ${third}
</ActionRow>`,
  imports: ['import { ActionRow } from "@/components/pots/ActionRow"'],
  id: 'pots-action-row',
  metadata: { nestable: true },
}
