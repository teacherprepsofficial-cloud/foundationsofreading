export interface StateData {
  slug: string
  name: string
  abbreviation: string
  passingScore: number
  testCode: string
  licensureBoard: string
  licensureUrl: string
  registrationUrl: string
  requiredFor: string
  additionalNotes?: string
}

export const STATES: StateData[] = [
  {
    slug: 'alabama',
    name: 'Alabama',
    abbreviation: 'AL',
    passingScore: 220,
    testCode: '890',
    licensureBoard: 'Alabama State Department of Education',
    licensureUrl: 'https://www.alsde.edu/sec/ec/Pages/home.aspx',
    registrationUrl: 'https://www.al.nesinc.com',
    requiredFor: 'Elementary Education (K-6) and Special Education (K-12) certification',
  },
  {
    slug: 'arizona',
    name: 'Arizona',
    abbreviation: 'AZ',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Arizona Department of Education',
    licensureUrl: 'https://www.azed.gov/educator-certification',
    registrationUrl: 'https://www.nestest.com',
    requiredFor: 'K-5 Literacy Endorsement',
  },
  {
    slug: 'arkansas',
    name: 'Arkansas',
    abbreviation: 'AR',
    passingScore: 233,
    testCode: '190',
    licensureBoard: 'Arkansas Division of Elementary and Secondary Education',
    licensureUrl: 'https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-licensure',
    registrationUrl: 'https://www.ar.nesinc.com',
    requiredFor: 'Elementary Education (K-6) teacher licensure',
  },
  {
    slug: 'connecticut',
    name: 'Connecticut',
    abbreviation: 'CT',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Connecticut State Department of Education',
    licensureUrl: 'https://portal.ct.gov/SDE/Certification/Certification',
    registrationUrl: 'https://www.ct.nesinc.com',
    requiredFor: 'Elementary Education (#013), Comprehensive Special Education (#165), and Reading/Language Arts Consultant (#305) endorsements',
  },
  {
    slug: 'iowa',
    name: 'Iowa',
    abbreviation: 'IA',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Iowa Department of Education',
    licensureUrl: 'https://educate.iowa.gov',
    registrationUrl: 'https://www.nestest.com',
    requiredFor: 'Teacher preparation program completion (program-level reporting requirement)',
  },
  {
    slug: 'massachusetts',
    name: 'Massachusetts',
    abbreviation: 'MA',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Massachusetts Department of Elementary and Secondary Education',
    licensureUrl: 'https://www.doe.mass.edu/licensure/',
    registrationUrl: 'https://www.mtel.nesinc.com',
    requiredFor: 'Elementary Education and Early Childhood Education licensure',
    additionalNotes: 'Administered through the MTEL (Massachusetts Tests for Educator Licensure) program.',
  },
  {
    slug: 'mississippi',
    name: 'Mississippi',
    abbreviation: 'MS',
    passingScore: 233,
    testCode: '190',
    licensureBoard: 'Mississippi Department of Education',
    licensureUrl: 'https://www.mdek12.org/OTL/OEL',
    registrationUrl: 'https://www.ms.nesinc.com',
    requiredFor: 'Elementary Education (K-6) teacher licensure',
  },
  {
    slug: 'new-hampshire',
    name: 'New Hampshire',
    abbreviation: 'NH',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'New Hampshire Department of Education',
    licensureUrl: 'https://www.education.nh.gov/who-we-are/division-of-educator-support-and-higher-education/bureau-of-educator-preparation-and-higher-education',
    registrationUrl: 'https://www.nestest.com',
    requiredFor: 'Elementary Education teacher certification',
  },
  {
    slug: 'north-carolina',
    name: 'North Carolina',
    abbreviation: 'NC',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'North Carolina Department of Public Instruction',
    licensureUrl: 'https://www.dpi.nc.gov/educators/educator-licensure',
    registrationUrl: 'https://www.nc.nesinc.com',
    requiredFor: 'Elementary Education (K-6) and Special Education teacher licensure',
  },
  {
    slug: 'ohio',
    name: 'Ohio',
    abbreviation: 'OH',
    passingScore: 220,
    testCode: '090',
    licensureBoard: 'Ohio Department of Education and Workforce',
    licensureUrl: 'https://education.ohio.gov/Topics/Teaching/Educator-Licensure',
    registrationUrl: 'https://www.oh.nesinc.com',
    requiredFor: 'Elementary Education and Intervention Specialist licensure',
    additionalNotes: 'Administered through the OAE (Ohio Assessments for Educators) program. Ohio uses test code 090.',
  },
  {
    slug: 'rhode-island',
    name: 'Rhode Island',
    abbreviation: 'RI',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Rhode Island Department of Education',
    licensureUrl: 'https://www.ride.ri.gov/teachersadministrators/educatorcertification.aspx',
    registrationUrl: 'https://www.nestest.com',
    requiredFor: 'Elementary Education teacher certification',
  },
  {
    slug: 'utah',
    name: 'Utah',
    abbreviation: 'UT',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Utah State Board of Education',
    licensureUrl: 'https://www.schools.utah.gov/licensing',
    registrationUrl: 'https://www.ut.nesinc.com',
    requiredFor: 'Elementary Education licensure (required for applications from September 1, 2024 onward)',
  },
  {
    slug: 'wisconsin',
    name: 'Wisconsin',
    abbreviation: 'WI',
    passingScore: 240,
    testCode: '190',
    licensureBoard: 'Wisconsin Department of Public Instruction',
    licensureUrl: 'https://dpi.wi.gov/licensing',
    registrationUrl: 'https://www.wi.nesinc.com',
    requiredFor: 'Elementary Education (K-6), Special Education, and Reading Teacher/Specialist licensure',
  },
]

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find(s => s.slug === slug)
}
