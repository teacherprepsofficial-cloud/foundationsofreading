import { redirect, notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import { studyGuide190 } from '@/data/study-guide-190'
import StudyGuideClient from './StudyGuideClient'

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

  return <StudyGuideClient guide={studyGuide190} examCode={examCode} />
}
