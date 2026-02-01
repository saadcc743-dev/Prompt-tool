document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get('id');
    const titleElement = document.getElementById('prompt-title');
    const textElement = document.getElementById('prompt-text');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    let fullPromptText = "";
    const TARGET_TIME = 10000; // 10 seconds total ⏱️

    fetch('prompts.json')
        .then(res => res.json())
        .then(data => {
            if (data[promptId]) {
                titleElement.textContent = data[promptId].title;
                fullPromptText = data[promptId].text;
            } else {
                titleElement.textContent = "Error: Prompt Not Found";
                generateBtn.style.display = 'none';
            }
        })
        .catch(() => {
            titleElement.textContent = "Error: Connection Failed";
        });

    function generate() {
        generateBtn.disabled = true;
        copyBtn.style.display = 'none';
        textElement.textContent = "";

        const words = fullPromptText.trim().split(/\s+/);
        
        if (words.length <= 500) {
            const charDelay = TARGET_TIME / fullPromptText.length;
            typeLetters(charDelay);
        } else {
            const wordDelay = TARGET_TIME / words.length;
            typeWords(words, wordDelay);
        }
    }

    function typeLetters(delay) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullPromptText.length) {
                textElement.textContent += fullPromptText.charAt(i);
                i++;
            } else {
                finish(interval);
            }
        }, delay);
    }

    function typeWords(words, delay) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < words.length) {
                textElement.textContent += words[i] + " ";
                i++;
            } else {
                finish(interval);
            }
        }, delay);
    }

    function finish(intervalId) {
        clearInterval(intervalId);
        generateBtn.disabled = false;
        generateBtn.textContent = "Regenerate 🔄";
        copyBtn.style.display = 'inline-block';
    }

    generateBtn.addEventListener('click', generate);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textElement.textContent).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = "Copied! ✅";
            setTimeout(() => copyBtn.textContent = original, 2000);
        });
    });
});
