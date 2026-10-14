import {
  Atom,
  Braces,
  Citrus,
  Code,
  Cpu,
  Database,
  FileCode2,
  FileSpreadsheet,
  Gem,
  GitBranch,
  GraduationCap,
  Hammer,
  Layers,
  Leaf,
  MapPin,
  MessageCircle,
  Moon,
  Palette,
  ReceiptText,
  Rocket,
  School,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Sun,
  Triangle,
  UserRound,
  WifiOff,
  Zap,
  MonitorSmartphone,
  MapPinned,
} from 'lucide-react'

export const CONTACT = {
  phone: '+237 694 78 71 67',
  whatsapp: '237694787167',
  email: 'diderohdurel@gmail.com',
  github: 'https://github.com/DIDEROH',
}

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** Couleurs « theme-color » du navigateur (barre d'adresse mobile). À garder alignées avec index.html. */
export const THEMES = [
  { id: 'light', icon: Sun, meta: '#ffffff' },
  { id: 'night', icon: Moon, meta: '#0f172a' },
  { id: 'lemonade', icon: Citrus, meta: '#f8fdef' },
  { id: 'cyberpunk', icon: Cpu, meta: '#fff248' },
  { id: 'luxury', icon: Gem, meta: '#09090b' },
]

export const LANGUAGES = [
  { code: 'fr', label: 'Français', greeting: 'Bonjour' },
  { code: 'en', label: 'English', greeting: 'Hello' },
  { code: 'es', label: 'Español', greeting: 'Hola' },
  { code: 'de', label: 'Deutsch', greeting: 'Hallo' },
  { code: 'pl', label: 'Polski', greeting: 'Cześć' },
  { code: 'it', label: 'Italiano', greeting: 'Ciao' },
]

export const NAV_LINKS = [
  { id: 'services', key: 'nav.services' },
  { id: 'projets', key: 'nav.projects' },
  { id: 'competences', key: 'nav.skills' },
  { id: 'contact', key: 'nav.contact' },
]

export const SERVICES = [
  { id: 'presence', icon: MapPin, price: 35000 },
  { id: 'showcase', icon: MonitorSmartphone, price: 100000, featured: true },
  { id: 'store', icon: ShoppingBag, price: 200000 },
  { id: 'maintenance', icon: ShieldCheck, price: 10000, monthly: true },
]

/** Les tags connus sont traduits (projects.tags.*), les autres sont des noms de technos. */
export const PROJECTS = [
  {
    id: 'staloys',
    name: 'École Saint Aloys',
    short: 'St Aloys',
    url: 'https://ecole-st-aloys.com',
    domain: 'ecole-st-aloys.com',
    kind: 'client',
    tags: ['showcase', 'responsive'],
    icon: School,
    gradient: 'linear-gradient(135deg, #0038b5 0%, #2563eb 55%, #60a5fa 100%)',
  },
  {
    id: 'edunote',
    name: 'EduNote',
    short: 'EduNote',
    url: 'https://edunote-est.vercel.app',
    domain: 'edunote-est.vercel.app',
    kind: 'client',
    tags: ['webapp', 'offline', 'Vercel'],
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)',
  },
  {
    id: 'dugescool',
    name: 'DUGESCOOL',
    short: 'DUGESCOOL',
    url: CONTACT.github,
    domain: 'github.com/DIDEROH',
    kind: 'personal',
    tags: ['Laravel', 'MySQL', 'offline'],
    icon: Database,
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #22d3ee 100%)',
  },
  {
    id: 'durinfo',
    name: 'DURINFO',
    short: 'DURINFO',
    url: CONTACT.github,
    domain: 'github.com/DIDEROH',
    kind: 'personal',
    tags: ['React', 'Laravel'],
    icon: Store,
    gradient: 'linear-gradient(135deg, #020617 0%, #172554 50%, #1d4ed8 100%)',
  },
]

/** `key` = nom traduit (skills.names.*), sinon `name` est affiché tel quel. */
export const SKILLS = [
  { name: 'React', cat: 'front', icon: Atom, featured: true },
  { name: 'Laravel', cat: 'back', icon: Layers, featured: true },
  { name: 'HTML5', cat: 'front', icon: FileCode2 },
  { name: 'CSS3', cat: 'front', icon: Palette },
  { name: 'Next.js', cat: 'front', icon: Triangle },
  { name: 'JavaScript', cat: 'front', icon: Braces },
  { name: 'PHP', cat: 'back', icon: Code },
  { name: 'Django', cat: 'back', icon: Leaf },
  { name: 'MySQL', cat: 'back', icon: Database },
  { key: 'pwa', cat: 'front', icon: WifiOff },
  { name: 'Git & GitHub', cat: 'tools', icon: GitBranch },
  { key: 'mm', cat: 'tools', icon: Smartphone },
  { key: 'ai', cat: 'tools', icon: Sparkles },
  { key: 'office', cat: 'tools', icon: FileSpreadsheet },
]

export const SKILL_FILTERS = ['all', 'front', 'back', 'tools']

export const WHY = [
  { id: 'fast', icon: Zap },
  { id: 'local', icon: MapPinned },
  { id: 'contact', icon: UserRound },
]

export const PROCESS = [
  { id: 'talk', icon: MessageCircle },
  { id: 'quote', icon: ReceiptText },
  { id: 'build', icon: Hammer },
  { id: 'launch', icon: Rocket },
]
