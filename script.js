// QuickPrompt Logic 🧠
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get('id'); // Gets the ID from the URL
    
    const titleElement = document.getElementById('prompt-title');
    const textElement = document.getElementById('prompt-text');
    const copyBtn = document.getElementById('copy-btn');

    // 1. Fetch prompts from your JSON file 🗄️
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            if (data[promptId]) {
                titleElement.textContent = data[promptId].title;
                textElement.textContent = data[promptId].text;
            } else {
                titleElement.textContent = "Prompt Not Found";
                textElement.textContent = "Select a prompt from the blog to begin.";
                copyBtn.style.display = 'none';
            }
        })
        .catch(err => {
            titleElement.textContent = "Error Loading";
            console.error(err);
        });

    // 2. The Copy Function 📋
    copyBtn.addEventListener('click', () => {
        const textToCopy = textElement.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied! ✅";
            
            // Visual feedback: change button briefly
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });
});

