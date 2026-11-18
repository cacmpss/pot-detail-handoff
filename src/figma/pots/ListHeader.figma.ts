// url=https://www.figma.com/design/nKL5vR1jB5EFNP3bVpJhJI/Camille-s-Challenge?node-id=221-5011
// source=src/components/pots/ListHeader.tsx
// component=ListHeader
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
// Trailing = Count holds a Badge; Trailing = Action holds a Button. Render whichever is present.
const trailingId = instance.getEnum('Trailing', {
  'Count': 'badge',
  'Action': 'button',
})
const trailing = instance.findConnectedInstance(trailingId)
let trailingCode
if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example
}

export default {
  example: figma.code`<ListHeader
  title="${title}"${trailingCode ? figma.code`
  trailing={${trailingCode}}` : ''}
/>`,
  imports: ['import { ListHeader } from "@/components/pots/ListHeader"'],
  id: 'pots-list-header',
  metadata: { nestable: true },
}
