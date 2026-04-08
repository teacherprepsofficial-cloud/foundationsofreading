/**
 * swap-weak-questions.ts
 *
 * Replaces 24 weak practice-test questions with stronger Pearson-quality items.
 * - Old questions are archived (isPublished: false), NEVER deleted.
 * - Each new question matches the EXACT subarea + objectiveNumber of the one it replaces.
 * - PracticeTest.questionIds is updated in-place at the same array position.
 *
 * Usage:  CONFIRM_SWAP=true npx tsx scripts/swap-weak-questions.ts
 */

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

// ── Confirmation guard ──────────────────────────────────────────────────────
if (process.env.CONFIRM_SWAP !== 'true') {
  console.error('🔴 DANGER: This script will:')
  console.error('  - Insert 24 new questions')
  console.error('  - Archive 24 old questions (isPublished: false)')
  console.error('  - Update questionIds in Practice Tests 4 and 5')
  console.error('')
  console.error('To proceed: CONFIRM_SWAP=true npx tsx scripts/swap-weak-questions.ts')
  process.exit(1)
}

// ── Practice Test IDs ───────────────────────────────────────────────────────
const PT4_ID = '69cfeeabecad19198e7eb4ac'
const PT5_ID = '69cfec5be07395d6959c4562'

// ── Subarea names ───────────────────────────────────────────────────────────
const SA_I = 'Foundations of Reading Development'
const SA_II = 'Development of Reading Comprehension'
const SA_III = 'Reading Assessment and Instruction'

// ── Swap definitions ────────────────────────────────────────────────────────
interface SwapDef {
  oldId: string
  ptId: string
  pos: number
  newQuestion: {
    examCode: string
    subarea: string
    subareaName: string
    objectiveNumber: number
    difficulty: 'easy' | 'medium' | 'hard'
    stimulus?: string
    questionText: string
    options: { label: string; text: string }[]
    correctAnswer: string
    explanation: string
    isPublished: boolean
    isDiagnostic: boolean
  }
}

const swaps: SwapDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 1 — Subarea I, Obj 1 — PT4 pos 9
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb44f',
    ptId: PT4_ID,
    pos: 9,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 1,
      difficulty: 'hard',
      stimulus:
        '<p>A kindergarten teacher administers a phonological awareness screener to three students. The results are shown below.</p>' +
        '<table>' +
        '<tr><th>Student</th><th>Rhyming</th><th>Syllable Seg.</th><th>Onset-Rime</th><th>Phoneme Isolation</th><th>Phoneme Blending</th></tr>' +
        '<tr><td>Maria</td><td>Pass</td><td>Pass</td><td>Pass</td><td>Pass</td><td>Fail</td></tr>' +
        '<tr><td>James</td><td>Pass</td><td>Pass</td><td>Pass</td><td>Fail</td><td>Fail</td></tr>' +
        '<tr><td>Aisha</td><td>Pass</td><td>Pass</td><td>Fail</td><td>Fail</td><td>Fail</td></tr>' +
        '</table>',
      questionText:
        'Based on the screening data, which student has mastered onset-rime awareness but needs instruction at the phoneme level?',
      options: [
        { label: 'A', text: 'James' },
        { label: 'B', text: 'Maria' },
        { label: 'C', text: 'Aisha' },
        { label: 'D', text: 'All three students need onset-rime instruction' },
      ],
      correctAnswer: 'A',
      explanation:
        'James passes rhyming, syllable segmentation, and onset-rime but fails phoneme isolation and phoneme blending. This profile shows he has mastered skills through the onset-rime level and is ready for instruction at the phoneme level. Maria has already progressed past onset-rime into phoneme isolation, and Aisha has not yet mastered onset-rime.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 2 — Subarea I, Obj 1 — PT5 pos 6
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4503',
    ptId: PT5_ID,
    pos: 6,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 1,
      difficulty: 'medium',
      questionText:
        'A first-grade teacher conducts a morning phonemic awareness routine. The teacher says a word, students tap their desks once for each sound they hear, and then the teacher asks individual students to say each sound in order. Most students can segment three-phoneme CVC words accurately. The teacher wants to increase the complexity of the task while remaining at the phonemic awareness level. Which modification would be most appropriate?',
      options: [
        {
          label: 'A',
          text: 'Having students segment four-phoneme words that begin with a consonant blend, such as "stop" and "frog"',
        },
        {
          label: 'B',
          text: 'Showing students letter cards and having them match each sound to its written letter',
        },
        {
          label: 'C',
          text: 'Switching from segmentation to syllable clapping with two-syllable compound words',
        },
        {
          label: 'D',
          text: 'Having students segment CVC words and then write the letters on individual whiteboards',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Moving from three-phoneme CVC words to four-phoneme words with consonant blends increases complexity while staying at the phonemic awareness level. Option B introduces print, making it a phonics task. Option C moves back to syllable awareness, which is a lower level of phonological awareness. Option D also introduces print (writing letters), shifting the task from phonemic awareness to encoding.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 3 — Subarea I, Obj 2 — PT4 pos 17
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb457',
    ptId: PT4_ID,
    pos: 17,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 2,
      difficulty: 'hard',
      stimulus:
        '<p>A first-grade teacher reviews the results of a developmental spelling inventory. The student\'s responses are shown below.</p>' +
        '<table>' +
        '<tr><th>Target Word</th><th>Student Spelling</th></tr>' +
        '<tr><td>rain</td><td>rane</td></tr>' +
        '<tr><td>boat</td><td>bote</td></tr>' +
        '<tr><td>team</td><td>teme</td></tr>' +
        '<tr><td>play</td><td>plae</td></tr>' +
        '<tr><td>coat</td><td>cote</td></tr>' +
        '<tr><td>seed</td><td>sede</td></tr>' +
        '</table>',
      questionText:
        'Based on the pattern of errors, the student most needs explicit instruction in which phonics element?',
      options: [
        {
          label: 'A',
          text: 'Vowel teams, because the student consistently uses a CVCe pattern instead of vowel team spellings',
        },
        {
          label: 'B',
          text: 'Consonant blends, because the student is omitting consonant sounds in blends',
        },
        {
          label: 'C',
          text: 'Short vowel sounds, because the student is confusing short and long vowel sounds',
        },
        {
          label: 'D',
          text: 'R-controlled vowels, because the student is not representing the r-influenced vowel sound',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The student consistently represents long vowel sounds using a CVCe (silent-e) pattern rather than the correct vowel team spelling: "rane" for "rain," "bote" for "boat," "teme" for "team," "plae" for "play," "cote" for "coat," and "sede" for "seed." This pattern indicates the student understands that these words have long vowel sounds but has not yet learned vowel team spellings (ai, oa, ea, ay, ee). The student needs explicit instruction in vowel teams.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 4 — Subarea I, Obj 2 — PT5 pos 13
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c450a',
    ptId: PT5_ID,
    pos: 13,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 2,
      difficulty: 'medium',
      stimulus:
        '<p>A teacher asks students to identify the syllable type of the first syllable of each word. The students\' responses are shown below.</p>' +
        '<table>' +
        '<tr><th>Line</th><th>Word</th><th>Syllable Type of First Syllable</th></tr>' +
        '<tr><td>1</td><td>pumpkin</td><td>open</td></tr>' +
        '<tr><td>2</td><td>tiger</td><td>open</td></tr>' +
        '<tr><td>3</td><td>butter</td><td>vowel team</td></tr>' +
        '<tr><td>4</td><td>candle</td><td>r-controlled</td></tr>' +
        '</table>',
      questionText:
        'In which line is the word correctly matched to the syllable type of its first syllable?',
      options: [
        { label: 'A', text: 'Line 1' },
        { label: 'B', text: 'Line 2' },
        { label: 'C', text: 'Line 3' },
        { label: 'D', text: 'Line 4' },
      ],
      correctAnswer: 'B',
      explanation:
        'In "tiger," the first syllable is "ti-," which ends with a vowel, making it an open syllable. Open syllables produce a long vowel sound, which is why the "i" in "tiger" says its name. Line 1 is incorrect because "pump-" ends with a consonant, making it a closed syllable, not open. Line 3 is incorrect because "but-" is a closed syllable, not a vowel team. Line 4 is incorrect because "can-" is a closed syllable, not r-controlled.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 5 — Subarea I, Obj 2 — PT5 pos 18
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c450f',
    ptId: PT5_ID,
    pos: 18,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 2,
      difficulty: 'medium',
      questionText:
        'A second-grade teacher is introducing students to multisyllabic words. Students can accurately decode single-syllable words with closed, open, and CVCe patterns. The teacher selects the words "rabbit," "basket," "napkin," "puppet," and "insect" for the next lesson. Before asking students to read these words, which instructional approach would most effectively support students in applying their existing phonics knowledge to these longer words?',
      options: [
        {
          label: 'A',
          text: 'Teaching students to identify the vowels, divide between consonants, and read each syllable using known patterns',
        },
        {
          label: 'B',
          text: 'Having students memorize the words as whole units through repeated flashcard practice',
        },
        {
          label: 'C',
          text: 'Asking students to use picture clues and context to predict what each word might be',
        },
        {
          label: 'D',
          text: 'Encouraging students to sound out each individual letter from left to right and blend all sounds together',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'All five words contain two closed syllables (rab-bit, bas-ket, nap-kin, pup-pet, in-sect). Teaching students to identify vowels, divide between consonants, and read each syllable using patterns they already know (closed syllables) is a systematic approach that leverages their existing phonics knowledge and transfers to new multisyllabic words. Memorization (B) does not build transferable decoding skills. Picture clues (C) bypass decoding entirely. Sounding out letter by letter (D) is inefficient for longer words and ignores syllable structure.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 6 — Subarea I, Obj 3 — PT4 pos 25
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb45f',
    ptId: PT4_ID,
    pos: 25,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 3,
      difficulty: 'hard',
      stimulus:
        '<p>A teacher gives students a word matrix and asks them to generate words by combining the prefix, base, and suffix columns.</p>' +
        '<table>' +
        '<tr><th>Prefix</th><th>Base</th><th>Suffix</th></tr>' +
        '<tr><td>re-</td><td>play</td><td>-s</td></tr>' +
        '<tr><td>un-</td><td></td><td>-ed</td></tr>' +
        '<tr><td></td><td></td><td>-ing</td></tr>' +
        '<tr><td></td><td></td><td>-er</td></tr>' +
        '<tr><td></td><td></td><td>-ful</td></tr>' +
        '</table>' +
        '<p>Students generated these words: plays, played, playing, player, playful, replay, replays, replayed, replaying, unplayful.</p>',
      questionText:
        'Which of the student-generated words contains a derivational suffix that changes the part of speech of the base word?',
      options: [
        { label: 'A', text: 'replayed' },
        { label: 'B', text: 'playing' },
        { label: 'C', text: 'playful' },
        { label: 'D', text: 'replays' },
      ],
      correctAnswer: 'C',
      explanation:
        '"Playful" contains the derivational suffix "-ful," which changes the base word "play" (a verb) into "playful" (an adjective). Derivational suffixes change the meaning or part of speech of a word. In contrast, "-ed" (replayed), "-ing" (playing), and "-s" (replays) are inflectional suffixes that modify tense, aspect, or number without changing the part of speech.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 7 — Subarea I, Obj 3 — PT4 pos 27
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb461',
    ptId: PT4_ID,
    pos: 27,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 3,
      difficulty: 'medium',
      questionText:
        'Which of the following sets of words would be most effective for teaching students to recognize the prefix "un-" as a meaning unit that reverses the meaning of a base word?',
      options: [
        { label: 'A', text: 'under, uncle, until, uniform' },
        { label: 'B', text: 'unhappy, unkind, unfair, unsafe' },
        { label: 'C', text: 'understand, undergo, undertake, underline' },
        { label: 'D', text: 'unique, unite, universe, university' },
      ],
      correctAnswer: 'B',
      explanation:
        'In "unhappy," "unkind," "unfair," and "unsafe," the prefix "un-" clearly means "not" and can be separated from a recognizable base word. This makes the set ideal for teaching students that "un-" is a meaning unit that reverses the meaning of the base. Option A includes words where "un" is not a prefix (uncle, under, until, uniform). Option C uses the prefix "under-," not "un-." Option D uses the prefix "uni-" (meaning "one"), not "un-" (meaning "not").',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 8 — Subarea I, Obj 3 — PT5 pos 28
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4519',
    ptId: PT5_ID,
    pos: 28,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 3,
      difficulty: 'hard',
      questionText:
        'A third-grade teacher is working with English learners whose home language is Spanish. The teacher notices these students can decode English words accurately but struggle with the meanings of words that contain common English prefixes such as "re-," "un-," and "pre-." The teacher wants to build on the students\' existing Spanish knowledge to accelerate their English vocabulary development. Which instructional approach would be most effective?',
      options: [
        {
          label: 'A',
          text: 'Teaching the English prefixes alongside their Spanish cognate prefixes, such as showing that "re-" is the same in both languages and that "des-" in Spanish corresponds to "un-" in English',
        },
        {
          label: 'B',
          text: 'Having students memorize English prefix meanings through weekly vocabulary quizzes',
        },
        {
          label: 'C',
          text: 'Providing students with a bilingual dictionary and asking them to look up each unfamiliar word',
        },
        {
          label: 'D',
          text: 'Focusing instruction exclusively on English phonics patterns rather than morphemic analysis',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Leveraging cognate prefixes between Spanish and English activates students\' existing linguistic knowledge and creates meaningful connections. Many Latin-based prefixes are shared or similar across the two languages (re- is identical, pre- is identical, des- maps to un-). This approach builds on what students already know, making English morphemic analysis more accessible. Memorization without connection to prior knowledge (B) is less effective. Dictionary lookup (C) is a reference skill, not an instructional approach for building morphemic awareness. Ignoring morphemic analysis (D) misses an opportunity to use a strength these students already possess.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 9 — Subarea I, Obj 3 — PT5 pos 30
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c451b',
    ptId: PT5_ID,
    pos: 30,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 3,
      difficulty: 'hard',
      stimulus:
        '<p>A fourth-grade teacher asks students to break words into their component morphemes. The student\'s responses are shown below.</p>' +
        '<table>' +
        '<tr><th>Word</th><th>Student\'s Breakdown</th></tr>' +
        '<tr><td>unhappiness</td><td>un + happy + ness</td></tr>' +
        '<tr><td>replaying</td><td>re + play + ing</td></tr>' +
        '<tr><td>disagreement</td><td>dis + agree + ment</td></tr>' +
        '<tr><td>unbelievable</td><td>un + believe + able</td></tr>' +
        '</table>' +
        '<p>All four of the student\'s breakdowns are correct.</p>',
      questionText:
        'Based on this performance, which morphemic analysis skill should the teacher target next to advance the student\'s development?',
      options: [
        {
          label: 'A',
          text: 'Identifying the function of each morpheme, including which are prefixes, bases, and suffixes, and what each means',
        },
        {
          label: 'B',
          text: 'Practicing breaking two-syllable compound words into their component parts',
        },
        {
          label: 'C',
          text: 'Reviewing the difference between letters and sounds in single-syllable words',
        },
        {
          label: 'D',
          text: 'Memorizing the spelling of common multisyllabic words through repeated written practice',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The student can already segment words into morphemes accurately. The logical next step is to move from structural analysis (breaking words apart) to functional analysis (understanding what each morpheme means and how it changes the base word). This deepens vocabulary knowledge and supports independent word learning. Compound words (B) would be a step backward in complexity. Reviewing letters and sounds (C) is far below this student\'s demonstrated level. Memorizing spellings (D) does not advance morphemic analysis skills.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 10 — Subarea I, Obj 4 — PT4 pos 35
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb469',
    ptId: PT4_ID,
    pos: 35,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 4,
      difficulty: 'hard',
      stimulus:
        '<p>A second-grade teacher monitors a student\'s oral reading fluency every two weeks using grade-level passages. The data are shown below.</p>' +
        '<table>' +
        '<tr><th>Week</th><th>Words Correct Per Minute (WCPM)</th><th>Errors</th><th>Accuracy %</th></tr>' +
        '<tr><td>1</td><td>45</td><td>8</td><td>91%</td></tr>' +
        '<tr><td>3</td><td>48</td><td>7</td><td>92%</td></tr>' +
        '<tr><td>5</td><td>50</td><td>6</td><td>92%</td></tr>' +
        '<tr><td>7</td><td>52</td><td>5</td><td>93%</td></tr>' +
        '<tr><td>9</td><td>54</td><td>5</td><td>93%</td></tr>' +
        '</table>',
      questionText:
        'Based on the data, which conclusion is best supported?',
      options: [
        {
          label: 'A',
          text: 'The student is making steady but insufficient progress and may need a more intensive intervention',
        },
        {
          label: 'B',
          text: 'The student\'s fluency is developing at an expected rate and current instruction should continue',
        },
        {
          label: 'C',
          text: 'The student\'s accuracy is the primary concern and phonics instruction should be prioritized over fluency',
        },
        {
          label: 'D',
          text: 'The data is insufficient to draw conclusions because fluency should be measured weekly, not biweekly',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The second-grade benchmark for oral reading fluency is typically 70 to 90 or more WCPM by midyear. At 54 WCPM after nine weeks, with a gain of only about one WCPM per week, the student is well below benchmark and the rate of growth is too slow to close the gap. While the student is making some progress, the trajectory suggests a more intensive intervention is needed. Accuracy (C) is above 90%, which is instructional level, so accuracy is not the primary concern. Biweekly measurement (D) is a standard and acceptable progress-monitoring schedule.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 11 — Subarea I, Obj 4 — PT5 pos 35
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4520',
    ptId: PT5_ID,
    pos: 35,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 4,
      difficulty: 'medium',
      questionText:
        'A group of third-grade students reads grade-level text accurately and at an appropriate rate. However, the teacher observes that the students read in a flat, monotone voice, ignoring commas, periods, and question marks. The students also tend to read each word as a separate unit rather than grouping words into meaningful phrases. According to evidence-based best practices, which instructional approach would most directly address these students\' specific fluency needs?',
      options: [
        {
          label: 'A',
          text: 'Increasing the amount of independent silent reading time to build automaticity with grade-level vocabulary',
        },
        {
          label: 'B',
          text: 'Modeling expressive reading of the same text and then having students practice with echo reading, focusing on pausing at punctuation and grouping words into phrases',
        },
        {
          label: 'C',
          text: 'Providing students with easier texts at their independent reading level to build confidence before returning to grade-level material',
        },
        {
          label: 'D',
          text: 'Having students practice reading word lists to increase their automatic word recognition speed',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The students\' specific need is prosody, the expressive quality of reading that includes appropriate phrasing, intonation, and attention to punctuation. Since accuracy and rate are already adequate, the issue is not decoding or speed but expression. Modeling expressive reading followed by echo reading directly targets prosody by giving students a clear example to imitate. Silent reading (A) does not provide the oral practice or teacher modeling needed. Easier texts (C) are unnecessary since accuracy is not the problem. Word lists (D) target automaticity, which is already adequate.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 12 — Subarea I, Obj 4 — PT5 pos 40
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4525',
    ptId: PT5_ID,
    pos: 40,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 4,
      difficulty: 'medium',
      questionText:
        'A first-grade teacher implements a paired repeated reading activity. Student A reads a passage aloud while Student B follows along and provides feedback. Then they switch roles. After four sessions, the teacher notices that students are reading the practiced passage fluently but struggle when given a new, unpracticed passage at the same level. Which adjustment would most effectively promote transfer of fluency skills to new texts?',
      options: [
        {
          label: 'A',
          text: 'Selecting new passages that share vocabulary and sentence structures with the practiced passages, and gradually increasing the proportion of new text',
        },
        {
          label: 'B',
          text: 'Having students practice each passage for additional sessions until they reach 100% accuracy before moving to new text',
        },
        {
          label: 'C',
          text: 'Replacing the paired reading activity with independent silent reading of self-selected books',
        },
        {
          label: 'D',
          text: 'Increasing the difficulty level of the practiced passages to challenge students\' decoding skills',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Transfer of fluency skills depends on students encountering familiar vocabulary and structures in new contexts. By selecting new passages that share linguistic features with practiced ones and gradually increasing novelty, the teacher bridges the gap between practiced and unpracticed text. More repetition of the same passage (B) would not address the transfer problem. Silent reading (C) removes the scaffolding that paired reading provides. Increasing difficulty (D) would likely reduce accuracy and fluency rather than promote transfer.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 13 — Subarea I, Obj 4 — PT5 pos 41
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4526',
    ptId: PT5_ID,
    pos: 41,
    newQuestion: {
      examCode: '190',
      subarea: 'I',
      subareaName: SA_I,
      objectiveNumber: 4,
      difficulty: 'medium',
      questionText:
        'A reading specialist assesses a third-grade student and finds that the student can decode grade-level words accurately and reads at an appropriate rate, but consistently struggles to answer comprehension questions after reading both narrative and informational passages. According to the Simple View of Reading, which component most likely explains this student\'s difficulty?',
      options: [
        {
          label: 'A',
          text: 'The student has not developed sufficient phonics knowledge to decode multisyllabic words automatically',
        },
        {
          label: 'B',
          text: 'The student\'s language comprehension skills, including vocabulary, syntax, and background knowledge, are not developed enough to support meaning-making from text',
        },
        {
          label: 'C',
          text: 'The student needs more practice with oral reading fluency to free cognitive resources for comprehension',
        },
        {
          label: 'D',
          text: 'The student has not been exposed to enough decodable texts to build automatic word recognition',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The Simple View of Reading states that Reading Comprehension equals Decoding multiplied by Language Comprehension. Since the student decodes accurately and reads at an appropriate rate, the decoding component is intact. The breakdown must therefore be in language comprehension, which includes vocabulary knowledge, understanding of syntax, and background knowledge. Options A, C, and D all address decoding or fluency, which the assessment data already shows are adequate.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 14 — Subarea II, Obj 5 — PT4 pos 53
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb47b',
    ptId: PT4_ID,
    pos: 53,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 5,
      difficulty: 'medium',
      stimulus:
        '<p>A fourth-grade teacher is categorizing vocabulary words from an upcoming unit using Beck\'s three-tier vocabulary framework. The teacher\'s classifications are shown below.</p>' +
        '<table>' +
        '<tr><th>Word</th><th>Context</th><th>Tier Classification</th></tr>' +
        '<tr><td>photosynthesis</td><td>science textbook</td><td>Tier 3</td></tr>' +
        '<tr><td>analyze</td><td>multiple subjects</td><td>Tier 2</td></tr>' +
        '<tr><td>happy</td><td>everyday speech</td><td>Tier 1</td></tr>' +
        '<tr><td>mitosis</td><td>biology class</td><td>Tier 3</td></tr>' +
        '<tr><td>compare</td><td>multiple subjects</td><td>?</td></tr>' +
        '<tr><td>dog</td><td>everyday speech</td><td>Tier 1</td></tr>' +
        '</table>',
      questionText:
        'Which tier should the teacher assign to the word "compare," and why should this word receive the highest instructional priority?',
      options: [
        {
          label: 'A',
          text: 'Tier 2, because it is a high-utility academic word used across multiple content areas that students are unlikely to learn through everyday conversation alone',
        },
        {
          label: 'B',
          text: 'Tier 3, because it is a complex word that requires explicit definition in a specific subject area',
        },
        {
          label: 'C',
          text: 'Tier 1, because most fourth-grade students already know the meaning from conversational English',
        },
        {
          label: 'D',
          text: 'Tier 2, because it contains a Latin root that connects to other academic vocabulary words',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'According to Beck\'s three-tier framework, Tier 2 words are high-frequency, high-utility words that appear across content areas and are characteristic of mature language users. "Compare" fits this description because it is used in reading, math, science, and social studies. Tier 2 words receive the highest instructional priority because they have the greatest impact on reading comprehension across contexts. The word is not domain-specific enough for Tier 3 (B) and not common enough in everyday speech for Tier 1 (C). While D correctly identifies it as Tier 2, the reasoning about Latin roots is not the primary rationale for instructional priority.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 15 — Subarea II, Obj 5 — PT5 pos 45
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c452a',
    ptId: PT5_ID,
    pos: 45,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 5,
      difficulty: 'medium',
      questionText:
        'A second-grade teacher introduces the word "enormous" during a read-aloud of a narrative text about a giant. After explaining the word\'s meaning, the teacher wants to deepen students\' understanding and help them internalize the word for long-term use. Which sequence of follow-up activities would be most effective for achieving this goal?',
      options: [
        {
          label: 'A',
          text: 'Having students look up "enormous" in the dictionary, copy the definition, and use it in a sentence',
        },
        {
          label: 'B',
          text: 'Asking students to generate synonyms and antonyms, discuss contexts where they might use the word, and identify "enormous" in other texts throughout the week',
        },
        {
          label: 'C',
          text: 'Creating a class word wall and asking students to practice spelling the word three times each night for homework',
        },
        {
          label: 'D',
          text: 'Reading additional books about giants and pointing out "enormous" each time it appears in the text',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Research on vocabulary instruction shows that deep word learning requires multiple meaningful encounters with a word in varied contexts. Generating synonyms and antonyms builds semantic networks, discussing real-world contexts promotes transfer, and encountering the word across texts throughout the week provides the repeated, spaced exposure needed for long-term retention. Dictionary copying (A) is a shallow activity that does not promote deep understanding. Spelling practice (C) focuses on orthography, not meaning. Repeated exposure in a single context (D) is narrower than the multi-strategy approach in B.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 16 — Subarea II, Obj 5 — PT5 pos 49
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c452e',
    ptId: PT5_ID,
    pos: 49,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 5,
      difficulty: 'medium',
      stimulus:
        '<p>A fifth-grade student reads the following passage:</p>' +
        '<p><em>"After playing with her friends all day, Kaylee sat down to tackle her science homework, hit the books for her geography test, and knock out her English essay in one fell swoop."</em></p>',
      questionText:
        'The student asks the teacher about the meaning of "one fell swoop." After explaining the idiom, which strategy would most effectively deepen and extend the student\'s understanding of idiomatic expressions?',
      options: [
        {
          label: 'A',
          text: 'Having the student look up "fell" and "swoop" separately in the dictionary to understand each word\'s contribution',
        },
        {
          label: 'B',
          text: 'Discussing additional examples of the idiom used in different contexts and asking the student to identify other idioms encountered in reading',
        },
        {
          label: 'C',
          text: 'Asking the student to diagram the sentence structure to understand how the phrase functions grammatically',
        },
        {
          label: 'D',
          text: 'Providing the student with a list of 20 common idioms to memorize and use in weekly vocabulary quizzes',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Idiomatic expressions cannot be understood by analyzing their individual words because their meaning is figurative rather than literal. The most effective approach is to discuss the idiom in multiple contexts so students understand when and how it is used, and then extend this awareness to other idioms they encounter. Looking up individual words (A) would be misleading because idioms do not derive meaning from their component words. Sentence diagramming (C) addresses syntax, not figurative meaning. Memorizing a list (D) promotes rote recall without the contextual understanding needed for authentic use.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 17 — Subarea II, Obj 6 — PT4 pos 64
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb486',
    ptId: PT4_ID,
    pos: 64,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 6,
      difficulty: 'hard',
      stimulus:
        '<p>A fifth-grade teacher plans to use the following passage to teach students about how authors reveal character emotions through indirect characterization.</p>' +
        '<p><em>Mia pressed her forehead against the cold bus window. The houses blurred past -- each one smaller than the last, each yard a little browner. She squeezed the straps of her backpack until her knuckles turned white. When the bus finally stopped, she stood up slowly, as if her shoes were filled with sand.</em></p>',
      questionText:
        'Which detail from the passage provides the strongest evidence of the character\'s emotional state?',
      options: [
        {
          label: 'A',
          text: 'The description of the houses getting smaller and the yards getting browner as the bus travels',
        },
        {
          label: 'B',
          text: 'The detail that Mia squeezed her backpack straps until her knuckles turned white',
        },
        {
          label: 'C',
          text: 'The fact that Mia pressed her forehead against the cold bus window',
        },
        {
          label: 'D',
          text: 'The description of Mia standing up slowly when the bus stopped',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Squeezing her backpack straps until her knuckles turned white is a physical action that directly reveals intense internal emotion, most likely anxiety, dread, or distress. This is indirect characterization at its strongest because the author shows the emotion through a specific, vivid physical detail rather than telling the reader how Mia feels. The houses and yards (A) establish setting and mood but do not directly characterize Mia. Pressing her forehead against the window (C) and standing slowly (D) suggest her emotional state but are less specific and intense than the white-knuckle detail.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 18 — Subarea II, Obj 6 — PT5 pos 55
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4534',
    ptId: PT5_ID,
    pos: 55,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 6,
      difficulty: 'hard',
      stimulus:
        '<p>A teacher uses the following passage to teach literary elements.</p>' +
        '<p><em>"I don\'t want to go," Marcus said, crossing his arms. His mother knelt down beside him. "Remember when you didn\'t want to try the swimming pool?" she asked softly. "And now you go every Saturday." Marcus looked at his shoes. "That was different," he mumbled. But even as he said it, a small part of him wondered if maybe it wasn\'t different at all.</em></p>',
      questionText:
        'Which literary element does the author primarily use in the last sentence to develop the theme of this passage?',
      options: [
        {
          label: 'A',
          text: 'Foreshadowing, by hinting that Marcus will eventually enjoy the new experience',
        },
        {
          label: 'B',
          text: 'Internal conflict, by showing Marcus beginning to question his own resistance',
        },
        {
          label: 'C',
          text: 'Flashback, by returning to a previous event to explain Marcus\'s current behavior',
        },
        {
          label: 'D',
          text: 'Symbolism, by using Marcus\'s shoes to represent his reluctance to move forward',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The last sentence reveals Marcus\'s internal conflict: outwardly he insists "that was different," but internally "a small part of him wondered if maybe it wasn\'t different at all." This tension between what he says and what he thinks is the defining feature of internal conflict, and it develops the theme that resistance to new experiences can be overcome. The passage contains a reference to the past (the swimming pool), but the last sentence itself is not a flashback (C). While the sentence may hint at future change, its primary function is to expose the character\'s present internal struggle, making internal conflict (B) more precise than foreshadowing (A). Marcus\'s shoes (D) are a detail, not a symbol with deeper meaning.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 19 — Subarea II, Obj 6 — PT5 pos 60
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4539',
    ptId: PT5_ID,
    pos: 60,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 6,
      difficulty: 'medium',
      questionText:
        'A third-grade teacher reads a story aloud about a character who shares a toy with a classmate even though the character really wants to keep it. After reading, the teacher asks three questions: (1) "What did the character decide to do with the toy?" (2) "Why do you think the character made that decision?" (3) "Do you think the character made the right choice? Why or why not?" Which sequence correctly identifies the comprehension levels of these three questions from lowest to highest?',
      options: [
        { label: 'A', text: 'Literal, inferential, evaluative' },
        { label: 'B', text: 'Inferential, literal, evaluative' },
        { label: 'C', text: 'Literal, evaluative, inferential' },
        { label: 'D', text: 'Evaluative, inferential, literal' },
      ],
      correctAnswer: 'A',
      explanation:
        'Question 1 is literal because the answer is stated directly in the text (the character shared the toy). Question 2 is inferential because it requires readers to draw a conclusion about the character\'s motivation based on textual clues rather than explicitly stated information. Question 3 is evaluative because it asks students to make a judgment about the character\'s decision and support that judgment with reasoning. This progression from literal to inferential to evaluative reflects increasing cognitive complexity.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 20 — Subarea II, Obj 6 — PT5 pos 61
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c453a',
    ptId: PT5_ID,
    pos: 61,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 6,
      difficulty: 'medium',
      questionText:
        'A fourth-grade class is reading a myth about why the sun moves across the sky each day. The teacher wants students to understand how myths function differently from informational texts that explain the same natural phenomenon. Which discussion question would best help students analyze the genre-specific characteristics of the myth?',
      options: [
        {
          label: 'A',
          text: '"What are the main events in the story, and in what order do they happen?"',
        },
        {
          label: 'B',
          text: '"How does the myth use characters and narrative to explain something that science explains with evidence and data?"',
        },
        {
          label: 'C',
          text: '"Can you identify the setting, characters, and problem in this story?"',
        },
        {
          label: 'D',
          text: '"What new vocabulary words did you learn from reading this myth?"',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'This question directly targets the genre-specific function of myths: using narrative elements (characters, plot, supernatural events) to explain natural phenomena. By asking students to compare how myths and informational texts explain the same thing, the teacher highlights the defining characteristics of the myth genre. Options A and C address general narrative comprehension skills that apply to any story, not myth-specific analysis. Option D focuses on vocabulary rather than genre characteristics.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 21 — Subarea II, Obj 6 — PT5 pos 62
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c453b',
    ptId: PT5_ID,
    pos: 62,
    newQuestion: {
      examCode: '190',
      subarea: 'II',
      subareaName: SA_II,
      objectiveNumber: 6,
      difficulty: 'medium',
      stimulus:
        '<p>A third-grade teacher uses the following poem to teach figurative language.</p>' +
        '<p><em>The wind is a wolf tonight,<br/>howling at the old stone walls,<br/>scratching at the window panes<br/>with long, invisible claws.</em></p>',
      questionText:
        'Which literary device is most prominently used throughout the poem?',
      options: [
        {
          label: 'A',
          text: 'Simile, comparing the wind to a wolf using "like" or "as"',
        },
        {
          label: 'B',
          text: 'Extended metaphor, describing the wind as if it were a wolf without using comparison words',
        },
        {
          label: 'C',
          text: 'Personification, giving the wind human qualities such as speaking or thinking',
        },
        {
          label: 'D',
          text: 'Onomatopoeia, using words that imitate the sounds they describe',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The poem opens with "The wind is a wolf tonight," which is a metaphor (not a simile, because it does not use "like" or "as"). The metaphor is then extended throughout the entire poem: the wind "howls" at walls, "scratches" at windows, and has "claws." Every detail develops the wolf comparison, making this an extended metaphor. It is not personification (C) because the wind is compared to an animal, not given human traits like speaking or thinking. While "howling" could be considered onomatopoeia, it is used here as part of the wolf metaphor rather than as the poem\'s dominant device.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 22 — Subarea III, Obj 8 — PT4 pos 87
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfeeabecad19198e7eb49d',
    ptId: PT4_ID,
    pos: 87,
    newQuestion: {
      examCode: '190',
      subarea: 'III',
      subareaName: SA_III,
      objectiveNumber: 8,
      difficulty: 'hard',
      stimulus:
        '<p>A first-grade teacher reviews beginning-of-year screening data for four students. The results are shown below.</p>' +
        '<table>' +
        '<tr><th>Student</th><th>Letter Naming</th><th>Phoneme Seg.</th><th>Nonsense Word Fluency</th><th>Oral Reading Fluency</th><th>Benchmark Status</th></tr>' +
        '<tr><td>Chen</td><td>52 (above)</td><td>38 (above)</td><td>24 (above)</td><td>42 (below)</td><td>Strategic</td></tr>' +
        '<tr><td>Davis</td><td>40 (above)</td><td>15 (below)</td><td>8 (well below)</td><td>18 (well below)</td><td>Intensive</td></tr>' +
        '<tr><td>Patel</td><td>55 (above)</td><td>40 (above)</td><td>28 (above)</td><td>68 (above)</td><td>Core</td></tr>' +
        '<tr><td>Rivera</td><td>48 (above)</td><td>32 (above)</td><td>12 (below)</td><td>30 (below)</td><td>Strategic</td></tr>' +
        '</table>',
      questionText:
        'Based on the screening data, which student\'s profile suggests that phonics instruction should be the primary focus of intervention?',
      options: [
        { label: 'A', text: 'Chen' },
        { label: 'B', text: 'Davis' },
        { label: 'C', text: 'Patel' },
        { label: 'D', text: 'Rivera' },
      ],
      correctAnswer: 'B',
      explanation:
        'Davis scores below benchmark in phoneme segmentation and well below benchmark in nonsense word fluency and oral reading fluency. The nonsense word fluency score of 8 (well below) is particularly telling because nonsense word reading is a direct measure of phonics and decoding ability. Davis\'s weak phoneme segmentation also indicates a gap in the foundational skill that supports phonics learning. Chen (A) has strong foundational skills but a fluency lag, suggesting a rate issue rather than a phonics issue. Patel (C) is at benchmark in all areas. Rivera (D) has adequate phoneme segmentation but weak nonsense word fluency, suggesting the gap may be in applying phonics knowledge rather than in basic phonemic awareness.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 23 — Subarea III, Obj 8 — PT5 pos 77
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c454a',
    ptId: PT5_ID,
    pos: 77,
    newQuestion: {
      examCode: '190',
      subarea: 'III',
      subareaName: SA_III,
      objectiveNumber: 8,
      difficulty: 'medium',
      questionText:
        'At the beginning of the school year, a second-grade teacher administers a universal screening assessment to all 22 students. The screening identifies four students who score below the benchmark in oral reading fluency. Before designing an intervention plan, the teacher needs additional information about each student\'s specific reading needs. Which type of assessment should the teacher administer next, and why?',
      options: [
        {
          label: 'A',
          text: 'A diagnostic assessment, to identify each student\'s specific strengths and weaknesses in phonics, phonemic awareness, and fluency',
        },
        {
          label: 'B',
          text: 'A summative assessment, to determine each student\'s overall reading achievement level relative to grade-level standards',
        },
        {
          label: 'C',
          text: 'Another universal screening using a different instrument, to confirm whether the students are truly at risk',
        },
        {
          label: 'D',
          text: 'A norm-referenced standardized test, to compare each student\'s performance to a national sample of second graders',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'After universal screening identifies students who may be at risk, the next step in a multi-tiered system of supports is to administer a diagnostic assessment. Diagnostic assessments pinpoint specific skill deficits (such as weaknesses in particular phonics patterns, phonemic awareness subtasks, or fluency components) so the teacher can design targeted interventions. A summative assessment (B) measures overall achievement but does not identify specific skill gaps. Another screening (C) would only confirm risk status, not identify what to teach. A norm-referenced test (D) compares students to a national sample but does not provide the instructional detail needed for intervention planning.',
      isPublished: true,
      isDiagnostic: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPLACEMENT 24 — Subarea III, Obj 8 — PT5 pos 84
  // ═══════════════════════════════════════════════════════════════════════════
  {
    oldId: '69cfec5ae07395d6959c4551',
    ptId: PT5_ID,
    pos: 84,
    newQuestion: {
      examCode: '190',
      subarea: 'III',
      subareaName: SA_III,
      objectiveNumber: 8,
      difficulty: 'medium',
      questionText:
        'A reading specialist explains to a new teacher that different assessments serve different purposes in a multi-tiered system of supports. The specialist describes an assessment that is administered to all students three times per year (fall, winter, spring), takes approximately five minutes per student, and produces a single score used to classify students as "at benchmark," "strategic," or "intensive." Which type of assessment is the specialist describing?',
      options: [
        {
          label: 'A',
          text: 'A diagnostic reading assessment designed to identify specific skill deficits',
        },
        {
          label: 'B',
          text: 'A universal screening assessment designed to identify students who may be at risk for reading difficulties',
        },
        {
          label: 'C',
          text: 'A progress monitoring tool designed to track student growth in response to intervention over time',
        },
        {
          label: 'D',
          text: 'A formative assessment designed to provide teachers with immediate feedback during daily instruction',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The description matches a universal screening assessment: it is administered to all students (universal), given three times per year at set intervals, is brief (about five minutes), and produces a classification score (benchmark, strategic, intensive) to identify students who may need additional support. Diagnostic assessments (A) are administered only to identified students and are more detailed. Progress monitoring (C) is administered more frequently (weekly or biweekly) to students already receiving intervention. Formative assessments (D) are ongoing, informal, and embedded in daily instruction rather than administered on a fixed schedule.',
      isPublished: true,
      isDiagnostic: false,
    },
  },
]

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  await connectDB()
  console.log('Connected to MongoDB\n')

  let inserted = 0
  let archived = 0
  let ptUpdated = 0

  for (const swap of swaps) {
    const { oldId, ptId, pos, newQuestion } = swap

    // 1. Insert new question
    const newQ = await Question.create(newQuestion)
    inserted++
    console.log(
      `  [INSERT] ${newQ._id} — ${newQuestion.subarea}/${newQuestion.objectiveNumber} — "${newQuestion.questionText.slice(0, 60)}..."`
    )

    // 2. Update PracticeTest questionIds at the same position
    const updateResult = await PracticeTest.updateOne(
      { _id: new mongoose.Types.ObjectId(ptId) },
      { $set: { [`questionIds.${pos}`]: newQ._id } }
    )
    if (updateResult.modifiedCount === 1) {
      ptUpdated++
      console.log(`  [PT-SWAP] PT ${ptId} pos ${pos}: ${oldId} -> ${newQ._id}`)
    } else {
      console.error(`  [PT-SWAP FAILED] PT ${ptId} pos ${pos} — modifiedCount=${updateResult.modifiedCount}`)
    }

    // 3. Archive old question (isPublished: false)
    const archiveResult = await Question.updateOne(
      { _id: new mongoose.Types.ObjectId(oldId) },
      { $set: { isPublished: false } }
    )
    if (archiveResult.modifiedCount === 1) {
      archived++
      console.log(`  [ARCHIVE] ${oldId}`)
    } else {
      console.log(`  [ARCHIVE SKIP] ${oldId} — already unpublished or not found`)
    }

    console.log('')
  }

  console.log('=== SUMMARY ===')
  console.log(`  New questions inserted: ${inserted}`)
  console.log(`  Old questions archived: ${archived}`)
  console.log(`  PT questionIds updated: ${ptUpdated}`)
  console.log(`  Total swaps expected:   ${swaps.length}`)

  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
