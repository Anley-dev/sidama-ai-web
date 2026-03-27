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
  if (text === "hi" || text === "hello") {
    return "Hi! How can I help you?";
  }

  if (text.includes("how are you")) {
    return "I am good. How about you?";
  }

  if (text.includes("who are you")) {
    return "I am Sidama AI assistant.";
  }

  if (text.includes("what")) {
    return "I am learning many things step by step.";
  }

  if (text.includes("thanks")) {
    return "You are welcome!";
  }

  return "I am still learning. Try simple questions.";
}
function clearChat() {
  messages.innerHTML = "";
}
