import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { studyGuide190 } from '@/data/study-guide-190'

export default function FreeStudyGuidePage() {
  const subareaI = studyGuide190.find((s) => s.id === 'I')!
  const obj1 = subareaI.sections[0]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">

        {/* Top banner */}
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Free preview — Subarea I, Objective 1 only.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the complete guide →</a>
          </p>
        </div>

        <div className="px-6 py-10 max-w-5xl mx-auto">

          {/* Page heading */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Free Preview · Subarea I · {subareaI.weight} of Exam
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
              {subareaI.name}
            </h1>
            <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              Full guide covers all 4 subareas and 11 objectives. Below is the complete Objective 1.
            </p>
          </div>

          {/* Objective 1 content */}
          <div className="rounded-xl border border-[#e8e0e2] bg-white px-8 py-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
              Objective {obj1.objectiveNum}
            </p>
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              {obj1.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: obj1.content }} />
          </div>

          {/* Paywall blur */}
          <div className="relative mt-6 overflow-hidden rounded-xl">
            <div className="pointer-events-none select-none rounded-xl border border-[#e8e0e2] bg-white px-8 py-8 opacity-30 blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Objective 2</p>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Phonics, High-Frequency Words, and Spelling
              </h2>
              <p className="text-sm leading-relaxed text-[#444]" style={{ fontFamily: 'var(--font-sans)' }}>
                Phonics instruction teaches the systematic relationships between letters (graphemes) and sounds (phonemes), enabling students to decode unfamiliar words accurately and build automatic word recognition...
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/80">
              <p className="text-center text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Continue with the full guide</p>
              <p className="mt-1 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>10 more objectives across all 4 subareas</p>
              <a
                href="/#pricing"
                className="mt-4 inline-block rounded-lg bg-[#7c1c2e] px-10 py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Get Full Access →
              </a>
            </div>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  )
}
