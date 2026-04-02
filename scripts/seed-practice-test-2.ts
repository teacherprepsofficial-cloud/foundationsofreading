/**
 * Seed Script — NES Foundations of Reading Practice Test 2
 * 100 original multiple-choice questions across all 3 MC subareas
 *
 * Distribution (mirrors real exam):
 *   Subarea I  (Obj 0001–0004): 44 questions
 *   Subarea II (Obj 0005–0007): 33 questions
 *   Subarea III(Obj 0008–0009): 23 questions
 *
 * Run: npx tsx scripts/seed-practice-test-2.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

const questionData = [

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0001 — Language and Emergent Literacy  (13 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'During a whole-group lesson, a kindergarten teacher says: "I am going to say a word. Tell me what word you get when you take away the first sound. The word is \'slip.\'" Which phonemic awareness skill is the teacher assessing?',
    options: [
      { label: 'A', text: 'Phoneme blending — combining separate phonemes into a word' },
      { label: 'B', text: 'Phoneme deletion — removing a specified phoneme from a spoken word and identifying the remaining word' },
      { label: 'C', text: 'Phoneme segmentation — separating a word into its individual sounds' },
      { label: 'D', text: 'Onset-rime blending — combining an initial consonant cluster with a vowel pattern' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phoneme deletion requires the student to mentally remove a specific phoneme from a spoken word and identify what remains. In this case, removing /sl/ from "slip" leaves "ip." This is a sophisticated phonemic awareness task because it requires holding the full phoneme sequence in working memory, deleting one element, and producing the remainder. Option A is incorrect because blending is the opposite operation — combining separately presented phonemes into a whole word, not removing one from a word. Option C is incorrect because segmentation requires the student to break a whole word into all of its individual sounds; the teacher is not asking students to break apart the word, only to delete one sound. Option D is incorrect because onset-rime blending involves combining a single onset (initial consonant or cluster) with a rime unit, which is a less advanced skill than phoneme-level deletion.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A pre-kindergarten teacher notices that during interactive read-alouds, a student consistently holds the book upside down and begins "reading" from the back cover. Which concept of print does this student most need direct instruction in?',
    options: [
      { label: 'A', text: 'Letter recognition — identifying individual letters of the alphabet' },
      { label: 'B', text: 'Word boundaries — understanding that spaces separate written words' },
      { label: 'C', text: 'Print directionality and book orientation — understanding that English print is read from left to right, top to bottom, and that books open from the front' },
      { label: 'D', text: 'The alphabetic principle — understanding that letters represent sounds' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Holding a book upside down and starting from the back cover indicates the student has not yet developed basic concepts about how books are physically oriented and how English print is directionally organized. These are foundational print concepts that must be taught explicitly, typically through shared reading experiences where the teacher models and explicitly names directionality and orientation. Option A is incorrect because letter recognition is a separate skill not implicated by this behavior; the student\'s difficulty is with orientation and directionality rather than with identifying letters. Option B is incorrect because word boundaries (spaces between words) is a more advanced print concept; the student first needs the foundational understanding that books have a front, that pages are turned left to right, and that print flows from left to right and top to bottom. Option D is incorrect because the alphabetic principle involves understanding letter-sound relationships, which is a more advanced concept than basic book handling and print orientation.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher wants to develop students\' phonemic awareness through a rhyming activity. Which of the following activities best targets rhyme production, as opposed to rhyme recognition?',
    options: [
      { label: 'A', text: 'Presenting two words ("cat" and "hat") and asking students to raise their hand if the words rhyme' },
      { label: 'B', text: 'Presenting three words ("sun," "fun," and "dog") and asking students to identify which word does not rhyme with the others' },
      { label: 'C', text: 'Presenting the word "light" and asking students to generate as many rhyming words as they can' },
      { label: 'D', text: 'Presenting a rhyming couplet from a poem and asking students to identify the two rhyming words' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Rhyme production requires students to generate their own rhyming words (words that share the same rime, or ending sound pattern) given a stimulus word. This is a more cognitively demanding task than rhyme recognition because students must access their phonological lexicon and produce a novel response, rather than simply judge whether a presented pair rhymes. Option A is incorrect because judging whether two presented words rhyme is a recognition task — easier than production. Option B is incorrect because identifying the odd-one-out from a set of presented words is also a recognition/judgment task, not production. Option D is incorrect because identifying the rhyming pair from a presented couplet requires recognition of rhyme, not generation of rhyming words.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher is introducing phonological awareness. She says: "Let\'s clap the parts — syllables — in some words. The word is \'rainbow.\' How many claps?" Students clap twice. Then she says "umbrella" and students clap three times. This activity best supports which emergent literacy skill?',
    options: [
      { label: 'A', text: 'Phonemic awareness — isolating individual phonemes in spoken words' },
      { label: 'B', text: 'Syllable segmentation — breaking spoken words into syllable units' },
      { label: 'C', text: 'Onset-rime awareness — identifying the initial consonant and the vowel+remainder of a syllable' },
      { label: 'D', text: 'Letter-sound correspondence — connecting written letters to their phonemes' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Clapping syllables is a classic, evidence-based activity for teaching syllable segmentation — the ability to break a spoken word into its component syllable units. Syllable segmentation is an intermediate level of phonological awareness, more granular than sentence-to-word segmentation but less granular than phoneme-level awareness. Option A is incorrect because phonemic awareness operates at the level of individual phonemes (the smallest units of sound), not syllables. Clapping syllables in "rainbow" (2 claps) does not require isolating individual phonemes. Option C is incorrect because onset-rime activities focus on splitting a single syllable into its onset (consonants before the vowel) and rime (vowel and what follows) — for example, /r/ + /ain/ in "rain." The teacher is clapping whole syllables, not dividing syllables into onset and rime. Option D is incorrect because this activity is entirely oral/auditory; no written letters are present, so letter-sound correspondence is not being addressed.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade student recently immigrated from a Spanish-speaking country. The student demonstrates strong oral Spanish vocabulary and comprehension but struggles to read English text. The teacher observes that the student can accurately name most uppercase letters but confuses several lowercase letters and often substitutes phonemes from Spanish (e.g., reading the short /i/ vowel as the long /e/ sound). Which factor most directly explains the student\'s reading difficulty?',
    options: [
      { label: 'A', text: 'Limited working memory capacity, which prevents the student from holding phoneme sequences in mind long enough to blend them into words' },
      { label: 'B', text: 'Transfer of the Spanish phonemic inventory, which does not include the short /i/ sound, combined with still-developing automaticity with lowercase letter forms' },
      { label: 'C', text: 'Lack of phonological awareness in Spanish, which is preventing transfer to English phonics skills' },
      { label: 'D', text: 'A reading disability, because the student\'s difficulty with letter forms and phoneme substitution is indicative of dyslexia' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. English learners whose home language has a different phoneme inventory often substitute phonemes from their home language when reading English. Spanish does not have the short /i/ phoneme (as in "bit"), so Spanish speakers frequently substitute the long /e/ (as in "beat"), which is the closest Spanish vowel. This is a well-documented cross-linguistic transfer effect, not a disorder. Additionally, uppercase letter recognition typically develops before lowercase, so lowercase confusion is developmentally expected for a recently arrived student. Instruction should explicitly address the English phonemes that differ from Spanish and provide targeted practice with lowercase letter forms. Option A is incorrect because there is no evidence in the described behavior to suggest a working memory deficit; the student\'s pattern of errors is consistent with cross-linguistic transfer. Option C is incorrect because the student demonstrating strong Spanish oral vocabulary and comprehension suggests adequate phonological and linguistic processing in Spanish; the issue is specifically about mapping English phonemes to print, not a lack of phonological awareness. Option D is incorrect because the described errors are consistent with predictable cross-linguistic transfer effects for a new English learner, not with the pattern of phonological processing deficits associated with dyslexia.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'Which of the following best describes the relationship between oral language development and early reading achievement?',
    options: [
      { label: 'A', text: 'Oral language development and reading achievement are largely independent; strong speaking and listening skills do not predict reading success.' },
      { label: 'B', text: 'Oral language provides the vocabulary, syntax, and discourse knowledge that a child maps onto print when learning to read; strong oral language is one of the strongest predictors of reading comprehension.' },
      { label: 'C', text: 'Oral language development is important only for reading comprehension, not for decoding or phonics.' },
      { label: 'D', text: 'Written language is always acquired before oral language, making oral language less critical than exposure to books.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Oral language is the foundation on which reading is built. Children learn to read by mapping written symbols onto an already existing oral language system. A child\'s vocabulary, grammatical knowledge, phonological awareness, and narrative/discourse skills all developed first in the oral modality and are directly leveraged when learning to decode and comprehend text. Oral language breadth and depth is one of the most powerful predictors of reading comprehension. Option A is incorrect because the research is clear that oral language skills — especially vocabulary, syntax, and narrative language — strongly predict reading comprehension outcomes. Option C is incorrect because while oral language is particularly critical for comprehension, phonological awareness (a component of oral language) is also directly foundational to decoding and phonics; the two are not separable. Option D is incorrect because oral language universally develops before written language; children have complex oral language systems years before they encounter formal literacy instruction, and this oral language foundation is essential for reading acquisition.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher conducts shared reading daily, tracking each line of text with a pointer as the class reads together. During one session, she pauses and asks a student to point to the word "jump." The student points to the correct word. This activity most directly assesses which concept of print?',
    options: [
      { label: 'A', text: 'Letter recognition — identifying the individual letters within a word' },
      { label: 'B', text: 'Print carries meaning — understanding that print communicates a message' },
      { label: 'C', text: 'Word boundaries — understanding that a distinct sequence of letters surrounded by spaces constitutes a single word' },
      { label: 'D', text: 'The alphabetic principle — understanding that letters in the word represent specific sounds' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. When a student is asked to point to a specific word within a line of text and successfully locates it, the student is demonstrating understanding of word boundaries — the concept that words are distinct units of print, separated by spaces, and that each word has a specific visual form. This is a foundational concept of print that children must develop before they can engage meaningfully with words in print. Option A is incorrect because letter recognition would involve identifying individual letters within the word, not locating the whole word in context. Option B is incorrect because while the activity occurs within a shared reading context that reinforces print-carries-meaning, the specific act of locating a named word tests word concept, not meaning comprehension. Option D is incorrect because the alphabetic principle is about the systematic relationship between letters and sounds; pointing to a word as a visual unit does not require the student to analyze the letter-sound correspondences within it.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher assesses students\' phonemic awareness with a segmentation task. Most students can accurately segment three-phoneme words like "cat" (/k/-/æ/-/t/) but struggle with four-phoneme words beginning with consonant clusters, like "frog" (/f/-/r/-/ɑ/-/g/). Which of the following best explains why cluster words are more difficult to segment?',
    options: [
      { label: 'A', text: 'Students have not yet learned phonics rules for consonant blends, so they cannot perceive the two consonant phonemes as separate units.' },
      { label: 'B', text: 'Consonant clusters are harder to segment because the phonemes in the cluster are produced very close together in the articulatory stream, making them perceptually more difficult to separate than vowel-consonant sequences.' },
      { label: 'C', text: 'Four-phoneme words are more difficult only because they contain more total phonemes, not because of the cluster itself.' },
      { label: 'D', text: 'Cluster words are more difficult because English spelling does not represent cluster phonemes consistently, confusing students\' phonemic perception.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phonemic awareness is an oral/auditory skill, and the difficulty with consonant clusters is rooted in articulation. When two consonants appear in a cluster (e.g., /fr/ in "frog"), the phonemes are co-articulated — produced simultaneously or in rapid overlap — making them much harder to perceive as two separate, sequential phonemes compared to a vowel between consonants, where the vowel provides a clear acoustic boundary. This is why blends are often taught later in phonological awareness progressions. Option A is incorrect because phonemic awareness is an entirely oral skill; it does not depend on knowledge of written phonics rules. A child does not need to know how blends are spelled to hear two phonemes in "fr." Option C is incorrect because research shows that cluster words are specifically harder than non-cluster words of the same length; the articulatory difficulty of the cluster — not just the word length — is the key factor. Option D is incorrect because phonemic awareness does not involve written spelling at all; the difficulty is auditory and articulatory, not orthographic.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A preschool teacher reads aloud daily and frequently asks questions like "What do you think will happen next?" and "Why do you think the character felt that way?" These practices primarily support which aspect of emergent literacy?',
    options: [
      { label: 'A', text: 'Phonemic awareness — developing sensitivity to the sound structure of language' },
      { label: 'B', text: 'Oral language and narrative comprehension — developing vocabulary, inferential thinking, and listening comprehension through interactive read-alouds' },
      { label: 'C', text: 'Alphabetic principle — building awareness that letters represent sounds' },
      { label: 'D', text: 'Concepts of print — developing awareness of how books and written text are organized' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Purposeful interactive read-alouds in which a teacher asks prediction and inferential questions — "What will happen next?" and "Why did the character feel that way?" — directly build oral language, listening comprehension, and narrative thinking skills. These practices help children develop vocabulary, background knowledge, and the ability to make inferences, all of which are foundational for reading comprehension. Option A is incorrect because phonemic awareness instruction focuses on the sound structure of words (phonemes, syllables, rhymes), not on meaning, prediction, or comprehension discussion. Option C is incorrect because the alphabetic principle requires explicit teaching of letter-sound relationships, which is not what these open-ended comprehension questions address. Option D is incorrect because concepts of print instruction focuses on the physical and organizational features of books and text, not on discussion of meaning, prediction, or character motivation.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'Which statement best distinguishes phonological awareness from phonemic awareness?',
    options: [
      { label: 'A', text: 'Phonological awareness involves the relationship between letters and sounds, while phonemic awareness is purely oral.' },
      { label: 'B', text: 'Phonological awareness is a broad umbrella that includes sensitivity to words, syllables, onset-rime, and individual phonemes; phonemic awareness is a subset of phonological awareness that focuses specifically on individual phonemes.' },
      { label: 'C', text: 'Phonemic awareness is broader than phonological awareness and develops first.' },
      { label: 'D', text: 'Phonological awareness and phonemic awareness are synonymous terms used interchangeably in literacy research.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phonological awareness is the broad, umbrella term for sensitivity to the sound structure of oral language. It encompasses awareness at multiple levels: words in sentences, syllables within words, onset-rime units, and individual phonemes. Phonemic awareness is specifically the most advanced level of phonological awareness — the ability to hear, identify, and manipulate the individual phonemes within spoken words. Every phonemically aware student has phonological awareness, but not every phonologically aware student is yet phonemically aware. Option A is incorrect because phonological awareness — like phonemic awareness — is entirely oral; neither involves letters. The connection between letters and sounds is the alphabetic principle and phonics. Option C is incorrect because the relationship is the reverse: phonological awareness (including word-level and syllable-level awareness) develops before phonemic awareness, and phonemic awareness is the most advanced, not a broader category. Option D is incorrect because the terms are distinct and not synonymous; conflating them leads to imprecise instruction and assessment.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher has a student with a significant hearing impairment who uses hearing aids and can hear most conversational speech but still misses some high-frequency consonant sounds. When planning phonological awareness instruction for this student, the teacher should primarily consider which factor?',
    options: [
      { label: 'A', text: 'The student will be unable to develop phonological awareness and should focus exclusively on visual approaches to literacy.' },
      { label: 'B', text: 'The student\'s hearing access to specific phonemes should inform which phonological distinctions require additional multisensory support, such as using mirrors to observe mouth movements or feeling articulatory vibrations.' },
      { label: 'C', text: 'Phonological awareness instruction is only effective for students with full hearing, so the student should receive only phonics instruction using visual letter-sound charts.' },
      { label: 'D', text: 'The student should be placed in a Tier 3 intervention immediately, as hearing impairment automatically qualifies a student for intensive intervention.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Students with hearing impairments can develop phonological awareness but may need additional multisensory support to access phonemes they do not reliably hear. Effective adaptations include visual articulatory cues (watching mouth movements, using mirrors), tactile-kinesthetic cues (feeling vibration from voiced consonants, feeling air from fricatives), and explicit attention to the phonemes that the student\'s hearing profile makes most difficult. The teacher should consult with the student\'s audiologist and special education team to understand the specific phoneme access profile. Option A is incorrect because many students with hearing impairments do develop phonological and phonemic awareness, particularly with appropriate support. Excluding phonological awareness instruction entirely would be premature and not evidence-based. Option C is incorrect because the assertion that phonological awareness instruction is only for fully hearing students is false; multisensory approaches extend access to phonological awareness for students with hearing loss. Option D is incorrect because hearing impairment alone does not automatically place a student in Tier 3; placement decisions are based on the student\'s specific reading performance data, not diagnosis alone.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher uses interactive writing as part of daily instruction. After a class experience, students dictate a sentence and the teacher scribes while thinking aloud: "The next word is \'jumped.\' /j/ — what letter makes that sound? Let\'s all say it slowly: /j/-/ʌ/-/m/-/p/-/t/. I\'ll write each sound." Students take turns adding letters at the whiteboard. Which of the following best explains why this activity supports both phonemic awareness and the alphabetic principle simultaneously?',
    options: [
      { label: 'A', text: 'Interactive writing is primarily a handwriting activity that builds fine motor skills needed for letter formation.' },
      { label: 'B', text: 'Because the teacher models segmenting the spoken word into phonemes while connecting each phoneme to its written letter, the activity builds awareness of individual sounds (phonemic awareness) while directly demonstrating the systematic sound-to-letter mapping (alphabetic principle).' },
      { label: 'C', text: 'Interactive writing teaches phonemic awareness but cannot teach the alphabetic principle because students are not yet reading independently.' },
      { label: 'D', text: 'The activity supports the alphabetic principle but not phonemic awareness because it involves writing (encoding), not listening to spoken words.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Interactive writing is an instructional technique in which teacher and students collaboratively compose and write text. When the teacher explicitly segments a spoken word into phonemes while simultaneously connecting each phoneme to its corresponding letter, the activity reinforces phonemic awareness (through audible segmentation) and the alphabetic principle (through direct phoneme-to-grapheme mapping) in a meaningful, integrated context. Research supports interactive writing as an evidence-based practice for building these foundational skills. Option A is incorrect because while letter formation is practiced, it is not the primary purpose of the activity; the explicit sound-letter mapping during scribing is the core instructional move. Option C is incorrect because the alphabetic principle can — and should — be taught before students read independently; learning that letters represent sounds is precisely the prerequisite for beginning to decode. Option D is incorrect because the phoneme-by-phoneme oral segmentation that the teacher models and students participate in is explicitly phonemic awareness instruction; encoding and phonemic awareness are deeply interrelated, not mutually exclusive.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher works with a small group of first graders on phoneme substitution. She says: "Say \'shop.\' Now say it again, but instead of /ʃ/, say /t/." A student successfully says "top." Which level of phonological awareness does this task represent?',
    options: [
      { label: 'A', text: 'Syllable level — the task involves dividing the word into syllable units' },
      { label: 'B', text: 'Onset-rime level — the task involves replacing the onset of the syllable' },
      { label: 'C', text: 'Phoneme level — the task requires isolating, removing, and substituting an individual phoneme' },
      { label: 'D', text: 'Word level — the task involves manipulating whole word units in a sentence' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Phoneme substitution — replacing one specific phoneme in a spoken word with a different phoneme — is a phoneme-level task, the most advanced level of phonological awareness. The student must (1) hold the entire phoneme sequence of "shop" in working memory, (2) isolate the initial phoneme /ʃ/, (3) delete it, (4) substitute /t/, and (5) produce the new word "top." All of these operations occur at the individual phoneme level. Option A is incorrect because syllable-level tasks involve chunks of sound larger than individual phonemes, such as clapping syllables or blending syllable units; this task does not involve syllables. Option B is incorrect because onset-rime manipulation involves treating the onset (/ʃ/) and rime (/ɑp/) as the two units being swapped, which is a less granular operation than individual phoneme substitution. In "shop," the onset IS /ʃ/, but the task is characterized as phoneme-level because the operation is specifically at the individual phoneme level. Option D is incorrect because word-level awareness involves words as units within sentences — not manipulation of sounds within words.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0002 — Beginning Reading Skills (Phonics, HFW, Spelling)  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher is planning phonics instruction. She wants to ensure that the sequence of phonics patterns she teaches follows the principle of instructional sequencing by increasing complexity. Which of the following sequences best reflects this principle?',
    options: [
      { label: 'A', text: 'Silent-e words (CVCe) → CVC words → consonant digraphs → vowel teams' },
      { label: 'B', text: 'CVC words → consonant digraphs → silent-e words (CVCe) → vowel teams' },
      { label: 'C', text: 'Vowel teams → silent-e words → consonant digraphs → CVC words' },
      { label: 'D', text: 'Consonant digraphs → vowel teams → CVC words → silent-e words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Evidence-based phonics instruction sequences patterns from simpler to more complex. CVC (consonant-vowel-consonant) words represent the most straightforward pattern, with one consonant, one short vowel, and one final consonant. Consonant digraphs (two consonants making one sound, like "sh" or "ch") add complexity. Silent-e words (CVCe) introduce the concept that a final silent letter changes the medial vowel sound. Vowel teams (two letters making one sound) represent the greatest complexity because they require students to recognize and apply multiple possible vowel digraph patterns. Option A is incorrect because it places the more complex CVCe pattern before the simpler CVC, reversing the appropriate sequence. Option C is incorrect because it begins with the most complex pattern (vowel teams) and ends with the simplest (CVC), which is the inverse of evidence-based instructional sequencing. Option D is incorrect because it begins with digraphs before students have mastered the basic CVC pattern.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher observes that a student consistently reads "house" as "horse," "found" as "fond," and "cloud" as "clod." What phonics pattern does this error analysis most clearly indicate the student has not yet mastered?',
    options: [
      { label: 'A', text: 'R-controlled vowels — the student is unable to decode vowels that are followed by the letter r' },
      { label: 'B', text: 'Vowel diphthongs — the student is not applying the diphthong pattern (ou/ow, oi/oy) and is decoding only a simple short vowel in its place' },
      { label: 'C', text: 'Consonant blends — the student is not blending the initial consonant clusters correctly' },
      { label: 'D', text: 'Vowel teams — the student is substituting long vowel sounds for vowel team patterns' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A diphthong is a vowel sound that glides from one vowel quality to another within a single syllable. In English, common diphthongs include "ou/ow" (as in "house," "found," "cloud") and "oi/oy." The student is systematically omitting the diphthong portion of these vowel sounds and producing a simple short vowel instead (house→horse is not a diphthong error specifically, but found→fond and cloud→clod clearly show the student is not producing the /aʊ/ diphthong in "ou"). This is a consistent pattern indicating the student has not learned or automatized the "ou/ow" diphthong pattern. Option A is incorrect because r-controlled vowels involve vowels followed by r (car, her, bird) — the errors shown do not involve r-controlled contexts. Option C is incorrect because the student is not making errors on the initial consonant clusters (cl- in "cloud" is read correctly as "cl"); the errors occur in the vowel. Option D is incorrect because while diphthongs are sometimes grouped with vowel teams, the specific pattern here — systematically producing a short vowel where an /aʊ/ diphthong belongs — is most precisely described as a diphthong error.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants students to understand that "said" and "was" cannot be decoded using standard phonics rules and must be learned as whole words. The teacher uses a word wall, repeated reading, and visual memory strategies for these words. What term best describes "said" and "was" in this context?',
    options: [
      { label: 'A', text: 'Decodable words — words that follow regular phonics patterns and can be sounded out' },
      { label: 'B', text: 'High-frequency words — words that appear very often in text and include some that are irregular, requiring whole-word recognition' },
      { label: 'C', text: 'Morphologically complex words — words whose meaning is derived from identifiable roots and affixes' },
      { label: 'D', text: 'Content words — words that carry the primary meaning of a sentence, as opposed to function words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. High-frequency words are words that appear very frequently in written text and that readers need to recognize automatically for fluent reading. Many high-frequency words (like "the," "and," "it") are phonically regular, but some (like "said," "was," "of") have irregular phonics patterns — the spelling does not match expected letter-sound rules. These irregular high-frequency words are often called "sight words" and must be learned through repeated exposure, memorization, and practice. Option A is incorrect because "said" and "was" are not decodable via regular phonics rules; applying standard rules to "said" would produce an incorrect pronunciation. Option C is incorrect because morphological complexity involves roots and affixes (e.g., "unhappiness" = un + happy + ness); "said" and "was" are simple, single-morpheme words. Option D is incorrect because "said" and "was" are function words (they signal grammatical relationships) rather than content words (which carry primary semantic meaning like nouns, verbs, adjectives).',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher uses word-sorting activities in which students sort picture cards into groups based on their initial consonant sounds, then later sort word cards by their vowel pattern. Which aspect of beginning reading does this activity primarily support?',
    options: [
      { label: 'A', text: 'Fluency development — building automaticity through repeated reading of the sorted words' },
      { label: 'B', text: 'Phonics pattern recognition and categorization — helping students discover and internalize sound-spelling patterns by comparing and contrasting words' },
      { label: 'C', text: 'Vocabulary development — building word knowledge by grouping words by meaning categories' },
      { label: 'D', text: 'Morphemic analysis — identifying common prefixes and suffixes across sorted word groups' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Word sorting is an evidence-based phonics instructional activity that develops pattern recognition by requiring students to compare and contrast words according to their phonics features (initial sound, vowel pattern, syllable type, etc.). By sorting words with the same vowel pattern together, students develop the ability to recognize and generalize those patterns, which supports accurate and automatic decoding. Option A is incorrect because while students may read words during sorting, the primary purpose is pattern discovery and categorization, not building reading speed through repetition. Option C is incorrect because the sorting in this activity is based on sound-spelling features, not semantic meaning categories; grouping by initial sound or vowel pattern is a phonics/orthographic task. Option D is incorrect because morphemic analysis focuses on the meaning units in words (roots, prefixes, suffixes); the sorting activities described do not address morpheme identification.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher provides students with decodable readers after teaching the CVC pattern and before teaching the CVCe pattern. A colleague argues that students should read authentic children\'s literature instead. Which is the most compelling evidence-based justification for using decodable texts at this stage?',
    options: [
      { label: 'A', text: 'Decodable texts are more engaging and motivating than authentic literature for most first graders.' },
      { label: 'B', text: 'Decodable texts ensure that students can successfully apply their current phonics knowledge to most words in the text, promoting accurate decoding practice and preventing guessing strategies based on pictures or context.' },
      { label: 'C', text: 'Authentic literature is inappropriate for first graders because the vocabulary is too complex for their developmental level.' },
      { label: 'D', text: 'Decodable texts are preferable because they contain more background knowledge content than authentic children\'s literature.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The research rationale for decodable texts is specifically about controlled application of phonics knowledge. When students read texts where most words conform to the phonics patterns they have already been taught, they can practice applying those patterns accurately and build the fluent word recognition that comes from successful decoding repetition. If students encounter many words they cannot yet decode, they revert to guessing strategies — using pictures, initial letters, or context — which does not build the phonics foundation needed for automatic word recognition. Decodable texts are a targeted instructional tool for this specific purpose. Option A is incorrect because engagement and motivation are not the research rationale for decodable texts; in fact, some students find decodable texts less engaging, which is one argument critics make. Option C is incorrect because authentic literature is not inappropriate for first graders; teachers use it for read-alouds and shared reading, where the teacher provides access to language beyond students\' independent decoding level. Option D is incorrect because decodable texts are designed for phonics pattern practice, not content knowledge transmission; their content is typically simple and constrained by the phonics patterns they target.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A student writes "playd" for "played," "jumpd" for "jumped," and "lookd" for "looked." Which area of phonics/spelling knowledge does this error pattern most directly indicate?',
    options: [
      { label: 'A', text: 'The student has not mastered CVC word spelling patterns and is omitting vowels.' },
      { label: 'B', text: 'The student understands the meaning of the past-tense inflection but has not yet learned that the -ed suffix has three phonological realizations (/d/, /t/, /ɪd/) and is always spelled <-ed> regardless of pronunciation.' },
      { label: 'C', text: 'The student is using phonetic spelling to represent past tense, which suggests the student is ready to move past all phonics instruction.' },
      { label: 'D', text: 'The student does not understand the concept of verb tense and needs instruction in grammar before spelling can be addressed.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student is applying phonetic logic: "played" ends in the sound /d/, "jumped" ends in /t/, and "looked" ends in /t/ — so the student spells what they hear. This is actually a sophisticated phonetic attempt that demonstrates the student understands past tense as a concept. However, the student has not yet learned that the past-tense inflectional morpheme -ed has a consistent spelling (<-ed>) even though it has three different phonological realizations depending on the final phoneme of the base verb. This is an inflectional morpheme spelling principle that should be taught explicitly. Option A is incorrect because the student is correctly spelling the vowel sounds in the base words; the error is specifically in the past-tense suffix representation, not in vowel omission. Option C is incorrect because this error pattern represents a specific, teachable gap in knowledge about the -ed suffix morpheme; it does not mean the student has completed phonics learning. Option D is incorrect because the student\'s consistent use of past-tense markers across all three examples demonstrates clear understanding of verb tense as a grammatical concept; the issue is specifically about spelling convention, not conceptual understanding of tense.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher is teaching the consonant digraph "sh" (as in "ship," "fish," "brush"). Which explanation most accurately describes a consonant digraph?',
    options: [
      { label: 'A', text: 'Two consonants that each retain their individual sounds when placed together in a blend (e.g., /s/ and /t/ in "stop")' },
      { label: 'B', text: 'Two consonant letters that together represent a single phoneme that is distinct from either letter\'s individual sound (e.g., sh = /ʃ/)' },
      { label: 'C', text: 'A single consonant letter that can represent two different sounds depending on its position in a word' },
      { label: 'D', text: 'A vowel combination that creates a new vowel sound when the two vowels appear together' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A consonant digraph is a pair of consonant letters that together represent a single phoneme — a sound that is neither the sound of the first letter nor the sound of the second letter individually. "sh" represents /ʃ/ (the sound in "ship"), "ch" represents /tʃ/ (the sound in "chip"), "th" represents /θ/ or /ð/ (the sounds in "thin" or "this"), and "wh" represents /w/ (the sound in "when"). These are distinct from blends, where each consonant retains its own sound. Option A is incorrect because that description defines a consonant blend (also called a consonant cluster), not a digraph. In a blend, each letter represents its own phoneme — /s/ and /t/ are both heard in "stop." Option C is incorrect because that describes letter ambiguity (like "c" saying /k/ or /s/), not a digraph. Option D is incorrect because that describes a vowel digraph or vowel team; the question is specifically about consonant digraphs.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade student reads connected text with adequate accuracy (96%) but reads word-by-word without natural phrasing. The student can decode most words correctly when reading aloud slowly but does not group words into meaningful phrases. The teacher wants to use phonics instruction to address this problem. Which explanation best justifies why additional phonics instruction is unlikely to solve this particular fluency issue?',
    options: [
      { label: 'A', text: 'Phonics instruction is only appropriate for kindergarten and first grade; second-grade fluency issues always require comprehension instruction.' },
      { label: 'B', text: 'The student\'s 96% accuracy indicates adequate decoding of individual words; the word-by-word reading without phrasing suggests the difficulty is with prosody and syntactic phrasing awareness rather than phonics.' },
      { label: 'C', text: 'Phonics instruction cannot be combined with fluency instruction, so the teacher must choose one focus.' },
      { label: 'D', text: 'The student\'s accuracy is actually too low (below 97%) to benefit from phonics instruction and the teacher should focus only on oral language.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Reading fluency has three components: accuracy, rate, and prosody. Prosody includes the phrasing, intonation, and expression that a skilled reader applies when reading aloud. The student in this scenario decodes individual words accurately (96%) but reads word-by-word without grouping words into syntactic phrases. This is a prosody issue, not a phonics issue. Prosody requires sensitivity to the syntactic (grammatical) structure of sentences and the ability to use that structure to phrase text meaningfully. Appropriate interventions include phrase-cued reading (text marked with phrasing cues), modeling with echo reading, and building familiarity with sentence structures. Option A is incorrect because phonics instruction is appropriate whenever a student has phonics gaps, regardless of grade level; the point here is not that second graders don\'t need phonics but that this student\'s specific fluency issue is prosody, not phonics. Option C is incorrect because phonics and fluency instruction can and should be combined across reading instruction; they are not mutually exclusive. Option D is incorrect because 96% accuracy is within the instructional-level range for accuracy; additionally, the claim that accuracy below 97% precludes benefit from phonics instruction is not supported by research.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher uses a word wall — a posted display of high-frequency words grouped alphabetically — as part of her classroom literacy environment. Which of the following describes the primary instructional purpose of a word wall?',
    options: [
      { label: 'A', text: 'To provide students with a reference tool that supports automatic recognition of high-frequency words during reading and writing, and to give teachers a structure for systematic, cumulative word study.' },
      { label: 'B', text: 'To decorate the classroom with literacy-themed visuals that create a print-rich environment.' },
      { label: 'C', text: 'To display the vocabulary words associated with the current thematic content unit.' },
      { label: 'D', text: 'To allow students to independently look up spelling of any unknown word without teacher assistance.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The word wall serves dual instructional purposes: (1) it provides a cumulative, visually accessible reference for high-frequency words that students are working to automatize, supporting them during both reading and writing; and (2) it gives the teacher a systematic, explicit structure for introducing, reviewing, and building automatic recognition of these words over time. Importantly, word wall words should be actively taught and reviewed — not just posted — and students should be expected to spell word-wall words correctly in their writing. Option B is incorrect because while a word wall contributes to a print-rich environment, decorative purpose is not the primary or intended instructional function. Option C is incorrect because content-unit vocabulary (Tier 3 and Tier 2 words) is typically displayed on a separate concept/vocabulary wall; the word wall is specifically for high-frequency words that appear across all texts. Option D is incorrect because word walls do not contain all words a student might encounter; they contain a curated, taught set of high-frequency words, and students should not be directed to a word wall for unfamiliar content words.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A student reads: "The knight rode his horse through the forest." The student reads "knight" as /knɪt/ (pronouncing the silent k). The teacher uses this error as a teachable moment about which reading skill?',
    options: [
      { label: 'A', text: 'Syllabication — explaining that "knight" is a one-syllable word despite its length' },
      { label: 'B', text: 'High-frequency word recognition — pointing out that "knight" is a word the student should memorize as a sight word' },
      { label: 'C', text: 'Orthographic pattern knowledge — teaching the rule that "kn-" at the beginning of a word represents only the /n/ sound (the k is silent), a common English spelling convention' },
      { label: 'D', text: 'Context clues — encouraging the student to use surrounding words to guess the correct pronunciation' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The word "knight" contains the silent-k pattern (kn-), which is a specific orthographic convention in English. Many English words beginning with kn- have a silent k: knight, know, knee, knife, knit. Teaching students about this orthographic pattern (a specific letter combination with a predictable pronunciation rule) is the most targeted and transferable response to this error. The student applied a reasonable phonics rule (k = /k/) but has not yet learned this specific orthographic exception. Option A is incorrect because while the teacher might incidentally note that "knight" is monosyllabic, syllabication is not the source of the error or the most relevant skill to address. Option B is incorrect because "knight" is not typically treated as a high-frequency sight word; it is a low-frequency word that has an unusual but learnable pattern (kn- = /n/). Teaching the pattern is more powerful and generalizable than asking the student to memorize the word. Option C is incorrect because while context clues could help the student guess the meaning, they cannot help the student learn to correctly pronounce or decode kn- words. Context-clue guessing does not build the orthographic knowledge the student needs.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher notices that several students consistently omit the medial vowel in unstressed syllables: they write "litl" for "little," "siml" for "simple," and "sentns" for "sentence." Which concept should the teacher address to help students spell these words correctly?',
    options: [
      { label: 'A', text: 'Phonemic awareness — the students are not accurately hearing all sounds in words' },
      { label: 'B', text: 'Schwa — the reduced, unstressed vowel sound /ə/ that appears in unstressed syllables and is notoriously difficult to spell because it sounds the same regardless of which vowel letter represents it' },
      { label: 'C', text: 'Consonant blends — the students are failing to represent the final consonant clusters in these words' },
      { label: 'D', text: 'Syllable segmentation — the students do not understand that each syllable must contain a vowel' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The schwa /ə/ is the most common vowel sound in English. It is the unstressed, reduced vowel sound that appears in unstressed syllables (the second syllable of "little," "simple," "sentence"). Because every unstressed vowel — a, e, i, o, u — can be reduced to the same schwa sound, students cannot reliably spell the unstressed vowel by listening to it; they must memorize the spelling or learn the morphological origin of the word. This is one of the most common sources of spelling errors in English. Direct instruction about the schwa and why the spelling must be learned as a visual/morphological pattern is the appropriate response. Option A is incorrect because the error is not about mishearing sounds but about the genuine ambiguity of the schwa — all the missing vowels are reduced to the same sound, making phonetic spelling unreliable. Option C is incorrect because the students are not making errors on consonant clusters; the errors are specifically in the unstressed vowel position of the second syllable. Option D is incorrect because while the concept that every syllable contains a vowel is important, the specific instructional target is the schwa — why unstressed vowels are spelled as they are, despite not sounding distinct.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0003 — Word Analysis (Syllabication, Morphemic Analysis)  (10 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A student encounters the word "unhelpful" in a text and pauses. The teacher instructs the student to break the word into meaningful parts. The student identifies "un-" as a prefix, "help" as the base word, and "-ful" as a suffix. This strategy is best described as:',
    options: [
      { label: 'A', text: 'Syllabication — breaking the word into syllable units based on phonological rules' },
      { label: 'B', text: 'Morphemic analysis — breaking a word into its meaningful units (morphemes) to determine its structure and meaning' },
      { label: 'C', text: 'Analogical decoding — comparing the unknown word to a known word that looks similar' },
      { label: 'D', text: 'Context clue use — using surrounding text to determine the word\'s meaning' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Morphemic analysis is the strategy of breaking a word into its component morphemes — the smallest units of meaning — to help decode and understand it. "Unhelpful" contains three morphemes: the prefix "un-" (meaning not), the free base word "help," and the derivational suffix "-ful" (meaning full of or having the quality of). Using this analysis, the student can determine that "unhelpful" means "not having the quality of help." This is a powerful word-learning strategy because it transfers across the many words that share the same morphemes. Option A is incorrect because syllabication divides a word into phonological units (syllables) based on pronunciation patterns, not meaning. Un-help-ful has three syllables, but the syllable boundaries do not necessarily align with the morpheme boundaries. Option C is incorrect because analogical decoding involves using a known word with a similar spelling pattern to decode an unknown one — for example, using "cat" to decode "bat." It does not involve identifying prefixes, bases, and suffixes. Option D is incorrect because the student is not using the words around "unhelpful" to infer its meaning; the student is analyzing the internal structure of the word itself.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher explains: "The suffix -tion doesn\'t change what the word means — it changes how we can use the word in a sentence. \'Create\' is a verb, but \'creation\' is a noun." Which type of morpheme is the suffix -tion?',
    options: [
      { label: 'A', text: 'Inflectional morpheme — it signals a grammatical change such as tense or number without changing the word\'s basic part of speech' },
      { label: 'B', text: 'Free morpheme — it can stand alone as an independent word' },
      { label: 'C', text: 'Derivational morpheme — it changes the part of speech and/or meaning of the base word to create a new, related word' },
      { label: 'D', text: 'Root morpheme — it is an ancient word part from Latin or Greek that forms the base of many English words' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Derivational morphemes change the grammatical category (part of speech) and/or the specific meaning of the base word. The suffix -tion converts a verb (create) into a noun (creation). This is the defining characteristic of derivational morphology: the resulting word is a new, related word with a different part of speech. Other derivational suffixes include -ness (adjective→noun: happy→happiness), -ly (adjective→adverb: quick→quickly), and -ize (noun/adjective→verb: modern→modernize). Option A is incorrect because inflectional morphemes do not change the part of speech or create a new word; they signal grammatical relationships such as tense (-ed, -ing), number (-s), comparison (-er, -est), and possession (\'s). Converting "create" to "creation" is not a grammatical inflection — it creates a new lexical item. Option B is incorrect because -tion cannot stand alone as an independent word; it is a bound morpheme that must attach to a base. Option D is incorrect because a root is a bound morpheme typically from Latin or Greek that carries core meaning but is not a word by itself (e.g., "cred" from credere, "port" from portare). The suffix -tion is a derivational suffix, not a root.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade student reads "exported" and correctly identifies "export" as the base word and "-ed" as the past-tense suffix, but does not recognize the prefix "ex-" within "export." The teacher wants to extend the student\'s morphemic analysis skills. Which instructional move would be most appropriate?',
    options: [
      { label: 'A', text: 'Direct the student to look up "export" in the dictionary to find its definition, then move on to the next word.' },
      { label: 'B', text: 'Teach the student that "export" contains the Latin prefix "ex-" (meaning out or away) and the Latin root "port" (meaning carry), and connect this to related words (import, transport, portable) to build a morpheme family.' },
      { label: 'C', text: 'Tell the student that "export" should be treated as an unanalyzable whole word and memorized as a sight word.' },
      { label: 'D', text: 'Correct the student for not recognizing "ex-" but do not provide explicit instruction about the prefix\'s meaning or related words.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The most powerful morphemic analysis instruction does not just identify prefix and root — it explicitly teaches the meaning of each morpheme and connects the word to other words that share the same morphemes. Learning that "ex-" means "out" and "port" means "carry" allows the student to immediately understand not just "export" but also "import" (in + carry), "transport" (across + carry), "portable" (able to be carried), "deport" (away + carry), and many others. This is vocabulary instruction with high transfer value. Option A is incorrect because dictionary lookup is a useful reference skill but does not build the morphological knowledge that transfers to understanding related words. Option C is incorrect because "export" is an analyzable word with identifiable morphemes; teaching it as an unanalyzable sight word misses the opportunity to build morphemic knowledge. Option D is incorrect because correcting the student without providing explicit teaching of the prefix\'s meaning provides no instructional scaffold; it does not help the student build the morphemic knowledge needed for future encounters.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A student reads the word "cattle" and struggles. The teacher says, "Let\'s use syllable rules. When you see two consonants in the middle of a word followed by -le, divide before the consonant+le. So \'cat-tle.\' What does each part say?" Which syllable type is "-tle" in "cattle"?',
    options: [
      { label: 'A', text: 'Open syllable — ends in a vowel, which says its long sound' },
      { label: 'B', text: 'Closed syllable — ends in a consonant, which keeps the vowel short' },
      { label: 'C', text: 'Consonant + le syllable — a syllable ending in a consonant followed by -le, where the -le is the vowel of the syllable' },
      { label: 'D', text: 'Silent-e syllable — a vowel-consonant-e pattern where the final e is silent and makes the previous vowel long' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The consonant + le syllable type (also called the C+le or "-le" syllable) appears at the end of many two-syllable English words. In this syllable type, a consonant is followed by -le, and the -le itself functions as the vowel nucleus of the syllable (the schwa + /l/ sound). Examples include: -tle (cattle, little), -ble (table, able), -dle (paddle, middle), -fle (ruffle), -gle (jungle), -ple (apple), -kle (sparkle). The syllabication rule is to split before the consonant + le, keeping the final consonant with the -le. Option A is incorrect because an open syllable ends in a vowel (e.g., "go," "ba-" in "baby"), and the vowel says its long sound. The "-tle" syllable does not end in a vowel; the consonant+le pattern is its own syllable type. Option B is incorrect because a closed syllable ends in one or more consonants with a short vowel before them (e.g., "cat," "must"). The "-tle" pattern does not fit this description. Option D is incorrect because a silent-e syllable (CVCe) has the pattern vowel-consonant-e where the final e is silent and makes the preceding vowel long (like "cake," "time"). The "-tle" ending is not a CVCe pattern.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher is teaching the spelling rule for adding vowel suffixes to words that end in silent -e. She uses the examples: "hope + -ing = hoping" (drop the e) and "hope + -ful = hopeful" (keep the e). A student asks: "Why do we drop the e before -ing but not before -ful?" What is the most accurate explanation?',
    options: [
      { label: 'A', text: 'The rule is inconsistent and students must memorize each case individually.' },
      { label: 'B', text: 'The silent e is dropped before vowel suffixes (like -ing, -ed, -er) because the vowel suffix itself takes over the job of marking the preceding vowel as long. Before consonant suffixes (like -ful, -ness, -less), the silent e is retained because it is still needed to signal the long vowel sound.' },
      { label: 'C', text: 'The e is always dropped when adding any suffix; "hopeful" retains the e only for aesthetic reasons.' },
      { label: 'D', text: 'The e is dropped before -ing because -ing starts with a vowel, which automatically makes the preceding vowel long without the silent e.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The silent-e drop-e rule is phonologically principled: the silent e at the end of a CVCe word serves the specific function of signaling that the preceding vowel is long. When a vowel suffix is added, the suffix vowel takes over this function — a vowel suffix following the preceding vowel creates an open syllable or vowel team effect that maintains the long vowel sound without the silent e. So "hope + ing" = "hoping" (the long /oʊ/ is maintained without the e because the open syllable "ho-" signals long vowel). But when a consonant suffix is added, nothing takes over the signaling function of the silent e, so it must be retained: "hope + ful" = "hopeful" (the e is needed to prevent "hopf-" which would look like a short vowel). Option A is incorrect because the rule has a clear phonological rationale and is consistent and teachable. Option C is incorrect because the retention of -e before consonant suffixes is not aesthetic; it is phonologically necessary to preserve the long vowel signal. Option D is incorrect because it partially identifies the mechanism (vowel suffix + preceding vowel) but overstates the case by saying the vowel suffix "automatically" makes the vowel long; the full explanation is that dropping the silent e works because the resulting open syllable or suffix vowel preserves the long vowel without the e.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher explains to students that the prefixes "bi-" and "tri-" come from Latin, meaning two and three respectively. She then has students generate examples (bicycle, biweekly, triangle, trilogy). This instruction is best described as building which word analysis skill?',
    options: [
      { label: 'A', text: 'Phonics — connecting letter combinations to their sounds in multisyllabic words' },
      { label: 'B', text: 'High-frequency word recognition — building automatic recognition of commonly occurring prefixes' },
      { label: 'C', text: 'Morphemic analysis using etymology — using knowledge of word origins (Latin) and morpheme meanings to decode and understand unfamiliar words' },
      { label: 'D', text: 'Context clue strategies — using surrounding text to infer the meaning of words with these prefixes' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Teaching students the meaning and origin of Latin or Greek morphemes is a direct application of morphemic analysis using etymology. When students know that "bi-" means two and "tri-" means three, they can apply this knowledge to understand and decode any word containing these prefixes — including words they have never seen before. This is high-leverage vocabulary and word analysis instruction that transfers broadly. Option A is incorrect because phonics focuses on letter-sound correspondences, not on the meaning of morphemes or their linguistic origins. Option B is incorrect because high-frequency word recognition involves automatizing whole-word recognition of common words; teaching prefix meanings is morphemic analysis, not sight-word learning. Option D is incorrect because the students are not using surrounding text to infer meaning; they are using the internal structure of words (the prefix) to determine meaning from the word itself.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade student encounters the word "rewritten" in a text. The teacher asks the student to identify all the morphemes. The student correctly identifies "re-" (prefix), "write" (base), and "-en" (suffix). However, the student is unsure why the base word is spelled "writ-" rather than "write-." Which orthographic principle should the teacher address?',
    options: [
      { label: 'A', text: 'The consonant doubling rule — double the final consonant before adding a vowel suffix to a CVC word' },
      { label: 'B', text: 'The drop-e rule — drop the silent e at the end of a word before adding a suffix that begins with a vowel' },
      { label: 'C', text: 'The change-y-to-i rule — change the y to i before adding a suffix unless the suffix begins with i' },
      { label: 'D', text: 'The schwa rule — unstressed vowels in derived forms are always deleted' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. "Write" ends in silent e. The suffix "-en" is a vowel suffix (it begins with a vowel, e). According to the drop-e rule, the silent e is dropped before a vowel suffix. So write + en → written (note: the "tt" is due to the doubling rule on the short-vowel syllable "writ-," but the base spelling change from "write" to "writ-" is explained by the drop-e rule). The teacher should explain that the silent e was dropped because "-en" begins with a vowel. Option A is incorrect because the consonant doubling rule applies to CVC words where the final consonant is doubled before a vowel suffix to preserve the short vowel sound (e.g., run + ing = running). While doubling does occur in "written," the specific question is about why the "e" is no longer there — that is the drop-e rule, not the doubling rule. Option C is incorrect because the change-y-to-i rule applies when a word ends in y preceded by a consonant (e.g., happy → happiness); "write" does not end in y. Option D is incorrect because "schwa deletion" is not a standard English spelling rule; the drop-e rule is the operative principle here.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade English learner whose home language is Spanish encounters the English word "invisible." The teacher points out that the Spanish word "invisible" has the same spelling and nearly the same pronunciation. This type of cross-linguistic connection is best described as which instructional strategy?',
    options: [
      { label: 'A', text: 'Cognate awareness — leveraging words that share the same etymological root and similar form/meaning across two languages' },
      { label: 'B', text: 'Code-switching — shifting between two languages within a single conversation or text' },
      { label: 'C', text: 'Translanguaging — using both languages simultaneously to maximize comprehension' },
      { label: 'D', text: 'Morphemic interference — recognizing when Spanish morphology incorrectly transfers to English word structure' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. A cognate is a word that shares the same etymological origin and similar form and meaning across two or more languages. Spanish and English share thousands of cognates because both languages have large Latin and Greek vocabulary bases (invisible/invisible, nation/nación, president/presidente, science/ciencia). Teaching English learners to recognize cognates is a powerful, evidence-based strategy for vocabulary development that leverages the linguistic resources students already have in their home language. Option B is incorrect because code-switching refers to the practice of alternating between two languages in conversation or writing, which is a sociolinguistic phenomenon — not a word analysis instructional strategy. Option C is incorrect because translanguaging is a broader pedagogical approach to using students\' full multilingual repertoire for sense-making; while related to leveraging home language, it is not specifically the term for teaching cognate recognition as a word analysis skill. Option D is incorrect because cognate awareness is explicitly a positive transfer strategy (using home language knowledge to support English); "morphemic interference" would describe a case where home language structure causes errors, not successful transfer.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A student correctly reads the word "babies" and the teacher asks, "How did \'baby\' become \'babies\'?" The student explains, "You change the y to i and add -es." This spelling change is best categorized as which type of morphological knowledge?',
    options: [
      { label: 'A', text: 'Knowledge of derivational morphology — understanding how suffixes change a word\'s part of speech' },
      { label: 'B', text: 'Knowledge of inflectional morphology — understanding how the plural inflection (-s/-es) changes the number of a noun while following a spelling rule' },
      { label: 'C', text: 'Knowledge of root word etymology — understanding how the Latin root of "baby" affects its plural form' },
      { label: 'D', text: 'Knowledge of syllabication — understanding that adding -es adds a syllable to words ending in certain sounds' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Adding the plural -s/-es inflection is inflectional morphology — the morpheme signals a grammatical change (singular → plural) without changing the part of speech or creating a new word. "Baby" and "babies" are both nouns; the inflection only changes number. The accompanying spelling rule (change y to i before -es when y is preceded by a consonant) is an orthographic rule that applies to many such words (baby→babies, city→cities, story→stories). Option A is incorrect because derivational morphology changes the part of speech or creates a new, related word. Pluralization does not change "baby" from one part of speech to another; it is still a noun. Option C is incorrect because "baby" is not a Latin-derived word with a Latin root that affects its plural; the y→i spelling change is an English orthographic rule, not a Latin morphological rule. Option D is incorrect because while adding -es to certain words does add a syllable (e.g., "bus" → "bus-es"), the primary concept being demonstrated here is inflectional morphology and the y→i spelling rule, not syllabication.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is teaching the VCV (vowel-consonant-vowel) syllabication pattern. She uses the word "robot" as an example: "ro-bot." The first syllable "ro" is open because it ends in a vowel, giving /oʊ/, the long sound. A student asks why "robin" is divided "rob-in" (not "ro-bin"). What is the most accurate explanation?',
    options: [
      { label: 'A', text: '"Robin" has a different suffix than "robot," which changes the syllabication rule.' },
      { label: 'B', text: 'In "robin," dividing after the vowel (ro-bin) would make the o long (/oʊ/), but the actual pronunciation has a short /ɒ/. When the VCV pattern produces a long vowel sound that doesn\'t match the word\'s pronunciation, try dividing after the consonant (closed syllable) instead.' },
      { label: 'C', text: '"Robin" is an irregular word that does not follow syllabication rules and must be memorized.' },
      { label: 'D', text: 'The VCV pattern always requires dividing before the consonant, so "robin" should always be "ro-bin" regardless of pronunciation.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The VCV syllabication rule produces two possible division points: before the consonant (V-CV, open first syllable, long vowel) or after the consonant (VC-V, closed first syllable, short vowel). The rule is: first try V-CV (open syllable, long vowel). If that produces the correct pronunciation, you\'re done. If not — if the correct pronunciation has a short vowel in the first syllable — then try VC-V (closed syllable, short vowel). For "robot": ro-bot → /roʊ.bɒt/ → matches pronunciation. For "robin": ro-bin → /roʊ.bɪn/ → does not match; try rob-in → /rɒb.ɪn/ → matches. Teaching students to check pronunciation against the two options is an important metacognitive strategy. Option A is incorrect because "robin" and "robot" don\'t have suffixes; the syllabication principle is about vowel quality, not suffixes. Option C is incorrect because "robin" follows the VCV principle (VC-V variant) and does not need to be memorized as irregular. Option D is incorrect because the VCV rule is a try-first heuristic, not an absolute rule; when V-CV produces incorrect pronunciation, VC-V is the fallback.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0004 — Reading Fluency  (10 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher listens to a student read aloud and notes that the student reads at an appropriate pace and makes very few errors, but reads with no variation in pitch or stress — every word sounds the same regardless of punctuation or sentence meaning. Which component of fluency is the student lacking?',
    options: [
      { label: 'A', text: 'Accuracy — the student is not decoding words correctly' },
      { label: 'B', text: 'Rate — the student is reading too quickly or too slowly for the grade level' },
      { label: 'C', text: 'Prosody — the student is not applying appropriate expression, intonation, and phrasing to convey meaning' },
      { label: 'D', text: 'Automaticity — the student is not recognizing words quickly enough without conscious effort' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Prosody is the component of fluency that encompasses expression, intonation, phrasing, and stress — the melodic qualities that make oral reading sound like natural speech and communication rather than a word-by-word recitation. The student described here has adequate accuracy (few errors) and rate (appropriate pace) but reads with flat, uniform pitch, indicating a lack of prosody. Prosody requires the reader to use punctuation cues, syntactic awareness, and comprehension of meaning to shape how the text is spoken. Option A is incorrect because the student makes very few errors, indicating adequate accuracy. Option B is incorrect because the student reads at an appropriate pace, indicating rate is not the concern. Option D is incorrect because automaticity refers specifically to speed and effortlessness of word recognition; the student\'s appropriate pace suggests adequate automaticity — the issue is not how fast words are recognized but how expressively the text is read.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher regularly has students whisper-read independently while she circulates and leans in to listen to each student for 30 seconds. Which primary purpose does this practice serve?',
    options: [
      { label: 'A', text: 'It provides a silent reading experience that builds comprehension without the distraction of vocalization.' },
      { label: 'B', text: 'It allows the teacher to conduct real-time, informal monitoring of individual students\' decoding accuracy and fluency, enabling immediate targeted feedback.' },
      { label: 'C', text: 'It reduces classroom noise so that students who are easily distracted can concentrate on the text.' },
      { label: 'D', text: 'It builds students\' phonemic awareness by requiring them to subvocalize each phoneme as they read.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Whisper reading is an evidence-based practice that serves a specific instructional monitoring function: because each student reads aloud at low volume, the teacher can circulate and briefly listen to each student\'s reading without disrupting others. This allows the teacher to informally but continuously monitor decoding accuracy, error types, rate, and prosody in real time — and to provide immediate, targeted corrective feedback when errors are observed. This practice is especially valuable in early reading instruction when monitoring individual decoding is critical. Option A is incorrect because whisper reading is not silent reading; students are vocalizing quietly, which is the point — it makes their reading audible to the teacher. Option C is incorrect because noise reduction, while a practical benefit, is not the primary instructional purpose of the practice. Option D is incorrect because whisper reading involves reading text in connected form, not deliberately isolating and subvocalizing phonemes; the practice does not constitute phonemic awareness instruction.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade student reads grade-level text accurately (98%) and at an appropriate rate but struggles to comprehend what she reads. When the teacher has the student listen to someone else read the same passage aloud, the student answers comprehension questions correctly. Which explanation best accounts for this pattern?',
    options: [
      { label: 'A', text: 'The student has a phonics deficit that is preventing decoding, which in turn blocks comprehension.' },
      { label: 'B', text: 'The student\'s decoding is automatic but so much cognitive effort is directed toward reading mechanics that insufficient cognitive resources remain for comprehension; alternatively, the student may have a specific reading comprehension difficulty not explained by decoding.' },
      { label: 'C', text: 'The student is a strong oral language learner but lacks the print-concept knowledge needed to understand written text.' },
      { label: 'D', text: 'The student reads too slowly, which explains the comprehension difficulty; increasing rate will solve the problem.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This student presents a profile where decoding is apparently adequate (98% accuracy, appropriate rate) but comprehension is poor. When listening comprehension is intact (the student comprehends when listening to the same text), the simple view of reading would suggest that decoding is not the problem. This pattern could indicate: (1) despite apparent accuracy/rate, some cognitive effort is still being consumed by reading mechanics in a way that taxes working memory; or (2) there is a specific reading comprehension difficulty that is not explained by decoding — perhaps difficulty with inference-making, background knowledge, or comprehension monitoring — that is present in reading but masked in listening by the natural prosody and shared context of being read to. Both possibilities require targeted comprehension assessment and instruction. Option A is incorrect because the student\'s 98% accuracy is above the independent reading level threshold, making a significant phonics deficit unlikely. Option C is incorrect because understanding the text when listening demonstrates strong oral language comprehension; concepts of print are also not implicated by this pattern. Option D is incorrect because the student reads at an appropriate rate, so the issue is not slow rate.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher uses phrase-cued reading with her third-grade students. She takes a passage and inserts slash marks between natural phrase boundaries: "The old dog / slept by the fire / all afternoon." Students first read the phrase-cued version, then the unmarked version. What specific fluency component does this activity most directly target?',
    options: [
      { label: 'A', text: 'Accuracy — phrase-cued reading reduces the chance that students will misread words by slowing them down at phrase boundaries' },
      { label: 'B', text: 'Rate — the pauses at slash marks help students read at a faster overall pace' },
      { label: 'C', text: 'Prosody — the visual phrase markers help students internalize natural syntactic groupings and transfer appropriate phrasing to their oral reading' },
      { label: 'D', text: 'Phonemic awareness — the breaks between phrases help students isolate phonemes at word boundaries' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Phrase-cued reading is an evidence-based technique specifically designed to develop prosody — in particular, the syntactic phrasing aspect of prosody. By visually marking phrase boundaries, the teacher helps students understand that fluent reading is organized into meaningful syntactic chunks rather than individual words. Students practice grouping words into phrases that reflect the natural units of meaning in the sentence. This phrasing awareness transfers to reading unmarked text with more natural expression. Prosody is often described as the bridge between fluency and comprehension because reading in meaningful phrases supports deeper text processing. Option A is incorrect because phrase-cued reading is not specifically designed to improve word-reading accuracy; slowing at phrase boundaries may be a side effect but is not the target. Option B is incorrect because the pauses at phrase boundaries typically slow reading rather than increase rate; rate development uses different strategies such as repeated reading and timed reading. Option D is incorrect because phrase-cued reading operates at the sentence and phrase level, not at the phoneme level; it has no relationship to phonemic awareness.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'Which statement most accurately describes the relationship between reading fluency and reading comprehension?',
    options: [
      { label: 'A', text: 'Fluency and comprehension are independent skills; a student can have excellent comprehension without fluency and vice versa.' },
      { label: 'B', text: 'Fluency is more important than comprehension for overall reading achievement and should always be prioritized.' },
      { label: 'C', text: 'Fluency serves as a bridge to comprehension: when word recognition is automatic and prosody reflects syntactic awareness, cognitive resources are freed for meaning construction.' },
      { label: 'D', text: 'Comprehension always precedes fluency; students must first understand text deeply before they can read it fluently.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The bridge metaphor for fluency is well-established in reading research. When decoding requires conscious effort (is not automatic), cognitive resources are consumed by the mechanics of word recognition and are not available for comprehension. When word recognition is automatic and prosody reflects the reader\'s understanding of syntactic and semantic structure, the reader can devote full cognitive attention to constructing meaning from the text. This is why fluency is considered a critical component of proficient reading — it enables comprehension rather than competing with it. Option A is incorrect because the relationship between fluency and comprehension is not independent; the research consistently demonstrates bidirectional influence, with fluency enabling comprehension and comprehension supporting prosodic reading. Option B is incorrect because both fluency and comprehension are essential components of reading; neither should be prioritized at the expense of the other, and the goal is reading for meaning. Option D is incorrect because the developmental sequence is generally the opposite: fluency typically develops before — and enables — deeper comprehension. Students cannot fully comprehend texts they cannot read with reasonable automaticity.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade student reads at 85 words per minute with 94% accuracy on grade-level text. The student reads grade-level text slowly and with significant effort. Which instructional approach would most effectively address this student\'s fluency needs?',
    options: [
      { label: 'A', text: 'Having the student read only grade-level texts silently to build rate gradually over the school year' },
      { label: 'B', text: 'Using repeated oral reading with texts at the student\'s independent or instructional level, with feedback from the teacher, combined with instruction targeting remaining phonics or word analysis gaps' },
      { label: 'C', text: 'Providing only comprehension strategy instruction, since the student\'s fluency difficulty is caused by comprehension problems' },
      { label: 'D', text: 'Restricting the student to picture books until fluency benchmarks are met' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A student reading at 85 WPM with 94% accuracy on grade-level text is below typical fifth-grade fluency benchmarks and shows a non-trivial error rate. The evidence-based approach for developing fluency for this profile involves: (1) using texts at the student\'s independent or instructional level (where success is achievable), not frustration-level grade-level texts; (2) repeated oral reading — reading the same text multiple times with teacher feedback — which is among the most researched and effective fluency interventions; and (3) addressing any underlying phonics or word analysis gaps that may be slowing accurate word recognition. Option A is incorrect because silent reading alone, particularly at frustration level, does not develop fluency efficiently; the student needs supported oral reading practice with feedback. Option C is incorrect because at 94% accuracy and 85 WPM, there is a clear fluency/decoding component to this student\'s difficulty, not only a comprehension issue; comprehension instruction alone will not address the fluency profile. Option D is incorrect because restricting a fifth grader to picture books is demoralizing, eliminates access to grade-level language and content, and is not an evidence-based intervention for fluency.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher observes that a student reads narrative texts fluently but struggles to read science and social studies textbooks with the same fluency — reading significantly slower, with more errors, and less expression. Which of the following most accurately explains this phenomenon?',
    options: [
      { label: 'A', text: 'The student has a visual processing difficulty that affects reading of informational text but not narrative text.' },
      { label: 'B', text: 'Content-area texts introduce domain-specific vocabulary, complex sentence structures, and assumed background knowledge that are not present in the narrative texts the student reads fluently, creating greater cognitive demand during decoding.' },
      { label: 'C', text: 'Informational texts are always harder to decode because they use a smaller font size than narrative texts.' },
      { label: 'D', text: 'The student has mastered fluency in narrative text, which means fluency instruction is no longer needed and the difficulty with informational text reflects a comprehension deficit only.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Fluency is not a single, fixed skill — it is highly dependent on the demands of the specific text being read. Content-area texts (science, social studies) typically contain: (1) high-density technical vocabulary (domain-specific Tier 3 words) that the reader may not know or be able to rapidly decode; (2) complex, information-dense sentence structures with subordinate clauses and academic syntax; and (3) assumed background knowledge that fluent readers use to read with predictive processing. When these factors are present, cognitive demand increases even for students who read narrative text fluently. Fluency instruction and vocabulary support in content-area reading is appropriate and evidence-based. Option A is incorrect because visual processing difficulties would typically affect all text types similarly, not specifically informational text. Option C is incorrect because font size does not systematically distinguish narrative from informational text, and font size is not a primary factor in reading fluency. Option D is incorrect because the student\'s difficulty with informational text warrants instructional attention; dismissing it as purely a comprehension issue ignores the text-difficulty factors (vocabulary, syntax, knowledge demands) that directly affect decoding fluency in complex texts.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher uses echo reading during shared reading time. The teacher reads one sentence with appropriate expression and phrasing, then students echo it back together. Which aspect of fluency development does this activity primarily support at the kindergarten level?',
    options: [
      { label: 'A', text: 'Decoding automaticity — building recognition speed for individual sight words' },
      { label: 'B', text: 'Prosody modeling — providing students with explicit, direct experience of what expressive, fluent reading sounds like by imitating the teacher\'s model' },
      { label: 'C', text: 'Silent reading fluency — training students to read quickly without vocalization' },
      { label: 'D', text: 'Phonemic awareness — exposing students to the sounds of individual words read aloud' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Echo reading is an evidence-based instructional technique in which the teacher reads a passage with fluent, expressive prosody and students immediately repeat it, imitating the teacher\'s phrasing, intonation, and expression. The primary purpose is prosody modeling: before students can produce prosodic reading independently, they need explicit, repeated exposure to what it sounds like and sounds like. Echo reading provides a supported, low-risk context for imitating prosodic reading while also reinforcing familiarity with the text. Option A is incorrect because while echo reading can incidentally reinforce word recognition, its specific design targets prosody through imitation, not sight-word automaticity. Option C is incorrect because echo reading is entirely oral; it is the opposite of silent reading, and it does not target silent reading fluency. Option D is incorrect because echo reading involves reading connected, meaningful text with full prosody; it does not isolate or draw attention to individual phonemes. Phonemic awareness requires a different type of oral activity focused on sound manipulation.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'Which of the following most accurately describes the role of automaticity in reading fluency?',
    options: [
      { label: 'A', text: 'Automaticity refers to reading with appropriate expression and phrasing, which makes the text easier to understand.' },
      { label: 'B', text: 'Automaticity refers to the ability to recognize words accurately and rapidly without conscious decoding effort, freeing cognitive resources for meaning construction.' },
      { label: 'C', text: 'Automaticity is achieved only through silent reading and cannot be developed through oral reading practice.' },
      { label: 'D', text: 'Automaticity is a component of phonemic awareness that develops before phonics instruction begins.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Automaticity, in the context of reading, refers to the speed and effortlessness of word recognition. When word recognition is automatic, the reader identifies words instantaneously without consciously applying decoding strategies — words are recognized as wholes from memory. This frees up working memory and cognitive resources that can then be directed toward comprehension: making inferences, monitoring understanding, integrating new information with prior knowledge. Automaticity is developed through extensive practice reading words in context and out of context until recognition is fast and effortless. Option A is incorrect because that definition describes prosody, not automaticity. Both are components of fluency, but they are distinct. Option C is incorrect because oral reading practice — particularly repeated reading — is one of the primary evidence-based methods for developing automaticity. Silent reading can also contribute once students have a solid decoding foundation, but oral reading is not excluded. Option D is incorrect because automaticity is a component of reading fluency, not phonemic awareness. Phonemic awareness is an entirely oral skill that develops before formal reading instruction; automaticity with printed words develops through print experience.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 4,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher wants to build fluency in a student who is an accurate but slow decoder. The teacher gives the student a short passage to read aloud three times in succession, each time tracking the reading rate and errors. After each reading, the teacher provides brief corrective feedback. Which evidence-based fluency strategy is the teacher using?',
    options: [
      { label: 'A', text: 'Sustained silent reading — building reading stamina through extended independent reading time' },
      { label: 'B', text: 'Repeated oral reading — practicing the same text multiple times to build reading rate, accuracy, and prosody through supported practice' },
      { label: 'C', text: 'Guided reading — using a leveled text to support decoding in a small-group setting' },
      { label: 'D', text: 'Round-robin reading — having students take turns reading aloud in a group' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Repeated oral reading is one of the most well-researched and consistently effective interventions for fluency development. The technique involves reading the same text multiple times aloud with teacher support and feedback. With each successive reading, students typically show increases in reading rate, decreases in errors, and improvements in prosody because text familiarity reduces the cognitive load of decoding. Corrective feedback after each reading is an essential component — it allows the teacher to correct errors, model difficult words or phrases, and track growth. Option A is incorrect because sustained silent reading involves extended independent reading, typically of self-selected texts; it does not involve repeated reading of the same passage with corrective feedback. Option C is incorrect because guided reading is a small-group instructional approach focused on reading at an instructional level with teacher support; while it builds reading skill, the specific technique described — reading the same short passage three times with rate tracking — is specifically repeated oral reading. Option D is incorrect because round-robin reading involves different students each reading portions of the text once; it is not a repeated-reading technique and has actually been associated with disengagement and anxiety, not fluency development.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0005 — Academic Language and Vocabulary Development  (10 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher is selecting vocabulary words to teach explicitly before reading a social studies chapter about communities. She has identified these words: "house," "neighbor," "municipality," "civic." Which words are most appropriate candidates for explicit Tier 2 vocabulary instruction before reading?',
    options: [
      { label: 'A', text: '"House" and "neighbor" — because they are the most important words in the chapter' },
      { label: 'B', text: '"Municipality" and "civic" — because they are high-utility academic words likely unfamiliar to most second graders that will recur across content areas' },
      { label: 'C', text: '"Municipality" only — because it is the longest word and therefore the hardest' },
      { label: 'D', text: 'All four words — because all vocabulary words in a chapter should be taught explicitly before reading' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Tier 2 words are high-utility academic words that appear across multiple content areas and texts, are typically not learned from everyday conversation, and have high instructional value. "Municipality" and "civic" fit this profile — they are important concepts in social studies, they will recur in other contexts, and they are unlikely to be known by most second graders without instruction. "House" and "neighbor" are Tier 1 words — common, everyday words known from conversational language that typically do not require explicit instruction. Option A is incorrect because "house" and "neighbor" are Tier 1 words known by most students; explicit instruction time is better spent on words that are unknown and high-utility. Option C is incorrect because word difficulty should be defined by meaning complexity and utility, not by word length. Option D is incorrect because not all words require explicit instruction; teaching too many words dilutes instructional time and is not supported by vocabulary research. Selection criteria should focus on Tier 2 words with high utility and concept load.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'During reading instruction, a teacher says: "In the story, the author wrote: \'The ancient ruins towered above the explorers, their crumbling walls a testament to a once-mighty empire.\' I don\'t know \'testament,\' so I look at what comes after. A crumbling wall is evidence of what once was — so \'testament\' must mean proof or evidence of something." Which type of context clue is the teacher modeling?',
    options: [
      { label: 'A', text: 'Antonym context clue — the surrounding text provides a word with the opposite meaning' },
      { label: 'B', text: 'Appositive/definition context clue — the sentence directly defines the unknown word in a phrase set off by commas or dashes' },
      { label: 'C', text: 'General context/inference context clue — the reader uses the overall meaning of the surrounding text to infer the word\'s meaning through reasoning' },
      { label: 'D', text: 'Synonym/restatement context clue — the surrounding text provides a word or phrase with the same meaning' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The teacher is not given a direct definition, a synonym, or an antonym in the text. Instead, the teacher reasons from the general meaning of the surrounding context — understanding that a crumbling wall is visual evidence of a past civilization — to infer that "testament" must mean evidence or proof. This is general context/inference use, the most common and least certain type of context clue, which requires active reasoning. Option A is incorrect because no antonym (a word with opposite meaning) is provided near "testament"; the inference is based on the overall situation, not a contrasting word. Option B is incorrect because an appositive or definition context clue directly defines the word, typically with a phrase like "testament, which means proof" or set off by commas. No such direct definition appears here. Option D is incorrect because no synonym or restatement is provided for "testament"; the teacher must infer meaning through reasoning about the described scene, which goes beyond a simple synonym signal.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher uses a semantic map (also called a word web) to teach the concept of "habitat" before reading a science text. The teacher places "habitat" in the center, then adds branches for "examples," "characteristics," "related words," and "non-examples." Which aspect of deep vocabulary knowledge does this graphic organizer primarily support?',
    options: [
      { label: 'A', text: 'Phonological representation — connecting the word\'s sound pattern to its meaning' },
      { label: 'B', text: 'Definitional knowledge only — providing students with a clear dictionary-style definition of the word' },
      { label: 'C', text: 'Rich, networked word knowledge — building understanding of the word\'s meaning, relationships, examples, and conceptual context' },
      { label: 'D', text: 'Orthographic representation — connecting the word\'s spelling pattern to its meaning' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Research on vocabulary development emphasizes that deep word knowledge goes far beyond a single definition. Truly knowing a word means understanding its core meaning, how it relates to other words (synonyms, antonyms, categories), what examples and non-examples look like, and how it is used in different contexts. Semantic maps explicitly build this networked knowledge by requiring students to think about a word from multiple conceptual angles simultaneously. This type of instruction leads to more durable and usable word knowledge than definition-only learning. Option A is incorrect because phonological representation (the sound pattern) is not what semantic maps primarily build; they build conceptual and semantic knowledge. Option B is incorrect because the semantic map explicitly goes beyond definitional knowledge to include examples, non-examples, and related words — the purpose is to create a richer representation than a dictionary definition provides. Option D is incorrect because orthographic representation (spelling) is also not the target of a semantic map; the map is organized around meaning relationships, not spelling patterns.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher is planning vocabulary instruction for the word "factor" which appears in the upcoming science chapter on weather. The teacher knows that "factor" is also used in mathematics (a number multiplied in multiplication) and in social studies (a contributing cause in historical events). Which instructional approach best prepares students to navigate this word\'s multiple meanings?',
    options: [
      { label: 'A', text: 'Teach the science-specific definition only and note that students will encounter other meanings in other subjects.' },
      { label: 'B', text: 'Provide one student-friendly definition that applies across all contexts and tell students that the word always means the same thing.' },
      { label: 'C', text: 'Explicitly discuss that "factor" is a high-utility Tier 2 word with discipline-specific meanings across subjects, teach each meaning in context, and help students recognize which meaning applies in each domain.' },
      { label: 'D', text: 'Avoid using the word "factor" in science instruction to prevent confusion with its mathematical meaning.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. "Factor" is a classic example of a Tier 2 word with discipline-specific meanings — the exact scenario that vocabulary research identifies as requiring explicit, multi-contextual instruction. Students need to understand: (1) that the same word can mean different things in different subject areas; (2) what each subject-specific meaning is; and (3) how to use contextual cues to determine which meaning is intended in a given text. Teaching this explicitly develops the academic language awareness and vocabulary flexibility that students need to read in multiple content areas. Option A is incorrect because teaching only the science definition leaves students unprepared for the word\'s mathematical and social studies meanings, and missing explicit instruction about how the word shifts across contexts. Option B is incorrect because the meanings are not identical across subjects; a one-size-fits-all definition would be either inaccurate in some contexts or so vague as to be unhelpful. Option D is incorrect because avoiding a critical academic word is not an evidence-based instructional approach; avoidance deprives students of the vocabulary knowledge they need.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'Which of the following is the best example of a Tier 3 vocabulary word?',
    options: [
      { label: 'A', text: '"Happy" — a common emotion word used frequently in everyday conversation' },
      { label: 'B', text: '"Analyze" — a high-utility academic word used across content areas in academic tasks' },
      { label: 'C', text: '"Photosynthesis" — a domain-specific scientific term used exclusively in biology contexts' },
      { label: 'D', text: '"Beautiful" — a descriptive word used in narrative and everyday language' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Tier 3 vocabulary words are low-frequency, domain-specific terms whose use is largely restricted to a particular content area or discipline. "Photosynthesis" is used almost exclusively in biology and science education contexts and is rarely encountered outside those domains. This is the defining characteristic of Tier 3 words. Option A is incorrect because "happy" is a Tier 1 word — a common, everyday word that most children acquire through oral language and conversational experience without formal instruction. Option B is incorrect because "analyze" is a Tier 2 word — a high-utility academic word that appears across many content areas (students are asked to analyze in science, social studies, math, and ELA) and is important for academic success but is not specific to one domain. Option D is incorrect because "beautiful" is also a Tier 1 word — commonly used in everyday conversation and narrative language, widely known before formal schooling begins.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reads aloud a picture book and pauses at the sentence: "The explorer was undaunted by the towering mountain before her." The teacher says, "Undaunted — let\'s think about that. \'Daunt\' means to frighten or intimidate. The prefix \'un-\' means not. So \'undaunted\' means...?" Students respond: "Not frightened." The teacher confirms and connects the word to the upcoming theme. Which vocabulary strategy is the teacher modeling?',
    options: [
      { label: 'A', text: 'Using a glossary — looking up the word in a text reference tool' },
      { label: 'B', text: 'Morphological analysis — using knowledge of the prefix and root to construct the meaning of an unfamiliar word' },
      { label: 'C', text: 'Synonym substitution — replacing the unknown word with a simpler word that means the same thing' },
      { label: 'D', text: 'Background knowledge activation — using what students already know about the topic to infer the word\'s meaning' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher explicitly breaks the word into its morphological components — the prefix "un-" and the root "daunt" — teaches the meaning of each component, and guides students to combine them to determine the full word\'s meaning. This is morphological analysis as a vocabulary strategy: using knowledge of word parts to unlock the meaning of unfamiliar words. This strategy is powerful because it transfers to any word containing the same morphemes (undaunted, undaunting, undauntedly; and dozens of other un- words). Option A is incorrect because no glossary or reference tool is being used; the teacher and students are analyzing the word\'s internal structure. Option C is incorrect because the teacher does not substitute a simpler synonym for the word; the teacher helps students construct the definition themselves from word parts. Option D is incorrect because the teacher is not asking students to draw on background knowledge about explorers or mountains; the strategy focuses on the word\'s internal morphological structure.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade teacher wants to develop students\' word consciousness — an awareness of and interest in words. Which of the following classroom practices would most directly foster word consciousness?',
    options: [
      { label: 'A', text: 'Requiring students to copy definitions of 20 vocabulary words per week from the dictionary as homework' },
      { label: 'B', text: 'Regularly drawing students\' attention to interesting, precise, or unusual words encountered in reading — asking students to collect "remarkable" words and share them, discussing why authors choose specific words over alternatives' },
      { label: 'C', text: 'Giving weekly vocabulary tests on words drawn from a published word list, with grades recorded for all tests' },
      { label: 'D', text: 'Restricting classroom talk to academic language only, prohibiting informal language to ensure students use precise vocabulary at all times' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Word consciousness is the awareness of and curiosity about words — noticing interesting language, appreciating precise word choices, and being motivated to learn and use new words. Research by Scott and Nagy identifies word consciousness as a critical component of robust vocabulary development. Practices that develop word consciousness include: drawing attention to remarkable words in texts, celebrating interesting word choices, discussing why authors select specific words, encouraging students to collect and share words they find compelling, and playing word games. Option A is incorrect because copying dictionary definitions is a low-engagement, low-effectiveness vocabulary task that does not develop interest in or awareness of words; it may actually cause students to associate vocabulary study with tedium. Option C is incorrect because formal, high-stakes vocabulary tests create an extrinsic accountability structure that does not inherently develop intrinsic interest in words; word consciousness is about genuine curiosity and engagement, not test performance. Option D is incorrect because restricting informal language is not evidence-based for vocabulary development and could create an anxiety-inducing environment that discourages rather than encourages engagement with language.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reads aloud a chapter book to her class and regularly pauses to discuss vocabulary at the point of encounter. The teacher introduces a student-friendly definition, gives an example from students\' lives, asks students a question that requires using the word, and connects the word to a related word already known. This approach to vocabulary instruction is best described as:',
    options: [
      { label: 'A', text: 'Incidental vocabulary learning — students pick up words naturally through repeated exposure' },
      { label: 'B', text: 'Explicit vocabulary instruction embedded in authentic text — deliberately teaching selected words with multiple representations and student engagement at the point of reading' },
      { label: 'C', text: 'Pre-teaching vocabulary — introducing all vocabulary before reading to prevent comprehension breakdown' },
      { label: 'D', text: 'Independent word learning — students use context clues to determine meanings without teacher support' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher is using explicit vocabulary instruction — student-friendly definition, contextualized example, student engagement with the word, and connection to known words — in a purposeful, teacher-led way. Critically, this instruction occurs at the point of encounter in an authentic text (a read-aloud chapter book), which combines explicit teaching with meaningful context. This approach is aligned with evidence-based practices that include multiple exposures, student processing, and connection building — all components that promote deep word learning. Option A is incorrect because incidental learning describes vocabulary acquisition that occurs without explicit instruction, simply from reading and hearing words in context; the teacher in this scenario is conducting explicit, intentional instruction. Option C is incorrect because pre-teaching vocabulary occurs before reading; the teacher here is teaching words as they are encountered during reading, not before the text begins. Option D is incorrect because independent word learning describes students using strategies like context clues on their own; the teacher here is leading explicit, structured instruction.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is reading aloud and comes to the sentence: "The scientist was elated — overjoyed — when she saw the results." A student asks what "elated" means. The teacher points back to the sentence and asks, "Do you see any clue right there in the sentence?" Which type of context clue is present?',
    options: [
      { label: 'A', text: 'Contrast/antonym clue — the text provides a word with the opposite meaning of "elated"' },
      { label: 'B', text: 'Restatement/synonym clue — the text immediately restates "elated" using a simpler synonym ("overjoyed") set off by a dash' },
      { label: 'C', text: 'General context clue — the student must use the overall meaning of the sentence to infer what "elated" means' },
      { label: 'D', text: 'Example clue — the text provides specific examples that clarify the meaning of "elated"' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The sentence contains a restatement/synonym context clue. The author writes "elated" and then immediately restates the meaning using the simpler, more familiar word "overjoyed," with the two words separated by a dash. This punctuation pattern (dash, or sometimes comma or parentheses) is a signal that the author is directly glossing or restating a potentially unfamiliar word. Teaching students to recognize this signal ("when you see an em-dash or comma after an unfamiliar word, the author may be defining it") is an explicit context clue strategy. Option A is incorrect because no antonym or contrasting word is present; both "elated" and "overjoyed" are positive emotion words — they share meaning, not oppose it. Option C is incorrect because the student does not need to reason from overall sentence meaning; the definition is directly embedded in the sentence through the synonym. Option D is incorrect because no examples are provided; a synonym (one equivalent word) is not the same as examples (multiple instances of a category).',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants students to develop the ability to notice nuances in meaning between near-synonyms. She presents the words "angry," "furious," "irritated," and "livid" and asks students to place them on a continuum from least to most intense. This activity primarily develops which aspect of vocabulary knowledge?',
    options: [
      { label: 'A', text: 'Phonological awareness — recognizing that these words have different syllable counts and stress patterns' },
      { label: 'B', text: 'Semantic precision — developing sensitivity to shades of meaning and connotation among related words' },
      { label: 'C', text: 'Morphological analysis — identifying the roots and affixes in each word' },
      { label: 'D', text: 'Alphabetic principle — understanding the spelling patterns of emotion words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Placing near-synonyms on a semantic intensity continuum — from least to most intense — develops semantic precision, which is the ability to distinguish subtle differences in meaning and connotation among words that are broadly similar. This type of instruction helps students appreciate that word choice is meaningful and that sophisticated writers select the precise word that conveys exactly the right degree or shade of meaning. Research on robust vocabulary instruction emphasizes this type of nuanced, comparative word learning as essential for deep vocabulary development. Option A is incorrect because the activity is entirely about meaning, not about sound units or stress patterns; phonological awareness is irrelevant here. Option C is incorrect because the activity does not involve identifying roots or affixes within the emotion words; the analysis is semantic (meaning), not morphological. Option D is incorrect because the activity does not involve spelling or letter-sound correspondence; it is about shades of meaning between semantically related words.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0006 — Literary Text Comprehension  (12 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher asks students to read a fairy tale and then explain what lesson or moral the story teaches, using evidence from the text to support their answer. This question requires which level of comprehension?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying what is directly stated in the text' },
      { label: 'B', text: 'Inferential comprehension — drawing conclusions about implied meanings not directly stated in the text' },
      { label: 'C', text: 'Evaluative comprehension — judging the quality or credibility of the text' },
      { label: 'D', text: 'Phonological comprehension — applying knowledge of sound structure to understand the text' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The moral or lesson of a story is almost never directly stated (if it were, the author would write "the moral of this story is..."). Students must read the characters\' actions, the consequences they face, and the resolution of the conflict, then draw a conclusion about what principle or lesson the story is illustrating. This reasoning process — going beyond what is explicitly written to determine what is implied — is inferential comprehension. Option A is incorrect because literal comprehension involves identifying information explicitly stated in the text, such as a character\'s name or a directly described event; a moral is not typically stated but must be inferred. Option C is incorrect because evaluative comprehension requires students to make a judgment about the text\'s quality, credibility, or the validity of an argument; determining a moral requires inference, not evaluation. Option D is incorrect because "phonological comprehension" is not a standard comprehension level; comprehension levels are literal, inferential, and evaluative.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is guiding second graders through a picture book. The teacher asks: "The author never directly tells us that Maria is nervous. What clues from the text and illustrations help you figure out how she is feeling?" This type of question primarily develops which comprehension skill?',
    options: [
      { label: 'A', text: 'Making inferences about character — using text and visual evidence to determine what a character thinks or feels when it is not explicitly stated' },
      { label: 'B', text: 'Identifying text structure — recognizing how the author has organized the events in the story' },
      { label: 'C', text: 'Evaluating the author\'s craft — judging whether the author has written an effective story' },
      { label: 'D', text: 'Retelling the story — summarizing the key events in sequence' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The teacher explicitly tells students that the author does not directly state the character\'s emotion, then asks students to use text and illustration evidence to infer it. This is character inference — a core inferential comprehension skill in literary text. Making inferences about character feelings, motivations, and perspectives that are not explicitly stated is one of the most important and frequently tested literary comprehension skills. Option B is incorrect because text structure questions ask about how the story is organized (problem/solution, beginning-middle-end, cause/effect) — not about character emotion inference. Option C is incorrect because evaluating the author\'s craft would require students to judge how effectively the author conveyed Maria\'s emotions, not to identify what those emotions are. Option D is incorrect because a retell is a sequential summary of story events, not an inference about a specific character\'s internal state.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is about to begin a unit on folktales from around the world. She reads folktales from West African, Native American, Japanese, and Appalachian traditions. After reading each, she guides students to compare the stories\' themes and the characters\' challenges. This instructional approach primarily supports which literary comprehension skill?',
    options: [
      { label: 'A', text: 'Identifying figurative language — recognizing similes, metaphors, and personification across different cultural stories' },
      { label: 'B', text: 'Integration of knowledge and ideas — comparing themes, values, and character experiences across stories from different cultures' },
      { label: 'C', text: 'Concepts of print — building awareness of how different cultural traditions represent text on the page' },
      { label: 'D', text: 'Phonemic awareness — identifying sound patterns in names and words from different cultural contexts' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The activity requires students to compare and contrast stories from multiple cultural traditions — identifying what themes and character challenges are similar across cultures and what is different. This is an integration of knowledge and ideas skill, specifically the ability to compare and contrast how similar themes and experiences are represented across stories from diverse groups and cultures. This skill is explicitly named in reading standards as a key literary comprehension skill. Option A is incorrect because while figurative language may appear in these folktales, the primary instructional goal described is cross-cultural comparison of themes and characters, not identification of literary devices. Option C is incorrect because concepts of print are foundational emergent literacy skills about how print is physically organized on a page; they are not relevant to this upper-elementary cross-cultural literary analysis activity. Option D is incorrect because phonemic awareness is an oral language skill focused on sound manipulation; it has no relationship to comparing themes across cultural folktales.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade teacher assigns a novel told from the first-person perspective of a child protagonist. After students read the first three chapters, the teacher asks: "What is the narrator NOT telling us? What perspectives or experiences might be missing from this account?" This question primarily targets which comprehension skill?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying what the narrator explicitly tells the reader' },
      { label: 'B', text: 'Retelling — summarizing the events the narrator has described in the first three chapters' },
      { label: 'C', text: 'Critical thinking about narrator reliability and perspective — examining whose voice and viewpoint shapes the story and considering what is absent or unstated' },
      { label: 'D', text: 'Identifying the theme — determining the central message the author wants readers to take away' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. This question pushes students beyond understanding what the narrator tells them to critically examining the limits and biases of a first-person perspective. A first-person narrator can only report what they observe, think, and feel — other characters\' internal lives, events the narrator didn\'t witness, and perspectives different from the narrator\'s are all potentially absent. Asking students what is NOT being told develops critical thinking about narrator reliability, point of view, and the constructed nature of narrative — higher-order literary comprehension skills aligned with evaluative comprehension. Option A is incorrect because the question explicitly asks about what is not stated, not what is stated; literal comprehension is the opposite of the skill being targeted. Option B is incorrect because retelling involves summarizing what the narrator has reported, not analyzing the limits or biases of that reporting. Option D is incorrect because identifying theme involves determining the universal message about life or human nature the story conveys, not analyzing the gaps and limitations of the narrator\'s perspective.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher asks students to predict what will happen next in a story before turning the page, then asks them to confirm, revise, or disprove their prediction after reading. This instructional practice primarily supports which comprehension strategy?',
    options: [
      { label: 'A', text: 'Self-monitoring/metacognition — students check their understanding and adjust predictions based on incoming text' },
      { label: 'B', text: 'Annotation — students mark text to identify important vocabulary' },
      { label: 'C', text: 'Close reading — students reread the text multiple times to deepen analysis' },
      { label: 'D', text: 'Graphic organizer use — students visually represent the story structure' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The predict-read-confirm/revise cycle is a classic metacognitive comprehension strategy. Making a prediction requires students to activate prior knowledge and make an inference about the text\'s direction. Returning to the prediction after reading and evaluating whether it was confirmed, needed revision, or was disproved requires self-monitoring — the ability to check one\'s own comprehension and actively adjust one\'s mental model as new information arrives. This metacognitive monitoring is a hallmark of strategic, proficient readers. Option B is incorrect because annotation involves marking text (underlining, writing notes in margins) to track ideas and vocabulary; it does not describe the predict-read-evaluate cycle. Option C is incorrect because close reading involves careful, analytical rereading of the same text for deeper understanding; the predict-check activity described occurs across a single reading, not through rereading cycles. Option D is incorrect because graphic organizer use involves representing information visually (story maps, character webs, etc.); it is not the same as the prediction-monitoring strategy described.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reads aloud a story in which the protagonist must choose between two difficult options. After reading, the teacher asks: "Do you think the character made the right choice? Use evidence from the story to support your opinion." This question most directly targets which comprehension level?',
    options: [
      { label: 'A', text: 'Literal comprehension — retelling which choice the character made' },
      { label: 'B', text: 'Inferential comprehension — inferring the character\'s motivation for making the choice' },
      { label: 'C', text: 'Evaluative comprehension — making a judgment about the character\'s decision and supporting it with textual evidence' },
      { label: 'D', text: 'Vocabulary comprehension — understanding the meaning of specific words the teacher used in the question' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Evaluative comprehension requires students to make a judgment — to assess, critique, or evaluate — and to support that judgment with evidence. "Do you think the character made the right choice?" asks students to form an opinion and defend it, which is an evaluative-level task. It goes beyond understanding what happened (literal) or why it happened (inferential) to judging the quality or appropriateness of an action. Option A is incorrect because retelling which choice the character made is literal comprehension — identifying what is explicitly stated. The evaluative question requires more: the student must form an opinion and justify it. Option B is incorrect because inferential comprehension involves inferring something implied but not stated — for example, inferring the character\'s unstated motivation. The question here asks the student to evaluate the rightness of the decision, not to infer an unstated motive. Option D is incorrect because vocabulary comprehension is not one of the three levels of literary comprehension; the question does not primarily target word meanings.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher has students participate in literature circles in which small groups discuss a novel with minimal teacher direction. Each student has a role: discussion director, vocabulary enricher, passage picker, and connector. Which comprehension practice do literature circles most directly support?',
    options: [
      { label: 'A', text: 'Silent independent reading for rate and automaticity development' },
      { label: 'B', text: 'Student-led text-based discussion that deepens comprehension through collaborative meaning-making and multiple perspectives' },
      { label: 'C', text: 'Phonics review through analysis of difficult words encountered in the novel' },
      { label: 'D', text: 'Formal assessment of comprehension through structured question-and-answer with the teacher' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Literature circles are a structured small-group discussion format in which students take on specific roles that scaffold collaborative comprehension: the discussion director facilitates questioning, the vocabulary enricher addresses word meanings, the passage picker identifies significant text excerpts, and the connector links the text to other texts or experiences. The instructional purpose is collaborative meaning-making — students deepen their comprehension by hearing peers\' interpretations, asking and answering each other\'s questions, and examining the text from multiple angles. This is a student-led, social construction of meaning approach to literary comprehension. Option A is incorrect because literature circles involve structured discussion, not silent individual reading. Option C is incorrect because while the vocabulary enricher role addresses word meanings, the primary purpose of literature circles is collaborative comprehension discussion, not phonics review. Option D is incorrect because literature circles are explicitly student-led with minimal teacher direction; they are not teacher-led formal assessment activities.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher asks third graders to read a poem with the lines: "The wind is a thief / who steals your hat / and runs away laughing." She asks, "Is the wind really a thief? What technique is the poet using, and why?" What literary skill is the teacher assessing?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying what is explicitly described in the poem' },
      { label: 'B', text: 'Understanding personification — recognizing that the poet gives human characteristics (stealing, laughing) to a non-human subject (the wind) to create a vivid image' },
      { label: 'C', text: 'Analyzing rhyme scheme — examining the pattern of end rhymes in the poem' },
      { label: 'D', text: 'Identifying the narrator — determining who is speaking in the poem' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The poem describes the wind as a "thief" who "steals" and "runs away laughing" — all actions and qualities that are human, not characteristic of wind. This is personification: a figure of speech in which human qualities, emotions, or actions are attributed to non-human subjects. The teacher\'s question — "Is the wind really a thief?" — prompts students to recognize that this is figurative, not literal, language, and to identify why the poet chose this technique (to create a vivid, playful image of the wind\'s effect on hats). Option A is incorrect because the teacher is explicitly asking students to recognize that the description is NOT literal; the question targets figurative language recognition. Option C is incorrect because rhyme scheme involves analyzing end-rhyme patterns (ABAB, AABB, etc.) — the question does not address rhyming. Option D is incorrect because identifying the narrator would involve determining the speaker\'s identity and perspective; the question focuses specifically on the figurative technique used to describe the wind, not on narrator identification.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher uses a story map graphic organizer to support comprehension of narrative text. Students complete boxes for: characters, setting, problem, major events, and resolution. Which comprehension skill does this organizer most directly support?',
    options: [
      { label: 'A', text: 'Identifying key ideas and details — organizing the essential story elements in a visual structure that supports retelling and summarizing' },
      { label: 'B', text: 'Analyzing figurative language — identifying similes and metaphors used by the author throughout the story' },
      { label: 'C', text: 'Evaluating the author\'s argument — determining whether the author\'s claims are supported by sufficient evidence' },
      { label: 'D', text: 'Building phonemic awareness — attending to the sounds of character names and setting descriptions' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. A story map is a graphic organizer specifically designed to help students identify, organize, and remember the key structural elements of a narrative: characters, setting, problem (conflict), major events (rising action), and resolution. By visually organizing these elements, students build a mental framework for the story that supports retelling and summarizing — both important comprehension skills. The organizer scaffolds the identification of key ideas and details that give the narrative its meaning and structure. Option B is incorrect because story maps address story structure (plot elements), not figurative language. Analyzing figurative language requires a different kind of focused attention and organizer. Option C is incorrect because evaluating arguments is an informational text skill; narrative texts have conflicts, not arguments. Option D is incorrect because phonemic awareness is an oral language skill involving sound manipulation; story maps are a reading comprehension tool with no connection to phonemes.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher conducts a think-aloud while reading a picture book, pausing to say: "Hmm, I\'m confused about why the character made that choice. Let me reread this part and see if I missed something." Which comprehension strategy is the teacher explicitly modeling?',
    options: [
      { label: 'A', text: 'Summarizing — identifying the most important ideas and condensing them into a brief statement' },
      { label: 'B', text: 'Self-monitoring and fix-up strategy use — recognizing a comprehension breakdown and applying a specific repair strategy (rereading)' },
      { label: 'C', text: 'Making connections — linking events in the text to personal experiences or other texts' },
      { label: 'D', text: 'Visualizing — creating a mental image of the scene described in the text' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher\'s think-aloud has two specific components: (1) recognizing a comprehension problem ("I\'m confused about why the character made that choice") — this is self-monitoring; and (2) applying a fix-up strategy to repair the breakdown ("Let me reread this part"). Self-monitoring is the metacognitive skill of checking one\'s own comprehension while reading, and fix-up strategies (such as rereading, reading on, asking a question) are the active repair strategies that proficient readers apply when comprehension fails. Explicitly modeling this process helps students learn to recognize and repair their own comprehension breakdowns. Option A is incorrect because summarizing involves identifying and condensing key ideas; the teacher is not summarizing but rather addressing a comprehension failure. Option C is incorrect because making connections involves linking the text to personal experience, other texts, or world knowledge; the teacher\'s think-aloud is about comprehension monitoring and repair, not about connecting. Option D is incorrect because visualizing involves creating a mental image of described content; there is no indication the teacher is describing a mental picture.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade teacher selects a novel in which the protagonist is an immigrant child navigating two cultures. After reading, the teacher asks: "Who benefits from how this story is told? Whose experience is centered, and whose is left out?" This question primarily engages which comprehension skill?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying the explicitly stated main character and narrator' },
      { label: 'B', text: 'Critical literary analysis — examining whose perspectives, voices, and experiences are represented and whose are absent from the narrative' },
      { label: 'C', text: 'Phonics analysis — using word study to understand the cultural vocabulary used in the novel' },
      { label: 'D', text: 'Text structure analysis — identifying whether the novel uses first-person or third-person narration' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. "Who benefits from how this story is told?" and "Whose experience is centered?" are critical literacy questions that go beyond comprehending what the story says to analyzing the ideological and representational choices embedded in the text. This requires students to: (1) identify whose perspective shapes the narrative; (2) consider what is centered vs. marginalized; and (3) think about whose experiences, voices, and assumptions are validated by the story and whose are absent. This is higher-order critical literary analysis at the evaluative level, targeting the examination of perspectives and assumptions present in and absent from a text. Option A is incorrect because identifying the main character is a literal comprehension task that does not require critical analysis of perspective or representation. Option C is incorrect because phonics analysis focuses on decoding, not on analyzing narrative perspective or cultural representation. Option D is incorrect because identifying first- vs. third-person narration is a text structure/craft observation; the question goes further to critically examine the consequences of the narrative perspective in terms of whose story is told and how.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher has students write a brief response in their literary response journal after each chapter, noting one question they still have, one connection they made, and one thing that surprised them. This practice primarily supports which reading comprehension goal?',
    options: [
      { label: 'A', text: 'Phonics skill development — connecting spoken and written words encountered in the chapter' },
      { label: 'B', text: 'Active comprehension monitoring and personal engagement — requiring students to actively process and respond to text meaning in a personal, reflective way' },
      { label: 'C', text: 'Formal comprehension assessment — providing the teacher with a summative measure of each student\'s reading level' },
      { label: 'D', text: 'Fluency development — practicing reading the chapter multiple times to build rate and expression' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Literary response journals serve a specific comprehension function: they require students to actively process what they have read by generating questions, making connections, and noting surprises. This active processing — rather than passive reading — is associated with deeper comprehension. The journal also supports comprehension monitoring (noticing what is confusing enough to generate a question) and personal engagement (connecting the text to prior knowledge or experience). Option A is incorrect because literary response journals address meaning-level engagement with text, not phonics or decoding skill. Option C is incorrect because literary response journals are formative, informal tools for reflection and engagement, not summative assessments of reading level. Option D is incorrect because fluency development involves reading practice for rate and expression; writing reflective journal entries is a comprehension and thinking-about-text activity, not a fluency practice.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0007 — Informational Text Comprehension  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher reads aloud a nonfiction book about butterflies. As she reads, she says: "Did you notice that the author organized this section using a special pattern? First the author explained the problem — butterflies need warm temperatures — and then the author explained the solution — butterflies migrate south in autumn." Which text structure is the teacher identifying?',
    options: [
      { label: 'A', text: 'Chronological/sequential structure — events are presented in time order' },
      { label: 'B', text: 'Comparison/contrast structure — two things are compared on specific attributes' },
      { label: 'C', text: 'Problem/solution structure — a problem is presented followed by one or more solutions or responses' },
      { label: 'D', text: 'Description/enumeration structure — attributes or characteristics of a topic are listed and described' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The teacher explicitly names both elements: a problem (butterflies need warm temperatures) and a solution/response (migration south). This is problem/solution text structure — a common organizational pattern in informational text where an issue or challenge is identified and then one or more responses or solutions are described. Teaching students to recognize this structure helps them anticipate and organize the information they will encounter. Option A is incorrect because chronological structure organizes events by the order in which they occur in time; the teacher identifies a problem-solution relationship, not a time-sequence relationship. Option B is incorrect because comparison/contrast structure examines similarities and differences between two or more subjects on specific dimensions; the passage presents one subject (butterfly migration) as a response to a problem, not a comparison. Option D is incorrect because description/enumeration lists and describes attributes of a topic without the explicit problem-response relationship the teacher describes.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher shows students how to use the table of contents, index, glossary, and subheadings in a social studies textbook before students begin a research task. Which comprehension skill is the teacher primarily supporting?',
    options: [
      { label: 'A', text: 'Phonics — using graphophonic cues to decode technical terms in the text features' },
      { label: 'B', text: 'Strategic reading using text features — navigating the organizational features of informational text to locate specific information efficiently' },
      { label: 'C', text: 'Literary analysis — analyzing how the text\'s structure reflects the author\'s artistic choices' },
      { label: 'D', text: 'Oral language development — building vocabulary through discussion of what each text feature means' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Table of contents, index, glossary, and subheadings are all text features — navigational and organizational structures specific to informational text. Teaching students how to use these features supports strategic, purposeful reading: students learn to scan the table of contents or index to locate relevant sections, use subheadings to preview and organize information, and consult the glossary for technical term definitions. This is an explicit, evidence-based comprehension strategy for informational text. Option A is incorrect because phonics is about decoding letter-sound relationships; using a table of contents or index requires navigational and organizational skills, not phonics decoding. Option C is incorrect because literary analysis applies to narrative/literary texts and involves examining craft elements like characterization, theme, and figurative language; text features are informational text structures, not literary devices. Option D is incorrect because while vocabulary may be incidentally supported, the primary purpose of the instruction is teaching students to use text features as navigation tools, not oral language development.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade teacher has students compare a newspaper article written in 1965 about the Voting Rights Act with a current encyclopedia entry on the same legislation. The teacher asks: "How does each source present the events differently, and how might the time period and source type affect what information is included or excluded?" This task most directly develops which comprehension skill?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying the facts stated in each source' },
      { label: 'B', text: 'Vocabulary development — comparing how the two sources use technical and historical terms' },
      { label: 'C', text: 'Critical analysis of multiple sources — evaluating how source type, author perspective, and historical context shape what and how information is presented' },
      { label: 'D', text: 'Text structure recognition — identifying whether each source uses chronological or cause/effect organization' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. This task asks students to compare how two different source types (a primary source newspaper article and a secondary source encyclopedia entry), written at different points in time, represent the same historical event — and to analyze why they might differ. This requires understanding that: (1) sources are not neutral; (2) the author\'s position, the publication\'s purpose, and the historical moment all shape what is written; and (3) comparing multiple sources reveals what each emphasizes, omits, or frames differently. This is critical analysis of multiple informational sources — a sophisticated, high-level comprehension skill. Option A is incorrect because literal comprehension involves identifying stated facts; this task explicitly asks why and how the sources differ, requiring analysis beyond fact location. Option B is incorrect because while vocabulary comparison could be part of the task, the primary instructional focus is on critical analysis of source perspective and historical context, not vocabulary per se. Option D is incorrect because identifying text structure (chronological, cause/effect) is a useful but more basic organizational skill; the question goes far beyond structure to examine authorial perspective and source limitations.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade class is reading a nonfiction chapter about the American Revolution. The teacher asks: "What is the main idea of this chapter? How do the section headings help you figure it out before reading the details?" This instructional move primarily supports which comprehension skill?',
    options: [
      { label: 'A', text: 'Using text features to preview and predict main ideas before reading the full text' },
      { label: 'B', text: 'Phonics — using letter-sound relationships to decode the chapter title' },
      { label: 'C', text: 'Evaluating the author\'s argument — determining whether the chapter\'s thesis is logically supported' },
      { label: 'D', text: 'Retelling — summarizing each section of the chapter after reading it' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The teacher is explicitly teaching students to use section headings — a key informational text feature — as a previewing strategy for identifying main ideas before diving into the details. This is a strategic reading skill: proficient readers use text features to activate background knowledge, build a framework for the information they will encounter, and begin forming main-idea hypotheses before reading. Option B is incorrect because phonics is about decoding letter-sound relationships, not about reading comprehension strategies or text features. Option C is incorrect because evaluating an argument requires judging the strength and logic of evidence; the teacher is asking about the main idea and how headings help identify it — not about argument evaluation. Option D is incorrect because retelling is a post-reading summary strategy; the teacher\'s question occurs before reading the full details, using headings to preview main ideas.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher has students read a science article and complete a graphic organizer with two columns: "What the text says" and "What this means in my own words." Which comprehension strategy is the graphic organizer designed to support?',
    options: [
      { label: 'A', text: 'Paraphrasing — restating the text\'s information in the reader\'s own words to confirm and deepen understanding' },
      { label: 'B', text: 'Annotation — marking important words and phrases directly in the text' },
      { label: 'C', text: 'Comparing text structures — identifying how two different sections of the article are organized' },
      { label: 'D', text: 'Phonemic segmentation — separating words in the article into their individual phonemes' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The "What it says / What it means in my own words" graphic organizer is designed to promote paraphrasing — the ability to restate information from the text using the reader\'s own language. Paraphrasing is an evidence-based comprehension strategy because it requires students to understand the information well enough to express it differently, rather than copying the author\'s words. This process also helps students detect misunderstandings: if they cannot paraphrase a section, they may not fully understand it. Option B is incorrect because annotation involves marking the text itself (underlining, highlighting, adding margin notes); the two-column organizer describes paraphrasing, not annotation. Option C is incorrect because the graphic organizer compares text content to student understanding (what it says vs. what I understand), not two text structure types. Option D is incorrect because phonemic segmentation is an oral phonological awareness skill with no relation to reading comprehension strategies.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is preparing students to read a primary source: an 1862 letter written by a Civil War soldier to his family. Before reading, the teacher says: "This is a primary source — written by someone who lived through the event. As you read, ask yourself: What does this person know firsthand? What might he not know? How might his experience shape what he writes?" Which disciplinary literacy skill is the teacher introducing?',
    options: [
      { label: 'A', text: 'Fluency practice — reading a complex historical text at appropriate rate and with expression' },
      { label: 'B', text: 'Source analysis — thinking critically about who produced the document, what they knew, and how their position might shape the account' },
      { label: 'C', text: 'Phonics decoding — applying letter-sound knowledge to read 19th-century spelling conventions' },
      { label: 'D', text: 'Literal comprehension — identifying the facts the soldier reports in the letter' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher is introducing disciplinary literacy practices specific to historical thinking — specifically, source analysis, the practice of examining a document\'s origin, author, context, and limitations before and while reading. Historians routinely ask: Who wrote this? What did they know firsthand vs. hear secondhand? How might their position, identity, or circumstances bias what they report? Teaching students to apply these questions to primary sources is a key disciplinary literacy skill in social studies. Option A is incorrect because while complex texts require fluency, the teacher\'s questions are about critical analysis of the source, not about reading rate or expression. Option C is incorrect because while 19th-century texts may use archaic spellings or vocabulary, phonics is not the skill being introduced; source analysis is. Option D is incorrect because literal comprehension involves identifying explicitly stated information; the teacher\'s questions go beyond what the text says to how its limitations and the author\'s perspective shape what is written.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'After reading a nonfiction article about climate change, a teacher asks: "The author states that rising sea levels threaten coastal cities. Does the author provide specific evidence to support this claim? Is the evidence sufficient and credible?" Which comprehension skill does this question target?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying the claim the author makes in the article' },
      { label: 'B', text: 'Evaluative comprehension — critically examining the strength, sufficiency, and credibility of the evidence the author provides for a claim' },
      { label: 'C', text: 'Vocabulary development — understanding the meaning of the word "credible" in the context of the question' },
      { label: 'D', text: 'Text structure identification — determining whether the article uses cause/effect or problem/solution organization' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher\'s question asks students not only to identify what evidence the author provides (inferential) but to evaluate its sufficiency and credibility — to judge whether the evidence is strong enough and reliable enough to support the claim. This is evaluative comprehension applied to informational text argumentation: students are acting as critical readers who assess the quality of the author\'s reasoning, not just understand it. Option A is incorrect because identifying the claim is literal comprehension; evaluating the evidence requires a higher-order judgment about quality and sufficiency. Option C is incorrect because while "credible" is a vocabulary word in the question, the primary comprehension skill targeted is the critical evaluation of the author\'s argument — vocabulary development is incidental. Option D is incorrect because text structure identification is a craft-and-structure skill about organizational pattern; the question is about evaluating the logical support for a specific claim, not about organizational pattern.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reads a paragraph from a science text aloud and then asks students to write a one-sentence statement of the main idea in their own words. Several students write sentences that simply copy a sentence from the text. Which instructional strategy would most help students learn to identify — rather than copy — main ideas?',
    options: [
      { label: 'A', text: 'Having students highlight the first sentence of each paragraph, since the main idea is always in the first sentence' },
      { label: 'B', text: 'Teaching students to cover the text after reading, ask "What was this mostly about?", and then write the answer before uncovering the text to check' },
      { label: 'C', text: 'Requiring students to write longer summaries so they have more space to include main ideas' },
      { label: 'D', text: 'Having students read the text a second time silently and underline any sentence they find interesting' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. When students simply copy sentences from the text, they are not constructing a main idea — they are locating and reproducing text. The cover-and-recall strategy prevents copying by removing visual access to the text and forcing students to generate a statement from memory. If students can say what the passage was "mostly about" without looking at the text, they demonstrate actual main-idea understanding rather than text-matching behavior. This strategy explicitly builds the comprehension skill of main-idea synthesis. Option A is incorrect because main ideas are not always in the first sentence; topic sentences can appear anywhere in a paragraph, and many informational texts distribute main ideas across multiple sentences. Teaching this as a universal rule leads to misidentification. Option C is incorrect because writing a longer summary doesn\'t prevent copying; students can simply copy more text into a longer response. Option D is incorrect because underlining interesting sentences is a student-interest-based activity that does not specifically target main-idea identification.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reads an informational text about ecosystems and asks students: "How does the illustration of the food web on page 12 help you understand the main text\'s explanation of energy flow?" This question primarily targets which informational text comprehension skill?',
    options: [
      { label: 'A', text: 'Integration of knowledge and ideas — using visual information alongside print information to deepen understanding of a concept' },
      { label: 'B', text: 'Phonics — decoding the scientific labels on the food web diagram' },
      { label: 'C', text: 'Vocabulary development — learning the specific meaning of "food web" from the diagram' },
      { label: 'D', text: 'Rhyme and rhythm — analyzing the aesthetic features of the text\'s language' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The question asks students to use the visual (illustration of the food web) together with the print text to develop a more complete understanding of energy flow than either source provides alone. This is an integration of knowledge and ideas skill: using illustrations, diagrams, and other visual representations in conjunction with the written text to enhance comprehension of informational content. Visual-text integration is explicitly taught as a key informational text comprehension skill. Option B is incorrect because phonics is about decoding letter-sound relationships; reading diagram labels may require decoding, but the comprehension skill being assessed is how the visual supports the text\'s meaning, not decoding. Option C is incorrect because the question is specifically about how the diagram enhances understanding of energy flow — an integration skill — not about learning the isolated definition of "food web." Option D is incorrect because rhyme and rhythm are literary/poetic elements not applicable to informational text with diagrams.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade class reads an article arguing that students should have less homework. The teacher asks: "Is this an opinion piece or a factual report? What language clues tell you what type of text this is? Does the author distinguish between facts and opinions, or does the author present opinions as if they are facts?" Which comprehension skill is the teacher targeting?',
    options: [
      { label: 'A', text: 'Literal comprehension — identifying the article\'s main claim' },
      { label: 'B', text: 'Phonological awareness — identifying words with persuasive sound patterns' },
      { label: 'C', text: 'Critical analysis of author\'s purpose and argument — distinguishing fact from opinion, identifying language markers of argument, and evaluating how the author frames claims' },
      { label: 'D', text: 'Text structure — determining whether the article uses comparison/contrast or problem/solution organization' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The teacher\'s questions require students to: (1) determine the text\'s genre (opinion piece vs. factual report) using language clues; (2) identify markers of opinion and argument in the author\'s language; and (3) critically evaluate whether the author clearly distinguishes facts from opinions or presents opinions as if they were established facts. This is sophisticated critical analysis of author\'s purpose, perspective, and argumentation — a key evaluative comprehension skill for informational text. Option A is incorrect because identifying the main claim is a literal or basic inferential task; the teacher\'s questions go further to require critical analysis of the argument\'s construction and the author\'s rhetorical choices. Option B is incorrect because phonological awareness is a foundational oral language skill unrelated to analyzing written arguments. Option D is incorrect because text structure identification is a useful but more basic skill; the teacher\'s questions address author purpose, fact/opinion distinction, and rhetorical analysis, which are more complex than structure identification.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0008 — Assessment of Reading Development  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'At the beginning of the school year, a school administers a reading screener to all students in grades kindergarten through third. Students who score below a cut point are identified for further assessment and potential intervention. This practice is best described as which type of assessment?',
    options: [
      { label: 'A', text: 'Summative assessment — measuring students\' overall reading achievement at the end of an instructional period' },
      { label: 'B', text: 'Formative assessment — gathering ongoing data during instruction to inform daily teaching decisions' },
      { label: 'C', text: 'Screening assessment — efficiently identifying students who may be at risk for reading difficulties and who may need additional support' },
      { label: 'D', text: 'Diagnostic assessment — pinpointing the specific reading skills a student has and has not mastered' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. A screening assessment is administered to all students at a given point in time — typically at the beginning of the year or at grade transitions — with the goal of efficiently sorting students into those who appear on track and those who may need additional evaluation or support. Screening instruments are typically brief, valid, and reliable, and they establish a first cut for identifying students who require further assessment. Option A is incorrect because summative assessments measure achievement at the end of an instructional cycle (end of unit, semester, year); the purpose is to evaluate what was learned, not to identify students who need support at the outset. Option B is incorrect because formative assessment is an ongoing, embedded process used during instruction to provide feedback and adjust teaching; a universal screening administered once at the start of the year is not formative assessment. Option D is incorrect because diagnostic assessment is typically more detailed and individually administered, used specifically to pinpoint the nature and source of a reading difficulty after a student has been identified as struggling; it follows screening, it does not replace it.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher regularly uses running records during small-group reading instruction. She notes the types of errors students make (substitutions, insertions, omissions), the error patterns, and whether students self-correct. Which primary purpose does this type of assessment serve?',
    options: [
      { label: 'A', text: 'Summative assessment — providing a final grade for students\' reading performance at the end of the semester' },
      { label: 'B', text: 'Formative/progress-monitoring assessment — gathering ongoing data about students\' reading behaviors and error patterns to inform and adjust instruction' },
      { label: 'C', text: 'Screening assessment — identifying which students are at grade level and which are at risk' },
      { label: 'D', text: 'Norm-referenced assessment — comparing individual students\' performance to that of a national normative sample' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A running record is an informal, individually administered assessment in which the teacher observes and records a student\'s oral reading behaviors in real time, noting errors, self-corrections, and patterns. Because this is conducted regularly during ongoing instruction and the data directly informs the teacher\'s next instructional moves (what to reteach, what text level to use, what errors need addressing), it is formative/progress-monitoring assessment. The key feature is that it is ongoing and embedded in instruction to continuously inform teaching. Option A is incorrect because summative assessments evaluate achievement at the end of an instructional cycle; running records are used continuously during instruction, not just at the end. Option C is incorrect because screening assessments are typically brief, group-administered instruments used to identify at-risk students; running records are individually administered, detailed, and ongoing rather than used as a one-time sorting tool. Option D is incorrect because running records are criterion-referenced (compared to a benchmark or standard), not norm-referenced (compared to a national sample).',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading specialist evaluates a second-grade student who is struggling in reading. She administers a phonics inventory, asks the student to read real words and pseudowords, analyzes a writing sample for spelling patterns, and listens to an oral retell. What type of assessment is the specialist conducting?',
    options: [
      { label: 'A', text: 'Universal screening — efficiently identifying whether the student is at risk for reading difficulty' },
      { label: 'B', text: 'Summative assessment — measuring the student\'s overall reading achievement for end-of-year reporting' },
      { label: 'C', text: 'Diagnostic assessment — gathering detailed, multi-source data to identify the student\'s specific reading strengths and difficulties across multiple components' },
      { label: 'D', text: 'Formative assessment — gathering brief daily observations to make moment-to-moment instructional adjustments' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Diagnostic assessment is a comprehensive, multi-faceted evaluation aimed at identifying the specific nature and root of a student\'s reading difficulties. Unlike screening (which merely identifies who is at risk) or formative (which provides quick ongoing feedback), diagnostic assessment is thorough — it samples multiple reading components (phonics, word reading, spelling, comprehension/retell) and looks for patterns across data sources that explain the student\'s difficulties. This information directly guides the development of targeted, individualized intervention. Option A is incorrect because screening is efficient and brief, not comprehensive; it identifies at-risk status, not the specific nature of the difficulty. Option B is incorrect because summative assessment evaluates overall achievement at the end of an instructional period; the specialist is trying to understand the current nature of the student\'s difficulty, not measure end-of-year achievement. Option D is incorrect because formative assessment is brief, embedded in instruction, and occurs daily or lesson-to-lesson; the multi-source, comprehensive evaluation described is diagnostic.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A school uses a standardized reading assessment with established national norms. A first-grade student scores at the 34th percentile in oral reading fluency. Which of the following is the most accurate interpretation of this result?',
    options: [
      { label: 'A', text: 'The student answered 34% of questions correctly on the fluency assessment.' },
      { label: 'B', text: 'The student scored higher than 34% of first-grade students in the national normative sample, meaning the student is performing below the median but not necessarily at an extreme level of difficulty.' },
      { label: 'C', text: 'The student is reading at a 34-word-per-minute fluency rate.' },
      { label: 'D', text: 'The student scored below the 34th-percentile cut point that indicates reading disability.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A percentile rank of 34 means the student performed at or above 34% of the students in the normative sample — or equivalently, that 66% of students in the norm group scored higher. The student is performing somewhat below the median (50th percentile) but is not at an extreme low end of the distribution. Percentile scores do not represent percentage of questions correct, reading rate in words per minute, or a diagnostic cutoff for disability. Option A is incorrect because a percentile rank is not a percentage of correct responses; it is a rank relative to the norm group. Option C is incorrect because a percentile rank is a relative score, not a raw score like words per minute. The student\'s actual WPM rate would be reported separately. Option D is incorrect because while many schools do use a percentile cut (such as the 25th or 16th percentile) to flag students for concern, the percentile itself is not a disability threshold; the interpretation of any cut point requires professional judgment and additional data.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants to assess whether students can read high-frequency words automatically. She uses timed flash cards — holding up each card for one second and asking students to say the word. This type of assessment targets which reading component?',
    options: [
      { label: 'A', text: 'Phonemic awareness — students must identify the individual phonemes in each word' },
      { label: 'B', text: 'Automatic sight-word recognition — assessing whether students recognize high-frequency words instantly, without conscious decoding' },
      { label: 'C', text: 'Reading comprehension — determining whether students understand the meaning of each word in context' },
      { label: 'D', text: 'Prosody — assessing whether students read words with appropriate intonation and expression' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The one-second exposure time is specifically designed to assess automaticity — the ability to recognize a word instantly, without conscious decoding effort. If a student can read a word correctly within one second, they are recognizing it automatically (as a sight word), not laboriously decoding it phoneme by phoneme. This type of timed flash card assessment directly targets high-frequency word automaticity, which is a critical component of reading fluency. Option A is incorrect because phonemic awareness requires students to manipulate oral phonemes (segment, blend, delete); looking at a printed word and saying it does not isolate phonemic awareness. Option C is incorrect because reading comprehension involves understanding meaning in context; a flash card task tests isolated word recognition, not comprehension. Option D is incorrect because prosody involves expression and phrasing during connected text reading; single-word flash card recognition does not have a prosody component.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants to assess students\' reading comprehension of an informational text without relying on their ability to write extended responses. Which assessment tool would be most appropriate?',
    options: [
      { label: 'A', text: 'A writing prompt asking students to write a multi-paragraph essay about the text' },
      { label: 'B', text: 'An oral retell, in which the student summarizes the text aloud while the teacher notes key ideas and details recalled' },
      { label: 'C', text: 'A phonics inventory, in which the student reads a list of phonetically controlled words' },
      { label: 'D', text: 'A standardized norm-referenced reading test administered to the entire class simultaneously' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. An oral retell assesses reading comprehension in a format that does not require written expression. The student summarizes what was read aloud while the teacher notes which key ideas and details the student recalls, how well the student organizes the information, and what important information is omitted. This is especially useful for students whose written language skills may underrepresent their comprehension (e.g., students with writing difficulties, English learners). Option A is incorrect because a multi-paragraph essay requires significant writing ability; for students with writing challenges, the assessment would measure writing skill as much as — or more than — comprehension. Option C is incorrect because a phonics inventory measures decoding skill, not reading comprehension. Option D is incorrect because a standardized norm-referenced test measures a broad range of skills and is not designed to be a targeted comprehension check on a specific text; it also requires student writing in many formats.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher reviews a student\'s writing sample and notices the following spellings: "sed" for "said," "wuz" for "was," "duz" for "does," and "frend" for "friend." Which reading component does this spelling evidence most directly inform?',
    options: [
      { label: 'A', text: 'Fluency — the student\'s reading rate and prosody in connected text' },
      { label: 'B', text: 'Phonics and orthographic knowledge — specifically, the student\'s mastery of irregular high-frequency word spellings' },
      { label: 'C', text: 'Reading comprehension — the student\'s ability to understand the meaning of these words in context' },
      { label: 'D', text: 'Phonological awareness — the student\'s ability to hear and manipulate phonemes in spoken words' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. All four misspellings are phonetically logical attempts at words with irregular spelling patterns: "said" sounds like /sɛd/ but is spelled irregularly; "was" sounds like /wʌz/; "does" sounds like /dʌz/; and "friend" has the unpredictable <ie> vowel. The student is applying phonetic logic consistently but has not yet memorized the irregular spellings of these high-frequency words. Because reading and spelling are reciprocal processes, spelling errors with irregular high-frequency words directly inform the teacher about the student\'s phonics and orthographic knowledge — specifically, which high-frequency word spellings have not yet been automatized. Option A is incorrect because writing/spelling samples do not directly measure fluency (reading rate and prosody); those are oral reading measures. Option C is incorrect because the errors are spelling errors, not comprehension errors; the student may well understand what "said," "was," and "friend" mean while not knowing how to spell them conventionally. Option D is incorrect because the errors are about orthographic patterns (spelling conventions), not about phonological awareness; the student is applying phoneme-to-grapheme logic, not demonstrating phoneme manipulation difficulty.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A school uses an oral reading fluency (ORF) measure as a progress-monitoring tool for students in Tier 2 intervention. Students read a grade-level passage for one minute, and the teacher counts words read correctly per minute (WCPM). The school plans to administer this every two weeks and graph the data. Which feature of this assessment most clearly makes it suitable for progress monitoring?',
    options: [
      { label: 'A', text: 'It is a group-administered assessment, allowing the teacher to monitor many students at once' },
      { label: 'B', text: 'It uses alternate forms of similar difficulty, allowing repeated administration over time so that growth can be tracked without practice effects inflating scores' },
      { label: 'C', text: 'It provides a comprehensive measure of all five reading components at once' },
      { label: 'D', text: 'It is a norm-referenced test that compares students to the national average' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Progress monitoring requires repeated assessment of the same skill over time to detect growth. For ORF to function as a valid progress-monitoring tool, it must use alternate forms (different passages of equivalent difficulty) each time it is administered. If the same passage were used repeatedly, students would memorize it, and scores would inflate without reflecting actual growth in reading ability. Standardized alternate-form ORF probes (such as those from DIBELS or AIMSweb) are specifically designed for this purpose. Option A is incorrect because ORF is individually administered — each student reads to the teacher one-on-one for one minute; it is not a group assessment. Option C is incorrect because ORF measures oral reading fluency (accuracy and rate); it does not directly measure phonemic awareness, phonics depth, vocabulary knowledge, or reading comprehension. Option D is incorrect because while some ORF tools have national norms, the feature that makes ORF suitable for progress monitoring is its alternate-form structure enabling repeated measurement, not its norm-referenced property.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading assessment is described as "reliable." Which of the following best describes what reliability means in this context?',
    options: [
      { label: 'A', text: 'The assessment accurately measures what it claims to measure (e.g., phonemic awareness).' },
      { label: 'B', text: 'The assessment produces consistent scores across different administrations, raters, or forms — so that score variation reflects true differences in student ability rather than measurement error.' },
      { label: 'C', text: 'The assessment is free of bias against any cultural or linguistic group.' },
      { label: 'D', text: 'The assessment results are useful for planning differentiated instruction.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Reliability in assessment refers to consistency of measurement. A reliable assessment produces similar results when administered multiple times under similar conditions (test-retest reliability), when scored by different raters (inter-rater reliability), or when using different forms (alternate-form reliability). High reliability means that score variation reflects genuine differences in student ability, not random measurement error. Option A is incorrect because that definition describes validity — the degree to which an assessment actually measures the construct it claims to measure (e.g., does a phonemic awareness test actually assess phonemic awareness, not something else?). Reliability and validity are related but distinct concepts. Option C is incorrect because freedom from bias is a component of test fairness, which is related to validity but is a separate psychometric concern. Option D is incorrect because instructional utility is a practical consideration about assessment usefulness, not a technical definition of reliability.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher administers an oral reading fluency measure and scores a student at 62 words correct per minute (WCPM) on a second-grade passage in February. According to a national benchmark chart, the expected median (50th percentile) WCPM for February of second grade is 89. Which conclusion is most directly supported by this data?',
    options: [
      { label: 'A', text: 'The student has a diagnosed reading disability and requires special education services.' },
      { label: 'B', text: 'The student\'s oral reading fluency is below the expected benchmark for this time of year, suggesting the teacher should gather additional data and consider whether additional support is warranted.' },
      { label: 'C', text: 'The student\'s reading comprehension is severely impaired because fluency and comprehension are perfectly correlated.' },
      { label: 'D', text: 'The student will never reach grade-level fluency and should be placed in a remedial track.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student\'s WCPM of 62 is notably below the expected 89 WCPM median benchmark for February of second grade, indicating that the student\'s oral reading fluency performance falls below what is expected at this point in the year. The appropriate response is to treat this as a data point that warrants attention — gathering additional diagnostic data, monitoring progress more closely, and considering whether additional instructional support is appropriate. Option A is incorrect because one fluency score is not sufficient to diagnose a reading disability; special education evaluation requires a comprehensive, multi-source, multi-professional process. Option C is incorrect because while fluency and comprehension are related, they are not perfectly correlated; a student may have below-benchmark fluency but relatively intact comprehension (or vice versa). The data does not directly reveal comprehension status. Option D is incorrect because below-benchmark performance at one point in time does not predict permanent outcome; with appropriate, evidence-based intervention, many students close the gap. Making irreversible tracking decisions based on a single data point is not supported by assessment best practices.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher administers an informal spelling inventory to a class of third graders. The inventory samples words with short vowels, long vowel patterns, r-controlled vowels, and multisyllabic words. After scoring, the teacher identifies which features each student has mastered (score of 80%+), which are in transition (50-79%), and which are absent (below 50%). How should the teacher primarily use this data?',
    options: [
      { label: 'A', text: 'As a summative grade for the marking period\'s spelling unit' },
      { label: 'B', text: 'To form flexible instructional groups and plan targeted word study instruction at each group\'s zone of proximal development — just beyond what is already mastered' },
      { label: 'C', text: 'To immediately refer all students scoring below 80% on any feature to the reading specialist' },
      { label: 'D', text: 'To determine each student\'s text reading level for guided reading groups' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. An informal spelling inventory produces a developmental profile of each student\'s orthographic knowledge: which features are controlled (mastered), which are in transition (partially learned), and which are absent (not yet attempted). The research-based application of this data is to form flexible word study groups at each group\'s "instructional level" — focusing instruction on the features that are in transition, where students are ready to learn. Targeting features already mastered is too easy; targeting features that are absent is too far ahead. This data-driven, differentiated word study approach is grounded in the Words Their Way tradition of developmental spelling research. Option A is incorrect because a spelling inventory is a diagnostic/formative tool, not a summative performance grade. Option C is incorrect because transitional knowledge of some spelling features is developmentally expected and appropriate; not all gaps require specialist referral. Option D is incorrect because spelling inventories measure orthographic knowledge, not reading level; text reading level is assessed through reading-level tools such as running records, not spelling inventories.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0009 — Reading Instruction Principles  (12 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'A first-grade teacher uses a scope and sequence for phonics instruction that introduces simple CVC words first, then consonant blends, then digraphs, then long vowel patterns. Which principle of reading instruction does this approach most directly reflect?',
    options: [
      { label: 'A', text: 'Authentic literature integration — using real texts to teach phonics in context' },
      { label: 'B', text: 'Systematic, explicit phonics instruction — teaching phonics patterns in a planned sequence from simpler to more complex' },
      { label: 'C', text: 'Whole-language instruction — embedding phonics within rich literacy experiences without an explicit sequence' },
      { label: 'D', text: 'Balanced literacy — balancing phonics instruction with guided reading and literature circles' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Systematic phonics instruction means phonics is taught in a planned, organized sequence that proceeds from simpler to more complex patterns, with each new pattern building on previously mastered ones. Explicit instruction means the teacher directly teaches the pattern rather than expecting students to infer it from text exposure. The National Reading Panel and subsequent research strongly support systematic, explicit phonics instruction as the most effective approach for teaching word recognition, particularly for beginning and struggling readers. Option A is incorrect because authentic literature integration describes an approach to selecting reading material, not a phonics instructional sequence; authentic texts are used alongside or after explicit phonics instruction. Option C is incorrect because whole-language instruction explicitly does not use a systematic phonics scope and sequence; it embeds phonics within meaning-focused literacy activities and is not a structured sequence. Option D is incorrect because balanced literacy is a broader instructional framework that may include some phonics; the specific feature described — a planned scope and sequence from simple to complex — is systematic phonics instruction.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A school implements a Multi-Tiered System of Supports (MTSS) for reading. Tier 1 consists of high-quality, evidence-based reading instruction for all students. Which of the following best describes the purpose of Tier 1 within the MTSS framework?',
    options: [
      { label: 'A', text: 'Tier 1 is designed exclusively for students identified as having reading disabilities who need intensive remediation.' },
      { label: 'B', text: 'Tier 1 is the universal, whole-class, core reading instruction that all students receive and that should, if effective, allow most students to meet grade-level standards without additional intervention.' },
      { label: 'C', text: 'Tier 1 is supplemental instruction provided to small groups of students who are slightly below grade level.' },
      { label: 'D', text: 'Tier 1 refers only to kindergarten reading instruction, since that is where foundational skills are established.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. In MTSS, Tier 1 is the core, universal instruction that all students in the school or grade receive. It should be evidence-based, high-quality, and sufficient to enable most students (approximately 80%) to meet grade-level expectations. The effectiveness of Tier 1 is measured by how many students succeed with core instruction alone. When Tier 1 is insufficient — when too many students are not meeting benchmarks — the first response is to examine and improve Tier 1 quality, not simply to add more tiers. Option A is incorrect because Tier 1 is for all students, not exclusively for students with disabilities; intensive individual intervention for students with disabilities is the definition of Tier 3 (or special education). Option C is incorrect because supplemental small-group instruction for students slightly below grade level describes Tier 2 in the MTSS framework. Option D is incorrect because MTSS applies across all grade levels (K-12), not only to kindergarten.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher uses the gradual release of responsibility model when teaching a new comprehension strategy. She begins with "I do" (teacher models), then moves to "We do" (guided practice together), then "You do together" (partner practice), and finally "You do alone" (independent application). Which principle of reading instruction does this approach most directly reflect?',
    options: [
      { label: 'A', text: 'Norm-referenced assessment — comparing student performance to a national standard' },
      { label: 'B', text: 'Scaffolded, explicit instruction — providing a structured support framework that gradually reduces teacher support as students become more independent' },
      { label: 'C', text: 'Round-robin reading — students take turns reading aloud while others follow along' },
      { label: 'D', text: 'Silent sustained reading — students read independently for extended periods without teacher input' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The "I do, We do, You do" model (gradual release of responsibility) is a structured, scaffolded instructional framework in which the teacher begins with full responsibility for modeling the strategy or skill, then moves students into supported practice with the teacher\'s guidance, then into collaborative practice with peers, and finally into independent application. This approach provides scaffolding — temporary support structures that are systematically removed as students develop competence — and reflects explicit instruction principles. Option A is incorrect because norm-referenced assessment involves comparing student scores to national norms; the gradual release model is an instructional framework, not an assessment approach. Option C is incorrect because round-robin reading is a format in which students take turns reading aloud; it has no relationship to the I-do/We-do/You-do instructional framework. Option D is incorrect because silent sustained reading is unstructured independent reading time; it does not involve the progressive scaffolding and teacher modeling described.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher has a student who reads accurately and fluently but shows poor reading comprehension on both oral retellings and written responses. Listening comprehension is also below grade level. Which reading profile does this student most likely represent?',
    options: [
      { label: 'A', text: 'Profile 2 — strong language comprehension, weak decoding; appropriate instruction focuses on phonics and word recognition' },
      { label: 'B', text: 'Profile 1 — strong decoding, weak language comprehension; appropriate instruction focuses on vocabulary, background knowledge, and comprehension strategies' },
      { label: 'C', text: 'Profile 3 — both decoding and language comprehension are weak; appropriate instruction addresses both components simultaneously' },
      { label: 'D', text: 'Profile 4 — strong in all areas; the comprehension difficulty is likely a motivational issue rather than a skill deficit' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. According to the simple view of reading, reading comprehension = decoding × language comprehension. Profile 1 readers are characterized by strong decoding (accurate, fluent reading) but weak language comprehension — difficulties with vocabulary, background knowledge, sentence-level processing, and comprehension strategies. The fact that this student\'s listening comprehension is also below grade level confirms that the difficulty is in the language comprehension component (not just in reading-specific skills), making it a Profile 1 presentation. Intervention for Profile 1 focuses on oral language development, vocabulary instruction, background knowledge building, and comprehension strategy instruction. Option A is incorrect because Profile 2 describes the opposite: strong language but weak decoding — students who comprehend well when listening but struggle to decode print. This student decodes accurately and fluently. Option C is incorrect because Profile 3 represents weakness in both decoding and language comprehension; this student has strong decoding. Option D is incorrect because a student with below-grade-level listening comprehension has a genuine language comprehension skill deficit; dismissing it as motivation is not data-driven.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants to select texts for a third-grade close reading lesson. Which dimension of text complexity should the teacher consider in addition to the quantitative Lexile measure?',
    options: [
      { label: 'A', text: 'The number of pages in the text — longer texts always have higher complexity' },
      { label: 'B', text: 'Qualitative dimensions — including the text\'s meaning/purpose, text structure, language conventionality, and knowledge demands' },
      { label: 'C', text: 'The font size used in the text — smaller fonts indicate more complex texts' },
      { label: 'D', text: 'The author\'s biographical background — texts by award-winning authors are always more complex' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Text complexity has three dimensions. The quantitative dimension (Lexile, readability formulas) measures sentence length, word frequency, and similar computational features. The qualitative dimension requires human judgment about: levels of meaning/purpose (single vs. multiple, explicit vs. implicit), text structure (familiar vs. complex, conventional vs. unconventional), language conventionality (clear vs. figurative, contemporary vs. archaic), and knowledge demands (everyday vs. specialized background knowledge required). The reader-and-task dimension considers the specific reader\'s motivation, knowledge, and the cognitive demands of the assigned task. Relying on Lexile alone can be misleading because a text can have a moderate Lexile but very high qualitative demands. Option A is incorrect because text length does not determine complexity; a short poem can be far more complex than a long simple narrative. Option C is incorrect because font size is a formatting feature, not a measure of text complexity. Option D is incorrect because authorial awards are not a reliable indicator of text complexity for a given reader; award-winning texts span a wide range of complexity levels.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher consistently uses close reading with annotation, text-dependent questions, and collaborative discussion. Students read, mark, and discuss the same text multiple times for different purposes. What is the primary benefit of close reading over a single pass-through of a text?',
    options: [
      { label: 'A', text: 'Close reading allows students to read more texts in the same amount of time.' },
      { label: 'B', text: 'Close reading develops deeper comprehension by requiring students to return to the text multiple times, each time extracting different layers of meaning — vocabulary, main ideas, craft, and cross-textual connections.' },
      { label: 'C', text: 'Close reading is primarily a fluency strategy that builds reading rate through repeated reading.' },
      { label: 'D', text: 'Close reading replaces the need for background knowledge instruction because the text provides all necessary context.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Close reading is an instructional approach in which students read a short, complex text multiple times with different purposes at each pass: the first read for general understanding, subsequent reads for vocabulary, key ideas, craft and structure, and ultimately cross-textual connections. Each rereading deepens comprehension and analytical thinking. Text-dependent questions require students to return to the text for evidence rather than relying on prior knowledge or surface-level recall. This multi-layered approach develops the deep, analytical engagement with text that is associated with high levels of reading comprehension. Option A is incorrect because close reading involves repeated engagement with fewer texts, not moving through more texts more quickly. Option C is incorrect because while repeated reading of the same text does have fluency benefits, close reading is primarily a comprehension and critical analysis strategy, not a fluency-building technique. Option D is incorrect because background knowledge remains important for comprehension; close reading complements — it does not eliminate — the need for vocabulary and background knowledge instruction.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher is selecting novels for the year\'s reading curriculum. She wants to include texts that represent diverse societies, historical periods, and cultural perspectives. Which of the following best describes the primary instructional rationale for this approach?',
    options: [
      { label: 'A', text: 'Diverse texts primarily serve a motivational function — students who see themselves represented in texts are more likely to enjoy reading.' },
      { label: 'B', text: 'Reading diverse texts builds the broad background knowledge, vocabulary, and cultural understanding needed for comprehension of complex texts; it also develops students\' ability to consider multiple perspectives, which is a critical thinking skill.' },
      { label: 'C', text: 'Diverse texts are required by standardized tests, so exposure to a variety of cultures prepares students for test questions.' },
      { label: 'D', text: 'Reading diverse texts develops phonics skills because students encounter a wider range of word patterns than they would in same-culture texts.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The instructional rationale for text diversity encompasses multiple reading-related benefits: (1) building broad background knowledge, which is one of the most powerful predictors of reading comprehension — students who know more can comprehend more; (2) developing vocabulary from multiple domains and cultural contexts; (3) building perspective-taking ability, which deepens inferential comprehension (understanding why characters make choices, what motivates them, how historical context shapes events); and (4) developing cultural understanding that enables more complete comprehension of diverse texts students will encounter. Option A is incorrect because while motivation and representation are genuine benefits, the primary instructional rationale in reading education is grounded in knowledge building, vocabulary, and comprehension — not motivation alone. Option C is incorrect because text selection for curriculum should be driven by instructional goals, not by test preparation alone; the rationale for diverse texts goes far beyond test exposure. Option D is incorrect because text diversity is not primarily related to phonics; phonics patterns are consistent across English texts regardless of cultural content.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading teacher provides a student with a graphic organizer, sentence frames, and a partner to discuss ideas with before requiring the student to respond in writing to a comprehension question. These supports are best described as:',
    options: [
      { label: 'A', text: 'Accommodations that permanently reduce the complexity of the task for the student' },
      { label: 'B', text: 'Scaffolds — temporary, targeted supports designed to make the task accessible while the student develops the skills to complete it independently' },
      { label: 'C', text: 'Modifications that change the learning standard being assessed' },
      { label: 'D', text: 'Assessment substitutions that replace writing with oral response for all students' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Scaffolds are temporary, targeted instructional supports that make a complex task accessible to a learner who cannot yet complete the task independently. The graphic organizer, sentence frames, and peer discussion all reduce the cognitive load of organizing and expressing ideas so the student can focus on demonstrating comprehension. Critically, scaffolds are designed to be progressively removed as the student develops independence — they are not permanent modifications. This is the principle of gradual release: provide the scaffold, use it together, then withdraw it as the student gains competence. Option A is incorrect because scaffolds do not permanently reduce task complexity; they are temporary supports that are removed over time. Option C is incorrect because scaffolds do not change the learning standard — the student is still expected to demonstrate comprehension; the scaffold only supports the pathway to demonstrating it. Option D is incorrect because the described supports (graphic organizer, sentence frames, partner discussion) are scaffolds to support written response, not permanent replacements of writing with oral response for all students.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher wants to increase student motivation for independent reading. Research suggests which combination of practices would most effectively promote positive reading motivation and self-efficacy?',
    options: [
      { label: 'A', text: 'Assigning required reading logs with a minimum number of pages per night, combined with weekly reading quizzes to ensure accountability' },
      { label: 'B', text: 'Providing student choice in at least some reading selections, ensuring students have access to texts at their independent reading level, and creating low-stakes opportunities for students to share and discuss what they are reading' },
      { label: 'C', text: 'Posting a class reading chart showing how many books each student has read compared to classmates, to create a healthy competition' },
      { label: 'D', text: 'Restricting independent reading to teacher-assigned texts to ensure all students read appropriately complex material' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Reading motivation research consistently identifies three factors that most powerfully support intrinsic reading motivation and self-efficacy: (1) autonomy — providing some choice in what students read; (2) competence — ensuring students have access to texts at their independent level where they experience success; and (3) relatedness — opportunities to share and connect with others about reading. These are the core components of self-determination theory applied to reading. Together, they build the intrinsic motivation and reading identity associated with lifelong reading. Option A is incorrect because required reading logs with accountability quizzes create extrinsic compliance structures that research associates with decreased intrinsic motivation; students come to see reading as a task to complete rather than a pleasure to pursue. Option C is incorrect because comparative public charts can damage self-efficacy and motivation for students who are slower readers; competition in reading undermines rather than supports intrinsic motivation. Option D is incorrect because removing student choice — a primary driver of reading motivation — is likely to decrease engagement with independent reading.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher uses a three-cueing system as her primary word-reading instruction approach. When a student encounters an unknown word, the teacher prompts: "Does it look right? Does it sound right? Does it make sense?" A literacy coach observes and expresses concern about this approach. What is the strongest research-based justification for the coach\'s concern?',
    options: [
      { label: 'A', text: 'Three-cueing instruction is too difficult for first graders and should be reserved for second grade.' },
      { label: 'B', text: 'Three-cueing instruction encourages students to rely on context and meaning cues instead of fully analyzing the phonemic and orthographic information in words — which is how skilled readers actually read — thereby directing students away from the alphabetic decoding strategies that beginning readers need to develop.' },
      { label: 'C', text: 'Three-cueing instruction is only appropriate for English learners and is not designed for native English speakers.' },
      { label: 'D', text: 'Three-cueing instruction is too expensive to implement and requires specialized curriculum materials.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Research on how skilled readers recognize words demonstrates that expert readers read primarily through phonological decoding and orthographic mapping — fully processing the letter-sound information in words — not by using meaning or context to guess. Three-cueing prompts that ask "Does it make sense?" or "Does it look right?" encourage beginning readers to use semantic and contextual cues to guess unknown words rather than developing the complete phonological decoding skills they need. This approach is associated with poor decoding development because it directs students away from the alphabetic strategies that are the foundation of skilled word reading. The National Reading Panel, subsequent research, and the science of reading consensus all identify systematic, explicit phonics — not multi-cueing for meaning — as the evidence-based approach to word recognition instruction. Option A is incorrect because the concern is not about age-appropriateness but about the instructional approach\'s alignment with the research on skilled reading. Option C is incorrect because three-cueing is applied broadly, not just to English learners; the concern applies regardless of student language background. Option D is incorrect because implementation cost is not the research-based concern; the concern is about instructional alignment with reading science.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A teacher provides explicit instruction in reading comprehension strategies — specifically predicting, questioning, clarifying, and summarizing — during small-group instruction. Over time, the teacher gradually releases responsibility so that students can use the strategies independently. What instructional approach is the teacher using?',
    options: [
      { label: 'A', text: 'Round-robin reading — students take turns reading and applying strategies aloud' },
      { label: 'B', text: 'Reciprocal teaching — an evidence-based instructional approach in which teachers explicitly teach and model four comprehension strategies, then guide students to apply them collaboratively before using them independently' },
      { label: 'C', text: 'Phonics instruction — teaching letter-sound correspondences to improve decoding' },
      { label: 'D', text: 'Running record analysis — using oral reading data to identify comprehension strategy gaps' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Reciprocal teaching is a specific, well-researched comprehension instruction approach developed by Palincsar and Brown. It involves explicit instruction in and gradual transfer of four strategies: predicting (what will happen next), questioning (generating questions about the text), clarifying (identifying confusing parts and resolving confusion), and summarizing (synthesizing key information). Initially, the teacher models all four strategies; over time, students take on the role of "teacher" in the group, applying the strategies collaboratively. Reciprocal teaching has strong research support for improving reading comprehension. Option A is incorrect because round-robin reading involves students taking turns reading aloud, not specifically learning and applying the four comprehension strategies of reciprocal teaching. Option C is incorrect because phonics instruction teaches letter-sound relationships, not reading comprehension strategies. Option D is incorrect because running record analysis is an assessment technique for observing oral reading behaviors; it is not an instructional approach for comprehension strategies.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading teacher is supporting a third-grade student who has been identified as reading significantly below grade level in decoding. The student has mastered short vowels and CVC words but has not mastered consonant blends or digraphs. According to evidence-based differentiation principles, which instructional approach is most appropriate?',
    options: [
      { label: 'A', text: 'Assign the student grade-level reading material and ask peers to help the student decode difficult words.' },
      { label: 'B', text: 'Provide explicit, systematic instruction on consonant blends and digraphs — the next phonics patterns in the scope and sequence beyond what the student has mastered — in small-group or individual instruction at an appropriate pace.' },
      { label: 'C', text: 'Wait until fourth grade to introduce blends and digraphs, as the student\'s current CVC mastery is sufficient for third grade.' },
      { label: 'D', text: 'Focus exclusively on reading comprehension strategies, since the student\'s decoding problems are likely caused by poor comprehension.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Effective differentiation for a student with identified phonics gaps involves teaching the specific phonics skills the student has not mastered, starting from where the student currently is and progressing through the scope and sequence at a rate appropriate to the student. Since the student has mastered CVC words and short vowels but not blends or digraphs, instruction should target those next patterns with explicit, systematic teaching in a small-group or individual format with sufficient practice to build automaticity. Option A is incorrect because assigning grade-level material without addressing the underlying decoding gap does not remediate the phonics deficit and places the student at frustration level. Option C is incorrect because delaying instruction on needed phonics patterns is not evidence-based; unaddressed phonics gaps accumulate and become more difficult to remediate as students advance. Option D is incorrect because the student\'s primary identified difficulty is decoding; while comprehension instruction is always important, it does not address the phonics gap and is not the appropriate first response to a documented decoding deficit.',
  },

]

// ─── SEED FUNCTION ─────────────────────────────────────────────────────────

async function seed() {
  await connectDB()
  console.log('Connected to MongoDB.')

  // Safety check
  const existingTest = await PracticeTest.findOne({ examCode: '190', testNumber: 2, isDiagnostic: false })
  if (existingTest) {
    console.log('Practice Test 2 (examCode=190) already exists. Aborting to avoid duplicates.')
    console.log('If you want to re-seed, manually delete the PracticeTest and its Questions first.')
    process.exit(0)
  }

  console.log(`Inserting ${questionData.length} questions...`)
  const inserted = await Question.insertMany(questionData)
  console.log(`Inserted ${inserted.length} questions.`)

  const questionIds = inserted.map((q) => q._id)

  // Count per subarea
  const subareaI = inserted.filter((q) => q.subarea === 'I').length
  const subareaII = inserted.filter((q) => q.subarea === 'II').length
  const subareaIII = inserted.filter((q) => q.subarea === 'III').length

  console.log(`Subarea distribution: I=${subareaI}, II=${subareaII}, III=${subareaIII}`)

  const practiceTest = await PracticeTest.create({
    examCode: '190',
    testNumber: 2,
    name: 'Practice Test 2',
    isDiagnostic: false,
    questionIds,
    timeLimitMinutes: 240,
    subareaDistribution: [
      { subarea: 'I', count: subareaI },
      { subarea: 'II', count: subareaII },
      { subarea: 'III', count: subareaIII },
    ],
    isPublished: false,
  })

  console.log(`Practice Test 2 created: ${practiceTest._id}`)
  console.log('Done. Set isPublished=true in MongoDB when ready to go live.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
