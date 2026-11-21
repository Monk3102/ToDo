export type EquationId = 'density-contrast' | 'effective-radius' | 'isw-effect' | 'healpix-npix';

export interface MasterTask {
  id: string;
  text: string;
  importantByDefault?: boolean;
}

export interface ExecutionBlock {
  id: string;
  heading: string;
  intro?: string;
  items?: {
    id: string;
    text: string;
    numbered?: number;
  }[];
  orderedListTitle?: string;
  orderedItems?: {
    id: string;
    text: string;
  }[];
  folderTree?: string;
  equation?: {
    id: EquationId;
    caption?: string;
  };
  table?: {
    columns: string[];
    rows: string[][];
  };
  expectedOutcome?: string;
  note?: string;
}

export interface PhaseData {
  id: string;
  number: string;
  title: string;
  duration: string;
  tagNote?: string;
  isStartHere?: boolean;
  isCoreMilestone?: boolean;
  masterTasks: MasterTask[];
  detailIntro?: string;
  detailReferences?: {
    label: string;
    title: string;
    note?: string;
  }[];
  detailBlocks: ExecutionBlock[];
  completionCondition: string;
  completionChain?: string[];
}

export const PROJECT_HEADER = {
  title: 'Project 1 — Cosmic Voids and CMB Temperature Cross-Correlation',
  meta: ['Research project', 'Computational cosmology', 'Execution roadmap'],
  intro: [
    'Our first project will investigate the relationship between cosmic voids and temperature fluctuations in the Cosmic Microwave Background (CMB).',
    'The central idea is to use a catalogue of cosmic voids and a CMB temperature map to investigate whether voids leave a detectable temperature signature in the CMB through the Integrated Sachs–Wolfe (ISW) effect.',
    "We'll approach this as an actual research project, not simply a coding exercise.",
  ],
};

export const SECTION_1_DEFINITION = {
  links: [
    {
      title: 'Map of nothing: Astronomers size up the vast void next door to the Milky Way',
      source: 'newatlas.com',
      url: 'https://newatlas.com/local-void-galaxy-mapped/60706/?utm_source=chatgpt.com',
    },
  ],
  workingQuestion:
    'Can we detect a statistically significant temperature signature around cosmic voids by stacking CMB temperature maps at their locations, and how does this signature depend on void properties?',
  approachTable: [
    { component: 'Tracer', choice: 'Cosmic void catalogue' },
    { component: 'CMB data', choice: 'Planck 2018 PR3' },
    { component: 'Initial CMB map', choice: 'SMICA temperature map' },
    { component: 'Void catalogue', choice: 'BOSS DR11 or DESIVAST' },
    { component: 'Main physical effect', choice: 'Integrated Sachs–Wolfe effect' },
    { component: 'Main technique', choice: 'Void-centred temperature stacking' },
    { component: 'Statistical analysis', choice: 'Randomisations, bootstrap, covariance and significance' },
    { component: 'Theoretical comparison', choice: 'ΛCDM predictions' },
  ],
  approachNote:
    'We will not commit blindly to every dataset. One of the first tasks will be to understand which catalogue and CMB map are scientifically compatible.',
  deliverables: [
    'A scientifically motivated research question.',
    'A literature review of voids, ISW and previous stacking measurements.',
    'A reproducible Python analysis pipeline.',
    'A validated void catalogue and CMB dataset.',
    'Void-centred CMB temperature profiles.',
    'Statistical significance and null-test results.',
    'Robustness tests.',
    'Comparison with theoretical expectations.',
    'A research manuscript and documented code repository.',
  ],
};

export const SECTION_2_TWO_AI_SYSTEM = {
  intro: 'This is an important part of the project. We will establish the working arrangement before writing substantial code.',
  roles: [
    {
      title: 'AI 1 — Research Architect',
      subtitle: 'High-complexity model',
      summary: 'Plans, reasons, evaluates and supervises',
      responsibilities: [
        'Break the research into scientific stages.',
        'Design the mathematical methodology.',
        'Decide which data and algorithms are required.',
        'Identify relevant papers and learning material.',
        "Review the code-writing model's output.",
        'Design validation and statistical tests.',
        'Decide when we are ready to proceed.',
      ],
    },
    {
      title: 'AI 2 — Implementation Engineer',
      subtitle: 'Simpler, coding-focused model',
      summary: "Implements the architect's instructions",
      responsibilities: [
        'Write Python scripts.',
        'Implement mathematical expressions.',
        'Process FITS files and catalogues.',
        'Generate plots and tables.',
        'Debug errors.',
        'Follow the specified folder structure.',
        'Report outputs and unresolved problems.',
      ],
    },
    {
      title: 'You — Researcher and final decision-maker',
      subtitle: 'Human principal investigator',
      summary: 'Studies, runs, verifies and approves',
      responsibilities: [
        'Study the concepts recommended by AI 1.',
        'Understand the scientific reasoning.',
        'Run and inspect the code.',
        'Verify results against physical expectations.',
        'Approve each stage before moving forward.',
      ],
    },
  ],
  workingCycle: [
    'Ask AI 1 to define the next scientific task.',
    'Ask it to explain the physics and mathematics involved.',
    'Request specific lectures, book chapters, review papers or documentation.',
    'Study the recommended material.',
    'Ask AI 1 to prepare an implementation specification.',
    'Give that specification to AI 2.',
    'Run the generated code.',
    'Send the code, outputs and errors back to AI 1.',
    'Validate the results.',
    'Mark the task complete only after verification.',
  ],
  importantRule:
    'Important rule: AI 2 must not independently change the scientific methodology. If it discovers a problem, it should report it to AI 1 rather than silently changing the approach.',
};

export const PHASES: PhaseData[] = [
  {
    id: 'phase-00',
    number: 'Phase 00',
    title: 'Project organisation and AI setup',
    duration: '2–3 days',
    isStartHere: true,
    masterTasks: [
      { id: 'p00-t1', text: 'Create the project folder and GitHub repository.', importantByDefault: true },
      { id: 'p00-t2', text: 'Set up the two AI models and define their roles.', importantByDefault: true },
      { id: 'p00-t3', text: 'Create the research log and decision log.' },
      { id: 'p00-t4', text: 'Ask AI 1 to prepare the project architecture.', importantByDefault: true },
      { id: 'p00-t5', text: 'Create a project roadmap with dependencies.' },
    ],
    detailBlocks: [
      {
        id: 'p00-a',
        heading: 'A. Create the project workspace',
        items: [
          { id: 'p00-a-1', text: 'Create a folder named Void_CMB_Correlation.' },
          { id: 'p00-a-2', text: 'Create the following subfolders:' },
        ],
        folderTree: `Void_CMB_Correlation/
│
├── 00_Project_Management/
│   ├── Roadmap/
│   ├── Research_Log/
│   ├── Decision_Log/
│   └── Meeting_Notes/
│
├── 01_Literature/
│   ├── Review_Papers/
│   ├── Research_Papers/
│   └── Reading_Notes/
│
├── 02_Learning/
│   ├── Lectures/
│   ├── Mathematics/
│   └── Concepts/
│
├── 03_Data/
│   ├── Raw/
│   ├── Processed/
│   └── Metadata/
│
├── 04_Code/
│   ├── Notebooks/
│   ├── Scripts/
│   ├── Tests/
│   └── Utilities/
│
├── 05_Results/
│   ├── Figures/
│   ├── Tables/
│   └── Statistical_Results/
│
└── 06_Manuscript/
    ├── Drafts/
    ├── References/
    └── Final/`,
        orderedItems: [
          { id: 'p00-a-3', text: 'Initialise a Git repository.' },
          { id: 'p00-a-4', text: 'Create a .gitignore file.' },
          { id: 'p00-a-5', text: 'Keep large raw datasets outside normal Git commits.' },
          { id: 'p00-a-6', text: 'Create a README.md describing the research objective.' },
          { id: 'p00-a-7', text: 'Create a requirements.txt or equivalent environment specification.' },
          { id: 'p00-a-8', text: 'Record Python and package versions.' },
        ],
      },
      {
        id: 'p00-b',
        heading: 'B. Configure AI 1',
        items: [
          { id: 'p00-b-1', text: 'Explain the complete project objective.' },
          { id: 'p00-b-2', text: 'Give it the responsibility of scientific supervision.' },
          { id: 'p00-b-3', text: 'Tell it that you are learning while developing the project.' },
          { id: 'p00-b-4', text: 'Require explanations before unfamiliar mathematical or computational steps.' },
          { id: 'p00-b-5', text: 'Require references for scientific claims.' },
          { id: 'p00-b-6', text: 'Require it to distinguish established results from its own suggestions.' },
          { id: 'p00-b-7', text: 'Ask it to maintain a list of pending decisions.' },
          { id: 'p00-b-8', text: 'Ask it to divide the project into small, independently verifiable milestones.' },
        ],
      },
      {
        id: 'p00-c',
        heading: 'C. Configure AI 2',
        items: [
          { id: 'p00-c-1', text: 'Explain that it is an implementation assistant.' },
          { id: 'p00-c-2', text: 'Give it the folder structure.' },
          { id: 'p00-c-3', text: "Tell it to follow AI 1's specifications." },
          { id: 'p00-c-4', text: 'Require comments and docstrings in the code.' },
          { id: 'p00-c-5', text: 'Require input/output descriptions for every major function.' },
          { id: 'p00-c-6', text: 'Require small test scripts.' },
          { id: 'p00-c-7', text: 'Tell it not to fabricate datasets or numerical results.' },
          { id: 'p00-c-8', text: 'Require a summary of changed files after every coding task.' },
        ],
      },
      {
        id: 'p00-d',
        heading: 'D. Establish the communication protocol',
        intro: 'Create a document named AI_Workflow_Protocol.md. Every coding assignment should contain:',
        items: [
          { id: 'p00-d-1', numbered: 1, text: 'Task identification.' },
          { id: 'p00-d-2', numbered: 2, text: 'Scientific purpose.' },
          { id: 'p00-d-3', numbered: 3, text: 'Mathematical background.' },
          { id: 'p00-d-4', numbered: 4, text: 'Input data and expected format.' },
          { id: 'p00-d-5', numbered: 5, text: 'Required operations.' },
          { id: 'p00-d-6', numbered: 6, text: 'Expected outputs.' },
          { id: 'p00-d-7', numbered: 7, text: 'Validation requirements.' },
          { id: 'p00-d-8', numbered: 8, text: 'Files to create or modify.' },
          { id: 'p00-d-9', numbered: 9, text: 'Known limitations.' },
        ],
      },
    ],
    completionCondition:
      'Both models have clear responsibilities, the workspace exists, and the first scientific roadmap has been produced.',
  },
  {
    id: 'phase-01',
    number: 'Phase 01',
    title: 'Scientific foundation',
    duration: '2 weeks',
    masterTasks: [
      { id: 'p01-t1', text: 'Study the cosmological large-scale structure.' },
      { id: 'p01-t2', text: 'Understand cosmic voids and their properties.' },
      { id: 'p01-t3', text: 'Study the CMB and its temperature anisotropies.' },
      { id: 'p01-t4', text: 'Understand gravitational redshift and the ISW effect.', importantByDefault: true },
      { id: 'p01-t5', text: 'Understand why voids can produce a temperature signal.', importantByDefault: true },
      { id: 'p01-t6', text: 'Study the ΛCDM background model.' },
    ],
    detailIntro:
      "This is where your learning begins. Don't start by learning all of cosmology. Learn only what is required for the next scientific operation.",
    detailBlocks: [
      {
        id: 'p01-a',
        heading: 'A. Learn large-scale structure',
        items: [
          { id: 'p01-a-1', text: 'Understand the cosmic web.' },
          { id: 'p01-a-2', text: 'Study galaxy clusters, filaments, walls and voids.' },
          { id: 'p01-a-3', text: 'Understand how density fluctuations evolve.' },
          { id: 'p01-a-4', text: 'Study the matter density contrast:' },
          { id: 'p01-a-5', text: 'Understand underdense and overdense regions.' },
          { id: 'p01-a-6', text: 'Understand the relationship between density and gravitational potential.' },
        ],
        equation: { id: 'density-contrast' },
        expectedOutcome: 'You should be able to explain what a cosmic void is and why it matters in cosmology.',
      },
      {
        id: 'p01-b',
        heading: 'B. Learn cosmic voids',
        items: [
          { id: 'p01-b-1', text: 'Understand how voids are identified in galaxy surveys.' },
          { id: 'p01-b-2', text: 'Study watershed-based void identification.' },
          { id: 'p01-b-3', text: 'Understand void radius and effective radius.' },
          { id: 'p01-b-4', text: 'Understand void density profiles.' },
          { id: 'p01-b-5', text: 'Study compensated and uncompensated voids.' },
          { id: 'p01-b-6', text: 'Understand void merging and hierarchical structure.' },
          { id: 'p01-b-7', text: 'Learn how void catalogues depend on survey selection and tracer density.' },
        ],
        equation: { id: 'effective-radius', caption: 'Important mathematical concept — where V is the effective void volume.' },
        expectedOutcome: 'You should be able to interpret the properties stored in a real void catalogue.',
      },
      {
        id: 'p01-c',
        heading: 'C. Learn the CMB',
        items: [
          { id: 'p01-c-1', text: 'Understand the origin of the CMB.' },
          { id: 'p01-c-2', text: 'Study recombination and the surface of last scattering.' },
          { id: 'p01-c-3', text: 'Understand CMB temperature anisotropies.' },
          { id: 'p01-c-4', text: 'Learn how temperature maps are represented on the celestial sphere.' },
          { id: 'p01-c-5', text: 'Understand angular power spectra.' },
          { id: 'p01-c-6', text: 'Learn the difference between primordial and secondary anisotropies.' },
          { id: 'p01-c-7', text: 'Understand foreground contamination and instrumental effects.' },
        ],
        expectedOutcome: 'You should understand what information a Planck temperature map contains.',
      },
      {
        id: 'p01-d',
        heading: 'D. Learn the Integrated Sachs–Wolfe effect',
        intro: 'This is the central physical mechanism of our project.',
        items: [
          { id: 'p01-d-1', text: 'Study gravitational redshift.' },
          { id: 'p01-d-2', text: 'Understand the Sachs–Wolfe effect.' },
          { id: 'p01-d-3', text: 'Distinguish the ordinary Sachs–Wolfe and Integrated Sachs–Wolfe effects.' },
          { id: 'p01-d-4', text: 'Understand why evolving gravitational potentials matter.' },
          { id: 'p01-d-5', text: 'Study how cosmic expansion affects gravitational potentials.' },
          { id: 'p01-d-6', text: 'Understand how photons interact with evolving potentials.' },
          { id: 'p01-d-7', text: 'Understand why voids can produce a characteristic ISW temperature signal.' },
          { id: 'p01-d-8', text: 'Study the dependence of the effect on void size, density and redshift.' },
        ],
        equation: {
          id: 'isw-effect',
          caption: 'A useful starting expression — Φ is the gravitational potential, with the precise sign convention depending on the convention used.',
        },
        expectedOutcome: 'You should be able to explain the physical origin of the expected temperature signature without relying on a coding model.',
      },
      {
        id: 'p01-e',
        heading: 'E. Learn the ΛCDM background',
        items: [
          { id: 'p01-e-1', text: 'Understand the Friedmann equations.' },
          { id: 'p01-e-2', text: 'Study matter density and dark energy density.' },
          { id: 'p01-e-3', text: 'Understand the Hubble parameter H(z).' },
          { id: 'p01-e-4', text: 'Learn the evolution of density perturbations.' },
          { id: 'p01-e-5', text: 'Understand why gravitational potentials evolve in a dark-energy-dominated universe.' },
          { id: 'p01-e-6', text: 'Study the theoretical ISW contribution.' },
        ],
      },
    ],
    completionCondition: 'You can explain the physical chain:',
    completionChain: [
      'Cosmic expansion',
      'evolving gravitational potentials',
      'photon energy change',
      'CMB temperature anisotropy',
      'possible void-centred signal',
    ],
  },
  {
    id: 'phase-02',
    number: 'Phase 02',
    title: 'Literature review',
    duration: '1–2 weeks',
    masterTasks: [
      { id: 'p02-t1', text: 'Find foundational ISW papers.' },
      { id: 'p02-t2', text: 'Read observational void–ISW cross-correlation papers.', importantByDefault: true },
      { id: 'p02-t3', text: 'Identify the methods used in previous stacking analyses.' },
      { id: 'p02-t4', text: 'Record datasets, masks, filters and statistical methods.' },
      { id: 'p02-t5', text: 'Identify the unresolved question for this project.', importantByDefault: true },
      { id: 'p02-t6', text: 'Prepare a literature comparison table.' },
    ],
    detailIntro: "Don't collect 100 papers and start reading randomly. Build the literature review around the scientific question.",
    detailBlocks: [
      {
        id: 'p02-a',
        heading: 'A. Find foundational papers',
        items: [
          { id: 'p02-a-1', text: 'Find the original theoretical literature on the Sachs–Wolfe effect.' },
          { id: 'p02-a-2', text: 'Find foundational papers on the ISW effect.' },
          { id: 'p02-a-3', text: 'Find theoretical papers on the ISW signal from voids.' },
          { id: 'p02-a-4', text: 'Find papers on cosmic void identification.' },
          { id: 'p02-a-5', text: 'Find papers on void density profiles.' },
        ],
      },
      {
        id: 'p02-b',
        heading: 'B. Study observational work',
        items: [
          { id: 'p02-b-1', text: 'Find studies that cross-correlate galaxy distributions with CMB temperature.' },
          { id: 'p02-b-2', text: 'Find studies that stack CMB maps around cosmic voids.' },
          { id: 'p02-b-3', text: 'Identify studies using Planck data.' },
          { id: 'p02-b-4', text: 'Identify studies using BOSS or other spectroscopic void catalogues.' },
          { id: 'p02-b-5', text: 'Find studies that report detections or non-detections.' },
          { id: 'p02-b-6', text: 'Investigate disagreements between different observational results.' },
        ],
      },
      {
        id: 'p02-c',
        heading: 'C. Prepare a literature matrix',
        intro: 'Create an Excel sheet with these columns:',
        table: {
          columns: ['Column', 'Information'],
          rows: [
            ['Paper', 'Title and authors'],
            ['Year', 'Publication year'],
            ['Objective', 'What was investigated'],
            ['Catalogue', 'Void or galaxy dataset'],
            ['CMB data', 'Experiment and map'],
            ['Method', 'Stacking/cross-correlation'],
            ['Statistics', 'Significance and uncertainty'],
            ['Main finding', 'Result'],
            ['Limitation', 'What remains unresolved'],
            ['Relevance', 'How it helps our project'],
          ],
        },
      },
      {
        id: 'p02-d',
        heading: 'D. Ask AI 1 to identify the research gap',
        items: [
          { id: 'p02-d-1', text: 'Give AI 1 the papers you have collected.' },
          { id: 'p02-d-2', text: 'Ask it to compare their methodologies.' },
          { id: 'p02-d-3', text: 'Ask it to identify disagreements.' },
          { id: 'p02-d-4', text: 'Ask it to distinguish methodological limitations from physical disagreements.' },
          { id: 'p02-d-5', text: 'Ask it to suggest a research question that can realistically be addressed with available data.' },
          { id: 'p02-d-6', text: 'Verify its claims against the actual papers.' },
        ],
      },
    ],
    completionCondition: 'You have a literature matrix and a defensible research question.',
  },
  {
    id: 'phase-03',
    number: 'Phase 03',
    title: 'Computational preparation',
    duration: '1–2 weeks',
    masterTasks: [
      { id: 'p03-t1', text: 'Set up Python and a dedicated environment.' },
      { id: 'p03-t2', text: 'Learn NumPy and SciPy functions required for the project.' },
      { id: 'p03-t3', text: 'Learn Astropy and FITS handling.' },
      { id: 'p03-t4', text: 'Learn HEALPix and healpy.', importantByDefault: true },
      { id: 'p03-t5', text: 'Understand spherical coordinates and angular distances.' },
      { id: 'p03-t6', text: 'Create a small test analysis using synthetic data.', importantByDefault: true },
    ],
    detailIntro: 'We will use Python, but we should not learn every Python library available.',
    detailBlocks: [
      {
        id: 'p03-a',
        heading: 'A. Python fundamentals',
        items: [
          { id: 'p03-a-1', text: 'Learn arrays and array indexing using NumPy.' },
          { id: 'p03-a-2', text: 'Learn mathematical operations on arrays.' },
          { id: 'p03-a-3', text: 'Learn file handling.' },
          { id: 'p03-a-4', text: 'Learn functions and modules.' },
          { id: 'p03-a-5', text: 'Learn plotting using Matplotlib.' },
          { id: 'p03-a-6', text: 'Learn basic data manipulation using Pandas.' },
          { id: 'p03-a-7', text: 'Understand exceptions and debugging.' },
        ],
      },
      {
        id: 'p03-b',
        heading: 'B. Scientific Python',
        items: [
          { id: 'p03-b-1', text: 'Learn SciPy functions relevant to interpolation and statistics.' },
          { id: 'p03-b-2', text: 'Learn Astropy units.' },
          { id: 'p03-b-3', text: 'Learn Astropy coordinates.' },
          { id: 'p03-b-4', text: 'Learn Astropy tables.' },
          { id: 'p03-b-5', text: 'Learn FITS file handling.' },
          { id: 'p03-b-6', text: 'Learn healpy.' },
          { id: 'p03-b-7', text: 'Understand HEALPix pixelisation.' },
          { id: 'p03-b-8', text: 'Understand nside, npix and pix2ang.' },
          { id: 'p03-b-9', text: 'Understand map resolution and pixel area.' },
        ],
      },
      {
        id: 'p03-c',
        heading: 'C. Make small independent exercises',
        items: [
          { id: 'p03-c-1', text: 'Load a sample FITS file.' },
          { id: 'p03-c-2', text: 'Display a HEALPix map.' },
          { id: 'p03-c-3', text: 'Convert a right ascension and declination into a HEALPix pixel.' },
          { id: 'p03-c-4', text: 'Calculate angular separation between two sky positions.' },
          { id: 'p03-c-5', text: 'Plot a radial temperature profile from a synthetic map.' },
          { id: 'p03-c-6', text: 'Calculate a mean and standard deviation.' },
          { id: 'p03-c-7', text: 'Generate random points on a sphere.' },
        ],
      },
    ],
    completionCondition: 'You can independently understand the basic operations that the analysis pipeline will perform.',
  },
  {
    id: 'phase-04',
    number: 'Phase 04',
    title: 'Dataset selection and acquisition',
    duration: '1 week',
    masterTasks: [
      { id: 'p04-t1', text: 'Inspect candidate void catalogues.' },
      { id: 'p04-t2', text: 'Select a catalogue and understand its selection function.', importantByDefault: true },
      { id: 'p04-t3', text: 'Download the catalogue and documentation.' },
      { id: 'p04-t4', text: 'Inspect the Planck SMICA temperature map.' },
      { id: 'p04-t5', text: 'Obtain the associated mask and relevant auxiliary products.' },
      { id: 'p04-t6', text: 'Check coordinate systems, units, resolution and data coverage.', importantByDefault: true },
    ],
    detailReferences: [
      {
        label: 'CMB data: Planck 2018 PR3',
        title: 'Best Map Ever of the Universe | NASA Jet Propulsion Laboratory (JPL)',
        note: 'Initial candidate: SMICA temperature map, along with its associated mask and necessary metadata.',
      },
      {
        label: 'Void data: BOSS DR11 or DESIVAST',
        title: 'Plotting and data visualisation - ASTR 480',
        note: 'Initial candidates for a spectroscopic void catalogue.',
      },
    ],
    detailBlocks: [
      {
        id: 'p04-a',
        heading: 'A. Inspect void catalogues',
        items: [
          { id: 'p04-a-1', text: 'Locate the original catalogue publication.' },
          { id: 'p04-a-2', text: 'Read its data documentation.' },
          { id: 'p04-a-3', text: 'Identify the survey footprint.' },
          { id: 'p04-a-4', text: 'Identify the redshift range.' },
          { id: 'p04-a-5', text: 'Identify the void-finding algorithm.' },
          { id: 'p04-a-6', text: 'Identify the void centre definition.' },
          { id: 'p04-a-7', text: 'Identify the effective radius.' },
          { id: 'p04-a-8', text: 'Understand how the catalogue handles survey boundaries.' },
          { id: 'p04-a-9', text: 'Check whether the catalogue includes additional void properties.' },
        ],
      },
      {
        id: 'p04-b',
        heading: 'B. Inspect Planck data',
        items: [
          { id: 'p04-b-1', text: 'Locate the official Planck Legacy Archive.' },
          { id: 'p04-b-2', text: 'Find the relevant SMICA temperature product.' },
          { id: 'p04-b-3', text: 'Identify its units.' },
          { id: 'p04-b-4', text: 'Identify its HEALPix resolution.' },
          { id: 'p04-b-5', text: 'Locate the corresponding confidence or analysis mask.' },
          { id: 'p04-b-6', text: 'Understand the mask convention.' },
          { id: 'p04-b-7', text: 'Identify any necessary beam or transfer-function information.' },
          { id: 'p04-b-8', text: 'Read the product documentation.' },
        ],
      },
      {
        id: 'p04-c',
        heading: 'C. Check compatibility',
        items: [
          { id: 'p04-c-1', text: "Compare the void catalogue's sky coverage with the CMB mask." },
          { id: 'p04-c-2', text: 'Check coordinate conventions.' },
          { id: 'p04-c-3', text: 'Check redshift and angular-diameter-distance conventions.' },
          { id: 'p04-c-4', text: 'Determine how masked pixels will be handled.' },
          { id: 'p04-c-5', text: 'Decide which voids are eligible for the analysis.' },
          { id: 'p04-c-6', text: 'Record all selection cuts and their scientific justification.' },
        ],
      },
    ],
    completionCondition: 'The dataset choices are documented, downloaded and independently understood.',
  },
  {
    id: 'phase-05',
    number: 'Phase 05',
    title: 'Data preparation',
    duration: '1–2 weeks',
    masterTasks: [
      { id: 'p05-t1', text: 'Read the void catalogue.' },
      { id: 'p05-t2', text: 'Validate sky coordinates and redshifts.' },
      { id: 'p05-t3', text: 'Inspect void radii and other properties.' },
      { id: 'p05-t4', text: 'Load the CMB map and mask.' },
      { id: 'p05-t5', text: 'Convert catalogue positions to HEALPix coordinates.', importantByDefault: true },
      { id: 'p05-t6', text: 'Check map units and angular conventions.' },
      { id: 'p05-t7', text: 'Create quality-control plots.' },
    ],
    detailIntro: 'Now we start working with the actual observational data.',
    detailBlocks: [
      {
        id: 'p05-a',
        heading: 'A. Void catalogue',
        items: [
          { id: 'p05-a-1', text: 'Load the catalogue using Astropy or Pandas.' },
          { id: 'p05-a-2', text: 'Print the first few rows.' },
          { id: 'p05-a-3', text: 'Inspect all available column names.' },
          { id: 'p05-a-4', text: 'Identify right ascension (RA).' },
          { id: 'p05-a-5', text: 'Identify declination (Dec).' },
          { id: 'p05-a-6', text: 'Identify redshift.' },
          { id: 'p05-a-7', text: 'Identify effective radius.' },
          { id: 'p05-a-8', text: 'Identify any density or compensation parameters.' },
          { id: 'p05-a-9', text: 'Check for missing values.' },
          { id: 'p05-a-10', text: 'Check for duplicate entries.' },
          { id: 'p05-a-11', text: 'Plot the distribution of void redshifts.' },
          { id: 'p05-a-12', text: 'Plot the distribution of void radii.' },
          { id: 'p05-a-13', text: 'Plot the angular distribution of void centres.' },
          { id: 'p05-a-14', text: 'Record the number of voids before and after quality cuts.' },
        ],
      },
      {
        id: 'p05-b',
        heading: 'B. CMB map',
        items: [
          { id: 'p05-b-1', text: 'Load the FITS map.' },
          { id: 'p05-b-2', text: 'Inspect its metadata and headers.' },
          { id: 'p05-b-3', text: "Determine the map's coordinate convention." },
          { id: 'p05-b-4', text: 'Display the full-sky map.' },
          { id: 'p05-b-5', text: 'Load the corresponding mask.' },
          { id: 'p05-b-6', text: 'Display the mask.' },
          { id: 'p05-b-7', text: 'Check the fraction of usable sky.' },
          { id: 'p05-b-8', text: 'Check for invalid or masked pixels.' },
          { id: 'p05-b-9', text: 'Understand whether temperature values need unit conversion.' },
          { id: 'p05-b-10', text: 'Record the map resolution and other relevant metadata.' },
        ],
      },
      {
        id: 'p05-c',
        heading: 'C. Coordinate conversion',
        items: [
          { id: 'p05-c-1', text: 'Understand the relationship between RA, Dec and spherical coordinates.' },
          { id: 'p05-c-2', text: 'Convert void centres into the coordinate system used by the CMB map.' },
          { id: 'p05-c-3', text: 'Convert positions into HEALPix pixel indices.' },
          { id: 'p05-c-4', text: 'Test conversions using a few known positions.' },
          { id: 'p05-c-5', text: 'Calculate angular separation between void centres.' },
          { id: 'p05-c-6', text: 'Verify that the converted coordinates point to the correct sky locations.' },
        ],
      },
      {
        id: 'p05-d',
        heading: 'D. Quality-control plots',
        intro: 'Generate the following:',
        items: [
          { id: 'p05-d-1', numbered: 1, text: 'Void positions on the celestial sphere.' },
          { id: 'p05-d-2', numbered: 2, text: 'Void redshift histogram.' },
          { id: 'p05-d-3', numbered: 3, text: 'Void effective-radius histogram.' },
          { id: 'p05-d-4', numbered: 4, text: 'CMB temperature map with void centres overlaid.' },
          { id: 'p05-d-5', numbered: 5, text: 'Survey footprint and CMB mask comparison.' },
        ],
      },
    ],
    completionCondition: 'You have a clean, documented void catalogue and a properly loaded CMB map.',
  },
  {
    id: 'phase-06',
    number: 'Phase 06',
    title: 'Main stacking analysis',
    duration: '2 weeks',
    isCoreMilestone: true,
    masterTasks: [
      { id: 'p06-t1', text: 'Define void-centred angular coordinates.' },
      { id: 'p06-t2', text: 'Extract CMB temperature patches or radial profiles.' },
      { id: 'p06-t3', text: 'Implement stacking across all selected voids.', importantByDefault: true },
      { id: 'p06-t4', text: 'Calculate mean and median profiles.' },
      { id: 'p06-t5', text: 'Repeat for different void-size bins.' },
      { id: 'p06-t6', text: 'Visualise the stacked temperature signal.', importantByDefault: true },
    ],
    detailIntro: 'Core computational milestone — This is where the central analysis happens.',
    detailBlocks: [
      {
        id: 'p06-a',
        heading: 'A. Understand the stacking technique',
        intro: 'Before implementation:',
        items: [
          { id: 'p06-a-1', text: 'Understand what a void-centred temperature patch means.' },
          { id: 'p06-a-2', text: 'Understand angular coordinates around a void centre.' },
          { id: 'p06-a-3', text: 'Understand radial binning.' },
          { id: 'p06-a-4', text: 'Understand why individual void signals are weak.' },
          { id: 'p06-a-5', text: 'Understand why stacking can improve signal-to-noise.' },
          { id: 'p06-a-6', text: 'Study mean versus median stacking.' },
          { id: 'p06-a-7', text: 'Understand how masked pixels affect the stacking process.' },
        ],
      },
      {
        id: 'p06-b',
        heading: 'B. Implement the first stacking routine',
        items: [
          { id: 'p06-b-1', text: 'Select one void from the catalogue.' },
          { id: 'p06-b-2', text: 'Identify its centre on the CMB map.' },
          { id: 'p06-b-3', text: 'Define an angular region around the centre.' },
          { id: 'p06-b-4', text: 'Extract the corresponding CMB pixels.' },
          { id: 'p06-b-5', text: 'Convert their positions into angular separation from the void centre.' },
          { id: 'p06-b-6', text: 'Divide the region into radial bins.' },
          { id: 'p06-b-7', text: 'Calculate the mean temperature in each bin.' },
          { id: 'p06-b-8', text: 'Plot the resulting radial profile.' },
          { id: 'p06-b-9', text: 'Repeat for a few individual voids.' },
        ],
        note: 'At this point, do not worry about the final scientific result. First verify that the geometry and extraction are correct.',
      },
      {
        id: 'p06-c',
        heading: 'C. Implement stacking across the catalogue',
        items: [
          { id: 'p06-c-1', text: 'Define the selection criteria for the void sample.' },
          { id: 'p06-c-2', text: 'Extract the temperature patches for all selected voids.' },
          { id: 'p06-c-3', text: 'Apply the appropriate mask to each patch.' },
          { id: 'p06-c-4', text: 'Calculate the average temperature in each radial bin.' },
          { id: 'p06-c-5', text: 'Track the number of valid pixels contributing to each bin.' },
          { id: 'p06-c-6', text: 'Track the number of voids contributing to each bin.' },
          { id: 'p06-c-7', text: 'Calculate the stacked temperature profile.' },
          { id: 'p06-c-8', text: 'Save the profile as a machine-readable file.' },
          { id: 'p06-c-9', text: 'Plot the result with appropriate units.' },
        ],
      },
      {
        id: 'p06-d',
        heading: 'D. Investigate different void populations',
        items: [
          { id: 'p06-d-1', text: 'Divide voids into effective-radius bins.' },
          { id: 'p06-d-2', text: 'Divide voids into redshift bins.' },
          { id: 'p06-d-3', text: 'Repeat the stacking analysis for each bin.' },
          { id: 'p06-d-4', text: 'Compare the resulting temperature profiles.' },
          { id: 'p06-d-5', text: 'Investigate whether the signal changes with void properties.' },
          { id: 'p06-d-6', text: 'Check whether individual bins contain sufficient voids.' },
        ],
      },
      {
        id: 'p06-e',
        heading: 'E. Alternative stacking choices',
        items: [
          { id: 'p06-e-1', text: 'Implement mean stacking.' },
          { id: 'p06-e-2', text: 'Implement median stacking.' },
          { id: 'p06-e-3', text: 'Investigate normalised versus physical angular radius.' },
          { id: 'p06-e-4', text: 'Compare different radial bin widths.' },
          { id: 'p06-e-5', text: 'Investigate the effect of temperature-map smoothing.' },
          { id: 'p06-e-6', text: 'Document why the final method is selected.' },
        ],
      },
    ],
    completionCondition: 'A working stacking pipeline produces reproducible radial temperature profiles.',
  },
  {
    id: 'phase-07',
    number: 'Phase 07',
    title: 'Statistical validation',
    duration: '2–3 weeks',
    masterTasks: [
      { id: 'p07-t1', text: 'Construct random-position catalogues.' },
      { id: 'p07-t2', text: 'Perform null tests.', importantByDefault: true },
      { id: 'p07-t3', text: 'Calculate uncertainties and covariance.' },
      { id: 'p07-t4', text: 'Estimate statistical significance.', importantByDefault: true },
      { id: 'p07-t5', text: 'Check sensitivity to masks and outliers.' },
      { id: 'p07-t6', text: 'Investigate possible systematic effects.' },
    ],
    detailIntro:
      'A temperature profile alone is not evidence of an ISW detection. We need to establish whether the measured profile is statistically meaningful.',
    detailBlocks: [
      {
        id: 'p07-a',
        heading: 'A. Random-position tests',
        items: [
          { id: 'p07-a-1', text: 'Generate random sky positions.' },
          { id: 'p07-a-2', text: 'Respect the relevant survey footprint and usable CMB mask.' },
          { id: 'p07-a-3', text: "Match the random samples to the relevant void sample's selection characteristics." },
          { id: 'p07-a-4', text: 'Perform stacking around the random positions.' },
          { id: 'p07-a-5', text: 'Repeat the process many times.' },
          { id: 'p07-a-6', text: 'Compare the real void-centred profile with the random profiles.' },
          { id: 'p07-a-7', text: 'Save the distribution of random-stack measurements.' },
        ],
      },
      {
        id: 'p07-b',
        heading: 'B. Other null tests',
        items: [
          { id: 'p07-b-1', text: 'Test random catalogues with matched redshift and size distributions.' },
          { id: 'p07-b-2', text: 'Test shuffled void properties.' },
          { id: 'p07-b-3', text: 'Investigate rotated or displaced positions where geometrically appropriate.' },
          { id: 'p07-b-4', text: 'Check whether an apparent signal persists when the physical void-centre association is removed.' },
          { id: 'p07-b-5', text: 'Compare the real result with each null-test distribution.' },
        ],
      },
      {
        id: 'p07-c',
        heading: 'C. Uncertainty estimation',
        items: [
          { id: 'p07-c-1', text: 'Understand bootstrap resampling.' },
          { id: 'p07-c-2', text: 'Decide whether void-level or spatial-block resampling is appropriate.' },
          { id: 'p07-c-3', text: 'Implement bootstrap resampling.' },
          { id: 'p07-c-4', text: 'Estimate uncertainties in radial bins.' },
          { id: 'p07-c-5', text: 'Investigate correlations between radial bins.' },
          { id: 'p07-c-6', text: 'Construct a covariance matrix.' },
          { id: 'p07-c-7', text: 'Check whether the covariance estimate is stable.' },
          { id: 'p07-c-8', text: 'Document the number of resamples and the estimation method.' },
        ],
      },
      {
        id: 'p07-d',
        heading: 'D. Statistical significance',
        items: [
          { id: 'p07-d-1', text: 'Define the null hypothesis.' },
          { id: 'p07-d-2', text: 'Define the statistic used to compare the measured and null profiles.' },
          { id: 'p07-d-3', text: 'Calculate the significance using an appropriate covariance treatment.' },
          { id: 'p07-d-4', text: 'Investigate the impact of finite sample size.' },
          { id: 'p07-d-5', text: 'Account for the effect of trying multiple binning or selection choices.' },
          { id: 'p07-d-6', text: 'Avoid interpreting a single low p-value as definitive evidence.' },
        ],
      },
      {
        id: 'p07-e',
        heading: 'E. Systematic checks',
        items: [
          { id: 'p07-e-1', text: 'Test different reasonable mask choices.' },
          { id: 'p07-e-2', text: 'Investigate outlier sensitivity.' },
          { id: 'p07-e-3', text: 'Check dependence on void selection cuts.' },
          { id: 'p07-e-4', text: 'Investigate foreground contamination.' },
          { id: 'p07-e-5', text: 'Check sensitivity to map resolution and smoothing.' },
          { id: 'p07-e-6', text: 'Check sensitivity to the chosen temperature statistic.' },
          { id: 'p07-e-7', text: 'Investigate potential survey selection effects.' },
        ],
      },
    ],
    completionCondition:
      'You can explain whether the measured signal is statistically distinguishable from the null expectation, and how robust that conclusion is.',
  },
  {
    id: 'phase-08',
    number: 'Phase 08',
    title: 'Physical interpretation',
    duration: '1–2 weeks',
    masterTasks: [
      { id: 'p08-t1', text: 'Compare the observed signal with ISW expectations.', importantByDefault: true },
      { id: 'p08-t2', text: 'Investigate the dependence on void size and redshift.' },
      { id: 'p08-t3', text: 'Evaluate the role of void selection and compensation.' },
      { id: 'p08-t4', text: 'Compare with previous observational studies.' },
      { id: 'p08-t5', text: 'Discuss limitations and alternative explanations.' },
    ],
    detailIntro: 'Physical interpretation and theoretical comparison — Now we move from computational results to cosmological interpretation.',
    detailBlocks: [
      {
        id: 'p08-a',
        heading: 'A. Understand the observed profile',
        items: [
          { id: 'p08-a-1', text: 'Identify the central temperature feature.' },
          { id: 'p08-a-2', text: 'Identify the radial extent of any signal.' },
          { id: 'p08-a-3', text: 'Investigate whether the profile has a central cold region and surrounding structure.' },
          { id: 'p08-a-4', text: 'Compare the profile across void-size bins.' },
          { id: 'p08-a-5', text: 'Compare the profile across redshift bins.' },
          { id: 'p08-a-6', text: 'Investigate the role of compensation.' },
          { id: 'p08-a-7', text: 'Check whether the observed profile is consistent across analysis choices.' },
        ],
      },
      {
        id: 'p08-b',
        heading: 'B. Theoretical expectations',
        items: [
          { id: 'p08-b-1', text: 'Study theoretical ISW predictions for spherical voids.' },
          { id: 'p08-b-2', text: 'Understand the relationship between density profiles and gravitational potentials.' },
          { id: 'p08-b-3', text: 'Understand how potential evolution affects the expected temperature signal.' },
          { id: 'p08-b-4', text: 'Study the expected dependence on void radius and redshift.' },
          { id: 'p08-b-5', text: 'Identify the assumptions behind simplified theoretical models.' },
          { id: 'p08-b-6', text: 'Ask AI 1 to help formulate a theoretical prediction that is appropriate for the selected catalogue.' },
        ],
      },
      {
        id: 'p08-c',
        heading: 'C. Compare observation and theory',
        items: [
          { id: 'p08-c-1', text: 'Obtain or calculate the theoretical temperature profile.' },
          { id: 'p08-c-2', text: 'Ensure the theoretical and observational profiles use comparable definitions.' },
          { id: 'p08-c-3', text: 'Compare their radial shapes.' },
          { id: 'p08-c-4', text: 'Compare amplitudes and uncertainties.' },
          { id: 'p08-c-5', text: 'Investigate discrepancies.' },
          { id: 'p08-c-6', text: 'Identify whether discrepancies could arise from void selection, projection effects or observational systematics.' },
          { id: 'p08-c-7', text: 'State what the data actually support.' },
        ],
      },
      {
        id: 'p08-d',
        heading: 'D. Compare with previous literature',
        items: [
          { id: 'p08-d-1', text: 'Prepare a table of your measured results and published results.' },
          { id: 'p08-d-2', text: 'Compare sample sizes.' },
          { id: 'p08-d-3', text: 'Compare void definitions.' },
          { id: 'p08-d-4', text: 'Compare CMB datasets.' },
          { id: 'p08-d-5', text: 'Compare stacking methods.' },
          { id: 'p08-d-6', text: 'Compare statistical significance.' },
          { id: 'p08-d-7', text: 'Explain differences in methodology and findings.' },
        ],
      },
    ],
    completionCondition: 'You have a physically justified interpretation rather than merely a collection of plots.',
  },
  {
    id: 'phase-09',
    number: 'Phase 09',
    title: 'Research paper and release',
    duration: '2–3 weeks',
    masterTasks: [
      { id: 'p09-t1', text: 'Prepare final figures and tables.' },
      { id: 'p09-t2', text: 'Write methodology and theoretical background.' },
      { id: 'p09-t3', text: 'Write results and discussion.' },
      { id: 'p09-t4', text: 'Document the complete computational pipeline.' },
      { id: 'p09-t5', text: 'Verify reproducibility from raw inputs to final plots.', importantByDefault: true },
      { id: 'p09-t6', text: 'Prepare the manuscript and project repository.', importantByDefault: true },
    ],
    detailIntro: 'Manuscript and reproducibility',
    detailBlocks: [
      {
        id: 'p09-a',
        heading: 'A. Finalise the results',
        items: [
          { id: 'p09-a-1', text: 'Select the final void sample.' },
          { id: 'p09-a-2', text: 'Freeze the analysis configuration.' },
          { id: 'p09-a-3', text: 'Run the final pipeline from beginning to end.' },
          { id: 'p09-a-4', text: 'Save all final plots.' },
          { id: 'p09-a-5', text: 'Save statistical tables.' },
          { id: 'p09-a-6', text: 'Save the covariance matrix.' },
          { id: 'p09-a-7', text: 'Record all software versions.' },
          { id: 'p09-a-8', text: 'Verify that the results can be reproduced.' },
        ],
      },
      {
        id: 'p09-b',
        heading: 'B. Prepare the manuscript',
        intro: 'Suggested structure:',
        table: {
          columns: ['Section', 'Main content'],
          rows: [
            ['Abstract', 'Objective, methods and main findings'],
            ['Introduction', 'Cosmic voids, CMB and ISW motivation'],
            ['Theoretical Background', 'ISW physics and expected void signal'],
            ['Data', 'Planck maps and void catalogue'],
            ['Methodology', 'Stacking and statistical methods'],
            ['Results', 'Temperature profiles and significance'],
            ['Discussion', 'Physical interpretation and comparison'],
            ['Conclusion', 'Findings and limitations'],
          ],
        },
      },
      {
        id: 'p09-c',
        heading: 'C. Final quality checks',
        items: [
          { id: 'p09-c-1', text: 'Verify every scientific statement against a source or calculation.' },
          { id: 'p09-c-2', text: 'Check all equations and units.' },
          { id: 'p09-c-3', text: 'Check figure labels and legends.' },
          { id: 'p09-c-4', text: 'Verify that uncertainties are correctly reported.' },
          { id: 'p09-c-5', text: 'Ensure negative results are reported honestly.' },
          { id: 'p09-c-6', text: 'Check references and citations.' },
          { id: 'p09-c-7', text: 'Document limitations.' },
          { id: 'p09-c-8', text: 'Have AI 1 conduct a scientific consistency review.' },
          { id: 'p09-c-9', text: 'Have AI 2 check code organisation and reproducibility.' },
          { id: 'p09-c-10', text: 'Review the complete manuscript yourself.' },
        ],
      },
    ],
    completionCondition: 'A reproducible computational project and a scientifically defensible manuscript are ready for supervisor review.',
  },
];

export const SECTION_3_META = {
  intro: 'The project is divided into 10 phases. Each phase has a completion condition. Do not jump ahead simply because the coding model can generate something quickly.',
  durationNote: 'The durations are initial planning estimates, not deadlines. Some phases may overlap, but their scientific dependencies should be respected.',
};

export const SECTION_5_STUDY_SYSTEM = {
  intro: [
    'This is perhaps the most important part of your approach.',
    "I don't want you to end up with 500 lines of Python that you cannot explain. Every major coding milestone must have a corresponding learning milestone.",
    'For this, create a document named Learning_Queue.md. Whenever AI 1 assigns a new coding task, it must also create a learning assignment.',
  ],
  formatTable: [
    { field: 'Concept', value: 'What you need to understand' },
    { field: 'Importance', value: 'Why this concept is required now' },
    { field: 'Mathematics', value: 'Equations and derivations to study' },
    { field: 'Lecture', value: 'Specific lecture and timestamp' },
    { field: 'Book', value: 'Specific chapter or section' },
    { field: 'Paper', value: 'Relevant research paper' },
    { field: 'Documentation', value: 'Specific library documentation' },
    { field: 'Practical exercise', value: 'A small exercise to test understanding' },
    { field: 'Completion test', value: 'Questions you must be able to answer' },
  ],
  exampleTitle: 'Example: Learning assignment for HEALPix',
  exampleIntro: 'Suppose AI 1 asks AI 2 to extract CMB temperatures around void centres. Your learning assignment should look something like this:',
  exampleConcept: 'HEALPix pixelisation.',
  exampleItems: [
    'Understand why spherical maps need a pixelisation scheme.',
    'Understand the meaning of nside.',
    'Derive the total number of HEALPix pixels:',
    'Study the difference between RING and NESTED ordering.',
    'Understand angular coordinates and pixel indices.',
    'Study healpy.ang2pix.',
    'Study healpy.pix2ang.',
    'Load a sample HEALPix map.',
    'Locate a known coordinate on that map.',
    'Verify that the pixel conversion works.',
  ],
  exampleCompletionTest:
    'You should be able to explain how a position on the celestial sphere is mapped to a pixel and how the corresponding temperature value is retrieved. Only then should the implementation milestone be marked complete.',
};

export const SECTION_6_RESOURCES = {
  intro: 'These are the starting resources for the project. AI 1 should refine the list as we reach individual milestones.',
  table: [
    { subject: 'Cosmology', resource: 'David Tong / University of Cambridge cosmology lecture notes' },
    { subject: 'Cosmology lectures', resource: 'University of Sussex cosmology lectures by David Parkinson' },
    { subject: 'CMB', resource: "Wayne Hu's CMB tutorials" },
    { subject: 'ISW effect', resource: 'Review papers on the Integrated Sachs–Wolfe effect' },
    { subject: 'Cosmic voids', resource: 'Reviews on cosmic voids and large-scale structure' },
    { subject: 'Python', resource: 'freeCodeCamp scientific Python tutorials' },
    { subject: 'Numerical methods', resource: 'SciPy documentation' },
    { subject: 'Astronomy data', resource: 'Astropy documentation' },
    { subject: 'HEALPix', resource: 'Official healpy documentation' },
    { subject: 'Statistics', resource: 'StatQuest and relevant statistical inference lectures' },
  ],
  officialLinks: [
    { label: 'healpy documentation', url: 'https://healpy.readthedocs.io/?utm_source=chatgpt.com' },
    { label: 'Astropy documentation', url: 'https://docs.astropy.org/?utm_source=chatgpt.com' },
    { label: 'Planck Legacy Archive', url: 'https://pla.esac.esa.int/?utm_source=chatgpt.com' },
    { label: 'Sloan Digital Sky Survey', url: 'https://www.sdss.org/?utm_source=chatgpt.com' },
    { label: 'NumPy documentation', url: 'https://numpy.org/doc/?utm_source=chatgpt.com' },
    { label: 'SciPy documentation', url: 'https://docs.scipy.org/doc/scipy/?utm_source=chatgpt.com' },
  ],
  closingNote: 'I would not ask you to complete all these courses before starting. We will use them as needed.',
};

export const SECTION_7_ROADMAP = {
  intro: 'Suggested 16-week roadmap — An initial planning target, subject to dataset availability and research complexity.',
  weeks: [
    { period: 'Weeks 1–2', focus: 'Project setup and scientific foundations' },
    { period: 'Weeks 3–4', focus: 'Literature review and research question' },
    { period: 'Weeks 5–6', focus: 'Python, Astropy and HEALPix' },
    { period: 'Week 7', focus: 'Dataset selection and acquisition' },
    { period: 'Weeks 8–9', focus: 'Data preparation and quality checks' },
    { period: 'Weeks 10–11', focus: 'Stacking implementation' },
    { period: 'Weeks 12–13', focus: 'Statistical validation' },
    { period: 'Week 14', focus: 'Theoretical interpretation' },
    { period: 'Weeks 15–16', focus: 'Manuscript and reproducibility' },
  ],
  fiveDocuments: [
    { file: 'Master_Todo.md', purpose: 'Overall project checklist.' },
    { file: 'Research_Log.md', purpose: 'What you did and what you learned.' },
    { file: 'Learning_Queue.md', purpose: 'Lectures, chapters and papers to study.' },
    { file: 'Decision_Log.md', purpose: 'Scientific and computational decisions, including why they were made.' },
    { file: 'Experiment_Log.md', purpose: 'Every analysis run, its configuration and results.' },
  ],
  additionalRule:
    'One additional rule: never overwrite an old result without retaining its configuration. We need to know exactly which choices produced each figure.',
};

export const SECTION_8_PROMPT_01 = {
  intro: [
    'We should not begin downloading datasets or writing Python yet.',
    'Our first job is to get AI 1 to develop the detailed scientific architecture.',
    'Here is the prompt I suggest giving your high-complexity model.',
  ],
  title: 'Prompt 01 — Research architecture',
  subtitle: 'Copy this into your high-complexity AI model.',
  promptText: `I am beginning a computational cosmology research project on the cross-correlation between cosmic voids and CMB temperature fluctuations, focusing on the Integrated Sachs–Wolfe effect.

My objective is to investigate whether cosmic voids produce a statistically detectable temperature signature in the CMB through void-centred stacking.

My initial proposed datasets are:

1. Planck 2018 PR3 SMICA temperature map.

2. BOSS DR11 or DESIVAST cosmic void catalogue.

I intend to develop this project while learning the required physics, mathematics, statistics and computational methods.

You are my scientific research architect. Your responsibility is to plan and supervise the research, not simply generate code.

I want you to:

1. Evaluate the scientific feasibility of this project.

2. Identify the precise scientific questions we can investigate.

3. Design the complete research methodology.

4. Identify the mathematical derivations I need to understand.

5. Divide the research into small, sequential milestones.

6. For every milestone, recommend specific lectures, book chapters, review papers and technical documentation. Give direct links wherever possible.

7. Explain the scientific purpose of every computational operation.

8. Prepare implementation specifications for a second AI model that will write the Python code.

9. Define validation tests and expected outputs for every coding milestone.

10. Maintain a list of unresolved scientific and technical decisions.

Important working rules:

- Do not rush into coding.

- Do not assume that I already understand the required physics.

- Recommend learning material only when it becomes relevant.

- Do not invent papers, references, datasets or documentation.

- Distinguish established scientific methodology from proposed improvements.

- Do not allow the coding model to change the scientific methodology independently.

- Explain why each decision is necessary.

- Require validation before advancing to the next milestone.

Start by evaluating the scientific feasibility and proposing the complete research architecture.

Do not generate the entire codebase. First establish the scientific plan.`,
};

export const SECTION_9_WORKING_TOGETHER = {
  intro: 'I suggest we maintain one important distinction:',
  distinction: 'The master checklist is our overall roadmap. The active checklist is what you execute right now.',
  overview: "We won't overwhelm ourselves by trying to complete all 100+ tasks simultaneously.",
  perPhaseItems: [
    'A master task list.',
    'A detailed execution checklist.',
    'A learning assignment.',
    'An AI implementation assignment.',
    'A verification checklist.',
    'A completion report.',
  ],
  reviewNote: 'When you finish one phase, we will review it before opening the next one.',
  firstTarget: 'Your first target is Phase 00, not the entire project.',
  finalScientificPoint:
    'One final scientific point: we should not make a detection our success criterion. A robust non-detection can also be a valuable research result, provided the methodology and uncertainties are sound.',
  closingLine: 'I will treat this as the master roadmap for Project 1 as we develop it further.',
};
