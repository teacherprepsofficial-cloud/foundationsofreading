/**
 * Seed Script — NES Foundations of Reading Practice Test 1
 * 100 original multiple-choice questions across all 3 MC subareas
 *
 * Distribution (mirrors real exam):
 *   Subarea I  (Obj 0001–0004): 44 questions
 *   Subarea II (Obj 0005–0007): 33 questions
 *   Subarea III(Obj 0008–0009): 23 questions
 *
 * Run: npx tsx scripts/seed-practice-test-1.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

// ─── QUESTION DATA ─────────────────────────────────────────────────────────

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
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher is designing activities to develop students\' phonological awareness. Which of the following activities represents the earliest developmental level of phonological awareness?',
    options: [
      { label: 'A', text: 'Asking students to tap out each sound they hear in the word "cat"' },
      { label: 'B', text: 'Asking students to clap once for each word they hear in the sentence "The dog runs fast"' },
      { label: 'C', text: 'Asking students to blend the onset and rime /b/ and /ack/ into a single word' },
      { label: 'D', text: 'Asking students to identify the first sound they hear in the word "map"' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phonological awareness develops along a continuum from larger to smaller units of sound. The ability to segment a spoken sentence into its individual words represents the earliest, most foundational level of phonological awareness, as it requires attending to the largest unit of oral language. Option A is incorrect because segmenting a word into individual phonemes (tapping sounds in "cat") is phonemic awareness, the most advanced level of phonological awareness. Option C is incorrect because blending onset and rime represents a more advanced level than sentence segmentation. Option D is incorrect because identifying a word\'s initial phoneme requires phonemic awareness, which develops later in the phonological awareness continuum.',
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
      'A first-grade teacher notices that students frequently confuse two tasks: (1) clapping the syllables in a word and (2) saying each individual sound in a word. Which of the following statements most accurately describes what is happening?',
    options: [
      { label: 'A', text: 'Both tasks assess the same phonological awareness skill at different levels of difficulty.' },
      { label: 'B', text: 'The students are confusing a syllable-level phonological awareness task with a phoneme-level phonemic awareness task.' },
      { label: 'C', text: 'Clapping syllables is a phonics task because it requires students to connect sounds to letters.' },
      { label: 'D', text: 'Saying each sound in a word is a lower-order task because individual sounds are smaller than syllables.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Clapping syllables is a phonological awareness task at the syllable level; segmenting individual sounds operates at the phoneme level. Phonological awareness encompasses syllables, onsets, rimes, and phonemes. Phonemic awareness is the most advanced subset and specifically involves isolating and manipulating individual phonemes. Option A is incorrect because these tasks target different levels of the phonological awareness hierarchy, not simply different difficulty levels within the same skill. Option C is incorrect because clapping syllables is entirely oral — linking print to sound defines phonics, not syllable clapping. Option D is incorrect because working with individual phonemes is actually more cognitively demanding than working with syllables.',
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
      'A kindergarten teacher slowly stretches out the sounds in a spoken word and then asks students to say the word as a whole. This type of activity is best described as:',
    options: [
      { label: 'A', text: 'phoneme segmentation, because the teacher is pulling a word apart into individual phonemes.' },
      { label: 'B', text: 'phoneme blending, because students combine a sequence of separately pronounced sounds into a recognizable spoken word.' },
      { label: 'C', text: 'onset-rime blending, because the teacher separates the initial consonant from the vowel and remaining letters.' },
      { label: 'D', text: 'syllable blending, because the teacher stretches the word across two units of sound.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. When the teacher models isolated phonemes in a stretched sequence and students combine them into a whole spoken word, students are performing phoneme blending — a key phonemic awareness skill. Option A is incorrect because segmentation involves breaking a word apart; here the teacher does the stretching and students put it back together. Option C is incorrect because onset-rime blending separates only the initial consonant(s) from the vowel nucleus and coda, not every individual phoneme. Option D is incorrect because syllable blending involves combining syllable-sized chunks, not individual phonemes.',
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
      'A teacher asks a student to say the word "smile," then say it again without the /m/ sound. The student responds, "sile." This type of task primarily develops which skill?',
    options: [
      { label: 'A', text: 'Phoneme substitution, because the student is replacing one phoneme with silence.' },
      { label: 'B', text: 'Phoneme deletion, because the student removes a specific phoneme from a spoken word to produce a new word.' },
      { label: 'C', text: 'Phoneme segmentation, because the student must identify all phonemes before knowing which to delete.' },
      { label: 'D', text: 'Syllable deletion, because removing /m/ from "smile" eliminates an initial consonant cluster.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phoneme deletion requires identifying and mentally removing a specific phoneme from a spoken word, then pronouncing the remaining sounds. This is one of the most cognitively demanding phonemic awareness tasks. Option A is incorrect because phoneme substitution involves replacing one phoneme with a different phoneme (e.g., changing /m/ to /t/ to get "stile"), not removing it entirely. Option C is incorrect because, while phoneme sequence awareness supports deletion, the task is classified as phoneme deletion rather than segmentation. Option D is incorrect because /m/ is a single phoneme, not a syllable, and consonant clusters are not syllables.',
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
      'Which of the following statements best describes the alphabetic principle?',
    options: [
      { label: 'A', text: 'The understanding that the letters of the alphabet each have a name and a specific written form.' },
      { label: 'B', text: 'The understanding that spoken words can be divided into smaller units of sound called syllables.' },
      { label: 'C', text: 'The understanding that written letters and letter combinations systematically represent the sounds of spoken language.' },
      { label: 'D', text: 'The understanding that print is read from left to right and from the top of the page to the bottom.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The alphabetic principle is the foundational insight that there is a predictable, systematic relationship between letters (graphemes) and the sounds of spoken language (phonemes). This understanding is prerequisite to decoding. Option A is incorrect because knowing letter names and forms is letter knowledge, a related but distinct concept. Option B is incorrect because awareness that words can be divided into syllables is phonological awareness, not the alphabetic principle. Option D is incorrect because directionality and print-carries-meaning concepts are components of concepts of print, not the alphabetic principle.',
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
      'A kindergarten teacher uses a "big book" during shared reading, tracking the text with a pointer as she reads aloud. She periodically stops to ask children to identify the first word in a sentence, point to the period, or show which direction to read next. These activities primarily develop:',
    options: [
      { label: 'A', text: 'phonemic awareness, because children are attending to individual sounds as the teacher reads.' },
      { label: 'B', text: 'concepts of print, because children are learning that print carries meaning and understanding conventions such as directionality and word boundaries.' },
      { label: 'C', text: 'letter knowledge, because children are identifying specific letters and their positions within words.' },
      { label: 'D', text: 'the alphabetic principle, because children are connecting spoken words to their written forms.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Concepts of print include the understanding that print (not pictures) carries meaning, that text is read left to right and top to bottom, that spaces separate words, and that punctuation signals meaning. Shared reading with a pointer and questions about word boundaries, directionality, and punctuation directly builds these foundational concepts. Option A is incorrect because these activities focus on print conventions, not oral sound manipulation. Option C is incorrect because the activities target understanding of how the print system works, not just letter identification. Option D is incorrect because making explicit letter-sound connections requires more than tracking print; it involves teaching that specific letters reliably represent specific sounds.',
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
      'A first-grade teacher regularly reads chapter books aloud to the class, stopping to discuss events, ask students to make predictions, and invite personal connections to the story. In terms of literacy development, this practice primarily benefits students by:',
    options: [
      { label: 'A', text: 'building oral vocabulary and background knowledge that supports future reading comprehension.' },
      { label: 'B', text: 'developing decoding skills by exposing students to complex, multi-syllable words in print.' },
      { label: 'C', text: 'strengthening phonemic awareness by modeling the pronunciation of unfamiliar words.' },
      { label: 'D', text: 'teaching letter-sound correspondences in the context of authentic, meaningful text.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Interactive read-alouds of rich text expose students to vocabulary, language structures, content knowledge, and literary concepts that extend well beyond what beginning readers can access independently. The oral discussion builds receptive and expressive vocabulary and background knowledge — both directly linked to reading comprehension. Option B is incorrect because students are listening, not reading; they are not processing letters or decoding print. Option C is incorrect because phonemic awareness involves oral manipulation of phonemes, not simply hearing words pronounced. Option D is incorrect because letter-sound correspondences require explicit attention to the print-sound relationship; a chapter-book read-aloud does not systematically teach letter-sound patterns.',
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
      'Which of the following best describes the relationship between phonemic awareness and early reading acquisition?',
    options: [
      { label: 'A', text: 'Phonemic awareness is a consequence of learning to read, not a precursor to it, so it develops naturally once formal reading instruction begins.' },
      { label: 'B', text: 'Phonemic awareness is the ability to recognize and name all 26 letters of the alphabet, enabling children to associate letters with sounds.' },
      { label: 'C', text: 'Phonemic awareness supports early reading by enabling children to understand how spoken words map onto printed words when learning letter-sound correspondences.' },
      { label: 'D', text: 'Phonemic awareness is sufficient on its own to enable children to become proficient readers, making explicit phonics instruction unnecessary.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Phonemic awareness — the ability to notice, isolate, and manipulate individual sounds in spoken words — is a strong predictor of early reading success because it enables children to understand what letter-sound correspondences represent. When a child can hear that "cat" has three separate sounds, the letters C, A, and T become meaningful symbols. Option A is incorrect because research shows phonemic awareness is a reliable precursor to reading achievement, not merely a byproduct. Option B is incorrect because knowing letter names is letter knowledge, which is oral and distinct from phonemic awareness. Option D is incorrect because phonemic awareness alone does not teach the specific letter-sound correspondences students need to decode print.',
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
      'A kindergarten student consistently writes "frnd" for "friend" and "hlp" for "help" in journal writing. This spelling behavior most likely indicates that the student:',
    options: [
      { label: 'A', text: 'has not yet developed phonemic awareness because the student cannot hear vowel sounds in words.' },
      { label: 'B', text: 'is applying emerging phonemic awareness by representing dominant consonant sounds, which is a developmentally expected pattern.' },
      { label: 'C', text: 'is relying primarily on visual memory for spelling and is not yet connecting letters to sounds.' },
      { label: 'D', text: 'demonstrates a reading disability that requires immediate referral for special education evaluation.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Early phonetic (invented) spelling in which students represent salient consonant sounds while omitting or misrepresenting vowels is a well-documented and developmentally appropriate stage. It reflects growing phonemic awareness and understanding of the alphabetic principle — the student understands that letters represent sounds and is applying that knowledge. Option A is incorrect because the student clearly can hear and represent multiple sounds; omitting certain sounds is typical of early spelling development. Option C is incorrect because the student is systematically using letters to represent sounds, which is the opposite of visual memory spelling. Option D is incorrect because this pattern is well within the range of typical development for kindergartners.',
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
      'A second-grade class includes several students who recently immigrated from Brazil and are native speakers of Portuguese. Which of the following factors is most likely to influence these students\' development of phonemic awareness in English?',
    options: [
      { label: 'A', text: 'Portuguese uses a different alphabet, so these students will need to learn letter names from the beginning before phonemic awareness instruction can begin.' },
      { label: 'B', text: 'These students may already have phonemic awareness in Portuguese; the challenge involves applying phonemic awareness to the specific phonemes of English, some of which may not exist in Portuguese.' },
      { label: 'C', text: 'Because phonemic awareness is a universal cognitive skill with no language-specific component, these students will have no additional challenges compared to native English speakers.' },
      { label: 'D', text: 'These students should not receive phonemic awareness instruction until they have fully mastered conversational English.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phonemic awareness skills developed in a student\'s home language transfer to English. However, different languages have different phoneme inventories, and some English phonemes (such as certain short vowel sounds) may not exist in Portuguese, creating specific challenges. Evidence-based practice calls for building on existing phonological strengths while explicitly teaching English-specific phoneme contrasts. Option A is incorrect because both English and Portuguese use the Roman alphabet, and phonemic awareness is an oral skill that does not require letter knowledge. Option C is incorrect because, while the metalinguistic skill transfers, language-specific phonemes do require explicit instruction. Option D is incorrect because delaying phonemic awareness instruction until conversational fluency is not evidence-based and would widen the opportunity gap.',
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
      'Assessment of a kindergarten class shows that most students can rhyme, clap syllables, and identify beginning sounds, but struggle significantly with phoneme segmentation tasks. Which instructional decision is most appropriate?',
    options: [
      { label: 'A', text: 'Move immediately to formal phonics instruction because the students have sufficient phonological awareness to begin connecting letters to sounds.' },
      { label: 'B', text: 'Provide explicit instruction in phoneme segmentation and blending using manipulatives such as Elkonin boxes, as these skills are prerequisite to the full benefit of phonics instruction.' },
      { label: 'C', text: 'Focus solely on strengthening rhyming skills before progressing to any phoneme-level tasks, because mastery of rhyming must be complete first.' },
      { label: 'D', text: 'Refer these students for reading disability evaluations because phoneme segmentation difficulty at this stage indicates a likely reading disorder.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The data indicate students have phonological awareness at the syllable and onset levels but have not mastered phoneme-level skills, which are most directly connected to phonics instruction. Explicit instruction using Elkonin boxes provides concrete, multisensory support for tracking and manipulating individual phonemes. Option A is incorrect because phoneme-level skills are needed to fully benefit from phonics instruction; rushing ahead without this foundation is premature. Option C is incorrect because rhyming mastery is not a prerequisite for phoneme-level instruction; the continuum is instructionally flexible and teachers should address multiple levels simultaneously. Option D is incorrect because difficulty with phoneme segmentation in kindergarten is developmentally common and does not warrant referral for reading disability evaluation.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 1,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'A pre-kindergarten teacher teaches children a song in which they listen for words that begin with the same sound (e.g., "Silly Sally sat by the sea"). This activity primarily develops which emergent literacy skill?',
    options: [
      { label: 'A', text: 'Concepts of print, because children are learning that written words have boundaries and spaces.' },
      { label: 'B', text: 'Alliteration awareness, which is a phonological awareness skill involving recognition of repeated initial sounds in spoken words.' },
      { label: 'C', text: 'Phoneme substitution, because the children are replacing sounds at the beginning of words.' },
      { label: 'D', text: 'The alphabetic principle, because children are connecting the letter S to the /s/ sound.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Alliteration activities in which children listen for repeated initial sounds across spoken words are an early phonological awareness skill. Noticing that "silly," "Sally," and "sat" begin with the same sound requires attending to the sound structure of spoken language. Option A is incorrect because concepts of print involve understanding how written text functions; this activity is entirely oral. Option C is incorrect because phoneme substitution requires producing a new word by swapping one phoneme for another — a much more advanced active manipulation than simply noticing shared initial sounds. Option D is incorrect because the alphabetic principle requires connecting sounds to letter representations; in a song context, children may not be attending to print at all.',
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
      'A first-grade student with a moderate hearing loss wears hearing aids but still has difficulty distinguishing phonemes that differ only in voicing (e.g., /p/ vs. /b/). Which instructional modification would be most appropriate to support this student\'s phonemic awareness development?',
    options: [
      { label: 'A', text: 'Excusing the student from phonemic awareness activities until a hearing specialist determines the extent of the deficit.' },
      { label: 'B', text: 'Incorporating multisensory cues such as tactile feedback (placing a hand on the throat to feel voicing vibration) and visual cues (mouth position) to supplement auditory information.' },
      { label: 'C', text: 'Teaching only phoneme blending and deleting tasks using nasal sounds, which are more perceptible to students with hearing loss.' },
      { label: 'D', text: 'Replacing phonemic awareness instruction with additional sight word instruction because phonemic awareness relies entirely on auditory processing.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Students with hearing loss can develop phonemic awareness with appropriate accommodations. Multisensory instruction that supplements auditory processing with tactile cues (feeling voicing vibrations), visual cues (observing mouth and lip position), and kinesthetic cues allows the student to build phoneme discrimination using multiple perceptual channels. Option A is incorrect because excluding students from phonemic awareness instruction is not consistent with evidence-based, inclusive practice. Option C is incorrect because limiting instruction to specific sounds without addressing the full phoneme inventory is insufficient for long-term literacy development. Option D is incorrect because phonemic awareness can be supported through visual and tactile channels and should not be replaced entirely with sight words.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0002 — Beginning Reading Skills  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A first-grade teacher is planning the sequence of phonics instruction for the school year. Which of the following sequences is most aligned with evidence-based practices?',
    options: [
      { label: 'A', text: 'Beginning with vowel teams and diphthongs, then moving to CVC words, then to silent-e patterns.' },
      { label: 'B', text: 'Beginning with CVC patterns using short vowels, then moving to consonant blends and digraphs, then to vowel-consonant-e (CVCe) patterns.' },
      { label: 'C', text: 'Beginning with all vowel patterns simultaneously so students develop a complete picture of vowel sounds before learning consonants.' },
      { label: 'D', text: 'Beginning with long vowel patterns because they occur more frequently in grade-level text than short vowel patterns.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Evidence-based phonics instruction is sequenced from simpler patterns of higher utility to more complex patterns. CVC words with short vowels are the starting point because they involve only single consonants and the most common short vowel sounds. Consonant blends and digraphs add consonant complexity, while CVCe introduces long vowels signaled by a final silent e. This sequence builds systematically on prior knowledge. Option A is incorrect because vowel teams and diphthongs are among the most complex vowel patterns and should come after students have mastered simpler vowel patterns. Option C is incorrect because teaching all vowel patterns simultaneously violates the principle of systematic, sequential instruction. Option D is incorrect because short vowel patterns in CVC words are more phonetically regular and appear earlier in decodable texts.',
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
      'A first-grade teacher introduces consonant digraphs (e.g., sh, ch, th, wh). Which of the following explanations is most accurate for students learning digraphs?',
    options: [
      { label: 'A', text: 'A consonant digraph is two consonants placed side by side, each making its own separate sound that students blend together.' },
      { label: 'B', text: 'A consonant digraph is two consonants that together represent a single, new phoneme different from the sound of either letter alone.' },
      { label: 'C', text: 'A consonant digraph always appears at the beginning of a word and cannot appear at the end.' },
      { label: 'D', text: 'A consonant digraph is the same as a consonant blend because both involve two consonants working together to produce a sound.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A consonant digraph is two letters that together represent one phoneme — a sound different from what either letter represents individually (e.g., /sh/ in "shop" is not /s/ or /h/). This distinction is critical because students must not attempt to blend the two letters separately. Option A is incorrect because it describes a consonant blend (e.g., /bl/ in "blue" = /b/ + /l/), not a digraph. Option C is incorrect because consonant digraphs can appear at the beginning, middle, or end of words (e.g., "fish," "wishes," "ship"). Option D is incorrect because digraphs and blends are distinct: in a blend each consonant retains its own phoneme; in a digraph the two letters produce a single new phoneme.',
  },

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 2,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'A kindergarten teacher maintains a "word wall" displaying high-frequency words that have been introduced in lessons. Which of the following describes the primary instructional purpose of a word wall?',
    options: [
      { label: 'A', text: 'To provide students with a complete list of all words they will encounter in the school year so they can study them at home.' },
      { label: 'B', text: 'To serve as a readily accessible visual reference that supports students in recognizing and correctly spelling high-frequency words in their reading and writing.' },
      { label: 'C', text: 'To display only phonically regular words so students can apply their decoding skills to read them independently.' },
      { label: 'D', text: 'To replace explicit vocabulary instruction, because students who see the words daily will naturally learn their meanings.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. A word wall serves as an organized, classroom-based reference tool that reinforces students\' automatic recognition and correct spelling of high-frequency words — words that appear often in print and that students should eventually read automatically. Option A is incorrect because a word wall is not a comprehensive list; words are added incrementally as they are introduced. Option C is incorrect because many high-frequency words (e.g., "the," "said," "was") are not phonically regular and are placed on word walls precisely because they cannot be reliably decoded using phonics rules alone. Option D is incorrect because word walls primarily support sight word recognition and spelling accuracy, not conceptual vocabulary development.',
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
      'During oral reading, a second-grade student reads "The wind was so strong it knocked over the fence post" and pauses at the word "wind," first pronouncing it to rhyme with "find," then self-corrects and says it correctly to rhyme with "pinned." Which of the following best describes what the student did?',
    options: [
      { label: 'A', text: 'The student guessed the word using picture clues and eventually selected the correct pronunciation.' },
      { label: 'B', text: 'The student applied an initial decoding attempt and then used semantic and syntactic context clues to confirm and self-correct to the meaning-appropriate pronunciation.' },
      { label: 'C', text: 'The student demonstrated a phonics deficit, which is the primary instructional need indicated by this error.' },
      { label: 'D', text: 'The student made a random error followed by a lucky guess, indicating limited comprehension monitoring.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. "Wind" is a homograph — spelled the same but pronounced differently with different meanings. The student\'s behavior shows sophisticated strategic reading: an initial decoding attempt produced a plausible but context-inappropriate pronunciation, and the student used surrounding context to self-correct to the meaning-appropriate form. This demonstrates both decoding skill and comprehension monitoring. Option A is incorrect because no picture clues are described, and the process reflects linguistic and semantic processing. Option C is incorrect because the student successfully decoded using phonics knowledge; the challenge with homographs is selecting the appropriate pronunciation using context, which the student did. Option D is incorrect because self-correction based on meaning is the hallmark of an active, meaning-monitoring reader.',
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
      'A first-grade teacher teaches the CVCe (consonant-vowel-consonant-e) pattern by contrasting it with CVC words (e.g., "cap" vs. "cape," "pin" vs. "pine"). Which of the following best describes the instructional purpose of this contrast?',
    options: [
      { label: 'A', text: 'To teach students that the final silent e has no phoneme value, so they should simply ignore it when decoding.' },
      { label: 'B', text: 'To develop students\' ability to apply vowel pattern knowledge systematically, recognizing that the silent final e signals a long vowel sound for the preceding vowel.' },
      { label: 'C', text: 'To demonstrate that consonants are always more reliable than vowels for decoding, so students should focus on consonants first.' },
      { label: 'D', text: 'To introduce irregular sight words, because CVCe words are not phonically decodable and must be memorized as whole units.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. CVCe is one of the six common English syllable types. The final e is silent but signals that the preceding vowel represents its long sound. Contrasting CVC and CVCe minimal pairs allows students to directly observe this pattern and internalize the rule, building orthographic knowledge and supporting more accurate decoding. Option A is incorrect because telling students to "ignore" the silent e deprives them of a useful decoding cue; the silent e actively signals vowel sound change. Option C is incorrect because both consonants and vowels carry essential information in decoding. Option D is incorrect because CVCe words are phonically regular and decodable; they are not irregular sight words.',
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
      'A teacher reviews a second-grade student\'s journal writing and notices the student consistently writes "lookd" for "looked," "walkd" for "walked," and "washd" for "washed." What does this pattern suggest, and what is the most appropriate next instructional step?',
    options: [
      { label: 'A', text: 'The student understands past tense but has not yet learned that -ed has a consistent spelling regardless of whether it sounds like /t/, /d/, or /ɪd/; instruction should focus on the invariant spelling of -ed.' },
      { label: 'B', text: 'The student is phonetically spelling the -ed ending correctly, which shows strong phonemic awareness; no further instruction is needed.' },
      { label: 'C', text: 'The student does not understand past tense verbs; instruction should begin with oral discussion of events that happened in the past.' },
      { label: 'D', text: 'The student has a significant decoding deficit; this error pattern requires immediate referral to a reading specialist.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The -ed suffix has three spoken realizations: /t/ (in "looked," "washed"), /d/ (in "showed"), and /ɪd/ (in "wanted"). Students who write "walkd" or "lookd" are representing the /t/ sound they hear, demonstrating phonemic awareness but not yet the orthographic knowledge that past tense is always spelled -ed regardless of pronunciation. Instruction should explicitly teach this invariant spelling rule: meaning determines spelling, not pronunciation. Option B is incorrect because while representing /t/ phonetically shows phonemic awareness, the gap in morphological/orthographic knowledge requires direct instruction. Option C is incorrect because the student clearly understands past tense conceptually; the error is at the spelling level. Option D is incorrect because this is a common and developmentally expected spelling error reflecting a specific instructional gap, not a reading deficit.',
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
      'Which of the following statements best describes the relationship between decoding and encoding (spelling) in beginning reading instruction?',
    options: [
      { label: 'A', text: 'Decoding and encoding are completely separate skills and should be taught in separate instructional blocks with no reference to each other.' },
      { label: 'B', text: 'Encoding (spelling) can reinforce decoding knowledge because both require applying understanding of phoneme-grapheme relationships; analyzing misspellings can reveal gaps in phonics knowledge.' },
      { label: 'C', text: 'Decoding is more important than encoding in beginning reading, so teachers should delay spelling instruction until students read fluently at grade level.' },
      { label: 'D', text: 'Encoding is a more advanced skill than decoding and should only be introduced once students have mastered all major phonics patterns.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Decoding (reading) and encoding (spelling) are reciprocal processes that both depend on the same phonics knowledge. When students spell, they segment phonemes and select appropriate graphemes — reinforcing the same letter-sound patterns used in reverse when decoding. Examining spelling errors is a diagnostic window into phonics knowledge. Evidence-based instruction treats these skills as mutually reinforcing. Option A is incorrect because separating instruction misses the reinforcement each provides for the other. Option C is incorrect because delaying spelling instruction denies students an important avenue for consolidating phonics knowledge. Option D is incorrect because encoding and decoding develop concurrently and are instructionally complementary.',
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
      'A kindergarten teacher introduces inflectional morphemes as part of word study. Which of the following word endings is an inflectional morpheme?',
    options: [
      { label: 'A', text: '-tion, as in "action"' },
      { label: 'B', text: '-ly, as in "quickly"' },
      { label: 'C', text: '-ing, as in "jumping"' },
      { label: 'D', text: '-ful, as in "careful"' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Inflectional morphemes are grammatical suffixes that signal information such as tense or number without changing the base word\'s part of speech. The suffix -ing signals the present progressive tense; "jumping" remains a verb, as "jump" is. Other common inflectional morphemes include -s/-es, -ed, -er (comparative), and -est. Option A is incorrect because -tion is a derivational suffix changing a verb into a noun (e.g., "act" → "action"), which is a part-of-speech change. Option B is incorrect because -ly is derivational, changing an adjective into an adverb ("quick" → "quickly"). Option D is incorrect because -ful is derivational, changing a noun into an adjective ("care" → "careful").',
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
      'Which of the following best describes why decodable texts are recommended as a key resource during early phonics instruction?',
    options: [
      { label: 'A', text: 'Decodable texts are preferred because they contain rich, complex vocabulary that builds students\' oral language and comprehension.' },
      { label: 'B', text: 'Decodable texts are recommended because their controlled phonics patterns give students repeated practice applying newly taught letter-sound correspondences in connected text, building toward automatic decoding.' },
      { label: 'C', text: 'Decodable texts eliminate the need for phonemic awareness instruction because decoding practice in context develops phonemic awareness automatically.' },
      { label: 'D', text: 'Decodable texts are recommended because they use highly predictable sentence patterns and picture supports that help students guess unknown words.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Decodable texts are specifically designed so that the vast majority of words can be read using the phonics patterns students have already been taught. Practicing in connected text allows students to apply phonics knowledge in a reading context, building fluency and automaticity. The controlled vocabulary ensures students rely on decoding, not picture guessing. Option A is incorrect because decodable texts are not designed for vocabulary richness; their vocabulary is intentionally constrained to phonics-pattern words. Option C is incorrect because phonemic awareness is an oral skill; decodable texts do not replace explicit phonemic awareness instruction. Option D is incorrect because predictable patterns and picture supports that prompt guessing characterize leveled texts, not decodable texts, and actually undermine decoding development.',
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
      'A first-grade teacher monitors students during oral and whisper reading, noting errors and self-corrections. For which students is this monitoring strategy most appropriate, and why?',
    options: [
      { label: 'A', text: 'Students who are already reading fluently, because oral reading gives them practice performing at grade level in front of peers.' },
      { label: 'B', text: 'Students who are not yet reading automatically, because oral and whisper reading allows the teacher to directly observe and give immediate corrective feedback on decoding errors.' },
      { label: 'C', text: 'All students, because oral reading should replace silent reading as the primary mode of reading practice throughout elementary school.' },
      { label: 'D', text: 'Students who are English learners, because oral reading provides pronunciation practice that supports language acquisition.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Oral and whisper reading with teacher monitoring is a targeted strategy for students who are not yet reading automatically — those still actively working to decode words. When these students read orally, teachers can observe decoding attempts, identify error patterns, and provide immediate corrective feedback. For students who have achieved automaticity, silent reading with comprehension accountability is more appropriate. Option A is incorrect because fluent readers do not need the same level of oral-reading monitoring. Option C is incorrect because the goal of fluency instruction is to develop automatic, silent reading; oral reading is a scaffold for non-automatic decoders. Option D is incorrect because this strategy targets decoding development, which applies to all beginning readers, not specifically English learners.',
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
      'A second-grade teacher is helping students read words with the -ck spelling pattern (e.g., "duck," "clock," "brick"). The teacher explains that -ck appears after a short vowel at the end of a one-syllable word. Which of the following best describes the type of knowledge the teacher is building?',
    options: [
      { label: 'A', text: 'Phonemic awareness, because the teacher is asking students to isolate the final sounds in words.' },
      { label: 'B', text: 'Orthographic knowledge, because the teacher is helping students understand a predictable spelling pattern tied to a specific phonological context.' },
      { label: 'C', text: 'Vocabulary knowledge, because students need to know the meaning of "duck" and "clock" to apply the spelling rule.' },
      { label: 'D', text: 'Fluency, because recognizing -ck words quickly contributes to automatic word reading.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Orthographic knowledge encompasses understanding of the predictable rules and patterns that govern English spelling, including the positional constraint that -ck follows a short vowel at the end of one-syllable words. Teaching this rule builds the systematic letter-pattern knowledge students need for accurate and automatic word recognition and spelling. Option A is incorrect because while phoneme awareness supports spelling, the rule being taught here operates at the orthographic (spelling pattern) level, not the phoneme level. Option C is incorrect because knowing the meaning of "duck" is vocabulary knowledge; it is not what enables students to apply the -ck spelling convention. Option D is incorrect because fluency refers to accuracy, rate, and prosody in connected text; recognizing -ck is a word-level orthographic knowledge skill, not fluency per se.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0003 — Word Analysis  (10 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'I' as const,
    subareaName: 'Foundations of Reading Development',
    objectiveNumber: 3,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A third-grade teacher wants students to understand the distinction between inflectional and derivational morphemes. Which of the following pairs of examples best illustrates this distinction?',
    options: [
      { label: 'A', text: 'The suffix -ed in "played" (inflectional) and the suffix -er in "player" (derivational), because -er changes the verb into a noun.' },
      { label: 'B', text: 'The prefix un- in "unhappy" (inflectional) and the suffix -ness in "happiness" (derivational), because both change meaning.' },
      { label: 'C', text: 'The suffix -s in "dogs" (inflectional) and the prefix re- in "redo" (derivational), because -s signals plural and re- is a prefix.' },
      { label: 'D', text: 'The suffix -er in "faster" meaning "she runs faster" (inflectional) and the suffix -er in "runner" (derivational), because one forms a comparison and the other forms a noun.' },
    ],
    correctAnswer: 'D',
    explanation:
      'Correct Response: D. The -er in "faster" is inflectional (comparative degree; "fast" and "faster" are both adjectives — part of speech unchanged). The -er in "runner" is derivational (verb → noun; "run" becomes "one who runs" — part of speech changes). This pair most precisely illustrates the defining criterion: derivational morphemes change part of speech. Option A is partially correct (-er in "player" is derivational, -ed in "played" is inflectional) but Option D provides a more nuanced, pedagogically richer contrast using the same suffix in different roles. Option B is incorrect because un- is a derivational prefix, not inflectional; both un- and -ness are derivational. Option C is correct that -s is inflectional and re- is derivational, but Option D provides a more instructionally powerful illustration of the part-of-speech change criterion.',
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
      'A fourth-grade student encounters the unfamiliar word "preview" in a science textbook. The teacher has previously taught the prefix pre- (meaning "before") and the base word view. Which word-analysis strategy could the student most effectively use?',
    options: [
      { label: 'A', text: 'Consulting a dictionary, because morphemic analysis is unreliable for predicting meaning.' },
      { label: 'B', text: 'Using context of the surrounding sentence alone, because prefixes and base words cannot reliably determine meaning.' },
      { label: 'C', text: 'Decomposing the word into the prefix pre- (before) and the base view (to see/look at) to infer that preview means "to look at or see beforehand."' },
      { label: 'D', text: 'Skipping the word and continuing to read, because its meaning will become clear from subsequent sentences.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Morphemic analysis — using knowledge of prefixes, suffixes, and base words to determine meaning — is a highly effective independent word-learning strategy. Knowing pre- means "before" and view relates to seeing yields a reliable approximation of the whole word\'s meaning, building word consciousness and vocabulary independence. Option A is incorrect because dictionary use, while valuable, is not the first or most independent strategy; morphemic analysis promotes independence and is faster. Option B is incorrect because morphemic analysis is quite reliable for words with transparent, common morphemes; dismissing it misrepresents its value. Option D is incorrect because skipping unknown words is a passive strategy explicitly not recommended as a primary word-learning approach.',
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
      'A third-grade student tries to read the unfamiliar word "reptile." The teacher instructs the student to identify the two syllables: "rep" and "tile." Which syllabication pattern does this word exemplify?',
    options: [
      { label: 'A', text: 'V/CV (open syllable), because the first syllable ends in a vowel that makes a long sound.' },
      { label: 'B', text: 'VC/CV (between two consonants), because the division occurs between the consonants p and t.' },
      { label: 'C', text: 'Consonant + le (stable final syllable), because the word ends in a consonant followed by -le.' },
      { label: 'D', text: 'VV (between two vowels), because the syllable division occurs between two adjacent vowels.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. In "reptile," the syllable division occurs between p and t — two consonants in the middle of the word. This is the VC/CV pattern: when two consonants appear between two vowels, divide between them. This gives "rep" (a closed syllable with a short vowel) and "tile" (a CVCe syllable with a long vowel). Option A is incorrect because V/CV is an open syllable pattern where the first syllable ends in a vowel (e.g., "ro/bot"); "rep" ends in a consonant. Option C is incorrect because consonant + le applies when a word ends in a consonant followed by -le (e.g., "ta/ble"); "tile" contains a silent e, making it a CVCe syllable, not a consonant + le syllable. Option D is incorrect because the VV pattern applies when two vowels appear side by side in the middle of a word; in "reptile," consonants p and t separate the syllables.',
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
      'A second-grade teacher teaches the rule for adding the suffix -ing to words that end in a silent e (e.g., "make" → "making," "write" → "writing"). Which of the following explanations most accurately conveys this orthographic rule?',
    options: [
      { label: 'A', text: 'Drop the silent e before adding a suffix that begins with a vowel, because the vowel in the suffix takes over the role of the silent e in signaling the long vowel sound.' },
      { label: 'B', text: 'Keep the silent e when adding any suffix so the vowel sound in the base word is preserved.' },
      { label: 'C', text: 'Double the final consonant before adding -ing to all words that end with a consonant.' },
      { label: 'D', text: 'Drop the silent e before adding a suffix that begins with a consonant, such as -ment or -ful.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. The orthographic rule is: drop the silent e before adding a vowel suffix (a suffix beginning with a vowel, such as -ing, -ed, -er, -est, -able). The vowel in the suffix signals the long vowel sound in the syllable, making the silent e unnecessary. In "making," the open syllable before -ing signals the long /a/. Option B is incorrect because keeping the silent e before a vowel suffix creates a problematic vowel sequence and is not the standard rule. Option C is incorrect because the CVC doubling rule applies to words with a short vowel before a single final consonant — a different pattern from silent-e words. Option D is incorrect because it reverses the rule: the silent e is retained before consonant suffixes (e.g., "hopeful," "movement") because the consonant suffix does not take over the vowel-signaling role.',
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
      'A third-grade teacher introduces the Latin root "port" (meaning "to carry"), pointing out that it appears in "transport," "portable," and "import." This type of instruction primarily helps students:',
    options: [
      { label: 'A', text: 'memorize a list of words with the root "port" so they can recognize them on vocabulary tests.' },
      { label: 'B', text: 'develop a generalizable strategy for inferring the meaning of unfamiliar words that share the same root.' },
      { label: 'C', text: 'understand that all English words are derived directly from Latin or Greek and that knowing one root unlocks the meaning of every word they encounter.' },
      { label: 'D', text: 'learn the part of speech of words containing "port" because roots always determine whether a word is a noun, verb, or adjective.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Teaching Greek and Latin roots as a vocabulary strategy gives students a transferable, generative tool for independently inferring the meanings of unfamiliar words. Knowing a single root can unlock meaning across a family of words — far more powerful than rote memorization. Option A is incorrect because the goal is strategy development for independent word-learning that generalizes to new vocabulary, not memorization of specific lists. Option C is incorrect because not all English words come from Latin or Greek; many have Germanic, French, Norse, and other origins, and no single root unlocks every word. Option D is incorrect because roots themselves do not determine part of speech; the same root can appear across different parts of speech depending on affixes attached.',
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
      'A fourth-grade student struggles to read and spell multisyllabic words accurately but can decode most single-syllable words with common phonics patterns. Which instructional approach is most appropriate?',
    options: [
      { label: 'A', text: 'Provide additional practice reading single-syllable decodable texts to strengthen the foundational phonics skills before introducing multisyllabic words.' },
      { label: 'B', text: 'Teach explicit syllabication strategies, including the six common English syllable types and common division patterns (e.g., VC/CV, V/CV), so that longer words can be broken into decodable parts.' },
      { label: 'C', text: 'Instruct the student to use context clues exclusively when encountering unknown multisyllabic words, because the number of letters makes phonetic decoding impractical.' },
      { label: 'D', text: 'Have the student memorize the most common multisyllabic words as whole units, because syllabication rules are too complex for fourth-grade students.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. When a student has mastered single-syllable phonics but struggles with multisyllabic words, the instructional gap is typically in syllabication knowledge. Teaching the six syllable types and common division strategies allows the student to decompose longer words into manageable parts, apply known phonics patterns to each part, and blend the parts together. Option A is incorrect because the student already has a strong single-syllable foundation; more single-syllable practice does not address the actual instructional gap. Option C is incorrect because context clues alone are insufficient for accurate multisyllabic word reading and should confirm decoded words, not replace decoding. Option D is incorrect because syllabication strategies are appropriate and teachable at the fourth-grade level, and whole-word memorization of multisyllabic words is not scalable.',
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
      'A fifth-grade teacher wants students to understand how adding a derivational suffix can change a word\'s part of speech. Which example most clearly demonstrates this concept?',
    options: [
      { label: 'A', text: '"Cats" → "cat" + -s, showing that pluralization changes a word\'s form.' },
      { label: 'B', text: '"Teach" → "teacher," showing that adding -er changes a verb to a noun meaning "one who teaches."' },
      { label: 'C', text: '"Walk" → "walked," showing that adding -ed changes the tense of the verb.' },
      { label: 'D', text: '"Happy" → "happier," showing that adding -er changes the degree of the adjective.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. "Teach" is a verb; "teacher" is a noun. The derivational suffix -er changes the grammatical category (part of speech) of the base word — a defining characteristic of derivational morphemes. This insight applies productively across many words (e.g., "write" → "writer," "farm" → "farmer"). Option A is incorrect because -s (plural) is an inflectional morpheme; "cat" and "cats" are both nouns. Option C is incorrect because -ed (past tense) is an inflectional morpheme; "walk" and "walked" are both verbs — part of speech is unchanged. Option D is incorrect because -er in "happier" is an inflectional morpheme (comparative degree); "happy" and "happier" are both adjectives.',
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
      'A class of fourth graders includes several students whose home language is Spanish. When teaching morphemic analysis, which of the following strategies would be most beneficial specifically for these students?',
    options: [
      { label: 'A', text: 'Avoiding morphemic analysis with these students because Spanish morphology is so different from English morphology that it will cause confusion.' },
      { label: 'B', text: 'Teaching morphemic analysis using only English words that have no equivalent in Spanish, to prevent over-reliance on the home language.' },
      { label: 'C', text: 'Explicitly drawing students\' attention to cognates — words with shared Latin or Greek roots that appear in both English and Spanish — to leverage their existing vocabulary knowledge.' },
      { label: 'D', text: 'Providing Spanish-language morphemic analysis instruction separately before transitioning to English, because the skills do not transfer across languages.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Because both Spanish and English draw heavily on Latin and Greek roots, Spanish-speaking students have a unique advantage: many English academic words are cognates of Spanish words they already know (e.g., "activate" / "activar," "agriculture" / "agricultura"). Explicitly drawing attention to these cross-linguistic connections — cognate awareness — allows students to apply existing vocabulary knowledge to English. Option A is incorrect because morphemic analysis is equally valuable for Spanish speakers; the Latin-based overlap actually makes it more powerful. Option B is incorrect because deliberately avoiding cross-linguistic connections denies students a proven vocabulary learning resource. Option D is incorrect because morphemic analysis skills do transfer across languages and do not require separate instruction in Spanish first.',
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
      'A second-grade teacher explicitly teaches the prefixes un- and re- along with several base words, then has students read and write new words by combining these prefixes with familiar base words. This instruction primarily develops students\':',
    options: [
      { label: 'A', text: 'phonemic awareness, because they are focusing on the sounds within individual morphemes.' },
      { label: 'B', text: 'morphemic analysis skills, enabling them to decode and construct new words using known word parts.' },
      { label: 'C', text: 'knowledge of derivational morphology, specifically focusing on inflectional suffixes.' },
      { label: 'D', text: 'spelling automaticity through repeated rote memorization of a fixed list of words.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Explicit instruction in common prefixes combined with practice applying them to known base words directly builds morphemic analysis skills — the ability to use knowledge of word parts to decode unfamiliar words and construct new ones. Once students know un- means "not/opposite of" and re- means "again," they can apply this knowledge productively to hundreds of new words. Option A is incorrect because phonemic awareness is a purely oral skill; analyzing word parts (morphemes) is a morphological, not phonemic, operation. Option C is incorrect because un- and re- are derivational prefixes, not inflectional suffixes. Option D is incorrect because this approach builds generalizable strategy knowledge, not rote memorization of a specific list.',
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
      'A third-grade student uses a morphemic analysis chart to analyze the word "disagreement" and produces: base = "agree," prefix = "dis-" (not/opposite), suffix = "-ment" (state or act of). The student defines it as "the state of not agreeing." Which of the following best characterizes this analysis?',
    options: [
      { label: 'A', text: 'The student has made an error because "dis-" is an inflectional prefix, not a derivational one.' },
      { label: 'B', text: 'The student correctly identified the word parts and used morphemic knowledge to construct an accurate definition, demonstrating effective morphemic analysis.' },
      { label: 'C', text: 'The student\'s analysis is flawed because "agree" is not the base word; the base word is "agreement."' },
      { label: 'D', text: 'The student should have used context clues instead of morphemic analysis because compound morphemic structures like this one are too complex for independent analysis.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student accurately decomposes "disagreement" into base word (agree), derivational prefix (dis- = not/opposite), and derivational suffix (-ment = state or act of), then synthesizes these meanings into an accurate definition. This is exactly the kind of generative, independent word-learning morphemic analysis is intended to develop. Option A is incorrect because dis- is a derivational prefix (it changes meaning); inflectional prefixes are not a standard category in English morphology. Option C is incorrect because "agreement" is itself a derived form (agree + -ment); the true base is "agree," which the student correctly identified. Option D is incorrect because morphemic analysis is specifically recommended and appropriate for complex multimorphemic words; this is precisely where the strategy is most valuable.',
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
    isDiagnostic: true,
    questionText:
      'A reading teacher explains to parents that fluency has three key components. Which of the following correctly identifies all three?',
    options: [
      { label: 'A', text: 'Speed, stamina, and motivation' },
      { label: 'B', text: 'Accuracy, rate, and prosody' },
      { label: 'C', text: 'Decoding, vocabulary, and comprehension' },
      { label: 'D', text: 'Phonics, phonemic awareness, and fluency' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Fluency is defined by three interrelated components: accuracy (reading words correctly), rate (reading at an appropriate speed), and prosody (reading with appropriate expression, phrasing, and intonation reflecting the text\'s meaning). Together these reflect automatic, efficient word reading that frees cognitive resources for comprehension. Option A is incorrect because speed is related to rate but stamina and motivation, while important, are not components of fluency. Option C is incorrect because decoding, vocabulary, and comprehension are components of reading proficiency broadly (among the five major components), not components of fluency. Option D is incorrect because phonics, phonemic awareness, and fluency are three of the five major reading components, not components of fluency itself.',
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
      'A reading specialist explains that fluency serves as an important bridge in the reading process. Which of the following most accurately describes this bridging role?',
    options: [
      { label: 'A', text: 'Fluency bridges phonemic awareness and phonics instruction, because readers must hear sounds clearly before connecting them to letters.' },
      { label: 'B', text: 'Fluency bridges decoding and comprehension, because when word recognition is automatic, readers can devote cognitive resources to constructing meaning from text.' },
      { label: 'C', text: 'Fluency bridges oral language and written language, because reading aloud develops the connection between speech and print.' },
      { label: 'D', text: 'Fluency bridges phonics and vocabulary instruction, because fluent readers encounter and learn more new words through wide reading.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The bridge metaphor reflects cognitive capacity theory: word recognition requires attentional resources. When decoding is slow and laborious, readers must devote so much effort to identifying words that little capacity remains for comprehension. When decoding is automatic (fluent), cognitive resources are freed for meaning construction. Option A is incorrect because fluency is not described as bridging phonemic awareness and phonics; it builds on decoding automaticity. Option C is incorrect because the bridging role of fluency is specifically about the link between word recognition and comprehension, not between oral and written language generally. Option D is incorrect because, while fluent readers do encounter more vocabulary through wide reading, fluency\'s defining bridge is between decoding and comprehension.',
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
      'A second-grade teacher notices a student reads text accurately at an appropriate rate but sounds choppy, monotone, and lacks natural phrasing — even on familiar passages. Which component of fluency needs the most attention, and which strategy would be most appropriate?',
    options: [
      { label: 'A', text: 'Rate; the teacher should have the student practice reading the same passage repeatedly to improve words-per-minute speed.' },
      { label: 'B', text: 'Accuracy; the teacher should review phonics patterns with the student to reduce decoding errors.' },
      { label: 'C', text: 'Prosody; the teacher should model expressive reading and use echo reading or phrase-cued text to help the student develop natural phrasing and intonation.' },
      { label: 'D', text: 'Comprehension; the student clearly does not understand the text, which is causing the flat reading.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The student reads accurately at an appropriate rate but lacks expression and natural phrasing — this is a prosody deficit. Prosody (the melody, rhythm, intonation, and phrasing of oral reading) bridges fluency and comprehension. Evidence-based strategies include teacher modeling of expressive reading, echo reading, and phrase-cued text. Option A is incorrect because rate is not the problem; the student already reads at an appropriate speed. Option B is incorrect because accuracy is not the problem; the student reads words correctly. Option D is incorrect because the problem as described is an oral reading characteristic; the first instructional step should be explicit prosody instruction before concluding comprehension is the root issue.',
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
      'A second-grade teacher implements a repeated reading routine in which students read the same short passage three times across a week, recording their words-correct-per-minute each time. After several weeks, rate scores have improved but expression and phrasing on new passages remain flat. Which conclusion is most supported?',
    options: [
      { label: 'A', text: 'Repeated reading is not effective and should be discontinued; the students need a different intervention entirely.' },
      { label: 'B', text: 'Repeated reading has successfully improved rate and automaticity, but additional explicit prosody instruction — such as teacher modeling and echo reading — is needed to develop expressive phrasing.' },
      { label: 'C', text: 'The students have reached maximum fluency benefit; no further fluency instruction is needed once rate scores are satisfactory.' },
      { label: 'D', text: 'The improvement in rate indicates sufficient prosody; flat reading of new passages is normal and expected.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Repeated reading is a well-validated strategy for improving rate and accuracy on practiced passages, and the rate gains confirm its effectiveness. However, research indicates that repeated reading alone does not reliably develop prosody, especially when focused on speed metrics. Direct prosody instruction — modeling, echo reading, discussion of how punctuation signals phrasing — is needed to supplement. Option A is incorrect because the data show repeated reading is working for rate; the appropriate response is to supplement, not abandon, the strategy. Option C is incorrect because rate is only one of three fluency components; satisfactory rate does not mean fluency is complete if prosody remains deficient. Option D is incorrect because flat monotone reading of new passages is not a normal expected outcome; it is a prosody need that requires targeted instruction.',
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
      'A third-grade student reads grade-level passages accurately but very slowly, spending significant time sounding out individual words and syllables. Which strategy is most appropriate to address this specific fluency need?',
    options: [
      { label: 'A', text: 'Conducting a phonemic awareness assessment to determine whether phoneme-level deficits are causing the slow reading.' },
      { label: 'B', text: 'Providing below-grade-level texts at the student\'s independent level for silent reading with no accountability.' },
      { label: 'C', text: 'Implementing a repeated oral reading program at the student\'s instructional level with teacher monitoring, targeting increased automaticity through supported practice.' },
      { label: 'D', text: 'Providing immediate comprehension strategy instruction because slow reading always indicates limited text understanding.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The student can decode accurately but slowly — a rate and automaticity issue. The most effective intervention is supported repeated oral reading at the instructional level (90–95% accuracy) with teacher monitoring and feedback. Repeated reading builds automaticity by giving students multiple exposures to text, reducing the cognitive cost of word recognition. Option A is incorrect because the student\'s accurate decoding indicates functional phonics skills; a phonemic awareness assessment would not yield actionable new information. Option B is incorrect because silently reading easy texts without accountability does not create conditions for automaticity growth; students need appropriately challenging, teacher-monitored oral reading with feedback. Option D is incorrect because slow but accurate reading does not necessarily indicate comprehension difficulty; the issue is in word recognition automaticity.',
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
      'A fifth-grade teacher notices that several students can read grade-level passages accurately and at adequate rate, but struggle to understand informational texts with complex vocabulary and dense sentences. Which of the following most likely explains why these students\' fluency is not supporting their comprehension?',
    options: [
      { label: 'A', text: 'These students have a phonics deficit that is causing comprehension breakdown even though surface-level accuracy is satisfactory.' },
      { label: 'B', text: 'These students\' fluency difficulties are primarily at the rate level; they need to read faster to comprehend informational text.' },
      { label: 'C', text: 'At the upper elementary level, fluency difficulties are more commonly caused by limited academic vocabulary and unfamiliar language structures than by phonics gaps.' },
      { label: 'D', text: 'These students are not using metacognitive strategies, which is the only factor separating fluent decoding from reading comprehension.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. For older students who decode accurately, the primary fluency disruptors shift from phonics gaps (more common in primary grades) to limited academic vocabulary and complex sentence syntax. When readers encounter many unknown words or unfamiliar linguistic constructions, fluency breaks down even when decoding skills are adequate. Addressing academic vocabulary and language structures is the most appropriate focus. Option A is incorrect because the students read accurately, indicating functional phonics skills. Option B is incorrect because the students already read at adequate rate; simply reading faster would not address the root cause. Option D is incorrect because, while metacognitive strategies are important, limited vocabulary and language knowledge are primary contributors identified in the research literature for upper-grade fluency and comprehension difficulties.',
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
      'A first-grade teacher uses echo reading with a small group: the teacher reads a line of text aloud with expression, and students immediately repeat the line attempting to match the teacher\'s phrasing and intonation. This strategy primarily develops which fluency component?',
    options: [
      { label: 'A', text: 'Accuracy, because hearing the teacher model correct pronunciation of each word reduces decoding errors.' },
      { label: 'B', text: 'Rate, because the back-and-forth rhythm of echo reading increases students\' reading speed.' },
      { label: 'C', text: 'Prosody, because students practice matching the teacher\'s expressive phrasing and intonation patterns.' },
      { label: 'D', text: 'Decoding, because students encounter new phonics patterns in text as the teacher models each line.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Echo reading is specifically designed to develop prosody — the expressive, phrased, appropriately intonated dimension of fluency. By immediately repeating the teacher\'s model with matching expression, students receive direct, imitative practice in rhythmic and intonational patterns. This internalized sense of phrasing transfers to independent reading over time. Option A is incorrect because, while echo reading may incidentally support accuracy, the defining purpose is expression and phrasing. Option B is incorrect because echo reading does not specifically target speed; pacing follows the teacher\'s model, which prioritizes expression. Option D is incorrect because phonics instruction targets decoding; echo reading is a fluency activity at the connected-text level, not a letter-sound pattern lesson.',
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
      'A fourth-grade student reads accurately and at appropriate rate in narrative texts but fluency breaks down noticeably when reading science textbook chapters. Which of the following is the most likely explanation?',
    options: [
      { label: 'A', text: 'The student has not yet developed phonics skills needed to decode the longer, more complex words in science texts.' },
      { label: 'B', text: 'The student\'s limited familiarity with science-specific vocabulary and text structures increases cognitive demand, disrupting fluency.' },
      { label: 'C', text: 'Narrative texts are inherently easier to decode than informational texts because they use shorter sentences.' },
      { label: 'D', text: 'The student\'s fluency difficulty with science texts indicates a reading disability that requires special education services.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This pattern — strong fluency in narrative contexts but disruption in content-area informational text — reflects the role of background knowledge and vocabulary in fluency. Science texts introduce domain-specific vocabulary and dense concepts. Even accurate decoders slow down and lose expression when processing many unknown words because the cognitive cost is high. Option A is incorrect because the student decodes accurately in narrative text; the same decoding skills apply to science words, so a phonics deficit is unlikely. Option C is incorrect because text complexity is not simply a function of sentence length; informational texts are complex in ways that include vocabulary density and knowledge demands. Option D is incorrect because this pattern is very common among typically developing readers encountering academic content and does not indicate a reading disability.',
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
      'A second-grade teacher has students who have achieved automaticity with word recognition and are beginning to read longer passages independently. Which practice is most aligned with evidence-based fluency instruction for these students?',
    options: [
      { label: 'A', text: 'Having students read silently at their independent level with comprehension accountability (e.g., brief summaries or retelling) to develop reading rate and comprehension simultaneously.' },
      { label: 'B', text: 'Requiring students to read aloud as rapidly as possible, competing to see who can finish a passage first.' },
      { label: 'C', text: 'Providing audio recordings of texts for students to follow along with, so the audio model sets the reading pace.' },
      { label: 'D', text: 'Returning students to repeated reading of decodable texts, because fluency with word-level accuracy is the prerequisite for passage-level rate.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. For students who have achieved automaticity, silent reading with comprehension accountability is the appropriate fluency practice. This mirrors real-world reading, builds stamina and rate on continuous text, and simultaneously develops comprehension. Accountability ensures students are reading for meaning. Option B is incorrect because speed competitions create anxiety, discourage comprehension monitoring, and do not reflect evidence-based fluency instruction. Option C is incorrect because following an audio recording transfers control of pace to technology rather than developing self-regulated reading rate. Option D is incorrect because these students have already achieved automaticity; returning to decodable texts designed for beginning decoders is not developmentally appropriate.',
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
      'A reading coach is explaining why accuracy should be prioritized over rate and prosody as the initial fluency goal for beginning readers. Which of the following best justifies this prioritization?',
    options: [
      { label: 'A', text: 'Accuracy is most important because timed reading tests used in schools measure primarily how many words a student reads correctly per minute.' },
      { label: 'B', text: 'Accuracy should be prioritized first because reading words incorrectly reinforces wrong pronunciations and incorrect letter-sound associations; rate and prosody can only develop meaningfully on a foundation of accurate word recognition.' },
      { label: 'C', text: 'Accuracy is more important than prosody because prosody is a secondary skill with no measurable impact on comprehension.' },
      { label: 'D', text: 'Rate should actually be prioritized before accuracy because faster reading gives students more exposure to words, which naturally builds accuracy over time.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Accuracy is the foundational fluency component because it ensures the reader is processing actual grapheme-phoneme correspondences. If a reader habitually misreads words, they reinforce incorrect letter-sound mappings and build an inaccurate mental lexicon. Rate and prosody are meaningful only when built on accurate word recognition. Option A is incorrect because basing instructional priorities on assessment format rather than reading development research is not a sound pedagogical rationale. Option C is incorrect because prosody is not merely secondary; research indicates it serves as a bridge between fluency and comprehension and is a meaningful contributor to reading proficiency. Option D is incorrect because faster reading of inaccurately decoded words would reinforce errors; accuracy must not be sacrificed for rate in beginning readers.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0005 — Academic Language and Vocabulary  (10 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'A third-grade teacher is selecting vocabulary words from a social studies unit on community helpers. She wants to prioritize words for explicit instruction based on utility and long-term vocabulary development. Which words should she select?',
    options: [
      { label: 'A', text: '"firefighter" and "baker," because these community helpers appear frequently in the unit and students may not know them.' },
      { label: 'B', text: '"occupation" and "responsibility," because these are versatile Tier 2 academic words that appear across many subjects and contexts.' },
      { label: 'C', text: '"the" and "a," because these are the highest-frequency words in the English language.' },
      { label: 'D', text: '"carbon monoxide" and "hose coupling," because these technical words are central to the unit\'s content.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Tier 2 words — high-utility academic words appearing across a variety of texts and subjects — are the most appropriate targets for explicit vocabulary instruction. "Occupation" and "responsibility" appear in social studies, science, and ELA contexts and significantly expand students\' academic vocabulary in a transferable way. Option A is incorrect because "firefighter" and "baker" are Tier 1 words — common, everyday words most students already know or can easily learn from context. Option C is incorrect because "the" and "a" are function words students at this level already know; devoting explicit instruction to them would be inefficient. Option D is incorrect because "carbon monoxide" and "hose coupling" are Tier 3 words — highly technical, domain-specific vocabulary unlikely to appear outside this content context; not the most productive words for long-term vocabulary growth.',
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
      'A fourth-grade student encounters this sentence: "The nocturnal animals, those that sleep during the day and are active at night, are most commonly found near the river." Which type of context clue does this sentence provide for "nocturnal"?',
    options: [
      { label: 'A', text: 'A contrast clue, because the sentence describes what nocturnal animals do versus what diurnal animals do.' },
      { label: 'B', text: 'An appositive or definition clue, because the phrase following the comma directly defines "nocturnal" within the sentence.' },
      { label: 'C', text: 'A synonym clue, because the sentence pairs "nocturnal" with a simpler, familiar word meaning the same thing.' },
      { label: 'D', text: 'A general context clue, because the overall topic allows the reader to guess that "nocturnal" relates to animals.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. An appositive or definition context clue occurs when the text provides a direct explanation or definition immediately following the unknown word, typically set off by commas, parentheses, or dashes. The phrase "those that sleep during the day and are active at night" is a direct parenthetical definition of "nocturnal." This is one of the most reliable context clue types because the author explicitly provides the word\'s meaning. Option A is incorrect because a contrast clue would present information about what nocturnal animals do in contrast to something opposite; the sentence does not present a contrast. Option C is incorrect because no simple synonym is provided; the appositive gives a description, not a one-word synonym. Option D is incorrect because calling this merely a "general context clue" understates the precision of the appositive construction.',
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
      'A fifth-grade teacher presents this sentence: "Unlike her bold and outspoken classmates, Priya remained reticent during the class debate, rarely volunteering her opinion." Which type of context clue does this sentence provide for "reticent"?',
    options: [
      { label: 'A', text: 'An appositive clue, because the phrase "rarely volunteering her opinion" directly defines the word.' },
      { label: 'B', text: 'A contrast or antonym clue, because "unlike" signals that "reticent" means the opposite of "bold and outspoken."' },
      { label: 'C', text: 'A cause-and-effect clue, because the sentence shows that being reticent caused Priya to rarely speak.' },
      { label: 'D', text: 'A synonym clue, because "bold and outspoken" is offered as a restatement of what "reticent" means.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The word "unlike" is a contrast signal that sets up an opposition between Priya and her "bold and outspoken" classmates. Because Priya is contrasted with people who are bold and outspoken, and the sentence confirms she "rarely volunteered her opinion," the reader can infer that "reticent" means quiet or reserved — the opposite. This is a contrast or antonym context clue. Option A is incorrect because an appositive provides a definition immediately adjacent to the word, typically set off by punctuation; "rarely volunteering her opinion" describes resulting behavior, not a direct appositive definition. Option C is incorrect because, while the sentence does describe behavior related to being reticent, the clue structure is contrast, not causation used to define the word. Option D is incorrect because "bold and outspoken" are presented as opposites of, not synonyms for, "reticent."',
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
      'A teacher wants to develop students\' word consciousness — an interest in and awareness of words and how they work. Which classroom practice would most effectively build word consciousness?',
    options: [
      { label: 'A', text: 'Assigning students a list of 20 vocabulary words each week to define using a dictionary and use in sentences.' },
      { label: 'B', text: 'Creating a "word of the week" display where students bring interesting words they encounter in their reading and discuss meanings, origins, and relationships to other words.' },
      { label: 'C', text: 'Conducting weekly vocabulary tests in which students match words to definitions.' },
      { label: 'D', text: 'Restricting vocabulary instruction to the words explicitly listed in the grade-level standards.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Word consciousness refers to students\' interest in, awareness of, and enthusiasm for words. A "word of the week" display where students contribute interesting words from their own reading, and where the class discusses etymology, morphology, and semantic relationships, directly cultivates this disposition and invites students to become active word learners. Option A is incorrect because assigning large lists of words to define mechanically treats vocabulary as a rote task rather than fostering authentic engagement. Option C is incorrect because weekly definition tests measure recall but do not develop interest in or curiosity about words. Option D is incorrect because limiting instruction to standards-listed words takes an overly narrow view and misses the opportunity to develop broad, self-motivated word learning.',
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
      'A third-grade teacher is selecting which vocabulary words to pre-teach before students read an informational passage about photosynthesis. The passage contains: "sunlight," "absorb," "chlorophyll," "nutrients," and "process." Which selection is most principled?',
    options: [
      { label: 'A', text: '"Sunlight" and "nutrients" should be pre-taught because they are the longest words in the list and will take the most time to decode.' },
      { label: 'B', text: '"Chlorophyll" should be pre-taught because it is a key concept word that cannot be inferred from context or word parts and is central to the passage.' },
      { label: 'C', text: '"Process" and "absorb" should be pre-taught because they are Tier 2 academic words essential to understanding the content that students are unlikely to know or be able to infer without instruction.' },
      { label: 'D', text: '"Sunlight" should be pre-taught because students may confuse it with "moonlight" and misunderstand the passage.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The most principled vocabulary selection targets words that (1) are important to understanding the text, (2) are unlikely to be known or inferrable from context, and (3) have broad utility beyond this text. "Process" and "absorb" are Tier 2 academic words that appear across many subject areas ("the process of digestion," "absorb information") and whose meanings may not be deducible from the passage. Pre-teaching these builds both immediate comprehension and transferable vocabulary. Option A is incorrect because word length is not a criterion for vocabulary selection; decoding difficulty is a separate concern. Option B is not entirely wrong — "chlorophyll" is a key concept word — but it is Tier 3 technical vocabulary; the most generative pre-teaching targets Tier 2 academic words. Option D is incorrect because "sunlight" is a common Tier 1 word third-grade students almost certainly know; pre-teaching it would be an inefficient use of instructional time.',
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
      'A teacher introduces the idiom "to bite off more than you can chew" to second-graders, explaining it means taking on more work or responsibility than you can handle. To ensure students understand the idiomatic meaning rather than the literal meaning, which instructional strategy would be most effective?',
    options: [
      { label: 'A', text: 'Asking students to draw a picture of someone literally biting off a very large piece of food, which will help them remember the phrase visually.' },
      { label: 'B', text: 'Providing multiple examples of the idiom used in different contexts and asking students to identify whether each is a situation where someone "bit off more than they could chew."' },
      { label: 'C', text: 'Having students memorize the idiom along with its definition so they can recall it accurately on a vocabulary quiz.' },
      { label: 'D', text: 'Explaining the historical origin of the phrase so students understand why it developed its figurative meaning.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Idioms cannot be understood from their component words, making multiple contextual examples essential for building genuine understanding. Providing varied scenarios in which the idiom applies — and asking students to confirm or disconfirm whether each situation fits — develops flexible, functional understanding of the expression. This moves beyond surface-level definition memorization to authentic comprehension of figurative language in context. Option A is incorrect because drawing the literal image actually reinforces the literal meaning, which is precisely what students need to move past. Option C is incorrect because memorizing a definition for a quiz does not ensure students will recognize and understand the idiom in real reading or conversation. Option D is incorrect because historical origins of phrases are usually beyond second-grade developmental readiness and do not help students use the idiom correctly in reading and writing contexts.',
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
      'During a read-aloud of a non-fiction book about ocean ecosystems, a fourth-grade teacher pauses at the word "decompose" and says: "Hmm, I know that \'de-\' can mean to undo something, and I know the word \'compose\' means to put together. So \'decompose\' might mean to come apart, or break down." This teacher behavior is best described as:',
    options: [
      { label: 'A', text: 'a phonics lesson, because the teacher is using knowledge of graphemes to decode an unfamiliar word.' },
      { label: 'B', text: 'a think-aloud modeling independent word-learning through morphemic analysis, showing students how to use word parts to infer meaning.' },
      { label: 'C', text: 'a context clue lesson, because the teacher is using information from the surrounding sentence to determine the word\'s meaning.' },
      { label: 'D', text: 'an oral vocabulary activity, because the teacher is helping students add "decompose" to their listening vocabulary.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The teacher is explicitly modeling the process of using morphemic knowledge (prefix de- = to reverse/undo; base word compose = to put together) to arrive at the meaning of an unfamiliar word. By verbalizing the reasoning process, the teacher makes the internal cognitive strategy visible to students — this is the think-aloud technique applied to independent word-learning through morphemic analysis. Option A is incorrect because the teacher is analyzing word meaning through morphemes, not phonemes; this is a vocabulary and morphology strategy, not a phonics lesson. Option C is incorrect because the teacher is using the internal structure of the word itself (morphemic analysis), not surrounding text information (context clues). Option D is incorrect because, while students will incidentally add "decompose" to vocabulary, the primary instructional purpose is modeling an independent word-learning strategy.',
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
      'Research on vocabulary learning and reading comprehension has identified a threshold below which comprehension breaks down. Which of the following most accurately describes this threshold?',
    options: [
      { label: 'A', text: 'Students need to know the definition of every word in a text before they can comprehend it at a basic level.' },
      { label: 'B', text: 'Students need to know approximately 90% of the words in a text to achieve adequate comprehension; below this level, too many unknown words disrupt meaning construction.' },
      { label: 'C', text: 'Students need to know the Tier 1 words in a text; Tier 2 and Tier 3 words can be skipped without significantly affecting comprehension.' },
      { label: 'D', text: 'Vocabulary size has no direct relationship to comprehension; the primary factor is the quality of the student\'s reading strategies.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Research on vocabulary coverage and reading comprehension has established that readers need to know approximately 90% (some researchers place it higher, around 95–98%) of words in a text to achieve adequate comprehension. When too many words are unknown, processing unfamiliar vocabulary disrupts the flow of comprehension and makes it difficult to construct overall understanding. Option A is incorrect because knowing every word is neither practical nor necessary; good readers tolerate some unknown words and use context to infer meanings. Option C is incorrect because Tier 2 and Tier 3 words are often the most conceptually important words in a text; skipping them would undermine comprehension of key ideas. Option D is incorrect because a substantial body of research demonstrates a strong, direct relationship between vocabulary size and comprehension.',
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
      'A sixth-grade teacher wants students to understand nuances among near-synonyms: "persuade," "convince," "manipulate," and "coerce." Which instructional approach would best develop students\' understanding of semantic distinctions among these words?',
    options: [
      { label: 'A', text: 'Assigning students to write a separate dictionary definition for each word so they can compare definitions side by side.' },
      { label: 'B', text: 'Asking students to arrange the four words along a continuum from "least forceful" to "most forceful" and discuss how meaning and ethical implications shift across the spectrum.' },
      { label: 'C', text: 'Having students use each word in one sentence and submit it for teacher review.' },
      { label: 'D', text: 'Choosing one of the four words as the "official" word for the unit and focusing all instruction on that single word.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Understanding semantic nuances among near-synonyms requires students to compare and contrast the words along meaningful dimensions. Arranging the words on a forcefulness continuum — and discussing the ethical connotations that shift from legitimate reasoning ("persuade") to pressure to deception to force ("coerce") — develops deep, contextually sensitive vocabulary knowledge and directly supports higher-order thinking about word choice in persuasive writing. Option A is incorrect because copying dictionary definitions produces surface-level familiarity but not nuanced understanding of when and how to use each word. Option C is incorrect because using a word in a single sentence without discussion of when one would choose it over a near-synonym does not develop understanding of semantic distinctions. Option D is incorrect because selecting only one word forecloses the comparative analysis that is the whole instructional purpose.',
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
      'A first-grade teacher reads aloud a picture book in which a character "felt butterflies in her stomach" before a piano recital. Several students express concern that the character literally has butterflies inside her. Which response best describes the students\' comprehension challenge and the most appropriate instructional response?',
    options: [
      { label: 'A', text: 'The students have a phonics problem because they cannot decode "butterflies"; the teacher should review the phonics pattern for words ending in -ies.' },
      { label: 'B', text: 'The students have encountered an idiom and are interpreting it literally; the teacher should explain that "butterflies in your stomach" is an idiomatic expression meaning nervousness and provide additional examples in context.' },
      { label: 'C', text: 'The students are not yet developmentally ready to understand figurative language; this concept should be reserved for fourth grade.' },
      { label: 'D', text: 'The students are applying good metacognitive skills by noticing something surprising; the teacher should confirm the character literally has butterflies as an example of magical realism.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. "Butterflies in your stomach" is a common idiomatic expression whose meaning cannot be derived from the literal meaning of its component words. When students interpret idioms literally, they reveal a comprehension challenge that requires explicit instruction. The appropriate response is to explain this is a figure of speech, define the idiomatic meaning (nervousness), and provide multiple contextual examples so students develop flexible understanding. Option A is incorrect because the issue is not word-level decoding but figurative language comprehension; the students clearly know what "butterflies" means literally — that is the problem. Option C is incorrect because idiom awareness is developmentally appropriate in primary grades; research supports introducing figurative language in early elementary school. Option D is incorrect because confirming a literal interpretation of an idiom would create or reinforce a comprehension error.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0006 — Literary Text Comprehension  (12 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A kindergarten teacher wants to develop students\' understanding of the causal nature of story events during interactive read-alouds. Which instructional approach would be most effective?',
    options: [
      { label: 'A', text: 'After each read-aloud, asking students to draw their favorite part of the story to demonstrate personal connection to the text.' },
      { label: 'B', text: 'Pausing during the read-aloud at key plot events to ask questions such as "Why did that happen? What caused the character to do that?" and connecting characters\' motivations to subsequent events.' },
      { label: 'C', text: 'Having students color-code characters on a photocopied page from the book by assigning each character a different color.' },
      { label: 'D', text: 'Reading the same story multiple times in the same week, trusting that repeated exposure will naturally develop students\' understanding of story causality.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Understanding causal relationships in stories (why things happen, how one event leads to another, how characters\' motivations drive action) is foundational to literary comprehension. Pausing during read-alouds to ask "why" questions and explicitly linking cause to effect guides students to attend to these connections and builds the story grammar knowledge that supports later reading comprehension. Option A is incorrect because drawing a favorite part promotes personal response, not causal analysis. Option C is incorrect because color-coding characters helps students track characters but does not develop understanding of why story events occur. Option D is incorrect because repeated exposure alone is not sufficient to develop causal understanding; explicit instruction and guided discussion are needed.',
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
      'A third-grade teacher reads aloud: "Maya set her trophy on the windowsill where the afternoon sun could hit it just right. She glanced at it every few minutes throughout the afternoon." The teacher asks: "What does this tell you about how Maya feels about her trophy? What clues in the text support your answer?" This type of question primarily develops students\':',
    options: [
      { label: 'A', text: 'literal comprehension skills, because the answer to the question is found directly in the text.' },
      { label: 'B', text: 'inferential comprehension skills, because students must use textual details plus their own background knowledge to infer Maya\'s feelings, which are not explicitly stated.' },
      { label: 'C', text: 'evaluative comprehension skills, because students are being asked to judge the quality of the author\'s writing.' },
      { label: 'D', text: 'phonemic awareness skills, because students are listening to the read-aloud and processing the sounds in the words.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The passage does not explicitly state how Maya feels; students must infer her feelings (pride, satisfaction) from her described actions — placing the trophy where the light hits it and repeatedly glancing at it. Constructing this inference requires combining textual evidence with background knowledge about human behavior. This is inferential comprehension: reading between the lines. The question also asks for supporting text evidence, a key component of text-based inferential reasoning. Option A is incorrect because Maya\'s feelings are not literally stated; the answer requires inference, not retrieval of explicitly stated information. Option C is incorrect because evaluative comprehension involves making judgments about the text itself; asking what a character feels does not ask students to evaluate. Option D is incorrect because phonemic awareness is an oral language skill; comprehension questions develop comprehension, not phonemic awareness.',
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
      'A fifth-grade teacher plans a close reading lesson for this passage: "When she walked into her childhood home for the first time in twenty years, the smell of her mother\'s cooking still lingered in the kitchen. She placed her hand on the worn wooden banister and felt herself become a child again." Which question would most effectively prompt higher-order literary analysis?',
    options: [
      { label: 'A', text: 'Where did the character go at the beginning of this passage?' },
      { label: 'B', text: 'What are two details from this passage that describe the setting of the childhood home?' },
      { label: 'C', text: 'How does the author use sensory details and figurative language in this passage to convey the character\'s emotional experience of returning home?' },
      { label: 'D', text: 'Do you think visiting old places brings back memories? Has this ever happened to you?' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. This question requires students to analyze the author\'s deliberate craft choices — sensory details (the smell of cooking, the feel of the banister) and figurative language ("felt herself become a child again") — and explain how these specific techniques convey the character\'s emotional response. This is higher-order literary analysis that goes beyond literal comprehension and personal connection. Option A is incorrect because this is a straightforward literal retrieval question; it does not require analysis or interpretation. Option B is incorrect because identifying details is a literal comprehension task, not higher-order analysis of how the author constructs meaning through craft. Option D is incorrect because asking about personal experience focuses on students\' own lives rather than textual analysis and moves away from the text.',
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
      'A fourth-grade teacher has students read a short chapter written in first-person narration and asks: "What do we know about events in this story that we wouldn\'t know if it were written in third person? What can\'t we know because of the first-person narrator?" This instruction primarily develops students\' understanding of:',
    options: [
      { label: 'A', text: 'text structure, because students are analyzing how the story is organized chronologically.' },
      { label: 'B', text: 'point of view and how the narrator\'s perspective limits and shapes what the reader knows about events and other characters.' },
      { label: 'C', text: 'theme, because understanding the narrator\'s perspective helps students identify the central message.' },
      { label: 'D', text: 'summarizing, because students are identifying only the key events as experienced by the narrator.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. First-person narration gives the reader direct access to the narrator\'s thoughts and feelings but limits the reader to only what the narrator knows or observes. This question directly develops understanding of how narrative point of view constrains and shapes the reader\'s access to the story, a key craft and structure skill. Option A is incorrect because chronological organization is a text structure element, not a point-of-view element; the question is about who tells the story and what that narrator can access. Option C is incorrect because, while point of view can influence perception of theme, the specific skill being developed is narrative perspective, not theme identification. Option D is incorrect because summarizing involves condensing key information; the question asks students to analyze what the narrator\'s position includes and excludes, not to produce a summary.',
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
      'A second-grade teacher has students read a picture book about a young elephant teased for his large ears who ultimately uses them to fly and becomes a celebrated hero. After reading, the teacher facilitates a discussion in which students identify the lesson or message and support their ideas with specific text evidence. This discussion primarily develops students\' ability to:',
    options: [
      { label: 'A', text: 'identify the genre of the text, because recognizing a fable is necessary before discussing its moral.' },
      { label: 'B', text: 'determine the central message or moral of a literary text and support that interpretation with textual evidence.' },
      { label: 'C', text: 'compare the story to real-world events, developing critical thinking about the accuracy of events depicted.' },
      { label: 'D', text: 'assess the author\'s use of figurative language throughout the narrative.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Determining the central message, lesson, or moral of a literary text and citing specific story details to support that interpretation is a core literary comprehension skill. Students must synthesize what happened in the story and abstract a broader meaning (e.g., "What makes you different can become your greatest strength"). The requirement to support interpretation with text evidence makes this an evidence-based literary analysis task. Option A is incorrect because genre identification, while useful, is not the primary skill developed in a message/lesson discussion. Option C is incorrect because comparing the story to real-world accuracy involves evaluative comprehension; the described discussion focuses on deriving and supporting a central message. Option D is incorrect because the activity does not specifically target figurative language; the focus is on the story\'s central message.',
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
      'After whole-class reading of a short story, a third-grade teacher assigns literature response journals with the prompt: "Describe a decision a character made and explain why you think they made it." Which of the following best describes why this is an effective literacy activity?',
    options: [
      { label: 'A', text: 'It is effective because it requires only literal recall, making it accessible to all students regardless of reading level.' },
      { label: 'B', text: 'It is effective because it engages students in inferential thinking about character motivation while requiring text-based evidence in writing, integrating reading and writing skills.' },
      { label: 'C', text: 'It is effective because it prepares students for standardized tests that frequently include questions about character decisions.' },
      { label: 'D', text: 'It is effective because journaling activities do not require teacher feedback, saving instructional time.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This prompt requires students to identify a character\'s decision (plot recall) and then explain the reasoning behind it (inferential thinking about character motivation — typically implied rather than stated). Writing the response further develops literacy skills by requiring students to organize and articulate their textual reasoning. This integration of reading comprehension with written expression is a hallmark of effective literary response activities. Option A is incorrect because explaining why a character made a decision is inferential, not merely literal recall. Option C is incorrect because aligning instruction to test formats is not the principled reason for a strategy\'s educational value; the value lies in the comprehension and writing skills developed. Option D is incorrect because meaningful literary response journals benefit from teacher feedback; the value is not in saving teacher time.',
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
      'A fourth-grade class reads a simile: "The old barn stood at the edge of the field like a forgotten soldier." A student says, "I don\'t understand what the barn has to do with a soldier." Which instructional response would most effectively help the student understand this figurative language?',
    options: [
      { label: 'A', text: 'Telling the student to look up "soldier" in the dictionary to understand the comparison better.' },
      { label: 'B', text: 'Explaining that a simile uses "like" or "as" to compare two unlike things, then asking the student what qualities the barn and the soldier might share in the context of the story (e.g., old, worn, isolated, standing alone).' },
      { label: 'C', text: 'Skipping the line and continuing reading, because figurative language does not affect the literal plot of the story.' },
      { label: 'D', text: 'Replacing the simile with the literal statement "the old barn stood at the edge of the field" and explaining that the author was being unnecessarily complicated.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Understanding a simile requires identifying what qualities the two compared items share. Explicitly naming the device (simile: "like" or "as"), then guiding the student to think about what makes a barn like a forgotten soldier in the story\'s context (both old, worn, isolated, overlooked), develops genuine figurative language comprehension. This approach scaffolds the student\'s thinking without giving away the answer. Option A is incorrect because looking up "soldier" provides a literal definition but does not help the student understand the comparative figurative meaning; the issue is the comparison, not the word\'s denotative meaning. Option C is incorrect because figurative language significantly contributes to meaning in literary texts; skipping it leaves the student unable to fully understand the author\'s portrayal. Option D is incorrect because paraphrasing figurative language into literal language destroys the author\'s intended meaning and imagery; effective instruction develops the student\'s capacity to interpret figurative language.',
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
      'A first-grade teacher is planning a lesson comparing two versions of the same folktale — one from West Africa and one from Japan — to develop students\' ability to analyze how cultural settings affect the telling of similar stories. Which teaching strategy would be most effective to prepare students for this comparison?',
    options: [
      { label: 'A', text: 'Reading both stories aloud without stopping so students receive the full narrative experience before the comparison.' },
      { label: 'B', text: 'Pre-teaching key cultural vocabulary and background knowledge for both settings before reading, and using a graphic organizer that helps students track story elements (character, setting, problem, resolution) across both texts.' },
      { label: 'C', text: 'Assigning students to read the stories independently and write a paragraph comparing them, because writing before discussion produces stronger comprehension.' },
      { label: 'D', text: 'Focusing instruction only on the African version because it is the less familiar text and students will naturally remember the Japanese version from prior knowledge.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. To compare stories effectively across cultural settings, students need background knowledge about each culture and a structured tool for tracking the same story elements across both texts. Pre-teaching cultural vocabulary and context builds the schema necessary for comprehension, while a story grammar graphic organizer provides a scaffold for systematic comparison anchored in textual details. Option A is incorrect because reading both texts without structure and pause does not give students the scaffolding needed to track and compare specific story elements. Option C is incorrect because having first-graders read and write independently without prior instruction places the task at an independent level beyond typical first-grade support; teacher guidance is essential. Option D is incorrect because avoiding one text undermines the lesson\'s goal; both texts deserve equal instructional attention.',
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
      'A second-grade student reads grade-level narrative texts with accuracy and adequate rate but cannot retell a story in sequence or recall key details after reading. Which assessment would provide the most targeted diagnostic information?',
    options: [
      { label: 'A', text: 'A phonics inventory to determine whether the student has letter-sound knowledge gaps causing comprehension failure.' },
      { label: 'B', text: 'An oral retelling of a short story using a rubric that assesses the student\'s ability to recall story elements (character, setting, problem, events, resolution) in sequence.' },
      { label: 'C', text: 'A running record to determine the student\'s reading accuracy rate.' },
      { label: 'D', text: 'A timed reading fluency assessment to determine whether the student\'s rate is below grade-level benchmarks.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The student\'s profile — accurate and adequately fluent reading but poor recall and sequencing — indicates the difficulty is in reading comprehension, specifically in narrative text structure (story grammar). An oral retelling assessed with a story grammar rubric will reveal whether the student understands the narrative framework — the most likely source of the comprehension difficulty. This targeted assessment directly informs instruction. Option A is incorrect because the student reads accurately, indicating functional phonics skills; a phonics inventory would not yield actionable new information. Option C is incorrect because a running record also focuses on accuracy, which is already known to be adequate. Option D is incorrect because a timed fluency assessment focuses on rate, which is described as adequate; this would not identify the comprehension problem.',
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
      'A fifth-grade teacher plans a literature unit in which students read three short stories by different authors all centered on the theme of belonging. Near the end of the unit, the teacher wants students to engage in higher-order thinking about the theme across texts. Which organizing question would most effectively promote this cross-text analysis?',
    options: [
      { label: 'A', text: '"In which story did you feel most connected to the main character, and why?"' },
      { label: 'B', text: '"Can you identify the rising action in each of the three stories?"' },
      { label: 'C', text: '"How does each author use the main character\'s actions and relationships to develop a distinct perspective on what it means to belong?"' },
      { label: 'D', text: '"What is the setting of each story, and how does the setting differ across the three texts?"' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. This question requires students to analyze how each author develops the theme of belonging through specific craft choices (the main character\'s actions and relationships), then compare three distinct authorial perspectives on the same theme. This is a higher-order analytical task requiring close reading of each text and synthesis across texts. Option A is incorrect because asking which character the reader connected with elicits an affective, personal response rather than cross-text literary analysis; the focus is on the reader\'s experience, not the author\'s craft. Option B is incorrect because identifying rising action in each story is a literal comprehension task focused on plot structure, not thematic analysis; it does not require comparing or analyzing the theme of belonging. Option D is incorrect because comparing settings is a literal text analysis task; while setting can contribute to theme, this question targets setting description rather than thematic development.',
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
      'After reading a chapter book aloud, a first-grade teacher asks students to retell the story using a "beginning, middle, end" framework, prompting them with: "What happened at the beginning? What was the problem? How was it solved?" This activity primarily develops students\':',
    options: [
      { label: 'A', text: 'phonemic awareness, because students must listen carefully to distinguish parts of spoken words in the teacher\'s prompts.' },
      { label: 'B', text: 'literary comprehension, specifically their understanding of narrative structure and ability to recall and sequence key story events.' },
      { label: 'C', text: 'informational text comprehension, because identifying beginning, middle, and end is a summarizing skill used primarily with non-fiction.' },
      { label: 'D', text: 'word analysis skills, because students must decode the teacher\'s questions in order to respond.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Retelling using a beginning-middle-end framework directly develops narrative comprehension by requiring students to identify and sequence key story events, recognize the central problem, and understand its resolution. This builds story grammar — students\' internalized understanding of how narratives are organized — foundational to literary text comprehension. Option A is incorrect because retelling a story is an oral comprehension and language task, not a phonemic awareness task. Option C is incorrect because the beginning-middle-end framework is applied here to a chapter book (narrative/literary text); the activity develops narrative comprehension skills. Option D is incorrect because the activity is oral; students are listening and retelling, not decoding print.',
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
    isDiagnostic: true,
    questionText:
      'A second-grade student is trying to find information about what penguins eat in a non-fiction book. The student does not know which pages contain this information. Which text feature should the teacher teach the student to use first?',
    options: [
      { label: 'A', text: 'The glossary, to look up the definition of "penguin."' },
      { label: 'B', text: 'The index, to find the specific page numbers where information about penguin diet appears.' },
      { label: 'C', text: 'The bibliography, to find additional books about penguins.' },
      { label: 'D', text: 'The captions under photographs, to gather information from pictures throughout the book.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The index is the text feature specifically designed to help readers locate information about a particular topic within a non-fiction book. Alphabetically organized and cross-referenced by topic, the index provides page numbers where specific information can be found — in this case, pages about penguin diet. Option A is incorrect because the glossary provides definitions of key vocabulary; it would not direct the student to pages about diet. Option C is incorrect because the bibliography lists sources used by the author; it does not locate specific information within this book. Option D is incorrect because scanning captions throughout the book is an inefficient and unreliable way to locate specific information; the index is the appropriate tool.',
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
      'A third-grade teacher is preparing students to read a science article about how a beaver builds a dam, which explains the sequence of steps the beaver takes in order. Which graphic organizer would best help students comprehend and represent the text structure of this article?',
    options: [
      { label: 'A', text: 'A Venn diagram comparing beavers and another type of animal.' },
      { label: 'B', text: 'A timeline or flow chart that sequences the steps in the process in order.' },
      { label: 'C', text: 'A semantic map with "beaver" in the center and characteristics radiating outward.' },
      { label: 'D', text: 'A T-chart listing the advantages and disadvantages of beaver dams.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The article describes a sequential, step-by-step process — a chronological text structure. A flow chart or timeline is the graphic organizer best matched to this structure because it visually represents steps or events in order, allowing students to see the logical progression. Option A is incorrect because a Venn diagram is designed to show similarities and differences between two topics (compare/contrast structure); the article describes a process, not a comparison. Option C is incorrect because a semantic map (web) is best suited to texts organized around a central concept with multiple supporting characteristics; it does not represent sequential relationships. Option D is incorrect because a T-chart for advantages/disadvantages would be appropriate for a problem/solution or persuasive text structure, not a process/how-to text.',
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
      'A fourth-grade teacher reads aloud: "When too many nutrients enter a body of water, algae grows rapidly, covering the surface. This blocks sunlight from reaching underwater plants, which then die. Without these plants, fish and other animals lose their food source and begin to die as well." After reading, the teacher asks: "What is the most likely result of excess nutrients in water?" This question most directly targets students\':',
    options: [
      { label: 'A', text: 'literal comprehension, because the passage explicitly states that fish begin to die as a result.' },
      { label: 'B', text: 'inferential comprehension, because students must trace a chain of causal events to reach a conclusion about the overall impact not explicitly stated as a summary.' },
      { label: 'C', text: 'evaluative comprehension, because students are asked to judge whether the text\'s argument is logical.' },
      { label: 'D', text: 'text structure analysis, because identifying cause and effect requires categorizing the text\'s organizational pattern.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. While the individual steps of the causal chain are stated, the question asks for the "most likely result overall" — which requires students to synthesize the chain (nutrients → algae → blocked sunlight → plant death → animal death) and draw a broader conclusion about ecological impact. This synthesis and extended reasoning is inferential. Option A is partially applicable because fish death is mentioned, but calling the question fully literal understates its demands; synthesizing the causal chain to reach a broader conclusion is inferential. Option C is incorrect because the question does not ask students to evaluate the logic or quality of the argument. Option D is incorrect because the question targets comprehension of the causal sequence, not meta-analysis of the text\'s structural pattern.',
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
      'A fifth-grade teacher gives students two articles about school lunch nutrition — one written by a nutritionist and one written by a student food blogger. The teacher asks: "How might the author\'s background affect what information they chose to include or leave out? Do you find one source more reliable, and why?" This discussion primarily develops students\':',
    options: [
      { label: 'A', text: 'literal comprehension skills, because students must recall specific facts from each article.' },
      { label: 'B', text: 'evaluative comprehension skills, because students are analyzing the credibility, perspective, and potential bias of each author.' },
      { label: 'C', text: 'phonics skills, because the technical vocabulary in the nutrition article requires decoding.' },
      { label: 'D', text: 'summary skills, because identifying what information is included helps students paraphrase the main ideas.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Evaluative comprehension involves making judgments about the quality, credibility, and reliability of texts and authors. Asking students to consider how an author\'s background may influence information included or omitted — and to assess relative source reliability — requires critical thinking about source authority, potential bias, and the relationship between an author\'s purpose and their choices. Option A is incorrect because recalling specific facts is literal comprehension; the question here asks for judgment and analysis of sources. Option C is incorrect because phonics is a decoding skill; at fifth grade, decoding is largely automatic, and the question is about author credibility. Option D is incorrect because summarizing involves condensing key information; the question asks students to evaluate sources, not produce summaries.',
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
      'A sixth-grade social studies teacher gives students two texts about the Boston Tea Party — a textbook chapter (secondary source) and a letter written by a colonist who witnessed the event (primary source). The teacher asks students to compare what each source reveals and discusses what kinds of information each source type is best suited to provide. This activity primarily develops students\':',
    options: [
      { label: 'A', text: 'literal comprehension, because students must identify specific facts stated in both documents.' },
      { label: 'B', text: 'disciplinary literacy skills, specifically the ability to distinguish between primary and secondary sources and evaluate what each source type offers to historical understanding.' },
      { label: 'C', text: 'knowledge of informational text features, because the textbook has features like subheadings while the letter does not.' },
      { label: 'D', text: 'fluency skills, because reading two different documents simultaneously increases reading speed.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Disciplinary literacy in history involves understanding how historical knowledge is constructed and how different source types contribute different kinds of evidence. Distinguishing between primary sources (firsthand accounts) and secondary sources (textbooks written after the fact), and evaluating what each type can and cannot reveal, is a core historical thinking skill. Option A is incorrect because comparing what each source type "reveals" and evaluating each type\'s strengths goes beyond fact retrieval; it requires analysis of source type, perspective, and historical context. Option C is incorrect because, while text features are part of informational text literacy, the primary focus here is on source type and historical thinking. Option D is incorrect because fluency is a word-recognition skill unrelated to the multi-text analytical activity described.',
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
      'A fourth-grade teacher notices that students consistently struggle to differentiate between main ideas and supporting details when summarizing informational texts. Which instructional strategy would most directly address this challenge?',
    options: [
      { label: 'A', text: 'Having students highlight every sentence they find interesting in a passage.' },
      { label: 'B', text: 'Teaching students an explicit strategy: identifying what the whole paragraph is mostly about (main idea) versus specific facts that explain or support that idea (details), using a graphic organizer.' },
      { label: 'C', text: 'Reducing the length of assigned informational texts so students have less information to process.' },
      { label: 'D', text: 'Having students read informational texts silently and write down three facts they remember afterward.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Distinguishing main ideas from supporting details benefits from explicit strategy instruction combined with a visual scaffold. Teaching students a consistent process — identifying what a whole paragraph or section is "mostly about" as the main idea, then recognizing specific facts as supporting details — provides a generalizable framework. Graphic organizers make the hierarchical relationship between ideas and details visually concrete. Option A is incorrect because highlighting interesting sentences does not teach the distinction; students may highlight interesting details while missing the overarching main idea. Option C is incorrect because reducing text length avoids the challenge rather than building the skill; students need to navigate full-length informational texts. Option D is incorrect because recalling facts after reading is a recall task, not a main-idea/detail distinction task.',
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
      'A third-grade teacher reads aloud an informational passage about the water cycle. After reading, the teacher asks: "Before we read, you told me water just \'goes away\' when it gets hot. Based on what we just read, what really happens to water? What information in the text supports that?" This instructional sequence is best described as:',
    options: [
      { label: 'A', text: 'Activating and then revising background knowledge using text evidence, supporting accurate informational comprehension.' },
      { label: 'B', text: 'Testing students\' prior knowledge to grade them on what they already know before instruction.' },
      { label: 'C', text: 'Developing phonemic awareness by connecting spoken words to their meanings in a science context.' },
      { label: 'D', text: 'Modeling summarizing by asking students to restate the main idea of the passage.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. This instructional sequence demonstrates a powerful comprehension practice: activating students\' prior knowledge or misconceptions before reading, then using the text to confirm, extend, or correct that knowledge after reading. Asking students to compare their pre-reading understanding to what the text actually says and to cite specific text evidence ensures comprehension is grounded in the text and that misconceptions are explicitly addressed. Option B is incorrect because the intent is instructional, not evaluative; the teacher is using prior knowledge as a bridge to new information, not grading what students knew beforehand. Option C is incorrect because the activity involves meaning construction from informational text, not oral phoneme manipulation. Option D is incorrect because the question asks about the pre-reading misconception and what text evidence supports the correct understanding — a comprehension/schema revision activity, not a summarizing task.',
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
      'A fifth-grade class is preparing to read several articles about climate change. Several students are English learners with intermediate proficiency. Which differentiation strategy would best support their comprehension?',
    options: [
      { label: 'A', text: 'Assigning English learners shorter, simpler texts on a different topic so they are not overwhelmed by the complexity of the climate change articles.' },
      { label: 'B', text: 'Pre-teaching key academic and content vocabulary before reading and providing sentence frames for participation in text-based discussions.' },
      { label: 'C', text: 'Pairing each English learner with a fluent English speaker and asking the fluent speaker to explain the articles in simple language.' },
      { label: 'D', text: 'Allowing English learners to skip sections they do not understand and answer only the literal comprehension questions.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Pre-teaching key academic vocabulary removes the vocabulary barrier that most significantly impedes English learners\' comprehension of informational texts. Providing sentence frames for discussion scaffolds the language production English learners need to participate meaningfully in academic discourse while maintaining access to grade-level content. Option A is incorrect because assigning different, simpler topics denies English learners access to grade-level content and widens rather than closes the achievement gap; differentiation should adjust language support, not cognitive demand. Option C is incorrect because having a peer "explain" the text in simplified language bypasses students\' own reading and comprehension processes and does not build academic language or literacy skills. Option D is incorrect because allowing students to skip sections avoids the challenge rather than providing scaffolded access, and does not support language or literacy development.',
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
      'A sixth-grade teacher gives students a graphic organizer with three columns: "What I Already Know," "Questions I Have," and "What I Learned," completing the first two before reading and the third after. This graphic organizer is primarily intended to:',
    options: [
      { label: 'A', text: 'develop students\' phonological awareness by connecting oral language to written text.' },
      { label: 'B', text: 'activate prior knowledge, set a purpose for reading, and support comprehension monitoring by comparing pre-reading expectations to post-reading learning.' },
      { label: 'C', text: 'develop students\' summarizing ability, because the "What I Learned" column requires a summary of the text.' },
      { label: 'D', text: 'assess students\' prior knowledge before instruction so the teacher can determine which students to remediate.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This is the KWL (Know-Want to know-Learned) graphic organizer. Its instructional purpose is threefold: (1) activating prior knowledge before reading, which creates cognitive readiness for new information; (2) setting a purpose for reading through the questions generated; and (3) monitoring comprehension and confirming learning after reading by comparing what students wanted to know with what they actually learned. Option A is incorrect because this is a comprehension and content-learning tool, not a phonological awareness activity. Option C is incorrect because the "What I Learned" column elicits key learnings, not a formal summary; summarizing requires identifying and condensing the main ideas of the entire text. Option D is incorrect because, while the first column does reveal prior knowledge, the primary purpose is instructional (activating schema and setting purpose), not evaluative for remediation decisions.',
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
      'A fifth-grade teacher gives students an editorial about whether schools should have a longer school day and asks them to consider: (1) What is the author\'s position? (2) What types of evidence does the author use? (3) Are there perspectives or groups whose voices seem absent from this argument? Which of the following best describes the primary comprehension skill these questions develop?',
    options: [
      { label: 'A', text: 'Literal comprehension, because questions about the author\'s position can be answered by identifying the thesis statement.' },
      { label: 'B', text: 'Evaluative comprehension, including critical analysis of argument structure, evidence quality, and consideration of whose voices and perspectives are represented or absent.' },
      { label: 'C', text: 'Text structure analysis, because students are identifying whether the text uses a problem/solution or opinion/support structure.' },
      { label: 'D', text: 'Metacognitive strategy use, because asking questions before and during reading is the primary goal.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. These questions move students through increasingly sophisticated levels of critical reading: identifying the author\'s argument (higher-order literal), analyzing the type and quality of evidence (analytical), and critically examining whose perspectives are present and absent (evaluative/critical). The third question — about whose voices are missing — represents the highest level of critical reading, requiring students to consider what the text does not say and why. Option A is incorrect because, while the author\'s position can sometimes be identified literally, the questions as a whole extend well beyond literal comprehension. Option C is incorrect because, while structural awareness is a component, the questions here focus on argument quality and perspective, not primarily on identifying organizational patterns. Option D is incorrect because the primary skill developed by these specific questions is evaluative and critical comprehension, not the metacognitive act of questioning itself.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0008 — Assessment of Reading Development  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher conducts a running record. The text reads: "The children played in the garden all afternoon." The student reads: "The children played in the yard all afternoon." The student\'s substitution of "yard" for "garden" is best characterized as:',
    options: [
      { label: 'A', text: 'A phonics error, because "yard" and "garden" share the letter g, indicating confusion about initial letter-sound correspondences.' },
      { label: 'B', text: 'A semantically acceptable substitution that preserves meaning and syntactic structure, indicating the student is reading for meaning.' },
      { label: 'C', text: 'Evidence of a significant decoding deficit because the student could not read a simple common word.' },
      { label: 'D', text: 'An error caused by a vocabulary deficit, because the student does not know what a garden is.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. In running record analysis, errors are evaluated for semantic acceptability (makes sense), syntactic acceptability (fits grammar), and visual similarity (looks like the target word). "Yard" is semantically and syntactically acceptable — it fits the meaning and grammatical slot — though not visually similar to "garden." This pattern indicates a reader actively constructing meaning using semantic/syntactic information. The instructional response should encourage the student to also check visual information. Option A is incorrect because "yard" and "garden" share only the letter r; the error does not suggest phonics confusion about initial sounds — it suggests meaning-based reading. Option C is incorrect because "garden" is a relatively common word and the substitution shows sophisticated reading behavior; this is not a decoding deficit. Option D is incorrect because choosing "yard" as a substitute demonstrates understanding of an outdoor space — it reflects vocabulary knowledge, not absence of it.',
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
      'At the beginning of the school year, a first-grade teacher administers a brief phonological awareness and letter knowledge assessment to all students to identify those who may be at risk for reading difficulties. This type of assessment is best described as:',
    options: [
      { label: 'A', text: 'A diagnostic assessment, because it identifies the specific types of reading difficulties each student has.' },
      { label: 'B', text: 'A screening assessment, because its purpose is to quickly identify students who may need additional support or closer monitoring.' },
      { label: 'C', text: 'A summative assessment, because it summarizes what students have learned at the end of a unit.' },
      { label: 'D', text: 'A norm-referenced assessment, because student scores are compared to a national sample.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Screening assessments are brief, efficient tools administered to all students at the beginning of a period to identify students who may be at risk and who need further assessment or instructional support. They are designed for universal administration and do not provide detailed diagnostic information. Option A is incorrect because a diagnostic assessment is a more in-depth, targeted tool used after screening has identified a student as potentially at risk; it is designed to pinpoint the specific nature and severity of a reading difficulty. Option C is incorrect because summative assessments measure achievement at the end of an instructional period; the described assessment occurs at the beginning of the year. Option D is incorrect because norm-referenced is a property of standardized test scoring (comparing to a norm group), not a purpose or type of assessment.',
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
      'A third-grade teacher administers a reading fluency assessment to all students every six weeks and uses the results to adjust small-group instruction. This type of assessment is best described as:',
    options: [
      { label: 'A', text: 'Summative, because it occurs at regular intervals throughout the year.' },
      { label: 'B', text: 'Norm-referenced, because it compares students\' fluency rates to grade-level benchmarks.' },
      { label: 'C', text: 'Formative progress monitoring, because it is used on an ongoing basis to track students\' growth and inform instructional adjustments.' },
      { label: 'D', text: 'Diagnostic, because oral reading fluency assessments can identify the specific cause of a student\'s reading difficulty.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Progress monitoring is a form of formative assessment administered regularly throughout an instructional period to track students\' growth and to evaluate whether current instruction is effective. The teacher\'s six-week fluency assessments used to adjust small-group instruction is a textbook example of progress monitoring. Option A is incorrect because summative assessments are used to evaluate achievement at the end of an instructional period; frequent mid-year assessments used to adjust instruction are formative. Option B is incorrect because norm-referenced is a characteristic of scoring structure; the defining characteristic here is its use for ongoing progress monitoring. Option D is incorrect because while oral reading fluency data can sometimes suggest decoding difficulties, it does not by itself diagnose the specific cause; targeted diagnostic instruments are needed.',
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
      'A standardized reading assessment was normed on a large national sample. A second-grade student scores at the 72nd percentile. Which of the following is the most accurate interpretation?',
    options: [
      { label: 'A', text: 'The student answered 72% of the questions correctly.' },
      { label: 'B', text: 'The student scored as well as or better than 72% of the students in the norming sample who took this test.' },
      { label: 'C', text: 'The student is performing at the 72nd week of the school year in reading development.' },
      { label: 'D', text: 'The student needs to improve by 28 points to reach a passing score.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. On a norm-referenced assessment, a percentile score indicates how a student performed relative to the norming group. A score at the 72nd percentile means the student performed as well as or better than 72% of the comparison group. This is a relative comparison, not a measure of absolute performance or mastery. Option A is incorrect because a percentile rank is not the same as a percent-correct score; those are different metrics. Option C is incorrect because percentile scores have no relationship to the school calendar. Option D is incorrect because norm-referenced scores do not have a "passing score" in the same way criterion-referenced tests do; percentile ranks indicate relative standing.',
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
      'A reading specialist explains that a test used for reading assessment has high validity but questionable reliability. Which of the following most accurately describes what this means?',
    options: [
      { label: 'A', text: 'The test measures reading skills accurately, but scores may vary significantly from one administration to the next, even without real changes in student performance.' },
      { label: 'B', text: 'The test produces consistent scores across administrations but does not actually measure reading skills effectively.' },
      { label: 'C', text: 'The test is valid for use with some students but not for students from certain cultural backgrounds.' },
      { label: 'D', text: 'The test has high reliability but the validity is still being studied and confirmed.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Validity refers to whether a test measures what it is intended to measure (reading skills). Reliability refers to whether the test produces consistent, stable results across administrations. A test with high validity but questionable reliability does assess reading skills, but the scores fluctuate inconsistently — the same student might score very differently on two administrations without any real change in reading ability. This limits the usefulness of scores for instructional decision-making. Option B is incorrect because it reverses the definitions: consistent scores with ineffective measurement describes high reliability but low validity. Option C is incorrect because cultural bias relates to validity and fairness, not a relationship between validity and reliability as described. Option D is incorrect because it contradicts the premise: the question states the reliability is questionable, not the validity.',
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
      'A reading teacher administers a pseudoword assessment to second-grade students, having them read aloud words such as "nup," "frelt," and "cloamish." What is the primary purpose of using pseudowords rather than real words in this assessment?',
    options: [
      { label: 'A', text: 'Pseudowords are used because they are shorter and therefore easier for young children to read than real words.' },
      { label: 'B', text: 'Pseudowords are used to isolate and assess students\' phonics decoding skills without the confounding influence of whole-word memorization, because students cannot have previously memorized a nonword.' },
      { label: 'C', text: 'Pseudowords are used to develop vocabulary because students are more likely to remember nonsense words than real words.' },
      { label: 'D', text: 'Pseudowords are used to assess comprehension, because a student who understands language will be unable to make sense of them.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The defining purpose of pseudoword assessments is to measure phonics decoding skill in pure form. Because students have never encountered these fabricated words before, they cannot have memorized them as whole words; the only way to read them is to apply letter-sound correspondence knowledge. This makes pseudoword reading a "clean" measure of decoding ability, uncontaminated by sight word memory. If students can decode nonsense words fluently and accurately, they demonstrate that they have internalized phonics patterns and can apply them to novel items. Option A is incorrect because pseudowords range in length and complexity; length is not the rationale for using them. Option C is incorrect because pseudoword assessments are not vocabulary tools; they measure phonics knowledge. Option D is incorrect because pseudowords are used to assess decoding, not comprehension.',
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
      'A first-grade teacher administers an informal phonics inventory at the beginning of the year. Student A reads CVC words and consonant digraphs accurately but makes frequent errors on consonant blends. Student B makes errors on all short vowel patterns, including simple CVC words. Which grouping decision is most appropriate?',
    options: [
      { label: 'A', text: 'Place both students in the same group because they both made errors, and teach a general review of phonics from the beginning.' },
      { label: 'B', text: 'Place Student A and Student B in different instructional groups — Student B needs instruction beginning with CVC short vowel patterns, while Student A is ready for instruction on consonant blends.' },
      { label: 'C', text: 'Place both students in the same group with grade-level students because phonics differences even out naturally by the end of first grade.' },
      { label: 'D', text: 'Refer Student B immediately for a reading disability evaluation because errors on CVC words in first grade always indicate a reading disorder.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Phonics assessment data should drive targeted, differentiated grouping decisions. Student A has a specific higher-level need (consonant blends) and has mastered foundational patterns. Student B has not yet mastered basic CVC patterns and needs instruction beginning at a more foundational level. Placing these students in different instructional groups aligned with their individual phonics knowledge ensures each receives appropriately targeted instruction. Option A is incorrect because beginning a general review "from the beginning" would be unnecessary and boring for Student A, who has already mastered early patterns. Option C is incorrect because phonics skill differences do not automatically resolve by year-end; students who do not receive targeted instruction in their specific areas of need are likely to fall further behind. Option D is incorrect because errors on CVC words in early first grade do not by themselves warrant a reading disability referral; explicit instruction typically closes this gap quickly.',
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
      'A kindergarten teacher uses a structured oral retelling task to assess students\' comprehension of stories read aloud. One student consistently retells only isolated literal details ("The bear was big. He had a house.") but never connects events or mentions how the problem was resolved. This retelling pattern most directly suggests a need for instruction in:',
    options: [
      { label: 'A', text: 'decoding skills, because the student cannot read the story independently and is therefore missing key events.' },
      { label: 'B', text: 'phonemic awareness, because the student is struggling to hear the individual sounds in the teacher\'s read-aloud.' },
      { label: 'C', text: 'story grammar and narrative text structure, specifically understanding how story events connect causally and how plot problems lead to resolutions.' },
      { label: 'D', text: 'vocabulary, because the student cannot retell the story in detail due to limited knowledge of the words used.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The student\'s retelling reveals understanding of isolated story facts but lack of understanding of the causal and narrative structure that connects those facts — specifically, how events relate to one another and how the problem is resolved. This is a story grammar deficit. Instruction in story elements (character, setting, problem, events, resolution) and how they connect will directly address this gap. Option A is incorrect because the task is an oral retelling after a teacher read-aloud; decoding is irrelevant. Option B is incorrect because phonemic awareness involves processing individual phonemes; the student\'s comprehension difficulty is at the narrative structure level. Option D is incorrect because the student does retell some story content, suggesting vocabulary is sufficient; the gap is in narrative structure understanding.',
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
      'A second-grade teacher reviews a schoolwide reading assessment. A student shows: strong oral vocabulary, accurate comprehension of read-alouds, but well-below-grade-level word reading accuracy on both real words and pseudowords. Which reading difficulty profile does this student most closely fit, and what assessment should the teacher conduct next?',
    options: [
      { label: 'A', text: 'Profile 1 (good decoding, weak language/comprehension); the teacher should administer a background knowledge assessment.' },
      { label: 'B', text: 'Profile 2 (weak decoding/word recognition, strong word knowledge and comprehension); the teacher should administer a diagnostic phonics inventory to identify specific decoding gaps.' },
      { label: 'C', text: 'Profile 3 (weak in both decoding and language/comprehension); the teacher should administer a broad language development assessment.' },
      { label: 'D', text: 'No profile applies because reading below grade level indicates a general learning disability requiring special education evaluation.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This student\'s profile — strong oral vocabulary, good comprehension when listening, but very weak word reading accuracy on both real words and pseudowords — is characteristic of Profile 2: a specific word recognition deficit. This student has strong language and comprehension skills but cannot decode print accurately. The pseudoword data specifically indicate that the deficit is in phonics-based decoding. The most appropriate next assessment is a diagnostic phonics inventory to identify which phonics patterns the student has and has not mastered. Option A is incorrect because Profile 1 describes a student who decodes well but has weak language and comprehension; this student is the opposite. Option C is incorrect because Profile 3 describes weakness in both decoding AND language/comprehension; this student has strong language and comprehension. Option D is incorrect because specific word recognition difficulties are very common and often respond well to targeted phonics intervention; referral for special education evaluation is premature without first providing evidence-based intervention.',
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
      'A teacher is assessing first-grade students who are making progress in phonics. To appropriately challenge advanced readers, she wants to extend the assessment. Which modification would best serve this purpose?',
    options: [
      { label: 'A', text: 'Giving advanced readers the same assessment as all other students and comparing their scores to the class average.' },
      { label: 'B', text: 'Giving advanced readers an extended version of the phonics inventory that includes more complex patterns (e.g., vowel teams, r-controlled vowels, multisyllabic words) to determine the ceiling of their phonics knowledge.' },
      { label: 'C', text: 'Excusing advanced readers from phonics assessment because their reading level indicates they no longer need phonics instruction.' },
      { label: 'D', text: 'Having advanced readers take an oral reading fluency assessment instead, because fluency is the appropriate focus for advanced readers.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. For advanced readers, a standard phonics assessment may produce ceiling effects, where the student gets everything correct and the teacher cannot determine what more advanced skills they have or still need. Extending the assessment to include more complex patterns reveals the actual ceiling of each student\'s phonics knowledge, enabling the teacher to plan instruction that continues to challenge them. Option A is incorrect because comparing an advanced reader\'s scores to the class average on a mastered assessment does not yield actionable new instructional information. Option C is incorrect because advanced phonics ability does not eliminate the need for phonics assessment; advanced readers still benefit from instruction in more complex patterns. Option D is incorrect because fluency assessment serves a different purpose than phonics assessment; switching to fluency assessment forecloses potentially important diagnostic information about complex phonics patterns.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OBJECTIVE 0009 — Reading Instruction Principles  (11 questions)
  // ══════════════════════════════════════════════════════════════════════════

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher works with a small group of students who need additional support in phonics and fluency. This group meets with the teacher four times per week for 30 minutes of targeted instruction in addition to the whole-class literacy block. According to the Multi-Tiered Systems of Support (MTSS) model, this support is best described as:',
    options: [
      { label: 'A', text: 'Tier 1 instruction, because all students benefit from phonics and fluency practice.' },
      { label: 'B', text: 'Tier 2 intervention, because it provides supplemental, small-group, targeted instruction in areas of identified need for students who did not respond sufficiently to Tier 1 instruction.' },
      { label: 'C', text: 'Tier 3 intervention, because it involves more frequent sessions than the whole-class instruction block.' },
      { label: 'D', text: 'Special education services, because only students with IEPs should receive instruction outside the regular classroom.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. In the MTSS model, Tier 2 provides supplemental, targeted small-group intervention for students who have not made adequate progress with Tier 1 (whole-class, evidence-based) instruction. Tier 2 is characterized by smaller group sizes (3–5 students), more frequent sessions, more targeted instruction aligned to specific skill needs, and ongoing progress monitoring. Option A is incorrect because Tier 1 refers to high-quality, whole-class instruction for all students; the small targeted group described here is supplemental. Option C is incorrect because Tier 3 is more intensive — typically individual or very small group (1–3 students) for students who have not responded to Tier 2; meeting four times per week in a small group is consistent with Tier 2. Option D is incorrect because Tier 2 MTSS interventions are general education services; special education eligibility requires a separate evaluation process.',
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
      'A kindergarten teacher observes students who can follow along with predictable text using picture clues and track words with a finger during shared reading, but when given a new short text with no picture support, they make attempts to read using only the first letter of each word. According to research on phases of word reading development, these students are most likely in the:',
    options: [
      { label: 'A', text: 'Pre-alphabetic phase, because they cannot use any letter-sound information to read words.' },
      { label: 'B', text: 'Partial alphabetic phase, because they are using some letter-sound information (first letter) but not fully attending to all letters in words.' },
      { label: 'C', text: 'Full alphabetic phase, because they demonstrate awareness of the alphabetic principle by using letters to identify words.' },
      { label: 'D', text: 'Consolidated alphabetic phase, because they are using their knowledge of frequently encountered patterns to read.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The partial alphabetic phase is characterized by students using some letter-sound information — typically the initial consonant — to recognize words, but not yet fully processing all phonemes in the word. The described behavior (using only the first letter as a reading cue) is a defining characteristic of this phase. Option A is incorrect because in the pre-alphabetic phase, students cannot use letter-sound information at all; the students described are attempting to use initial letter sounds, placing them in the partial alphabetic phase. Option C is incorrect because the full alphabetic phase is characterized by systematic, complete phoneme-by-phoneme decoding of all letters, not just the first. Option D is incorrect because the consolidated alphabetic phase involves using knowledge of larger word patterns and morphemes to efficiently decode; this represents significantly more advanced word reading than what is described.',
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
      'A fifth-grade teacher evaluates text complexity using a Lexile score (quantitative measure), literary quality and knowledge demands (qualitative measures), and whether the text is appropriate for this class given the lesson\'s purpose (reader-and-task considerations). This framework reflects which principle of effective reading instruction?',
    options: [
      { label: 'A', text: 'Text complexity should be determined solely by Lexile score so that teachers have an objective, consistent metric for selection.' },
      { label: 'B', text: 'Text complexity is best determined by three interrelated dimensions — quantitative, qualitative, and reader-and-task considerations — and no single dimension is sufficient on its own.' },
      { label: 'C', text: 'Text complexity should always match the student\'s independent reading level to ensure confidence and prevent frustration.' },
      { label: 'D', text: 'Text complexity considerations are only relevant for informational texts; literary texts should be selected purely on literary quality.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The three-part framework for text complexity — (1) quantitative measures such as Lexile, (2) qualitative measures such as levels of meaning, knowledge demands, and language complexity, and (3) reader-and-task considerations (specific students and purposes for reading) — reflects the current research consensus that no single metric is sufficient. A text with a high Lexile score may be qualitatively accessible due to clear structure; a low Lexile text may be qualitatively demanding due to figurative language. Option A is incorrect because Lexile scores capture only quantitative features; texts with the same Lexile score can vary enormously in qualitative complexity. Option C is incorrect because close reading intentionally uses complex, grade-level texts — not independent-level texts; the instructional scaffolding provided makes challenging text accessible. Option D is incorrect because text complexity applies equally to literary and informational texts.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'easy' as const,
    isPublished: true,
    isDiagnostic: true,
    questionText:
      'According to the research base on effective reading instruction, which of the following identifies the five major components of reading that should all be addressed in a comprehensive reading program?',
    options: [
      { label: 'A', text: 'Grammar, spelling, phonics, writing, and listening' },
      { label: 'B', text: 'Phonemic awareness, phonics, fluency, vocabulary, and text comprehension' },
      { label: 'C', text: 'Sight words, decoding, fluency, summarizing, and writing' },
      { label: 'D', text: 'Letter naming, phonics, fluency, oral language, and background knowledge' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The National Reading Panel identified five major components as essential to a comprehensive, evidence-based reading program: phonemic awareness, phonics, fluency, vocabulary, and text comprehension. This framework is the foundation for effective reading instruction and curriculum design. Option A is incorrect because grammar, spelling, and writing, while related literacy skills, are not the five major reading components; phonemic awareness and text comprehension are missing. Option C is incorrect because summarizing is a comprehension strategy, not a major reading component; sight words are a subset of phonics/word recognition; and the five major components as researched include phonemic awareness. Option D is incorrect because letter naming, while part of emergent literacy, is not one of the five major components; oral language and background knowledge are important supports but are not among the five specifically identified components.',
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
      'A fourth-grade teacher conducts a close reading lesson in which students read a complex informational passage about the Lewis and Clark expedition. The teacher asks text-dependent questions such as: "What evidence does the author provide that the expedition faced significant hardships? Which words or phrases convey the difficulty of the journey?" This approach primarily develops students\':',
    options: [
      { label: 'A', text: 'phonics skills, because students encounter many unfamiliar multisyllabic words related to historical events.' },
      { label: 'B', text: 'ability to construct meaning from complex text using textual evidence, through careful analysis of the author\'s word choices and supporting details.' },
      { label: 'C', text: 'oral language skills, because the discussion requires students to speak in front of their peers.' },
      { label: 'D', text: 'creative writing skills, because analyzing the author\'s style will help students write their own historical accounts.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Close reading involves careful, repeated examination of a complex text through text-dependent questions that require students to return to the text for evidence rather than relying on background knowledge or personal opinion. The teacher\'s questions — asking for specific textual evidence and analysis of word choices — are prototypical close reading questions that develop students\' ability to construct meaning from complex text. Option A is incorrect because, while multisyllabic vocabulary may present some decoding challenges, the instructional focus of this lesson is comprehension and textual analysis, not phonics instruction. Option C is incorrect because, while oral discussion is a component, the primary skill developed is reading comprehension through textual analysis. Option D is incorrect because the lesson focuses on comprehension of a historical text, not on developing creative writing skills.',
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
      'A third-grade teacher uses flexible grouping for reading instruction. After analyzing recent phonics assessment results, the teacher restructures small groups so that students with similar phonics skill levels are grouped together for targeted phonics instruction, while maintaining heterogeneous groups for whole-class read-alouds and literature discussion. Which of the following best justifies this approach?',
    options: [
      { label: 'A', text: 'Homogeneous grouping for phonics ensures instruction is precisely targeted to where each group is in the phonics scope and sequence, while heterogeneous grouping for discussion exposes all students to diverse perspectives and higher-level language.' },
      { label: 'B', text: 'Homogeneous grouping for all instruction is always superior because it allows teachers to move at a single pace for all students.' },
      { label: 'C', text: 'Flexible grouping is used to permanently sort students by ability, which is the most efficient way to manage a reading classroom.' },
      { label: 'D', text: 'Heterogeneous grouping should always be used for phonics instruction because students learn phonics best from more advanced peers.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Flexible grouping means forming groups strategically for specific instructional purposes and reconstituting them as student needs change. For skill-based instruction like phonics, homogeneous grouping ensures each student receives appropriately pitched instruction. For comprehension, discussion, and literary analysis, heterogeneous grouping enriches discussion with diverse perspectives and language models. Option B is incorrect because homogeneous grouping for all instruction ignores that students have different strengths across different skills; a student needing phonics support may have strong comprehension skills underserved in a homogeneous group for all activities. Option C is incorrect because flexible grouping is explicitly NOT permanent ability tracking; groups should change regularly, and flexibility is essential to prevent negative effects of static ability grouping. Option D is incorrect because phonics instruction is most effective when precisely calibrated to the student\'s current skill level.',
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
      'A teacher wants to develop students\' motivation and self-efficacy as readers. Which classroom practice would most effectively support this goal?',
    options: [
      { label: 'A', text: 'Allowing students to choose at least some of their independent reading books based on their own interests, and having brief, low-stakes conversations with students about what they are reading.' },
      { label: 'B', text: 'Assigning all students the same books and requiring detailed book reports to ensure accountability.' },
      { label: 'C', text: 'Posting students\' reading scores on a public chart so they can see how they compare to their classmates.' },
      { label: 'D', text: 'Restricting access to books at students\' independent level until they have demonstrated mastery of all grade-level skills.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Correct Response: A. Motivation and self-efficacy as readers are most strongly supported when students experience autonomy in reading (choosing their own books), feel that reading is personally relevant and enjoyable, and receive positive, low-stakes feedback from a caring teacher. Choice in independent reading is one of the most well-supported motivational practices in reading research. Option B is incorrect because mandatory uniform assignments with detailed reports can create an association between reading and compliance rather than pleasure. Option C is incorrect because publicly displaying comparative scores can harm the self-efficacy and motivation of students who are not performing at the top. Option D is incorrect because withholding books until skills are mastered creates barriers to reading access and undermines the development of positive reading habits and identity.',
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
      'A reading specialist argues that reading instruction should be integrated across the language arts — reading, writing, listening, and speaking — rather than taught in isolated, separate blocks. Which of the following best justifies this argument?',
    options: [
      { label: 'A', text: 'Integration is primarily a time-management strategy that allows teachers to cover more curriculum in a shorter period.' },
      { label: 'B', text: 'The language arts are mutually reinforcing: writing strengthens reading comprehension, speaking and listening develop vocabulary and academic language, and reading develops the background knowledge that supports oral communication.' },
      { label: 'C', text: 'Integration is only beneficial for advanced readers who already have foundational skills and can apply them across contexts.' },
      { label: 'D', text: 'Integrated instruction allows teachers to avoid phonics instruction, which is less effective when taught in isolation from other language arts skills.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The research base consistently supports the view that the language arts are interrelated processes that mutually support each other. Writing about a text deepens reading comprehension; oral discussion develops academic vocabulary and language structures; listening to read-alouds builds knowledge and vocabulary; and wide reading builds content knowledge supporting all other literacy skills. An integrated literacy model treats these skills as interdependent, which mirrors how language is actually used. Option A is incorrect because the rationale for integration is not primarily time management but the empirical finding that skills are mutually reinforcing. Option C is incorrect because integrated instruction benefits all learners; struggling readers especially benefit from discussing texts orally before reading or writing about them. Option D is incorrect because integrated instruction does not eliminate the need for explicit phonics instruction; systematic, explicit phonics remains essential within an integrated literacy model.',
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
      'A third-grade teacher has three students reading well below grade level in both word recognition and reading comprehension. Two of these students also have significant delays in oral language expression and listening comprehension. Which instructional plan most effectively addresses all three students\' needs while keeping them connected to grade-level content?',
    options: [
      { label: 'A', text: 'Group all three students together for all reading instruction using texts at their independent level, so they experience consistent success and avoid frustration.' },
      { label: 'B', text: 'For phonics and word recognition, use decodable texts at their instructional level with explicit, systematic instruction; for comprehension, use grade-level complex texts during teacher read-alouds combined with discussion, vocabulary instruction, and language scaffolds for the two students with oral language delays.' },
      { label: 'C', text: 'Focus exclusively on remediation of phonics and word recognition until the students reach grade level before introducing comprehension instruction.' },
      { label: 'D', text: 'Refer all three students immediately for special education evaluation because reading and language delays at third grade always require specialized services.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. This approach simultaneously addresses both instructional needs (word recognition and comprehension) rather than treating them as sequential. Using decodable texts at the instructional level for phonics practice builds the word recognition foundation, while using grade-level complex texts through teacher read-alouds maintains access to grade-appropriate content and language. The language scaffolds specifically address the oral language delays of the two students who have that additional need. This plan is evidence-based, comprehensive, and inclusive. Option A is incorrect because using only independent-level texts denies students access to grade-level knowledge and language; appropriate-level texts are essential for phonics practice but not for comprehension instruction. Option C is incorrect because comprehension and oral language development cannot wait for phonics mastery; knowledge and vocabulary development must continue in parallel. Option D is incorrect because reading and language delays in third grade are common and do not automatically indicate special education eligibility; evidence-based intensive general education intervention should be the first response.',
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
      'A teacher uses a digital platform that allows students to listen to recorded read-alouds while following along with highlighted text on the screen. This tool is most useful for supporting which instructional goal?',
    options: [
      { label: 'A', text: 'Developing print-concept awareness by showing that text moves from left to right and top to bottom.' },
      { label: 'B', text: 'Supporting access to grade-level texts and vocabulary for students whose decoding skills are still developing, while reinforcing the connection between spoken and written words.' },
      { label: 'C', text: 'Replacing the need for a teacher read-aloud because the technology provides the same quality of instruction.' },
      { label: 'D', text: 'Developing phonemic awareness by exposing students to the sounds of words as they are read aloud.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Digital read-aloud platforms that synchronize audio with highlighted text are particularly valuable for students who have stronger listening comprehension than decoding ability. By hearing the text read aloud while seeing words highlighted, these students can access grade-level content and vocabulary without being blocked by decoding difficulty, while also seeing print-sound relationships reinforced in context. Option A is incorrect because while the highlighted synchronized text does reinforce print directionality, the primary instructional value is access to grade-level text, not concepts of print. Option C is incorrect because technology does not replicate the interactive, responsive nature of a teacher read-aloud; teachers can pause, respond to student reactions, and provide real-time scaffolding that a recording cannot. Option D is incorrect because phonemic awareness is an oral task requiring manipulation of phonemes in spoken words; hearing words read aloud does not constitute phonemic awareness instruction.',
  },

]

// ─── SEED FUNCTION ─────────────────────────────────────────────────────────

async function seed() {
  await connectDB()
  console.log('Connected to MongoDB.')

  // Safety check
  const existingTest = await PracticeTest.findOne({ examCode: '190', testNumber: 1, isDiagnostic: false })
  if (existingTest) {
    console.log('Practice Test 1 (examCode=190) already exists. Aborting to avoid duplicates.')
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
    testNumber: 1,
    name: 'Practice Test 1',
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

  console.log(`Practice Test 1 created: ${practiceTest._id}`)
  console.log('Done. Set isPublished=true in MongoDB when ready to go live.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
