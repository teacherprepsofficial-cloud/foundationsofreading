/**
 * Seed Script — 35 Complex Scenario-Based Questions (NES 190)
 * Pearson-style multi-step scenarios with rich classroom context
 * Run: CONFIRM_INSERT=true npx tsx scripts/seed-complex-scenario-questions.ts
 *
 * This script ONLY inserts. No deletions, no updates to existing data.
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

if (process.env.CONFIRM_INSERT !== 'true') {
  console.log('This script will INSERT 35 new complex scenario questions.')
  console.log('No existing data will be modified or deleted.')
  console.log('To proceed: CONFIRM_INSERT=true npx tsx scripts/seed-complex-scenario-questions.ts')
  process.exit(0)
}

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

const questions = [
  // ═══════════════════════════════════════════════════════════════════════════
  // TYPE 1: "What should the teacher do NEXT?" (Q1-Q10)
  // ═══════════════════════════════════════════════════════════════════════════

  // Q1 — Subarea I, Obj 1: Phonemic awareness progression (after isolation)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher has been working with a small group of students on phoneme isolation activities. During the most recent session, the teacher says a word aloud and asks each student to identify the beginning sound. All five students in the group consistently and accurately identify the initial phoneme in CVC words such as "map," "sit," and "log." The teacher notes that the students respond quickly and with confidence across multiple trials. Based on the students\' demonstrated mastery of initial phoneme isolation, which instructional activity should the teacher introduce NEXT to continue building their phonemic awareness?',
    options: [
      { label: 'A', text: 'Asking students to blend individually spoken phonemes such as /k/ /a/ /t/ into whole words, progressing from two-phoneme to three-phoneme combinations' },
      { label: 'B', text: 'Having students segment whole CVC words into their individual phonemes by pushing a counter forward for each sound they hear in the word' },
      { label: 'C', text: 'Teaching students to identify and produce rhyming words by generating word families from common rimes such as -at, -ig, and -op' },
      { label: 'D', text: 'Introducing students to syllable clapping activities in which they count the number of syllable beats in multisyllabic words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. After students master phoneme isolation, the developmental progression of phonemic awareness moves toward phoneme segmentation, where students break whole words into their individual sounds. Pushing counters for each phoneme is a concrete segmentation activity that builds directly on isolation skill. Option A is incorrect because phoneme blending, while an important skill, is typically developed alongside or before segmentation in some models, but the question describes mastery of isolation, and segmentation is the natural next step that deepens analytical ability with individual phonemes. Option C is incorrect because rhyme production is a lower-level phonological awareness skill that students would have mastered before phoneme isolation. Option D is incorrect because syllable clapping is also a less advanced phonological awareness skill that precedes phoneme-level work.',
  },

  // Q2 — Subarea I, Obj 1: Phonemic awareness progression (after blending)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher conducts daily phonemic awareness warm-ups with a group of six students. The current activity involves the teacher saying individual phonemes slowly, such as /sh/ /i/ /p/, and students blending those phonemes together to say the whole word. After two weeks of practice, all six students can accurately blend three- and four-phoneme words with both continuous and stop consonants. The teacher is ready to increase the complexity of the phonemic awareness instruction. Which activity should the teacher implement NEXT to advance these students\' phonemic awareness skills?',
    options: [
      { label: 'A', text: 'Having students practice identifying whether two spoken words rhyme by giving a thumbs-up or thumbs-down signal after hearing each pair' },
      { label: 'B', text: 'Asking students to delete a specified phoneme from a spoken word and say the remaining word, such as removing /s/ from "stop" to say "top"' },
      { label: 'C', text: 'Providing students with picture cards and asking them to sort the pictures by their beginning sounds into labeled columns' },
      { label: 'D', text: 'Having students clap the number of syllables in compound words and then separate the compound into its two component words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phoneme deletion is the most advanced phonemic awareness skill in the developmental continuum and represents the appropriate next step after students have mastered blending. Deletion requires students to hold a word in memory, mentally remove a sound, and articulate the remaining sounds. Option A is incorrect because rhyme identification is one of the earliest phonological awareness skills and would be far below the level of students who have already mastered phoneme blending. Option C is incorrect because sorting by initial sounds is a phoneme isolation activity, which is developmentally simpler than blending and would not advance these students. Option D is incorrect because syllable segmentation of compound words is a phonological awareness task at the syllable level, which is less complex than phoneme-level manipulation.',
  },

  // Q3 — Subarea I, Obj 1: Phonemic awareness progression (after segmentation)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher uses a Say It and Move It activity with a small group of struggling readers. In the activity, the teacher says a CVC word slowly, the students repeat the word, and then each student pushes a plain wooden block forward for every phoneme they hear. Over the past three weeks, all students in the group have progressed from segmenting two-phoneme words to accurately and consistently segmenting three-phoneme CVC words such as "net," "hop," and "big." The teacher wants to continue building their phonemic awareness within the segmentation strand. Which modification to the activity should the teacher make NEXT?',
    options: [
      { label: 'A', text: 'Replacing the plain blocks with letter tiles so students can match each phoneme they segment to its corresponding grapheme' },
      { label: 'B', text: 'Extending the activity to four-phoneme words containing initial or final consonant blends, such as "stop," "lamp," and "frog"' },
      { label: 'C', text: 'Switching from blocks to finger tapping, where students tap a finger on the desk for each syllable they hear in two-syllable words' },
      { label: 'D', text: 'Removing the manipulatives entirely and asking students to verbally segment the words without any physical support' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Once students can segment three-phoneme CVC words, the logical progression within phoneme segmentation is to increase word complexity by introducing words with consonant blends, which contain four phonemes. This maintains the same skill (segmentation) while raising the level of difficulty. Option A is incorrect because while connecting phonemes to graphemes is a valuable instructional bridge, it shifts the focus from phonemic awareness to phonics, which is a different instructional objective. Option C is incorrect because finger tapping syllables is a regression to syllable-level awareness, which is below the phoneme-level work students have already mastered. Option D is incorrect because removing manipulatives too quickly may undermine the concrete support students still need; scaffolded removal should happen gradually, not as the primary means of increasing complexity.',
  },

  // Q4 — Subarea I, Obj 2: Phonics progression (after CVC mastery)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher has been providing explicit, systematic phonics instruction to a small group of students. Through regular formative assessments, the teacher has confirmed that all students in the group can accurately decode CVC words with short vowels across all five vowel sounds. The students can read words like "pen," "mug," "sit," "cot," and "bag" both in isolation and in decodable text passages. The teacher reviews her scope and sequence to determine what phonics pattern the students are ready to learn next. Which phonics pattern should the teacher introduce NEXT in the instructional sequence?',
    options: [
      { label: 'A', text: 'Words containing vowel teams such as "rain," "feet," and "boat" that represent long vowel sounds with two-letter vowel combinations' },
      { label: 'B', text: 'Words with consonant digraphs such as "ship," "chat," and "thin" that contain two consonants representing a single sound' },
      { label: 'C', text: 'Multisyllabic words with prefixes and suffixes such as "unkind," "reread," and "jumping" that require morphemic analysis' },
      { label: 'D', text: 'Words with r-controlled vowels such as "car," "her," and "bird" that change the expected vowel sound due to the following r' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. In a systematic phonics scope and sequence, consonant digraphs are typically introduced after students master basic CVC patterns with short vowels. Digraphs expand students\' consonant knowledge while keeping the overall word structure simple (e.g., "ship" still follows a short-vowel pattern). Option A is incorrect because vowel teams represent a more advanced phonics pattern that is typically introduced after students have learned consonant blends, digraphs, and silent-e patterns. Option C is incorrect because multisyllabic words with affixes require students to have mastered single-syllable decoding patterns first, making this far too advanced for this point in the sequence. Option D is incorrect because r-controlled vowels, while sometimes introduced relatively early, typically follow consonant digraphs and blends in most systematic scope-and-sequence programs.',
  },

  // Q5 — Subarea I, Obj 2: Phonics progression (after digraphs)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading interventionist is working with a small group of second-grade students who are receiving Tier 2 phonics support. Assessment data shows that the students can accurately decode words with short vowels, consonant blends, and consonant digraphs. They can read words such as "splash," "throb," and "shrimp" with accuracy. However, when the students encounter words with a final silent e, such as "made," "time," and "hope," they consistently read the vowel as short and do not recognize the vowel-consonant-e pattern. Based on these assessment results, what should the interventionist do NEXT?',
    options: [
      { label: 'A', text: 'Provide explicit instruction in the silent-e pattern, teaching students that a final e typically signals a long vowel sound in the preceding syllable' },
      { label: 'B', text: 'Introduce vowel team patterns such as ai, ea, and oa so students learn multiple ways that long vowel sounds can be spelled' },
      { label: 'C', text: 'Return to short vowel CVC instruction to ensure students have a stronger foundation before moving to any long vowel patterns' },
      { label: 'D', text: 'Begin instruction in multisyllabic word reading strategies so students learn to break longer words into smaller decodable chunks' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The assessment data indicates that these students have mastered consonant blends and digraphs but have not yet learned the silent-e (CVCe) pattern. In a systematic phonics sequence, the CVCe pattern is the first long vowel pattern taught and directly addresses the identified gap. Option B is incorrect because vowel teams are a more advanced long vowel pattern that comes after CVCe in the phonics sequence; students should not skip the CVCe pattern. Option C is incorrect because the students have already demonstrated mastery of short vowel CVC words; returning to this level would waste instructional time and not address their actual need. Option D is incorrect because multisyllabic word strategies are far beyond the current instructional need, and students must first master single-syllable long vowel patterns.',
  },

  // Q6 — Subarea I, Obj 4: Fluency (accurate but no prosody)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher conducts a fluency assessment with a student by having her read a grade-level passage aloud for one minute. The teacher records the student\'s performance and notes the following observations: The student reads 85 words correct per minute, which is at the benchmark level for mid-second grade. The student makes very few decoding errors, self-correcting most miscues. However, the student reads in a flat, monotone voice with no variation in pitch or stress, ignores punctuation cues, and pauses at inappropriate points within sentences rather than at phrase boundaries. Based on this fluency profile, which instructional focus should the teacher prioritize NEXT?',
    options: [
      { label: 'A', text: 'Repeated reading of the same passage multiple times with the goal of increasing the student\'s words-correct-per-minute rate by 10 to 15 words' },
      { label: 'B', text: 'Modeled fluent reading followed by echo reading activities that emphasize expression, phrasing, and attending to punctuation marks' },
      { label: 'C', text: 'Instruction in advanced decoding strategies for multisyllabic words to ensure the student can read more challenging texts with accuracy' },
      { label: 'D', text: 'Independent silent reading practice with self-selected texts at the student\'s independent level to build overall reading stamina' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student\'s fluency profile shows adequate accuracy and rate but poor prosody, which includes expression, phrasing, and attention to punctuation. Echo reading, where the teacher models fluent reading and the student immediately imitates the phrasing and expression, directly targets prosodic reading. Option A is incorrect because the student\'s rate is already at benchmark; focusing on increasing words per minute would not address the prosody deficit. Option C is incorrect because the student\'s accuracy is strong and she self-corrects errors, so advanced decoding instruction does not address the identified need. Option D is incorrect because independent silent reading does not provide the explicit modeling and practice of prosodic features that this student needs.',
  },

  // Q7 — Subarea I, Obj 4: Fluency (word-by-word reading)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher listens to a student read aloud from a chapter book during a one-on-one conference. The teacher observes that the student reads each word individually with equal stress and pauses briefly between every word, producing a choppy, word-by-word reading pattern. The student\'s accuracy is high at 97 percent, and she can answer basic comprehension questions about the passage. However, her reading rate of 62 words correct per minute is significantly below the third-grade benchmark, and her phrasing makes it difficult for a listener to follow the meaning. The teacher decides to implement paired reading with a fluent partner. Which set of procedures for the paired reading activity would be most effective for addressing this student\'s needs?',
    options: [
      { label: 'A', text: 'The fluent partner reads a sentence aloud with appropriate phrasing and expression, then the student rereads the same sentence, attempting to match the partner\'s pace and intonation' },
      { label: 'B', text: 'Both students read silently at the same time, and when they finish each page, they take turns summarizing what they read to check each other\'s comprehension' },
      { label: 'C', text: 'The student reads the entire passage aloud while the partner follows along silently, stopping only to provide the correct word when the student makes a decoding error' },
      { label: 'D', text: 'The partner reads the full passage aloud first while the student listens, and then the student answers comprehension questions without rereading the text' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Paired reading in which a fluent model reads first and the struggling reader immediately echoes the same text directly addresses word-by-word reading by providing a prosodic model the student can imitate. This builds phrasing and rate through supported oral rereading. Option B is incorrect because silent reading with comprehension checks does not provide the oral fluency modeling and practice this student needs to improve phrasing and rate. Option C is incorrect because having the student read independently with error correction only addresses accuracy, which is not the student\'s weakness; it does nothing to model phrasing. Option D is incorrect because listening without rereading is a passive activity that does not give the student practice producing fluent reading.',
  },

  // Q8 — Subarea II, Obj 5: Vocabulary depth
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher has introduced a set of Tier 2 vocabulary words from an upcoming social studies unit on community government. The words include "authority," "ordinance," "ballot," "delegate," and "petition." During the initial lesson, the teacher provided student-friendly definitions for each word and had students copy the definitions into their vocabulary notebooks. In a follow-up activity, students matched each word to its definition on a worksheet and scored 90 percent or higher. The teacher wants to deepen students\' understanding of these words beyond the definitional level. Which activity should the teacher implement NEXT to develop deeper vocabulary knowledge?',
    options: [
      { label: 'A', text: 'Assigning students to write each vocabulary word five times in their notebooks and then use each word in an original sentence that demonstrates its meaning' },
      { label: 'B', text: 'Having students create semantic maps for each word that show the word\'s definition, synonyms, antonyms, examples, non-examples, and a visual representation' },
      { label: 'C', text: 'Giving students a multiple-choice quiz that presents each definition and asks students to select the matching vocabulary word from four choices' },
      { label: 'D', text: 'Providing students with a crossword puzzle in which the definitions serve as clues and the vocabulary words are filled into the grid' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Semantic mapping requires students to process vocabulary at a deep level by connecting each word to related concepts, generating examples and non-examples, and creating visual representations. This moves well beyond definitional knowledge to build rich, networked word understanding. Option A is incorrect because copying words repeatedly is a rote memorization task that does not deepen conceptual understanding; while writing sentences is somewhat more productive, it does not systematically develop the multiple dimensions of word knowledge. Option C is incorrect because a multiple-choice definition quiz assesses the same surface-level knowledge the students already demonstrated on the matching worksheet. Option D is incorrect because a crossword puzzle is essentially another matching activity that pairs definitions to words and does not require students to engage with the words at a deeper conceptual level.',
  },

  // Q9 — Subarea II, Obj 6: Comprehension beyond retelling
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher reads a picture book aloud about a boy who wants to join a neighborhood soccer team but is afraid because he has never played before. After the read-aloud, the teacher asks several students to retell the story. All students can accurately recall the main characters, the setting, and the major events in sequence, including the resolution where the boy decides to try out for the team. However, when the teacher asks, "Why do you think the boy was nervous about trying out?" the students struggle to provide answers beyond restating the plot events. The teacher wants to advance these students to a higher level of comprehension. Which instructional strategy should the teacher use NEXT?',
    options: [
      { label: 'A', text: 'Modeling a think-aloud during a rereading of key pages, demonstrating how to connect the character\'s actions to his feelings by using clues from the text and illustrations' },
      { label: 'B', text: 'Having students create a story map graphic organizer that identifies the characters, setting, problem, events, and solution from the picture book' },
      { label: 'C', text: 'Asking students to practice retelling the story to a partner using a beginning-middle-end framework to strengthen their recall of the sequence' },
      { label: 'D', text: 'Reading a different picture book on the same topic and asking students to retell that story to determine if they can transfer their retelling skills' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Think-alouds during rereading explicitly model the inferential thinking process the students need, showing them how to combine text evidence with background knowledge to understand character motivation. This scaffolds the transition from literal to inferential comprehension. Option B is incorrect because a story map graphic organizer reinforces literal comprehension skills such as identifying story elements, which these students have already demonstrated through their accurate retelling. Option C is incorrect because retelling practice would further develop a skill the students have already mastered rather than pushing them toward the inferential level they need. Option D is incorrect because reading a new book for retelling practice does not address the identified gap in inferential thinking.',
  },

  // Q10 — Subarea III, Obj 8: Assessment sequence
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'At the beginning of the school year, a first-grade teacher administers a universal screening assessment in reading to all 24 students in her class. The screening results identify six students who score below the benchmark in early literacy skills. According to the school\'s multi-tiered system of supports (MTSS) framework, these six students are flagged as at risk for reading difficulties and will need additional support beyond the core reading instruction. Before the teacher designs targeted intervention groups, she needs to gather more specific information about each student\'s reading strengths and weaknesses. Which type of assessment should the teacher administer NEXT to these six students?',
    options: [
      { label: 'A', text: 'A norm-referenced standardized reading achievement test that compares each student\'s overall reading performance to a national sample of same-age peers' },
      { label: 'B', text: 'A diagnostic assessment that measures specific component skills such as letter-sound knowledge, phonemic awareness, and sight word recognition to identify precise areas of need' },
      { label: 'C', text: 'A summative end-of-unit assessment aligned to grade-level reading standards to determine whether the students have mastered the first unit\'s objectives' },
      { label: 'D', text: 'A portfolio-based assessment in which the teacher collects writing samples and reading logs over several weeks to observe patterns in the students\' literacy development' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. After a universal screening identifies at-risk students, the next step in the MTSS assessment process is diagnostic assessment, which pinpoints the specific skill deficits that intervention must address. Diagnostic tools break reading into component skills so the teacher can form targeted groups. Option A is incorrect because a norm-referenced achievement test provides a broad comparison to peers but does not identify the specific component-skill deficits needed to plan targeted intervention. Option C is incorrect because a summative unit assessment evaluates mastery of taught content and does not provide the diagnostic information needed before intervention begins. Option D is incorrect because portfolio-based assessment gathers information over time and would delay the identification of specific needs; the urgency of intervention planning requires immediate diagnostic data.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPE 2: "Which set of words" / linguistic precision (Q11-Q20)
  // ═══════════════════════════════════════════════════════════════════════════

  // Q11 — Vowel team: ai
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher is planning a word sort lesson to help students recognize a common vowel team pattern. The teacher wants to select a set of words in which every word contains the same vowel team spelling and each word uses that vowel team to represent the same long vowel sound. The teacher will display the words on a pocket chart and guide students to identify the shared spelling pattern. Which of the following sets of words would be most appropriate for this lesson?',
    options: [
      { label: 'A', text: 'rain, paid, tail, wait' },
      { label: 'B', text: 'said, rain, plaid, bait' },
      { label: 'C', text: 'rain, read, meat, bean' },
      { label: 'D', text: 'late, cake, made, tape' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words (rain, paid, tail, wait) contain the vowel team "ai" and in each word that vowel team represents the long a sound, making this set ideal for introducing the ai vowel team pattern. Option B is incorrect because "said" and "plaid" contain the letters a-i but represent a short e sound rather than a long a, which would confuse students about the pattern. Option C is incorrect because these words contain different vowel teams (ai in rain, ea in read/meat/bean), so they do not share the same vowel team spelling. Option D is incorrect because these words use the silent-e pattern (CVCe) rather than a vowel team to produce the long a sound.',
  },

  // Q12 — Vowel team: oa
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher is preparing a focused phonics lesson on vowel teams. She wants to create a word list in which every word contains the same vowel team and that vowel team consistently represents the long o sound. The teacher will use this word list for a guided reading activity in which students practice reading the pattern in connected text. Which of the following sets of words should the teacher select for this lesson?',
    options: [
      { label: 'A', text: 'boat, goat, road, soap' },
      { label: 'B', text: 'boat, boot, food, moon' },
      { label: 'C', text: 'boat, bone, show, crow' },
      { label: 'D', text: 'broad, road, boat, coat' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words (boat, goat, road, soap) contain the vowel team "oa," and in each case the oa represents the long o sound. This creates a consistent pattern for instruction. Option B is incorrect because while "boat" contains oa, the words "boot," "food," and "moon" contain the vowel team oo, which represents a different sound. Option C is incorrect because "bone" uses a silent-e pattern and "show" and "crow" use the ow spelling, so the set contains three different spelling patterns for the long o sound rather than one consistent vowel team. Option D is incorrect because "broad" is an exception word in which oa represents a short o or aw sound rather than the expected long o, which would undermine the consistency of the lesson.',
  },

  // Q13 — Consonant-le syllable type
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher is introducing students to the consonant-le syllable type as part of the school\'s systematic phonics program. The teacher wants to present a set of multisyllabic words in which the final syllable follows the consonant-le pattern, where a consonant is followed by the letters l-e and the e is silent. The teacher plans to have students underline the consonant-le syllable in each word and practice reading the words by dividing them into syllables. Which of the following sets of words contains only words with a final consonant-le syllable?',
    options: [
      { label: 'A', text: 'table, candle, simple, purple' },
      { label: 'B', text: 'table, whale, gentle, smile' },
      { label: 'C', text: 'ankle, people, single, couple' },
      { label: 'D', text: 'little, bottle, middle, puddle' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words (table, candle, simple, purple) end in a consonant-le final syllable: ta-ble, can-dle, sim-ple, pur-ple. Each word clearly demonstrates the pattern where a consonant precedes -le. Option B is incorrect because "whale" and "smile" are single-syllable words with a silent e that do not contain a consonant-le syllable; they follow the CVCe pattern. Option C is incorrect because "people" is an irregular spelling in which the -ple does not follow the standard consonant-le pronunciation pattern, and "couple" similarly has an irregular vowel in the first syllable that could confuse students learning the pattern. Option D, while containing valid consonant-le words, exclusively features words with doubled consonants before -le, which would not give students practice recognizing the pattern in varied consonant contexts the way Option A does.',
  },

  // Q14 — R-controlled syllable type
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading specialist is designing a lesson to teach students about r-controlled vowels. In r-controlled syllables, the vowel sound is modified by the r that follows it, producing a sound that is neither a pure short vowel nor a pure long vowel. The specialist wants to select a set of single-syllable words in which the vowel in every word is r-controlled. Which of the following sets of words should the specialist use for this lesson?',
    options: [
      { label: 'A', text: 'cart, fern, bird, torn' },
      { label: 'B', text: 'cart, crate, corn, crane' },
      { label: 'C', text: 'far, for, from, frog' },
      { label: 'D', text: 'stir, star, store, stone' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words (cart, fern, bird, torn) contain r-controlled vowels: ar in cart, er in fern, ir in bird, and or in torn. Each vowel sound is modified by the following r. Option B is incorrect because "crate" and "crane" contain a long a sound with the silent-e pattern; the r in these words is part of a consonant blend, not an r-controlled vowel. Option C is incorrect because "from" and "frog" contain short o sounds followed by consonants other than r in the coda position; the r in these words is part of an initial blend (fr-), not an r-controlled vowel. Option D is incorrect because "stone" contains a long o produced by the silent-e pattern, not an r-controlled vowel.',
  },

  // Q15 — Inflectional morphology
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher is planning a lesson on inflectional suffixes as part of the school\'s morphology curriculum. Inflectional suffixes change a word\'s grammatical function, such as tense, number, or comparison, without changing the word\'s part of speech or core meaning. The teacher wants to present students with a set of words in which every word demonstrates an inflectional suffix. Which of the following sets of words contains only words with inflectional suffixes?',
    options: [
      { label: 'A', text: 'jumped, running, tallest, boxes' },
      { label: 'B', text: 'jumped, teacher, running, colorful' },
      { label: 'C', text: 'happily, darkness, rewrite, tallest' },
      { label: 'D', text: 'teacher, darkness, colorful, rewrite' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words contain inflectional suffixes: -ed in jumped (past tense), -ing in running (progressive aspect), -est in tallest (superlative comparison), and -es in boxes (plural number). None of these suffixes change the base word\'s part of speech. Option B is incorrect because "teacher" contains the derivational suffix -er (which changes the verb "teach" to a noun) and "colorful" contains the derivational suffix -ful (which changes the noun "color" to an adjective). Option C is incorrect because "happily" (-ly, derivational), "darkness" (-ness, derivational), and "rewrite" (re-, derivational prefix) all change the part of speech or add meaning beyond grammatical function. Option D is incorrect because all four words contain derivational affixes that change the base word\'s part of speech.',
  },

  // Q16 — Derivational morphology
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher wants to introduce students to derivational suffixes to help them understand how adding a suffix can change a word\'s part of speech. The teacher plans to show students pairs of words where the base word is one part of speech and the derived word is a different part of speech. To begin the lesson, the teacher needs a set of words in which every word contains a derivational suffix that has changed the base word\'s part of speech. Which of the following sets of words contains only words with derivational suffixes?',
    options: [
      { label: 'A', text: 'singer, joyful, kindness, quietly' },
      { label: 'B', text: 'singer, jumping, walked, biggest' },
      { label: 'C', text: 'joyful, kindness, boxes, churches' },
      { label: 'D', text: 'jumped, walking, taller, foxes' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. All four words contain derivational suffixes: -er in singer changes the verb "sing" to a noun, -ful in joyful changes the noun "joy" to an adjective, -ness in kindness changes the adjective "kind" to a noun, and -ly in quietly changes the adjective "quiet" to an adverb. Option B is incorrect because "jumping" (-ing, inflectional), "walked" (-ed, inflectional), and "biggest" (-est, inflectional) contain inflectional suffixes that do not change part of speech. Option C is incorrect because "boxes" (-es, plural) and "churches" (-es, plural) contain inflectional suffixes. Option D is incorrect because all four words (jumped, walking, taller, foxes) contain inflectional suffixes.',
  },

  // Q17 — Minimal pairs (initial phoneme)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher is working with English learners on phonemic discrimination. The teacher plans to use minimal pairs, which are two words that differ by only one phoneme, to help students hear the distinction between sounds that may not contrast in their home language. The teacher will say each word pair aloud and ask students to indicate whether the two words are the same or different. Which of the following sets contains only pairs of words that are true minimal pairs, differing by exactly one phoneme?',
    options: [
      { label: 'A', text: 'bat/pat, sip/zip, fan/van, ten/den' },
      { label: 'B', text: 'bat/bad, ship/shop, fan/fun, ten/tin' },
      { label: 'C', text: 'bat/bet, cat/cast, fan/fang, sit/set' },
      { label: 'D', text: 'bat/bats, fan/fans, sit/sits, ten/tens' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Each pair differs by exactly one phoneme in the initial position: bat/pat differ in the initial consonant (/b/ vs /p/), sip/zip differ in the initial consonant (/s/ vs /z/), fan/van differ in the initial consonant (/f/ vs /v/), and ten/den differ in the initial consonant (/t/ vs /d/). These are true minimal pairs. Option B is incorrect because while some pairs differ by one phoneme, they differ in various positions (final in bat/bad, medial in ship/shop, medial in fan/fun, medial in ten/tin), which makes the set inconsistent as a focused lesson, though the pairs themselves are technically minimal pairs; however, "ship/shop" differs in the medial vowel and "fan/fun" in the medial vowel, making the contrast less clear for initial phoneme discrimination practice. Option C is incorrect because "cat/cast" differs by the addition of a phoneme (/s/), not a substitution, making it not a minimal pair. Option D is incorrect because each pair differs by the addition of the /s/ phoneme, making them word/inflected-form pairs rather than minimal pairs differing by substitution.',
  },

  // Q18 — Minimal pairs (medial vowel)
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher wants to help students develop stronger phonemic awareness of medial vowel sounds. The teacher plans to use pairs of CVC words that differ only in the medial vowel phoneme so students can practice listening for and identifying the vowel sound in the middle of each word. The teacher will say each pair aloud and ask students to identify which sound changed. Which of the following sets contains only word pairs that differ by exactly one medial vowel phoneme?',
    options: [
      { label: 'A', text: 'hat/hot, big/bag, cup/cap, pet/pit' },
      { label: 'B', text: 'hat/hate, bit/bite, cup/cube, pet/Pete' },
      { label: 'C', text: 'hat/has, big/bid, cup/cub, pet/peg' },
      { label: 'D', text: 'hat/chat, big/pig, cup/pup, pet/net' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Each pair shares the same initial and final consonant phonemes and differs only in the medial vowel: hat/hot (/ae/ vs /o/), big/bag (/i/ vs /ae/), cup/cap (/u/ vs /ae/), and pet/pit (/e/ vs /i/). These are true minimal pairs targeting the medial vowel. Option B is incorrect because adding a silent e changes the word structure from CVC to CVCe, which involves a spelling change and a vowel quality shift that is more complex than a simple medial vowel substitution in CVC words. Option C is incorrect because each pair changes the final consonant rather than the medial vowel (hat/has, big/bid, cup/cub, pet/peg). Option D is incorrect because each pair changes the initial consonant rather than the medial vowel (hat/chat, big/pig, cup/pup, pet/net).',
  },

  // Q19 — Doubling rule
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher is teaching students the doubling rule for adding suffixes that begin with a vowel. The rule states that when a one-syllable word ends in a single consonant preceded by a single short vowel (CVC pattern), the final consonant is doubled before adding a vowel suffix. The teacher wants to create a word list that demonstrates this rule in action. Which of the following sets of words correctly demonstrates the doubling rule applied when adding a vowel suffix?',
    options: [
      { label: 'A', text: 'stopped, running, biggest, planned' },
      { label: 'B', text: 'jumped, reading, talking, played' },
      { label: 'C', text: 'hoping, baking, riding, making' },
      { label: 'D', text: 'raining, sleeping, needed, feeling' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Each word demonstrates the doubling rule: stop becomes stopped (p doubled), run becomes running (n doubled), big becomes biggest (g doubled), and plan becomes planned (n doubled). All base words are CVC with a short vowel, and the final consonant doubles before the vowel suffix. Option B is incorrect because none of these words require doubling: "jump" ends in two consonants (mp), "read" has a vowel team, "talk" ends in two consonants (lk), and "play" ends in a vowel sound (ay). Option C is incorrect because these words demonstrate the e-drop rule, not the doubling rule: hope, bake, ride, and make all end in silent e, which is dropped before adding -ing. Option D is incorrect because none of these base words are CVC: "rain" and "sleep" have vowel teams, "need" has a vowel team, and "feel" has a vowel team, so no doubling occurs.',
  },

  // Q20 — E-drop rule
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher is introducing the e-drop spelling rule as students begin learning to add suffixes to base words. The rule states that when a word ends in a silent e, the e is dropped before adding a suffix that begins with a vowel. The teacher wants to show students a set of words in which the e-drop rule was correctly applied when the suffix was added. Which of the following sets of words correctly demonstrates the e-drop rule?',
    options: [
      { label: 'A', text: 'baking, writing, hoping, sliding' },
      { label: 'B', text: 'running, sitting, hopping, getting' },
      { label: 'C', text: 'safely, homeless, careful, hopeless' },
      { label: 'D', text: 'playing, saying, staying, paying' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Each word demonstrates the e-drop rule: bake drops the e to become baking, write becomes writing, hope becomes hoping, and slide becomes sliding. In each case, the silent e is removed before the vowel suffix -ing. Option B is incorrect because these words demonstrate the doubling rule, not the e-drop rule: run, sit, hop, and get are CVC words where the final consonant doubles before -ing. Option C is incorrect because these words add consonant suffixes (-ly, -less, -ful) to base words, and the e-drop rule does not apply when the suffix begins with a consonant; in fact, "safely" and "hopeless" keep the silent e. Option D is incorrect because play, say, stay, and pay do not end in a silent e; they end in the vowel digraph ay, so no e-drop occurs.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPE 3: Shared Stimulus Sets (Q21-Q35, 5 sets of 3)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Set 1: Poetry booklets for fluency (Q21-Q23) ---

  // Q21
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher creates individual poetry booklets for each student in her class. Each booklet contains ten short, rhyming poems that range from four to eight lines in length. Every morning during the first ten minutes of reading time, students read through their poetry booklets with a partner. The teacher introduces one new poem each week and models reading it aloud with expression before students practice. Students keep their booklets in their desk baskets and are encouraged to reread their favorite poems during independent reading time as well. Which of the following best describes the primary advantage of using poetry booklets for daily fluency practice?',
    options: [
      { label: 'A', text: 'The rhyming patterns in poems help students learn phonics rules for vowel spellings because rhyming words often share the same rime spelling pattern' },
      { label: 'B', text: 'The short, patterned, and memorable nature of poems provides ideal text for repeated reading practice, which builds automaticity and prosody' },
      { label: 'C', text: 'Poems contain more challenging vocabulary than narrative texts, which pushes students to expand their oral language skills and word knowledge' },
      { label: 'D', text: 'The visual layout of poems with line breaks teaches students important concepts of print such as directionality and return sweep' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Poetry is particularly effective for fluency development because poems are short enough for repeated readings, their rhythmic and patterned structures naturally support prosodic reading, and their memorable language encourages students to reread voluntarily. Repeated reading of these texts builds both automaticity and expression. Option A is incorrect because while rhyming words may incidentally reinforce some spelling patterns, the primary purpose of using poetry booklets in this activity is fluency development, not phonics instruction. Option C is incorrect because poems selected for first graders are not necessarily more vocabulary-rich than other genres; furthermore, the activity is designed to build fluency, not vocabulary. Option D is incorrect because concepts of print such as directionality are typically taught in kindergarten and emergent literacy stages, not as the primary purpose of a first-grade fluency routine.',
  },

  // Q22
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher creates individual poetry booklets for each student in her class. Each booklet contains ten short, rhyming poems that range from four to eight lines in length. Every morning during the first ten minutes of reading time, students read through their poetry booklets with a partner. The teacher introduces one new poem each week and models reading it aloud with expression before students practice. Parent volunteers come into the classroom twice a week to listen to students read from their poetry booklets. The teacher wants to train the volunteers to support prosodic reading during these sessions. Which guidance should the teacher give the volunteers?',
    options: [
      { label: 'A', text: 'Listen to each student read and count the number of words they read correctly in one minute, then record the score on a tracking sheet for the teacher to review' },
      { label: 'B', text: 'Read a poem aloud first with exaggerated expression and phrasing, then have the student echo-read the same poem, providing specific praise when the student matches the phrasing' },
      { label: 'C', text: 'Ask the student comprehension questions after each poem, such as what the poem was about and what words they found interesting, to ensure they understand what they read' },
      { label: 'D', text: 'Point to each word as the student reads and immediately supply the correct pronunciation whenever the student hesitates on a word for more than two seconds' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Echo reading is an evidence-based technique for building prosody: the volunteer models expressive reading, and the student immediately imitates the phrasing, intonation, and expression. Specific praise reinforces the prosodic features the student reproduces successfully. Option A is incorrect because timing words correct per minute measures reading rate, which is only one component of fluency; this approach does not support the development of prosody. Option C is incorrect because comprehension questioning, while valuable, targets understanding rather than the prosodic reading skills that are the focus of this fluency activity. Option D is incorrect because pointing to individual words and supplying pronunciations focuses on word-level accuracy and may actually reinforce word-by-word reading rather than supporting phrased, expressive reading.',
  },

  // Q23
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher creates individual poetry booklets for each student in her class. Each booklet contains ten short, rhyming poems that range from four to eight lines in length. Every morning during the first ten minutes of reading time, students read through their poetry booklets with a partner. The teacher introduces one new poem each week and models reading it aloud with expression before students practice. After several weeks, the teacher notices that three students continue to read the poems in a halting, word-by-word manner despite daily practice. These students decode the words accurately but do not group words into meaningful phrases. Which approach should the teacher use to support these students\' fluency development?',
    options: [
      { label: 'A', text: 'Provide these students with easier poems at a lower reading level so they can experience success and build confidence with simpler text' },
      { label: 'B', text: 'Mark phrase boundaries in the students\' poetry booklets using slashes or scoops and explicitly teach them to read the words within each phrase as a group' },
      { label: 'C', text: 'Assign these students additional independent reading time with chapter books so they get more overall practice reading connected text' },
      { label: 'D', text: 'Remove these students from the partner reading activity and have them practice reading the poems silently to themselves until they feel more confident' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phrase-cued text, where the teacher marks natural phrase boundaries with slashes or scoops, is a research-supported intervention for word-by-word readers. It provides a visual scaffold that teaches students to group words into meaningful phrases rather than reading one word at a time. Option A is incorrect because the students decode accurately, suggesting the text is at an appropriate level; easier text would reduce practice with grade-level vocabulary and structures without addressing the phrasing deficit. Option C is incorrect because adding independent reading time with chapter books does not provide the explicit phrasing instruction these students need; they require targeted support, not just more volume. Option D is incorrect because removing students from partner practice eliminates the social support and oral reading practice that are essential for developing fluency, and silent reading alone does not build prosody.',
  },

  // --- Set 2: Word matrices with base words and affixes (Q24-Q26) ---

  // Q24
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher displays a word matrix on the interactive whiteboard. The matrix has the base word "teach" in the center column. The left columns contain the prefixes re- and un-. The right columns contain the suffixes -er, -es, -ing, and -able. The teacher models how to combine a prefix or suffix with the base word to generate new words, writing each word on a chart. Students then work in pairs to generate as many words as possible from the matrix, recording each word and discussing its meaning. The generated words include: teach, teacher, teaches, teaching, reteach, reteaches, unteachable. Which of the following generated words contains a derivational suffix?',
    options: [
      { label: 'A', text: 'teaches, because the suffix -es changes the word to indicate the third-person singular present tense form of the verb' },
      { label: 'B', text: 'teaching, because the suffix -ing changes the word to indicate the progressive or ongoing form of the action' },
      { label: 'C', text: 'teacher, because the suffix -er changes the verb "teach" into a noun that names the person who performs the action' },
      { label: 'D', text: 'reteaches, because the prefix re- and suffix -es together change the meaning and grammatical form of the base word' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The suffix -er in "teacher" is a derivational suffix because it changes the verb "teach" into a noun meaning "one who teaches." Derivational suffixes change a word\'s part of speech or create a new word with a different core meaning. Option A is incorrect because -es in "teaches" is an inflectional suffix that marks third-person singular present tense without changing the word\'s part of speech; "teaches" is still a verb. Option B is incorrect because -ing in "teaching" is an inflectional suffix that marks progressive aspect; the word functions as a verb form (though it can also function as a gerund, in this context the matrix generates verb forms). Option D is incorrect because while re- is a derivational prefix, -es is an inflectional suffix; the question asks specifically about a word containing a derivational suffix, and -es does not qualify.',
  },

  // Q25
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher displays a word matrix on the interactive whiteboard. The matrix has the base word "teach" in the center column. The left columns contain the prefixes re- and un-. The right columns contain the suffixes -er, -es, -ing, and -able. Students work in pairs to generate as many words as possible from the matrix, recording each word and discussing its meaning. Two students in the class have learning disabilities that affect their reading and written expression. They struggle to keep up with the pace of the activity and become frustrated when they cannot generate words as quickly as their classmates. Which adaptation would best support these students\' meaningful participation in the word matrix activity?',
    options: [
      { label: 'A', text: 'Allowing these students to skip the word matrix activity and instead complete a worksheet that requires them to match prefixes and suffixes to definitions' },
      { label: 'B', text: 'Providing these students with a partially completed word list and color-coded affix cards that they can physically manipulate and attach to the base word card' },
      { label: 'C', text: 'Pairing these students together so they can work at a slower pace without feeling pressure from more advanced peers in the classroom' },
      { label: 'D', text: 'Reducing the number of affixes on the matrix to only one prefix and one suffix so the students have fewer possible combinations to consider' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Providing manipulative affix cards and a partially completed word list scaffolds the activity by reducing the cognitive and writing demands while maintaining the same learning objective of morphemic analysis. Physical manipulation of word parts supports students with learning disabilities by making the abstract concept of word building concrete and tactile. Option A is incorrect because removing students from the activity and providing a different task isolates them from the learning experience and replaces the generative word-building task with a lower-level matching task. Option C is incorrect because pairing two struggling students together removes the support that a more capable peer could provide; mixed-ability partnerships are typically more effective. Option D is incorrect because while reducing options simplifies the task, it significantly limits the morphemic exploration and may not provide enough combinations for meaningful practice.',
  },

  // Q26
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher displays a word matrix on the interactive whiteboard. The matrix has the base word "teach" in the center column. The left columns contain the prefixes re- and un-. The right columns contain the suffixes -er, -es, -ing, and -able. The teacher models how to combine a prefix or suffix with the base word to generate new words. Students then work in pairs to generate words from the matrix and discuss the meaning of each word they create. After the activity, the teacher leads a whole-class discussion about how the prefixes and suffixes changed the meaning of the base word. Which morphemic awareness concept does this word matrix activity primarily develop?',
    options: [
      { label: 'A', text: 'The ability to recognize that words can be broken into smaller meaningful units and that adding affixes to a base word systematically changes the word\'s meaning or grammatical function' },
      { label: 'B', text: 'The ability to decode multisyllabic words by dividing them at syllable boundaries and applying vowel pattern rules to each syllable independently' },
      { label: 'C', text: 'The ability to identify root words from Latin and Greek origins and use knowledge of those roots to determine the meaning of unfamiliar academic vocabulary' },
      { label: 'D', text: 'The ability to use context clues from surrounding sentences to determine the meaning of an unknown word encountered during independent reading' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The word matrix activity directly develops students\' understanding that words are composed of meaningful parts (morphemes) and that systematically adding prefixes and suffixes to a base word changes its meaning or grammatical role. This is the core concept of morphemic awareness. Option B is incorrect because syllable division and vowel pattern application are phonics and decoding skills, not morphemic awareness skills; the activity focuses on meaning units, not syllable structure. Option C is incorrect because while Latin and Greek roots are part of morphology, this activity focuses on English base words with common affixes, not classical roots. Option D is incorrect because context clue usage is a vocabulary strategy for reading comprehension, not the morphemic analysis skill being developed in this activity.',
  },

  // --- Set 3: Developmental spelling inventory (Q27-Q29) ---

  // Q27
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher administers a developmental spelling inventory to her students at the beginning of the year and again at midyear. One student\'s responses at the two time points are shown below.\n\nBeginning of year: "ship" spelled as SIP, "train" spelled as TRAN, "drive" spelled as DRIV, "chop" spelled as HOP, "float" spelled as FLOT.\n\nMidyear: "ship" spelled as SHIP, "train" spelled as TRANE, "drive" spelled as DRIVE, "chop" spelled as CHOP, "float" spelled as FLOTE.\n\nBased on a comparison of the two administrations, which phonics skill has the student made the most progress in developing between the beginning and the middle of the year?',
    options: [
      { label: 'A', text: 'Using vowel teams to represent long vowel sounds in single-syllable words such as the ai in "train" and the oa in "float"' },
      { label: 'B', text: 'Representing consonant digraphs with the correct two-letter spelling, as seen in the shift from SIP and HOP to SHIP and CHOP' },
      { label: 'C', text: 'Applying the silent-e pattern to mark long vowels, as shown by adding a final e to words like "drive" and "float"' },
      { label: 'D', text: 'Segmenting and representing initial consonant blends in words such as "train," "drive," and "float"' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The most notable progress between the two administrations is in consonant digraphs: at the beginning of the year, the student wrote SIP for "ship" (missing the sh digraph) and HOP for "chop" (missing the ch digraph), but at midyear the student correctly spelled both digraphs (SHIP and CHOP). This represents clear growth in representing digraphs. Option A is incorrect because the midyear spellings still do not use vowel teams correctly; TRANE and FLOTE use a silent-e strategy rather than the correct vowel team spellings (ai and oa). Option C is incorrect because while the student does add final e\'s at midyear, the silent-e pattern is applied inconsistently and sometimes incorrectly (FLOTE for "float"), so this represents emerging but not fully developed skill. Option D is incorrect because the student represented initial blends in both administrations (TRAN, DRIV, FLOT at beginning of year; the blends were already present), so this is not an area of notable progress.',
  },

  // Q28
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher administers a developmental spelling inventory to her students at the beginning of the year and again at midyear. One student\'s midyear responses are as follows: "ship" spelled as SHIP, "train" spelled as TRANE, "drive" spelled as DRIVE, "chop" spelled as CHOP, "float" spelled as FLOTE, "bright" spelled as BRITE, "spoil" spelled as SPOYL, "crawl" spelled as CROL. The teacher notices a consistent pattern in the student\'s errors at midyear. Based on these midyear spelling results, which phonics skill should the teacher target NEXT in instruction for this student?',
    options: [
      { label: 'A', text: 'Short vowel sounds in CVC words, because the student continues to confuse short and long vowel representations throughout the inventory' },
      { label: 'B', text: 'Vowel team spellings, because the student consistently uses a silent-e or single-letter strategy where a two-letter vowel team is required' },
      { label: 'C', text: 'Consonant blends in initial position, because the student omits consonant sounds at the beginning of words with complex onsets' },
      { label: 'D', text: 'Consonant digraphs in final position, because the student drops the second letter in ending digraph patterns' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student\'s midyear errors reveal a consistent pattern: where vowel teams are needed, the student substitutes a silent-e strategy (TRANE for "train," FLOTE for "float," BRITE for "bright") or a single-letter strategy (SPOYL for "spoil," CROL for "crawl"). The student understands long vowel sounds exist but has not yet learned the correct vowel team spellings. Option A is incorrect because the student\'s errors do not involve short vowel confusion; the student is attempting to represent long vowels and diphthongs, just with incorrect spelling patterns. Option C is incorrect because the student correctly represents initial blends in multiple words (DRIVE, BRITE, SPOYL, CROL). Option D is incorrect because the student correctly spells final consonant patterns and the errors are in vowel representation, not consonant digraphs.',
  },

  // Q29
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher administers a developmental spelling inventory to all 22 students in her class at midyear. After scoring the inventories, the teacher analyzes the results and identifies three groups: eight students who are accurately spelling words with vowel teams and long vowel patterns, nine students who have mastered short vowels and consonant blends but are using incorrect strategies for long vowel spellings, and five students who are still making errors on short vowel sounds and basic consonant blends. The teacher wants to use this data to differentiate her word study instruction. Which approach represents the most effective use of the developmental spelling inventory data for grouping students?',
    options: [
      { label: 'A', text: 'Forming three flexible groups based on the students\' developmental spelling stages and providing each group with word sorts and activities targeted at their specific instructional level' },
      { label: 'B', text: 'Placing all students in one large group and teaching vowel team patterns, since this is the skill the majority of students need to develop' },
      { label: 'C', text: 'Assigning each student an individualized spelling list based on the specific words they misspelled on the inventory and having them study their personal lists independently' },
      { label: 'D', text: 'Using the data to assign letter grades for the midyear report card and sharing the results with parents so they can practice spelling at home' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Developmental spelling inventories are designed to identify each student\'s stage of spelling development, which directly informs differentiated word study groups. Forming flexible groups based on developmental stage allows the teacher to target each group\'s zone of proximal development with appropriate word sorts and activities. Option B is incorrect because teaching one skill to the whole class ignores the significant differences in developmental levels; the five students still working on short vowels would not be ready for vowel teams, and the eight advanced students would not be challenged. Option C is incorrect because studying individual misspelled words is a memorization approach that does not address the underlying developmental spelling patterns; effective word study instruction targets the feature, not isolated words. Option D is incorrect because developmental spelling inventories are formative assessment tools designed to guide instruction, not summative tools for assigning grades.',
  },

  // --- Set 4: Fifth-grade strong decoding, weak comprehension (Q30-Q32) ---

  // Q30
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading specialist reviews the assessment profile of a fifth-grade student referred for reading difficulties. The student\'s scores show the following pattern: word identification is at the 75th percentile, phonemic decoding is at the 70th percentile, oral reading fluency rate is at the 60th percentile, but reading comprehension is at the 25th percentile. The classroom teacher reports that the student can read grade-level text aloud with reasonable accuracy and speed but struggles to answer questions about what he has read, particularly when questions require going beyond the literal information in the text. Before designing an intervention plan, which area should the reading specialist assess FIRST?',
    options: [
      { label: 'A', text: 'The student\'s phonological processing skills, including phonemic awareness and rapid automatized naming, to rule out an underlying processing deficit' },
      { label: 'B', text: 'The student\'s oral language comprehension, including listening comprehension and vocabulary depth, to determine whether the comprehension weakness is specific to reading or extends to oral language' },
      { label: 'C', text: 'The student\'s visual processing and tracking skills to determine whether the student is skipping lines or losing his place while reading text passages' },
      { label: 'D', text: 'The student\'s motivation and interest in reading by administering a reading attitude survey and conducting an interview about his reading preferences' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. When a student shows strong decoding but weak comprehension, the Simple View of Reading (Reading Comprehension = Decoding x Language Comprehension) indicates that language comprehension is the likely area of deficit. Assessing oral language comprehension first determines whether the student has a general language comprehension weakness or one specific to reading, which is essential for intervention planning. Option A is incorrect because the student\'s strong word identification and decoding scores indicate that phonological processing is intact; further assessment of phonological skills would not explain the comprehension gap. Option C is incorrect because the student reads with reasonable accuracy and rate, which rules out significant visual tracking issues as the primary cause of comprehension difficulties. Option D is incorrect because while motivation is relevant, it should not be assessed before language comprehension when the assessment profile clearly points to a language-based deficit.',
  },

  // Q31
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading specialist reviews the assessment profile of a fifth-grade student referred for reading difficulties. The student\'s scores show strong word identification (75th percentile) and phonemic decoding (70th percentile) but weak reading comprehension (25th percentile). Follow-up assessment reveals that the student\'s listening comprehension is at the 55th percentile, suggesting adequate oral language skills. The student\'s vocabulary knowledge is at the 45th percentile. When the specialist asks the student to read a grade-level passage and retell it, the student provides a detailed retelling of explicit events and facts. However, when asked inferential questions such as why a character made a particular decision, the student gives responses that restate text information without drawing conclusions. Based on this profile, which type of comprehension is most likely the student\'s primary area of weakness?',
    options: [
      { label: 'A', text: 'Literal comprehension, because the student cannot identify or recall the main facts and details that are explicitly stated in the text' },
      { label: 'B', text: 'Inferential comprehension, because the student struggles to integrate text information with background knowledge to draw conclusions that go beyond what is explicitly stated' },
      { label: 'C', text: 'Phonemic comprehension, because the student has difficulty processing the individual sounds in words quickly enough to maintain comprehension during reading' },
      { label: 'D', text: 'Syntactic comprehension, because the student cannot parse the grammatical structures of complex sentences in grade-level academic text' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The profile clearly indicates an inferential comprehension deficit: the student provides detailed literal retellings but cannot draw conclusions or make inferences when asked questions that require going beyond the explicit text. This pattern of strong literal recall with weak inferential thinking is the hallmark of an inferential comprehension weakness. Option A is incorrect because the student demonstrates strong literal comprehension through his detailed retelling of explicit events and facts. Option C is incorrect because "phonemic comprehension" is not a recognized category of reading comprehension; furthermore, the student\'s strong decoding scores rule out phoneme-level processing issues. Option D is incorrect because while syntactic difficulties can affect comprehension, the evidence points specifically to inferential reasoning as the weakness, not sentence-level parsing.',
  },

  // Q32
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading specialist reviews the assessment profile of a fifth-grade student with strong decoding (75th percentile) but weak reading comprehension (25th percentile). Further assessment confirms that the student has adequate oral language skills and can retell text events accurately, but he struggles with inferential comprehension. The specialist designs an intervention plan to address this student\'s specific needs. Which instructional approach would be most appropriate as the primary component of the intervention?',
    options: [
      { label: 'A', text: 'Intensive phonics intervention focusing on advanced decoding of multisyllabic words with Latin and Greek roots to strengthen the student\'s word-level reading accuracy' },
      { label: 'B', text: 'Explicit instruction in comprehension strategies such as making predictions, generating questions, and making text-to-self connections, with gradual release of responsibility through guided and independent practice' },
      { label: 'C', text: 'Repeated reading fluency practice with timed passages and progress monitoring of words correct per minute to increase the student\'s reading rate' },
      { label: 'D', text: 'Daily independent reading of self-selected books at the student\'s independent level with weekly book reports to build overall reading volume and engagement' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Explicit comprehension strategy instruction directly targets the identified deficit in inferential comprehension. Teaching strategies such as predicting, questioning, and making connections gives the student cognitive tools for going beyond the literal text, and the gradual release framework ensures he learns to apply these strategies independently. Option A is incorrect because the student\'s decoding is already at the 75th percentile; phonics intervention would not address the comprehension weakness. Option C is incorrect because the student\'s fluency rate is at the 60th percentile, which is adequate; increasing rate would not address the inferential comprehension deficit. Option D is incorrect because independent reading alone, without explicit instruction in comprehension strategies, is unlikely to develop the specific inferential thinking skills this student lacks.',
  },

  // --- Set 5: Kindergartener literal vs. inferential during read-aloud (Q33-Q35) ---

  // Q33
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher conducts an interactive read-aloud of a picture book about a rabbit who plants a garden. During the read-aloud, the teacher pauses periodically to ask questions. When the teacher asks, "What did the rabbit plant in the garden?" and "Who helped the rabbit water the seeds?" the student responds correctly and quickly. However, when the teacher asks, "How do you think the rabbit felt when the flowers finally bloomed?" the student looks confused, shrugs, and says, "I don\'t know. It didn\'t say." The teacher observes this same pattern across several read-aloud sessions: the student answers explicit recall questions accurately but consistently struggles when asked questions that require understanding characters\' feelings or motivations. At which comprehension level is this student currently functioning most successfully?',
    options: [
      { label: 'A', text: 'The evaluative level, where the student makes judgments about the text based on personal criteria and prior reading experiences' },
      { label: 'B', text: 'The inferential level, where the student combines text information with background knowledge to draw conclusions not directly stated in the text' },
      { label: 'C', text: 'The literal level, where the student identifies and recalls information that is explicitly stated in the text, such as characters, events, and details' },
      { label: 'D', text: 'The critical level, where the student analyzes the author\'s purpose, identifies bias, and evaluates the reliability of the information presented' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The student consistently and accurately answers questions about explicitly stated information (what was planted, who helped) but cannot answer questions requiring inference (how a character felt). This demonstrates functioning at the literal comprehension level. Option A is incorrect because evaluative comprehension requires making judgments about text quality or content, which is a higher-order skill the student has not demonstrated. Option B is incorrect because inferential comprehension is precisely the level where the student is struggling; she cannot combine text clues with background knowledge to infer feelings. Option D is incorrect because critical comprehension involves analyzing author purpose and bias, which is an advanced skill not yet within this kindergartener\'s demonstrated abilities.',
  },

  // Q34
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher conducts an interactive read-aloud of a picture book about a rabbit who plants a garden. The teacher has observed that one student answers literal questions accurately but struggles with inferential questions about characters\' feelings and motivations. The teacher wants to scaffold this student toward inferential thinking by adjusting the types of questions she asks during the next read-aloud. She plans to ask a question type that bridges literal and inferential comprehension by directing the student\'s attention to specific text and illustration clues that support an inference. Which type of question would best serve this bridging purpose?',
    options: [
      { label: 'A', text: '"What do you think will happen next in the story?" which asks the student to make a prediction based on the narrative pattern of the text' },
      { label: 'B', text: '"Look at the rabbit\'s face on this page. What do you notice about his eyes and mouth? What feeling does that face show?" which directs the student to specific visual evidence that supports an inference about emotion' },
      { label: 'C', text: '"Do you think planting a garden is a good idea? Why or why not?" which asks the student to evaluate the character\'s decision based on personal opinion' },
      { label: 'D', text: '"What was the first thing the rabbit did in the story?" which reinforces the student\'s strength in recalling the sequence of explicitly stated events' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This question bridges literal and inferential comprehension by first directing the student to observable, concrete evidence (the illustration of the rabbit\'s face) and then asking the student to interpret that evidence to infer an emotion. By grounding the inference in specific visual clues, the teacher scaffolds the thinking process the student needs to develop. Option A is incorrect because prediction, while an inferential skill, requires the student to project beyond the text and does not provide the concrete evidence scaffold that this student needs as a bridge. Option C is incorrect because evaluative questions ask for personal judgment, which is a different and more advanced comprehension skill that does not bridge from literal to inferential thinking. Option D is incorrect because this is a literal recall question that reinforces the student\'s existing strength rather than scaffolding toward the inferential level.',
  },

  // Q35
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher conducts interactive read-alouds daily with her class. She has observed that one student consistently answers literal questions correctly but struggles to answer inferential questions about characters\' feelings and motivations. The teacher has begun using illustration-based questions to scaffold the student toward making inferences, and the student is beginning to identify characters\' emotions when directed to look at facial expressions in the pictures. The teacher now wants to implement a broader instructional strategy that will support this student\'s inferential comprehension development over time across multiple texts and genres. Which strategy would be most effective for building this student\'s inferential comprehension?',
    options: [
      { label: 'A', text: 'Teaching the student to memorize a list of common character emotions and select one from the list whenever the teacher asks a question about how a character is feeling' },
      { label: 'B', text: 'Using think-alouds during read-alouds in which the teacher models the process of combining text clues and background knowledge to figure out what a character is thinking or feeling' },
      { label: 'C', text: 'Having the student practice retelling the story events in order after every read-aloud to ensure the student has a strong foundation in recalling what happened in the story' },
      { label: 'D', text: 'Providing the student with a printed list of comprehension questions to read independently before each read-aloud so the student knows what to listen for during the story' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Think-alouds are the most effective strategy for making the invisible process of inferential thinking visible to young students. When the teacher models how she combines text clues (what the character said, what the illustration shows) with her own background knowledge to figure out a character\'s feelings, the student learns the cognitive process of inferring, which transfers across texts and genres. Option A is incorrect because memorizing an emotion list does not teach the reasoning process of inferring; it reduces inferential thinking to a guessing or matching activity. Option C is incorrect because retelling practice strengthens literal comprehension, which is already the student\'s strength; it does not develop the inferential thinking she needs. Option D is incorrect because a kindergartener is unlikely to read printed questions independently, and even for an older student, knowing the questions in advance does not teach the process of making inferences.',
  },
]

async function main() {
  await connectDB()
  console.log('Connected to MongoDB.')

  const result = await Question.insertMany(questions)
  console.log(`Inserted ${result.length} complex scenario questions.`)

  // Quick distribution check
  const subareaCount: Record<string, number> = {}
  const typeCount = { next: 0, wordSet: 0, shared: 0 }
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    subareaCount[q.subarea] = (subareaCount[q.subarea] || 0) + 1
    if (i < 10) typeCount.next++
    else if (i < 20) typeCount.wordSet++
    else typeCount.shared++
  }
  console.log('\nDistribution by subarea:', subareaCount)
  console.log('Distribution by type:', typeCount)

  await mongoose.disconnect()
  console.log('Done. Disconnected.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
