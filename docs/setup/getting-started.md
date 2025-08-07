# Getting Started with the Experiment Template

This guide will help you set up and customize your JSPsych experiment with WAVE integration.

## Prerequisites

- Basic text editing skills
- **Node.js** (via nvm - see setup below)
- **WAVE backend access** with experiment schema defined

## Quick Setup

### 1. Environment Setup

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

### 2. Test the Experiment

- Open `http://localhost:8080/` in your browser
- Go through the entire experiment to understand the participant experience
- For production, add WAVE URL parameters (see [WAVE Integration](wave-integration.md))

### 3. Customize for Your Study

See the [Customization Guide](../customization/) for detailed instructions on:
- [Changing stimuli](../customization/stimuli.md)
- [Adjusting parameters](../customization/parameters.md)  
- [Modifying styling](../customization/styling.md)

## Available Commands

```bash
npm run dev        # Start development server on localhost:8080
npm run start      # Same as dev
npm run lint       # Check JavaScript code quality
npm run lint:fix   # Automatically fix linting issues
```

## File Structure

```
experiment-template/
├── index.html                 # Main experiment file
├── src/
│   ├── js/
│   │   ├── core/             # Core experiment logic
│   │   │   ├── params.js     # Configuration parameters
│   │   │   ├── timeline.js   # Main experiment flow
│   │   │   └── trial.js      # Single trial logic
│   │   ├── content/          # Text content
│   │   │   └── instructions.js
│   │   ├── utils/            # Utility functions
│   │   │   └── standard-functions.js
│   │   └── integrations/     # External integrations
│   │       └── wave-client.js
│   ├── css/
│   │   └── styles.css        # Experiment styling
│   └── assets/
│       └── stimuli/          # Image assets
├── docs/                     # Documentation
├── examples/                 # Example experiments
└── package.json             # Node.js dependencies
```

## Next Steps

1. **Set up WAVE integration**: Follow the [WAVE Integration Guide](wave-integration.md)
2. **Customize your experiment**: See the [Customization Guide](../customization/)
3. **Deploy**: Upload to your web hosting service and test the live version