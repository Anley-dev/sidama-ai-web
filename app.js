//  Sidama AI - Dynamic Logic (Syllabus Powered)

const input = document.getElementById("input");
const messages = document.getElementById("messages");
let dataset = {}; 
let fuse; // Add this global variable

// 1. Fetch the big word list from data.json and initialize Fuse.js
async function loadDataset() {
    try {
        const response = await fetch('./data.json');
        dataset = await response.json();

        // Prepare data for Fuzzy Search
        const searchList = Object.keys(dataset).map(key => ({
            english: key,
            sidama: dataset[key]
        }));

        // Initialize Fuse
        fuse = new Fuse(searchList, {
            keys: ['english'],
            threshold: 0.3, // Great for typos
            includeScore: true
        });

        console.log("Sidama AI: Database and Fuzzy Search ready!");
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

//  CORE TRANSLATION ENGINE 
function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s\?]/g, "").trim();
}
function getReply(text) {
  const normalizedText = normalize(text);

  if (fuse) {
    const fuzzyResults = fuse.search(normalizedText);
    
    // threshold logic: lower means it must be a CLOSER match
    // 0.35 is usually the 'sweet spot' for quality
    if (fuzzyResults.length > 0 && fuzzyResults[0].score < 0.35) {
      return fuzzyResults[0].item.sidama;
    }
  }

  // Word-by-word fallback (only if fuzzy didn't find a strong match)
  let words = normalizedText.split(" ");
  let translated = [];
  words.forEach(word => {
    if (dataset[word]) translated.push(dataset[word]);
  });

  if (translated.length > 0) return translated.join(" ");

  return "I haven't learned that phrase yet. I've sent it to my developer to learn!";
}


 
function sendToForm(text) {
  let formURL = "https://docs.google.com/forms/d/e/1FAIpQLScp8hZRjKsgNMCAtdGjp6jCDyaUs4OrYyQcvm5lz2aSZv993g/formResponse";
  let formData = new URLSearchParams();
  formData.append("entry.1639978016", text);
  fetch(formURL, { method: "POST", mode: "no-cors", body: formData });
}

// Keep your existing Levenshtein and reporting functions here...
function clearChat() {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";

    const welcome = `
    <div class="row ai-row">
      <div class="avatar">S</div>
      <div class="msg ai">Chat cleared. Keereho! How can I help you translate today?</div>
    </div>`;
    messagesContainer.innerHTML = welcome;

    if (input) {
        input.value = "";
        input.style.height = "52px";
    }
}
