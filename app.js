const input = document.getElementById("input");
const messages = document.getElementById("messages");

window.onload = function () {
  messages.innerHTML += `
  <div class="row ai-row">
    <div class="avatar">🤖</div>
    <div class="msg ai">Hello! I am Sidama AI. Ask me anything.</div>
  </div>`;
};

function sendMessage() {
  let text = input.value.trim();
  if (!text) return;

  // user message
  messages.innerHTML += `
  <div class="row user-row">
    <div class="msg user">${text}</div>
  </div>`;

  input.value = "";

  // typing
  messages.innerHTML += `
  <div class="row ai-row" id="typing">
    <div class="avatar">🤖</div>
    <div class="msg ai typing">
      <span></span><span></span><span></span>
    </div>
  </div>`;

  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    document.getElementById("typing").remove();

    let reply = getReply(text);

    messages.innerHTML += `
    <div class="row ai-row">
      <div class="avatar">🤖</div>
      <div class="msg ai">${reply}</div>
    </div>`;

    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

function getReply(text) {
  text = text.toLowerCase().trim();

  // greetings
  if (text.includes("hi") || text.includes("hello")) {
    return "Hi! How can I help you?";
  }

  // questions
  if (text.includes("how are you")) {
    return "I am doing well. How about you?";
  }

  if (text.includes("who are you")) {
    return "I am Sidama AI assistant.";
  }

  if (text.includes("what are you learning")) {
    return "I am learning language, chat, and helping users like you.";
  }

  if (text.includes("what")) {
    return "Can you ask more clearly? I am still learning.";
  }

  // reactions
  if (text.includes("wow") || text.includes("great")) {
    return "Glad you like it!";
  }

  if (text.includes("thanks")) {
    return "You are welcome!";
  }

  if (text.includes("really")) {
    return "Yes. I am improving step by step.";
  }

  // default
  return "I am still learning. Try asking about me or simple questions.";
}
function clearChat() {
  messages.innerHTML = "";
}
