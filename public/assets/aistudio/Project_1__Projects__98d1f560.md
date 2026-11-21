# **Project 1 — Cosmic Voids and CMB Temperature Cross-Correlation**

Research project

Computational cosmology

Execution roadmap

Our first project will investigate the relationship between **cosmic voids and temperature fluctuations in the Cosmic Microwave Background (CMB)**.

The central idea is to use a catalogue of cosmic voids and a CMB temperature map to investigate whether voids leave a detectable temperature signature in the CMB through the Integrated Sachs–Wolfe (ISW) effect.

We'll approach this as an actual research project, not simply a coding exercise.

## **1. Project definition**

[Map of nothing: Astronomers size up the vast void next door to the Milky Way](https://images.openai.com/static-rsc-4/bvbcHJGWCoE9V4TDaLl0FPIkwZmHbh3ZBvp2xqwv7yUtCHmB7uD3X7KErMq4Qm2b33w8-fRiNgO-zjQooBeVBSjX-uUngG4-c8DG6IPIaC_ppTgsjmyP52nqew9q6Mjiur1f5ni7P_KK86a8GJwPoTbdTKJIBSMV6xCDZ2Z_P2w?purpose=inline)

[newatlas.com](https://newatlas.com/local-void-galaxy-mapped/60706/?utm_source=chatgpt.com)

**Working research question**

Can we detect a statistically significant temperature signature around cosmic voids by stacking CMB temperature maps at their locations, and how does this signature depend on void properties?

### **Proposed scientific approach**

| Component | Proposed choice |
| :-: | :-: |
| Tracer | Cosmic void catalogue |
| CMB data | Planck 2018 PR3 |
| Initial CMB map | SMICA temperature map |
| Void catalogue | BOSS DR11 or DESIVAST |
| Main physical effect | Integrated Sachs–Wolfe effect |
| Main technique | Void-centred temperature stacking |
| Statistical analysis | Randomisations, bootstrap, covariance and significance |
| Theoretical comparison | ΛCDM predictions |

We will not commit blindly to every dataset. One of the first tasks will be to understand which catalogue and CMB map are scientifically compatible.

### **What should the finished project contain?**

By the end, we should have:

1. A scientifically motivated research question.

2. A literature review of voids, ISW and previous stacking measurements.

3. A reproducible Python analysis pipeline.

4. A validated void catalogue and CMB dataset.

5. Void-centred CMB temperature profiles.

6. Statistical significance and null-test results.

7. Robustness tests.

8. Comparison with theoretical expectations.

9. A research manuscript and documented code repository.

# **2. The two-AI working system**

This is an important part of the project. We will establish the working arrangement before writing substantial code.

AI 1 — Research Architect

# **High-complexity model**

Plans, reasons, evaluates and supervises

**Responsibilities**

- Break the research into scientific stages.

- Design the mathematical methodology.

- Decide which data and algorithms are required.

- Identify relevant papers and learning material.

- Review the code-writing model's output.

- Design validation and statistical tests.

- Decide when we are ready to proceed.

AI 2 — Implementation Engineer

# **Simpler, coding-focused model**

Implements the architect's instructions

**Responsibilities**

- Write Python scripts.

- Implement mathematical expressions.

- Process FITS files and catalogues.

- Generate plots and tables.

- Debug errors.

- Follow the specified folder structure.

- Report outputs and unresolved problems.

**You — Researcher and final decision-maker**

- Study the concepts recommended by AI 1.

- Understand the scientific reasoning.

- Run and inspect the code.

- Verify results against physical expectations.

- Approve each stage before moving forward.

### **The working cycle**

Every major task will follow this sequence:

1. Ask AI 1 to define the next scientific task.

2. Ask it to explain the physics and mathematics involved.

3. Request specific lectures, book chapters, review papers or documentation.

4. Study the recommended material.

5. Ask AI 1 to prepare an implementation specification.

6. Give that specification to AI 2.

7. Run the generated code.

8. Send the code, outputs and errors back to AI 1.

9. Validate the results.

10. Mark the task complete only after verification.

**Important rule:** AI 2 must not independently change the scientific methodology. If it discovers a problem, it should report it to AI 1 rather than silently changing the approach.

# **3. Master To-Do List**

The project is divided into 10 phases. Each phase has a completion condition. Do not jump ahead simply because the coding model can generate something quickly.

**Project progress tracker**

# **0%**

0 of 59 tasks completed

**Phase 00: Project organisation and AI setup**

2–3 days

Create the project folder and GitHub repository.

Set up the two AI models and define their roles.

Create the research log and decision log.

Ask AI 1 to prepare the project architecture.

Create a project roadmap with dependencies.

**Phase 01: Scientific foundation**

2 weeks

Study the cosmological large-scale structure.

Understand cosmic voids and their properties.

Study the CMB and its temperature anisotropies.

Understand gravitational redshift and the ISW effect.

Understand why voids can produce a temperature signal.

Study the ΛCDM background model.

**Phase 02: Literature review**

1–2 weeks

Find foundational ISW papers.

Read observational void–ISW cross-correlation papers.

Identify the methods used in previous stacking analyses.

Record datasets, masks, filters and statistical methods.

Identify the unresolved question for this project.

Prepare a literature comparison table.

**Phase 03: Computational preparation**

1–2 weeks

Set up Python and a dedicated environment.

Learn NumPy and SciPy functions required for the project.

Learn Astropy and FITS handling.

Learn HEALPix and healpy.

Understand spherical coordinates and angular distances.

Create a small test analysis using synthetic data.

**Phase 04: Dataset selection and acquisition**

1 week

Inspect candidate void catalogues.

Select a catalogue and understand its selection function.

Download the catalogue and documentation.

Inspect the Planck SMICA temperature map.

Obtain the associated mask and relevant auxiliary products.

Check coordinate systems, units, resolution and data coverage.

**Phase 05: Data preparation**

1–2 weeks

Read the void catalogue.

Validate sky coordinates and redshifts.

Inspect void radii and other properties.

Load the CMB map and mask.

Convert catalogue positions to HEALPix coordinates.

Check map units and angular conventions.

Create quality-control plots.

**Phase 06: Main stacking analysis**

2 weeks

Define void-centred angular coordinates.

Extract CMB temperature patches or radial profiles.

Implement stacking across all selected voids.

Calculate mean and median profiles.

Repeat for different void-size bins.

Visualise the stacked temperature signal.

**Phase 07: Statistical validation**

2–3 weeks

Construct random-position catalogues.

Perform null tests.

Calculate uncertainties and covariance.

Estimate statistical significance.

Check sensitivity to masks and outliers.

Investigate possible systematic effects.

**Phase 08: Physical interpretation**

1–2 weeks

Compare the observed signal with ISW expectations.

Investigate the dependence on void size and redshift.

Evaluate the role of void selection and compensation.

Compare with previous observational studies.

Discuss limitations and alternative explanations.

**Phase 09: Research paper and release**

2–3 weeks

Prepare final figures and tables.

Write methodology and theoretical background.

Write results and discussion.

Document the complete computational pipeline.

Verify reproducibility from raw inputs to final plots.

Prepare the manuscript and project repository.

Reset checklist

*The durations are initial planning estimates, not deadlines. Some phases may overlap, but their scientific dependencies should be respected.*

# **4. Detailed execution instructions**

The master checklist tells us what to do. This section tells us how to do it.

## **Phase 00 — Project organisation and AI setup**

Start here

### **A. Create the project workspace**

- Create a folder named `Void_CMB_Correlation`.

- Create the following subfolders:

```
Void_CMB_Correlation/

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

    └── Final/
```

- Initialise a Git repository.

- Create a `.gitignore` file.

- Keep large raw datasets outside normal Git commits.

- Create a `README.md` describing the research objective.

- Create a `requirements.txt` or equivalent environment specification.

- Record Python and package versions.

### **B. Configure AI 1**

- Explain the complete project objective.

- Give it the responsibility of scientific supervision.

- Tell it that you are learning while developing the project.

- Require explanations before unfamiliar mathematical or computational steps.

- Require references for scientific claims.

- Require it to distinguish established results from its own suggestions.

- Ask it to maintain a list of pending decisions.

- Ask it to divide the project into small, independently verifiable milestones.

### **C. Configure AI 2**

- Explain that it is an implementation assistant.

- Give it the folder structure.

- Tell it to follow AI 1's specifications.

- Require comments and docstrings in the code.

- Require input/output descriptions for every major function.

- Require small test scripts.

- Tell it not to fabricate datasets or numerical results.

- Require a summary of changed files after every coding task.

### **D. Establish the communication protocol**

Create a document named `AI_Workflow_Protocol.md`.

Every coding assignment should contain:

1. Task identification.

2. Scientific purpose.

3. Mathematical background.

4. Input data and expected format.

5. Required operations.

6. Expected outputs.

7. Validation requirements.

8. Files to create or modify.

9. Known limitations.

**Completion condition:** Both models have clear responsibilities, the workspace exists, and the first scientific roadmap has been produced.

## **Phase 01 — Scientific foundation**

This is where your learning begins.

Don't start by learning all of cosmology. Learn only what is required for the next scientific operation.

### **A. Learn large-scale structure**

- Understand the cosmic web.

- Study galaxy clusters, filaments, walls and voids.

- Understand how density fluctuations evolve.

- Study the matter density contrast:

\\\[ \\delta(\\mathbf\{x\})= \\frac\{\\rho(\\mathbf\{x\})-\\bar\{\\rho\}\}\{\\bar\{\\rho\}\} \\\]

- Understand underdense and overdense regions.

- Understand the relationship between density and gravitational potential.

**Expected outcome:** You should be able to explain what a cosmic void is and why it matters in cosmology.

### **B. Learn cosmic voids**

- Understand how voids are identified in galaxy surveys.

- Study watershed-based void identification.

- Understand void radius and effective radius.

- Understand void density profiles.

- Study compensated and uncompensated voids.

- Understand void merging and hierarchical structure.

- Learn how void catalogues depend on survey selection and tracer density.

Important mathematical concepts:

\\\[ R\_\{\\mathrm\{eff\}\}= \\left(\\frac\{3V\}\{4\\pi\}\\right)^\{1/3\} \\\]

where \\(V\\) is the effective void volume.

**Expected outcome:** You should be able to interpret the properties stored in a real void catalogue.

### **C. Learn the CMB**

- Understand the origin of the CMB.

- Study recombination and the surface of last scattering.

- Understand CMB temperature anisotropies.

- Learn how temperature maps are represented on the celestial sphere.

- Understand angular power spectra.

- Learn the difference between primordial and secondary anisotropies.

- Understand foreground contamination and instrumental effects.

**Expected outcome:** You should understand what information a Planck temperature map contains.

### **D. Learn the Integrated Sachs–Wolfe effect**

This is the central physical mechanism of our project.

- Study gravitational redshift.

- Understand the Sachs–Wolfe effect.

- Distinguish the ordinary Sachs–Wolfe and Integrated Sachs–Wolfe effects.

- Understand why evolving gravitational potentials matter.

- Study how cosmic expansion affects gravitational potentials.

- Understand how photons interact with evolving potentials.

- Understand why voids can produce a characteristic ISW temperature signal.

- Study the dependence of the effect on void size, density and redshift.

A useful starting expression is:

\\\[ \\frac\{\\Delta T\}\{T\} = \\frac\{2\}\{c^2\} \\int \\frac\{\\partial\\Phi\}\{\\partial t\}\\,dt \\\]

Here, \\(\\Phi\\) is the gravitational potential, with the precise sign convention depending on the convention used.

**Expected outcome:** You should be able to explain the physical origin of the expected temperature signature without relying on a coding model.

### **E. Learn the ΛCDM background**

- Understand the Friedmann equations.

- Study matter density and dark energy density.

- Understand the Hubble parameter \\(H(z)\\).

- Learn the evolution of density perturbations.

- Understand why gravitational potentials evolve in a dark-energy-dominated universe.

- Study the theoretical ISW contribution.

**Completion condition:** You can explain the chain:

Cosmic expansion → evolving gravitational potentials → photon energy change → CMB temperature anisotropy → possible void-centred signal.

## **Phase 02 — Literature review**

Don't collect 100 papers and start reading randomly. Build the literature review around the scientific question.

### **A. Find foundational papers**

- Find the original theoretical literature on the Sachs–Wolfe effect.

- Find foundational papers on the ISW effect.

- Find theoretical papers on the ISW signal from voids.

- Find papers on cosmic void identification.

- Find papers on void density profiles.

### **B. Study observational work**

- Find studies that cross-correlate galaxy distributions with CMB temperature.

- Find studies that stack CMB maps around cosmic voids.

- Identify studies using Planck data.

- Identify studies using BOSS or other spectroscopic void catalogues.

- Find studies that report detections or non-detections.

- Investigate disagreements between different observational results.

### **C. Prepare a literature matrix**

Create an Excel sheet with these columns:

| Column | Information |
| :-: | :-: |
| Paper | Title and authors |
| Year | Publication year |
| Objective | What was investigated |
| Catalogue | Void or galaxy dataset |
| CMB data | Experiment and map |
| Method | Stacking/cross-correlation |
| Statistics | Significance and uncertainty |
| Main finding | Result |
| Limitation | What remains unresolved |
| Relevance | How it helps our project |

### **D. Ask AI 1 to identify the research gap**

- Give AI 1 the papers you have collected.

- Ask it to compare their methodologies.

- Ask it to identify disagreements.

- Ask it to distinguish methodological limitations from physical disagreements.

- Ask it to suggest a research question that can realistically be addressed with available data.

- Verify its claims against the actual papers.

**Completion condition:** You have a literature matrix and a defensible research question.

## **Phase 03 — Computational preparation**

We will use Python, but we should not learn every Python library available.

### **A. Python fundamentals**

- Learn arrays and array indexing using NumPy.

- Learn mathematical operations on arrays.

- Learn file handling.

- Learn functions and modules.

- Learn plotting using Matplotlib.

- Learn basic data manipulation using Pandas.

- Understand exceptions and debugging.

### **B. Scientific Python**

- Learn SciPy functions relevant to interpolation and statistics.

- Learn Astropy units.

- Learn Astropy coordinates.

- Learn Astropy tables.

- Learn FITS file handling.

- Learn healpy.

- Understand HEALPix pixelisation.

- Understand `nside`, `npix` and `pix2ang`.

- Understand map resolution and pixel area.

### **C. Make small independent exercises**

- Load a sample FITS file.

- Display a HEALPix map.

- Convert a right ascension and declination into a HEALPix pixel.

- Calculate angular separation between two sky positions.

- Plot a radial temperature profile from a synthetic map.

- Calculate a mean and standard deviation.

- Generate random points on a sphere.

**Completion condition:** You can independently understand the basic operations that the analysis pipeline will perform.

## **Phase 04 — Dataset selection and acquisition**

[Best Map Ever of the Universe | NASA Jet Propulsion Laboratory (JPL)](https://images.openai.com/static-rsc-4/GT400vAoZnrT7Q6G6IxdWbnBiF0ZQRMuLAeQhNresXEhurbIJSzwS35dmdOpAPtirmcE5THa0qFyBU88MfgOHeq_7kwqxRyCd3dRomBXMuSN12QL6K0bwI_I3QVZJ0qgBfVHat-aS-eHBaAIweRqrs6Ftm3nQ7iZhXqyNHq8t-M?purpose=inline)

**CMB data: Planck 2018 PR3**

Initial candidate: SMICA temperature map, along with its associated mask and necessary metadata.

[Plotting and data visualisation - ASTR 480](https://images.openai.com/static-rsc-4/H_lAcKwZ5hv_0TPhGkNEKyjMvEFufavJx7kU10eGccsgJEf7Po46_LSzsJb3uSgiQYMs_oUQAIRUIn-nbataow_0B3Sc0x1FFqVzyinQ3fmprDy4c49kill8LpsH_GVBbZ0qLrCcZ7fNaUd-mFgQMHyq30ee9PExPMyBfxllNLI?purpose=inline)

**Void data: BOSS DR11 or DESIVAST**

Initial candidates for a spectroscopic void catalogue.

### **A. Inspect void catalogues**

- Locate the original catalogue publication.

- Read its data documentation.

- Identify the survey footprint.

- Identify the redshift range.

- Identify the void-finding algorithm.

- Identify the void centre definition.

- Identify the effective radius.

- Understand how the catalogue handles survey boundaries.

- Check whether the catalogue includes additional void properties.

### **B. Inspect Planck data**

- Locate the official Planck Legacy Archive.

- Find the relevant SMICA temperature product.

- Identify its units.

- Identify its HEALPix resolution.

- Locate the corresponding confidence or analysis mask.

- Understand the mask convention.

- Identify any necessary beam or transfer-function information.

- Read the product documentation.

### **C. Check compatibility**

- Compare the void catalogue's sky coverage with the CMB mask.

- Check coordinate conventions.

- Check redshift and angular-diameter-distance conventions.

- Determine how masked pixels will be handled.

- Decide which voids are eligible for the analysis.

- Record all selection cuts and their scientific justification.

**Completion condition:** The dataset choices are documented, downloaded and independently understood.

## **Phase 05 — Data preparation**

Now we start working with the actual observational data.

### **A. Void catalogue**

- Load the catalogue using Astropy or Pandas.

- Print the first few rows.

- Inspect all available column names.

- Identify right ascension (RA).

- Identify declination (Dec).

- Identify redshift.

- Identify effective radius.

- Identify any density or compensation parameters.

- Check for missing values.

- Check for duplicate entries.

- Plot the distribution of void redshifts.

- Plot the distribution of void radii.

- Plot the angular distribution of void centres.

- Record the number of voids before and after quality cuts.

### **B. CMB map**

- Load the FITS map.

- Inspect its metadata and headers.

- Determine the map's coordinate convention.

- Display the full-sky map.

- Load the corresponding mask.

- Display the mask.

- Check the fraction of usable sky.

- Check for invalid or masked pixels.

- Understand whether temperature values need unit conversion.

- Record the map resolution and other relevant metadata.

### **C. Coordinate conversion**

- Understand the relationship between RA, Dec and spherical coordinates.

- Convert void centres into the coordinate system used by the CMB map.

- Convert positions into HEALPix pixel indices.

- Test conversions using a few known positions.

- Calculate angular separation between void centres.

- Verify that the converted coordinates point to the correct sky locations.

### **D. Quality-control plots**

Generate the following:

1. Void positions on the celestial sphere.

2. Void redshift histogram.

3. Void effective-radius histogram.

4. CMB temperature map with void centres overlaid.

5. Survey footprint and CMB mask comparison.

**Completion condition:** You have a clean, documented void catalogue and a properly loaded CMB map.

## **Phase 06 — Main stacking analysis**

Core computational milestone

This is where the central analysis happens.

### **A. Understand the stacking technique**

Before implementation:

- Understand what a void-centred temperature patch means.

- Understand angular coordinates around a void centre.

- Understand radial binning.

- Understand why individual void signals are weak.

- Understand why stacking can improve signal-to-noise.

- Study mean versus median stacking.

- Understand how masked pixels affect the stacking process.

### **B. Implement the first stacking routine**

- Select one void from the catalogue.

- Identify its centre on the CMB map.

- Define an angular region around the centre.

- Extract the corresponding CMB pixels.

- Convert their positions into angular separation from the void centre.

- Divide the region into radial bins.

- Calculate the mean temperature in each bin.

- Plot the resulting radial profile.

- Repeat for a few individual voids.

At this point, do not worry about the final scientific result. First verify that the geometry and extraction are correct.

### **C. Implement stacking across the catalogue**

- Define the selection criteria for the void sample.

- Extract the temperature patches for all selected voids.

- Apply the appropriate mask to each patch.

- Calculate the average temperature in each radial bin.

- Track the number of valid pixels contributing to each bin.

- Track the number of voids contributing to each bin.

- Calculate the stacked temperature profile.

- Save the profile as a machine-readable file.

- Plot the result with appropriate units.

### **D. Investigate different void populations**

- Divide voids into effective-radius bins.

- Divide voids into redshift bins.

- Repeat the stacking analysis for each bin.

- Compare the resulting temperature profiles.

- Investigate whether the signal changes with void properties.

- Check whether individual bins contain sufficient voids.

### **E. Alternative stacking choices**

- Implement mean stacking.

- Implement median stacking.

- Investigate normalised versus physical angular radius.

- Compare different radial bin widths.

- Investigate the effect of temperature-map smoothing.

- Document why the final method is selected.

**Completion condition:** A working stacking pipeline produces reproducible radial temperature profiles.

## **Phase 07 — Statistical validation**

A temperature profile alone is not evidence of an ISW detection. We need to establish whether the measured profile is statistically meaningful.

### **A. Random-position tests**

- Generate random sky positions.

- Respect the relevant survey footprint and usable CMB mask.

- Match the random samples to the relevant void sample's selection characteristics.

- Perform stacking around the random positions.

- Repeat the process many times.

- Compare the real void-centred profile with the random profiles.

- Save the distribution of random-stack measurements.

### **B. Other null tests**

- Test random catalogues with matched redshift and size distributions.

- Test shuffled void properties.

- Investigate rotated or displaced positions where geometrically appropriate.

- Check whether an apparent signal persists when the physical void-centre association is removed.

- Compare the real result with each null-test distribution.

### **C. Uncertainty estimation**

- Understand bootstrap resampling.

- Decide whether void-level or spatial-block resampling is appropriate.

- Implement bootstrap resampling.

- Estimate uncertainties in radial bins.

- Investigate correlations between radial bins.

- Construct a covariance matrix.

- Check whether the covariance estimate is stable.

- Document the number of resamples and the estimation method.

### **D. Statistical significance**

- Define the null hypothesis.

- Define the statistic used to compare the measured and null profiles.

- Calculate the significance using an appropriate covariance treatment.

- Investigate the impact of finite sample size.

- Account for the effect of trying multiple binning or selection choices.

- Avoid interpreting a single low p-value as definitive evidence.

### **E. Systematic checks**

- Test different reasonable mask choices.

- Investigate outlier sensitivity.

- Check dependence on void selection cuts.

- Investigate foreground contamination.

- Check sensitivity to map resolution and smoothing.

- Check sensitivity to the chosen temperature statistic.

- Investigate potential survey selection effects.

**Completion condition:** You can explain whether the measured signal is statistically distinguishable from the null expectation, and how robust that conclusion is.

## **Phase 08 — Physical interpretation and theoretical comparison**

Now we move from computational results to cosmological interpretation.

### **A. Understand the observed profile**

- Identify the central temperature feature.

- Identify the radial extent of any signal.

- Investigate whether the profile has a central cold region and surrounding structure.

- Compare the profile across void-size bins.

- Compare the profile across redshift bins.

- Investigate the role of compensation.

- Check whether the observed profile is consistent across analysis choices.

### **B. Theoretical expectations**

- Study theoretical ISW predictions for spherical voids.

- Understand the relationship between density profiles and gravitational potentials.

- Understand how potential evolution affects the expected temperature signal.

- Study the expected dependence on void radius and redshift.

- Identify the assumptions behind simplified theoretical models.

- Ask AI 1 to help formulate a theoretical prediction that is appropriate for the selected catalogue.

### **C. Compare observation and theory**

- Obtain or calculate the theoretical temperature profile.

- Ensure the theoretical and observational profiles use comparable definitions.

- Compare their radial shapes.

- Compare amplitudes and uncertainties.

- Investigate discrepancies.

- Identify whether discrepancies could arise from void selection, projection effects or observational systematics.

- State what the data actually support.

### **D. Compare with previous literature**

- Prepare a table of your measured results and published results.

- Compare sample sizes.

- Compare void definitions.

- Compare CMB datasets.

- Compare stacking methods.

- Compare statistical significance.

- Explain differences in methodology and findings.

**Completion condition:** You have a physically justified interpretation rather than merely a collection of plots.

## **Phase 09 — Manuscript and reproducibility**

### **A. Finalise the results**

- Select the final void sample.

- Freeze the analysis configuration.

- Run the final pipeline from beginning to end.

- Save all final plots.

- Save statistical tables.

- Save the covariance matrix.

- Record all software versions.

- Verify that the results can be reproduced.

### **B. Prepare the manuscript**

Suggested structure:

| Section | Main content |
| :-: | :-: |
| Abstract | Objective, methods and main findings |
| Introduction | Cosmic voids, CMB and ISW motivation |
| Theoretical Background | ISW physics and expected void signal |
| Data | Planck maps and void catalogue |
| Methodology | Stacking and statistical methods |
| Results | Temperature profiles and significance |
| Discussion | Physical interpretation and comparison |
| Conclusion | Findings and limitations |

### **C. Final quality checks**

- Verify every scientific statement against a source or calculation.

- Check all equations and units.

- Check figure labels and legends.

- Verify that uncertainties are correctly reported.

- Ensure negative results are reported honestly.

- Check references and citations.

- Document limitations.

- Have AI 1 conduct a scientific consistency review.

- Have AI 2 check code organisation and reproducibility.

- Review the complete manuscript yourself.

**Completion condition:** A reproducible computational project and a scientifically defensible manuscript are ready for supervisor review.

# **5. The study-along-the-way system**

This is perhaps the most important part of your approach.

I don't want you to end up with 500 lines of Python that you cannot explain. Every major coding milestone must have a corresponding learning milestone.

For this, create a document named `Learning_Queue.md`.

Whenever AI 1 assigns a new coding task, it must also create a learning assignment.

### **Required learning assignment format**

| Field | What AI 1 must provide |
| :-: | :-: |
| Concept | What you need to understand |
| Importance | Why this concept is required now |
| Mathematics | Equations and derivations to study |
| Lecture | Specific lecture and timestamp |
| Book | Specific chapter or section |
| Paper | Relevant research paper |
| Documentation | Specific library documentation |
| Practical exercise | A small exercise to test understanding |
| Completion test | Questions you must be able to answer |

### **Example: Learning assignment for HEALPix**

Suppose AI 1 asks AI 2 to extract CMB temperatures around void centres.

Your learning assignment should look something like this:

**Concept:** HEALPix pixelisation.

- Understand why spherical maps need a pixelisation scheme.

- Understand the meaning of `nside`.

- Derive the total number of HEALPix pixels:

\\\[ N\_\{\\mathrm\{pix\}\}=12N\_\{\\mathrm\{side\}\}^2 \\\]

- Study the difference between RING and NESTED ordering.

- Understand angular coordinates and pixel indices.

- Study `healpy.ang2pix`.

- Study `healpy.pix2ang`.

- Load a sample HEALPix map.

- Locate a known coordinate on that map.

- Verify that the pixel conversion works.

**Completion test:**

You should be able to explain how a position on the celestial sphere is mapped to a pixel and how the corresponding temperature value is retrieved.

Only then should the implementation milestone be marked complete.

# **6. Initial learning resources**

These are the starting resources for the project. AI 1 should refine the list as we reach individual milestones.

| Subject | Starting resource |
| :-: | :-: |
| Cosmology | David Tong / University of Cambridge cosmology lecture notes |
| Cosmology lectures | University of Sussex cosmology lectures by David Parkinson |
| CMB | Wayne Hu's CMB tutorials |
| ISW effect | Review papers on the Integrated Sachs–Wolfe effect |
| Cosmic voids | Reviews on cosmic voids and large-scale structure |
| Python | freeCodeCamp scientific Python tutorials |
| Numerical methods | SciPy documentation |
| Astronomy data | Astropy documentation |
| HEALPix | Official healpy documentation |
| Statistics | StatQuest and relevant statistical inference lectures |

Useful official resources:

- [healpy documentation](https://healpy.readthedocs.io/?utm_source=chatgpt.com)

- [Astropy documentation](https://docs.astropy.org/?utm_source=chatgpt.com)

- [Planck Legacy Archive](https://pla.esac.esa.int/?utm_source=chatgpt.com)

- [Sloan Digital Sky Survey](https://www.sdss.org/?utm_source=chatgpt.com)

- [NumPy documentation](https://numpy.org/doc/?utm_source=chatgpt.com)

- [SciPy documentation](https://docs.scipy.org/doc/scipy/?utm_source=chatgpt.com)

I would not ask you to complete all these courses before starting. We will use them as needed.

# **7. Project management and milestones**

Here is the proposed overall progression.

## **Suggested 16-week roadmap**

An initial planning target, subject to dataset availability and research complexity.

**Weeks 1–2**

Project setup and scientific foundations

**Weeks 3–4**

Literature review and research question

**Weeks 5–6**

Python, Astropy and HEALPix

**Week 7**

Dataset selection and acquisition

**Weeks 8–9**

Data preparation and quality checks

**Weeks 10–11**

Stacking implementation

**Weeks 12–13**

Statistical validation

**Week 14**

Theoretical interpretation

**Weeks 15–16**

Manuscript and reproducibility

### **Maintain these five documents throughout the project**

- `Master_Todo.md` — Overall project checklist.

- `Research_Log.md` — What you did and what you learned.

- `Learning_Queue.md` — Lectures, chapters and papers to study.

- `Decision_Log.md` — Scientific and computational decisions, including why they were made.

- `Experiment_Log.md` — Every analysis run, its configuration and results.

One additional rule: never overwrite an old result without retaining its configuration. We need to know exactly which choices produced each figure.

# **8. Your first immediate assignment**

We should not begin downloading datasets or writing Python yet.

Our first job is to get AI 1 to develop the detailed scientific architecture.

Here is the prompt I suggest giving your high-complexity model.

**Prompt 01 — Research architecture**

Start here

Copy this into your high-complexity AI model.

I am beginning a computational cosmology research project on the cross-correlation between cosmic voids and CMB temperature fluctuations, focusing on the Integrated Sachs–Wolfe effect.

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

Do not generate the entire codebase. First establish the scientific plan.

Copy prompt

# **9. How we will work together**

I suggest we maintain one important distinction:

**The master checklist is our overall roadmap. The active checklist is what you execute right now.**

We won't overwhelm ourselves by trying to complete all 100+ tasks simultaneously.

For every phase, we will have:

- A master task list.

- A detailed execution checklist.

- A learning assignment.

- An AI implementation assignment.

- A verification checklist.

- A completion report.

When you finish one phase, we will review it before opening the next one.

**Your first target is Phase 00, not the entire project.**

One final scientific point: we should not make a detection our success criterion. A robust non-detection can also be a valuable research result, provided the methodology and uncertainties are sound.

I will treat this as the master roadmap for Project 1 as we develop it further.

