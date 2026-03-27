const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Show initial welcome message when the script loads
messages.innerHTML += `<div class="msg ai">Hello! I am Sidama AI. Ask me anything.</div>`;
messages.scrollTop = messages.scrollHeight;
function sendMessage() {
    let text = input.value.trim();
    if (!text) return;

    // 1. Display User Message
    messages.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";
    
    // 2. Show Typing Indicator
    messages.innerHTML += `<div class="msg ai" id="typing">Sidama AI is typing</div>`;
    messages.scrollTop = messages.scrollHeight;

    // 3. Wait 1.2 seconds, then show AI reply
    setTimeout(() => {
        const typingIndicator = document.getElementById("typing");
        if (typingIndicator) typingIndicator.remove();

        let reply = getReply(text);
        messages.innerHTML += `<div class="msg ai">${reply}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 1200);
}

function getReply(text) {
    text = text.toLowerCase();
    if (text.includes("hi")) return "Hi! How can I help?";
    if (text.includes("who")) return "I am a Sidama AI assistant.";
    if (text.includes("hello")) return "Hello!";
    if (text.includes("name")) return "I am Sidama AI.";
    if (text.includes("where")) return "I am from the Sidama region.";

    return "I am still learning...";
}

// Event listener for the Enter key
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function clearChat() {
  messages.innerHTML = "";
}
