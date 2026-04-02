import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import { studyGuide190 } from '@/data/study-guide-190'

export default async function StudyGuidePage({
  params,
}: {
  params: Promise<{ examCode: string }>
}) {
  const { examCode } = await params
  if (examCode !== '190' && examCode !== '890') notFound()

  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const access = await UserAccess.findOne({
    userId: auth.userId,
    examCode,
    isActive: true,
    expiresAt: { $gt: new Date() },
  })

  if (!access) redirect('/dashboard')

  const guide = studyGuide190 // same content for 190 and 890

  // Build flat nav items
  const navItems: { id: string; label: string; indent: boolean }[] = []
  for (const subarea of guide) {
    navItems.push({ id: `subarea-${subarea.id}`, label: `Subarea ${subarea.id}: ${subarea.name}`, indent: false })
    for (const sec of subarea.sections) {
      navItems.push({ id: sec.id, label: `${sec.objectiveNum}. ${sec.title}`, indent: true })
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="bg-[#7c1c2e] px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <Link href={`/dashboard/${examCode}`} className="text-sm text-[#e8b4bc] hover:text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            ← Back to Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Study Guide — NES {examCode}
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            All 4 subareas · All 11 objectives
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Contents
            </p>
            <nav className="mt-3 space-y-0.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block rounded px-3 py-1.5 text-xs hover:bg-[#f9f0f2] hover:text-[#7c1c2e] transition-colors ${
                    item.indent
                      ? 'pl-5 text-[#6b6b6b]'
                      : 'font-semibold text-[#1a1a1a]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3 space-y-10">
            {guide.map((subarea) => (
              <div key={subarea.id}>
                {/* Subarea header */}
                <div
                  id={`subarea-${subarea.id}`}
                  className="rounded-t-lg px-6 py-4 scroll-mt-6"
                  style={{ backgroundColor: '#7c1c2e' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Subarea {subarea.id}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {subarea.name}
                  </h2>
                </div>

                {/* Objective sections */}
                <div className="divide-y divide-[#e8e0e2] rounded-b-lg border border-t-0 border-[#e8e0e2] bg-white">
                  {subarea.sections.map((sec) => (
                    <div key={sec.id} id={sec.id} className="px-6 py-8 scroll-mt-6">
                      <h3
                        className="text-base font-bold text-[#7c1c2e] mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {sec.subareaId !== 'IV' ? `Objective ${sec.objectiveNum}: ` : ''}{sec.title}
                      </h3>
                      <div
                        className="prose-sm text-[#1a1a1a] leading-relaxed"
                        style={{ fontFamily: 'var(--font-sans)' }}
                        dangerouslySetInnerHTML={{ __html: sec.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </main>

        </div>
      </div>
    </div>
  )
}
