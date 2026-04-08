import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// ─── Confirmation guard ───────────────────────────────────────────────────────
if (process.env.CONFIRM_INSERT !== 'true') {
  console.log('This script will INSERT 20 new passage-based questions.')
  console.log('No existing data will be modified or deleted.')
  console.log('To proceed: CONFIRM_INSERT=true npx tsx scripts/seed-passage-based-questions.ts')
  process.exit(0)
}

// ─── Inline schema ────────────────────────────────────────────────────────────
const QuestionSchema = new mongoose.Schema({
  examCode: String,
  questionText: String,
  stimulus: String,
  options: [{ label: String, text: String }],
  correctAnswer: String,
  explanation: String,
  subarea: String,
  subareaName: String,
  objectiveNumber: Number,
  difficulty: String,
  isPublished: { type: Boolean, default: true },
  isDiagnostic: { type: Boolean, default: false },
}, { timestamps: true })

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema)

// ─── Passage HTML helper ──────────────────────────────────────────────────────
const passage = (text: string) =>
  `<div style="border:1px solid #ccc;padding:12px;margin:8px 0;background:#f9f9f9;font-style:italic;">${text}</div>`

// ─── Passages ─────────────────────────────────────────────────────────────────

const passage1 = passage(
  'My stomach felt like it was full of butterflies as I walked through the big front doors. ' +
  'The hallway stretched out in both directions, and every face was a stranger. ' +
  'I clutched the straps of my backpack and tried to look like I knew where I was going. ' +
  'Then a girl with a bright yellow headband waved at me from across the hall. ' +
  '"Are you new? I am too," she said with a grin. ' +
  'The butterflies in my stomach settled down just a little.'
)

const passage2 = passage(
  'A young crow found a piece of cheese on a fence post and flew to a high branch to eat it. ' +
  'A fox trotted by below and called up, "What a fine bird you are! I bet your singing voice is just as beautiful." ' +
  'The crow puffed up with pride and opened her beak to sing, and the cheese tumbled to the ground. ' +
  'The fox snatched it up and said, "Thank you for the meal. Next time, trust your own judgment instead of sweet words."'
)

const passage3 = passage(
  '"We should build the fort out of cardboard boxes," said Marcus, crossing his arms. ' +
  '"Cardboard will fall apart in the rain," replied Jada, shaking her head. "We need wooden boards." ' +
  '"But we do not have any wood, and I already collected six boxes from the grocery store," Marcus said. ' +
  '"Then let us put a tarp over the cardboard," Jada suggested slowly. "That way it stays dry and we use what you already found." ' +
  'Marcus uncrossed his arms and nodded. "Okay, that could actually work."'
)

const passage4 = passage(
  'The forest floor was covered in a thick carpet of golden and red leaves that crunched under every step. ' +
  'Overhead, the remaining leaves glowed like stained glass when the sunlight passed through them. ' +
  'A cool breeze carried the smell of damp earth and pine needles. ' +
  'Somewhere nearby, a woodpecker tapped a steady rhythm against an old oak tree. ' +
  'The air tasted clean and sharp, the way it only does on the first real day of autumn.'
)

const passage5 = passage(
  'When rain falls on a hillside, the water flows downhill and carries tiny bits of soil with it. ' +
  'Over time, this process, called erosion, can wash away large amounts of earth. ' +
  'As a result, rivers at the bottom of hills often turn muddy brown after a heavy storm. ' +
  'Because tree roots hold soil in place, areas without many trees lose soil much faster. ' +
  'Therefore, planting trees along riverbanks is one way communities can slow the effects of erosion.'
)

const passage6 = passage(
  'Deserts and tropical rain forests are very different ecosystems. ' +
  'While deserts receive fewer than ten inches of rain each year, rain forests may get over eighty inches. ' +
  'Similarly, the temperatures differ greatly; desert nights can drop below freezing, whereas rain forests stay warm year-round. ' +
  'However, both ecosystems support animals that have adapted to their surroundings. ' +
  'For example, desert lizards conserve water by staying in shade during the day, just as rain forest frogs absorb moisture through their skin.'
)

const passage7 = passage(
  'Many neighborhoods struggle with litter collecting in empty lots and along sidewalks. ' +
  'Trash attracts pests such as rats and flies, which can spread disease. ' +
  'To address this problem, the students at Riverside Elementary organized a monthly cleanup day. ' +
  'They also placed recycling bins at every corner and made posters reminding neighbors to dispose of waste properly. ' +
  'Since the program began, the amount of litter in the neighborhood has dropped by more than half.'
)

const passage8 = passage(
  'Maria had been hitting the books all week for her science test. ' +
  'She thought the vocabulary section would be a piece of cake, but the experiment questions threw her for a loop. ' +
  '"Do not let it get under your skin," her older brother said. "You just need to keep your nose to the grindstone." ' +
  'Maria took a deep breath, rolled up her sleeves, and opened her textbook one more time.'
)

const passage9 = passage(
  'Photosynthesis is the process by which green plants make their own food. ' +
  'During photosynthesis, plants absorb carbon dioxide from the air through tiny openings in their leaves called stomata. ' +
  'The roots pull water from the soil, and chlorophyll in the leaves captures energy from sunlight. ' +
  'The plant then converts the carbon dioxide and water into glucose, a type of sugar the plant uses for energy. ' +
  'Oxygen is released as a byproduct, which is why forests are important for keeping our air clean.'
)

const passage10 = passage(
  '<strong>Running Record -- Student: Alex, Grade 2</strong><br/><br/>' +
  'Text: "The big brown dog ran across the yard and jumped over the fence."<br/>' +
  'Alex read: "The big brown dog ran across the yard and <u>jumped</u> [jumpted] over the <u>fence</u> [fents]."<br/><br/>' +
  'Text: "Then he sat down by the pond and watched the ducks swim."<br/>' +
  'Alex read: "Then he sat down by the <u>pond</u> [pound] and watched the <u>ducks</u> [docks] swim."<br/><br/>' +
  'Text: "The ducks did not seem to mind the dog at all."<br/>' +
  'Alex read: "The ducks did not seem to <u>mind</u> [mine] the dog at all."'
)

// ─── Questions ────────────────────────────────────────────────────────────────

const questions = [
  // ── Passage 1: Realistic fiction — new school ──
  {
    examCode: '190',
    questionText: 'What narrative point of view is used in this passage, and which detail from the text best supports that identification?',
    options: [
      { label: 'A', text: 'First person, as shown by the use of "I" and "my" throughout the passage' },
      { label: 'B', text: 'Second person, as shown by the narrator speaking directly to the reader' },
      { label: 'C', text: 'Third-person limited, as shown by the narrator describing one character\'s thoughts' },
      { label: 'D', text: 'Third-person omniscient, as shown by the narrator knowing all characters\' feelings' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The passage uses first-person narration, which is clearly indicated by pronouns such as "I" and "my" when the narrator describes personal experiences and feelings. Option B is incorrect because second-person narration would address the reader as "you," which does not occur in this passage. Option C is incorrect because third-person limited uses "he" or "she" rather than "I" to describe the main character. Option D is incorrect because third-person omniscient would reveal multiple characters\' inner thoughts using third-person pronouns, not first-person.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage1,
  },
  {
    examCode: '190',
    questionText: 'Which literary device or technique does the author primarily use to reveal the narrator\'s feelings in this passage?',
    options: [
      { label: 'A', text: 'Foreshadowing to hint at future events in the story' },
      { label: 'B', text: 'Figurative language to describe physical sensations tied to emotions' },
      { label: 'C', text: 'Flashback to show how the character felt at a previous school' },
      { label: 'D', text: 'Dialogue between the narrator and a teacher to express worry' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The author uses figurative language, specifically the metaphor of butterflies in the stomach, to convey the narrator\'s nervousness in a concrete, physical way that young readers can relate to. Option A is incorrect because the passage does not hint at future plot events; it stays focused on the present moment. Option C is incorrect because there is no reference to a previous school or earlier time period in the passage. Option D is incorrect because the only dialogue comes from the girl with the headband, not from a teacher, and it serves to introduce a new friend rather than express the narrator\'s worry.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage1,
  },

  // ── Passage 2: Fable — crow and fox ──
  {
    examCode: '190',
    questionText: 'Which of the following best states the theme or moral of this passage?',
    options: [
      { label: 'A', text: 'Hard work always leads to success in the end' },
      { label: 'B', text: 'Flattery can be used to trick those who are too proud' },
      { label: 'C', text: 'Animals in nature must compete for limited food sources' },
      { label: 'D', text: 'True friends will always share what they have with each other' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The fox uses flattery to trick the crow into opening her beak, which causes her to lose the cheese. The moral, stated by the fox at the end, warns against trusting sweet words over one\'s own judgment. Option A is incorrect because the passage does not address hard work or effort; the crow obtained the cheese without labor. Option C is incorrect because although the story involves animals and food, the lesson is about vanity and deception, not ecological competition. Option D is incorrect because the fox and crow are not friends, and the fox takes the cheese through trickery rather than through sharing.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage2,
  },
  {
    examCode: '190',
    questionText: 'A teacher wants to use this passage for a post-reading discussion. Which question would best promote higher-order analysis among students?',
    options: [
      { label: 'A', text: '"What did the fox say to the crow?" to check recall of key events' },
      { label: 'B', text: '"What color was the crow?" to confirm understanding of details' },
      { label: 'C', text: '"Why did the fox\'s plan work, and what could the crow have done differently?" to evaluate character decisions' },
      { label: 'D', text: '"Have you ever seen a crow in real life?" to build personal connections' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. This question requires students to analyze the fox\'s strategy and evaluate the crow\'s decision, engaging higher-order thinking skills such as analysis and evaluation on Bloom\'s taxonomy. Option A is incorrect because it only asks students to recall information stated directly in the text, which is a literal-level comprehension task. Option B is incorrect because it focuses on a minor, surface-level detail that does not require any analysis of the passage\'s meaning. Option D is incorrect because while personal connections can support engagement, this question does not require students to analyze the text itself or think critically about the characters\' actions.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage2,
  },

  // ── Passage 3: Dialogue — disagreement ──
  {
    examCode: '190',
    questionText: 'Based on the dialogue, what can the reader infer about the relationship between Marcus and Jada?',
    options: [
      { label: 'A', text: 'They are rivals who refuse to cooperate on any project together' },
      { label: 'B', text: 'They are friends who can disagree but are willing to compromise' },
      { label: 'C', text: 'Jada is an authority figure who makes all the decisions for Marcus' },
      { label: 'D', text: 'Marcus always gives in to what other people want him to do' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The dialogue shows that although Marcus and Jada disagree at first, Jada offers a compromise that incorporates Marcus\'s materials, and Marcus agrees, indicating a collaborative friendship. Option A is incorrect because the characters do cooperate by the end of the conversation, with Marcus nodding in agreement at Jada\'s suggestion. Option C is incorrect because Jada does not order Marcus around; she suggests a solution that uses his collected boxes, showing equal partnership. Option D is incorrect because Marcus initially stands firm on his idea and only agrees when Jada offers a plan that includes his contribution.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage3,
  },
  {
    examCode: '190',
    questionText: 'A teacher asks students, "Why do you think Jada suggested using a tarp instead of insisting on wooden boards?" Which comprehension level does this question primarily target?',
    options: [
      { label: 'A', text: 'Literal comprehension, because it asks students to restate what Jada said' },
      { label: 'B', text: 'Inferential comprehension, because it asks students to interpret a character\'s motivation' },
      { label: 'C', text: 'Evaluative comprehension, because it asks students to judge the quality of the story' },
      { label: 'D', text: 'Appreciative comprehension, because it asks students to react emotionally to the passage' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The question asks students to consider why Jada changed her approach, which requires them to make inferences about her thinking based on clues in the dialogue rather than information stated directly. Option A is incorrect because the question does not ask students to repeat what Jada said; it asks them to interpret the reasoning behind her suggestion. Option C is incorrect because the question does not ask students to judge the story\'s literary quality or make value judgments about the writing. Option D is incorrect because the question focuses on understanding character motivation through textual evidence, not on the reader\'s personal emotional response.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage3,
  },

  // ── Passage 4: Sensory setting ──
  {
    examCode: '190',
    questionText: 'Which literary technique is the author primarily using in this passage?',
    options: [
      { label: 'A', text: 'Personification, giving human qualities to the leaves and breeze' },
      { label: 'B', text: 'Imagery, using sensory details that appeal to sight, sound, smell, touch, and taste' },
      { label: 'C', text: 'Hyperbole, exaggerating the beauty of the forest for dramatic effect' },
      { label: 'D', text: 'Alliteration, repeating consonant sounds at the beginning of nearby words' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. The passage engages all five senses: the visual glow of leaves, the crunching sound, the smell of earth and pine, the cool breeze on skin, and the sharp taste of autumn air. This sustained use of sensory imagery is the dominant technique. Option A is incorrect because while the leaves "glowed" could suggest a mild figurative use, the passage does not give human traits to non-human things as its primary technique. Option C is incorrect because the descriptions are vivid but not exaggerated beyond realistic experience. Option D is incorrect because although there are a few repeated sounds, alliteration is not the organizing or dominant technique of the passage.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage4,
  },
  {
    examCode: '190',
    questionText: 'A teacher reads this passage aloud to model fluent oral reading. Which aspect of the passage makes it particularly effective for modeling prosody?',
    options: [
      { label: 'A', text: 'The passage contains many high-frequency sight words that students can decode quickly' },
      { label: 'B', text: 'The passage uses varied sentence lengths and natural pauses that support expressive reading' },
      { label: 'C', text: 'The passage includes dialogue between characters that requires different vocal tones' },
      { label: 'D', text: 'The passage follows a simple repetitive pattern that students can read along with' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Prosody involves expression, phrasing, and intonation during oral reading. This passage has varied sentence structures and natural pauses created by commas and descriptive phrases, which allow a teacher to demonstrate expressive reading. Option A is incorrect because the presence of sight words supports decoding fluency but does not specifically support prosody, which involves rhythm and expression. Option C is incorrect because this passage does not contain dialogue; it is entirely descriptive narration. Option D is incorrect because the passage does not follow a repetitive pattern; its sentence structures and lengths vary throughout.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 6,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage4,
  },

  // ── Passage 5: Cause-and-effect — erosion ──
  {
    examCode: '190',
    questionText: 'What text structure does this passage primarily use? Which signal words from the passage best support this identification?',
    options: [
      { label: 'A', text: 'Cause and effect, as indicated by "as a result," "because," and "therefore"' },
      { label: 'B', text: 'Chronological order, as indicated by "first," "next," and "finally"' },
      { label: 'C', text: 'Compare and contrast, as indicated by "while," "similarly," and "however"' },
      { label: 'D', text: 'Problem and solution, as indicated by "the problem is" and "one solution"' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. The passage explains how rain causes erosion and the resulting effects on soil and rivers, using explicit cause-and-effect signal words such as "as a result," "because," and "therefore." Option B is incorrect because the passage does not describe events in time-order sequence, and the words "first," "next," and "finally" do not appear. Option C is incorrect because the passage does not compare two subjects; the signal words listed in that option are not found in this text. Option D is incorrect because although erosion could be viewed as a problem, the passage is organized around causes and effects rather than around identifying a problem and proposing a solution.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage5,
  },
  {
    examCode: '190',
    questionText: 'A teacher wants to help students create a graphic organizer for this passage. Which organizer best matches the text structure?',
    options: [
      { label: 'A', text: 'A Venn diagram with two overlapping circles for similarities and differences' },
      { label: 'B', text: 'A chain-of-events diagram showing how one event leads to the next' },
      { label: 'C', text: 'A KWL chart with columns for what students know, want to know, and learned' },
      { label: 'D', text: 'An alphabetical word sort grouping vocabulary by first letter' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. A chain-of-events or cause-and-effect diagram matches this text structure because it visually shows how rain leads to soil loss, which leads to muddy rivers, creating a logical chain students can follow. Option A is incorrect because a Venn diagram is designed for compare-and-contrast texts, and this passage does not compare two subjects. Option C is incorrect because a KWL chart is an activating-prior-knowledge strategy, not a graphic organizer that mirrors cause-and-effect text structure. Option D is incorrect because a word sort is a vocabulary or phonics activity that does not represent the organizational structure of an informational passage.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage5,
  },

  // ── Passage 6: Compare-contrast — habitats ──
  {
    examCode: '190',
    questionText: 'What text structure is used in this passage, and which signal words indicate it?',
    options: [
      { label: 'A', text: 'Cause and effect, as shown by words such as "because" and "as a result"' },
      { label: 'B', text: 'Sequence, as shown by transition words such as "first," "then," and "last"' },
      { label: 'C', text: 'Compare and contrast, as shown by words such as "while," "similarly," "however," and "just as"' },
      { label: 'D', text: 'Description, as shown by adjectives and sensory details about a single topic' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The passage compares deserts and rain forests using explicit compare-and-contrast signal words including "while," "similarly," "however," and "just as," which highlight both differences and similarities. Option A is incorrect because the passage does not explain why one event causes another; it organizes information by similarities and differences between two ecosystems. Option B is incorrect because the passage does not present information in chronological or step-by-step order. Option D is incorrect because although the passage includes descriptive details, its primary organizational pattern is the systematic comparison of two distinct ecosystems.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage6,
  },
  {
    examCode: '190',
    questionText: 'Which text feature would most help students comprehend and organize the information in this passage?',
    options: [
      { label: 'A', text: 'A glossary defining difficult vocabulary words used in the passage' },
      { label: 'B', text: 'A timeline showing when each ecosystem formed over geologic history' },
      { label: 'C', text: 'A Venn diagram showing similarities and differences between the two ecosystems' },
      { label: 'D', text: 'A numbered list of steps explaining how ecosystems develop over time' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. A Venn diagram directly matches the compare-and-contrast structure of the passage, allowing students to sort information about deserts and rain forests into categories of similarities and differences. Option A is incorrect because while a glossary could help with vocabulary, it does not help students organize the comparative structure of the passage. Option B is incorrect because the passage does not discuss the historical development of these ecosystems, so a timeline would not align with the content. Option D is incorrect because a numbered-step list matches sequential or procedural text, not a compare-and-contrast structure.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage6,
  },

  // ── Passage 7: Problem-solution — community cleanup ──
  {
    examCode: '190',
    questionText: 'What organizational structure does this passage primarily use?',
    options: [
      { label: 'A', text: 'Chronological order, presenting events from earliest to most recent' },
      { label: 'B', text: 'Cause and effect, explaining why litter appears in neighborhoods' },
      { label: 'C', text: 'Problem and solution, identifying a community issue and describing how it was addressed' },
      { label: 'D', text: 'Compare and contrast, showing differences between clean and littered neighborhoods' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The passage first identifies the problem of litter and its consequences, then describes the solution the students implemented and its positive results, following a clear problem-and-solution structure. Option A is incorrect because although events are mentioned in order, the primary purpose is not to present a timeline but to frame a problem and its solution. Option B is incorrect because while the passage mentions that trash attracts pests, the overall structure is organized around solving the litter problem, not explaining its causes. Option D is incorrect because the passage does not compare two neighborhoods; it focuses on one neighborhood before and after the solution was implemented.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage7,
  },
  {
    examCode: '190',
    questionText: 'Which question would best assess a student\'s inferential comprehension of this passage?',
    options: [
      { label: 'A', text: '"What did the students place at every corner?" to check recall of stated details' },
      { label: 'B', text: '"How many times per month did the students clean up?" to verify factual understanding' },
      { label: 'C', text: '"Why might other schools want to start a similar program in their own neighborhoods?" to evaluate broader implications' },
      { label: 'D', text: '"What is the title of this passage?" to assess understanding of main topic' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. This question requires students to go beyond stated information and infer how the success described in the passage could apply to other communities, which is an inferential comprehension skill. Option A is incorrect because it asks students to recall a detail directly stated in the text, which is a literal comprehension task. Option B is incorrect because the answer to this question is stated explicitly in the passage, making it a literal-level question. Option D is incorrect because identifying the title or topic does not require inference and is a basic comprehension task that does not assess deeper understanding.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage7,
  },

  // ── Passage 8: ELL — idioms and figurative language ──
  {
    examCode: '190',
    questionText: 'Which aspect of this passage would be MOST challenging for an entering-level English learner to comprehend?',
    options: [
      { label: 'A', text: 'The subject-verb agreement patterns used in the sentences' },
      { label: 'B', text: 'The idiomatic expressions whose meanings differ from their literal word meanings' },
      { label: 'C', text: 'The basic sentence structure of subject followed by predicate' },
      { label: 'D', text: 'The use of past-tense verb endings throughout the passage' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Idioms such as "hitting the books," "piece of cake," "threw her for a loop," and "keep your nose to the grindstone" cannot be understood from their individual word meanings, making them especially difficult for English learners who may interpret them literally. Option A is incorrect because subject-verb agreement, while sometimes challenging, is a grammatical pattern that can be taught through rules, unlike idioms which must be learned individually. Option C is incorrect because the basic sentence structure in this passage follows standard English word order, which is generally accessible even at early proficiency levels. Option D is incorrect because past-tense forms are among the earlier grammatical structures English learners acquire and are not the primary source of difficulty in this passage.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage8,
  },
  {
    examCode: '190',
    questionText: 'Which pre-reading strategy would most effectively support English learners\' comprehension of this passage?',
    options: [
      { label: 'A', text: 'Having students read the passage silently and then answer comprehension questions independently' },
      { label: 'B', text: 'Pre-teaching the idiomatic expressions using visual aids and examples in context before reading' },
      { label: 'C', text: 'Asking students to look up every unfamiliar word in a standard English dictionary' },
      { label: 'D', text: 'Reading the passage aloud at a faster pace to model fluent English pronunciation' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Pre-teaching idioms with visual supports and contextual examples gives English learners the background knowledge they need to understand figurative expressions before encountering them in the text. Option A is incorrect because having students read independently without support does not address the specific challenge of idiomatic language, which requires explicit instruction. Option C is incorrect because standard dictionaries often do not include idiomatic meanings, and looking up every word is inefficient and does not build comprehension of figurative phrases. Option D is incorrect because reading at a faster pace would likely make the passage harder, not easier, for English learners to process, and speed does not address the conceptual challenge of idioms.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage8,
  },

  // ── Passage 9: ELL — Tier 3 vocabulary (photosynthesis) ──
  {
    examCode: '190',
    questionText: 'Which vocabulary words in this passage are Tier 3 domain-specific terms that the teacher should pre-teach before reading?',
    options: [
      { label: 'A', text: '"Green," "water," and "air," because they are unfamiliar to most students' },
      { label: 'B', text: '"Photosynthesis," "stomata," "chlorophyll," and "glucose," because they are specialized science terms' },
      { label: 'C', text: '"Process," "energy," and "important," because they appear in many different subjects' },
      { label: 'D', text: '"Absorb," "convert," and "release," because they have only one meaning in English' },
    ],
    correctAnswer: 'B',
    explanation: 'Correct Response: B. Photosynthesis, stomata, chlorophyll, and glucose are Tier 3 words, meaning they are low-frequency, domain-specific vocabulary used primarily in science contexts and unlikely to be encountered in everyday conversation. Option A is incorrect because "green," "water," and "air" are Tier 1 high-frequency words that most students already know from daily life. Option C is incorrect because "process," "energy," and "important" are Tier 2 academic vocabulary words used across many subjects, not domain-specific Tier 3 terms. Option D is incorrect because "absorb," "convert," and "release" are general academic words with multiple meanings across contexts, placing them in Tier 2 rather than Tier 3.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage9,
  },
  {
    examCode: '190',
    questionText: 'Which vocabulary instruction strategy would be most effective for helping English learners access the content-specific vocabulary in this passage?',
    options: [
      { label: 'A', text: 'Providing a labeled diagram of a plant showing where photosynthesis occurs alongside simplified definitions' },
      { label: 'B', text: 'Assigning students to copy each vocabulary word and its dictionary definition five times' },
      { label: 'C', text: 'Having students memorize the spelling of each science term before reading the passage' },
      { label: 'D', text: 'Telling students to skip unfamiliar words and focus on the parts of the passage they understand' },
    ],
    correctAnswer: 'A',
    explanation: 'Correct Response: A. A labeled diagram provides visual support that connects abstract science terms to concrete images, which is especially effective for English learners who benefit from multimodal input when learning domain-specific vocabulary. Option B is incorrect because copying definitions does not build conceptual understanding; English learners need meaningful context and visual support, not rote repetition. Option C is incorrect because memorizing spelling does not help students understand word meaning, which is the primary barrier to comprehension for English learners. Option D is incorrect because skipping unfamiliar words would mean missing the core content vocabulary that is essential for understanding the passage.',
    subarea: 'II',
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 5,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage9,
  },

  // ── Passage 10: Running record — assessment ──
  {
    examCode: '190',
    questionText: 'Based on the running record, which cueing system does this student rely on MOST when making errors?',
    options: [
      { label: 'A', text: 'Semantic cues, because the substituted words have similar meanings to the correct words' },
      { label: 'B', text: 'Syntactic cues, because the substituted words are the same part of speech as the correct words' },
      { label: 'C', text: 'Graphophonic cues, because the substituted words look and sound similar to the correct words' },
      { label: 'D', text: 'Pragmatic cues, because the student uses background knowledge about dogs and ponds' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The student\'s errors ("jumpted" for "jumped," "fents" for "fence," "pound" for "pond," "docks" for "ducks," "mine" for "mind") all share visual and phonetic similarity with the target words, indicating strong reliance on graphophonic cues. Option A is incorrect because the substituted words do not carry the same meaning as the correct words; for example, "pound" does not mean the same thing as "pond." Option B is incorrect because while some substitutions happen to be the same part of speech, the consistent pattern of visual similarity points to graphophonic rather than syntactic reliance. Option D is incorrect because pragmatic cues relate to social context and purpose of communication, which is not what drives these specific reading errors.',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage10,
  },
  {
    examCode: '190',
    questionText: 'Based on the error pattern shown in this running record, what reading level does this text represent for this student, and what instructional action should the teacher take?',
    options: [
      { label: 'A', text: 'Independent level; the teacher should move the student to a more challenging text immediately' },
      { label: 'B', text: 'Instructional level; the teacher should use this text for guided reading with targeted support' },
      { label: 'C', text: 'Frustrational level; the teacher should select an easier text and provide phonics instruction' },
      { label: 'D', text: 'Independent level; the teacher should have the student read this text silently without support' },
    ],
    correctAnswer: 'C',
    explanation: 'Correct Response: C. The student makes five errors in three short sentences, resulting in an accuracy rate well below 90 percent, which places the text at the frustrational level. The teacher should select an easier text and provide targeted phonics instruction to address the decoding difficulties. Option A is incorrect because the high number of errors indicates the student is struggling, not reading independently, so increasing text difficulty would be inappropriate. Option B is incorrect because the error rate exceeds what is typical for instructional level, which generally falls between 90 and 94 percent accuracy. Option D is incorrect for the same reason as Option A; the student needs support, not independent practice at a level that is too difficult.',
    subarea: 'III',
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'hard',
    isPublished: true,
    isDiagnostic: false,
    stimulus: passage10,
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set in .env.local')
    process.exit(1)
  }

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  const result = await Question.insertMany(questions)
  console.log(`Inserted ${result.length} passage-based questions`)

  await mongoose.disconnect()
  console.log('Done')
  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
