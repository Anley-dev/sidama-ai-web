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
  // greetings
  "hello": "Keereho",
  "hi": "Keereho",
  "goodbye": "Keereho",
  "good morning": "Keere gallito / gallita",
  "good evening": "Keere hosito / hosita",

  // introduction
  "how are you": "Hittonni nootto? / nootta?",
  "my name is": "Ane su'mi ... / Ani ...",
  "what is your name": "Ate su'mi ayeti?",

  // questions
  "do you speak sidama": "Sidaamufo eggennoto?",
  "how much is this": "Kuni mee'e birreti? / Kuni maaggeshati?",
  "what time is it": "Mee-ae sateeti?",
  "do you like coffee": "Buna baxaatto? / baxaatta?",
  "help homework": "Kaa'llo has'rratto mini-losira?",

  // daily
  "get up": "Kaa-iy baaloo / Kaa'e ballo",
  "sleep well": "Dancha gede goxito?",
  "wash your hands": "Angaaki haashi'ri / Angaa'ne haashi're",
  "eat breakfast": "Soodoo-guuti sagale eati",
  "thirsty": "Go'roto? / Go'rota?",
  "hungry": "Hudi'roto? / Hudi'rota?",

  // polite
  "i love you": "Baxeemoe / Baxeemahe",
  "thank you": "Galateemoe / Galateemahe",
  "sorry": "Dhiifama",
  "i did not understand": "Yottotta di-maachchishommo. Dawartee yi ballo.",
  "road to hawassa": "Hawasirra mastanoo doogo hiiteeti?",

  // numbers
  "one": "Mite",
  "two": "Lame",
  "three": "Sase",
  "four": "Shole",
  "five": "Onte",
  "six": "Lee",
  "seven": "Lamala",
  "eight": "Sette",
  "nine": "Honse",
  "ten": "Tonne",
  "twenty": "Lemo",
  "hundred": "Xibbee"
};

 function getReply(text) {
  text = text.toLowerCase().trim();

  // exact match first
  if (dataset[text]) {
    return dataset[text];
  }

  // better partial match
  let bestMatch = null;

  for (let key in dataset) {
    if (text.includes(key)) {
      bestMatch = dataset[key];
      break;
    }
  }

  if (bestMatch) return bestMatch;

  return "Not found. Try simple phrases like hello, thank you, coffee, numbers.I am still learning😊...";
}
function clearChat() {
  messages.innerHTML = "";
}
