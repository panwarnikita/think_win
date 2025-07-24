let currentRoom = 1;
let score = 0;
let primeSet = [];
let playerName = "";
let userOrder = [];
let symbols = [];
let currentRiddle = null;
let currentScramble = null;
let currentSequence = null;

const riddles = [
  { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
  { question: "What has hands but cannot clap?", answer: "clock" },
  { question: "What has to be broken before you can use it?", answer: "egg" },
  { question: "The more you take, the more you leave behind. What are they?", answer: "footsteps" },
  { question: "What has a neck but no head?", answer: "bottle" }
];

const scrambles = [
  { scrambled: "OCPUTMER", answer: "computer" },
  { scrambled: "KOBO", answer: "book" },
  { scrambled: "AAVJARCSIPT", answer: "javascript" },
  { scrambled: "TNIEBRNT", answer: "internet" },
  { scrambled: "MEGA", answer: "game" }
];

const numberSequences = [
  { question: "2, 4, 8, 16, ?", answer: "32" },
  { question: "1, 3, 5, 7, ?", answer: "9" },
  { question: "5, 10, 15, 20, ?", answer: "25" },
  { question: "100, 90, 80, ?", answer: "70" },
  { question: "1, 4, 9, 16, ?", answer: "25" }
];

const welcomeText = document.getElementById("welcomeText");
const nameScreen = document.getElementById("nameScreen");
const gameContainer = document.getElementById("gameContainer");
const congratsMessage = document.getElementById("congratsMessage");
const playerFinalName = document.getElementById("playerFinalName");
const finalScore = document.getElementById("finalScore");

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function generateRandomRoom1() {
  const buttons = document.querySelectorAll(".order-btn");
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffled = nums.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);
  const primesInSelected = selected.filter(isPrime);
  if (primesInSelected.length === 0) return generateRandomRoom1();
  selected.forEach((num, i) => {
    buttons[i].innerText = num;
  });
  primeSet = selected.filter(isPrime).map(String);
  userOrder = [];
  document.getElementById("message1").innerText = "";
}

function setRandomRiddle() {
  const randomIndex = Math.floor(Math.random() * riddles.length);
  currentRiddle = riddles[randomIndex];
  document.getElementById("riddleQuestion").innerText = currentRiddle.question;
}

function setRandomScramble() {
  const randomIndex = Math.floor(Math.random() * scrambles.length);
  currentScramble = scrambles[randomIndex];
  document.getElementById("scrambleWord").innerText = currentScramble.scrambled;
}

function setRandomSequence() {
  const randomIndex = Math.floor(Math.random() * numberSequences.length);
  currentSequence = numberSequences[randomIndex];
  document.getElementById("sequenceQuestion").innerText = currentSequence.question;
}

function showRoom(roomNumber) {
  document.querySelectorAll(".room").forEach(room => room.classList.add("hidden"));
  if (roomNumber > 1) {
    document.getElementById("roundNum").innerText = `Room ${roomNumber - 1}`;
    document.getElementById("currentScore").innerText = score;
    document.getElementById("roundClear").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("roundClear").classList.add("hidden");
      document.getElementById(`room${roomNumber}`).classList.remove("hidden");
      if (roomNumber === 1) generateRandomRoom1();
      if (roomNumber === 2) setRandomRiddle();
      if (roomNumber === 3) setRandomScramble();
      if (roomNumber === 4) setRandomSequence();
      if (roomNumber === 5) generateSymbols();
    }, 4000);
  } else {
    document.getElementById(`room${roomNumber}`).classList.remove("hidden");
    if (roomNumber === 1) generateRandomRoom1();
  }
}

document.getElementById("startBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("playerName").value.trim();
  if (nameInput === "") return alert("Please enter your name!");
  playerName = nameInput;
  welcomeText.textContent = `Welcome, ${playerName}!`;
  nameScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  showRoom(1);
});

document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.innerText.trim();
    if (primeSet.includes(val)) {
      if (!userOrder.includes(val)) {
        userOrder.push(val);
      }
      if (userOrder.length === primeSet.length) {
        document.getElementById("message1").innerText = "✅ Great! All primes found!";
        score += 20;
        userOrder = [];
        setTimeout(() => showRoom(2), 800);
      }
    } else {
      document.getElementById("message1").innerText = "❌ Wrong! That's not a prime!";
      userOrder = [];
      setTimeout(() => {
        document.getElementById("message1").innerText = "";
        generateRandomRoom1();
      }, 1500);
    }
  });
});

document.getElementById("revealHint").addEventListener("click", () => {
  const ans = prompt(currentRiddle.question).toLowerCase();
  if (ans.includes(currentRiddle.answer)) {
    document.getElementById("message2").innerText = "🎯 Correct!";
    score += 20;
    setTimeout(() => showRoom(3), 800);
  } else {
    document.getElementById("message2").innerText = "❌ Incorrect!";
  }
});

document.getElementById("submitCode").addEventListener("click", () => {
  const input = document.getElementById("codeInput").value.toLowerCase();
  if (input === currentScramble.answer) {
    document.getElementById("message3").innerText = "🎉 Well Done!";
    score += 20;
    setTimeout(() => showRoom(4), 800);
  } else {
    document.getElementById("message3").innerText = "❌ Try again!";
  }
});

document.getElementById("submitRiddle").addEventListener("click", () => {
  const input = document.getElementById("riddleInput").value.trim().toLowerCase();
  if (input === currentSequence.answer) {
    document.getElementById("message4").innerText = "✅ Correct!";
    score += 20;
    setTimeout(() => showRoom(5), 800);
  } else {
    document.getElementById("message4").innerText = "❌ Nope!";
  }
});

function generateSymbols() {
  const baseSymbols = ["★", "●", "▲"];
  const shuffled = [...baseSymbols].sort(() => 0.5 - Math.random()); 
  symbols = shuffled; 

  document.getElementById("symbols").innerText = shuffled.join(" ");
  
  setTimeout(() => {
    document.getElementById("symbols").innerText = "";
  }, 5000);
}

document.getElementById("submitMath").addEventListener("click", () => {
  const ans = document.getElementById("mathInput").value.trim().toLowerCase();
  const correctSymbol = symbols[1]; 
  let correctWords = "";

 
  if (correctSymbol === "●") correctWords = "circle";
  else if (correctSymbol === "★") correctWords = "star";
  else if (correctSymbol === "▲") correctWords = "triangle";

  if (ans === correctSymbol || ans === correctWords) {
    document.getElementById("message5").innerText = "🧠 Great memory!";
    score += 20;
    setTimeout(() => {
      gameContainer.classList.add("hidden");
      finalScore.innerText = score;
      playerFinalName.innerText = playerName;
      congratsMessage.classList.remove("hidden");
    }, 2000);
  } else {
    document.getElementById("message5").innerText = "❌ Oops! Wrong memory.";
  }
});


document.getElementById("playAgainBtn").addEventListener("click", () => {
  score = 0;
  userOrder = [];
  playerName = "";
  document.querySelectorAll("input").forEach(input => (input.value = ""));
  document.querySelectorAll(".message").forEach(m => (m.innerText = ""));
  congratsMessage.classList.add("hidden");
  gameContainer.classList.add("hidden");
  nameScreen.classList.remove("hidden");
  welcomeText.textContent = "Welcome, Player!";
});
