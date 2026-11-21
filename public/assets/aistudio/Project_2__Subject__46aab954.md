# **Project 2 — Astronomy, Astrostatistics, Cosmology & Multimessenger Astronomy**

Learning and skill-development project

Research preparation

The objective of this project is different from Project 1.

In Project 1, we are building a scientific investigation and learning whatever is required along the way.

In Project 2, we are building your **foundational knowledge and technical skill set** across five interconnected subjects. These subjects should eventually allow you to approach observational, theoretical and computational astrophysics research independently.

I suggest treating this as a structured curriculum rather than five unrelated courses.

## **1. The five learning tracks**

[NASA Prepares Roman Space Telescope for 2026 Launch to L2 Orbit](https://images.openai.com/static-rsc-4/fpzniyhTuYCS5Ce-Pm9Mi8fgL0EM4CazSx0BpEZ7nlp36_1wYiJ7ZEwcOBhQH-TLVd45N9TTictvVLLSQsZF8MsHZ9mieHCaksofA-F_0wZvwmr6x2vgN5xkSXMk-Jbc5HkpxrKtpaLbRC_VDIuEsIwEi2InEflVWrCAz_vCs_0?purpose=inline)

**01. Astronomy with Astropy**

Learn to handle, analyse and visualise astronomical observations using Python and Astropy.

[EDR - DESI Data](https://images.openai.com/static-rsc-4/L-cYBIGvkhcmaEl5vWdnWdrIFnY7QXZx8wC1wMIArHeOHOmKI2OzfdQP1exqS4fKkgZgxAH8TRrwicgjRg5aflyDbVlAl_hZkc262edPMgxVZeDUMmNFadSUpUCz064PND-6-F3DuzdhCNvPOmUmNsujqQKR-pQtf3cZcJuKbFs?purpose=inline)

**02. Astrostatistics**

Learn how to extract reliable scientific conclusions from astronomical data.

[Le « Vide local » proche de la Voie lactée cartographié en 3D](https://images.openai.com/static-rsc-4/KWmPA7B8yJvsDZZRccdzDRREkNYkX4bTSBRxeqVPHkDZE6cRZsiVDdJAc_C2jw6VzjLRwagsPKy455Ej15fUySX04DST1ooHtNFZ2sCCtQXmiH0itW9Gd26QcEv_Sj1Dc3io4t7abun0pz6prVESHpSKMZcAQdbZ3t9LP5j26ls?purpose=inline)

**03. Cosmology and Computational Cosmology**

Understand the universe theoretically and learn to calculate, simulate and analyse cosmological quantities.

[Galaxies in the great cosmic voids grow more slowly than the rest of the universe | Instituto de Astrofísica de Andalucía - CSIC](https://images.openai.com/static-rsc-4/Vvo3N4BDKXsk9erxqOYPGKFamCWghJ1HIhdKCOMmcm3c9JxtqDxYPKgzXkLIoSNBaunkUAt10grkgqivSB83Q-H_jFMjxL4os3-flM6ZtMPQOzUsyyx1buhcGYPgONjP8Vy4N5GrIq-YfF39nLzuerJGu0RBReXL-ZZUbGNAut4?purpose=inline)

**04. Cosmic Voids**

Study the identification, structure, evolution and observational properties of cosmic voids.

[Artist’s Illustration of Multi-Messenger Event | NOIRLab](https://images.openai.com/static-rsc-4/11v0kYdYMalNnnG2qHnK-PJQMJW_ocbGU2h5HbnnJWbknoq-XIaCO7CPqKbWi6v7USU-fsVBNr4va5LnthFVsV66_OKBeBfq9RXi6ozQYcf8QcopBJYVZTJBmfPwljk3unDPXKGnSAI8fyFnqVo6Ou4Rg2t-tWwU4vELDyvACuE?purpose=inline)

**05. Multimessenger Astronomy**

Understand how gravitational waves, electromagnetic radiation, neutrinos and cosmic rays reveal astrophysical phenomena.

## **2. How the subjects connect**

The learning tracks should reinforce one another.

**Python and Scientific Computing**

Common computational foundation

**Astronomy + Astropy**

**Astrostatistics**

**Cosmology**

**Multimessenger Astronomy**

**Research specialisation: Cosmic Voids**

Apply the theoretical, observational and statistical tools together.

I would not study these five subjects in isolation. For example, while studying Astropy, you can learn how to process a FITS file. While studying Astrostatistics, you can learn how to analyse the uncertainties in that same dataset.

# **3. Detailed To-Do lists**

Each subject below has its own independent checklist. The tasks are ordered from fundamentals to research-level applications.

## **Subject 01 — Astronomy using Astropy**

Observational astronomy + Python

**Objective:** Become comfortable working with real astronomical observations, catalogues, images and spectra using Python.

This is not just learning the Astropy library. You need to understand the astronomical data that the library handles.

### **A. Astronomy fundamentals**

- Revise the celestial sphere.

- Study right ascension and declination.

- Understand equatorial, galactic and ecliptic coordinate systems.

- Study angular separation.

- Understand apparent and absolute magnitude.

- Study luminosity and flux.

- Understand distance modulus.

- Study astronomical redshift.

- Understand parallax and proper motion.

- Study stellar spectra and spectral classification.

- Understand emission and absorption lines.

- Study blackbody radiation and Planck's law.

- Understand interstellar extinction and reddening.

### **B. Python for astronomy**

- Revise Python functions, loops and classes.

- Learn NumPy arrays and broadcasting.

- Learn Pandas for catalogue manipulation.

- Learn Matplotlib for astronomical plots.

- Learn SciPy for interpolation, integration and curve fitting.

- Learn how to organise scientific scripts into modules.

- Learn how to work with Jupyter notebooks.

### **C. Astropy core packages**

Work through these packages in the following order.

| Package | To-do list |
| :-: | :-: |
| `astropy.units` | \[ \] Learn physical units. \[ \] Convert units. \[ \] Work with quantities. \[ \] Perform unit-aware calculations. |
| `astropy.constants` | \[ \] Learn astronomical constants. \[ \] Use constants in physical calculations. |
| `astropy.coordinates` | \[ \] Learn SkyCoord. \[ \] Transform coordinate frames. \[ \] Calculate angular separations. \[ \] Cross-match catalogues. |
| `astropy.time` | \[ \] Understand astronomical time formats. \[ \] Learn UTC, TAI and Julian dates. \[ \] Convert between time systems. |
| `astropy.io.fits` | \[ \] Read FITS files. \[ \] Inspect HDUs. \[ \] Extract image arrays. \[ \] Read and modify headers. \[ \] Write FITS files. |
| `astropy.wcs` | \[ \] Understand World Coordinate Systems. \[ \] Convert pixel coordinates to sky coordinates. \[ \] Convert sky coordinates to pixels. \[ \] Make WCS-aware plots. |
| `astropy.table` | \[ \] Read astronomical catalogues. \[ \] Filter rows. \[ \] Join tables. \[ \] Handle missing values. |
| `astropy.modeling` | \[ \] Understand models and parameters. \[ \] Fit Gaussian profiles. \[ \] Perform model fitting. \[ \] Compare fitted models. |
| `astropy.cosmology` | \[ \] Define cosmological models. \[ \] Calculate distances. \[ \] Calculate lookback time. \[ \] Calculate age of the universe at redshift. |

### **D. Astronomical data analysis**

- Learn how astronomical images are stored.

- Understand pixels, image dimensions and pixel scale.

- Study image background estimation.

- Understand signal-to-noise ratio.

- Study basic aperture photometry.

- Learn source detection and centroiding.

- Understand point spread functions (PSF).

- Study image convolution.

- Learn basic image stacking.

- Study astronomical image visualisation.

### **E. Spectroscopy**

This is especially useful for working with observational datasets.

- Understand spectral flux density.

- Learn wavelength calibration.

- Study spectral extraction.

- Understand continuum subtraction.

- Learn Gaussian line fitting.

- Calculate line centres and widths.

- Understand Doppler shifts.

- Calculate redshift from spectral lines.

- Study equivalent width.

- Understand spectral resolution.

- Learn basic spectral-cube handling.

### **F. Astronomical archives and data retrieval**

- Learn how to use Astroquery.

- Query astronomical catalogues.

- Retrieve data from SIMBAD.

- Retrieve data from VizieR.

- Explore Gaia data.

- Explore MAST and JWST data products.

- Explore NASA HEASARC.

- Understand data provenance and metadata.

- Learn how to cite observational datasets.

### **Practical exercises**

**Mini-projects — Astronomy with Astropy**

- Download an astronomical image and display it using FITS.

- Overlay celestial coordinates on an astronomical image.

- Retrieve a star catalogue and make a colour-magnitude diagram.

- Cross-match two astronomical catalogues.

- Retrieve Gaia data and investigate stellar proper motions.

- Analyse a galaxy spectrum and fit its emission lines.

- Calculate cosmological distances for a sample of galaxies.

- Create a complete observational analysis notebook.

**Resources to follow**

1. [Learn Astropy — official tutorial collection](https://learn.astropy.org/?utm_source=chatgpt.com). This should be your primary resource. It includes FITS, spectroscopy, coordinates, modelling, catalogues and more. 

Learn Astropy+1

2. [FITS image tutorial](https://learn.astropy.org/tutorials/FITS-images.html?utm_source=chatgpt.com). 

FITS Images

3. [WCS and celestial coordinates](https://learn.astropy.org/tutorials/wcs-celestial-coordinates.html?utm_source=chatgpt.com). 

WCS Celestial Coordinates

4. [Astropy documentation](https://docs.astropy.org/?utm_source=chatgpt.com).

**Final competency:** You should be able to independently download an astronomical dataset, understand its structure, process it, perform basic analysis and produce publication-quality plots.

## **Subject 02 — Astrostatistics**

Statistics + scientific inference

**Objective:** Learn how to extract meaningful scientific information from noisy, incomplete and uncertain astronomical observations.

This subject is particularly important. A scientifically attractive graph does not necessarily represent a statistically significant discovery.

### **A. Mathematical foundations**

- Revise probability theory.

- Understand random variables.

- Study probability density functions.

- Study cumulative distribution functions.

- Understand expectation values.

- Understand variance and standard deviation.

- Study covariance and correlation.

- Understand conditional probability.

- Study Bayes' theorem.

- Understand joint and marginal distributions.

### **B. Probability distributions**

- Study Gaussian distributions.

- Study Poisson distributions.

- Study binomial distributions.

- Study exponential distributions.

- Understand chi-square distributions.

- Study Student's t-distribution.

- Understand log-normal distributions.

- Learn when each distribution is appropriate for astronomical measurements.

### **C. Descriptive statistics and data analysis**

- Calculate mean, median and mode.

- Understand standard deviation.

- Study standard error.

- Learn robust estimators.

- Study percentiles and quantiles.

- Understand outliers.

- Learn histogram construction.

- Study correlation coefficients.

- Understand selection bias.

- Understand observational uncertainties.

### **D. Frequentist statistics**

- Understand sampling distributions.

- Study the central limit theorem.

- Understand confidence intervals.

- Learn hypothesis testing.

- Study null and alternative hypotheses.

- Understand p-values.

- Study Type I and Type II errors.

- Learn statistical power.

- Study maximum likelihood estimation.

- Understand chi-square goodness-of-fit.

- Learn likelihood-ratio tests.

### **E. Bayesian statistics**

- Understand prior distributions.

- Understand likelihood functions.

- Study posterior distributions.

- Apply Bayes' theorem to parameter estimation.

- Understand informative and uninformative priors.

- Learn marginalisation.

- Study credible intervals.

- Understand Bayesian model comparison.

- Study Bayes factors.

- Understand Bayesian evidence.

### **F. Parameter estimation and model fitting**

- Understand linear regression.

- Study nonlinear regression.

- Learn least-squares fitting.

- Understand weighted least squares.

- Learn maximum likelihood fitting.

- Study parameter degeneracy.

- Understand error propagation.

- Learn covariance matrices.

- Study parameter correlations.

- Learn residual analysis.

### **G. Advanced statistical methods**

- Learn Monte Carlo integration.

- Study Markov Chain Monte Carlo (MCMC).

- Understand Metropolis-Hastings.

- Understand convergence diagnostics.

- Study bootstrap resampling.

- Study jackknife resampling.

- Understand permutation tests.

- Learn Monte Carlo hypothesis testing.

- Study principal component analysis (PCA).

- Understand clustering and classification.

- Learn model selection and information criteria.

- Study cross-validation.

### **H. Statistics specifically used in astronomy**

- Understand photon-counting statistics.

- Study Poisson noise.

- Understand detector noise.

- Learn background subtraction and uncertainty.

- Study censored and upper-limit measurements.

- Understand completeness and selection functions.

- Learn how astronomical surveys introduce biases.

- Study luminosity-function estimation.

- Understand correlation-function uncertainties.

- Study covariance estimation.

- Understand cosmic variance.

- Study significance estimation in cross-correlations.

- Understand multiple testing and look-elsewhere effects.

### **Practical exercises**

**Mini-projects — Astrostatistics**

- Fit a Gaussian to a noisy astronomical dataset.

- Estimate the parameters of a stellar luminosity distribution.

- Perform a linear regression on galaxy observations.

- Fit a model using maximum likelihood.

- Estimate uncertainties using bootstrap resampling.

- Implement a simple MCMC sampler.

- Compare two competing statistical models.

- Analyse a Poisson-distributed photon-count dataset.

- Estimate the significance of a synthetic astronomical signal.

**Resources to follow**

1. [IUCAA — Statistical Techniques in Astronomy](https://ace.iucaa.in/resources.html?id=13&view=category&utm_source=chatgpt.com). Make this your primary course. It includes frequentist statistics, Bayesian methods, MCMC, parameter estimation and model selection. 

Astronomy Centre for Educators+1

2. [StatQuest lectures](https://www.youtube.com/results?search_query=StatQuest+statistics+machine+learning&utm_source=chatgpt.com) — use for supplementary explanations.

3. [SciPy](https://scipy.org/?utm_source=chatgpt.com) — computational implementation.

**Final competency:** You should be able to estimate parameters, quantify uncertainties, test hypotheses and defend the statistical significance of an astronomical result.

## **Subject 03 — Cosmology and Computational Cosmology**

Theoretical physics + numerical computation

**Objective:** Understand the physical and mathematical framework of modern cosmology and learn to implement cosmological calculations using Python.

I suggest dividing this into theoretical cosmology and computational cosmology.

### **A. Foundations of cosmology**

- Understand the cosmological principle.

- Study homogeneity and isotropy.

- Understand the observable universe.

- Study the expansion of the universe.

- Understand cosmological redshift.

- Study Hubble's law.

- Understand different cosmological distance measures.

- Study the age and size of the universe.

- Understand the Friedmann–Lemaître–Robertson–Walker metric.

### **B. General relativity for cosmology**

- Revise special relativity.

- Understand spacetime and four-vectors.

- Study tensors and tensor notation.

- Understand the metric tensor.

- Study curvature of spacetime.

- Understand Christoffel symbols.

- Learn the basics of geodesics.

- Study the Einstein field equations.

- Understand the energy-momentum tensor.

- Derive the Friedmann equations from Einstein's equations.

### **C. Background cosmology**

- Understand the Hubble parameter \\(H(z)\\).

- Study matter density.

- Study radiation density.

- Understand dark energy.

- Study spatial curvature.

- Understand density parameters.

- Study the critical density.

- Understand the equation of state parameter.

- Study the cosmological constant.

- Understand the ΛCDM model.

### **D. Thermal history of the universe**

- Study the early universe.

- Understand primordial nucleosynthesis.

- Study recombination.

- Understand photon decoupling.

- Study the CMB.

- Understand matter-radiation equality.

- Study reionisation.

- Understand the role of neutrinos.

- Study inflation at an introductory level.

### **E. Structure formation**

- Understand primordial density perturbations.

- Study the matter density contrast.

- Understand linear perturbation theory.

- Study gravitational instability.

- Understand the growth factor.

- Study the growth rate of structure.

- Understand the matter power spectrum.

- Study the two-point correlation function.

- Understand baryon acoustic oscillations.

- Study dark matter halo formation.

- Understand nonlinear structure formation.

### **F. Observational cosmology**

- Study supernova distance measurements.

- Understand baryon acoustic oscillations.

- Study CMB temperature anisotropies.

- Understand CMB angular power spectra.

- Study weak gravitational lensing.

- Understand galaxy clustering.

- Study redshift-space distortions.

- Understand cosmological parameter estimation.

- Study observational constraints on ΛCDM.

### **G. Computational cosmology with Python**

- Learn numerical integration using SciPy.

- Implement the Friedmann equation.

- Calculate \\(H(z)\\).

- Calculate comoving distance.

- Calculate luminosity distance.

- Calculate angular diameter distance.

- Calculate lookback time.

- Calculate the age of the universe at different redshifts.

- Solve ordinary differential equations numerically.

- Implement the linear growth equation.

- Plot the growth factor against redshift.

- Calculate the matter power spectrum using a cosmology package.

- Study numerical interpolation.

- Understand numerical convergence and precision.

- Compare your calculations with published cosmological results.

### **H. Computational cosmology — advanced**

- Understand Fourier transforms.

- Study power-spectrum estimation.

- Understand window functions.

- Study transfer functions.

- Learn how initial conditions for simulations are generated.

- Understand N-body simulations conceptually.

- Study numerical gravitational dynamics.

- Understand particle-mesh methods.

- Explore Boltzmann solvers such as CLASS or CAMB.

- Learn how to read and interpret simulation outputs.

### **Practical exercises**

**Mini-projects — Computational Cosmology**

- Build a Python ΛCDM calculator.

- Plot the expansion history of the universe.

- Plot distance-redshift relations.

- Calculate the age of the universe at different redshifts.

- Numerically solve the linear growth equation.

- Plot the matter power spectrum.

- Compare two different cosmological parameter sets.

- Reproduce a published cosmological figure.

- Analyse a public cosmological simulation output.

**Resources to follow**

1. [University of Sussex Cosmology lectures — David Parkinson](https://cosmology.kasi.re.kr/parkinson/cosmology/index.php?utm_source=chatgpt.com). This is your primary lecture sequence. It covers the FRW metric, Friedmann equations, thermal history, perturbations, structure formation and CMB. 

cosmology.kasi.re.kr

2. [Eigenchris](https://www.eigenchris.com/?utm_source=chatgpt.com) — supplementary mathematical explanations, particularly general relativity.

3. [Astropy Cosmology](https://docs.astropy.org/en/stable/cosmology/index.html?utm_source=chatgpt.com) — computational implementation.

4. [CLASS cosmological Boltzmann code](https://class-code.net/?utm_source=chatgpt.com) — advanced computational work.

5. [CAMB documentation](https://camb.readthedocs.io/?utm_source=chatgpt.com) — cosmological calculations.

**Final competency:** You should be able to derive and numerically implement basic cosmological equations, interpret cosmological observables and work with computational cosmology tools.

## **Subject 04 — Cosmic Voids**

Specialisation: Large-scale structure

**Objective:** Develop a thorough understanding of cosmic voids, from their physical origin to their identification in galaxy surveys and their use in observational cosmology.

This is a specialisation subject. It will use knowledge from all three preceding tracks.

### **A. Large-scale structure**

- Study the cosmic web.

- Understand galaxy clusters, filaments, walls and voids.

- Study the matter density field.

- Understand underdense regions.

- Study gravitational instability.

- Understand the evolution of density perturbations.

- Study the formation of large-scale structures.

- Understand dark matter distribution in the cosmic web.

### **B. Void physics**

- Understand the physical definition of a cosmic void.

- Study void formation and evolution.

- Understand void expansion.

- Study void density profiles.

- Understand void compensation.

- Study the relationship between voids and surrounding walls.

- Understand void merging.

- Study void hierarchies.

- Understand void ellipticity and shape.

- Study void environments.

- Understand the relationship between voids and dark energy.

### **C. Void identification algorithms**

- Understand the difference between watershed and spherical void finders.

- Study the ZOBOV algorithm.

- Understand Voronoi tessellation.

- Study density estimation.

- Understand watershed segmentation.

- Study the VIDE framework.

- Understand the definition of void centres.

- Study effective void radius.

- Understand overlapping and nested voids.

- Study boundary effects.

- Understand how tracer density affects void identification.

### **D. Void catalogues and observational surveys**

- Understand galaxy redshift surveys.

- Study spectroscopic and photometric surveys.

- Understand survey selection functions.

- Study BOSS.

- Study SDSS.

- Explore DESI.

- Study DESIVAST.

- Understand the construction of void catalogues.

- Learn how to inspect catalogue properties.

- Understand redshift-space distortions in void catalogues.

- Study observational limitations.

### **E. Void statistics**

- Study void size functions.

- Understand void number density.

- Study void abundance.

- Understand void density profiles.

- Study void ellipticity distributions.

- Understand void-galaxy cross-correlation.

- Study void-void correlation.

- Understand void bias.

- Study void velocity profiles.

- Understand the relationship between voids and the matter power spectrum.

### **F. Voids as cosmological probes**

- Study the Integrated Sachs–Wolfe effect in voids.

- Understand void gravitational potentials.

- Study weak lensing around voids.

- Understand void-galaxy lensing cross-correlations.

- Study redshift-space distortions around voids.

- Understand Alcock–Paczynski tests using voids.

- Study void-based tests of dark energy.

- Understand how voids can constrain modified gravity.

- Study screening mechanisms in modified gravity.

- Understand the role of voids in testing gravity on large scales.

### **G. Computational void analysis**

- Learn how to process galaxy catalogues.

- Understand three-dimensional coordinate transformations.

- Convert redshifts into comoving distances.

- Construct three-dimensional galaxy distributions.

- Explore Voronoi tessellation computationally.

- Learn to use existing void-finding software.

- Visualise void catalogues.

- Calculate void effective radii.

- Calculate stacked density profiles.

- Calculate void size distributions.

- Perform void-centred stacking.

- Implement statistical uncertainty estimation.

- Compare observational and simulated void catalogues.

### **H. Research-level applications**

- Reproduce a published void density profile.

- Reproduce a published void size function.

- Reproduce a void-galaxy cross-correlation measurement.

- Study a published void–CMB stacking analysis.

- Compare different void-finding algorithms.

- Investigate how void definitions affect scientific results.

- Identify an observational or theoretical research question.

### **Practical exercises**

**Mini-projects — Cosmic Voids**

- Visualise a three-dimensional galaxy distribution.

- Identify underdense regions in a synthetic density field.

- Generate a simple spherical void model.

- Calculate a void density profile.

- Calculate a void size function from a sample catalogue.

- Compare two void catalogues.

- Reproduce a published void profile.

- Analyse void-centred CMB temperature profiles.

**Resources to follow**

- [SDSS/BOSS data and survey resources](https://www.sdss.org/?utm_source=chatgpt.com).

- [DESI survey resources](https://www.desi.lbl.gov/?utm_source=chatgpt.com).

- [VIDE void-finding software](https://github.com/seshnadathur/VIDE?utm_source=chatgpt.com) — investigate its documentation and underlying methodology.

- Review papers on cosmic voids, their identification, statistics and cosmological applications.

- Research papers on void–ISW cross-correlations.

**Final competency:** You should be able to understand a void catalogue, explain how it was constructed, analyse its properties and use voids as cosmological probes.

## **Subject 05 — Multimessenger Astronomy**

Observational astrophysics

**Objective:** Understand how different cosmic messengers carry complementary information about astrophysical sources, and learn how to analyse observations from multiple instruments.

This subject is particularly valuable because it connects theoretical physics, observational astronomy, numerical analysis and statistical inference.

### **A. Foundations of observational astronomy**

- Understand the electromagnetic spectrum.

- Study radio astronomy.

- Study infrared astronomy.

- Study optical astronomy.

- Study ultraviolet astronomy.

- Study X-ray astronomy.

- Study gamma-ray astronomy.

- Understand atmospheric and instrumental limitations.

- Study telescope sensitivity and angular resolution.

- Understand field of view.

- Study transient and time-domain astronomy.

### **B. Gravitational-wave astronomy**

- Understand gravitational waves.

- Study their generation from accelerating masses.

- Understand binary systems.

- Study compact objects.

- Understand neutron stars and black holes.

- Study binary inspiral, merger and ringdown.

- Understand strain.

- Study gravitational-wave detectors.

- Understand interferometric detection.

- Study matched filtering.

- Understand signal-to-noise ratio.

- Study parameter estimation.

- Understand sky localisation.

- Learn the basics of gravitational-wave event catalogues.

### **C. Neutrino astronomy**

- Understand neutrino properties.

- Study neutrino production mechanisms.

- Understand neutrino oscillations.

- Study astrophysical neutrino sources.

- Understand atmospheric and astrophysical neutrinos.

- Study neutrino detection principles.

- Understand Cherenkov detectors.

- Study IceCube.

- Understand neutrino event classification.

- Study neutrino energy reconstruction.

- Understand neutrino directional uncertainties.

### **D. Cosmic-ray astronomy**

- Understand cosmic rays.

- Study their energy spectrum.

- Understand primary and secondary cosmic rays.

- Study cosmic-ray propagation.

- Understand magnetic deflection.

- Study cosmic-ray acceleration mechanisms.

- Understand ultra-high-energy cosmic rays.

- Study air-shower detection.

- Understand the Pierre Auger Observatory.

- Study the relationship between cosmic rays and possible astrophysical sources.

### **E. Transient astrophysical sources**

- Study gamma-ray bursts.

- Understand short and long GRBs.

- Study neutron-star mergers.

- Understand kilonovae.

- Study supernovae.

- Understand tidal disruption events.

- Study active galactic nuclei.

- Understand blazars.

- Study fast radio bursts.

- Understand magnetars.

- Study compact-object populations.

- Understand the physical processes producing different messengers.

### **F. Multimessenger observations**

- Understand the difference between single-messenger and multimessenger observations.

- Study temporal coincidence.

- Understand spatial coincidence.

- Study source association.

- Understand false associations.

- Learn the concept of a joint likelihood.

- Study uncertainty propagation between messengers.

- Understand localisation regions.

- Study electromagnetic follow-up observations.

- Understand observational selection effects.

- Study how different messengers constrain source properties.

- Learn how to interpret multi-instrument observations.

### **G. Computational multimessenger astronomy**

- Learn to work with time-domain astronomical data.

- Understand time-series analysis.

- Learn to analyse event lists.

- Understand sky-coordinate matching.

- Study probability maps on the celestial sphere.

- Learn how to compare localisation regions.

- Study cross-matching astronomical catalogues.

- Understand time-window selection.

- Learn basic Bayesian source association.

- Study likelihood-based event association.

- Learn to visualise multi-instrument observations.

- Explore public gravitational-wave and neutrino datasets.

- Understand astronomical alert systems.

- Learn to document and reproduce event-analysis results.

### **H. Practical exercises**

**Mini-projects — Multimessenger Astronomy**

- Plot the electromagnetic spectrum and identify major observational facilities.

- Analyse a sample gravitational-wave strain time series.

- Study a public gravitational-wave event's parameter-estimation results.

- Visualise a gravitational-wave sky-localisation map.

- Examine a neutrino event dataset.

- Study a published neutrino–blazar association.

- Compare a transient's observations at different wavelengths.

- Perform a simple temporal and spatial cross-match on synthetic events.

- Prepare a multimessenger case study of a neutron-star merger.

### **I. Research-level topics**

- Study GW170817 and its electromagnetic counterparts.

- Understand the connection between gravitational waves and kilonovae.

- Study the role of multimessenger observations in constraining the Hubble constant.

- Understand joint constraints on neutron-star matter.

- Study the connection between high-energy neutrinos and blazars.

- Investigate the relationship between cosmic rays and neutrino production.

- Study multimessenger constraints on compact-object populations.

- Understand the use of multimessenger observations in testing fundamental physics.

**Resources to follow**

- [LIGO scientific resources](https://www.ligo.org/?utm_source=chatgpt.com).

- [IceCube Neutrino Observatory](https://www.icecube.wisc.edu/?utm_source=chatgpt.com).

- [Pierre Auger Observatory](https://www.auger.org/?utm_source=chatgpt.com).

- [Gravitational-wave event database (GraceDB)](https://gracedb.ligo.org/?utm_source=chatgpt.com).

- [NASA HEASARC](https://heasarc.gsfc.nasa.gov/?utm_source=chatgpt.com).

- [IUCAA educational resources](https://ace.iucaa.in/resources?utm_source=chatgpt.com) — look particularly at its Foundations of Gravitational Waves course and advanced multimessenger programme. 

- Astronomy Centre for Educators+1

**Final competency:** You should be able to understand the physics of different messengers, interpret their observations and perform basic joint analysis of astronomical events.

# **4. Recommended order of execution**

Although these are five separate lists, I would not complete one entirely before starting another.

Some subjects provide the tools needed by the others.

**Stage 1 — Build the foundation**

Start first

1. Python and Scientific Computing

2. Astronomy fundamentals

3. Astropy fundamentals

4. Mathematical Statistics

**Stage 2 — Develop theoretical knowledge**

5. Cosmology fundamentals

6. Astrostatistics

7. Observational astronomy

8. Gravitational-wave and neutrino fundamentals

**Stage 3 — Research specialisation**

9. Computational cosmology

10. Cosmic void physics and identification

11. Advanced statistical inference

12. Multimessenger data analysis

**Stage 4 — Independent research**

13. Reproduce published results.

14. Analyse public observational datasets.

15. Develop independent research questions.

16. Prepare research-quality computational projects.

# **5. Suggested weekly study arrangement**

Since you previously mentioned being able to dedicate around six hours daily, I would use that as the initial planning assumption. 

Here is a possible daily distribution:

| Activity | Daily time |
| :-: | :-: |
| Cosmology and theoretical physics | 1.5 hours |
| Astronomy and Astropy | 1.5 hours |
| Astrostatistics | 1 hour |
| Voids / Multimessenger (alternate days) | 1 hour |
| Coding practice and revision | 1 hour |
| **Total** | **6 hours** |

I would alternate the two specialisations:

- Monday, Wednesday, Friday: Cosmic Voids.

- Tuesday, Thursday, Saturday: Multimessenger Astronomy.

- Sunday: Revision, unfinished exercises and research-paper reading.

This keeps the foundational subjects progressing while allowing specialisation.

# **6. Master completion checklist**

Here is the short overview to track the five subjects independently.

**Learning progress**

# **0%**

0/39 major milestones completed

**01. Astronomy using Astropy**

0 / 7 completed

In progress

Astronomy fundamentals

Python for astronomy

Astropy core packages

Image analysis and photometry

Spectroscopy

Astronomical archives

Observational mini-project

**02. Astrostatistics**

0 / 8 completed

In progress

Probability and distributions

Descriptive statistics

Frequentist statistics

Bayesian statistics

Parameter estimation

Advanced statistical methods

Astronomical applications

Statistical mini-project

**03. Cosmology and computational cosmology**

0 / 8 completed

In progress

Cosmological foundations

General relativity

Background cosmology

Thermal history

Structure formation

Observational cosmology

Computational cosmology

Simulation and Boltzmann codes

**04. Cosmic Voids**

0 / 8 completed

In progress

Large-scale structure

Void physics

Void identification algorithms

Survey catalogues

Void statistics

Cosmological applications

Computational analysis

Research reproduction

**05. Multimessenger Astronomy**

0 / 8 completed

In progress

Observational astronomy

Gravitational waves

Neutrino astronomy

Cosmic rays

Transient sources

Multimessenger observations

Computational analysis

Research case study

Reset progress

# **7. One important rule for this entire project**

I want to establish the same AI-assisted learning system that we designed for Project 1.

For every subject, AI 1 should act as your academic instructor and curriculum planner. It should give you:

1. The next topic to study.

2. The exact lecture or video.

3. The exact book chapter or paper.

4. The mathematical derivations to understand.

5. A coding exercise.

6. A practical astronomical application.

7. Questions to test your understanding.

8. A completion criterion.

AI 2 should help implement the coding exercises, explain errors and organise the computational work.

**Do not let either model turn this into a collection of completed tutorials without actual understanding.**

The ultimate objective is to become comfortable moving between three things:

- **Theory:** Understanding why an astrophysical phenomenon occurs.

- **Computation:** Being able to implement the relevant equations and methods.

- **Observation:** Being able to test theoretical ideas against real astronomical data.

That combination is what will make these five learning tracks useful for your eventual PhD research.

