import arrowDownIcon from '@/assets/icons/arrow-down-icon.png'

type RuleSectionProps = {
  id: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const Drawer = ({ id, title, children, defaultOpen }: RuleSectionProps) => (
  <details
    id={id}
    open={defaultOpen}
    className="group rounded-lg w-full bg-boxGray p-5 text-black-white"
  >
    <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
      <span className="font-medium text-[15px]">{title}</span>
      <img
        src={arrowDownIcon}
        className="h-6 w-6 transition-transform duration-200 group-open:rotate-180"
        alt="arrow-up-down"
      />
    </summary>
    <div className="mt-4 space-y-4 text-sm leading-7">{children}</div>
  </details>
)

export default Drawer
