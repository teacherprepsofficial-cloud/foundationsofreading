/**
 * seed-cr-standalone.ts
 * Seeds 8 standalone ConstructedResponse documents for the Written Response Practice page.
 * CRs 1–4 = starter access. CRs 5–8 = bundle only.
 *
 * Formats used across the 8 CRs (each is distinct):
 *   CR1  — Running record (oral reading) + fluency rubric            [FRS]
 *   CR2  — Literary passage + teacher-student discussion transcript  [RC]
 *   CR3  — Phonics word reading assessment (4 categories)            [FRS]
 *   CR4  — Informational passage + written comprehension responses   [RC]
 *   CR5  — Developmental spelling inventory + writing sample         [FRS]
 *   CR6  — Paired texts (informational + literary) + synthesis task  [RC]
 *   CR7  — Phonemic awareness battery (5 tasks)                      [FRS]
 *   CR8  — Academic vocabulary focus + anecdotal interaction log     [RC]
 *
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

// Official NES 4-point rubric (verbatim from NES study guide)
const NES_RUBRIC = {
  score4: 'The "4" response reflects a thorough knowledge and understanding of the subject matter. The purpose of the assignment is fully achieved. There is substantial, accurate, and appropriate application of subject matter knowledge. The supporting evidence is sound; there are high-quality, relevant examples. The response reflects an ably reasoned, comprehensive understanding of the topic.',
  score3: 'The "3" response reflects an adequate knowledge and understanding of the subject matter. The purpose of the assignment is largely achieved. There is a generally accurate and appropriate application of subject matter knowledge. The supporting evidence is adequate; there are some acceptable, relevant examples. The response reflects an adequately reasoned understanding of the topic.',
  score2: 'The "2" response reflects a limited knowledge and understanding of the subject matter. The purpose of the assignment is partially achieved. There is a limited, possibly inaccurate or inappropriate application of subject matter knowledge. The supporting evidence is limited; there are few relevant examples. The response reflects a limited, poorly reasoned understanding of the topic.',
  score1: 'The "1" response reflects a weak knowledge and understanding of the subject matter. The purpose of the assignment is not achieved. There is little or no appropriate or accurate application of subject matter knowledge. The supporting evidence, if present, is weak; there are few or no relevant examples. The response reflects little or no reasoning about or understanding of the topic.',
}

const FRS_PROMPT_INTRO = `Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting)`

const RC_PROMPT_INTRO = `Using your knowledge of reading comprehension (e.g., vocabulary knowledge; knowledge of academic language structures, including conventions of standard English grammar and usage; application of literal, inferential, or evaluative comprehension skills; use of comprehension strategies; application of text analysis skills to a literary or informational text, including determining key ideas and details, analyzing craft and structure, or integrating knowledge and ideas within a text or across texts)`

const crs = [

  // ───────────────────────────────────────────────────────────────────────────
  // CR 1 — Maya, Grade 2, FRS
  // FORMAT: Running record (oral reading of narrative passage) + fluency rubric
  // NEED: Vowel teams (EA, AI, OA, IGH) — consistent error pattern across all lines
  // STRENGTH: Decodes blends, automatic with HFW, self-monitors (SCs present)
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 1,
    crType: 'foundational_reading_skills',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

${FRS_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Maya demonstrates related to foundational reading skills;
• identify one significant need that Maya demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Maya;
• explain why the instructional strategy, activity, or intervention you described would be effective for Maya.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Maya | GRADE: 2 | CONTEXT: Early in the school year, Maya's teacher records her oral reading of an unfamiliar narrative passage at the second-grade instructional level.

──────────────────────────────────────────────
EXHIBIT 1 — TEACHER RECORD (Oral Reading)
──────────────────────────────────────────────
Teacher Markup Key:
  [ ] = substitution (student reading shown)   ← SC = self-correction
  | = short pause   ‖ = long pause   [←] = repetition   (T) = told by teacher

Passage — "The Old Lighthouse" (Grade 2 instructional level, ~130 words):

Line 1: The trail [woned ← SC: wound] through the trees to an old lighthouse by the sea.
  → "wound": read "woned," then self-corrected — OU diphthong initially misread; repair shows self-monitoring

Line 2: Waves crashed against the rocks below with a [stedy] beat.
  → "steady": read "stedy" — EA vowel team substituted with short vowel; consonant blend /st/ correct

Line 3: "I can see a [salbot]!" said Maya, pointing to the [geeming] water.
  → "sailboat": read "salbot" — AI vowel team unrecognized; compound word simplified
  → "gleaming": read "geeming" — GL- blend dropped; EA vowel team partially applied

Line 4: Her teacher smiled and [reched ← SC: reached] into her bag for the ‖ (T) binoculars.
  → "reached": read "reched," self-corrected — EA vowel team initially dropped, then repaired
  → "binoculars": long pause; no attempt after 5 seconds; teacher supplied word

Line 5: Far out at sea, a small boat was [saling] through the [fome].
  → "sailing": read "saling" — AI vowel team substituted with short vowel; -ING suffix retained
  → "foam": read "fome" — OA vowel team unrecognized; treated as CVCe pattern

Line 6: The lighthouse [keper] had [panted] the tower a bright red and [crem].
  → "keeper": read "keper" — EE vowel team substituted with short vowel
  → "painted": read "panted" — AI vowel team omitted entirely
  → "cream": read "crem" — EA vowel team dropped; single vowel substituted

Line 7: Maya counted the steps as they climbed up to the [lyt room].
  → "light room": read "lyt room" — IGH trigraph unrecognized; short vowel substituted; "climbed" correct ✓

Line 8: "Sixty-[et] steps," she [anoced ← SC: announced] with a [beming] smile.
  → "eight": read "et" — EIGH vowel pattern unrecognized
  → "announced": read "anoced," self-corrected — first syllable dropped; NC cluster simplified
  → "beaming": read "beming" — EA vowel team omitted; shows pattern is not yet consolidated

──────────────────────────────────────────────
EXHIBIT 2 — ORAL FLUENCY READING RUBRIC
──────────────────────────────────────────────
Words Correct Per Minute:  58 wcpm
Accuracy:                  83%
Pace (1–4 scale):          2
Prosody:
  Smoothness (1–4):        2
  Phrasing (1–4):          3

Benchmark: Second-grade 50th percentile fall benchmark is 51 wcpm.
Note: Accuracy below 90% indicates text is at frustration level for this student.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 2 — Sofia, Grade 3, RC
  // FORMAT: Literary passage (original) + teacher-student discussion transcript
  // (mirrors official NES CR2 structure with James/Mighty Miss Malone)
  // NEED: Figurative language — literal interpretation of metaphors and imagery
  // STRENGTH: Literal recall, Tier 2 vocabulary knowledge
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 2,
    crType: 'reading_comprehension',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

${RC_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Sofia demonstrates related to reading comprehension;
• identify one significant need that Sofia demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Sofia;
• explain why the instructional strategy, activity, or intervention you described would be effective for Sofia.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Sofia | GRADE: 3 | CONTEXT: After reading the passage below independently and then silently rereading it, Sofia's teacher leads a discussion. The teacher records Sofia's responses.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "The Last Jar of Honey"
──────────────────────────────────────────────
Every Saturday morning, Nora helped her grandfather in the kitchen. He moved slowly now, and his hands shook when he lifted heavy things. But when he reached for the jar of honey on the highest shelf, something changed in him. He became a young man again — tall and sure, stretching toward summer.

He drizzled honey over the warm bread and slid the plate to Nora. "Your great-grandmother planted those wildflowers," he said. "Every jar tastes like her garden."

Nora took a bite. The honey was thick and sweet, but something else lived in it too — a sound almost, like bees humming in tall grass, and the warmth of a day she had never seen but somehow remembered.

"It's just honey," she said quietly.

Her grandfather smiled. "No," he said. "It's everything she left behind."

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER-STUDENT DISCUSSION TRANSCRIPT
──────────────────────────────────────────────
Teacher: What is this passage mostly about?
Sofia: It's about a girl who helps her grandfather make breakfast on Saturdays.

Teacher: Good. What does the grandfather do when he reaches for the honey jar?
Sofia: He reaches up really high to get it off the shelf.

Teacher: The author writes that he "became a young man again — tall and sure, stretching toward summer." What does that mean?
Sofia: He stretched his arms up really high to reach the shelf. He was tall.

Teacher: Mm. What does "stretching toward summer" mean?
Sofia: Like he was reaching up? Maybe summer is when the bees made the honey.

Teacher: Interesting. What does Nora say she tastes in the honey besides sweetness?
Sofia: She said there was a sound like bees, and warmth. Which is weird because you can't taste a sound.

Teacher: Why do you think the author wrote it that way?
Sofia: I don't know. Maybe she got confused. Or maybe the honey was really fresh.

Teacher: At the end, why does the grandfather say the honey is "everything she left behind"?
Sofia: Because great-grandmother planted the flowers and the bees made honey from them. So the honey came from the flowers she planted.

Teacher: Can you tell me what he meant by "everything she left behind"?
Sofia: Like the honey she left in the jar? Before she died maybe she left jars of honey for them.

Teacher: What kind of vocabulary words in this passage were tricky for you?
Sofia: "Drizzled" — I knew it was pouring. And "wildflowers" was easy. "Somehow remembered" was confusing because Nora never saw it, so how could she remember?`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 3 — Priya, Grade 1, FRS
  // FORMAT: Phonics word reading assessment (4 categories) + observational notes
  // NEED: CVCe (silent-e long vowel pattern) — 0/5 with consistent short-vowel error
  // STRENGTH: CVC automaticity + consonant digraphs
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 3,
    crType: 'foundational_reading_skills',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

${FRS_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Priya demonstrates related to foundational reading skills;
• identify one significant need that Priya demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Priya;
• explain why the instructional strategy, activity, or intervention you described would be effective for Priya.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Priya | GRADE: 1 | CONTEXT: In mid-November, Priya's teacher administers a phonics word reading assessment. Each word is shown on an individual card. Priya reads each word aloud.

──────────────────────────────────────────────
EXHIBIT 1 — PHONICS WORD READING ASSESSMENT
──────────────────────────────────────────────
Category 1 — CVC Words (short vowel, consonant-vowel-consonant):
  mat → "mat" ✓   |  hop → "hop" ✓   |  big → "big" ✓
  sun → "sun" ✓   |  pet → "pet" ✓
  Result: 5/5 correct — read all words immediately, no sounding out observed

Category 2 — Consonant Digraphs (sh, ch, th, wh):
  ship → "ship" ✓  |  chop → "chop" ✓  |  thin → "thin" ✓
  whip → "wip" ✗   |  math → "mat" ✗
  Result: 3/5 correct — WH and final TH not yet secured

Category 3 — Initial Consonant Blends (2-letter):
  slip → "sip" ✗   |  clap → "cap" ✗   |  drop → "dop" ✗
  frog → "fog" ✗   |  trim → "tim" ✗
  Result: 0/5 correct — omits second consonant of every blend

Category 4 — CVCe Words (long vowel, silent e):
  cake → "cak" ✗   |  hope → "hop" ✗   |  time → "tim" ✗
  cute → "cut" ✗   |  bike → "bik" ✗
  Result: 0/5 correct — drops final E and assigns short vowel in all cases

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S OBSERVATIONAL NOTES
──────────────────────────────────────────────
CVC Words:
Priya read all five words with full automaticity — no finger-pointing, no sounding out. She appears to have short-vowel CVC patterns fully consolidated at this point.

Consonant Digraphs:
Priya produced SH, CH, and TH correctly. On WH words she dropped the W entirely ("wip" for "whip"). On final TH she dropped the digraph and read only the base CVC ("mat" for "math"). WH and final-position TH remain emerging.

Initial Consonant Blends:
On every blend word, Priya read only the first consonant and omitted the second member of the blend, producing a CVC word (e.g., "sip" for "slip," "cap" for "clap"). The pattern was perfectly consistent — no variation across the five words. She did not pause or show awareness of the error.

CVCe Words:
Priya omitted the silent E and decoded each CVCe word as a CVC, assigning the short vowel in every case (e.g., "cak" for "cake," "hop" for "hope"). She showed no awareness that the final E signals a long vowel in the preceding syllable. This pattern is completely consistent — she has not yet acquired the CVCe "magic-e" principle.

Self-Monitoring:
Priya showed no self-monitoring or self-correction behavior on any error category. She responded with apparent confidence on all items.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 4 — Jordan, Grade 2, RC
  // FORMAT: Informational passage + Jordan's written comprehension responses
  // NEED: Evaluative comprehension — can't identify or evaluate specific evidence
  // STRENGTH: Literal comprehension, text evidence location (literal only)
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 4,
    crType: 'reading_comprehension',
    bundleOnly: false,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

${RC_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Jordan demonstrates related to reading comprehension;
• identify one significant need that Jordan demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Jordan;
• explain why the instructional strategy, activity, or intervention you described would be effective for Jordan.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Jordan | GRADE: 2 | CONTEXT: After reading the passage below independently, Jordan answers three comprehension questions in writing. The teacher collects the written responses.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "How Fireflies Make Light"
──────────────────────────────────────────────
On summer evenings, fireflies blink their lights to find a mate. The light is not made by heat the way a light bulb works. Instead, a firefly uses a chemical reaction inside its body. Two chemicals mix together in a special organ in the firefly's abdomen, and the reaction produces light without producing heat. Scientists call this "cold light." Because no energy is wasted as heat, the firefly's light is almost perfectly efficient — nearly 100% of the energy becomes light. A regular light bulb, by comparison, wastes about 90% of its energy as heat and converts only 10% into visible light. Engineers are studying fireflies to design better, more efficient light sources for homes and offices.

──────────────────────────────────────────────
EXHIBIT 2 — JORDAN'S WRITTEN COMPREHENSION RESPONSES
──────────────────────────────────────────────
Question 1 — Literal: "According to the passage, how does a firefly produce light?"
Jordan wrote: "Two chemicals mix together in a special part of the firefly's body and make light without making heat."
  → Accurate, complete literal recall with key vocabulary retained. ✓

Question 2 — Inferential: "Why might scientists study fireflies to design better light sources?"
Jordan wrote: "Because fireflies make light really efficiently and don't waste energy like light bulbs do."
  → Correctly infers the connection; uses text evidence appropriately. ✓

Question 3 — Evaluative: "The author says firefly light is 'almost perfectly efficient.' Is this a strong claim? Use specific evidence from the passage to explain your answer."
Jordan wrote: "Yes I think it is a strong claim because the passage says it."
  → Does not identify the specific statistic (nearly 100% energy converted vs. 10% for light bulbs).
  → Treats agreement as sufficient; makes no attempt to evaluate or cite numerical evidence.
  → Cannot distinguish between restating a claim and evaluating it with evidence.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 5 — Caleb, Grade 2, FRS (BUNDLE)
  // FORMAT: Developmental spelling inventory + writing sample excerpt
  // Completely different from running records — tests phonics through production
  // NEED: Long vowel spelling patterns (VCe and vowel teams)
  // STRENGTH: Short vowels, consonant blends, digraphs — all secure in spelling
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 5,
    crType: 'foundational_reading_skills',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

${FRS_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Caleb demonstrates related to foundational reading skills;
• identify one significant need that Caleb demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Caleb;
• explain why the instructional strategy, activity, or intervention you described would be effective for Caleb.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Caleb | GRADE: 2 | CONTEXT: In October, Caleb's teacher administers a developmental spelling inventory (10 words). Words are dictated aloud one at a time; Caleb writes each word independently. The teacher then analyzes spelling feature by feature.

──────────────────────────────────────────────
EXHIBIT 1 — DEVELOPMENTAL SPELLING INVENTORY
──────────────────────────────────────────────
Word Administered        Caleb's Spelling   Feature Assessed
1.  mat                  mat         ✓      Short vowel — CVC
2.  ship                 ship        ✓      Consonant digraph SH
3.  when                 wen         ✗      Consonant digraph WH → omitted H
4.  lump                 lump        ✓      Final consonant blend -MP
5.  drive                driv        ✗      VCe long vowel I — dropped final E
6.  coat                 cot         ✗      Vowel team OA → short vowel O
7.  light                lit         ✗      Vowel pattern IGH → short vowel I
8.  dream                drem        ✗      Vowel team EA → short vowel E
9.  train                tran        ✗      Vowel team AI → short vowel A
10. stone                ston        ✗      VCe long vowel O — dropped final E

Feature Summary:
  Short vowel patterns (CVC):        2/2 — fully secure
  Final consonant blends:            1/1 — fully secure
  Consonant digraphs (SH):           1/1 — secure
  Consonant digraphs (WH):           0/1 — emerging
  VCe long vowel patterns:           0/2 — not yet acquired (drops silent E in all cases)
  Vowel team long vowel patterns:    0/4 — not yet acquired (substitutes short vowel in all cases)

──────────────────────────────────────────────
EXHIBIT 2 — WRITING SAMPLE (Journal Entry, unedited)
──────────────────────────────────────────────
Caleb's journal entry written the same week:

"On Saterday I rod my bik to the pon. I saw a big frog sit on a ston. It jumt into the watur and I cud not find it. I wated for a long tim but it did not com bak. My dad sed it was hidig in the mud."

Teacher's annotation — recurring patterns in writing sample:
  "bik" for "bike" (VCe — dropped silent E)
  "pon" for "pond" (short vowel correct; final D omitted — separate issue)
  "ston" for "stone" (VCe — dropped silent E, matches inventory)
  "tim" for "time" (VCe — dropped silent E)
  "hidig" for "hiding" (VCe base + suffix — dropped silent E before -ING)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 6 — Nadia, Grade 3, RC (BUNDLE)
  // FORMAT: Paired texts (informational + literary poem) + synthesis writing task
  // NEED: Cross-text integration — can summarize each text but cannot synthesize
  // STRENGTH: Within-text literal comprehension and text evidence retrieval
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 6,
    crType: 'reading_comprehension',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

${RC_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Nadia demonstrates related to reading comprehension;
• identify one significant need that Nadia demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Nadia;
• explain why the instructional strategy, activity, or intervention you described would be effective for Nadia.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Nadia | GRADE: 3 | CONTEXT: As part of a paired-text unit on animal adaptation, Nadia reads two short texts on the same topic and completes a written synthesis task. Her teacher collects the work and records observations.

──────────────────────────────────────────────
EXHIBIT 1 — TEXT A (Informational): "Arctic Foxes in Winter"
──────────────────────────────────────────────
The Arctic fox survives one of the coldest environments on Earth by changing its body with the seasons. In winter, its fur turns pure white, providing camouflage in the snow and helping the fox ambush prey. The thick winter coat has two layers — a dense undercoat traps body heat, while longer outer guard hairs block wind and moisture. In summer, the coat thins and shifts to brown or gray, blending with rocks and tundra plants. The fox's small, rounded ears reduce heat loss, and its heavily furred paws act like snowshoes on the ice. These physical adaptations allow the Arctic fox to maintain a stable body temperature even when air temperatures fall below −50°C.

──────────────────────────────────────────────
EXHIBIT 2 — TEXT B (Literary): "The White Fox" (original poem)
──────────────────────────────────────────────
She moves like silence through the snow,
a breath the blizzard cannot find.
She wears the winter like a coat
that keeps the cold outside her mind.

When summer comes she sheds her white
and borrows colors from the ground.
She knows the trick of disappearing —
to change before the world comes around.

──────────────────────────────────────────────
EXHIBIT 3 — NADIA'S WRITTEN SYNTHESIS RESPONSE
──────────────────────────────────────────────
Prompt given to Nadia: "Both texts are about the Arctic fox. What idea do both texts share? Use evidence from each text to explain."

Nadia's written response:
"The informational article is about how Arctic foxes change their fur color in winter and summer to survive. They have thick fur that keeps them warm and their ears are small so they don't lose heat. In summer their fur turns brown. The poem is about a white fox that moves quietly in the snow. It says she wears winter 'like a coat.' In summer the fox changes color too."

Teacher's observation notes:
  → Nadia accurately summarized each text separately with correct literal details.
  → She did not identify a shared central idea or explain what connects the two texts.
  → She quoted from the poem ("like a coat") without explaining what the figurative language means or how it connects to the informational text's content.
  → When asked orally, "What do both texts say about why the fox changes?" Nadia replied: "The article says it's for camouflage. The poem doesn't really say why."
  → She treated the two texts as separate tasks rather than as a paired set to be read together.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 7 — Amara, Grade 1, FRS (BUNDLE)
  // FORMAT: Phonemic awareness battery (5 tasks) — completely different from PA-adjacent CRs
  // NEED: Phoneme segmentation — cannot segment words into individual phonemes
  // STRENGTH: Phoneme identity and rhyme recognition — strong auditory awareness
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 7,
    crType: 'foundational_reading_skills',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.

${FRS_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Amara demonstrates related to foundational reading skills;
• identify one significant need that Amara demonstrates related to foundational reading skills;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Amara;
• explain why the instructional strategy, activity, or intervention you described would be effective for Amara.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Amara | GRADE: 1 | CONTEXT: In late September, Amara's teacher administers a phonemic awareness battery. All tasks are oral — no print is used. The teacher records Amara's responses and scores each item.

──────────────────────────────────────────────
EXHIBIT 1 — PHONEMIC AWARENESS BATTERY RESULTS
──────────────────────────────────────────────
Task 1 — Rhyme Recognition (Does this pair rhyme? Yes or no):
  cat / hat → "yes" ✓  |  big / wig → "yes" ✓  |  sun / fun → "yes" ✓
  dog / log → "yes" ✓  |  pan / cup → "no" ✓
  Score: 5/5 — Rhyme recognition fully secure

Task 2 — Phoneme Identity (What sound does this word start with?):
  "What sound does 'map' start with?" → /m/ ✓
  "What sound does 'fish' start with?" → /f/ ✓
  "What sound does 'nest' start with?" → /n/ ✓
  "What sound does 'cup' start with?" → /k/ ✓
  "What sound does 'ship' start with?" → /sh/ ✓
  Score: 5/5 — Initial phoneme identity fully secure

Task 3 — Phoneme Blending (I'll say the sounds; you say the word):
  /k/ /æ/ /t/ → "cat" ✓  |  /s/ /ʌ/ /n/ → "sun" ✓  |  /f/ /ɪ/ /ʃ/ → "fish" ✓
  /s/ /t/ /ɒ/ /p/ → "stop" ✓  |  /t/ /r/ /ʌ/ /k/ → "truck" — "tuck" ✗
  Score: 4/5 — Blending secure for 3-phoneme words; 4-phoneme words emerging

Task 4 — Phoneme Segmentation (Say the word; tell me each sound):
  "map" → /m/ /æ/ /p/ ✓ (correct, after pause)
  "sit" → "s-it" — produced onset + rime, not individual phonemes ✗
  "fun" → "f-un" — onset + rime only ✗
  "stop" → "st-op" — cluster + rime only ✗
  "truck" → "tr-uck" — cluster + rime only ✗
  Score: 1/5 — Phoneme segmentation significantly below expectation for mid-Grade 1

Task 5 — Phoneme Deletion (Say the word without the first sound):
  "Say 'cat' without /k/" → "at" ✓
  "Say 'sun' without /s/" → "un" ✓
  "Say 'flip' without /f/" → "lip" — said "lip" ✓
  "Say 'stop' without /s/" → "top" — said "top" ✓
  "Say 'plant' without /p/" → "lant" — said "ant" (deleted onset cluster) ✗
  Score: 4/5 — Phoneme deletion strong for simple words; complex blends challenging

──────────────────────────────────────────────
EXHIBIT 2 — TEACHER'S OBSERVATIONAL NOTES
──────────────────────────────────────────────
Rhyme and Identity Tasks:
Amara responded immediately on rhyme and initial phoneme tasks with no hesitation. She correctly identified /sh/ as a single unit in "ship," suggesting strong phonological sensitivity at the syllable and onset-rime level.

Segmentation Task:
On every 3- and 4-phoneme word beyond "map," Amara consistently segmented into onset and rime (e.g., /s/ + /ɪt/ for "sit") rather than into individual phonemes. She appeared to believe she was correctly segmenting the words and showed no awareness of the gap. When the teacher modeled fully segmenting "sit" as /s/ /ɪ/ /t/ using Elkonin boxes, Amara could repeat the three sounds immediately after modeling but could not produce them independently on the next word.

Connection to Reading:
Amara's letter-sound decoding in connected text shows a parallel pattern: she produces initial sounds and then guesses the rest of the word from context or rime. She has not yet internalized that every phoneme in a word maps to a letter or letter pattern.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CR 8 — Darius, Grade 2, RC (BUNDLE)
  // FORMAT: Informational passage (Tier 2 vocab) + vocabulary interaction log
  // NEED: Tier 2 academic vocabulary — cannot use context clues to determine meaning
  // STRENGTH: Literal comprehension with familiar vocabulary, Tier 1 word knowledge
  // ───────────────────────────────────────────────────────────────────────────
  {
    examCode: '190',
    crNumber: 8,
    crType: 'reading_comprehension',
    bundleOnly: true,
    isPublished: true,
    rubric: NES_RUBRIC,
    prompt: `Prepare an organized, developed analysis on a topic related to reading comprehension.

${RC_PROMPT_INTRO}, write a response of approximately 150–300 words in which you:

• identify one significant strength that Darius demonstrates related to reading comprehension;
• identify one significant need that Darius demonstrates related to reading comprehension;
• based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Darius;
• explain why the instructional strategy, activity, or intervention you described would be effective for Darius.

Be sure to cite specific evidence from the information provided to support all parts of your response.`,
    scenarioContext: `STUDENT: Darius | GRADE: 2 | CONTEXT: Darius's teacher conducts an informal reading comprehension assessment using an informational passage. After Darius reads independently, the teacher holds a vocabulary and comprehension conference and records his responses.

──────────────────────────────────────────────
EXHIBIT 1 — READING PASSAGE: "Life in the Desert"
──────────────────────────────────────────────
Deserts are some of the most extreme environments on Earth. They receive very little rainfall — usually less than 10 inches per year. Because of this, the landscape is often sparse, with only scattered plants and animals. Yet many species have developed remarkable ways to survive.

The cactus is one of the most resilient desert plants. Its thick stem stores water during rare rainstorms, allowing the plant to endure long periods of drought. Some animals, like the kangaroo rat, are also adapted to conserve water — they rarely drink at all, getting moisture from the seeds they eat.

Desert temperatures are extreme. Days can be scorching, but nights can drop to near freezing. Animals like lizards regulate their temperature by moving between sun and shade throughout the day. This behavior is essential to their survival.

──────────────────────────────────────────────
EXHIBIT 2 — VOCABULARY INTERACTION LOG
──────────────────────────────────────────────
The teacher asks Darius about specific words after reading. Responses recorded verbatim.

"sparse":
  Teacher: "The passage says the landscape is 'sparse.' What do you think that means?"
  Darius: "I don't know. Maybe it's like... the desert is sparse because it has sand?"
  → Does not use surrounding context ("only scattered plants and animals") to infer meaning.

"resilient":
  Teacher: "What do you think 'resilient' means here?"
  Darius: "Strong? Like the cactus is strong."
  → Partially correct — associates with survival — but cannot articulate the specific meaning of able to withstand hardship and recover.

"conserve":
  Teacher: "It says the kangaroo rat is 'adapted to conserve water.' What does 'conserve' mean?"
  Darius: "Save it? I'm not sure."
  → Offers a reasonable guess but did not use the context clue in the next sentence ("rarely drink at all") to confirm or develop the meaning.

"regulate":
  Teacher: "Lizards 'regulate their temperature.' What does that mean?"
  Darius: "I skipped that word. I didn't know it."
  → Did not attempt to use context; skipped the unknown word without applying any strategy.

Literal comprehension check:
  Teacher: "Where do kangaroo rats get their water?"
  Darius: "From the seeds they eat." ✓ — accurate, direct recall from text.
  Teacher: "Why do lizards move between sun and shade?"
  Darius: "To stay warm and cool. Because the temperature changes a lot." ✓ — accurate paraphrase.`,
  },
]

async function main() {
  await connectDB()
  const deleted = await ConstructedResponse.deleteMany({ examCode: '190' })
  console.log(`Deleted ${deleted.deletedCount} existing CR documents.`)
  const inserted = await ConstructedResponse.insertMany(crs)
  console.log(`✅ Inserted ${inserted.length} standalone CR prompts for NES 190`)
  console.log('   CR 1 — Maya   | FRS | Running record + fluency rubric')
  console.log('   CR 2 — Sofia  | RC  | Literary passage + discussion transcript')
  console.log('   CR 3 — Priya  | FRS | Phonics assessment (4 categories)')
  console.log('   CR 4 — Jordan | RC  | Informational passage + written responses')
  console.log('   CR 5 — Caleb  | FRS | Developmental spelling inventory + writing sample [BUNDLE]')
  console.log('   CR 6 — Nadia  | RC  | Paired texts + synthesis task [BUNDLE]')
  console.log('   CR 7 — Amara  | FRS | Phonemic awareness battery (5 tasks) [BUNDLE]')
  console.log('   CR 8 — Darius | RC  | Academic vocabulary focus + interaction log [BUNDLE]')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
