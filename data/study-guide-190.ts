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
  weight: string
  questions: string
  sections: StudyGuideSection[]
}

export const studyGuide190: StudyGuideSubarea[] = [
  {
    id: 'I',
    name: 'Foundations of Reading Development',
    weight: '35%',
    questions: '43–45 multiple-choice questions',
    sections: [
      {
        id: 'obj-1',
        objectiveNum: 1,
        title: 'Phonological & Phonemic Awareness, Concepts of Print, and the Alphabetic Principle',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>Objective 1 covers the full landscape of early literacy foundations: phonological awareness, phonemic awareness, concepts of print, letter knowledge, and the alphabetic principle. Questions will ask you to distinguish between these related but distinct skills, identify the appropriate instructional sequence, choose evidence-based strategies for specific learner profiles, and recognize factors that affect development. Expect scenario-based items where you must classify a task or select the best intervention for a student at a given stage.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Phonological vs. Phonemic Awareness</p>
  <table class="sg-table">
    <thead>
      <tr><th>Skill</th><th>Definition</th><th>Unit of Sound</th><th>Example Task</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Phonological awareness</strong></td><td>Broad awareness that oral language is made up of smaller units</td><td>Words, syllables, onset/rime</td><td>Clap syllables in "butterfly"; identify rhymes</td></tr>
      <tr><td><strong>Phonemic awareness</strong></td><td>A specific subset of phonological awareness focused on individual phonemes</td><td>Individual phonemes</td><td>Segment "cat" → /k/ /æ/ /t/; blend /s/ /t/ /ɒ/ /p/ → "stop"</td></tr>
    </tbody>
  </table>
  <p class="sg-text"><strong>Critical rule:</strong> The moment print appears in a task, it is no longer phonemic awareness — it has crossed into phonics. All phonemic awareness tasks are completely oral.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Phonological Awareness Continuum (Easiest → Hardest)</p>
  <ul class="sg-def-list">
    <li><strong>Word awareness:</strong> Understanding that sentences are made up of separate words (e.g., "how many words are in 'the big dog'?").</li>
    <li><strong>Syllable awareness:</strong> Identifying, blending, and segmenting syllables — clapping "but-ter-fly" = 3.</li>
    <li><strong>Onset-rime awareness:</strong> The onset is the initial consonant(s) before the vowel (/b/ in "bat"); the rime is the vowel + what follows (-at). Rhyming and alliteration tasks work at this level.</li>
    <li><strong>Phoneme awareness (phonemic awareness):</strong> Identifying, blending, segmenting, deleting, adding, and substituting individual phonemes — the most advanced level. English has approximately 44 phonemes.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Phonemic Awareness Skills (Easiest → Most Complex)</p>
  <ul class="sg-def-list">
    <li><strong>Phoneme identification:</strong> Recognizing the beginning, medial, or final phoneme in a spoken word ("What sound does 'dog' start with?" → /d/).</li>
    <li><strong>Phoneme blending:</strong> Combining isolated phonemes into a word (/d/ /ɒ/ /g/ → "dog"). Strong predictor of decoding success.</li>
    <li><strong>Phoneme segmentation:</strong> Breaking a spoken word into all its individual sounds ("dog" → /d/ /ɒ/ /g/ = 3 phonemes). The single strongest predictor of early reading achievement.</li>
    <li><strong>Phoneme deletion:</strong> Removing a specific phoneme and saying what remains ("say 'cat' without /k/" → "at").</li>
    <li><strong>Phoneme addition:</strong> Adding a phoneme to a word to make a new word ("add /s/ to the beginning of 'top'" → "stop").</li>
    <li><strong>Phoneme substitution:</strong> Replacing one phoneme with another ("change the /b/ in 'bat' to /s/" → "sat"). The most advanced manipulation skill.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Concepts of Print</p>
  <p class="sg-text">Concepts of print are the understandings about how written language works. Students must acquire these before or alongside phonics instruction.</p>
  <ul class="sg-def-list">
    <li><strong>Print carries meaning:</strong> The understanding that print (not illustrations) is what is read and that it represents spoken language.</li>
    <li><strong>Print directionality:</strong> English print is read left-to-right, top-to-bottom, with a return sweep at the end of each line.</li>
    <li><strong>Word boundaries:</strong> Awareness that spaces between letter groups represent separate words; spoken words map to printed words one-to-one.</li>
    <li><strong>Letter vs. word:</strong> Distinguishing between a single letter and a whole word; understanding that words are made of letters.</li>
    <li><strong>Book orientation:</strong> Knowing the front/back of a book, identifying the title, author, illustrator; understanding that pages turn left to right.</li>
    <li><strong>Punctuation awareness:</strong> Recognizing that periods, question marks, and other marks signal meaning (end of sentence, question).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Letter Knowledge and the Alphabetic Principle</p>
  <ul class="sg-def-list">
    <li><strong>Letter knowledge:</strong> The ability to recognize and name uppercase and lowercase letters in isolation and within text, and to produce letters in writing (letter formation). Letter knowledge is a strong early predictor of reading success.</li>
    <li><strong>Alphabetic principle:</strong> The understanding that letters and letter combinations systematically represent the sounds of spoken language (phonemes). This is the foundational concept enabling phonics decoding — once students understand the alphabetic principle, they can apply phonics patterns to unlock unfamiliar words.</li>
    <li><strong>Letter-sound correspondence:</strong> Knowing which phoneme(s) map to which grapheme(s) — the building blocks of decoding. Connecting letter knowledge to sound knowledge bridges into phonics.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Elkonin (Sound) Boxes — Phoneme Segmentation</p>
    <p class="sg-text">A grid of connected boxes, one per phoneme, where students push a token into each box as they say a word sound by sound. Can be extended to phonics by replacing tokens with letters. Elkonin boxes make abstract phonemes concrete and are one of the most researched phonemic awareness interventions.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Phoneme Blending Drills</p>
    <p class="sg-text">Teacher says phonemes in isolation (/m/ ... /æ/ ... /p/) and students blend them into a word ("map"). Progress from CVC → CCVC → CVCC as students gain fluency. Builds the ability to use phonics knowledge during actual decoding.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Shared Reading for Concepts of Print</p>
    <p class="sg-text">Reading big books or projected texts aloud while pointing to words builds print directionality, word-by-word tracking, and the understanding that print carries meaning. Morning message activities (teacher writes a short message and reads it pointing to each word) are highly effective for early print concepts.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Interactive Read-Alouds for Oral Language Development</p>
    <p class="sg-text">The teacher reads aloud from high-quality texts and strategically stops to ask questions, discuss vocabulary, and invite accountable talk. Builds oral vocabulary, background knowledge, and narrative comprehension — all of which support later reading comprehension. Dialogic reading (prompting children to retell and elaborate) is especially effective for language development.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Phonetic Spelling (Invented Spelling)</p>
    <p class="sg-text">Encouraging students to write words using what they know about sounds and letters (e.g., "kat" for "cat") simultaneously reinforces phonemic awareness, the alphabetic principle, and letter-sound correspondences. Analyzing invented spellings reveals a student's current phonics and phonemic awareness development.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Interactive Writing</p>
    <p class="sg-text">Teacher and students compose a text together — negotiating words and sharing the pen to record them. The teacher guides letter formation, spacing, punctuation, and sound-spelling decisions in real time. Interactive writing is especially powerful in K–1 because it makes the reading-writing connection concrete, reinforces concepts of print, and builds phonemic awareness and letter-sound knowledge through authentic writing experience.</p>
  </div>
</div>

<div class="sg-block">
  <p class="sg-label">Factors Affecting Development</p>
  <p class="sg-text">These factors can accelerate or impede development of phonological awareness and emergent literacy — and should inform differentiation:</p>
  <ul class="sg-def-list">
    <li><strong>Prior literacy experiences:</strong> Exposure to books, being read to, and language-rich environments at home significantly predicts readiness. Students with less prior exposure need more structured emergent literacy experiences.</li>
    <li><strong>Language proficiency and bilingualism:</strong> English learners may have strong phonological awareness in their home language — this transfers. However, phonemic awareness in English requires familiarity with English phonology. Assess oral language proficiency to calibrate starting points.</li>
    <li><strong>Physical/medical conditions:</strong> Hearing loss (even mild, fluctuating loss from ear infections) directly impairs phonological processing. Speech-language concerns affect phoneme production and awareness.</li>
    <li><strong>Disabilities and learning differences:</strong> Dyslexia involves a phonological processing deficit — these students need explicit, systematic, multisensory phonemic awareness instruction in small groups or individually.</li>
    <li><strong>Limited or interrupted formal education:</strong> Students who have had gaps in schooling may lack foundational literacy experiences that peers had — assessment is essential before instruction.</li>
  </ul>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">The most common distractor: confusing phonological awareness with phonemic awareness. Any task involving syllables, rhymes, or onsets/rimes is phonological — not phonemic. Phonemic awareness is strictly about individual phonemes. A second frequent trap: any task involving letters or print is phonics, not phonemic awareness — the distinction is print vs. oral. On the exam, watch for EL-specific scenarios: the right answer will involve assessing oral language proficiency before assuming a phonics or phonemic awareness deficit.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-2',
        objectiveNum: 2,
        title: 'Phonics, High-Frequency Words, and Spelling',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>Objective 2 covers the full scope of beginning reading code instruction: phonics patterns from simple to complex, high-frequency word instruction, inflectional morphemes, spelling/encoding, and the reciprocal relationship between reading and writing. Questions will ask you to identify the correct instructional sequence, select appropriate activities for specific phonics patterns, interpret student errors, and choose differentiated approaches. The exam tests practical application — not definitions alone.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Role of Phonics in Reading Development</p>
  <p class="sg-text">Phonics instruction teaches the systematic relationships between letters (graphemes) and sounds (phonemes), enabling students to decode unfamiliar words accurately and build automatic word recognition. Automatic word recognition frees cognitive resources for comprehension. Research consistently shows that systematic, explicit phonics instruction — presented in a deliberate scope and sequence — produces better outcomes than embedded or incidental approaches for all students, and is essential for struggling readers.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Common Vowel-Consonant Patterns (taught in sequence)</p>
  <table class="sg-table">
    <thead>
      <tr><th>Pattern</th><th>What It Means</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>CVC</strong></td><td>Consonant-Vowel-Consonant — short vowel sound</td><td>cat, sit, hop, mud</td></tr>
      <tr><td><strong>CVCC</strong></td><td>CVC + final consonant cluster — vowel stays short</td><td>fast, jump, belt, milk</td></tr>
      <tr><td><strong>CVCe (Magic E)</strong></td><td>Silent final e makes the medial vowel long</td><td>cake, bike, home, cute</td></tr>
      <tr><td><strong>CVVC</strong></td><td>Two adjacent vowels — first vowel usually long</td><td>rain, meat, boat, suit</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Phonics Terminology You Must Know</p>
  <ul class="sg-def-list">
    <li><strong>Phoneme:</strong> The smallest unit of sound in spoken language (~44 in English). Not the same as a letter.</li>
    <li><strong>Grapheme:</strong> A letter or combination of letters that represents a phoneme. "sh" is one grapheme representing one phoneme /ʃ/.</li>
    <li><strong>Consonant digraph:</strong> Two consecutive consonants that together represent a single phoneme: sh, ch, th, wh, ph, ck, ng. Each letter loses its individual sound.</li>
    <li><strong>Consonant blend:</strong> Two or three consonants where each sound is still pronounced separately: str-, bl-, cr-, sk-. Distinguished from digraphs because all sounds remain.</li>
    <li><strong>Vowel team:</strong> Two vowels that together represent a single vowel sound: ai (rain), ea (meat), oa (boat), ue (blue). Often described by the rule "when two vowels go walking, the first one does the talking" — though this rule has many exceptions.</li>
    <li><strong>Diphthong:</strong> A vowel sound that glides between two positions within one syllable: oi/oy (coin, boy), ou/ow (cloud, now). Technically distinct from vowel teams.</li>
    <li><strong>R-controlled vowel:</strong> A vowel followed by the letter r — the vowel sound is neither short nor long but is modified by the r: ar (car), er/ir/ur (fern, bird, burn), or (corn).</li>
    <li><strong>Onset:</strong> The initial consonant(s) before the vowel in a syllable (/b/ in "bat").</li>
    <li><strong>Rime:</strong> The vowel and everything that follows it in a syllable (-at in "bat"). Word families (cat, bat, sat, hat) share a rime — using rimes is a phonological, not phonemic, task.</li>
    <li><strong>Homograph:</strong> Words that are spelled identically but have different meanings and sometimes different pronunciations, depending on context. Examples: <em>bow</em> (front of a ship vs. bend at the waist), <em>tear</em> (drop from the eye vs. to rip), <em>lead</em> (to guide vs. the metal), <em>read</em> (present tense vs. past tense). Semantic and syntactic context must be used to confirm the correct pronunciation.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">High-Frequency Words</p>
  <p class="sg-text">High-frequency words are the words that appear most often in text (e.g., the, of, and, a, to, in, is, you, that, he). Many are phonetically irregular (cannot be fully decoded with known patterns), so they must be memorized as whole words. Others are phonetically regular but high-utility enough to require automaticity.</p>
  <ul class="sg-def-list">
    <li><strong>Dolch list:</strong> 220 high-frequency service words (plus 95 nouns) organized by grade level — kindergarten through grade 3. Memorizing these words supports fluency since they account for 50–75% of words in typical text.</li>
    <li><strong>Fry list:</strong> 1,000 high-frequency words ranked by frequency of occurrence. The first 100 Fry words account for approximately half of all words found in written text.</li>
    <li><strong>Irregular high-frequency words:</strong> Words that cannot be decoded using taught phonics patterns (said, come, was, one, have). Students need direct instruction and repeated practice to build automaticity with these words.</li>
    <li><strong>Word walls:</strong> A classroom display of high-frequency words organized alphabetically (or by phonics pattern) that students can reference during reading and writing. Effective when students interact with the words (practicing spelling, finding examples in text) rather than just seeing them posted.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Inflectional Morphemes (Taught with Phonics)</p>
  <p class="sg-text">Inflectional morphemes are suffixes that signal grammatical relationships without changing a word's part of speech. They are typically introduced as part of phonics instruction in early grades.</p>
  <table class="sg-table">
    <thead>
      <tr><th>Morpheme</th><th>Function</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>-s / -es</strong></td><td>Plural nouns; third-person singular verbs</td><td>cats, boxes, she runs</td></tr>
      <tr><td><strong>-ed</strong></td><td>Past tense verbs (can make /d/, /t/, or /ɪd/ sounds)</td><td>played /d/, jumped /t/, wanted /ɪd/</td></tr>
      <tr><td><strong>-ing</strong></td><td>Progressive verb form</td><td>running, eating, playing</td></tr>
      <tr><td><strong>-er</strong></td><td>Comparative adjective; "one who" (agent)</td><td>taller, teacher</td></tr>
      <tr><td><strong>-est</strong></td><td>Superlative adjective</td><td>tallest, fastest</td></tr>
    </tbody>
  </table>
  <p class="sg-text">Note: Inflectional morphemes do not change a word's part of speech. Contrast with derivational morphemes (Objective 3) which do: <em>act</em> (verb) + -ion → <em>action</em> (noun).</p>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Systematic Explicit Phonics Instruction</p>
    <p class="sg-text">Phonics patterns are taught in a deliberate scope and sequence — from simple (single consonants, short vowels in CVC words) to complex (digraphs, blends, vowel teams, CVCe, multisyllabic patterns). Each pattern is taught directly: teacher models, students practice with controlled text. This contrasts with embedded phonics (teaching patterns only when they appear in authentic reading) — systematic is more effective for all learners, and essential for those with reading difficulties.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Word Sorts</p>
    <p class="sg-text">Students sort words into categories by phonics pattern (e.g., CVC words with short-a vs. CVCe words with long-a). Can be closed sorts (categories provided) or open sorts (students determine categories). Word sorts develop phonics pattern recognition, spelling awareness, and the habit of looking closely at word structure — all transferable to real reading.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Decodable Text for Independent Practice</p>
    <p class="sg-text">Texts written specifically to use phonics patterns students have been explicitly taught. Early readers need decodable text to practice applying the code independently. These are not the only texts used — shared reading and read-alouds use authentic literature — but decodable text is the appropriate vehicle for independent phonics application in early grades.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Dictation / Encoding Practice</p>
    <p class="sg-text">Teacher says a word or sentence aloud and students write it, applying phonics knowledge. Encoding (spelling) and decoding (reading) are reciprocal: analyzing a student's spelling reveals exactly which phonics patterns they have mastered and which they have not. Dictation with corrective feedback is a powerful, low-tech phonics assessment and reinforcement tool.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Using Semantic and Syntactic Context to Confirm Decoding</p>
    <p class="sg-text">After decoding a word phonetically, students learn to ask: "Does this word make sense in the sentence?" (semantics) and "Does it sound like how we talk?" (syntax). This is critical for homographs — a student who decodes "tear" must use context to determine if it means /tɪər/ (drop of water) or /tɛr/ (to rip). Teaching students to cross-check decoding with meaning is a key comprehension monitoring strategy.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Oral and Whisper Reading with Teacher Monitoring</p>
    <p class="sg-text">Students read aloud (or quietly to themselves at a whisper) while the teacher listens and provides immediate corrective feedback on decoding errors. Oral and whisper reading keeps students actively processing every word and allows the teacher to detect errors at the moment they occur — preventing the reinforcement of incorrect decoding patterns. This is distinct from silent reading, where error patterns go undetected. Most appropriate for students whose decoding is still developing and who need monitoring to build accurate phonics application.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Watch for questions that distinguish systematic explicit phonics from embedded or whole-language approaches — the exam will expect you to know systematic explicit is the evidence-based choice. Know the difference between digraphs (sh = one sound) and blends (str = three sounds). High-frequency word instruction is a separate but parallel track to phonics — don't confuse them. For homographs: the answer will always involve using context (semantic/syntactic clues) to confirm meaning and pronunciation.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-3',
        objectiveNum: 3,
        title: 'Word Analysis: Syllabication, Morphemic Analysis, and Orthography',
        subareaId: 'I',
        content: `
<div class="sg-intro">
  <p>Objective 3 covers the skills students need to decode and spell multisyllabic words: knowledge of syllable types, morpheme analysis (roots, prefixes, suffixes), and orthographic patterns. These tools extend phonics into the upper grades and are essential for academic vocabulary. Questions will ask you to identify syllable types, apply morpheme analysis strategies, select strategies for diverse learners, and choose appropriate instructional approaches.</p>
</div>

<div class="sg-block">
  <p class="sg-label">The Six English Syllable Types — Must Know</p>
  <p class="sg-text">Every syllable in English fits one of six types. Teaching these gives students a system for decoding any multisyllabic word by dividing it into manageable chunks and applying the appropriate vowel rule.</p>
  <table class="sg-table">
    <thead>
      <tr><th>#</th><th>Type</th><th>Pattern</th><th>Vowel Sound</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td><strong>Closed</strong></td><td>Ends in a consonant</td><td>Short vowel</td><td>cat, sit, hot; hap-pen, nap-kin</td></tr>
      <tr><td>2</td><td><strong>Open</strong></td><td>Ends with the vowel</td><td>Long vowel</td><td>me, go, hi; ba-by, mu-sic, ti-ger</td></tr>
      <tr><td>3</td><td><strong>Vowel-Consonant-e (VCe)</strong></td><td>Vowel + consonant + silent e</td><td>Long vowel (silent e)</td><td>cake, bike, home; base-ment, com-pete</td></tr>
      <tr><td>4</td><td><strong>Vowel Team</strong></td><td>Two adjacent vowels together</td><td>Varies by team</td><td>rain, boat, feet; sea-son, pea-nut</td></tr>
      <tr><td>5</td><td><strong>R-Controlled</strong></td><td>Vowel + r</td><td>Modified by r (neither short nor long)</td><td>car, bird, corn, burn; gar-den, per-fect</td></tr>
      <tr><td>6</td><td><strong>Consonant-le</strong></td><td>Consonant + le at end of word</td><td>Schwa /ə/ + consonant sound</td><td>ta-ble, sim-ple, bot-tle, puz-zle</td></tr>
    </tbody>
  </table>
  <p class="sg-text"><strong>Syllabication strategy:</strong> When students encounter an unfamiliar multisyllabic word, they divide it into syllables (using patterns like VC/CV — split between two consonants; V/CV — split before a single consonant to try the open syllable first), identify the syllable type of each part, apply the vowel rule, and blend the syllables together.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Types of Morphemes</p>
  <ul class="sg-def-list">
    <li><strong>Free morpheme (base word):</strong> A morpheme that can stand alone as a word — the core of a word's meaning. Example: <em>play</em>, <em>friend</em>, <em>act</em>.</li>
    <li><strong>Bound morpheme:</strong> A morpheme that cannot stand alone and must attach to another morpheme. Includes all prefixes and suffixes.</li>
    <li><strong>Inflectional morpheme:</strong> A bound suffix that signals a grammatical relationship without changing a word's part of speech (-s, -ed, -ing, -er, -est). See Objective 2.</li>
    <li><strong>Derivational morpheme:</strong> A bound prefix or suffix that creates a new word, often changing its part of speech. Examples: <em>act</em> (verb) → <em>action</em> (noun) via -ion; <em>active</em> (adj) via -ive; <em>activate</em> (verb) via -ate.</li>
    <li><strong>Root:</strong> The core morpheme carrying primary meaning, often from Latin or Greek. May not be a free morpheme (e.g., <em>rupt</em> in "rupture" — cannot stand alone).</li>
    <li><strong>Prefix:</strong> A bound morpheme attached before the root that modifies meaning: un- (not), re- (again), pre- (before), dis- (not/opposite), mis- (wrongly), over- (too much).</li>
    <li><strong>Suffix:</strong> A bound morpheme attached after the root. Derivational suffixes include: -ion/-tion (act → action), -ness (happy → happiness), -ful (hope → hopeful), -less (hope → hopeless), -able/-ible (read → readable), -ment (develop → development), -ous (danger → dangerous).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Latin and Greek Roots (High-Yield for the Exam)</p>
  <table class="sg-table">
    <thead>
      <tr><th>Root</th><th>Origin</th><th>Meaning</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>port</strong></td><td>Latin</td><td>carry</td><td>transport, import, export, portable</td></tr>
      <tr><td><strong>dict</strong></td><td>Latin</td><td>say, speak</td><td>dictate, predict, contradict, dictionary</td></tr>
      <tr><td><strong>rupt</strong></td><td>Latin</td><td>break</td><td>rupture, disrupt, interrupt, erupt</td></tr>
      <tr><td><strong>spect/spec</strong></td><td>Latin</td><td>see, look</td><td>inspect, spectacle, perspective, respect</td></tr>
      <tr><td><strong>scrib/script</strong></td><td>Latin</td><td>write</td><td>describe, prescribe, manuscript, inscription</td></tr>
      <tr><td><strong>aud</strong></td><td>Latin</td><td>hear</td><td>audible, audience, auditorium, audit</td></tr>
      <tr><td><strong>bio</strong></td><td>Greek</td><td>life</td><td>biology, biography, antibiotic</td></tr>
      <tr><td><strong>graph/gram</strong></td><td>Greek</td><td>write, record</td><td>autograph, photograph, paragraph, telegram</td></tr>
      <tr><td><strong>phone/phon</strong></td><td>Greek</td><td>sound, voice</td><td>telephone, microphone, phonics, symphony</td></tr>
      <tr><td><strong>photo</strong></td><td>Greek</td><td>light</td><td>photograph, photosynthesis, photon</td></tr>
      <tr><td><strong>geo</strong></td><td>Greek</td><td>earth</td><td>geography, geology, geometry, geothermal</td></tr>
      <tr><td><strong>tele</strong></td><td>Greek</td><td>far, distant</td><td>telephone, telescope, television, telepathy</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Orthographic Rules (Spelling Patterns)</p>
  <ul class="sg-def-list">
    <li><strong>Drop the silent e:</strong> When adding a suffix that begins with a vowel (-ing, -ed, -able), drop the silent e: make → making; hope → hoped; love → lovable. Keep the e before consonant suffixes: hope → hopeful.</li>
    <li><strong>Double the final consonant:</strong> In a one-syllable CVC word (or stressed final CVC syllable), double the final consonant before adding a vowel suffix: hop → hopping; run → running; sit → sitting. This preserves the short vowel sound.</li>
    <li><strong>Change y to i:</strong> When a word ends in consonant + y, change the y to i before most suffixes: happy → happiness; carry → carried. Exception: keep y before -ing (carrying).</li>
    <li><strong>Compound words:</strong> Two free morphemes combined into one word: sunshine, football, butterfly. Each part retains its original spelling. Compound word analysis builds vocabulary and spelling simultaneously.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Syllable Division Practice</p>
    <p class="sg-text">Teach students the VC/CV rule (split between two consonants: hap-pen, nap-kin) and the V/CV rule (try splitting before the consonant first to get an open syllable: ti-ger, ba-by). Students underline vowels, mark consonants between them, divide, apply syllable type rules, and blend. This approach makes any multisyllabic word approachable rather than overwhelming.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Morpheme Analysis Charts</p>
    <p class="sg-text">Students sort words by shared prefix, root, or suffix, recording meanings alongside examples. Making a root "family tree" (port → transport, import, export, portable) shows how one root generates dozens of words — and teaches students to use morpheme meaning as a vocabulary-building strategy, not just a spelling tool.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Spelling by Analogy (Word Families)</p>
    <p class="sg-text">Students apply known spelling patterns to new words: knowing "light" helps spell "might," "night," "fight," "plight." Analogical reasoning is efficient and directly mirrors what skilled readers do automatically when encountering unfamiliar words with familiar parts.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Cognate Awareness Instruction for English Learners</p>
    <p class="sg-text">Spanish, French, Portuguese, and Italian share thousands of cognates with English academic vocabulary — words with the same Latin or Greek root that look and mean similar things: <em>animal/animal</em>, <em>computer/computadora</em>, <em>nation/nación</em>. Teaching EL students to recognize cognates explicitly (using etymology, pointing out shared roots) activates their home language knowledge as a resource for English vocabulary acquisition. This is especially powerful for Tier 2 and Tier 3 academic vocabulary.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Know all six syllable types by name and be able to identify them in unfamiliar words — the exam will present multisyllabic words and ask you to identify the syllable type or the appropriate instructional approach. Distinguish inflectional from derivational morphemes: inflectional morphemes don't change part of speech (-ed, -ing); derivational ones do (-ion, -ness). For EL students, cognate awareness is the right answer when the scenario involves vocabulary or word analysis with Spanish speakers or other Romance language backgrounds.</p>
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
  <p>Objective 4 covers reading fluency — what it is, how it develops, how to assess it, and how to teach it at every stage. Questions will ask you to identify appropriate fluency interventions, distinguish between the three components of fluency, interpret fluency data, and connect fluency to comprehension. Know the role of automaticity and prosody specifically — these are frequent exam targets.</p>
</div>

<div class="sg-block">
  <p class="sg-label">The Three Components of Fluency</p>
  <table class="sg-table">
    <thead>
      <tr><th>Component</th><th>Definition</th><th>Why It Matters</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Accuracy</strong></td><td>Reading words correctly without decoding errors</td><td>The foundation — you cannot be fluent if you are misreading words. Phonics gaps cause accuracy problems.</td></tr>
      <tr><td><strong>Rate</strong></td><td>Reading at an appropriate pace (neither too slow nor too fast)</td><td>Measured in WCPM (words correct per minute). Rate reflects automaticity of word recognition.</td></tr>
      <tr><td><strong>Prosody</strong></td><td>Reading with appropriate expression, phrasing, intonation, and rhythm that reflects the meaning of the text</td><td>The bridge between fluency and comprehension. A reader who chunks phrases correctly and varies intonation is constructing meaning, not just reading words.</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Key Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Automaticity:</strong> Fast, effortless word recognition that requires minimal conscious attention. When decoding is automatic, cognitive resources are freed for comprehension. Automaticity develops through wide, repeated reading at the independent reading level.</li>
    <li><strong>WCPM (Words Correct Per Minute):</strong> The standard metric for oral reading fluency — counts only correctly read words per timed one-minute oral reading. Below-benchmark WCPM is a reliable predictor of comprehension difficulty.</li>
    <li><strong>Fluency as a bridge:</strong> Fluency sits between decoding (Subarea I) and comprehension (Subarea II) in the reading development sequence. A student who decodes accurately but slowly has a fluency problem, not a phonics problem. Prosody specifically bridges fluency to comprehension.</li>
    <li><strong>Independent vs. instructional vs. frustration level:</strong> Independent = reads with 95%+ accuracy and full comprehension. Instructional = 90–94% accuracy with some support needed. Frustration = below 90% accuracy, comprehension breaks down. Fluency develops fastest through wide reading at the independent level.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Fluency at Different Stages of Reading Development</p>
  <ul class="sg-def-list">
    <li><strong>Beginning readers (K–1):</strong> Fluency is first developed at the letter-naming and word-reading level — automatic letter recognition and sight word reading. Decodable text gives beginning readers the right vehicle for building accuracy.</li>
    <li><strong>Transitional readers (grade 2–3):</strong> Fluency develops in connected text — students practice reading simple stories and informational texts with increasing smoothness. WCPM benchmarks matter here.</li>
    <li><strong>Advanced readers (grade 4+):</strong> Fluency extends to complex academic language structures. Even students who were fluent in simple narrative text may struggle with prosody in expository, technical, or literary texts — because prosody requires understanding syntax and meaning, not just decoding.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Factors That Disrupt Fluency</p>
  <ul class="sg-def-list">
    <li><strong>Limited phonics skills:</strong> A student who is still effortfully decoding word-by-word will be slow and choppy. Fluency intervention is not the right response — the root cause is a phonics gap.</li>
    <li><strong>Limited vocabulary and background knowledge:</strong> Students who don't know the words or content of a text will pause, re-read, and lose prosody — not because of decoding issues but because the language is unfamiliar. Pre-teaching vocabulary and activating background knowledge directly supports fluency in content-area reading.</li>
    <li><strong>Unfamiliar academic language structures:</strong> Complex sentences, passive constructions, embedded clauses, and discipline-specific sentence frames can disrupt prosody even in accurate readers. Building familiarity with academic sentence structures improves prosody in upper grades.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Repeated Reading</p>
    <p class="sg-text">Students read the same passage multiple times, with a goal of improving rate and prosody. Most effective when: (1) the student hears a fluent model first (teacher, audio recording), (2) the text is at the instructional level (90–94% accuracy), and (3) performance feedback is provided after each reading. Research consistently identifies repeated reading as the strongest evidence-based fluency intervention.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Echo Reading and Choral Reading</p>
    <p class="sg-text">Echo reading: teacher reads a phrase or sentence aloud; students immediately echo it, mimicking the teacher's phrasing and expression. Choral reading: whole class reads aloud in unison with the teacher. Both provide a fluent model and immediate prosody practice. Useful for teaching how punctuation and phrasing affect reading expression.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Phrase-Cued Reading</p>
    <p class="sg-text">Text is marked with slash marks (/) at phrase boundaries — natural phrasing units in a sentence. Students practice reading to the slash mark and pausing, rather than pausing at every word or at arbitrary points. Phrase-cued reading directly develops prosody by teaching students to chunk text meaningfully rather than word-by-word.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reader's Theater</p>
    <p class="sg-text">Students rehearse and perform scripts — often adapted from books — reading their assigned parts aloud. Because they are "performing" for an audience, students have authentic motivation to re-read until fluent. Reader's theater builds fluency, prosody, and reading engagement simultaneously, without being perceived as drill.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Wide Independent Reading</p>
    <p class="sg-text">Reading large volumes of text at the independent reading level builds automaticity over time. Independent reading should be at a level where students read with 95%+ accuracy — reading frustration-level texts does not build fluency. Accountability structures (reading responses, discussions) prevent wide reading from becoming passive page-turning.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">The most critical distinction: if a student reads slowly and word-by-word but decodes accurately, the problem is fluency (automaticity/rate), and repeated reading is the intervention. If a student misreads words, the problem is phonics, and fluency practice won't help. Know that prosody is the bridge between fluency and comprehension — a student reading in a monotone at grade-level WCPM still has a fluency problem (prosody). For ELs: rate and prosody problems may stem from unfamiliar vocabulary and sentence structures, not phonics — intervene at the right level.</p>
</div>
        `.trim(),
      },
    ],
  },

  {
    id: 'II',
    name: 'Development of Reading Comprehension',
    weight: '27%',
    questions: '33–35 multiple-choice questions',
    sections: [
      {
        id: 'obj-5',
        objectiveNum: 5,
        title: 'Vocabulary and Academic Language Development',
        subareaId: 'II',
        content: `
<div class="sg-intro">
  <p>Objective 5 covers vocabulary instruction in depth — from selecting which words to teach, to explicit instruction strategies, to independent word-learning strategies students can use on their own. You must know Beck's three tiers, context clue types, morphological analysis as a vocabulary tool, academic language development, and approaches for diverse learners. Questions will ask you to select vocabulary words for instruction, identify the appropriate strategy for a given word or learner, and design vocabulary-rich classroom environments.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Beck's Three Tiers of Vocabulary</p>
  <table class="sg-table">
    <thead>
      <tr><th>Tier</th><th>Type of Words</th><th>Instructional Priority</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Tier 1</strong></td><td>Basic conversational words most students know from oral language by school entry</td><td>Low — don't teach in school (most students already know these)</td><td>dog, run, table, happy, mom</td></tr>
      <tr><td><strong>Tier 2</strong></td><td>High-frequency words used across many academic subjects and texts; not basic but not highly specialized</td><td>HIGHEST — these words appear often and are rarely defined in context</td><td>analyze, significant, contrast, evidence, establish, perspective, infer, structure</td></tr>
      <tr><td><strong>Tier 3</strong></td><td>Low-frequency, domain-specific technical vocabulary used within a single subject area</td><td>Medium — teach in context of the relevant unit</td><td>photosynthesis, mitosis, equilateral, ammonite, Reconstruction</td></tr>
    </tbody>
  </table>
  <p class="sg-text"><strong>Priority:</strong> Tier 2 words are the most productive focus for direct vocabulary instruction because they appear frequently across texts and subjects but are not typically taught or defined in context. Struggling readers often have a particularly weak Tier 2 vocabulary, which compounds comprehension difficulty across every subject.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Context Clue Types (Independent Word-Learning)</p>
  <p class="sg-text">Students must learn to use different types of context clues that authors embed in text to help readers understand unfamiliar words:</p>
  <table class="sg-table">
    <thead>
      <tr><th>Clue Type</th><th>Description</th><th>Signal Words / Example</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Definition / Explanation</strong></td><td>Author directly defines the word in the text</td><td>"Photosynthesis, the process by which plants convert sunlight into food…"</td></tr>
      <tr><td><strong>Apposition</strong></td><td>Definition placed directly beside the word, set off by commas, dashes, or parentheses</td><td>"The entomologist, a scientist who studies insects, examined the specimen."</td></tr>
      <tr><td><strong>Restatement / Synonym</strong></td><td>A familiar word or phrase with similar meaning nearby</td><td>"She was so loquacious — talking nonstop — that everyone grew tired."</td></tr>
      <tr><td><strong>Contrast / Antonym</strong></td><td>The opposite meaning is used, allowing inference of the word's meaning</td><td>"Unlike his gregarious brother, Marcus was solitary and withdrawn."</td></tr>
      <tr><td><strong>Syntax / Grammar</strong></td><td>The word's grammatical role (noun, verb, adjective) and its position in the sentence provide clues</td><td>The word "undulate" in "The snake undulated through the grass" must be a verb meaning something like move or wave.</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Direct Vocabulary Instruction Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Student-Friendly Definitions with Contextualized Examples</p>
    <p class="sg-text">Dictionary definitions are often written for people who already know the word. Effective vocabulary instruction uses language students understand: "Somber means very serious and a little sad — like the feeling at a funeral." Follow immediately with multiple examples across contexts (a somber mood, a somber color, a somber speech) to build a rich representation.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Semantic Mapping</p>
    <p class="sg-text">Students build a web around a target word, connecting synonyms, antonyms, examples, non-examples, and the word's relationship to other words they know. Semantic mapping builds deep word knowledge — the kind that enables inference and comprehension — rather than superficial definition memorization.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Word Consciousness Activities</p>
    <p class="sg-text">Word consciousness is students' interest in and awareness of words — noticing new words, appreciating word choices, enjoying wordplay. Teachers build it by: celebrating interesting word choices in read-alouds, posting "word of the day" with student-generated sentences, encouraging students to add new words to personal dictionaries, and discussing etymology (word origins/history) as inherently interesting stories.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Morphological Analysis as a Vocabulary Strategy</p>
    <p class="sg-text">Teaching students to decompose unfamiliar words using known roots and affixes: seeing "biosphere" for the first time, a student who knows <em>bio</em> (life) + <em>sphere</em> (ball/globe) can infer "the zone of life surrounding Earth." This scales vocabulary learning — knowledge of 20 common roots and affixes can unlock hundreds of academic words.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reference Materials</p>
    <p class="sg-text">Teaching students to use dictionaries (for precise meaning and pronunciation), thesauruses (for synonyms and connotation distinctions), and glossaries (for domain-specific definitions) as word-learning tools — not as a punitive "look it up" directive but as a skill with a real purpose. Digital dictionaries and online etymology tools extend this in upper grades.</p>
  </div>
</div>

<div class="sg-block">
  <p class="sg-label">Academic Language: Beyond Single Words</p>
  <p class="sg-text">Academic language includes not just vocabulary but also the grammatical structures and discourse patterns of academic texts — which differ significantly from conversational English. Students (especially ELs and those with limited literacy exposure) need explicit instruction in:</p>
  <ul class="sg-def-list">
    <li><strong>Idioms:</strong> Fixed expressions whose meaning cannot be derived from the individual words: "raining cats and dogs," "hit the nail on the head," "better safe than sorry." Idioms are particularly challenging for ELs and literal thinkers.</li>
    <li><strong>Proverbs:</strong> Short, commonly known sayings expressing general truths: "Actions speak louder than words." Students encountering these in text need to know they are figurative, not literal.</li>
    <li><strong>Foreign words and abbreviations in English:</strong> Many common English expressions come from other languages: <em>RSVP</em> (French: répondez s'il vous plaît), <em>et al.</em> (Latin: and others), <em>vs.</em> (Latin: versus). Students need direct instruction that these have conventional English uses.</li>
    <li><strong>Discipline-specific symbols:</strong> The degree symbol (°) means temperature in science and angles in math — students must learn these context-dependent meanings explicitly. Mathematical symbols (+, ×, =) have precise meanings that differ from their everyday or other-discipline uses.</li>
    <li><strong>Complex sentence structures:</strong> Passive voice, embedded clauses, nominalizations (turning verbs into nouns: "demonstrate" → "demonstration"), and logical connectors (however, furthermore, consequently) are characteristic of academic writing and must be explicitly taught.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Wide Reading for Vocabulary Growth</p>
  <p class="sg-text">Research shows that most vocabulary is acquired incidentally through wide reading — students who read broadly across genres, topics, and difficulty levels encounter new words repeatedly in varied contexts, building durable word knowledge. Effective teachers promote wide reading by: providing access to a diverse classroom library, integrating content-area texts across the curriculum, using purposeful read-alouds with rich vocabulary, and creating time for sustained independent reading with accountability.</p>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Know the three tiers cold — the exam will describe a word and ask which tier it belongs to, or ask which words to prioritize for direct instruction. Tier 2 = high-frequency academic words across subjects = always the highest priority for direct instruction. Context clue types (apposition, contrast, definition) will appear in exam scenarios where you must identify which type is being used or which to teach. For ELs: cognate awareness (Objective 3) and idiomatic language instruction (this objective) are the most common correct answers for vocabulary differentiation scenarios.</p>
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
  <p>Objective 6 covers instructional strategies for developing comprehension and analysis of literary texts — fiction, poetry, drama, folktales, myths, and other narrative forms. Questions will ask you to identify the correct comprehension level for a given question or task, select strategies for specific comprehension goals, apply knowledge of story grammar and literary analysis skills, and choose differentiated approaches. Know the three comprehension levels, story grammar, craft and structure elements, and specific instructional approaches including reciprocal teaching and close reading.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Three Levels of Reading Comprehension</p>
  <table class="sg-table">
    <thead>
      <tr><th>Level</th><th>Definition</th><th>Example Question</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Literal</strong></td><td>Understanding explicitly stated information — what the text directly says</td><td>"Where does the story take place?" "What did the character do first?"</td></tr>
      <tr><td><strong>Inferential</strong></td><td>Reading between the lines — drawing conclusions from clues in the text combined with background knowledge</td><td>"Why do you think the character made that choice?" "What does the author suggest about the theme?"</td></tr>
      <tr><td><strong>Evaluative / Critical</strong></td><td>Making judgments about the text — evaluating the author's craft, perspective, bias, and purpose</td><td>"Is the narrator reliable? Why or why not?" "How does the author's word choice affect the tone?"</td></tr>
    </tbody>
  </table>
  <p class="sg-text">Effective instruction develops comprehension at all three levels — not just literal. Many students plateau at literal comprehension; moving them to inferential and evaluative thinking requires explicit instruction and guided practice.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Story Grammar Elements (Narrative Text Structure)</p>
  <ul class="sg-def-list">
    <li><strong>Characters:</strong> The people, animals, or other beings in the story. Understanding character motivation, traits, and development is essential for literary analysis.</li>
    <li><strong>Setting:</strong> The time and place of the story — and how setting shapes character and conflict.</li>
    <li><strong>Problem / Conflict:</strong> The central challenge the main character faces: person vs. person, person vs. nature, person vs. self, person vs. society.</li>
    <li><strong>Rising action / Events:</strong> The sequence of events building toward the climax. Understanding causal relationships between events is a key comprehension skill.</li>
    <li><strong>Climax:</strong> The turning point — the moment of highest tension when the conflict comes to a head.</li>
    <li><strong>Resolution / Falling action:</strong> How the conflict is resolved and what happens afterward.</li>
    <li><strong>Theme:</strong> The central message or lesson the story conveys — not the plot summary, but the insight about life or human nature. Distinguished from topic (what the story is about) vs. theme (what it says about that topic).</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Craft and Structure in Literary Texts</p>
  <ul class="sg-def-list">
    <li><strong>Point of view:</strong> First person (I/we — narrator is a character; limited to one perspective), third person limited (narrator is outside; sees one character's thoughts), third person omniscient (narrator sees all characters' inner thoughts). Point of view shapes what the reader knows and how they interpret events.</li>
    <li><strong>Figurative language:</strong> Simile (comparison using like/as), metaphor (direct comparison), personification (giving human qualities to nonhuman things), hyperbole (extreme exaggeration), alliteration, onomatopoeia. Figurative language contributes to mood, meaning, and rhythm in literary texts.</li>
    <li><strong>Mood and tone:</strong> Mood = the atmosphere or feeling a text creates in the reader. Tone = the author's attitude toward the subject or characters, expressed through word choice and style.</li>
    <li><strong>Foreshadowing and symbolism:</strong> Advanced craft elements requiring inferential and evaluative comprehension skills. Students must look beyond the literal to identify what objects, events, or details represent larger ideas.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Aesthetic vs. Efferent Reading (Rosenblatt)</p>
  <p class="sg-text">Louise Rosenblatt's transactional reader-response theory describes two stances toward reading:</p>
  <ul class="sg-def-list">
    <li><strong>Aesthetic reading:</strong> The reader attends to the experience of reading — the feelings, images, and emotions evoked by the text. The primary goal is the lived-through experience of the story. Most appropriate for literary texts engaged as literature.</li>
    <li><strong>Efferent reading:</strong> The reader focuses on what information will be taken away from the text — facts, arguments, procedures. Most appropriate for informational texts read for a specific purpose.</li>
  </ul>
  <p class="sg-text">Effective teachers help students recognize which stance is appropriate for different reading purposes. Literary discussion groups and response journals promote aesthetic engagement; note-taking and outlining activities support efferent purposes.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Think-Alouds</p>
    <p class="sg-text">The teacher reads aloud and verbalizes their internal comprehension process: "I'm confused here — let me re-read that sentence… Oh, now I see that the character is speaking sarcastically." Think-alouds make invisible comprehension strategies visible and teachable. Students then practice their own think-alouds with peers.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reciprocal Teaching</p>
    <p class="sg-text">A structured small-group strategy where students take turns leading four comprehension strategies: (1) Predicting (what will happen next?), (2) Questioning (generating questions about the text), (3) Clarifying (identifying and resolving confusion), and (4) Summarizing (restating the main idea). Research shows reciprocal teaching significantly improves reading comprehension, especially for struggling readers.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Close Reading</p>
    <p class="sg-text">Students read a short, complex passage multiple times, each time for a different purpose: first for general understanding, then for vocabulary, then for text structure, then for author's craft. Text-dependent questions require students to return to specific passages for evidence. Close reading builds the habit of reading carefully and precisely — rather than skimming for general meaning.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Literature Circles and Literary Discussions</p>
    <p class="sg-text">Small groups read the same text and meet to discuss, using assigned or chosen roles (discussion director, literary luminary, connector, illustrator). Literary discussion develops higher-order thinking, oral language, and the ability to use textual evidence to support claims — all skills that transfer directly to written comprehension tasks.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Graphic Organizers (Story Maps, Character Analysis Charts)</p>
    <p class="sg-text">Visual scaffolds that help students organize story grammar elements (character → setting → problem → events → resolution) or analyze characters (traits → evidence → motivation → change). Most effective when used as a thinking tool during or immediately after reading, not as a fill-in-the-blank worksheet completed from memory.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Know the three comprehension levels and be able to classify any given question as literal, inferential, or evaluative. Reciprocal teaching (4 strategies: predict, question, clarify, summarize) frequently appears in exam scenarios involving struggling readers. Aesthetic vs. efferent: if a question asks about the emotional or experiential response to a literary text, aesthetic is the answer; if it asks about extracting and using information, efferent is the answer. Integration questions (comparing two texts, tracing themes across texts) are evaluative comprehension tasks.</p>
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
  <p>Objective 7 covers instructional strategies for informational (expository) text comprehension — news articles, textbooks, reference materials, digital texts, and content-area texts. Questions will ask you to identify text structure types, interpret the role of text features, select comprehension strategies for informational texts, and apply disciplinary literacy skills. The same three comprehension levels (literal, inferential, evaluative) apply here, but the focus is on argument, evidence, and critical analysis rather than narrative elements.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Five Informational Text Structures</p>
  <table class="sg-table">
    <thead>
      <tr><th>Structure</th><th>How Information Is Organized</th><th>Signal Words</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Description</strong></td><td>Describes characteristics, features, or attributes of a topic</td><td>is, has, for example, consists of, looks like</td></tr>
      <tr><td><strong>Sequence / Chronological</strong></td><td>Events or steps presented in time order</td><td>first, next, then, finally, after, before, during</td></tr>
      <tr><td><strong>Compare and Contrast</strong></td><td>Similarities and differences between two or more things</td><td>however, but, both, similarly, on the other hand, unlike, in contrast</td></tr>
      <tr><td><strong>Cause and Effect</strong></td><td>One event or condition causes another</td><td>because, therefore, as a result, consequently, leads to, due to</td></tr>
      <tr><td><strong>Problem and Solution</strong></td><td>A problem is identified and one or more solutions are presented</td><td>problem, solution, resolve, one answer is, the challenge is, this can be fixed by</td></tr>
    </tbody>
  </table>
  <p class="sg-text">Teaching text structure improves comprehension because it gives readers a framework for anticipating how information will unfold. Signal words are the primary tool students use to identify structure during reading.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Informational Text Features</p>
  <p class="sg-text">Text features in informational texts are not decorative — they carry meaning and must be read actively:</p>
  <ul class="sg-def-list">
    <li><strong>Headings and subheadings:</strong> Reveal organizational structure and allow the reader to navigate, preview, and locate information.</li>
    <li><strong>Bold print and italics:</strong> Signal key vocabulary, terms being defined, or emphasized content.</li>
    <li><strong>Captions:</strong> Explain photographs, diagrams, maps, or charts — and often contain information not in the main text.</li>
    <li><strong>Tables, charts, and diagrams:</strong> Present complex data visually. Students must learn to read these actively — not ignore them.</li>
    <li><strong>Indexes and glossaries:</strong> Navigation tools (index) and vocabulary support (glossary). Using an index to locate specific information is a strategic reading skill.</li>
    <li><strong>Electronic menus, hyperlinks, and sidebars:</strong> Digital text features that require new navigational skills — understanding that hyperlinks are a form of elaboration or evidence, and sidebars often contain supplementary but important information.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Critical Thinking About Informational Texts</p>
  <p class="sg-text">Evaluative comprehension of informational text requires students to move beyond literal understanding to critically examine the text itself:</p>
  <ul class="sg-def-list">
    <li><strong>Author's purpose:</strong> Why did the author write this? To inform, persuade, entertain, or explain? Identifying purpose is essential for evaluating the reliability and completeness of information.</li>
    <li><strong>Bias and perspective:</strong> What viewpoint does the text represent? Whose voices are present — and whose are absent? All texts reflect a perspective; critical readers identify it.</li>
    <li><strong>Sources and validity:</strong> Where did this information come from? Is the source credible, current, and relevant? Teaching students to evaluate sources is essential for digital literacy and research skills.</li>
    <li><strong>Evaluating arguments:</strong> Does the author support their claims with relevant, sufficient evidence? Is the reasoning sound? Are there logical fallacies? Argument evaluation is an evaluative comprehension skill that develops through guided practice.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Disciplinary Literacy</p>
  <p class="sg-text">Disciplinary literacy recognizes that reading in science, history, and mathematics requires different skills and habits of mind than reading general informational text:</p>
  <ul class="sg-def-list">
    <li><strong>Primary vs. secondary sources:</strong> A primary source is created by someone with direct experience of an event (a diary, letter, photograph, original research article). A secondary source interprets or analyzes primary sources (a textbook, biography, review article). Historians rely heavily on primary sources; students must learn to distinguish and evaluate both.</li>
    <li><strong>Discipline-specific word meanings:</strong> Many words have different meanings in different subjects. <em>Factor</em> = a cause (general) but also a number that divides evenly (math). <em>Power</em> = authority (social studies) but also a mathematical exponent or rate of doing work (science/physics). Teaching students these discipline-specific meanings prevents comprehension errors.</li>
    <li><strong>Accurate summarization:</strong> Summarizing means identifying and restating main ideas in your own words — distinct from background knowledge or personal opinion. Students often insert what they already know rather than what the text says; disciplinary literacy instruction makes this distinction explicit.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Evidence-Based Instructional Strategies</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Text Structure Instruction with Signal Words</p>
    <p class="sg-text">Explicitly teach each text structure — define it, show examples, provide a graphic organizer for that structure, and have students identify signal words in real texts. Students who can identify "this is a cause-effect passage" can anticipate what information will appear and organize their reading accordingly.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Note-Taking and Outlining</p>
    <p class="sg-text">Structured note-taking (Cornell notes, graphic organizers, two-column notes) requires students to process and organize information as they read — improving both comprehension and retention. Teaching students to distinguish main ideas from supporting details, and to paraphrase rather than copy, builds the comprehension skills tested directly on the exam.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Text-Based Discussion (Accountable Talk)</p>
    <p class="sg-text">Students discuss informational texts with the requirement that all claims be supported by specific evidence from the text. "Accountable talk" norms (I agree/disagree with ___ because the text says...) develop both oral language and the comprehension habit of returning to the text for evidence — rather than relying on background knowledge or opinion alone.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Student-Generated Questioning</p>
    <p class="sg-text">Students formulate their own questions before, during, and after reading. Generating a question requires the student to identify what is important or unclear — a higher-order comprehension process. Teaching question types (literal, inferential, evaluative) helps students generate questions at all levels and prepares them for test-style questions on content.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Activating Schema (Prior Knowledge)</p>
    <p class="sg-text">Before reading, the teacher prompts students to connect what they already know about the topic to the text they are about to read — building a mental framework that aids comprehension. Strategies: KWL charts (Know / Want to Know / Learned), anticipation guides, brief class discussions, or a preview walk through headings and images. Activating schema is not the same as background knowledge building: it draws on knowledge students already have, whereas background knowledge building provides new information. Both support comprehension; both are named in the NES framework.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Know all five text structures and their signal words — the exam will present a passage or description and ask you to identify the structure or select the appropriate graphic organizer (cause-effect maps, Venn diagrams for compare-contrast, flow charts for sequence). Disciplinary literacy scenarios will describe students struggling with a science or social studies text — the right answer will involve addressing discipline-specific vocabulary, primary/secondary source distinctions, or content-specific reading strategies, not just generic comprehension strategies.</p>
</div>
        `.trim(),
      },
    ],
  },

  {
    id: 'III',
    name: 'Reading Assessment and Instruction',
    weight: '18%',
    questions: '21–23 multiple-choice questions',
    sections: [
      {
        id: 'obj-8',
        objectiveNum: 8,
        title: 'Assessing Reading Development',
        subareaId: 'III',
        content: `
<div class="sg-intro">
  <p>Objective 8 covers the full landscape of reading assessment — the purposes of different assessment types, the tools used to assess each component of reading, how to interpret data, and how to use data to make instructional decisions. Questions will ask you to identify the correct assessment type for a given purpose, interpret student data, select appropriate tools, and apply differentiated assessment practices. This objective is highly applied — know not just definitions but when and why each assessment type is used.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Five Purposes of Reading Assessment</p>
  <table class="sg-table">
    <thead>
      <tr><th>Purpose</th><th>Question It Answers</th><th>When Used</th><th>Example Tools</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Screening (Entry-Level)</strong></td><td>Which students may be at risk and need closer monitoring?</td><td>Beginning of school year (or new enrollment); universal — given to ALL students</td><td>DIBELS, AIMSWEB, easyCBM, phonics screeners</td></tr>
      <tr><td><strong>Formative / Progress Monitoring</strong></td><td>Is this student responding to instruction/intervention? Is the intervention working?</td><td>Frequently (weekly or biweekly) for students receiving intervention</td><td>CBM reading probes, running records, fluency checks</td></tr>
      <tr><td><strong>Summative</strong></td><td>Has this student achieved the grade-level standard?</td><td>End of unit, semester, or year</td><td>State assessments, end-of-year tests, final unit assessments</td></tr>
      <tr><td><strong>Diagnostic</strong></td><td>Exactly which specific skills is this student missing?</td><td>After screening identifies a student as at-risk; used to plan specific intervention</td><td>CORE Phonics Survey, QRI, SPIRE Placement, spelling inventories</td></tr>
      <tr><td><strong>Pre/Post (Program Evaluation)</strong></td><td>Did this instruction/intervention produce measurable growth?</td><td>Before and after a specific instructional unit or program</td><td>Same assessment given twice; compares scores to measure effect size</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Key Assessment Concepts</p>
  <ul class="sg-def-list">
    <li><strong>Validity:</strong> A valid assessment actually measures what it claims to measure. A phonics assessment that requires significant reading comprehension to understand the directions has validity problems — the score may reflect comprehension, not phonics.</li>
    <li><strong>Reliability:</strong> A reliable assessment produces consistent results across administrations, scorers, and time. An assessment where two different teachers would score the same response very differently has low reliability.</li>
    <li><strong>Criterion-referenced assessment:</strong> Compares a student's performance to a fixed standard or benchmark (e.g., 95 WCPM in spring of second grade). Tells you whether the student has reached a specific goal — not how they compare to others.</li>
    <li><strong>Norm-referenced assessment:</strong> Compares a student's performance to a representative sample (norm group) of students the same age or grade. Reports in percentile ranks or standard scores. Tells you how the student compares to peers — not whether they have mastered a specific skill.</li>
    <li><strong>Curriculum-Based Measurement (CBM):</strong> A type of progress monitoring where students' performance is measured using brief, standardized probes from the curriculum (e.g., one-minute oral reading fluency passage, nonsense word fluency tasks). Sensitive to growth over time; ideal for progress monitoring.</li>
    <li><strong>Running record:</strong> An informal, teacher-administered assessment where the teacher records every word a student reads aloud, noting errors, self-corrections, and reading behaviors. Yields accuracy percentage, error types, and reading strategies used — a rich diagnostic window into a reader's process.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Assessing the Five Components of Reading</p>
  <table class="sg-table">
    <thead>
      <tr><th>Component</th><th>Assessment Tools and Approaches</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Phonemic Awareness</strong></td><td>PSF (Phoneme Segmentation Fluency), NWF (Nonsense Word Fluency), phoneme blending and segmentation probes</td></tr>
      <tr><td><strong>Phonics</strong></td><td>Nonsense word fluency tasks (isolates phonics from vocabulary), phonics inventories (CORE, letter-sound pattern surveys), spelling inventories (analyze error types), word reading lists</td></tr>
      <tr><td><strong>Fluency</strong></td><td>Oral Reading Fluency (ORF) — timed one-minute reading; WCPM calculated; compare to grade-level norms</td></tr>
      <tr><td><strong>Vocabulary</strong></td><td>Oral vocabulary tests, word knowledge scales, vocabulary matching tasks, word-reading inventories with meaning checks</td></tr>
      <tr><td><strong>Comprehension</strong></td><td>Oral retellings (scored for completeness and accuracy), text-based questioning (at all three levels), written responses, maze tasks (multiple-choice cloze)</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Using Assessment Data for Instructional Decision-Making</p>
  <p class="sg-text">Assessment data is only valuable when it drives instruction. The cycle is: assess → analyze → plan → teach → re-assess. Specific decision points:</p>
  <ul class="sg-def-list">
    <li><strong>Selecting instructional materials:</strong> A student below benchmark on phonics screeners needs decodable text at their instructional level — not grade-level trade books for independent reading.</li>
    <li><strong>Flexible grouping:</strong> Form small groups based on current assessment data; adjust groups as students grow. Groups should change when data shows growth — permanent groups prevent upward movement.</li>
    <li><strong>Applying scaffolds:</strong> Choose scaffolds that address the identified gap: vocabulary support for a student with language comprehension deficits; phonics review for a student with decoding errors; prosody modeling for a student who is accurate but disfluent.</li>
    <li><strong>Instructional format:</strong> Whole class for introducing new concepts; small group for guided practice and targeted intervention; individual for diagnostic assessment and intensive intervention.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Differentiating Assessment for Diverse Learners</p>
  <ul class="sg-def-list">
    <li><strong>English Learners:</strong> Oral language proficiency in English must be assessed separately from reading skills. An EL student may have strong phonemic awareness and phonics skills but appear to have comprehension deficits because the texts use vocabulary or syntax they haven't yet acquired in English. Use native language assessments or non-verbal tasks to distinguish language proficiency from reading ability.</li>
    <li><strong>Students with disabilities:</strong> Provide testing accommodations (extended time, oral administration, reduced-distraction environment) that remove barriers unrelated to the reading skill being measured. The assessment should measure reading, not the disability's secondary effects. IEP-specified accommodations must be applied consistently.</li>
    <li><strong>Avoiding over-identification:</strong> Not every student who struggles with reading has a learning disability. Before referring for special education evaluation, document that the student received high-quality, explicit instruction (Tier 1) and evidence-based small-group intervention (Tier 2) with progress monitoring — and that growth was insufficient despite these supports.</li>
  </ul>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">Matching the assessment type to the purpose is the most common question type: screening = who needs help (universal, efficient, brief); diagnostic = what specific skill is missing (targeted, detailed, after screening); progress monitoring = is the intervention working (frequent, brief, ongoing). Know that screening does NOT diagnose — it only identifies who to look at more closely. Reliability and validity are frequently tested: an assessment can be reliable but invalid (consistently measuring the wrong thing), but cannot be valid if unreliable. For ELs: the right answer almost always involves distinguishing between language proficiency and reading ability.</p>
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
  <p>Objective 9 is the "putting it all together" objective — it covers the principles and practices that organize effective reading instruction across all components. Questions will ask you to apply the Simple View of Reading, describe tiered instructional models, evaluate text complexity, explain close reading, design differentiated instruction, and select appropriate texts. This objective integrates knowledge from all previous objectives into coherent instructional practice.</p>
</div>

<div class="sg-block">
  <p class="sg-label">The Simple View of Reading</p>
  <p class="sg-text">Gough and Tunmer's Simple View of Reading (1986) is the foundational formula for understanding reading comprehension:</p>
  <div style="text-align: center; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
    <p style="font-size: 18px; font-weight: 700; color: #111827; font-family: Georgia, serif;">Reading Comprehension (RC) = Decoding (D) × Language Comprehension (LC)</p>
  </div>
  <ul class="sg-def-list">
    <li><strong>Decoding (D):</strong> The ability to translate print into spoken language — encompasses phonemic awareness, phonics, and word recognition skills (Subarea I).</li>
    <li><strong>Language Comprehension (LC):</strong> The ability to understand spoken or written language — encompasses vocabulary, background knowledge, syntax, discourse, and reasoning (Subarea II).</li>
    <li><strong>Implication:</strong> If either component is zero (or very weak), reading comprehension collapses. A student who cannot decode cannot access text; a student who can decode but lacks language comprehension cannot understand text. Assessment must determine which factor (or both) is limiting a student's reading comprehension — the intervention must address the identified weakness.</li>
  </ul>
  <p class="sg-text"><strong>Instructional implication:</strong> In early grades, decoding is the primary bottleneck — phonics instruction is highest priority. In upper grades, language comprehension often becomes the primary bottleneck — vocabulary and comprehension strategy instruction takes center stage.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Ehri's Phases of Word Reading Development</p>
  <p class="sg-text">Linnea Ehri's phase model describes how word reading develops in predictable, overlapping phases. Understanding a student's current phase tells you exactly what to teach next.</p>
  <table class="sg-table">
    <thead>
      <tr><th>Phase</th><th>How Words Are Recognized</th><th>What It Looks Like</th><th>Instructional Implication</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Pre-Alphabetic</strong></td><td>Visual/contextual cues — not letter-sound at all</td><td>Reads "stop" from the red octagon shape; reads own name by visual memorization; substitutes visually similar words</td><td>Teach letter names, letter-sound correspondences, concepts of print; introduce alphabetic principle</td></tr>
      <tr><td><strong>Partial Alphabetic</strong></td><td>Some letter-sound cues — typically first and last letters only</td><td>Reads "big" for "bag" (notices b _ g); guesses heavily from context and initial letter</td><td>Teach full phoneme segmentation; complete CVC decoding; discourage over-reliance on context cues</td></tr>
      <tr><td><strong>Full Alphabetic</strong></td><td>Complete letter-sound mappings for every phoneme</td><td>Decodes CVC, CVCC, CVCe words accurately but slowly; sounds out every word; minimal sight word bank</td><td>Build phonics patterns (digraphs, blends, vowel teams); build sight word automaticity through repetition</td></tr>
      <tr><td><strong>Consolidated Alphabetic</strong></td><td>Letter patterns, syllables, and morphemes recognized as units — automatic</td><td>Reads multisyllabic words fluently; large sight word bank; decoding is fast and effortless</td><td>Teach syllabication, morpheme analysis, complex vocabulary; shift focus to fluency and comprehension</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">The Five Components of Reading (National Reading Panel)</p>
  <table class="sg-table">
    <thead>
      <tr><th>Component</th><th>Description</th><th>Primary Subarea</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Phonemic Awareness</strong></td><td>Identifying and manipulating individual phonemes in spoken words</td><td>Subarea I — Obj 1</td></tr>
      <tr><td><strong>Phonics</strong></td><td>Systematic letter-sound correspondences; decoding and encoding</td><td>Subarea I — Obj 2</td></tr>
      <tr><td><strong>Fluency</strong></td><td>Accurate, automatic, prosodic reading of connected text</td><td>Subarea I — Obj 4</td></tr>
      <tr><td><strong>Vocabulary</strong></td><td>Knowledge of words and their meanings, direct and indirect instruction</td><td>Subarea II — Obj 5</td></tr>
      <tr><td><strong>Text Comprehension</strong></td><td>Understanding and constructing meaning from literary and informational texts</td><td>Subarea II — Obj 6, 7</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Multi-Tiered Systems of Support (MTSS)</p>
  <p class="sg-text">MTSS is a framework for organizing reading instruction and intervention across three tiers, using data to determine who needs what level of support.</p>
  <table class="sg-table">
    <thead>
      <tr><th>Tier</th><th>Who</th><th>What</th><th>How Often</th><th>% of Students (typical)</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Tier 1 — Core</strong></td><td>All students</td><td>High-quality, evidence-based core reading instruction for all students; meets the needs of 80% without additional support</td><td>Daily, whole class</td><td>~80%</td></tr>
      <tr><td><strong>Tier 2 — Supplemental</strong></td><td>Students below benchmark</td><td>Small-group, targeted intervention in addition to Tier 1 core instruction — addresses specific identified skill gaps</td><td>3–5x/week, 20–30 min small group</td><td>~10–15%</td></tr>
      <tr><td><strong>Tier 3 — Intensive</strong></td><td>Students significantly below benchmark or non-responsive to Tier 2</td><td>Intensive, individualized intervention — highest intensity, most explicit, smallest group (1:1 or 1:2)</td><td>Daily, intensive, often specialist-delivered</td><td>~3–5%</td></tr>
    </tbody>
  </table>
  <p class="sg-text"><strong>Key MTSS principles:</strong> Shared responsibility and decision-making (general education, specialists, administrators); evidence-based interventions at each tier; frequent progress monitoring to adjust placement; decisions made from data, not labels. Tier placement is dynamic — students move between tiers based on their response to instruction, not permanently assigned.</p>
</div>

<div class="sg-block">
  <p class="sg-label">Text Complexity: Three Dimensions</p>
  <p class="sg-text">The Common Core framework defines text complexity using three dimensions that must all be considered when selecting texts for instruction:</p>
  <ul class="sg-def-list">
    <li><strong>Quantitative dimension:</strong> Factors measurable by computer algorithms — primarily word frequency, sentence length, and text cohesion. Reported as Lexile levels (e.g., 700L), ATOS, or Flesch-Kincaid grade level. Quantitative measures alone are insufficient — they don't capture meaning complexity.</li>
    <li><strong>Qualitative dimension:</strong> Factors requiring human judgment: (1) Levels of meaning/purpose — single, simple meaning vs. complex, layered meanings or themes; (2) Structure — conventional narrative/informational structure vs. complex, non-linear, or genre-bending; (3) Language conventionality — familiar, conversational vs. figurative, archaic, or academic language; (4) Knowledge demands — low prior knowledge required vs. extensive background knowledge required to comprehend.</li>
    <li><strong>Reader and task considerations:</strong> The reader's motivation, prior knowledge, and purpose for reading; the complexity of the task associated with the text. A Lexile 900 text about a topic a student knows deeply may be effectively accessible; the same Lexile on an unfamiliar topic may be too demanding.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Close Reading</p>
  <p class="sg-text">Close reading is a disciplined instructional practice where students read short, complex, well-crafted texts multiple times, each reading for a different purpose, with increasing depth:</p>
  <ul class="sg-def-list">
    <li><strong>First read:</strong> Students read for general understanding — what is this text about? What is the overall message or narrative?</li>
    <li><strong>Second read:</strong> Focus on vocabulary — which words are unfamiliar, important, or used in unexpected ways? What do they contribute to meaning?</li>
    <li><strong>Third read:</strong> Focus on structure and craft — how is the text organized? How does the author's word choice, sentence structure, or use of evidence contribute to the argument or effect?</li>
    <li><strong>Text-dependent questions:</strong> Questions that can only be answered by returning to the text — not by drawing on prior knowledge or opinion. "Find the sentence where the author first suggests that the colonists had concerns" requires close reading. "What do you think about taxation?" does not.</li>
    <li><strong>Annotation:</strong> Students mark the text as they read — underlining key claims, circling unfamiliar words, noting connections, writing margin questions. Annotation makes reading active and creates a record of thinking during the text.</li>
    <li><strong>Collaborative discussion:</strong> After close reading, students discuss interpretations using text evidence in small groups or whole class. Discussion extends and deepens individual reading.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Differentiated and Integrated Instruction</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Flexible Grouping</p>
    <p class="sg-text">Students are grouped by current reading level, specific skill need, or interest — and groups change as assessment data changes. Small flexible groups allow targeted instruction at the right level. Permanent, ability-based groups are not differentiation — they prevent growth by keeping students at the same level indefinitely.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Integrated Literacy Model</p>
    <p class="sg-text">Reading, writing, speaking, listening, and language conventions are not taught in isolation — they reinforce each other. A reading lesson that strategically integrates a writing response, an oral discussion, and vocabulary study from the text produces deeper learning than reading instruction alone. Planning lessons that connect two or more literacy strands is a key competency tested on the exam.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Reading Environment and Motivation</p>
    <p class="sg-text">Students who read more become better readers — but reading volume requires motivation. Evidence-based motivation strategies include: student choice in reading materials, access to a diverse classroom library, structured independent reading time with accountability, read-alouds that build book excitement, and teacher modeling of reading as a valued activity. Self-efficacy (believing you can read) is as important as skill — instruction that produces success at the right level builds both.</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">Instructional Technologies for Reading Development</p>
    <p class="sg-text">Technology tools support reading instruction and engagement at all levels: text-to-speech software allows students with decoding difficulties to access grade-level content; digital decodable readers provide phonics practice with immediate feedback; e-books with highlighted text build fluency through repeated reading with a fluent model; vocabulary apps (e.g., Quizlet) support repeated, spaced exposure to new words; reading engagement platforms provide access to leveled texts with accountability structures. Instructional technology should support — not replace — explicit, systematic reading instruction.</p>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch</p>
  <p class="sg-text">MTSS is a common exam target — know the three tiers, who they serve, and what type of instruction occurs at each. The Simple View formula (RC = D × LC) will appear in diagnostic scenarios: a student who decodes well but comprehends poorly has a language comprehension problem, not a phonics problem. Text complexity requires all three dimensions — a Lexile score alone is not sufficient for text selection decisions. Close reading questions will describe a classroom and ask which element of close reading is being used (text-dependent questions, multiple readings, annotation). The answer is almost never "assign more independent reading" — always look for the explicit, systematic, evidence-based response.</p>
</div>
        `.trim(),
      },
    ],
  },

  {
    id: 'IV',
    name: 'Integration of Knowledge and Understanding',
    weight: '20%',
    questions: '2 open-response item assignments (10% each)',
    sections: [
      {
        id: 'obj-10',
        objectiveNum: 10,
        title: 'Open Response: Foundational Reading Skills',
        subareaId: 'IV',
        content: `
<div class="sg-intro">
  <p>Assignment 1 (Objective 10) presents a scenario involving a student's foundational reading skills data — typically a phonemic awareness screener, phonics inventory, fluency measure, or running record. Your job: (1) accurately interpret what the data reveals about the student's current development, (2) identify the specific skill gap, and (3) recommend two targeted, evidence-based instructional strategies that directly address the identified gap. This assignment is worth 10% of your total score.</p>
</div>

<div class="sg-block">
  <p class="sg-label">What the Scorer Is Looking For</p>
  <ul class="sg-def-list">
    <li><strong>Accurate interpretation:</strong> Your analysis of the student data must be correct. Misidentifying a phonics error as a fluency problem — or vice versa — will cost you points regardless of how well your response is written.</li>
    <li><strong>Specificity:</strong> Every claim must reference specific evidence from the scenario. Quote or paraphrase the data: scores, error patterns, specific words misread. General statements about what struggling readers need earn no credit.</li>
    <li><strong>Explicit reasoning:</strong> After citing evidence, explain why it supports your claim using your knowledge of reading development. The connection between evidence and interpretation cannot be implied — state it directly.</li>
    <li><strong>Completeness:</strong> Read the prompt carefully. If it asks for two strategies, provide two fully developed strategies. Addressing only one part of a two-part prompt cannot score above a 2.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">4-Point Scoring Rubric</p>
  <table class="sg-table">
    <thead>
      <tr><th>Score</th><th>Level</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>4</strong></td><td>Thorough</td><td>Fully achieves the purpose. Accurate analysis. Specific evidence from scenario. Clear claim-evidence-reasoning structure. All prompt parts addressed.</td></tr>
      <tr><td><strong>3</strong></td><td>Adequate</td><td>Largely achieves the purpose. Mostly accurate. Evidence present but reasoning may be partially developed. All parts addressed.</td></tr>
      <tr><td><strong>2</strong></td><td>Limited</td><td>Partially achieves the purpose. Some inaccuracies or incomplete analysis. Evidence referenced but weakly connected to claims. Not all parts fully addressed.</td></tr>
      <tr><td><strong>1</strong></td><td>Weak</td><td>Purpose not achieved. Significant inaccuracies or very brief response. Little evidence from scenario. Minimal reasoning.</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Response Structure: Claim → Evidence → Reasoning</p>
  <p class="sg-text">Use this structure for every analytical point in your response — especially when identifying the skill gap and justifying each strategy:</p>
  <div class="sg-strategy">
    <p class="sg-strategy-name">1. State Your Claim Directly</p>
    <p class="sg-text">Open each analytical point with a direct, specific claim. Don't bury it in background information. Example: "Maya's primary area of need is phoneme segmentation, which is directly limiting her development of phonics decoding skills."</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">2. Cite Evidence from the Scenario</p>
    <p class="sg-text">Immediately follow with specific numbers, patterns, or behaviors from the data: "Her PSF score of 18 correct phonemes per minute (benchmark: 35+) indicates she cannot yet efficiently isolate individual sounds in spoken words."</p>
  </div>
  <div class="sg-strategy">
    <p class="sg-strategy-name">3. Connect with Explicit Reasoning</p>
    <p class="sg-text">Explain why that evidence supports your claim using reading development knowledge: "Because phoneme segmentation is a prerequisite for phonics decoding, a deficit at this level explains the low NWF scores — she cannot yet map sounds to letters because she cannot yet reliably isolate those sounds."</p>
  </div>
</div>

<div class="sg-block">
  <p class="sg-label">Sample Exam Prompt — Assignment 1</p>
  <p class="sg-text" style="color: #6b7280; font-style: italic; font-size: 12.5px;">The following prompt is representative of what you will see on test day. Study it carefully, then read the exemplary response below.</p>
  <div class="sg-prompt-box">A first-grade teacher is reviewing data from the school's fall reading screener. One student, Maya, received the following results:

• Phoneme Segmentation Fluency (PSF): 18 correct phonemes per minute (benchmark: 35+)
• Nonsense Word Fluency — Letter Sounds (NWF-LNF): 22 correct letter sounds per minute (benchmark: 27+)
• Nonsense Word Fluency — Whole Words Read (NWF-WWR): 4 whole words per minute (benchmark: 15+)
• Oral Reading Fluency (ORF): Not yet assessed (below prerequisite threshold)

Based on this data:

Part A: Identify Maya's primary area of reading difficulty and explain what the data specifically reveals about her current level of skill development in that area.

Part B: Describe two evidence-based instructional strategies the teacher should use to address Maya's identified area of difficulty. For each strategy, explain how it would be implemented and why it is appropriate for Maya's specific skill profile.</div>
</div>

<div class="sg-block">
  <p class="sg-label">Exemplary Response — Score 4 / Thorough</p>
  <div class="sg-score-badge">Score: 4 — Thorough</div>
  <div class="sg-response-box">
    <p><strong>Part A — Identifying Maya's Primary Area of Difficulty</strong></p>
    <p style="margin-top: 8px;">Maya's primary area of difficulty is phonemic awareness — specifically phoneme segmentation — which is directly limiting her ability to develop phonics decoding skills.</p>
    <p style="margin-top: 8px;">Her PSF score of 18 correct phonemes per minute, compared to the fall first-grade benchmark of 35+, indicates that Maya cannot yet efficiently isolate and identify the individual sounds in spoken words. This is the foundational skill for phonics: a student who cannot segment a spoken word into its phonemes cannot connect those phonemes to the letters that represent them. Her NWF-LNF score of 22 (benchmark 27+) and NWF-WWR of 4 (benchmark 15+) confirm that this phonemic awareness deficit is translating directly into phonics difficulty: she is learning letter sounds below benchmark and is not yet blending letter sounds into whole decodable words. Together, the data pattern is consistent with a student at the phoneme awareness stage who has not yet fully bridged into phonics decoding.</p>

    <p style="margin-top: 12px;"><strong>Part B — Two Evidence-Based Instructional Strategies</strong></p>
    <p style="margin-top: 8px;"><strong>Strategy 1: Elkonin (Sound) Box Segmentation</strong></p>
    <p style="margin-top: 4px;">The teacher should use Elkonin boxes with Maya daily in a small-group or one-on-one setting. A grid of connected boxes — one per phoneme — is placed before the student. The teacher says a CVC word aloud ("cat"), and Maya pushes a token into each box as she says each phoneme: /k/ → box 1, /æ/ → box 2, /t/ → box 3. Once Maya segments consistently with tokens, the teacher introduces letters: Maya writes the correct letter in each box as she segments, bridging phonemic awareness into phonics encoding.</p>
    <p style="margin-top: 4px;">This strategy is appropriate for Maya because her PSF score reveals she cannot yet reliably segment spoken words into their phonemes. Elkonin boxes make phoneme segmentation concrete and physical — the boxes represent the abstract concept of "separate sounds" in a way a first-grader can see and manipulate. Research consistently identifies phoneme segmentation as the phonemic awareness skill most predictive of early decoding success, and Elkonin boxes are among the most validated interventions for building it.</p>

    <p style="margin-top: 12px;"><strong>Strategy 2: Phoneme Blending Drills with CVC Words</strong></p>
    <p style="margin-top: 4px;">Because Maya's NWF-WWR score of 4 (benchmark 15+) shows she is not yet blending letter sounds into whole words, the teacher should conduct daily phoneme blending drills using decodable CVC word cards. The teacher points to each letter in a word while saying the isolated sound slowly — /m/ ... /æ/ ... /p/ — then asks Maya to blend: "What word?" Maya responds: "map." The pace and complexity increase (CCVC, CVCC words) as accuracy improves.</p>
    <p style="margin-top: 4px;">Blending is the complement of segmentation and directly mirrors the process of phonics decoding — isolating letter sounds then combining them into a word. Maya's NWF-WWR of 4 confirms this as a second, closely related gap. Using decodable CVC words (rather than nonsense words exclusively) ensures instruction connects to real reading. The explicit, systematic progression from isolated sounds to blended whole words mirrors the exact decoding process Maya needs to internalize.</p>
  </div>

  <p class="sg-label" style="margin-top: 16px;">Why This Response Scores a 4</p>
  <div class="sg-rubric-grid">
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Purpose</p>
      <p class="sg-rubric-cell-text">Both parts fully addressed — skill identification (Part A) and two complete, distinct strategies (Part B).</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Subject Knowledge</p>
      <p class="sg-rubric-cell-text">PSF and NWF data correctly interpreted as phonemic awareness and phonics deficits. Segmentation identified as prerequisite for phonics.</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Support</p>
      <p class="sg-rubric-cell-text">All claims reference specific numbers from the scenario (PSF: 18, benchmark: 35+; NWF-WWR: 4, benchmark: 15+). No unsupported generalizations.</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Reasoning</p>
      <p class="sg-rubric-cell-text">Each strategy is explicitly tied to Maya's specific data profile — not generic "evidence-based strategies." The why for each strategy is explained.</p>
    </div>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch — Score-Dropping Mistakes</p>
  <p class="sg-text">The most common mistakes on Assignment 1: (1) Recommending intervention at the wrong level — if data shows a phoneme segmentation deficit, recommend segmentation instruction, not fluency work. (2) Writing general reading knowledge instead of analyzing this student's specific data — "small groups and differentiated instruction" without naming a strategy and connecting it to the data earns no credit. (3) Addressing only one part of a two-part prompt. (4) Misidentifying the skill area (confusing phonological awareness with phonics, or fluency with comprehension). Jump directly to your analysis — don't spend response time defining what phonemic awareness is.</p>
</div>
        `.trim(),
      },
      {
        id: 'obj-11',
        objectiveNum: 11,
        title: 'Open Response: Reading Comprehension',
        subareaId: 'IV',
        content: `
<div class="sg-intro">
  <p>Assignment 2 (Objective 11) presents a scenario involving a student's reading comprehension data — typically retelling results, question-response data at literal/inferential/evaluative levels, or a student's written response to a text. Your job: (1) accurately analyze the pattern across the data (not just the total score), (2) identify whether the difficulty is at the literal, inferential, or evaluative level and what specifically is breaking down, and (3) recommend two targeted, evidence-based comprehension instruction strategies that directly address the identified gap. This assignment is worth 10% of your total score.</p>
</div>

<div class="sg-block">
  <p class="sg-label">What Makes Assignment 2 Different from Assignment 1</p>
  <table class="sg-table">
    <thead>
      <tr><th></th><th>Assignment 1 — Foundational Skills</th><th>Assignment 2 — Reading Comprehension</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Data type</strong></td><td>Phonemic awareness screeners, phonics inventories, fluency scores</td><td>Retelling rubrics, question-response data by level, written responses to text</td></tr>
      <tr><td><strong>Skill area</strong></td><td>Phonemic awareness, phonics, decoding, fluency (Subarea I)</td><td>Vocabulary, literal/inferential/evaluative comprehension, text structure, language comprehension (Subarea II)</td></tr>
      <tr><td><strong>Common gap patterns</strong></td><td>Phoneme segmentation deficit → phonics deficit; phonics gap → fluency breakdown</td><td>Literal OK but inferential fails; vocabulary gaps across all levels; literal fails = possible decoding issue (see Simple View)</td></tr>
      <tr><td><strong>Intervention type</strong></td><td>Phonemic awareness activities, phonics instruction, fluency practice</td><td>Vocabulary instruction, comprehension strategy instruction, text structure teaching, think-alouds</td></tr>
    </tbody>
  </table>
</div>

<div class="sg-block">
  <p class="sg-label">Analyzing Comprehension Data Patterns</p>
  <ul class="sg-def-list">
    <li><strong>Literal comprehension failure:</strong> If a student cannot answer literal questions correctly, first rule out a decoding problem — they may not be able to read the text accurately enough to comprehend it at any level. Check fluency/decoding data. If decoding is fine and literal comprehension fails, look at vocabulary — the student may not know the words in the text.</li>
    <li><strong>Literal OK, inferential fails:</strong> The most common comprehension pattern. The student can recall facts but cannot draw conclusions, infer unstated information, or connect text to background knowledge. Target: explicit inferential comprehension instruction (generating inferences, visualizing, questioning the text).</li>
    <li><strong>Literal and inferential OK, evaluative fails:</strong> The student understands what the text says and can draw basic inferences, but cannot evaluate the author's craft, argument quality, point of view, or bias. Target: critical reading instruction (author's purpose, bias, argument structure, comparing perspectives).</li>
    <li><strong>Retelling — incomplete or inaccurate:</strong> A poor retelling may indicate failure at any level. Analyze what is missing: missing key details = literal failure; missing logical connections = inferential failure; unable to distinguish main idea from details = text structure weakness.</li>
  </ul>
</div>

<div class="sg-block">
  <p class="sg-label">Sample Exam Prompt — Assignment 2</p>
  <p class="sg-text" style="color: #6b7280; font-style: italic; font-size: 12.5px;">The following prompt is representative of Assignment 2 on NES 190/890. Read the data carefully, then study the exemplary response below.</p>
  <div class="sg-prompt-box">A third-grade teacher asked a student, Carlos, to read a 450-word informational text about the water cycle independently, then assessed his comprehension using the following methods:

Oral Retelling (scored on a 0–4 scale):
• Main idea: 1/2 — Carlos named "water" as the topic but could not state what the text says about water.
• Key details: 2/4 — Named two of the four key details accurately; omitted the steps connecting evaporation to condensation.
• Sequence/structure: 0/2 — Could not explain the order of steps in the water cycle; described events as happening randomly.
• Vocabulary: 1/2 — Used "evaporation" once but used it in the wrong context; did not use "condensation" or "precipitation."

Comprehension Questions:
• Literal (3 questions): 3/3 correct — correctly identified factual information stated directly in the text.
• Inferential (3 questions): 1/3 correct — correctly answered only the question with an explicit text clue; missed questions requiring reasoning across multiple paragraphs.
• Evaluative (2 questions): 0/2 — Could not explain why the author organized the text as a sequence or identify the purpose of the diagram.

Oral reading fluency (from an earlier assessment): 98 WCPM, 97% accuracy (at grade-level benchmark).

Based on this data:

Part A: Identify Carlos's primary area of reading difficulty and explain what the data specifically reveals about his reading comprehension skills.

Part B: Describe two evidence-based instructional strategies the teacher should implement to address Carlos's identified area of difficulty. For each strategy, explain how it would be implemented and why it is effective for Carlos's specific comprehension profile.</div>
</div>

<div class="sg-block">
  <p class="sg-label">Exemplary Response — Score 4 / Thorough</p>
  <div class="sg-score-badge">Score: 4 — Thorough</div>
  <div class="sg-response-box">
    <p><strong>Part A — Identifying Carlos's Primary Area of Difficulty</strong></p>
    <p style="margin-top: 8px;">Carlos's primary area of difficulty is inferential comprehension, with a secondary weakness in informational text structure knowledge — both of which are limiting his ability to construct meaning beyond what is explicitly stated in the text.</p>
    <p style="margin-top: 8px;">Carlos's fluency data (98 WCPM, 97% accuracy) and his perfect literal comprehension score (3/3) confirm that decoding is not the problem — he can read the text accurately and retrieve explicitly stated information. However, his inferential comprehension score of 1/3 reveals that he cannot yet reason across paragraphs, make connections between ideas, or draw conclusions that require integrating multiple pieces of information. His retelling data supports this pattern: he can name two isolated facts (2/4 on key details) but cannot explain the logical connections between steps (sequence: 0/2) — indicating he is processing information as discrete, disconnected facts rather than as a causally connected cycle. His vocabulary score (1/2 — using "evaporation" incorrectly) suggests he may have surface familiarity with the key terms but lacks the deep conceptual understanding needed to apply them in context, which further limits his ability to make inferences about the water cycle process.</p>

    <p style="margin-top: 12px;"><strong>Part B — Two Evidence-Based Instructional Strategies</strong></p>
    <p style="margin-top: 8px;"><strong>Strategy 1: Explicit Text Structure Instruction with a Sequence Graphic Organizer</strong></p>
    <p style="margin-top: 4px;">The teacher should explicitly teach the sequence/chronological text structure using signal words (first, next, then, finally, as a result) and a flow-chart graphic organizer that maps each step of the water cycle in order, showing causal links between steps (evaporation → water vapor rises → condensation → precipitation → collection → evaporation again). Carlos completes this organizer by returning to the text to find and record each step and its cause-effect connection, then uses it to practice a structured retelling that includes both the steps and the logical relationships between them.</p>
    <p style="margin-top: 4px;">This strategy directly addresses Carlos's sequence score of 0/2 and his failure to connect evaporation to condensation in his retelling. His data reveals that he is treating informational text as a collection of isolated facts rather than as a causally organized argument — the text structure organizer provides a visual framework for the relationship between ideas, which is exactly what his retelling is missing. Teaching him to identify sequence signal words and use them to map the text's logical flow directly targets the inferential comprehension process: understanding how one event leads to another requires precisely the cross-paragraph reasoning Carlos is currently unable to perform.</p>

    <p style="margin-top: 12px;"><strong>Strategy 2: Vocabulary Deep Instruction on Key Cycle Terms</strong></p>
    <p style="margin-top: 4px;">The teacher should provide direct, deep vocabulary instruction on the three key cycle terms — evaporation, condensation, and precipitation — using semantic mapping and student-friendly definitions connected to visual examples. For each term: (1) provide a student-friendly definition tied to a familiar example (evaporation = water from a puddle "disappearing" into the air as it dries); (2) show a visual from the diagram; (3) have Carlos generate his own example in a sentence; (4) connect each term to the next step in the cycle (evaporation leads to condensation). Carlos then re-reads the relevant section using the vocabulary support and answers inferential questions about the process.</p>
    <p style="margin-top: 4px;">Carlos's vocabulary score of 1/2 — using "evaporation" in the wrong context — indicates surface-level familiarity without conceptual understanding. In informational text, deep vocabulary knowledge is essential for inference: to infer that evaporation leads to cloud formation, Carlos must deeply understand what evaporation is and what it produces. Without this, he can only retrieve literal facts. Building conceptual understanding of the key terms directly enables the inferential connections the text requires and that Carlos's data shows he is currently missing.</p>
  </div>

  <p class="sg-label" style="margin-top: 16px;">Why This Response Scores a 4</p>
  <div class="sg-rubric-grid">
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Purpose</p>
      <p class="sg-rubric-cell-text">Both parts fully addressed. Part A identifies the specific comprehension level (inferential) and a second contributing factor (text structure). Part B provides two distinct, fully developed strategies.</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Subject Knowledge</p>
      <p class="sg-rubric-cell-text">Decoding is correctly ruled out (fluency data cited). Inferential comprehension correctly distinguished from literal. Text structure and vocabulary identified as contributing factors — accurately interpreted from the data.</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Support</p>
      <p class="sg-rubric-cell-text">Every claim cites specific data points: sequence 0/2, inferential 1/3, vocabulary 1/2, retelling details. No generic statements — all claims are grounded in Carlos's specific assessment results.</p>
    </div>
    <div class="sg-rubric-cell">
      <p class="sg-rubric-cell-label">Reasoning</p>
      <p class="sg-rubric-cell-text">Each strategy is explicitly justified by connecting it to Carlos's specific data profile. The link between the strategy and the identified gap is stated directly, not implied.</p>
    </div>
  </div>
</div>

<div class="sg-exam-tip">
  <p class="sg-exam-tip-label">Exam Watch — Score-Dropping Mistakes</p>
  <p class="sg-text">The most common Assignment 2 mistakes: (1) Recommending decoding or fluency intervention when fluency data confirms the student reads accurately — always check the fluency data first to rule out decoding as the cause. (2) Recommending the same generic interventions for every comprehension scenario: "small groups and read-alouds" without naming the specific strategy and connecting it to the specific data pattern. (3) Identifying comprehension as "generally weak" without specifying which level (literal/inferential/evaluative) is failing and why. (4) Addressing only one part of the two-part prompt. Read the data systematically — literal, inferential, evaluative, retelling, vocabulary — and identify the pattern before you write your claim.</p>
</div>
        `.trim(),
      },
    ],
  },
]
