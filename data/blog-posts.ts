export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  publishedAt: string
  sections: { heading: string; content: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-pass-foundations-of-reading',
    title: 'How to Pass the Foundations of Reading Test: A Complete Guide',
    metaDescription: 'Learn how to pass the Foundations of Reading Test (FORT 190/890) with proven study strategies, time management tips, and content area breakdowns.',
    publishedAt: '2026-02-11',
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
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
