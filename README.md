# Simple Web-Based Text-to-Speech Generator

## Description
This application allows you to generate speech from text directly in your web browser. It utilizes Google's Generative Language API (specifically, a model with Text-to-Speech capabilities like a preview version of Gemini) for synthesizing audio through client-side JavaScript `fetch` calls.

## Features
*   **Text Input:** Provide any text you want to convert to speech.
*   **Voice Selection:** Choose from a predefined list of available voices.
*   **Audio Playback:** Listen to the generated audio directly on the page.
*   **Client-Side Operation:** Runs entirely in your web browser, no server-side setup required for the basic functionality (but see security notice below).

## How to Use

1.  **Prerequisites:**
    *   A modern web browser that supports HTML5, JavaScript, and the Fetch API.
    *   A Google Gemini API key with Text-to-Speech capabilities enabled.

2.  **API Key Configuration:**
    *   You **MUST** configure your Google Gemini API key to use this application.
    *   Open the `script.js` file in a text editor.
    *   Locate the following line at the beginning of the file:
        ```javascript
        const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
        ```
    *   Replace `"YOUR_API_KEY_HERE"` with your actual Google Gemini API key. Ensure your key is enclosed in the quotation marks.

3.  **IMPORTANT SECURITY NOTICE:**
    **Hardcoding your API key in client-side JavaScript (`script.js`) is insecure and exposes your key to anyone who views the page source (e.g., using browser developer tools). This method is provided for simplicity in local testing and demonstration purposes only.**

    **Do NOT deploy this application to a public server or share it widely with your API key embedded directly in `script.js`. For production use, or any scenario where your key should not be publicly accessible, you should implement a backend proxy server to manage your API key securely. The client would make requests to your proxy, and the proxy would then make authenticated requests to the Google API.**

4.  **Save Changes:**
    *   After pasting your API key, save the `script.js` file.

5.  **Run the Application:**
    *   Open the `index.html` file directly in your web browser (e.g., by double-clicking it or using "File > Open" in your browser).

6.  **Generate Speech:**
    *   Type or paste the text you want to convert into the text area.
    *   Select a voice from the dropdown menu.
    *   Click the "Generate Speech" button.
    *   If successful, an audio player will appear, and the generated speech will play. Status messages will indicate progress or errors.

## Limitations
*   **API Key Security Risk:** As highlighted above, the primary limitation of this example is the insecure method of handling the API key directly in client-side code. This is not suitable for production environments.
*   **CORS and Browser Policies:** While the Google Generative Language API is generally designed for broad accessibility, direct client-side `fetch` calls can sometimes be affected by Cross-Origin Resource Sharing (CORS) policies or other browser security features, depending on the specific API endpoint configurations and browser settings.
*   **API Quotas and Billing:** Use of the Google Generative Language API is subject to quotas and billing as per your Google Cloud Platform agreement. Ensure you monitor your usage.
*   **Error Handling:** Basic error handling is implemented, but it may not cover all possible API or network scenarios. Check the browser's developer console for more detailed error information if issues occur.
*   **Styling:** The styling of the application is basic and intended for functional demonstration.
*   **Voice List:** The list of voices is predefined in `script.js` and may not reflect all voices available or future changes to the API.

---
This README provides instructions for using the simple HTML/JavaScript Text-to-Speech generator. Remember to handle your API keys securely.
