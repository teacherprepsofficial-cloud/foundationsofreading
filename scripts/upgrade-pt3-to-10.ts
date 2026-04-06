/**
 * PT3 Upgrade — 40 question rewrites targeting 10/10 quality
 * Techniques used:
 *   - Multi-stimulus questions with tables and data scenarios
 *   - Clinical decision-making ("what next?") replacing label-drop questions
 *   - Distractor surgery: all wrong options represent plausible expert-level mistakes
 *   - Sequence/priority questions ("first," "most appropriate next step")
 *   - Naturally distributed correct answers: 10A / 10B / 10C / 10D
 *
 * Run: npx tsx scripts/upgrade-pt3-to-10.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

// Position → ID mapping (from get-pt3-ids.ts output)
const IDS: Record<number, string> = {
  1:  '69cfeeabecad19198e7eb446',
  2:  '69cfeeabecad19198e7eb447',
  5:  '69cfeeabecad19198e7eb44a',
  6:  '69cfeeabecad19198e7eb44b',
  8:  '69cfeeabecad19198e7eb44d',
  9:  '69cfeeabecad19198e7eb44e',
  11: '69cfeeabecad19198e7eb450',
  13: '69cfeeabecad19198e7eb452',
  14: '69cfeeabecad19198e7eb453',
  16: '69cfeeabecad19198e7eb455',
  19: '69cfeeabecad19198e7eb458',
  21: '69cfeeabecad19198e7eb45a',
  22: '69cfeeabecad19198e7eb45b',
  25: '69cfeeabecad19198e7eb45e',
  29: '69cfeeabecad19198e7eb462',
  34: '69cfeeabecad19198e7eb467',
  37: '69cfeeabecad19198e7eb46a',
  39: '69cfeeabecad19198e7eb46c',
  40: '69cfeeabecad19198e7eb46d',
  45: '69cfeeabecad19198e7eb472',
  50: '69cfeeabecad19198e7eb477',
  52: '69cfeeabecad19198e7eb479',
  53: '69cfeeabecad19198e7eb47a',
  57: '69cfeeabecad19198e7eb47e',
  61: '69cfeeabecad19198e7eb482',
  64: '69cfeeabecad19198e7eb485',
  67: '69cfeeabecad19198e7eb488',
  68: '69cfeeabecad19198e7eb489',
  70: '69cfeeabecad19198e7eb48b',
  72: '69cfeeabecad19198e7eb48d',
  73: '69cfeeabecad19198e7eb48e',
  82: '69cfeeabecad19198e7eb497',
  78: '69cfeeabecad19198e7eb493',
  81: '69cfeeabecad19198e7eb496',
  83: '69cfeeabecad19198e7eb498',
  85: '69cfeeabecad19198e7eb49a',
  86: '69cfeeabecad19198e7eb49b',
  89: '69cfeeabecad19198e7eb49e',
  94: '69cfeeabecad19198e7eb4a3',
  99: '69cfeeabecad19198e7eb4a8',
}

type Opt = { label: string; text: string }
type Rewrite = {
  pos: number
  questionText: string
  options: Opt[]
  correctAnswer: string
  explanation: string
}

// ─── 40 REWRITES ─────────────────────────────────────────────────────────────
// Target distribution: 10A / 10B / 10C / 10D
// A: Q2, Q5, Q13, Q21, Q29, Q39, Q45, Q52, Q64, Q72
// B: Q1, Q8, Q11, Q14, Q25, Q40, Q53, Q70, Q78, Q85
// C: Q6, Q16, Q22, Q37, Q50, Q57, Q68, Q81, Q83, Q86
// D: Q9, Q19, Q34, Q61, Q67, Q73, Q82, Q89, Q94, Q99

const rewrites: Rewrite[] = [

// ══════════════════════════════════════════════════════════════════
// SUBAREA I — Obj 0001 (Phonological Awareness)
// ══════════════════════════════════════════════════════════════════

// Q1 → B (clinical: PA screener data → what to teach next)
{
  pos: 1,
  questionText: `A kindergarten teacher administers a brief phonological awareness screener. A student correctly identifies and produces rhyming pairs and accurately counts syllables in spoken words, but consistently fails every phoneme isolation task. Based on the phonological awareness developmental continuum, which instructional objective should the teacher address next?`,
  options: [
    { label: 'A', text: 'Continue daily rhyme production practice until the student reaches 90% accuracy before progressing' },
    { label: 'B', text: 'Introduce phoneme isolation tasks, beginning with identifying the initial sound in CVC words' },
    { label: 'C', text: 'Move directly to phoneme deletion tasks using words with initial consonant blends' },
    { label: 'D', text: 'Begin phoneme blending activities since blending is a prerequisite for phoneme isolation' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. The phonological awareness continuum progresses from larger to smaller units: word awareness → syllable awareness → rhyme → onset-rime → phoneme-level skills. This student has mastered rhyme and syllable tasks, so the appropriate next step is the least demanding phoneme-level skill — phoneme isolation beginning with initial sounds in simple CVC words. Option A is incorrect because the student has already demonstrated rhyme mastery; repeating a mastered skill delays progress toward the identified phoneme-level gap. Option C is incorrect because phoneme deletion with consonant blends is among the most demanding phonemic awareness tasks and is not developmentally appropriate before phoneme isolation is established. Option D is incorrect because phoneme isolation precedes blending on the developmental continuum; students must first identify individual phonemes before combining them.`,
},

// Q2 → A (MULTI-STIMULUS: PA assessment table — who shows a gap?)
{
  pos: 2,
  questionText: `A first-grade teacher conducts individual phonemic awareness assessments. The results are recorded below.\n\nStudent | Task | Student's Response\nMaya | Count phonemes in "ship" | Taps 4 times\nDeShawn | Blend /s/ /n/ /æ/ /p/ into a word | Says "snap"\nPriya | Segment "cat" into phonemes | Says /k/ /æ/ /t/\nCaleb | Delete /t/ from "stop" | Says "sop"\n\nWhich student's performance indicates a phonemic awareness gap?`,
  options: [
    { label: 'A', text: 'Maya — "ship" contains 3 phonemes (/ʃ/ /ɪ/ /p/), but Maya tapped 4, likely treating the digraph "sh" as two separate sounds' },
    { label: 'B', text: 'DeShawn — blending /s/ /n/ /æ/ /p/ into "snap" does not represent accurate phoneme blending' },
    { label: 'C', text: 'Priya — segmenting "cat" as /k/ /æ/ /t/ is an error because "cat" has only two phonemes' },
    { label: 'D', text: 'Caleb — deleting /t/ from "stop" should produce "top," not "sop," making this an error' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. The word "ship" contains exactly 3 phonemes: /ʃ/ (the digraph "sh" represents one phoneme), /ɪ/, and /p/. Maya tapped 4 times, indicating she is treating "sh" as two separate sounds (/s/ and /h/). This error reveals both a phoneme-counting gap and a gap in understanding consonant digraphs as single phoneme units. Option B is incorrect because blending /s/ /n/ /æ/ /p/ → "snap" is an accurate phoneme blending response. Option C is incorrect because /k/ /æ/ /t/ is the correct three-phoneme segmentation of "cat"; Priya's performance is accurate. Option D is incorrect because removing /t/ from "stop" (/s/ /t/ /ɒ/ /p/) correctly yields /s/ /ɒ/ /p/ = "sop"; Caleb's response is accurate.`,
},

// Q5 → A (clinical: student struggles with blending; which activity targets it?)
{
  pos: 5,
  questionText: `A kindergarten teacher reviews screener data showing that a student has mastered rhyme recognition and syllable segmentation but cannot isolate the initial phoneme of a CVC word and cannot blend separately spoken phonemes into a whole word. Which instructional activity would most directly address this student's specific phoneme-level gap?`,
  options: [
    { label: 'A', text: 'Using Elkonin sound boxes to have the student push one chip into the first box for the initial sound of a CVC word, building toward full phoneme segmentation' },
    { label: 'B', text: 'Continuing clapping activities with two- and three-syllable words to strengthen the syllable awareness foundation' },
    { label: 'C', text: 'Practicing rhyme production by generating words that rhyme with a given prompt' },
    { label: 'D', text: 'Using picture-card sorting tasks where students group words that start with the same syllable' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. The student has mastered syllable and rhyme tasks but cannot yet operate at the phoneme level. Elkonin sound boxes provide a concrete, scaffolded tool that maps each phoneme to a discrete space, beginning with the initial sound of simple CVC words. This directly targets phoneme isolation — the entry point for phoneme-level work — and builds toward full segmentation. Option B is incorrect because syllable clapping addresses a skill the student has already mastered; it does not target the identified phoneme-level gap. Option C is incorrect because rhyme production also represents a mastered skill; this instruction does not advance the student to phoneme awareness. Option D is incorrect because grouping words by initial syllable is a syllable-onset level task, not phoneme isolation; it would not develop the ability to identify and manipulate individual phonemes.`,
},

// Q6 → C (clinical: class data → sequence of objectives)
{
  pos: 6,
  questionText: `A kindergarten teacher reviews universal screener data: all 22 students can segment spoken sentences into words and accurately clap syllables, but fewer than half can isolate the initial phoneme in CVC words, and almost none can blend separately spoken phonemes into a word. Which sequence of instructional objectives is most appropriate for the whole class?`,
  options: [
    { label: 'A', text: 'Phoneme blending → phoneme isolation → phoneme segmentation, because blending is the most accessible entry point' },
    { label: 'B', text: 'Phoneme deletion → phoneme blending → phoneme isolation, because manipulation tasks build the necessary foundation' },
    { label: 'C', text: 'Phoneme isolation (initial sounds) → phoneme blending → phoneme segmentation, following the developmental continuum within phoneme-level skills' },
    { label: 'D', text: 'Phoneme segmentation → phoneme isolation → phoneme blending, because segmentation reveals the full phoneme structure of words' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. Within phoneme-level skills, the developmental continuum moves from simpler to more complex: phoneme isolation (identifying a single phoneme) → phoneme blending (combining spoken phonemes into a word) → phoneme segmentation (fully breaking a word into all its phonemes) → phoneme manipulation (deletion, substitution). Since the class data shows phoneme isolation is just emerging, the teacher should start there and build sequentially. Option A is incorrect because blending is more cognitively demanding than isolation; teaching blending before isolation is out of developmental sequence. Option B is incorrect because phoneme deletion is among the most advanced phonemic awareness tasks; placing it first would be developmentally inappropriate for students who cannot yet isolate initial sounds. Option D is incorrect because full phoneme segmentation requires the ability to identify and produce all phonemes in a word, which is more complex than isolation; beginning there would be premature.`,
},

// Q8 → B (clinical: which task assesses the highest level of the PA continuum?)
{
  pos: 8,
  questionText: `A kindergarten teacher wants to assess whether students have developed the highest level of phonological awareness — phoneme manipulation. Which task would best serve this assessment purpose?`,
  options: [
    { label: 'A', text: 'Identifying which word in a spoken set begins with a different initial sound from the others' },
    { label: 'B', text: 'Substituting the medial vowel in a CVC word to produce a new word when given an oral prompt' },
    { label: 'C', text: 'Listening to a teacher say a word slowly, phoneme by phoneme, and blending the sounds into a whole word' },
    { label: 'D', text: 'Counting the number of syllables in a spoken two-syllable compound word by clapping' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. Phoneme manipulation — which includes phoneme substitution, deletion, and transposition — is the most cognitively demanding level of the phonological awareness continuum. Substituting the medial vowel in a CVC word (e.g., "Change the /ɪ/ in 'sit' to /æ/. What new word do you have?") requires the student to hold the original word in working memory, identify the target phoneme by position, remove it, insert a new phoneme, and produce the result. Option A is incorrect because phoneme isolation (identifying the odd initial sound) is a phoneme-level skill but is considerably less demanding than manipulation; it is an earlier-developing phoneme task. Option C is incorrect because phoneme blending — combining spoken phonemes into a word — is a phoneme-level skill that precedes manipulation on the continuum. Option D is incorrect because syllable counting is a syllable-level task; it does not assess phoneme-level awareness at all.`,
},

// Q9 → D (concept of word in print — clinical print tracking scenario)
{
  pos: 9,
  questionText: `During shared reading, a kindergarten teacher recites a familiar nursery rhyme while pointing to each word. She asks a student to come up and point to each word as the class recites it. The student points accurately at "Jack" and "fell," but when the class says "and," the student sweeps past two printed words without pausing, staying one word behind for the rest of the line. Which emergent literacy concept is this student still developing?`,
  options: [
    { label: 'A', text: 'Left-to-right directionality, since the student is losing place while tracking across the line' },
    { label: 'B', text: 'Letter-sound correspondence, since the student cannot match the spoken word to its printed form' },
    { label: 'C', text: 'Phoneme segmentation, since the student cannot isolate individual sounds within short words like "and"' },
    { label: 'D', text: 'Concept of word in print — the understanding that each spoken word maps to one discrete written unit separated by spaces' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. Concept of word in print (voice-to-print match) is the ability to point accurately to each written word as it is spoken, demonstrating that the student understands each spoken word corresponds to a distinct written unit bounded by spaces. The student's error — drifting past a word and falling out of correspondence — indicates that the student does not yet have stable word-by-word tracking. This is a foundational emergent literacy skill. Option A is incorrect because the student is tracking left to right; the error is in word unit correspondence, not directionality. Option B is incorrect because letter-sound correspondence is a print-based phonics skill; this error is at the whole-word unit mapping level, not the phoneme-grapheme level. Option C is incorrect because phoneme segmentation is an entirely oral task that does not involve print; the student's error is in tracking printed words, not in hearing phonemes.`,
},

// Q11 → B (CAP assessment: letter vs. word distinction)
{
  pos: 11,
  questionText: `A first-grade teacher conducts a Concepts About Print (CAP) assessment. The student correctly demonstrates left-to-right tracking and return sweep. However, when the teacher points to a printed word and asks "Show me one letter in this word," the student points to the entire word. When asked "Show me the whole word," the student again points to the entire word. Which concept of print is the student still developing?`,
  options: [
    { label: 'A', text: 'Left-to-right directionality and return sweep when tracking multiple lines of text' },
    { label: 'B', text: 'The distinction between a letter and a word as separate, hierarchically related units of print' },
    { label: 'C', text: 'Understanding that print, rather than illustrations, carries the meaning in a text' },
    { label: 'D', text: 'The function of spaces as boundaries between words in continuous print' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. The student's inability to differentiate between the unit of a "letter" and the unit of a "word" — pointing to the whole word for both prompts — reveals that the student has not yet developed the metalinguistic understanding that words are composed of letters and that letters and words are conceptually distinct units at different levels of the print hierarchy. Option A is incorrect because the assessment already confirmed that the student demonstrates correct left-to-right tracking and return sweep. Option C is incorrect because the student is engaging with print appropriately in both responses — the error is in identifying the size and type of print unit, not in understanding that print carries meaning. Option D is incorrect because understanding spaces as word boundaries is a related but distinct concept; this student's error is at the letter-versus-word conceptual level, not in recognizing spaces.`,
},

// Q13 → A (MULTI-STIMULUS: oral reading error table → which decoding gap?)
{
  pos: 13,
  questionText: `A second-grade teacher records a student's oral reading errors and identifies the following pattern.\n\nWord in Text | Student Read\n"spring" | "sing"\n"street" | "set"\n"split" | "sit"\n\nWhich decoding gap most directly explains this consistent error pattern?`,
  options: [
    { label: 'A', text: 'Difficulty decoding initial three-letter consonant blends — the student simplifies clusters to a single onset consonant' },
    { label: 'B', text: 'Difficulty applying the vowel-consonant-e rule, causing the student to misread the vowel in each word' },
    { label: 'C', text: 'Confusion between consonant digraphs and consonant blends, causing the student to omit letters' },
    { label: 'D', text: 'Insufficient sight-word knowledge, causing the student to substitute memorized short words' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. In all three errors, the student retains the initial consonant /s/ and the vowel+ending but drops the remaining consonants of the blend: "spring" → "sing" (drops /pr/), "street" → "set" (drops /tr/), "split" → "sit" (drops /pl/). This consistent pattern of collapsing a three-letter blend to its first consonant indicates the student cannot hold and process the full initial cluster; the student simplifies to a single onset. Option B is incorrect because VCe rule errors would affect vowel quality, not the initial consonant cluster — and none of these words use the VCe pattern. Option C is incorrect because consonant digraphs (sh, ch, th) are two letters representing one phoneme; these errors involve consonant blends, where each letter represents a separate sound, and the student omits whole consonant segments. Option D is incorrect because sight-word substitutions would produce known whole words, not systematically shortened versions of the target words with the same vowel and ending.`,
},

// Q14 → B (soft-c rule — more nuanced than original ph/digraph question)
{
  pos: 14,
  questionText: `A first-grade student reads "city" as "kitty" and "cent" as "kent." The teacher identifies these as errors with a conditional vowel-environment phonics rule. Which phonics concept should the teacher explicitly address?`,
  options: [
    { label: 'A', text: 'The consonant digraph rule, in which two letters jointly represent a single phoneme' },
    { label: 'B', text: 'The soft c rule, in which the letter c followed by e, i, or y produces the /s/ sound rather than /k/' },
    { label: 'C', text: 'The r-controlled vowel rule, in which r modifies the sound of the preceding vowel' },
    { label: 'D', text: 'The open syllable rule, in which a syllable ending in a vowel produces a long vowel sound' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. The student is applying the hard /k/ sound to the letter "c" regardless of what vowel follows, indicating the student has not yet learned the soft c rule: when c precedes e, i, or y, it produces the /s/ sound (city → /s/ity, cent → /s/ent). Both errors follow this exact pattern. Explicit instruction on the environmental condition that triggers the soft c pronunciation directly addresses the errors. Option A is incorrect because a consonant digraph is a two-letter unit representing one phoneme (sh, ch, th); the student's errors involve a single letter "c" and its conditional sound, not a two-letter combination. Option C is incorrect because r-controlled vowels affect the vowel sound following "r"; neither error involves a vowel sound distortion. Option D is incorrect because the open syllable rule concerns vowel length at the end of a syllable; these errors are about the consonant "c" being mispronounced, not about vowel quality.`,
},

// Q16 → C (MULTI-STIMULUS: r-controlled error table)
{
  pos: 16,
  questionText: `A teacher records the following oral reading miscues from a second-grade student.\n\nWord in Text | Student Read\n"farm" | "fam"\n"bird" | "bid"\n"hurt" | "hut"\n\nWhich phonics pattern does this student most need explicit instruction in?`,
  options: [
    { label: 'A', text: 'Long vowel patterns produced by the vowel-consonant-e rule' },
    { label: 'B', text: 'Vowel team digraphs in which two adjacent vowels produce a single sound' },
    { label: 'C', text: 'R-controlled vowels, in which the letter r that follows a vowel modifies the vowel sound to produce a distinct phoneme' },
    { label: 'D', text: 'Closed syllable patterns that reliably produce short vowel sounds' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. In all three errors the student omits the letter "r" and reads a plain short vowel in its place: "farm" → "fam" (/æ/ instead of /ɑr/), "bird" → "bid" (/ɪ/ instead of /ɜr/), "hurt" → "hut" (/ʌ/ instead of /ɜr/). This consistent pattern shows the student is not recognizing or applying the r-controlled vowel principle — that a vowel followed by "r" produces a distinct modified phoneme (ar, er/ir/ur, or). Explicit instruction on the six r-controlled patterns directly addresses these errors. Option A is incorrect because VCe errors would produce long vowel sounds (e.g., reading "farm" as "fame"); the student's errors produce plain short vowels, not long ones. Option B is incorrect because vowel team errors involve misreading a two-vowel combination; these errors stem from ignoring the "r" that modifies the vowel, not from a two-vowel confusion. Option D is incorrect because the closed syllable pattern produces short vowels, which is exactly what the student defaults to; the gap is in recognizing when "r" overrides the expected short vowel to produce a different sound.`,
},

// Q19 → D (decodable vs. leveled reader — evidence-based rationale)
{
  pos: 19,
  questionText: `A first-grade teacher has just finished teaching the short vowel CVC pattern and initial consonant sounds. She is selecting texts for a small group reading session. One option is a decodable reader containing only CVC words with taught phonemes. The other is a leveled reader at the students' instructional level that mixes CVC words with irregular high-frequency words and patterns not yet taught. Which choice best aligns with evidence-based beginning reading instruction, and what is the strongest rationale?`,
  options: [
    { label: 'A', text: 'The leveled reader, because exposure to diverse word types builds a richer reading vocabulary than restricted decodable texts' },
    { label: 'B', text: 'The leveled reader, because instructional-level challenge activates schema and better supports comprehension than easy controlled text' },
    { label: 'C', text: 'The decodable reader, because it removes the need for any teacher guidance or corrective feedback during reading' },
    { label: 'D', text: 'The decodable reader, because it allows students to practice applying newly taught phonics patterns, reinforcing the decoding-to-automaticity pipeline without requiring students to guess or memorize' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. The purpose of decodable text at the phonics acquisition stage is to provide controlled practice on exactly the patterns students have been taught, strengthening the phonics-to-reading connection and supporting orthographic mapping — the process by which decoded words become stored as sight words. Leveled readers at this stage contain too many untaught patterns, causing students to rely on pictures, context, or memory rather than applying phonics knowledge, which undermines the development of a decoding habit. Option A is incorrect because vocabulary breadth is not the instructional goal during initial phonics practice; controlled application of taught patterns is. Option B is incorrect because instructional-level comprehension challenge is appropriate for guided comprehension work, not for phonics application practice, which requires high-accuracy text for the decoding-to-automaticity process to function. Option C is incorrect because decodable texts do not eliminate the need for teacher guidance; immediate corrective feedback on decoding errors is essential during decodable text reading.`,
},

// Q21 → A (word sort: which activity most efficiently builds open/closed syllable recognition?)
{
  pos: 21,
  questionText: `A second-grade teacher wants to build students' understanding of the difference between open syllables (vowel at the end, long sound: "me," "go") and closed syllables (consonant at the end, short sound: "met," "got"). Which instructional activity would most efficiently develop this pattern recognition?`,
  options: [
    { label: 'A', text: 'Conducting a word sort in which students categorize words as open or closed syllable, then articulate the rule they discovered from the pattern' },
    { label: 'B', text: 'Having students copy open and closed syllable words into a vocabulary notebook alongside their definitions' },
    { label: 'C', text: 'Displaying open and closed syllable words on a classroom word wall and asking students to read them chorally each morning' },
    { label: 'D', text: 'Providing a decodable text that contains mostly open syllable words for independent fluency practice' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Word sorts require students to actively analyze orthographic features and construct their own understanding of a spelling pattern by categorizing exemplars. When students sort open and closed syllable words and then articulate the rule — "if the syllable ends in a vowel, it's long; if it ends in a consonant, the vowel is short" — they engage in inductive reasoning that produces more durable pattern knowledge than passive exposure. Option B is incorrect because copying words into a notebook is a passive transcription task; it does not require students to analyze syllable structure or construct a generalized rule. Option C is incorrect because choral reading of a word wall provides daily exposure but not the analytical categorization that builds generalizable pattern recognition. Option D is incorrect because fluency practice with a decodable text provides reading practice but not explicit instruction in how to distinguish open from closed syllable structure.`,
},

// Q22 → C (morphemic analysis: clinical gap → what instruction?)
{
  pos: 22,
  questionText: `A third-grade teacher's assessment data shows that students can correctly identify the meanings of common prefixes (un-, re-, pre-, dis-) when shown them in isolation, but when reading connected text, students regularly misread multisyllabic words like "uncomfortable," "prehistoric," and "international" by attempting to sound them out letter-by-letter. Which instructional approach would most directly close this transfer gap?`,
  options: [
    { label: 'A', text: 'Providing daily timed speed drills on lists of multisyllabic words to build automaticity with long words' },
    { label: 'B', text: 'Teaching students to use sentence-level context clues to confirm or correct their attempts at multisyllabic words' },
    { label: 'C', text: 'Explicitly teaching students to identify and bracket morphemic chunks — prefix, root, suffix — as their first move when encountering an unfamiliar multisyllabic word' },
    { label: 'D', text: 'Reviewing CVC and CVCe decoding patterns until students demonstrate mastery before progressing to multisyllabic words' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. The gap is not in prefix knowledge — students know un-, re-, pre- — but in transfer: they do not apply that morphological knowledge as a decoding strategy when encountering these words in text. Explicit instruction in morphemic chunking teaches students a procedure: (1) look for known prefixes and bracket them, (2) identify the root word, (3) look for suffixes, then (4) blend the morphemes. This strategy bridges isolated prefix knowledge to whole-word decoding. Option A is incorrect because speed drills may build rate but do not teach the chunking strategy that allows students to approach unfamiliar multisyllabic words; the same errors would persist at higher speed. Option B is incorrect because context clues are a meaning-based strategy; they do not replace the need for phonological decoding of multisyllabic words and are insufficient for precise word reading. Option D is incorrect because assessment data confirms students can handle basic CVC/CVCe patterns; the identified gap is specifically with multisyllabic morphological application.`,
},

// Q25 → A (vocabulary: morphemic strategy in the moment)
{
  pos: 25,
  questionText: `A fourth-grade student pauses on the word "malfunction" during independent reading. The teacher wants to use this moment to build a transferable, independent word-learning strategy. Which teacher response would best develop this skill?`,
  options: [
    { label: 'A', text: 'Prompting the student to identify the prefix "mal-" (meaning bad or wrong) and the base word "function," then combine their meanings to construct a definition' },
    { label: 'B', text: 'Providing the definition immediately so the student can maintain reading momentum without losing comprehension of the passage' },
    { label: 'C', text: 'Asking the student to read the surrounding sentences and use context clues to guess the meaning' },
    { label: 'D', text: 'Directing the student to the classroom dictionary to look up and copy the definition' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Morphemic analysis is the most transferable vocabulary strategy for students encountering unfamiliar words in academic text: identifying and combining the meanings of known word parts (mal- = bad/wrong + function = to work/operate → "to work incorrectly or badly") equips students to decode thousands of words that share these morphemes. This builds independence. Option B is incorrect because providing the definition builds no strategy; the student remains dependent on the teacher for future unfamiliar words and cannot apply anything independently. Option C is incorrect because context clues are often insufficient for precise vocabulary learning in informational and technical text, and they do not build the morphological awareness that transfers to new words. Option D is incorrect because copying a dictionary definition is a passive, word-specific task that does not develop the generalizable word-attack strategy the teacher intends to cultivate.`,
},

// Q29 → A (MULTI-STIMULUS: recognition vs. production vocabulary data gap)
{
  pos: 29,
  questionText: `A fifth-grade teacher pre-teaches eight academic vocabulary words before each unit. After completing Unit 3, the teacher analyzes two assessment data sources: (1) a matching quiz pairing words with definitions — class average 84%, and (2) a writing task requiring students to use the target words accurately in original sentences — class average 31%. Which conclusion and instructional adjustment is most appropriate?`,
  options: [
    { label: 'A', text: 'Students have developed passive word recognition but not active word production; instruction should add structured speaking and writing practice that requires students to generate the words in new contexts' },
    { label: 'B', text: 'The matching quiz scores confirm mastery; the low writing scores indicate a grammar problem that should be addressed through separate writing instruction' },
    { label: 'C', text: 'Both scores reveal insufficient direct instruction time; the teacher should reduce the number of target words per unit to allow deeper coverage' },
    { label: 'D', text: 'The matching scores indicate the words were too easy; the teacher should select more challenging Tier 3 domain-specific vocabulary for the next unit' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. The gap between 84% on a matching quiz (passive/receptive vocabulary) and 31% on a production writing task (active/expressive vocabulary) is a classic pattern in vocabulary instruction: students can recognize a word when they see it paired with a definition but do not know it deeply enough to deploy it independently in writing. The research-based response is to add generative practice — structured discussion, sentence construction, word comparison, and writing tasks — that moves words from the receptive knowledge stage to productive vocabulary. Option B is incorrect because attributing the writing gap to a grammar problem misdiagnoses the issue; students who cannot use a word's meaning flexibly cannot employ it accurately regardless of grammatical correctness. Option C is incorrect because the number of words taught is not the root cause of a recognition-vs.-production gap; the type and depth of practice is the variable that needs to change. Option D is incorrect because high matching scores indicate the words were learned at a surface level, not that they were too easy; the problem is insufficient depth of processing.`,
},

// Q34 → B (MULTI-STIMULUS: prosody rubric data → targeted intervention)
{
  pos: 34,
  questionText: `A third-grade teacher uses a four-point prosody rubric to evaluate oral reading on three dimensions: (1) appropriate phrasing, (2) adherence to punctuation, and (3) expressive variation in voice. A student receives: phrasing = 4, punctuation = 4, expressive variation = 1. The student's wcpm score is at the 55th percentile. Which intervention most directly addresses this student's identified weakness?`,
  options: [
    { label: 'A', text: 'Providing additional phonics instruction to strengthen the decoding foundation underlying fluent phrasing' },
    { label: 'B', text: 'Modeling expressive, character-differentiated reading and having the student practice with scripts, dialogue-heavy texts, or reader\'s theater' },
    { label: 'C', text: 'Using timed repeated reading of grade-level passages to push the student\'s oral reading rate to a higher percentile' },
    { label: 'D', text: 'Increasing daily independent silent reading time to build reading stamina and self-monitoring habits' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. The student's profile — strong phrasing and punctuation but flat, expressionless oral reading — isolates the gap to the affective/expressive dimension of prosody: the student reads in grammatically correct chunks and honors sentence boundaries but uses no voice variation to convey meaning, emotion, or character. Teacher modeling of expressive reading followed by performance-oriented practice (scripts, dialogue-rich texts, reader's theater) directly targets voice expression. Option A is incorrect because the student's strong phrasing and 55th-percentile rate indicate no decoding gap; additional phonics instruction does not address an expressive prosody gap. Option C is incorrect because the student's rate is already adequate; pushing rate without addressing expression does not close the identified gap and may actually interfere with the attention needed for expressive reading. Option D is incorrect because silent reading does not provide the feedback loop necessary for developing oral expressive prosody; students need to hear and practice expressive oral performance.`,
},

// Q37 → C (MULTI-STIMULUS: fluency data table — who needs comprehension checked separately?)
{
  pos: 37,
  questionText: `A second-grade teacher administers an oral reading fluency probe in late winter. The grade benchmark is 90 wcpm. Results are shown below.\n\nStudent | wcpm | Accuracy | Self-corrections\nAmara | 91 | 97% | 4\nBen | 84 | 92% | 1\nCristina | 118 | 99% | 5\nDevon | 65 | 83% | 0\n\nWhich student's profile most warrants a separate comprehension assessment to determine whether fluency is supporting meaning-making?`,
  options: [
    { label: 'A', text: 'Amara — at benchmark with high accuracy and active self-monitoring, suggesting possible over-reliance on decoding strategies' },
    { label: 'B', text: 'Ben — slightly below benchmark with reduced accuracy, suggesting a phonics gap that may be masking comprehension' },
    { label: 'C', text: 'Cristina — well above benchmark in rate and accuracy, but high rate alone does not confirm that comprehension is occurring' },
    { label: 'D', text: 'Devon — significantly below benchmark with low accuracy and no self-correction, most urgently needing fluency intervention first' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. Cristina's fluency metrics appear strong — 118 wcpm, 99% accuracy, active self-correction — but research on "word-calling" demonstrates that high rate and accuracy do not guarantee comprehension. A student can decode text rapidly and accurately while constructing little or no meaning. Cristina's profile warrants a separate comprehension probe to confirm that her fluency is serving comprehension and not operating as surface-level decoding only. Option A is incorrect because Amara's profile — benchmark rate, high accuracy, and active self-correction — is a healthy developing reader profile; no specific disconnect between fluency and comprehension is indicated. Option B is incorrect because Ben's below-benchmark rate with reduced accuracy suggests a decoding or fluency concern, not the specific word-calling pattern that separates fluency from comprehension. Option D is incorrect because Devon clearly needs fluency intervention based on all indicators; the specific diagnostic question about fluency-comprehension disconnect is most relevant for a student who appears fluent by rate and accuracy metrics alone.`,
},

// Q39 → A (progress monitoring: flat trendline → what next?)
{
  pos: 39,
  questionText: `A first-grade teacher has been providing Tier 2 small-group intervention for a student since October. The student's biweekly oral reading fluency scores over eight weeks are: 24, 25, 23, 26, 24, 25, 24, 26 wcpm. The grade-level benchmark for this point in the year is 40 wcpm. Based on MTSS progress monitoring principles, what is the most appropriate next step?`,
  options: [
    { label: 'A', text: 'Convene a problem-solving team to examine intervention fidelity and intensity, and consider whether the approach needs to be adjusted or the support level intensified' },
    { label: 'B', text: 'Continue the current intervention unchanged for another grading period before drawing conclusions' },
    { label: 'C', text: 'Immediately refer the student for a special education evaluation based on eight weeks of flat progress monitoring data' },
    { label: 'D', text: 'Discontinue the Tier 2 intervention and re-screen at the next universal screening window' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Eight weeks of flat progress monitoring data — showing no growth and a consistent 14–16 wcpm gap below benchmark — indicates the current intervention is not producing adequate progress. MTSS protocols call for a data-based problem-solving process: examining whether the intervention was implemented with fidelity, whether the dose and frequency are sufficient, and whether a different or more intensive approach is warranted. This review precedes any decision to escalate or change the support level. Option B is incorrect because continuing a demonstrably ineffective intervention unchanged prolongs the student's lack of growth without addressing the cause; this is not appropriate when eight data points already show a flat trend. Option C is incorrect because a single period of non-response to one intervention does not meet the threshold for a special education referral; MTSS requires documented non-response to multiple evidence-based interventions delivered with fidelity before evaluation is initiated. Option D is incorrect because removing intervention when a student is not growing eliminates support at precisely the moment more targeted help is needed.`,
},

// Q40 → B (MULTI-STIMULUS: universal screener data → MTSS planning)
{
  pos: 40,
  questionText: `In early fall, a third-grade teacher's universal reading screener results show: 15 students at or above the 40th percentile (on track), 6 students between the 20th and 40th percentile (some risk), and 3 students below the 10th percentile (significant risk). How should these results most appropriately guide the teacher's instructional planning according to the MTSS framework?`,
  options: [
    { label: 'A', text: 'Administer the screener again in four weeks to confirm the results before making any instructional changes' },
    { label: 'B', text: 'Provide all 24 students with Tier 1 core instruction; begin Tier 2 supplemental support for the 6 some-risk students; conduct diagnostic assessment for the 3 significant-risk students to identify specific skill gaps before assigning intervention' },
    { label: 'C', text: 'Refer the 3 significant-risk students to the special education team immediately and provide Tier 2 support to the remaining 9 below-benchmark students' },
    { label: 'D', text: 'Form two instructional groups — on-track and below-benchmark — and provide both groups with the same supplemental instruction in addition to core' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. MTSS is a tiered support model: all students receive Tier 1 high-quality core instruction. Universal screener data then guides differentiation. Students in the "some risk" band (6 students) are candidates for Tier 2 supplemental small-group intervention targeting their pattern of need. Students with significant risk (3 students) require diagnostic assessment to identify the specific nature and location of their reading difficulties before an appropriate intervention tier can be assigned. Option A is incorrect because re-screening without acting on clear risk data delays appropriate support; universal screener data is designed to be immediately actionable for instructional planning. Option C is incorrect because below-benchmark screener scores do not constitute grounds for a special education referral; students must receive and fail to respond to evidence-based interventions before eligibility evaluation is warranted. Option D is incorrect because grouping all 9 below-benchmark students together and providing the same intervention ignores the likely different profiles of some-risk and significant-risk students, who require qualitatively different levels of support.`,
},

// ══════════════════════════════════════════════════════════════════
// SUBAREA II — Obj 0005 (Reading Comprehension Strategies)
// ══════════════════════════════════════════════════════════════════

// Q45 → A (levels of comprehension: which set of 3 questions correctly sequences them?)
{
  pos: 45,
  questionText: `A third-grade teacher designs a three-question sequence about an informational passage to assess comprehension from least to most cognitively demanding. Which set of questions correctly represents all three levels — literal, inferential, and evaluative — in that order?`,
  options: [
    { label: 'A', text: '"What does the article say caused the flooding?" → "Why might future storms produce even worse flooding?" → "Should the city have built stronger levees sooner? Support your position with text evidence."' },
    { label: 'B', text: '"What do you think the author personally believes about climate change?" → "Where did the flooding occur according to the article?" → "Why is flooding dangerous for communities?"' },
    { label: 'C', text: '"Find two facts the article states about the storm." → "Find two more facts from a different paragraph." → "List all the facts you found in order."' },
    { label: 'D', text: '"What words in the passage describe the flood damage?" → "Which sentence contains the author\'s main idea?" → "What happened the day after the flood?"' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Literal comprehension retrieves information stated explicitly in the text. Inferential comprehension requires readers to draw conclusions beyond what is stated. Evaluative comprehension requires forming a judgment and defending it with evidence. Option A correctly sequences: literal ("what does the article say caused...") → inferential ("why might future storms...") → evaluative ("should the city have...support with evidence"). Option B is incorrect because it begins with an evaluative or inferential question about the author's beliefs and then moves to a literal question; the sequence is not from least to most demanding. Option C is incorrect because all three tasks are literal fact-finding at the same level of demand; no inferential or evaluative level is represented. Option D is incorrect because all three questions operate at the literal or locating level; identifying the main idea sentence and locating facts and events are both literal retrieval tasks.`,
},

// Q50 → C (story grammar clinical: student's retelling reveals gap → which scaffold?)
{
  pos: 50,
  questionText: `After reading a narrative independently, a student produces the following retelling: "A dog lost his ball. He looked everywhere. The end." The retelling omits the initiating event, the sequence of attempts, the climax, and the resolution. Based on story grammar theory, which instructional scaffold would most directly address this student's comprehension gap?`,
  options: [
    { label: 'A', text: 'A vocabulary pre-teaching routine focusing on the key content words in the narrative' },
    { label: 'B', text: 'Timed repeated readings of the passage to build fluency and word recognition automaticity' },
    { label: 'C', text: 'A story map graphic organizer that scaffolds the student to identify setting, problem, sequence of events, and resolution' },
    { label: 'D', text: 'A phonics review to ensure the student can decode all words in the text accurately before rereading' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. The student's retelling reveals a gap in story grammar knowledge — the student is not organizing the narrative into its structural components (problem, sequence of events, climax, resolution). A story map provides the scaffold that makes story grammar elements explicit and gives the student a framework for comprehending and recalling narrative structure. Completing a story map during or after reading teaches the student to attend to and organize these structural components during future reading. Option A is incorrect because the student's ability to produce any retelling at all — "a dog lost his ball" — indicates basic vocabulary comprehension; vocabulary is not the limiting factor here. Option B is incorrect because the comprehension gap is in narrative structure knowledge, not fluency; building reading speed does not develop story grammar understanding. Option D is incorrect because the student can produce a minimal retelling, indicating adequate decoding; the gap is in comprehension structure, not word reading.`,
},

// Q52 → A (visualization clinical: students recall facts but miss mood/emotion → which strategy?)
{
  pos: 52,
  questionText: `A fourth-grade teacher notices that students can recall factual details from a complex narrative text but consistently struggle to describe characters' emotional states and explain how the setting contributes to the mood of key scenes. Which instructional strategy would most directly address this comprehension gap?`,
  options: [
    { label: 'A', text: 'Teaching students to construct mental images of characters, settings, and events while reading — pausing at key moments to describe what they see, hear, and sense in their minds' },
    { label: 'B', text: 'Using QAR to help students distinguish between "right there" and "think and search" questions about the narrative' },
    { label: 'C', text: 'Providing a story grammar graphic organizer so students can map characters, setting, and events systematically' },
    { label: 'D', text: 'Assigning timed repeated readings of the same narrative to build rate and accuracy with the text' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. The described gap — accurate fact recall but shallow understanding of character emotion and setting mood — is characteristic of surface-level processing that has not built a rich situational mental model. Explicit visualization instruction teaches students to create sensory and emotional mental representations of scenes as they read, which deepens comprehension by moving beyond propositional fact retention to experiential understanding of the text world. Option B is incorrect because QAR is a question-classification strategy that helps students locate answers; it does not develop the sensory and emotional situation modeling that the described gap requires. Option C is incorrect because a story grammar organizer captures structural labels (setting name, character names) but does not develop the capacity to inhabit and experience those elements emotionally and sensorially. Option D is incorrect because fluency building addresses rate and accuracy; the students in this scenario can already comprehend the text's surface content, so fluency is not the limiting factor.`,
},

// Q53 → B (critical literacy: compare fiction + primary source → which skill?)
{
  pos: 53,
  questionText: `A fifth-grade teacher assigns both a historical fiction novel and a primary source letter written by a person who lived during the same historical period. After reading both, students discuss which text gave them a more accurate understanding of the era, and why. Which reading and thinking skill does this discussion task most directly develop?`,
  options: [
    { label: 'A', text: 'Story grammar analysis — applying the narrative structure framework to compare how each text organizes its events' },
    { label: 'B', text: 'Critical literacy — evaluating different text types, considering author perspective and purpose, and synthesizing across sources to construct a richer understanding' },
    { label: 'C', text: 'Vocabulary development through repeated exposure to period-specific language across two related texts' },
    { label: 'D', text: 'Phonics application — decoding historically accurate terminology encountered in both texts' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. Asking students to evaluate which text — fiction or primary source — gives a more accurate picture of a historical period, and to defend their judgment, requires students to analyze author purpose, consider the constraints and advantages of each text type, compare evidence quality, and synthesize across sources. This is a critical literacy task: reading texts not just to understand their content but to evaluate them as constructed artifacts with particular purposes, perspectives, and limitations. Option A is incorrect because while the novel may have a narrative structure, the discussion task focuses on comparing and evaluating two different text types, not mapping story grammar elements within one. Option C is incorrect because vocabulary exposure is an incidental benefit of reading both texts; the discussion is designed to develop critical evaluation and cross-text synthesis, not vocabulary specifically. Option D is incorrect because decoding domain-specific vocabulary is a word-level task; the discussion operates at the whole-text evaluation and critical thinking level.`,
},

// ══════════════════════════════════════════════════════════════════
// SUBAREA II — Obj 0006 (Literary Text Comprehension)
// ══════════════════════════════════════════════════════════════════

// Q57 → C (simile vs. metaphor: the key distinguishing feature)
{
  pos: 57,
  questionText: `A poem contains the line: "Hunger crept through the village like a silent thief, taking children from their beds before dawn." A fifth-grade teacher uses this line to teach figurative language. Which device is primarily at work, and what is the single feature that most clearly distinguishes it from the most closely related device?`,
  options: [
    { label: 'A', text: 'Hyperbole — the extreme exaggeration of hunger\'s effects, distinguishable from personification by the absence of human-trait attribution' },
    { label: 'B', text: 'Metaphor — a direct comparison of hunger to a thief, distinguishable from simile by the absence of a comparative word' },
    { label: 'C', text: 'Simile — a comparison using "like," distinguishable from metaphor precisely because the comparative word "like" is present' },
    { label: 'D', text: 'Personification — hunger is given the human attribute of theft, distinguishable from simile by the literal attribution of human behavior' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. The line uses "like" to compare hunger to a thief — this is the defining characteristic of a simile. The most important distinguishing feature between simile and metaphor is the explicit presence of a comparative word ("like," "as," or "than") in a simile versus its absence in a metaphor. The teacher can use this line to clarify the simile-metaphor boundary precisely. Option B is incorrect because a metaphor would state the equation directly — "Hunger was a silent thief" — without "like" or "as"; the presence of "like" makes this line a simile. Option D is incorrect because while hunger is given human behaviors (creeping, taking), personification typically involves attributing human traits to non-human things without a comparative frame; here the comparison is made explicitly using "like," making the device a simile even though personification is layered within it. Option A is incorrect because hyperbole involves intentional exaggeration for dramatic effect; while this line is figurative, the comparison to a thief is not an overstatement about scale or quantity.`,
},

// Q61 → B (genre conventions: structural features across poetry genres)
{
  pos: 61,
  questionText: `A fifth-grade teacher gives students three short texts — a Shakespearean sonnet, a haiku, and a free verse poem on the same subject — and asks: "What structural features does each genre require that the others do not?" Which literary understanding is this task developing?`,
  options: [
    { label: 'A', text: 'The ability to identify a speaker\'s tone and emotional stance across different poetic styles' },
    { label: 'B', text: 'Understanding of genre conventions — that specific literary forms carry structural requirements distinguishing them from other forms' },
    { label: 'C', text: 'The skill of making text-to-self connections by relating each poem\'s subject to personal experience' },
    { label: 'D', text: 'Figurative language analysis — comparing how each poem uses imagery to convey its central idea' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. By asking students to identify genre-specific structural requirements — the sonnet's 14 lines and iambic pentameter, the haiku's 5-7-5 syllable structure, free verse's deliberate absence of required form — the teacher is developing metaliterary knowledge of genre conventions: the understanding that different literary forms operate by different structural rules. This knowledge helps students approach unfamiliar texts with appropriate interpretive frameworks and understand authors' formal choices. Option A is incorrect because identifying tone is a comprehension skill applicable to any text; the task specifically targets formal structural differences between genres. Option C is incorrect because text-to-self connections are personal response skills unrelated to structural genre analysis. Option D is incorrect because figurative language analysis examines how language creates meaning; the task explicitly targets structural and formal requirements that define each genre, not imagery techniques.`,
},

// Q64 → A (theme vs. plot: three student responses — which demonstrates theme?)
{
  pos: 64,
  questionText: `After reading a picture book in which a young character struggles alone, eventually accepts help from a friend, and succeeds as a result, a teacher asks: "What is the author's message — not just what happened, but what the author wants you to understand about life?" Three students respond:\n\nStudent A: "The boy asked his friend for help and then they won together."\nStudent B: "It's a story about a boy and his friend."\nStudent C: "Accepting help from others doesn't make you weak — it makes you stronger."\n\nWhich student's response demonstrates understanding of theme as distinct from plot summary?`,
  options: [
    { label: 'A', text: 'Student C — articulates a universal life principle that transcends the specific story events and applies to human experience broadly' },
    { label: 'B', text: 'Student A — identifies the key plot turning point, which is the basis from which a theme can be derived' },
    { label: 'C', text: 'Student B — correctly identifies the central characters, which is the first step toward identifying character-driven theme' },
    { label: 'D', text: 'Both Students A and B — together they capture the full narrative, which constitutes a complete thematic statement' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Theme is the underlying universal message the author conveys through the story — an idea that applies beyond the specific characters and events to broader human experience. Student C's response ("Accepting help doesn't make you weak — it makes you stronger") is thematic because it generalizes to a transferable life principle not tied to the specific boy or his friend. Students A and B are performing plot summary and character identification, which are literal-level comprehension tasks. Option B is incorrect because identifying a key plot action describes what happened, not what it means; plot turning points are raw material for theme, but recognizing them is not the same as articulating theme. Option C is incorrect because identifying characters is a basic comprehension task; the theme question asks what the author wants readers to understand about life, not who the story is about. Option D is incorrect because combining two literal-level responses does not produce a thematic response; theme requires abstraction and generalization beyond the specific events.`,
},

// ══════════════════════════════════════════════════════════════════
// SUBAREA II — Obj 0007 (Informational Text Comprehension)
// ══════════════════════════════════════════════════════════════════

// Q67 → D (cause-and-effect gap: which instruction addresses it?)
{
  pos: 67,
  questionText: `A teacher's diagnostic data shows that students can locate facts stated in informational texts but cannot explain why events occur or describe the consequences of events. The teacher determines the class needs targeted instruction in cause-and-effect text structure. Which instructional approach would most directly address this gap?`,
  options: [
    { label: 'A', text: 'Pre-teaching domain vocabulary before students read each informational passage to reduce cognitive load during reading' },
    { label: 'B', text: 'Assigning partner reading of cause-and-effect texts to increase exposure through repeated encounters' },
    { label: 'C', text: 'Teaching students to identify the central idea of each paragraph before reading the full text' },
    { label: 'D', text: 'Explicitly teaching cause-and-effect signal words ("because," "therefore," "as a result") and using a graphic organizer that maps causes to their effects' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. When students can recall facts but cannot explain causal relationships, the gap is in text structure awareness — students are not recognizing how authors signal and organize cause-effect chains. Explicit instruction on signal words paired with a cause→effect graphic organizer teaches students both to recognize this structure and to use it as a comprehension framework. This directly targets the identified gap. Option A is incorrect because vocabulary instruction addresses word-level understanding; students may know individual words in a causal text but still fail to map the logical relationships between events. Option B is incorrect because increasing exposure through partner reading does not provide the explicit structural instruction students need; fluent reading of texts whose structure is not understood does not resolve the comprehension gap. Option C is incorrect because central idea instruction is a different text structure skill (main idea/supporting details); it does not address the inability to identify and explain causal relationships.`,
},

// Q68 → C (text walk pre-reading strategy — science chapter with multiple text features)
{
  pos: 68,
  questionText: `A third-grade teacher is about to begin a science chapter on the water cycle. The chapter includes a labeled diagram of the water cycle, a table of precipitation data by season, three bolded key terms, and a sidebar titled "Did You Know?" The teacher wants to set a reading purpose and reduce cognitive load before students encounter the full prose. Which pre-reading approach makes most effective use of the available text features?`,
  options: [
    { label: 'A', text: 'Having students read the chapter silently first, then examining the visual features afterward to confirm comprehension' },
    { label: 'B', text: 'Covering the diagram and table so students focus exclusively on the prose during the first read' },
    { label: 'C', text: 'Conducting a text walk in which students preview the diagram, table, bolded terms, and sidebar to build a content framework before reading the full prose' },
    { label: 'D', text: 'Using the bolded terms as a vocabulary self-assessment before reading begins, then reading the chapter' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. A text walk (also called a text preview or book walk) activates prior knowledge and establishes a reading purpose by having students survey key text features before engaging the full prose. In informational text, diagrams, data tables, headings, and bolded terms provide the structural skeleton of the chapter's content. Previewing these features gives students a framework into which they can slot details encountered while reading, significantly reducing cognitive load and supporting comprehension. Option A is incorrect because encountering the text cold before examining the supporting visual features removes a critical scaffold; informational text features are designed to work alongside the prose, not as post-hoc confirmation tools. Option B is incorrect because covering visual features eliminates the very scaffolds that signal key concepts and organizational structure. Option D is incorrect because while vocabulary self-assessment is a valuable pre-teaching technique, using only the bolded terms misses the diagram, data table, and sidebar that would provide the broadest content framework for reading.`,
},

// Q70 → B (multi-stimulus: student can answer prose questions but fails visual integration → gap and fix)
{
  pos: 70,
  questionText: `A fifth-grade student reads a science chapter about ecosystems and scores well on comprehension questions based on the prose alone. However, she scores poorly on questions that require using the chapter's food web diagram alongside the text — for example, "Based on the diagram and the text, what would most likely happen to the deer population if wolves were removed?" What instructional gap does this pattern reveal, and which approach would most directly address it?`,
  options: [
    { label: 'A', text: 'A phonics gap — the student needs decoding instruction for the technical content vocabulary used in the chapter' },
    { label: 'B', text: 'A multimodal reading gap — the student has not learned to read visual information in coordination with prose, and needs explicit instruction in integrating text and graphic sources' },
    { label: 'C', text: 'A story grammar gap — the student is applying narrative text frameworks to an informational text, preventing accurate comprehension' },
    { label: 'D', text: 'A fluency gap — the student\'s reading rate is too slow for her to process both the prose and the diagram within the available working memory' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. The student's ability to answer prose-only questions rules out decoding, fluency, and basic comprehension as the issue. The specific gap is in multimodal reading — the ability to cross-reference a diagram with related prose to construct an integrated understanding. Explicit instruction in how to use visual text features (read the diagram → identify what it shows → locate the related passage → combine both sources to answer the question) directly addresses this gap. Option A is incorrect because the student can answer text-based comprehension questions accurately, confirming adequate decoding of the content vocabulary. Option C is incorrect because story grammar is a framework for narrative fiction; informational text comprehension is organized around informational text structures, and applying story grammar would not help the student integrate a food web diagram. Option D is incorrect because fluency is not the limiting factor; the student reads the prose well enough to answer prose-only questions correctly.`,
},

// Q72 → A (signal words pre-teaching: which instructional purpose?)
{
  pos: 72,
  questionText: `Before students read a social studies passage, a teacher writes these terms on the board: "however," "on the other hand," "similarly," "in contrast," "both...and," "by comparison." She tells the class: "When you see these words in the text, they signal how the author is organizing two or more ideas in relation to each other." Which comprehension purpose does this pre-reading instruction most directly serve?`,
  options: [
    { label: 'A', text: 'Preparing students to recognize compare-and-contrast text structure and use it as a framework for organizing their comprehension as they read' },
    { label: 'B', text: 'Building phonological awareness of multisyllabic academic signal words before students encounter them in print' },
    { label: 'C', text: 'Pre-teaching Tier 3 domain-specific vocabulary essential to understanding the social studies content' },
    { label: 'D', text: 'Activating students\' prior knowledge of the social studies topic before the reading begins' },
  ],
  correctAnswer: 'A',
  explanation: `Correct Response: A. Signal words like "however," "in contrast," and "similarly" are structural markers for compare-and-contrast text organization. Explicitly teaching students to recognize these words before reading gives them a lens for how the author has organized ideas, enabling readers to build a mental framework — what is being compared, on what dimensions — as they read. This structural awareness supports comprehension of the passage's logic. Option B is incorrect because these words are being taught as structural and logical signals, not as phonological challenges; their syllable structure is not the instructional purpose. Option C is incorrect because signal words like "however" and "similarly" are Tier 2 high-frequency academic words used across disciplines; they are not domain-specific Tier 3 terms tied to the social studies content. Option D is incorrect because activating prior knowledge would involve discussing what students already know about the social studies topic itself; teaching signal words builds awareness of text structure, not background content knowledge.`,
},

// Q73 → D (compare two texts on same topic: inform vs. persuade — which instructional approach?)
{
  pos: 73,
  questionText: `A fourth-grade teacher wants students to distinguish between writing that informs and writing that persuades. She selects two short texts about water conservation: Text 1 explains the water cycle and how aquifers are recharged. Text 2 argues that all households should be required by law to install low-flow fixtures. Which instructional approach would most effectively help students identify the distinction?`,
  options: [
    { label: 'A', text: 'Having students identify the central idea of each text and compare them to see which one has a stronger main idea' },
    { label: 'B', text: 'Asking students to count the number of facts in each text to determine which is more informational' },
    { label: 'C', text: 'Directing students to read both texts and then decide which one they personally agree with' },
    { label: 'D', text: 'Guiding students to analyze each text\'s purpose, intended audience, and type of evidence — asking whether the author is explaining how something works or attempting to change the reader\'s behavior or beliefs' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. Distinguishing informational from persuasive purpose requires students to analyze authorial intent — is the author explaining and informing, or making a claim and trying to convince? A framework that examines purpose + audience + evidence type (factual explanation vs. argument + call to action) is portable and applies to any text pair. This teaches critical reading of author's purpose, not just this pair of texts. Option A is incorrect because summarizing a central idea reinforces literal comprehension but does not develop the analytical skill of identifying why an author wrote the text and to what end. Option B is incorrect because persuasive texts also use facts as supporting evidence; counting facts is a surface-level strategy that does not reveal the author's purpose or stance. Option C is incorrect because personal agreement or disagreement is an evaluative response; it does not teach the analytical skill of distinguishing purpose — a student can agree with either text without understanding that one informs and the other persuades.`,
},

// ══════════════════════════════════════════════════════════════════
// SUBAREA III — Obj 0008 (Reading Assessment)
// ══════════════════════════════════════════════════════════════════

// Q78 → B (universal screening: clinical sequence after identifying at-risk students)
{
  pos: 78,
  questionText: `In September, a first-grade teacher uses a universal reading screener and identifies four students whose scores fall significantly below the grade-level benchmark. The teacher wants to begin supporting them right away. According to evidence-based assessment practice and MTSS principles, what is the most appropriate sequence of next steps?`,
  options: [
    { label: 'A', text: 'Refer all four students to the special education team immediately based on their below-benchmark screening scores' },
    { label: 'B', text: 'Administer diagnostic assessments to identify each student\'s specific skill gaps, then use those findings to design appropriately targeted interventions' },
    { label: 'C', text: 'Re-administer the same screener two weeks later to confirm the results before taking any instructional action' },
    { label: 'D', text: 'Begin Tier 3 intensive, individualized intervention immediately since the screener scores indicate the most serious level of need' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. Universal screeners identify students who may be at risk but are deliberately brief and do not provide the diagnostic specificity needed to design instruction. The appropriate next step is diagnostic assessment — administering more targeted assessments that pinpoint which specific phonological, phonics, fluency, or comprehension skills are limiting each student's reading development. These findings then drive intervention design and tier assignment. Option A is incorrect because a single below-benchmark screener score is not grounds for a special education referral; the student must first receive and fail to respond adequately to evidence-based interventions before eligibility evaluation is warranted. Option C is incorrect because re-administering the identical screener does not generate new diagnostic information; it delays appropriate support without adding actionable data. Option D is incorrect because jumping to Tier 3 without diagnostic information means the intervention may not address the actual source of difficulty; the screener result alone is insufficient to determine the appropriate intervention type or intensity.`,
},

// Q81 → C (MULTI-STIMULUS: norm-referenced score — which parent question reflects a misinterpretation?)
{
  pos: 81,
  questionText: `A third-grade student's norm-referenced reading assessment report includes: percentile rank = 38, grade equivalent = 3.7, stanine = 4. The student's parent asks three questions about these results. Which question reflects a common misinterpretation of norm-referenced scores?`,
  options: [
    { label: 'A', text: '"Does the 38th percentile mean my child scored higher than 38% of the students who took this test?"' },
    { label: 'B', text: '"Is stanine 4 within the average range, or is it below average?"' },
    { label: 'C', text: '"So my child got 38 percent of the questions correct on the test?"' },
    { label: 'D', text: '"Does the grade equivalent of 3.7 mean my child is reading at a third-grade level?"' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. Percentile rank and percent-correct are two entirely different score types that are frequently confused. A percentile rank of 38 means the student scored at or above 38% of students in the norming group — it says nothing about how many items the student answered correctly. A student could earn a 38th percentile score while answering 65% of items correctly, depending on how the norming sample performed. Option A is incorrect because this accurately states the definition of percentile rank; it is not a misinterpretation. Option B is incorrect because asking about performance bands is a legitimate interpretive question; stanines 4–6 represent the average range, so stanine 4 is at the lower edge of average. Option D is incorrect because while the grade equivalent score is frequently misinterpreted in other ways (e.g., confusing it with placement readiness), the question simply asks what grade level the student is reading at, which is actually the most accurate plain-language interpretation of a grade equivalent score.`,
},

// Q82 → D (IRI: student is instructed at frustrational level → what's the problem?)
{
  pos: 82,
  questionText: `A reading specialist administers an Informal Reading Inventory and determines that a fourth-grade student's independent reading level is grade 2, instructional level is grade 3, and frustrational level begins at grade 4. The student's classroom teacher uses grade 4 materials for all reading instruction. What is the most pressing instructional concern revealed by this IRI data?`,
  options: [
    { label: 'A', text: 'The student is reading independently at grade 2, which confirms appropriate grade placement and requires no changes' },
    { label: 'B', text: 'The IRI identifies a phonological processing deficit that requires immediate Tier 3 intervention' },
    { label: 'C', text: 'The student\'s frustrational level beginning at grade 4 qualifies the student for special education services' },
    { label: 'D', text: 'The student is receiving all reading instruction at the frustrational level, which produces comprehension breakdown and reading avoidance and should be immediately addressed by matching instructional materials to the student\'s instructional level' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. An IRI classifies texts as independent (read with ease, 95%+ accuracy), instructional (appropriate for guided work with teacher support, 90–94% accuracy), or frustrational (too difficult even with support, below 90% accuracy). This student's frustrational level begins at grade 4 — the exact level at which all instruction is occurring. When students are consistently taught at the frustrational level, comprehension breaks down, reading engagement deteriorates, and students cannot benefit from instruction because the text's difficulty overwhelms available cognitive resources. The teacher should use grade 3 materials for instructional reading while scaffolding access to grade-level content. Option A is incorrect because an independent level two years below grade placement indicates significant need, not an absence of concern. Option B is incorrect because the IRI assesses text-level reading, not phonological processing; it does not diagnose the cause of the difficulty. Option C is incorrect because frustrational performance at one grade level on an IRI is not a sufficient basis for a special education determination; instructional level mismatch is the immediate, actionable concern.`,
},

// Q83 → C (MULTI-STIMULUS: score report — which aide claim is incorrect?)
{
  pos: 83,
  questionText: `A teacher receives a norm-referenced reading assessment report for a student showing: percentile rank = 42, grade equivalent = 3.4, stanine = 5. The teacher's aide makes four interpretive claims about the scores. Which claim is INCORRECT?`,
  options: [
    { label: 'A', text: '"A stanine of 5 is right in the middle of the average range on a nine-point scale."' },
    { label: 'B', text: '"A percentile rank of 42 means the student scored at or above 42% of the norming group."' },
    { label: 'C', text: '"A grade equivalent of 3.4 means the student should be placed in third-grade reading materials for instruction."' },
    { label: 'D', text: '"All three scores are broadly consistent with each other — they all describe a student near the average range."' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. Grade equivalent scores are among the most consistently misinterpreted scores in education. A grade equivalent of 3.4 means the student earned the same raw score on this test as the average student in the fourth month of third grade earned — it is a comparison metric, not a placement recommendation. The student's instructional level must be determined through a separate assessment (such as a running record or IRI) that directly evaluates reading performance in actual text at various difficulty levels. Option A is incorrect because stanine 5 is literally the midpoint of the 1–9 stanine scale, and stanines 4–6 represent the average range; this is an accurate interpretation. Option B is incorrect because percentile rank 42 does mean the student scored at or above 42% of the norming group; this is the correct definition of percentile rank. Option D is incorrect because a 42nd percentile, stanine 5, and grade equivalent 3.4 in the fourth month of third grade are broadly consistent with each other, all describing near-average performance; this interpretation is reasonable.`,
},

// Q85 → B (MULTI-STIMULUS: screener data → grouping and instructional plan)
{
  pos: 85,
  questionText: `A second-grade teacher's fall benchmark data shows: 14 of 22 students scoring above the 40th percentile (on track), 5 students between the 20th and 40th percentile (some risk), and 3 students below the 10th percentile (significant risk). She uses this data to plan her reading block. Which grouping and instructional plan most directly reflects evidence-based, MTSS-aligned practice?`,
  options: [
    { label: 'A', text: 'Divide the class into two groups — on-track and not on-track — and provide the same supplemental intervention to all 8 students who scored below the 40th percentile' },
    { label: 'B', text: 'Provide all 22 students with Tier 1 core instruction; deliver Tier 2 small-group intervention targeting the 5 some-risk students; conduct diagnostic follow-up for the 3 significant-risk students to determine specific skill gaps before assigning an intervention approach' },
    { label: 'C', text: 'Refer the 3 significant-risk students to special education and continue with whole-class Tier 1 instruction for the remaining 19 students' },
    { label: 'D', text: 'Keep all 22 students in one group for whole-class instruction to avoid stigmatizing students who might be placed in a lower group' },
  ],
  correctAnswer: 'B',
  explanation: `Correct Response: B. MTSS-aligned practice uses screener data to differentiate instruction: all students receive high-quality Tier 1 core instruction; some-risk students receive Tier 2 supplemental small-group support targeting their identified area of need; significant-risk students require diagnostic assessment to determine the specific nature and intensity of their difficulties before an intervention approach can be appropriately designed. This approach matches support intensity to assessed need. Option A is incorrect because grouping all 8 below-40th-percentile students together and providing the same intervention ignores the qualitatively different profiles and needs of some-risk versus significant-risk students. Option C is incorrect because below-benchmark screening scores are not grounds for a special education referral; students must receive and fail to respond adequately to evidence-based interventions before eligibility evaluation is warranted. Option D is incorrect because avoiding differentiated support to prevent stigma denies students who need additional intervention access to appropriate help; this is not evidence-based practice.`,
},

// Q86 → C (whiteboard show-me: purpose AND limitation of this formative technique)
{
  pos: 86,
  questionText: `During a phonics lesson on the vowel-consonant-e pattern, a teacher asks students to write one word using the new pattern on individual whiteboards and hold them up simultaneously. The teacher scans the class in 10 seconds. Which statement most accurately describes both the purpose AND the limitation of this technique?`,
  options: [
    { label: 'A', text: 'It is a summative assessment because it documents whether students have achieved mastery of the VCe standard, and its limitation is that it does not capture individual growth over time' },
    { label: 'B', text: 'It is a norm-referenced assessment because the teacher compares students\' responses to each other, and its limitation is the absence of a national norming sample for comparison' },
    { label: 'C', text: 'It is an informal formative check that provides quick whole-class feedback during instruction, but it does not reveal why individual students produced an incorrect response or which specific aspect of the pattern is misunderstood' },
    { label: 'D', text: 'It is a criterion-referenced assessment because it measures performance against the VCe standard, and its limitation is that it cannot be used for grading purposes' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. The whiteboard simultaneous-response technique is a classic informal formative assessment: it gives the teacher an immediate whole-class snapshot to determine whether re-teaching is needed before the lesson ends. Its limitation is that it is quick and binary — correct or not correct — and does not provide diagnostic information about why a student produced an incorrect word or which specific element of the VCe pattern is misunderstood. Option A is incorrect because summative assessments are administered after a period of instruction to measure accumulated achievement; this technique occurs during instruction to inform immediate instructional decisions, which is the defining characteristic of formative assessment. Option B is incorrect because norm-referenced assessment compares students to a nationally representative sample, not to each other; the teacher scanning the class is looking for instructional feedback, not ranking students. Option D is incorrect because while the technique relates to a specific phonics standard, criterion-referenced assessment formally measures whether a student has met a predetermined mastery criterion with a scored instrument; a rapid visual scan is too informal and unscored to function as criterion-referenced assessment.`,
},

// Q89 → C (benchmark data shows no growth after Tier 2 intervention → what next?)
{
  pos: 89,
  questionText: `A third-grade student has been receiving Tier 2 small-group intervention since October. The winter benchmark assessment shows the student made no measurable progress from fall. The classroom teacher is deciding how to respond. According to MTSS principles, which action is most appropriate?`,
  options: [
    { label: 'A', text: 'Discontinue the intervention and re-screen at the spring benchmark window to allow more time for growth to manifest' },
    { label: 'B', text: 'Continue the current intervention unchanged for the remainder of the year since growth sometimes appears later in the year' },
    { label: 'C', text: 'Convene a problem-solving team to review the intervention\'s fidelity and intensity and make data-based decisions about adjusting or intensifying the approach' },
    { label: 'D', text: 'Immediately refer the student for a special education evaluation based on the winter benchmark data showing a lack of progress' },
  ],
  correctAnswer: 'C',
  explanation: `Correct Response: C. When a student shows inadequate progress after a reasonable period of evidence-based Tier 2 intervention, MTSS frameworks call for a data-based problem-solving process — not automatic escalation and not passive continuation of the same approach. The team examines whether the intervention was implemented as designed (fidelity), whether the dose and frequency are sufficient (intensity), and whether a different or more intensive approach is needed. This review drives the next instructional decision. Option A is incorrect because removing intervention when a student is failing to progress eliminates support at the moment the student most needs it; waiting passively for spring data prolongs the educational gap. Option B is incorrect because continuing a demonstrably ineffective intervention unchanged prolongs the student's lack of progress without examining or addressing the cause of non-response. Option D is incorrect because one period of non-response to a single Tier 2 intervention is not sufficient grounds for a special education referral; MTSS requires documented non-response to multiple evidence-based interventions before eligibility evaluation is initiated.`,
},

// ══════════════════════════════════════════════════════════════════
// SUBAREA III — Obj 0009 (Literacy Instruction)
// ══════════════════════════════════════════════════════════════════

// Q94 → D (family literacy: ELL families — most accessible and research-aligned approach)
{
  pos: 94,
  questionText: `A teacher learns that several students in her class have very limited access to books at home and that their families primarily speak a language other than English. She wants to design a home-school literacy initiative that is genuinely accessible and grounded in research on literacy development for multilingual learners. Which approach is most consistent with evidence-based family literacy practice?`,
  options: [
    { label: 'A', text: 'Distributing grade-level English books with a letter asking parents to listen to their child read in English each night' },
    { label: 'B', text: 'Concentrating all literacy development support within the school environment since home support from non-English-speaking families is unlikely to be academically effective' },
    { label: 'C', text: 'Sending home phonics worksheets so parents can reinforce the week\'s English sound-spelling patterns with their child each evening' },
    { label: 'D', text: 'Providing multilingual take-home books and encouraging families to engage in rich storytelling, discussion, and reading in the home language — explaining that home-language literacy and oral language strength directly support English literacy development' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. Research on biliteracy and family literacy — including work by Ada, Cummins, and Moll — consistently demonstrates that rich oral language and literacy experiences in the home language build the cognitive and linguistic foundation that transfers to English literacy acquisition. Providing multilingual resources and validating home-language engagement as a bridge to English removes access barriers and creates a genuinely inclusive family literacy partnership. Option A is incorrect because sending grade-level English books to families without English literacy creates a barrier rather than a bridge; families cannot support English reading they cannot read themselves. Option B is incorrect because dismissing home literacy support as ineffective for non-English-speaking families ignores substantial research showing that family engagement — when designed to be linguistically accessible — has significant positive effects on children's literacy development. Option C is incorrect because English phonics worksheets require metalinguistic knowledge of English sound-spelling relationships that may exceed parents' English literacy, making this approach unlikely to be implemented successfully and potentially increasing family anxiety about participation.`,
},

// Q99 → D (MULTI-STIMULUS: schedule vs. data misalignment — what's the critical gap?)
{
  pos: 99,
  questionText: `A literacy coach reviews a third-grade teacher's reading block data and schedule together. The fall benchmark shows: 58% of students on track (at or above the 40th percentile), 26% some risk (20th–40th percentile), and 16% significant risk (below the 20th percentile). The teacher's daily schedule allocates: 65 minutes of whole-class instruction, 0 minutes of differentiated small-group instruction, and 15 minutes of independent reading. The coach identifies the most critical misalignment between the data and the schedule. What is it?`,
  options: [
    { label: 'A', text: 'The teacher spends too much time on whole-class instruction when data shows most students are already on track' },
    { label: 'B', text: 'The 15 minutes of independent reading is insufficient; it should be increased to 30 minutes for all students to build reading volume' },
    { label: 'C', text: 'The assessment data is insufficient to draw conclusions about the schedule since it was collected only once in the fall' },
    { label: 'D', text: 'The schedule provides no time for differentiated small-group instruction, leaving the 42% of below-benchmark students with only the whole-class instruction that has already proven insufficient for them' },
  ],
  correctAnswer: 'D',
  explanation: `Correct Response: D. When 42% of students are below benchmark, evidence-based MTSS practice requires differentiated small-group instruction — Tier 2 and Tier 3 support — in addition to whole-class Tier 1 instruction. A schedule with zero small-group time means below-benchmark students receive only the same whole-class instruction that has already failed to bring them to benchmark. The structural misalignment is the complete absence of differentiated support for students who demonstrably need it. Option A is incorrect because 65 minutes of whole-class Tier 1 instruction is not inherently excessive; the problem is the absence of additional differentiated time for the 42% who need more, not the amount of whole-class time. Option B is incorrect because increasing independent reading time for all students is not the critical misalignment; below-benchmark students need targeted guided instruction, not simply more independent reading time. Option C is incorrect because fall benchmark screener data is specifically designed to be immediately actionable for instructional planning decisions; a single screener administration is the standard trigger for MTSS differentiation.`,
},

]

// ─── APPLY UPDATES ────────────────────────────────────────────────────────────
async function main() {
  await connectDB()
  console.log(`Applying ${rewrites.length} PT3 question rewrites...\n`)

  let successCount = 0
  let errorCount = 0

  for (const r of rewrites) {
    const id = IDS[r.pos]
    if (!id) {
      console.log(`ERROR: No ID mapped for position ${r.pos}`)
      errorCount++
      continue
    }

    try {
      await Question.findByIdAndUpdate(id, {
        questionText: r.questionText,
        options: r.options,
        correctAnswer: r.correctAnswer,
        explanation: r.explanation,
      })
      console.log(`✓ Q${r.pos} (${id}) — correct: ${r.correctAnswer}`)
      successCount++
    } catch (err) {
      console.log(`✗ Q${r.pos}: ${err}`)
      errorCount++
    }
  }

  console.log(`\n─────────────────────────────────────`)
  console.log(`Done: ${successCount} updated, ${errorCount} errors`)

  // Verify correct answer distribution
  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  rewrites.forEach(r => { dist[r.correctAnswer] = (dist[r.correctAnswer] || 0) + 1 })
  console.log(`\nCorrect answer distribution in rewrites:`)
  Object.entries(dist).forEach(([k, v]) => console.log(`  ${k}: ${v}`))

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
