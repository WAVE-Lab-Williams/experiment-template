# WAVE Client Integration for Experiment Template

This JSPsych experiment template has been integrated with the WAVE client for automated data logging to the WAVE backend system.

## ⚠️ CRITICAL REQUIREMENTS

**Before running any experiments, you MUST:**

1. **Define your experiment schema in the WAVE backend first**
   - All data columns must be pre-defined
   - Get the experiment UUID from the backend
   - The backend will reject data that doesn't match the schema

2. **Include required URL parameters**
   - `key` - Your WAVE API key
   - `experiment_id` - The experiment UUID from WAVE backend
   - `participant_id` - Unique identifier for each participant

## Quick Start

### Step 1: Set up your experiment in WAVE backend
```bash
# Example: Create experiment with required columns
# This must be done through the WAVE backend interface
```

### Step 2: Run your experiment with proper URL
```
http://localhost:8080/?key=your_api_key&experiment_id=experiment_uuid&participant_id=P001
```

**Note**: You must use the development server (`npm run dev`) - the experiment cannot be opened directly as a file due to ES6 module imports.

### Step 3: Data is automatically logged
The template will automatically log experiment data to WAVE including:
- Trial responses and reaction times
- Stimulus information  
- Accuracy scores
- Timestamps and browser info

## Data Schema

The template automatically sends these fields to WAVE:
- `trial_number` - Sequential trial number
- `trial_type` - Type of trial (e.g., 'answerexpt')
- `stimulus` - Stimulus file path
- `response` - Participant's key response ('f' or 'j')
- `response_time` - Reaction time in seconds
- `accuracy` - Boolean: true if correct
- `correct_response` - Expected correct response
- `stimulus_duration` - Duration stimulus was displayed (ms)
- `timestamp` - ISO timestamp
- `user_agent` - Browser information

## Development/Testing

### Local Server Setup
Due to ES6 module imports, you must serve the files via HTTP:

```bash
# Install and start development server
npm install
npm run dev
```

Then open: `http://localhost:8080/`

### Testing Without WAVE Backend:
- Run without URL parameters (`http://localhost:8080/`)
- Data will be displayed locally via JSPsych
- Console will show WAVE integration warnings

## Troubleshooting

**"Failed to log data to WAVE" errors:**
- Check experiment schema exists in WAVE backend
- Verify experiment_id matches backend
- Ensure all required columns are defined
- Check API key validity

**Console shows "WAVE parameters missing":**
- Add required URL parameters: key, experiment_id, participant_id
- Check URL parameter spelling and format

**Backend connection failed:**
- Verify WAVE backend is running (default: localhost:8000)  
- Check network connectivity
- Verify API key permissions

## More Information

- WAVE Client Documentation: https://github.com/WAVE-Lab-Williams/wave-client/
- JSPsych Documentation: https://www.jspsych.org/