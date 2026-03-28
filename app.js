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

  // ===== GREETINGS =====
  if (text.includes("hello") || text.includes("hi") || text.includes("goodbye")) {
    return "Keereho (Hello / Goodbye)";
  }

  if (text.includes("good morning")) {
    return "Keere gallito (male) / gallita (female)";
  }

  if (text.includes("good evening")) {
    return "Keere hosito (male) / hosita (female)";
  }

  if (text.includes("how are you")) {
    return "Hittonni nootto? (male) / nootta? (female)";
  }

  // ===== INTRODUCTION =====
  if (text.includes("my name is")) {
    return "Ane su'mi ... / Ani ... (My name is ...)";
  }

  if (text.includes("what is your name")) {
    return "Ate su'mi ayeti?";
  }

  // ===== COMMON QUESTIONS =====
  if (text.includes("speak sidama")) {
    return "Sidaamufo eggennoto?";
  }

  if (text.includes("how much")) {
    return "Kuni mee'e birreti? / Kuni maaggeshati?";
  }

  if (text.includes("what time")) {
    return "Mee-ae sateeti?";
  }

  if (text.includes("coffee")) {
    return "Buna baxaatto? (male) / baxaatta? (female)";
  }

  if (text.includes("homework") || text.includes("help")) {
    return "Kaa'llo has'rratto mini-losira?";
  }

  // ===== DAILY LIFE =====
  if (text.includes("get up")) {
    return "Kaa-iy baaloo (one) / Kaa'e ballo (group)";
  }

  if (text.includes("sleep")) {
    return "Dancha gede goxito?";
  }

  if (text.includes("wash")) {
    return "Angaaki haashi'ri / Angaa'ne haashi're";
  }

  if (text.includes("eat") || text.includes("breakfast")) {
    return "Soodoo-guuti sagale eati";
  }

  if (text.includes("thirsty")) {
    return "Go'roto? (male) / Go'rota? (female)";
  }

  if (text.includes("hungry")) {
    return "Hudi'roto? (male) / Hudi'rota? (female)";
  }

  // ===== POLITE =====
  if (text.includes("thank")) {
    return "Galateemoe (male) / Galateemahe (female)";
  }

  if (text.includes("love")) {
    return "Baxeemoe (male) / Baxeemahe (female)";
  }

  if (text.includes("sorry")) {
    return "Dhiifama";
  }

  if (text.includes("understand")) {
    return "Yottotta di-maachchishommo. Dawartee yi ballo.";
  }

  if (text.includes("road") || text.includes("hawassa")) {
    return "Hawasirra mastanoo doogo hiiteeti?";
  }

  // ===== NUMBERS =====
  if (text === "one") return "Mite";
  if (text === "two") return "Lame";
  if (text === "three") return "Sase";
  if (text === "four") return "Shole";
  if (text === "five") return "Onte";
  if (text === "six") return "Lee";
  if (text === "seven") return "Lamala";
  if (text === "eight") return "Sette";
  if (text === "nine") return "Honse";
  if (text === "ten") return "Tonne";
  if (text === "twenty") return "Lemo";
  if (text === "hundred") return "Xibbee";

  // ===== DEFAULT =====
  return "Try: hello, good morning, thank you, hungry, coffee, numbers.";
}
function clearChat() {
  messages.innerHTML = "";
}
