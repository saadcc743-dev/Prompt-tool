document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get('id');
    
    const titleElement = document.getElementById('prompt-title');
    const textElement = document.getElementById('prompt-text');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    let fullPromptText = "";

    // Fetch data from JSON
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            if (data[promptId]) {
                titleElement.textContent = data[promptId].title;
                fullPromptText = data[promptId].text; 
            } else {
                titleElement.textContent = "Prompt Not Found";
                generateBtn.style.display = 'none';
            }
        });

    // Typing Animation ⌨️
    function startGeneration() {
        generateBtn.disabled = true;
        textElement.textContent = "";
        let index = 0;

        let typingInterval = setInterval(() => {
            if (index < fullPromptText.length) {
                textElement.textContent += fullPromptText.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                copyBtn.style.display = 'inline-block';
                generateBtn.textContent = "Regenerate 🔄";
                generateBtn.disabled = false;
            }
        }, 40); // 40ms speed
    }

    generateBtn.addEventListener('click', startGeneration);

    // Copy Functionality
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textElement.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied! ✅";
            setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
        });
    });
});
