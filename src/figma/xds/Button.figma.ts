// url=https://www.figma.com/design/<XDS_LIBRARY_FILE_KEY>/XDS?node-id=2-7
// TODO: Button lives in the remote XDS library. Replace the file key with the XDS library file before publishing.
// source=src/components/xds/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const variant = instance.getEnum('Variant', {
  'Primary': 'primary',
  'Secondary': 'secondary',
  'Ghost': 'ghost',
  'Destructive': 'destructive',
})
const size = instance.getEnum('Size', {
  'SM': 'sm',
  'MD': 'md',
  'LG': 'lg',
})
// Hover, Pressed and Focused are CSS interaction states; only Disabled and Loading become props.
const state = instance.getEnum('State', {
  'Rest': 'rest',
  'Hover': 'rest',
  'Pressed': 'rest',
  'Focused': 'rest',
  'Disabled': 'disabled',
  'Loading': 'loading',
})
const iconOnly = instance.getEnum('Type', {
  'Default': false,
  'Icon Only': true,
})
const elevation = instance.getEnum('Elevation', {
  'none': 'none',
  'low': 'low',
  'med': 'med',
  'high': 'high',
})

const hasIcon = instance.getBoolean('Icon')
const iconSwap = hasIcon ? instance.getInstanceSwap('Icon Source') : null
let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}

const hasEndContent = instance.getBoolean('Has End Content')
const endContent = hasEndContent ? instance.getSlot('End Content') : undefined

export default {
  example: figma.code`<Button
  variant="${variant}"
  size="${size}"${elevation !== 'none' ? figma.code`
  elevation="${elevation}"` : ''}${iconOnly ? figma.code`
  iconOnly` : ''}${iconCode ? figma.code`
  icon={${iconCode}}` : ''}${endContent ? figma.code`
  endContent={${endContent}}` : ''}${state === 'disabled' ? figma.code`
  disabled` : ''}${state === 'loading' ? figma.code`
  loading` : ''}
  onClick={() => {}}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@/components/xds/Button"'],
  id: 'button',
  metadata: { nestable: true },
}
