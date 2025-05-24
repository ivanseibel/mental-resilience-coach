// STEP 1: Import Gemini API Key
import { GEMINI_API_KEY } from './gemini_api_key.js';

// STEP 2: DOM Element References
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const generateButton = document.getElementById('generate-button');
const audioPlayback = document.getElementById('audio-playback');
const statusMessage = document.getElementById('status-message');

// STEP 3: Voice Options
const voiceOptions = [
    "Zephyr", "Puck", "Charon", "Kore", "Fenrir", "Leda", "Orus", "Aoede", "Callirhoe", "Autonoe",
    "Enceladus", "Iapetus", "Umbriel", "Algieba", "Despina", "Erinome", "Algenib", "Rasalgethi",
    "Laomedeia", "Achernar", "Alnilam", "Schedar", "Gacrux", "Pulcherrima", "Achird",
    "Zubenelgenubi", "Vindemiatrix", "Sadachbia", "Sadaltager", "Sulafar"
];

// STEP 4: Populate Voice Dropdown
voiceOptions.forEach(voiceName => {
    const option = document.createElement('option');
    option.value = voiceName;
    option.textContent = voiceName;
    voiceSelect.appendChild(option);
});

// STEP 5: Event Listener for generate-button
generateButton.addEventListener('click', async () => {
    const text = textInput.value.trim();
    const selectedVoice = voiceSelect.value;

    // Input validation
    if (!text) {
        statusMessage.textContent = "Error: Please enter some text.";
        return;
    }
    if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        statusMessage.textContent = "Error: Please set your API key in script.js.";
        console.error("API Key not set. Please replace 'YOUR_API_KEY_HERE' in script.js with your actual API key.");
        return;
    }

    statusMessage.textContent = "Generating audio...";
    audioPlayback.style.display = 'none'; // Hide audio player while generating

    // Hardcoded instruction
    const finalText = "Say clearly and with a friendly tone: " + text;

    // API Call
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
        contents: [{
            parts: [{
                text: finalText
            }]
        }],
        generationConfig: {
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        voiceName: selectedVoice
                    }
                }
            }
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Try to get more details
            let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
            if (errorData && errorData.error && errorData.error.message) {
                errorMessage += ` - ${errorData.error.message}`;
            }
            throw new Error(errorMessage);
        }

        const responseData = await response.json();

        // Extract base64 audio data
        // Based on documentation, this might be the path. Adjust if needed.
        if (!responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content || !responseData.candidates[0].content.parts || !responseData.candidates[0].content.parts[0] || !responseData.candidates[0].content.parts[0].inlineData || !responseData.candidates[0].content.parts[0].inlineData.data) {
            throw new Error("Audio data not found in API response. Response structure might have changed or an error occurred. Check console for API response.");
        }
        const base64Audio = responseData.candidates[0].content.parts[0].inlineData.data;
        
        // Base64 to Blob
        const byteCharacters = atob(base64Audio);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/wav' }); // Assuming WAV format

        // Create object URL and play audio
        const audioUrl = URL.createObjectURL(blob);
        audioPlayback.src = audioUrl;
        audioPlayback.style.display = 'block'; // Show audio player
        audioPlayback.play();

        statusMessage.textContent = "Audio ready. Playing...";

    } catch (error) {
        statusMessage.textContent = "Error: " + error.message;
        console.error("Error generating speech:", error);
        // Log the full response if available and it's an API error
        if (error.response) {
            error.response.json().then(jsonError => console.error("API Error Details:", jsonError)).catch(() => {});
        }
    }
});
