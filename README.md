# JSPsych Experiment Template

A user-friendly template for creating online psychology experiments using JSPsych. This template is designed specifically for simple visual perception studies where participants respond to colored stimuli.

## What This Template Does

This experiment template:
- Presents colored circles (blue or orange) to participants
- Collects response times and accuracy data
- Handles participant consent and demographics
- Works with common research platforms (Prolific, MTurk, SONA)
- Automatically saves all data to WAVE backend system
- Falls back to local data display for testing

## Getting Started

### Prerequisites
- A computer with a web browser (Chrome, Firefox, Safari, or Edge)
- Basic text editing skills
- Your stimulus images (if different from the provided examples)
- **WAVE backend access** with experiment schema defined (see [WAVE Integration Guide](docs/wave-integration.md))

### Quick Start (5 minutes)

1. **Download the template**
   - Download all files to your computer
   - Keep all files in the same folder structure

2. **Set up Node.js environment**
   ```bash
   # Install nvm - follow instructions at:
   # https://github.com/nvm-sh/nvm
   
   # Install and use the project's specified Node.js version
   nvm use             # This reads .nvmrc and uses Node.js 20 LTS
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

3. **Test the basic experiment**
   - Open `http://localhost:8080/runexperiment.html` in your browser
   - Go through the entire experiment to see how it works
   - This helps you understand what participants will experience
   - **For production**: Add WAVE URL parameters (see [WAVE Integration Guide](docs/wave-integration.md))

4. **Customize for your study**
   - See the "Customization Guide" section below

### Available Commands

```bash
npm run dev        # Start development server on localhost:8080
npm run start      # Same as dev
npm run lint       # Check JavaScript code quality
npm run lint:fix   # Automatically fix linting issues
```

### Customization Guide

#### Changing Your Stimuli
1. **Add your images** to the `stimuli/stimuli_DESCRIPTION1_DATE1/` folder
2. **Update the stimulus folder name** in `params_template.js`:
   ```javascript
   var stimFolder = 'stimuli/your-new-folder-name/'
   ```
3. **Update the stimulus names** in `timelineFlow_template.js` around line 168:
   ```javascript
   var poss_circle_colors = ["your-stim1", "your-stim2"];
   ```

#### Changing Experiment Text
All text that participants see is in `instructions_template.js`:
- **Welcome message**: Edit `welcometext` (line 5)
- **Instructions**: Edit the `instrContent` array (line 48)
- **Consent form**: Edit `consentForm()` function (line 65)
- **Debrief questions**: Edit `debriefForm()` function (line 90)

#### Adjusting Timing
In `params_template.js`, you can change:
- `PRESTIM_DISP_TIME`: How long the prompt shows before stimulus (default: 800ms)
- `FIXATION_DISP_TIME`: How long the fixation cross shows (default: 500ms)
- Stimulus duration is set in the experiment design (line 169 in `timelineFlow_template.js`)

#### Setting Up for Your Platform
In `params_template.js`, change these settings:

**For Prolific:**
```javascript
var participantType = 'prolific';
var completionCode = 'YOUR_COMPLETION_CODE';
```

**For MTurk:**
```javascript
var participantType = 'mturk';
```

**For SONA:**
```javascript
var participantType = 'sona';
```

#### Changing Response Keys
In `runSingleTrial_template.js`:
1. Find line 55: `choices: ['f', 'j']`
2. Change to your preferred keys: `choices: ['a', 'l']`
3. Update the prompt text (line 49) to match your new keys
4. Update the correct response logic (lines 65-71)

### Testing Your Changes

After making changes:
1. **Save all files**
2. **Refresh** `runexperiment.html` in your browser
3. **Run through the entire experiment** to test your changes
4. **Check the browser console** (press F12) for any error messages

### Deploying Your Experiment

1. **Upload all files** to your web hosting service (ask your lab manager about this)
2. **Test the uploaded version** by visiting the URL
3. **Share the URL** with your research platform (Prolific, MTurk, etc.)

## File Structure Explained

Here's what each file does (you don't need to understand all of this, but it's helpful to know):

- `runexperiment.html` - The main file that participants open
- `params_template.js` - All the settings and timing parameters
- `instructions_template.js` - All text that participants see
- `timelineFlow_template.js` - The main experiment logic and flow
- `runSingleTrial_template.js` - What happens during each trial
- `standard_functions.js` - Helper functions (rarely needs changes)
- `wave-client-setup.js` - WAVE backend integration (automatic)
- `css/template.css` - Visual styling
- `stimuli/` - Folder for your images
- `docs/` - Documentation files

## Data Collection

This template uses the WAVE backend system for data collection. **Important**: You must set up your experiment schema in WAVE before collecting data.

📖 **See the [WAVE Integration Guide](docs/wave-integration.md) for complete setup instructions**

## Additional Documentation

- [WAVE Integration Guide](docs/wave-integration.md) - Complete setup and troubleshooting
- [WAVE Client Repository](https://github.com/WAVE-Lab-Williams/wave-client/) - Client for interfacing with API
- [WAVE Backend Repository](https://github.com/WAVE-Lab-Williams/wave-backend/) - Full API documentation