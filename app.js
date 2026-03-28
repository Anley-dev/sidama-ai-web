const input = document.getElementById("input");
const messages = document.getElementById("messages");
//  this function to make the box grow
function autoGrow(element) {
  element.style.height = "52px"; 
  element.style.height = (element.scrollHeight) + "px";
}

//  this handle the "Enter" key and "Send" button
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById("input");
    const sendButton = document.getElementById("send-button");

    inputField.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        this.style.height = "52px";
      }
    });

    sendButton.addEventListener("click", () => {
      sendMessage();
      inputField.style.height = "52px";
      inputField.focus();
    });
});

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

  // 1. Check for Exact Match (Highest Priority)
  if (dataset[text]) return dataset[text];

  // 2. Check for Partial Match (e.g., "hello there")
  for (let key in dataset) {
    if (text.includes(key)) return dataset[key];
  }

  // 3. Smart "Spelling Fix" (Fuzzy Search)
  let bestMatch = null;
  let minDistance = 3; // Max number of spelling mistakes allowed (usually 2 or 3)

  for (let key in dataset) {
    let distance = getLevenshteinDistance(text, key);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = dataset[key];
    }
  }

  if (bestMatch) return `(Did you mean ${Object.keys(dataset).find(k => dataset[k] === bestMatch)}?) \n\n ${bestMatch}`;

  return "I haven't learned that phrase yet. I am still learning! 😊";
}

// Helper function to calculate spelling "distance"
function getLevenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[a.length][b.length];
}

// --- 4. Utilities ---
function clearChat() {
  messages.innerHTML = "";
  // Optional: Trigger welcome message again
  window.onload(); 
}

// This ensures the button works even if the HTML attribute fails
document.querySelector('.send-btn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevents page refresh
  sendMessage();
});

// Make sure the button works on all devices
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.send-btn');
    if (sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }
});

