export interface FocusNote {
  id: string;
  label: string;
  text: string;
}

export const FOCUS_NOTES_BY_PROJECT: Record<
  'project-1' | 'project-2' | 'project-3' | 'project-4' | 'project-5',
  FocusNote[]
> = {
  'project-1': [
    {
      id: 'fn-p1-1',
      label: 'Study & Code Pairing',
      text: "Don't end up with 500 lines of Python that you cannot explain. Every major coding milestone must pair with a corresponding learning milestone.",
    },
    {
      id: 'fn-p1-2',
      label: 'Scientific Integrity',
      text: 'Do not make a detection our success criterion. A robust non-detection can also be a valuable research result, provided the methodology and uncertainties are sound.',
    },
    {
      id: 'fn-p1-3',
      label: 'One Phase at a Time',
      text: "The master checklist is your overall roadmap; the active checklist is what you execute right now. Your first target is Phase 00, not all 59 tasks simultaneously.",
    },
    {
      id: 'fn-p1-4',
      label: 'Respect Dependencies',
      text: 'Do not jump ahead simply because a coding model can generate something quickly. Validate each phase against physical expectations before advancing.',
    },
  ],
  'project-2': [
    {
      id: 'fn-p2-1',
      label: 'Statistical Rigour',
      text: 'A scientifically attractive graph does not necessarily represent a statistically significant discovery.',
    },
    {
      id: 'fn-p2-2',
      label: 'Three Core Pillars',
      text: 'The ultimate objective is moving fluently between Theory (why an astrophysical phenomenon occurs), Computation (implementing equations), and Observation (testing against real data).',
    },
    {
      id: 'fn-p2-3',
      label: 'Connected Curriculum',
      text: 'Do not study these five subjects in isolation: learn FITS handling in Astropy while analysing uncertainties on the same dataset in Astrostatistics.',
    },
    {
      id: 'fn-p2-4',
      label: 'Understanding Over Speed',
      text: 'Do not let AI tools turn this curriculum into a collection of completed tutorials without genuine physical and mathematical understanding.',
    },
  ],
  'project-3': [
    {
      id: 'fn-p3-1',
      label: 'Keep the Question Open',
      text: "Don't decide the exact supervoid research question yet. First establish whether your professor has an existing direction; if not, your literature review will reveal a manageable gap.",
    },
    {
      id: 'fn-p3-2',
      label: 'Two Flexible Routes',
      text: 'Stage 1 builds the shared foundation (folder, log, literature matrix) that serves both Professor Supervision (Route A) and Independent Research (Route B).',
    },
  ],
  'project-4': [
    {
      id: 'fn-p4-1',
      label: 'Quality Over Volume',
      text: 'The main risk is not finding 70 email addresses—it is having 70 credible, personalised emails ready. It is better to send 45 strong emails than 70 generic messages.',
    },
    {
      id: 'fn-p4-2',
      label: 'Avoid Bottlenecks',
      text: 'Do not wait for every GitHub repository or final transcript before drafting CV v1 and contacting professors. Request transcripts immediately and describe ongoing work honestly.',
    },
    {
      id: 'fn-p4-3',
      label: 'Parallel Tracks',
      text: 'Do not wait for a professor reply if an annual programme has a central portal deadline. Run formal applications and direct outreach independently.',
    },
    {
      id: 'fn-p4-4',
      label: 'Monday Rhythm',
      text: 'Prepare common documents once, research professors in batches (Tue–Thu), and proofread on Sunday so every Monday morning has 14 ready-to-send emails.',
    },
  ],
  'project-5': [
    {
      id: 'fn-p5-1',
      label: 'Teaching vs Knowing',
      text: 'Tutoring is not just knowing physics. International students and parents need to see clear explanations, level-matched teaching, professional communication, and reliable online setup.',
    },
    {
      id: 'fn-p5-2',
      label: 'Your Edge',
      text: 'Many tutors offer conventional physics lessons. Combining Physics + Mathematics + Computational Methods (Python & numerical problem-solving) differentiates your profile.',
    },
    {
      id: 'fn-p5-3',
      label: 'Protect PhD Priority',
      text: 'Cap this project at 2–3 hours per week initially. Your PhD applications have a fixed December deadline; tutoring can grow gradually.',
    },
    {
      id: 'fn-p5-4',
      label: 'Active Waiting',
      text: "Don't wait passively for your professor's reply—prepare your subject scope and three demonstration lessons now so you are ready for either route.",
    },
  ],
};
