export interface QuizQuestion {
  id: string
  question: string
  options: { A: string; B: string; C: string; D: string }
  correct: 'A' | 'B' | 'C' | 'D'
  explanation: string
}

export const studyGuideQuizzes: Record<'I' | 'II' | 'III', QuizQuestion[]> = {
  I: [
    {
      id: 'I-1',
      question: 'Which of the following is a phonemic awareness task rather than a phonological awareness task?',
      options: {
        A: 'Clapping the syllables in the word "butterfly"',
        B: 'Identifying that "cat" and "bat" rhyme',
        C: 'Blending the isolated sounds /s/ /t/ /ɒ/ /p/ to say "stop"',
        D: 'Sorting picture cards by the first sound heard',
      },
      correct: 'C',
      explanation: 'Phonemic awareness works exclusively at the individual phoneme level. Blending phonemes (/s/ /t/ /ɒ/ /p/ → "stop") is a phonemic task. Clapping syllables, identifying rhymes, and sorting by onset all work with larger sound units — making them phonological awareness tasks, not phonemic.',
    },
    {
      id: 'I-2',
      question: 'A teacher asks, "Say \'cat\' — now say it again but leave out the /k/." This task is best described as:',
      options: {
        A: 'Phoneme blending',
        B: 'Onset-rime substitution',
        C: 'Phoneme deletion',
        D: 'Syllable segmentation',
      },
      correct: 'C',
      explanation: 'Phoneme deletion requires removing a specific phoneme from a spoken word ("cat" minus /k/ = "at"). This is one of the most advanced phonemic awareness skills, along with phoneme substitution and reversal — all forms of phoneme manipulation.',
    },
    {
      id: 'I-3',
      question: 'Which sequence correctly orders phonemic awareness skills from easiest to most difficult?',
      options: {
        A: 'Manipulation → Blending → Segmentation',
        B: 'Blending → Segmentation → Manipulation',
        C: 'Segmentation → Manipulation → Blending',
        D: 'Blending → Manipulation → Segmentation',
      },
      correct: 'B',
      explanation: 'Research supports this developmental progression: blending (putting sounds together) is typically easiest, segmentation (taking a word apart into individual sounds) comes next, and manipulation (deleting, substituting, reversing phonemes) is the most complex. Instruction should generally follow this sequence.',
    },
    {
      id: 'I-4',
      question: 'The alphabetic principle is BEST defined as:',
      options: {
        A: 'The rule that each letter has exactly one corresponding sound',
        B: 'The understanding that letters and letter combinations systematically represent spoken sounds',
        C: 'The knowledge that print is read from left to right and top to bottom',
        D: 'The ability to recognize all 26 letters by name and shape',
      },
      correct: 'B',
      explanation: 'The alphabetic principle is the foundational concept that written letters represent the sounds of spoken language in a systematic way. It does NOT require one-to-one correspondence (English has many digraphs and irregular patterns), but it does require understanding that the system is code-based and learnable.',
    },
    {
      id: 'I-5',
      question: 'A student reads the word "phone" by saying five separate sounds: /p/ /h/ /o/ /n/ /e/. This error suggests the student lacks knowledge of:',
      options: {
        A: 'Phoneme blending',
        B: 'Digraphs',
        C: 'Onset-rime',
        D: 'Phoneme segmentation',
      },
      correct: 'B',
      explanation: 'A digraph is two letters that represent a single phoneme (e.g., "ph" = /f/; "sh" = /ʃ/). The student is treating "ph" as two separate sounds, which is a phonics — not phonemic awareness — error. The student needs explicit instruction that these two letters combine to make one sound.',
    },
    {
      id: 'I-6',
      question: 'Systematic, explicit phonics instruction differs from embedded phonics because systematic phonics:',
      options: {
        A: 'Uses authentic literature rather than decodable text',
        B: 'Teaches letter-sound correspondences only when students ask about them',
        C: 'Presents letter-sound patterns in a deliberate sequence from simple to complex',
        D: 'Focuses on whole-word recognition rather than individual sounds',
      },
      correct: 'C',
      explanation: 'Systematic explicit phonics follows a carefully planned scope and sequence — moving from simple (single consonants, short vowels) to complex (digraphs, blends, diphthongs). Embedded phonics teaches patterns incidentally when they appear in reading, which is less effective for students who need direct instruction.',
    },
    {
      id: 'I-7',
      question: 'A teacher uses Elkonin (sound) boxes, having students push a token into a separate box for each phoneme as they say a word. This activity primarily develops:',
      options: {
        A: 'Phoneme blending',
        B: 'Phoneme segmentation',
        C: 'Fluency',
        D: 'Phoneme deletion',
      },
      correct: 'B',
      explanation: 'Elkonin boxes (also called sound boxes or push-it-say-it) require students to identify and physically represent each individual phoneme in a word — this is phoneme segmentation. The boxes can also be adapted for spelling by adding letters, bridging from phonemic awareness into phonics.',
    },
    {
      id: 'I-8',
      question: 'Reading fluency is BEST defined as:',
      options: {
        A: 'Decoding accuracy: reading every word without error',
        B: 'The speed at which a student can identify individual letters',
        C: 'Reading connected text with appropriate rate, accuracy, and prosody',
        D: 'A student\'s ability to comprehend grade-level text',
      },
      correct: 'C',
      explanation: 'Fluency encompasses three components: accuracy (decoding words correctly), rate (reading at an appropriate pace), and prosody (reading with expression, phrasing, and intonation that reflects meaning). All three are required — a fast but monotone reader, or a slow but accurate reader, is not yet fluent.',
    },
    {
      id: 'I-9',
      question: 'A student is timed reading a 100-word passage aloud. She reads 82 words correctly in one minute. The teacher is conducting a:',
      options: {
        A: 'Phonics screening assessment',
        B: 'Phonemic awareness probe',
        C: 'Words correct per minute (WCPM) oral reading fluency measure',
        D: 'Vocabulary inventory',
      },
      correct: 'C',
      explanation: 'Words correct per minute (WCPM) is the standard metric for oral reading fluency assessments. It counts only correctly read words per minute — errors reduce the score. WCPM norms by grade level help identify students who are below benchmark and may need fluency intervention.',
    },
    {
      id: 'I-10',
      question: 'A second-grade student reads accurately but very slowly, without expression, and in a choppy word-by-word manner. The MOST appropriate intervention is:',
      options: {
        A: 'Additional phoneme segmentation drills',
        B: 'Repeated reading with a fluent model and performance feedback',
        C: 'Morpheme analysis instruction',
        D: 'Increasing daily independent silent reading time',
      },
      correct: 'B',
      explanation: 'Repeated reading — hearing a fluent model, then re-reading the same passage multiple times with feedback — is the evidence-based intervention for exactly this fluency profile: accurate but disfluent. Phoneme drills address earlier phonemic awareness skills the student has already mastered; morpheme analysis is a vocabulary strategy; independent silent reading does not provide the corrective feedback needed.',
    },
  ],

  II: [
    {
      id: 'II-1',
      question: 'A teacher explicitly pre-teaches the word "metamorphosis" before a unit on the life cycle of butterflies. This best exemplifies:',
      options: {
        A: 'Incidental vocabulary learning through context',
        B: 'Contextual word analysis strategies',
        C: 'Direct vocabulary instruction',
        D: 'Wide reading for vocabulary growth',
      },
      correct: 'C',
      explanation: 'Directly teaching a specific word before reading — defining it, showing examples, providing student practice — is direct vocabulary instruction. Research shows it is the most reliable method for ensuring students learn specific target words, especially academic and domain-specific terms they are unlikely to encounter frequently.',
    },
    {
      id: 'II-2',
      question: 'Tier 2 vocabulary words are BEST described as:',
      options: {
        A: 'Basic, everyday conversational words most children know by kindergarten',
        B: 'High-frequency academic words used across many subjects and texts',
        C: 'Highly technical, subject-specific terms used only in one discipline',
        D: 'Sight words that cannot be decoded phonetically',
      },
      correct: 'B',
      explanation: 'Beck\'s three-tier model: Tier 1 = basic conversational words (dog, run); Tier 2 = high-utility academic words that appear across many subjects and texts (analyze, significant, contrast, evidence); Tier 3 = specialized domain vocabulary (photosynthesis, mitosis). Tier 2 words are the highest instructional priority because they appear frequently but are rarely defined in context.',
    },
    {
      id: 'II-3',
      question: 'A teacher asks students to compare the overall meaning of a poem to what they felt when reading it. This type of reading is called:',
      options: {
        A: 'Literal comprehension',
        B: 'Efferent reading',
        C: 'Aesthetic reading',
        D: 'Critical analysis',
      },
      correct: 'C',
      explanation: 'Rosenblatt\'s transactional theory distinguishes efferent reading (reading to extract information — what you take away) from aesthetic reading (reading for the lived-through experience — feelings, images, emotions evoked). Asking students what they felt while reading a poem is promoting aesthetic engagement. Both are valid and should be cultivated.',
    },
    {
      id: 'II-4',
      question: '"Compare and contrast," "cause and effect," and "problem and solution" are examples of:',
      options: {
        A: 'Literary devices such as metaphor and foreshadowing',
        B: 'Informational text structures',
        C: 'Narrative text elements',
        D: 'Phonics scope and sequence patterns',
      },
      correct: 'B',
      explanation: 'These are the five major informational text structures: description, sequence, compare/contrast, cause/effect, and problem/solution. Teaching students to identify text structure improves comprehension because it reveals how information is organized. Signal words (however, therefore, as a result) help readers identify structure.',
    },
    {
      id: 'II-5',
      question: 'A student retells a story identifying the main character, the central problem, key events in sequence, and how the problem is resolved. This demonstrates mastery of:',
      options: {
        A: 'Inferential comprehension skills',
        B: 'Vocabulary and academic language',
        C: 'Narrative text structure — story grammar elements',
        D: 'Critical evaluation of an author\'s craft',
      },
      correct: 'C',
      explanation: 'Story grammar refers to the structural elements common to narratives: characters, setting, problem/conflict, events/rising action, climax, and resolution. A student who can retell all these elements in sequence demonstrates understanding of narrative text structure, which is a foundational comprehension skill for literary text.',
    },
    {
      id: 'II-6',
      question: 'A teacher asks students, "Why did the author include this bar graph? What argument does it support?" This question targets:',
      options: {
        A: 'Phonics and word recognition',
        B: 'Reading fluency',
        C: 'Basic literal comprehension',
        D: 'Critical reading of informational text — author\'s purpose and use of evidence',
      },
      correct: 'D',
      explanation: 'Asking students to evaluate why an author includes a specific text feature and how it supports an argument is critical/analytical reading. This goes beyond literal comprehension (what does it say?) to evaluative comprehension (why is it here? how does it function?). Informational text features like charts, diagrams, and sidebars deserve the same analytical attention as written prose.',
    },
    {
      id: 'II-7',
      question: 'Which instructional strategy BEST helps students activate prior knowledge before reading a new text?',
      options: {
        A: 'Oral reading fluency (WCPM) probe',
        B: 'KWL (Know / Want to Know / Learned) chart',
        C: 'Running record',
        D: 'Phonics screening',
      },
      correct: 'B',
      explanation: 'The KWL chart is a pre-reading strategy: students record what they already Know, what they Want to find out, and (after reading) what they Learned. The K and W phases explicitly activate and organize prior knowledge, creating a cognitive framework that aids comprehension. Running records and screeners are assessments, not pre-reading comprehension strategies.',
    },
    {
      id: 'II-8',
      question: 'Reading comprehension strategy instruction should PRIMARILY teach students to:',
      options: {
        A: 'Memorize reading strategies so they can name them when asked',
        B: 'Apply strategies independently and flexibly to make meaning from text',
        C: 'Use one strategy for all types of text',
        D: 'Complete comprehension worksheets after every reading assignment',
      },
      correct: 'B',
      explanation: 'The goal of comprehension strategy instruction is transfer — students independently applying strategies (predicting, questioning, summarizing, monitoring) as needed when they encounter difficulty. Strategies are tools, not ends in themselves. Teaching students to name strategies without using them flexibly produces no comprehension gain.',
    },
    {
      id: 'II-9',
      question: 'Writing about a text strengthens comprehension PRIMARILY because:',
      options: {
        A: 'Writing about a text replaces the need to re-read',
        B: 'It requires students to organize, synthesize, and express meaning — deepening processing',
        C: 'Writing practice improves phonics automaticity',
        D: 'Both reading and writing share the same high-frequency sight words',
      },
      correct: 'B',
      explanation: 'The reading-writing connection is bidirectional and research-supported. Writing about a text requires students to go beyond surface recall — they must select, organize, and articulate meaning, which deepens comprehension. Response journals, summaries, and analytical essays all leverage this connection. Requiring only multiple-choice or oral responses misses the comprehension gains that writing produces.',
    },
    {
      id: 'II-10',
      question: 'Scaffolded comprehension instruction for diverse readers (ELs, struggling readers) MOST effectively uses:',
      options: {
        A: 'Permanently reduced-complexity texts for all identified students',
        B: 'Grade-level texts with temporary, targeted supports that are gradually removed',
        C: 'Separate curriculum for EL students and native English speakers',
        D: 'Skipping vocabulary pre-teaching to save instructional time',
      },
      correct: 'B',
      explanation: 'Scaffolded instruction provides temporary, targeted support (graphic organizers, think-alouds, partner structures, pre-taught vocabulary) that allows students to access grade-level text and work toward independence. Permanently simplified texts deny access to rigorous content and limit vocabulary growth. The scaffold is always temporary — the goal is gradual release to independent application.',
    },
  ],

  III: [
    {
      id: 'III-1',
      question: 'A universal screening assessment is PRIMARILY designed to:',
      options: {
        A: 'Diagnose the specific reading skills a struggling student lacks',
        B: 'Identify students at risk who need closer monitoring or intervention',
        C: 'Measure individual student growth over the course of a year',
        D: 'Evaluate the effectiveness of a core reading program',
      },
      correct: 'B',
      explanation: 'Screening assessments (like DIBELS, AIMSWEB, or easyCBM) are brief, efficient tools given to all students to flag those below benchmark who need additional support. They tell you who — not why. Diagnosis (what specific skills are weak) requires a follow-up diagnostic assessment, not the screener itself.',
    },
    {
      id: 'III-2',
      question: 'A teacher administers a diagnostic phonics assessment to a student who failed the fall reading screener. This diagnostic assessment is designed to:',
      options: {
        A: 'Rank all students from highest to lowest reading ability',
        B: 'Identify precisely which phonics patterns the student has and has not mastered',
        C: 'Provide end-of-year accountability data for the district',
        D: 'Measure how much the student improved since the screener',
      },
      correct: 'B',
      explanation: 'Diagnostic assessments (like CORE Phonics Survey, QRI, or SPIRE Placement) go deep on a specific skill domain to identify exactly which sub-skills are mastered and which need instruction. They answer the question: why is this student struggling? This directly informs intervention planning. They are more detailed and time-intensive than screeners.',
    },
    {
      id: 'III-3',
      question: 'Progress monitoring differs from screening PRIMARILY because progress monitoring:',
      options: {
        A: 'Is given to all students three times per year',
        B: 'Is given frequently to students receiving intervention to track response to instruction',
        C: 'Provides a single snapshot of where a student is performing',
        D: 'Is only administered by reading specialists, not classroom teachers',
      },
      correct: 'B',
      explanation: 'Progress monitoring is given frequently (weekly or biweekly) to students who are receiving targeted intervention. Its purpose is to determine whether the intervention is working. If data shows insufficient growth, the intervention is adjusted. Screening is given universally 2-3 times per year. Progress monitoring is targeted and ongoing.',
    },
    {
      id: 'III-4',
      question: 'A teacher groups students flexibly for guided reading based on recent assessment data and adjusts groups every 3-4 weeks. This practice reflects:',
      options: {
        A: 'Permanent tracking that limits student growth',
        B: 'Differentiated instruction based on current instructional level',
        C: 'Universal screening at the classroom level',
        D: 'Diagnostic assessment of phonics patterns',
      },
      correct: 'B',
      explanation: 'Flexible grouping for guided reading — where students work at their instructional level with targeted teaching, and groups are adjusted as students grow — is a core component of differentiated instruction. Flexible (as opposed to permanent) grouping is critical: students should move as their skills develop, preventing the fixed-ability labeling that undermines growth.',
    },
    {
      id: 'III-5',
      question: 'Which text type is MOST appropriate for early readers who are learning to apply newly taught phonics patterns independently?',
      options: {
        A: 'Authentic trade books at grade level with varied vocabulary',
        B: 'Decodable text controlled for the specific phonics patterns taught',
        C: 'Leveled readers at the student\'s frustration level',
        D: 'Any high-interest text regardless of phonics complexity',
      },
      correct: 'B',
      explanation: 'Decodable text — specifically written to use only phonics patterns students have been taught — is the appropriate practice vehicle for early readers consolidating phonics learning. It allows independent application of the code. Authentic trade books are appropriate for read-alouds and shared reading but typically contain too many untaught patterns for independent decoding practice in early grades.',
    },
    {
      id: 'III-6',
      question: 'A student decodes words accurately but scores below grade level on comprehension. An evidence-based intervention would MOST likely target:',
      options: {
        A: 'Additional phoneme segmentation and blending drills',
        B: 'Repeated reading for rate improvement',
        C: 'Vocabulary instruction and comprehension strategy instruction',
        D: 'Phonics pattern review using decodable text',
      },
      correct: 'C',
      explanation: 'When decoding is accurate but comprehension is poor, the problem is "the simple view of reading" — language comprehension, not decoding. The intervention must target vocabulary (conceptual knowledge that enables inference) and explicit comprehension strategies (questioning, summarizing, monitoring). Re-teaching phonics to an accurate decoder will not improve comprehension.',
    },
    {
      id: 'III-7',
      question: 'The Simple View of Reading (Gough & Tunmer) states that reading comprehension equals:',
      options: {
        A: 'Phonemic awareness × phonics fluency',
        B: 'Decoding × language comprehension',
        C: 'Fluency + vocabulary + background knowledge',
        D: 'Automaticity + motivation + prior knowledge',
      },
      correct: 'B',
      explanation: 'RC = D × LC. Reading Comprehension = Decoding × Language Comprehension. If either component is zero, reading comprehension is zero. A strong decoder who lacks language comprehension will not understand text. A strong language comprehender who cannot decode cannot access text. This formula guides diagnosis: identify which factor (or both) is limiting reading.',
    },
    {
      id: 'III-8',
      question: 'A teacher notices that her EL students are not responding to phonics instruction at the same pace as native English speakers. The BEST first diagnostic step is to:',
      options: {
        A: 'Refer all EL students for special education evaluation immediately',
        B: 'Continue the same instruction — EL students simply need more time',
        C: 'Assess oral language proficiency to determine whether phonics instruction is accessible',
        D: 'Provide all phonics instruction in students\' home language',
      },
      correct: 'C',
      explanation: 'EL students may struggle with phonics instruction because they lack oral vocabulary or oral phonology in English — not because of a reading disability. Assessing oral language proficiency reveals whether the student needs oral language support alongside or before phonics instruction. This prevents over-referral and ensures instruction is appropriately matched to where the student actually is.',
    },
    {
      id: 'III-9',
      question: 'Curriculum-based measurement (CBM) probes are MOST often used for which assessment purpose?',
      options: {
        A: 'Diagnosing specific phonics skill gaps',
        B: 'Ranking students for report card grades',
        C: 'Progress monitoring student growth over time',
        D: 'Evaluating the quality of a commercial reading program',
      },
      correct: 'C',
      explanation: 'CBM probes (like one-minute oral reading passages or nonsense word fluency tasks) are brief, standardized, and sensitive to growth — making them ideal for frequent progress monitoring. They are not diagnostic (they tell you how much, not why or which) and are not summative assessments (they measure growth, not end-of-year performance).',
    },
    {
      id: 'III-10',
      question: 'A teacher is planning instruction for a student who is below grade level in both decoding and comprehension. According to the Simple View of Reading, the teacher should FIRST prioritize:',
      options: {
        A: 'Comprehension strategy instruction, since comprehension is the ultimate goal',
        B: 'Decoding instruction, since decoding is the prerequisite for comprehension in early reading',
        C: 'Fluency instruction exclusively, since fluency bridges decoding and comprehension',
        D: 'Motivational supports, since struggling readers first need to want to read',
      },
      correct: 'B',
      explanation: 'When a student is weak in both decoding and comprehension, decoding is the priority in early reading — you cannot work on comprehension of text the student cannot yet decode. Once decoding becomes accurate and increasingly automatic, comprehension instruction can take center stage. This is a common exam scenario: choose decoding intervention for early readers with both deficits.',
    },
  ],
}

export const sampleCRPrompt = `A first-grade teacher is reviewing data from the school's fall reading screener. One student, Maya, received the following results:

• Phoneme Segmentation Fluency (PSF): 18 correct phonemes per minute (benchmark: 35+)
• Nonsense Word Fluency — Letter Sounds (NWF-LNF): 22 correct letter sounds per minute (benchmark: 27+)
• Nonsense Word Fluency — Whole Words Read (NWF-WWR): 4 whole words per minute (benchmark: 15+)
• Oral Reading Fluency (ORF): Not yet assessed (below prerequisite threshold)

Based on this data:

**Part A:** Identify Maya's primary area of reading difficulty and explain what the data specifically reveals about her current level of skill development in that area.

**Part B:** Describe two evidence-based instructional strategies the teacher should use to address Maya's identified area of difficulty. For each strategy, explain how it would be implemented and why it is appropriate for Maya's specific skill profile.`

export const sampleCRResponse = `**Part A — Identifying Maya's Primary Area of Difficulty**

Maya's primary area of difficulty is phonemic awareness — specifically phoneme segmentation — which is directly limiting her ability to develop phonics decoding skills.

The PSF score of 18 correct phonemes per minute, compared to the fall first-grade benchmark of 35+, indicates that Maya cannot yet efficiently isolate and identify the individual sounds in spoken words. This is the foundational skill for phonics: a student who cannot segment a spoken word into its phonemes cannot connect those phonemes to the letters that represent them. Her NWF-LNF score of 22 (benchmark 27+) and NWF-WWR of 4 (benchmark 15+) confirm that this phonemic awareness deficit is translating directly into phonics: she is learning letter sounds at a below-benchmark pace and is not yet blending letter sounds into decodable whole words. Together, the data pattern is consistent with a student at the phoneme awareness stage who has not yet fully bridged into phonics decoding.

**Part B — Two Evidence-Based Instructional Strategies**

**Strategy 1: Elkonin (Sound) Box Segmentation**

The teacher should use Elkonin boxes — a grid of connected boxes, one for each phoneme in a target word — with Maya daily in a small-group or one-on-one setting. The teacher says a CVC word aloud (e.g., "cat"), and Maya pushes a token into each box as she says each phoneme separately: /k/ → first box, /æ/ → second box, /t/ → third box. Once Maya is consistently accurate with spoken tokens, the teacher introduces letters: Maya writes the correct letter in each box as she segments, bridging from phonemic awareness into phonics.

This strategy is appropriate for Maya because it makes phoneme segmentation concrete and physical — the boxes provide a scaffold that represents the abstract concept of "separate sounds" in a way a first-grader can see and touch. Research consistently identifies phoneme segmentation as the phonemic awareness skill most strongly predictive of early decoding success, and Elkonin boxes are one of the most validated interventions for building it.

**Strategy 2: Blending Drills with Decodable CVC Words**

Because Maya's NWF-WWR score of 4 shows she is not yet blending letter sounds into whole words, the teacher should conduct daily phoneme blending practice using decodable CVC word cards. The teacher shows a word card (e.g., "map"), touches each letter while saying the isolated sound — /m/ ... /æ/ ... /p/ — then asks Maya to blend: "What word?" Maya responds: "map." Over time, the teacher increases pace and complexity (CCVC, CVCC) as Maya's accuracy improves.

This strategy is appropriate because NWF-WWR directly measures blending — the complement of segmentation — and Maya's score reveals it as a second, closely related deficit. Blending and segmenting are the two highest-priority phonemic awareness skills, and both are prerequisites for independent phonics decoding. Using decodable words (rather than nonsense words exclusively) ensures instruction connects to real reading. The explicit, systematic progression from isolated sounds to connected words mirrors the actual decoding process Maya needs to internalize.`
