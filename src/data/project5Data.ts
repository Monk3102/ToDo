export interface Project5Task {
  id: string;
  text: string;
  group?: string;
}

export interface Project5Platform {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface Project5ToolLink {
  name: string;
  url: string;
}

export const PROJECT_5_HEADER = {
  title: 'Project 5 — International online tutoring and freelancing',
  objective:
    'The objective is to establish a paid online tutoring service for students in countries where private tutoring rates are relatively high. Your main subjects would be Physics, Mathematics and Computational Methods.',
  routes: [
    {
      title: 'Professor-assisted route',
      description:
        'Your professor responds and guides you through his existing tutoring work, teaching arrangements, platforms, clients or professional network.',
    },
    {
      title: 'Independent route',
      description:
        'You build your own profile, find international students, establish your teaching portfolio and start acquiring clients.',
    },
  ],
  strategyNote:
    "I would not wait passively for the professor's response. Prepare the basic materials while waiting. If he offers you a route into his work, you will be ready. If he cannot help, you will already have started building an independent alternative.",
  distinctionNote:
    'One important distinction: tutoring is not just about knowing physics. International students and parents need to see that you can explain concepts clearly, teach at the right academic level, communicate professionally and reliably conduct online lessons.',
};

export const PROJECT_5_SERVICE_SCOPE = {
  intro: 'Before looking for platforms, decide what you can confidently teach.',
  subjects: [
    {
      id: 'physics',
      title: 'A. Physics',
      topics: [
        'Classical mechanics',
        'Oscillations and waves',
        'Electricity and magnetism',
        'Optics',
        'Thermodynamics',
        'Modern physics',
        'Quantum mechanics',
        'Mathematical physics',
        'Introductory astrophysics and cosmology',
      ],
    },
    {
      id: 'mathematics',
      title: 'B. Mathematics',
      topics: [
        'Algebra',
        'Trigonometry',
        'Calculus',
        'Differential equations',
        'Linear algebra',
        'Vector calculus',
        'Probability and statistics',
        'Numerical methods',
      ],
    },
    {
      id: 'computational',
      title: 'C. Computational methods',
      topics: [
        'Python fundamentals',
        'NumPy and SciPy',
        'Matplotlib',
        'Numerical integration',
        'Root-finding methods',
        'Solving differential equations numerically',
        'Data analysis',
        'Scientific visualisation',
        'MATLAB fundamentals',
      ],
    },
  ],
  levelsIntro: 'Important: Divide these into three levels:',
  levels: [
    {
      level: 'Foundation',
      students: 'High-school students',
      scope: 'Introductory physics and mathematics',
    },
    {
      level: 'Intermediate',
      students: 'Undergraduate students',
      scope: 'University-level physics and mathematics',
    },
    {
      level: 'Advanced',
      students: 'Undergraduate / early postgraduate',
      scope: 'Computational physics and selected advanced topics',
    },
  ],
  closingNote:
    'Only advertise topics you can teach confidently. You can expand the list as your teaching experience grows.',
};

export const PROJECT_5_ROUTE_A = {
  title: '2. Route A — Learn from your professor',
  subtitle: 'Preferred first route',
  intro:
    'Your professor may already have solved several problems that would otherwise take you months: finding students, setting rates, choosing platforms, arranging payments and managing lessons.',
  a1Title: 'A1. Prepare for his response',
  a1Tasks: [
    { id: 'p5-a1-1', text: 'Prepare a short introduction describing your academic background.' },
    { id: 'p5-a1-2', text: 'Prepare a list of subjects you can teach.' },
    { id: 'p5-a1-3', text: 'Prepare your current CV.' },
    { id: 'p5-a1-4', text: 'Think about the number of hours you can realistically teach each week.' },
    { id: 'p5-a1-5', text: 'Prepare questions about his tutoring work.' },
  ] as Project5Task[],
  a2Title: 'A2. Questions to ask your professor',
  a2Groups: [
    {
      id: 'work',
      title: 'About the work',
      questions: [
        { id: 'p5-a2-1', text: 'Which countries do his students come from?' },
        { id: 'p5-a2-2', text: 'Does he teach school students, university students or both?' },
        { id: 'p5-a2-3', text: 'Which subjects are most in demand?' },
        { id: 'p5-a2-4', text: 'Does he teach one-to-one or in groups?' },
      ],
    },
    {
      id: 'finding',
      title: 'About finding students',
      questions: [
        { id: 'p5-a2-5', text: 'Does he use tutoring platforms?' },
        { id: 'p5-a2-6', text: 'Does he get students through referrals?' },
        { id: 'p5-a2-7', text: 'Does he work with an agency?' },
        { id: 'p5-a2-8', text: 'Does he have a personal website or professional profile?' },
      ],
    },
    {
      id: 'payment',
      title: 'About payment',
      questions: [
        { id: 'p5-a2-9', text: 'How are lessons priced?' },
        { id: 'p5-a2-10', text: 'How are international payments received?' },
        { id: 'p5-a2-11', text: 'Are payments made per lesson or monthly?' },
        { id: 'p5-a2-12', text: 'What are the platform or agency fees?' },
      ],
    },
    {
      id: 'teaching',
      title: 'About teaching',
      questions: [
        { id: 'p5-a2-13', text: 'Which video-conferencing and digital whiteboard tools does he use?' },
        { id: 'p5-a2-14', text: 'How does he conduct trial lessons?' },
        { id: 'p5-a2-15', text: 'Does he prepare notes and assignments?' },
        { id: 'p5-a2-16', text: "How does he assess a student's progress?" },
      ],
    },
    {
      id: 'joining',
      title: 'About joining him',
      questions: [
        { id: 'p5-a2-17', text: 'Would he be willing to refer students?' },
        { id: 'p5-a2-18', text: 'Could you assist with selected classes?' },
        { id: 'p5-a2-19', text: 'Is there an opportunity to work under his guidance?' },
        { id: 'p5-a2-20', text: 'Could he observe one of your demonstration lessons and give feedback?' },
      ],
    },
  ],
  a3Title: 'A3. If he offers you an opportunity',
  a3Tasks: [
    { id: 'p5-a3-1', text: 'Understand the arrangement clearly.' },
    { id: 'p5-a3-2', text: 'Clarify whether you would teach independently or assist him.' },
    { id: 'p5-a3-3', text: 'Confirm payment, workload and responsibilities.' },
    { id: 'p5-a3-4', text: 'Understand how students are assigned.' },
    { id: 'p5-a3-5', text: 'Clarify who handles student communication.' },
    { id: 'p5-a3-6', text: 'Agree on a trial period if appropriate.' },
    { id: 'p5-a3-7', text: 'Begin with subjects and levels you can confidently handle.' },
    { id: 'p5-a3-8', text: 'Collect feedback after your first few lessons.' },
  ] as Project5Task[],
  a3Note:
    'Do not make assumptions about payment or student referrals. Get the arrangement clearly explained before committing.',
};

export const PROJECT_5_ROUTE_B = {
  title: '3. Route B — Build your own international tutoring profile',
  subtitle: 'Independent route',
  intro:
    'If your professor cannot offer a direct opportunity, you need to build three things: a professional profile, evidence of teaching ability and a reliable way to find students.',
  b1: {
    title: 'B1. Research the international tutoring market',
    intro: 'Start by understanding where your skills are most useful.',
    countries: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'Netherlands',
      'Switzerland',
      'Ireland',
      'New Zealand',
    ],
    caution:
      'Do not assume that every student in these countries will pay a high rate. Demand, subject, academic level, tutor experience and competition all matter.',
    tasks: [
      { id: 'p5-b1-1', text: 'Research the demand for online physics tutors in each country.' },
      { id: 'p5-b1-2', text: 'Research demand for mathematics tutors.' },
      { id: 'p5-b1-3', text: 'Research demand for Python and computational physics tutoring.' },
      { id: 'p5-b1-4', text: 'Compare high-school and undergraduate tutoring markets.' },
      { id: 'p5-b1-5', text: 'Check typical advertised hourly rates.' },
      { id: 'p5-b1-6', text: 'Check whether platforms deduct commission.' },
      { id: 'p5-b1-7', text: 'Check the eligibility requirements for tutors from India.' },
      {
        id: 'p5-b1-8',
        text: "Check whether each platform permits tutors under 18. Do not misrepresent your age or use another person's account to bypass restrictions.",
      },
      { id: 'p5-b1-9', text: 'Identify platforms that support international students and tutors.' },
      { id: 'p5-b1-10', text: 'Make a shortlist of 3–5 platforms.' },
    ] as Project5Task[],
    deliverable:
      'A market research sheet showing the most promising subjects, countries and tutoring platforms.',
  },
  b2: {
    title: 'B2. Research tutoring platforms',
    intro:
      'Investigate these as possible starting points. Their availability, tutor eligibility, fees and onboarding rules must be checked before you invest time in an application.',
    platforms: [
      {
        id: 'p5-b2-preply',
        name: 'Preply',
        url: 'https://preply.com/?utm_source=chatgpt.com',
        description: 'Research whether its current tutor categories and eligibility rules fit your subjects.',
      },
      {
        id: 'p5-b2-superprof',
        name: 'Superprof',
        url: 'https://www.superprof.com/?utm_source=chatgpt.com',
        description: 'Check international reach, tutor profile requirements and payment arrangements.',
      },
      {
        id: 'p5-b2-wyzant',
        name: 'Wyzant',
        url: 'https://www.wyzant.com/?utm_source=chatgpt.com',
        description:
          'Investigate its geographic and tutor eligibility restrictions. It may not be suitable for tutors based in India.',
      },
      {
        id: 'p5-b2-tutorcom',
        name: 'Tutor.com',
        url: 'https://www.tutor.com/?utm_source=chatgpt.com',
        description:
          'Check its tutor recruitment requirements, subject availability and geographical restrictions.',
      },
      {
        id: 'p5-b2-teacheron',
        name: 'TeacherOn',
        url: 'https://www.teacheron.com/?utm_source=chatgpt.com',
        description: 'Investigate its international student base, tutor profile system and fees.',
      },
    ] as Project5Platform[],
    closingNote:
      'Also investigate independent tutoring through professional referrals and academic networks. A platform is only one way to find students.',
  },
  b3: {
    title: 'B3. Build your tutor profile',
    questionsIntro: 'Prepare a profile that answers three questions:',
    questions: [
      'What can you teach?',
      'Who can you teach?',
      'Why should a student trust your teaching?',
    ],
    tasks: [
      { id: 'p5-b3-1', text: 'Write a short professional introduction.' },
      { id: 'p5-b3-2', text: 'Mention your MSc Physics background accurately.' },
      { id: 'p5-b3-3', text: 'Describe your strongest teaching subjects.' },
      { id: 'p5-b3-4', text: 'Specify the academic levels you can support.' },
      { id: 'p5-b3-5', text: 'Mention Python, MATLAB and computational methods where relevant.' },
      { id: 'p5-b3-6', text: 'Explain your teaching approach.' },
      { id: 'p5-b3-7', text: 'Mention any relevant research or academic projects.' },
      { id: 'p5-b3-8', text: 'Add a professional photograph if required by the platform.' },
      { id: 'p5-b3-9', text: 'Prepare a short introduction video if useful.' },
      { id: 'p5-b3-10', text: 'Proofread your profile for clarity and grammar.' },
    ] as Project5Task[],
    note: 'Avoid describing yourself as an expert in every branch of physics. A focused profile is more credible.',
  },
  b4: {
    title: 'B4. Build a teaching portfolio',
    intro: 'This is particularly important because you may not have formal tutoring experience yet.',
    demos: [
      {
        id: 'physics',
        lesson: 'Physics',
        topic: "Newton's laws and applications",
        demonstrates: 'Conceptual explanation and problem-solving',
      },
      {
        id: 'math',
        lesson: 'Mathematics',
        topic: 'Integration and its physical meaning',
        demonstrates: 'Mathematical clarity',
      },
      {
        id: 'comp',
        lesson: 'Computational methods',
        topic: 'Numerical solution of an equation using Python',
        demonstrates: 'Coding and scientific reasoning',
      },
    ],
    perLessonSteps: [
      { key: 'objectives', label: 'Write learning objectives.' },
      { key: 'explanation', label: 'Prepare a short explanation.' },
      { key: 'examples', label: 'Prepare worked examples.' },
      { key: 'exercise', label: 'Include one exercise for the student.' },
      { key: 'recap', label: 'Prepare a short recap.' },
      { key: 'slides', label: 'Make clean notes or slides.' },
      { key: 'record', label: 'Record a 5–10 minute demonstration.' },
      { key: 'review', label: 'Review your explanation and improve it.' },
    ],
    note: 'Your portfolio should show that you can teach, not merely that you know the subject.',
  },
  b5: {
    title: 'B5. Prepare your online teaching setup',
    tasks: [
      { id: 'p5-b5-1', text: 'Test your internet connection.' },
      { id: 'p5-b5-2', text: 'Test microphone and camera.' },
      { id: 'p5-b5-3', text: 'Select a video-conferencing tool.' },
      { id: 'p5-b5-4', text: 'Select a digital whiteboard.' },
      { id: 'p5-b5-5', text: 'Test writing equations and drawing diagrams.' },
      { id: 'p5-b5-6', text: 'Prepare a way to share PDFs and notes.' },
      { id: 'p5-b5-7', text: 'Prepare a folder for lesson materials.' },
      { id: 'p5-b5-8', text: 'Test screen sharing with a sample lesson.' },
      { id: 'p5-b5-9', text: 'Prepare a backup communication method.' },
    ] as Project5Task[],
    toolsIntro: 'Potential tools to investigate:',
    tools: [
      { name: 'Zoom', url: 'https://zoom.us/?utm_source=chatgpt.com' },
      { name: 'Google Meet', url: 'https://meet.google.com/?utm_source=chatgpt.com' },
      { name: 'Microsoft OneNote', url: 'https://www.onenote.com/?utm_source=chatgpt.com' },
      { name: 'OpenBoard', url: 'https://openboard.ch/?utm_source=chatgpt.com' },
    ] as Project5ToolLink[],
  },
};

export const PROJECT_5_PRICING_PAYMENTS = {
  title: '4. Pricing, payments and professional arrangements',
  intro: 'Do this after you understand the market and platform rules.',
  partA: {
    title: 'A. Establish your initial rates',
    tasks: [
      { id: 'p5-4a-1', text: 'Compare tutor rates for your subject and level.' },
      { id: 'p5-4a-2', text: 'Compare rates for tutors with similar experience.' },
      { id: 'p5-4a-3', text: 'Check platform commissions.' },
      { id: 'p5-4a-4', text: 'Account for preparation time.' },
      { id: 'p5-4a-5', text: 'Decide your initial rate for a trial lesson, if offered.' },
      { id: 'p5-4a-6', text: 'Decide your regular hourly rate.' },
      { id: 'p5-4a-7', text: 'Review the rate after gaining experience and feedback.' },
    ] as Project5Task[],
    note: 'Do not set a high rate simply because the student lives in a wealthy country. Your rate should reflect the value and quality of the teaching you can provide.',
  },
  partB: {
    title: 'B. Understand payments',
    tasks: [
      { id: 'p5-4b-1', text: 'Check which payment methods are supported from India.' },
      { id: 'p5-4b-2', text: 'Check currency conversion charges.' },
      { id: 'p5-4b-3', text: 'Check platform withdrawal fees.' },
      { id: 'p5-4b-4', text: 'Check payment schedules.' },
      { id: 'p5-4b-5', text: 'Understand cancellation and refund policies.' },
      { id: 'p5-4b-6', text: 'Keep records of lessons and payments.' },
      { id: 'p5-4b-7', text: 'Check relevant tax and reporting requirements with a qualified adult or professional.' },
    ] as Project5Task[],
    safetyWarning:
      'Because platform age restrictions and payment-account requirements vary, check these before registering. If you are under 18, involve a parent or guardian in any account, payment or contractual arrangement. Never share identity documents, banking credentials or sensitive personal information with an unverified client.',
  },
};

export const PROJECT_5_FINDING_STUDENTS = {
  title: '5. Finding your first students',
  intro: 'Once your profile and teaching portfolio are ready:',
  tasks: [
    { id: 'p5-5-1', text: 'Create profiles on eligible tutoring platforms.' },
    { id: 'p5-5-2', text: 'Publish your subject-specific teaching offers.' },
    { id: 'p5-5-3', text: 'Ask professors and academic contacts about legitimate referrals.' },
    { id: 'p5-5-4', text: 'Share your professional profile through appropriate academic networks.' },
    { id: 'p5-5-5', text: 'Prepare a short introduction that explains what you teach.' },
    { id: 'p5-5-6', text: 'Respond to genuine student enquiries professionally.' },
    { id: 'p5-5-7', text: 'Offer a short introductory session if the arrangement permits it.' },
    { id: 'p5-5-8', text: 'Ask students for feedback after lessons.' },
    { id: 'p5-5-9', text: 'Improve your teaching profile based on feedback.' },
    { id: 'p5-5-10', text: 'Build a record of completed lessons and teaching experience.' },
  ] as Project5Task[],
  safetyNote:
    'Never pay a stranger an upfront fee to obtain tutoring clients or guarantee employment. Be cautious of requests to move conversations off-platform, unusual payment arrangements or requests for personal documents.',
};

export const PROJECT_5_FIRST_MONTH_PLAN = {
  title: '6. Your first-month execution plan',
  intro: 'This is a deliberately lightweight plan because your PhD applications and research work take priority.',
  rows: [
    {
      period: 'Week 1',
      task: "Await professor's response; prepare subject list",
      output: 'Teaching scope',
    },
    {
      period: 'Week 2',
      task: 'Research platforms and eligibility',
      output: 'Platform shortlist',
    },
    {
      period: 'Week 3',
      task: 'Prepare profile and demonstration lessons',
      output: 'Teaching portfolio',
    },
    {
      period: 'Week 4',
      task: 'Apply to eligible platforms and seek referrals',
      output: 'First client enquiries',
    },
  ],
  note: 'If your professor replies during this period, pause the independent route and evaluate his proposed arrangement before proceeding.',
};

export const PROJECT_5_WEEKLY_BUDGET = {
  title: '7. Keep this project from interfering with your PhD applications',
  intro: 'I would give this project a maximum of 2–3 hours per week initially.',
  priorityNote: 'Your PhD applications have a fixed December deadline. Tutoring can be developed gradually.',
  tableIntro: 'A reasonable weekly allocation:',
  rows: [
    { id: 'p5-wb-1', activity: 'Platform and market research', minutes: 45, label: '45 min' },
    { id: 'p5-wb-2', activity: 'Teaching portfolio', minutes: 60, label: '60 min' },
    { id: 'p5-wb-3', activity: 'Profile development', minutes: 30, label: '30 min' },
    { id: 'p5-wb-4', activity: 'Professor communication / follow-up', minutes: 15, label: '15 min' },
  ],
  totalLabel: '2.5 hours',
};

export const PROJECT_5_COMPLETION_CRITERIA = {
  title: '8. Completion criteria',
  initial: {
    title: 'Initial milestone — Ready to seek students',
    tasks: [
      { id: 'p5-ci-1', text: "Professor's advice or independent route decided." },
      { id: 'p5-ci-2', text: 'Subjects and teaching levels defined.' },
      { id: 'p5-ci-3', text: 'Three demonstration lessons prepared.' },
      { id: 'p5-ci-4', text: 'Professional tutor profile written.' },
      { id: 'p5-ci-5', text: 'At least three eligible platforms investigated.' },
      { id: 'p5-ci-6', text: 'Online teaching setup tested.' },
      { id: 'p5-ci-7', text: 'Payment and eligibility requirements understood.' },
      { id: 'p5-ci-8', text: 'First legitimate student enquiries received.' },
    ] as Project5Task[],
  },
  longTerm: {
    title: 'Long-term milestone — Established tutoring work',
    tasks: [
      { id: 'p5-cl-1', text: 'First paid student.' },
      { id: 'p5-cl-2', text: 'First five completed lessons.' },
      { id: 'p5-cl-3', text: 'Feedback collected.' },
      { id: 'p5-cl-4', text: 'Teaching materials improved.' },
      { id: 'p5-cl-5', text: 'Regular students or repeat bookings.' },
      { id: 'p5-cl-6', text: 'Sustainable weekly teaching schedule.' },
      { id: 'p5-cl-7', text: 'Rates reviewed based on experience and demand.' },
    ] as Project5Task[],
  },
};

export const PROJECT_5_RECOMMENDATION = {
  title: '9. My final recommendation',
  paragraphs: [
    'I would not immediately turn this into a large freelancing operation. First, find out how your professor works. He may save you considerable effort by explaining the market and introducing you to an existing arrangement.',
    'Meanwhile, prepare your three demonstration lessons. These are useful regardless of which route you take.',
    'There is also a potentially valuable combination here: Physics + Mathematics + Computational Methods. Many tutors offer conventional physics lessons, but being able to teach numerical methods, Python-based problem-solving and scientific computing could help distinguish your profile.',
  ],
  immediateIntro: 'Your immediate task is simple:',
  immediateTasks: [
    { id: 'p5-imm-1', text: "Wait for your professor's response while preparing your teaching-subject list." },
    { id: 'p5-imm-2', text: 'Prepare one demonstration lesson in Physics.' },
    { id: 'p5-imm-3', text: 'Research three eligible international tutoring platforms.' },
    { id: 'p5-imm-4', text: 'Keep this project within its weekly time limit.' },
  ] as Project5Task[],
  closingGoal:
    'The goal is to establish a small, credible source of international tutoring work without sacrificing your primary PhD application campaign.',
};

export function getAllProject5TaskIds(): string[] {
  const demoIds = PROJECT_5_ROUTE_B.b4.demos.flatMap((d) =>
    PROJECT_5_ROUTE_B.b4.perLessonSteps.map((s) => `p5-b4-${d.id}-${s.key}`)
  );
  return [
    ...PROJECT_5_RECOMMENDATION.immediateTasks.map((t) => t.id),
    ...PROJECT_5_ROUTE_A.a1Tasks.map((t) => t.id),
    ...PROJECT_5_ROUTE_A.a2Groups.flatMap((g) => g.questions.map((q) => q.id)),
    ...PROJECT_5_ROUTE_A.a3Tasks.map((t) => t.id),
    ...PROJECT_5_ROUTE_B.b1.tasks.map((t) => t.id),
    ...PROJECT_5_ROUTE_B.b2.platforms.map((p) => p.id),
    ...PROJECT_5_ROUTE_B.b3.tasks.map((t) => t.id),
    ...demoIds,
    ...PROJECT_5_ROUTE_B.b5.tasks.map((t) => t.id),
    ...PROJECT_5_PRICING_PAYMENTS.partA.tasks.map((t) => t.id),
    ...PROJECT_5_PRICING_PAYMENTS.partB.tasks.map((t) => t.id),
    ...PROJECT_5_FINDING_STUDENTS.tasks.map((t) => t.id),
    ...PROJECT_5_COMPLETION_CRITERIA.initial.tasks.map((t) => t.id),
    ...PROJECT_5_COMPLETION_CRITERIA.longTerm.tasks.map((t) => t.id),
  ];
}
