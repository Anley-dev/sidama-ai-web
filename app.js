const input = document.getElementById("input");
const messages = document.getElementById("messages");

function sendMessage() {
  let text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  messages.innerHTML += `<div class="msg ai" id="typing">Typing...</div>`;
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    document.getElementById("typing").remove();

    let reply = getReply(text);
    messages.innerHTML += `<div class="msg ai">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

function getReply(text) {
  text = text.toLowerCase();

  if (text.includes("hello")) return "Hello!";
  if (text.includes("name")) return "I am Sidama AI.";
  if (text.includes("where")) return "Sidama region.";

  return "I am learning...";
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
