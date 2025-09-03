/*
===============================================================
Table of Contents (*TOC)
===============================================================
1. JSPsych Init, and onFinish (*sec_init)
2. Introduction Section (*sec_intro)
    2a. Push Intro Trials to timeline_intro (*push_intro)
3. Instruction Section + Demo Trials (*sec_instr)
    3a. Set Preload Images for Instr + Demo (*preload_instr)
    3b. Push Instr Trials to timeline_instr (*push_instr)
4. Experiment Section (*sec_expt)
    4a. Define Factors + Expt Design (*factors)
    4b. Set Preload Images for Experiment
    4c. Determine Expt Trials + logic (*exptTrials)
5. Closing Section (*sec_closing)
6. Run Expt (*sec_run)
    6a. Define Preload plugin
    6b. Combine all timelines


*/

/*
===============================================================
JSPsych Init, and onFinish (*sec_init)
===============================================================
*/

/* initialize jsPsych */
var jsPsych = initJsPsych({
    on_trial_finish: function(data) {
        // console.log(JSON.stringify(data));
        data.pNo = workerID;
        
        // Process data through WAVE client if available
        if (window.waveClient) {
            window.waveClient.processTrialData(data);
        }
    },
    on_finish: function() {
        // Handle experiment completion through WAVE client if available
        if (window.waveClient) {
            window.waveClient.handleCompletion();
        } else {
            jsPsych.data.displayData();
        }
    },
    on_interaction_data_update: function () {
        var interaction_data = jsPsych.data
            .getInteractionData()
            .last(1)
            .values()[0].event;
        if (interaction_data == 'fullscreenexit') {
            console.log('Fullscreen Exit detected');
            full_check = false;
        } else if (interaction_data == 'fullscreenenter') {
            console.log('Fullscreen problem now solved');
            full_check = true;
        }
    },
});

/*
===============================================================
Introduction Section (*sec_intro)
===============================================================
*/

var welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        return welcometext();
    },
    choices: ['Next'],
    data: {
        trial_category: 'welcome',
        screenWidth: String(w),
        screenHeight: String(h),
        clock: function () {
            var startTime = new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
            });
            console.log('Start Time' + startTime);
            return startTime;
        }, // clock ends
    }, // data ends
    on_finish: function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log("Uh oh, this is a mobile device");
        } else {
            console.log("Desktop device");
        }
    }, // on_finish ends
};

var consent = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['y'],
    stimulus: consentForm(participantType),
    prompt: '<h3>PRESS THE Y KEY TO CONSENT</h3><p></p><p></p>',
    data: { trial_category: 'consent' },
};

if (participantType == 'prolific') {
    var workerID = getURLParameter('PROLIFIC_PID');
    console.log(workerID);
} else {
    var workerID = 'no_query_worker'+ Math.floor(Math.random() * 90000) + 10000;
}

var id = {
    type: jsPsychSurveyHtmlForm,
    html: requestIDinput(participantType, workerID),
    button_label: ['Submit'],
    data: { trial_category: 'id_info' },
    on_finish: function (data) {
        var respObj = data.response;
        for (var key in respObj) {
            if (respObj[key] == workerID) {
                console.log(
                    'The manual type matches the query capture, going with query input.',
                );
            } else if (workerID.startsWith('no_query')) {
                console.log(
                    `The query was not successfully captured, or there was nothing to query, going with manual input. ${respObj[key]}`,
                );
                workerID = respObj[key];
            } else {
                console.log(
                    'The manual type differed from the query capture, going with query capture. Assuming the manual input was the wrong one, and that query was correct.',
                );
            }
        } /*end of for loop*/
    } /*end of on_finish*/,
}; /* end of id*/

/* ------- timeline intro push (*push_intro) -------------- */
timelineintro.push(welcome);
timelineintro.push(consent);
timelineintro.push(id);
timelineintro.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: fullscreenMessage,
    on_finish: function () {
        full_check = true;
    },
});

/*
===============================================================
INSTR PROCEDURE (*sec_instr)
===============================================================
*/

/* -------  Set Preload Images for Instr + Demo (*preload_instr) -------------- */

forPreload.push(`${stimFolder}demo-circles.png`);
// NOTE TO KIM: YOU NEED TO CREATE A MODIFIED INSTRUCTION PLUGIN THAT DELAYS ACTIVATION OF THE "NEXT" BUTTON, AND INSERT EXAMPLE DEMO TRIALS

/* -------  Push Instr + Demo Trials to timeline_instr (*push_instr) -------------- */
var instrContent = loadInstrContent();
var instructions = {
    type: jsPsychInstructions,
    pages: instrContent,
    show_clickable_nav: true,
    allow_keys: false,
};

timelineinstr.push(instructions);

/*
===============================================================
EXPERIMENT SECTION (*sec_expt)
===============================================================
*/

/* -------- defining factors && exptdesign (*factors) --------*/

var poss_circle_colors = ["blue","orange"];
var poss_disp_duration = [200, 500];

var factors = {
    circle_color: poss_circle_colors,
    disp_duration: poss_disp_duration
}

var full_design = jsPsych.randomization.factorial(factors, 1);
console.log(full_design);

/* -------  Set Preload Images for Expt (*preload_expt) -------------- */
for (var i = 0; i < poss_circle_colors.length; i++) {
    forPreload.push(`${stimFolder}${poss_circle_colors[i]}-circle.png`);
}

/* ------- timeline expt push (*pushExpt ) -------------- */
for (var elem = 0; elem < full_design.length; elem++) {
    runSingleTrial(
        full_design[elem].circle_color,
        full_design[elem].disp_duration,
        timelineexpt,
        'expt',
    );
}

/*
===============================================================
CLOSING SECTION (*sec_closing)
===============================================================
*/

var feedback_summary = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {

    var trials = jsPsych.data.get().filter({trial_category: 'answerexpt'});
    var correct_trials = trials.filter({thisAcc: 1});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
        <p>Your average response time was ${rt}ms.</p>
        <p>Press any key to continue to the next part of the study.</p>`;
    }
};

var debrief_qs = {
    type: jsPsychSurveyHtmlForm,
    html: debriefForm(),
    button_label: ['Submit'],
    data: {
        trial_category: 'debrief',
        endTime: function () {
            var endTime = new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
            });
            console.log('End Time' + endTime);
            return endTime;
        },
    } // data ends
}

var closing = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: closingText(participantType),
    choices: [' '],
    data: { trial_category: 'closing' }
};

timelineclose.push(feedback_summary);
timelineclose.push(debrief_qs);
timelineclose.push({ type: jsPsychFullscreen, fullscreen_mode: false });
timelineclose.push(closing);

/*
===============================================================
Run Expt (*sec_run)
===============================================================
*/

if (runPreload) {
    var preload = {
        type: jsPsychPreload,
        images: forPreload,
    }
    timelinebase = timelinebase.concat(preload);
}

if (runIntro) { timelinebase = timelinebase.concat(timelineintro) }
if (runInstr) { timelinebase = timelinebase.concat(timelineinstr) }
if (runExpt) { timelinebase = timelinebase.concat(timelineexpt) }
if (runClose) { timelinebase = timelinebase.concat(timelineclose) }

jsPsych.run(timelinebase);