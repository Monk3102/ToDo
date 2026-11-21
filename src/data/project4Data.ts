export interface Project4Task {
  id: string;
  text: string;
  category?: string;
}

export interface Project4SubSection {
  id: string;
  title: string;
  badge?: string;
  intro?: string;
  tasks?: Project4Task[];
  note?: string;
  secondaryHeading?: string;
  secondaryItems?: string[];
  table?: {
    columns: string[];
    rows: string[][];
  };
  templates?: {
    name: string;
    focus: string;
  }[];
  countries?: string[];
}

export interface Project4Workstream {
  id: string;
  letter: string;
  title: string;
  summary: string;
  badge?: string;
  intro?: string;
  subsections: Project4SubSection[];
  deliverable?: string;
  closingNote?: string;
}

export interface Project4Week {
  id: string;
  label: string;
  dates: string;
  mondayNote?: string;
  emailTarget?: number;
  intro?: string;
  tasks: Project4Task[];
  deliverablesTitle: string;
  deliverables: string[];
  targetNote?: string;
}

export const PROJECT_4_HEADER = {
  title: 'Project 4 — PhD applications and professor outreach (Europe)',
  intro: [
    'This project needs to be treated differently from your other research projects. It is not simply a literature-review task or a list of universities to contact. It is a time-bound application campaign with several parallel workstreams, shared documents, dependencies and weekly targets.',
    'There are actually two connected projects here:',
  ],
  connectedProjects: [
    {
      title: 'Annual PhD admissions',
      description:
        'Find structured PhD programmes across Europe, understand their admission cycles, prepare application documents and apply before their deadlines.',
    },
    {
      title: 'Direct professor outreach',
      description:
        'Identify relevant professors, read enough of their research to write credible individual emails, and send approximately 70 emails by 25 December.',
    },
  ],
  overlapNote:
    'They overlap in institutions, research areas and documents, but they should have separate trackers. A professor may be part of an annual programme, but contacting that professor is not necessarily the same as applying through the programme. Some programmes require a central application and do not accept informal supervisor arrangements.',
};

export const PROJECT_4_WORKLOAD_AUDIT = {
  intro: 'You have five Monday-morning email sessions:',
  table: [
    { monday: '1', date: '23 November', target: 14 },
    { monday: '2', date: '30 November', target: 14 },
    { monday: '3', date: '7 December', target: 14 },
    { monday: '4', date: '14 December', target: 14 },
    { monday: '5', date: '21 December', target: 14 },
    { monday: 'Total', date: '', target: 70, isTotal: true },
  ],
  calendarNote: 'These are the five Mondays before Christmas, counting from 23 November 2026.',
  dependencyNote:
    'But there is a serious dependency problem: you have identified around 20 professors, have not yet read their research, and your CV and transcripts are not ready. You also want to keep discovering more professors and annual programmes across Europe.',
  riskNote:
    'The main risk is not finding 70 email addresses. It is having 70 credible, personalised emails ready to send.',
  principlesIntro: 'I would therefore organise the project around these principles:',
  principles: [
    'Prepare the common documents once. Reuse them carefully.',
    'Research professors in batches rather than one at a time immediately before sending.',
    'Separate professors who are suitable for direct outreach from professors who only accept applications through a structured programme.',
    'Keep discovering new opportunities, but do not let searching consume all the time reserved for applications.',
    'Do not wait for every possible opportunity before starting applications.',
    'Treat the 70-email target as a campaign target, not a reason to send generic or poorly researched messages.',
  ],
  qualityRule:
    'A useful quality rule: no professor enters the Monday sending queue until their research has been reviewed and the email has been checked.',
};

export const PROJECT_4_ADMISSIONS_AUDIT = {
  intro:
    'I checked several official programme pages. There is a timing issue you should account for immediately: some of the most recognisable annual programmes for a September 2027 start have already closed their main application rounds.',
  closedExamples: [
    'The IMPRS on Astrophysics has closed its 2026/27 application round. Its next regular round is expected to open in August 2027, for a September 2028 start. (IMPRS on Astrophysics +2)',
    'IMPRS-HD had a 3 November 2026 deadline for its 2027 intake. (imprs-hd.mpg.de +1)',
    'The IMPRS UFAST deadline was 6 November 2026. (mpsd.mpg.de)',
    'The IMPRS for Astronomy and Astrophysics Bonn-Cologne listed 30 October 2026 as its deadline. (eas.unige.ch)',
  ],
  openIntro:
    'That does not mean you should stop looking for 2027 positions. Some opportunities have later deadlines or recruit through individual projects:',
  openExamples: [
    'University of Manchester lists a 22 January 2027 deadline for full consideration for its STFC-funded astrophysics studentships. (The University of Manchester)',
    'University College London has advertised funded PhD positions starting in October 2027, with applications closing in January. (Faculty of Mathematical & Physical Sciences)',
    'Durham University says complete applications received before 15 December 2026 will receive fullest consideration for October 2027 entry. (Astronomy at Durham University)',
    'The Max Planck Institute for Gravitational Physics (AEI) describes an annual PhD call, usually with an early-January deadline. You should check the current call rather than assume that its usual schedule is unchanged. (imprs.aei.mpg.de)',
  ],
  recommendationIntro: 'My recommendation: run two admission searches in parallel:',
  recommendations: [
    '2027-entry opportunities that are still open, including individual funded projects.',
    '2028-entry annual programmes whose application portals will open later.',
  ],
  closingNote:
    'Do not confuse an annual programme with an individual advertised PhD vacancy. Both can lead to a PhD, but their application routes and deadlines can be very different.',
};

export const PROJECT_4_STRUCTURE_SUMMARY = {
  intro: 'I would divide the work into six independent workstreams. They will run in parallel, but some depend on others.',
  campaignTitle: 'PhD application campaign',
  streams: [
    { letter: 'A', name: 'Application documents', desc: 'CV, transcripts, certificates, thesis abstract, research summary, references.' },
    { letter: 'B', name: 'Annual programme search', desc: 'Structured programmes, eligibility, deadlines, funding, application portals.' },
    { letter: 'C', name: 'Individual PhD vacancy search', desc: 'Advertised funded positions, project descriptions, supervisor contacts, deadlines.' },
    { letter: 'D', name: 'Professor research audit', desc: "Identify, read and understand each professor's relevant research." },
    { letter: 'E', name: 'Email campaign', desc: 'Draft, review, send, track replies and follow-ups.' },
    { letter: 'F', name: 'Application execution', desc: 'Complete applications, request references, submit and track outcomes.' },
  ],
  note: 'Workstreams A–F are separate trackers, but they share information and documents.',
};

export const PROJECT_4_WORKSTREAMS: Project4Workstream[] = [
  {
    id: 'p4-ws-a',
    letter: 'A',
    title: 'Prepare your application documents',
    badge: 'Start immediately',
    summary: 'CV, academic records, research summary, and reusable application PDFs.',
    intro: 'This is your first bottleneck. You should not wait until you have identified all 70 professors to prepare the documents.',
    subsections: [
      {
        id: 'p4-ws-a1',
        title: 'A1. CV',
        tasks: [
          { id: 'p4-a1-1', text: 'Collect your existing CV, even if incomplete.' },
          { id: 'p4-a1-2', text: 'Create a clean academic CV document.' },
          { id: 'p4-a1-3', text: 'Add education: MSc, BSc, institutions, dates, grades and relevant coursework.' },
          { id: 'p4-a1-4', text: 'Add your dissertation topic and a short description of the work.' },
          { id: 'p4-a1-5', text: 'Add your research experience and mini-projects.' },
          { id: 'p4-a1-6', text: 'Add computational and scientific skills.' },
          { id: 'p4-a1-7', text: 'Add software and tools you can genuinely use.' },
          { id: 'p4-a1-8', text: 'Add workshops, conferences, presentations and relevant academic activities.' },
          { id: 'p4-a1-9', text: 'Add awards or academic distinctions, if applicable.' },
          { id: 'p4-a1-10', text: 'Add referees only after confirming their willingness and contact details.' },
          { id: 'p4-a1-11', text: 'Export as PDF.' },
          { id: 'p4-a1-12', text: 'Check formatting, spelling, dates and consistency.' },
        ],
        note: 'Important: do not wait for your project GitHub links to be ready. Make the CV now. Include projects with an accurate description of their current status. Add GitHub links when the repositories are presentable. An unfinished project can still be described honestly as ongoing work, but do not present planned results as completed research.',
      },
      {
        id: 'p4-ws-a2',
        title: 'A2. Academic records and transcripts',
        badge: 'Start immediately',
        tasks: [
          { id: 'p4-a2-1', text: "Contact your university's examination branch or department." },
          { id: 'p4-a2-2', text: 'Ask how to obtain official MSc transcripts.' },
          { id: 'p4-a2-3', text: 'Ask whether provisional or semester-wise grade sheets can be issued.' },
          { id: 'p4-a2-4', text: 'Collect all available semester-wise marksheets.' },
          { id: 'p4-a2-5', text: 'Collect your BSc transcripts and degree certificate.' },
          { id: 'p4-a2-6', text: 'Collect your MSc enrolment or bonafide certificate if relevant.' },
          { id: 'p4-a2-7', text: 'Check whether an official consolidated marksheet is available.' },
          { id: 'p4-a2-8', text: 'Scan all documents clearly.' },
          { id: 'p4-a2-9', text: 'Save each document as a separate PDF.' },
          { id: 'p4-a2-10', text: 'Check whether the target programmes accept provisional records or a course-and-grade list while the final transcript is pending.' },
        ],
        note: 'Do not assume every university will accept the same substitute. For instance, IMPRS-HD has described allowing a course list with credits and grades when transcripts cannot be provided at the application stage. Other programmes may have different requirements. (imprs-hd.mpg.de +1)',
      },
      {
        id: 'p4-ws-a3',
        title: 'A3. Research summary',
        intro: 'Prepare a short research summary that can be adapted for different applications.',
        tasks: [
          { id: 'p4-a3-1', text: 'Write a brief description of your MSc dissertation.' },
          { id: 'p4-a3-2', text: 'State the research question.' },
          { id: 'p4-a3-3', text: 'Explain the physical system or phenomenon.' },
          { id: 'p4-a3-4', text: 'Mention the methods and computational tools used.' },
          { id: 'p4-a3-5', text: 'State what you personally contributed.' },
          { id: 'p4-a3-6', text: 'Describe the current status accurately.' },
          { id: 'p4-a3-7', text: 'Prepare a short abstract of the work.' },
          { id: 'p4-a3-8', text: 'Prepare a longer version of around one page.' },
        ],
        note: 'This is especially useful because some programmes ask for a preliminary thesis abstract or a description of previous research. (IMPRS on Astrophysics +2)',
      },
      {
        id: 'p4-ws-a4',
        title: 'A4. Other reusable documents',
        tasks: [
          { id: 'p4-a4-1', text: 'Create a one-page research-interest statement.' },
          { id: 'p4-a4-2', text: 'Prepare a general motivation-letter draft.' },
          { id: 'p4-a4-3', text: 'Prepare a list of referees.' },
          { id: 'p4-a4-4', text: 'Ask potential referees whether they would be willing to provide recommendations.' },
          { id: 'p4-a4-5', text: 'Check whether English-language proof is required.' },
          { id: 'p4-a4-6', text: 'Collect degree certificates and translations if needed.' },
          { id: 'p4-a4-7', text: 'Prepare a standard folder of application PDFs.' },
        ],
      },
    ],
    deliverable: 'A reusable application-document folder, ready to adapt for individual programmes.',
  },
  {
    id: 'p4-ws-b',
    letter: 'B',
    title: 'Search for annual PhD programmes across Europe',
    summary: 'Search categories, 17-country shortlist, programme database, classification, and advertised vacancies.',
    intro: 'Do not treat this as a casual browsing activity. Build a database.',
    subsections: [
      {
        id: 'p4-ws-b1',
        title: 'B1. Define the search categories',
        intro: 'Search for programmes in these areas:',
        secondaryItems: [
          'Astrophysics',
          'Cosmology',
          'Observational cosmology',
          'Theoretical cosmology',
          'Extragalactic astronomy',
          'Large-scale structure',
          'Galaxy evolution',
          'Gravitational physics',
          'Astroparticle physics',
          'Multimessenger astronomy',
        ],
        note: 'You should not restrict the search to programmes explicitly named "Astrophysics". A physics graduate school may have cosmology or astronomy research groups.',
      },
      {
        id: 'p4-ws-b2',
        title: 'B2. Search by country and institution',
        intro: 'Create a country-wise search list. Start with:',
        countries: [
          'Germany',
          'Netherlands',
          'France',
          'Switzerland',
          'Italy',
          'Spain',
          'Belgium',
          'Austria',
          'Sweden',
          'Denmark',
          'Finland',
          'Norway',
          'United Kingdom',
          'Ireland',
          'Portugal',
          'Poland',
          'Czech Republic',
        ],
        secondaryHeading: 'For each country:',
        tasks: [
          { id: 'p4-b2-1', text: 'Search for annual graduate schools and doctoral programmes.' },
          { id: 'p4-b2-2', text: 'Search university astronomy and physics departments.' },
          { id: 'p4-b2-3', text: 'Search national research institutes.' },
          { id: 'p4-b2-4', text: 'Search astronomy observatories and research centres.' },
          { id: 'p4-b2-5', text: 'Check whether applications are centralised or supervisor-led.' },
          { id: 'p4-b2-6', text: 'Check international applicant eligibility.' },
          { id: 'p4-b2-7', text: 'Check funding and employment conditions.' },
          { id: 'p4-b2-8', text: 'Record the next intake and deadline.' },
        ],
      },
      {
        id: 'p4-ws-b3',
        title: 'B3. Build the programme database',
        intro: 'Use these columns:',
        table: {
          columns: ['Field', 'What to record'],
          rows: [
            ['Programme', 'Official programme name'],
            ['Institution', 'University or research institute'],
            ['Country', 'Country'],
            ['Research areas', 'Cosmology, voids, LSS, etc.'],
            ['Admission type', 'Annual / rolling / vacancy'],
            ['Intake', '2027 / 2028'],
            ['Deadline', 'Exact date'],
            ['Funding', 'Funded / unclear / self-funded'],
            ['Eligibility', 'Degree and grade requirements'],
            ['Documents', 'CV, transcripts, references, etc.'],
            ['Application link', 'Official portal'],
            ['Supervisor contact', 'If appropriate'],
            ['Status', 'To investigate / eligible / applied / closed'],
          ],
        },
      },
      {
        id: 'p4-ws-b4',
        title: 'B4. Classify every opportunity',
        intro: 'Use four categories:',
        secondaryItems: [
          'Open, relevant, funded or with a clear funding route.',
          'Relevant programme, next cycle not yet open.',
          'Relevant professor or group, but no clear advertised vacancy.',
          'Closed, unsuitable or ineligible.',
        ],
        note: 'This will prevent you from spending time preparing an application for a programme that has already closed.',
      },
      {
        id: 'p4-ws-b5',
        title: 'B5. Search for individual advertised PhD positions too',
        intro:
          'This deserves its own section in the tracker. Some departments advertise a specific funded project rather than admitting a cohort through an annual programme.',
        tasks: [
          { id: 'p4-b5-1', text: 'Check university vacancy pages.' },
          { id: 'p4-b5-2', text: 'Check institute vacancy pages.' },
          { id: 'p4-b5-3', text: 'Check research-group websites.' },
          { id: 'p4-b5-4', text: 'Record the supervisor and project title.' },
          { id: 'p4-b5-5', text: 'Record the deadline and required documents.' },
          { id: 'p4-b5-6', text: 'Check whether you must contact the supervisor before applying.' },
          { id: 'p4-b5-7', text: 'Apply through the stated official route.' },
        ],
      },
    ],
    deliverable: 'A Europe-wide programme and vacancy database, with a clear shortlist of opportunities worth pursuing.',
  },
  {
    id: 'p4-ws-c',
    letter: 'C',
    title: 'Professor discovery and research reading',
    summary: 'Professor database schema, strategic paper reading (45–90 min), readiness checks, and expanding past 20.',
    intro:
      'You currently have around 20 professors working on supervoids. That is a useful starting point, but the professor list needs to become a research database.',
    subsections: [
      {
        id: 'p4-ws-c1',
        title: 'C1. Create a professor database',
        intro: 'Use these fields:',
        table: {
          columns: ['Field', 'Purpose'],
          rows: [
            ['Professor', 'Name'],
            ['Institution', 'Current affiliation'],
            ['Country', 'Location'],
            ['Research group', 'Group or department'],
            ['Research topic', 'Supervoids, LSS, ISW, etc.'],
            ['Relevant paper', 'Paper selected for reading'],
            ['Paper link', 'DOI or official link'],
            ['Main result', 'What the paper found'],
            ['Method', 'How the work was done'],
            ['Connection to my work', 'Your genuine research connection'],
            ['Potential PhD direction', 'Possible overlap'],
            ['Contact route', 'Direct email / central programme'],
            ['Email status', 'Not started / draft / ready / sent'],
            ['Date contacted', 'Tracking'],
            ['Response', 'Reply status'],
          ],
        },
      },
      {
        id: 'p4-ws-c2',
        title: 'C2. Read papers strategically',
        intro:
          'You do not need to read every paper by every professor. You do need to understand enough of their research to make a meaningful connection. For each professor:',
        tasks: [
          { id: 'p4-c2-1', text: 'Open their institutional profile.' },
          { id: 'p4-c2-2', text: 'Read their research-interest description.' },
          { id: 'p4-c2-3', text: 'Identify two or three recent papers relevant to your interests.' },
          { id: 'p4-c2-4', text: 'Select one paper as the primary reading.' },
          { id: 'p4-c2-5', text: 'Read the abstract.' },
          { id: 'p4-c2-6', text: 'Read the introduction to understand the problem.' },
          { id: 'p4-c2-7', text: 'Inspect the figures and their captions.' },
          { id: 'p4-c2-8', text: 'Read the methodology at a level sufficient to understand the approach.' },
          { id: 'p4-c2-9', text: 'Read the conclusion and limitations.' },
          { id: 'p4-c2-10', text: 'Write a short research note.' },
        ],
        secondaryHeading: 'Your note should answer:',
        secondaryItems: [
          'What problem does this paper investigate?',
          'Why is that problem important?',
          'What data or theoretical framework is used?',
          'What method is used?',
          'What is the main result?',
          'What remains uncertain or unexplored?',
          'How does this connect to my background or research interests?',
        ],
        note: "For a first pass, this may take 45–90 minutes per professor, depending on the paper. If you cannot explain the paper's central result in a few sentences, do not yet use it as the basis for a personalised email.",
      },
      {
        id: 'p4-ws-c3',
        title: 'C3. Use a professor-readiness score',
        intro: 'Before drafting an email, check:',
        tasks: [
          { id: 'p4-c3-1', text: "I know the professor's current research area." },
          { id: 'p4-c3-2', text: 'I have read at least one relevant paper.' },
          { id: 'p4-c3-3', text: 'I can explain its central question.' },
          { id: 'p4-c3-4', text: 'I understand the broad method.' },
          { id: 'p4-c3-5', text: 'I can identify a genuine connection to my own interests.' },
          { id: 'p4-c3-6', text: 'I know whether the professor supervises PhD students.' },
          { id: 'p4-c3-7', text: 'I know the correct application route.' },
        ],
        note: 'Only when these are satisfied should the professor move to the email queue.',
      },
      {
        id: 'p4-ws-c4',
        title: 'C4. Expand the list without losing time',
        intro: 'Your existing 20 professors are your first batch. Continue searching for more, but do not let the discovery process become endless.',
        tasks: [
          { id: 'p4-c4-1', text: 'Find researchers working on supervoids.' },
          { id: 'p4-c4-2', text: 'Find researchers working on cosmic voids more generally.' },
          { id: 'p4-c4-3', text: 'Find researchers working on ISW and CMB anomalies.' },
          { id: 'p4-c4-4', text: 'Find researchers working on large-scale structure.' },
          { id: 'p4-c4-5', text: 'Find researchers working on observational cosmology.' },
          { id: 'p4-c4-6', text: 'Find researchers working on simulations and theoretical cosmology.' },
          { id: 'p4-c4-7', text: 'Check whether each researcher is an appropriate potential supervisor.' },
        ],
        note: 'This broadening matters. A researcher may work on the physical or observational methods relevant to your interests without using the word "supervoid" in their profile.',
      },
    ],
    deliverable: 'A ranked list of professors with research notes and email-readiness status.',
  },
  {
    id: 'p4-ws-d',
    letter: 'D',
    title: 'The 70-email campaign',
    summary: '5-part email structure, 3 templates, per-email prep checklist, tracking fields, and follow-up policy.',
    intro: 'This is a separate production pipeline. Do not write 70 emails from scratch.',
    subsections: [
      {
        id: 'p4-ws-d1',
        title: 'D1. Build a reusable email structure',
        intro: 'Every email should have five parts:',
        secondaryItems: [
          'Introduction: Who you are and your current academic position.',
          'Research connection: What specific work of theirs caught your attention.',
          'Your background: Your dissertation, relevant projects and computational skills.',
          'Your interest: What research direction you hope to pursue.',
          'The question: Whether they expect PhD openings, accept students through an annual programme, or recommend a particular application route.',
        ],
        note: 'Keep the structure consistent, but personalise the research connection and the question.',
      },
      {
        id: 'p4-ws-d2',
        title: 'D2. Create three email templates',
        templates: [
          { name: 'Template A', focus: 'Professor working directly on supervoids or cosmic voids.' },
          { name: 'Template B', focus: 'Professor working on cosmology, large-scale structure or CMB.' },
          { name: 'Template C', focus: 'Professor associated with an annual PhD programme.' },
        ],
        note: 'These are starting templates, not messages to send unchanged.',
      },
      {
        id: 'p4-ws-d3',
        title: 'D3. Prepare each email',
        intro: 'For each professor:',
        tasks: [
          { id: 'p4-d3-1', text: "Confirm the professor's current institutional affiliation." },
          { id: 'p4-d3-2', text: 'Check the correct email address on the official website.' },
          { id: 'p4-d3-3', text: 'Read the selected paper.' },
          { id: 'p4-d3-4', text: 'Write two or three specific sentences about the research.' },
          { id: 'p4-d3-5', text: 'Connect it to your background.' },
          { id: 'p4-d3-6', text: 'Ask a clear question about PhD opportunities and admission.' },
          { id: 'p4-d3-7', text: 'Attach the CV only if appropriate.' },
          { id: 'p4-d3-8', text: 'Check that the email is concise and error-free.' },
          { id: 'p4-d3-9', text: 'Save the final version in the email tracker.' },
        ],
      },
      {
        id: 'p4-ws-d4',
        title: 'D4. Track every email',
        intro: 'Record:',
        secondaryItems: [
          'Professor',
          'Institution',
          'Email address',
          'Research paper read',
          'Date drafted',
          'Date sent',
          'CV attached?',
          'Programme mentioned?',
          'Reply received?',
          'Follow-up date',
          'Outcome',
        ],
        note: 'Do not send duplicate emails to the same professor through different addresses unless there is a clear reason.',
      },
      {
        id: 'p4-ws-d5',
        title: 'D5. Set a follow-up policy',
        tasks: [
          { id: 'p4-d5-1', text: 'Record the date each email was sent.' },
          { id: 'p4-d5-2', text: 'Wait a reasonable period before following up.' },
          { id: 'p4-d5-3', text: 'Send one polite follow-up where appropriate.' },
          { id: 'p4-d5-4', text: 'Record replies and any suggested contacts.' },
          { id: 'p4-d5-5', text: 'Update the professor database when a professor refers you to another group or programme.' },
        ],
      },
    ],
  },
  {
    id: 'p4-ws-e',
    letter: 'E',
    title: 'Application execution',
    summary: 'Eligibility verification, documents upload, deadline submission, and confirmation logging.',
    intro: 'This is where the programme database and document folder come together. For each shortlisted opportunity:',
    subsections: [
      {
        id: 'p4-ws-e1',
        title: 'Application checklist per opportunity',
        tasks: [
          { id: 'p4-e1-1', text: 'Read the official eligibility requirements.' },
          { id: 'p4-e1-2', text: 'Confirm whether your expected MSc completion date is acceptable.' },
          { id: 'p4-e1-3', text: 'Check whether provisional transcripts are accepted.' },
          { id: 'p4-e1-4', text: 'Check funding eligibility for international applicants.' },
          { id: 'p4-e1-5', text: 'Identify the required referees.' },
          { id: 'p4-e1-6', text: 'Prepare the motivation letter.' },
          { id: 'p4-e1-7', text: 'Adapt your research-interest statement.' },
          { id: 'p4-e1-8', text: 'Upload the required documents.' },
          { id: 'p4-e1-9', text: 'Review the entire application.' },
          { id: 'p4-e1-10', text: 'Submit before the deadline.' },
          { id: 'p4-e1-11', text: 'Save the confirmation email or application reference.' },
          { id: 'p4-e1-12', text: 'Record the submission date and next stage.' },
        ],
        note: 'Do not wait for a professor to reply if the programme has a central application deadline. If the programme says to apply through its portal, follow that instruction. For example, IMPRS-CPQM explicitly states that applications by email or to individual PIs will not be considered for its current recruitment round. (IMPRS-CPQM)',
      },
    ],
  },
  {
    id: 'p4-ws-f',
    letter: 'F',
    title: 'Research and application support',
    summary: 'Maintain coherent research notes, project list, software skills, and deadline separation.',
    intro: 'This is the part that will make the campaign easier to manage.',
    subsections: [
      {
        id: 'p4-ws-f1',
        title: 'Support habits & assets',
        tasks: [
          { id: 'p4-f1-1', text: 'Keep a folder of papers read.' },
          { id: 'p4-f1-2', text: 'Keep a one-page summary of your research background.' },
          { id: 'p4-f1-3', text: 'Maintain a list of your strongest projects.' },
          { id: 'p4-f1-4', text: 'Keep a record of software and methods you can demonstrate.' },
          { id: 'p4-f1-5', text: 'Prepare a short explanation of your MSc dissertation.' },
          { id: 'p4-f1-6', text: 'Maintain a list of possible PhD research directions.' },
          { id: 'p4-f1-7', text: 'Keep a record of questions to ask professors.' },
          { id: 'p4-f1-8', text: 'Track application deadlines separately from email dates.' },
        ],
        note: 'Your application should present a coherent research profile. It should not look like a random collection of unrelated interests. Your supervoid work can be one important part of that profile, while your broader interests in cosmology, large-scale structure and computational astrophysics can help you approach other groups.',
      },
    ],
  },
];

export const PROJECT_4_WEEKLY_RHYTHM = {
  intro: 'This is the most important part. The work must be organised backwards from your five Monday mornings.',
  subIntro: 'I would use the following weekly rhythm:',
  days: [
    { day: 'Monday morning', focus: 'Send the prepared batch of emails.' },
    { day: 'Monday afternoon', focus: 'Record responses, check application deadlines and select the next batch.' },
    { day: 'Tuesday–Thursday', focus: 'Read papers and prepare professor research notes.' },
    { day: 'Friday', focus: 'Discover new professors and annual programmes.' },
    { day: 'Saturday', focus: 'Work on applications and documents.' },
    { day: 'Sunday', focus: "Finalise and proofread the next Monday's emails." },
  ],
  note: 'You do not have to send emails on any other day.',
};

export const PROJECT_4_WEEKS: Project4Week[] = [
  {
    id: 'p4-week-0',
    label: 'Week 0 — Immediate preparation',
    dates: '19–22 November',
    intro: 'This is a short preparation period before your first Monday.',
    tasks: [
      { id: 'p4-w0-1', text: 'Create the master PhD application folder.' },
      { id: 'p4-w0-2', text: 'Create the professor database.' },
      { id: 'p4-w0-3', text: 'Create the annual programme database.' },
      { id: 'p4-w0-4', text: 'Collect your existing CV.' },
      { id: 'p4-w0-5', text: 'Prepare CV version 1.' },
      { id: 'p4-w0-6', text: 'Contact your university regarding transcripts.' },
      { id: 'p4-w0-7', text: 'Collect all available marksheets and certificates.' },
      { id: 'p4-w0-8', text: 'Identify your referees.' },
      { id: 'p4-w0-9', text: 'Select the first 14 professors from your existing list.' },
      { id: 'p4-w0-10', text: 'Read the research of the first 7–10 professors.' },
      { id: 'p4-w0-11', text: 'Prepare the first email template.' },
      { id: 'p4-w0-12', text: 'Draft and proofread the first batch.' },
    ],
    deliverablesTitle: 'Target for 23 November',
    deliverables: [
      'Send as many fully prepared emails as possible. If you cannot responsibly prepare 14, send fewer. Do not compensate by sending generic emails.',
    ],
  },
  {
    id: 'p4-week-1',
    label: 'Week 1',
    dates: '23–29 November',
    mondayNote: 'Monday 23 November — Email batch 1',
    emailTarget: 14,
    tasks: [
      { id: 'p4-w1-1', text: 'Send the first prepared batch.' },
      { id: 'p4-w1-2', text: 'Complete CV version 1.' },
      { id: 'p4-w1-3', text: 'Obtain or request available academic records.' },
      { id: 'p4-w1-4', text: 'Read the research of the next 14 professors.' },
      { id: 'p4-w1-5', text: 'Identify at least 5 relevant annual programmes or advertised positions.' },
      { id: 'p4-w1-6', text: 'Check 2027 intake deadlines.' },
      { id: 'p4-w1-7', text: 'Prepare your MSc dissertation abstract.' },
      { id: 'p4-w1-8', text: 'Prepare your research-interest statement.' },
      { id: 'p4-w1-9', text: 'Update the email and application trackers.' },
    ],
    deliverablesTitle: 'End-of-week deliverables',
    deliverables: [
      'CV version 1.',
      'Transcripts requested or collected.',
      '14 emails sent, if the preparation allows.',
      '14 additional professors researched.',
      'Initial programme shortlist.',
    ],
  },
  {
    id: 'p4-week-2',
    label: 'Week 2',
    dates: '30 November–6 December',
    mondayNote: 'Monday 30 November — Email batch 2',
    emailTarget: 14,
    tasks: [
      { id: 'p4-w2-1', text: 'Send the second batch.' },
      { id: 'p4-w2-2', text: "Read the next 14 professors' research." },
      { id: 'p4-w2-3', text: 'Expand the professor list beyond supervoid specialists.' },
      { id: 'p4-w2-4', text: 'Search for individual funded PhD vacancies.' },
      { id: 'p4-w2-5', text: 'Check programme eligibility and funding.' },
      { id: 'p4-w2-6', text: 'Prepare the motivation-letter template.' },
      { id: 'p4-w2-7', text: 'Improve CV based on the first version.' },
      { id: 'p4-w2-8', text: 'Add project links when presentable.' },
      { id: 'p4-w2-9', text: 'Contact referees and confirm availability.' },
      { id: 'p4-w2-10', text: 'Start applications with approaching deadlines.' },
    ],
    deliverablesTitle: 'End-of-week deliverables',
    deliverables: [
      '28 cumulative emails sent, if on target.',
      'CV version 2.',
      'Motivation-letter draft.',
      'At least one application ready or submitted, if a suitable opening is available.',
    ],
  },
  {
    id: 'p4-week-3',
    label: 'Week 3',
    dates: '7–13 December',
    mondayNote: 'Monday 7 December — Email batch 3',
    emailTarget: 14,
    tasks: [
      { id: 'p4-w3-1', text: 'Send the third batch.' },
      { id: 'p4-w3-2', text: "Read the next 14 professors' research." },
      { id: 'p4-w3-3', text: 'Review the replies received so far.' },
      { id: 'p4-w3-4', text: 'Follow up only where appropriate.' },
      { id: 'p4-w3-5', text: 'Search for more annual programmes.' },
      { id: 'p4-w3-6', text: 'Check the status of transcripts.' },
      { id: 'p4-w3-7', text: 'Complete the research summary.' },
      { id: 'p4-w3-8', text: 'Submit applications with December deadlines.' },
      { id: 'p4-w3-9', text: 'Identify any missing application documents.' },
      { id: 'p4-w3-10', text: 'Update the professor ranking.' },
    ],
    deliverablesTitle: 'End-of-week deliverables',
    deliverables: [
      '42 cumulative emails sent, if on target.',
      'Research summary completed.',
      'Application documents substantially ready.',
      'December deadlines reviewed.',
    ],
  },
  {
    id: 'p4-week-4',
    label: 'Week 4',
    dates: '14–20 December',
    mondayNote: 'Monday 14 December — Email batch 4',
    emailTarget: 14,
    tasks: [
      { id: 'p4-w4-1', text: 'Send the fourth batch.' },
      { id: 'p4-w4-2', text: "Read the next 14 professors' research." },
      { id: 'p4-w4-3', text: 'Review the programme database.' },
      {
        id: 'p4-w4-4',
        text: 'Check the Durham 15 December fullest-consideration date if relevant to your application. (Astronomy at Durham University)',
      },
      { id: 'p4-w4-5', text: 'Check all January 2027 deadlines.' },
      { id: 'p4-w4-6', text: 'Submit any remaining urgent applications.' },
      { id: 'p4-w4-7', text: 'Check referee submissions.' },
      { id: 'p4-w4-8', text: 'Improve the CV and project descriptions.' },
      { id: 'p4-w4-9', text: 'Prepare a list of applications that need follow-up.' },
    ],
    deliverablesTitle: 'End-of-week deliverables',
    deliverables: [
      '56 cumulative emails sent, if on target.',
      'All urgent December applications handled.',
      'January application calendar prepared.',
    ],
  },
  {
    id: 'p4-week-5',
    label: 'Week 5',
    dates: '21–25 December',
    mondayNote: 'Monday 21 December — Email batch 5',
    emailTarget: 14,
    tasks: [
      { id: 'p4-w5-1', text: 'Send the final batch.' },
      { id: 'p4-w5-2', text: 'Review all 70 email records.' },
      { id: 'p4-w5-3', text: 'Check that every sent email has a recorded date.' },
      { id: 'p4-w5-4', text: 'Record replies and follow-up dates.' },
      { id: 'p4-w5-5', text: 'Review all application deadlines for January and February.' },
      { id: 'p4-w5-6', text: 'Submit any remaining applications that are ready.' },
      { id: 'p4-w5-7', text: 'Identify programmes for the 2028 intake.' },
      { id: 'p4-w5-8', text: 'Make a follow-up plan for January.' },
      { id: 'p4-w5-9', text: 'Prepare a summary of the entire campaign.' },
    ],
    deliverablesTitle: '25 December deliverable',
    deliverables: ['A completed outreach campaign, a documented programme shortlist, and an organised application pipeline.'],
  },
];

export const PROJECT_4_EFFORT_REALITY = {
  intro:
    'I want to be realistic about this. Seventy personalised emails are a substantial amount of work. If you spend approximately 45–90 minutes researching each professor, that is around 52–105 hours of research alone. Add drafting, proofreading, document preparation and programme searches, and the workload becomes significant.',
  tableIntro: 'I suggest using a tiered process:',
  table: [
    {
      category: 'Direct supervoid/void researcher',
      effort: '60–90 min',
      approach: 'Detailed research connection',
    },
    {
      category: 'Closely related cosmologist',
      effort: '45–60 min',
      approach: 'Connect through a specific paper or method',
    },
    {
      category: 'Broader astrophysics researcher',
      effort: '30–45 min',
      approach: 'Focus on a specific research overlap',
    },
    {
      category: 'Programme contact/coordinator',
      effort: 'Depends on programme',
      approach: 'Ask about admission procedure, not research supervision',
    },
  ],
  planningNote: 'These are planning estimates, not a substitute for understanding the work.',
  adjustment:
    'One adjustment I strongly recommend: keep 70 as your target, but maintain a separate count of qualified emails. An email counts as qualified only if you have verified the recipient, read relevant research, established a genuine connection and checked the application route.',
  closing: 'It is better to have 45 strong emails than 70 messages that do not demonstrate research interest.',
};

export const PROJECT_4_FOLDER_STRUCTURE = {
  intro: 'Create one central folder:',
  tree: `PhD_Applications_2027/
│
├── 00_Master_Management/
│   ├── Master_Todo.md
│   ├── Weekly_Progress.md
│   ├── Decision_Log.md
│   └── Deadline_Calendar.xlsx
│
├── 01_Application_Documents/
│   ├── CV/
│   ├── Transcripts/
│   ├── Certificates/
│   ├── Thesis_Abstract/
│   ├── Research_Statement/
│   ├── Motivation_Letters/
│   └── Referees/
│
├── 02_Annual_PhD_Programmes/
│   ├── Germany/
│   ├── Netherlands/
│   ├── France/
│   ├── Switzerland/
│   ├── UK/
│   └── Other_Europe/
│
├── 03_Individual_PhD_Vacancies/
│
├── 04_Professor_Outreach/
│   ├── Professor_Database.xlsx
│   ├── Papers_Read/
│   ├── Research_Notes/
│   ├── Email_Templates/
│   ├── Draft_Emails/
│   └── Sent_Emails/
│
├── 05_Applications_Submitted/
│
└── 06_Replies_and_Followups/`,
  spreadsheetsIntro: 'I would maintain three primary spreadsheets:',
  spreadsheets: [
    { name: 'Professor_Database.xlsx', desc: 'research, paper reading and email status.' },
    { name: 'Programme_Database.xlsx', desc: 'annual programmes, eligibility, deadlines and applications.' },
    { name: 'Application_Dashboard.xlsx', desc: 'documents, referees, submissions and outcomes.' },
  ],
  closingNote: 'Do not combine all three into one enormous spreadsheet. They have different purposes.',
};

export const PROJECT_4_PRIORITY_AUDIT = {
  intro: 'Here is my final dependency audit. These are the tasks that can block everything else.',
  criticalPath: [
    {
      id: 'p4-cp-1',
      title: 'Prepare CV version 1',
      detail: 'You need a usable CV before sending most professor emails and applications.',
      immediate: true,
    },
    {
      id: 'p4-cp-2',
      title: 'Request transcripts and certificates',
      detail: 'Do this now because administrative delays are outside your control.',
      immediate: true,
    },
    {
      id: 'p4-cp-3',
      title: 'Identify referees',
      detail: 'Ask early. Recommendation letters can have separate deadlines.',
      immediate: true,
    },
    {
      id: 'p4-cp-4',
      title: 'Build the two databases',
      detail: 'Separate programme discovery from professor outreach.',
      immediate: false,
    },
    {
      id: 'p4-cp-5',
      title: 'Read papers and qualify professors',
      detail: 'Prepare the first email batch before Monday morning.',
      immediate: false,
    },
    {
      id: 'p4-cp-6',
      title: 'Send emails and submit applications',
      detail: 'Keep the two processes moving independently.',
      immediate: false,
    },
    {
      id: 'p4-cp-7',
      title: 'Track replies and deadlines',
      detail: 'Convert every response into a next action.',
      immediate: false,
    },
  ],
  nonBlockersTitle: 'Things that should not delay the campaign',
  nonBlockers: [
    'Waiting for every GitHub project to be finished before making the CV.',
    'Waiting for all transcripts before contacting professors. You can ask about opportunities while being transparent about your current academic status.',
    'Searching for hundreds of professors before reading the first 20.',
    'Reading every paper by a professor instead of selecting one or two relevant papers.',
    "Waiting for a professor's response before submitting an application through a central portal.",
    'Spending too long perfecting the email template.',
  ],
};

export const PROJECT_4_IMMEDIATE_CHECKLIST = {
  intro: 'This is what I would actually ask you to do next, in order.',
  tasks: [
    { id: 'p4-imm-1', text: 'Create PhD_Applications_2027 folder and the three trackers', category: 'Management' },
    { id: 'p4-imm-2', text: 'Collect your current CV and make a first complete draft', category: 'Documents' },
    { id: 'p4-imm-3', text: 'Contact the university about MSc transcripts and provisional records', category: 'Documents' },
    { id: 'p4-imm-4', text: 'Collect BSc marksheets, degree certificate and available MSc records', category: 'Documents' },
    { id: 'p4-imm-5', text: 'Contact potential referees and confirm their availability', category: 'Documents' },
    { id: 'p4-imm-6', text: 'Write a short MSc dissertation abstract', category: 'Documents' },
    { id: 'p4-imm-7', text: 'Enter the 20 professors already identified into the database', category: 'Professors' },
    { id: 'p4-imm-8', text: "Select and read the first 7–10 professors' relevant papers", category: 'Professors' },
    { id: 'p4-imm-9', text: 'Prepare the three email templates', category: 'Outreach' },
    { id: 'p4-imm-10', text: 'Identify open 2027 PhD vacancies and their deadlines', category: 'Programmes' },
    { id: 'p4-imm-11', text: 'Prepare and proofread the first Monday email batch', category: 'Outreach' },
  ],
};

export const PROJECT_4_DECISIONS = {
  intro: 'There are three details that could materially change the plan:',
  questions: [
    {
      id: 'intake',
      label: 'Target intake',
      question: 'Are you primarily aiming for a PhD starting in September/October 2027, or are you also willing to apply for 2028 entry?',
      options: ['Sept/Oct 2027 only', 'Both 2027 & 2028 entry (Recommended)', '2028 entry primary'],
    },
    {
      id: 'scope',
      label: 'Research scope',
      question:
        'Should the professor search remain centred on supervoids, or should we actively include cosmology, large-scale structure, CMB, dark matter and computational astrophysics?',
      options: [
        'Supervoids only',
        'Broaden to LSS, CMB, cosmology & computational astrophysics (Recommended)',
      ],
    },
    {
      id: 'status',
      label: 'Application status',
      question: 'Are you currently awaiting your MSc final result, or have you completed the MSc and only need the official transcripts?',
      options: ['Awaiting MSc final result', 'Completed MSc — awaiting official transcripts'],
    },
  ],
  recommendation:
    'My recommendation is to pursue both 2027 and 2028 opportunities, and to broaden the professor search beyond supervoids while keeping supervoids as your strongest research connection.',
  closing:
    'The immediate objective is not to write 70 emails. It is to build a system in which every Monday morning you have 14 researched, checked and ready-to-send emails, while your formal applications continue moving forward independently.',
};
