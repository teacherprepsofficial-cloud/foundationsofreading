
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const SUBAREA_ROWS = [
  { label: 'Foundations of Reading Development', mc: true, level: 'Many', colIndex: 1 },
  { label: 'Development of Reading Comprehension', mc: true, level: 'Most', colIndex: 0 },
  { label: 'Reading Assessment and Instruction', mc: true, level: 'Some', colIndex: 2 },
]

const CR_ROWS = [
  { label: 'Integration of Knowledge and Understanding — Written Response 1', level: 'Adequate', colIndex: 1 },
  { label: 'Integration of Knowledge and Understanding — Written Response 2', level: 'Thorough', colIndex: 0 },
]

const MC_COLS = ['Most', 'Many', 'Some', 'Few']
const CR_COLS = ['Thorough', 'Adequate', 'Limited', 'Weak']

export default function ResultsDemoPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            This is an example of what your results page looks like after every practice test.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get full access →</a>
          </p>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Example</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Practice Test Results</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Your results mirror the real NES score report — same format, same scoring scale.
          </p>

          {/* Score report */}
          <div className="mt-8 overflow-hidden rounded-xl border border-[#e8e0e2] bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-[#e8e0e2] bg-[#7c1c2e] px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>Foundations of Reading Exam Preparation</p>
              <p className="mt-1 text-xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Practice Test 1 Results</p>
            </div>

            {/* Test results table */}
            <div className="border-b border-[#e8e0e2] px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Test Results</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-[#e8e0e2]">
                      {['Date Taken', 'Score', 'Passing Score', 'Status'].map((h) => (
                        <th key={h} className="pb-2 text-left text-xs font-semibold text-[#6b6b6b]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 text-[#1a1a1a]">Mar 31, 2026</td>
                      <td className="py-3 font-bold text-[#1a1a1a]">236</td>
                      <td className="py-3 text-[#6b6b6b]">220</td>
                      <td className="py-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">Pass</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* MC subarea performance */}
            <div className="border-b border-[#e8e0e2] px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Multiple-Choice Performance by Subarea</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-[#e8e0e2]">
                      <th className="pb-2 text-left text-xs font-semibold text-[#6b6b6b]">Subarea</th>
                      {MC_COLS.map((c) => (
                        <th key={c} className="pb-2 text-center text-xs font-semibold text-[#6b6b6b]">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e0e2]">
                    {SUBAREA_ROWS.map((row) => (
                      <tr key={row.label}>
                        <td className="py-3 pr-4 text-xs text-[#1a1a1a] leading-snug">{row.label}</td>
                        {MC_COLS.map((_, ci) => (
                          <td key={ci} className="py-3 text-center">
                            {ci === row.colIndex ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7c1c2e] text-xs font-bold text-white">✓</span>
                            ) : (
                              <span className="text-[#e8e0e2]">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                <strong>Most</strong> items correct · <strong>Many</strong> items correct · <strong>Some</strong> items correct · <strong>Few</strong> items correct
              </p>
            </div>

            {/* CR performance */}
            <div className="px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Open-Response Performance</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-[#e8e0e2]">
                      <th className="pb-2 text-left text-xs font-semibold text-[#6b6b6b]">Assignment</th>
                      {CR_COLS.map((c) => (
                        <th key={c} className="pb-2 text-center text-xs font-semibold text-[#6b6b6b]">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e0e2]">
                    {CR_ROWS.map((row) => (
                      <tr key={row.label}>
                        <td className="py-3 pr-4 text-xs text-[#1a1a1a] leading-snug">{row.label}</td>
                        {CR_COLS.map((_, ci) => (
                          <td key={ci} className="py-3 text-center">
                            {ci === row.colIndex ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7c1c2e] text-xs font-bold text-white">✓</span>
                            ) : (
                              <span className="text-[#e8e0e2]">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                <strong>Thorough</strong> · <strong>Adequate</strong> · <strong>Limited</strong> · <strong>Weak</strong>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
            <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Get this for every practice test you take.</p>
            <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              2–4 full-length tests, each with a real NES-format results page. Know exactly where you stand.
            </p>
            <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
              Get Full Access →
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
