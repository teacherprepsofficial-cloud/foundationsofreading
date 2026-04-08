export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  publishedAt: string
  sections: { heading: string; content: string; html?: boolean }[]
  quiz?: boolean
  quizPdfSlug?: string
  optin?: {
    pdfSlug: string
    headline: string
    subheadline: string
    pdfLabel: string
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'foundations-of-reading-890',
    title: 'Foundations of Reading 890',
    metaDescription: 'Complete guide to the Foundations of Reading 890 test — format, subareas, passing scores by state, study resources, and free PDF download.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'fort-890-reference',
      headline: 'Free Foundations of Reading 890 Reference Guide',
      subheadline: 'Two-page cheat sheet — all five subareas, passing scores by state, key concepts, and the open-response template.',
      pdfLabel: 'FORT 890 Quick Reference Guide (PDF)',
    },
    sections: [
      {
        heading: 'What is the Foundations of Reading 890?',
        html: true,
        content: '<p>The <strong>Foundations of Reading (890)</strong> is a teacher licensure exam administered by <strong>Pearson</strong> through the National Evaluation Series (NES). It replaced the NES 190 in states that transitioned to the NES in [State] registration portal. The test content is identical to the 190 — same questions, same format, same timing. The only difference is the test code and where you register.</p><p>If you are searching for a <strong>Foundations of reading 890 pdf</strong> to study from, keep reading. This guide covers the full test framework, and we have a <strong>Foundations of reading 890 pdf free download</strong> at the bottom of this page.</p>',
      },
      {
        heading: 'Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Code</td><td>890 — Foundations of Reading</td></tr><tr><td>Administered By</td><td><strong>Pearson Foundations of Reading (890)</strong> through the NES program</td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Appointment Time</td><td>4h 15m (testing center) · 4h 30m (online proctored)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Online Proctoring</td><td>Available — 15-min break between MC and written sections</td></tr><tr><td>Score Scale</td><td>100–300</td></tr><tr><td>Retake Policy</td><td>30-day wait · No limit on attempts</td></tr></tbody></table>',
      },
      {
        heading: 'Passing scores by state',
        html: true,
        content: '<p>The 890 uses different passing scores depending on your state. Confirm yours before you register.</p><table><thead><tr><th>State</th><th>Passing Score</th></tr></thead><tbody><tr><td>Alabama</td><td>233</td></tr><tr><td>Arkansas</td><td>233</td></tr><tr><td>Connecticut</td><td>240</td></tr><tr><td>Mississippi</td><td>240</td></tr><tr><td>New Hampshire</td><td>240</td></tr><tr><td>North Carolina</td><td>240</td></tr><tr><td>Ohio</td><td>220</td></tr><tr><td>Rhode Island</td><td>240</td></tr><tr><td>Utah</td><td>240</td></tr><tr><td>Wisconsin</td><td>240</td></tr><tr><td>National Benchmark</td><td>240</td></tr></tbody></table>',
      },
      {
        heading: '890 vs. 190 — what changed?',
        html: true,
        content: '<table><thead><tr><th>Feature</th><th>NES 190</th><th>NES 890</th></tr></thead><tbody><tr><td>Test content</td><td>100 MC + 2 written</td><td>Identical</td></tr><tr><td>Timing</td><td>4 hours</td><td>Identical</td></tr><tr><td>Scoring</td><td>100–300 scale</td><td>Identical</td></tr><tr><td>Registration</td><td>Standard NES site</td><td>NES in [State] portal</td></tr><tr><td>Test code</td><td>190</td><td>890</td></tr></tbody></table><p>If you studied for the 190, you are already prepared for the 890. Same test, different code.</p>',
      },
      {
        heading: 'The five subareas',
        html: true,
        content: '<table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>43–45 MC</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>33–35 MC</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>21–23 MC</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10%</td><td>10</td><td>1 written</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>10%</td><td>11</td><td>1 written</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea I: Foundations of Reading Development (35%)',
        html: true,
        content: '<p>This is the largest section. It covers four objectives and makes up more than a third of your score.</p><h3>Objective 1 — Phonological and Phonemic Awareness</h3><table><thead><tr><th>Concept</th><th>What to know</th></tr></thead><tbody><tr><td>Phonological Awareness</td><td>Hearing and manipulating sound structures — words, syllables, onset-rime</td></tr><tr><td>Phonemic Awareness</td><td>Specific type: individual phonemes (smallest sound units)</td></tr><tr><td>Key Tasks</td><td>Isolation, blending, segmentation, deletion, substitution</td></tr><tr><td>Alphabetic Principle</td><td>Letters represent sounds in a predictable way</td></tr><tr><td>Concepts of Print</td><td>Directionality, spacing, word boundaries, print carries meaning</td></tr></tbody></table><h3>Objective 2 — Phonics and Spelling</h3><table><thead><tr><th>Concept</th><th>What to know</th></tr></thead><tbody><tr><td>Systematic Explicit Phonics</td><td>Logical sequence, directly taught — not discovered</td></tr><tr><td>CVC / CVCe / Vowel Teams</td><td>cat → make → rain — common word patterns</td></tr><tr><td>Digraphs vs. Blends</td><td>Digraph = one sound (sh, ch). Blend = each letter sounds (bl, str).</td></tr><tr><td>High-Frequency Words</td><td>Taught for automatic recognition (the, was, said)</td></tr><tr><td>Encoding ↔ Decoding</td><td>Spelling reinforces phonics. Analyze spelling to assess phonics.</td></tr></tbody></table><h3>Objective 3 — Word Analysis and Morphemic Analysis</h3><table><thead><tr><th>Concept</th><th>What to know</th></tr></thead><tbody><tr><td>Morphemes</td><td>Smallest units of meaning: base words, roots, prefixes, suffixes</td></tr><tr><td>Inflectional Suffixes</td><td>Don\'t change part of speech: -s, -ed, -ing</td></tr><tr><td>Derivational Suffixes</td><td>Change part of speech: -tion (verb→noun), -able (verb→adj)</td></tr><tr><td>Six Syllable Types</td><td>Closed, open, vowel team, CVCe, r-controlled, consonant-le</td></tr></tbody></table><h3>Objective 4 — Reading Fluency</h3><table><thead><tr><th>Concept</th><th>What to know</th></tr></thead><tbody><tr><td>Three Indicators</td><td>Accuracy, rate, prosody</td></tr><tr><td>Prosody</td><td>Phrasing, stress, intonation — bridge between fluency and comprehension</td></tr><tr><td>Automaticity</td><td>Word recognition without conscious effort</td></tr><tr><td>Build Fluency With</td><td>Repeated reading, modeled reading, echo reading, wide reading</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea II: Development of Reading Comprehension (27%)',
        html: true,
        content: '<h3>Objective 5 — Academic Language and Vocabulary</h3><table><thead><tr><th>Tier</th><th>Type</th><th>Example</th><th>Instruction Priority</th></tr></thead><tbody><tr><td>Tier 1</td><td>Everyday words</td><td>cat, run, happy</td><td>Low — learned through conversation</td></tr><tr><td>Tier 2</td><td>Academic words</td><td>analyze, significant, contrast</td><td>Highest — teach these explicitly</td></tr><tr><td>Tier 3</td><td>Domain-specific</td><td>photosynthesis, denominator</td><td>Teach in context as needed</td></tr></tbody></table><h3>Objective 6 — Literary Text</h3><p>Narrative elements: character, setting, plot, theme, point of view. Literary devices: foreshadowing, symbolism, metaphor. Three comprehension levels: literal, inferential, evaluative.</p><h3>Objective 7 — Informational Text</h3><p>Five text structures: chronological, compare-contrast, cause-effect, problem-solution, description. Text features: headings, captions, diagrams, indexes. Disciplinary literacy across subject areas.</p>',
      },
      {
        heading: 'Subarea III: Reading Assessment and Instruction (18%)',
        html: true,
        content: '<h3>Assessment Types</h3><table><thead><tr><th>Type</th><th>Purpose</th><th>When</th></tr></thead><tbody><tr><td>Screening</td><td>Identify at-risk students</td><td>Beginning of year, all students</td></tr><tr><td>Diagnostic</td><td>Pinpoint specific strengths/needs</td><td>After screening flags a concern</td></tr><tr><td>Progress Monitoring</td><td>Track response to instruction</td><td>Ongoing, frequent</td></tr><tr><td>Formative</td><td>Guide daily instruction</td><td>During instruction</td></tr><tr><td>Summative</td><td>Evaluate mastery of standards</td><td>End of unit or year</td></tr></tbody></table><h3>MTSS / RTI Tiers</h3><table><thead><tr><th>Tier</th><th>Description</th></tr></thead><tbody><tr><td>Tier 1</td><td>High-quality core instruction for all students</td></tr><tr><td>Tier 2</td><td>Small-group targeted intervention</td></tr><tr><td>Tier 3</td><td>Intensive, individualized support</td></tr></tbody></table>',
      },
      {
        heading: 'Subareas IV and V: Written Assignments (20%)',
        html: true,
        content: '<p>Two written assignments, each scored 1–4. Subarea IV focuses on foundational reading skills. Subarea V focuses on reading comprehension.</p><h3>The 4-Step Response Template</h3><table><thead><tr><th>Step</th><th>What to write</th></tr></thead><tbody><tr><td>1. Strength</td><td>One significant strength with specific evidence from the student data</td></tr><tr><td>2. Need</td><td>One significant need with specific evidence</td></tr><tr><td>3. Strategy</td><td>Name one specific instructional strategy that addresses the need</td></tr><tr><td>4. Rationale</td><td>Explain why this strategy works for this particular student</td></tr></tbody></table><p>Use professional terminology: phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding, gradual release of responsibility.</p>',
      },
      {
        heading: 'Foundations of Reading (890) practice test',
        html: true,
        content: '<p>We offer a free <strong>Foundations of Reading (890) practice test</strong> with 25 questions covering all three multiple-choice subareas. Each question includes a detailed explanation. <a href="/blog/190-foundations-of-reading-practice-test">Take the free practice test →</a></p><p>Our full prep program includes additional practice tests with 100 questions each, AI-graded written response practice, flashcards, and a complete study guide.</p>',
      },
      {
        heading: 'Study tips',
        html: true,
        content: '<table><thead><tr><th>Tip</th><th>Why</th></tr></thead><tbody><tr><td>Start with Subarea I</td><td>It is 35% of your score — the biggest section by far</td></tr><tr><td>Learn the terminology</td><td>The exam tests whether you know the names, not just the ideas</td></tr><tr><td>Practice written responses</td><td>The two essays are 20% of your score and require a specific structure</td></tr><tr><td>Choose the most structured answer</td><td>The exam favors explicit, systematic, evidence-based instruction</td></tr><tr><td>Avoid "always" and "never"</td><td>Answer choices with absolutes are almost always wrong</td></tr><tr><td>Budget 90 sec per MC question</td><td>Leaves 45–50 min per written assignment</td></tr></tbody></table>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>Is the 890 the same as the 190?</h3><p>Yes. Same content, same format, same timing. The 890 is the test code used when registering through the NES in [State] portal instead of the standard NES site.</p><h3>Where do I register for the 890?</h3><p>Through the National Evaluation Series in [Your State] page on the <strong>Pearson Foundations of Reading (890)</strong> registration site. Not the standard NES 190 page.</p><h3>Is there a free study guide PDF?</h3><p>Yes. We offer a <strong>Foundations of reading 890 pdf free</strong> reference guide that covers the test format, all five subareas, and the open-response template. Enter your email below to download it.</p><h3>What is the passing score?</h3><p>Depends on your state. Ohio is 220. Alabama and Arkansas are 233. Most other states require 240.</p><h3>Can I take it online?</h3><p>Yes. Online proctoring is available with a 15-minute break between the MC and written sections. You need a private room, webcam, microphone, and stable internet.</p><h3>How do I prepare?</h3><p>Start with Subarea I (35% of the score). Use our free <strong>Foundations of reading 890 pdf free download</strong> to cover the key concepts, then take the free 25-question practice test to identify your weak areas.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-190-study-guide',
    title: 'Foundations of Reading 190 Study Guide',
    metaDescription: 'Free Foundations of Reading 190 study guide covering all 4 subareas, 11 objectives, key concepts, and open-response strategy. Download the starter PDF.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'study-guide-starter',
      headline: 'Download the Free Starter Study Guide',
      subheadline: 'Covers Subarea I in full — phonological awareness, phonics, fluency, word analysis. The most tested 35% of the exam.',
      pdfLabel: 'NES 190 Starter Study Guide (PDF)',
    },
    sections: [
      {
        heading: 'What this study guide covers',
        html: true,
        content: '<p>This is a complete <strong>Foundations of reading 190 study guide</strong> built around the actual test framework. It covers all four subareas, all 11 objectives, and the two written assignments. If you are looking for a <strong>Foundations of reading 190 study guide pdf free download</strong>, scroll to the bottom — we have a free starter PDF that covers Subarea I (35% of the exam) in detail.</p><p>The NES 190 Foundations of Reading test is required for teacher licensure in multiple states. It has 100 multiple-choice questions and 2 open-response written assignments. You need a passing score of 220 (Ohio) or 240 (most other states). This guide breaks down exactly what you need to know.</p>',
      },
      {
        heading: 'Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Code</td><td>190 (NES Foundations of Reading)</td></tr><tr><td>Format</td><td>100 multiple-choice + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Appointment Time</td><td>4h 15m (testing center) · 4h 30m (online proctored)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Passing Score</td><td>220 (Ohio) · 233 (Alabama, Arkansas) · 240 (most states)</td></tr><tr><td>Score Scale</td><td>100–300</td></tr><tr><td>Retake Policy</td><td>30-day wait · No limit on attempts</td></tr></tbody></table>',
      },
      {
        heading: 'Exam Weight Breakdown by Subarea',
        html: true,
        content: '<p>The exam is weighted unevenly. Subarea I is 35% of your score — more than Subareas III and IV combined. Spend your study time accordingly.</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Questions</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>43–45 MC</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>33–35 MC</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>21–23 MC</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>20%</td><td>2 written</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea I: Foundations of Reading Development (35%)',
        html: true,
        content: '<p>This is the largest section. It covers objectives 1 through 4. You need to know these concepts cold.</p><h3>Objective 1: Phonological and Phonemic Awareness</h3><table><thead><tr><th>Concept</th><th>What it means</th></tr></thead><tbody><tr><td>Phonological Awareness</td><td>Hearing and manipulating sound structures in spoken language — words, syllables, onset-rime</td></tr><tr><td>Phonemic Awareness</td><td>A specific type: hearing and manipulating individual phonemes (smallest units of sound)</td></tr><tr><td>Key Tasks</td><td>Isolation, identification, blending, segmentation, deletion, substitution</td></tr><tr><td>Alphabetic Principle</td><td>Letters represent sounds in a predictable, systematic way</td></tr><tr><td>Concepts of Print</td><td>Print carries meaning, directionality, spacing, letter vs. word</td></tr></tbody></table><h3>Objective 2: Phonics, High-Frequency Words, and Spelling</h3><table><thead><tr><th>Concept</th><th>What it means</th></tr></thead><tbody><tr><td>Systematic Explicit Phonics</td><td>Taught in a logical sequence, directly — not discovered or guessed</td></tr><tr><td>CVC Patterns</td><td>Consonant-vowel-consonant (cat, sit, run) — foundation of decoding</td></tr><tr><td>CVCe / Vowel Teams</td><td>Silent e patterns (make, ride) and vowel pairs (rain, boat)</td></tr><tr><td>High-Frequency Words</td><td>Words taught for automatic recognition (the, was, said)</td></tr><tr><td>Encoding/Decoding Link</td><td>Spelling reinforces phonics — analyze student spelling to assess phonics knowledge</td></tr></tbody></table><h3>Objective 3: Word Analysis and Morphemic Analysis</h3><table><thead><tr><th>Concept</th><th>What it means</th></tr></thead><tbody><tr><td>Morphemes</td><td>Smallest units of meaning: base words, roots, prefixes, suffixes</td></tr><tr><td>Inflectional vs. Derivational</td><td>Inflectional (-s, -ed, -ing) keeps part of speech. Derivational (-tion, -able) changes it.</td></tr><tr><td>Six Syllable Types</td><td>Closed, open, vowel team, CVCe, r-controlled, consonant-le</td></tr><tr><td>Orthographic Rules</td><td>Spelling rules like dropping silent e before a vowel suffix</td></tr></tbody></table><h3>Objective 4: Reading Fluency</h3><table><thead><tr><th>Concept</th><th>What it means</th></tr></thead><tbody><tr><td>Three Indicators</td><td>Accuracy, rate, and prosody (expression)</td></tr><tr><td>Prosody</td><td>Reading with appropriate phrasing, stress, and intonation</td></tr><tr><td>Automaticity</td><td>Recognizing words instantly without conscious effort</td></tr><tr><td>Fluency as Bridge</td><td>Connects decoding to comprehension — prosody bridges fluency to meaning</td></tr><tr><td>Build Fluency With</td><td>Repeated reading, modeled reading, wide reading at independent level</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea II: Development of Reading Comprehension (27%)',
        html: true,
        content: '<p>Covers objectives 5 through 7. Vocabulary, literary text, and informational text.</p><h3>Objective 5: Academic Language and Vocabulary</h3><table><thead><tr><th>Concept</th><th>What it means</th></tr></thead><tbody><tr><td>Tier 1 Words</td><td>Everyday words (cat, run, happy) — usually learned through conversation</td></tr><tr><td>Tier 2 Words</td><td>High-utility academic words (analyze, significant, contrast) — highest priority for instruction</td></tr><tr><td>Tier 3 Words</td><td>Domain-specific (photosynthesis, denominator) — taught in context</td></tr><tr><td>Word Consciousness</td><td>Interest in and awareness of words — builds motivation to learn vocabulary</td></tr><tr><td>Context Clues</td><td>Apposition, synonym/restatement, contrast/antonym, definition clues</td></tr></tbody></table><h3>Objective 6: Literary Text Comprehension</h3><p>Narrative elements (character, setting, plot, theme, point of view). Literary devices (foreshadowing, symbolism, metaphor). Three levels of comprehension: literal, inferential, evaluative. Strategies: think-alouds, close reading, reciprocal teaching.</p><h3>Objective 7: Informational Text Comprehension</h3><p>Five text structures: chronological, compare-contrast, cause-effect, problem-solution, description. Text features: headings, captions, diagrams, indexes. Disciplinary literacy: words like "factor" mean different things in math vs. social studies.</p>',
      },
      {
        heading: 'Subarea III: Reading Assessment and Instruction (18%)',
        html: true,
        content: '<p>Covers objectives 8 and 9. Assessment types and instructional best practices.</p><h3>Assessment Types</h3><table><thead><tr><th>Type</th><th>Purpose</th><th>When</th></tr></thead><tbody><tr><td>Screening</td><td>Identify students at risk</td><td>Beginning of year, all students</td></tr><tr><td>Diagnostic</td><td>Pinpoint specific strengths and weaknesses</td><td>After screening flags a concern</td></tr><tr><td>Progress Monitoring</td><td>Track response to instruction over time</td><td>Ongoing, frequent</td></tr><tr><td>Formative</td><td>Inform day-to-day instructional decisions</td><td>During instruction</td></tr><tr><td>Summative</td><td>Evaluate whether students met grade-level standards</td><td>End of unit or year</td></tr></tbody></table><h3>MTSS / RTI</h3><table><thead><tr><th>Tier</th><th>What it looks like</th></tr></thead><tbody><tr><td>Tier 1</td><td>High-quality core instruction for all students</td></tr><tr><td>Tier 2</td><td>Small-group targeted intervention for students not meeting benchmarks</td></tr><tr><td>Tier 3</td><td>Intensive, individualized intervention for students with significant needs</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea IV: Open-Response Written Assignments (20%)',
        html: true,
        content: '<p>Two written assignments, each scored on a 4-point scale. One focuses on foundational reading skills, the other on reading comprehension.</p><h3>The 4-Step Response Template</h3><table><thead><tr><th>Step</th><th>What to write</th></tr></thead><tbody><tr><td>1. Strength</td><td>Identify one significant strength. Cite specific evidence from the student data.</td></tr><tr><td>2. Need</td><td>Identify one significant need. Point to specific errors, patterns, or scores.</td></tr><tr><td>3. Strategy</td><td>Name one specific instructional strategy that addresses the need.</td></tr><tr><td>4. Rationale</td><td>Explain why this strategy will work for this particular student.</td></tr></tbody></table><h3>Scoring Criteria</h3><p>Each response is scored on: Purpose (did you address the prompt), Subject Matter Knowledge (do you know your stuff), Support (did you cite evidence), and Rationale (does your reasoning connect). Use professional terminology: phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding, gradual release of responsibility.</p>',
      },
      {
        heading: 'Study Schedule: How to Prepare in 2–4 Weeks',
        html: true,
        content: '<table><thead><tr><th>Week</th><th>Focus</th><th>Why</th></tr></thead><tbody><tr><td>Week 1</td><td>Subarea I: Phonological awareness, phonics, fluency, word analysis</td><td>35% of the exam — this is where most points are</td></tr><tr><td>Week 2</td><td>Subarea II: Vocabulary tiers, literary text, informational text</td><td>27% — second largest section</td></tr><tr><td>Week 3</td><td>Subarea III + IV: Assessment types, MTSS, written response practice</td><td>38% combined — write at least 2 practice responses</td></tr><tr><td>Week 4</td><td>Full practice test + review weak areas</td><td>Identify gaps and drill them before test day</td></tr></tbody></table>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>How many questions are on the NES 190?</h3><p>100 multiple-choice questions and 2 open-response written assignments.</p><h3>What is the passing score?</h3><p>220 in Ohio. 233 in Alabama and Arkansas. 240 in most other states. Always confirm with your state.</p><h3>How long is the test?</h3><p>4 hours of testing time. Your appointment is either 4h 15m (testing center) or 4h 30m (online proctored).</p><h3>Can I take it online?</h3><p>Yes. Online proctoring is available with a 15-minute break between the MC and written sections.</p><h3>How should I study?</h3><p>Start with Subarea I (35% of the score). Focus on understanding concepts, not memorizing definitions. Practice applying knowledge to classroom scenarios. Write at least two practice responses before test day.</p><h3>Is there a free study guide PDF?</h3><p>Yes. We offer a <strong>Foundations of reading 190 study guide pdf</strong> as a free starter download. It covers Subarea I in detail — the most heavily tested 35% of the exam. For the complete study guide covering all four subareas with practice questions and AI-graded written responses, check out our full prep program.</p>',
      },
      {
        heading: 'Download the Free Starter Study Guide',
        html: true,
        content: '<p>Our <strong>Foundations of reading 190 study guide pdf free download</strong> covers Subarea I — Foundations of Reading Development — in full. That is 35% of the exam. The starter guide includes key concepts, definitions, and the terminology you need for phonological awareness, phonics, fluency, and word analysis.</p><p>Want the complete study guide with all four subareas, practice tests, flashcards, and AI-graded written responses? <a href="/#pricing" style="color:#7c1c2e;font-weight:600;">See our full prep program →</a></p>',
      },
    ],
  },
  {
    slug: 'arkansas-foundations-of-reading',
    title: 'Arkansas Foundations of Reading',
    metaDescription: 'Arkansas uses the Foundations of Reading 890 test with a passing score of 233. Registration, test format, subareas, and how to prepare.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'arkansas-fort',
      headline: 'Free Arkansas FORT Quick Reference Guide',
      subheadline: 'Arkansas-specific passing score, test format, subareas, and open-response strategy — two pages.',
      pdfLabel: 'Arkansas FORT Quick Reference Guide (PDF)',
    },
    sections: [
      {
        heading: 'Arkansas now uses the Foundations of Reading 890',
        content: 'Arkansas switched to the Foundations of Reading 890 through the National Evaluation Series in Arkansas. Same test content as the old 190 — 100 multiple-choice questions and 2 written assignments, 4 hours of testing time. The test code changed, and registration moved to the NES in Arkansas portal.',
      },
      {
        heading: 'What is the passing score for the Foundations of reading test in Arkansas?',
        content: 'Arkansas requires a score of 233. The national benchmark is 240, but Arkansas set its own cut score at 233. Scores range from 100 to 300.',
      },
      {
        heading: 'Registration has moved',
        content: 'Registration for the Arkansas Foundations of Reading test has moved. To register for the Foundations of Reading (890), visit the National Evaluation Series in Arkansas page — not the standard NES 190 registration. If you need access to testing history or score reports from before September 1, 2025, follow the instructions on the NES site for previous testing history.',
      },
      {
        heading: 'Test format',
        content: '100 multiple-choice questions plus 2 open-response written assignments. 4 hours of testing time. Testing center appointment: 4 hours 15 minutes. Online proctored appointment: 4 hours 30 minutes with a 15-minute break between the MC and written sections. Fee is $139.',
      },
      {
        heading: 'Online proctoring is available',
        content: 'You can take the 890 from home with online proctoring. You need a private room, webcam, microphone, and stable internet. The 15-minute break comes between the multiple-choice and written sections. After the break, you cannot return to the multiple-choice questions.',
      },
      {
        heading: 'The five subareas',
        content: 'Subarea I — Foundations of Reading Development (35%, objectives 1–4). Phonological awareness, phonemic awareness, phonics, high-frequency words, spelling, word analysis, fluency. Subarea II — Development of Reading Comprehension (27%, objectives 5–7). Vocabulary, academic language, literary text, informational text. Subarea III — Reading Assessment and Instruction (18%, objectives 8–9). Screening, diagnostic, progress monitoring, MTSS/RTI, differentiated instruction. Subarea IV — Foundational Reading Skills (10%, objective 10). One written assignment analyzing student performance in foundational skills. Subarea V — Reading Comprehension (10%, objective 11). One written assignment analyzing student performance in comprehension.',
      },
      {
        heading: 'How to prepare',
        content: 'Subarea I is 35% of your score. Start there. Know the difference between phonological awareness and phonemic awareness. Know the six syllable types. Know what systematic explicit instruction looks like. For the two written assignments, use the four-part structure: one strength with evidence, one need with evidence, one named strategy, one explanation of why it works. Use professional terminology — miscue analysis, prosody, scaffolding, gradual release of responsibility.',
      },
    ],
  },
  {
    slug: 'alabama-foundations-of-reading',
    title: 'Alabama Foundations of Reading',
    metaDescription: 'Alabama uses the Foundations of Reading 890 test with a passing score of 233. Here is everything you need to know to register, prepare, and pass.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'alabama-fort',
      headline: 'Free Alabama FORT Quick Reference Guide',
      subheadline: 'Alabama-specific passing score, test format, subareas, and open-response strategy — all on two pages.',
      pdfLabel: 'Alabama FORT Quick Reference Guide (PDF)',
    },
    sections: [
      {
        heading: 'Alabama now uses the Foundations of Reading 890',
        content: 'Alabama switched from the NES 190 to the Foundations of Reading 890. The test is part of the National Evaluation Series (NES) in Alabama. The content, format, and timing are the same — 100 multiple-choice questions and 2 open-response written assignments, 4 hours of testing time. The only differences are the test code (890 instead of 190) and where you register. To sign up, go to the National Evaluation Series in Alabama page on the NES website.',
      },
      {
        heading: 'What is the passing score for Foundations of reading in Alabama?',
        content: 'Alabama requires a score of 233. The national benchmark is 240, but Alabama set its own cut score at 233. Scores range from 100 to 300. You get one combined score from your multiple-choice answers and your two written responses.',
      },
      {
        heading: 'Is the foundation of reading test hard?',
        content: 'It is if you study the wrong things. The test does not reward memorization — it rewards understanding. You need to know why systematic explicit phonics instruction works, not just that it does. The multiple-choice questions describe classroom scenarios and ask you to pick the best instructional response. The two written assignments ask you to read student performance data, identify a strength and a need, recommend a strategy, and explain why it fits. If you can connect assessment evidence to instruction with specific terminology, you will pass.',
      },
      {
        heading: 'Test format',
        content: '100 multiple-choice questions plus 2 open-response written assignments. 4 hours of testing time. At a testing center your appointment is 4 hours 15 minutes. Online proctored appointments are 4 hours 30 minutes with a 15-minute break between the multiple-choice section and the written assignments.',
      },
      {
        heading: 'Online proctoring is available',
        content: 'You can take the 890 at a Pearson VUE testing center or from home with online proctoring. Online proctoring requires a private room, webcam, microphone, and stable internet. You get a 15-minute break between the MC and written sections. After the break, you cannot go back to the multiple-choice questions.',
      },
      {
        heading: 'The four subareas',
        content: 'Subarea I — Foundations of Reading Development — 35% of the score, roughly 43 to 45 questions. Covers phonological awareness, phonemic awareness, phonics, high-frequency words, spelling, word analysis, and fluency. Subarea II — Development of Reading Comprehension — 27%, roughly 33 to 35 questions. Covers vocabulary, academic language, literary text, and informational text. Subarea III — Reading Assessment and Instruction — 18%, roughly 21 to 23 questions. Covers screening, diagnostic, progress monitoring, MTSS/RTI, and differentiated instruction. Subarea IV — Integration of Knowledge and Understanding — 20%. Two written assignments where you analyze student data and connect it to instruction.',
      },
      {
        heading: 'How to prepare',
        content: 'Spend the most time on Subarea I. It is 35% of your score. Know the difference between phonological awareness and phonemic awareness. Know the six syllable types. Know what systematic explicit instruction looks like versus implicit or incidental approaches. For the written assignments, practice the four-part structure: one strength with evidence, one need with evidence, one named strategy, one explanation of why it works for that student. Use terms like miscue analysis, prosody, scaffolding, and gradual release of responsibility.',
      },
      {
        heading: 'Registration',
        content: 'Registration for the Alabama Foundations of Reading test has moved. To register for the Foundations of Reading (890) test, visit the National Evaluation Series in Alabama page. The registration fee is $139. You can test year-round at a testing center or during monthly online proctoring windows.',
      },
    ],
  },
  {
    slug: '190-foundations-of-reading-practice-test',
    title: '190 Foundations of Reading Practice Test',
    metaDescription: 'Free 25-question practice test for the NES 190 Foundations of Reading exam. Answer questions, check explanations, and download a PDF version.',
    publishedAt: '2026-04-07',
    quiz: true,
    quizPdfSlug: 'practice-questions',
    optin: {
      pdfSlug: 'practice-questions',
      headline: 'Get the Free 25-Question Practice Test PDF',
      subheadline: 'All 25 questions with a full answer key and detailed explanations. Print it, study on the go.',
      pdfLabel: '25-Question Practice Test + Answer Key (PDF)',
    },
    sections: [
      {
        heading: 'About This Free Practice Test',
        content: 'This free practice test includes 25 multiple-choice questions pulled directly from our full NES 190 Foundations of Reading question bank. The questions cover all three multiple-choice subareas: Foundations of Reading Development (Subarea I), Development of Reading Comprehension (Subarea II), and Reading Assessment and Instruction (Subarea III). Each question includes a detailed explanation of the correct answer and why each incorrect option is wrong. Use this as a quick diagnostic to identify your strengths and the areas where you need more study time.',
      },
      {
        heading: 'How to Use This Practice Test',
        content: 'Read each question carefully and select the best answer before clicking "Check Answer." Pay close attention to the explanation — even for questions you get right, the explanation will reinforce your understanding and help you recognize similar patterns on the real exam. After completing all 25 questions, you will see your score and a breakdown of how you performed. If you prefer to study offline, download the PDF version which includes all 25 questions with a full answer key and explanations at the end.',
      },
      {
        heading: 'What the Real Exam Looks Like',
        content: 'The actual NES 190 exam includes 100 multiple-choice questions and 2 open-response written assignments. You have 4 hours of testing time. The multiple-choice section covers three subareas: Foundations of Reading Development (35% of the total score), Development of Reading Comprehension (27%), and Reading Assessment and Instruction (18%). The written assignments make up the remaining 20%. You need a score of 220 to pass in Ohio, and most other states require 240. The registration fee is $139 and you can test at a Pearson VUE center year-round or through online proctoring during monthly testing windows.',
      },
      {
        heading: 'Tips for Answering NES 190 Practice Questions',
        content: 'The NES 190 consistently favors explicit, systematic, evidence-based approaches. When you see two answer choices that both sound reasonable, choose the one that is more specific, more direct, and more structured. Watch out for answer choices that contain words like "always," "never," or "only" — these are usually wrong. Pay attention to what the question stem is actually asking. Many questions describe a classroom scenario and ask for the most appropriate instructional response. Read the scenario carefully before looking at the options, and make sure your answer addresses the specific student need described, not just a generally good teaching practice.',
      },
    ],
  },
  {
    slug: '190-foundations-of-reading-ohio',
    title: '190 Foundations of Reading Ohio',
    metaDescription: 'Complete guide to the OAE/NES 190 Foundations of Reading test in Ohio — passing score of 220, test format, subareas, and how to prepare.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'fort-ohio-reference',
      headline: 'Get the Free Ohio Foundations of Reading Reference Guide',
      subheadline: 'Ohio passing score (220), test format, all four subareas, key concepts, and open-response strategy — printable PDF.',
      pdfLabel: 'Ohio Foundations of Reading Reference Guide (PDF)',
    },
    sections: [
      {
        heading: 'What Is the 190 Foundations of Reading Test in Ohio?',
        content: 'The 190 Foundations of Reading is a licensure exam required for teacher certification in Ohio. It is part of the Ohio Assessments for Educators (OAE) program and is administered by Pearson. The test measures whether you have the knowledge and skills needed to teach reading effectively in an elementary classroom. It covers everything from phonological awareness and phonics to reading comprehension, assessment practices, and how to apply that knowledge in real instructional scenarios. Ohio requires this exam for candidates seeking licensure in areas that involve reading instruction.',
      },
      {
        heading: 'What score do you need to pass oae 190?',
        content: 'You need a score of 220 to pass the OAE 190 Foundations of Reading test in Ohio. The exam is scored on a scale of 100 to 300. Ohio\'s passing threshold of 220 is lower than the 240 required by most other states that use the same NES exam, but the content and difficulty of the test itself are identical regardless of which state you are testing for. Your score is based on the combined performance across the multiple-choice questions and the two written assignments. If you do not pass on your first attempt, you must wait at least 30 days before retaking the exam, and there is no limit on the number of times you can retake it.',
      },
      {
        heading: 'Is the OAE test hard?',
        content: 'The OAE 190 is a challenging exam because it requires deep knowledge of reading instruction, not just surface-level familiarity. You need to understand the progression of reading skills from phonemic awareness through fluency and comprehension, and you need to know how to apply evidence-based instructional strategies in specific classroom scenarios. The multiple-choice questions go beyond simple recall — many present teaching situations and ask you to choose the most effective instructional response. The two written assignments require you to analyze a student\'s reading performance data, identify strengths and needs, and recommend a specific instructional strategy with a clear rationale. The exam rewards candidates who understand systematic, explicit, evidence-based reading instruction. If you study the right material and practice applying concepts to real scenarios rather than just memorizing definitions, the test is very passable.',
      },
      {
        heading: 'What is a passing score on the Foundations of reading test in Ohio?',
        content: 'The passing score for the Foundations of Reading test in Ohio is 220 out of 300. This is the minimum scaled score you need to meet Ohio\'s licensure requirements. The score is calculated from your combined performance on 100 multiple-choice questions (which account for 80% of your total score) and 2 open-response written assignments (which account for the remaining 20%). Each written assignment is scored on a scale of 1 to 4, with scoring focused on your purpose, subject matter knowledge, use of supporting evidence, and rationale. Even though 220 may sound like a relatively low bar on a 300-point scale, the scoring is scaled — meaning the raw number of correct answers needed depends on the difficulty of the specific test form you receive.',
      },
      {
        heading: 'Test Format and Structure',
        content: 'The OAE 190 consists of 100 multiple-choice questions and 2 open-response written assignments. You have 4 hours of actual testing time. If you test at a Pearson VUE testing center, your total appointment time is 4 hours and 15 minutes, which includes 15 minutes for the tutorial and nondisclosure agreement. If you choose online proctoring, your appointment is 4 hours and 30 minutes, with a 15-minute break between the multiple-choice section (2 hours 30 minutes) and the written assignment section (1 hour 30 minutes). After the break during online testing, you will begin the written assignments and no longer have access to the multiple-choice questions. The registration fee is $139. Testing center appointments are available year-round on a first-come, first-served basis. Online-proctored appointments are available during one-week testing windows each month.',
      },
      {
        heading: 'The Four Subareas and Their Weights',
        content: 'The exam is divided into four subareas. Subarea I covers Foundations of Reading Development (35% of the total score, approximately 43 to 45 multiple-choice questions) and includes phonological awareness, phonemic awareness, the alphabetic principle, phonics, high-frequency words, spelling, word analysis, syllabication, morphemic analysis, and reading fluency. Subarea II covers Development of Reading Comprehension (27%, approximately 33 to 35 questions) and focuses on academic language development, vocabulary instruction including the three-tier framework, literary text comprehension and analysis, and informational text comprehension and analysis. Subarea III covers Reading Assessment and Instruction (18%, approximately 21 to 23 questions) and includes screening, diagnostic, formative, summative, and progress-monitoring assessments, data-driven instruction, tiered intervention models like MTSS, and differentiation for diverse learners. Subarea IV is Integration of Knowledge and Understanding (20%) and consists of the 2 open-response written assignments — one focused on foundational reading skills and one on reading comprehension.',
      },
      {
        heading: 'How to Prepare for the OAE 190 in Ohio',
        content: 'Start by understanding the weight distribution across the four subareas. Subarea I alone accounts for 35% of your score, so phonological awareness, phonics, and fluency should get the most study time. Learn the key terminology — know the difference between phonological awareness and phonemic awareness, understand the six syllable types, and be able to explain systematic explicit instruction versus implicit approaches. For Subarea II, focus on the three-tier vocabulary framework and the differences between literary and informational text structures. For Subarea III, know the different assessment types and when each is appropriate. For the written assignments in Subarea IV, practice the four-step response structure: identify a strength with evidence, identify a need with evidence, recommend a specific strategy, and explain why it works for that student. Use professional terminology throughout your response. Budget your time carefully on test day — roughly 90 seconds per multiple-choice question, and at least 45 minutes per written assignment.',
      },
      {
        heading: 'Testing Options: Testing Center vs. Online Proctoring',
        content: 'Ohio candidates can take the OAE 190 at a Pearson VUE testing center or through online proctoring from home. Testing center appointments are available year-round at sites throughout Ohio and nationwide. Online-proctored appointments are available during designated one-week windows each month. If you choose online proctoring, you will need a private room, a reliable internet connection, a working webcam, and a microphone. The online format includes a mandatory 15-minute break between the multiple-choice and written assignment sections. After this break, you begin the written assignments and can no longer return to the multiple-choice questions. Both formats cover the same content and use the same scoring. Your total testing time of 4 hours is the same regardless of format, but the appointment length differs slightly — 4 hours 15 minutes at a testing center versus 4 hours 30 minutes for online proctoring.',
      },
    ],
  },
  {
    slug: '190-foundations-of-reading',
    title: '190 Foundations of Reading',
    metaDescription: 'Everything you need to know about the NES 190 Foundations of Reading test — format, subareas, passing score, and how to prepare for exam day.',
    publishedAt: '2026-04-07',
    optin: {
      pdfSlug: 'nes-190-reference',
      headline: 'Get the Free NES 190 Quick Reference Guide',
      subheadline: 'A one-page cheat sheet covering the exam format, all four subareas, key concepts, and open-response strategy. Yours free.',
      pdfLabel: 'NES 190 Quick Reference Guide (PDF)',
    },
    sections: [
      {
        heading: 'What Is the NES 190 Foundations of Reading Test?',
        content: 'The NES 190 Foundations of Reading test is a licensure exam that measures whether aspiring teachers understand the knowledge and skills required to teach reading effectively. Administered by Pearson through the National Evaluation Series (NES) program, it is required for teacher certification in multiple states. The exam assesses your command of evidence-based reading instruction — from the earliest phonological foundations all the way through comprehension, assessment, and classroom application.',
      },
      {
        heading: 'Test Format and Timing',
        content: 'The exam includes 100 multiple-choice questions and 2 open-response written assignments, for a total of 102 items. You have 4 hours of actual testing time. At a physical testing center, your total appointment is 4 hours and 15 minutes — the extra 15 minutes covers the tutorial and nondisclosure agreement before the clock starts. If you choose online proctoring, your appointment is 4 hours and 30 minutes and includes a 15-minute break between the multiple-choice section (2.5 hours) and the written assignments (1.5 hours). The registration fee is $139, and score reports follow a schedule that varies depending on how you tested.',
      },
      {
        heading: 'Passing Score',
        content: 'The passing score for the NES 190 in Ohio is 220 on a scale of 100 to 300. Other states that use the same exam typically require a score of 240, though requirements vary — always confirm the passing score with your specific state\'s department of education before you register. If you already hold a passing score from the NES 190 and are seeking certification in a different state, your score is generally transferable, provided it meets that state\'s threshold.',
      },
      {
        heading: 'Subarea I: Foundations of Reading Development (35%)',
        content: 'This is the largest section of the exam, making up roughly 43 to 45 multiple-choice items. It covers the building blocks of learning to read: phonological and phonemic awareness, print concepts, the alphabetic principle, systematic phonics instruction, high-frequency word recognition, spelling development, word analysis strategies, and reading fluency. Questions in this subarea often ask you to evaluate instructional activities, identify appropriate strategies for specific student needs, or demonstrate understanding of how foundational reading skills develop in sequence.',
      },
      {
        heading: 'Subarea II: Development of Reading Comprehension (27%)',
        content: 'Approximately 33 to 35 multiple-choice items focus on how students develop the ability to understand what they read. This includes academic language development, vocabulary instruction across the three tiers of word knowledge, comprehension of literary texts (narrative structure, literary devices, inferential thinking), and comprehension of informational texts (text structures, text features, summarization). Understanding how vocabulary connects to comprehension — and how to teach both explicitly — is central to this subarea.',
      },
      {
        heading: 'Subarea III: Reading Assessment and Instruction (18%)',
        content: 'Roughly 21 to 23 items address how teachers assess reading and use that data to drive instruction. You will need to understand the different purposes of screening, diagnostic, progress monitoring, formative, and summative assessments. This subarea also covers instructional best practices, how to differentiate for English language learners and students with disabilities, and how to support advanced readers. The ability to interpret assessment results and translate them into instructional decisions is a key skill tested here.',
      },
      {
        heading: 'Subarea IV: Integration of Knowledge and Understanding (20%)',
        content: 'The two open-response written assignments make up this subarea and are worth 20% of your total score. Each prompt presents a classroom scenario — typically including student data such as a running record, writing sample, or assessment results — and asks you to analyze the student\'s performance, identify a specific strength and a specific need with evidence, recommend a targeted instructional strategy, and explain why that strategy fits the student\'s situation. Responses are scored on a 4-point rubric evaluating purpose, subject matter knowledge, use of evidence, and quality of reasoning.',
      },
      {
        heading: 'How to Prepare for the NES 190',
        content: 'Effective preparation for the NES 190 combines content study with applied practice. Start by reviewing each subarea\'s key concepts — particularly phonemic awareness, phonics instruction, vocabulary frameworks like the three-tier model, and assessment types. Then use practice tests to apply what you know to real exam-style questions. For the open-response section, practice writing structured responses using specific evidence and professional reading terminology. Most test-takers benefit from a 3 to 4 week focused study period. Prioritize Subarea I, which carries the heaviest weight, but do not neglect Subarea IV — the written assignments require a different kind of preparation than multiple-choice review.',
      },
      {
        heading: 'Testing Options: Testing Center vs. Online Proctoring',
        content: 'The NES 190 is available year-round at Pearson VUE testing centers on a first-come, first-served basis. Online proctored sessions are available remotely — including from home — during monthly designated testing windows. If you choose online proctoring, you will need a private room, a reliable internet connection, a working webcam, and a microphone. Both formats cover the same content and use the same scoring system. Your appointment time differs slightly between the two options, but your 4 hours of actual testing time remains the same.',
      },
    ],
  },
  {
    slug: 'how-to-pass-foundations-of-reading',
    title: 'How to Pass the Foundations of Reading Test: A Complete Guide',
    metaDescription: 'Learn how to pass the Foundations of Reading Test (FORT 190/890) with proven study strategies, time management tips, and content area breakdowns.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-passing-strategies',
      headline: 'Get the Free FORT Passing Strategies Guide',
      subheadline: 'Study priorities, time management tips, and content breakdowns for all four subareas — printable one-page PDF.',
      pdfLabel: 'FORT Passing Strategies Guide (PDF)',
    },
    sections: [
      {
        heading: 'Understanding the FORT Exam',
        content: 'The Foundations of Reading Test (FORT), also known as test 190 or 890, is a Pearson-administered teacher licensure exam required in 13 states. It assesses your knowledge of evidence-based reading instruction across four subareas. With a pass rate of only 61.5%, preparation is essential. The exam consists of 100 multiple-choice questions and 2 open-response written assignments, and you have 4 hours to complete it.',
      },
      {
        heading: 'Know the Content Breakdown',
        content: 'Your study time should match the exam weights. Subarea I: Foundations of Reading Development accounts for 35% of the exam and covers phonological awareness, phonics, word analysis, and fluency. Subarea II: Development of Reading Comprehension is 27% and covers vocabulary, literary text, and informational text comprehension. Subarea III: Reading Assessment and Instruction is 18% and covers assessment types and instructional practices. Subarea IV: Integration of Knowledge and Understanding is 20% and consists of 2 constructed response items.',
      },
      {
        heading: 'Create a Study Schedule',
        content: 'Plan to study for 2-4 weeks before your exam date. Break your study into focused sessions of 45-60 minutes with breaks. Week 1: Focus on Subarea I (phonemic awareness, phonics, fluency). Week 2: Focus on Subarea II (vocabulary and comprehension). Week 3: Focus on Subarea III (assessment) and practice constructed responses. Week 4: Take a full-length practice test and review weak areas.',
      },
      {
        heading: 'Master the Constructed Response',
        content: 'The 2 open-response items are worth 20% of your score and are where many test-takers lose points. Each response should follow this structure: (1) Identify one strength with specific evidence from the provided materials, (2) Identify one need with specific evidence, (3) Recommend a specific instructional strategy, and (4) Explain why this strategy addresses the need. Use professional terminology and cite evidence from the scenario. Practice writing at least 4-6 responses before test day.',
      },
      {
        heading: 'Test Day Strategies',
        content: 'On exam day, you have approximately 90 seconds per multiple-choice question. Read each question stem carefully and identify what is being asked before looking at the answer choices. Eliminate obviously wrong answers first. Remember that the FORT consistently favors explicit, systematic, evidence-based instructional approaches. If an answer choice includes words like "always," "never," or "only," it is likely wrong. Answer every question — there is no penalty for guessing. Flag uncertain questions and return to them after completing the rest.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-passing-score',
    title: 'Foundations of Reading Passing Score by State (2026)',
    metaDescription: 'Find the Foundations of Reading Test passing score for your state. Complete list of FORT 190/890 passing scores for all 13 states that require the exam.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-passing-scores-by-state',
      headline: 'Get the Free Passing Scores by State Sheet',
      subheadline: 'All 13 states, their passing scores, and test codes on one printable reference sheet.',
      pdfLabel: 'FORT Passing Scores by State (PDF)',
    },
    sections: [
      {
        heading: 'Passing Scores Vary by State',
        content: 'The Foundations of Reading Test uses a score scale of 100-300, but the passing score is set individually by each state. Most states require a score of 240, but some set the bar lower. Regardless of which state you are testing in, the exam content and format are the same — only the passing threshold differs.',
      },
      {
        heading: 'State-by-State Passing Scores',
        content: 'Alabama: 220. Arizona: 240. Arkansas: 233. Connecticut: 240. Iowa: 240. Massachusetts: 240. Mississippi: 233. New Hampshire: 240. North Carolina: 240. Ohio: 220. Rhode Island: 240. Utah: 240. Wisconsin: 240. Note that Ohio administers the exam under a different code (090) through the OAE program, and Alabama recently transitioned to code 890.',
      },
      {
        heading: 'What Does a 240 Mean?',
        content: 'A score of 240 on a 100-300 scale means you need to answer approximately 70-75% of questions correctly, depending on the difficulty of the specific exam form you receive. Pearson uses a scaled scoring system, so raw scores are adjusted for difficulty. The exact number of correct answers needed to pass varies from one exam form to another.',
      },
      {
        heading: 'Can I Transfer My Score to Another State?',
        content: 'In most cases, yes. If you pass the FORT in one state, your score can typically be accepted by another state that requires the same exam. However, you may need to meet that state\'s specific passing score. For example, if you scored 235 in Arkansas (passing score 233), you would pass in Arkansas but would not meet the 240 threshold required in Wisconsin. Check with your target state\'s department of education for their specific score transfer policies.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-practice-test-free',
    title: 'Free Foundations of Reading Practice Test Questions (2026)',
    metaDescription: 'Try free Foundations of Reading practice test questions with detailed answer explanations. Prepare for the FORT 190/890 exam with sample questions from all 4 subareas.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'practice-questions',
      headline: 'Get the Free Practice Test PDF',
      subheadline: '25 practice questions with full answer key and detailed explanations — formatted for printing.',
      pdfLabel: 'FORT Practice Test + Answer Key (PDF)',
    },
    sections: [
      {
        heading: 'Why Practice Questions Matter',
        content: 'Taking practice questions is one of the most effective ways to prepare for the Foundations of Reading Test. Practice questions help you identify your weak areas, become familiar with the question format, and build confidence. The FORT uses scenario-based multiple-choice questions that test your ability to apply reading instruction knowledge to classroom situations.',
      },
      {
        heading: 'Sample Question 1: Phonemic Awareness',
        content: 'A kindergarten teacher plays a game where students clap each time they hear a separate word in a spoken sentence. For example, the teacher says "The cat sat" and students clap three times. Which skill is this activity developing? (A) Phoneme segmentation, (B) Syllable awareness, (C) Word awareness, (D) Onset-rime recognition. Correct Answer: C. This activity develops word awareness — the ability to recognize individual words within spoken language. Clapping for each word helps students understand that sentences are made up of separate words. Phoneme segmentation involves breaking words into individual sounds, syllable awareness involves identifying syllables within words, and onset-rime involves separating the beginning consonant from the rest of a syllable.',
      },
      {
        heading: 'Sample Question 2: Vocabulary Instruction',
        content: 'A third-grade teacher selects the words "analyze," "contrast," and "significant" for explicit vocabulary instruction before a science unit. According to the three-tier vocabulary framework, what makes these words an appropriate choice for direct instruction? (A) They are basic everyday words that students need for daily communication, (B) They are high-utility academic words that students will encounter across multiple subjects, (C) They are technical science terms that are specific to the upcoming unit, (D) They are the most difficult words in the reading passage. Correct Answer: B. These are Tier 2 words — high-utility academic vocabulary that appears across content areas. They are the highest priority for direct instruction because knowing them supports comprehension in science, social studies, math, and language arts.',
      },
      {
        heading: 'Sample Question 3: Reading Assessment',
        content: 'A reading specialist wants to determine whether a second-grade student\'s reading difficulties are primarily related to decoding or comprehension. Which assessment approach would provide the most useful diagnostic information? (A) Administering a standardized group achievement test, (B) Conducting a running record followed by comprehension questions, (C) Having the student complete a written book report, (D) Observing the student during independent reading time. Correct Answer: B. A running record with comprehension questions provides diagnostic information about both decoding (through analysis of reading accuracy, error types, and self-corrections) and comprehension (through retelling or questioning after reading). This combination helps the specialist pinpoint whether difficulties lie in word-level skills, meaning-making, or both.',
      },
      {
        heading: 'Get More Practice Questions',
        content: 'These sample questions give you a taste of the FORT question format. For comprehensive preparation, our full-length practice test includes 100 multiple-choice questions and 2 constructed response prompts with detailed answer explanations, distributed across all four subareas according to the official exam weights.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-test-format',
    title: 'Foundations of Reading Test Format: Everything You Need to Know',
    metaDescription: 'Complete guide to the Foundations of Reading Test format. Learn about the FORT 190/890 exam structure, time limit, question types, and scoring.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-test-format-sheet',
      headline: 'Get the Free Test Format Reference Sheet',
      subheadline: 'Exam structure, subarea weights, timing breakdown, and scoring — one printable page.',
      pdfLabel: 'FORT Test Format Reference Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Exam Structure',
        content: 'The Foundations of Reading Test consists of two parts: 100 multiple-choice questions (80% of your score) and 2 open-response written assignments (20% of your score). You have 4 hours of testing time to complete both sections. The exam is administered by Pearson at testing centers or via online proctoring.',
      },
      {
        heading: 'Multiple-Choice Questions',
        content: 'The 100 multiple-choice questions are distributed across three subareas: Subarea I: Foundations of Reading Development (approximately 35 questions), Subarea II: Development of Reading Comprehension (approximately 27 questions), and Subarea III: Reading Assessment and Instruction (approximately 18 questions). Questions are scenario-based, presenting classroom situations and asking you to select the best instructional approach, assessment method, or interpretation of student data.',
      },
      {
        heading: 'Open-Response Assignments',
        content: 'The 2 open-response items make up Subarea IV: Integration of Knowledge and Understanding. One assignment focuses on foundational reading skills and the other on reading comprehension. Each response should be 150-300 words. You will be presented with a classroom scenario and student artifacts (such as a running record, writing sample, or assessment data) and asked to analyze student performance, identify strengths and needs, and recommend instructional strategies.',
      },
      {
        heading: 'Scoring',
        content: 'Multiple-choice questions are scored by computer. Open-response items are scored by trained evaluators using a 4-point rubric that assesses purpose, subject matter knowledge, support, and rationale. Your total score is reported on a scale of 100-300. The passing score varies by state, with most states requiring 240.',
      },
      {
        heading: 'Time Management',
        content: 'With 4 hours for the entire exam, plan to spend approximately 2 hours and 15 minutes on the multiple-choice section (about 80 seconds per question) and approximately 1 hour and 45 minutes on the two constructed response items (about 50 minutes per response, including planning and reviewing). If you are testing at a center, your total appointment time is 4 hours and 15 minutes. If testing online, it is 4 hours and 30 minutes — the extra time accounts for the tutorial and a scheduled break.',
      },
      {
        heading: 'Registration and Fees',
        content: 'The exam costs $139 to register. You can schedule your test through Pearson at a local testing center or choose online proctoring from home. If you need to retake the exam, you must wait at least 30 days between attempts. Score reports are typically available within 5 weeks of your test date.',
      },
    ],
  },
  {
    slug: 'fort-190-vs-890',
    title: 'FORT 190 vs 890: What Changed and What It Means for You',
    metaDescription: 'Understand the difference between FORT 190 and FORT 890. The test code changed on September 1, 2025 — here is what you need to know.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-190-vs-890-comparison',
      headline: 'Get the Free 190 vs 890 Comparison Sheet',
      subheadline: 'Side-by-side comparison of test codes, registration portals, and what stayed the same — one printable page.',
      pdfLabel: 'FORT 190 vs 890 Comparison Sheet (PDF)',
    },
    sections: [
      {
        heading: 'The Code Changed, Not the Exam',
        content: 'On September 1, 2025, the Foundations of Reading Test transitioned from test code 190 to test code 890. This was purely an administrative change — the exam content, format, scoring, and passing scores remain exactly the same. If you have been studying with materials labeled "FORT 190," those materials are still fully relevant for the 890.',
      },
      {
        heading: 'Why the Change?',
        content: 'Pearson periodically updates test codes as part of their assessment administration. The transition from 190 to 890 aligns with updates to Pearson\'s testing infrastructure. The underlying framework, objectives, and question bank have not changed.',
      },
      {
        heading: 'Score Transferability',
        content: 'If you passed the FORT 190, your score is still valid. States accept passing scores from both the 190 and 890 versions. You do not need to retake the exam under the new code if you already have a passing score from the 190.',
      },
      {
        heading: 'What About the 090?',
        content: 'Some states, particularly Ohio, administer the Foundations of Reading exam under code 090 through their own assessment system (OAE — Ohio Assessments for Educators). The 090 covers the same content as the 190/890 but is administered through Ohio\'s testing platform. The relationship between these codes can be confusing, but the core content and preparation are the same.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-constructed-response-tips',
    title: 'Foundations of Reading Constructed Response: How to Score a 4',
    metaDescription: 'Learn how to write a high-scoring constructed response on the Foundations of Reading Test. Tips, structure, and sample responses for FORT 190/890 open-response items.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-cr-template',
      headline: 'Get the Free Constructed Response Template',
      subheadline: 'The 4-step response structure, scoring rubric, and sample response — printable PDF you can use on test day prep.',
      pdfLabel: 'FORT Constructed Response Template (PDF)',
    },
    sections: [
      {
        heading: 'Why the Constructed Response Matters',
        content: 'The two open-response items on the FORT are worth 20% of your total score — 10% each. Many test-takers focus exclusively on the multiple-choice section and neglect the constructed response, which can be the difference between passing and failing. A score of 4 on both CRs can boost your overall score significantly.',
      },
      {
        heading: 'The 4-Point Scoring Rubric',
        content: 'Each response is scored on a 4-point scale across four dimensions: Purpose (does the response fully achieve the assignment\'s purpose?), Subject Matter Knowledge (is the content accurate and appropriate?), Support (does the response cite specific evidence from the provided materials?), and Rationale (is the reasoning sound and well-explained?). A score of 4 means "thorough" across all dimensions. A score of 3 means "adequate." Below 3 means you are leaving significant points on the table.',
      },
      {
        heading: 'The Winning Structure',
        content: 'Follow this four-part structure for every constructed response: First, identify one significant strength in the student\'s reading performance and cite specific evidence from the provided materials. Second, identify one significant need and cite specific evidence. Third, recommend a specific, named instructional strategy that addresses the identified need. Fourth, explain why this strategy would be effective for this particular student. This structure directly maps to the four scoring dimensions.',
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: 'The most common reason for low scores is being too vague. Do not write generic statements like "the teacher should provide more support" or "the student needs extra practice." Instead, name specific strategies: "The teacher should implement repeated reading with a fluency passage at the student\'s instructional level, having the student reread the same passage 3-4 times while tracking words correct per minute." Another common mistake is failing to cite evidence. Always reference specific details from the scenario: error patterns, accuracy rates, specific words misread, or specific comprehension breakdowns.',
      },
      {
        heading: 'Use Professional Terminology',
        content: 'The scoring rubric evaluates "subject matter knowledge." Using professional reading terminology demonstrates your knowledge: say "phonemic awareness" not "sound awareness," "miscue analysis" not "error checking," "prosody" not "reading with feeling," "morphemic analysis" not "breaking words apart." The more precise your language, the stronger your demonstration of knowledge.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-registration',
    title: 'How to Register for the Foundations of Reading Test (Step by Step)',
    metaDescription: 'Step-by-step guide to registering for the Foundations of Reading Test (FORT 190/890). How to create an account, schedule your exam, and choose testing options.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-registration-checklist',
      headline: 'Get the Free Registration Checklist',
      subheadline: 'Step-by-step checklist with state portal links, ID requirements, and testing options — printable PDF.',
      pdfLabel: 'FORT Registration Checklist (PDF)',
    },
    sections: [
      {
        heading: 'Step 1: Find Your State\'s Testing Portal',
        content: 'The FORT is administered through Pearson, but each state has its own registration portal. Visit your state\'s NES or MTEL testing website to begin. For example, Wisconsin uses wi.nesinc.com, Connecticut uses ct.nesinc.com, and Massachusetts uses mtel.nesinc.com. If your state is not listed on a state-specific portal, use the general NES site at nestest.com.',
      },
      {
        heading: 'Step 2: Create Your Account',
        content: 'Create a Pearson testing account with your full legal name (as it appears on your government-issued ID), email address, and contact information. Your name must match your ID exactly — any discrepancy could prevent you from testing on exam day.',
      },
      {
        heading: 'Step 3: Select Your Test',
        content: 'Select test code 890 (Foundations of Reading). Some states may still show code 190 or 090 — select whichever code your state requires. The content is the same regardless of the code.',
      },
      {
        heading: 'Step 4: Choose Your Testing Method',
        content: 'You have two options: (1) Test at a Pearson VUE testing center near you, or (2) Test online with live remote proctoring from home. Testing center appointments are 4 hours and 15 minutes. Online appointments are 4 hours and 30 minutes. Both include a 15-minute tutorial before the exam begins. Online testing requires a private room, webcam, microphone, and stable internet connection.',
      },
      {
        heading: 'Step 5: Pay and Schedule',
        content: 'The registration fee is $139, payable by credit or debit card. Select your preferred date and time. Testing center availability varies by location, so register early to get your preferred date. If you need to reschedule, you must do so at least 24 hours before your appointment to avoid losing your fee.',
      },
      {
        heading: 'After the Exam',
        content: 'Score reports are typically available within 5 weeks of your test date. You can view your scores on your Pearson account. If you do not pass, you must wait at least 30 days before retaking the exam. There is no limit on the number of attempts, but you must pay the $139 fee each time.',
      },
    ],
  },
  {
    slug: 'science-of-reading-for-fort',
    title: 'The Science of Reading and the FORT: What You Need to Know',
    metaDescription: 'Understand how the science of reading connects to the Foundations of Reading Test. Key research, instructional frameworks, and what the FORT expects you to know.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-science-of-reading-sheet',
      headline: 'Get the Free Science of Reading Reference Sheet',
      subheadline: 'Key frameworks, research models, and how they map to FORT subareas — one printable page.',
      pdfLabel: 'Science of Reading for FORT Reference Sheet (PDF)',
    },
    sections: [
      {
        heading: 'What Is the Science of Reading?',
        content: 'The science of reading is a body of research spanning decades that identifies the most effective approaches to reading instruction. It draws from cognitive science, linguistics, psychology, and education research. The FORT is explicitly aligned with the science of reading, which means the "correct" answers on the exam consistently reflect evidence-based instructional practices — specifically, systematic and explicit instruction in phonemic awareness, phonics, fluency, vocabulary, and comprehension.',
      },
      {
        heading: 'The Simple View of Reading',
        content: 'One of the foundational frameworks in the science of reading is the Simple View of Reading: Reading Comprehension = Decoding x Language Comprehension. This means that skilled reading requires BOTH the ability to decode words accurately AND the ability to understand language. If either component is weak, comprehension suffers. The FORT tests your understanding of both sides of this equation — Subarea I focuses on decoding skills, and Subarea II focuses on language comprehension.',
      },
      {
        heading: 'Scarborough\'s Reading Rope',
        content: 'Scarborough\'s Reading Rope is a visual model showing how multiple strands of reading skill weave together to create skilled reading. The upper strands (language comprehension) include background knowledge, vocabulary, language structures, verbal reasoning, and literacy knowledge. The lower strands (word recognition) include phonological awareness, decoding, and sight recognition. Over time, these strands become increasingly automatic and strategic, weaving together into fluent, skilled reading.',
      },
      {
        heading: 'What This Means for the FORT',
        content: 'The FORT will always favor answers that align with the science of reading. This means: explicit instruction over implicit instruction, systematic sequencing over random skill introduction, evidence-based strategies over popular but unproven methods, and assessment-driven instruction over one-size-fits-all approaches. When you see a question asking for the "most effective" or "best" approach, look for the answer that is most explicit, systematic, and grounded in research.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-study-guide',
    title: 'Foundations of Reading Study Guide: What to Study and How',
    metaDescription: 'A complete study guide overview for the Foundations of Reading Test (FORT 190/890). Learn what topics to study, how to organize your prep, and where to find resources.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-study-guide-starter',
      headline: 'Get the Free FORT Study Guide Starter',
      subheadline: 'Covers Subarea I in full — phonological awareness, phonics, fluency, word analysis. The most tested 35% of the exam.',
      pdfLabel: 'FORT Study Guide Starter (PDF)',
    },
    sections: [
      {
        heading: 'What to Study',
        content: 'The FORT covers 11 objectives across 4 subareas. Your study plan should cover all of them, but prioritize by exam weight: Subarea I (35%), Subarea II (27%), Subarea IV (20%), and Subarea III (18%). Within each subarea, focus on understanding the key concepts, knowing the professional terminology, and being able to apply evidence-based instructional strategies to classroom scenarios.',
      },
      {
        heading: 'Subarea I: Foundations of Reading Development (35%)',
        content: 'This is the largest subarea. Study phonological and phonemic awareness (the developmental progression, key tasks like blending and segmentation), phonics (systematic and explicit instruction, CVC patterns, digraphs, blends), word analysis (syllable types, morphemic analysis, prefixes and suffixes), and fluency (the three components, repeated reading, prosody). Know the difference between phonological awareness (broad) and phonemic awareness (narrow).',
      },
      {
        heading: 'Subarea II: Development of Reading Comprehension (27%)',
        content: 'Study vocabulary development (the three tiers, word-learning strategies, academic language), literary text comprehension (narrative elements, literary devices, inferencing), and informational text comprehension (text structures, text features, summarization). Beck\'s Three Tiers of Vocabulary is one of the most frequently tested frameworks.',
      },
      {
        heading: 'Subarea III: Reading Assessment and Instruction (18%)',
        content: 'Study assessment types (screening, diagnostic, progress monitoring, formative, summative), running records and miscue analysis, the three cueing systems (meaning, structure, visual), and the MTSS/RTI framework. Also study instructional approaches: gradual release, differentiated instruction, guided reading, and structured literacy.',
      },
      {
        heading: 'Subarea IV: Constructed Response (20%)',
        content: 'Practice writing responses using the four-part structure: identify a strength, identify a need, recommend a strategy, explain the rationale. Write at least 4-6 practice responses under timed conditions. Focus on citing specific evidence and using professional terminology.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-test-prep',
    title: 'Foundations of Reading Test Prep: Your Complete Preparation Plan',
    metaDescription: 'Complete preparation plan for the Foundations of Reading Test (FORT 190/890). Study materials, practice tests, and strategies to pass on your first attempt.',
    publishedAt: '2026-02-11',
    optin: {
      pdfSlug: 'fort-4-week-study-plan',
      headline: 'Get the Free 4-Week Study Plan',
      subheadline: 'Week-by-week prep schedule with subarea priorities, practice test timing, and CR practice slots — printable PDF.',
      pdfLabel: 'FORT 4-Week Study Plan (PDF)',
    },
    sections: [
      {
        heading: 'Start With the Exam Framework',
        content: 'Before diving into study materials, understand what you are being tested on. The FORT has 4 subareas and 11 objectives. Download or review the official test framework from Pearson to understand exactly what each objective covers. This gives you a roadmap for your preparation.',
      },
      {
        heading: 'Build a 4-Week Study Plan',
        content: 'A 4-week study plan is ideal for most test-takers. Week 1: Subarea I — phonemic awareness, phonics, word analysis, fluency. Week 2: Subarea II — vocabulary, literary comprehension, informational comprehension. Week 3: Subarea III — assessment types, running records, instructional strategies. Also begin practicing constructed responses. Week 4: Full-length practice test, review weak areas, and write 2-3 more practice CRs.',
      },
      {
        heading: 'Use Multiple Study Methods',
        content: 'Effective test prep combines multiple study methods: reading a study guide for content knowledge, taking practice questions for application, writing constructed responses for the open-response section, and reviewing answer explanations to understand why wrong answers are wrong. Do not just passively read — actively engage with the material by taking notes, creating flashcards for key terms, and explaining concepts out loud.',
      },
      {
        heading: 'Take a Full-Length Practice Test',
        content: 'At least one week before your exam, take a complete practice test under timed conditions. This serves three purposes: it reveals your weak areas so you can focus your remaining study time, it builds your stamina for a 4-hour exam, and it reduces test-day anxiety because you know what to expect. Score your practice test and note which subareas need the most review.',
      },
      {
        heading: 'Day Before and Day Of',
        content: 'The day before your exam, do a light review of your notes — do not try to learn new material. Get a full night of sleep. On exam day, eat a balanced meal, arrive early (or set up your home testing space early for online proctoring), and bring your valid government-issued ID. During the exam, pace yourself (about 80 seconds per MCQ), answer every question, and save at least 45 minutes for each constructed response.',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-890-practice-test',
    title: 'Foundations of Reading 890 Practice Test (25 Free Questions With Answers)',
    metaDescription: 'Free Foundations of Reading 890 practice test with answers. 25 real-format questions covering all subareas. Download the PDF version free.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-890-practice-25',
      headline: 'Get the Free 25-Question Practice Test PDF',
      subheadline: 'All 25 questions from this page with answers and explanations — formatted for offline study.',
      pdfLabel: 'Foundations of Reading 890 Practice Test (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading 890 Practice Test With Answers',
        html: true,
        content: '<p>This <strong>Foundations of Reading 890 practice test with answers</strong> contains 25 multiple-choice questions pulled directly from our question bank. Every question mirrors the format you\'ll see on the real exam — scenario-based stems with four answer choices covering phonological awareness, phonics, vocabulary, comprehension, fluency, and assessment.</p><p>The Foundations of Reading (890) is a 4-hour computer-based exam with 100 multiple-choice questions and 2 open-response written assignments. It is administered by Pearson through the NES program and is identical in content to the NES 190.</p><p>Work through all 25 questions below, then check your answers in the answer key at the bottom. If you\'re looking for a <strong>Foundations of Reading 890 practice test PDF free</strong> download, grab the PDF version using the form on this page — same 25 questions, formatted for printing.</p>',
      },
      {
        heading: 'Test Format at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Code</td><td>890 — Foundations of Reading</td></tr><tr><td>Format</td><td>100 MC questions + 2 open-response written assignments</td></tr><tr><td>Tutorial</td><td>15 minutes (tutorial + nondisclosure agreement)</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-minute break)</td></tr><tr><td>Online Proctoring</td><td>Available</td></tr></tbody></table><p>This practice test covers the multiple-choice portion. The questions below span all three MC subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), and Reading Assessment and Instruction (18%).</p>',
      },
      {
        heading: 'Questions 1–10: Foundations of Reading Development',
        html: true,
        content: '<p><strong>Question 1.</strong> A kindergarten teacher claps out the word "sunlight" with students and asks them to tell her how many parts they hear. This activity is designed to develop which phonological awareness skill?</p><p>A) Segmenting spoken words into syllables and counting each part<br>B) Isolating the first phoneme and identifying the beginning sound<br>C) Blending individual phonemes together and forming a complete word<br>D) Deleting the final syllable and pronouncing the remaining word part</p><p><strong>Question 2.</strong> A first-grade teacher shows students a sentence strip that reads "The cat sat." She slides a chip forward for each word as she reads aloud and asks students to do the same. Which concept of print is the teacher most directly reinforcing?</p><p>A) Understanding that punctuation marks signal pauses and sentence endings<br>B) Recognizing that spaces between letters mark individual word boundaries<br>C) Distinguishing between uppercase letters and lowercase letter forms<br>D) Applying left-to-right directionality and return sweep across lines</p><p><strong>Question 3.</strong> A kindergarten screener reveals that a student can identify rhyming words and segment two-syllable compound words into parts, but cannot perform tasks that require removing a sound from a spoken word. Which instructional activity would most directly address this student\'s identified gap?</p><p>A) Listening to isolated phonemes spoken by the teacher and combining them to say a whole word<br>B) Breaking a spoken word into every individual sound by tapping once for each phoneme<br>C) Saying a word aloud and then repeating it with a specific target sound left out<br>D) Listening to two spoken words and deciding whether both words end with the same sound</p><p><strong>Question 4.</strong> During shared reading, a kindergarten teacher holds up a big book, shows students the front cover, and opens it to the first page. She then asks, "Which way do my eyes move when I read this page?" This question is intended to reinforce which concept of print?</p><p>A) Understanding that the title and author name appear on the front cover<br>B) Recognizing that illustrations provide clues about meaning<br>C) Knowing that punctuation marks like periods signal the end of sentences<br>D) Understanding that print is read from left to right across each line</p><p><strong>Question 5.</strong> A kindergarten teacher says three words aloud — "fun," "run," and "sun" — and asks students to tell her what sounds the same across all three words. A student answers, "They all have the \'un\' part at the end." At which phonological awareness level is this student working, and what is the most appropriate next instructional step?</p><p>A) The student is working at the onset-rime level and is ready to move toward identifying individual beginning sounds in words<br>B) The student is working at the syllable level and needs to practice clapping and counting syllables in multisyllabic words<br>C) The student is working at the phoneme level and is ready for phoneme blending tasks using three-phoneme words<br>D) The student is working at the word level and needs to practice counting words in spoken sentences using counters</p><p><strong>Question 6.</strong> A first-grade teacher conducts a language experience activity in which students dictate sentences about a class field trip and the teacher writes their words on chart paper. The teacher then reads the text aloud, pointing to each word. Which primary literacy benefit does this approach provide?</p><p>A) Building phonemic awareness by isolating and manipulating individual phoneme sounds<br>B) Connecting spoken language and written text through student-generated and meaningful content<br>C) Developing phonics knowledge by explicitly teaching letter-sound correspondences and rules<br>D) Increasing reading rate and automaticity by practicing familiar high-frequency word lists</p><p><strong>Question 7.</strong> A kindergarten teacher notices that Marcus, an English language learner whose home language is Spanish, consistently omits the /v/ sound and substitutes /b/ in words like "very" and "vine." Which factor most likely explains this pattern?</p><p>A) Marcus has a hearing loss needing immediate referral and audiological screening<br>B) Marcus needs more phonics instruction targeting consonant blends and digraphs<br>C) Marcus is transferring the Spanish /v/–/b/ phoneme pattern to English<br>D) Marcus is making random articulation errors expected to resolve without intervention</p><p><strong>Question 8.</strong> A kindergarten teacher administers a phonemic awareness screener. She says a word aloud and asks the student to tell her only the very first sound. A student correctly identifies the first sound in three consecutive words. Which instructional step should the teacher target next?</p><p>A) Presenting three spoken phonemes and asking the student to blend them into a complete spoken word<br>B) Having the student clap for each syllable in a series of two- and three-syllable words<br>C) Asking the student to listen to rhyming pairs and sort pictures by their matching rime sound<br>D) Practicing identifying whether two spoken words begin with the same initial sound</p><p><strong>Question 9.</strong> A first-grade teacher reads aloud daily from a variety of fiction and nonfiction books and pauses frequently to discuss new words and ideas with students. Which aspect of early literacy development is most directly supported by this practice?</p><p>A) Building receptive vocabulary and background knowledge through rich oral language exposure<br>B) Practicing phoneme segmentation and blending through repeated read-aloud listening activities<br>C) Reinforcing letter-sound correspondences and decoding rules through text exposure and discussion<br>D) Developing concepts of print by tracking word boundaries and directional print movement</p><p><strong>Question 10.</strong> A first-grade student can correctly identify rhyming words and segment words into syllables but struggles to respond when the teacher presents isolated phonemes and asks the student to combine them into a word. Which instructional activity would most directly address this need?</p><p>A) Removing a targeted sound from a spoken word and saying what word remains after the deletion<br>B) Pushing a token into a box for each individual sound heard in a short spoken word<br>C) Listening to spoken phonemes presented one at a time and saying the whole word they form<br>D) Sorting picture cards into groups based on the rhyming pattern of each word</p>',
      },
      {
        heading: 'Questions 11–18: Phonics, Word Analysis, and Vocabulary',
        html: true,
        content: '<p><strong>Question 11.</strong> A kindergarten teacher is planning a sequence of phonological awareness activities. Which ordering reflects the developmental progression from least to most complex?</p><p>A) Phoneme isolation, then onset-rime blending, then syllable counting, then word counting<br>B) Phoneme deletion, then phoneme segmentation, then onset-rime, then syllable clapping<br>C) Word counting in sentences, then syllable clapping, then onset-rime, then phoneme segmentation<br>D) Syllable blending, then word counting, then phoneme isolation, then onset-rime splitting</p><p><strong>Question 12.</strong> A first-grade student reads "ship" correctly but misreads "shop" as "stop" every time. Which instructional focus would most directly address this error pattern?</p><p>A) Short vowel discrimination in CVC words<br>B) Consonant blend sequences at syllable onset<br>C) Consonant digraph "sh" as a single phoneme distinct from the blend "st"<br>D) The vowel-consonant-e pattern and silent-e effect on vowel sound</p><p><strong>Question 13.</strong> A second-grade teacher wants students to understand why the word "make" has a long /ā/ sound. Which phonics concept should the teacher explicitly teach?</p><p>A) The vowel team pattern<br>B) The vowel-consonant-e pattern<br>C) The r-controlled vowel pattern<br>D) The open syllable pattern</p><p><strong>Question 14.</strong> A first-grade teacher introduces a new word sort in which students group words such as "bird," "burn," "farm," and "corn" into categories. Which phonics pattern is the primary focus?</p><p>A) Vowel diphthongs<br>B) R-controlled vowels<br>C) Vowel teams<br>D) The silent-e pattern</p><p><strong>Question 15.</strong> A second-grade teacher asks students to divide the word "rabbit" into syllables. A student correctly identifies the split as "rab-bit." Which syllabication rule did the student apply?</p><p>A) The V/CV rule<br>B) The consonant-le rule<br>C) The open syllable rule<br>D) The VC/CV rule</p><p><strong>Question 16.</strong> A third-grade teacher is selecting words to pre-teach before students read a science article about ecosystems. She chooses "significant," "interact," and "support" rather than "photosynthesis" and "organism." Which vocabulary framework best explains this selection?</p><p>A) Choosing cognates and high-frequency words for ELL students across content areas<br>B) Choosing words learnable through context clues without direct pre-teaching<br>C) Prioritizing Tier 2 academic words appearing across disciplines<br>D) Selecting Tier 3 domain words central to this specific content topic</p><p><strong>Question 17.</strong> A third-grade teacher reads aloud: "The scientist made a momentous discovery, one that would change the field of medicine forever." She asks students to use context to figure out what "momentous" means. Which type of context clue is available?</p><p>A) A contrast clue<br>B) An appositive clue<br>C) An example clue<br>D) A general inference clue</p><p><strong>Question 18.</strong> A third-grade teacher teaches students the Latin root "port," meaning "to carry," using words such as "transport," "import," "export," and "portable." Which vocabulary development strategy is this?</p><p>A) Morphemic analysis<br>B) Semantic mapping<br>C) Context clue analysis<br>D) Vocabulary self-collection</p>',
      },
      {
        heading: 'Questions 19–25: Comprehension, Fluency, and ELL',
        html: true,
        content: '<p><strong>Question 19.</strong> A second-grade teacher notices that her ELL students whose home language is Spanish quickly recognize the words "animal," "hospital," and "color" in an English text. Which vocabulary concept explains why these students find these words familiar?</p><p>A) These words are Tier 1 everyday words learned through oral experience and conversation<br>B) These words are Spanish-English cognates with similar spelling, pronunciation, and meaning<br>C) These words follow predictable phonics patterns transferring across both language systems<br>D) These words are Tier 3 domain-specific terms from academic science and social studies</p><p><strong>Question 20.</strong> A third-grade student reads "The lead pipe was heavy" but then reads "She will lead the group" and is confused. Which vocabulary concept should the teacher address?</p><p>A) Idioms<br>B) Cognates<br>C) Tier 3 vocabulary<br>D) Homographs</p><p><strong>Question 21.</strong> A second-grade teacher asks students to read a short informational passage about beavers. After reading, she asks, "What is this passage mostly about?" A student responds, "Beavers." The teacher wants to help the student move beyond naming the topic to identifying the main idea. Which best describes the distinction?</p><p>A) The topic names the subject, while the main idea states what the author most wants readers to understand about that subject<br>B) The topic summarizes all details, while the main idea names the most interesting fact<br>C) The topic is one word, while the main idea is a complete sentence found in the first paragraph<br>D) The topic changes with each paragraph, while the main idea stays the same and is restated in every section</p><p><strong>Question 22.</strong> Students read a passage that includes "as a result" and "consequently" several times. Which text structure do these signal words most strongly indicate?</p><p>A) Compare-and-contrast<br>B) Cause-and-effect<br>C) Problem-and-solution<br>D) Sequence</p><p><strong>Question 23.</strong> A second-grade teacher listens to a student read aloud and records 92 words correct per minute with several self-corrections and good expression. Another student reads 115 WPM but in a flat, word-by-word monotone. Which statement best describes the relative fluency?</p><p>A) The second student — rate and WCPM are the primary fluency indicators<br>B) The first student — prosody and expression are essential fluency components alongside rate<br>C) Both students equally — accuracy and rate together fully define fluency<br>D) Neither student — fluent readers do not self-correct and maintain a consistent pace</p><p><strong>Question 24.</strong> A second-grade teacher has students perform a scripted play in small groups, practicing their lines multiple times before performing for the class. Which fluency instructional strategy does this represent?</p><p>A) Echo reading<br>B) Choral reading<br>C) Reader\'s theater<br>D) Partner reading</p><p><strong>Question 25.</strong> A first-grade teacher reads a passage aloud with expression, pausing at commas and dropping her voice at periods, then asks students to read the same passage aloud the same way. Which fluency component is the teacher most directly modeling?</p><p>A) Prosody<br>B) Accuracy<br>C) Rate<br>D) Automaticity</p>',
      },
      {
        heading: 'Answer Key',
        html: true,
        content: '<p>Check your answers below. Each answer includes a brief explanation so you can learn from any mistakes.</p><table><thead><tr><th>#</th><th>Answer</th><th>Why</th></tr></thead><tbody><tr><td>1</td><td><strong>A</strong></td><td>Clapping out word parts = syllable segmentation, a phonological awareness skill.</td></tr><tr><td>2</td><td><strong>B</strong></td><td>Sliding chips for each word reinforces that spaces mark word boundaries.</td></tr><tr><td>3</td><td><strong>C</strong></td><td>The student can\'t remove sounds — phoneme deletion practice (say word without the target sound) directly addresses this.</td></tr><tr><td>4</td><td><strong>D</strong></td><td>"Which way do my eyes move?" targets left-to-right directionality.</td></tr><tr><td>5</td><td><strong>A</strong></td><td>Recognizing the shared rime "-un" = onset-rime level. Next step: isolating individual phonemes.</td></tr><tr><td>6</td><td><strong>B</strong></td><td>Language experience approach connects students\' oral language to written text using their own words.</td></tr><tr><td>7</td><td><strong>C</strong></td><td>Spanish lacks a distinct /v/ phoneme — this is L1 transfer, not a disorder.</td></tr><tr><td>8</td><td><strong>A</strong></td><td>After isolation, the next step on the continuum is phoneme blending.</td></tr><tr><td>9</td><td><strong>A</strong></td><td>Interactive read-alouds build vocabulary and background knowledge through oral language.</td></tr><tr><td>10</td><td><strong>C</strong></td><td>The student can\'t blend phonemes — the direct fix is phoneme blending practice.</td></tr><tr><td>11</td><td><strong>C</strong></td><td>Continuum: word → syllable → onset-rime → phoneme (least → most complex).</td></tr><tr><td>12</td><td><strong>C</strong></td><td>Confusing "sh" with "st" = needs to learn digraph "sh" as a single sound unit.</td></tr><tr><td>13</td><td><strong>B</strong></td><td>"Make" follows the CVCe (silent-e) pattern — the e makes the vowel long.</td></tr><tr><td>14</td><td><strong>B</strong></td><td>"bird," "burn," "farm," "corn" all contain r-controlled vowels.</td></tr><tr><td>15</td><td><strong>D</strong></td><td>"Rabbit" has two consonants between vowels → split between them (VC/CV rule).</td></tr><tr><td>16</td><td><strong>C</strong></td><td>"Significant," "interact," "support" are Tier 2 words — high-utility academic vocabulary.</td></tr><tr><td>17</td><td><strong>D</strong></td><td>No direct definition, synonym, or contrast — the reader must infer from "change the field of medicine forever."</td></tr><tr><td>18</td><td><strong>A</strong></td><td>Teaching a root and its derived forms = morphemic analysis.</td></tr><tr><td>19</td><td><strong>B</strong></td><td>"Animal," "hospital," "color" are Spanish-English cognates.</td></tr><tr><td>20</td><td><strong>D</strong></td><td>"Lead" spelled the same but pronounced differently with different meanings = homograph.</td></tr><tr><td>21</td><td><strong>A</strong></td><td>Topic = subject; main idea = what the author wants you to understand about that subject.</td></tr><tr><td>22</td><td><strong>B</strong></td><td>"As a result" and "consequently" are cause-and-effect signal words.</td></tr><tr><td>23</td><td><strong>B</strong></td><td>Fluency = accuracy + rate + prosody. The first student has better prosody despite lower WPM.</td></tr><tr><td>24</td><td><strong>C</strong></td><td>Performing a scripted play with repeated practice = reader\'s theater.</td></tr><tr><td>25</td><td><strong>A</strong></td><td>Modeling expression, pausing, and intonation = prosody.</td></tr></tbody></table>',
      },
      {
        heading: 'How to Use This Practice Test',
        html: true,
        content: '<p>If you scored <strong>20 or more correct</strong>, you have a strong foundation across the core subareas. Focus your remaining study time on the written response section and any individual topics you missed.</p><p>If you scored <strong>15–19</strong>, you\'re close. Review the explanations for every question you missed, identify the subarea pattern (are your misses clustered in phonics? vocabulary? comprehension?), and spend focused time on that area.</p><p>If you scored <strong>below 15</strong>, start with a structured <strong>Foundations of Reading 890 study guide PDF</strong> that covers each subarea in order. Our <a href="/#pricing">full prep program</a> includes a complete study guide, additional practice tests with 100 questions each, and AI-graded written response practice.</p><p>For more free practice questions covering the NES 190/890, see our <a href="/blog/190-foundations-of-reading-practice-test">full-length practice test page</a>.</p>',
      },
      {
        heading: 'Subareas Covered on This Practice Test',
        html: true,
        content: '<p>The 25 questions above map to the three multiple-choice subareas of the Foundations of Reading 890. Here\'s how they break down:</p><table><thead><tr><th>Subarea</th><th>Weight on Exam</th><th>Questions on This Test</th><th>Topics Covered</th></tr></thead><tbody><tr><td>I — Foundations of Reading Development</td><td>35%</td><td>1–11</td><td>Phonological awareness, concepts of print, phonics, syllabication, ELL phoneme transfer</td></tr><tr><td>II — Development of Reading Comprehension</td><td>27%</td><td>12–22</td><td>Phonics patterns, vocabulary tiers, cognates, homographs, main idea, text structures</td></tr><tr><td>III — Reading Assessment and Instruction</td><td>18%</td><td>23–25</td><td>Fluency components, prosody, reader\'s theater, instructional strategies</td></tr></tbody></table><p>The real exam also includes <strong>Subarea IV</strong> (Foundational Reading Skills — 1 written assignment) and <strong>Subarea V</strong> (Reading Comprehension — 1 written assignment), each worth 10% of your score. These are not covered in this multiple-choice practice test.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>Is there a free Foundations of Reading 890 practice test PDF?</h3><p>Yes. You can download our <strong>Foundations of Reading 890 practice test PDF free</strong> using the form on this page. It contains the same 25 questions with answers and explanations, formatted for printing or offline study.</p><h3>How many questions are on the Foundations of Reading 890?</h3><p>The exam has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. Online proctored appointments include an additional 15-minute break.</p><h3>Is the 890 the same as the 190?</h3><p>Yes. The test content is identical — same questions, same format, same timing, same scoring. The only difference is the test code and the registration portal. If you studied for the 190, you are prepared for the 890.</p><h3>Where can I find a Foundations of Reading 890 study guide PDF?</h3><p>Our <a href="/#pricing">full prep program</a> includes a complete <strong>Foundations of Reading 890 study guide PDF</strong> covering all five subareas, plus practice tests and AI-graded written response practice. For a free starting point, download the practice test PDF from this page and review the answer explanations.</p><h3>What score do I need to pass the Foundations of Reading 890?</h3><p>It depends on your state. Most states require a 240 on the 100–300 scale. Ohio requires 220. Alabama and Arkansas require 233. Confirm your state\'s requirement before registering.</p><h3>Can I take the Foundations of Reading 890 online?</h3><p>Yes. Online proctoring is available. The online appointment is 4 hours and 30 minutes total, which includes a 15-minute tutorial/NDA and a 15-minute break.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-890-study-guide',
    title: 'Foundations of Reading 890 Study Guide',
    metaDescription: 'Free Foundations of Reading 890 study guide covering all 5 subareas, 11 objectives, test format, and proven strategies. PDF download included.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-890-study-guide',
      headline: 'Get the Free 890 Study Guide',
      subheadline: 'Condensed study guide covering all five subareas, key concepts, and open-response strategies — printable PDF.',
      pdfLabel: 'Foundations of Reading 890 Study Guide (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading 890 Study Guide — What You Need to Know',
        html: true,
        content: '<p>This <strong>Foundations of Reading 890 study guide</strong> breaks down the entire exam — all five subareas, all eleven objectives, the two open-response assignments, and the strategies that actually matter for passing. Whether you\'re weeks out or days away, this is your roadmap.</p><p>The 890 is a computer-based test with 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. The content is identical to the NES 190 — same questions, same scoring — so any preparation for the 190 applies here.</p><p>If you want a printable version of this guide, grab our <strong>Foundations of Reading 890 study guide PDF free download</strong> using the form on this page.</p>',
      },
      {
        heading: 'Test Format at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Code</td><td>890 — Foundations of Reading</td></tr><tr><td>Format</td><td>Computer-based test (CBT) and online-proctored test</td></tr><tr><td>Questions</td><td>100 multiple-choice + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment</td><td>4 hours and 15 minutes (includes 15-min tutorial and NDA)</td></tr><tr><td>Score Scale</td><td>100–300</td></tr></tbody></table><p>The 15-minute tutorial and nondisclosure agreement happen before your testing time starts, so your total appointment is 4 hours and 15 minutes.</p>',
      },
      {
        heading: 'The Five Subareas and Their Weights',
        html: true,
        content: '<p>Your <strong>Foundations of Reading 890 study guide PDF</strong> should cover all five subareas. Here\'s how they break down:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>Multiple-choice</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>Multiple-choice</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>Multiple-choice</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10%</td><td>10</td><td>1 open-response</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>10%</td><td>11</td><td>1 open-response</td></tr></tbody></table><p>Subareas I–III account for 80% of your score and are all multiple-choice. Subareas IV and V are the two written assignments, worth 10% each.</p>',
      },
      {
        heading: 'Subarea I — Foundations of Reading Development (35%)',
        html: true,
        content: '<p>This is the largest section on the exam. It spans four objectives and makes up more than a third of your total score. Master this subarea and you\'ve locked in the biggest piece of the test.</p><h3>Objective 1: Phonological and Phonemic Awareness</h3><p>Know the difference between phonological awareness (broad — syllables, onset-rime, rhyme) and phonemic awareness (specific — individual phonemes). You\'ll see questions on blending, segmenting, deleting, and substituting phonemes. Understand concepts of print and the alphabetic principle.</p><h3>Objective 2: Phonics and Spelling</h3><p>Systematic, explicit phonics instruction is the framework here. Know CVC, CVCe, and vowel team patterns. Understand the difference between digraphs (one sound: sh, ch) and blends (each letter sounds: bl, str). Encoding and decoding are two sides of the same coin — spelling reinforces phonics.</p><h3>Objective 3: Word Analysis and Morphemic Analysis</h3><p>Morphemes are the smallest units of meaning. Know the difference between inflectional suffixes (-s, -ed, -ing — don\'t change part of speech) and derivational suffixes (-tion, -able — do change part of speech). Memorize the six syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le.</p><h3>Objective 4: Reading Fluency</h3><p>Fluency has three components: accuracy, rate, and prosody. Prosody — phrasing, stress, and intonation — is the bridge between fluency and comprehension. Know strategies like repeated reading, modeled reading, echo reading, and wide reading.</p>',
      },
      {
        heading: 'Subarea II — Development of Reading Comprehension (27%)',
        html: true,
        content: '<p>The second-largest section covers vocabulary development and comprehension strategies across three objectives.</p><h3>Objective 5: Vocabulary Development</h3><p>Understand the three tiers of vocabulary (Tier 1: everyday words, Tier 2: academic words, Tier 3: domain-specific). Know context clues, morphemic analysis for unknown words, and how to teach word-learning strategies — not just individual words.</p><h3>Objective 6: Comprehension of Literary and Informational Texts</h3><p>Expect questions on text structures (cause-effect, compare-contrast, sequence, problem-solution), story elements, main idea vs. theme, and how to support students in making inferences. Know the difference between literal, inferential, and evaluative comprehension.</p><h3>Objective 7: Comprehension Strategies</h3><p>This objective focuses on teaching students <em>how</em> to comprehend — predicting, questioning, summarizing, monitoring, visualizing. Understand reciprocal teaching, think-alouds, and graphic organizers as instructional tools.</p>',
      },
      {
        heading: 'Subarea III — Reading Assessment and Instruction (18%)',
        html: true,
        content: '<h3>Objective 8: Assessment of Reading</h3><p>Know the types: screening, diagnostic, progress monitoring, outcome/summative. Understand running records, miscue analysis, informal reading inventories, and how to use data to group students and differentiate instruction.</p><h3>Objective 9: Integration of Reading Instruction</h3><p>This objective ties everything together — how to plan instruction that addresses phonics, fluency, vocabulary, and comprehension in an integrated literacy block. Expect questions on differentiation, ELL accommodations, and aligning instruction to assessment data.</p>',
      },
      {
        heading: 'Subareas IV and V — The Open-Response Assignments (20% Total)',
        html: true,
        content: '<p>Each open-response assignment is worth 10% of your score. These are not optional — skipping them makes passing nearly impossible.</p><h3>Subarea IV: Foundational Reading Skills (Objective 10)</h3><p>You\'ll analyze a student scenario involving foundational skills — phonemic awareness, phonics, fluency, or word analysis. Your response needs to identify the student\'s strengths and needs, then describe specific, evidence-based instructional strategies.</p><h3>Subarea V: Reading Comprehension (Objective 11)</h3><p>Similar format, but focused on comprehension — vocabulary, text structures, comprehension strategies. Again, identify what the student can and cannot do, then recommend targeted instruction.</p><h3>Open-Response Strategy</h3><p>Use this framework for both assignments:</p><ul><li><strong>Identify</strong> — Name the specific skill or deficit shown in the scenario</li><li><strong>Explain</strong> — Connect it to reading development concepts from the exam framework</li><li><strong>Recommend</strong> — Describe 2–3 instructional strategies with enough detail to show you know how to implement them</li><li><strong>Justify</strong> — Explain why those strategies address the identified need</li></ul>',
      },
      {
        heading: 'Study Plan: How to Use This Guide',
        html: true,
        content: '<p>A <strong>Foundations of Reading 890 study guide PDF free</strong> download is a starting point — but you need a plan. Here\'s a four-week approach:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Study phonological awareness, phonics, morphemic analysis, fluency. Take notes on key terms.</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Study vocabulary tiers, comprehension strategies, text structures. Practice identifying main idea vs. theme.</td></tr><tr><td>3</td><td>Subarea III (18%) + Written</td><td>Study assessment types and instructional integration. Practice open-response assignments using the framework above.</td></tr><tr><td>4</td><td>Review + Practice Tests</td><td>Take a full <a href="/blog/foundations-of-reading-890-practice-test">Foundations of Reading (890) practice test</a> under timed conditions. Review missed questions by subarea.</td></tr></tbody></table><p>Spend your time proportionally — Subarea I is worth almost twice as much as Subarea III. Don\'t study everything equally.</p>',
      },
      {
        heading: 'Top Study Strategies for the 890',
        html: true,
        content: '<p>These strategies apply whether you\'re using a <strong>Foundations of Reading 890 study guide PDF free download</strong> or a full prep program.</p><ul><li><strong>Learn the vocabulary</strong> — The exam tests precise terminology. Know the difference between phonological awareness and phonemic awareness, between digraphs and blends, between inflectional and derivational suffixes.</li><li><strong>Practice the written responses</strong> — Many candidates focus entirely on multiple-choice and run out of time or ideas on the open-response sections. Write at least 3–4 practice responses before test day.</li><li><strong>Study the assessment types</strong> — Screening, diagnostic, progress monitoring, and summative assessments each serve a different purpose. Know when to use each one.</li><li><strong>Take practice tests</strong> — Our <a href="/blog/foundations-of-reading-890-practice-test">Foundations of Reading (890) practice test</a> mirrors the exam format and covers all three MC subareas. Use it to identify weak spots.</li><li><strong>Focus on application, not memorization</strong> — The exam asks you to apply concepts to classroom scenarios. For every concept you study, think: "How would I teach this to a struggling reader?"</li></ul>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>Is there a Foundations of Reading 890 study guide PDF free download?</h3><p>Yes. Use the download form on this page to get our free <strong>Foundations of Reading 890 study guide PDF free download</strong>. It covers all five subareas, key concepts, and open-response strategies in a printable format.</p><h3>What does the Foundations of Reading 890 study guide cover?</h3><p>A complete <strong>Foundations of Reading 890 study guide PDF</strong> covers all 11 objectives across 5 subareas: phonological awareness, phonics, word analysis, fluency, vocabulary, comprehension, assessment, and both open-response assignments.</p><h3>How many questions are on the Foundations of Reading 890?</h3><p>The exam has 100 multiple-choice questions and 2 open-response written assignments. Total testing time is 4 hours, with a 15-minute tutorial and nondisclosure agreement before you begin.</p><h3>Is the 890 the same test as the 190?</h3><p>Yes. The test content is identical — same questions, same format, same timing, same scoring. The difference is the test code and registration portal.</p><h3>Where can I find a Foundations of Reading 890 practice test?</h3><p>We have a free <a href="/blog/foundations-of-reading-890-practice-test">Foundations of Reading (890) practice test</a> with 25 questions covering all three multiple-choice subareas, plus answer explanations. For full-length practice with 100 questions, see our <a href="/#pricing">complete prep program</a>.</p><h3>How should I prepare for the open-response sections?</h3><p>Use the Identify → Explain → Recommend → Justify framework. Practice with student scenarios, and always connect your recommendations to specific reading development concepts. The two written assignments are worth 20% of your total score — don\'t skip them.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-ct',
    title: 'Foundations of Reading CT — Everything Connecticut Test-Takers Need to Know',
    metaDescription: 'Foundations of Reading CT guide: test format, passing score, subareas, free practice test, and study resources for Connecticut\'s NES 890 exam.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-ct-study-sheet',
      headline: 'Get the Free CT Foundations of Reading Study Sheet',
      subheadline: 'One-page cheat sheet with all subareas, CT passing score, objectives breakdown, and open-response template.',
      pdfLabel: 'CT Foundations of Reading Study Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading CT: What Connecticut Requires',
        html: true,
        content: '<p>If you\'re pursuing a teaching license in Connecticut, the <strong>Foundations of Reading CT</strong> exam is a required step. Connecticut uses the NES Foundations of Reading test — test code 890 — administered through the CT NES portal. The test has 100 multiple-choice questions and 2 open-response written assignments, and you need a <strong>240</strong> to pass.</p><p>This guide covers the full exam breakdown, Connecticut-specific details, and where to find a <strong>Foundations of Reading CT practice test free</strong> of charge. If you\'re looking for a <strong>Foundations of Reading CT PDF</strong> to study from, we have a free downloadable study sheet on this page.</p>',
      },
      {
        heading: 'CT Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Registration Portal</td><td>ct.nesinc.com</td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Passing Score</td><td>240</td></tr><tr><td>Online Proctoring</td><td>Available — monthly one-week testing windows</td></tr><tr><td>Testing Center</td><td>Year-round by appointment, Monday–Saturday, at CT and nationwide locations</td></tr></tbody></table><p>The <strong>Foundations of Reading CT 890</strong> is identical in content to the NES 190. If you\'ve studied for the 190, you\'re already prepared — the only difference is the test code and registration portal.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<p>Connecticut candidates can take the <strong>Foundations of Reading CT 890</strong> two ways:</p><table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Testing centers in CT and nationwide</td><td>From home or another private location</td></tr><tr><td>When</td><td>Year-round, Monday–Saturday (excluding holidays)</td><td>Monthly one-week testing windows</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>No scheduled break</td><td>15-minute optional break between MC and open-response</td></tr><tr><td>MC Section</td><td>Combined with open-response in one 4-hour block</td><td>2.5 hours for multiple-choice</td></tr><tr><td>Open-Response</td><td>Same 4-hour block</td><td>1.5 hours after break</td></tr><tr><td>Score Receipt</td><td>Receipt provided at test conclusion</td><td>No completion receipt at test conclusion</td></tr></tbody></table><p>Online proctoring splits the exam into two timed blocks: 2.5 hours for the 100 multiple-choice questions, then a 15-minute break, then 1.5 hours for the 2 open-response assignments. The test may also require use of an on-screen character selector for inserting special characters in your written responses.</p>',
      },
      {
        heading: 'The Four Subareas and Their Weights',
        html: true,
        content: '<p>The <strong>Foundations of Reading CT PDF</strong> study sheet you can download from this page covers all four subareas in detail. Here\'s the breakdown:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>20%</td><td>10–11</td><td>2 open-response assignments</td></tr></tbody></table><p>Subarea I alone is worth more than a third of your score. If you have limited study time, that\'s where to start.</p>',
      },
      {
        heading: 'What Each Subarea Covers',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>Four objectives spanning phonological and phonemic awareness, beginning reading skills (phonics, decoding, high-frequency words), word analysis and morphemic analysis (prefixes, suffixes, syllable types), and reading fluency (accuracy, rate, prosody). Expect scenario-based questions about classroom instruction for diverse learners, including ELL students and cognate awareness.</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p>Three objectives covering academic language and vocabulary development (tiered vocabulary, morphology, etymology, context clues, idioms), comprehension of literary text (literal, inferential, and evaluative levels; scaffolding; reciprocal teaching), and informational text comprehension (text structures, text features, disciplinary literacy).</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p>Two objectives: assessment principles (screening, formative, summative, diagnostic, progress monitoring; criterion-referenced vs. norm-referenced tests; informal assessments like phonics inventories and fluency measures) and instructional best practices (integrated literacy, MTSS/tiered models, text complexity, close reading, motivation, instructional technology).</p><h3>Subarea IV: Integration of Knowledge and Understanding (20%)</h3><p>Two open-response assignments. Objective 10 asks you to analyze student assessment data related to foundational reading skills — identify strengths and needs, then describe and justify instructional strategies. Objective 11 does the same for reading comprehension skills. Both require evidence-based reasoning.</p>',
      },
      {
        heading: 'How to Prepare for the Foundations of Reading CT',
        html: true,
        content: '<p>Your study plan should reflect the exam weights. Spend roughly a third of your time on Subarea I, a quarter on Subarea II, and split the rest between Subarea III and the open-response assignments.</p><p><strong>Step 1: Learn the content.</strong> Work through each objective using a study guide. Focus on terminology — the exam tests precise knowledge. Know the difference between phonological and phonemic awareness, between digraphs and blends, between inflectional and derivational suffixes.</p><p><strong>Step 2: Take a practice test.</strong> Our <a href="/blog/190-foundations-of-reading-practice-test">free Foundations of Reading practice test</a> has 25 questions covering all three MC subareas with detailed answer explanations. Use it to identify which subareas need more work.</p><p><strong>Step 3: Practice the written responses.</strong> The two open-response assignments are worth 20% combined. Skipping them makes passing extremely difficult. For each, practice identifying student strengths and needs from assessment data, then describing specific instructional strategies with clear justifications.</p><p><strong>Step 4: Simulate test conditions.</strong> Take a full practice run under the 4-hour time limit. Pace yourself at about 80 seconds per MC question and save at least 45 minutes for each written assignment.</p><p>For a complete prep program with additional practice tests, AI-graded open-response practice, and a full study guide, see our <a href="/#pricing">prep packages</a>.</p>',
      },
      {
        heading: 'Foundations of Reading CT Practice Test',
        html: true,
        content: '<p>Looking for a <strong>Foundations of Reading CT practice test free</strong> resource? We have a <a href="/blog/190-foundations-of-reading-practice-test">free 25-question practice test</a> that mirrors the format of the 890 — scenario-based multiple-choice questions with four answer choices, covering phonological awareness, phonics, vocabulary, comprehension, fluency, and assessment. Every question includes a detailed answer explanation.</p><p>The practice test covers Subareas I–III (the 80% of the exam that is multiple-choice). For open-response practice, our <a href="/#pricing">full prep program</a> includes AI-graded written assignments that give you feedback on your responses.</p><p>Since the 890 content is identical to the NES 190, any <strong>Foundations of Reading CT practice test</strong> materials that target the 190 will work for you.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What is the Foundations of Reading CT 890?</h3><p>The <strong>Foundations of Reading CT 890</strong> is the reading licensure exam required for Connecticut teaching candidates. It\'s the NES Foundations of Reading test (code 890), registered through ct.nesinc.com. The exam has 100 multiple-choice questions and 2 open-response written assignments. You need a 240 to pass.</p><h3>Is there a Foundations of Reading CT practice test free online?</h3><p>Yes. We offer a <a href="/blog/190-foundations-of-reading-practice-test">free Foundations of Reading practice test</a> with 25 questions and detailed answer explanations. The content covers the same material tested on the CT 890.</p><h3>Where can I find a Foundations of Reading CT PDF to study from?</h3><p>Download our free <strong>Foundations of Reading CT PDF</strong> study sheet using the form on this page. It includes all four subareas, the CT passing score, objective breakdowns, and an open-response template. For a more comprehensive study guide, see our <a href="/#pricing">full prep program</a>.</p><h3>What score do I need to pass the Foundations of Reading in Connecticut?</h3><p>Connecticut requires a passing score of <strong>240</strong> on a 100–300 scale.</p><h3>Can I take the CT Foundations of Reading online?</h3><p>Yes. Online proctoring is available during monthly one-week testing windows. The online appointment is 4 hours and 30 minutes total — 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for the open-response assignments.</p><h3>Is the Foundations of Reading 890 the same as the 190?</h3><p>Yes. The test content is identical — same questions, same format, same scoring. The only difference is the test code and where you register. Connecticut uses code 890 through the ct.nesinc.com portal.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-mississippi',
    title: 'Foundations of Reading Mississippi — Requirements, Passing Score, and How to Prepare',
    metaDescription: 'Foundations of Reading Mississippi guide: passing score (233), test format, subareas, practice test, and free PDF study resources for MS candidates.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-mississippi-study-sheet',
      headline: 'Get the Free Mississippi Foundations of Reading Study Sheet',
      subheadline: 'One-page cheat sheet with MS passing score, all five subareas, objectives breakdown, and open-response template.',
      pdfLabel: 'MS Foundations of Reading Study Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading Mississippi: Who Needs This Exam?',
        html: true,
        content: '<p>If you\'re pursuing an elementary education or special education license in Mississippi, the <strong>Foundations of Reading Mississippi</strong> exam is required. Mississippi mandates the <a href="/blog/foundations-of-reading-890">Foundations of Reading (890)</a> for three license types: <strong>K–6</strong>, <strong>K–3</strong>, and <strong>4–6</strong> Elementary Education. As of January 1, 2023, it\'s also required for the <strong>Special Education Mild to Moderate (K–12)</strong> license.</p><p>The requirement has been in effect since July 1, 2016 for elementary education candidates. Mississippi law (Miss. Code Ann. § 37-3-2) requires teacher candidates to earn a passing score on a rigorous test of scientifically research-based reading instruction and intervention and data-based decision-making principles. This is in addition to all other testing requirements for your license type.</p><p>If you\'re looking for a <strong>Foundations of Reading Mississippi PDF</strong> to study from, download our free study sheet using the form on this page.</p>',
      },
      {
        heading: 'Mississippi Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Registration Portal</td><td><a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Mississippi Passing Score</td><td><strong>233</strong></td></tr><tr><td>Online Proctoring</td><td>Available</td></tr></tbody></table><p>Mississippi\'s passing score of <strong>233</strong> is below the national benchmark of 240. That\'s meaningful — it gives you slightly more room, but the exam is still rigorous. You need to know the content.</p>',
      },
      {
        heading: 'Mississippi License Types That Require the 890',
        html: true,
        content: '<p>The <strong>Foundations of Reading Mississippi</strong> requirement applies to these license types:</p><table><thead><tr><th>License Type</th><th>Required Since</th></tr></thead><tbody><tr><td>Elementary Education K–6</td><td>July 1, 2016</td></tr><tr><td>Elementary Education K–3</td><td>July 1, 2016</td></tr><tr><td>Elementary Education 4–6</td><td>July 1, 2016</td></tr><tr><td>Special Education Mild to Moderate K–12</td><td>January 1, 2023</td></tr></tbody></table><p>This exam is required <em>in addition to</em> all other testing requirements for your license. Contact the Mississippi Department of Education if you\'re unsure whether your specific pathway requires it.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<p>Mississippi candidates can take the exam two ways:</p><table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Testing centers in MS and nationwide</td><td>From home or private location</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>No scheduled break</td><td>15-minute break between MC and open-response</td></tr></tbody></table><p>Both options cover the same content: 100 multiple-choice questions and 2 open-response written assignments in 4 hours of testing time. Register at <a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a>.</p>',
      },
      {
        heading: 'The Five Subareas and Their Weights',
        html: true,
        content: '<p>Understanding the subarea weights is the first step in building a study plan. Here\'s the full breakdown for the <strong>Foundations of Reading Mississippi</strong> exam:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Objectives</th><th>Weight</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>1–4</td><td>35%</td><td>Multiple-choice</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>5–7</td><td>27%</td><td>Multiple-choice</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>8–9</td><td>18%</td><td>Multiple-choice</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10</td><td>10%</td><td>1 open-response</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>11</td><td>10%</td><td>1 open-response</td></tr></tbody></table><p>Subareas I–III are all multiple-choice and account for 80% of your score. Subareas IV and V are the two written assignments, worth 10% each.</p>',
      },
      {
        heading: 'What Each Subarea Covers',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>The largest section. Four objectives covering phonological and phonemic awareness (blending, segmenting, deleting, substituting phonemes), phonics and spelling (systematic explicit instruction, CVC/CVCe/vowel team patterns, digraphs vs. blends), word analysis and morphemic analysis (prefixes, suffixes, six syllable types, inflectional vs. derivational morphemes), and reading fluency (accuracy, rate, prosody).</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p>Three objectives covering vocabulary development (tiered vocabulary, context clues, morphemic analysis), comprehension of literary and informational texts (text structures, main idea vs. theme, inferential comprehension), and comprehension strategies (reciprocal teaching, think-alouds, graphic organizers).</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p>Two objectives on assessment types (screening, diagnostic, progress monitoring, summative) and instructional integration (differentiation, ELL accommodations, tiered intervention models).</p><h3>Subareas IV and V: Open-Response Assignments (20% total)</h3><p>Two written assignments. Subarea IV focuses on foundational reading skills — you\'ll analyze student data and recommend instructional strategies. Subarea V does the same for reading comprehension. Both require evidence-based reasoning and specific strategy recommendations.</p>',
      },
      {
        heading: 'How to Prepare for the Foundations of Reading in Mississippi',
        html: true,
        content: '<p>Mississippi\'s passing score of 233 is achievable with focused preparation. Here\'s how to approach it:</p><p><strong>1. Study by subarea weight.</strong> Subarea I is worth 35% of your score — spend the most time there. Know your phonics patterns, phonemic awareness tasks, syllable types, and fluency components cold.</p><p><strong>2. Practice with real questions.</strong> Knowing <strong>Foundations of Reading Mississippi questions</strong> and the way they\'re structured matters. The exam uses scenario-based multiple-choice — you\'ll read about a classroom situation and choose the best instructional response. Our <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading Mississippi practice test</strong></a> mirrors this format with detailed <strong>Foundations of Reading Mississippi answers</strong> and explanations for every question.</p><p><strong>3. Don\'t skip the written responses.</strong> The two open-response assignments are worth 20% combined. Practice the Identify → Explain → Recommend → Justify framework: identify the student\'s need, explain the underlying reading concept, recommend specific strategies, and justify why they address the need.</p><p><strong>4. Simulate test conditions.</strong> Take a full practice run under the 4-hour time limit. Budget about 80 seconds per MC question and at least 45 minutes per written assignment.</p><p>For a complete prep program with full-length practice tests and AI-graded open-response practice, see our <a href="/#pricing">prep packages</a>.</p>',
      },
      {
        heading: 'Free Mississippi Foundations of Reading Practice Test',
        html: true,
        content: '<p>We offer a free <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading Mississippi practice test</strong></a> with 25 multiple-choice questions covering all three MC subareas. Every question includes a detailed answer explanation so you can learn from your mistakes.</p><p>Want a printable version? Download our <strong>Foundations of Reading practice test PDF</strong> using the form on this page — it includes the same questions with answers formatted for offline study.</p><p>Since the 890 content is standardized nationally, any Foundations of Reading practice materials will prepare you for the Mississippi exam. The only Mississippi-specific detail is the passing score: <strong>233</strong>.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What score do I need to pass the Foundations of Reading in Mississippi?</h3><p>Mississippi requires a passing score of <strong>233</strong> on the 100–300 scale. This is below the national benchmark of 240.</p><h3>Where can I find Foundations of Reading Mississippi questions and answers?</h3><p>Our <a href="/blog/foundations-of-reading-890-practice-test">free practice test</a> includes 25 <strong>Foundations of Reading Mississippi questions</strong> with detailed <strong>Foundations of Reading Mississippi answers</strong> and explanations for each one. For a printable version, download our <strong>Foundations of Reading Mississippi PDF</strong> from this page.</p><h3>Is there a Foundations of Reading Mississippi practice test?</h3><p>Yes. We have a free <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading Mississippi practice test</strong></a> with 25 questions covering Subareas I–III. For full-length 100-question practice tests, see our <a href="/#pricing">complete prep program</a>.</p><h3>Do special education teachers in Mississippi need the Foundations of Reading?</h3><p>Yes. As of January 1, 2023, the Foundations of Reading (890) is required for the Special Education Mild to Moderate (K–12) license in Mississippi, in addition to all other testing requirements.</p><h3>Where do I register for the Foundations of Reading in Mississippi?</h3><p>Register through the National Evaluation Series Mississippi portal at <a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a>. Both testing center and online proctoring options are available.</p><h3>Can I take the Foundations of Reading Mississippi exam online?</h3><p>Yes. Online proctoring is available. The online appointment is 4 hours and 30 minutes total, which includes a 15-minute tutorial/NDA and a 15-minute break between the multiple-choice and open-response sections.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-mtel',
    title: 'Foundations of Reading MTEL — Complete Guide for Massachusetts',
    metaDescription: 'Foundations of Reading MTEL guide: test format, 240 passing score, subareas, study tips, and free practice test for Massachusetts test code 190.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-mtel-study-sheet',
      headline: 'Get the Free MTEL Foundations of Reading Study Sheet',
      subheadline: 'Printable one-page guide with all subareas, MA passing score, objectives breakdown, and open-response template.',
      pdfLabel: 'MTEL Foundations of Reading Study Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading MTEL: What Massachusetts Requires',
        html: true,
        content: '<p>Massachusetts teacher candidates take the <strong>Foundations of Reading MTEL</strong> as part of the MTEL (Massachusetts Tests for Educator Licensure) battery. The test code is <strong>190</strong>, and it\'s administered through the MTEL portal at <a href="https://www.mtel.nesinc.com/TestView.aspx?f=HTML_FRAG/MA190_TestPage.html">mtel.nesinc.com</a>. You need a <strong>240</strong> to pass.</p><p>The exam has 100 multiple-choice questions and 2 open-response assignments. It\'s 4 hours of testing time — the same content framework used across all NES Foundations of Reading exams, but registered and scored through the Massachusetts MTEL system.</p><p>This guide covers the full exam breakdown, Massachusetts-specific details, and how to prepare. If you want a printable version, grab our free <strong>MTEL Foundations of Reading study sheet</strong> using the form on this page.</p>',
      },
      {
        heading: 'MTEL 190 Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>190 (MTEL)</td></tr><tr><td>Registration Portal</td><td><a href="https://www.mtel.nesinc.com/TestView.aspx?f=HTML_FRAG/MA190_TestPage.html">mtel.nesinc.com</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Passing Score</td><td>240</td></tr><tr><td>Online Proctoring</td><td>Available — monthly one-week testing windows</td></tr><tr><td>Testing Center</td><td>Year-round by appointment, Monday–Saturday</td></tr></tbody></table><p>The 15-minute tutorial and nondisclosure agreement happen before your 4-hour testing clock starts. Some questions on the exam are unscored pilot items included for data collection — you won\'t know which ones, so treat every question seriously.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<p>Massachusetts candidates can take the <strong>Foundations of Reading MTEL</strong> at a testing center or through online proctoring.</p><table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Testing centers nationwide</td><td>From home or private location</td></tr><tr><td>When</td><td>Year-round, Monday–Saturday (excluding holidays)</td><td>Monthly one-week testing windows</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>Restroom breaks permitted (counted toward testing time)</td><td>15-minute optional break between MC and open-response</td></tr><tr><td>MC Section</td><td>Combined with open-response in one 4-hour block</td><td>2.5 hours for multiple-choice</td></tr><tr><td>Open-Response</td><td>Same 4-hour block</td><td>1.5 hours after break</td></tr><tr><td>Score Receipt</td><td>Receipt provided at test conclusion</td><td>No completion receipt at test conclusion</td></tr></tbody></table><p>Online proctoring splits the exam into two timed blocks — 2.5 hours for the 100 MC questions, then a 15-minute break, then 1.5 hours for the 2 open-response assignments. The test may require use of an on-screen character selector for inserting special characters in your written responses.</p>',
      },
      {
        heading: 'The Four Subareas and Their Weights',
        html: true,
        content: '<p>The MTEL 190 is organized into four subareas. Subareas I–III are multiple-choice. Subarea IV is the two open-response assignments.</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>20%</td><td>10–11</td><td>2 open-response assignments</td></tr></tbody></table><p>Subarea I alone is worth more than a third of your score. If you\'re short on study time, that\'s where to focus first.</p>',
      },
      {
        heading: 'What Each Subarea Covers',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>Four objectives spanning the core building blocks of reading. <strong>Objective 1</strong> covers phonological and phonemic awareness, concepts of print, letter knowledge, and the alphabetic principle — including factors that affect development for diverse learners. <strong>Objective 2</strong> addresses beginning reading skills: phonics, high-frequency words, spelling, and the relationship between oral vocabulary and decoding/encoding. <strong>Objective 3</strong> focuses on word analysis — morphemes (base words, roots, inflections, derivational affixes), syllable types, syllabication strategies, and orthographic knowledge. <strong>Objective 4</strong> covers reading fluency at all developmental stages: accuracy, rate, and prosody, plus the interrelationships between fluency, decoding, and comprehension.</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p>Three objectives on vocabulary and comprehension. <strong>Objective 5</strong> covers academic language and vocabulary development — oral-written vocabulary relationships, tiered vocabulary, independent word-learning strategies (morphology, etymology, context clues, reference materials), and higher-order thinking access. <strong>Objective 6</strong> addresses literary text comprehension at literal, inferential, and evaluative levels — character analysis, figurative language, narrative perspective, and strategic reading approaches. <strong>Objective 7</strong> covers informational text — text structures (chronological, compare-contrast, cause-effect, problem-solution), text features, and disciplinary literacy skills.</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p>Two objectives tying assessment to practice. <strong>Objective 8</strong> covers assessment principles — valid approaches for assessing all five major reading components (phonemic awareness, phonics, fluency, vocabulary, comprehension), standardized and informal assessments, and data interpretation. <strong>Objective 9</strong> addresses instructional best practices — integrated literacy models, MTSS/tiered instruction, text complexity, and differentiation for diverse learners.</p><h3>Subarea IV: Integration of Knowledge and Understanding (20%)</h3><p>Two open-response assignments. <strong>Objective 10</strong> asks you to analyze a student\'s foundational reading skills assessment data — identify strengths and needs, select appropriate instructional strategies, and explain their effectiveness. <strong>Objective 11</strong> does the same for reading comprehension. Both require evidence-based reasoning grounded in the concepts from Subareas I–III.</p>',
      },
      {
        heading: 'How to Prepare for the Foundations of Reading MTEL',
        html: true,
        content: '<p>Your study time should roughly mirror the exam weights — spend the most time on Subarea I (35%), then Subarea II (27%), then split the rest between Subarea III and open-response practice.</p><p><strong>Step 1: Learn the terminology.</strong> The exam tests precise vocabulary. Know the difference between phonological awareness and phonemic awareness, between digraphs and blends, between inflectional and derivational suffixes. Misunderstanding a term can cost you multiple questions.</p><p><strong>Step 2: Take a practice test.</strong> Our <a href="/blog/foundations-of-reading-practice-test">free Foundations of Reading practice test</a> has 25 questions covering all three MC subareas with detailed answer explanations. Use your results to identify which objectives need more work.</p><p><strong>Step 3: Practice the open-response assignments.</strong> Subarea IV is 20% of your score. For each assignment, practice analyzing student assessment data — identify what the student can and cannot do, then describe 2–3 specific instructional strategies with clear justifications for why they address the identified needs.</p><p><strong>Step 4: Simulate test conditions.</strong> Run a full 4-hour session. Pace yourself at about 80 seconds per MC question and save at least 45 minutes for each written assignment. If you plan to test online, remember the MC section is capped at 2.5 hours.</p><p>For a complete prep program with additional practice tests, AI-graded open-response practice, and a full study guide, see our <a href="/#pricing">prep packages</a>.</p>',
      },
      {
        heading: 'MTEL Foundations of Reading Practice Test',
        html: true,
        content: '<p>We have a <a href="/blog/foundations-of-reading-practice-test">free Foundations of Reading practice test</a> with 25 scenario-based multiple-choice questions. Each question includes a detailed answer explanation so you can learn from every miss. The questions cover phonological awareness, phonics, vocabulary, comprehension, fluency, and assessment — the same content tested on the MTEL 190.</p><p>Since the MTEL 190 uses the same content framework as the NES Foundations of Reading, any practice materials targeting the 190 or 890 will prepare you for the Massachusetts exam.</p><p>For full-length 100-question practice tests and AI-graded written response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What is the Foundations of Reading MTEL?</h3><p>The <strong>Foundations of Reading MTEL</strong> is the reading licensure exam for Massachusetts teacher candidates. It\'s test code 190, administered through the MTEL portal at mtel.nesinc.com. The exam has 100 multiple-choice questions and 2 open-response assignments, with 4 hours of testing time and a passing score of 240.</p><h3>What score do I need to pass the MTEL Foundations of Reading?</h3><p>Massachusetts requires a passing score of <strong>240</strong> on a 100–300 scale.</p><h3>How is the MTEL 190 different from the NES 890?</h3><p>The content is the same — identical framework, objectives, and question types. The difference is the test code and registration portal. Massachusetts uses code 190 through mtel.nesinc.com. States that use the 890 register through their own NES portals.</p><h3>Can I take the MTEL Foundations of Reading online?</h3><p>Yes. Online proctoring is available during monthly one-week testing windows. The online appointment is 4 hours and 30 minutes total — 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for the open-response assignments.</p><h3>How many subareas are on the MTEL 190?</h3><p>Four subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), Reading Assessment and Instruction (18%), and Integration of Knowledge and Understanding (20% — the two open-response assignments).</p><h3>Where can I find a free MTEL Foundations of Reading practice test?</h3><p>We offer a <a href="/blog/foundations-of-reading-practice-test">free 25-question practice test</a> covering all three multiple-choice subareas with detailed answer explanations. The questions are designed for the same content framework used on the MTEL 190.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-mtel-practice-test',
    title: 'Foundations of Reading MTEL Practice Test (25 Free Questions)',
    metaDescription: 'Free Foundations of Reading MTEL practice test with 25 questions and answers. Download the PDF version free via email.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-mtel-practice-25',
      headline: 'Get the Free 25-Question MTEL Practice Test PDF',
      subheadline: 'All 25 questions with answers and explanations — formatted for printing and offline study.',
      pdfLabel: 'MTEL Foundations of Reading Practice Test (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading MTEL Practice Test Free',
        html: true,
        content: '<p>This <strong>Foundations of Reading MTEL practice test free</strong> resource contains 25 multiple-choice questions pulled from our question bank. Every question uses the same scenario-based format you\'ll see on the real MTEL 190 — a classroom situation followed by four answer choices.</p><p>The MTEL Foundations of Reading (test code 190) has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time and need a 240 to pass. The 25 questions below cover all three MC subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), and Reading Assessment and Instruction (18%).</p><p>Work through all 25 questions, then check the answer key at the bottom. Want a printable version? Get the <strong>Foundations of Reading MTEL practice test PDF free</strong> download by entering your email in the form on this page.</p>',
      },
      {
        heading: 'Questions 1–10: Foundations of Reading Development',
        html: true,
        content: '<p><strong>Question 1.</strong> A kindergarten teacher claps out the word "sunlight" with students and asks them to tell her how many parts they hear. This activity is designed to develop which phonological awareness skill?</p><p>A) Segmenting spoken words into syllables and counting each part<br>B) Isolating the first phoneme and identifying the beginning sound<br>C) Blending individual phonemes together and forming a complete word<br>D) Deleting the final syllable and pronouncing the remaining word part</p><p><strong>Question 2.</strong> A first-grade teacher shows students a sentence strip that reads "The cat sat." She slides a chip forward for each word as she reads aloud and asks students to do the same. Which concept of print is the teacher most directly reinforcing?</p><p>A) Understanding that punctuation marks signal pauses and sentence endings<br>B) Recognizing that spaces between letters mark individual word boundaries<br>C) Distinguishing between uppercase letters and lowercase letter forms<br>D) Applying left-to-right directionality and return sweep across lines</p><p><strong>Question 3.</strong> A kindergarten screener reveals that a student can identify rhyming words and segment two-syllable compound words into parts, but cannot perform tasks that require removing a sound from a spoken word. Which instructional activity would most directly address this student\'s identified gap?</p><p>A) Listening to isolated phonemes spoken by the teacher and combining them to say a whole word<br>B) Breaking a spoken word into every individual sound by tapping once for each phoneme<br>C) Saying a word aloud and then repeating it with a specific target sound left out<br>D) Listening to two spoken words and deciding whether both words end with the same sound</p><p><strong>Question 4.</strong> During shared reading, a kindergarten teacher holds up a big book, shows students the front cover, and opens it to the first page. She then asks, "Which way do my eyes move when I read this page?" This question is intended to reinforce which concept of print?</p><p>A) Understanding that the title and author name appear on the front cover<br>B) Recognizing that illustrations provide clues about meaning<br>C) Knowing that punctuation marks like periods signal the end of sentences<br>D) Understanding that print is read from left to right across each line</p><p><strong>Question 5.</strong> A kindergarten teacher says three words aloud — "fun," "run," and "sun" — and asks students to tell her what sounds the same across all three words. A student answers, "They all have the \'un\' part at the end." At which phonological awareness level is this student working, and what is the most appropriate next instructional step?</p><p>A) The student is working at the onset-rime level and is ready to move toward identifying individual beginning sounds in words<br>B) The student is working at the syllable level and needs to practice clapping and counting syllables in multisyllabic words<br>C) The student is working at the phoneme level and is ready for phoneme blending tasks using three-phoneme words<br>D) The student is working at the word level and needs to practice counting words in spoken sentences using counters</p><p><strong>Question 6.</strong> A first-grade teacher conducts a language experience activity in which students dictate sentences about a class field trip and the teacher writes their words on chart paper. The teacher then reads the text aloud, pointing to each word. Which primary literacy benefit does this approach provide?</p><p>A) Building phonemic awareness by isolating and manipulating individual phoneme sounds<br>B) Connecting spoken language and written text through student-generated and meaningful content<br>C) Developing phonics knowledge by explicitly teaching letter-sound correspondences and rules<br>D) Increasing reading rate and automaticity by practicing familiar high-frequency word lists</p><p><strong>Question 7.</strong> A kindergarten teacher notices that Marcus, an English language learner whose home language is Spanish, consistently omits the /v/ sound and substitutes /b/ in words like "very" and "vine." Which factor most likely explains this pattern?</p><p>A) Marcus has a hearing loss needing immediate referral and audiological screening<br>B) Marcus needs more phonics instruction targeting consonant blends and digraphs<br>C) Marcus is transferring the Spanish /v/–/b/ phoneme pattern to English<br>D) Marcus is making random articulation errors expected to resolve without intervention</p><p><strong>Question 8.</strong> A kindergarten teacher administers a phonemic awareness screener. She says a word aloud and asks the student to tell her only the very first sound. A student correctly identifies the first sound in three consecutive words. Which instructional step should the teacher target next?</p><p>A) Presenting three spoken phonemes and asking the student to blend them into a complete spoken word<br>B) Having the student clap for each syllable in a series of two- and three-syllable words<br>C) Asking the student to listen to rhyming pairs and sort pictures by their matching rime sound<br>D) Practicing identifying whether two spoken words begin with the same initial sound</p><p><strong>Question 9.</strong> A first-grade teacher reads aloud daily from a variety of fiction and nonfiction books and pauses frequently to discuss new words and ideas with students. Which aspect of early literacy development is most directly supported by this practice?</p><p>A) Building receptive vocabulary and background knowledge through rich oral language exposure<br>B) Practicing phoneme segmentation and blending through repeated read-aloud listening activities<br>C) Reinforcing letter-sound correspondences and decoding rules through text exposure and discussion<br>D) Developing concepts of print by tracking word boundaries and directional print movement</p><p><strong>Question 10.</strong> A first-grade student can correctly identify rhyming words and segment words into syllables but struggles to respond when the teacher presents isolated phonemes and asks the student to combine them into a word. Which instructional activity would most directly address this need?</p><p>A) Removing a targeted sound from a spoken word and saying what word remains after the deletion<br>B) Pushing a token into a box for each individual sound heard in a short spoken word<br>C) Listening to spoken phonemes presented one at a time and saying the whole word they form<br>D) Sorting picture cards into groups based on the rhyming pattern of each word</p>',
      },
      {
        heading: 'Questions 11–18: Phonics, Word Analysis, and Vocabulary',
        html: true,
        content: '<p><strong>Question 11.</strong> A kindergarten teacher is planning a sequence of phonological awareness activities. Which ordering reflects the developmental progression from least to most complex?</p><p>A) Phoneme isolation, then onset-rime blending, then syllable counting, then word counting<br>B) Phoneme deletion, then phoneme segmentation, then onset-rime, then syllable clapping<br>C) Word counting in sentences, then syllable clapping, then onset-rime, then phoneme segmentation<br>D) Syllable blending, then word counting, then phoneme isolation, then onset-rime splitting</p><p><strong>Question 12.</strong> A first-grade student reads "ship" correctly but misreads "shop" as "stop" every time. Which instructional focus would most directly address this error pattern?</p><p>A) Short vowel discrimination in CVC words<br>B) Consonant blend sequences at syllable onset<br>C) Consonant digraph "sh" as a single phoneme distinct from the blend "st"<br>D) The vowel-consonant-e pattern and silent-e effect on vowel sound</p><p><strong>Question 13.</strong> A second-grade teacher wants students to understand why the word "make" has a long /ā/ sound. Which phonics concept should the teacher explicitly teach?</p><p>A) The vowel team pattern<br>B) The vowel-consonant-e pattern<br>C) The r-controlled vowel pattern<br>D) The open syllable pattern</p><p><strong>Question 14.</strong> A first-grade teacher introduces a new word sort in which students group words such as "bird," "burn," "farm," and "corn" into categories. Which phonics pattern is the primary focus?</p><p>A) Vowel diphthongs<br>B) R-controlled vowels<br>C) Vowel teams<br>D) The silent-e pattern</p><p><strong>Question 15.</strong> A second-grade teacher asks students to divide the word "rabbit" into syllables. A student correctly identifies the split as "rab-bit." Which syllabication rule did the student apply?</p><p>A) The V/CV rule<br>B) The consonant-le rule<br>C) The open syllable rule<br>D) The VC/CV rule</p><p><strong>Question 16.</strong> A third-grade teacher is selecting words to pre-teach before students read a science article about ecosystems. She chooses "significant," "interact," and "support" rather than "photosynthesis" and "organism." Which vocabulary framework best explains this selection?</p><p>A) Choosing cognates and high-frequency words for ELL students across content areas<br>B) Choosing words learnable through context clues without direct pre-teaching<br>C) Prioritizing Tier 2 academic words appearing across disciplines<br>D) Selecting Tier 3 domain words central to this specific content topic</p><p><strong>Question 17.</strong> A third-grade teacher reads aloud: "The scientist made a momentous discovery, one that would change the field of medicine forever." She asks students to use context to figure out what "momentous" means. Which type of context clue is available?</p><p>A) A contrast clue<br>B) An appositive clue<br>C) An example clue<br>D) A general inference clue</p><p><strong>Question 18.</strong> A third-grade teacher teaches students the Latin root "port," meaning "to carry," using words such as "transport," "import," "export," and "portable." Which vocabulary development strategy is this?</p><p>A) Morphemic analysis<br>B) Semantic mapping<br>C) Context clue analysis<br>D) Vocabulary self-collection</p>',
      },
      {
        heading: 'Questions 19–25: Comprehension, Fluency, and Assessment',
        html: true,
        content: '<p><strong>Question 19.</strong> A second-grade teacher notices that her ELL students whose home language is Spanish quickly recognize the words "animal," "hospital," and "color" in an English text. Which vocabulary concept explains why these students find these words familiar?</p><p>A) These words are Tier 1 everyday words learned through oral experience and conversation<br>B) These words are Spanish-English cognates with similar spelling, pronunciation, and meaning<br>C) These words follow predictable phonics patterns transferring across both language systems<br>D) These words are Tier 3 domain-specific terms from academic science and social studies</p><p><strong>Question 20.</strong> A third-grade student reads "The lead pipe was heavy" but then reads "She will lead the group" and is confused. Which vocabulary concept should the teacher address?</p><p>A) Idioms<br>B) Cognates<br>C) Tier 3 vocabulary<br>D) Homographs</p><p><strong>Question 21.</strong> A second-grade teacher asks students to read a short informational passage about beavers. After reading, she asks, "What is this passage mostly about?" A student responds, "Beavers." The teacher wants to help the student move beyond naming the topic to identifying the main idea. Which best describes the distinction?</p><p>A) The topic names the subject, while the main idea states what the author most wants readers to understand about that subject<br>B) The topic summarizes all details, while the main idea names the most interesting fact<br>C) The topic is one word, while the main idea is a complete sentence found in the first paragraph<br>D) The topic changes with each paragraph, while the main idea stays the same and is restated in every section</p><p><strong>Question 22.</strong> Students read a passage that includes "as a result" and "consequently" several times. Which text structure do these signal words most strongly indicate?</p><p>A) Compare-and-contrast<br>B) Cause-and-effect<br>C) Problem-and-solution<br>D) Sequence</p><p><strong>Question 23.</strong> A second-grade teacher listens to a student read aloud and records 92 words correct per minute with several self-corrections and good expression. Another student reads 115 WPM but in a flat, word-by-word monotone. Which statement best describes the relative fluency?</p><p>A) The second student — rate and WCPM are the primary fluency indicators<br>B) The first student — prosody and expression are essential fluency components alongside rate<br>C) Both students equally — accuracy and rate together fully define fluency<br>D) Neither student — fluent readers do not self-correct and maintain a consistent pace</p><p><strong>Question 24.</strong> A second-grade teacher has students perform a scripted play in small groups, practicing their lines multiple times before performing for the class. Which fluency instructional strategy does this represent?</p><p>A) Echo reading<br>B) Choral reading<br>C) Reader\'s theater<br>D) Partner reading</p><p><strong>Question 25.</strong> A first-grade teacher reads a passage aloud with expression, pausing at commas and dropping her voice at periods, then asks students to read the same passage aloud the same way. Which fluency component is the teacher most directly modeling?</p><p>A) Prosody<br>B) Accuracy<br>C) Rate<br>D) Automaticity</p>',
      },
      {
        heading: 'Answer Key',
        html: true,
        content: '<table><thead><tr><th>#</th><th>Answer</th><th>Explanation</th></tr></thead><tbody><tr><td>1</td><td><strong>A</strong></td><td>Clapping out word parts = syllable segmentation, a phonological awareness skill.</td></tr><tr><td>2</td><td><strong>B</strong></td><td>Sliding chips for each word reinforces that spaces mark word boundaries.</td></tr><tr><td>3</td><td><strong>C</strong></td><td>The student can\'t remove sounds — phoneme deletion practice directly addresses this.</td></tr><tr><td>4</td><td><strong>D</strong></td><td>"Which way do my eyes move?" targets left-to-right directionality.</td></tr><tr><td>5</td><td><strong>A</strong></td><td>Recognizing the shared rime "-un" = onset-rime level. Next step: isolating individual phonemes.</td></tr><tr><td>6</td><td><strong>B</strong></td><td>Language experience approach connects oral language to written text using students\' own words.</td></tr><tr><td>7</td><td><strong>C</strong></td><td>Spanish lacks a distinct /v/ phoneme — this is L1 transfer, not a disorder.</td></tr><tr><td>8</td><td><strong>A</strong></td><td>After isolation, the next step on the continuum is phoneme blending.</td></tr><tr><td>9</td><td><strong>A</strong></td><td>Interactive read-alouds build vocabulary and background knowledge through oral language.</td></tr><tr><td>10</td><td><strong>C</strong></td><td>The student can\'t blend phonemes — phoneme blending practice is the direct fix.</td></tr><tr><td>11</td><td><strong>C</strong></td><td>Continuum: word → syllable → onset-rime → phoneme (least → most complex).</td></tr><tr><td>12</td><td><strong>C</strong></td><td>Confusing "sh" with "st" = needs to learn digraph "sh" as a single sound unit.</td></tr><tr><td>13</td><td><strong>B</strong></td><td>"Make" follows the CVCe (silent-e) pattern — the e makes the vowel long.</td></tr><tr><td>14</td><td><strong>B</strong></td><td>"bird," "burn," "farm," "corn" all contain r-controlled vowels.</td></tr><tr><td>15</td><td><strong>D</strong></td><td>"Rabbit" has two consonants between vowels → split between them (VC/CV rule).</td></tr><tr><td>16</td><td><strong>C</strong></td><td>"Significant," "interact," "support" are Tier 2 words — high-utility academic vocabulary.</td></tr><tr><td>17</td><td><strong>D</strong></td><td>No direct definition, synonym, or contrast — the reader must infer from surrounding context.</td></tr><tr><td>18</td><td><strong>A</strong></td><td>Teaching a root and its derived forms = morphemic analysis.</td></tr><tr><td>19</td><td><strong>B</strong></td><td>"Animal," "hospital," "color" are Spanish-English cognates.</td></tr><tr><td>20</td><td><strong>D</strong></td><td>"Lead" spelled the same but pronounced differently with different meanings = homograph.</td></tr><tr><td>21</td><td><strong>A</strong></td><td>Topic = subject; main idea = what the author wants you to understand about that subject.</td></tr><tr><td>22</td><td><strong>B</strong></td><td>"As a result" and "consequently" are cause-and-effect signal words.</td></tr><tr><td>23</td><td><strong>B</strong></td><td>Fluency = accuracy + rate + prosody. The first student has better prosody despite lower WPM.</td></tr><tr><td>24</td><td><strong>C</strong></td><td>Performing a scripted play with repeated practice = reader\'s theater.</td></tr><tr><td>25</td><td><strong>A</strong></td><td>Modeling expression, pausing, and intonation = prosody.</td></tr></tbody></table>',
      },
      {
        heading: 'How to Use Your Results',
        html: true,
        content: '<p>If you scored <strong>20+ correct</strong>, you have a solid base across the MC subareas. Focus your remaining study time on the open-response section and any specific objectives you missed.</p><p>If you scored <strong>15–19</strong>, look at where your misses cluster. Are they in phonological awareness? Vocabulary? Comprehension? Spend focused time on that subarea before retesting yourself.</p><p>If you scored <strong>below 15</strong>, work through a complete study guide before taking more practice questions. Our <a href="/blog/foundations-of-reading-mtel">MTEL Foundations of Reading guide</a> covers all four subareas and eleven objectives in detail.</p><p>For a <strong>Foundations of Reading MTEL practice test PDF</strong> version of these 25 questions, enter your email in the form on this page. You\'ll get the same questions with answers and explanations in a printable format for offline study.</p><p>For full-length 100-question practice tests and AI-graded open-response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'What the MTEL 190 Tests',
        html: true,
        content: '<p>These 25 questions map to the three multiple-choice subareas on the MTEL 190:</p><table><thead><tr><th>Subarea</th><th>Weight</th><th>Questions on This Test</th><th>Topics</th></tr></thead><tbody><tr><td>I — Foundations of Reading Development</td><td>35%</td><td>1–11</td><td>Phonological awareness, concepts of print, phonics, syllabication, fluency, ELL transfer</td></tr><tr><td>II — Development of Reading Comprehension</td><td>27%</td><td>12–22</td><td>Phonics patterns, vocabulary tiers, cognates, homographs, main idea, text structures</td></tr><tr><td>III — Reading Assessment and Instruction</td><td>18%</td><td>23–25</td><td>Fluency components, prosody, reader\'s theater, instructional strategies</td></tr></tbody></table><p>The real exam also includes <strong>Subarea IV: Integration of Knowledge and Understanding</strong> (20%) — two open-response assignments where you analyze student assessment data and recommend instructional strategies. Those aren\'t covered in this MC practice test.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>Is there a Foundations of Reading MTEL practice test free online?</h3><p>Yes — you\'re looking at it. The 25 questions above are free to use right now. For a <strong>Foundations of Reading MTEL practice test free</strong> PDF version you can print and study offline, enter your email in the form on this page.</p><h3>Where can I get a Foundations of Reading MTEL practice test PDF free download?</h3><p>Use the email form on this page to get the <strong>Foundations of Reading MTEL practice test PDF free</strong> download. It contains all 25 questions with answers and explanations, formatted for printing.</p><h3>How many questions are on the MTEL Foundations of Reading?</h3><p>The full exam has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. Massachusetts requires a passing score of 240.</p><h3>Is the MTEL 190 the same as the NES 890?</h3><p>The content is identical — same framework, same objectives, same question types. The difference is the test code and registration portal. Massachusetts uses code 190 through mtel.nesinc.com.</p><h3>What topics should I focus on for the MTEL Foundations of Reading?</h3><p>Subarea I (Foundations of Reading Development) is worth 35% — the largest portion. Focus on phonological awareness, phonics, word analysis, and fluency first. Then move to vocabulary and comprehension (27%), and finally assessment and instruction (18%). Don\'t skip the open-response section — it\'s 20% of your total score.</p><h3>Where can I find a Foundations of Reading MTEL practice test PDF with more questions?</h3><p>Our <a href="/#pricing">complete prep program</a> includes full-length 100-question practice tests, a <strong>Foundations of Reading MTEL practice test PDF</strong> for each, plus AI-graded open-response practice and a complete study guide.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-mtel-study-guide',
    title: 'Foundations of Reading MTEL Study Guide (Free PDF Download)',
    metaDescription: 'Free Foundations of Reading MTEL study guide covering all 11 objectives, 4 subareas, and open-response strategies. Download the PDF free.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-mtel-study-guide',
      headline: 'Get the Free MTEL Study Guide PDF',
      subheadline: 'Complete study guide covering all 4 subareas, 11 objectives, key terms, and open-response templates — printable PDF.',
      pdfLabel: 'MTEL Foundations of Reading Study Guide (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading MTEL Study Guide Free',
        html: true,
        content: '<p>This <strong>Foundations of Reading MTEL study guide free</strong> resource breaks down the entire MTEL 190 exam — all four subareas, all eleven objectives, the two open-response assignments, and the key concepts you need to know for each one.</p><p>The MTEL Foundations of Reading (test code 190) has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time and need a 240 to pass. Massachusetts administers the exam through mtel.nesinc.com.</p><p>If you want a printable version of everything on this page, grab the <strong>Foundations of Reading MTEL study guide PDF free</strong> download using the email form on this page. Ready to test yourself first? Take our <a href="/blog/foundations-of-reading-mtel-practice-test"><strong>Foundations of Reading MTEL practice test free</strong></a> — 25 questions with answers.</p>',
      },
      {
        heading: 'MTEL 190 Test Format',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Code</td><td>190 (MTEL)</td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Passing Score</td><td>240</td></tr></tbody></table><p>The exam is split into four subareas. Subareas I–III are multiple-choice (80% of your score). Subarea IV is two open-response assignments (20%). Your <strong>Foundations of Reading study guide PDF</strong> should cover all four — skipping the open-response section makes passing very difficult.</p>',
      },
      {
        heading: 'Subarea Weights at a Glance',
        html: true,
        content: '<table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>20%</td><td>10–11</td><td>2 open-response assignments</td></tr></tbody></table><p>Study time should roughly mirror these weights. Spend the most time on Subarea I — it\'s worth more than a third of the exam by itself.</p>',
      },
      {
        heading: 'Subarea I: Foundations of Reading Development (35%)',
        html: true,
        content: '<p>This is the largest subarea. Four objectives, 43–45 questions. Master this and you\'ve locked in the biggest piece of the test.</p><h3>Objective 1 — Emergent Literacy and Phonological Awareness</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Phonological Awareness</td><td>Hearing and manipulating sound structures — words in sentences, syllables, onset-rime, rhyme</td></tr><tr><td>Phonemic Awareness</td><td>Subset of phonological awareness: individual phonemes only. Skills include isolating, blending, segmenting, deleting, substituting</td></tr><tr><td>Concepts of Print</td><td>Directionality (left to right, top to bottom), word boundaries, punctuation function, print carries meaning</td></tr><tr><td>Alphabetic Principle</td><td>Letters represent sounds in a systematic, predictable way</td></tr><tr><td>Factors Affecting Development</td><td>Prior literacy experiences, disabilities, bilingualism, language proficiency levels</td></tr></tbody></table><h3>Objective 2 — Beginning Reading Skills</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Systematic Phonics</td><td>Explicit, sequenced instruction — not discovered, directly taught</td></tr><tr><td>Decoding Patterns</td><td>CVC (cat), CVCC (lamp), CVCe (make), CVVC (rain) — know all four</td></tr><tr><td>Digraphs vs. Blends</td><td>Digraph = one sound (sh, ch, th). Blend = each letter sounds (bl, str, cr)</td></tr><tr><td>High-Frequency Words</td><td>Taught for automatic recognition — some decodable, some irregular (the, was, said)</td></tr><tr><td>Inflectional Morphemes</td><td>-s, -ed, -er, -est, -ing — taught alongside phonics, don\'t change part of speech</td></tr><tr><td>Encoding-Decoding Link</td><td>Spelling reinforces phonics. Analyze spelling errors to assess phonics knowledge</td></tr></tbody></table><h3>Objective 3 — Word Analysis and Morphemic Analysis</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Morphemes</td><td>Smallest units of meaning: base words, roots, prefixes, suffixes</td></tr><tr><td>Inflectional vs. Derivational</td><td>Inflectional: don\'t change part of speech (-s, -ed, -ing). Derivational: do change it (-tion, -able, -ment)</td></tr><tr><td>Common Prefixes</td><td>un- (not), re- (again), pre- (before) — high utility across texts</td></tr><tr><td>Six Syllable Types</td><td>Closed (cat), open (me), vowel team (rain), CVCe (make), r-controlled (bird), consonant-le (table)</td></tr><tr><td>Cognate Awareness</td><td>Critical for ELL students — Spanish-English cognates (animal, hospital, color)</td></tr></tbody></table><h3>Objective 4 — Reading Fluency</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Three Indicators</td><td>Accuracy, rate, and prosody</td></tr><tr><td>Prosody</td><td>Phrasing, stress, intonation — the bridge between fluency and comprehension</td></tr><tr><td>Automaticity</td><td>Word recognition without conscious effort, developed through repeated reading</td></tr><tr><td>Strategies</td><td>Modeled reading, echo reading, phrase-cued reading, repeated reading, reader\'s theater</td></tr><tr><td>Factors Disrupting Fluency</td><td>Limited phonics knowledge, unfamiliar vocabulary, insufficient background knowledge</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea II: Development of Reading Comprehension (27%)',
        html: true,
        content: '<h3>Objective 5 — Academic Language and Vocabulary Development</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Tier 1 Words</td><td>Everyday words (cat, run, happy) — learned through conversation, low instruction priority</td></tr><tr><td>Tier 2 Words</td><td>Academic words (analyze, significant, contrast) — highest instruction priority, appear across disciplines</td></tr><tr><td>Tier 3 Words</td><td>Domain-specific (photosynthesis, denominator) — teach in context as needed</td></tr><tr><td>Context Clue Types</td><td>Apposition, definition, restatement, contrast, syntax, punctuation</td></tr><tr><td>Word-Learning Strategies</td><td>Morphemic analysis (roots/affixes), etymology (Latin/Greek origins), dictionary/thesaurus use</td></tr><tr><td>Word Consciousness</td><td>Promote curiosity about words — wide reading, semantic mapping, student-friendly definitions</td></tr><tr><td>Idioms and Figurative Language</td><td>Proverbs, common sayings, and disciplinary symbols — teach explicitly, especially for ELLs</td></tr></tbody></table><h3>Objective 6 — Literary Text Comprehension</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Three Comprehension Levels</td><td>Literal (what the text says), inferential (what it implies), evaluative (judging quality, bias, perspective)</td></tr><tr><td>Narrative Elements</td><td>Character, setting, plot, theme, point of view, central message</td></tr><tr><td>Author\'s Craft</td><td>Figurative language, genre characteristics, first-person vs. third-person narration</td></tr><tr><td>Comprehension Strategies</td><td>Think-alouds, close reading, reciprocal teaching (predict, question, clarify, summarize)</td></tr><tr><td>Strategic Reading</td><td>Skimming, scanning, rate adjustment based on purpose — plus rereading, annotating, visualizing</td></tr></tbody></table><h3>Objective 7 — Informational Text Comprehension</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Five Text Structures</td><td>Chronological, compare-contrast, cause-effect, problem-solution, description</td></tr><tr><td>Text Features</td><td>Bold print, captions, indexes, subheadings, menus — teach students to use them</td></tr><tr><td>Disciplinary Literacy</td><td>Same word means different things across subjects (e.g., "factor" in math vs. science vs. social studies)</td></tr><tr><td>Critical Thinking</td><td>Source validity, bias, author\'s purpose, argument development</td></tr><tr><td>Close Reading Components</td><td>Text-dependent questions, annotation, rereading for different meaning levels, cross-text comparisons</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea III: Reading Assessment and Instruction (18%)',
        html: true,
        content: '<h3>Objective 8 — Assessment Principles</h3><table><thead><tr><th>Assessment Type</th><th>Purpose</th><th>When</th></tr></thead><tbody><tr><td>Screening</td><td>Identify at-risk students</td><td>Beginning of year, all students</td></tr><tr><td>Diagnostic</td><td>Pinpoint specific strengths and needs</td><td>After screening flags a concern</td></tr><tr><td>Progress Monitoring</td><td>Track response to instruction</td><td>Ongoing, frequent</td></tr><tr><td>Formative</td><td>Guide daily instructional decisions</td><td>During instruction</td></tr><tr><td>Summative</td><td>Evaluate mastery of standards</td><td>End of unit or year</td></tr></tbody></table><p>Know the difference between criterion-referenced tests (mastery against a standard) and norm-referenced tests (rank against peers). Understand validity, reliability, and testing bias. Be ready for questions on informal assessments: phonics inventories, oral reading fluency measures, spelling inventories, pseudoword assessments, running records, and oral retellings.</p><h3>Objective 9 — Instructional Best Practices</h3><table><thead><tr><th>Concept</th><th>What to Know</th></tr></thead><tbody><tr><td>Five Components</td><td>Phonemic awareness, phonics, fluency, vocabulary, comprehension — instruction must address all five</td></tr><tr><td>MTSS / Tiered Models</td><td>Tier 1: core instruction for all. Tier 2: targeted small-group. Tier 3: intensive individualized</td></tr><tr><td>Text Complexity</td><td>Quantitative (Lexile, word count), qualitative (structure, language), reader-and-task factors</td></tr><tr><td>Close Reading</td><td>Text-dependent questions, annotation, rereading for multiple meaning levels, collaborative conversations</td></tr><tr><td>Differentiation</td><td>Flexible grouping, resource modification, pacing/intensity/complexity adjustments</td></tr><tr><td>Motivation</td><td>Self-confidence, self-efficacy, independent reading at home and in the classroom</td></tr></tbody></table>',
      },
      {
        heading: 'Subarea IV: Open-Response Assignments (20%)',
        html: true,
        content: '<p>Two written assignments, each worth 10% of your score. These are not optional — skipping them makes passing nearly impossible.</p><h3>Objective 10 — Foundational Reading Skills</h3><p>You\'ll analyze student assessment data related to foundational skills (phonemic awareness, phonics, high-frequency word recognition, syllabication, morphemic analysis, automaticity, fluency). Identify specific strengths and needs using evidence from the data, then describe and justify an instructional strategy or intervention.</p><h3>Objective 11 — Reading Comprehension</h3><p>Same format, but focused on comprehension: vocabulary knowledge, academic language, literal/inferential/evaluative comprehension, strategy application, and text analysis skills. Again, identify strengths and needs, then recommend and justify instruction.</p><h3>Open-Response Framework</h3><p>Use this structure for both assignments:</p><table><thead><tr><th>Step</th><th>What to Write</th></tr></thead><tbody><tr><td>1. Identify</td><td>Name 1–2 specific strengths and 1–2 specific needs using evidence from the student data</td></tr><tr><td>2. Explain</td><td>Connect each strength/need to a reading development concept from the exam framework</td></tr><tr><td>3. Recommend</td><td>Describe 2–3 instructional strategies with enough detail to show you know how to implement them</td></tr><tr><td>4. Justify</td><td>Explain why each strategy directly addresses the identified need — use professional terminology</td></tr></tbody></table><p>Professional terms to use naturally: phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding, gradual release of responsibility, decodable text, automaticity, tiered vocabulary instruction.</p>',
      },
      {
        heading: 'Four-Week Study Plan',
        html: true,
        content: '<p>This <strong>Foundations of Reading MTEL study guide PDF</strong> covers the content — here\'s how to structure your study time around it:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Study phonological awareness, phonics, word analysis, fluency. Create flashcards for the six syllable types, digraphs vs. blends, inflectional vs. derivational suffixes.</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Study vocabulary tiers, context clue types, comprehension strategies, text structures. Practice identifying main idea vs. theme in sample passages.</td></tr><tr><td>3</td><td>Subarea III + Written</td><td>Study assessment types and MTSS tiers. Practice open-response assignments using the framework above — write at least 3 full responses.</td></tr><tr><td>4</td><td>Review + Practice Tests</td><td>Take our <a href="/blog/foundations-of-reading-mtel-practice-test"><strong>Foundations of Reading MTEL practice test free</strong></a> under timed conditions. Review missed questions by subarea. Write 2 more open-response practice responses.</td></tr></tbody></table><p>Spend your time proportionally — Subarea I is worth almost twice as much as Subarea III. Don\'t study everything equally.</p><p>For full-length 100-question practice tests, AI-graded open-response practice, and additional study resources, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>Is there a Foundations of Reading MTEL study guide free online?</h3><p>Yes — this page is a complete <strong>Foundations of Reading MTEL study guide free</strong> resource covering all four subareas and eleven objectives. For a printable version, download the <strong>Foundations of Reading MTEL study guide PDF free</strong> using the email form on this page.</p><h3>Where can I download a Foundations of Reading MTEL study guide PDF?</h3><p>Enter your email in the form on this page to get the <strong>Foundations of Reading MTEL study guide PDF</strong> — all subareas, key concepts, and the open-response framework in a printable format.</p><h3>What does the Foundations of Reading study guide PDF cover?</h3><p>A complete <strong>Foundations of Reading study guide PDF</strong> should cover all 11 objectives across 4 subareas: emergent literacy, phonics, word analysis, fluency, vocabulary, literary comprehension, informational text, assessment principles, instructional best practices, and both open-response assignments.</p><h3>How many subareas are on the MTEL 190?</h3><p>Four subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), Reading Assessment and Instruction (18%), and Integration of Knowledge and Understanding (20% — the two open-response assignments).</p><h3>Is there a Foundations of Reading MTEL practice test free?</h3><p>Yes. We have a <a href="/blog/foundations-of-reading-mtel-practice-test"><strong>Foundations of Reading MTEL practice test free</strong></a> with 25 questions covering all three MC subareas plus detailed answer explanations.</p><h3>What score do I need to pass the MTEL Foundations of Reading?</h3><p>Massachusetts requires a passing score of <strong>240</strong> on a 100–300 scale. The exam fee is $139.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-nc',
    title: 'Foundations of Reading NC — North Carolina Requirements, Passing Score, and Study Guide',
    metaDescription: 'Foundations of Reading NC guide: 233 passing score, test format, all 11 objectives, free practice test, and PDF study resources for North Carolina.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-nc-study-sheet',
      headline: 'Get the Free NC Foundations of Reading Study Sheet',
      subheadline: 'All 5 subareas, 11 objectives, NC passing score, key terms, and open-response framework — one printable PDF.',
      pdfLabel: 'NC Foundations of Reading Study Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading NC: What North Carolina Requires',
        html: true,
        content: '<p>North Carolina uses the <a href="/blog/foundations-of-reading-890"><strong>Pearson Foundations of Reading (890)</strong></a> as part of its teacher licensure process. The exam is administered through the National Evaluation Series (NES) and is registered at <a href="https://www.nc.nesinc.com">nc.nesinc.com</a>. You need a <strong>233</strong> to pass.</p><p>The test has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. Both testing center and online proctored options are available.</p><p>This guide covers the full exam breakdown, NC-specific details, and where to find <strong>Foundations of Reading NC questions</strong> to practice with. If you\'re looking for a <strong>Foundations of Reading NC PDF</strong> to study from, download our free study sheet using the form on this page.</p>',
      },
      {
        heading: 'NC Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Registration Portal</td><td><a href="https://www.nc.nesinc.com">nc.nesinc.com</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>NC Passing Score</td><td><strong>233</strong></td></tr><tr><td>Online Proctoring</td><td>Available — monthly one-week testing windows</td></tr><tr><td>Testing Center</td><td>Year-round by appointment at Pearson VUE centers nationwide</td></tr></tbody></table><p>North Carolina\'s passing score of 233 is below the national benchmark of 240 — but the exam is still demanding. Four hours, 100 MC questions, and two written assignments means you need to know the content and manage your time.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<p>NC candidates can take the <strong>Foundations of Reading NC</strong> exam at a testing center or online:</p><table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Pearson VUE testing centers nationwide</td><td>From home or private location</td></tr><tr><td>When</td><td>Year-round by appointment, first-come basis</td><td>Monthly one-week testing windows</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>Restroom breaks permitted (counts toward testing time)</td><td>15-minute optional break between MC and open-response</td></tr><tr><td>MC Section</td><td>Combined with open-response in one 4-hour block</td><td>2 hours 30 minutes for multiple-choice</td></tr><tr><td>Open-Response</td><td>Same 4-hour block</td><td>1 hour 30 minutes after break</td></tr><tr><td>Score Receipt</td><td>Receipt provided at test conclusion</td><td>No completion receipt at test conclusion</td></tr></tbody></table><p>Online proctoring splits the exam into two timed blocks. You get 2.5 hours for the 100 MC questions, then a 15-minute break, then 1.5 hours for the 2 open-response assignments. The test may require an on-screen character selector for inserting special characters in your written responses.</p>',
      },
      {
        heading: 'The Five Subareas and Their Weights',
        html: true,
        content: '<p>The <strong>Foundations of Reading NC</strong> exam covers 11 objectives across 5 subareas. Here\'s the complete breakdown:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Objectives</th><th>Approx. Weight</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>1–4</td><td>35%</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>5–7</td><td>27%</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>8–9</td><td>18%</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10</td><td>10%</td><td>1 open-response</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>11</td><td>10%</td><td>1 open-response</td></tr></tbody></table><p>Subareas I–III are all multiple-choice and account for 80% of your score. Subareas IV and V are the two open-response written assignments, worth 10% each. Any <strong>Foundations of Reading 890 study guide PDF</strong> you use should cover all five.</p>',
      },
      {
        heading: 'What Each Subarea Covers — Objective-by-Objective Breakdown',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>This is the largest section — more than a third of your score. Four objectives:</p><p><strong>Objective 1 — Phonological and Phonemic Awareness.</strong> Know the difference between phonological awareness (syllables, onset-rime, rhyme) and phonemic awareness (individual phonemes). Key tasks: isolation, blending, segmentation, deletion, substitution. Also covers concepts of print, letter knowledge, the alphabetic principle, and differentiation for diverse learners including ELLs and bilingual students.</p><p><strong>Objective 2 — Beginning Reading Skills.</strong> Systematic, explicit phonics instruction. CVC, CVCe, vowel team patterns. Digraphs (one sound: sh, ch) vs. blends (each letter sounds: bl, str). Relationship between oral vocabulary and decoding/encoding. High-frequency words, inflectional morphemes, and the reciprocity between decoding and spelling.</p><p><strong>Objective 3 — Word Analysis.</strong> Morpheme types: bases, roots, inflections, derivational affixes. Six syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le. Orthographic knowledge and automatic word recognition. Cognate awareness for English learners.</p><p><strong>Objective 4 — Reading Fluency.</strong> Three key indicators: accuracy, rate, and prosody. Fluency as the bridge between decoding and comprehension. Automaticity development. Factors that disrupt fluency: limited phonics knowledge, unfamiliar vocabulary, limited background knowledge.</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p><strong>Objective 5 — Academic Language and Vocabulary.</strong> Tiered vocabulary (Tier 1: everyday, Tier 2: academic, Tier 3: domain-specific). Independent word-learning strategies: morphology, etymology, context clues, reference materials. Word consciousness, semantic mapping, idioms, and proverbs.</p><p><strong>Objective 6 — Literary Text Comprehension.</strong> Three levels: literal, inferential, and evaluative. Key ideas, characters, settings. Author\'s craft — figurative language, narrative perspective. Comprehension strategies: predicting, questioning, clarifying, summarizing, annotating, visualizing.</p><p><strong>Objective 7 — Informational Text Comprehension.</strong> Text structures: chronological, compare-contrast, cause-effect, problem-solution. Text features. Disciplinary literacy skills. Note-taking and paraphrasing. Integrating knowledge across multiple sources.</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p><strong>Objective 8 — Assessment.</strong> Five purposes: screening, formative/progress-monitoring, summative, diagnostic, pre/post assessment. Standardized and informal assessments. Interpreting results for instructional decisions. Differentiated assessment for diverse learners.</p><p><strong>Objective 9 — Instructional Best Practices.</strong> Integrated literacy model. Standards-based instruction with differentiation — flexible grouping, modified pacing/intensity/complexity. MTSS/tiered models. Text complexity. Close reading. Motivation. Technology. Supporting ELs, students with disabilities, and advanced learners.</p><h3>Subareas IV and V: Open-Response Assignments (20% total)</h3><p><strong>Objective 10 — Foundational Reading Skills Analysis.</strong> Analyze student assessment data. Identify strengths and needs in phonemic awareness, phonics, high-frequency words, syllabication, morphemic analysis, automaticity, and fluency (accuracy, rate, prosody). Select and justify instructional strategies.</p><p><strong>Objective 11 — Reading Comprehension Analysis.</strong> Analyze comprehension assessment results. Identify strengths and needs in vocabulary knowledge, academic language, grammar/usage, literal/inferential/evaluative comprehension, comprehension strategies, and text analysis. Select and justify instructional interventions.</p>',
      },
      {
        heading: 'How to Prepare for the Foundations of Reading NC',
        html: true,
        content: '<p>NC\'s 233 passing score is achievable with focused preparation. Here\'s a four-week approach:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Study phonological awareness, phonics, word analysis, and fluency. Create flashcards for the six syllable types, digraphs vs. blends, and inflectional vs. derivational suffixes.</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Study vocabulary tiers, context clue types, comprehension strategies, and text structures. Practice identifying main idea vs. theme.</td></tr><tr><td>3</td><td>Subarea III + Written (38%)</td><td>Study assessment types and MTSS. Practice open-response assignments — write at least 3 full responses using the Identify → Explain → Recommend → Justify framework.</td></tr><tr><td>4</td><td>Review + Practice</td><td>Take a <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading NC practice test</strong></a> under timed conditions. Review every miss by subarea. Write 2 more open-response practice responses.</td></tr></tbody></table><p>Spend your time proportionally. Subarea I is worth almost twice as much as Subarea III — don\'t study everything equally.</p>',
      },
      {
        heading: 'Foundations of Reading NC Practice Test and Questions',
        html: true,
        content: '<p>The best way to find out where you stand is to work through real-format <strong>Foundations of Reading NC questions</strong>. Our <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading NC practice test</strong></a> has 25 scenario-based multiple-choice questions covering all three MC subareas, with detailed <strong>Foundations of Reading NC answers</strong> and explanations for every question.</p><p>Want a printable version? Download our <strong>Foundations of Reading practice test PDF</strong> using the email form on this page. It includes the same questions with answers formatted for offline study.</p><p>Since the 890 is a nationally standardized exam, any Foundations of Reading practice materials will prepare you for the NC test. The only NC-specific detail is the passing score: <strong>233</strong>.</p><p>For full-length 100-question practice tests and AI-graded open-response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'Open-Response Strategy',
        html: true,
        content: '<p>The two written assignments are worth 20% of your total score. Many candidates focus exclusively on multiple-choice and then struggle here. Use this framework for both assignments:</p><ul><li><strong>Identify</strong> — Name the specific skill or deficit shown in the student scenario</li><li><strong>Explain</strong> — Connect it to reading development concepts from the exam framework</li><li><strong>Recommend</strong> — Describe 2–3 instructional strategies with enough detail to show you know how to implement them</li><li><strong>Justify</strong> — Explain why those strategies address the identified need</li></ul><p>Objective 10 focuses on foundational skills (phonemic awareness, phonics, fluency, word analysis). Objective 11 focuses on comprehension (vocabulary, text analysis, comprehension strategies). Practice with both types before test day.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What score do I need to pass the Foundations of Reading in North Carolina?</h3><p>North Carolina requires a passing score of <strong>233</strong> on the 100–300 scale. This is below the national benchmark of 240.</p><h3>Where can I find Foundations of Reading NC questions and answers?</h3><p>Our <a href="/blog/foundations-of-reading-890-practice-test">free practice test</a> includes 25 <strong>Foundations of Reading NC questions</strong> with detailed <strong>Foundations of Reading NC answers</strong> and explanations. For a printable version, download the <strong>Foundations of Reading NC PDF</strong> from this page.</p><h3>Is there a Foundations of Reading NC practice test?</h3><p>Yes. We have a free <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading NC practice test</strong></a> with 25 questions covering Subareas I–III. For full-length 100-question tests, see our <a href="/#pricing">complete prep program</a>.</p><h3>Where can I find a Foundations of Reading 890 study guide PDF?</h3><p>Download our free <strong>Foundations of Reading NC PDF</strong> study sheet from this page using the email form. It covers all five subareas, the NC passing score, all 11 objectives, and the open-response framework. For a comprehensive <strong>Foundations of Reading 890 study guide PDF</strong>, see our <a href="/blog/foundations-of-reading-890-study-guide">full study guide</a>.</p><h3>Where do I register for the Foundations of Reading in North Carolina?</h3><p>Register through the NC NES portal at <a href="https://www.nc.nesinc.com">nc.nesinc.com</a>. Both testing center and online proctoring options are available. The fee is $139.</p><h3>Can I take the Foundations of Reading NC exam online?</h3><p>Yes. Online proctoring is available during monthly one-week testing windows. The online appointment is 4 hours and 30 minutes total — 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for the open-response assignments.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-oae',
    title: 'Foundations of Reading OAE — Ohio Requirements, Passing Score, and Free Study Resources',
    metaDescription: 'Foundations of Reading OAE guide: Ohio passing score (220), test format, all 11 objectives, free practice test, and PDF study resources.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-oae-study-sheet',
      headline: 'Get the Free OAE Foundations of Reading Study Sheet',
      subheadline: 'All 4 subareas, 11 objectives, Ohio passing score, key terms, and open-response framework — one printable PDF.',
      pdfLabel: 'OAE Foundations of Reading Study Sheet (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading OAE: What Ohio Requires',
        html: true,
        content: '<p>Ohio uses the <strong>Foundations of Reading OAE</strong> (test code 190) as part of its teacher licensure process. The exam is administered through the Ohio Assessments for Educators program and registered at <a href="https://www.oh.nesinc.com">oh.nesinc.com</a>. You need a <strong>220</strong> to pass — the lowest passing score of any state that uses this exam.</p><p>The test has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. Both testing center and online proctored options are available.</p><p>If you\'re looking for <strong>Foundations of Reading OAE free</strong> study resources, you\'re in the right place. This guide covers the full exam breakdown, and you can download a <strong>Foundations of Reading OAE PDF</strong> study sheet using the form on this page.</p>',
      },
      {
        heading: 'OAE Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>190 (OAE)</td></tr><tr><td>Registration Portal</td><td><a href="https://www.oh.nesinc.com">oh.nesinc.com</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Ohio Passing Score</td><td><strong>220</strong></td></tr><tr><td>Online Proctoring</td><td>Available — monthly one-week testing windows</td></tr><tr><td>Testing Center</td><td>Year-round by appointment at sites throughout Ohio and nationwide</td></tr></tbody></table><p>Ohio\'s passing score of <strong>220</strong> is 20 points below the national benchmark of 240. That gives you more margin than most states, but the exam itself is still rigorous — 100 MC questions, 2 written assignments, and 4 hours of testing.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<p>Ohio candidates can take the <strong>Foundations of Reading OAE</strong> at a testing center or through online proctoring:</p><table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Testing centers throughout Ohio and nationwide</td><td>From home or private location</td></tr><tr><td>When</td><td>Year-round by appointment, first-come basis</td><td>Monthly one-week testing windows</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>Restroom breaks permitted (counts toward testing time)</td><td>15-minute optional break between MC and open-response</td></tr><tr><td>MC Section</td><td>Combined with open-response in one 4-hour block</td><td>2 hours 30 minutes for multiple-choice</td></tr><tr><td>Open-Response</td><td>Same 4-hour block</td><td>1 hour 30 minutes after break</td></tr><tr><td>Score Receipt</td><td>Receipt provided at test conclusion</td><td>No completion receipt at test conclusion</td></tr></tbody></table><p>If you choose online proctoring, note that once the 15-minute break ends, you will no longer have access to the multiple-choice questions. Plan your time accordingly.</p>',
      },
      {
        heading: 'The Four Subareas and Their Weights',
        html: true,
        content: '<p>The OAE Foundations of Reading covers 11 objectives across 4 subareas:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Objectives</th><th>Approx. Weight</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>1–4</td><td>35%</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>5–7</td><td>27%</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>8–9</td><td>18%</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>10–11</td><td>20%</td><td>2 open-response assignments</td></tr></tbody></table><p>Subareas I–III are all multiple-choice and account for 80% of your score. Subarea IV is the two written assignments at 20%. Any <strong>Foundations of Reading OAE PDF</strong> study resource you use should cover all four.</p>',
      },
      {
        heading: 'What Each Subarea Covers — Objective-by-Objective',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>The largest section — more than a third of your score.</p><p><strong>Objective 1 — Phonological and Phonemic Awareness.</strong> The phonological awareness continuum (word → syllable → onset-rime → phoneme). Phonemic awareness tasks: isolation, blending, segmentation, deletion, substitution. Concepts of print, letter knowledge, the alphabetic principle, letter-sound correspondence, and oral language integration. Differentiated instruction for diverse learners.</p><p><strong>Objective 2 — Beginning Reading Skills.</strong> Systematic, explicit phonics instruction. Sequencing by complexity. CVC, CVCe, vowel team patterns. Terminology: digraphs, blends, diphthongs. High-frequency words, inflectional morphemes, semantic and syntactic cueing. The reciprocity between decoding and encoding (spelling reinforces phonics).</p><p><strong>Objective 3 — Word Analysis.</strong> Morpheme types: bases, roots, inflectional affixes (don\'t change part of speech), derivational affixes (change part of speech). Prefix and suffix instruction. Orthographic knowledge and automatic word recognition. Six syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le. Cognate awareness for English learners.</p><p><strong>Objective 4 — Reading Fluency.</strong> Three key indicators: accuracy, rate, and prosody. Fluency as the bridge between decoding and comprehension. Automaticity development. Factors that disrupt fluency: limited phonics knowledge, unfamiliar vocabulary, limited background knowledge. Evidence-based fluency strategies for different learner needs.</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p><strong>Objective 5 — Academic Language and Vocabulary.</strong> Oral-written vocabulary connections. Word consciousness. Independent word-learning strategies: morphology, etymology, context clues, reference materials. Tiered vocabulary (Tier 1: everyday, Tier 2: academic, Tier 3: domain-specific). Idioms, proverbs, and discipline-specific language.</p><p><strong>Objective 6 — Literary Text Comprehension.</strong> Three levels: literal, inferential, and evaluative. Character, setting, and plot analysis. Author\'s craft — figurative language, narrative perspective. Cross-text comparison. Comprehension strategies: predicting, questioning, summarizing, clarifying, annotating, visualizing.</p><p><strong>Objective 7 — Informational Text Comprehension.</strong> Text structures: chronological, compare-contrast, cause-effect, problem-solution. Text features. Author\'s purpose and point of view. Primary and secondary source comparison. Disciplinary literacy skills.</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p><strong>Objective 8 — Assessment.</strong> Assessment purposes: screening, formative/progress-monitoring, summative, diagnostic. Standardized and informal assessments. Code-based and meaning-based measures. Data interpretation for instructional adjustment. Differentiated assessment for diverse learners.</p><p><strong>Objective 9 — Instructional Best Practices.</strong> Major reading components (phonemic awareness, phonics, fluency, vocabulary, comprehension). Integrated literacy model. Standards-based instruction with differentiation. MTSS/tiered support models. Text complexity evaluation. Close reading. Motivation strategies. Technology integration.</p><h3>Subarea IV: Integration of Knowledge and Understanding (20%)</h3><p><strong>Objective 10 — Foundational Skills Analysis.</strong> Analyze student assessment data for foundational reading skills. Identify strengths and needs in phonemic awareness, phonics, high-frequency words, syllabication, morphemic analysis, automaticity, and fluency. Select and justify instructional strategies.</p><p><strong>Objective 11 — Reading Comprehension Analysis.</strong> Analyze comprehension assessment results. Identify strengths and needs in vocabulary, academic language, comprehension skills, and text analysis. Recommend and justify targeted interventions.</p>',
      },
      {
        heading: 'How to Prepare for the Foundations of Reading OAE',
        html: true,
        content: '<p>Ohio\'s 220 passing score is the most approachable threshold among states that require this exam — but that doesn\'t mean you can wing it. Here\'s a focused study plan:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Study phonological awareness, phonics, word analysis, and fluency. Create flashcards for the six syllable types, digraphs vs. blends, and inflectional vs. derivational affixes.</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Study vocabulary tiers, context clue types, comprehension strategies, and text structures. Practice identifying main idea vs. theme.</td></tr><tr><td>3</td><td>Subarea III + Written (38%)</td><td>Study assessment types and MTSS. Practice open-response assignments — write at least 3 full responses using the Identify → Explain → Recommend → Justify framework.</td></tr><tr><td>4</td><td>Review + Practice</td><td>Take an <a href="/blog/190-foundations-of-reading-practice-test"><strong>OAE Foundations of Reading practice test free</strong></a> under timed conditions. Review every miss by subarea. Write 2 more open-response practice responses.</td></tr></tbody></table><p>Spend your time proportionally. Subarea I is worth almost twice as much as Subarea III — don\'t study everything equally.</p>',
      },
      {
        heading: 'OAE Foundations of Reading Practice Test Free',
        html: true,
        content: '<p>The best way to gauge your readiness is to work through exam-format questions. Our <a href="/blog/190-foundations-of-reading-practice-test"><strong>Foundations of Reading OAE practice test</strong></a> has 25 scenario-based multiple-choice questions covering all three MC subareas, with detailed answer explanations for every question.</p><p>Want a printable version? Download our <strong>Foundations of Reading practice test PDF</strong> using the email form on this page. It includes the same questions with answers formatted for offline study.</p><p>Since the OAE 190 uses the same content framework as the NES Foundations of Reading used in other states, any Foundations of Reading practice materials will prepare you for the Ohio exam. The only Ohio-specific detail is the passing score: <strong>220</strong>.</p><p>For full-length 100-question practice tests and AI-graded open-response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'Open-Response Strategy',
        html: true,
        content: '<p>The two written assignments in Subarea IV are worth 20% of your total score. Skipping them makes passing nearly impossible — even with Ohio\'s lower threshold. Use this framework for both:</p><ul><li><strong>Identify</strong> — Name the specific skill or deficit shown in the student scenario</li><li><strong>Explain</strong> — Connect it to reading development concepts from the exam framework</li><li><strong>Recommend</strong> — Describe 2–3 instructional strategies with enough detail to show implementation knowledge</li><li><strong>Justify</strong> — Explain why those strategies address the identified need</li></ul><p>Objective 10 focuses on foundational skills (phonemic awareness, phonics, fluency, word analysis). Objective 11 focuses on comprehension (vocabulary, text analysis, comprehension strategies). Practice with both types before test day.</p>',
      },
      {
        heading: 'OAE Foundations of Reading Pass Rate',
        html: true,
        content: '<p>Many candidates search for the <strong>OAE Foundations of Reading pass rate</strong> before deciding how to study. Ohio does not publish a pass rate for the Foundations of Reading 190. What we do know: Ohio\'s passing score of 220 is the lowest among all states that require this exam. The national benchmark is 240, and most states set their cutoff at or near that mark.</p><p>A lower passing score doesn\'t mean you should prepare less — it means you have more margin for the questions you find hardest. Use that margin strategically: get Subarea I locked down (35% of the exam), and the math works in your favor.</p><p>The best predictor of your personal pass rate isn\'t a statewide statistic. It\'s your practice test score. Take our <a href="/blog/190-foundations-of-reading-practice-test"><strong>Foundations of Reading OAE practice test</strong></a> to see where you stand right now.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What score do I need to pass the OAE Foundations of Reading?</h3><p>Ohio requires a passing score of <strong>220</strong> on the 100–300 scale. This is the lowest passing score among all states that use this exam.</p><h3>Is there a Foundations of Reading OAE practice test free online?</h3><p>Yes. We have a <a href="/blog/190-foundations-of-reading-practice-test"><strong>Foundations of Reading OAE practice test</strong></a> with 25 scenario-based questions covering all three MC subareas, plus detailed answer explanations. For full-length 100-question tests, see our <a href="/#pricing">complete prep program</a>.</p><h3>Where can I find Foundations of Reading OAE free study resources?</h3><p>Download our <strong>Foundations of Reading OAE free</strong> study sheet using the email form on this page. It covers all four subareas, the Ohio passing score, all 11 objectives, and the open-response framework. You can also take our <a href="/blog/190-foundations-of-reading-practice-test">free practice test</a> right now.</p><h3>What is the OAE Foundations of Reading pass rate?</h3><p>Ohio does not publish the <strong>OAE Foundations of Reading pass rate</strong>. However, Ohio\'s 220 passing score is 20 points below the 240 national benchmark — the lowest threshold of any state requiring this exam.</p><h3>Where do I register for the OAE Foundations of Reading?</h3><p>Register through the Ohio Assessments for Educators portal at <a href="https://www.oh.nesinc.com">oh.nesinc.com</a>. Both testing center and online proctoring options are available. The fee is $139.</p><h3>Can I take the OAE Foundations of Reading online?</h3><p>Yes. Online proctoring is available during monthly one-week testing windows. The online appointment is 4 hours and 30 minutes total — 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for the open-response assignments. Once the break ends, you cannot go back to the MC section.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-test-mississippi',
    title: 'Foundations of Reading Test Mississippi — Complete Guide (2026)',
    metaDescription: 'Foundations of Reading test Mississippi: passing score 233, format, subareas, license types, free practice test, and study PDF download.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-mississippi-test-guide',
      headline: 'Get the Free Mississippi FORT Test Guide',
      subheadline: 'MS passing score (233), test format, license types, all five subareas, and open-response framework — printable PDF.',
      pdfLabel: 'Mississippi FORT Test Guide (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading Test Mississippi: Who Needs It and Why',
        html: true,
        content: '<p>The <strong>Foundations of Reading test Mississippi</strong> is required for initial elementary education licensure in the state. Mississippi mandates the <a href="/blog/foundations-of-reading-890">Foundations of Reading (890)</a> exam — administered through the <a href="https://www.nestest.com/state/ms">National Evaluation Series in Mississippi</a> portal.</p><p>Effective July 1, 2016, Mississippi law (Miss. Code Ann. § 37-3-2) requires teacher candidates to earn a passing score on a rigorous test of scientifically research-based reading instruction, intervention, and data-based decision-making principles. The purpose is to ensure each licensed educator has the subject matter knowledge essential for entry-level teaching.</p><p>If you\'re looking for a <strong>Foundations of Reading test Mississippi PDF</strong> to study from, download our free study guide using the form on this page. Want to jump straight into questions? Take our <a href="/blog/foundations-of-reading-practice-test"><strong>Foundations of Reading test Mississippi practice test</strong></a> — free, with detailed answers.</p>',
      },
      {
        heading: 'Mississippi Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Registration Portal</td><td><a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response item assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Mississippi Passing Score</td><td><strong>233</strong></td></tr><tr><td>National Benchmark</td><td>240</td></tr><tr><td>Online Proctoring</td><td>Available</td></tr></tbody></table><p>Mississippi\'s passing score of <strong>233</strong> is below the national benchmark of 240. That gives you slightly more margin, but the exam is still rigorous — 100 scenario-based MC questions plus two written assignments in 4 hours.</p>',
      },
      {
        heading: 'Mississippi License Types That Require the 890',
        html: true,
        content: '<p>The <strong>Mississippi Foundations of Reading</strong> requirement applies to these license types:</p><table><thead><tr><th>License Type</th><th>Required Since</th></tr></thead><tbody><tr><td>Elementary Education K–6</td><td>July 1, 2016</td></tr><tr><td>Elementary Education K–3</td><td>July 1, 2016</td></tr><tr><td>Elementary Education 4–6</td><td>July 1, 2016</td></tr><tr><td>Special Education Mild to Moderate K–12</td><td>January 1, 2023</td></tr></tbody></table><p>This exam is required <em>in addition to</em> all other testing requirements for your license type. Contact the Mississippi Department of Education if you\'re unsure whether your specific pathway requires it.</p>',
      },
      {
        heading: 'The Five Subareas and Their Weights',
        html: true,
        content: '<p>Your <strong>Foundations of Reading test Mississippi PDF</strong> study guide should cover all five subareas. Here\'s how the exam breaks down:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>Multiple-choice</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>Multiple-choice</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>Multiple-choice</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10%</td><td>10</td><td>1 open-response</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>10%</td><td>11</td><td>1 open-response</td></tr></tbody></table><p>Subareas I–III are all multiple-choice and account for 80% of your score. Subareas IV and V are the two written assignments, worth 10% each. Skipping either written assignment makes hitting 233 extremely difficult.</p>',
      },
      {
        heading: 'What Each Subarea Covers',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>Four objectives covering phonological and phonemic awareness, concepts of print, the alphabetic principle, systematic phonics instruction (CVC, CVCe, vowel teams, digraphs vs. blends), high-frequency words, word analysis and morphemic analysis (prefixes, suffixes, six syllable types), and reading fluency (accuracy, rate, prosody). This is the largest section — master it and you\'ve locked in more than a third of the exam.</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p>Three objectives on academic language and vocabulary development (tiered vocabulary, context clues, morphemic analysis for unknown words), literary text comprehension (literal, inferential, and evaluative levels; narrative elements; author\'s craft), and informational text comprehension (text structures, text features, disciplinary literacy, critical thinking about sources).</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p>Two objectives covering assessment principles (screening, diagnostic, progress monitoring, formative, summative; criterion-referenced vs. norm-referenced tests; informal assessments) and instructional best practices (five components of reading, MTSS/tiered models, text complexity, close reading, differentiation for diverse learners).</p><h3>Subareas IV and V: Open-Response Assignments (20%)</h3><p>Two written assignments. Subarea IV asks you to analyze student assessment data for foundational reading skills and recommend instructional strategies. Subarea V does the same for reading comprehension. Both require evidence-based reasoning — identify strengths and needs, describe strategies, justify your choices.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online Proctoring',
        html: true,
        content: '<table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Testing centers in MS and nationwide</td><td>From home or private location</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>No scheduled break</td><td>15-minute break between MC and open-response</td></tr></tbody></table><p>Both options cover the same content: 100 multiple-choice questions and 2 open-response item assignments in 4 hours of testing time. Register at <a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a>.</p>',
      },
      {
        heading: 'Free Foundations of Reading Test Mississippi Resources',
        html: true,
        content: '<p>Looking for <strong>free Foundations of Reading test Mississippi</strong> study resources? Here\'s what we offer:</p><ul><li><strong>Free practice test:</strong> Our <a href="/blog/foundations-of-reading-practice-test"><strong>Foundations of Reading test Mississippi practice test</strong></a> has 25 scenario-based questions covering all three MC subareas. Every question includes a detailed explanation — so you get the <strong>Foundations of Reading test Mississippi answers</strong> plus the reasoning behind each one.</li><li><strong>Free study guide PDF:</strong> Download our <strong>Foundations of Reading practice test PDF</strong> using the email form on this page. It covers all five subareas, the Mississippi passing score, and open-response templates.</li><li><strong>Full prep program:</strong> For 100-question practice tests, AI-graded open-response practice, and a complete study guide, see our <a href="/#pricing">prep packages</a>.</li></ul><p>Since the Foundations of Reading 890 uses the same content across all states, any prep materials for the 890 or 190 will prepare you for Mississippi\'s exam. The only difference is the passing score — Mississippi requires 233 instead of the 240 national benchmark.</p>',
      },
      {
        heading: 'How to Prepare for Mississippi\'s 233 Passing Score',
        html: true,
        content: '<p>Mississippi\'s 233 cutoff is 7 points below the national benchmark of 240. That margin matters — it means you can afford to miss slightly more questions than candidates in states like Connecticut or North Carolina (which require 240). But the exam is still 4 hours of dense reading pedagogy, so you need a plan.</p><p><strong>Step 1: Focus on Subarea I.</strong> At 35%, it\'s the single biggest lever. Nail phonological awareness, phonics patterns, syllable types, and fluency — and you\'re a third of the way to 233.</p><p><strong>Step 2: Don\'t skip the written assignments.</strong> Subareas IV and V are 20% combined. Many candidates over-focus on multiple-choice and run out of time or ideas on the open-response sections. Practice at least 3–4 written responses before test day.</p><p><strong>Step 3: Take a timed practice test.</strong> Pace yourself at roughly 80 seconds per MC question. Save at least 45 minutes for each written assignment. Our <a href="/blog/foundations-of-reading-practice-test">free practice test</a> is a good starting point.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What score do I need to pass the Foundations of Reading test in Mississippi?</h3><p>Mississippi requires a passing score of <strong>233</strong> on the 100–300 scale. The national benchmark is 240, so Mississippi\'s cutoff is 7 points lower.</p><h3>Is there a free Foundations of Reading test Mississippi practice test?</h3><p>Yes. We have a <a href="/blog/foundations-of-reading-practice-test"><strong>Foundations of Reading test Mississippi practice test</strong></a> with 25 questions covering all three MC subareas. Every question includes <strong>Foundations of Reading test Mississippi answers</strong> with detailed explanations. It\'s completely free.</p><h3>Where can I find a Foundations of Reading test Mississippi PDF?</h3><p>Download our free <strong>Foundations of Reading test Mississippi PDF</strong> study guide using the email form on this page. It includes all five subareas, the MS passing score, objective breakdowns, and open-response templates. For a practice question PDF, grab our <strong>Foundations of Reading practice test PDF</strong> from our <a href="/blog/foundations-of-reading-practice-test">practice test page</a>.</p><h3>Do special education teachers in Mississippi need the Foundations of Reading?</h3><p>Yes. Effective January 1, 2023, the <strong>Mississippi Foundations of Reading</strong> exam is required for the Special Education Mild to Moderate (K–12) license type, in addition to all other testing requirements.</p><h3>Where do I register for the Mississippi Foundations of Reading exam?</h3><p>Register through the National Evaluation Series Mississippi portal at <a href="https://www.nestest.com/state/ms">nestest.com/state/ms</a>. Both testing center and online proctoring options are available.</p><h3>Can I take the Foundations of Reading test Mississippi online?</h3><p>Yes. Online proctoring is available. The online appointment is 4 hours and 30 minutes total, which includes a 15-minute tutorial/NDA and a 15-minute break between the multiple-choice and open-response sections.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-test-wisconsin',
    title: 'Foundations of Reading Test Wisconsin — FORT Exam Guide, Practice Test, and Free PDF',
    metaDescription: 'Foundations of Reading test Wisconsin (FORT): passing score 240, format, subareas, free practice test, and PDF study guide for WI candidates.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-wisconsin-exam-guide',
      headline: 'Get the Free Wisconsin FORT Exam Guide',
      subheadline: 'WI passing score (240), test format, 190 vs 890 transition, all five subareas, and open-response framework — printable PDF.',
      pdfLabel: 'Wisconsin FORT Exam Guide (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading Test Wisconsin: Who Needs the FORT?',
        html: true,
        content: '<p>Wisconsin calls it the <strong>FORT</strong> — the Foundations of Reading Test. It\'s required under Wisconsin State Statute §118.19(14), and if you\'re applying for any of the following licenses, you need to pass it before the Wisconsin Department of Public Instruction (DPI) will issue your credential:</p><ul><li>Initial K–5 elementary teacher (elementary/middle K–9 license)</li><li>Initial reading teacher</li><li>Initial reading specialist</li></ul><p>If you\'re pursuing a <strong>special education license</strong>, Wisconsin gives you a choice: pass the FORT, or complete a DPI-approved course of study that demonstrates knowledge and skill in the teaching of reading.</p><p>This requirement has been in effect since <strong>January 31, 2014</strong>. If you\'re looking for a <strong>Foundations of Reading test Wisconsin PDF</strong> to start studying, download our free guide using the form on this page.</p>',
      },
      {
        heading: 'Big Change: Wisconsin Moves to Test Code 890',
        html: true,
        content: '<p>Wisconsin has adopted the updated Foundations of Reading Test — <strong>test code 890</strong>. Registration for the 890 opens <strong>August 28, 2025</strong>, and test-takers can begin sitting for the 890 version on <strong>September 1, 2025</strong>.</p><p>Here\'s the good news: <strong>passing scores from the 090, 190, and 890 versions of the FORT are all accepted</strong> by the Wisconsin DPI. If you already passed an older version, your score still counts. If you\'re testing for the first time after September 2025, you\'ll take the 890.</p><table><thead><tr><th>Test Version</th><th>Status</th><th>Score Accepted by WI DPI?</th></tr></thead><tbody><tr><td>090</td><td>Retired</td><td>Yes</td></tr><tr><td>190</td><td>Being phased out</td><td>Yes</td></tr><tr><td>890</td><td>Available September 1, 2025</td><td>Yes</td></tr></tbody></table>',
      },
      {
        heading: 'Wisconsin FORT at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Wisconsin Foundations of Reading Test (FORT)</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Required By</td><td>Wisconsin State Statute §118.19(14)</td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Passing Score</td><td><strong>240</strong> (national benchmark)</td></tr><tr><td>Online Proctoring</td><td>Available</td></tr></tbody></table><p>The 15-minute tutorial and nondisclosure agreement happen before your 4-hour testing clock starts. If you choose online proctoring, the exam splits into two timed blocks: 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for the written assignments.</p>',
      },
      {
        heading: 'The Five Subareas — Where Your Score Comes From',
        html: true,
        content: '<p>Your <strong>Wisconsin Foundations of Reading test study guide</strong> needs to cover all five subareas. Here\'s the weight each one carries:</p><table><thead><tr><th>Subarea</th><th>Name</th><th>Objectives</th><th>Weight</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>1–4</td><td>35%</td><td>Multiple-choice</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>5–7</td><td>27%</td><td>Multiple-choice</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>8–9</td><td>18%</td><td>Multiple-choice</td></tr><tr><td>IV</td><td>Foundational Reading Skills</td><td>10</td><td>10%</td><td>1 open-response</td></tr><tr><td>V</td><td>Reading Comprehension</td><td>11</td><td>10%</td><td>1 open-response</td></tr></tbody></table><p>Subareas I–III are all multiple-choice and make up <strong>80%</strong> of your score. Subareas IV and V are the two written assignments — 10% each, 20% total. Skip them and you\'re almost certainly not hitting 240.</p>',
      },
      {
        heading: 'What You Need to Know for Each Subarea',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>The single biggest piece of the exam. Four objectives covering:</p><ul><li><strong>Phonological and phonemic awareness</strong> — the continuum from word-level to phoneme-level. Tasks: isolation, blending, segmentation, deletion, substitution. Concepts of print, letter knowledge, the alphabetic principle.</li><li><strong>Beginning reading skills</strong> — systematic explicit phonics. CVC → CVCe → vowel teams. Digraphs (one sound: sh, ch) vs. blends (each letter sounds: bl, str). High-frequency words. The reciprocity between decoding and encoding.</li><li><strong>Word analysis</strong> — morphemes (bases, roots, inflectional vs. derivational affixes). Six syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le. Cognate awareness for English learners.</li><li><strong>Reading fluency</strong> — accuracy, rate, and prosody. Automaticity. Fluency as the bridge between decoding and comprehension.</li></ul><h3>Subarea II: Development of Reading Comprehension (27%)</h3><ul><li><strong>Vocabulary development</strong> — tiered vocabulary (Tier 1: everyday, Tier 2: academic, Tier 3: domain-specific). Context clues, morphology, etymology. Semantic mapping, idioms, word consciousness.</li><li><strong>Literary text comprehension</strong> — literal, inferential, and evaluative levels. Character, setting, plot analysis. Figurative language. Comprehension strategies: predicting, questioning, summarizing, visualizing.</li><li><strong>Informational text comprehension</strong> — text structures (chronological, compare-contrast, cause-effect, problem-solution). Text features. Disciplinary literacy. Cross-source integration.</li></ul><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><ul><li><strong>Assessment</strong> — screening, formative/progress-monitoring, summative, diagnostic. Standardized vs. informal. Data interpretation for instructional decisions.</li><li><strong>Instruction</strong> — integrated literacy model. MTSS/tiered intervention. Text complexity. Close reading. Differentiation for ELs, students with disabilities, and advanced learners.</li></ul><h3>Subareas IV and V: Open-Response (20% total)</h3><p>Two written assignments. Objective 10 gives you student data on foundational reading skills — you analyze strengths, identify needs, and recommend instructional strategies. Objective 11 does the same for comprehension. Both require evidence-based reasoning.</p>',
      },
      {
        heading: 'Foundations of Reading Test Wisconsin Practice Test',
        html: true,
        content: '<p>Studying content is half the battle. The other half is practicing with exam-format questions. Our <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading test Wisconsin practice test</strong></a> gives you 25 scenario-based multiple-choice questions — the same format you\'ll see on test day — covering all three MC subareas.</p><p>Every question comes with detailed <strong>Foundations of Reading test Wisconsin answers</strong> explaining not just what\'s correct, but <em>why</em> each distractor is wrong. That\'s where the real learning happens.</p><p>Here\'s how to use it:</p><ol><li><strong>Take it cold</strong> — no studying first. This gives you an honest baseline.</li><li><strong>Score yourself</strong> — note which subarea each miss falls in.</li><li><strong>Study the gaps</strong> — if 4 out of 5 misses are in Subarea I, that\'s where your time goes.</li><li><strong>Retake after studying</strong> — track your improvement.</li></ol><p>Want a printable version? Download our <strong>Foundations of Reading practice test PDF</strong> using the email form on this page.</p><p>For full-length 100-question practice tests and AI-graded open-response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'Free Foundations of Reading Test Wisconsin Resources',
        html: true,
        content: '<p>You don\'t need to spend hundreds of dollars before you even know where you stand. Here\'s what\'s available <strong>free Foundations of Reading test Wisconsin</strong> right now:</p><table><thead><tr><th>Resource</th><th>What You Get</th><th>Where</th></tr></thead><tbody><tr><td>Practice Test (25 questions)</td><td>Scenario-based MC questions with detailed answer explanations</td><td><a href="/blog/foundations-of-reading-890-practice-test">Free practice test</a></td></tr><tr><td>Wisconsin FORT Study Guide PDF</td><td>All 5 subareas, 11 objectives, key terms, open-response templates</td><td>Email form on this page</td></tr><tr><td>This Guide</td><td>Complete exam breakdown, study plan, and FAQ</td><td>You\'re reading it</td></tr></tbody></table><p>Start with the practice test to find your baseline, download the study guide PDF to build your knowledge, then come back for more practice. If you need more depth — full-length tests, AI-graded written responses, and a complete study guide — our <a href="/#pricing">prep packages</a> have you covered.</p>',
      },
      {
        heading: 'Open-Response Game Plan',
        html: true,
        content: '<p>The two written assignments are worth 20% of your total score. At a 240 passing threshold, you can\'t afford to leave points on the table here. Use this four-step framework:</p><ol><li><strong>Identify</strong> — Read the student scenario carefully. Name the specific reading skill or gap the data reveals.</li><li><strong>Explain</strong> — Connect it to reading development theory. Why does this matter? What does it tell you about where this student is on the developmental continuum?</li><li><strong>Recommend</strong> — Describe 2–3 instructional strategies. Be specific enough to show you know how to implement them — not just "use guided reading" but what you\'d do, with what materials, targeting what skill.</li><li><strong>Justify</strong> — Explain why each strategy addresses the identified need. Close the loop between diagnosis and treatment.</li></ol><p>Objective 10 focuses on foundational skills (phonemic awareness, phonics, fluency, word analysis). Objective 11 focuses on comprehension (vocabulary, text analysis, comprehension strategies). Practice at least two responses for each before test day.</p>',
      },
      {
        heading: 'Four-Week Wisconsin FORT Study Plan',
        html: true,
        content: '<p>Here\'s a week-by-week breakdown that matches your study time to the exam weights:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Study phonological awareness, phonics patterns, word analysis, and fluency. Make flashcards for the six syllable types, digraphs vs. blends, inflectional vs. derivational affixes. Take the <a href="/blog/foundations-of-reading-890-practice-test">free practice test</a> cold for a baseline.</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Study vocabulary tiers, context clue types, comprehension strategies, and text structures. Practice distinguishing main idea from theme. Review <strong>Foundations of Reading test Wisconsin questions</strong> you missed in week 1.</td></tr><tr><td>3</td><td>Subarea III + Written (38%)</td><td>Study assessment types (screening, diagnostic, formative, summative) and MTSS. Write 3–4 practice open-response answers using the framework above.</td></tr><tr><td>4</td><td>Full Review</td><td>Retake the practice test under timed conditions. Review every miss. Write 2 more open-response practice pieces. Focus remaining time on your weakest subarea.</td></tr></tbody></table>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What score do I need to pass the Foundations of Reading test in Wisconsin?</h3><p>Wisconsin requires the <strong>national benchmark score of 240</strong> on the 100–300 scale.</p><h3>Is there a free Foundations of Reading test Wisconsin practice test?</h3><p>Yes. We have a <a href="/blog/foundations-of-reading-890-practice-test"><strong>Foundations of Reading test Wisconsin practice test</strong></a> with 25 questions covering all three MC subareas. Every question includes detailed <strong>Foundations of Reading test Wisconsin answers</strong>. It\'s completely free.</p><h3>Where can I download a Foundations of Reading test Wisconsin PDF?</h3><p>Use the email form on this page to get our free <strong>Foundations of Reading test Wisconsin PDF</strong> study guide. It covers all five subareas, the WI passing score, all 11 objectives, and open-response templates.</p><h3>What test code does Wisconsin use for the FORT?</h3><p>Wisconsin has adopted <strong>test code 890</strong>. Registration opens August 28, 2025, and testing begins September 1, 2025. Passing scores from the older 090 and 190 versions are also still accepted by the Wisconsin DPI.</p><h3>Do special education teachers in Wisconsin need the FORT?</h3><p>Wisconsin gives special education candidates a choice: pass the FORT, or complete a DPI-approved course of study that demonstrates knowledge and skill in the teaching of reading.</p><h3>Is the Wisconsin Foundations of Reading test the same as the NES 890?</h3><p>Yes. Wisconsin uses the Foundations of Reading 890, which is part of the National Evaluation Series. The test content — 100 MC questions, 2 open-response assignments, 4 hours, scored 100–300 — is the same nationwide. Wisconsin\'s passing score is 240.</p>',
      },
    ],
  },
  {
    slug: 'foundations-of-reading-utah',
    title: 'Foundations of Reading Utah — Passing Score, Practice Test, and Study Guide',
    metaDescription: 'Foundations of Reading Utah guide: 240 passing score, test format, subareas, free practice test, and downloadable PDF study resources.',
    publishedAt: '2026-04-08',
    optin: {
      pdfSlug: 'fort-utah-study-guide',
      headline: 'Get the Free Utah Foundations of Reading Study Guide',
      subheadline: 'Printable PDF with all 4 subareas, 11 objectives, UT passing score, key concept tables, and open-response templates.',
      pdfLabel: 'Utah Foundations of Reading Study Guide (PDF)',
    },
    sections: [
      {
        heading: 'Foundations of Reading Utah: What You Need to Know',
        html: true,
        content: '<p>Utah requires the <strong>Foundations of Reading (890)</strong> exam for teacher licensure. The test is administered through the <a href="https://www.ut.nesinc.com/TestView.aspx?f=HTML_FRAG/NT890_TestPage.html">Utah NES portal</a> and has a passing score of <strong>240</strong> — the national benchmark.</p><p>The exam has 100 multiple-choice questions and 2 open-response written assignments. You get 4 hours of testing time. It covers phonological awareness, phonics, vocabulary, comprehension, fluency, assessment, and instructional best practices.</p><p>This guide covers the full exam breakdown for Utah candidates, including where to find <strong>Foundations of Reading Utah questions</strong> for practice, how the subareas are weighted, and what the <strong>Utah Foundations of Reading passing score</strong> means for your study plan. If you want a printable version, grab our <strong>Foundations of Reading Utah PDF</strong> study guide using the form on this page.</p>',
      },
      {
        heading: 'Utah Test at a Glance',
        html: true,
        content: '<table><thead><tr><th>Detail</th><th>Information</th></tr></thead><tbody><tr><td>Test Name</td><td>Foundations of Reading</td></tr><tr><td>Test Code</td><td>890</td></tr><tr><td>Registration Portal</td><td><a href="https://www.ut.nesinc.com/TestView.aspx?f=HTML_FRAG/NT890_TestPage.html">ut.nesinc.com</a></td></tr><tr><td>Format</td><td>100 multiple-choice questions + 2 open-response written assignments</td></tr><tr><td>Testing Time</td><td>4 hours</td></tr><tr><td>Total Appointment (Testing Center)</td><td>4 hours 15 minutes (includes 15-min tutorial + NDA)</td></tr><tr><td>Total Appointment (Online Proctored)</td><td>4 hours 30 minutes (includes 15-min tutorial/NDA + 15-min break)</td></tr><tr><td>Fee</td><td>$139</td></tr><tr><td>Utah Passing Score</td><td><strong>240</strong></td></tr><tr><td>Online Proctoring</td><td>Available — monthly one-week testing windows</td></tr><tr><td>Testing Center</td><td>Year-round by appointment at Pearson VUE centers nationwide</td></tr></tbody></table>',
      },
      {
        heading: 'Utah Foundations of Reading Passing Score',
        html: true,
        content: '<p>The <strong>Utah Foundations of Reading passing score</strong> is <strong>240</strong> on a 100–300 scale. This matches the national benchmark — meaning Utah holds its candidates to the same standard as states like Connecticut, New Hampshire, North Carolina, and Rhode Island.</p><p>For comparison, some states set a lower bar:</p><table><thead><tr><th>State</th><th>Passing Score</th></tr></thead><tbody><tr><td>Ohio</td><td>220</td></tr><tr><td>Alabama</td><td>233</td></tr><tr><td>Mississippi</td><td>233</td></tr><tr><td><strong>Utah</strong></td><td><strong>240</strong></td></tr><tr><td>Connecticut</td><td>240</td></tr><tr><td>Wisconsin</td><td>240</td></tr></tbody></table><p>At 240, you need to be solid across all subareas. There\'s no room to ignore the written assignments or skip a content area.</p>',
      },
      {
        heading: 'The Four Subareas and Their Weights',
        html: true,
        content: '<table><thead><tr><th>Subarea</th><th>Name</th><th>Weight</th><th>Objectives</th><th>Format</th></tr></thead><tbody><tr><td>I</td><td>Foundations of Reading Development</td><td>35%</td><td>1–4</td><td>43–45 MC questions</td></tr><tr><td>II</td><td>Development of Reading Comprehension</td><td>27%</td><td>5–7</td><td>33–35 MC questions</td></tr><tr><td>III</td><td>Reading Assessment and Instruction</td><td>18%</td><td>8–9</td><td>21–23 MC questions</td></tr><tr><td>IV</td><td>Integration of Knowledge and Understanding</td><td>20%</td><td>10–11</td><td>2 open-response assignments</td></tr></tbody></table><p>Subarea I alone is worth more than a third of the exam. If you\'re short on study time, that\'s where to start. But don\'t neglect Subarea IV — the two written assignments are 20% combined, and skipping them makes hitting 240 nearly impossible.</p>',
      },
      {
        heading: 'What Each Subarea Covers',
        html: true,
        content: '<h3>Subarea I: Foundations of Reading Development (35%)</h3><p>Four objectives: phonological and phonemic awareness (blending, segmenting, deleting, substituting phonemes; concepts of print; alphabetic principle), beginning reading skills (systematic phonics, CVC/CVCe/vowel teams, digraphs vs. blends, high-frequency words, encoding-decoding reciprocity), word analysis (morphemes, prefixes, suffixes, six syllable types, cognate awareness), and reading fluency (accuracy, rate, prosody, automaticity, factors that disrupt fluency).</p><h3>Subarea II: Development of Reading Comprehension (27%)</h3><p>Three objectives: academic language and vocabulary development (tiered vocabulary, context clues, morphemic analysis, word consciousness), literary text comprehension (literal, inferential, evaluative levels; narrative elements; reciprocal teaching; close reading), and informational text comprehension (text structures, text features, disciplinary literacy, critical evaluation of sources).</p><h3>Subarea III: Reading Assessment and Instruction (18%)</h3><p>Two objectives: assessment principles (screening, diagnostic, progress monitoring, formative, summative; criterion-referenced vs. norm-referenced; informal assessments like running records and spelling inventories) and instructional best practices (five components of reading, MTSS/tiered models, text complexity, differentiation, motivation).</p><h3>Subarea IV: Integration of Knowledge and Understanding (20%)</h3><p>Two open-response assignments. Objective 10 requires you to analyze student assessment data for foundational reading skills — identify strengths and needs, then describe and justify instructional strategies. Objective 11 does the same for reading comprehension. Both demand evidence-based reasoning and professional terminology.</p>',
      },
      {
        heading: 'Testing Options: Center vs. Online',
        html: true,
        content: '<table><thead><tr><th>Option</th><th>Computer-Based Testing (CBT)</th><th>Online Proctoring</th></tr></thead><tbody><tr><td>Where</td><td>Pearson VUE centers nationwide</td><td>From home or private location</td></tr><tr><td>When</td><td>Year-round by appointment (first-come, first-served)</td><td>Monthly one-week testing windows</td></tr><tr><td>Total Time</td><td>4 hours 15 minutes</td><td>4 hours 30 minutes</td></tr><tr><td>Break</td><td>Restroom breaks permitted (counted toward testing time)</td><td>15-minute optional break between MC and open-response</td></tr><tr><td>MC Section</td><td>Combined in one 4-hour block</td><td>2.5 hours for multiple-choice</td></tr><tr><td>Open-Response</td><td>Same 4-hour block</td><td>1.5 hours after break</td></tr><tr><td>Score Receipt</td><td>Receipt provided at test center</td><td>No completion receipt</td></tr></tbody></table><p>The written assignments may require use of an on-screen character selector for inserting special characters. Register at <a href="https://www.ut.nesinc.com/TestView.aspx?f=HTML_FRAG/NT890_TestPage.html">ut.nesinc.com</a>.</p>',
      },
      {
        heading: 'Foundations of Reading Utah Practice Test',
        html: true,
        content: '<p>The best way to know if you\'re ready for the 240 is to test yourself. Our <a href="/blog/foundations-of-reading-practice-test"><strong>Foundations of Reading Utah practice test</strong></a> has 25 scenario-based multiple-choice questions covering all three MC subareas. Every question includes a detailed explanation — so you get real <strong>Foundations of Reading Utah questions</strong> with answers and the reasoning behind each one.</p><p>Use your results to identify which subareas need more work:</p><table><thead><tr><th>Your Score</th><th>What It Means</th><th>Next Step</th></tr></thead><tbody><tr><td>20–25 correct</td><td>Strong foundation across all subareas</td><td>Focus on open-response practice and any isolated weak spots</td></tr><tr><td>15–19 correct</td><td>Close — identify where misses cluster</td><td>Targeted review of your weakest subarea before retesting</td></tr><tr><td>Below 15</td><td>Content gaps to address</td><td>Work through a complete study guide, then retest</td></tr></tbody></table><p>For full-length 100-question practice tests and AI-graded open-response practice, see our <a href="/#pricing">complete prep program</a>.</p>',
      },
      {
        heading: 'How to Study for the Utah Foundations of Reading',
        html: true,
        content: '<p>Your study time should mirror the exam weights. Here\'s a four-week plan:</p><table><thead><tr><th>Week</th><th>Focus</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Subarea I (35%)</td><td>Phonological awareness continuum, phonics patterns (CVC, CVCe, vowel teams, digraphs vs. blends), six syllable types, morphemes (inflectional vs. derivational), fluency indicators</td></tr><tr><td>2</td><td>Subarea II (27%)</td><td>Three vocabulary tiers, context clue types, comprehension levels (literal/inferential/evaluative), five text structures, close reading strategies</td></tr><tr><td>3</td><td>Subarea III + Written</td><td>Assessment types (screening through summative), MTSS tiers, text complexity factors. Write 3–4 practice open-response assignments using: Identify → Explain → Recommend → Justify</td></tr><tr><td>4</td><td>Full practice test + review</td><td>Take a timed <a href="/blog/foundations-of-reading-practice-test">practice test</a>. Review every missed question by subarea. Write 2 more open-response drafts</td></tr></tbody></table><p>Pace yourself during the real exam at about 80 seconds per MC question. Save at least 45 minutes for each written assignment.</p>',
      },
      {
        heading: 'Frequently Asked Questions',
        html: true,
        content: '<h3>What is the Utah Foundations of Reading passing score?</h3><p>The <strong>Utah Foundations of Reading passing score</strong> is <strong>240</strong> on a 100–300 scale. This matches the national benchmark.</p><h3>Where can I find Foundations of Reading Utah questions for practice?</h3><p>We have a <a href="/blog/foundations-of-reading-practice-test">free practice test</a> with 25 <strong>Foundations of Reading Utah questions</strong> covering phonological awareness, phonics, vocabulary, comprehension, fluency, and assessment. Every question includes a detailed answer explanation.</p><h3>Is there a Foundations of Reading Utah practice test?</h3><p>Yes. Our <a href="/blog/foundations-of-reading-practice-test"><strong>Foundations of Reading Utah practice test</strong></a> is free and covers all three multiple-choice subareas. For full-length 100-question tests, see our <a href="/#pricing">complete prep program</a>.</p><h3>Where can I download a Foundations of Reading Utah PDF?</h3><p>Use the email form on this page to get our free <strong>Foundations of Reading Utah PDF</strong> study guide. It covers all four subareas, the Utah passing score, all 11 objectives, and open-response templates in a printable format.</p><h3>Can I take the Utah Foundations of Reading online?</h3><p>Yes. Online proctoring is available during monthly one-week testing windows. The online appointment is 4 hours 30 minutes total — 2.5 hours for multiple-choice, a 15-minute break, then 1.5 hours for open-response assignments. The fee is $139.</p><h3>How many subareas are on the Utah Foundations of Reading exam?</h3><p>Four subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), Reading Assessment and Instruction (18%), and Integration of Knowledge and Understanding (20% — the two open-response assignments).</p>',
      },
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
