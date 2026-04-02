import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// ─── Inline schemas ────────────────────────────────────────────────────────────

const QuestionSchema = new mongoose.Schema({
  examCode: String,
  questionText: String,
  stimulus: String,
  options: [{ label: String, text: String }],
  correctAnswer: String,
  explanation: String,
  subarea: String,
  subareaName: String,
  objectiveNumber: Number,
  difficulty: String,
  isPublished: { type: Boolean, default: true },
  isDiagnostic: { type: Boolean, default: true },
}, { timestamps: true })

const PracticeTestSchema = new mongoose.Schema({
  examCode: String,
  testNumber: Number,
  name: String,
  isDiagnostic: { type: Boolean, default: false },
  questionIds: [mongoose.Schema.Types.ObjectId],
  timeLimitMinutes: Number,
  subareaDistribution: [{ subarea: String, count: Number }],
  isPublished: { type: Boolean, default: true },
}, { timestamps: true })

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema)
const PracticeTest = mongoose.models.PracticeTest || mongoose.model('PracticeTest', PracticeTestSchema)

// ─── Stimulus HTML helpers ─────────────────────────────────────────────────────

const tableStyle = 'border-collapse:collapse; width:100%; font-size:13px; margin-top:8px;'
const thStyle = 'border:1px solid #aaa; padding:7px 11px; text-align:left; background:#f3eef0; font-weight:600;'
const tdStyle = 'border:1px solid #aaa; padding:7px 11px;'
const tdAltStyle = 'border:1px solid #aaa; padding:7px 11px; background:#faf8f5;'
const labelStyle = 'font-weight:600; font-size:13px; margin-bottom:6px; display:block;'

const S = {
  q5: `<span style="${labelStyle}">Use the table below to answer the question that follows.</span>
<table style="${tableStyle}">
  <thead><tr>
    <th style="${thStyle}">Row</th>
    <th style="${thStyle}">Word</th>
    <th style="${thStyle}">Number of Phonemes Listed</th>
  </tr></thead>
  <tbody>
    <tr><td style="${tdStyle}">1</td><td style="${tdStyle}">bright</td><td style="${tdStyle}">4</td></tr>
    <tr><td style="${tdAltStyle}">2</td><td style="${tdAltStyle}">cloth</td><td style="${tdAltStyle}">5</td></tr>
    <tr><td style="${tdStyle}">3</td><td style="${tdStyle}">phone</td><td style="${tdStyle}">4</td></tr>
    <tr><td style="${tdAltStyle}">4</td><td style="${tdAltStyle}">twelve</td><td style="${tdAltStyle}">6</td></tr>
  </tbody>
</table>`,

  q11: `<span style="${labelStyle}">Use the oral reading fluency data below to answer the question that follows.</span>
<table style="${tableStyle}">
  <thead><tr>
    <th style="${thStyle}">Week</th>
    <th style="${thStyle}">Words Read Correctly</th>
    <th style="${thStyle}">Errors</th>
    <th style="${thStyle}">Rate (WCPM)</th>
  </tr></thead>
  <tbody>
    <tr><td style="${tdStyle}">1</td><td style="${tdStyle}">68</td><td style="${tdStyle}">12</td><td style="${tdStyle}">68</td></tr>
    <tr><td style="${tdAltStyle}">2</td><td style="${tdAltStyle}">75</td><td style="${tdAltStyle}">8</td><td style="${tdAltStyle}">75</td></tr>
    <tr><td style="${tdStyle}">3</td><td style="${tdStyle}">74</td><td style="${tdStyle}">9</td><td style="${tdStyle}">74</td></tr>
  </tbody>
</table>`,

  q16: `<div style="border:1px solid #aaa; padding:14px 16px; background:#fdfcfb; font-style:italic; font-size:14px; line-height:1.75; border-radius:4px;">
  The last peach of summer hung from the tree. Grandma Rosa called it stubborn, but Delia thought it was brave. Every morning, she walked the dirt path just to look at it. Some mornings, the wind shook the other branches hard. The peach held on.
</div>`,

  q18: `<span style="${labelStyle}">Use the table below to answer the question that follows.</span>
<table style="${tableStyle}">
  <thead><tr>
    <th style="${thStyle}">Text Feature</th>
    <th style="${thStyle}; text-align:center;">Student A Found It</th>
    <th style="${thStyle}; text-align:center;">Student B Found It</th>
  </tr></thead>
  <tbody>
    <tr><td style="${tdStyle}">Bold headings</td><td style="${tdStyle}; text-align:center;">Yes</td><td style="${tdStyle}; text-align:center;">Yes</td></tr>
    <tr><td style="${tdAltStyle}">Diagram with labels</td><td style="${tdAltStyle}; text-align:center;">Yes</td><td style="${tdAltStyle}; text-align:center;">No</td></tr>
    <tr><td style="${tdStyle}">Glossary</td><td style="${tdStyle}; text-align:center;">No</td><td style="${tdStyle}; text-align:center;">Yes</td></tr>
    <tr><td style="${tdAltStyle}">Captions under photos</td><td style="${tdAltStyle}; text-align:center;">Yes</td><td style="${tdAltStyle}; text-align:center;">Yes</td></tr>
    <tr><td style="${tdStyle}">Sidebar</td><td style="${tdStyle}; text-align:center;">No</td><td style="${tdStyle}; text-align:center;">No</td></tr>
  </tbody>
</table>`,

  q22: `<span style="${labelStyle}">Use the running record below to answer the question that follows.</span>
<table style="${tableStyle}">
  <thead><tr>
    <th style="${thStyle}; width:8%;">Sent.</th>
    <th style="${thStyle}; width:44%;">Text</th>
    <th style="${thStyle}; width:48%;">Student Read</th>
  </tr></thead>
  <tbody>
    <tr>
      <td style="${tdStyle}">1</td>
      <td style="${tdStyle}">The big dog ran down the hill.</td>
      <td style="${tdStyle}">The big dog ran down the hill.</td>
    </tr>
    <tr>
      <td style="${tdAltStyle}">2</td>
      <td style="${tdAltStyle}">She stopped and looked at the sky.</td>
      <td style="${tdAltStyle}">She stopp— stopped and look— looked at the sky.</td>
    </tr>
    <tr>
      <td style="${tdStyle}">3</td>
      <td style="${tdStyle}">The wind made the leaves shake and spin.</td>
      <td style="${tdStyle}">The wind made the leaves shake and spin.</td>
    </tr>
    <tr>
      <td style="${tdAltStyle}">4</td>
      <td style="${tdAltStyle}">A tiny bird sat on the highest branch.</td>
      <td style="${tdAltStyle}">A tiny bird sat on the hig— high branch.</td>
    </tr>
    <tr>
      <td style="${tdStyle}">5</td>
      <td style="${tdStyle}">It sang a long, sweet song for the whole forest.</td>
      <td style="${tdStyle}">It sang a long, sweet song for the who— whole forest.</td>
    </tr>
  </tbody>
</table>`,
}

// ─── Questions ─────────────────────────────────────────────────────────────────

const questions = [

  // ── SUBAREA I — Foundations of Reading Development (11 questions) ──

  // Q1 — Obj 1, Easy, Answer: B
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy',
    correctAnswer: 'B',
    questionText: 'Which of the following tasks represents the most foundational level of phonological awareness?',
    options: [
      { label: 'A', text: 'Deleting the first phoneme from a spoken word to produce a new word' },
      { label: 'B', text: 'Clapping to count the number of syllables in a spoken word' },
      { label: 'C', text: 'Segmenting all individual phonemes in a spoken word' },
      { label: 'D', text: 'Substituting a medial vowel sound to form a new spoken word' },
    ],
    explanation: 'Syllable awareness is the most foundational and earliest-developing level of phonological awareness. Phoneme deletion (A), full phoneme segmentation (C), and phoneme substitution (D) are all more complex skills that develop later along the phonological awareness continuum, requiring manipulation of individual phonemes rather than whole syllable units.',
  },

  // Q2 — Obj 1, Medium, Answer: A
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium',
    correctAnswer: 'A',
    questionText: 'A kindergarten teacher says a word aloud and asks students to raise a finger for each sound they hear, one at a time, while counting silently. Which phonemic awareness skill does this activity primarily develop?',
    options: [
      { label: 'A', text: 'Phoneme segmentation' },
      { label: 'B', text: 'Phoneme blending' },
      { label: 'C', text: 'Onset-rime identification' },
      { label: 'D', text: 'Syllable counting' },
    ],
    explanation: 'The activity requires students to isolate and track each individual phoneme in sequence — the definition of phoneme segmentation. Phoneme blending (B) involves combining separately spoken sounds into a whole word, the reverse task. Onset-rime identification (C) is a word-level task dividing the initial consonant from the vowel-and-remainder. Syllable counting (D) operates at the syllable level, not the individual phoneme level.',
  },

  // Q3 — Obj 1, Easy, Answer: C
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy',
    correctAnswer: 'C',
    questionText: 'A teacher says the individual sounds /m/ — /ā/ — /p/ and asks students to put the sounds together to say the whole word. This activity primarily builds students\' ability to:',
    options: [
      { label: 'A', text: 'Segment a spoken word into its individual phonemes' },
      { label: 'B', text: 'Delete phonemes from the beginning of spoken words' },
      { label: 'C', text: 'Blend separately spoken phonemes into a recognizable word' },
      { label: 'D', text: 'Identify the number of phonemes in a spoken word' },
    ],
    explanation: 'When a teacher presents sounds in isolation and students combine them into a whole word (map), that is phoneme blending. Segmentation (A) is the reverse — breaking a whole word into its parts. Phoneme deletion (B) requires removing a sound from a word. Phoneme counting/identification (D) requires recognizing how many sounds are present, not combining them.',
  },

  // Q4 — Obj 1, Medium, Answer: D
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium',
    correctAnswer: 'D',
    questionText: 'A first-grade teacher uses a sound board with colored dots to have students tap a dot for each phoneme as they stretch out a word. A student completes this accurately with two-phoneme words but makes consistent errors when words end in a consonant blend (e.g., past, jump). Which skill gap most directly explains this difficulty?',
    options: [
      { label: 'A', text: 'Identifying the vowel sound in a closed syllable' },
      { label: 'B', text: 'Recognizing high-frequency words by sight' },
      { label: 'C', text: 'Applying the alphabetic principle to decode words in print' },
      { label: 'D', text: 'Segmenting and holding in memory each phoneme in words with final consonant blends' },
    ],
    explanation: 'The student\'s errors appear specifically in words ending in consonant blends — which require holding three or more phonemes in working memory and distinguishing closely adjacent sounds like /n/ and /t/ in "past." This isolates phoneme segmentation with final blends as the gap. Vowel identification (A) would cause errors across all phoneme positions, not just blends. Sight word recognition (B) and the alphabetic principle (C) are print-based skills, not oral phonemic awareness tasks.',
  },

  // Q5 — Obj 2, Medium, Answer: A — TABLE STIMULUS
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    correctAnswer: 'A',
    stimulus: S.q5,
    questionText: 'In which row is the word accurately matched to its number of phonemes?',
    options: [
      { label: 'A', text: 'Row 1' },
      { label: 'B', text: 'Row 2' },
      { label: 'C', text: 'Row 3' },
      { label: 'D', text: 'Row 4' },
    ],
    explanation: '"bright" contains exactly 4 phonemes: /b/, /r/, /ī/, /t/ — the "igh" vowel team represents one phoneme. Row 2 is incorrect: "cloth" has 4 phonemes (/k/ /l/ /ŏ/ /th/), not 5. Row 3 is incorrect: "phone" has 3 phonemes (/f/ /ō/ /n/), not 4. Row 4 is incorrect: "twelve" has 5 phonemes (/t/ /w/ /ĕ/ /l/ /v/), not 6. A common error is counting letters instead of sounds.',
  },

  // Q6 — Obj 2, Medium, Answer: B
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium',
    correctAnswer: 'B',
    questionText: 'According to evidence-based principles of systematic phonics instruction, which letter-sound relationship should a first-grade teacher introduce earliest in the school year?',
    options: [
      { label: 'A', text: 'The silent-e pattern in words such as cape and ride' },
      { label: 'B', text: 'Short vowel /a/ in CVC words using high-utility consonants' },
      { label: 'C', text: 'Consonant digraphs such as sh, ch, and wh' },
      { label: 'D', text: 'r-controlled vowel patterns such as ar, or, and er' },
    ],
    explanation: 'Systematic phonics instruction begins with the most frequent and predictable patterns. Short-vowel CVC words using high-utility consonants (e.g., sat, map, tan) are introduced first because they allow students to read decodable text immediately. Silent-e (A), digraphs (C), and r-controlled vowels (D) are more complex patterns taught progressively later — each builds on the shorter, simpler consonant-vowel-consonant foundation.',
  },

  // Q7 — Obj 2, Hard, Answer: C
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard',
    correctAnswer: 'C',
    questionText: 'A second-grade teacher notices that a student consistently spells watch as "wach," match as "mach," and kitchen as "kichen." These spelling errors suggest the student would most benefit from targeted instruction in which of the following?',
    options: [
      { label: 'A', text: 'The vowel-consonant-e (VCe) long-vowel pattern' },
      { label: 'B', text: 'Long-vowel sounds in words with vowel teams' },
      { label: 'C', text: 'Trigraph patterns and their use in English orthography' },
      { label: 'D', text: 'Using context clues to monitor word reading accuracy' },
    ],
    explanation: 'Each error shows the student capturing the correct consonant sounds but omitting the -tch trigraph — used after a short vowel in a one-syllable word (watch, match) and in the medial position of kitchen. This is a code-based gap in orthographic knowledge of the tch trigraph. VCe (A) and vowel teams (B) address long-vowel spelling patterns not present in these errors. Context clues (D) is a comprehension strategy unrelated to spelling at the phonics level.',
  },

  // Q8 — Obj 3, Easy, Answer: D
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'easy',
    correctAnswer: 'D',
    questionText: 'Which of the following correctly identifies the structural components of the word "displacement"?',
    options: [
      { label: 'A', text: '"dis-" is the base word modified by "-placement"' },
      { label: 'B', text: '"-ment" is the base word with two surrounding affixes' },
      { label: 'C', text: '"place" and "dis-" are both base words joined by "-ment"' },
      { label: 'D', text: '"place" is the base word modified by the prefix "dis-" and the suffix "-ment"' },
    ],
    explanation: 'In "displacement," the free morpheme (base word) is "place," which carries the core meaning. The prefix "dis-" reverses the meaning and the suffix "-ment" converts the verb to a noun. Options A and B incorrectly identify bound morphemes (affixes) as base words. Option C is incorrect because "dis-" is a prefix, not a base — it cannot stand alone as an independent word.',
  },

  // Q9 — Obj 3, Medium, Answer: A
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium',
    correctAnswer: 'A',
    questionText: 'A third-grade student encounters the word "unbreakable" and asks what it means. Which instructional approach would most effectively teach the student to determine the word\'s meaning independently?',
    options: [
      { label: 'A', text: 'Analyzing the prefix un-, the base word break, and the suffix -able to construct meaning' },
      { label: 'B', text: 'Substituting a synonym that fits the sentence context' },
      { label: 'C', text: 'Dividing the word into syllables and pronouncing each one' },
      { label: 'D', text: 'Looking up the word in a dictionary and reading the definition aloud' },
    ],
    explanation: 'Morphemic analysis — identifying and interpreting the prefix, base, and suffix — teaches a transferable word-learning strategy. "Un-" means not, "break" is the base, "-able" means capable of, yielding "not capable of being broken." Context substitution (B) does not build decoding independence. Syllabication (C) helps pronunciation but not meaning. Dictionary use (D) provides a definition but does not build independent word-analysis strategies that transfer to future unfamiliar words.',
  },

  // Q10 — Obj 4, Medium, Answer: B
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium',
    correctAnswer: 'B',
    questionText: 'A second-grade teacher wants to improve students\' oral reading fluency by increasing both rate and expression while maintaining accuracy. Which instructional approach is most directly supported by research on fluency development?',
    options: [
      { label: 'A', text: 'Timing students daily and rewarding the fastest reader each week' },
      { label: 'B', text: 'Having students reread the same passage multiple times with teacher modeling and feedback' },
      { label: 'C', text: 'Assigning 20 new vocabulary words weekly from grade-level texts' },
      { label: 'D', text: 'Providing a new independent-level text each day for silent reading' },
    ],
    explanation: 'Repeated reading with explicit teacher modeling and feedback is among the most well-researched fluency interventions. Rereading the same passage moves students from labored decoding toward automaticity, freeing cognitive resources for expression and comprehension. Speed-only competitions (A) can sacrifice accuracy and prosody. Vocabulary instruction (C) supports comprehension but does not directly develop rate or phrasing. Silent independent reading (D) builds volume but lacks the corrective feedback loop that develops fluency in struggling readers.',
  },

  // Q11 — Obj 4, Hard, Answer: C — TABLE STIMULUS
  {
    examCode: '190',
    subarea: 'I',
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard',
    correctAnswer: 'C',
    stimulus: S.q11,
    questionText: 'A third-grade teacher administers oral reading fluency probes on the same 100-word passage over three consecutive weeks. Based on the data, which conclusion best describes the student\'s development and the most appropriate instructional response?',
    options: [
      { label: 'A', text: 'The student has reached grade-level fluency and no longer needs intervention' },
      { label: 'B', text: 'Accuracy is too low for fluency work; phonics instruction should replace all fluency practice' },
      { label: 'C', text: 'Initial growth has plateaued; maintain repeated reading with added feedback on phrasing and expression' },
      { label: 'D', text: 'The accuracy drop from Week 2 to Week 3 indicates a reading disability requiring formal evaluation' },
    ],
    explanation: 'The data shows improvement from Week 1 to Week 2 (68 to 75 WCPM with fewer errors) followed by a plateau in Week 3. This pattern suggests the student is responding to instruction but has stalled — the appropriate response is to maintain repeated reading while adding explicit phrasing and prosody feedback to push past the plateau. Option A is incorrect: 74–75 WCPM is well below the third-grade benchmark (~90–110 WCPM). Option B is incorrect: 89–91% accuracy is within the instructional range for fluency work. Option D overinterprets a single-week variation as a disability indicator — formal evaluation requires a broader process.',
  },

  // ── SUBAREA II — Development of Reading Comprehension (8 questions) ──

  // Q12 — Obj 5, Easy, Answer: D
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'easy',
    correctAnswer: 'D',
    questionText: 'Which of the following best describes Tier 2 vocabulary words, as defined by Beck, McKeown, and Kucan\'s three-tier framework?',
    options: [
      { label: 'A', text: 'Simple, familiar words typically learned through everyday conversation (e.g., happy, run, house)' },
      { label: 'B', text: 'Specialized domain-specific terms used primarily in one subject area (e.g., photosynthesis, denominator)' },
      { label: 'C', text: 'Archaic words that appear only in literary or historical texts (e.g., henceforth, thou)' },
      { label: 'D', text: 'High-frequency academic words used across multiple content areas (e.g., analyze, significant, interpret)' },
    ],
    explanation: 'Tier 2 words are high-utility academic words that appear across subjects and genres but are unlikely to be acquired through casual conversation — words like "analyze," "significant," and "interpret." Tier 1 words (A) are basic, everyday words young children typically know. Tier 3 words (B) are domain-specific and content-area terms. Archaic register (C) does not correspond to any tier in the Beck et al. framework.',
  },

  // Q13 — Obj 5, Medium, Answer: B
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium',
    correctAnswer: 'B',
    questionText: 'A fifth-grade teacher wants to build students\' deep understanding of the word "infer" before reading a social studies article. Which instructional activity would most effectively develop this depth of word knowledge?',
    options: [
      { label: 'A', text: 'Copying the dictionary definition three times in vocabulary notebooks' },
      { label: 'B', text: 'Generating original sentences using "infer" in varied contexts and discussing how meaning shifts' },
      { label: 'C', text: 'Underlining every instance of the word "infer" in the assigned text' },
      { label: 'D', text: 'Replacing "infer" with a synonym throughout the text and reading the revised version' },
    ],
    explanation: 'Generating original sentences in multiple contexts requires active processing of the word\'s meaning and builds the flexible, generative word knowledge needed for independent application. Copying a definition (A) is a passive task producing shallow knowledge. Underlining occurrences (C) builds frequency awareness, not meaning depth. Synonym substitution (D) can produce imprecise replacements and does not develop a nuanced understanding of the original term.',
  },

  // Q14 — Obj 5, Medium, Answer: C
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium',
    correctAnswer: 'C',
    questionText: 'A fourth-grade student encounters "reluctant" in this sentence: "Even though the field trip sounded exciting, Maya was reluctant to get on the bus because she had never traveled so far from home." The teacher wants to teach a context clue strategy. Which approach best supports this goal?',
    options: [
      { label: 'A', text: 'Skip the word and continue to the end of the paragraph' },
      { label: 'B', text: 'Look the word up in the glossary at the back of the book' },
      { label: 'C', text: 'Identify the surrounding words and phrases that signal the word\'s meaning' },
      { label: 'D', text: 'Break the word into syllables to determine its pronunciation' },
    ],
    explanation: 'The sentence contains explicit context clues ("even though the trip sounded exciting" and "she had never traveled so far from home") that signal hesitation or unwillingness. Teaching students to identify and use these surrounding clues builds a transferable word-meaning strategy. Skipping (A) avoids rather than develops a strategy. Glossary use (B) provides a definition but does not build contextual reasoning. Syllabication (D) supports pronunciation, not meaning inference.',
  },

  // Q15 — Obj 6, Easy, Answer: A
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'easy',
    correctAnswer: 'A',
    questionText: 'Which of the following best describes the primary purpose of teaching students to identify the narrator\'s point of view in a work of fiction?',
    options: [
      { label: 'A', text: 'To understand how the narrator\'s perspective shapes what is revealed and how events are interpreted' },
      { label: 'B', text: 'To evaluate the factual accuracy of events described in the text' },
      { label: 'C', text: 'To memorize the sequence of plot events in the correct order' },
      { label: 'D', text: 'To identify the main topic and supporting details of the work' },
    ],
    explanation: 'Point of view shapes what the narrator knows, chooses to share, and how events are framed — understanding this helps readers think critically about whose perspective is centered and what information may be limited or withheld. Factual accuracy (B) is relevant to informational texts, not literary fiction. Plot sequence (C) is a recall task, not a perspective analysis. Main topic and supporting details (D) is an informational text skill.',
  },

  // Q16 — Obj 6, Hard, Answer: D — TEXT BLOCK STIMULUS
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    correctAnswer: 'D',
    stimulus: S.q16,
    questionText: 'A fifth-grade teacher uses this passage to teach literary analysis. Which question would most effectively prompt students to analyze how the author uses word choice to reveal contrasting character perspectives?',
    options: [
      { label: 'A', text: '"What time of year does this story take place, and how do you know?"' },
      { label: 'B', text: '"What does the word stubborn mean, and what is a synonym for it?"' },
      { label: 'C', text: '"Where is the peach located in the story, and what does it look like?"' },
      { label: 'D', text: '"Why might Grandma Rosa describe the peach as stubborn while Delia calls it brave, and what does each word reveal about how each character views persistence?"' },
    ],
    explanation: 'Option D asks students to compare two characters\' word choices for the same object and analyze what each word reveals about the character\'s worldview — this is characterization through diction, a central literary analysis skill. Option A targets setting inference, not characterization. Option B is a vocabulary task that does not connect the word to character perspective. Option C asks for literal description and location, not the analytical contrast of two characters\' perspectives.',
  },

  // Q17 — Obj 7, Medium, Answer: B
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    correctAnswer: 'B',
    questionText: 'A third-grade teacher is helping students identify the organizational structure of an informational text that explains what triggers hurricanes, what damage they produce, and how communities respond to that damage. Which text structure does this passage most clearly represent?',
    options: [
      { label: 'A', text: 'Chronological sequence' },
      { label: 'B', text: 'Cause and effect' },
      { label: 'C', text: 'Compare and contrast' },
      { label: 'D', text: 'Problem and solution' },
    ],
    explanation: 'The passage is organized around causes (what triggers hurricanes), effects (the damage produced), and responses (community preparation in response to those effects) — the defining structure of cause and effect. Chronological sequence (A) orders events by time. Compare and contrast (C) examines similarities and differences between two or more subjects. Problem and solution (D) identifies a problem and proposes remedies; while related, the passage explains the mechanism and impact rather than framing hurricanes as a problem to solve.',
  },

  // Q18 — Obj 7, Medium, Answer: C — TABLE STIMULUS
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    correctAnswer: 'C',
    stimulus: S.q18,
    questionText: 'A fourth-grade teacher asks two students to identify the text features present in the same informational science article. Based on the data in the table, which conclusion is best supported?',
    options: [
      { label: 'A', text: 'Both students correctly identified every text feature present in the article' },
      { label: 'B', text: 'Student B\'s reading comprehension is stronger than Student A\'s' },
      { label: 'C', text: 'Student B identified a text feature that Student A did not notice' },
      { label: 'D', text: 'The article contains no text features beyond bold headings and photo captions' },
    ],
    explanation: 'The table clearly shows Student B found the glossary while Student A did not, directly and specifically supporting C. Option A is incorrect: each student missed at least one feature the other identified. Option B incorrectly equates text feature awareness with reading comprehension depth — the two are related but not equivalent. Option D is directly contradicted by the table, which lists five feature types, at least three of which were identified by students.',
  },

  // Q19 — Obj 7, Medium, Answer: A
  {
    examCode: '190',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    correctAnswer: 'A',
    questionText: 'A fifth-grade teacher wants students to monitor their own understanding while reading a complex informational text about the water cycle. Which strategy would most directly support this goal?',
    options: [
      { label: 'A', text: 'Stopping at each section to summarize key ideas in their own words and record any points of confusion' },
      { label: 'B', text: 'Reading the full text once and then answering comprehension questions at the end' },
      { label: 'C', text: 'Highlighting every new vocabulary word encountered in the text' },
      { label: 'D', text: 'Reading only the headings and captions before writing a full-text summary' },
    ],
    explanation: 'Stopping at section breaks to paraphrase and flag confusion is a metacognitive self-monitoring strategy — students evaluate their own understanding in real time and identify where comprehension breaks down. End-of-text questions (B) assess comprehension after reading, not during, so they do not build monitoring habits. Vocabulary highlighting (C) builds word awareness but not comprehension monitoring. Reading only headings (D) previews structure but does not develop active monitoring during deep reading of body text.',
  },

  // ── SUBAREA III — Reading Assessment and Instruction (6 questions) ──

  // Q20 — Obj 8, Easy, Answer: D
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'easy',
    correctAnswer: 'D',
    questionText: 'A first-grade teacher administers a brief reading assessment to all students at the beginning of the school year to identify those who may be at risk for reading difficulties before instruction begins. This type of assessment is best described as:',
    options: [
      { label: 'A', text: 'A diagnostic assessment' },
      { label: 'B', text: 'A summative assessment' },
      { label: 'C', text: 'A progress monitoring assessment' },
      { label: 'D', text: 'A universal screener' },
    ],
    explanation: 'A universal screener is administered to all students at the start of an instructional period to identify those who may need additional support — before difficulties escalate. Diagnostic assessments (A) are used after a student has been identified as at-risk to pinpoint specific skill deficits. Summative assessments (B) evaluate learning at the end of an instructional unit or year. Progress monitoring assessments (C) are administered repeatedly over time to track a student\'s response to ongoing intervention.',
  },

  // Q21 — Obj 8, Medium, Answer: B
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium',
    correctAnswer: 'B',
    questionText: 'A reading interventionist monitors a second-grade student\'s oral reading fluency every two weeks. After eight weeks, the scores are: 42, 45, 43, and 49 WCPM. Which conclusion is most appropriate based on this data pattern?',
    options: [
      { label: 'A', text: 'The student has met grade-level benchmarks and should exit the intervention' },
      { label: 'B', text: 'The student shows slow, inconsistent growth; the intervention should be reviewed for sufficient intensity' },
      { label: 'C', text: 'The data indicates no measurable growth, confirming the student has a reading disability' },
      { label: 'D', text: 'Eight weeks of data is insufficient to draw any conclusions; collection should continue unchanged' },
    ],
    explanation: 'The scores show an upward trend (42 to 49 WCPM) with one mid-period dip, indicating some but inconsistent growth. Eight weeks of limited progress warrants examining whether the intervention intensity, frequency, or focus needs adjustment. Option A is incorrect: 49 WCPM is well below the second-grade benchmark of approximately 90 WCPM. Option C overinterprets inconsistent progress as a disability — formal identification requires comprehensive evaluation, not a data trend alone. Option D is too passive; eight data points over eight weeks is sufficient to make instructional decisions.',
  },

  // Q22 — Obj 8, Hard, Answer: C — TABLE STIMULUS
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    correctAnswer: 'C',
    stimulus: S.q22,
    questionText: 'A first-grade teacher takes a running record as a student reads a grade-level text aloud. Based on the running record, which conclusion best describes the student\'s reading behavior and its instructional implication?',
    options: [
      { label: 'A', text: 'The student is reading at frustrational level and needs immediate placement in easier text' },
      { label: 'B', text: 'The student is using sight word recall to decode multi-syllabic words automatically' },
      { label: 'C', text: 'The student is applying phonics strategies and self-monitoring, indicating a developing decoder' },
      { label: 'D', text: 'The student has mastered all phonics patterns and is ready for comprehension-focused instruction' },
    ],
    explanation: 'The student\'s self-corrections — stopping mid-word, attempting again, and arriving at the correct pronunciation — are hallmarks of active self-monitoring and phonics application, behaviors that indicate a developing decoder using letter-sound knowledge. Option A is incorrect: self-correction attempts signal the student is in the instructional range, not the frustrational range. Option B is incorrect: sounding out in segments (hig—, who—) is phonics decoding, not automatic sight word retrieval. Option D is incorrect: errors on multi-syllabic and complex words indicate phonics skills are still developing.',
  },

  // Q23 — Obj 9, Medium, Answer: A
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium',
    correctAnswer: 'A',
    questionText: 'In a multi-tiered system of supports (MTSS) for reading, which of the following best describes the purpose of Tier 2 intervention?',
    options: [
      { label: 'A', text: 'Targeted, small-group supplemental instruction for students who do not respond adequately to core instruction alone' },
      { label: 'B', text: 'A replacement for core classroom instruction for students significantly below grade level' },
      { label: 'C', text: 'Daily one-on-one intensive intervention for students with identified reading disabilities' },
      { label: 'D', text: 'Enrichment activities for students who have already met all grade-level benchmarks' },
    ],
    explanation: 'Tier 2 provides supplemental support in small groups for students whose needs exceed what core instruction (Tier 1) alone can address. Critically, it supplements — not replaces (B) — core classroom instruction. Daily one-on-one intensive intervention (C) describes Tier 3 support, which is reserved for students who do not respond to Tier 2. Enrichment for students meeting benchmarks (D) is not part of the tiered intervention system.',
  },

  // Q24 — Obj 9, Medium, Answer: D
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium',
    correctAnswer: 'D',
    questionText: 'A second-grade teacher has students reading at significantly different levels. During guided reading, which grouping approach is most consistent with evidence-based differentiated instruction?',
    options: [
      { label: 'A', text: 'Permanent heterogeneous groups so stronger readers can model for struggling peers' },
      { label: 'B', text: 'Fixed ability groups maintained all year to simplify lesson planning' },
      { label: 'C', text: 'Whole-class instruction using grade-level text with oral summaries for struggling readers' },
      { label: 'D', text: 'Flexible, needs-based small groups revised regularly as assessment data changes' },
    ],
    explanation: 'Flexible grouping based on current assessment data is the foundation of differentiated guided reading — groups shift as students grow, preventing stigmatization and ensuring instruction matches current skill levels. Permanent heterogeneous groups (A) support social-emotional goals but are less effective for targeted skill instruction. Fixed ability groups (B) do not respond to student growth and can reinforce inequity. Whole-class same-text instruction (C) does not meet the instructional needs of students reading significantly above or below grade level.',
  },

  // Q25 — Obj 9, Hard, Answer: B
  {
    examCode: '190',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard',
    correctAnswer: 'B',
    questionText: 'A third-grade student receiving Tier 2 small-group intervention has shown no measurable growth in oral reading fluency after 10 weeks of repeated reading, decodable text practice, and phonics review. Which next step is most consistent with evidence-based practice?',
    options: [
      { label: 'A', text: 'Continue the current intervention unchanged for another 10 weeks before making any adjustments' },
      { label: 'B', text: 'Conduct a targeted diagnostic assessment to identify specific skill deficits, then intensify or adjust the intervention' },
      { label: 'C', text: 'Immediately refer the student for special education evaluation and discontinue the current intervention' },
      { label: 'D', text: 'Shift to an independent reading program and reduce the amount of direct instruction' },
    ],
    explanation: 'When a student shows no growth after a reasonable intervention period, evidence-based practice calls for deeper diagnostic investigation to identify the specific skill breakdown — then adjusting or intensifying accordingly. Continuing the same approach unchanged (A) violates the data-driven instruction principle. Immediate special education referral (C) is premature; diagnostic assessment and documented intervention adjustment must precede formal evaluation. Reducing direct instruction (D) contradicts best practice for a non-responding student, who requires more intensive support, not less.',
  },

]

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log('Connected.')

  // ── Validation gate ──────────────────────────────────────────────────────────
  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  const diffDist: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
  for (const q of questions) {
    dist[q.correctAnswer] = (dist[q.correctAnswer] || 0) + 1
    diffDist[q.difficulty] = (diffDist[q.difficulty] || 0) + 1
  }
  const total = questions.length
  for (const [letter, count] of Object.entries(dist)) {
    const pct = (count / total) * 100
    if (pct > 35 || pct < 15) {
      console.error(`BLOCKED: Answer ${letter} is ${pct.toFixed(1)}% (must be 15–35%). Fix before inserting.`)
      console.log('Distribution:', dist)
      await mongoose.disconnect()
      return
    }
  }
  for (let i = 0; i <= questions.length - 4; i++) {
    if (
      questions[i].correctAnswer === questions[i + 1].correctAnswer &&
      questions[i].correctAnswer === questions[i + 2].correctAnswer &&
      questions[i].correctAnswer === questions[i + 3].correctAnswer
    ) {
      console.error(`BLOCKED: 4+ consecutive "${questions[i].correctAnswer}" answers starting at Q${i + 1}.`)
      await mongoose.disconnect()
      return
    }
  }
  console.log('Answer distribution:', dist)
  console.log('Difficulty distribution:', diffDist)

  // ── Abort if diagnostic already exists ──────────────────────────────────────
  const existing = await PracticeTest.findOne({ examCode: '190', isDiagnostic: true })
  if (existing) {
    console.error('Diagnostic PracticeTest for 190 already exists. Aborting.')
    await mongoose.disconnect()
    return
  }

  // ── Insert questions ─────────────────────────────────────────────────────────
  const inserted = await Question.insertMany(questions)
  console.log(`Inserted ${inserted.length} diagnostic questions.`)

  // ── Count by subarea ─────────────────────────────────────────────────────────
  const subareaMap: Record<string, number> = {}
  for (const q of inserted) {
    const s = (q as any).subarea as string
    subareaMap[s] = (subareaMap[s] || 0) + 1
  }

  // ── Create PracticeTest document ─────────────────────────────────────────────
  const test = await PracticeTest.create({
    examCode: '190',
    testNumber: 0,
    name: 'Diagnostic Practice Test',
    isDiagnostic: true,
    questionIds: inserted.map((q) => q._id),
    timeLimitMinutes: 45,
    subareaDistribution: Object.entries(subareaMap).map(([subarea, count]) => ({ subarea, count })),
    isPublished: true,
  })

  console.log(`Created PracticeTest: ${test._id} (${test.name})`)
  console.log('Subarea distribution:', subareaMap)
  console.log('Done.')
  await mongoose.disconnect()
}

main().catch(console.error)
