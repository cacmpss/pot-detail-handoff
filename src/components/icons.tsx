/**
 * Placeholder icon exports. In production these come from the icon library that
 * backs the Figma "icon/*" components; only the names used on this screen are listed.
 */
const Icon = ({ name }: { name: string }) => <svg className={`icon icon--${name}`} width={20} height={20} aria-hidden="true" />

export const ArrowLeftIcon = () => <Icon name="arrow-left" />
export const HelpIcon = () => <Icon name="circle-help" />
export const SparkleIcon = () => <Icon name="sparkles" />
