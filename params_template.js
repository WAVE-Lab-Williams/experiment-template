/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'stimuli/stimuli_DESCRIPTION1_DATE1/'

var runIntro = true;
var runInstr = true;
var runExpt = true;
var runClose = true;
var runPreload = true;

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 800;
var FIXATION_DISP_TIME = 500;

// Variables for Participant Information
var estTotalRunTime = 5;
var estDollars = 0.9;
var participantType = 'prolific';
var completionCode = 'C4MF2IV1';
var prolific_url = 'https://app.prolific.co/submissions/complete?cc='+completionCode;


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


