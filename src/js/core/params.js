/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'src/assets/stimuli/circles/'

var runIntro = true;
var runInstr = true;
var runExpt = true;
var runClose = true;
var runPreload = true;

/*
---------------------------------------------------------------
Tunable experiment hyperparameters (DEFAULTS)
---------------------------------------------------------------
A small set of experiment "knobs" with their DEFAULT values. These defaults are
used when running locally, or when an experiment has no backend config set. At
runtime the experiment pulls this experiment's `config` from the WAVE backend
(if available) and merges it OVER these defaults (see initExperiment() in
timeline.js) — so a researcher can change a knob by updating the experiment
record (via the setup notebook / API) instead of editing this file.

Kept deliberately small: start with the one knob you actually need to tune. To
expose another, add it here and read it from the resolved config in timeline.js.
*/
var EXPERIMENT_CONFIG_DEFAULTS = {
    // How many times the full factorial design repeats -> controls the number of
    // main experiment trials. (Previously hardcoded as factorial(factors, 1).)
    number_of_repetitions: 1,
};

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 800;
var FIXATION_DISP_TIME = 500;

// Variables for Participant Information
var estTotalRunTime = 5;
var estDollars = 0.9;
var participantType = 'prolific';
var completionCode = 'C4MF2IV1';
var prolific_url = 'https://app.prolific.co/submissions/complete?cc='+completionCode;

// WAVE Backend Configuration
var waveBackendUrl = 'https://wave-backend-production-8781.up.railway.app';
// var waveBackendUrl = 'http://localhost:8000';  // For local development

// initializing variables
var timelinebase = [];
var timelineintro = [];
var timelineinstr = [];
var timelineexpt = [];
var timelineclose = [];
var forPreload = [];
var full_check = false;
var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// setting display image width
var origWidth = 300;
var origHeight = 300;
var imgWidth = 150; // your desired display img width
var imgHeight = (imgWidth / origWidth) * origHeight;


