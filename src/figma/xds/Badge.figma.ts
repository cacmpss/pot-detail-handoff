// url=https://www.figma.com/design/<XDS_LIBRARY_FILE_KEY>/XDS?node-id=2-128
// TODO: Badge lives in the remote XDS library. Replace the file key with the XDS library file before publishing.
// source=src/components/xds/Badge.tsx
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const withIcon = instance.getBoolean('Icon')
const variant = instance.getEnum('Variant', {
  'Neutral': 'neutral',
  'Info': 'info',
  'Success': 'success',
  'Warning': 'warning',
  'Error': 'error',
  'Blue': 'blue',
  'Green': 'green',
  'Purple': 'purple',
  'Cyan': 'cyan',
  'Orange': 'orange',
  'Pink': 'pink',
  'Red': 'red',
  'Teal': 'teal',
  'Yellow': 'yellow',
})
const shape = instance.getEnum('Shape', {
  'Pill': 'pill',
  'Dot': 'dot',
})

export default {
  example: figma.code`<Badge variant="${variant}"${shape !== 'pill' ? figma.code` shape="${shape}"` : ''}${withIcon ? ' withIcon' : ''}>${label}</Badge>`,
  imports: ['import { Badge } from "@/components/xds/Badge"'],
  id: 'badge',
  metadata: { nestable: true },
}
