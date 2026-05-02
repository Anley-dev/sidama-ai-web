//  Sidama AI - Dynamic Logic (Syllabus Powered)

const input = document.getElementById("input");
const messages = document.getElementById("messages");
let dataset = {}; // We will fill this from data.json

// 1. Fetch the big word list from data.json
async function loadDataset() {
    try {
        const response = await fetch('./data.json');
        dataset = await response.json();
        console.log("Sidama AI: 150+ Syllabus words loaded.");
    } catch (error) {
        console.error("Failed to load data.json:", error);
    }
}
loadDataset();

function autoGrow(element) {
  element.style.height = "52px"; 
  element.style.height = (element.scrollHeight) + "px";
}

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById("send-button");
    if (sendButton) {
        sendButton.addEventListener("click", () => {
            sendMessage();
            if (input) {
                input.style.height = "52px";
                input.focus();
            }
        });
    }
});

window.onload = function () {
  messages.innerHTML += `
  <div class="row ai-row">
    <div class="avatar">S</div>
    <div class="msg ai">Keereho! I am updated with the official Sidama Syllabus. Ask me a word or phrase!</div>
  </div>`;
};

function sendMessage() {
  let text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `
  <div class="row user-row">
    <div class="msg user">${text.replace(/\n/g, '<br>')}</div>
  </div>`;

  input.value = "";

  const loadingId = "loading-" + Date.now();
  messages.innerHTML += `
  <div class="row ai-row" id="${loadingId}">
    <div class="avatar">S</div>
    <div class="msg ai"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
  </div>`;

  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) loadingElement.remove();

    let reply = getReply(text);

    messages.innerHTML += `
    <div class="row ai-row">
      <div class="avatar">S</div>
      <div class="msg ai">${reply}</div>
    </div>`;

    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

// --- CORE TRANSLATION ENGINE ---
function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s\?]/g, "").trim();
}

function getReply(text) {
  const original = text;
  text = normalize(text);

  // 1. Exact Phrase Match (The Best Way)
  if (dataset[text]) return dataset[text];

  // 2. Phrase containing keywords
  for (let key in dataset) {
    if (text.length > 3 && text.includes(key)) {
      return dataset[key];
    }
  }

  // 3. Word-by-word Breakdown
  let words = text.split(" ");
  let translated = [];
  words.forEach(word => {
    if (dataset[word]) translated.push(dataset[word]);
  });

  if (translated.length > 0) return translated.join(" ");

  // 4. Learning Fallback
  sendToForm(original);
  return "I haven't learned that phrase yet. I've sent it to my developers to study!";
}

function sendToForm(text) {
  let formURL = "https://docs.google.com/forms/d/e/1FAIpQLScp8hZRjKsgNMCAtdGjp6jCDyaUs4OrYyQcvm5lz2aSZv993g/formResponse";
  let formData = new URLSearchParams();
  formData.append("entry.1639978016", text);
  fetch(formURL, { method: "POST", mode: "no-cors", body: formData });
}

// Keep your existing Levenshtein and reporting functions here...

