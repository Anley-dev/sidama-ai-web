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

const dataset = {
  "hello": "Keereho",
  "hi": "Keereho",
  "good morning": "Keere gallito / gallita",
  "good evening": "Keere hosito / hosita",
  "how are you": "Hittonni nootto? / nootta?",
  "my name is": "Ane su'mi ...",
  "what is your name": "Ate su'mi ayeti?",
  "speak sidama": "Sidaamufo eggennoto?",
  "how much": "Kuni mee'e birreti?",
  "what time": "Mee-ae sateeti?",
  "coffee": "Buna baxaatto / baxaatta",
  "hungry": "Hudi'roto? / Hudi'rota?",
  "thirsty": "Go'roto? / Go'rota?",
  "wash hands": "Angaaki haashi'ri",
  "thank you": "Galateemoe / Galateemahe",
  "love": "Baxeemoe / Baxeemahe",
  "sorry": "Dhiifama",
  "help": "Kaa'llo has'rratto?",
  "road": "Hawasirra mastanoo doogo hiiteeti?",

  "one": "Mite",
  "two": "Lame",
  "three": "Sase",
  "four": "Shole",
  "five": "Onte",
  "six": "Lee",
  "seven": "Lamala",
  "eight": "Sette",
  "nine": "Honse",
  "ten": "Tonne"
};
 function getReply(text) {
  text = text.toLowerCase().trim();

  // exact match
  if (dataset[text]) {
    return dataset[text];
  }

  // partial match
  for (let key in dataset) {
    if (text.includes(key)) {
      return dataset[key];
    }
  }

  return "Not found. Try simple words like hello, coffee, one.";
} 
function clearChat() {
  messages.innerHTML = "";
}
