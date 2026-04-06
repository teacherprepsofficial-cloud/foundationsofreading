/**
 * Trim PT4 answer options — two rules only:
 *   Rule 1: Cut definitional glosses from concept-name options
 *   Rule 2: Trim correct answer when it is longer than distractors
 *
 * No new words added — removal only.
 * Run: npx tsx scripts/trim-pt4-options.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

interface Trim { pos: number; id: string; label: string; from: string; to: string }

const trims: Trim[] = [

  // ── Q6 — Concept names with ", [definition]" glosses ─────────────────────────
  { pos:  6, id: '69cfec5ae07395d6959c4502', label: 'A',
    from: 'The concept of word, distinguishing printed from spoken words',
    to:   'The concept of word' },
  { pos:  6, id: '69cfec5ae07395d6959c4502', label: 'B',
    from: 'The alphabetic principle, understanding that letters represent phonemes',
    to:   'The alphabetic principle' },
  { pos:  6, id: '69cfec5ae07395d6959c4502', label: 'C',
    from: 'Phonological awareness, hearing sound units within spoken words',
    to:   'Phonological awareness' },
  { pos:  6, id: '69cfec5ae07395d6959c4502', label: 'D',
    from: 'Orthographic mapping, storing words in long-term visual memory',
    to:   'Orthographic mapping' },

  // ── Q8 — Phoneme skills with "by [gloss]" ────────────────────────────────────
  { pos:  8, id: '69cfec5ae07395d6959c4504', label: 'A',
    from: 'Phoneme isolation by identifying the initial sound',
    to:   'Phoneme isolation' },
  { pos:  8, id: '69cfec5ae07395d6959c4504', label: 'B',
    from: 'Phoneme segmentation by counting individual sounds',
    to:   'Phoneme segmentation' },
  { pos:  8, id: '69cfec5ae07395d6959c4504', label: 'C',
    from: 'Phoneme blending by combining separate sounds into a word',
    to:   'Phoneme blending' },
  { pos:  8, id: '69cfec5ae07395d6959c4504', label: 'D',
    from: 'Phoneme manipulation by substituting a vowel sound',
    to:   'Phoneme manipulation' },

  // ── Q12 — Syllable types with "ending in / containing" glosses ───────────────
  { pos: 12, id: '69cfec5ae07395d6959c4508', label: 'A',
    from: 'An open syllable ending in a long vowel',
    to:   'An open syllable' },
  { pos: 12, id: '69cfec5ae07395d6959c4508', label: 'B',
    from: 'A vowel team syllable containing two vowel letters',
    to:   'A vowel team syllable' },
  { pos: 12, id: '69cfec5ae07395d6959c4508', label: 'C',
    from: 'A VCe syllable with a silent final e',
    to:   'A VCe syllable' },
  { pos: 12, id: '69cfec5ae07395d6959c4508', label: 'D',
    from: 'A closed syllable ending in a consonant sound',
    to:   'A closed syllable' },

  // ── Q23 — Vocabulary tiers with definitional glosses ─────────────────────────
  { pos: 23, id: '69cfec5ae07395d6959c4513', label: 'A',
    from: 'A Tier 1 word used in everyday conversation',
    to:   'A Tier 1 word' },
  { pos: 23, id: '69cfec5ae07395d6959c4513', label: 'B',
    from: 'A Tier 2 word appearing across multiple content areas',
    to:   'A Tier 2 word' },
  { pos: 23, id: '69cfec5ae07395d6959c4513', label: 'C',
    from: 'A Tier 3 word specific to the domain of earth science',
    to:   'A Tier 3 word' },
  { pos: 23, id: '69cfec5ae07395d6959c4513', label: 'D',
    from: 'A high-frequency word that needs no direct instruction',
    to:   'A high-frequency word' },

  // ── Q24 — Vocabulary approaches with "using / applying / with" glosses ────────
  { pos: 24, id: '69cfec5ae07395d6959c4514', label: 'A',
    from: 'Semantic mapping connecting the word to related word networks',
    to:   'Semantic mapping' },
  { pos: 24, id: '69cfec5ae07395d6959c4514', label: 'B',
    from: 'Vocabulary self-collection using student-selected words from authentic reading',
    to:   'Vocabulary self-collection' },
  { pos: 24, id: '69cfec5ae07395d6959c4514', label: 'C',
    from: 'Morphemic analysis applying prefix and root knowledge to unknown words',
    to:   'Morphemic analysis' },
  { pos: 24, id: '69cfec5ae07395d6959c4514', label: 'D',
    from: 'Direct vocabulary instruction with teacher-selected Tier 2 words',
    to:   'Direct vocabulary instruction' },

  // ── Q25 — Vocabulary approaches with glosses ─────────────────────────────────
  { pos: 25, id: '69cfec5ae07395d6959c4515', label: 'A',
    from: 'Etymology instruction tracing word origins to build meaning connections',
    to:   'Etymology instruction' },
  { pos: 25, id: '69cfec5ae07395d6959c4515', label: 'B',
    from: 'Context clue analysis using nearby words to infer meaning',
    to:   'Context clue analysis' },
  { pos: 25, id: '69cfec5ae07395d6959c4515', label: 'C',
    from: 'Semantic mapping organizing words around a central concept',
    to:   'Semantic mapping' },
  { pos: 25, id: '69cfec5ae07395d6959c4515', label: 'D',
    from: 'Vocabulary self-collection choosing interesting words from independent reading',
    to:   'Vocabulary self-collection' },

  // ── Q30 — Word types with "— [definition]" glosses ───────────────────────────
  { pos: 30, id: '69cfec5ae07395d6959c451a', label: 'A',
    from: 'A homophone — two words that sound the same but have different spellings',
    to:   'A homophone' },
  { pos: 30, id: '69cfec5ae07395d6959c451a', label: 'B',
    from: 'A polysemous word — one spelling and pronunciation with multiple meanings',
    to:   'A polysemous word' },
  { pos: 30, id: '69cfec5ae07395d6959c451a', label: 'C',
    from: 'A cognate — a word sharing meaning across two languages',
    to:   'A cognate' },
  { pos: 30, id: '69cfec5ae07395d6959c451a', label: 'D',
    from: 'A compound word — two base words combined to form a new meaning',
    to:   'A compound word' },

  // ── Q38 — Fluency components with "by [gloss]" ───────────────────────────────
  { pos: 38, id: '69cfec5ae07395d6959c4522', label: 'A',
    from: 'Accuracy by correcting decoding errors in the script text',
    to:   'Accuracy' },
  { pos: 38, id: '69cfec5ae07395d6959c4522', label: 'B',
    from: 'Prosody by reading with expression appropriate to the character',
    to:   'Prosody' },
  { pos: 38, id: '69cfec5ae07395d6959c4522', label: 'C',
    from: 'Rate by maximizing the number of words read per minute',
    to:   'Rate' },
  { pos: 38, id: '69cfec5ae07395d6959c4522', label: 'D',
    from: 'Phonemic awareness by practicing sounds in scripted dialogue',
    to:   'Phonemic awareness' },

  // ── Q39 — Assessment types with "used for / for" glosses ─────────────────────
  { pos: 39, id: '69cfec5ae07395d6959c4523', label: 'A',
    from: 'An informal running record used for diagnostic error analysis',
    to:   'An informal running record' },
  { pos: 39, id: '69cfec5ae07395d6959c4523', label: 'B',
    from: 'A curriculum-based measure for monitoring oral reading fluency progress',
    to:   'A curriculum-based measure' },
  { pos: 39, id: '69cfec5ae07395d6959c4523', label: 'C',
    from: 'A formal norm-referenced test of reading achievement level',
    to:   'A formal norm-referenced test' },
  { pos: 39, id: '69cfec5ae07395d6959c4523', label: 'D',
    from: 'A holistic rubric assessment of prosodic reading quality',
    to:   'A holistic rubric assessment' },

  // ── Q40 — Correct answer A longer than distractors ───────────────────────────
  { pos: 40, id: '69cfec5ae07395d6959c4524', label: 'A',
    from: 'The student has adequate fluency for familiar text but has not yet automatized decoding of grade-level vocabulary',
    to:   'The student has adequate fluency for familiar text but has not yet automatized decoding' },

  // ── Q48 — Comprehension types with "by [gloss]" ──────────────────────────────
  { pos: 48, id: '69cfec5ae07395d6959c452c', label: 'A',
    from: 'Literal comprehension by restating stated details from the text',
    to:   'Literal comprehension' },
  { pos: 48, id: '69cfec5ae07395d6959c452c', label: 'B',
    from: 'Evaluative comprehension by judging the character\'s decision',
    to:   'Evaluative comprehension' },
  { pos: 48, id: '69cfec5ae07395d6959c452c', label: 'C',
    from: 'Inferential comprehension by drawing conclusions beyond the text',
    to:   'Inferential comprehension' },
  { pos: 48, id: '69cfec5ae07395d6959c452c', label: 'D',
    from: 'Phonological comprehension by processing the sound patterns of the text',
    to:   'Phonological comprehension' },

  // ── Q52 — Story elements with "— [definition]" glosses ───────────────────────
  { pos: 52, id: '69cfec5ae07395d6959c4530', label: 'A',
    from: 'Setting — establishes where and when the story takes place',
    to:   'Setting' },
  { pos: 52, id: '69cfec5ae07395d6959c4530', label: 'B',
    from: 'Conflict or problem — what the main character must face',
    to:   'Conflict or problem' },
  { pos: 52, id: '69cfec5ae07395d6959c4530', label: 'C',
    from: 'Theme — conveys the central message of the story',
    to:   'Theme' },
  { pos: 52, id: '69cfec5ae07395d6959c4530', label: 'D',
    from: 'Text structure patterns such as compare and contrast',
    to:   'Text structure patterns' },

  // ── Q56 — Figurative language with participial glosses ───────────────────────
  { pos: 56, id: '69cfec5ae07395d6959c4534', label: 'A',
    from: 'Personification giving human qualities to a nonhuman object',
    to:   'Personification' },
  { pos: 56, id: '69cfec5ae07395d6959c4534', label: 'B',
    from: 'Simile comparing the clock directly to a person',
    to:   'Simile' },
  { pos: 56, id: '69cfec5ae07395d6959c4534', label: 'C',
    from: 'Hyperbole exaggerating the clock\'s size for dramatic effect',
    to:   'Hyperbole' },
  { pos: 56, id: '69cfec5ae07395d6959c4534', label: 'D',
    from: 'Irony creating a contrast between expectation and reality',
    to:   'Irony' },

  // ── Q58 — Literary devices with "— [definition]" glosses ─────────────────────
  { pos: 58, id: '69cfec5ae07395d6959c4536', label: 'A',
    from: 'Foreshadowing — the author hints at upcoming story events',
    to:   'Foreshadowing' },
  { pos: 58, id: '69cfec5ae07395d6959c4536', label: 'B',
    from: 'A simile in the way the author compares the coach to another character',
    to:   'A simile' },
  { pos: 58, id: '69cfec5ae07395d6959c4536', label: 'C',
    from: 'Irony — the coach\'s behavior is the opposite of what is expected',
    to:   'Irony' },
  { pos: 58, id: '69cfec5ae07395d6959c4536', label: 'D',
    from: 'Imagery — the author creates a vivid picture of the scene',
    to:   'Imagery' },

  // ── Q60 — Point of view types with glosses ───────────────────────────────────
  { pos: 60, id: '69cfec5ae07395d6959c4538', label: 'A',
    from: 'Third-person omniscient point of view with full knowledge of all characters',
    to:   'Third-person omniscient point of view' },
  { pos: 60, id: '69cfec5ae07395d6959c4538', label: 'B',
    from: 'Second-person point of view addressing the reader directly as "you"',
    to:   'Second-person point of view' },
  { pos: 60, id: '69cfec5ae07395d6959c4538', label: 'C',
    from: 'First-person point of view from the perspective of the narrator-character',
    to:   'First-person point of view' },
  { pos: 60, id: '69cfec5ae07395d6959c4538', label: 'D',
    from: "Third-person limited point of view following one human character's thoughts",
    to:   'Third-person limited point of view' },

  // ── Q61 — Poetic devices with "based on / created by / —" glosses ────────────
  { pos: 61, id: '69cfec5ae07395d6959c4539', label: 'A',
    from: 'Rhyme scheme based on the pattern of end sounds in the poem',
    to:   'Rhyme scheme' },
  { pos: 61, id: '69cfec5ae07395d6959c4539', label: 'B',
    from: 'Alliteration created by repeating the same beginning consonant sound',
    to:   'Alliteration' },
  { pos: 61, id: '69cfec5ae07395d6959c4539', label: 'C',
    from: 'Meter created by the pattern of stressed and unstressed syllables',
    to:   'Meter' },
  { pos: 61, id: '69cfec5ae07395d6959c4539', label: 'D',
    from: 'Repetition — a word or phrase appearing multiple times in the poem',
    to:   'Repetition' },

  // ── Q62 — Story elements with "— [definition]" glosses ───────────────────────
  { pos: 62, id: '69cfec5ae07395d6959c453a', label: 'A',
    from: "The theme — the story's universal message or lesson",
    to:   'The theme' },
  { pos: 62, id: '69cfec5ae07395d6959c453a', label: 'B',
    from: 'The plot — the sequence of story events',
    to:   'The plot' },
  { pos: 62, id: '69cfec5ae07395d6959c453a', label: 'C',
    from: 'The conflict — the central problem of the story',
    to:   'The conflict' },
  { pos: 62, id: '69cfec5ae07395d6959c453a', label: 'D',
    from: 'The mood — the emotional tone of the story',
    to:   'The mood' },

  // ── Q64 — Reading skills with "of / by" glosses ──────────────────────────────
  { pos: 64, id: '69cfec5ae07395d6959c453c', label: 'A',
    from: "Phonemic awareness of the sounds in the two books' titles",
    to:   'Phonemic awareness' },
  { pos: 64, id: '69cfec5ae07395d6959c453c', label: 'B',
    from: 'Literal comprehension of facts stated in both books separately',
    to:   'Literal comprehension' },
  { pos: 64, id: '69cfec5ae07395d6959c453c', label: 'C',
    from: 'Synthesis by comparing thematic treatments across two texts',
    to:   'Synthesis' },
  { pos: 64, id: '69cfec5ae07395d6959c453c', label: 'D',
    from: 'Fluency by reading both books with accuracy and appropriate pacing',
    to:   'Fluency' },

  // ── Q65 — Literary analysis aspects with "— / mapping / explaining" glosses ──
  { pos: 65, id: '69cfec5ae07395d6959c453d', label: 'A',
    from: "Author's craft — tone, word choice, and mood creation",
    to:   "Author's craft" },
  { pos: 65, id: '69cfec5ae07395d6959c453d', label: 'B',
    from: 'Plot structure mapping the sequence of rising and falling action',
    to:   'Plot structure' },
  { pos: 65, id: '69cfec5ae07395d6959c453d', label: 'C',
    from: 'Character motivation explaining why the main character acts as she does',
    to:   'Character motivation' },
  { pos: 65, id: '69cfec5ae07395d6959c453d', label: 'D',
    from: 'Setting analysis describing the time and place of the story',
    to:   'Setting analysis' },

  // ── Q66 — Narrative elements with "through / showing / —" glosses ────────────
  { pos: 66, id: '69cfec5ae07395d6959c453e', label: 'A',
    from: 'Character development through actions and emotional reactions',
    to:   'Character development' },
  { pos: 66, id: '69cfec5ae07395d6959c453e', label: 'B',
    from: "Conflict showing an internal struggle between the character's thoughts",
    to:   'Conflict' },
  { pos: 66, id: '69cfec5ae07395d6959c453e', label: 'C',
    from: 'Foreshadowing — a hint at a conflict arising later in the story',
    to:   'Foreshadowing' },
  { pos: 66, id: '69cfec5ae07395d6959c453e', label: 'D',
    from: "Imagery describing the physical appearance of the character's room",
    to:   'Imagery' },

  // ── Q67 — Text structure types with glosses ───────────────────────────────────
  { pos: 67, id: '69cfec5ae07395d6959c453f', label: 'A',
    from: 'Cause and effect showing what causes each stage to occur',
    to:   'Cause and effect' },
  { pos: 67, id: '69cfec5ae07395d6959c453f', label: 'B',
    from: 'Problem and solution presenting a difficulty and its resolution',
    to:   'Problem and solution' },
  { pos: 67, id: '69cfec5ae07395d6959c453f', label: 'C',
    from: 'Chronological sequence arranging events in time order',
    to:   'Chronological sequence' },
  { pos: 67, id: '69cfec5ae07395d6959c453f', label: 'D',
    from: 'Compare and contrast examining similarities and differences',
    to:   'Compare and contrast' },

  // ── Q71 — Text structure types with glosses ───────────────────────────────────
  { pos: 71, id: '69cfec5ae07395d6959c4543', label: 'A',
    from: 'Problem and solution addressing a challenge and its remedy',
    to:   'Problem and solution' },
  { pos: 71, id: '69cfec5ae07395d6959c4543', label: 'B',
    from: 'Descriptive text providing sensory details about a topic',
    to:   'Descriptive text' },
  { pos: 71, id: '69cfec5ae07395d6959c4543', label: 'C',
    from: 'Cause and effect explaining the causes and results of pollution',
    to:   'Cause and effect' },
  { pos: 71, id: '69cfec5ae07395d6959c4543', label: 'D',
    from: 'Compare and contrast examining two types of water pollution',
    to:   'Compare and contrast' },

  // ── Q75 — Text structure types with glosses ───────────────────────────────────
  { pos: 75, id: '69cfec5ae07395d6959c4547', label: 'A',
    from: "Chronological sequence describing each shark's life stages in order",
    to:   'Chronological sequence' },
  { pos: 75, id: '69cfec5ae07395d6959c4547', label: 'B',
    from: 'Cause and effect explaining what causes sharks to develop differently',
    to:   'Cause and effect' },
  { pos: 75, id: '69cfec5ae07395d6959c4547', label: 'C',
    from: 'Compare and contrast examining the sharks by the same categories',
    to:   'Compare and contrast' },
  { pos: 75, id: '69cfec5ae07395d6959c4547', label: 'D',
    from: "Problem and solution addressing threats to the sharks' survival",
    to:   'Problem and solution' },

  // ── Q77 — Text structure signal words with glosses ────────────────────────────
  { pos: 77, id: '69cfec5ae07395d6959c4549', label: 'A',
    from: 'Cause and effect linking events to their consequences',
    to:   'Cause and effect' },
  { pos: 77, id: '69cfec5ae07395d6959c4549', label: 'B',
    from: 'Chronological sequence signaling steps or events in order',
    to:   'Chronological sequence' },
  { pos: 77, id: '69cfec5ae07395d6959c4549', label: 'C',
    from: 'Compare and contrast highlighting differences between subjects',
    to:   'Compare and contrast' },
  { pos: 77, id: '69cfec5ae07395d6959c4549', label: 'D',
    from: 'Problem and solution indicating a shift from issue to remedy',
    to:   'Problem and solution' },

  // ── Q78 — Assessment types with participial glosses ──────────────────────────
  { pos: 78, id: '69cfec5ae07395d6959c454a', label: 'A',
    from: 'A diagnostic assessment identifying specific phonological skill gaps',
    to:   'A diagnostic assessment' },
  { pos: 78, id: '69cfec5ae07395d6959c454a', label: 'B',
    from: 'A summative assessment evaluating end-of-year phonological skills',
    to:   'A summative assessment' },
  { pos: 78, id: '69cfec5ae07395d6959c454a', label: 'C',
    from: 'A universal screening assessment identifying students who may be at risk',
    to:   'A universal screening assessment' },
  { pos: 78, id: '69cfec5ae07395d6959c454a', label: 'D',
    from: 'A norm-referenced assessment comparing students across the nation',
    to:   'A norm-referenced assessment' },

  // ── Q79 — MSV cueing types with "— [definition]" glosses ─────────────────────
  { pos: 79, id: '69cfec5ae07395d6959c454b', label: 'A',
    from: 'Structural cues — the substituted word fits the sentence grammar',
    to:   'Structural cues' },
  { pos: 79, id: '69cfec5ae07395d6959c454b', label: 'B',
    from: 'Visual cues — the substituted word begins with the same letter',
    to:   'Visual cues' },
  { pos: 79, id: '69cfec5ae07395d6959c454b', label: 'C',
    from: "Meaning cues — the substituted word preserves the text's meaning",
    to:   'Meaning cues' },
  { pos: 79, id: '69cfec5ae07395d6959c454b', label: 'D',
    from: 'Phonological cues — the two words share similar vowel sounds',
    to:   'Phonological cues' },

  // ── Q80 — Assessment types with "used to [purpose]" glosses ──────────────────
  { pos: 80, id: '69cfec5ae07395d6959c454c', label: 'A',
    from: 'Summative assessment used to assign final semester grades to students',
    to:   'Summative assessment' },
  { pos: 80, id: '69cfec5ae07395d6959c454c', label: 'B',
    from: 'Outcome assessment used to evaluate end-of-program reading achievement',
    to:   'Outcome assessment' },
  { pos: 80, id: '69cfec5ae07395d6959c454c', label: 'C',
    from: 'Norm-referenced assessment used to rank students nationally by performance',
    to:   'Norm-referenced assessment' },
  { pos: 80, id: '69cfec5ae07395d6959c454c', label: 'D',
    from: 'Formative assessment used to inform ongoing instructional grouping decisions',
    to:   'Formative assessment' },

  // ── Q85 — Correct answer D slightly longer: cut "of mastery" ─────────────────
  { pos: 85, id: '69cfec5ae07395d6959c4551', label: 'D',
    from: 'Measure student performance against a defined standard of mastery',
    to:   'Measure student performance against a defined standard' },

  // ── Q88 — Correct answer D longer: cut "in spoken words" ─────────────────────
  { pos: 88, id: '69cfec5ae07395d6959c4554', label: 'D',
    from: 'A phoneme segmentation fluency probe requiring students to say each sound in spoken words',
    to:   'A phoneme segmentation fluency probe requiring students to say each sound' },

  // ── Q90 — Instructional approaches with "centered on / using / with" glosses ─
  { pos: 90, id: '69cfec5ae07395d6959c4556', label: 'A',
    from: 'Whole-language instruction centered on authentic reading and writing',
    to:   'Whole-language instruction' },
  { pos: 90, id: '69cfec5ae07395d6959c4556', label: 'B',
    from: 'Balanced literacy using leveled guided reading groups for all students',
    to:   'Balanced literacy' },
  { pos: 90, id: '69cfec5ae07395d6959c4556', label: 'C',
    from: 'Direct instruction using scripted lessons for all students equally',
    to:   'Direct instruction' },
  { pos: 90, id: '69cfec5ae07395d6959c4556', label: 'D',
    from: 'Multi-Tiered System of Supports with differentiated levels of instruction',
    to:   'Multi-Tiered System of Supports' },

  // ── Q93 — Instructional approaches with glosses ───────────────────────────────
  { pos: 93, id: '69cfec5ae07395d6959c4559', label: 'A',
    from: 'Culturally responsive teaching selecting texts that reflect student backgrounds',
    to:   'Culturally responsive teaching' },
  { pos: 93, id: '69cfec5ae07395d6959c4559', label: 'B',
    from: 'Differentiated instruction adjusting text complexity for individual student needs',
    to:   'Differentiated instruction' },
  { pos: 93, id: '69cfec5ae07395d6959c4559', label: 'C',
    from: 'Balanced literacy instruction combining skills and authentic reading experiences',
    to:   'Balanced literacy instruction' },
  { pos: 93, id: '69cfec5ae07395d6959c4559', label: 'D',
    from: 'Standards-based literacy instruction ensuring equity and coherence across classrooms',
    to:   'Standards-based literacy instruction' },

  // ── Q97 — MTSS tiers with "— [definition]" glosses ───────────────────────────
  { pos: 97, id: '69cfec5ae07395d6959c455d', label: 'A',
    from: 'Tier 1 — high-quality core instruction for all students',
    to:   'Tier 1' },
  { pos: 97, id: '69cfec5ae07395d6959c455d', label: 'B',
    from: 'Tier 2 — supplemental small-group instruction for some students',
    to:   'Tier 2' },
  { pos: 97, id: '69cfec5ae07395d6959c455d', label: 'C',
    from: 'Tier 4 — special education services for identified students',
    to:   'Tier 4' },
  { pos: 97, id: '69cfec5ae07395d6959c455d', label: 'D',
    from: 'Tier 3 — intensive individualized intervention for a few students',
    to:   'Tier 3' },
]

async function main() {
  await connectDB()

  const byId: Record<string, Trim[]> = {}
  for (const t of trims) {
    if (!byId[t.id]) byId[t.id] = []
    byId[t.id].push(t)
  }

  let applied = 0
  let errors = 0

  for (const [id, qTrims] of Object.entries(byId)) {
    const q = await Question.findById(id) as any
    if (!q) {
      console.error(`❌ Q${qTrims[0].pos} (${id}) not found`)
      errors++
      continue
    }

    for (const trim of qTrims) {
      const opt = q.options.find((o: any) => o.label === trim.label)
      if (!opt) {
        console.error(`❌ Q${trim.pos} option ${trim.label} not found`)
        errors++
        continue
      }
      if (opt.text !== trim.from) {
        console.warn(`⚠  Q${trim.pos} ${trim.label} mismatch — skipping`)
        console.warn(`   Expected: ${trim.from.substring(0, 100)}`)
        console.warn(`   Found:    ${opt.text.substring(0, 100)}`)
        errors++
        continue
      }
      opt.text = trim.to
      console.log(`✓  Q${trim.pos} ${trim.label} → trimmed`)
      applied++
    }

    q.markModified('options')
    await q.save()
  }

  console.log(`\n─────────────────────────────`)
  console.log(`Done: ${applied} trims applied, ${errors} errors`)
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
