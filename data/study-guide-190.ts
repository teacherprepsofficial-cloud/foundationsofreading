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
<p>This objective tests your ability to distinguish between related but distinct oral language skills, explain the role of the alphabetic principle, and identify research-backed instruction for diverse learners. Expect scenario-based questions where you must identify whether a skill is phonological or phonemic, or choose the most appropriate instructional activity for a specific learner profile.</p>

<h4>Phonological vs. Phonemic Awareness</h4>
<p><strong>Phonological awareness</strong> is the broad ability to hear, identify, and manipulate the sound units of oral language — including words, syllables, onsets, and rimes — without any connection to print. <strong>Phonemic awareness</strong> is a subset of phonological awareness focused specifically on <strong>phonemes</strong>, the individual sounds within words (e.g., /k/ /æ/ /t/ in "cat"). Every phonemic awareness task is phonological, but not every phonological task is phonemic.</p>
<ul>
  <li><strong>Rhyme recognition:</strong> Identifying that "cat" and "bat" rhyme — a phonological task at the word/rime level.</li>
  <li><strong>Syllable segmentation:</strong> Clapping the syllables in "butter" — phonological, not yet phonemic.</li>
  <li><strong>Onset-rime blending:</strong> Blending /b/ + /at/ to say "bat" — bridges phonological and phonemic awareness.</li>
  <li><strong>Phoneme isolation:</strong> Identifying the first sound in "ship" as /ʃ/ — a phonemic awareness task.</li>
  <li><strong>Phoneme segmentation:</strong> Saying each sound in "frog" (/f/ /r/ /ɒ/ /g/) — phonemic awareness, predictive of decoding.</li>
  <li><strong>Phoneme blending:</strong> Combining /s/ /t/ /ɒ/ /p/ to say "stop" — strongly linked to reading acquisition.</li>
  <li><strong>Phoneme manipulation:</strong> Deleting, substituting, or reversing sounds (e.g., "say 'cat' without /k/") — the most advanced phonemic awareness skill.</li>
</ul>

<h4>The Alphabetic Principle</h4>
<p>The <strong>alphabetic principle</strong> is the understanding that letters and letter combinations (graphemes) represent the sounds (phonemes) of spoken language. <strong>Letter-sound correspondence</strong> refers to knowing which phoneme maps to which grapheme (e.g., the letter "b" represents /b/). Students who grasp the alphabetic principle can use letter-sound knowledge to decode unfamiliar words rather than memorizing each word as a whole. This principle is foundational — without it, phonics instruction cannot take hold.</p>

<h4>Evidence-Based Instructional Strategies</h4>
<ul>
  <li><strong>Explicit phoneme instruction:</strong> Directly teach sound isolation, blending, and segmentation rather than hoping students discover these skills incidentally.</li>
  <li><strong>Elkonin (sound) boxes:</strong> Students push a token into a box for each phoneme they say — provides concrete, kinesthetic support for segmentation.</li>
  <li><strong>Letter-sound mapping:</strong> Pair phonemic awareness tasks with graphemes once students have basic oral sound awareness to build the alphabetic principle simultaneously.</li>
  <li><strong>Oral blending games:</strong> Say words in parts for students to blend; keeps instruction in the oral mode before connecting to print.</li>
  <li><strong>Rhyme and alliteration activities:</strong> Use nursery rhymes and tongue twisters to build early phonological sensitivity, especially for younger or struggling readers.</li>
  <li><strong>Minimal pairs:</strong> Contrast words that differ by one phoneme (e.g., "bat/pat") to sharpen phoneme discrimination.</li>
</ul>

<h4>Diverse Learner Needs</h4>
<p><strong>English learners (ELs)</strong> may struggle with phonemes that do not exist in their home language (e.g., the /θ/ sound in "think" has no equivalent in Spanish). Instruction should explicitly highlight target phonemes with mouth position cues and contrast English sounds against the student's home language sounds where helpful. Students with <strong>language-based learning disabilities</strong> (such as dyslexia) typically show deficits in phonemic awareness even when their overall language skills are strong — they need more trials, multisensory practice, and structured, cumulative sequences. Students with hearing impairments may need visual supports such as cued speech or articulatory feedback.</p>

<p>On the exam, watch for questions that ask you to classify a task (phonological vs. phonemic), select the most advanced phonemic awareness skill among a list, or choose the best activity for an English learner who confuses sounds not present in their first language. Remember: phonemic awareness is entirely oral — the moment letters appear, the task has shifted toward phonics.</p>
        `.trim(),
      },
      {
        id: 'obj-2',
        objectiveNum: 2,
        title: 'Phonics and Word Recognition',
        subareaId: 'I',
        content: `
<p>This objective tests your understanding of how decoding and encoding develop, why explicit phonics instruction works, and how teachers support word recognition across diverse learners. Questions here often present a student scenario and ask you to identify the most effective instructional approach or explain why one method is more evidence-based than another.</p>

<h4>Oral Vocabulary and Decoding</h4>
<p>A student's <strong>oral vocabulary</strong> — the words they know by sound — directly affects how quickly decoding becomes meaningful. When a student sounds out a word they have never heard, they can produce the phoneme string but cannot attach meaning to it. <strong>Decoding</strong> is the process of applying letter-sound knowledge to read an unfamiliar word; <strong>encoding</strong> (spelling) is the reverse — converting sounds to letters. Strong oral vocabulary gives students a built-in "did that sound right?" check when they decode, because the decoded word matches something already stored in memory.</p>

<h4>Explicit Phonics Instruction</h4>
<p><strong>Explicit phonics instruction</strong> means the teacher directly states the letter-sound relationship, models how to use it, and provides guided and independent practice — there is no guessing or discovery. <strong>Systematic</strong> phonics instruction means the sequence is planned and cumulative: simpler patterns (CVC words, short vowels) are taught before more complex ones (vowel teams, multisyllabic words). Research consistently shows that systematic, explicit phonics outperforms embedded or incidental approaches for beginning readers and students at risk.</p>
<ul>
  <li><strong>Synthetic phonics:</strong> Students learn individual phoneme-grapheme correspondences and blend them to read words — the most common explicit approach.</li>
  <li><strong>Analytic phonics:</strong> Students analyze whole words to identify patterns (e.g., noticing the "at" family) — less effective for struggling readers than synthetic methods.</li>
  <li><strong>Analogy-based phonics:</strong> Students use known word chunks ("if I know 'light,' I can read 'night'") — a useful strategy once a core of known words is established.</li>
  <li><strong>Word sorts:</strong> Students categorize words by pattern (e.g., short vs. long vowel) — reinforces pattern recognition with immediate feedback.</li>
  <li><strong>Decodable texts:</strong> Texts that contain only the phonics patterns explicitly taught — allow students to practice decoding without relying on picture or context guessing.</li>
</ul>

<h4>Teaching High-Frequency and Sight Words</h4>
<p><strong>High-frequency words</strong> are words that appear very often in print (e.g., "the," "said," "was"). Many are phonetically irregular, making them difficult to decode from sound-letter rules alone. <strong>Sight words</strong> (sometimes used interchangeably with high-frequency words) are words a reader recognizes instantly without conscious decoding. Effective instruction maps the letters to sounds wherever possible — even "said" has decodable elements — rather than treating every high-frequency word as a pure memory task. <strong>Orthographic mapping</strong> is the process by which the brain bonds a word's pronunciation, spelling, and meaning into permanent memory, making recognition automatic.</p>
<ul>
  <li><strong>Heart word instruction:</strong> Teach students which letters are phonetically regular ("know") and mark only the irregular part as the "heart" to memorize — reduces rote load.</li>
  <li><strong>Repeated exposure in connected text:</strong> Students need 4–14 exposures to a word before it is orthographically mapped — decodable and leveled texts provide this.</li>
</ul>

<h4>Phonics in Connected Text and Differentiation</h4>
<p>Word-level phonics skills must transfer to real reading. After introducing a pattern, teachers should provide <strong>connected text practice</strong> — short passages where students can apply the pattern while also attending to meaning. Without this bridge, students may master isolated word reading but revert to guessing in context. <strong>Differentiated instruction</strong> means adjusting the pace, grouping, and scaffolding based on assessment data: students who have mastered short vowels move to blends, while others continue CVC practice with additional repetitions and multisensory support.</p>

<p>On the exam, watch for answer choices that mention "context clues" or "picture cues" as the primary decoding strategy — these are not evidence-based first-line approaches. Systematic, explicit phonics is always the preferred method for beginning and struggling readers. Also watch for questions distinguishing decodable texts (phonics practice) from leveled readers (used for comprehension).</p>
        `.trim(),
      },
      {
        id: 'obj-3',
        objectiveNum: 3,
        title: 'Word Analysis Skills',
        subareaId: 'I',
        content: `
<p>This objective covers how students move beyond basic phonics to analyze the internal structure of words — morphemes, syllable types, and spelling patterns. NES tests whether you can identify morpheme types, explain syllabication rules, and select appropriate instructional strategies including supports for English learners. Expect questions that ask you to classify a word part or choose a teaching strategy for a multisyllabic word.</p>

<h4>Morphemes</h4>
<p>A <strong>morpheme</strong> is the smallest unit of meaning in language. Unlike phonemes (units of sound), morphemes carry meaning. Every word contains at least one morpheme.</p>
<ul>
  <li><strong>Free morpheme:</strong> Can stand alone as a word (e.g., "play," "kind"). All base words are free morphemes.</li>
  <li><strong>Bound morpheme:</strong> Cannot stand alone — must attach to another morpheme (e.g., the prefix "un-" or the suffix "-ness").</li>
  <li><strong>Derivational morpheme:</strong> A bound morpheme that changes the part of speech or meaning of a base word (e.g., "-ness" turns "kind" into "kindness," a noun). Prefixes are always derivational.</li>
  <li><strong>Inflectional morpheme:</strong> A bound morpheme that changes grammatical function (tense, number, possession) without changing the base word's part of speech (e.g., "-ed," "-s," "-ing," "-er," "-est"). English has only eight inflectional morphemes.</li>
  <li><strong>Prefix:</strong> A derivational morpheme added to the beginning of a base word (e.g., "un-," "re-," "pre-").</li>
  <li><strong>Suffix:</strong> A bound morpheme added to the end of a word; may be derivational ("-ment") or inflectional ("-ed").</li>
  <li><strong>Root:</strong> A bound base, often from Latin or Greek, that carries core meaning but cannot stand alone (e.g., "rupt" in "interrupt," "struct" in "construction").</li>
</ul>

<h4>Orthographic Rules</h4>
<p><strong>Orthographic rules</strong> govern how English spelling works — they explain why "running" doubles the final consonant but "reading" does not, or why "happiness" drops the "y." Teaching these rules explicitly helps students both read and spell multisyllabic words. Key rules include the doubling rule (double the final consonant when adding a vowel suffix to a short-vowel, closed-syllable word), the drop-e rule (drop the silent e before a vowel suffix), and the change-y-to-i rule.</p>

<h4>The Six Syllable Types</h4>
<p>Teaching students to identify syllable types gives them a reliable strategy for decoding multisyllabic words. Each syllable type predicts the vowel sound, so recognizing the type tells the reader how to pronounce the vowel.</p>
<ul>
  <li><strong>Closed syllable:</strong> Ends in a consonant; vowel is short (e.g., "cat," "nap-kin"). The most common syllable type in English.</li>
  <li><strong>Open syllable:</strong> Ends in a vowel; vowel is long (e.g., "go," "mu-sic"). The vowel says its name.</li>
  <li><strong>Vowel-consonant-e (VCe) syllable:</strong> Ends in a silent e; the preceding vowel is long (e.g., "cake," "re-mote").</li>
  <li><strong>Vowel team syllable:</strong> Contains two or more vowels working together to make one sound (e.g., "rain," "out," "eight").</li>
  <li><strong>R-controlled syllable:</strong> Vowel followed by "r," which modifies the vowel sound (e.g., "bird," "car," "her").</li>
  <li><strong>Consonant-le syllable:</strong> Final unaccented syllable consisting of a consonant + "le" (e.g., "ta-ble," "sim-ple"). The "le" syllable is always unaccented.</li>
</ul>

<h4>Teaching Morphemes and Syllable Types Explicitly</h4>
<ul>
  <li><strong>Morpheme matrices:</strong> Visual charts where students combine prefixes, roots, and suffixes to build and analyze families of words — develops flexible morphological thinking.</li>
  <li><strong>Word sorts by syllable type:</strong> Students sort cards into columns by syllable pattern, reinforcing recognition through repeated, low-stakes categorization.</li>
  <li><strong>Syllable division routines:</strong> Teach the VCCV, VCV, and consonant-le division rules explicitly so students have a step-by-step process for attacking multisyllabic words.</li>
  <li><strong>Generative vocabulary study:</strong> Start with a Latin or Greek root and generate a word family (e.g., "port" → transport, import, export) — efficient vocabulary expansion.</li>
</ul>

<h4>Cognate Awareness for English Learners</h4>
<p><strong>Cognates</strong> are words in two languages that share a common origin and similar form and meaning (e.g., English "nation" / Spanish "nación"). English and Spanish share thousands of cognates, especially academic and Latinate vocabulary. Explicit <strong>cognate awareness instruction</strong> teaches English learners to recognize these cross-linguistic connections, giving them a powerful independent word-learning strategy. Teachers should also address <strong>false cognates</strong> (words that look similar but mean different things, like "embarrassed" / "embarazada") to prevent meaning errors.</p>

<p>On the exam, watch for questions that ask you to distinguish derivational from inflectional morphemes — remember that inflectional suffixes never change part of speech. Also watch for questions where the correct answer involves using morphological analysis (breaking a word into prefix + root + suffix) rather than looking up the word or using context alone.</p>
        `.trim(),
      },
      {
        id: 'obj-4',
        objectiveNum: 4,
        title: 'Reading Fluency',
        subareaId: 'I',
        content: `
<p>This objective tests your understanding of what fluency is, why it matters, and how to develop it — especially for students who decode slowly or read in a monotone. NES questions here often present a student reading sample or describe a reader's behavior and ask you to identify the fluency component affected or select the best instructional approach.</p>

<h4>The Three Indicators of Fluency</h4>
<p><strong>Reading fluency</strong> is the ability to read text accurately, at an appropriate rate, and with expression. All three components must be present — a student who reads fast but makes many errors is not fluent, and a student who reads every word correctly but robotically has not achieved full fluency.</p>
<ul>
  <li><strong>Accuracy:</strong> Reading words correctly without substitution, omission, or insertion errors. Accuracy is typically measured as the percentage of words read correctly in a passage.</li>
  <li><strong>Rate:</strong> The speed of reading, usually measured in <strong>words correct per minute (WCPM)</strong>. Rate norms (e.g., Hasbrouck & Tindal) provide grade-level benchmarks.</li>
  <li><strong>Prosody:</strong> Reading with appropriate expression, phrasing, pitch, and rhythm that mirrors natural speech. Prosody reflects comprehension — a student who understands what they read sounds like they are talking, not decoding.</li>
</ul>

<h4>Fluency as the Bridge to Comprehension</h4>
<p>LaBerge and Samuels' <strong>automaticity theory</strong> explains why fluency matters: human working memory is limited. A student who must consciously decode every word uses all available cognitive resources on word recognition, leaving none for meaning-making. <strong>Automaticity</strong> — instant, effortless word recognition — frees up working memory for comprehension. Fluency is therefore the bridge between decoding and understanding: students who decode automatically can direct their attention to the author's message.</p>

<h4>Evidence-Based Fluency Strategies</h4>
<ul>
  <li><strong>Repeated oral reading:</strong> Students read the same passage multiple times (typically 3–4 readings) until they reach a target WCPM and accuracy level. Research consistently supports this as the most effective fluency method.</li>
  <li><strong>Neurological Impress Method (NIM):</strong> Teacher and student read aloud together simultaneously, with the teacher's voice slightly leading — provides a fluent model while the student reads.</li>
  <li><strong>Reader's Theater:</strong> Students rehearse and perform scripts, providing repeated reading practice with authentic purpose. No costumes or memorization required — holding the script is part of the practice.</li>
  <li><strong>Paired (partner) reading:</strong> A stronger reader models fluent reading; student rereads the same text. Provides immediate corrective feedback and a fluent model.</li>
  <li><strong>Echo reading:</strong> Teacher reads a phrase or sentence aloud; students echo it back with matching expression — especially useful for building prosody.</li>
  <li><strong>Choral reading:</strong> Whole class or group reads together simultaneously — reduces anxiety for struggling readers while providing a fluent model.</li>
  <li><strong>Timed repeated readings:</strong> Students graph their own WCPM over multiple readings of the same text — makes progress visible and builds motivation.</li>
  <li><strong>Wide reading:</strong> Reading a large volume of text at the independent level — supports rate development and vocabulary exposure over time.</li>
</ul>

<h4>Promoting Automaticity</h4>
<p>Automaticity develops through massive practice with correctly decoded text. Instructional practices that promote automaticity include pre-teaching difficult words before reading, ensuring students read at their <strong>instructional level</strong> (95–97% accuracy for practice), and providing immediate error correction. Allowing students to practice reading texts where they make many errors reinforces inaccurate word recognition, which is the opposite of automaticity.</p>

<h4>Fluency Disruptions and Differentiation</h4>
<p>Fluency breaks down for different reasons. A student who reads slowly but accurately likely needs more repeated reading practice and high-frequency word automaticity work. A student who reads quickly with many errors likely has weak decoding skills — rate is masking poor accuracy, and the priority is phonics instruction, not speed. A student with flat prosody may comprehend poorly or may not have internalized phrase boundaries — phrasing instruction and echo reading can help. English learners may read with non-native prosody patterns that reflect their home language's rhythm; instruction should model English sentence stress and phrasing without penalizing the learner's accent.</p>

<p>On the exam, watch for questions that treat fluency as the goal of reading — it is not. Fluency serves comprehension. If a student's fluency is strong but comprehension is weak, the answer will point to a comprehension strategy, not more fluency practice. Also know that silent reading alone is not considered a research-supported fluency intervention — the research base supports oral repeated reading with feedback.</p>
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
<p>This objective tests your understanding of how vocabulary connects to comprehension, how to select words for instruction, and how to teach word-learning strategies for diverse learners. NES questions here typically ask you to identify the best word-selection decision, choose the most effective vocabulary strategy, or determine how to support English learners in academic language development.</p>

<h4>Vocabulary and Comprehension</h4>
<p>There is a strong, bidirectional relationship between vocabulary knowledge and reading comprehension. Readers who know more words comprehend more; comprehending more text exposes readers to more words. <strong>Oral vocabulary</strong> (words understood and used in speech) provides the foundation — when students read a decodable word and recognize it from spoken language, meaning is immediate. <strong>Written vocabulary</strong> expands beyond oral vocabulary as students read more complex texts. <strong>Academic language</strong> includes the vocabulary, syntax, and discourse patterns used in school subjects — students who lack academic language struggle to read textbooks, directions, and test questions even when their conversational language is strong.</p>

<h4>Beck's Three-Tier Vocabulary Framework</h4>
<p>Isabel Beck's <strong>Tier 1, Tier 2, Tier 3</strong> model guides word selection decisions:</p>
<ul>
  <li><strong>Tier 1 — Basic words:</strong> High-frequency, conversational words most students know (e.g., "run," "happy," "eat"). Rarely need explicit instruction for native English speakers.</li>
  <li><strong>Tier 2 — High-utility academic words:</strong> Words that appear across multiple content areas and text types, are often used in formal writing, and are unlikely to be learned incidentally (e.g., "analyze," "significant," "compare," "illustrate"). These are the highest priority for direct instruction because they appear everywhere and unlock comprehension broadly.</li>
  <li><strong>Tier 3 — Domain-specific words:</strong> Technical terms tied to a specific content area (e.g., "photosynthesis," "legislature," "isosceles"). These are taught as needed within content units — important but limited in transfer value.</li>
</ul>

<h4>Independent Word-Learning Strategies</h4>
<p>Teaching students to figure out word meanings independently is more scalable than teaching every word directly. Key strategies include:</p>
<ul>
  <li><strong>Morphological analysis:</strong> Using knowledge of prefixes, roots, and suffixes to infer meaning (e.g., "un-" + "predict" + "-able" = not able to be predicted). This is the most powerful independent strategy for academic vocabulary.</li>
  <li><strong>Contextual analysis:</strong> Using surrounding sentences and text features to infer a word's meaning. Reliable only when the context provides strong clues — students must understand this strategy's limits.</li>
  <li><strong>Etymological analysis:</strong> Using knowledge of a word's Greek or Latin origin to infer meaning — especially powerful for science, social studies, and medical vocabulary.</li>
  <li><strong>Reference tool use:</strong> Knowing how to efficiently use a dictionary, glossary, or thesaurus — including selecting the correct definition when a word has multiple meanings.</li>
</ul>

<h4>Direct Vocabulary Instruction Strategies</h4>
<ul>
  <li><strong>Semantic mapping:</strong> Students place a target word at the center of a web and connect it to related words, examples, and non-examples — builds rich, networked word knowledge.</li>
  <li><strong>Frayer model:</strong> A four-square organizer with definition, characteristics, examples, and non-examples — requires deep processing of word meaning.</li>
  <li><strong>Vocabulary self-collection:</strong> Students identify and nominate words they want to learn from their own reading — builds ownership and metacognitive awareness.</li>
  <li><strong>Rich discussion and repeated exposure:</strong> Students need 10–15 encounters with a word in varied contexts before it is fully internalized. Brief definitions alone do not produce lasting learning.</li>
</ul>

<h4>Idioms and Figurative Language</h4>
<p><strong>Idioms</strong> are phrases whose meanings cannot be derived from the literal meanings of individual words (e.g., "hit the books," "cost an arm and a leg"). They must be taught explicitly, especially for English learners and students with language processing difficulties. <strong>Figurative language</strong> more broadly includes similes, metaphors, personification, and hyperbole — understanding these requires readers to recognize when literal meaning does not make sense and search for the intended meaning.</p>

<h4>Differentiation for Diverse Learners</h4>
<p>English learners benefit from explicit cognate instruction, visual supports (pictures, realia), and pre-teaching key vocabulary before reading. Students with language disabilities may need more exposures, graphic organizers, and explicit practice with both definitional and contextual information. Advanced learners benefit from nuanced instruction on connotation, register, and word relationships (synonyms, antonyms, analogies) rather than simple definition-matching.</p>

<p>On the exam, watch for questions asking which tier a word belongs to — Tier 2 words are almost always the correct instructional priority. Also watch for questions where "look it up in the dictionary" is presented as a complete vocabulary strategy — it is a starting point, not a deep-processing activity.</p>
        `.trim(),
      },
      {
        id: 'obj-6',
        objectiveNum: 6,
        title: 'Literary Text Comprehension',
        subareaId: 'II',
        content: `
<p>This objective tests your ability to select scaffolding strategies for literary text, identify comprehension levels in questions and tasks, and explain how to teach author's craft and text structure. NES questions typically present a passage excerpt or teaching scenario and ask you to identify the comprehension level of a question, choose the best scaffolding strategy, or select the most appropriate discussion approach.</p>

<h4>Three Levels of Comprehension</h4>
<p>Reading comprehension operates at multiple depths. Effective literary instruction develops all three levels — heavy focus on only literal comprehension leaves students unable to analyze or evaluate what they read.</p>
<ul>
  <li><strong>Literal comprehension:</strong> Understanding information stated explicitly in the text — who, what, when, where. Questions at this level can be answered by pointing to a sentence ("What did the character say?"). Also called "right there" questions.</li>
  <li><strong>Inferential comprehension:</strong> Drawing conclusions, making predictions, and understanding implied meaning by combining text evidence with background knowledge. The reader must "read between the lines" — the answer is not stated directly.</li>
  <li><strong>Evaluative comprehension:</strong> Judging, critiquing, comparing, and forming opinions about the text — requires the reader to apply external criteria or their own values ("Do you think the character made the right choice and why?"). Also called critical or analytical comprehension.</li>
</ul>

<h4>Key Ideas and Author's Craft</h4>
<p><strong>Theme</strong> is the central message or insight about life that a literary text conveys — not the topic, but what the text says about the topic. Teaching theme requires inferential and evaluative thinking. <strong>Author's craft</strong> refers to the deliberate choices a writer makes about language, structure, and literary devices to achieve an effect on the reader:</p>
<ul>
  <li><strong>Point of view:</strong> The narrative perspective (first person, third-person limited, third-person omniscient) and how it shapes what the reader knows and feels.</li>
  <li><strong>Characterization:</strong> How the author reveals character through direct description, dialogue, actions, and other characters' reactions.</li>
  <li><strong>Tone:</strong> The author's attitude toward the subject, conveyed through word choice (diction) and style.</li>
  <li><strong>Figurative language:</strong> Similes, metaphors, personification, alliteration — literary devices that create imagery and deepen meaning.</li>
  <li><strong>Text structure in literary texts:</strong> Narrative elements including exposition, rising action, climax, falling action, and resolution (plot diagram).</li>
</ul>

<h4>Scaffolding Strategies for Literary Text</h4>
<ul>
  <li><strong>Think-alouds:</strong> The teacher reads aloud and verbalizes the thinking process — making predictions, clarifying confusion, identifying imagery — showing students what invisible comprehension looks like.</li>
  <li><strong>Graphic organizers:</strong> Story maps, character trait webs, and plot diagrams give students a visual framework for organizing literary information before discussing or writing.</li>
  <li><strong>Text-based discussion protocols:</strong> Structured discussions (e.g., Socratic seminar, literature circles) require students to cite evidence from the text for every claim they make.</li>
  <li><strong>Questioning the Author (QtA):</strong> Students approach the text as a human-made artifact with intentional choices, asking "What is the author trying to tell us here?" — builds evaluative comprehension.</li>
  <li><strong>Reciprocal teaching:</strong> Students take turns leading discussion using four strategies — predicting, questioning, clarifying, and summarizing — in small groups.</li>
  <li><strong>Shared reading:</strong> Teacher and students read together with the text projected or shared — allows the teacher to model strategies while students follow along with full text access.</li>
</ul>

<h4>Modeling Comprehension Strategies and Strategic Reading</h4>
<p>Comprehension strategies are not ends in themselves — they are tools readers use to make sense of challenging text. Effective instruction follows a gradual release model: teacher models (I do), teacher and students practice together (we do), students practice with a partner (you do together), then independently (you do alone). Students should understand that strategic readers adjust their approach depending on purpose — reading a poem for personal enjoyment requires a different stance than reading a short story to identify theme for a class discussion.</p>

<p>On the exam, watch for questions that confuse theme with topic ("friendship" is a topic; "true friendship means accepting someone's flaws" is a theme). Also watch for questions that pit literal recall against inferential questioning — the correct answer will almost always involve moving students toward inference and evaluation, not staying at the literal level.</p>
        `.trim(),
      },
      {
        id: 'obj-7',
        objectiveNum: 7,
        title: 'Informational Text Comprehension',
        subareaId: 'II',
        content: `
<p>This objective tests your ability to scaffold informational and digital text reading, apply comprehension levels to nonfiction, identify text structures, and support disciplinary reading. NES questions here often present a nonfiction passage or teaching scenario and ask you to identify text structure, choose a pre-reading strategy, or explain how to support English learners or struggling readers with content-area text.</p>

<h4>Informational vs. Literary Text</h4>
<p><strong>Informational text</strong> is written primarily to convey factual content about the real world — textbooks, articles, reports, biographies, reference materials, and digital texts. Unlike literary text, it typically uses domain-specific vocabulary, text features (headings, captions, sidebars, diagrams), and organizational structures designed to present information efficiently. Reading informational text requires readers to activate different prior knowledge and use different navigation strategies than literary reading.</p>

<h4>Three Comprehension Levels Applied to Informational Text</h4>
<ul>
  <li><strong>Literal:</strong> Identifying facts stated directly in the text — "According to the article, what causes acid rain?" Students locate and restate information.</li>
  <li><strong>Inferential:</strong> Drawing conclusions from evidence not explicitly stated — connecting multiple facts, interpreting a graph, or inferring the author's implied argument.</li>
  <li><strong>Evaluative:</strong> Assessing the author's purpose, point of view, credibility, and use of evidence — "Is this source biased? What perspective is missing?" Especially important for digital texts where source evaluation is critical.</li>
</ul>

<h4>Common Informational Text Structures</h4>
<p>Recognizing <strong>text structure</strong> — how an author organizes information — helps readers predict where to find information, take better notes, and write stronger summaries. Each structure has signal words that alert readers to the pattern:</p>
<ul>
  <li><strong>Description/enumeration:</strong> Lists characteristics, facts, or examples about a topic. Signal words: "for example," "such as," "includes," "characteristics." Graphic organizer: web or list.</li>
  <li><strong>Chronological/sequence:</strong> Events or steps presented in time order. Signal words: "first," "next," "then," "finally," "in 1865." Graphic organizer: timeline or flowchart.</li>
  <li><strong>Compare and contrast:</strong> Examines similarities and differences between two or more things. Signal words: "however," "in contrast," "similarly," "on the other hand." Graphic organizer: Venn diagram or T-chart.</li>
  <li><strong>Cause and effect:</strong> Explains why something happened or what resulted from an event. Signal words: "because," "as a result," "therefore," "consequently." Graphic organizer: cause-effect chart.</li>
  <li><strong>Problem and solution:</strong> Presents a problem and one or more solutions. Signal words: "the problem is," "one solution," "as a result." Graphic organizer: problem-solution frame.</li>
</ul>

<h4>Scaffolding Strategies for Informational Text</h4>
<ul>
  <li><strong>KWL charts:</strong> Students record what they Know, Want to know, and Learned — activates prior knowledge and sets reading purpose before reading begins.</li>
  <li><strong>Text feature walks:</strong> Before reading, students preview headings, bolded terms, diagrams, and captions to predict content and activate schema — especially helpful for students unfamiliar with informational text conventions.</li>
  <li><strong>Annotation / close reading:</strong> Students mark main ideas, unknown words, surprising information, and questions directly in the text or on sticky notes — keeps readers actively processing.</li>
  <li><strong>Two-column notes:</strong> Left column captures key ideas or questions from headings; right column records details and student reactions — supports active reading and later review.</li>
  <li><strong>Graphic organizers matched to text structure:</strong> Providing a cause-effect chart when reading a cause-effect text guides students to extract the right type of information.</li>
  <li><strong>Shared reading of complex texts:</strong> Teacher reads difficult informational text aloud while students follow along — models fluent informational reading and allows teacher to pause and explain text features and vocabulary.</li>
</ul>

<h4>Disciplinary Literacy and Digital Texts</h4>
<p><strong>Disciplinary literacy</strong> recognizes that scientists, historians, mathematicians, and literary scholars read differently within their fields — a historian reads a primary source document with different questions than a scientist reads a lab report. Teaching students to read "like a historian" or "like a scientist" means explicitly teaching field-specific reading purposes, source evaluation habits, and argument structures. <strong>Digital texts</strong> add additional complexity: hyperlinks change reading paths, multimedia elements compete for attention, and source credibility must be evaluated quickly. Instruction should explicitly address lateral reading (checking who produced a source by searching outside the source itself) and other online verification strategies.</p>

<p>On the exam, watch for questions asking you to match a graphic organizer to a text structure — this is a common item type. Also watch for questions where the correct answer involves activating prior knowledge before reading (pre-reading strategies) rather than only working with the text during or after reading. Differentiation for informational text typically involves providing visual supports, bilingual glossaries, or audio versions of the text — not simplifying the content itself.</p>
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
<p>This objective tests your understanding of what reading assessments measure, the five purposes of assessment, the difference between standardized and informal tools, and how to use data to make instructional decisions. NES questions here frequently present student data (a running record, a WCPM score, or a comprehension score) and ask you to interpret the data or identify the next instructional step.</p>

<h4>Major Components Assessed in Reading</h4>
<p>The <strong>"Big 5" reading components</strong> identified by the National Reading Panel are phonemic awareness, phonics, fluency, vocabulary, and comprehension. A comprehensive reading assessment system evaluates all five because a student can have strengths in one area and deficits in another — knowing only the overall reading level is not enough to drive targeted instruction.</p>
<ul>
  <li><strong>Phonemic awareness assessment:</strong> Oral tasks (no print) — students segment, blend, or manipulate phonemes. Example: "Say each sound in 'flag.'"</li>
  <li><strong>Phonics assessment:</strong> Word reading and decoding tasks — students read real words and nonsense words to isolate phonics skills from sight word memory. Nonsense words (e.g., "dap," "frib") isolate pure decoding ability.</li>
  <li><strong>Fluency assessment:</strong> One-minute oral reading probes yield WCPM; prosody may be rated on a rubric (e.g., NAEP Oral Reading Fluency Scale).</li>
  <li><strong>Vocabulary assessment:</strong> Includes receptive vocabulary (matching words to pictures) and expressive vocabulary (defining words) tasks.</li>
  <li><strong>Comprehension assessment:</strong> Retelling, answering literal and inferential questions, summarizing — requires actual reading of connected text.</li>
</ul>

<h4>Five Purposes of Reading Assessment</h4>
<ul>
  <li><strong>Screening:</strong> Administered to all students at the beginning of the year (and often mid-year) to identify who may be at risk for reading difficulties. Fast and efficient — not diagnostic. Example: DIBELS, AIMSweb.</li>
  <li><strong>Diagnostic assessment:</strong> Administered to students who screen as at-risk to identify the specific nature and source of their difficulty. Comprehensive and detailed. Example: Qualitative Reading Inventory (QRI), phonics error analysis.</li>
  <li><strong>Formative assessment:</strong> Ongoing, low-stakes assessment used during instruction to monitor progress and adjust teaching in real time. Example: teacher observation, exit tickets, anecdotal notes during guided reading.</li>
  <li><strong>Summative assessment:</strong> Administered at the end of a unit or year to evaluate overall achievement against standards. High-stakes and less frequent. Example: end-of-year state reading test.</li>
  <li><strong>Progress monitoring:</strong> Administered frequently (weekly or biweekly) to students receiving intervention — tracks whether the intervention is working. Uses brief, sensitive measures (CBMs). Example: weekly WCPM probe for a Tier 2 student.</li>
</ul>

<h4>Standardized vs. Informal Assessments</h4>
<p><strong>Standardized assessments</strong> have uniform administration, scoring, and norming procedures — results can be compared across students and against national norms. They provide reliable, comparable data but may not capture the full range of a student's reading behaviors. <strong>Informal assessments</strong> are flexible, teacher-administered tools that provide rich, contextualized data but cannot be compared across classrooms or schools.</p>
<ul>
  <li><strong>Running record:</strong> Teacher listens and records errors (substitutions, omissions, insertions, self-corrections) as a student reads aloud from a leveled text. Yields accuracy rate, error rate, and self-correction rate; qualitative error analysis reveals cueing system use (meaning, structure, visual).</li>
  <li><strong>Informal Reading Inventory (IRI):</strong> A series of passages at increasing difficulty levels with comprehension questions — yields independent, instructional, and frustration reading levels.</li>
  <li><strong>Curriculum-Based Measurement (CBM):</strong> Brief, standardized probes (e.g., one-minute oral reading) used for progress monitoring; sensitive to small gains over short periods.</li>
  <li><strong>Anecdotal notes:</strong> Teacher records specific, observable reading behaviors during instruction — useful for formative purposes and informing grouping decisions.</li>
</ul>

<h4>Interpreting Results to Guide Instruction</h4>
<p>Assessment data is only useful if it changes instruction. After screening, teachers use results to form flexible small groups. After a diagnostic, they pinpoint the specific skill gap and design targeted intervention. After progress monitoring, they decide whether to continue, intensify, or change an intervention. The <strong>instructional reading level</strong> is the text difficulty at which a student reads with 90–95% accuracy and adequate comprehension — texts here provide appropriate challenge. The <strong>independent level</strong> (95–100% accuracy) is used for choice reading; the <strong>frustration level</strong> (below 90% accuracy) should be avoided for independent practice.</p>

<p>On the exam, watch for questions that confuse screening with diagnostic assessment — screening identifies who needs help; diagnostic identifies what kind of help. Also know that progress monitoring (not annual testing) is the tool used to evaluate whether a Tier 2 or Tier 3 intervention is working.</p>
        `.trim(),
      },
      {
        id: 'obj-9',
        objectiveNum: 9,
        title: 'Evidence-Based Reading Instruction',
        subareaId: 'III',
        content: `
<p>This objective is the broadest on the exam — it synthesizes all major reading components and tests your ability to connect assessment data to instruction, explain tiered intervention models, evaluate text complexity, and design motivating, differentiated reading experiences. Expect several questions on this objective, and expect them to be scenario-based and multi-step in reasoning.</p>

<h4>The Big 5 Reading Components and Their Interrelationships</h4>
<p>The <strong>National Reading Panel (2000)</strong> identified five essential components of reading: phonemic awareness, phonics, fluency, vocabulary, and comprehension. These components are not independent — they interact. Phonemic awareness enables phonics; phonics supports fluency; fluency and vocabulary together enable comprehension. <strong>Oral language</strong> (listening and speaking) underpins all of them. Reading and writing are reciprocal — what students learn about text structure through reading improves their writing, and the process of composing reinforces word knowledge. Instruction that treats these components in isolation misses the connections that make reading instruction efficient.</p>

<h4>Tiered Instructional Models — RTI / MTSS</h4>
<p><strong>Response to Intervention (RTI)</strong> and <strong>Multi-Tiered System of Supports (MTSS)</strong> are frameworks for matching instruction intensity to student need, using data to make decisions at each tier.</p>
<ul>
  <li><strong>Tier 1 — Core instruction:</strong> High-quality, evidence-based reading instruction delivered to all students in the general education classroom. If Tier 1 is effective, 80% of students should meet grade-level benchmarks. Tier 1 is the foundation — weak Tier 1 inflates the number of students who appear to need intervention.</li>
  <li><strong>Tier 2 — Supplemental intervention:</strong> Small-group instruction (3–5 students) provided in addition to Tier 1 for students who screen as at-risk. Typically 20–30 minutes, 3–5 times per week. Progress is monitored frequently (every 1–2 weeks) to evaluate response.</li>
  <li><strong>Tier 3 — Intensive intervention:</strong> Individualized, high-intensity instruction for students who do not respond adequately to Tier 2. May involve special education evaluation. Smaller groups (1–3 students), more frequent, longer sessions.</li>
</ul>

<h4>Text Complexity</h4>
<p>The <strong>Common Core</strong> framework defines text complexity through three factors, all of which must be considered together:</p>
<ul>
  <li><strong>Quantitative factors:</strong> Readability measures calculated by formulas (Lexile, Flesch-Kincaid, DRP) — count word frequency, sentence length, and syllable count. These are objective but incomplete.</li>
  <li><strong>Qualitative factors:</strong> Features a human reader must evaluate — levels of meaning or purpose, text structure, language conventionality and clarity, and knowledge demands. A text can have a low Lexile but high qualitative complexity (e.g., a poem with figurative language).</li>
  <li><strong>Reader and task considerations:</strong> The match between a specific reader (motivation, background knowledge, reading purpose) and a specific task. The same text may be appropriately complex for one student and a frustration-level text for another.</li>
</ul>

<h4>Close Reading</h4>
<p><strong>Close reading</strong> is a disciplined, text-dependent approach to reading in which students return to the text multiple times to analyze specific elements — word choice, text structure, author's purpose, evidence and argument. Key implementation features:</p>
<ul>
  <li>Use short, rich passages that reward re-reading.</li>
  <li>Ask text-dependent questions that require evidence from the text, not personal anecdotes.</li>
  <li>Avoid heavy pre-reading frontloading that removes the need to read carefully — let the text do the work.</li>
  <li>Use annotation to make student thinking visible during re-readings.</li>
  <li>Layer readings by purpose: first for key ideas, second for craft and structure, third for integration and evaluation.</li>
</ul>

<h4>Reading Motivation</h4>
<p><strong>Reading motivation</strong> is both intrinsic (reading for enjoyment, curiosity, social connection) and extrinsic (reading for grades or rewards). Research shows that intrinsic motivation produces deeper reading engagement and longer-term reading habits. Strategies that support motivation include: providing choice in reading material, building a classroom library with diverse and high-interest texts, creating social reading experiences (book talks, literature circles), connecting texts to students' lives and identities, and celebrating reading progress publicly.</p>

<h4>Differentiated Instruction</h4>
<p>Differentiated instruction means adjusting content, process, product, and learning environment based on students' readiness, interests, and learning profiles. In reading, this means flexible grouping (groups change based on current skill, not fixed ability levels), tiered texts (same topic at varying complexity), scaffolded tasks (graphic organizers, sentence frames, partner support), and extended time or adjusted pacing for students with IEPs or 504 plans. English learners benefit from pre-teaching key vocabulary, providing bilingual supports, and honoring the role of home language in literacy development.</p>

<p>On the exam, watch for questions that ask you to match a student profile to a tier — the number of students affected and the response to instruction (not a single assessment score) determines tier placement. Also know that text complexity is never determined by Lexile alone — qualitative factors and reader/task considerations always play a role.</p>
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
<p>The NES 190/890 includes two open-response assignments worth a significant portion of your total score. These are not essays — they are structured analytical responses to a presented scenario, student work sample, or assessment data set. You have a specific job: analyze the evidence, make a defensible claim, and support it with explicit reasoning grounded in the scenario.</p>

<h4>What NES Wants in a Written Response</h4>
<p>NES scorers are looking for organized, developed analysis — not a brain dump of everything you know about reading. Every claim must be supported with evidence drawn from the scenario materials. Every piece of evidence must be connected to a reason that links the evidence back to your claim. General statements ("good readers use comprehension strategies") earn no credit unless tied to something specific in the prompt.</p>

<h4>Response Structure: Claim → Evidence → Reasoning</h4>
<p>Use this three-part pattern for every point you make in a response:</p>
<ul>
  <li><strong>Claim:</strong> State your interpretation or recommendation directly. Do not bury your claim in hedging language. ("This student's primary area of need is phonemic awareness, specifically phoneme segmentation.")</li>
  <li><strong>Evidence:</strong> Point to specific data, behaviors, or student work from the scenario. Quote or paraphrase the scenario. ("The running record shows 12 errors on CVC words and a self-correction rate of 1:8, indicating the student is not monitoring for meaning or sound accuracy.")</li>
  <li><strong>Reasoning:</strong> Explain why that evidence supports your claim, using your knowledge of reading development. ("Because phoneme segmentation is a prerequisite for phonics decoding, this deficit explains the pattern of vowel substitution errors observed in the word reading task.")</li>
</ul>
<p>Repeat this pattern for each point. Two or three well-developed points outscore five underdeveloped ones every time.</p>

<h4>Objective 10 — Analyzing Foundational Skills Assessment Results</h4>
<p>In this assignment, you will typically receive student data related to phonological awareness, phonics, or fluency — such as a running record, a phonics screening score, a WCPM score, or a word reading inventory. Your job is to: (1) identify what the data reveals about the student's current level of development, (2) determine what specific skill gap is indicated, and (3) recommend targeted, evidence-based instruction. Do not recommend intervention at a level higher than the data supports — if the data shows a phoneme segmentation deficit, your instruction recommendation should address segmentation, not fluency.</p>

<h4>Objective 11 — Analyzing Comprehension Assessment Results</h4>
<p>In this assignment, you will typically receive comprehension data — retelling results, question-response data broken down by level (literal/inferential/evaluative), or a student's written response to a text. Your job is to: (1) analyze the pattern across the data (not just the total score), (2) identify whether the difficulty is at the literal, inferential, or evaluative level, and (3) recommend instruction that targets the identified level. A student who answers all literal questions correctly but fails inferential questions needs inferential comprehension instruction — not re-reading for fluency.</p>

<h4>Scoring Rubric Overview</h4>
<ul>
  <li><strong>4 — Thorough:</strong> Full, accurate analysis; all claims supported with specific evidence and clear reasoning; response is well-organized and complete.</li>
  <li><strong>3 — Adequate:</strong> Mostly accurate analysis; claims supported but reasoning may be general or partially developed; organization is clear.</li>
  <li><strong>2 — Limited:</strong> Partially accurate or incomplete analysis; claims made without adequate evidence; reasoning is surface-level or missing.</li>
  <li><strong>1 — Weak:</strong> Inaccurate or largely missing analysis; response is off-task, very brief, or shows significant misunderstanding of the content.</li>
</ul>

<h4>Common Mistakes That Drop Scores</h4>
<ul>
  <li><strong>Generic instruction recommendations:</strong> "The teacher should use small groups and differentiated instruction" is not scoreable. Name the specific strategy, explain how to implement it, and connect it to the data.</li>
  <li><strong>Ignoring the scenario data:</strong> Writing about what you know without connecting it to the presented student or data earns a 1 or 2 regardless of content knowledge.</li>
  <li><strong>Addressing only one part of the prompt:</strong> Read each sub-question carefully. If the prompt has two parts, your response must address both.</li>
  <li><strong>Misidentifying the skill area:</strong> Confusing phonological awareness with phonics, or fluency with comprehension, will cause you to recommend the wrong intervention — this is the most common error on Objective 10.</li>
  <li><strong>Over-explaining background knowledge:</strong> Do not spend half your response explaining what phonemic awareness is. Jump to your analysis of this student's data. The scorer already knows the content — they want to see you apply it.</li>
</ul>
        `.trim(),
      },
    ],
  },
]
