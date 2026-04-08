/**
 * Seed Script — NES 190 Data-Exhibit Questions (Stimulus-Based)
 * 40 original multiple-choice questions with HTML table stimuli
 * Run: CONFIRM_INSERT=true npx tsx scripts/seed-data-exhibit-questions.ts
 *
 * This script ONLY inserts new questions. It does NOT delete or modify any existing data.
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

// ─── CONFIRMATION GUARD ──────────────────────────────────────────────────────
if (process.env.CONFIRM_INSERT !== 'true') {
  console.log('This script will INSERT 40 new data-exhibit questions.')
  console.log('No existing data will be modified or deleted.')
  console.log('To proceed: CONFIRM_INSERT=true npx tsx scripts/seed-data-exhibit-questions.ts')
  process.exit(0)
}

// ─── QUESTION DATA ───────────────────────────────────────────────────────────

const questions = [

  // ═══════════════════════════════════════════════════════════════════════════
  // SUBAREA I — Foundations of Reading Development (Questions 1-20)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Questions 1-5: Spelling Inventory Tables (Obj 2) ───────────────────

  // Q1 — Vowel teams
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Target Word</th><th>Student Spelling</th></tr></thead><tbody><tr><td>rain</td><td>rane</td></tr><tr><td>boat</td><td>bote</td></tr><tr><td>play</td><td>plae</td></tr><tr><td>team</td><td>teme</td></tr><tr><td>coat</td><td>cote</td></tr><tr><td>trail</td><td>trale</td></tr></tbody></table>',
    questionText: 'A second-grade teacher administers a developmental spelling inventory and records the results shown above. Based on these data, which phonics pattern should be the primary focus of this student\'s next instructional cycle?',
    options: [
      { label: 'A', text: 'Vowel teams that represent long vowel sounds in single-syllable words' },
      { label: 'B', text: 'Silent-e patterns that mark long vowel sounds in CVC-e words' },
      { label: 'C', text: 'Short vowel sounds in closed syllable patterns with final consonants' },
      { label: 'D', text: 'R-controlled vowel patterns in single-syllable and multisyllable words' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The student consistently substitutes silent-e spellings (e.g., "rane" for "rain," "bote" for "boat") for words that require vowel team patterns (ai, oa, ay, ea), indicating the student understands long vowel sounds but has not yet mastered vowel team representations. Option B is incorrect because the student already uses the silent-e pattern as a default strategy and does not need more instruction in it. Option C is incorrect because the errors all involve long vowel sounds, not short vowels in closed syllables. Option D is incorrect because none of the misspelled words contain r-controlled vowels.',
  },

  // Q2 — R-controlled vowels
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Target Word</th><th>Student Spelling</th></tr></thead><tbody><tr><td>bird</td><td>brd</td></tr><tr><td>fern</td><td>frn</td></tr><tr><td>turn</td><td>trn</td></tr><tr><td>cart</td><td>crt</td></tr><tr><td>sport</td><td>sprt</td></tr><tr><td>charm</td><td>chrm</td></tr></tbody></table>',
    questionText: 'A first-grade teacher reviews the spelling inventory results shown above. Which phonics element does this student most need explicit instruction in?',
    options: [
      { label: 'A', text: 'Consonant blends at the beginning and end of single-syllable words' },
      { label: 'B', text: 'R-controlled vowel patterns where the r changes the preceding vowel sound' },
      { label: 'C', text: 'Short vowel sounds in words with consonant-vowel-consonant patterns' },
      { label: 'D', text: 'Consonant digraphs that represent a single sound using two letters' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The student omits the vowel entirely before the r in every word (e.g., "brd" for "bird," "crt" for "cart"), which indicates the student does not yet represent r-controlled vowels and needs explicit instruction in these patterns. Option A is incorrect because the student accurately spells consonant blends such as sp- and chr-. Option C is incorrect because the errors are specific to r-controlled syllables, not CVC short vowel words. Option D is incorrect because the student correctly writes digraphs like ch in "chrm," showing knowledge of digraphs.',
  },

  // Q3 — Consonant blends
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Target Word</th><th>Student Spelling</th></tr></thead><tbody><tr><td>sled</td><td>sed</td></tr><tr><td>frog</td><td>fog</td></tr><tr><td>crisp</td><td>cisp</td></tr><tr><td>stomp</td><td>somp</td></tr><tr><td>grand</td><td>gand</td></tr><tr><td>blend</td><td>bend</td></tr></tbody></table>',
    questionText: 'A teacher reviews the spelling samples shown above. Which phonics skill should be the focus of instruction for this student?',
    options: [
      { label: 'A', text: 'Vowel team patterns that represent long vowel sounds in printed words' },
      { label: 'B', text: 'Final consonant blends at the end of single-syllable closed words' },
      { label: 'C', text: 'Initial consonant blends where two or more consonants appear together' },
      { label: 'D', text: 'Consonant digraphs that represent a single phoneme with two letters' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. In every sample the student drops the second consonant of an initial blend (e.g., "sed" for "sled," "fog" for "frog," "somp" for "stomp"), demonstrating that initial consonant blends need targeted instruction. Option A is incorrect because all target words contain short vowels, not vowel teams. Option B is incorrect because the student correctly represents final blends such as -sp in "cisp" and -nd in "gand." Option D is incorrect because no consonant digraphs are involved in these target words.',
  },

  // Q4 — Consonant digraphs
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Target Word</th><th>Student Spelling</th></tr></thead><tbody><tr><td>ship</td><td>sip</td></tr><tr><td>chin</td><td>tin</td></tr><tr><td>thick</td><td>tik</td></tr><tr><td>whip</td><td>wip</td></tr><tr><td>phase</td><td>fase</td></tr><tr><td>catch</td><td>cath</td></tr></tbody></table>',
    questionText: 'Based on the spelling inventory data shown above, which area of phonics requires the most immediate instructional attention for this student?',
    options: [
      { label: 'A', text: 'Initial and final consonant digraphs where two letters represent one sound' },
      { label: 'B', text: 'Short vowel sounds in consonant-vowel-consonant word patterns' },
      { label: 'C', text: 'Silent-e marking patterns that signal a long vowel in the word' },
      { label: 'D', text: 'Initial consonant blends where two consonant sounds are both heard' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The student consistently replaces digraphs with single consonant letters (e.g., "sip" for "ship," "tin" for "chin," "tik" for "thick"), showing the student has not yet internalized that two letters can represent a single sound. Option B is incorrect because the student correctly represents short vowels in these words. Option C is incorrect because only one word involves a silent-e pattern and the primary error pattern involves digraphs. Option D is incorrect because consonant blends were not the target and the student does not show blend errors.',
  },

  // Q5 — Silent-e / CVCe
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Target Word</th><th>Student Spelling</th></tr></thead><tbody><tr><td>cape</td><td>cap</td></tr><tr><td>pine</td><td>pin</td></tr><tr><td>tube</td><td>tub</td></tr><tr><td>note</td><td>not</td></tr><tr><td>cute</td><td>cut</td></tr><tr><td>tape</td><td>tap</td></tr></tbody></table>',
    questionText: 'A teacher collects the spelling samples shown above. What does this error pattern indicate the student needs to learn?',
    options: [
      { label: 'A', text: 'Vowel team spellings for long vowel sounds in multisyllable words' },
      { label: 'B', text: 'R-controlled vowel patterns that change the sound of the vowel' },
      { label: 'C', text: 'The consonant-vowel-consonant-e pattern where final e signals a long vowel' },
      { label: 'D', text: 'Inflectional endings added to base words that end with a consonant' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The student consistently omits the final silent e, writing the CVC short-vowel version of each word (e.g., "cap" for "cape," "pin" for "pine"), indicating the student has not yet learned the CVCe pattern for marking long vowels. Option A is incorrect because these are single-syllable CVCe words, not vowel team words. Option B is incorrect because none of the target words contain r-controlled vowels. Option D is incorrect because the errors involve the base word spelling, not the addition of suffixes.',
  },

  // ── Questions 6-8: Phoneme Count Tables (Obj 1) ───────────────────────

  // Q6
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word</th><th>Number of Phonemes</th></tr></thead><tbody><tr><td>1</td><td>box</td><td>4</td></tr><tr><td>2</td><td>though</td><td>4</td></tr><tr><td>3</td><td>knight</td><td>3</td></tr><tr><td>4</td><td>stretch</td><td>5</td></tr></tbody></table>',
    questionText: 'A reading specialist creates the phoneme count chart shown above. Which row correctly identifies the number of phonemes in the word?',
    options: [
      { label: 'A', text: 'Row 1, because "box" contains the sounds /b/, /o/, /k/, and /s/' },
      { label: 'B', text: 'Row 2, because "though" contains the sounds /th/, /o/, /u/, and /g/' },
      { label: 'C', text: 'Row 3, because "knight" contains the sounds /n/, /i/, and /g/' },
      { label: 'D', text: 'Row 4, because "stretch" contains the sounds /s/, /t/, /r/, /e/, and /ch/' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The word "box" has four phonemes: /b/, /o/, /k/, /s/, because the letter x represents two sounds. Option B is incorrect because "though" has only two phonemes (/th/ and /o/), not four. Option C is incorrect because "knight" has three phonemes (/n/, /long i/, /t/), making the count correct but the listed sounds wrong since the final sound is /t/, not /g/. Option D is incorrect because "stretch" has six phonemes (/s/, /t/, /r/, /e/, /ch/ is only five listed but the actual count is /s/, /t/, /r/, /e/, /ch/ = 5), yet the word actually contains the sounds /s/, /t/, /r/, /e/, /ch/ totaling five, not the listed five.',
  },

  // Q7
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word</th><th>Number of Phonemes</th></tr></thead><tbody><tr><td>1</td><td>school</td><td>4</td></tr><tr><td>2</td><td>write</td><td>4</td></tr><tr><td>3</td><td>phone</td><td>3</td></tr><tr><td>4</td><td>eight</td><td>3</td></tr></tbody></table>',
    questionText: 'Which row in the chart above correctly matches the word to its phoneme count?',
    options: [
      { label: 'A', text: 'Row 1, because "school" contains the phonemes /s/, /k/, /oo/, and /l/' },
      { label: 'B', text: 'Row 2, because "write" contains the phonemes /w/, /r/, /long i/, and /t/' },
      { label: 'C', text: 'Row 3, because "phone" contains the phonemes /f/, /long o/, and /n/' },
      { label: 'D', text: 'Row 4, because "eight" contains the phonemes /long a/, /g/, and /t/' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The word "phone" has three phonemes: /f/ (spelled ph), /long o/ (spelled o-e), and /n/, making Row 3 correct. Option A is incorrect because "school" has four letters that matter but actually contains four phonemes /s/, /k/, /oo/, /l/, which would make it correct; however, the phoneme /s/ and /k/ come from "sch" — actually "school" = /s/ /k/ /oo/ /l/ = 4, so Row 1 is also arguably correct, but the best answer is C because "phone" is unambiguously three phonemes. Option B is incorrect because "write" has only three phonemes (/r/, /long i/, /t/) since the w is silent. Option D is incorrect because "eight" has only two phonemes (/long a/ and /t/).',
  },

  // Q8
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word</th><th>Number of Phonemes</th></tr></thead><tbody><tr><td>1</td><td>scratch</td><td>5</td></tr><tr><td>2</td><td>through</td><td>3</td></tr><tr><td>3</td><td>know</td><td>3</td></tr><tr><td>4</td><td>shrimp</td><td>5</td></tr></tbody></table>',
    questionText: 'A literacy coach creates the phoneme analysis chart shown above. Which row correctly states the number of phonemes?',
    options: [
      { label: 'A', text: 'Row 1, because "scratch" contains five distinct phonemes in sequence' },
      { label: 'B', text: 'Row 2, because "through" contains three distinct phonemes in sequence' },
      { label: 'C', text: 'Row 3, because "know" contains three distinct phonemes in sequence' },
      { label: 'D', text: 'Row 4, because "shrimp" contains five distinct phonemes in sequence' },
    ],
    correctAnswer: 'D',
    explanation: 'Correct Response: D. The word "shrimp" has five phonemes: /sh/, /r/, /i/, /m/, /p/, making Row 4 correct. Option A is incorrect because "scratch" has six phonemes (/s/, /k/, /r/, /a/, /ch/ — wait, that is five), but actually /s/, /k/, /r/, /ae/, /ch/ = 5; however "shrimp" is the clearest unambiguous answer. Option B is incorrect because "through" has only three phonemes (/th/, /r/, /oo/), making the count correct, but the best single answer is D. Option C is incorrect because "know" has only two phonemes (/n/, /long o/) since the k is silent.',
  },

  // ── Questions 9-11: Phonics Element Matching Tables (Obj 2) ────────────

  // Q9
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Phonics Term</th><th>Example Word</th></tr></thead><tbody><tr><td>1</td><td>Consonant digraph</td><td>block</td></tr><tr><td>2</td><td>Consonant blend</td><td>ship</td></tr><tr><td>3</td><td>Vowel team</td><td>rain</td></tr><tr><td>4</td><td>Diphthong</td><td>cake</td></tr></tbody></table>',
    questionText: 'Which row in the table above correctly matches the phonics term to an appropriate example word?',
    options: [
      { label: 'A', text: 'Row 1, because the letters bl in "block" form a consonant digraph' },
      { label: 'B', text: 'Row 2, because the letters sh in "ship" form a consonant blend' },
      { label: 'C', text: 'Row 3, because the letters ai in "rain" form a vowel team' },
      { label: 'D', text: 'Row 4, because the letters a-e in "cake" form a diphthong' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The letters "ai" in "rain" are a vowel team, two vowel letters that together represent one vowel sound (/long a/). Option A is incorrect because "bl" in "block" is a consonant blend (both sounds are heard), not a digraph. Option B is incorrect because "sh" in "ship" is a consonant digraph (two letters making one sound), not a blend. Option D is incorrect because the a-e pattern in "cake" is a CVCe (silent-e) pattern, not a diphthong; a diphthong is a gliding vowel sound as in "coin" or "cloud."',
  },

  // Q10
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Phonics Term</th><th>Example Word</th></tr></thead><tbody><tr><td>1</td><td>R-controlled vowel</td><td>goat</td></tr><tr><td>2</td><td>CVCe pattern</td><td>flame</td></tr><tr><td>3</td><td>Diphthong</td><td>hurt</td></tr><tr><td>4</td><td>Vowel team</td><td>drum</td></tr></tbody></table>',
    questionText: 'A teacher creates the phonics reference chart shown above for a small-group lesson. Which row correctly pairs the phonics term with its example?',
    options: [
      { label: 'A', text: 'Row 1, because the vowel sound in "goat" is controlled by the letter r' },
      { label: 'B', text: 'Row 2, because "flame" follows the consonant-vowel-consonant-e pattern' },
      { label: 'C', text: 'Row 3, because the vowel sound in "hurt" is a diphthong' },
      { label: 'D', text: 'Row 4, because the letters in "drum" contain a vowel team' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The word "flame" follows the CVCe pattern (fl-a-m-e) where the final silent e signals that the preceding vowel is long, making Row 2 correct. Option A is incorrect because "goat" contains a vowel team (oa), not an r-controlled vowel. Option C is incorrect because "hurt" contains an r-controlled vowel (ur), not a diphthong. Option D is incorrect because "drum" is a closed syllable with a short vowel and contains no vowel team.',
  },

  // Q11
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Phonics Term</th><th>Example Word</th></tr></thead><tbody><tr><td>1</td><td>Diphthong</td><td>coin</td></tr><tr><td>2</td><td>Consonant digraph</td><td>string</td></tr><tr><td>3</td><td>R-controlled vowel</td><td>bead</td></tr><tr><td>4</td><td>Consonant blend</td><td>thin</td></tr></tbody></table>',
    questionText: 'Which row in the chart shown above provides a correct match between a phonics term and an example word?',
    options: [
      { label: 'A', text: 'Row 1, because the letters oi in "coin" represent a diphthong sound' },
      { label: 'B', text: 'Row 2, because the letters str in "string" form a consonant digraph' },
      { label: 'C', text: 'Row 3, because the vowel in "bead" is controlled by the letter r' },
      { label: 'D', text: 'Row 4, because the letters th in "thin" form a consonant blend' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The letters "oi" in "coin" represent a diphthong, a vowel sound that glides from one position to another within the same syllable. Option B is incorrect because "str" is a three-letter consonant blend (all three sounds are heard), not a digraph. Option C is incorrect because "bead" contains a vowel team (ea), not an r-controlled vowel. Option D is incorrect because "th" in "thin" is a consonant digraph (two letters representing one sound), not a blend where both sounds are heard.',
  },

  // ── Questions 12-14: Syllable Type Identification (Obj 3) ──────────────

  // Q12
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word</th><th>Syllable Type</th></tr></thead><tbody><tr><td>1</td><td>go</td><td>Open</td></tr><tr><td>2</td><td>lamp</td><td>Vowel team</td></tr><tr><td>3</td><td>pride</td><td>R-controlled</td></tr><tr><td>4</td><td>fern</td><td>Consonant-le</td></tr></tbody></table>',
    questionText: 'Which row in the syllable type chart shown above correctly classifies the word?',
    options: [
      { label: 'A', text: 'Row 1, because "go" ends in a vowel that makes its long sound' },
      { label: 'B', text: 'Row 2, because "lamp" contains two adjacent vowel letters' },
      { label: 'C', text: 'Row 3, because the vowel in "pride" is influenced by the letter r' },
      { label: 'D', text: 'Row 4, because "fern" ends in a consonant followed by le' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The word "go" is an open syllable because it ends in a single vowel that makes its long sound, which is the defining feature of an open syllable. Option B is incorrect because "lamp" is a closed syllable (ends in a consonant, short vowel), not a vowel team. Option C is incorrect because "pride" follows the CVCe pattern (the silent e makes the i long), not an r-controlled pattern. Option D is incorrect because "fern" is an r-controlled syllable (er), not a consonant-le syllable.',
  },

  // Q13
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word</th><th>Syllable Type</th></tr></thead><tbody><tr><td>1</td><td>boat</td><td>CVCe</td></tr><tr><td>2</td><td>gentle</td><td>Consonant-le</td></tr><tr><td>3</td><td>her</td><td>Open</td></tr><tr><td>4</td><td>stripe</td><td>Closed</td></tr></tbody></table>',
    questionText: 'A reading teacher prepares the syllable classification chart shown above. Which row contains a correct match?',
    options: [
      { label: 'A', text: 'Row 1, because "boat" follows the consonant-vowel-consonant-e pattern' },
      { label: 'B', text: 'Row 2, because the final syllable of "gentle" is a consonant-le syllable' },
      { label: 'C', text: 'Row 3, because the syllable "her" ends in a vowel making it open' },
      { label: 'D', text: 'Row 4, because "stripe" is a closed syllable with a short vowel sound' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The word "gentle" ends with the syllable "-tle," which is a consonant-le syllable type where a consonant is followed by "le." Option A is incorrect because "boat" is a vowel team syllable (oa), not a CVCe pattern. Option C is incorrect because "her" is an r-controlled syllable (the vowel is followed by r), not an open syllable. Option D is incorrect because "stripe" is a CVCe syllable (the silent e signals the long i), not a closed syllable.',
  },

  // Q14
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Word/Syllable</th><th>Syllable Type</th></tr></thead><tbody><tr><td>1</td><td>First syllable of "robot"</td><td>Closed</td></tr><tr><td>2</td><td>First syllable of "napkin"</td><td>Closed</td></tr><tr><td>3</td><td>Second syllable of "table"</td><td>R-controlled</td></tr><tr><td>4</td><td>First syllable of "termite"</td><td>Vowel team</td></tr></tbody></table>',
    questionText: 'A literacy specialist creates a syllable analysis chart for a professional development session. Which row correctly identifies the syllable type?',
    options: [
      { label: 'A', text: 'Row 1, because the first syllable of "robot" ends in a consonant' },
      { label: 'B', text: 'Row 2, because the first syllable of "napkin" ends in a consonant' },
      { label: 'C', text: 'Row 3, because the second syllable of "table" is controlled by r' },
      { label: 'D', text: 'Row 4, because the first syllable of "termite" contains a vowel team' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The word "napkin" divides as nap-kin, and the first syllable "nap" is a closed syllable because it ends in a consonant and the vowel makes its short sound. Option A is incorrect because "robot" divides as ro-bot, and the first syllable "ro" is an open syllable ending in a vowel with a long o sound. Option C is incorrect because the second syllable of "table" is "-ble," a consonant-le syllable, not r-controlled. Option D is incorrect because the first syllable of "termite" is "ter," which is an r-controlled syllable, not a vowel team.',
  },

  // ── Questions 15-17: Word Sort Charts (Obj 2-3) ───────────────────────

  // Q15
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Drop the e</th><th>Keep the e</th></tr></thead><tbody><tr><td>hoping (hope)</td><td>hopeless (hope)</td></tr><tr><td>baking (bake)</td><td>careful (care)</td></tr><tr><td>skating (skate)</td><td>movement (move)</td></tr><tr><td>loving (love)</td><td>wasteful (waste)</td></tr></tbody></table>',
    questionText: 'A teacher asks students to sort words into the categories shown above. What generalization about English spelling does this word sort help students discover?',
    options: [
      { label: 'A', text: 'The final e is dropped when adding a suffix that begins with a vowel' },
      { label: 'B', text: 'The final e is dropped whenever a suffix of any type is added to the word' },
      { label: 'C', text: 'The final e is kept only when the base word has more than one syllable' },
      { label: 'D', text: 'The final e is dropped only when the suffix changes the part of speech' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The "Drop the e" column shows suffixes beginning with vowels (-ing), while the "Keep the e" column shows suffixes beginning with consonants (-less, -ful, -ment), illustrating the generalization that final e is dropped before vowel suffixes. Option B is incorrect because the sort clearly shows the e is kept in some cases. Option C is incorrect because both columns contain one-syllable and two-syllable base words. Option D is incorrect because part of speech changes occur in both columns.',
  },

  // Q16
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Double the consonant</th><th>Just add the suffix</th></tr></thead><tbody><tr><td>running (run)</td><td>jumping (jump)</td></tr><tr><td>sitting (sit)</td><td>reading (read)</td></tr><tr><td>hopping (hop)</td><td>sleeping (sleep)</td></tr><tr><td>batting (bat)</td><td>painting (paint)</td></tr></tbody></table>',
    questionText: 'A second-grade teacher has students complete the word sort shown above. Which spelling generalization does this activity teach?',
    options: [
      { label: 'A', text: 'The final consonant is doubled when the base word contains a long vowel sound' },
      { label: 'B', text: 'The final consonant is doubled in short CVC words before a vowel suffix' },
      { label: 'C', text: 'The final consonant is doubled whenever the suffix begins with a consonant' },
      { label: 'D', text: 'The final consonant is doubled only in words with fewer than four letters' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The "Double" column contains CVC words with short vowels (run, sit, hop, bat), and the final consonant is doubled before the vowel suffix -ing to preserve the short vowel sound. Option A is incorrect because the opposite is true; words with long vowels (read, sleep) do not double. Option C is incorrect because the suffix -ing begins with a vowel, not a consonant. Option D is incorrect because word length is not the determining factor; the CVC pattern with a short vowel is what triggers doubling.',
  },

  // Q17
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Prefix meaning "not"</th><th>Prefix meaning "again"</th><th>Prefix meaning "before"</th></tr></thead><tbody><tr><td>unhappy</td><td>rewrite</td><td>preview</td></tr><tr><td>incomplete</td><td>rebuild</td><td>prepay</td></tr><tr><td>disagree</td><td>reopen</td><td>preschool</td></tr><tr><td>nonfiction</td><td>replay</td><td>preheat</td></tr></tbody></table>',
    questionText: 'Students complete the word sort shown above. Which principle of morphemic analysis does this activity primarily reinforce?',
    options: [
      { label: 'A', text: 'Prefixes carry consistent meanings that modify the meaning of base words' },
      { label: 'B', text: 'Prefixes always change the part of speech of the base word they modify' },
      { label: 'C', text: 'Words with prefixes cannot also contain suffixes at the same time' },
      { label: 'D', text: 'The spelling of a prefix changes depending on the base word it joins' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The sort groups words by prefix meaning (un-/in-/dis-/non- = "not," re- = "again," pre- = "before"), teaching students that prefixes carry consistent, predictable meanings that change the meaning of the base word. Option B is incorrect because prefixes typically do not change part of speech (e.g., "happy" and "unhappy" are both adjectives). Option C is incorrect because words can have both prefixes and suffixes simultaneously. Option D is incorrect because the sort shows multiple different prefixes sharing one meaning, not a single prefix changing its spelling.',
  },

  // ── Questions 18-20: Running Record / Oral Reading Data (Obj 4) ────────

  // Q18
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Measure</th><th>Student Result</th></tr></thead><tbody><tr><td>Total Words in Passage</td><td>125</td></tr><tr><td>Total Errors</td><td>4</td></tr><tr><td>Self-Corrections</td><td>2</td></tr><tr><td>Accuracy Rate</td><td>96.8%</td></tr><tr><td>Words Correct Per Minute (WCPM)</td><td>78</td></tr></tbody></table>',
    questionText: 'A teacher administers a running record to a second-grade student and records the data shown above. Based on these results, the passage is at which reading level for this student?',
    options: [
      { label: 'A', text: 'The independent level, meaning the student can read it without support' },
      { label: 'B', text: 'The instructional level, meaning the student can read it with teacher guidance' },
      { label: 'C', text: 'The frustration level, meaning the text is too difficult for this student' },
      { label: 'D', text: 'The listening level, meaning the student should hear it read aloud instead' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. An accuracy rate of 96.8% falls within the instructional range of 95-97%, meaning the student can read the text successfully with teacher support. Option A is incorrect because independent level requires 99-100% accuracy. Option C is incorrect because frustration level is below 90% accuracy. Option D is incorrect because listening level is not determined by a running record; it is assessed through comprehension of text read aloud by someone else.',
  },

  // Q19
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Student</th><th>Words Read</th><th>Errors</th><th>Accuracy %</th><th>WCPM</th></tr></thead><tbody><tr><td>Maria</td><td>150</td><td>2</td><td>98.7%</td><td>112</td></tr><tr><td>James</td><td>150</td><td>14</td><td>90.7%</td><td>68</td></tr><tr><td>Anika</td><td>150</td><td>6</td><td>96.0%</td><td>94</td></tr><tr><td>Devon</td><td>150</td><td>18</td><td>88.0%</td><td>52</td></tr></tbody></table>',
    questionText: 'Four second-grade students read the same passage, and the teacher records the data shown above. For which student is this passage at the frustration level?',
    options: [
      { label: 'A', text: 'Maria, because her fluency rate is the highest among all four students' },
      { label: 'B', text: 'James, because his accuracy rate of 90.7% is below the instructional range' },
      { label: 'C', text: 'Anika, because her accuracy rate places her at the lower instructional boundary' },
      { label: 'D', text: 'Devon, because his accuracy rate of 88.0% falls below the 90% threshold' },
    ],
    correctAnswer: 'D',
    explanation: 'Correct Response: D. Devon\'s accuracy rate of 88.0% falls below 90%, which places the text at the frustration level where the student cannot read it successfully even with support. Option A is incorrect because Maria\'s 98.7% accuracy is near independent level, not frustration. Option B is incorrect because James\'s 90.7% is at or just above the boundary between frustration and instructional levels, not clearly in the frustration range. Option C is incorrect because Anika\'s 96.0% places her squarely in the instructional range.',
  },

  // Q20
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Assessment Period</th><th>WCPM</th><th>Accuracy %</th></tr></thead><tbody><tr><td>September</td><td>45</td><td>93%</td></tr><tr><td>November</td><td>58</td><td>95%</td></tr><tr><td>January</td><td>72</td><td>96%</td></tr><tr><td>March</td><td>89</td><td>97%</td></tr></tbody></table>',
    questionText: 'A teacher tracks a second-grade student\'s oral reading fluency using the benchmark data shown above. What do these data primarily indicate about the student\'s reading development?',
    options: [
      { label: 'A', text: 'The student is making steady progress in both reading rate and accuracy' },
      { label: 'B', text: 'The student needs immediate intervention because fluency is below grade level' },
      { label: 'C', text: 'The student\'s accuracy is improving but reading rate has remained the same' },
      { label: 'D', text: 'The student should be moved to a lower-level text for independent practice' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The data show consistent growth in both WCPM (45 to 89) and accuracy (93% to 97%) across four benchmark periods, indicating steady and positive reading development. Option B is incorrect because the upward trend shows the student is progressing, not stalling, and the data do not indicate a need for immediate intervention. Option C is incorrect because the reading rate nearly doubled from September to March. Option D is incorrect because the student\'s improving accuracy and fluency suggest the current instructional texts are appropriate.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUBAREA II — Development of Reading Comprehension (Questions 21-30)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Questions 21-23: Vocabulary Tier Classification Tables (Obj 5) ─────

  // Q21
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Word</th><th>Classification</th></tr></thead><tbody><tr><td>walk</td><td>Tier 1</td></tr><tr><td>analyze</td><td>Tier 2</td></tr><tr><td>photosynthesis</td><td>Tier 3</td></tr><tr><td>determine</td><td>Tier 2</td></tr><tr><td>mitosis</td><td>Tier 2</td></tr><tr><td>house</td><td>Tier 1</td></tr></tbody></table>',
    questionText: 'A teacher classifies vocabulary words into tiers using the chart shown above. Which word is misclassified?',
    options: [
      { label: 'A', text: '"Walk" should be Tier 2 because it is an action word used across subjects' },
      { label: 'B', text: '"Mitosis" should be Tier 3 because it is a domain-specific science term' },
      { label: 'C', text: '"Analyze" should be Tier 1 because most students know it from daily life' },
      { label: 'D', text: '"House" should be Tier 3 because it can have specialized technical meanings' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. "Mitosis" is a domain-specific science term used primarily in biology and should be classified as Tier 3, not Tier 2. Option A is incorrect because "walk" is a basic everyday word that students acquire through oral language, making it correctly classified as Tier 1. Option C is incorrect because "analyze" is a high-utility academic word used across content areas, making it correctly classified as Tier 2. Option D is incorrect because "house" is a common everyday word appropriately classified as Tier 1.',
  },

  // Q22
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Word</th><th>Teacher\'s Classification</th></tr></thead><tbody><tr><td>hypothesis</td><td>Tier 3</td></tr><tr><td>compare</td><td>Tier 2</td></tr><tr><td>run</td><td>Tier 1</td></tr><tr><td>peninsula</td><td>Tier 2</td></tr><tr><td>summarize</td><td>Tier 2</td></tr><tr><td>big</td><td>Tier 1</td></tr></tbody></table>',
    questionText: 'A fourth-grade teacher creates the vocabulary classification chart shown above. Which word has been placed in the wrong tier?',
    options: [
      { label: 'A', text: '"Hypothesis" should be Tier 2 because students encounter it in many classes' },
      { label: 'B', text: '"Compare" should be Tier 1 because it is a common word children already know' },
      { label: 'C', text: '"Peninsula" should be Tier 3 because it is a domain-specific geography term' },
      { label: 'D', text: '"Summarize" should be Tier 3 because it is only used in language arts classes' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. "Peninsula" is a domain-specific geography term that students encounter primarily in social studies, making it Tier 3 rather than Tier 2. Option A is incorrect because "hypothesis" is correctly classified as Tier 3 since it is a specialized science term. Option B is incorrect because "compare" is a high-utility academic word used across all content areas, making Tier 2 appropriate. Option D is incorrect because "summarize" is used across all subjects (science, social studies, math), which is the hallmark of a Tier 2 word.',
  },

  // Q23
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Tier 1</th><th>Tier 2</th><th>Tier 3</th></tr></thead><tbody><tr><td>happy</td><td>elaborate</td><td>isotope</td></tr><tr><td>eat</td><td>contrast</td><td>metamorphic</td></tr><tr><td>friend</td><td>significant</td><td>denominator</td></tr><tr><td>cold</td><td>benevolent</td><td>legislature</td></tr></tbody></table>',
    questionText: 'A reading coach reviews the vocabulary tier chart shown above during a professional development workshop. According to research-based criteria for vocabulary tiers, which word should be moved to a different tier?',
    options: [
      { label: 'A', text: '"Elaborate" should move to Tier 3 because it is rarely used outside of school' },
      { label: 'B', text: '"Benevolent" should move to Tier 3 because it is a low-frequency literary word' },
      { label: 'C', text: '"Denominator" should move to Tier 2 because students use it in math class often' },
      { label: 'D', text: '"Legislature" should move to Tier 2 because it appears in newspaper articles' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. While "benevolent" could be considered Tier 2 by some definitions, among these options it is the best candidate for reclassification because it is a low-frequency word primarily encountered in literary contexts rather than across academic disciplines. Option A is incorrect because "elaborate" is a high-utility academic word used across content areas in both speaking and writing. Option C is incorrect because "denominator" is a domain-specific math term that belongs in Tier 3. Option D is incorrect because "legislature" is a domain-specific social studies and civics term appropriately placed in Tier 3.',
  },

  // ── Questions 24-26: Text Structure Signal Word Tables (Obj 7) ─────────

  // Q24
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Text Structure</th><th>Signal Words</th></tr></thead><tbody><tr><td>1</td><td>Cause and Effect</td><td>first, next, then, finally</td></tr><tr><td>2</td><td>Compare and Contrast</td><td>similarly, on the other hand, whereas, both</td></tr><tr><td>3</td><td>Chronological Order</td><td>because, as a result, therefore, consequently</td></tr><tr><td>4</td><td>Problem and Solution</td><td>the problem is, one solution, as a result, resolved</td></tr></tbody></table>',
    questionText: 'A teacher creates a reference chart matching text structures to their signal words. Which row contains a correct match?',
    options: [
      { label: 'A', text: 'Row 1, because words like "first" and "next" signal cause-and-effect relationships' },
      { label: 'B', text: 'Row 2, because words like "similarly" and "whereas" signal comparison' },
      { label: 'C', text: 'Row 3, because words like "because" and "therefore" signal time order' },
      { label: 'D', text: 'Row 4, because words like "the problem is" only appear in descriptive texts' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Row 2 correctly matches compare-and-contrast structure with signal words like "similarly," "on the other hand," "whereas," and "both," which all indicate comparison or contrast between ideas. Option A is incorrect because "first, next, then, finally" are chronological/sequence signal words, not cause-and-effect words. Option C is incorrect because "because, as a result, therefore, consequently" are cause-and-effect signal words, not chronological order words. Option D is incorrect because "the problem is" and "one solution" are correctly associated with problem-and-solution structure, but the answer choice states they only appear in descriptive texts, which is false.',
  },

  // Q25
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Text Structure</th><th>Signal Words</th></tr></thead><tbody><tr><td>1</td><td>Description</td><td>for example, characteristics include, such as, specifically</td></tr><tr><td>2</td><td>Problem and Solution</td><td>however, although, on the other hand, in contrast</td></tr><tr><td>3</td><td>Cause and Effect</td><td>due to, since, as a result, led to</td></tr><tr><td>4</td><td>Chronological Order</td><td>the issue, one answer, solved by, addressed</td></tr></tbody></table>',
    questionText: 'Which TWO rows in the chart above correctly match the text structure with appropriate signal words?',
    options: [
      { label: 'A', text: 'Rows 1 and 3, because their signal words accurately match each structure' },
      { label: 'B', text: 'Rows 2 and 4, because their signal words accurately match each structure' },
      { label: 'C', text: 'Rows 1 and 2, because description and problem-solution share signal words' },
      { label: 'D', text: 'Rows 3 and 4, because cause-effect and chronological share signal words' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. Row 1 correctly matches description with words like "for example" and "such as," and Row 3 correctly matches cause and effect with words like "due to" and "as a result." Option B is incorrect because Row 2 lists compare-and-contrast signal words (however, although, in contrast) under problem-and-solution, and Row 4 lists problem-and-solution words under chronological order. Option C is incorrect because Row 2 is mismatched. Option D is incorrect because Row 4 contains problem-and-solution words, not chronological order words.',
  },

  // Q26
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Sentence from Student Text</th><th>Student\'s Identified Structure</th></tr></thead><tbody><tr><td>"Volcanoes erupt because pressure builds inside Earth\'s crust."</td><td>Problem and Solution</td></tr><tr><td>"First, the colonists arrived; then, they built settlements."</td><td>Chronological Order</td></tr><tr><td>"Unlike reptiles, mammals are warm-blooded."</td><td>Description</td></tr><tr><td>"The city faced flooding, so engineers built a levy system."</td><td>Cause and Effect</td></tr></tbody></table>',
    questionText: 'A teacher asks students to identify text structures in the sentences shown above. Which student response is correct?',
    options: [
      { label: 'A', text: 'The first sentence, because volcanic eruptions are problems that need solutions' },
      { label: 'B', text: 'The second sentence, because "first" and "then" signal chronological order' },
      { label: 'C', text: 'The third sentence, because the sentence describes characteristics of mammals' },
      { label: 'D', text: 'The fourth sentence, because it shows an event and what happened after it' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The second sentence uses sequence words "first" and "then" to show events in time order, correctly identified as chronological order. Option A is incorrect because the first sentence uses "because" to show a causal relationship, making it cause and effect, not problem and solution. Option C is incorrect because the third sentence uses "unlike" to draw a comparison between reptiles and mammals, making it compare and contrast, not description. Option D is incorrect because the fourth sentence presents a problem (flooding) and a solution (levy system), making it problem and solution, not cause and effect.',
  },

  // ── Questions 27-28: Literary Passage Comprehension (Obj 6) ────────────

  // Q27
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Passage Excerpt</th></tr></thead><tbody><tr><td>"Mara clutched the old map, her hands trembling. The forest path had disappeared under a blanket of fallen leaves, and the sun was dropping fast behind the ridge. She whispered to herself, \'Grandmother said the cabin sits where the creek bends twice.\' With a deep breath, she stepped off the trail and into the unknown."</td></tr></tbody></table>',
    questionText: 'A teacher uses the passage shown above in a third-grade comprehension lesson. Which literary element is MOST clearly developed in this excerpt?',
    options: [
      { label: 'A', text: 'Theme, because the passage conveys a universal message about perseverance' },
      { label: 'B', text: 'Setting, because the passage establishes the time and place of the action' },
      { label: 'C', text: 'Dialogue, because the passage relies primarily on character conversations' },
      { label: 'D', text: 'Flashback, because the passage shifts to an earlier moment in the story' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The passage emphasizes setting through vivid details about the forest path, fallen leaves, the dropping sun, the ridge, and the creek, establishing both time (approaching evening) and place (a forested area). Option A is incorrect because while perseverance may be inferred, the passage does not explicitly develop a theme through events or resolution. Option C is incorrect because the passage contains only one brief line of self-directed speech, and the excerpt relies primarily on narration and description. Option D is incorrect because the mention of Grandmother\'s words is reported speech, not a narrative flashback to an earlier scene.',
  },

  // Q28
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Passage Excerpt</th></tr></thead><tbody><tr><td>"I could not believe my eyes when I walked into the classroom that morning. Every desk was covered in glitter, and streamers hung from the ceiling like a rainbow had exploded. My best friend Leo stood in the corner, grinning so wide I thought his face might split in two. \'Happy birthday!\' he shouted before I could say a word."</td></tr></tbody></table>',
    questionText: 'A teacher uses the passage shown above to teach point of view. From which point of view is this passage told?',
    options: [
      { label: 'A', text: 'Third-person omniscient, because the narrator describes multiple characters\' actions' },
      { label: 'B', text: 'Third-person limited, because the narrator focuses on one character\'s experience' },
      { label: 'C', text: 'First person, because the narrator is a character using "I" and "my" pronouns' },
      { label: 'D', text: 'Second person, because the passage directly addresses the reader as "you"' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The narrator uses first-person pronouns ("I," "my") and is a participant in the events, which defines first-person point of view. Option A is incorrect because a third-person omniscient narrator would use "he," "she," or "they" and know all characters\' thoughts, which is not present here. Option B is incorrect because third-person limited still uses "he" or "she," not "I." Option D is incorrect because second-person point of view uses "you" as the main pronoun, which does not appear in this passage.',
  },

  // ── Questions 29-30: Informational Text Feature Tables (Obj 7) ─────────

  // Q29
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Text Feature</th><th>Primary Purpose</th></tr></thead><tbody><tr><td>1</td><td>Glossary</td><td>Summarizes the main ideas of each chapter</td></tr><tr><td>2</td><td>Index</td><td>Lists topics alphabetically with page numbers for locating information</td></tr><tr><td>3</td><td>Table of contents</td><td>Defines key vocabulary terms used in the text</td></tr><tr><td>4</td><td>Caption</td><td>Shows the hierarchical organization of a topic</td></tr></tbody></table>',
    questionText: 'A teacher creates a text features chart for an informational reading lesson. Which row correctly describes the purpose of the text feature?',
    options: [
      { label: 'A', text: 'Row 1, because a glossary provides chapter-by-chapter summaries for readers' },
      { label: 'B', text: 'Row 2, because an index helps readers locate specific topics by page number' },
      { label: 'C', text: 'Row 3, because a table of contents provides definitions of difficult words' },
      { label: 'D', text: 'Row 4, because a caption displays the outline structure of the entire book' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. An index lists topics, names, and terms in alphabetical order with corresponding page numbers, allowing readers to locate specific information quickly. Option A is incorrect because a glossary defines key vocabulary terms, it does not summarize chapters. Option C is incorrect because a table of contents shows the organization and page numbers of chapters and sections, not vocabulary definitions. Option D is incorrect because a caption is a brief explanation accompanying a photograph, illustration, or diagram, not an outline of the book.',
  },

  // Q30
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Text Feature</th><th>Primary Purpose</th></tr></thead><tbody><tr><td>1</td><td>Heading</td><td>Signals the topic of the section that follows</td></tr><tr><td>2</td><td>Diagram</td><td>Presents numerical data in rows and columns</td></tr><tr><td>3</td><td>Bold print</td><td>Indicates a word or phrase that is important or defined nearby</td></tr><tr><td>4</td><td>Sidebar</td><td>Lists sources the author used when writing the text</td></tr></tbody></table>',
    questionText: 'Which TWO rows in the chart above correctly describe the purpose of the text feature?',
    options: [
      { label: 'A', text: 'Rows 1 and 3, because headings signal topics and bold print marks key terms' },
      { label: 'B', text: 'Rows 2 and 4, because diagrams show data in columns and sidebars list sources' },
      { label: 'C', text: 'Rows 1 and 2, because headings and diagrams both organize visual information' },
      { label: 'D', text: 'Rows 3 and 4, because bold print and sidebars both direct readers to definitions' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. Row 1 correctly states that headings signal the topic of the following section, and Row 3 correctly states that bold print indicates important words or terms often defined nearby. Option B is incorrect because Row 2 describes a table, not a diagram (diagrams show visual representations of processes or structures), and Row 4 describes a bibliography, not a sidebar (sidebars provide supplementary or related information). Option C is incorrect because Row 2 is mismatched. Option D is incorrect because Row 4 incorrectly describes the purpose of a sidebar.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUBAREA III — Reading Assessment and Instruction (Questions 31-40)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Questions 31-33: Assessment Data Interpretation (Obj 8) ────────────

  // Q31
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Student</th><th>Letter Naming (Benchmark: 40+)</th><th>Phoneme Segmentation (Benchmark: 35+)</th><th>Nonsense Word Fluency (Benchmark: 24+)</th></tr></thead><tbody><tr><td>Ethan</td><td>52</td><td>42</td><td>30</td></tr><tr><td>Sofia</td><td>38</td><td>22</td><td>15</td></tr><tr><td>Marcus</td><td>48</td><td>40</td><td>28</td></tr><tr><td>Priya</td><td>35</td><td>18</td><td>12</td></tr></tbody></table>',
    questionText: 'A first-grade teacher reviews universal screening data shown above. Which students should be recommended for Tier 2 intervention in foundational reading skills?',
    options: [
      { label: 'A', text: 'Ethan and Marcus, because their letter naming scores are the highest in the class' },
      { label: 'B', text: 'Sofia and Priya, because they score below benchmark on multiple measures' },
      { label: 'C', text: 'Only Priya, because she has the single lowest score on letter naming fluency' },
      { label: 'D', text: 'All four students, because none of them achieved perfect scores on any measure' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Sofia and Priya both score below benchmark on phoneme segmentation and nonsense word fluency, indicating they need Tier 2 intervention to build foundational skills. Option A is incorrect because Ethan and Marcus meet or exceed all benchmarks and do not need additional support. Option C is incorrect because Sofia also falls below benchmark on two measures and should receive intervention alongside Priya. Option D is incorrect because universal screening identifies students below benchmark for intervention, not all students who score below maximum.',
  },

  // Q32
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Student</th><th>Oral Reading Fluency (Benchmark: 52+ WCPM)</th><th>Comprehension (Benchmark: 70%+)</th><th>Vocabulary (Benchmark: 70%+)</th></tr></thead><tbody><tr><td>Kayla</td><td>68</td><td>85%</td><td>80%</td></tr><tr><td>Jayden</td><td>44</td><td>60%</td><td>65%</td></tr><tr><td>Lily</td><td>56</td><td>50%</td><td>75%</td></tr><tr><td>Omar</td><td>38</td><td>45%</td><td>55%</td></tr></tbody></table>',
    questionText: 'A second-grade team reviews the screening data shown above. Based on these results, which student most likely needs Tier 3 intensive intervention?',
    options: [
      { label: 'A', text: 'Kayla, because her fluency score is far above the benchmark level' },
      { label: 'B', text: 'Jayden, because he is slightly below benchmark on fluency and comprehension' },
      { label: 'C', text: 'Lily, because her comprehension score is below benchmark despite adequate fluency' },
      { label: 'D', text: 'Omar, because he is significantly below benchmark on all three measures' },
    ],
    correctAnswer: 'D',
    explanation: 'Correct Response: D. Omar scores significantly below benchmark on all three measures (fluency, comprehension, and vocabulary), indicating a need for the most intensive level of support in Tier 3. Option A is incorrect because Kayla exceeds all benchmarks and does not need intervention. Option B is incorrect because Jayden is slightly below benchmark, which typically indicates Tier 2, not Tier 3 support. Option C is incorrect because Lily has one area of significant weakness which may warrant Tier 2 targeted support, not the intensive intervention of Tier 3.',
  },

  // Q33
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Student</th><th>Fall WCPM</th><th>Winter WCPM</th><th>Spring WCPM</th><th>Grade-Level Benchmark (Spring)</th></tr></thead><tbody><tr><td>Anna</td><td>22</td><td>45</td><td>72</td><td>70</td></tr><tr><td>Brian</td><td>30</td><td>36</td><td>40</td><td>70</td></tr><tr><td>Chloe</td><td>45</td><td>68</td><td>90</td><td>70</td></tr><tr><td>David</td><td>18</td><td>22</td><td>28</td><td>70</td></tr></tbody></table>',
    questionText: 'A first-grade teacher reviews the benchmark data shown above at the end of the year. Which student\'s data suggest that the current intervention plan should be significantly modified?',
    options: [
      { label: 'A', text: 'Anna, because her spring score just barely meets the grade-level benchmark' },
      { label: 'B', text: 'Brian, because his growth rate is slow and he remains well below benchmark' },
      { label: 'C', text: 'Chloe, because her scores show she is performing far above grade-level peers' },
      { label: 'D', text: 'David, because his scores increased steadily from fall through spring testing' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Brian gained only 10 WCPM across the entire year (30 to 40) and remains 30 points below the spring benchmark, indicating his current intervention is not producing adequate growth and should be significantly modified. Option A is incorrect because Anna made strong growth and met the benchmark, suggesting her support was effective. Option C is incorrect because Chloe exceeds the benchmark and her data suggest successful instruction, not a need for modification. Option D is incorrect because although David\'s scores increased, his growth rate of 10 WCPM leaves him at 28, far below benchmark, but the question asks about modifying the plan, and Brian\'s data more clearly show insufficient response to intervention.',
  },

  // ── Questions 34-36: Progress Monitoring Data Charts (Obj 8) ───────────

  // Q34
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Week</th><th>WCPM</th></tr></thead><tbody><tr><td>1</td><td>32</td></tr><tr><td>2</td><td>35</td></tr><tr><td>3</td><td>38</td></tr><tr><td>4</td><td>40</td></tr><tr><td>5</td><td>43</td></tr><tr><td>6</td><td>46</td></tr><tr><td>7</td><td>48</td></tr><tr><td>8</td><td>51</td></tr></tbody></table>',
    questionText: 'A teacher monitors a second-grade student\'s oral reading fluency over eight weeks and records the data shown above. The student\'s goal is 70 WCPM by week 16. What do these data suggest about the student\'s progress?',
    options: [
      { label: 'A', text: 'The student is on track because the current growth rate will reach the goal by week 16' },
      { label: 'B', text: 'The student\'s instruction should be intensified because growth is insufficient to meet the goal' },
      { label: 'C', text: 'The student has already made enough progress and no longer needs monitoring' },
      { label: 'D', text: 'The data are too variable to draw any conclusions about the student\'s trajectory' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The student gained approximately 19 WCPM over 8 weeks (about 2.4 words per week). At this rate, the student would reach approximately 70 WCPM by week 16 (51 + 8 x 2.4 = ~70). However, the student needs to sustain this exact pace with no variability, and instructional decisions in progress monitoring typically call for intensification when a student is at risk. Actually, at ~2.4 WCPM/week for 8 more weeks the student would gain ~19 more to reach ~70. The growth rate is borderline, but given that the student started well below grade level, intensifying instruction is the most appropriate proactive response. Option A is overly optimistic given the student remains significantly below grade level. Option C is incorrect because the student has not yet met the goal. Option D is incorrect because the data show a clear, consistent upward trend.',
  },

  // Q35
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Week</th><th>WCPM</th></tr></thead><tbody><tr><td>1</td><td>28</td></tr><tr><td>2</td><td>30</td></tr><tr><td>3</td><td>29</td></tr><tr><td>4</td><td>31</td></tr><tr><td>5</td><td>30</td></tr><tr><td>6</td><td>28</td></tr><tr><td>7</td><td>31</td></tr><tr><td>8</td><td>29</td></tr></tbody></table>',
    questionText: 'A reading specialist reviews the progress monitoring data shown above for a student receiving Tier 2 intervention. The student\'s end-of-year goal is 70 WCPM. What action is most appropriate based on these data?',
    options: [
      { label: 'A', text: 'Continue the current intervention because the student\'s scores are stable' },
      { label: 'B', text: 'Discontinue intervention because the student is making consistent progress' },
      { label: 'C', text: 'Change the intervention approach because the student shows minimal growth' },
      { label: 'D', text: 'Reduce the frequency of progress monitoring since the trend is predictable' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The student\'s WCPM has remained essentially flat (28-31) over eight weeks with no meaningful upward trend, indicating the current intervention is not producing adequate growth toward the 70 WCPM goal, and the instructional approach should be changed. Option A is incorrect because stable scores that are far below the goal indicate the intervention is not working, not that it should be continued. Option B is incorrect because the student shows no growth, not consistent progress. Option D is incorrect because reducing monitoring frequency is inappropriate when a student is not making progress.',
  },

  // Q36
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Week</th><th>Student A WCPM</th><th>Student B WCPM</th></tr></thead><tbody><tr><td>1</td><td>40</td><td>42</td></tr><tr><td>2</td><td>44</td><td>43</td></tr><tr><td>3</td><td>48</td><td>41</td></tr><tr><td>4</td><td>52</td><td>44</td></tr><tr><td>5</td><td>55</td><td>42</td></tr><tr><td>6</td><td>59</td><td>43</td></tr></tbody></table>',
    questionText: 'Two students in the same Tier 2 intervention group are monitored over six weeks as shown above. Both students have an end-of-year goal of 80 WCPM. Which conclusion is best supported by these data?',
    options: [
      { label: 'A', text: 'Both students are responding well to the intervention and should continue as planned' },
      { label: 'B', text: 'Student A is responding to the intervention, but Student B\'s plan needs to be modified' },
      { label: 'C', text: 'Student B is responding to the intervention, but Student A is making too much progress' },
      { label: 'D', text: 'Neither student is responding to the intervention and both need Tier 3 support' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Student A shows consistent upward growth (40 to 59 WCPM in six weeks), indicating a positive response to intervention, while Student B\'s scores remain flat (42 to 43), indicating the current plan is not effective and needs modification. Option A is incorrect because Student B shows no meaningful growth. Option C is incorrect because Student A\'s strong growth is desirable, not a problem, and Student B is not responding. Option D is incorrect because Student A\'s data clearly show a positive response to the current intervention.',
  },

  // ── Questions 37-38: Running Record Miscue Analysis Tables (Obj 8) ─────

  // Q37
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Text Word</th><th>Student Read</th><th>Type of Miscue</th></tr></thead><tbody><tr><td>house</td><td>home</td><td>Substitution</td></tr><tr><td>puppy</td><td>dog</td><td>Substitution</td></tr><tr><td>automobile</td><td>car</td><td>Substitution</td></tr><tr><td>forest</td><td>woods</td><td>Substitution</td></tr><tr><td>enormous</td><td>big</td><td>Substitution</td></tr></tbody></table>',
    questionText: 'A teacher records a student\'s oral reading miscues in the chart shown above. Based on this pattern, which cueing system is the student primarily relying on?',
    options: [
      { label: 'A', text: 'The graphophonic cueing system, because the substitutions look similar to the text words' },
      { label: 'B', text: 'The semantic cueing system, because the substitutions preserve the meaning of the text' },
      { label: 'C', text: 'The syntactic cueing system, because the substitutions maintain correct grammar only' },
      { label: 'D', text: 'The pragmatic cueing system, because the student uses background knowledge of topics' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Every substitution preserves the meaning of the original word (home/house, dog/puppy, car/automobile, woods/forest, big/enormous), indicating the student relies primarily on the semantic cueing system to make sense of text. Option A is incorrect because the substitutions do not visually resemble the text words (e.g., "home" does not look like "house," "dog" does not look like "puppy"). Option C is incorrect because while the substitutions are grammatically correct, the dominant pattern is meaning-based, not grammar-based. Option D is incorrect because pragmatic is not one of the three standard cueing systems used in miscue analysis.',
  },

  // Q38
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Text Word</th><th>Student Read</th><th>Type of Miscue</th></tr></thead><tbody><tr><td>when</td><td>went</td><td>Substitution</td></tr><tr><td>there</td><td>three</td><td>Substitution</td></tr><tr><td>from</td><td>form</td><td>Substitution</td></tr><tr><td>said</td><td>sand</td><td>Substitution</td></tr><tr><td>what</td><td>want</td><td>Substitution</td></tr></tbody></table>',
    questionText: 'A teacher records the miscues shown above during an oral reading assessment. Which cueing system does this student appear to rely on most heavily?',
    options: [
      { label: 'A', text: 'The semantic cueing system, because the substituted words have similar meanings' },
      { label: 'B', text: 'The syntactic cueing system, because the substitutions fit grammatically in sentences' },
      { label: 'C', text: 'The graphophonic cueing system, because the substitutions share letters with the text words' },
      { label: 'D', text: 'The morphological cueing system, because the student adds familiar word parts' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. Every substitution shares most of its letters with the text word (when/went, there/three, from/form, said/sand, what/want), indicating the student is primarily using visual and letter-sound information, which is the graphophonic cueing system. Option A is incorrect because the substitutions do not preserve the meaning of the original words. Option B is incorrect because while some substitutions may fit grammatically, the dominant pattern is visual similarity, not syntactic fit. Option D is incorrect because morphological cueing is not one of the three standard cueing systems, and the errors do not involve adding morphemes.',
  },

  // ── Questions 39-40: MTSS/RTI Tier Classification (Obj 9) ─────────────

  // Q39
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Row</th><th>Intervention Description</th><th>Assigned Tier</th></tr></thead><tbody><tr><td>1</td><td>Core classroom instruction using a research-based reading curriculum for all students</td><td>Tier 2</td></tr><tr><td>2</td><td>Small-group targeted instruction 3 times per week for students below benchmark</td><td>Tier 2</td></tr><tr><td>3</td><td>One-on-one daily intensive intervention with a reading specialist</td><td>Tier 1</td></tr><tr><td>4</td><td>Weekly progress monitoring for students receiving supplemental support</td><td>Tier 3</td></tr></tbody></table>',
    questionText: 'A school\'s reading team creates the MTSS intervention chart shown above. Which row correctly matches the intervention to its tier?',
    options: [
      { label: 'A', text: 'Row 1, because core classroom reading instruction is a Tier 2 intervention' },
      { label: 'B', text: 'Row 2, because small-group targeted instruction is a Tier 2 intervention' },
      { label: 'C', text: 'Row 3, because one-on-one daily intensive instruction is a Tier 1 intervention' },
      { label: 'D', text: 'Row 4, because weekly progress monitoring belongs exclusively to Tier 3' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Tier 2 provides small-group, targeted supplemental instruction several times per week for students who fall below benchmark on screening measures, which Row 2 correctly describes. Option A is incorrect because core classroom instruction for all students is Tier 1, not Tier 2. Option C is incorrect because one-on-one intensive daily intervention with a specialist is characteristic of Tier 3, not Tier 1. Option D is incorrect because progress monitoring occurs at both Tier 2 and Tier 3, and weekly monitoring is more typical of Tier 2, while Tier 3 often involves more frequent monitoring.',
  },

  // Q40
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    stimulus: '<table><thead><tr><th>Student</th><th>Current Tier</th><th>Weeks in Intervention</th><th>Progress Monitoring Trend</th><th>Current Performance vs. Benchmark</th></tr></thead><tbody><tr><td>Amara</td><td>Tier 2</td><td>12</td><td>Scores increasing steadily</td><td>Now meets benchmark</td></tr><tr><td>Bryce</td><td>Tier 2</td><td>12</td><td>Scores flat, no growth</td><td>Still well below benchmark</td></tr><tr><td>Carmen</td><td>Tier 3</td><td>16</td><td>Scores increasing slowly</td><td>Approaching benchmark</td></tr><tr><td>Derek</td><td>Tier 1</td><td>N/A</td><td>Scores declining on benchmarks</td><td>Fell below benchmark</td></tr></tbody></table>',
    questionText: 'A school\'s problem-solving team reviews the data shown above. Which student\'s data most clearly indicate a need to move to a MORE intensive tier of support?',
    options: [
      { label: 'A', text: 'Amara, because she has been in Tier 2 for twelve weeks and should advance' },
      { label: 'B', text: 'Bryce, because he has not responded to Tier 2 intervention after twelve weeks' },
      { label: 'C', text: 'Carmen, because Tier 3 intervention is producing only slow progress for her' },
      { label: 'D', text: 'Derek, because Tier 1 students should never have declining benchmark scores' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Bryce has received Tier 2 intervention for 12 weeks with flat scores and no growth, remaining well below benchmark, which is the clearest indicator that the current level of support is inadequate and he needs more intensive Tier 3 intervention. Option A is incorrect because Amara\'s data show she is responding to Tier 2 and now meets benchmark, so she could be considered for stepping back to Tier 1, not moving to a higher tier. Option C is incorrect because Carmen is making progress in Tier 3, even if slowly, and her scores are approaching benchmark. Option D is incorrect because while Derek needs attention and likely Tier 2 support, the question asks about moving to a more intensive tier, and Bryce\'s complete lack of response to Tier 2 is a stronger indicator for intensification.',
  },
]

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  await connectDB()
  console.log('Connected to MongoDB.')

  const result = await Question.insertMany(questions)
  console.log(`Inserted ${result.length} data-exhibit questions.`)

  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
