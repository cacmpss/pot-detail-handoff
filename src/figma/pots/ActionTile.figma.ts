// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=165-5179
// source=src/components/pots/ActionTile.tsx
// component=ActionTile
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
// Pressed is a CSS :active state; only Disabled becomes a prop.
const disabled = instance.getEnum('State', {
  'Rest': false,
  'Pressed': false,
  'Disabled': true,
})
const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<ActionTile
  label="${label}"${iconCode ? figma.code`
  icon={${iconCode}}` : ''}${disabled ? figma.code`
  disabled` : ''}
  onPress={() => {}}
/>`,
  imports: ['import { ActionTile } from "@/components/pots/ActionTile"'],
  id: 'pots-action-tile',
  metadata: { nestable: true },
}
