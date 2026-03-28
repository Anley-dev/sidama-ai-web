const input = document.getElementById("input");
const messages = document.getElementById("messages");

// --- 1. Welcome Message on Load ---
window.onload = function () {
  messages.innerHTML += `
  <div class="row ai-row">
    <div class="avatar">S</div>
    <div class="msg ai">Keereho! (Hello!) I am Sidama AI. Ask me anything to translate.</div>
  </div>`;
  messages.scrollTop = messages.scrollHeight;
};

// --- 2. Main Send Function ---
function sendMessage() {
  let text = input.value.trim();
  if (!text) return;

  // Add user message
  messages.innerHTML += `
  <div class="row user-row">
    <div class="msg user">${text}</div>
  </div>`;

  input.value = "";

  // the Loading Animation (Matches the CSS .dot classes)
  messages.innerHTML += `
  <div class="row ai-row" id="loading">
    <div class="avatar">S</div>
    <div class="msg ai">
      <div class="typing">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>`;

  messages.scrollTop = messages.scrollHeight;

  // Artificial delay for "Thinking" feel
  setTimeout(() => {
    // loading dots
    const loadingElement = document.getElementById("loading");
    if (loadingElement) loadingElement.remove();

    let reply = getReply(text);

    //  AI response
    messages.innerHTML += `
    <div class="row ai-row">
      <div class="avatar">S</div>
      <div class="msg ai">${reply}</div>
    </div>`;

    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

// --- 3. Translation Logic ---
const dataset = {
  // Greetings
  "hello": "Keereho",
  "hi": "Keereho",
  "goodbye": "Keereho",
  "good morning": "Keere gallito / gallita",
  "good evening": "Keere hosito / hosita",

  // Introduction
  "how are you": "Hittonni nootto? / nootta?",
  "my name is": "Ane su'mi ... / Ani ...",
  "what is your name": "Ate su'mi ayeti?",

  // Questions
  "do you speak sidama": "Sidaamufo eggennoto?",
  "how much is this": "Kuni mee'e birreti? / Kuni maaggeshati?",
  "what time is it": "Mee-ae sateeti?",
  "do you like coffee": "Buna baxaatto? / baxaatta?",
  "help homework": "Kaa'llo has'rratto mini-losira?",

  // Daily
  "get up": "Kaa-iy baaloo / Kaa'e ballo",
  "sleep well": "Dancha gede goxito?",
  "wash your hands": "Angaaki haashi'ri / Angaa'ne haashi're",
  "eat breakfast": "Soodoo-guuti sagale eati",
  "thirsty": "Go'roto? / Go'rota?",
  "hungry": "Hudi'roto? / Hudi'rota?",

  // Polite
  "i love you": "Baxeemoe / Baxeemahe",
  "thank you": "Galateemoe / Galateemahe",
  "sorry": "Dhiifama",
  "i did not understand": "Yottotta di-maachchishommo. Dawartee yi ballo.",
  "road to hawassa": "Hawasirra mastanoo doogo hiiteeti?",

  // Numbers
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

  // Exact match first
  if (dataset[text]) {
    return dataset[text];
  }

  // Partial match
  let bestMatch = null;
  for (let key in dataset) {
    if (text.includes(key)) {
      bestMatch = dataset[key];
      break;
    }
  }

  if (bestMatch) return bestMatch;

  return "I haven't learned that phrase yet. Try simple words like 'hello', 'coffee', or 'thank you'. I am still learning! 😊";
}

// --- 4. Utilities ---
function clearChat() {
  messages.innerHTML = "";
  // Optional: Trigger welcome message again
  window.onload(); 
}

