/* ============================================================
    Sidama AI - Main Logic
   ============================================================ */

const input = document.getElementById("input");
const messages = document.getElementById("messages");

// 1. Function to make the box grow (Link this to oninput in HTML)
function autoGrow(element) {
  element.style.height = "52px"; 
  element.style.height = (element.scrollHeight) + "px";
}

// 2. Logic: ONLY the Arrow Button sends the message
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById("send-button");

    if (sendButton) {
        sendButton.addEventListener("click", () => {
            sendMessage();
            // Reset height after sending
            if (input) {
                input.style.height = "52px";
                input.focus();
            }
        });
    }

    /* NOTE: We do NOT add a keydown listener for "Enter". 
       This allows the Mobile Keyboard 'Return' key to 
       naturally create a new line inside the textarea.
    */
});

// --- 3. Welcome Message on Load ---
window.onload = function () {
  messages.innerHTML += `
  <div class="row ai-row">
    <div class="avatar">S</div>
    <div class="msg ai">Keereho! (Hello!) I am Sidama AI. Ask me anything to translate.</div>
  </div>`;
  messages.scrollTop = messages.scrollHeight;
};

// --- 4. Main Send Function ---
function sendMessage() {
  let text = input.value.trim();
  if (!text) return;

  // Add user message (Supports Multiple Lines)
  messages.innerHTML += `
  <div class="row user-row">
    <div class="msg user">${text.replace(/\n/g, '<br>')}</div>
  </div>`;

  input.value = "";

  // Show Loading Animation with Unique ID
  const loadingId = "loading-" + Date.now();
  messages.innerHTML += `
  <div class="row ai-row" id="${loadingId}">
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
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) loadingElement.remove();

    // Make sure your getReply() function is working!
    let reply = getReply(text);

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
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}
function getReply(text) {
  text = normalize(text);

  // 1. Check for Exact Match (Highest Priority)
  if (dataset[text]) return dataset[text];

  // 2. Check for Partial Match (e.g., "hello there")
  let matches = [];

for (let key in dataset) {
  if (text.includes(key)) {
    matches.push(dataset[key]);
  }
}

if (matches.length > 0) {
  return matches.join(" | ");
}
  // 3. Smart "Spelling Fix" (Fuzzy Search)
  let bestMatch = null;
  let minDistance = 3; // Max number of spelling mistakes allowed (usually 2 or 3)

  let words = text.split(" ");
let bestMatch = null;
let minDistance = 2;

for (let word of words) {
  for (let key in dataset) {
    let distance = getLevenshteinDistance(word, key);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = dataset[key];
    }
  }
}

if (bestMatch) return bestMatch;

  return "I am still learning. Try a simpler sentence.";
}
let result = [];
let wordsList = text.split(" ");

for (let word of wordsList) {
  if (dataset[word]) {
    result.push(dataset[word]);
  }
}

if (result.length > 0) {
  return result.join(" ");
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
document.querySelector('.send-btn').addEventListener('click', function(e) {
  e.preventDefault();
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

