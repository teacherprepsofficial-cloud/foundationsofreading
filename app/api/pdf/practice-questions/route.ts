export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'
import mongoose from 'mongoose'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const QUESTION_IDS = [
  '69cfec4928a8f4d88398c5e9','69cfec4928a8f4d88398c5ea','69cfec4928a8f4d88398c5eb',
  '69cfec4928a8f4d88398c5ec','69cfec4928a8f4d88398c5ed','69cfec4928a8f4d88398c5ee',
  '69cfec4928a8f4d88398c5ef','69cfec4928a8f4d88398c5f0','69cfec4928a8f4d88398c5f1',
  '69cfec4928a8f4d88398c5f2','69ce9163cc7b8da5c542858f','69ce9163cc7b8da5c5428599',
  '69ce9163cc7b8da5c5428580','69ce9163cc7b8da5c54285a3','69ce9163cc7b8da5c5428585',
  '69ce9163cc7b8da5c542858a','69cfec4928a8f4d88398c615','69cfec4928a8f4d88398c616',
  '69ce9163cc7b8da5c54285bc','69ce9163cc7b8da5c54285b7','69ce9163cc7b8da5c54285c1',
  '69ce9163cc7b8da5c54285a8','69ce9163cc7b8da5c54285ad','69cfec4928a8f4d88398c636',
  '69cfec4928a8f4d88398c637',
]

interface PdfQuestion {
  questionText: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  subarea: string
  subareaName: string
}

const BURGUNDY = rgb(0.486, 0.110, 0.180)
const DARK     = rgb(0.102, 0.102, 0.102)
const MID      = rgb(0.420, 0.420, 0.420)
const WHITE    = rgb(1, 1, 1)
const BORDER   = rgb(0.88, 0.82, 0.84)
const PAGE_W   = 612
const PAGE_H   = 792
const MARGIN   = 48
const CW       = PAGE_W - MARGIN * 2

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrap(text: string, font: any, size: number, maxW: number): string[] {
  const lines: string[] = []
  let cur = ''
  for (const word of text.split(' ')) {
    const test = cur ? `${cur} ${word}` : word
    if (font.widthOfTextAtSize(test, size) > maxW && cur) {
      lines.push(cur)
      cur = word
    } else cur = test
  }
  if (cur) lines.push(cur)
  return lines
}

export async function GET() {
  try {
    await connectDB()
    const ids = QUESTION_IDS.map(id => new mongoose.Types.ObjectId(id))
    const questions = await Question.find({ _id: { $in: ids } })
      .select('questionText options correctAnswer explanation subarea subareaName')
      .lean()

    const doc = await PDFDocument.create()
    const bold = await doc.embedFont(StandardFonts.HelveticaBold)
    const regular = await doc.embedFont(StandardFonts.Helvetica)

    let page = doc.addPage([PAGE_W, PAGE_H])

    // Header
    page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('Free 25-Question Practice Test', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 88

    for (let qi = 0; qi < questions.length; qi++) {
      const q = questions[qi] as unknown as PdfQuestion

      // Calculate space needed
      const qLines = wrap(q.questionText, regular, 9, CW - 20)
      let needed = 18 + qLines.length * 11 + 8
      for (const opt of q.options) {
        const oLines = wrap(`${opt.label}. ${opt.text}`, regular, 8.5, CW - 30)
        needed += oLines.length * 11 + 2
      }
      needed += 20 // padding

      if (y - needed < MARGIN + 40) {
        page = doc.addPage([PAGE_W, PAGE_H])
        y = PAGE_H - MARGIN
      }

      // Question number + subarea
      page.drawText(`${qi + 1}.`, { x: MARGIN, y: y - 10, size: 9, font: bold, color: BURGUNDY })
      const qStartX = MARGIN + 20

      // Question text
      let ty = y - 10
      for (const line of qLines) {
        page.drawText(line, { x: qStartX, y: ty, size: 9, font: regular, color: DARK })
        ty -= 11
      }
      ty -= 6

      // Options
      for (const opt of q.options) {
        const oLines = wrap(`${opt.label}. ${opt.text}`, regular, 8.5, CW - 30)
        for (let li = 0; li < oLines.length; li++) {
          page.drawText(oLines[li], { x: qStartX + 8, y: ty, size: 8.5, font: li === 0 ? regular : regular, color: DARK })
          ty -= 11
        }
        ty -= 2
      }

      y = ty - 10

      // Thin divider
      if (qi < questions.length - 1) {
        page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CW, y }, thickness: 0.5, color: BORDER })
        y -= 10
      }
    }

    // Answer key on new page
    page = doc.addPage([PAGE_W, PAGE_H])
    y = PAGE_H - MARGIN

    page.drawRectangle({ x: MARGIN, y: y - 18, width: CW, height: 20, color: BURGUNDY })
    page.drawText('ANSWER KEY', { x: MARGIN + 7, y: y - 12, size: 8, font: bold, color: WHITE })
    y -= 32

    for (let qi = 0; qi < questions.length; qi++) {
      const q = questions[qi] as unknown as PdfQuestion
      if (y < MARGIN + 40) {
        page = doc.addPage([PAGE_W, PAGE_H])
        y = PAGE_H - MARGIN
      }

      // Question number + correct answer
      page.drawText(`${qi + 1}. ${q.correctAnswer}`, { x: MARGIN, y, size: 9, font: bold, color: BURGUNDY })

      // Explanation
      const expLines = wrap(q.explanation, regular, 8, CW - 30)
      let ey = y - 12
      for (const line of expLines) {
        if (ey < MARGIN + 20) {
          page = doc.addPage([PAGE_W, PAGE_H])
          ey = PAGE_H - MARGIN
        }
        page.drawText(line, { x: MARGIN + 20, y: ey, size: 8, font: regular, color: MID })
        ey -= 10
      }
      y = ey - 8
    }

    // Footer on last page
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="NES-190-Free-Practice-Test-25-Questions.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Practice questions PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
