export interface StudyGuideSection {
  id: string
  objectiveNum: number
  title: string
  subareaId: 'I' | 'II' | 'III' | 'IV'
  content: string
}

export interface StudyGuideSubarea {
  id: 'I' | 'II' | 'III' | 'IV'
  name: string
  sections: StudyGuideSection[]
}

export const studyGuide190: StudyGuideSubarea[] = [
  {
    id: 'I',
    name: 'Foundations of Reading Development',
    sections: [
      {
        id: 'obj-1',
        objectiveNum: 1,
        title: 'Phonological and Phonemic Awareness',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>This objective tests your ability to distinguish between related but distinct oral language skills, explain the role of the alphabetic principle, and identify research-backed instruction for diverse learners. Expect scenario-based questions where you must classify a task as phonological or phonemic, or select the best activity for a specific learner profile. All phonemic awareness tasks are oral — the moment print appears, the task has crossed into phonics.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Phonological awareness:</strong> The broad ability to hear, identify, and manipulate sound units of oral language — including words, syllables, onsets, and rimes — with no connection to print.</li>
    <li><strong>Phonemic awareness:</strong> A subset of phonological awareness focused specifically on individual phonemes — the smallest units of sound within words (e.g., /k/ /æ/ /t/ in "cat").</li>
    <li><strong>Phoneme:</strong> The smallest unit of sound in spoken language that changes meaning; English has approximately 44 phonemes represented by 26 letters.</li>
    <li><strong>Phoneme segmentation:</strong> Breaking a spoken word into its individual sounds (e.g., "frog" → /f/ /r/ /ɒ/ /g/); one of the strongest predictors of early decoding success.</li>
    <li><strong>Phoneme blending:</strong> Combining separately spoken phonemes into a recognizable word (e.g., /s/ /t/ /ɒ/ /p/ → "stop"); essential for applying phonics knowledge during reading.</li>
    <li><strong>Phoneme manipulation:</strong> Deleting, substituting, or reversing phonemes in a word (e.g., "say 'cat' without /k/"); the most advanced phonemic awareness skill.</li>
    <li><strong>Onset-rime:</strong> The onset is the initial consonant(s) before the vowel (/b/ in "bat"); the rime is the vowel and everything after it (-at); a phonological — not phonemic — task.</li>
    <li><strong>Alphabetic principle:</strong> The understanding that letters and letter combinations systematically represent the sounds of spoken language; the conceptual foundation for phonics instruction.</li>
    <li><strong>Letter-sound correspondence:</strong> Knowing which phoneme maps to which grapheme (e.g., the letter "b" represents /b/); the building block of decoding.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: Phonological vs. Phonemic Awareness</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Skill</th>
        <th>Type</th>
        <th>Example Task</th>
        <th>Level of Sound Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Rhyme recognition</td>
        <td>Phonological</td>
        <td>"Do 'cat' and 'bat' rhyme?"</td>
        <td>Rime (-at)</td>
      </tr>
      <tr>
        <td>Syllable segmentation</td>
        <td>Phonological</td>
        <td>Clap the syllables in "butter"</td>
        <td>Syllable</td>
      </tr>
      <tr>
        <td>Onset-rime blending</td>
        <td>Phonological</td>
        <td>Blend /b/ + /at/ to say "bat"</td>
        <td>Onset + rime</td>
      </tr>
      <tr>
        <td>Phoneme isolation</td>
        <td>Phonemic</td>
        <td>"What is the first sound in 'ship'?"</td>
        <td>Individual phoneme</td>
      </tr>
      <tr>
        <td>Phoneme segmentation</td>
        <td>Phonemic</td>
        <td>Say each sound in "frog": /f/ /r/ /ɒ/ /g/</td>
        <td>Individual phoneme</td>
      </tr>
      <tr>
        <td>Phoneme deletion</td>
        <td>Phonemic</td>
        <td>"Say 'cat' without /k/." → "at"</td>
        <td>Individual phoneme</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Explicit Phoneme Segmentation and Blending Instruction</p>
    <p class="sg-text">Directly teach students to isolate, segment, and blend phonemes rather than hoping these skills develop incidentally. Use a scripted, cumulative sequence moving from easier skills (isolation, blending) to harder ones (segmentation, manipulation). Research shows explicit phoneme instruction produces significantly stronger outcomes than embedded or incidental approaches, especially for students at risk.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Elkonin Sound Boxes</p>
    <p class="sg-text">Students draw a row of boxes — one per phoneme — and push a token into each box as they say each sound in a word. The physical, kinesthetic act of pushing tokens concretizes the abstract concept of segmenting sounds and reduces working memory load. Once students are ready for phonics, letters replace tokens to build the bridge to the alphabetic principle.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Letter-Sound Mapping (Connecting PA to Phonics)</p>
    <p class="sg-text">Once students have basic phoneme awareness, pair oral phoneme tasks with their corresponding graphemes to simultaneously build the alphabetic principle. Research supports integrating phonemic awareness with letters rather than completing all oral-only practice before introducing print — this integration accelerates decoding development.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Minimal Pairs Contrast</p>
    <p class="sg-text">Present pairs of words differing by one phoneme (e.g., "bat/pat," "sit/set") and have students identify the difference and match words to pictures. Minimal pairs sharpen phoneme discrimination — a prerequisite for accurate phonics application — and are especially valuable for English learners whose home language does not contain certain English phonemes.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that ask you to classify a task as phonological or phonemic — if the task involves syllables, rhymes, or onsets/rimes, it is phonological, not phonemic. Also watch for answer choices that mention letters or words on cards — phonemic awareness tasks are entirely oral; any print moves the task into phonics. The most common distractor places a phonological task (syllable clapping) in the "phonemic awareness" category.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-2',
        objectiveNum: 2,
        title: 'Phonics and Word Recognition',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>This objective tests your understanding of how decoding and encoding develop, why explicit and systematic phonics instruction is the evidence-based standard, and how to support word recognition across diverse learners. Questions typically present a student scenario and ask you to identify the most effective instructional approach or explain why one method is more research-supported than another.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Decoding:</strong> Applying letter-sound knowledge to read an unfamiliar word by converting graphemes to phonemes and blending them into a recognizable spoken word.</li>
    <li><strong>Encoding (spelling):</strong> The reverse of decoding — converting the phonemes in a spoken word into the correct graphemes; reinforces phonics knowledge bidirectionally.</li>
    <li><strong>Explicit phonics instruction:</strong> The teacher directly states the letter-sound relationship, models its use, and provides guided then independent practice — no guessing or discovery is expected.</li>
    <li><strong>Systematic phonics instruction:</strong> Phonics patterns are taught in a planned, cumulative sequence from simpler (CVC short vowels) to more complex (vowel teams, multisyllabic words).</li>
    <li><strong>Orthographic mapping:</strong> The process by which the brain permanently bonds a word's pronunciation, spelling, and meaning into long-term memory, enabling instant sight recognition.</li>
    <li><strong>High-frequency words:</strong> Words that appear very often in print (e.g., "the," "said," "was"); many are phonetically irregular and require explicit attention to the irregular element.</li>
    <li><strong>Decodable texts:</strong> Texts containing only the phonics patterns that have been explicitly taught, allowing students to practice decoding without relying on picture or context guessing.</li>
    <li><strong>Oral vocabulary:</strong> Words a student knows by sound; when a student decodes a word they already know orally, meaning is immediately accessible and the word is quickly orthographically mapped.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: Phonics Instructional Approaches</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Approach</th>
        <th>How It Works</th>
        <th>Starting Point</th>
        <th>Evidence Strength</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Synthetic phonics</td>
        <td>Students learn individual phoneme-grapheme correspondences and blend them to build words from parts to whole</td>
        <td>Individual sounds → whole word</td>
        <td>Strongest; most effective for beginning and struggling readers</td>
      </tr>
      <tr>
        <td>Analytic phonics</td>
        <td>Students analyze whole words to identify shared patterns (e.g., noticing the "at" family in "cat," "bat," "sat")</td>
        <td>Whole word → identify pattern</td>
        <td>Moderate; less effective than synthetic for at-risk readers</td>
      </tr>
      <tr>
        <td>Analogy-based phonics</td>
        <td>Students use known word chunks to decode new words ("If I know 'light,' I can read 'night'")</td>
        <td>Known word chunk → new word</td>
        <td>Useful supplement once a core of known words is established</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Systematic, Explicit Phonics Sequences</p>
    <p class="sg-text">Introduce phonics patterns in a research-validated scope and sequence — beginning with simple CVC words and short vowels, progressing to consonant blends, digraphs, long vowel patterns, and multisyllabic words. Each new pattern is introduced explicitly (I do), practiced with teacher support (we do), and applied independently (you do). Cumulative review ensures previously taught patterns are maintained.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Word Sorts</p>
    <p class="sg-text">Students categorize word cards by phonics pattern (e.g., short-a vs. long-a; "cake/cane" vs. "cap/can") into labeled columns. Sorting requires students to examine each word's spelling pattern carefully and make a decision — this active processing strengthens pattern recognition. Sorts can be closed (categories given) or open (students determine categories), with open sorts used for extension.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Heart Word Instruction for High-Frequency Words</p>
    <p class="sg-text">Rather than treating every high-frequency word as a pure memory task, teach students to identify which letters are phonetically predictable (the "known" part) and mark only the truly irregular letters as the "heart" to memorize. For example, in "said," the "s-" and "-d" are regular; the "ai" spelling of /ɛ/ is the heart. This approach reduces rote memorization load and reinforces phonics knowledge simultaneously.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Decodable Text Practice</p>
    <p class="sg-text">After introducing a phonics pattern, provide decodable texts controlled for that pattern so students can practice decoding in connected text without falling back on picture guessing or memorization. Decodable texts are distinct from leveled readers — their purpose is phonics application, not comprehension development. As students gain more phonics knowledge, the texts become less controlled and more authentic.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for answer choices that recommend "context clues" or "picture cues" as the primary decoding strategy — these are not evidence-based first-line approaches for beginning or struggling readers. Systematic, explicit phonics is always the preferred method. Also watch for questions that distinguish decodable texts (phonics practice) from leveled readers (comprehension development) — these serve different purposes and should not be conflated.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-3',
        objectiveNum: 3,
        title: 'Word Analysis Skills',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>This objective covers how students move beyond basic phonics to analyze the internal structure of words — morphemes, syllable types, and orthographic rules. The NES tests whether you can identify morpheme types, explain syllabication rules, and select appropriate instructional strategies for multisyllabic words and English learners. Expect questions asking you to classify a word part, apply a syllable type, or choose a word analysis teaching strategy.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Morpheme:</strong> The smallest unit of meaning in language; unlike phonemes (units of sound), morphemes carry meaning — every word contains at least one.</li>
    <li><strong>Free morpheme:</strong> A morpheme that can stand alone as a word (e.g., "play," "kind"); all base words are free morphemes.</li>
    <li><strong>Bound morpheme:</strong> A morpheme that cannot stand alone and must attach to another morpheme (e.g., the prefix "un-" or the suffix "-ness").</li>
    <li><strong>Derivational morpheme:</strong> A bound morpheme that changes the part of speech or core meaning of a base word (e.g., "-ness" converts "kind" [adjective] to "kindness" [noun]); all prefixes are derivational.</li>
    <li><strong>Inflectional morpheme:</strong> A bound morpheme that changes grammatical function (tense, number, possession) without changing the base word's part of speech (e.g., "-ed," "-s," "-ing"); English has exactly eight inflectional morphemes.</li>
    <li><strong>Root:</strong> A bound base, often from Latin or Greek, that carries core meaning but cannot stand alone (e.g., "rupt" in "interrupt," "struct" in "construction").</li>
    <li><strong>Cognate:</strong> A word in two languages that shares common origin, similar form, and similar meaning (e.g., English "nation" / Spanish "nación") — powerful cross-linguistic vocabulary tool for English learners.</li>
    <li><strong>Orthographic rules:</strong> Systematic spelling conventions governing how base words change when suffixes are added (e.g., the doubling rule, the drop-e rule, the change-y-to-i rule).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: The Six Syllable Types</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Syllable Type</th>
        <th>Pattern</th>
        <th>Vowel Sound</th>
        <th>Examples</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Closed</td>
        <td>Ends in a consonant</td>
        <td>Short vowel sound</td>
        <td>"cat," "nap-kin," "pub-lic"</td>
      </tr>
      <tr>
        <td>Open</td>
        <td>Ends in a vowel</td>
        <td>Long vowel sound (says its name)</td>
        <td>"go," "mu-sic," "ti-ger"</td>
      </tr>
      <tr>
        <td>Vowel-Consonant-e (VCe)</td>
        <td>Ends in silent e; vowel-consonant-e pattern</td>
        <td>Long vowel sound</td>
        <td>"cake," "re-mote," "in-vite"</td>
      </tr>
      <tr>
        <td>Vowel Team</td>
        <td>Two or more vowels together making one sound</td>
        <td>Varies by team (long, short, diphthong)</td>
        <td>"rain," "out," "eight," "boy"</td>
      </tr>
      <tr>
        <td>R-controlled</td>
        <td>Vowel followed by r, which modifies the vowel</td>
        <td>Neither purely long nor short</td>
        <td>"bird," "car," "her," "fur"</td>
      </tr>
      <tr>
        <td>Consonant-le</td>
        <td>Final unaccented syllable: consonant + le</td>
        <td>Schwa + /l/ sound; always unaccented</td>
        <td>"ta-ble," "sim-ple," "gig-gle"</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Morpheme Matrices</p>
    <p class="sg-text">Students use a grid with base words across the top and prefixes/suffixes down the side to generate and analyze families of related words (e.g., "predict," "unpredictable," "prediction"). Building morpheme matrices develops flexible morphological thinking — students learn to see words as structured assemblies of meaningful parts rather than strings of random letters, which accelerates both vocabulary and spelling development.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Syllable Division Routines</p>
    <p class="sg-text">Teach students explicit, step-by-step rules for dividing multisyllabic words: the VCCV pattern (divide between the two consonants: "nap-kin"), the VCV pattern (try dividing before the consonant first for an open syllable: "ti-ger"), and the consonant-le pattern (keep the consonant with the "-le": "ta-ble"). Applying these rules gives students a reliable attack strategy for any unfamiliar multisyllabic word rather than guessing.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Generative Vocabulary Through Latin and Greek Roots</p>
    <p class="sg-text">Start with a high-utility root and generate a family of related words (e.g., "port" → transport, import, export, portable, portfolio). Students who know 20–30 Latin and Greek roots can unlock the meanings of hundreds of academic and technical vocabulary words. This is especially efficient for Tier 2 and Tier 3 academic vocabulary because most such words have Latin or Greek origins.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Cognate Awareness Instruction for English Learners</p>
    <p class="sg-text">Explicitly teach English learners to recognize cognates between English and their home language — especially Spanish-English pairs — so students can leverage existing vocabulary knowledge when reading academic texts. Also teach false cognates (words that look similar but mean different things, such as "embarrassed" vs. Spanish "embarazada") to prevent meaning errors that erode comprehension confidence.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that ask you to distinguish derivational from inflectional morphemes — the key rule: inflectional suffixes never change the word's part of speech ("-ed" keeps a verb a verb). Also watch for syllable type questions that give you a word and ask which type applies — remember that closed syllables are the most common type in English, and VCe syllables always have a silent final e that makes the preceding vowel long.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-4',
        objectiveNum: 4,
        title: 'Reading Fluency',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>This objective tests your understanding of what fluency is, why it matters for comprehension, and how to develop it — especially for students who decode slowly, read inaccurately, or read in a monotone. NES questions often present a student reading sample or describe reading behavior and ask you to identify the fluency component affected or select the best instructional approach. Remember: fluency is a means to comprehension, not the goal itself.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Reading fluency:</strong> The ability to read text accurately, at an appropriate rate, and with expression; all three components must be present for full fluency.</li>
    <li><strong>Automaticity:</strong> Instant, effortless word recognition that requires no conscious decoding effort, freeing working memory for comprehension (LaBerge and Samuels' automaticity theory).</li>
    <li><strong>Words correct per minute (WCPM):</strong> The standard measure of reading rate — total words read minus errors, timed over one minute; compared against grade-level norms (Hasbrouck and Tindal).</li>
    <li><strong>Prosody:</strong> Reading with appropriate expression, phrasing, pitch, and rhythm that mirrors natural speech; a strong indicator that the reader is comprehending and not merely decoding.</li>
    <li><strong>Repeated oral reading:</strong> Reading the same passage multiple times with feedback until a target rate and accuracy level is reached; the most research-supported fluency intervention.</li>
    <li><strong>Wide reading:</strong> Reading a large volume of varied texts at the independent level (95–100% accuracy) — supports long-term rate development and vocabulary exposure but is not sufficient as a standalone fluency intervention.</li>
    <li><strong>Instructional reading level:</strong> The text difficulty at which a student reads with 90–95% accuracy and adequate comprehension — the appropriate level for guided practice.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: The Three Fluency Indicators</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Indicator</th>
        <th>Definition</th>
        <th>How to Assess</th>
        <th>How to Teach</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Accuracy</td>
        <td>Reading words correctly without substitution, omission, or insertion errors</td>
        <td>Percentage of words read correctly (running record or oral reading probe)</td>
        <td>Pre-teach difficult words; ensure text is at instructional level (90–95% accuracy); provide immediate corrective feedback</td>
      </tr>
      <tr>
        <td>Rate</td>
        <td>Speed of reading, measured in words correct per minute (WCPM)</td>
        <td>One-minute timed oral reading probe; compare to Hasbrouck and Tindal grade-level norms</td>
        <td>Repeated reading with timed re-reads; high-frequency word automaticity practice; wide reading at independent level</td>
      </tr>
      <tr>
        <td>Prosody</td>
        <td>Reading with appropriate expression, phrasing, pitch, and rhythm that reflects natural speech</td>
        <td>NAEP Oral Reading Fluency Scale (4-point rubric) or teacher observation against a checklist</td>
        <td>Echo reading; reader's theater; model fluent phrasing; instruction on sentence boundaries and punctuation cues</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Repeated Oral Reading with Feedback</p>
    <p class="sg-text">Students read the same passage three to four times, receiving corrective feedback after each reading, until they reach a target WCPM and accuracy level. This is the most consistently research-supported fluency method — the combination of repetition and corrective feedback drives both accuracy and automaticity. Graphing WCPM across readings makes progress visible and builds student motivation.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Echo Reading</p>
    <p class="sg-text">The teacher reads a phrase or sentence aloud with natural expression; students immediately echo it back matching the teacher's phrasing and intonation. Echo reading is especially effective for building prosody because it gives students an immediate, live model of what fluent oral reading sounds like and requires them to reproduce it, not just hear it passively.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reader's Theater</p>
    <p class="sg-text">Students rehearse and perform a script for an audience, providing authentic, purposeful repeated reading practice. No memorization or costumes are required — holding the script is part of the activity. Reader's Theater maintains student engagement across multiple readings (often 5–10 per week) and builds prosody because performance requires expressive reading.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Paired Reading (Partner Reading)</p>
    <p class="sg-text">A stronger reader models fluent reading of a passage; the less fluent reader then rereads the same text with the partner providing immediate corrective feedback. This structure provides both a fluent model and low-stakes practice. Pairs should be matched carefully — a gap of about one year's reading level is optimal so the stronger reader can model without the weaker reader becoming discouraged.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that treat fluency as the goal of reading — it is not; fluency serves comprehension. If a student has strong fluency but weak comprehension, the answer will point to a comprehension strategy, not more fluency practice. Also know that silent sustained reading alone is not a research-supported fluency intervention — the evidence base supports oral repeated reading with feedback. A student who reads quickly with many errors needs phonics instruction, not speed drills.</p>
</div>
        `.trim(),
      },
    ],
  },
  {
    id: 'II',
    name: 'Development of Reading Comprehension',
    sections: [
      {
        id: 'obj-5',
        objectiveNum: 5,
        title: 'Vocabulary and Academic Language Development',
        subareaId: 'II',
        content: `
<div class="sg-intro">
  <p>This objective tests your understanding of how vocabulary connects to comprehension, how to select words for direct instruction, and how to teach word-learning strategies for diverse learners. NES questions typically ask you to identify the correct vocabulary tier, choose the most effective instructional strategy, or determine how to support English learners in developing academic language. Word selection decisions — choosing which words to teach directly — are a frequent item type.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Oral vocabulary:</strong> Words a student understands and uses in speech; when a student decodes a word they already know orally, meaning is immediately accessible.</li>
    <li><strong>Academic language:</strong> The vocabulary, syntax, and discourse patterns used in school subjects; students who lack academic language struggle with textbooks, directions, and test questions even when conversational language is strong.</li>
    <li><strong>Morphological analysis:</strong> Using knowledge of prefixes, roots, and suffixes to infer a word's meaning — the most powerful independent word-learning strategy for academic vocabulary.</li>
    <li><strong>Contextual analysis:</strong> Using surrounding text to infer a word's meaning; reliable only when the context provides strong, explicit clues — students must understand its limits.</li>
    <li><strong>Semantic mapping:</strong> A graphic organizer with a target word at the center, connected to related words, examples, and non-examples — builds rich, networked word knowledge.</li>
    <li><strong>Frayer model:</strong> A four-square organizer containing a word's definition, characteristics, examples, and non-examples — requires deep processing that a simple definition cannot provide.</li>
    <li><strong>Idiom:</strong> A phrase whose meaning cannot be derived from the literal meanings of its individual words (e.g., "hit the books"); must be taught explicitly, especially for English learners.</li>
    <li><strong>Connotation:</strong> The emotional or cultural associations attached to a word beyond its dictionary definition (e.g., "slender" vs. "skinny" share a denotation but carry different connotations).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: Beck's Three-Tier Vocabulary Framework</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Tier</th>
        <th>Word Type</th>
        <th>Examples</th>
        <th>Instructional Priority</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tier 1 — Basic words</td>
        <td>High-frequency, everyday conversational words most native English speakers already know</td>
        <td>"run," "happy," "eat," "big," "house"</td>
        <td>Rarely need direct instruction for native English speakers; essential for English learners who may lack basic vocabulary</td>
      </tr>
      <tr>
        <td>Tier 2 — High-utility academic words</td>
        <td>Words that appear across multiple content areas and text types, used in formal writing, unlikely to be learned incidentally</td>
        <td>"analyze," "significant," "compare," "illustrate," "evaluate," "infer"</td>
        <td>Highest priority for direct instruction — they appear everywhere and unlock comprehension broadly across subjects</td>
      </tr>
      <tr>
        <td>Tier 3 — Domain-specific words</td>
        <td>Technical vocabulary tied to a specific content area or discipline</td>
        <td>"photosynthesis," "legislature," "isosceles," "denomination"</td>
        <td>Taught as needed within content units; important within a subject but limited in transfer value across subjects</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Rich Discussion with Multiple Exposures</p>
    <p class="sg-text">Students need 10–15 meaningful encounters with a word in varied contexts before it is fully internalized — a brief definition is a starting point, not complete instruction. Structured discussions that require students to use target words in sentences, agree or disagree with statements using the word, or generate their own examples provide the repetition and processing depth that brief definitions cannot. Brief vocabulary instruction alone produces minimal retention.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Frayer Model for Deep Processing</p>
    <p class="sg-text">Students complete a four-square graphic organizer with the target word's definition, key characteristics, examples, and non-examples. The non-example requirement is particularly powerful — it forces students to identify the boundaries of a concept, preventing overgeneralization. For example, knowing that "brave" does not include recklessness helps students understand the word's precise meaning.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Morphological Analysis Instruction</p>
    <p class="sg-text">Directly teach high-utility prefixes (un-, re-, pre-, dis-), roots (port, struct, rupt, vis), and suffixes (-tion, -ment, -able) so students can decode the meanings of unfamiliar words independently. Students who learn to analyze morphemes gain access to hundreds of related words from a single instructional investment. This strategy is especially valuable for academic and Tier 2 vocabulary, which is heavily Latinate.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Pre-Teaching Vocabulary for English Learners</p>
    <p class="sg-text">Before a reading assignment, explicitly introduce key vocabulary using visual supports (pictures, realia, diagrams), bilingual glossaries, and student-friendly definitions in accessible language. Pre-teaching vocabulary before reading allows English learners to focus cognitive resources on comprehension during reading rather than stopping to decode unfamiliar words. Cognate bridges between English and the student's home language should be highlighted explicitly.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions asking which tier a word belongs to — Tier 2 words are almost always the correct instructional priority for direct instruction because they transfer across subjects. Also watch for questions where "have students look it up in the dictionary" is presented as a complete vocabulary strategy — it is a starting point, not a deep-processing activity, and a dictionary alone does not produce lasting word learning. The most common distractor labels a Tier 3 technical word as Tier 2.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-6',
        objectiveNum: 6,
        title: 'Literary Text Comprehension',
        subareaId: 'II',
        content: `
<div class="sg-intro">
  <p>This objective tests your ability to identify comprehension levels in questions and tasks, select scaffolding strategies for literary text, and explain how to teach author's craft and text structure. NES questions typically present a passage excerpt or teaching scenario and ask you to identify the comprehension level of a question, choose the best scaffolding strategy, or select the most appropriate discussion approach. Moving students toward inference and evaluation — not staying at literal recall — is almost always the correct instructional direction.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Literal comprehension:</strong> Understanding information stated explicitly in the text — who, what, when, where; answers can be found by pointing to a specific sentence ("right there" questions).</li>
    <li><strong>Inferential comprehension:</strong> Drawing conclusions, making predictions, and understanding implied meaning by combining text evidence with background knowledge — the reader must "read between the lines."</li>
    <li><strong>Evaluative comprehension:</strong> Judging, critiquing, and forming opinions about the text using external criteria or the reader's own values; also called critical or analytical comprehension.</li>
    <li><strong>Theme:</strong> The central message or insight about life that a literary text conveys — not the topic ("friendship"), but what the text says about the topic ("true friendship requires accepting someone's flaws").</li>
    <li><strong>Point of view:</strong> The narrative perspective (first person, third-person limited, third-person omniscient) and how it shapes what the reader knows and feels about characters and events.</li>
    <li><strong>Characterization:</strong> How the author reveals character through direct description, dialogue, actions, and other characters' reactions — both direct and indirect methods.</li>
    <li><strong>Tone:</strong> The author's attitude toward the subject, conveyed through word choice (diction) and style — distinct from mood, which is how the reader feels.</li>
    <li><strong>Gradual release of responsibility:</strong> The I do / We do / You do together / You do alone sequence for transferring comprehension strategy ownership from teacher to student.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: Comprehension Question Levels</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Level</th>
        <th>What It Requires</th>
        <th>Example Question</th>
        <th>Also Called</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Literal</td>
        <td>Locating and restating information stated explicitly in the text</td>
        <td>"What did the character say to her brother?" / "Where did the story take place?"</td>
        <td>"Right there" questions; text-explicit</td>
      </tr>
      <tr>
        <td>Inferential</td>
        <td>Combining text evidence with background knowledge to derive meaning not stated directly</td>
        <td>"Why do you think the character hesitated before opening the letter?" / "What does this detail suggest about the setting?"</td>
        <td>"Think and search" / "Author and me" questions; text-implicit</td>
      </tr>
      <tr>
        <td>Evaluative</td>
        <td>Judging, critiquing, or forming an opinion using external criteria or personal values</td>
        <td>"Do you think the character made the right choice? Use evidence from the text." / "How effectively did the author build suspense?"</td>
        <td>Critical / analytical comprehension; "On my own" questions</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Think-Alouds</p>
    <p class="sg-text">The teacher reads a literary text aloud and verbalizes the invisible comprehension process — making predictions, identifying imagery, noticing how word choice creates tone, clarifying confusing sections. Think-alouds make expert reading visible and give students a mental model to emulate. They are especially effective at the beginning of strategy instruction when students do not yet know what active reading looks like.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Text-Based Discussion Protocols</p>
    <p class="sg-text">Structured discussions (Socratic seminar, literature circles, accountable talk) require students to cite specific evidence from the text for every claim they make — "Where in the text does it say that?" becomes the standard expectation. These protocols develop evaluative comprehension because students must defend their interpretations against alternative readings. The teacher's role shifts from information-giver to discussion facilitator.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Questioning the Author (QtA)</p>
    <p class="sg-text">Students approach the text as a human-made artifact with intentional choices, asking "What is the author trying to tell us here?" and "Why did the author choose this word?" QtA builds evaluative comprehension by positioning readers as active questioners of authorial decision-making rather than passive recipients of a fixed message. It naturally generates discussion about author's craft and point of view.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reciprocal Teaching</p>
    <p class="sg-text">Students take turns leading discussion using four comprehension strategies in small groups: predicting (what comes next?), questioning (what questions does this raise?), clarifying (what was confusing and how did I fix it?), and summarizing (what were the key ideas?). Reciprocal teaching builds metacognitive awareness because students must monitor their own comprehension and choose strategies deliberately, not just respond to teacher questions.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that confuse theme with topic — "friendship" is a topic; "true friendship means accepting someone as they are" is a theme. Questions about comprehension level are common: if the answer to a question can be found by pointing to a sentence, it is literal; if it requires combining text with prior knowledge, it is inferential. The correct instructional answer almost always involves moving students toward inference and evaluation, not staying at literal recall.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-7',
        objectiveNum: 7,
        title: 'Informational Text Comprehension',
        subareaId: 'II',
        content: `
<div class="sg-intro">
  <p>This objective tests your ability to scaffold informational and digital text reading, apply comprehension levels to nonfiction, identify text structures, and support disciplinary reading. NES questions often present a nonfiction passage or teaching scenario and ask you to identify text structure, choose a pre-reading strategy, or explain how to support English learners with content-area text. Matching graphic organizers to text structures is a common and reliably tested item type.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Informational text:</strong> Text written primarily to convey factual content about the real world — textbooks, articles, reports, biographies, reference materials, and digital texts.</li>
    <li><strong>Text structure:</strong> The organizational pattern an author uses to arrange information; recognizing structure helps readers predict where information will appear and take better notes.</li>
    <li><strong>Text features:</strong> Visual and organizational elements in informational text — headings, subheadings, bolded terms, captions, diagrams, sidebars, tables of contents — that support navigation and comprehension.</li>
    <li><strong>KWL chart:</strong> A pre-reading strategy where students record what they Know, Want to know, and (after reading) Learned — activates prior knowledge and sets reading purpose.</li>
    <li><strong>Disciplinary literacy:</strong> The recognition that scientists, historians, and other subject-area experts read with different purposes, source-evaluation habits, and argument structures within their fields.</li>
    <li><strong>Lateral reading:</strong> Verifying a digital source's credibility by searching outside the source itself to see who created it and what others say about it — the most effective online source evaluation strategy.</li>
    <li><strong>Signal words:</strong> Words and phrases within a text that alert readers to the organizational pattern being used (e.g., "however" signals contrast; "as a result" signals cause-effect).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: The Five Informational Text Structures</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Structure</th>
        <th>How Information Is Organized</th>
        <th>Signal Words</th>
        <th>Graphic Organizer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Description / Enumeration</td>
        <td>Lists characteristics, facts, or examples about a topic</td>
        <td>"for example," "such as," "includes," "characteristics are"</td>
        <td>Web or bulleted list</td>
      </tr>
      <tr>
        <td>Chronological / Sequence</td>
        <td>Events or steps presented in time order or process order</td>
        <td>"first," "next," "then," "finally," "in 1865," "before," "after"</td>
        <td>Timeline or flowchart</td>
      </tr>
      <tr>
        <td>Compare and Contrast</td>
        <td>Examines similarities and differences between two or more things</td>
        <td>"however," "in contrast," "similarly," "on the other hand," "both"</td>
        <td>Venn diagram or T-chart</td>
      </tr>
      <tr>
        <td>Cause and Effect</td>
        <td>Explains why something happened or what resulted from an event</td>
        <td>"because," "as a result," "therefore," "consequently," "leads to"</td>
        <td>Cause-effect arrows chart</td>
      </tr>
      <tr>
        <td>Problem and Solution</td>
        <td>Presents a problem and one or more proposed solutions</td>
        <td>"the problem is," "one solution," "this led to," "in order to solve"</td>
        <td>Problem-solution frame</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Text Feature Walk</p>
    <p class="sg-text">Before reading, students preview headings, bolded terms, diagrams, captions, and sidebars to predict what the text will cover and activate relevant prior knowledge. Text feature walks are especially helpful for students unfamiliar with informational text conventions — they learn that headings announce topics, captions explain visuals, and bolded terms signal key vocabulary. This pre-reading investment reduces comprehension breakdowns during reading.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Annotation and Close Reading</p>
    <p class="sg-text">Students mark main ideas, unknown words, surprising information, and questions directly in the text or on sticky notes, then return to the text multiple times with different analytical purposes. Annotation keeps readers actively processing rather than passively skimming. For informational text, close reading works best with short, rich passages — full textbook chapters are not appropriate close reading material.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Graphic Organizers Matched to Text Structure</p>
    <p class="sg-text">Provide students with a graphic organizer that matches the structure of the text they are reading — a cause-effect chart for a cause-effect article, a Venn diagram for a compare-contrast passage. When the organizer mirrors the text's logic, it guides students to extract the right type of information and helps them see how the author's organizational choices affect how information is understood.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Two-Column Notes</p>
    <p class="sg-text">Students fold a page in half vertically: the left column captures key ideas or questions drawn from the text's headings before reading; the right column records details, evidence, and student reactions during and after reading. This structure forces students to interact with both the macro-structure (headings) and the micro-content (details) of informational text and produces notes that are genuinely useful for later review.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions asking you to match a graphic organizer to a text structure — this is a common item type. The correct answer matches the organizer's logic to the text's organizational pattern (Venn diagram = compare-contrast; timeline = sequence). Also watch for questions where the correct answer involves a pre-reading activation strategy rather than a during- or after-reading activity. Differentiation for informational text means adjusting access to the content (visual supports, audio, bilingual glossary) — not simplifying the content itself.</p>
</div>
        `.trim(),
      },
    ],
  },
  {
    id: 'III',
    name: 'Reading Assessment and Instruction',
    sections: [
      {
        id: 'obj-8',
        objectiveNum: 8,
        title: 'Assessing Reading Development',
        subareaId: 'III',
        content: `
<div class="sg-intro">
  <p>This objective tests your understanding of what reading assessments measure, the five purposes of assessment, the differences between standardized and informal tools, and how to use data to drive instructional decisions. NES questions frequently present student data — a running record, a WCPM score, a phonics inventory — and ask you to interpret what it means or identify the next instructional step. Knowing which assessment type matches which purpose is the most reliably tested skill here.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>The Big 5 reading components:</strong> The five areas identified by the National Reading Panel as essential for reading development — phonemic awareness, phonics, fluency, vocabulary, and comprehension; a comprehensive assessment system evaluates all five.</li>
    <li><strong>Running record:</strong> An informal tool where the teacher listens and records errors (substitutions, omissions, insertions, self-corrections) as a student reads aloud; yields accuracy rate, error rate, and self-correction rate.</li>
    <li><strong>Curriculum-Based Measurement (CBM):</strong> Brief, standardized, sensitive probes (e.g., one-minute oral reading) used to monitor progress frequently — detects small gains over short periods.</li>
    <li><strong>Informal Reading Inventory (IRI):</strong> A series of graded passages with comprehension questions that yields independent, instructional, and frustration reading levels.</li>
    <li><strong>Instructional reading level:</strong> The text difficulty at which a student reads with 90–95% accuracy and adequate comprehension — appropriate for guided practice.</li>
    <li><strong>Independent reading level:</strong> 95–100% accuracy — appropriate for choice reading and wide reading practice.</li>
    <li><strong>Frustration reading level:</strong> Below 90% accuracy — should be avoided for independent practice; practicing at frustration level reinforces error patterns.</li>
    <li><strong>Nonsense word reading:</strong> Reading phonetically regular non-words (e.g., "dap," "frib") to isolate pure decoding ability separate from sight word memory.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: The Five Assessment Purposes</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Purpose</th>
        <th>Description</th>
        <th>Who Takes It</th>
        <th>Example Tool</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Screening</td>
        <td>Identifies students who may be at risk for reading difficulties; fast and efficient; not diagnostic</td>
        <td>All students, typically at start and mid-year</td>
        <td>DIBELS, AIMSweb, FastBridge</td>
      </tr>
      <tr>
        <td>Diagnostic</td>
        <td>Identifies the specific nature and source of a reading difficulty for students who screened as at-risk; comprehensive and detailed</td>
        <td>Students who screened below benchmark</td>
        <td>Qualitative Reading Inventory (QRI), phonics error analysis, CTOPP-2</td>
      </tr>
      <tr>
        <td>Formative</td>
        <td>Ongoing, low-stakes assessment used during instruction to monitor understanding and adjust teaching in real time</td>
        <td>All students, continuously during instruction</td>
        <td>Teacher observation, exit tickets, anecdotal notes, guided reading records</td>
      </tr>
      <tr>
        <td>Summative</td>
        <td>Evaluates overall achievement against standards at the end of a unit or year; high-stakes, less frequent</td>
        <td>All students, at designated checkpoints</td>
        <td>End-of-year state reading test, end-of-unit assessment</td>
      </tr>
      <tr>
        <td>Progress Monitoring</td>
        <td>Tracks whether an intervention is working by measuring growth frequently over time; uses brief, sensitive CBM probes</td>
        <td>Students in Tier 2 or Tier 3 intervention</td>
        <td>Weekly or biweekly WCPM probes, phoneme segmentation fluency probes</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Error Analysis from Running Records</p>
    <p class="sg-text">After a running record, analyze the pattern of errors — did the student substitute words that look similar (visual/graphophonic cueing), sound similar in context (syntactic cueing), or make sense with the passage (semantic cueing)? The cueing system the student overrelies on reveals the instructional focus: heavy visual errors with poor semantic checking suggests the student is applying phonics but not monitoring for meaning; heavy semantic errors with poor visual checking suggests the student is guessing from context rather than decoding.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Using Diagnostic Data to Plan Targeted Instruction</p>
    <p class="sg-text">After a diagnostic assessment identifies a specific skill gap (e.g., phoneme segmentation, short vowel decoding, inferential comprehension), instruction must directly target that gap — not the general reading level. A student who fails phoneme segmentation tasks needs phonemic awareness instruction, not more decodable text reading. Assessment data is only useful if it changes what is taught and how.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Progress Monitoring Decision Rules</p>
    <p class="sg-text">Use a student's progress monitoring data to make explicit, data-driven decisions: if the student is meeting the expected growth trajectory (aimline) after 6–8 data points, continue the current intervention; if data points consistently fall below the aimline, intensify or change the intervention. Decision rules prevent both abandoning interventions too early and continuing ineffective interventions too long.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that confuse screening with diagnostic assessment — screening identifies who needs help; diagnostic identifies what kind of help. These are the two most commonly confused purposes on the exam. Also know that progress monitoring (not annual testing) is the tool used to evaluate whether a Tier 2 or Tier 3 intervention is working. If a question asks what to do after a student fails a screening, the next step is diagnostic assessment — not immediately placing the student in Tier 3.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-9',
        objectiveNum: 9,
        title: 'Evidence-Based Reading Instruction',
        subareaId: 'III',
        content: `
<div class="sg-intro">
  <p>This objective is the broadest on the exam — it synthesizes all major reading components and tests your ability to connect assessment data to instruction, explain tiered intervention models, evaluate text complexity, and design motivating, differentiated reading experiences. Expect multiple scenario-based questions requiring multi-step reasoning: a student profile is described, and you must identify the appropriate tier, intervention approach, or text complexity consideration.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>National Reading Panel (2000):</strong> The federal research panel that identified the five essential reading components — phonemic awareness, phonics, fluency, vocabulary, and comprehension — whose interconnections form the basis of evidence-based reading instruction.</li>
    <li><strong>Response to Intervention (RTI):</strong> A tiered framework for matching instruction intensity to student need, using ongoing data to make decisions about tier placement and intervention effectiveness.</li>
    <li><strong>Multi-Tiered System of Supports (MTSS):</strong> A broader framework that extends RTI beyond academics to include social-emotional and behavioral supports; the two terms are often used interchangeably in reading contexts.</li>
    <li><strong>Text complexity:</strong> Determined by three factors together — quantitative measures (Lexile, readability formulas), qualitative features (levels of meaning, text structure, knowledge demands), and reader-and-task considerations.</li>
    <li><strong>Close reading:</strong> A disciplined, text-dependent approach where students return to the same passage multiple times, each with a different analytical purpose, avoiding heavy pre-reading frontloading.</li>
    <li><strong>Differentiated instruction:</strong> Adjusting content, process, product, and learning environment based on students' readiness, interests, and learning profiles — not ability-tracking, but flexible, data-driven grouping.</li>
    <li><strong>Reading motivation:</strong> Intrinsic motivation (reading for enjoyment and curiosity) produces deeper engagement and longer-term reading habits than extrinsic motivation (reading for grades or rewards).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Comparison: RTI / MTSS Tier Structure</p>
  <table class="sg-table">
    <thead>
      <tr>
        <th>Tier</th>
        <th>Description</th>
        <th>Frequency and Group Size</th>
        <th>Who Receives It</th>
        <th>Example Intervention</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tier 1 — Core Instruction</td>
        <td>High-quality, evidence-based reading instruction for all students; if effective, approximately 80% of students meet grade-level benchmarks</td>
        <td>Daily, whole class or small group; general education classroom</td>
        <td>All students</td>
        <td>Systematic phonics program (e.g., CKLA, Fundations), shared reading, guided reading groups</td>
      </tr>
      <tr>
        <td>Tier 2 — Supplemental Intervention</td>
        <td>Small-group instruction provided in addition to Tier 1 for students who screen as at-risk; progress monitored every 1–2 weeks</td>
        <td>20–30 minutes, 3–5 times per week; groups of 3–5 students</td>
        <td>Students who screen below benchmark (approximately 15–20% of students)</td>
        <td>Structured literacy small-group program (e.g., Read Naturally, Wilson Fundations intervention)</td>
      </tr>
      <tr>
        <td>Tier 3 — Intensive Intervention</td>
        <td>Individualized, high-intensity instruction for students who do not respond to Tier 2; may involve special education evaluation</td>
        <td>Longer sessions, more frequent; groups of 1–3 students</td>
        <td>Students who do not respond adequately to Tier 2 (approximately 5% of students)</td>
        <td>Intensive one-on-one structured literacy intervention (e.g., Orton-Gillingham, Wilson Reading System)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Integrating the Big 5 Components in Instruction</p>
    <p class="sg-text">Effective reading instruction does not treat the five components as isolated curriculum units — it integrates them. A structured literacy lesson might open with phonemic awareness warm-up, move to phonics instruction, apply new patterns in decodable text for fluency, introduce vocabulary from an upcoming passage, and close with a comprehension discussion. Integration is more efficient than sequential coverage because the components reinforce one another.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Text Complexity Analysis Before Assigning Text</p>
    <p class="sg-text">Before assigning any text, analyze all three dimensions of complexity: run the Lexile or readability formula (quantitative), evaluate the text's levels of meaning, structure, language conventionality, and knowledge demands (qualitative), and consider the specific reader's motivation, background knowledge, and reading purpose (reader and task). A text with a low Lexile but dense figurative language may be more demanding than its score suggests; a high-Lexile science text may be appropriate if students have strong background knowledge in the topic.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Flexible Grouping Based on Assessment Data</p>
    <p class="sg-text">Form reading groups based on current skill data from screening, diagnostic, and formative assessments — and change group composition as data changes. Fixed ability groups undermine motivation and deny students access to grade-level instruction; flexible groups based on specific skill needs allow targeted instruction while keeping all students engaged with rigorous content. A student may be in a phonics group and a separate vocabulary group simultaneously based on their individual profile.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Building Reading Motivation Through Choice and Identity</p>
    <p class="sg-text">Provide students with regular opportunities to choose their own reading material from a diverse, high-interest classroom library. Connect texts to students' backgrounds, experiences, and questions. Create authentic social reading experiences (book talks, reading partnerships, author studies) that make reading feel purposeful and communal rather than evaluative. Research consistently shows that student choice is one of the strongest drivers of voluntary reading and long-term reading habit formation.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">Watch for questions that ask you to match a student profile to a tier — tier placement is determined by the student's response to instruction over time and the number of students affected, not by a single assessment score. Also know that text complexity is never determined by Lexile alone — qualitative factors and reader-task considerations always play a role, and the correct answer on complexity questions will typically involve all three dimensions. A weak Tier 1 program inflates apparent intervention need — always evaluate core instruction first.</p>
</div>
        `.trim(),
      },
    ],
  },
  {
    id: 'IV',
    name: 'Written Response Tips',
    sections: [
      {
        id: 'obj-wr',
        objectiveNum: 10,
        title: 'Open-Response Assignments: Strategy and Scoring',
        subareaId: 'IV',
        content: `
<div class="sg-intro">
  <p>The NES 190/890 includes two open-response assignments that together carry significant weight in your total score. These are not essays — they are structured analytical responses to a presented scenario, student work sample, or assessment data set. Your job is specific: analyze the evidence in the scenario, make a defensible claim, and support it with explicit reasoning grounded in the data you are given, not general reading knowledge.</p>
</div>

<div class="sg-block">
  <p class="sg-label">What NES Scorers Are Looking For</p>
  <ul class="sg-def-list">
    <li><strong>Accuracy:</strong> Your analysis of the student data or scenario must reflect correct understanding of reading development — misidentifying a phonics error as a fluency problem will cost you points regardless of how well-written the response is.</li>
    <li><strong>Specificity:</strong> Every claim must reference specific evidence from the scenario — quote or paraphrase the data, the student's errors, or the passage details. General statements earn no credit.</li>
    <li><strong>Reasoning:</strong> You must explain why the evidence supports your claim using your knowledge of reading development — the connection between evidence and claim cannot be left implied.</li>
    <li><strong>Completeness:</strong> Every sub-question in the prompt must be answered — read the prompt carefully and address all parts before moving on.</li>
    <li><strong>Organization:</strong> Responses should be logically structured — claim first, then evidence, then reasoning — not stream-of-consciousness background knowledge.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Response Structure: Claim → Evidence → Reasoning</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">State Your Claim Directly</p>
    <p class="sg-text">Open each analytical point with a direct, specific claim — do not bury it in hedging language or background exposition. State your interpretation or recommendation immediately: "This student's primary area of need is phoneme segmentation, not decoding." A strong opening claim signals to the scorer that you understand the task and sets up everything that follows.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Cite Evidence from the Scenario</p>
    <p class="sg-text">After your claim, point to specific data, behaviors, or student work from the scenario materials. Quote or paraphrase numbers, error patterns, and observations: "The running record shows 12 errors on CVC words and a self-correction rate of 1:8, indicating the student is not monitoring for sound or meaning accuracy." Evidence that comes from your general knowledge rather than the scenario earns no credit — the scorer already knows the content; they want to see you apply it to this student.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Connect Evidence to Your Claim with Explicit Reasoning</p>
    <p class="sg-text">After citing evidence, explain why that specific evidence supports your specific claim using your knowledge of reading development: "Because phoneme segmentation is a prerequisite for accurate phonics decoding, a deficit at this level explains the pattern of vowel substitution errors observed across all three word reading tasks." Do not assume the scorer will make this connection for you — state it directly. Two or three fully developed claim-evidence-reasoning cycles outscore five underdeveloped points every time.</p>
  </div>
</div>

<div class="sg-block">
  <p class="sg-label">Assignment-Specific Guidance</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Assignment 1 — Analyzing Foundational Skills Assessment Results</p>
    <p class="sg-text">You will typically receive student data related to phonological awareness, phonics, or fluency — such as a running record, a phonics screening score, a WCPM score, or a word reading inventory. Your job: (1) identify what the data reveals about the student's current level of development, (2) determine the specific skill gap indicated, and (3) recommend targeted, evidence-based instruction at the correct level. Do not recommend intervention at a level above what the data shows — if the data reveals a phoneme segmentation deficit, your instruction recommendation must address segmentation, not fluency or comprehension.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Assignment 2 — Analyzing Comprehension Assessment Results</p>
    <p class="sg-text">You will typically receive comprehension data — retelling results, question-response data broken down by level (literal, inferential, evaluative), or a student's written response to a text. Your job: (1) analyze the pattern across the data rather than just the total score, (2) identify whether the difficulty is at the literal, inferential, or evaluative level, and (3) recommend instruction that directly targets the identified level. A student who answers all literal questions correctly but fails inferential questions needs inferential comprehension instruction — not re-reading practice or fluency work.</p>
  </div>
</div>

<div class="sg-block">
  <p class="sg-label">Scoring Rubric Overview</p>
  <ul class="sg-def-list">
    <li><strong>Score 4 — Thorough:</strong> Full, accurate analysis with all claims supported by specific evidence and clear reasoning; well-organized, complete response that addresses all parts of the prompt.</li>
    <li><strong>Score 3 — Adequate:</strong> Mostly accurate analysis; claims supported but reasoning may be general or partially developed; organization is clear and all prompt parts addressed.</li>
    <li><strong>Score 2 — Limited:</strong> Partially accurate or incomplete analysis; claims made without adequate evidence from the scenario; reasoning is surface-level or missing for some points.</li>
    <li><strong>Score 1 — Weak:</strong> Inaccurate or largely missing analysis; response is off-task, very brief, or demonstrates significant misunderstanding of reading development content.</li>
  </ul>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">On the Exam</p>
  <p class="sg-text">The most common score-dropping mistakes: recommending "small groups and differentiated instruction" without naming the specific strategy and connecting it to the data; writing about general reading content instead of this student's specific data; addressing only one part of a two-part prompt; and misidentifying the skill area (confusing phonological awareness with phonics, or fluency with comprehension). Avoid spending any response time explaining what phonemic awareness is — jump directly to your analysis of this student. The scorer knows the content; they want to see you apply it.</p>
</div>
        `.trim(),
      },
    ],
  },
]
