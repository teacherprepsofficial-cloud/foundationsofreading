import Link from 'next/link'
import { type StateData } from '@/data/states'

interface StateCardProps {
  state: StateData
}

export function StateCard({ state }: StateCardProps) {
  return (
    <Link
      href={`/states/${state.slug}`}
      className="group flex items-center justify-between rounded-lg border border-ivory-200 bg-white px-5 py-4 transition-all hover:border-maroon-300 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-maroon-50 text-sm font-bold text-maroon-800 transition-colors group-hover:bg-maroon-100">
          {state.abbreviation}
        </span>
        <div>
          <p className="font-medium text-gray-900">{state.name}</p>
          <p className="text-xs text-gray-500">Passing: {state.passingScore}/300</p>
        </div>
      </div>
      <svg
        className="h-5 w-5 text-gray-400 transition-colors group-hover:text-maroon-800"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  )
}
