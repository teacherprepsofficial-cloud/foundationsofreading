import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'

// ── Exhibit Types ────────────────────────────────────────────────────────────

export interface IRRWord {
  text: string        // correct word in the passage
  student?: string    // what student read (for substitutions/insertions/sc)
  mark?: 'sub' | 'omit' | 'insert' | 'sc' | 'rep' | 'lp' | 'sp' | 'told'
  // sub=substitution, omit=omission, insert=insertion, sc=self-correction
  // rep=repetition, lp=long pause, sp=short pause, told=told by teacher
}

export interface IExhibitTeacherRecord {
  exhibitType: 'teacher_record'
  title: string
  context: string
  lines: IRRWord[][]
}

export interface IExhibitFluencyRubric {
  exhibitType: 'fluency_rubric'
  title: string
  context: string
  rows: { label: string; score: string; sub?: boolean }[]
  benchmark: string
}

export interface IExhibitAnecdotal {
  exhibitType: 'anecdotal'
  title: string
  context: string
  notes: { label: string; text: string }[]
}

export interface IExhibitWordList {
  exhibitType: 'word_list'
  title: string
  context: string
  groups: {
    groupLabel: string
    rows: { word: string; response: string; correct: boolean }[]
  }[]
}

export interface IExhibitPassage {
  exhibitType: 'passage'
  title: string
  passageTitle: string
  text: string
}

export interface IExhibitWrittenResponse {
  exhibitType: 'written_response'
  title: string
  context: string
  items: { question: string; response: string; correct?: boolean }[]
}

export type IExhibit =
  | IExhibitTeacherRecord
  | IExhibitFluencyRubric
  | IExhibitAnecdotal
  | IExhibitWordList
  | IExhibitPassage
  | IExhibitWrittenResponse

// ── CR Prompt ────────────────────────────────────────────────────────────────

export interface ICRPrompt {
  promptNumber: 1 | 2
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  objective: string          // e.g., '0010'
  objectiveIntro: string     // 'Prepare an organized, developed analysis on a topic related to...'
  assignmentIntro: string    // 'Using your knowledge of foundational reading skills..., write a response of approximately 150–300 words in which you:'
  assignmentParts: string[]  // 4 bullet points (without bullet character)
  citeNote: string           // 'Be sure to cite specific evidence...'
  exhibits: IExhibit[]
}

// ── Practice Test ────────────────────────────────────────────────────────────

export interface IPracticeTest extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  testNumber: number
  name: string
  isDiagnostic: boolean
  questionIds: mongoose.Types.ObjectId[]
  timeLimitMinutes: number
  subareaDistribution: {
    subarea: 'I' | 'II' | 'III'
    count: number
  }[]
  crPrompts?: ICRPrompt[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const PracticeTestSchema = new Schema<IPracticeTest>(
  {
    examCode: { type: String, enum: ['190', '890'], required: true },
    testNumber: { type: Number, required: true },
    name: { type: String, required: true },
    isDiagnostic: { type: Boolean, default: false },
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    timeLimitMinutes: { type: Number, default: 240 },
    subareaDistribution: [
      {
        subarea: { type: String, enum: ['I', 'II', 'III'] },
        count: { type: Number },
        _id: false,
      },
    ],
    crPrompts: [
      {
        promptNumber: { type: Number, enum: [1, 2] },
        crType: { type: String, enum: ['foundational_reading_skills', 'reading_comprehension'] },
        objective: { type: String },
        objectiveIntro: { type: String },
        assignmentIntro: { type: String },
        assignmentParts: [{ type: String }],
        citeNote: { type: String },
        exhibits: [{ type: Schema.Types.Mixed }],
        _id: false,
      },
    ],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
)

PracticeTestSchema.index({ examCode: 1, testNumber: 1 })

const PracticeTest: Model<IPracticeTest> =
  mongoose.models.PracticeTest || mongoose.model<IPracticeTest>('PracticeTest', PracticeTestSchema)
export default PracticeTest
