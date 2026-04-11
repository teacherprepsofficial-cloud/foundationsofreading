import { redirect, notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import { workbook190 } from '@/data/workbook-190'
import WorkbookClient from './WorkbookClient'

export default async function WorkbookPage({
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
    examCode: { $in: ['190', '890'] },
    isActive: true,
    expiresAt: { $gt: new Date() },
  })

  if (!access) redirect('/dashboard')

  return <WorkbookClient workbook={workbook190} examCode={examCode} />
}
