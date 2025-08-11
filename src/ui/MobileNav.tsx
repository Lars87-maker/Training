
import { NavLink } from 'react-router-dom'

const iconCls = "w-5 h-5"
const Label = ({children}:{children:React.ReactNode}) => (
  <span className="text-[11px] leading-none mt-1">{children}</span>
)

const HomeIcon = ({active}:{active:boolean}) => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" className={active ? "" : "opacity-80"} />
  </svg>
)
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 14l9 5 9-5" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const CogIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M20.4 12a8.4 8.4 0 0 0-.1-1l2-1.5-2-3.5-2.4.8a8.6 8.6 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a8.6 8.6 0 0 0-1.7 1L5.7 6.1 3.7 9.6l2 1.4a8.4 8.4 0 0 0 0 2l-2 1.4 2 3.5 2.4-.8a8.6 8.6 0 0 0 1.7 1l.3 2.5h4l.3-2.5a8.6 8.6 0 0 0 1.7-1l2.4.8 2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
  </svg>
)

const LinkBtn = ({to, label, icon}:{to:string; label:string; icon:(p:{active:boolean})=>JSX.Element}) => (
  <NavLink
    to={to}
    className={({isActive}) =>
      `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 ${isActive ? 'text-white' : 'text-white/80'}`
    }
  >
    {({isActive}) => <><span className="sr-only">{label}</span>{icon({active:isActive})}<Label>{label}</Label></>}
  </NavLink>
)

export default function MobileNav(){
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_-4px_16px_rgba(0,0,0,.25)] rounded-t-2xl 
                 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 text-xs">
        <LinkBtn to="/" label="Home" icon={HomeIcon} />
        <LinkBtn to="/fase/1" label="Fase 1" icon={LayersIcon} />
        <LinkBtn to="/fase/2" label="Fase 2" icon={LayersIcon} />
        <LinkBtn to="/fase/3" label="Fase 3" icon={LayersIcon} />
        <LinkBtn to="/settings" label="Instel." icon={CogIcon} />
      </div>
    </nav>
  )
}
