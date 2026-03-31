import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'

// Study guide content is seeded per exam — this page is the reader shell
// Content is rendered from data/study-guide-content.ts once content is loaded

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

  // Track that study guide was opened
  // (progress update handled client-side)

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
          {/* Sidebar navigation */}
          <aside className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Contents
            </p>
            <nav className="mt-3 space-y-1">
              {[
                { id: 'subarea-I', label: 'Subarea I: Foundations of Reading Development' },
                { id: 'obj-1', label: '  1. Phonological & Phonemic Awareness', indent: true },
                { id: 'obj-2', label: '  2. Phonics & Word Recognition', indent: true },
                { id: 'obj-3', label: '  3. Word Analysis Skills', indent: true },
                { id: 'obj-4', label: '  4. Reading Fluency', indent: true },
                { id: 'subarea-II', label: 'Subarea II: Reading Comprehension' },
                { id: 'obj-5', label: '  5. Vocabulary Development', indent: true },
                { id: 'obj-6', label: '  6. Background Knowledge', indent: true },
                { id: 'obj-7', label: '  7. Literary Text Comprehension', indent: true },
                { id: 'obj-8', label: '  8. Informational Text', indent: true },
                { id: 'subarea-III', label: 'Subarea III: Assessment & Instruction' },
                { id: 'obj-9', label: '  9. Formal & Informal Assessment', indent: true },
                { id: 'obj-10', label: '  10. Data-Based Instruction', indent: true },
                { id: 'obj-11', label: '  11. Supporting Diverse Learners', indent: true },
                { id: 'subarea-IV', label: 'Subarea IV: Written Response Tips' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block rounded px-3 py-1.5 text-xs text-[#6b6b6b] hover:bg-[#f9f0f2] hover:text-[#7c1c2e] ${item.indent ? 'pl-5' : 'font-semibold text-[#1a1a1a]'}`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.label.trim()}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content area */}
          <main className="lg:col-span-3">
            <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
              {/* Content will be injected here once source material is provided */}
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-[#f9f0f2] flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h2 className="mt-6 text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                  Study Guide Content Loading
                </h2>
                <p className="mt-3 max-w-md text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  The study guide content is being prepared. Once you provide the source material, this page will be populated with complete content for all 4 subareas and 11 objectives.
                </p>
                <p className="mt-4 text-sm font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Platform is ready — content coming next.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
