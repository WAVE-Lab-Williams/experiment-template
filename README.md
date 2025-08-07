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

### Creating Your Experiment from This Template

1. **Use this template** - Click the green "Use this template" button at the top of this repository
2. **Create a new repository** - Choose "Create a new repository" 
3. **Name your experiment** - Give your repository a descriptive name
4. **Clone your new repository** to your computer
5. **Follow the setup steps below**

### Prerequisites
- A computer with a web browser (Chrome, Firefox, Safari, or Edge)
- Basic text editing skills (preferably in a coding IDE such as VSCode)
- Your stimulus images (if different from the provided examples)
- **WAVE backend access** with experiment schema defined (see [WAVE Integration Guide](docs/setup/wave-integration.md))

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
   - Open `http://localhost:8080/` in your browser
   - Go through the entire experiment to see how it works
   - This helps you understand what participants will experience
   - **For production**: Add WAVE URL parameters (see [WAVE Integration Guide](docs/setup/wave-integration.md))

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
1. **Add your images** to the `src/assets/stimuli/circles/` folder
2. **Update the stimulus folder name** in `src/js/core/params.js`:
   ```javascript
   var stimFolder = 'src/assets/stimuli/your-folder-name/'
   ```
3. **Update the stimulus names** in `src/js/core/timeline.js` around line 168:
   ```javascript
   var poss_circle_colors = ["your-stim1", "your-stim2"];
   ```

#### Changing Experiment Text
All text that participants see is in `src/js/content/instructions.js`:
- **Welcome message**: Edit `welcometext` (line 5)
- **Instructions**: Edit the `instrContent` array (line 48)
- **Consent form**: Edit `consentForm()` function (line 65)
- **Debrief questions**: Edit `debriefForm()` function (line 90)

#### Adjusting Timing
In `src/js/core/params.js`, you can change:
- `PRESTIM_DISP_TIME`: How long the prompt shows before stimulus (default: 800ms)
- `FIXATION_DISP_TIME`: How long the fixation cross shows (default: 500ms)
- Stimulus duration is set in the experiment design (line 169 in `src/js/core/timeline.js`)

#### Setting Up for Your Platform
In `src/js/core/params.js`, change these settings:

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
In `src/js/core/trial.js`:
1. Find line 55: `choices: ['f', 'j']`
2. Change to your preferred keys: `choices: ['a', 'l']`
3. Update the prompt text (line 49) to match your new keys
4. Update the correct response logic (lines 65-71)

### Testing Your Changes

After making changes:
1. **Save all files**
2. **Refresh** your browser at `http://localhost:8080/`
3. **Run through the entire experiment** to test your changes
4. **Check the browser console** (press F12) for any error messages

### Deploying Your Experiment

1. **Upload all files** to your web hosting service (ask your lab manager about this)
2. **Test the uploaded version** by visiting the URL
3. **Share the URL** with your research platform (Prolific, MTurk, etc.)

## File Structure Explained

```
experiment-template/
├── index.html                    # Main experiment file
├── src/
│   ├── js/
│   │   ├── core/                # Core experiment logic
│   │   │   ├── params.js        # Settings and timing parameters
│   │   │   ├── timeline.js      # Main experiment flow
│   │   │   └── trial.js         # Single trial logic
│   │   ├── content/             # Experiment text content
│   │   │   └── instructions.js  # All participant-facing text
│   │   ├── utils/               # Utility functions
│   │   │   └── standard-functions.js
│   │   └── integrations/        # External integrations  
│   │       └── wave-client.js   # WAVE backend integration
│   ├── css/
│   │   └── styles.css           # Visual styling
│   └── assets/
│       └── stimuli/             # Image assets
├── docs/                        # Documentation
└── package.json                 # Node.js dependencies
```

## Data Collection

This template uses the WAVE backend system for data collection. **Important**: You must set up your experiment schema in WAVE before collecting data.

📖 **See the [WAVE Integration Guide](docs/setup/wave-integration.md) for complete setup instructions**

## Additional Documentation

### Setup & Configuration
- [Getting Started Guide](docs/setup/getting-started.md) - Detailed setup instructions
- [WAVE Integration Guide](docs/setup/wave-integration.md) - Complete WAVE setup and troubleshooting

### Customization  
- [Customizing Stimuli](docs/customization/stimuli.md) - How to add and modify images
- [Adjusting Parameters](docs/customization/parameters.md) - Timing, design, and platform settings  
- [Basic Styling](docs/customization/styling.md) - Simple visual customizations

### Help
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

### External Resources
- [WAVE Client Repository](https://github.com/WAVE-Lab-Williams/wave-client/) - Full client documentation