export const EXAM_INFO = {
  name: 'Foundations of Reading Test',
  shortName: 'FORT',
  codes: ['190', '890'],
  currentCode: '890',
  previousCode: '190',
  codeChangeDate: 'September 1, 2025',
  totalQuestions: 100,
  constructedResponses: 2,
  timeLimitMinutes: 240,
  appointmentTimeCenter: '4 hours 15 minutes',
  appointmentTimeOnline: '4 hours 30 minutes',
  testFee: 139,
  retakeWaitDays: 30,
  scoreScale: '100-300',
  passRate: 61.5,
  firstAttemptPassRate: 60.2,
  scoreReportWeeks: 5,
  provider: 'Pearson',
  subareas: [
    {
      number: 'I',
      name: 'Foundations of Reading Development',
      weight: 35,
      questionRange: '35-37',
      objectives: [
        {
          number: 1,
          title: 'Phonological and Phonemic Awareness',
          description: 'Knowledge of principles and evidence-based instructional practices for developing language and emergent literacy skills, including phonological and phonemic awareness, concepts of print, and the alphabetic principle.',
        },
        {
          number: 2,
          title: 'Phonics and Word Recognition',
          description: 'Knowledge of principles and evidence-based instructional practices for developing beginning reading skills, including phonics, high-frequency words, and spelling.',
        },
        {
          number: 3,
          title: 'Word Analysis Skills',
          description: 'Knowledge of principles and evidence-based instructional practices for developing word analysis skills and strategies, including syllabication, structural or morphemic analysis, and orthographic skills.',
        },
        {
          number: 4,
          title: 'Reading Fluency',
          description: 'Knowledge of principles and evidence-based instructional practices for developing reading fluency at all stages of reading development.',
        },
      ],
    },
    {
      number: 'II',
      name: 'Development of Reading Comprehension',
      weight: 27,
      questionRange: '25-29',
      objectives: [
        {
          number: 5,
          title: 'Vocabulary Development',
          description: 'Knowledge of principles and evidence-based instructional practices for promoting academic language development, including vocabulary development.',
        },
        {
          number: 6,
          title: 'Literary Text Comprehension',
          description: 'Knowledge of principles and evidence-based instructional practices for promoting comprehension and analysis of literary texts.',
        },
        {
          number: 7,
          title: 'Informational Text Comprehension',
          description: 'Knowledge of principles and evidence-based instructional practices for promoting comprehension and analysis of informational texts.',
        },
      ],
    },
    {
      number: 'III',
      name: 'Reading Assessment and Instruction',
      weight: 18,
      questionRange: '16-20',
      objectives: [
        {
          number: 8,
          title: 'Reading Assessment',
          description: 'Knowledge of principles and evidence-based best practices for assessing reading development.',
        },
        {
          number: 9,
          title: 'Reading Instruction',
          description: 'Knowledge of principles and evidence-based best practices of reading instruction.',
        },
      ],
    },
    {
      number: 'IV',
      name: 'Integration of Knowledge and Understanding',
      weight: 20,
      questionRange: '2 open-response',
      objectives: [
        {
          number: 10,
          title: 'Foundational Reading Skills Analysis',
          description: 'Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.',
        },
        {
          number: 11,
          title: 'Reading Comprehension Analysis',
          description: 'Prepare an organized, developed analysis on a topic related to the development of reading comprehension.',
        },
      ],
    },
  ],
}

export const SUBAREA_COLORS: Record<string, string> = {
  I: '#2563eb',
  II: '#7c3aed',
  III: '#059669',
  IV: '#d97706',
}
