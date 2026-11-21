export interface Project3Task {
  id: string;
  text: string;
  importantByDefault?: boolean;
}

export interface Project3Stage {
  id: string;
  number: string;
  title: string;
  routeNote?: string;
  tasks: Project3Task[];
  subGroupHeading?: string;
  subGroupTasks?: Project3Task[];
  deliverable?: string;
}

export const PROJECT_3_HEADER = {
  title: 'Project 3 — Research Paper on Supervoids',
  meta: ['Research and publication', 'Cosmology / Large-scale structure'],
  objective:
    'Develop an independent research paper on cosmic supervoids, potentially under the guidance of your professor.',
  intro: [
    "Unlike the first two projects, we won't prescribe a detailed scientific methodology yet. The research question, datasets and computational approach are not decided.",
    'For now, we will create a basic research workflow that accommodates two possible routes:',
  ],
  routes: [
    { label: 'Route A:', description: "Work under your professor's guidance." },
    { label: 'Route B:', description: 'Independently identify a research gap and develop the paper.' },
  ],
};

export const PROJECT_3_STARTING_CHECKLIST = {
  intro: 'For now, I would keep the first five tasks as your active checklist.',
  tasks: [
    { id: 'p3-start-1', text: 'Create the Supervoid Research Paper folder.', importantByDefault: true },
    { id: 'p3-start-2', text: 'Create a literature review spreadsheet.' },
    { id: 'p3-start-3', text: 'Collect 5–10 relevant review and research papers.' },
    {
      id: 'p3-start-4',
      text: 'Prepare a short message to your professor expressing your research interest.',
      importantByDefault: true,
    },
    {
      id: 'p3-start-5',
      text: 'Arrange an initial discussion or begin the independent literature review.',
      importantByDefault: true,
    },
  ],
  recommendation:
    "One recommendation: Don't decide the exact supervoid research question yet. First establish whether your professor has an existing research direction. If not, the independent literature review will help you identify a suitable and manageable problem.",
  closingNote:
    'We can expand this roadmap once you have spoken with your professor or identified a promising research gap.',
};

export const PROJECT_3_STAGES: Project3Stage[] = [
  {
    id: 'p3-stage-1',
    number: '1',
    title: 'Initial planning and preparation',
    tasks: [
      { id: 'p3-s1-1', text: 'Create a project folder named Supervoid_Research_Paper.', importantByDefault: true },
      { id: 'p3-s1-2', text: 'Create a research log.' },
      { id: 'p3-s1-3', text: 'Create a literature review spreadsheet.' },
      { id: 'p3-s1-4', text: 'Collect existing notes and resources on supervoids.' },
      { id: 'p3-s1-5', text: 'Prepare a short summary of your research interests.' },
      { id: 'p3-s1-6', text: 'List possible areas of investigation involving supervoids.' },
      { id: 'p3-s1-7', text: 'Identify what theoretical and computational knowledge you already possess.' },
      { id: 'p3-s1-8', text: 'Prepare a preliminary research timeline.' },
    ],
  },
  {
    id: 'p3-stage-2',
    number: '2',
    title: 'Establish research guidance',
    routeNote: 'Route A — Preferred if supervision is available',
    tasks: [
      { id: 'p3-s2-1', text: 'Contact your professor.', importantByDefault: true },
      { id: 'p3-s2-2', text: 'Express your interest in working on supervoids.' },
      { id: 'p3-s2-3', text: 'Explain your intention to develop a research paper.' },
      { id: 'p3-s2-4', text: 'Ask whether they are currently working on related problems.' },
      { id: 'p3-s2-5', text: 'Ask whether there are ongoing projects you could contribute to.' },
      { id: 'p3-s2-6', text: 'Discuss possible research questions.' },
      { id: 'p3-s2-7', text: 'Discuss the expected methodology and available datasets.' },
      { id: 'p3-s2-8', text: 'Ask about the possibility of formal supervision or collaboration.' },
      { id: 'p3-s2-9', text: 'Arrange an initial research discussion.' },
      { id: 'p3-s2-10', text: 'Record the decisions and next steps from the meeting.' },
    ],
    subGroupHeading: 'If collaboration is established:',
    subGroupTasks: [
      { id: 'p3-s2-c1', text: 'Define the research objective with your professor.', importantByDefault: true },
      { id: 'p3-s2-c2', text: 'Agree on responsibilities.' },
      { id: 'p3-s2-c3', text: 'Establish a communication schedule.' },
      { id: 'p3-s2-c4', text: 'Agree on the initial literature and methodology.' },
      { id: 'p3-s2-c5', text: 'Establish a preliminary timeline.' },
    ],
  },
  {
    id: 'p3-stage-3',
    number: '3',
    title: 'Independent literature exploration',
    routeNote: 'Route B — Independent research',
    tasks: [
      { id: 'p3-s3-1', text: 'Search for review papers on cosmic supervoids.' },
      { id: 'p3-s3-2', text: 'Read foundational papers on supervoid identification.' },
      { id: 'p3-s3-3', text: 'Study the physical properties of supervoids.' },
      { id: 'p3-s3-4', text: 'Understand their relationship with the cosmic web.' },
      { id: 'p3-s3-5', text: 'Investigate their cosmological significance.' },
      { id: 'p3-s3-6', text: 'Study observational evidence for supervoids.' },
      { id: 'p3-s3-7', text: 'Investigate their relationship with CMB temperature anomalies.', importantByDefault: true },
      { id: 'p3-s3-8', text: 'Study existing theoretical models.' },
      { id: 'p3-s3-9', text: 'Investigate computational methods used in previous studies.' },
      { id: 'p3-s3-10', text: 'Identify frequently discussed limitations.' },
      { id: 'p3-s3-11', text: 'Collect recent research papers.' },
      { id: 'p3-s3-12', text: 'Maintain a literature comparison table.' },
    ],
  },
  {
    id: 'p3-stage-4',
    number: '4',
    title: 'Identify the research gap',
    tasks: [
      { id: 'p3-s4-1', text: 'Compare existing research questions.' },
      { id: 'p3-s4-2', text: 'Identify areas that have received limited attention.' },
      { id: 'p3-s4-3', text: 'Look for disagreements between published results.' },
      { id: 'p3-s4-4', text: 'Identify limitations in existing datasets.' },
      { id: 'p3-s4-5', text: 'Investigate whether existing methodologies can be improved.' },
      { id: 'p3-s4-6', text: 'Explore possible observational or theoretical extensions.' },
      { id: 'p3-s4-7', text: 'Discuss promising gaps with your professor or AI research assistant.' },
      { id: 'p3-s4-8', text: 'Select one feasible research direction.', importantByDefault: true },
      { id: 'p3-s4-9', text: 'Formulate a preliminary research question.', importantByDefault: true },
    ],
    deliverable: 'A short research proposal explaining what you want to investigate and why it matters.',
  },
  {
    id: 'p3-stage-5',
    number: '5',
    title: 'Develop the methodology',
    tasks: [
      { id: 'p3-s5-1', text: 'Identify the theoretical framework.' },
      { id: 'p3-s5-2', text: 'Select the relevant observational or simulation datasets.' },
      { id: 'p3-s5-3', text: 'Identify the mathematical tools required.' },
      { id: 'p3-s5-4', text: 'Decide which computational methods are needed.' },
      { id: 'p3-s5-5', text: 'Establish the analysis pipeline.', importantByDefault: true },
      { id: 'p3-s5-6', text: 'Identify the statistical methods.' },
      { id: 'p3-s5-7', text: 'Define validation and uncertainty checks.' },
      { id: 'p3-s5-8', text: 'Estimate computational requirements.' },
      { id: 'p3-s5-9', text: 'Prepare a methodology document.' },
      { id: 'p3-s5-10', text: 'Review the methodology with your professor or research supervisor.' },
    ],
  },
  {
    id: 'p3-stage-6',
    number: '6',
    title: 'Conduct the research',
    tasks: [
      { id: 'p3-s6-1', text: 'Acquire the selected datasets.' },
      { id: 'p3-s6-2', text: 'Organise and inspect the data.' },
      { id: 'p3-s6-3', text: 'Implement the computational methodology.' },
      { id: 'p3-s6-4', text: 'Perform preliminary calculations.' },
      { id: 'p3-s6-5', text: 'Validate the implementation.' },
      { id: 'p3-s6-6', text: 'Conduct the main analysis.', importantByDefault: true },
      { id: 'p3-s6-7', text: 'Generate figures and tables.' },
      { id: 'p3-s6-8', text: 'Estimate uncertainties.' },
      { id: 'p3-s6-9', text: 'Perform robustness checks.' },
      { id: 'p3-s6-10', text: 'Compare results with previous research.' },
      { id: 'p3-s6-11', text: 'Interpret the physical implications.' },
      { id: 'p3-s6-12', text: 'Maintain a record of all computational experiments.' },
    ],
  },
  {
    id: 'p3-stage-7',
    number: '7',
    title: 'Write the research paper',
    tasks: [
      { id: 'p3-s7-1', text: 'Prepare the paper outline.' },
      { id: 'p3-s7-2', text: 'Write the introduction.' },
      { id: 'p3-s7-3', text: 'Develop the theoretical background.' },
      { id: 'p3-s7-4', text: 'Describe the datasets.' },
      { id: 'p3-s7-5', text: 'Write the methodology.' },
      { id: 'p3-s7-6', text: 'Present the results.' },
      { id: 'p3-s7-7', text: 'Discuss the physical interpretation.' },
      { id: 'p3-s7-8', text: 'Write the conclusion.' },
      { id: 'p3-s7-9', text: 'Prepare the abstract.' },
      { id: 'p3-s7-10', text: 'Finalise figures and tables.' },
      { id: 'p3-s7-11', text: 'Add references and citations.' },
      { id: 'p3-s7-12', text: 'Check mathematical consistency.' },
      { id: 'p3-s7-13', text: 'Review the manuscript with your professor or collaborators.' },
      { id: 'p3-s7-14', text: 'Incorporate feedback.' },
      { id: 'p3-s7-15', text: 'Prepare the final manuscript.', importantByDefault: true },
    ],
  },
  {
    id: 'p3-stage-8',
    number: '8',
    title: 'Publication preparation',
    tasks: [
      { id: 'p3-s8-1', text: 'Identify suitable journals.' },
      { id: 'p3-s8-2', text: 'Check their scope and submission requirements.' },
      { id: 'p3-s8-3', text: 'Check formatting requirements.' },
      { id: 'p3-s8-4', text: 'Prepare supplementary material.' },
      { id: 'p3-s8-5', text: 'Prepare the code and data availability statement.' },
      { id: 'p3-s8-6', text: 'Perform a final scientific review.' },
      { id: 'p3-s8-7', text: 'Submit the manuscript.', importantByDefault: true },
      { id: 'p3-s8-8', text: 'Track the submission.' },
      { id: 'p3-s8-9', text: 'Respond to reviewer comments if received.' },
      { id: 'p3-s8-10', text: 'Prepare revised versions where necessary.' },
    ],
  },
];

export const PROJECT_3_DELIVERABLES = [
  { stage: 'Initial planning', output: 'Project outline' },
  { stage: 'Professor discussion', output: 'Supervision/collaboration decision' },
  { stage: 'Literature exploration', output: 'Literature matrix' },
  { stage: 'Research gap', output: 'Preliminary research proposal' },
  { stage: 'Methodology', output: 'Research methodology document' },
  { stage: 'Analysis', output: 'Validated results and figures' },
  { stage: 'Writing', output: 'Complete manuscript' },
  { stage: 'Publication', output: 'Journal submission' },
];
