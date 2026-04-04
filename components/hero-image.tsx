'use client'

export function HeroImage() {
  return (
    <div className="hidden lg:flex lg:justify-end">
      <div className="relative h-[520px] w-[420px] overflow-hidden rounded-2xl bg-[#5a1220] ring-1 ring-white/20 shadow-2xl">
        {/* Drop a vertical/square photo at /public/images/teacher-hero.jpg */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/teacher-hero.jpg"
          alt="Teacher in classroom"
          className="h-full w-full object-cover object-top"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Overlay badge */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Practice Test Score</p>
              <p className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>247 / 300</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-bold text-green-700" style={{ fontFamily: 'var(--font-sans)' }}>Pass ✓</span>
          </div>
        </div>
      </div>
    </div>
  )
}
