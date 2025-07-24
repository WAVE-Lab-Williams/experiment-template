# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JSPsych experiment template for psychology/cognitive science research, specifically designed for simple visual perception studies. The experiment presents colored circles (blue/orange) to participants and collects response time and accuracy data.

## Architecture

The codebase follows a modular structure with separate files for different concerns:

- `runexperiment.html` - Main entry point that loads all dependencies and runs the experiment
- `timelineFlow_template.js` - Core experiment flow and JSPsych initialization 
- `params_template.js` - Configuration parameters and variables
- `instructions_template.js` - All text content (consent, instructions, debrief)
- `runSingleTrial_template.js` - Single trial logic and stimulus presentation
- `standard_functions.js` - Utility functions for randomization and URL parsing
- `css/template.css` - Styling
- `stimuli/` - Image assets organized by experiment variant

## Key Parameters

Core experiment parameters are defined in `params_template.js`:
- `stimFolder` - Path to stimulus images
- `PRESTIM_DISP_TIME` - Pre-stimulus display duration (800ms)
- `FIXATION_DISP_TIME` - Fixation cross duration (500ms)
- `participantType` - Platform type ('prolific', 'mturk', 'sona')
- `completionCode` - Participant completion code
- Display dimensions are calculated from original image size (300x300) scaled to desired width

## Experiment Flow

The experiment follows this sequence (controlled by boolean flags in params):
1. **Introduction** (`runIntro`): Welcome, consent, ID collection, fullscreen
2. **Instructions** (`runInstr`): Task explanation with example images
3. **Experiment** (`runExpt`): Main trials with factorial design
4. **Closing** (`runClose`): Performance feedback, debrief questions, completion

## Trial Structure

Each trial (defined in `runSingleTrial_template.js`) consists of:
1. Fullscreen check
2. Cursor hiding
3. Pre-stimulus display with response prompt
4. Fixation cross
5. Stimulus presentation (blue/orange circle)
6. Response collection ('f' for blue, 'j' for orange)
7. Cursor restoration

## Participant Management

The system supports multiple platforms:
- **Prolific**: Uses PROLIFIC_PID URL parameter
- **MTurk**: Generates completion codes from hitID
- **SONA**: Uses 5-digit portal ID

Worker IDs are captured via URL parameters when available, with manual input as fallback.

## Data Collection

JSPsych automatically logs:
- Response times and accuracy
- Trial parameters and stimulus information
- Participant demographics and debrief responses
- Fullscreen interaction tracking
- Screen dimensions and timestamps

## Testing/Development

To test the experiment:
1. Open `runexperiment.html` in a web browser
2. Use browser developer tools to monitor console output
3. Toggle experiment sections using boolean flags in `params_template.js`
4. Check stimulus loading by examining the `forPreload` array

The experiment uses CDN-hosted JSPsych (v7.3.4) so no local build process is required.