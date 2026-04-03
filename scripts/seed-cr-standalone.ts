/**
 * seed-cr-standalone.ts
 * Seeds 8 standalone ConstructedResponse documents for the Written Response Practice page.
 * CRs 1-4 = starter access. CRs 5-8 = bundle only.
 * Run: CONFIRM_SEED=true npx tsx scripts/seed-cr-standalone.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import connectDB from '../lib/mongodb'
import ConstructedResponse from '../models/ConstructedResponse'

if (process.env.CONFIRM_SEED !== 'true') {
  console.error('🔴 This will replace all NES 190 standalone CR prompts.')
  console.error('To proceed: CONFIRM_SEED=true npx tsx scripts/seed-cr-standalone.ts')
  process.exit(1)
}

const NES_RUBRIC = {
  score2: 'The response thoroughly addresses all four parts of the assignment: identifies a significant strength with specific cited evidence, identifies a significant need with specific cited evidence, describes an appropriate and detailed instructional strategy or intervention, and provides a clear and well-reasoned explanation of why the strategy would be effective for this specific student. The response is well-organized, uses accurate pedagogical terminology, and demonstrates strong knowledge of foundational reading skills or reading comprehension as appropriate.',
  score1: 'The response adequately addresses most parts of the assignment but may be uneven — one or two parts may be underdeveloped, vague, or lack specific evidence from the scenario. The instructional strategy may be described but not well-connected to the identified need, or the explanation of effectiveness may be general rather than student-specific. The response demonstrates general knowledge of the relevant content area but may contain minor inaccuracies or lack depth.',
  score0: 'The response is missing, does not address the prompt, is too brief to evaluate, or demonstrates serious misunderstanding of the relevant content area. The response may name a strength or need without supporting evidence, omit required parts of the assignment, or describe a strategy that is not appropriate for the identified need.',
}

const crs = [
  // ─────────────────────────────────────────────────────────────────────────
  // CR 1 — Maya, Grade 2, Foundational Reading Skills (starter)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 1,
    crType: 'foundational_reading_skills',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:

• identify one significant strength that Maya demonstrates related to foundational reading skills;
• identify one significant need that Maya demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Maya;
• explain why the instructional strategy, activity, or intervention you described would be effective for Maya.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Maya | GRADE: 2 | CONTEXT: Early in the school year, Maya reads aloud an unfamiliar narrative passage. The teacher records her oral reading performance.

──────────────────────────────────────────────
EXHIBIT 1 — TEACHER RECORD (Oral Reading)
──────────────────────────────────────────────
Passage text with Maya's reading behaviors noted:

Line 1: Sam and his dog Rex ran down the [mudy ← SC: muddy] trail.
  → "muddy" read as "mudy" (substitution)

Line 2: Rex [jumpt → SC: jumped] over a log and [land] in a puddle.
  → "jumped" read as "jumpt" then self-corrected (SC)
  → "landed" read as "land" (substitution — dropped suffix)

Line 3: Sam [laughed] ‖ and [wipe] mud from his face.
  → "laughed" — long pause before reading (‖)
  → "wiped" read as "wipe" (substitution — dropped past-tense marker)

Line 4: They [raced ←] all the way home as the sun [begin] to set.
  → "raced" — repeated (repetition)
  → "began" read as "begin" (substitution — incorrect tense)

──────────────────────────────────────────────
EXHIBIT 2 — ORAL FLUENCY READING RUBRIC
──────────────────────────────────────────────
Words Correct Per Minute:  71 wcpm
Accuracy:                  88%
Pace (1–4 scale):          3
Prosody:
  Smoothness (1–4):        2
  Phrasing (1–4):          3

Benchmark: Second-grade 50th percentile fall benchmark is 72 wcpm.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 2 — Sofia, Grade 3, Reading Comprehension (starter)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 2,
    crType: 'reading_comprehension',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author's purpose and perspective), write a response of approximately 150–300 words in which you:

• identify one significant strength that Sofia demonstrates related to reading comprehension;
• identify one significant need that Sofia demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Sofia;
• explain why the instructional strategy, activity, or intervention you described would be effective for Sofia.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Sofia | GRADE: 3 | CONTEXT: After reading the passage below independently, Sofia's teacher asks comprehension questions and records observations.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "The Missing Notebook"
──────────────────────────────────────────────
Lena had searched everywhere for her notebook. It held every drawing she had made since kindergarten — birds, horses, her grandmother's face. When she finally found it under the couch, the cover was torn and several pages were damp. She sat quietly for a long time before picking it up. Then she pressed it carefully against her chest and carried it to her room.

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S ANECDOTAL NOTES
──────────────────────────────────────────────
Literal Retell:
Sofia accurately retold the main events in sequence. She identified that Lena searched for the notebook, found it under the couch, saw it was damaged, and then carried it to her room.

Inferential Question: "Why did Lena sit quietly for a long time before picking up the notebook?"
Sofia responded: "Because it was wet." She did not infer the emotional significance — that Lena was processing the damage to a deeply personal collection of memories.

Inferential Question: "What does the notebook mean to Lena?"
Sofia responded: "It's her drawing book." She identified the literal function but missed the deeper personal significance described in the text (every drawing since kindergarten, including her grandmother's face).

Evidence Use:
When asked literal questions, Sofia immediately located the relevant sentence. When asked inferential questions, she paused and frequently said "I don't know" before giving a surface-level answer.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 3 — Priya, Grade 1, Foundational Reading Skills (starter)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 3,
    crType: 'foundational_reading_skills',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:

• identify one significant strength that Priya demonstrates related to foundational reading skills;
• identify one significant need that Priya demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Priya;
• explain why the instructional strategy, activity, or intervention you described would be effective for Priya.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Priya | GRADE: 1 | CONTEXT: In November, Priya's teacher administers a phonics word reading assessment. Each word is presented on an individual card.

──────────────────────────────────────────────
EXHIBIT 1 — PHONICS WORD READING ASSESSMENT
──────────────────────────────────────────────
Category 1 — CVC Words:
  mat → "mat" ✓  |  hop → "hop" ✓  |  big → "big" ✓
  sun → "sun" ✓  |  pet → "pet" ✓
  Result: 5/5 correct

Category 2 — Initial Consonant Blends:
  slip → "sip" ✗  |  clap → "cap" ✗  |  drop → "dop" ✗
  frog → "fog" ✗  |  trip → "tip" ✗
  Result: 0/5 correct (Priya read only the first consonant of each blend, omitting the second)

Category 3 — CVCe Words (Long Vowel):
  cake → "cak" ✗  |  hope → "hop" ✗  |  time → "tim" ✗
  cute → "cut" ✗  |  bike → "bik" ✗
  Result: 0/5 correct (Priya ignored the final e and assigned short vowel sounds throughout)

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S OBSERVATIONAL NOTES
──────────────────────────────────────────────
CVC Words:
Priya decoded all five CVC words quickly and accurately with no hesitation. She did not sound out individual letters — she recognized and read the words as whole units.

Consonant Blends:
On every blend word, Priya read only the first consonant and skipped the second (e.g., "sip" for "slip," "cap" for "clap"). She did not pause or appear to notice the error.

CVCe Words:
On every CVCe word, Priya ignored the final e and assigned the short vowel sound (e.g., "cak" for "cake," "hop" for "hope"). She treated CVCe words as CVC words.

Self-Monitoring:
Priya did not attempt to re-read or self-correct any errors. When unsure, she looked up and waited rather than applying a decoding strategy.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 4 — Jordan, Grade 2, Reading Comprehension (starter)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 4,
    crType: 'reading_comprehension',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author's purpose and perspective), write a response of approximately 150–300 words in which you:

• identify one significant strength that Jordan demonstrates related to reading comprehension;
• identify one significant need that Jordan demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Jordan;
• explain why the instructional strategy, activity, or intervention you described would be effective for Jordan.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Jordan | GRADE: 2 | CONTEXT: After reading the passage below independently, Jordan answers three comprehension questions in writing.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "How Bats Find Food"
──────────────────────────────────────────────
Most bats hunt at night when it is too dark to see. Instead of using their eyes, bats use sound. A bat sends out a high-pitched squeak that travels through the air. When the sound hits an object — such as a moth — it bounces back to the bat's ears. This is called echolocation. By listening to the echoes, a bat can tell exactly where its prey is, how fast it is moving, and even how large it is. Echolocation is so accurate that bats can catch a single moth in complete darkness.

──────────────────────────────────────────────
EXHIBIT 2 — JORDAN'S WRITTEN COMPREHENSION RESPONSES
──────────────────────────────────────────────
Literal: "According to the passage, how does a bat find food in the dark?"
Jordan wrote: "It uses sounds that bounce back to tell it where things are."  ✓ Correct

Inferential: "Why would a bat have trouble hunting if it lost its hearing?"
Jordan wrote: "Because bats need to hear to find food, also because it is dark."
  → Partially correct but does not demonstrate understanding of the echolocation mechanism.

Evaluative: "The author says echolocation is 'so accurate' that bats can catch prey in complete darkness. What evidence in the passage best supports this claim?"
Jordan wrote: "The bats catch moths."
  → Does not identify or explain the specific evidence (the precision of locating prey's position, speed, and size in complete darkness).`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 5 — Caleb, Grade 2, Foundational Reading Skills (bundle only)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 5,
    crType: 'foundational_reading_skills',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:

• identify one significant strength that Caleb demonstrates related to foundational reading skills;
• identify one significant need that Caleb demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Caleb;
• explain why the instructional strategy, activity, or intervention you described would be effective for Caleb.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Caleb | GRADE: 2 | CONTEXT: Caleb reads aloud a second-grade instructional-level narrative passage. The teacher records his oral reading behaviors.

──────────────────────────────────────────────
EXHIBIT 1 — TEACHER RECORD (Oral Reading)
──────────────────────────────────────────────
Line 1: The [ran ← SC: rain] fell softly on the garden path.
  → "rain" read as "ran" (substitution — vowel team error)

Line 2: A toad sat near the old oak tree and waited.
  → No errors

Line 3: It croaked once, then leaped into the tall green
  → No errors

Line 4: grass. The [bot → SC: boat] floated past on the narrow stream.
  → "boat" read as "bot" then self-corrected (SC — vowel team self-correction)

──────────────────────────────────────────────
EXHIBIT 2 — ORAL FLUENCY READING RUBRIC
──────────────────────────────────────────────
Words Correct Per Minute:  63 wcpm
Accuracy:                  86%
Pace (1–4 scale):          2
Prosody:
  Smoothness (1–4):        2
  Phrasing (1–4):          3

Benchmark: Second-grade 50th percentile fall benchmark is 72 wcpm.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 6 — Nadia, Grade 3, Reading Comprehension (bundle only)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 6,
    crType: 'reading_comprehension',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author's purpose and perspective), write a response of approximately 150–300 words in which you:

• identify one significant strength that Nadia demonstrates related to reading comprehension;
• identify one significant need that Nadia demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Nadia;
• explain why the instructional strategy, activity, or intervention you described would be effective for Nadia.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Nadia | GRADE: 3 | CONTEXT: During small-group discussion of the passage below, Nadia's teacher records observations over two sessions.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "How Monarch Butterflies Find Their Way"
──────────────────────────────────────────────
Every fall, millions of monarch butterflies leave their summer homes in the northern United States and Canada. They travel thousands of miles south to forests in central Mexico, where they spend the winter clustered on trees to stay warm. Scientists have discovered that monarchs use the position of the sun as a kind of compass during their journey. Because the butterflies that make the trip were never taught the route by their parents, researchers believe the ability to navigate is built into their biology from birth. Without this inherited guidance system, the fragile insects would have no way to complete one of nature's most remarkable journeys.

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S ANECDOTAL NOTES
──────────────────────────────────────────────
Session 1 — Literal Retell:
Asked Nadia where monarchs spend the winter. She pointed immediately to the second sentence and read it aloud accurately. No hesitation.

Session 1 — Inferential Question: "Why do scientists think navigation is built into the butterflies?"
Nadia said "because they go to Mexico." Did not address the absence of parental teaching or what that implies.

Session 2 — Evaluative Question: "What does the author want readers to think about monarch butterflies?"
Nadia replied, "That they travel far." Did not identify the author's implied message about the remarkable nature of inherited biological navigation.

Session 2 — Vocabulary in Context: "inherited"
Nadia located the sentence quickly and read it correctly — strong literal retrieval. Struggled when asked what "inherited" tells us about why the butterflies can navigate without being taught.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 7 — Amara, Grade 1, Foundational Reading Skills (bundle only)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 7,
    crType: 'foundational_reading_skills',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:

• identify one significant strength that Amara demonstrates related to foundational reading skills;
• identify one significant need that Amara demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Amara;
• explain why the instructional strategy, activity, or intervention you described would be effective for Amara.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Amara | GRADE: 1 | CONTEXT: In spring of first grade, Amara's teacher administers a phonics word reading assessment using individual word cards.

──────────────────────────────────────────────
EXHIBIT 1 — PHONICS WORD READING ASSESSMENT
──────────────────────────────────────────────
Category 1 — CVC Words:
  cat → "cat" ✓  |  hop → "hop" ✓  |  sit → "sit" ✓
  bug → "bug" ✓  |  pen → "pen" ✓
  Result: 5/5 correct

Category 2 — Final Consonant Clusters:
  fast → "fas" ✗  |  belt → "bel" ✗  |  lamp → "lam" ✗
  jump → "jum" ✗  |  mist → "mis" ✗
  Result: 0/5 correct (Amara dropped the final consonant of every cluster)

Category 3 — Initial Consonant Blends:
  slip → "sip" ✗  |  clap → "cap" ✗  |  frog → "fog" ✗
  drop → "dop" ✗  |  trip → "tip" ✗
  Result: 0/5 correct (Amara read only the first consonant of each blend)

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S OBSERVATIONAL NOTES
──────────────────────────────────────────────
CVC Words:
Amara read all five CVC words correctly and automatically. She did not sound out letters — she appears to have these patterns fully consolidated.

Final Consonant Clusters:
On every final cluster word, Amara stopped after the vowel and first consonant, omitting the final cluster member entirely (e.g., "fas" for "fast," "bel" for "belt"). Pattern was perfectly consistent — she never produced both cluster consonants.

Initial Consonant Blends:
Same omission pattern: Amara read the first consonant of each blend and skipped the second, reading the word as a CVC (e.g., "sip" for "slip"). No variation across the five words.

Self-Monitoring:
Amara showed no self-monitoring behavior on either error category. She responded with confidence, suggesting she was not aware the words were being read incorrectly.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CR 8 — Darius, Grade 2, Reading Comprehension (bundle only)
  // ─────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 8,
    crType: 'reading_comprehension',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author's purpose and perspective), write a response of approximately 150–300 words in which you:

• identify one significant strength that Darius demonstrates related to reading comprehension;
• identify one significant need that Darius demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Darius;
• explain why the instructional strategy, activity, or intervention you described would be effective for Darius.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Darius | GRADE: 2 | CONTEXT: After reading the passage below independently, Darius answers three comprehension questions in writing.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "Why Leaves Change Color"
──────────────────────────────────────────────
In summer, leaves are green because they are full of a substance called chlorophyll. Chlorophyll helps leaves use sunlight to make food for the tree. When fall arrives, the days grow shorter and the air turns cool. The tree stops making chlorophyll, and the green color fades. As the green disappears, other colors — yellow, orange, and red — that were always in the leaf begin to show. These colors were hidden by the green all summer long.

──────────────────────────────────────────────
EXHIBIT 2 — DARIUS'S WRITTEN COMPREHENSION RESPONSES
──────────────────────────────────────────────
Literal: "According to the passage, why are leaves green in summer?"
Darius wrote: "Because they have chlorophyll in them and it makes them green."  ✓ Correct

Inferential: "Why does the author say the other colors 'were always in the leaf'?"
Darius wrote: "Because there are other colors." Did not explain that the other pigments exist year-round but are masked by chlorophyll until fall.

Evaluative: "Is the author's explanation of why leaves change color complete? Use evidence from the passage to support your answer."
Darius wrote: "Yes because the passage explains it." Did not identify specific evidence or evaluate the completeness of the explanation — treated agreement as sufficient without supporting reasoning.`,
  },
]

async function main() {
  await connectDB()
  const deleted = await ConstructedResponse.deleteMany({ examCode: '190' })
  console.log(`Deleted ${deleted.deletedCount} existing CR documents.`)
  const inserted = await ConstructedResponse.insertMany(crs)
  console.log(`✅ Inserted ${inserted.length} standalone CR prompts for NES 190`)
  console.log('   CRs 1–4: starter access (Maya, Sofia, Priya, Jordan)')
  console.log('   CRs 5–8: bundle only (Caleb, Nadia, Amara, Darius)')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
