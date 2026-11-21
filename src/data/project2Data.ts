export interface SubjectMilestone {
  id: string;
  text: string;
  importantByDefault?: boolean;
}

export interface SubTodoGroup {
  id: string;
  heading: string;
  intro?: string;
  items?: {
    id: string;
    text: string;
  }[];
  packageTable?: {
    pkg: string;
    tasks: {
      id: string;
      text: string;
    }[];
  }[];
}

export interface SubjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  objective: string;
  intro?: string;
  milestones: SubjectMilestone[];
  detailGroups: SubTodoGroup[];
  practicalExercisesTitle: string;
  practicalExercises: {
    id: string;
    text: string;
  }[];
  resources: {
    label: string;
    url?: string;
    note?: string;
  }[];
  finalCompetency: string;
}

export const PROJECT_2_HEADER = {
  title: 'Project 2 — Astronomy, Astrostatistics, Cosmology & Multimessenger Astronomy',
  meta: ['Learning and skill-development project', 'Research preparation'],
  intro: [
    'The objective of this project is different from Project 1.',
    'In Project 1, we are building a scientific investigation and learning whatever is required along the way.',
    'In Project 2, we are building your foundational knowledge and technical skill set across five interconnected subjects. These subjects should eventually allow you to approach observational, theoretical and computational astrophysics research independently.',
    'I suggest treating this as a structured curriculum rather than five unrelated courses.',
  ],
};

export const PROJECT_2_TRACKS = [
  {
    number: '01',
    title: 'Astronomy with Astropy',
    description: 'Learn to handle, analyse and visualise astronomical observations using Python and Astropy.',
    referenceTitle: 'NASA Prepares Roman Space Telescope for 2026 Launch to L2 Orbit',
  },
  {
    number: '02',
    title: 'Astrostatistics',
    description: 'Learn how to extract reliable scientific conclusions from astronomical data.',
    referenceTitle: 'EDR - DESI Data',
  },
  {
    number: '03',
    title: 'Cosmology and Computational Cosmology',
    description: 'Understand the universe theoretically and learn to calculate, simulate and analyse cosmological quantities.',
    referenceTitle: 'Le « Vide local » proche de la Voie lactée cartographié en 3D',
  },
  {
    number: '04',
    title: 'Cosmic Voids',
    description: 'Study the identification, structure, evolution and observational properties of cosmic voids.',
    referenceTitle:
      'Galaxies in the great cosmic voids grow more slowly than the rest of the universe | Instituto de Astrofísica de Andalucía - CSIC',
  },
  {
    number: '05',
    title: 'Multimessenger Astronomy',
    description:
      'Understand how gravitational waves, electromagnetic radiation, neutrinos and cosmic rays reveal astrophysical phenomena.',
    referenceTitle: 'Artist’s Illustration of Multi-Messenger Event | NOIRLab',
  },
];

export const PROJECT_2_CONNECTIONS = {
  intro: 'The learning tracks should reinforce one another.',
  foundation: {
    title: 'Python and Scientific Computing',
    subtitle: 'Common computational foundation',
  },
  branches: ['Astronomy + Astropy', 'Astrostatistics', 'Cosmology', 'Multimessenger Astronomy'],
  specialisation: {
    title: 'Research specialisation: Cosmic Voids',
    subtitle: 'Apply the theoretical, observational and statistical tools together.',
  },
  note: 'I would not study these five subjects in isolation. For example, while studying Astropy, you can learn how to process a FITS file. While studying Astrostatistics, you can learn how to analyse the uncertainties in that same dataset.',
};

export const PROJECT_2_SUBJECTS: SubjectData[] = [
  {
    id: 'p2-subj-01',
    number: '01',
    title: 'Astronomy using Astropy',
    subtitle: 'Observational astronomy + Python',
    objective:
      'Become comfortable working with real astronomical observations, catalogues, images and spectra using Python.',
    intro:
      'This is not just learning the Astropy library. You need to understand the astronomical data that the library handles.',
    milestones: [
      { id: 'p2-s1-m1', text: 'Astronomy fundamentals', importantByDefault: true },
      { id: 'p2-s1-m2', text: 'Python for astronomy' },
      { id: 'p2-s1-m3', text: 'Astropy core packages', importantByDefault: true },
      { id: 'p2-s1-m4', text: 'Image analysis and photometry' },
      { id: 'p2-s1-m5', text: 'Spectroscopy' },
      { id: 'p2-s1-m6', text: 'Astronomical archives' },
      { id: 'p2-s1-m7', text: 'Observational mini-project' },
    ],
    detailGroups: [
      {
        id: 'p2-s1-a',
        heading: 'A. Astronomy fundamentals',
        items: [
          { id: 'p2-s1-a1', text: 'Revise the celestial sphere.' },
          { id: 'p2-s1-a2', text: 'Study right ascension and declination.' },
          { id: 'p2-s1-a3', text: 'Understand equatorial, galactic and ecliptic coordinate systems.' },
          { id: 'p2-s1-a4', text: 'Study angular separation.' },
          { id: 'p2-s1-a5', text: 'Understand apparent and absolute magnitude.' },
          { id: 'p2-s1-a6', text: 'Study luminosity and flux.' },
          { id: 'p2-s1-a7', text: 'Understand distance modulus.' },
          { id: 'p2-s1-a8', text: 'Study astronomical redshift.' },
          { id: 'p2-s1-a9', text: 'Understand parallax and proper motion.' },
          { id: 'p2-s1-a10', text: 'Study stellar spectra and spectral classification.' },
          { id: 'p2-s1-a11', text: 'Understand emission and absorption lines.' },
          { id: 'p2-s1-a12', text: "Study blackbody radiation and Planck's law." },
          { id: 'p2-s1-a13', text: 'Understand interstellar extinction and reddening.' },
        ],
      },
      {
        id: 'p2-s1-b',
        heading: 'B. Python for astronomy',
        items: [
          { id: 'p2-s1-b1', text: 'Revise Python functions, loops and classes.' },
          { id: 'p2-s1-b2', text: 'Learn NumPy arrays and broadcasting.' },
          { id: 'p2-s1-b3', text: 'Learn Pandas for catalogue manipulation.' },
          { id: 'p2-s1-b4', text: 'Learn Matplotlib for astronomical plots.' },
          { id: 'p2-s1-b5', text: 'Learn SciPy for interpolation, integration and curve fitting.' },
          { id: 'p2-s1-b6', text: 'Learn how to organise scientific scripts into modules.' },
          { id: 'p2-s1-b7', text: 'Learn how to work with Jupyter notebooks.' },
        ],
      },
      {
        id: 'p2-s1-c',
        heading: 'C. Astropy core packages',
        intro: 'Work through these packages in the following order.',
        packageTable: [
          {
            pkg: 'astropy.units',
            tasks: [
              { id: 'p2-s1-c-u1', text: 'Learn physical units.' },
              { id: 'p2-s1-c-u2', text: 'Convert units.' },
              { id: 'p2-s1-c-u3', text: 'Work with quantities.' },
              { id: 'p2-s1-c-u4', text: 'Perform unit-aware calculations.' },
            ],
          },
          {
            pkg: 'astropy.constants',
            tasks: [
              { id: 'p2-s1-c-k1', text: 'Learn astronomical constants.' },
              { id: 'p2-s1-c-k2', text: 'Use constants in physical calculations.' },
            ],
          },
          {
            pkg: 'astropy.coordinates',
            tasks: [
              { id: 'p2-s1-c-co1', text: 'Learn SkyCoord.' },
              { id: 'p2-s1-c-co2', text: 'Transform coordinate frames.' },
              { id: 'p2-s1-c-co3', text: 'Calculate angular separations.' },
              { id: 'p2-s1-c-co4', text: 'Cross-match catalogues.' },
            ],
          },
          {
            pkg: 'astropy.time',
            tasks: [
              { id: 'p2-s1-c-t1', text: 'Understand astronomical time formats.' },
              { id: 'p2-s1-c-t2', text: 'Learn UTC, TAI and Julian dates.' },
              { id: 'p2-s1-c-t3', text: 'Convert between time systems.' },
            ],
          },
          {
            pkg: 'astropy.io.fits',
            tasks: [
              { id: 'p2-s1-c-f1', text: 'Read FITS files.' },
              { id: 'p2-s1-c-f2', text: 'Inspect HDUs.' },
              { id: 'p2-s1-c-f3', text: 'Extract image arrays.' },
              { id: 'p2-s1-c-f4', text: 'Read and modify headers.' },
              { id: 'p2-s1-c-f5', text: 'Write FITS files.' },
            ],
          },
          {
            pkg: 'astropy.wcs',
            tasks: [
              { id: 'p2-s1-c-w1', text: 'Understand World Coordinate Systems.' },
              { id: 'p2-s1-c-w2', text: 'Convert pixel coordinates to sky coordinates.' },
              { id: 'p2-s1-c-w3', text: 'Convert sky coordinates to pixels.' },
              { id: 'p2-s1-c-w4', text: 'Make WCS-aware plots.' },
            ],
          },
          {
            pkg: 'astropy.table',
            tasks: [
              { id: 'p2-s1-c-tb1', text: 'Read astronomical catalogues.' },
              { id: 'p2-s1-c-tb2', text: 'Filter rows.' },
              { id: 'p2-s1-c-tb3', text: 'Join tables.' },
              { id: 'p2-s1-c-tb4', text: 'Handle missing values.' },
            ],
          },
          {
            pkg: 'astropy.modeling',
            tasks: [
              { id: 'p2-s1-c-m1', text: 'Understand models and parameters.' },
              { id: 'p2-s1-c-m2', text: 'Fit Gaussian profiles.' },
              { id: 'p2-s1-c-m3', text: 'Perform model fitting.' },
              { id: 'p2-s1-c-m4', text: 'Compare fitted models.' },
            ],
          },
          {
            pkg: 'astropy.cosmology',
            tasks: [
              { id: 'p2-s1-c-cs1', text: 'Define cosmological models.' },
              { id: 'p2-s1-c-cs2', text: 'Calculate distances.' },
              { id: 'p2-s1-c-cs3', text: 'Calculate lookback time.' },
              { id: 'p2-s1-c-cs4', text: 'Calculate age of the universe at redshift.' },
            ],
          },
        ],
      },
      {
        id: 'p2-s1-d',
        heading: 'D. Astronomical data analysis',
        items: [
          { id: 'p2-s1-d1', text: 'Learn how astronomical images are stored.' },
          { id: 'p2-s1-d2', text: 'Understand pixels, image dimensions and pixel scale.' },
          { id: 'p2-s1-d3', text: 'Study image background estimation.' },
          { id: 'p2-s1-d4', text: 'Understand signal-to-noise ratio.' },
          { id: 'p2-s1-d5', text: 'Study basic aperture photometry.' },
          { id: 'p2-s1-d6', text: 'Learn source detection and centroiding.' },
          { id: 'p2-s1-d7', text: 'Understand point spread functions (PSF).' },
          { id: 'p2-s1-d8', text: 'Study image convolution.' },
          { id: 'p2-s1-d9', text: 'Learn basic image stacking.' },
          { id: 'p2-s1-d10', text: 'Study astronomical image visualisation.' },
        ],
      },
      {
        id: 'p2-s1-e',
        heading: 'E. Spectroscopy',
        intro: 'This is especially useful for working with observational datasets.',
        items: [
          { id: 'p2-s1-e1', text: 'Understand spectral flux density.' },
          { id: 'p2-s1-e2', text: 'Learn wavelength calibration.' },
          { id: 'p2-s1-e3', text: 'Study spectral extraction.' },
          { id: 'p2-s1-e4', text: 'Understand continuum subtraction.' },
          { id: 'p2-s1-e5', text: 'Learn Gaussian line fitting.' },
          { id: 'p2-s1-e6', text: 'Calculate line centres and widths.' },
          { id: 'p2-s1-e7', text: 'Understand Doppler shifts.' },
          { id: 'p2-s1-e8', text: 'Calculate redshift from spectral lines.' },
          { id: 'p2-s1-e9', text: 'Study equivalent width.' },
          { id: 'p2-s1-e10', text: 'Understand spectral resolution.' },
          { id: 'p2-s1-e11', text: 'Learn basic spectral-cube handling.' },
        ],
      },
      {
        id: 'p2-s1-f',
        heading: 'F. Astronomical archives and data retrieval',
        items: [
          { id: 'p2-s1-f1', text: 'Learn how to use Astroquery.' },
          { id: 'p2-s1-f2', text: 'Query astronomical catalogues.' },
          { id: 'p2-s1-f3', text: 'Retrieve data from SIMBAD.' },
          { id: 'p2-s1-f4', text: 'Retrieve data from VizieR.' },
          { id: 'p2-s1-f5', text: 'Explore Gaia data.' },
          { id: 'p2-s1-f6', text: 'Explore MAST and JWST data products.' },
          { id: 'p2-s1-f7', text: 'Explore NASA HEASARC.' },
          { id: 'p2-s1-f8', text: 'Understand data provenance and metadata.' },
          { id: 'p2-s1-f9', text: 'Learn how to cite observational datasets.' },
        ],
      },
    ],
    practicalExercisesTitle: 'Mini-projects — Astronomy with Astropy',
    practicalExercises: [
      { id: 'p2-s1-ex1', text: 'Download an astronomical image and display it using FITS.' },
      { id: 'p2-s1-ex2', text: 'Overlay celestial coordinates on an astronomical image.' },
      { id: 'p2-s1-ex3', text: 'Retrieve a star catalogue and make a colour-magnitude diagram.' },
      { id: 'p2-s1-ex4', text: 'Cross-match two astronomical catalogues.' },
      { id: 'p2-s1-ex5', text: 'Retrieve Gaia data and investigate stellar proper motions.' },
      { id: 'p2-s1-ex6', text: 'Analyse a galaxy spectrum and fit its emission lines.' },
      { id: 'p2-s1-ex7', text: 'Calculate cosmological distances for a sample of galaxies.' },
      { id: 'p2-s1-ex8', text: 'Create a complete observational analysis notebook.' },
    ],
    resources: [
      {
        label: 'Learn Astropy — official tutorial collection',
        url: 'https://learn.astropy.org/?utm_source=chatgpt.com',
        note: 'This should be your primary resource. It includes FITS, spectroscopy, coordinates, modelling, catalogues and more. (Learn Astropy+1)',
      },
      {
        label: 'FITS image tutorial',
        url: 'https://learn.astropy.org/tutorials/FITS-images.html?utm_source=chatgpt.com',
        note: 'FITS Images',
      },
      {
        label: 'WCS and celestial coordinates',
        url: 'https://learn.astropy.org/tutorials/wcs-celestial-coordinates.html?utm_source=chatgpt.com',
        note: 'WCS Celestial Coordinates',
      },
      {
        label: 'Astropy documentation',
        url: 'https://docs.astropy.org/?utm_source=chatgpt.com',
      },
    ],
    finalCompetency:
      'You should be able to independently download an astronomical dataset, understand its structure, process it, perform basic analysis and produce publication-quality plots.',
  },
  {
    id: 'p2-subj-02',
    number: '02',
    title: 'Astrostatistics',
    subtitle: 'Statistics + scientific inference',
    objective:
      'Learn how to extract meaningful scientific information from noisy, incomplete and uncertain astronomical observations.',
    intro:
      'This subject is particularly important. A scientifically attractive graph does not necessarily represent a statistically significant discovery.',
    milestones: [
      { id: 'p2-s2-m1', text: 'Probability and distributions' },
      { id: 'p2-s2-m2', text: 'Descriptive statistics' },
      { id: 'p2-s2-m3', text: 'Frequentist statistics', importantByDefault: true },
      { id: 'p2-s2-m4', text: 'Bayesian statistics', importantByDefault: true },
      { id: 'p2-s2-m5', text: 'Parameter estimation' },
      { id: 'p2-s2-m6', text: 'Advanced statistical methods' },
      { id: 'p2-s2-m7', text: 'Astronomical applications' },
      { id: 'p2-s2-m8', text: 'Statistical mini-project' },
    ],
    detailGroups: [
      {
        id: 'p2-s2-a',
        heading: 'A. Mathematical foundations',
        items: [
          { id: 'p2-s2-a1', text: 'Revise probability theory.' },
          { id: 'p2-s2-a2', text: 'Understand random variables.' },
          { id: 'p2-s2-a3', text: 'Study probability density functions.' },
          { id: 'p2-s2-a4', text: 'Study cumulative distribution functions.' },
          { id: 'p2-s2-a5', text: 'Understand expectation values.' },
          { id: 'p2-s2-a6', text: 'Understand variance and standard deviation.' },
          { id: 'p2-s2-a7', text: 'Study covariance and correlation.' },
          { id: 'p2-s2-a8', text: 'Understand conditional probability.' },
          { id: 'p2-s2-a9', text: "Study Bayes' theorem." },
          { id: 'p2-s2-a10', text: 'Understand joint and marginal distributions.' },
        ],
      },
      {
        id: 'p2-s2-b',
        heading: 'B. Probability distributions',
        items: [
          { id: 'p2-s2-b1', text: 'Study Gaussian distributions.' },
          { id: 'p2-s2-b2', text: 'Study Poisson distributions.' },
          { id: 'p2-s2-b3', text: 'Study binomial distributions.' },
          { id: 'p2-s2-b4', text: 'Study exponential distributions.' },
          { id: 'p2-s2-b5', text: 'Understand chi-square distributions.' },
          { id: 'p2-s2-b6', text: "Study Student's t-distribution." },
          { id: 'p2-s2-b7', text: 'Understand log-normal distributions.' },
          { id: 'p2-s2-b8', text: 'Learn when each distribution is appropriate for astronomical measurements.' },
        ],
      },
      {
        id: 'p2-s2-c',
        heading: 'C. Descriptive statistics and data analysis',
        items: [
          { id: 'p2-s2-c1', text: 'Calculate mean, median and mode.' },
          { id: 'p2-s2-c2', text: 'Understand standard deviation.' },
          { id: 'p2-s2-c3', text: 'Study standard error.' },
          { id: 'p2-s2-c4', text: 'Learn robust estimators.' },
          { id: 'p2-s2-c5', text: 'Study percentiles and quantiles.' },
          { id: 'p2-s2-c6', text: 'Understand outliers.' },
          { id: 'p2-s2-c7', text: 'Learn histogram construction.' },
          { id: 'p2-s2-c8', text: 'Study correlation coefficients.' },
          { id: 'p2-s2-c9', text: 'Understand selection bias.' },
          { id: 'p2-s2-c10', text: 'Understand observational uncertainties.' },
        ],
      },
      {
        id: 'p2-s2-d',
        heading: 'D. Frequentist statistics',
        items: [
          { id: 'p2-s2-d1', text: 'Understand sampling distributions.' },
          { id: 'p2-s2-d2', text: 'Study the central limit theorem.' },
          { id: 'p2-s2-d3', text: 'Understand confidence intervals.' },
          { id: 'p2-s2-d4', text: 'Learn hypothesis testing.' },
          { id: 'p2-s2-d5', text: 'Study null and alternative hypotheses.' },
          { id: 'p2-s2-d6', text: 'Understand p-values.' },
          { id: 'p2-s2-d7', text: 'Study Type I and Type II errors.' },
          { id: 'p2-s2-d8', text: 'Learn statistical power.' },
          { id: 'p2-s2-d9', text: 'Study maximum likelihood estimation.' },
          { id: 'p2-s2-d10', text: 'Understand chi-square goodness-of-fit.' },
          { id: 'p2-s2-d11', text: 'Learn likelihood-ratio tests.' },
        ],
      },
      {
        id: 'p2-s2-e',
        heading: 'E. Bayesian statistics',
        items: [
          { id: 'p2-s2-e1', text: 'Understand prior distributions.' },
          { id: 'p2-s2-e2', text: 'Understand likelihood functions.' },
          { id: 'p2-s2-e3', text: 'Study posterior distributions.' },
          { id: 'p2-s2-e4', text: "Apply Bayes' theorem to parameter estimation." },
          { id: 'p2-s2-e5', text: 'Understand informative and uninformative priors.' },
          { id: 'p2-s2-e6', text: 'Learn marginalisation.' },
          { id: 'p2-s2-e7', text: 'Study credible intervals.' },
          { id: 'p2-s2-e8', text: 'Understand Bayesian model comparison.' },
          { id: 'p2-s2-e9', text: 'Study Bayes factors.' },
          { id: 'p2-s2-e10', text: 'Understand Bayesian evidence.' },
        ],
      },
      {
        id: 'p2-s2-f',
        heading: 'F. Parameter estimation and model fitting',
        items: [
          { id: 'p2-s2-f1', text: 'Understand linear regression.' },
          { id: 'p2-s2-f2', text: 'Study nonlinear regression.' },
          { id: 'p2-s2-f3', text: 'Learn least-squares fitting.' },
          { id: 'p2-s2-f4', text: 'Understand weighted least squares.' },
          { id: 'p2-s2-f5', text: 'Learn maximum likelihood fitting.' },
          { id: 'p2-s2-f6', text: 'Study parameter degeneracy.' },
          { id: 'p2-s2-f7', text: 'Understand error propagation.' },
          { id: 'p2-s2-f8', text: 'Learn covariance matrices.' },
          { id: 'p2-s2-f9', text: 'Study parameter correlations.' },
          { id: 'p2-s2-f10', text: 'Learn residual analysis.' },
        ],
      },
      {
        id: 'p2-s2-g',
        heading: 'G. Advanced statistical methods',
        items: [
          { id: 'p2-s2-g1', text: 'Learn Monte Carlo integration.' },
          { id: 'p2-s2-g2', text: 'Study Markov Chain Monte Carlo (MCMC).' },
          { id: 'p2-s2-g3', text: 'Understand Metropolis-Hastings.' },
          { id: 'p2-s2-g4', text: 'Understand convergence diagnostics.' },
          { id: 'p2-s2-g5', text: 'Study bootstrap resampling.' },
          { id: 'p2-s2-g6', text: 'Study jackknife resampling.' },
          { id: 'p2-s2-g7', text: 'Understand permutation tests.' },
          { id: 'p2-s2-g8', text: 'Learn Monte Carlo hypothesis testing.' },
          { id: 'p2-s2-g9', text: 'Study principal component analysis (PCA).' },
          { id: 'p2-s2-g10', text: 'Understand clustering and classification.' },
          { id: 'p2-s2-g11', text: 'Learn model selection and information criteria.' },
          { id: 'p2-s2-g12', text: 'Study cross-validation.' },
        ],
      },
      {
        id: 'p2-s2-h',
        heading: 'H. Statistics specifically used in astronomy',
        items: [
          { id: 'p2-s2-h1', text: 'Understand photon-counting statistics.' },
          { id: 'p2-s2-h2', text: 'Study Poisson noise.' },
          { id: 'p2-s2-h3', text: 'Understand detector noise.' },
          { id: 'p2-s2-h4', text: 'Learn background subtraction and uncertainty.' },
          { id: 'p2-s2-h5', text: 'Study censored and upper-limit measurements.' },
          { id: 'p2-s2-h6', text: 'Understand completeness and selection functions.' },
          { id: 'p2-s2-h7', text: 'Learn how astronomical surveys introduce biases.' },
          { id: 'p2-s2-h8', text: 'Study luminosity-function estimation.' },
          { id: 'p2-s2-h9', text: 'Understand correlation-function uncertainties.' },
          { id: 'p2-s2-h10', text: 'Study covariance estimation.' },
          { id: 'p2-s2-h11', text: 'Understand cosmic variance.' },
          { id: 'p2-s2-h12', text: 'Study significance estimation in cross-correlations.' },
          { id: 'p2-s2-h13', text: 'Understand multiple testing and look-elsewhere effects.' },
        ],
      },
    ],
    practicalExercisesTitle: 'Mini-projects — Astrostatistics',
    practicalExercises: [
      { id: 'p2-s2-ex1', text: 'Fit a Gaussian to a noisy astronomical dataset.' },
      { id: 'p2-s2-ex2', text: 'Estimate the parameters of a stellar luminosity distribution.' },
      { id: 'p2-s2-ex3', text: 'Perform a linear regression on galaxy observations.' },
      { id: 'p2-s2-ex4', text: 'Fit a model using maximum likelihood.' },
      { id: 'p2-s2-ex5', text: 'Estimate uncertainties using bootstrap resampling.' },
      { id: 'p2-s2-ex6', text: 'Implement a simple MCMC sampler.' },
      { id: 'p2-s2-ex7', text: 'Compare two competing statistical models.' },
      { id: 'p2-s2-ex8', text: 'Analyse a Poisson-distributed photon-count dataset.' },
      { id: 'p2-s2-ex9', text: 'Estimate the significance of a synthetic astronomical signal.' },
    ],
    resources: [
      {
        label: 'IUCAA — Statistical Techniques in Astronomy',
        url: 'https://ace.iucaa.in/resources.html?id=13&view=category&utm_source=chatgpt.com',
        note: 'Make this your primary course. It includes frequentist statistics, Bayesian methods, MCMC, parameter estimation and model selection. (Astronomy Centre for Educators+1)',
      },
      {
        label: 'StatQuest lectures',
        url: 'https://www.youtube.com/results?search_query=StatQuest+statistics+machine+learning&utm_source=chatgpt.com',
        note: 'Use for supplementary explanations.',
      },
      {
        label: 'SciPy',
        url: 'https://scipy.org/?utm_source=chatgpt.com',
        note: 'Computational implementation.',
      },
    ],
    finalCompetency:
      'You should be able to estimate parameters, quantify uncertainties, test hypotheses and defend the statistical significance of an astronomical result.',
  },
  {
    id: 'p2-subj-03',
    number: '03',
    title: 'Cosmology and Computational Cosmology',
    subtitle: 'Theoretical physics + numerical computation',
    objective:
      'Understand the physical and mathematical framework of modern cosmology and learn to implement cosmological calculations using Python.',
    intro: 'I suggest dividing this into theoretical cosmology and computational cosmology.',
    milestones: [
      { id: 'p2-s3-m1', text: 'Cosmological foundations' },
      { id: 'p2-s3-m2', text: 'General relativity' },
      { id: 'p2-s3-m3', text: 'Background cosmology', importantByDefault: true },
      { id: 'p2-s3-m4', text: 'Thermal history' },
      { id: 'p2-s3-m5', text: 'Structure formation', importantByDefault: true },
      { id: 'p2-s3-m6', text: 'Observational cosmology' },
      { id: 'p2-s3-m7', text: 'Computational cosmology' },
      { id: 'p2-s3-m8', text: 'Simulation and Boltzmann codes' },
    ],
    detailGroups: [
      {
        id: 'p2-s3-a',
        heading: 'A. Foundations of cosmology',
        items: [
          { id: 'p2-s3-a1', text: 'Understand the cosmological principle.' },
          { id: 'p2-s3-a2', text: 'Study homogeneity and isotropy.' },
          { id: 'p2-s3-a3', text: 'Understand the observable universe.' },
          { id: 'p2-s3-a4', text: 'Study the expansion of the universe.' },
          { id: 'p2-s3-a5', text: 'Understand cosmological redshift.' },
          { id: 'p2-s3-a6', text: "Study Hubble's law." },
          { id: 'p2-s3-a7', text: 'Understand different cosmological distance measures.' },
          { id: 'p2-s3-a8', text: 'Study the age and size of the universe.' },
          { id: 'p2-s3-a9', text: 'Understand the Friedmann–Lemaître–Robertson–Walker metric.' },
        ],
      },
      {
        id: 'p2-s3-b',
        heading: 'B. General relativity for cosmology',
        items: [
          { id: 'p2-s3-b1', text: 'Revise special relativity.' },
          { id: 'p2-s3-b2', text: 'Understand spacetime and four-vectors.' },
          { id: 'p2-s3-b3', text: 'Study tensors and tensor notation.' },
          { id: 'p2-s3-b4', text: 'Understand the metric tensor.' },
          { id: 'p2-s3-b5', text: 'Study curvature of spacetime.' },
          { id: 'p2-s3-b6', text: 'Understand Christoffel symbols.' },
          { id: 'p2-s3-b7', text: 'Learn the basics of geodesics.' },
          { id: 'p2-s3-b8', text: 'Study the Einstein field equations.' },
          { id: 'p2-s3-b9', text: 'Understand the energy-momentum tensor.' },
          { id: 'p2-s3-b10', text: "Derive the Friedmann equations from Einstein's equations." },
        ],
      },
      {
        id: 'p2-s3-c',
        heading: 'C. Background cosmology',
        items: [
          { id: 'p2-s3-c1', text: 'Understand the Hubble parameter H(z).' },
          { id: 'p2-s3-c2', text: 'Study matter density.' },
          { id: 'p2-s3-c3', text: 'Study radiation density.' },
          { id: 'p2-s3-c4', text: 'Understand dark energy.' },
          { id: 'p2-s3-c5', text: 'Study spatial curvature.' },
          { id: 'p2-s3-c6', text: 'Understand density parameters.' },
          { id: 'p2-s3-c7', text: 'Study the critical density.' },
          { id: 'p2-s3-c8', text: 'Understand the equation of state parameter.' },
          { id: 'p2-s3-c9', text: 'Study the cosmological constant.' },
          { id: 'p2-s3-c10', text: 'Understand the ΛCDM model.' },
        ],
      },
      {
        id: 'p2-s3-d',
        heading: 'D. Thermal history of the universe',
        items: [
          { id: 'p2-s3-d1', text: 'Study the early universe.' },
          { id: 'p2-s3-d2', text: 'Understand primordial nucleosynthesis.' },
          { id: 'p2-s3-d3', text: 'Study recombination.' },
          { id: 'p2-s3-d4', text: 'Understand photon decoupling.' },
          { id: 'p2-s3-d5', text: 'Study the CMB.' },
          { id: 'p2-s3-d6', text: 'Understand matter-radiation equality.' },
          { id: 'p2-s3-d7', text: 'Study reionisation.' },
          { id: 'p2-s3-d8', text: 'Understand the role of neutrinos.' },
          { id: 'p2-s3-d9', text: 'Study inflation at an introductory level.' },
        ],
      },
      {
        id: 'p2-s3-e',
        heading: 'E. Structure formation',
        items: [
          { id: 'p2-s3-e1', text: 'Understand primordial density perturbations.' },
          { id: 'p2-s3-e2', text: 'Study the matter density contrast.' },
          { id: 'p2-s3-e3', text: 'Understand linear perturbation theory.' },
          { id: 'p2-s3-e4', text: 'Study gravitational instability.' },
          { id: 'p2-s3-e5', text: 'Understand the growth factor.' },
          { id: 'p2-s3-e6', text: 'Study the growth rate of structure.' },
          { id: 'p2-s3-e7', text: 'Understand the matter power spectrum.' },
          { id: 'p2-s3-e8', text: 'Study the two-point correlation function.' },
          { id: 'p2-s3-e9', text: 'Understand baryon acoustic oscillations.' },
          { id: 'p2-s3-e10', text: 'Study dark matter halo formation.' },
          { id: 'p2-s3-e11', text: 'Understand nonlinear structure formation.' },
        ],
      },
      {
        id: 'p2-s3-f',
        heading: 'F. Observational cosmology',
        items: [
          { id: 'p2-s3-f1', text: 'Study supernova distance measurements.' },
          { id: 'p2-s3-f2', text: 'Understand baryon acoustic oscillations.' },
          { id: 'p2-s3-f3', text: 'Study CMB temperature anisotropies.' },
          { id: 'p2-s3-f4', text: 'Understand CMB angular power spectra.' },
          { id: 'p2-s3-f5', text: 'Study weak gravitational lensing.' },
          { id: 'p2-s3-f6', text: 'Understand galaxy clustering.' },
          { id: 'p2-s3-f7', text: 'Study redshift-space distortions.' },
          { id: 'p2-s3-f8', text: 'Understand cosmological parameter estimation.' },
          { id: 'p2-s3-f9', text: 'Study observational constraints on ΛCDM.' },
        ],
      },
      {
        id: 'p2-s3-g',
        heading: 'G. Computational cosmology with Python',
        items: [
          { id: 'p2-s3-g1', text: 'Learn numerical integration using SciPy.' },
          { id: 'p2-s3-g2', text: 'Implement the Friedmann equation.' },
          { id: 'p2-s3-g3', text: 'Calculate H(z).' },
          { id: 'p2-s3-g4', text: 'Calculate comoving distance.' },
          { id: 'p2-s3-g5', text: 'Calculate luminosity distance.' },
          { id: 'p2-s3-g6', text: 'Calculate angular diameter distance.' },
          { id: 'p2-s3-g7', text: 'Calculate lookback time.' },
          { id: 'p2-s3-g8', text: 'Calculate the age of the universe at different redshifts.' },
          { id: 'p2-s3-g9', text: 'Solve ordinary differential equations numerically.' },
          { id: 'p2-s3-g10', text: 'Implement the linear growth equation.' },
          { id: 'p2-s3-g11', text: 'Plot the growth factor against redshift.' },
          { id: 'p2-s3-g12', text: 'Calculate the matter power spectrum using a cosmology package.' },
          { id: 'p2-s3-g13', text: 'Study numerical interpolation.' },
          { id: 'p2-s3-g14', text: 'Understand numerical convergence and precision.' },
          { id: 'p2-s3-g15', text: 'Compare your calculations with published cosmological results.' },
        ],
      },
      {
        id: 'p2-s3-h',
        heading: 'H. Computational cosmology — advanced',
        items: [
          { id: 'p2-s3-h1', text: 'Understand Fourier transforms.' },
          { id: 'p2-s3-h2', text: 'Study power-spectrum estimation.' },
          { id: 'p2-s3-h3', text: 'Understand window functions.' },
          { id: 'p2-s3-h4', text: 'Study transfer functions.' },
          { id: 'p2-s3-h5', text: 'Learn how initial conditions for simulations are generated.' },
          { id: 'p2-s3-h6', text: 'Understand N-body simulations conceptually.' },
          { id: 'p2-s3-h7', text: 'Study numerical gravitational dynamics.' },
          { id: 'p2-s3-h8', text: 'Understand particle-mesh methods.' },
          { id: 'p2-s3-h9', text: 'Explore Boltzmann solvers such as CLASS or CAMB.' },
          { id: 'p2-s3-h10', text: 'Learn how to read and interpret simulation outputs.' },
        ],
      },
    ],
    practicalExercisesTitle: 'Mini-projects — Computational Cosmology',
    practicalExercises: [
      { id: 'p2-s3-ex1', text: 'Build a Python ΛCDM calculator.' },
      { id: 'p2-s3-ex2', text: 'Plot the expansion history of the universe.' },
      { id: 'p2-s3-ex3', text: 'Plot distance-redshift relations.' },
      { id: 'p2-s3-ex4', text: 'Calculate the age of the universe at different redshifts.' },
      { id: 'p2-s3-ex5', text: 'Numerically solve the linear growth equation.' },
      { id: 'p2-s3-ex6', text: 'Plot the matter power spectrum.' },
      { id: 'p2-s3-ex7', text: 'Compare two different cosmological parameter sets.' },
      { id: 'p2-s3-ex8', text: 'Reproduce a published cosmological figure.' },
      { id: 'p2-s3-ex9', text: 'Analyse a public cosmological simulation output.' },
    ],
    resources: [
      {
        label: 'University of Sussex Cosmology lectures — David Parkinson',
        url: 'https://cosmology.kasi.re.kr/parkinson/cosmology/index.php?utm_source=chatgpt.com',
        note: 'This is your primary lecture sequence. It covers the FRW metric, Friedmann equations, thermal history, perturbations, structure formation and CMB. (cosmology.kasi.re.kr)',
      },
      {
        label: 'Eigenchris',
        url: 'https://www.eigenchris.com/?utm_source=chatgpt.com',
        note: 'Supplementary mathematical explanations, particularly general relativity.',
      },
      {
        label: 'Astropy Cosmology',
        url: 'https://docs.astropy.org/en/stable/cosmology/index.html?utm_source=chatgpt.com',
        note: 'Computational implementation.',
      },
      {
        label: 'CLASS cosmological Boltzmann code',
        url: 'https://class-code.net/?utm_source=chatgpt.com',
        note: 'Advanced computational work.',
      },
      {
        label: 'CAMB documentation',
        url: 'https://camb.readthedocs.io/?utm_source=chatgpt.com',
        note: 'Cosmological calculations.',
      },
    ],
    finalCompetency:
      'You should be able to derive and numerically implement basic cosmological equations, interpret cosmological observables and work with computational cosmology tools.',
  },
  {
    id: 'p2-subj-04',
    number: '04',
    title: 'Cosmic Voids',
    subtitle: 'Specialisation: Large-scale structure',
    objective:
      'Develop a thorough understanding of cosmic voids, from their physical origin to their identification in galaxy surveys and their use in observational cosmology.',
    intro: 'This is a specialisation subject. It will use knowledge from all three preceding tracks.',
    milestones: [
      { id: 'p2-s4-m1', text: 'Large-scale structure' },
      { id: 'p2-s4-m2', text: 'Void physics', importantByDefault: true },
      { id: 'p2-s4-m3', text: 'Void identification algorithms' },
      { id: 'p2-s4-m4', text: 'Survey catalogues' },
      { id: 'p2-s4-m5', text: 'Void statistics' },
      { id: 'p2-s4-m6', text: 'Cosmological applications', importantByDefault: true },
      { id: 'p2-s4-m7', text: 'Computational analysis' },
      { id: 'p2-s4-m8', text: 'Research reproduction' },
    ],
    detailGroups: [
      {
        id: 'p2-s4-a',
        heading: 'A. Large-scale structure',
        items: [
          { id: 'p2-s4-a1', text: 'Study the cosmic web.' },
          { id: 'p2-s4-a2', text: 'Understand galaxy clusters, filaments, walls and voids.' },
          { id: 'p2-s4-a3', text: 'Study the matter density field.' },
          { id: 'p2-s4-a4', text: 'Understand underdense regions.' },
          { id: 'p2-s4-a5', text: 'Study gravitational instability.' },
          { id: 'p2-s4-a6', text: 'Understand the evolution of density perturbations.' },
          { id: 'p2-s4-a7', text: 'Study the formation of large-scale structures.' },
          { id: 'p2-s4-a8', text: 'Understand dark matter distribution in the cosmic web.' },
        ],
      },
      {
        id: 'p2-s4-b',
        heading: 'B. Void physics',
        items: [
          { id: 'p2-s4-b1', text: 'Understand the physical definition of a cosmic void.' },
          { id: 'p2-s4-b2', text: 'Study void formation and evolution.' },
          { id: 'p2-s4-b3', text: 'Understand void expansion.' },
          { id: 'p2-s4-b4', text: 'Study void density profiles.' },
          { id: 'p2-s4-b5', text: 'Understand void compensation.' },
          { id: 'p2-s4-b6', text: 'Study the relationship between voids and surrounding walls.' },
          { id: 'p2-s4-b7', text: 'Understand void merging.' },
          { id: 'p2-s4-b8', text: 'Study void hierarchies.' },
          { id: 'p2-s4-b9', text: 'Understand void ellipticity and shape.' },
          { id: 'p2-s4-b10', text: 'Study void environments.' },
          { id: 'p2-s4-b11', text: 'Understand the relationship between voids and dark energy.' },
        ],
      },
      {
        id: 'p2-s4-c',
        heading: 'C. Void identification algorithms',
        items: [
          { id: 'p2-s4-c1', text: 'Understand the difference between watershed and spherical void finders.' },
          { id: 'p2-s4-c2', text: 'Study the ZOBOV algorithm.' },
          { id: 'p2-s4-c3', text: 'Understand Voronoi tessellation.' },
          { id: 'p2-s4-c4', text: 'Study density estimation.' },
          { id: 'p2-s4-c5', text: 'Understand watershed segmentation.' },
          { id: 'p2-s4-c6', text: 'Study the VIDE framework.' },
          { id: 'p2-s4-c7', text: 'Understand the definition of void centres.' },
          { id: 'p2-s4-c8', text: 'Study effective void radius.' },
          { id: 'p2-s4-c9', text: 'Understand overlapping and nested voids.' },
          { id: 'p2-s4-c10', text: 'Study boundary effects.' },
          { id: 'p2-s4-c11', text: 'Understand how tracer density affects void identification.' },
        ],
      },
      {
        id: 'p2-s4-d',
        heading: 'D. Void catalogues and observational surveys',
        items: [
          { id: 'p2-s4-d1', text: 'Understand galaxy redshift surveys.' },
          { id: 'p2-s4-d2', text: 'Study spectroscopic and photometric surveys.' },
          { id: 'p2-s4-d3', text: 'Understand survey selection functions.' },
          { id: 'p2-s4-d4', text: 'Study BOSS.' },
          { id: 'p2-s4-d5', text: 'Study SDSS.' },
          { id: 'p2-s4-d6', text: 'Explore DESI.' },
          { id: 'p2-s4-d7', text: 'Study DESIVAST.' },
          { id: 'p2-s4-d8', text: 'Understand the construction of void catalogues.' },
          { id: 'p2-s4-d9', text: 'Learn how to inspect catalogue properties.' },
          { id: 'p2-s4-d10', text: 'Understand redshift-space distortions in void catalogues.' },
          { id: 'p2-s4-d11', text: 'Study observational limitations.' },
        ],
      },
      {
        id: 'p2-s4-e',
        heading: 'E. Void statistics',
        items: [
          { id: 'p2-s4-e1', text: 'Study void size functions.' },
          { id: 'p2-s4-e2', text: 'Understand void number density.' },
          { id: 'p2-s4-e3', text: 'Study void abundance.' },
          { id: 'p2-s4-e4', text: 'Understand void density profiles.' },
          { id: 'p2-s4-e5', text: 'Study void ellipticity distributions.' },
          { id: 'p2-s4-e6', text: 'Understand void-galaxy cross-correlation.' },
          { id: 'p2-s4-e7', text: 'Study void-void correlation.' },
          { id: 'p2-s4-e8', text: 'Understand void bias.' },
          { id: 'p2-s4-e9', text: 'Study void velocity profiles.' },
          { id: 'p2-s4-e10', text: 'Understand the relationship between voids and the matter power spectrum.' },
        ],
      },
      {
        id: 'p2-s4-f',
        heading: 'F. Voids as cosmological probes',
        items: [
          { id: 'p2-s4-f1', text: 'Study the Integrated Sachs–Wolfe effect in voids.' },
          { id: 'p2-s4-f2', text: 'Understand void gravitational potentials.' },
          { id: 'p2-s4-f3', text: 'Study weak lensing around voids.' },
          { id: 'p2-s4-f4', text: 'Understand void-galaxy lensing cross-correlations.' },
          { id: 'p2-s4-f5', text: 'Study redshift-space distortions around voids.' },
          { id: 'p2-s4-f6', text: 'Understand Alcock–Paczynski tests using voids.' },
          { id: 'p2-s4-f7', text: 'Study void-based tests of dark energy.' },
          { id: 'p2-s4-f8', text: 'Understand how voids can constrain modified gravity.' },
          { id: 'p2-s4-f9', text: 'Study screening mechanisms in modified gravity.' },
          { id: 'p2-s4-f10', text: 'Understand the role of voids in testing gravity on large scales.' },
        ],
      },
      {
        id: 'p2-s4-g',
        heading: 'G. Computational void analysis',
        items: [
          { id: 'p2-s4-g1', text: 'Learn how to process galaxy catalogues.' },
          { id: 'p2-s4-g2', text: 'Understand three-dimensional coordinate transformations.' },
          { id: 'p2-s4-g3', text: 'Convert redshifts into comoving distances.' },
          { id: 'p2-s4-g4', text: 'Construct three-dimensional galaxy distributions.' },
          { id: 'p2-s4-g5', text: 'Explore Voronoi tessellation computationally.' },
          { id: 'p2-s4-g6', text: 'Learn to use existing void-finding software.' },
          { id: 'p2-s4-g7', text: 'Visualise void catalogues.' },
          { id: 'p2-s4-g8', text: 'Calculate void effective radii.' },
          { id: 'p2-s4-g9', text: 'Calculate stacked density profiles.' },
          { id: 'p2-s4-g10', text: 'Calculate void size distributions.' },
          { id: 'p2-s4-g11', text: 'Perform void-centred stacking.' },
          { id: 'p2-s4-g12', text: 'Implement statistical uncertainty estimation.' },
          { id: 'p2-s4-g13', text: 'Compare observational and simulated void catalogues.' },
        ],
      },
      {
        id: 'p2-s4-h',
        heading: 'H. Research-level applications',
        items: [
          { id: 'p2-s4-h1', text: 'Reproduce a published void density profile.' },
          { id: 'p2-s4-h2', text: 'Reproduce a published void size function.' },
          { id: 'p2-s4-h3', text: 'Reproduce a void-galaxy cross-correlation measurement.' },
          { id: 'p2-s4-h4', text: 'Study a published void–CMB stacking analysis.' },
          { id: 'p2-s4-h5', text: 'Compare different void-finding algorithms.' },
          { id: 'p2-s4-h6', text: 'Investigate how void definitions affect scientific results.' },
          { id: 'p2-s4-h7', text: 'Identify an observational or theoretical research question.' },
        ],
      },
    ],
    practicalExercisesTitle: 'Mini-projects — Cosmic Voids',
    practicalExercises: [
      { id: 'p2-s4-ex1', text: 'Visualise a three-dimensional galaxy distribution.' },
      { id: 'p2-s4-ex2', text: 'Identify underdense regions in a synthetic density field.' },
      { id: 'p2-s4-ex3', text: 'Generate a simple spherical void model.' },
      { id: 'p2-s4-ex4', text: 'Calculate a void density profile.' },
      { id: 'p2-s4-ex5', text: 'Calculate a void size function from a sample catalogue.' },
      { id: 'p2-s4-ex6', text: 'Compare two void catalogues.' },
      { id: 'p2-s4-ex7', text: 'Reproduce a published void profile.' },
      { id: 'p2-s4-ex8', text: 'Analyse void-centred CMB temperature profiles.' },
    ],
    resources: [
      { label: 'SDSS/BOSS data and survey resources', url: 'https://www.sdss.org/?utm_source=chatgpt.com' },
      { label: 'DESI survey resources', url: 'https://www.desi.lbl.gov/?utm_source=chatgpt.com' },
      {
        label: 'VIDE void-finding software',
        url: 'https://github.com/seshnadathur/VIDE?utm_source=chatgpt.com',
        note: 'Investigate its documentation and underlying methodology.',
      },
      { label: 'Review papers on cosmic voids, their identification, statistics and cosmological applications.' },
      { label: 'Research papers on void–ISW cross-correlations.' },
    ],
    finalCompetency:
      'You should be able to understand a void catalogue, explain how it was constructed, analyse its properties and use voids as cosmological probes.',
  },
  {
    id: 'p2-subj-05',
    number: '05',
    title: 'Multimessenger Astronomy',
    subtitle: 'Observational astrophysics',
    objective:
      'Understand how different cosmic messengers carry complementary information about astrophysical sources, and learn how to analyse observations from multiple instruments.',
    intro:
      'This subject is particularly valuable because it connects theoretical physics, observational astronomy, numerical analysis and statistical inference.',
    milestones: [
      { id: 'p2-s5-m1', text: 'Observational astronomy' },
      { id: 'p2-s5-m2', text: 'Gravitational waves', importantByDefault: true },
      { id: 'p2-s5-m3', text: 'Neutrino astronomy' },
      { id: 'p2-s5-m4', text: 'Cosmic rays' },
      { id: 'p2-s5-m5', text: 'Transient sources' },
      { id: 'p2-s5-m6', text: 'Multimessenger observations', importantByDefault: true },
      { id: 'p2-s5-m7', text: 'Computational analysis' },
      { id: 'p2-s5-m8', text: 'Research case study' },
    ],
    detailGroups: [
      {
        id: 'p2-s5-a',
        heading: 'A. Foundations of observational astronomy',
        items: [
          { id: 'p2-s5-a1', text: 'Understand the electromagnetic spectrum.' },
          { id: 'p2-s5-a2', text: 'Study radio astronomy.' },
          { id: 'p2-s5-a3', text: 'Study infrared astronomy.' },
          { id: 'p2-s5-a4', text: 'Study optical astronomy.' },
          { id: 'p2-s5-a5', text: 'Study ultraviolet astronomy.' },
          { id: 'p2-s5-a6', text: 'Study X-ray astronomy.' },
          { id: 'p2-s5-a7', text: 'Study gamma-ray astronomy.' },
          { id: 'p2-s5-a8', text: 'Understand atmospheric and instrumental limitations.' },
          { id: 'p2-s5-a9', text: 'Study telescope sensitivity and angular resolution.' },
          { id: 'p2-s5-a10', text: 'Understand field of view.' },
          { id: 'p2-s5-a11', text: 'Study transient and time-domain astronomy.' },
        ],
      },
      {
        id: 'p2-s5-b',
        heading: 'B. Gravitational-wave astronomy',
        items: [
          { id: 'p2-s5-b1', text: 'Understand gravitational waves.' },
          { id: 'p2-s5-b2', text: 'Study their generation from accelerating masses.' },
          { id: 'p2-s5-b3', text: 'Understand binary systems.' },
          { id: 'p2-s5-b4', text: 'Study compact objects.' },
          { id: 'p2-s5-b5', text: 'Understand neutron stars and black holes.' },
          { id: 'p2-s5-b6', text: 'Study binary inspiral, merger and ringdown.' },
          { id: 'p2-s5-b7', text: 'Understand strain.' },
          { id: 'p2-s5-b8', text: 'Study gravitational-wave detectors.' },
          { id: 'p2-s5-b9', text: 'Understand interferometric detection.' },
          { id: 'p2-s5-b10', text: 'Study matched filtering.' },
          { id: 'p2-s5-b11', text: 'Understand signal-to-noise ratio.' },
          { id: 'p2-s5-b12', text: 'Study parameter estimation.' },
          { id: 'p2-s5-b13', text: 'Understand sky localisation.' },
          { id: 'p2-s5-b14', text: 'Learn the basics of gravitational-wave event catalogues.' },
        ],
      },
      {
        id: 'p2-s5-c',
        heading: 'C. Neutrino astronomy',
        items: [
          { id: 'p2-s5-c1', text: 'Understand neutrino properties.' },
          { id: 'p2-s5-c2', text: 'Study neutrino production mechanisms.' },
          { id: 'p2-s5-c3', text: 'Understand neutrino oscillations.' },
          { id: 'p2-s5-c4', text: 'Study astrophysical neutrino sources.' },
          { id: 'p2-s5-c5', text: 'Understand atmospheric and astrophysical neutrinos.' },
          { id: 'p2-s5-c6', text: 'Study neutrino detection principles.' },
          { id: 'p2-s5-c7', text: 'Understand Cherenkov detectors.' },
          { id: 'p2-s5-c8', text: 'Study IceCube.' },
          { id: 'p2-s5-c9', text: 'Understand neutrino event classification.' },
          { id: 'p2-s5-c10', text: 'Study neutrino energy reconstruction.' },
          { id: 'p2-s5-c11', text: 'Understand neutrino directional uncertainties.' },
        ],
      },
      {
        id: 'p2-s5-d',
        heading: 'D. Cosmic-ray astronomy',
        items: [
          { id: 'p2-s5-d1', text: 'Understand cosmic rays.' },
          { id: 'p2-s5-d2', text: 'Study their energy spectrum.' },
          { id: 'p2-s5-d3', text: 'Understand primary and secondary cosmic rays.' },
          { id: 'p2-s5-d4', text: 'Study cosmic-ray propagation.' },
          { id: 'p2-s5-d5', text: 'Understand magnetic deflection.' },
          { id: 'p2-s5-d6', text: 'Study cosmic-ray acceleration mechanisms.' },
          { id: 'p2-s5-d7', text: 'Understand ultra-high-energy cosmic rays.' },
          { id: 'p2-s5-d8', text: 'Study air-shower detection.' },
          { id: 'p2-s5-d9', text: 'Understand the Pierre Auger Observatory.' },
          { id: 'p2-s5-d10', text: 'Study the relationship between cosmic rays and possible astrophysical sources.' },
        ],
      },
      {
        id: 'p2-s5-e',
        heading: 'E. Transient astrophysical sources',
        items: [
          { id: 'p2-s5-e1', text: 'Study gamma-ray bursts.' },
          { id: 'p2-s5-e2', text: 'Understand short and long GRBs.' },
          { id: 'p2-s5-e3', text: 'Study neutron-star mergers.' },
          { id: 'p2-s5-e4', text: 'Understand kilonovae.' },
          { id: 'p2-s5-e5', text: 'Study supernovae.' },
          { id: 'p2-s5-e6', text: 'Understand tidal disruption events.' },
          { id: 'p2-s5-e7', text: 'Study active galactic nuclei.' },
          { id: 'p2-s5-e8', text: 'Understand blazars.' },
          { id: 'p2-s5-e9', text: 'Study fast radio bursts.' },
          { id: 'p2-s5-e10', text: 'Understand magnetars.' },
          { id: 'p2-s5-e11', text: 'Study compact-object populations.' },
          { id: 'p2-s5-e12', text: 'Understand the physical processes producing different messengers.' },
        ],
      },
      {
        id: 'p2-s5-f',
        heading: 'F. Multimessenger observations',
        items: [
          { id: 'p2-s5-f1', text: 'Understand the difference between single-messenger and multimessenger observations.' },
          { id: 'p2-s5-f2', text: 'Study temporal coincidence.' },
          { id: 'p2-s5-f3', text: 'Understand spatial coincidence.' },
          { id: 'p2-s5-f4', text: 'Study source association.' },
          { id: 'p2-s5-f5', text: 'Understand false associations.' },
          { id: 'p2-s5-f6', text: 'Learn the concept of a joint likelihood.' },
          { id: 'p2-s5-f7', text: 'Study uncertainty propagation between messengers.' },
          { id: 'p2-s5-f8', text: 'Understand localisation regions.' },
          { id: 'p2-s5-f9', text: 'Study electromagnetic follow-up observations.' },
          { id: 'p2-s5-f10', text: 'Understand observational selection effects.' },
          { id: 'p2-s5-f11', text: 'Study how different messengers constrain source properties.' },
          { id: 'p2-s5-f12', text: 'Learn how to interpret multi-instrument observations.' },
        ],
      },
      {
        id: 'p2-s5-g',
        heading: 'G. Computational multimessenger astronomy',
        items: [
          { id: 'p2-s5-g1', text: 'Learn to work with time-domain astronomical data.' },
          { id: 'p2-s5-g2', text: 'Understand time-series analysis.' },
          { id: 'p2-s5-g3', text: 'Learn to analyse event lists.' },
          { id: 'p2-s5-g4', text: 'Understand sky-coordinate matching.' },
          { id: 'p2-s5-g5', text: 'Study probability maps on the celestial sphere.' },
          { id: 'p2-s5-g6', text: 'Learn how to compare localisation regions.' },
          { id: 'p2-s5-g7', text: 'Study cross-matching astronomical catalogues.' },
          { id: 'p2-s5-g8', text: 'Understand time-window selection.' },
          { id: 'p2-s5-g9', text: 'Learn basic Bayesian source association.' },
          { id: 'p2-s5-g10', text: 'Study likelihood-based event association.' },
          { id: 'p2-s5-g11', text: 'Learn to visualise multi-instrument observations.' },
          { id: 'p2-s5-g12', text: 'Explore public gravitational-wave and neutrino datasets.' },
          { id: 'p2-s5-g13', text: 'Understand astronomical alert systems.' },
          { id: 'p2-s5-g14', text: 'Learn to document and reproduce event-analysis results.' },
        ],
      },
      {
        id: 'p2-s5-i',
        heading: 'I. Research-level topics',
        items: [
          { id: 'p2-s5-i1', text: 'Study GW170817 and its electromagnetic counterparts.' },
          { id: 'p2-s5-i2', text: 'Understand the connection between gravitational waves and kilonovae.' },
          { id: 'p2-s5-i3', text: 'Study the role of multimessenger observations in constraining the Hubble constant.' },
          { id: 'p2-s5-i4', text: 'Understand joint constraints on neutron-star matter.' },
          { id: 'p2-s5-i5', text: 'Study the connection between high-energy neutrinos and blazars.' },
          { id: 'p2-s5-i6', text: 'Investigate the relationship between cosmic rays and neutrino production.' },
          { id: 'p2-s5-i7', text: 'Study multimessenger constraints on compact-object populations.' },
          { id: 'p2-s5-i8', text: 'Understand the use of multimessenger observations in testing fundamental physics.' },
        ],
      },
    ],
    practicalExercisesTitle: 'H. Practical exercises — Mini-projects — Multimessenger Astronomy',
    practicalExercises: [
      { id: 'p2-s5-ex1', text: 'Plot the electromagnetic spectrum and identify major observational facilities.' },
      { id: 'p2-s5-ex2', text: 'Analyse a sample gravitational-wave strain time series.' },
      { id: 'p2-s5-ex3', text: "Study a public gravitational-wave event's parameter-estimation results." },
      { id: 'p2-s5-ex4', text: 'Visualise a gravitational-wave sky-localisation map.' },
      { id: 'p2-s5-ex5', text: 'Examine a neutrino event dataset.' },
      { id: 'p2-s5-ex6', text: 'Study a published neutrino–blazar association.' },
      { id: 'p2-s5-ex7', text: "Compare a transient's observations at different wavelengths." },
      { id: 'p2-s5-ex8', text: 'Perform a simple temporal and spatial cross-match on synthetic events.' },
      { id: 'p2-s5-ex9', text: 'Prepare a multimessenger case study of a neutron-star merger.' },
    ],
    resources: [
      { label: 'LIGO scientific resources', url: 'https://www.ligo.org/?utm_source=chatgpt.com' },
      { label: 'IceCube Neutrino Observatory', url: 'https://www.icecube.wisc.edu/?utm_source=chatgpt.com' },
      { label: 'Pierre Auger Observatory', url: 'https://www.auger.org/?utm_source=chatgpt.com' },
      { label: 'Gravitational-wave event database (GraceDB)', url: 'https://gracedb.ligo.org/?utm_source=chatgpt.com' },
      { label: 'NASA HEASARC', url: 'https://heasarc.gsfc.nasa.gov/?utm_source=chatgpt.com' },
      {
        label: 'IUCAA educational resources',
        url: 'https://ace.iucaa.in/resources?utm_source=chatgpt.com',
        note: 'Look particularly at its Foundations of Gravitational Waves course and advanced multimessenger programme. (Astronomy Centre for Educators+1)',
      },
    ],
    finalCompetency:
      'You should be able to understand the physics of different messengers, interpret their observations and perform basic joint analysis of astronomical events.',
  },
];

export const PROJECT_2_ORDER_OF_EXECUTION = {
  intro: [
    'Although these are five separate lists, I would not complete one entirely before starting another.',
    'Some subjects provide the tools needed by the others.',
  ],
  stages: [
    {
      title: 'Stage 1 — Build the foundation',
      badge: 'Start first',
      steps: [
        { num: 1, text: 'Python and Scientific Computing' },
        { num: 2, text: 'Astronomy fundamentals' },
        { num: 3, text: 'Astropy fundamentals' },
        { num: 4, text: 'Mathematical Statistics' },
      ],
    },
    {
      title: 'Stage 2 — Develop theoretical knowledge',
      steps: [
        { num: 5, text: 'Cosmology fundamentals' },
        { num: 6, text: 'Astrostatistics' },
        { num: 7, text: 'Observational astronomy' },
        { num: 8, text: 'Gravitational-wave and neutrino fundamentals' },
      ],
    },
    {
      title: 'Stage 3 — Research specialisation',
      steps: [
        { num: 9, text: 'Computational cosmology' },
        { num: 10, text: 'Cosmic void physics and identification' },
        { num: 11, text: 'Advanced statistical inference' },
        { num: 12, text: 'Multimessenger data analysis' },
      ],
    },
    {
      title: 'Stage 4 — Independent research',
      steps: [
        { num: 13, text: 'Reproduce published results.' },
        { num: 14, text: 'Analyse public observational datasets.' },
        { num: 15, text: 'Develop independent research questions.' },
        { num: 16, text: 'Prepare research-quality computational projects.' },
      ],
    },
  ],
};

export const PROJECT_2_WEEKLY_SCHEDULE = {
  intro:
    'Since you previously mentioned being able to dedicate around six hours daily, I would use that as the initial planning assumption.',
  subIntro: 'Here is a possible daily distribution:',
  table: [
    { activity: 'Cosmology and theoretical physics', time: '1.5 hours' },
    { activity: 'Astronomy and Astropy', time: '1.5 hours' },
    { activity: 'Astrostatistics', time: '1 hour' },
    { activity: 'Voids / Multimessenger (alternate days)', time: '1 hour' },
    { activity: 'Coding practice and revision', time: '1 hour' },
    { activity: 'Total', time: '6 hours', isTotal: true },
  ],
  alternationIntro: 'I would alternate the two specialisations:',
  alternation: [
    'Monday, Wednesday, Friday: Cosmic Voids.',
    'Tuesday, Thursday, Saturday: Multimessenger Astronomy.',
    'Sunday: Revision, unfinished exercises and research-paper reading.',
  ],
  closingNote: 'This keeps the foundational subjects progressing while allowing specialisation.',
};

export const PROJECT_2_IMPORTANT_RULE = {
  intro: 'I want to establish the same AI-assisted learning system that we designed for Project 1.',
  ai1Intro: 'For every subject, AI 1 should act as your academic instructor and curriculum planner. It should give you:',
  ai1Items: [
    'The next topic to study.',
    'The exact lecture or video.',
    'The exact book chapter or paper.',
    'The mathematical derivations to understand.',
    'A coding exercise.',
    'A practical astronomical application.',
    'Questions to test your understanding.',
    'A completion criterion.',
  ],
  ai2Note: 'AI 2 should help implement the coding exercises, explain errors and organise the computational work.',
  boldRule: 'Do not let either model turn this into a collection of completed tutorials without actual understanding.',
  pillarsIntro: 'The ultimate objective is to become comfortable moving between three things:',
  pillars: [
    { label: 'Theory:', desc: 'Understanding why an astrophysical phenomenon occurs.' },
    { label: 'Computation:', desc: 'Being able to implement the relevant equations and methods.' },
    { label: 'Observation:', desc: 'Being able to test theoretical ideas against real astronomical data.' },
  ],
  closing: 'That combination is what will make these five learning tracks useful for your eventual PhD research.',
};
