import { cn } from '../../lib/motion'

/** Texte dont les lettres « roulent » vers le haut au survol du parent `.group`. */
export default function RollText({ children, className }) {
  const letters = [...children]
  return (
    <span className={cn('relative inline-flex overflow-hidden', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="flex">
        {letters.map((letter, i) => {
          const char = letter === ' ' ? ' ' : letter
          return (
            <span
              key={i}
              className="relative inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full"
              style={{ transitionDelay: `${i * 16}ms` }}
            >
              {char}
              <span className="absolute top-full left-0">{char}</span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
