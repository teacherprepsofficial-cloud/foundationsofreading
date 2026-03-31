
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function FreeStudyGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Free preview — Subarea I, Objective 1 only.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the complete guide →</a>
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Preview · Subarea I</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Study Guide</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Full guide covers all 4 subareas and 11 objectives. Below is a sample from Objective 1.</p>

          <div className="mt-8 rounded-lg border border-[#e8e0e2] bg-white p-7">
            {/* Subarea label */}
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#7c1c2e] text-sm font-bold text-white" style={{ fontFamily: 'var(--font-sans)' }}>I</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Subarea I — 35% of Exam</p>
                <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Foundations of Reading Development</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#e8e0e2] pt-6">
              <h2 className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Objective 1: Phonological and Phonemic Awareness</h2>

              <h3 className="mt-5 text-base font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>What Is Phonological Awareness?</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#444]" style={{ fontFamily: 'var(--font-sans)' }}>
                Phonological awareness is the ability to hear and manipulate the sound structure of spoken language — independent of meaning. It includes awareness at multiple levels: words, syllables, onset-rime, and individual phonemes.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#444]" style={{ fontFamily: 'var(--font-sans)' }}>
                <strong>Phonemic awareness</strong> is a subset — it refers specifically to awareness of individual phonemes, the smallest units of sound. A student who can blend /k/ /æ/ /t/ into &ldquo;cat&rdquo; or segment &ldquo;ship&rdquo; into /ʃ/ /ɪ/ /p/ is demonstrating phonemic awareness.
              </p>

              <h3 className="mt-6 text-base font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>The Phonological Awareness Continuum</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#444]" style={{ fontFamily: 'var(--font-sans)' }}>
                Phonological awareness skills develop along a continuum from larger to smaller units:
              </p>
              <div className="mt-3 space-y-2">
                {[
                  { skill: 'Word Awareness', example: 'Identifying how many words are in a sentence' },
                  { skill: 'Syllable Awareness', example: 'Clapping syllables: "but·ter·fly" = 3 claps' },
                  { skill: 'Onset-Rime Awareness', example: 'Recognizing "cat," "bat," and "sat" share the same rime (-at)' },
                  { skill: 'Phoneme Awareness', example: 'Isolating the first sound in "dog" → /d/' },
                ].map((row) => (
                  <div key={row.skill} className="flex gap-3 rounded bg-[#faf8f5] px-4 py-3">
                    <span className="shrink-0 font-bold text-[#7c1c2e] text-sm" style={{ fontFamily: 'var(--font-sans)' }}>→</span>
                    <div>
                      <span className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{row.skill}: </span>
                      <span className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{row.example}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-base font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Key Phonemic Awareness Skills to Know</h3>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#e8e0e2]">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead className="bg-[#faf8f5]">
                    <tr>
                      <th className="border-b border-[#e8e0e2] px-4 py-2 text-left text-xs font-semibold text-[#6b6b6b]">Skill</th>
                      <th className="border-b border-[#e8e0e2] px-4 py-2 text-left text-xs font-semibold text-[#6b6b6b]">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e0e2]">
                    {[
                      ['Blending', '/m/ /æ/ /p/ → "map"'],
                      ['Segmenting', '"sun" → /s/ /ʌ/ /n/'],
                      ['Deletion', '"smile" without /s/ → "mile"'],
                      ['Substitution', 'Change /p/ in "pan" to /m/ → "man"'],
                      ['Isolation', 'First sound in "fish" → /f/'],
                    ].map(([s, e]) => (
                      <tr key={s}>
                        <td className="px-4 py-2.5 font-semibold text-[#1a1a1a]">{s}</td>
                        <td className="px-4 py-2.5 text-[#6b6b6b]">{e}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Blur / paywall */}
          <div className="relative mt-0 overflow-hidden rounded-b-lg">
            <div className="pointer-events-none select-none rounded-lg border border-[#e8e0e2] bg-white p-7 opacity-30 blur-sm">
              <h2 className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Objective 2: Concepts of Print and the Alphabetic Principle</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#444]" style={{ fontFamily: 'var(--font-sans)' }}>
                Concepts of print refers to the foundational understanding of how written language works. Students must understand that print carries meaning, that English reads left-to-right and top-to-bottom, and that spaces separate words...
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/80">
              <p className="text-center font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Continue with the full guide</p>
              <p className="mt-1 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>10 more objectives across all 4 subareas</p>
              <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
                Get Full Access — $49
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
