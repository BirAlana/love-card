// script.js — итоговый вариант (с поцелуями, выбором всех 4 картинок и несколькими вариантами ответа в Q3)

const CONFIG = {
  coverTitle: "Привет, Мой Супруг",
  coverText: "Я сделала кое-что для тебя… Хочешь посмотреть?",
  coverHint: "",

  // Q1
  q1Text: "Когда мы с тобой начали встречаться?",
  q1Correct: "05.05.2023",
  q1Options: [
    "03.05.2023",
    "05.05.2023",
    "Помню, что встречались примерно всю жизнь 💖"
  ],
  q1WrongMsg: "Неть, попробуйте снова, Аланчик",
  q1OkMsg: "Дяммм💗 Это целых 1016 дней",

  // Q2 (нужно выбрать все 4)
  q2Text: "Где изображены мы?",
  imageChoices: [
    { src: "pictures/1664785560_1-zefirka-club-p-rapuntsel-i-yudzhin-lyubov-1.jpg", caption: "Принц и принцесса", isCorrect: true },
    { src: "pictures/sweet-heart-buns-bundled-together-marble-surface.jpg", caption: "Две булочки", isCorrect: true },
    { src: "pictures/c2fed429d6e74e3cad5c0983a17cb794.jpg", caption: "Два котика", isCorrect: true },
    { src: "pictures/photo_2026-02-14_15-28-20.jpg", caption: "Аланчик и Аланочка", isCorrect: true }
  ],
  q2HintPickAll: "И всё?...",
  q2OkMsg: "Дям дям дям, ето всё про нас❤️",

  q3Text: "Введи нашу самую частую фразу",
  q3Answers: ["амм", "ам", "аммм"],
  q3Hint: "Подсказочка: Вкусьна вкусьна",
  q3OkMsg: "Скушаю тебя аммм",

  // Final
  finalTitle: "Моя валентинка ❤️",
  finalSubtitle: "",
  finalHtml: `
    <div class="finalWrap">
      <div class="finalVideo">
        <video
          src="pictures/doc_2026-02-14_17-15-01.mp4"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        ></video>
      </div>

      <div class="finalText">
        <p><b>С днём влюблённых, мой Любимый.</b></p>
        <p>
          Я просто хотела поздравить тебя с нашим днём. Днём нашей любви —
          такой невероятно тёплой и счастливой.
        </p>
        <p>
          В этот день я вспоминаю не только наши самые яркие моменты, но и самые обычные:
          наши шутки, разговоры, привычки, поцелуи и объятия.
          Я хочу, чтобы эти маленькие радости шли с нами рука об руку всю нашу жизнь —
          и чтобы их становилось только больше.
        </p>
        <p>
          Я невероятно счастлива с тобой. Спасибо тебе за то, что ты такой чудесный.
        </p>
        <p><b>Я люблю тебя. Бесконечно. Ты моя абсолютная любовь.</b></p>
        <p class="sign">— Твоя Аланочка</p>
      </div>
    </div>
  `
};

/**********************
 * Helpers
 **********************/
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const toast = (text) => {
  const t = $("#toast");
  if (!t) return;
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 1600);
};

const norm = (s) => (s ?? "")
  .toString()
  .trim()
  .replace(/\s+/g, " ")
  .toLowerCase();

/**********************
 * Background floating icons (images)
 **********************/
function spawnBgHearts(){
  const box = $("#bgHearts");
  if (!box) return;

  const hearts = [
    "pictures/free-icon-heart-4207539.png",
    "pictures/free-icon-cat-5772483.png",
    "pictures/free-icon-heart-8532027.png",
    "pictures/free-icon-hearts-9427518.png",
    "pictures/free-icon-stars-6081766.png",
    "pictures/free-icon-heart-7088368.png"
  ];

  box.innerHTML = "";

  for(let i=0;i<26;i++){
    const img = document.createElement("img");

    const dx = (Math.random() * 160) - 80;
    const rot = (Math.random() * 90) - 45;
    img.style.setProperty("--dx", dx + "px");
    img.style.setProperty("--rot", rot + "deg");

    img.src = hearts[Math.floor(Math.random()*hearts.length)];

    const size = 18 + Math.random()*26;
    img.style.width = size + "px";

    img.style.left = (Math.random()*100) + "vw";
    img.style.animationDuration = (8 + Math.random()*10) + "s";
    img.style.animationDelay = (-Math.random()*12) + "s";

    box.appendChild(img);
  }
}
spawnBgHearts();

/**********************
 * Confetti (hearts image) + Kisses confetti (emoji) on button
 **********************/
let confettiLock = false;

function confetti(count = 24){
  if (confettiLock) return;
  confettiLock = true;

  const src = "pictures/free-icon-heart-210545.png";

  for (let i = 0; i < count; i++){
    const size = 14 + Math.random() * 20;

    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = (50 + (Math.random()*20 - 10)) + "vw";
    el.style.top  = (72 + (Math.random()*10 - 5)) + "vh";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.zIndex = 9999;
    el.style.pointerEvents = "none";
    el.style.backgroundImage = `url("${src}")`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.filter = "drop-shadow(0 10px 16px rgba(0,0,0,.12))";

    document.body.appendChild(el);

    const dx  = (Math.random()*440 - 220);
    const dy  = (Math.random()*320 + 220) * -1;
    const rot = (Math.random()*240 - 120);
    const dur = 900 + Math.random()*600;

    el.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 0 }
      ],
      { duration: dur, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
    );

    setTimeout(() => el.remove(), dur + 80);
  }

  setTimeout(() => { confettiLock = false; }, 1700);
}

function kissConfetti(count = 24){
  const kisses = ["💋","😘","💖","💕"];

  for(let i=0; i<count; i++){
    const el = document.createElement("div");
    el.textContent = kisses[Math.floor(Math.random()*kisses.length)];
    el.style.position = "fixed";
    el.style.left = (50 + (Math.random()*20-10)) + "vw";
    el.style.top  = (72 + (Math.random()*10-5)) + "vh";
    el.style.fontSize = (20 + Math.random()*14) + "px";
    el.style.zIndex = 9999;
    el.style.pointerEvents = "none";
    el.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,.15))";

    document.body.appendChild(el);

    const dx = (Math.random()*360 - 180);
    const dy = -(180 + Math.random()*220);
    const rot = (Math.random()*180 - 90);
    const dur = 1200 + Math.random()*700;

    el.animate([
      { transform:"translate(0,0) rotate(0deg)", opacity:1 },
      { transform:`translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0 }
    ], {
      duration: dur,
      easing: "cubic-bezier(.2,.7,.2,1)",
      fill: "forwards"
    });

    setTimeout(() => el.remove(), dur + 80);
  }
}

/**********************
 * Steps
 **********************/
const steps = Array.from($$(".step"));
function setStep(n){
  steps.forEach(s => s.classList.remove("active"));
  const target = steps.find(s => Number(s.dataset.step) === n);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**********************
 * Init texts
 **********************/
function initText(){
  $("#coverTitle").textContent = CONFIG.coverTitle;
  $("#coverText").textContent  = CONFIG.coverText;
  $("#coverHint").textContent  = CONFIG.coverHint;

  $("#q1Text").textContent = CONFIG.q1Text;
  $("#q2Text").textContent = CONFIG.q2Text;
  $("#q3Text").textContent = CONFIG.q3Text;

  $("#finalTitle").textContent = CONFIG.finalTitle;

  const sub = $("#finalSubtitle");
  if (sub) sub.textContent = CONFIG.finalSubtitle || "";

  $("#finalText").innerHTML = CONFIG.finalHtml;
}
initText();

/**********************
 * Cover
 **********************/
$("#startBtn").addEventListener("click", (e) => {
  e.preventDefault();
  resetAll();
  setStep(1);
  confetti(16);
});

/**********************
 * Q1
 **********************/
const quizEl = $("#quiz");
const q1Msg = $("#q1Msg");
let q1Passed = false;

function renderQ1(){
  quizEl.innerHTML = "";
  q1Passed = false;
  $("#next1").disabled = true;

  q1Msg.className = "msg";
  q1Msg.textContent = "";
  q1Msg.classList.remove("show","ok","bad");

  CONFIG.q1Options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "opt";
    b.type = "button";
    b.textContent = opt;

    b.addEventListener("click", (e) => {
      e.preventDefault();

      $$(".opt").forEach(x => x.classList.remove("correct","wrong"));
      const ok = (opt === CONFIG.q1Correct);

      if(ok){
        b.classList.add("correct");
        q1Msg.textContent = CONFIG.q1OkMsg;
        q1Msg.classList.add("show","ok");
        q1Msg.classList.remove("bad");
        q1Passed = true;
        $("#next1").disabled = false;
        confetti(12);
      }else{
        b.classList.add("wrong");
        q1Msg.textContent = CONFIG.q1WrongMsg;
        q1Msg.classList.add("show","bad");
        q1Msg.classList.remove("ok");
        q1Passed = false;
        $("#next1").disabled = true;
      }
    });

    quizEl.appendChild(b);
  });
}

$("#back1").addEventListener("click", (e) => { e.preventDefault(); setStep(0); });

$("#next1").addEventListener("click", (e) => {
  e.preventDefault();
  if(!q1Passed) return;
  renderQ2();
  setStep(2);
});

/**********************
 * Q2 (select all 4)
 **********************/
const imgGrid = $("#imgGrid");
const q2Msg = $("#q2Msg");

function renderQ2(){
  imgGrid.innerHTML = "";
  $("#next2").disabled = false;

  q2Msg.className = "msg";
  q2Msg.textContent = "";
  q2Msg.classList.remove("show","ok","bad");

  const items = (CONFIG.imageChoices || []).slice(0,4);
  const neededCount = items.filter(i => i.isCorrect).length || 4;
  renderQ2.neededCount = neededCount;

  items.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "imgOpt";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || "option";

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.textContent = item.caption || "";

    card.appendChild(img);
    card.appendChild(cap);

    card.addEventListener("click", (e) => {
      e.preventDefault();

      // убираем подсказку (bad), если была
      if (q2Msg.classList.contains("bad")) {
        q2Msg.classList.remove("show","bad");
        q2Msg.textContent = "";
      }

      card.classList.toggle("correct");

      const selected = imgGrid.querySelectorAll(".imgOpt.correct").length;
      const needed = renderQ2.neededCount ?? 4;

      // показываем "это всё про нас" только когда выбраны все 4
      if (selected === needed){
        q2Msg.textContent = CONFIG.q2OkMsg;
        q2Msg.classList.add("show","ok");
        q2Msg.classList.remove("bad");
      } else {
        q2Msg.classList.remove("show","ok");
        q2Msg.textContent = "";
      }
    });

    imgGrid.appendChild(card);
  });
}

$("#back2").addEventListener("click", (e) => { e.preventDefault(); setStep(1); });

$("#next2").addEventListener("click", (e) => {
  e.preventDefault();

  const selected = imgGrid.querySelectorAll(".imgOpt.correct").length;
  const needed = renderQ2.neededCount ?? 4;

  if (selected < needed){
    q2Msg.textContent = CONFIG.q2HintPickAll;
    q2Msg.classList.add("show","bad");
    q2Msg.classList.remove("ok");
    return;
  }

  resetQ3();
  setStep(3);
});

/**********************
 * Q3
 **********************/
const q3Msg = $("#q3Msg");
let q3Passed = false;

function resetQ3(){
  q3Passed = false;
  $("#answerInput").value = "";
  $("#finishBtn").disabled = true;

  q3Msg.className = "msg";
  q3Msg.textContent = "";
  q3Msg.classList.remove("show","ok","bad");
}

$("#checkAnswer").addEventListener("click", (e) => {
  e.preventDefault();

  const entered = norm($("#answerInput").value);

  if(!entered){
    q3Msg.textContent = "Введи хоть что-нибудь 🙂";
    q3Msg.classList.add("show","bad");
    q3Msg.classList.remove("ok");
    return;
  }

  const answers = (CONFIG.q3Answers || []).map(norm);

  if(answers.includes(entered)){
    q3Msg.textContent = CONFIG.q3OkMsg;
    q3Msg.classList.add("show","ok");
    q3Msg.classList.remove("bad");
    q3Passed = true;
    $("#finishBtn").disabled = false;
    confetti(18);
  }else{
    q3Msg.textContent = CONFIG.q3Hint;
    q3Msg.classList.add("show","bad");
    q3Msg.classList.remove("ok");
    q3Passed = false;
    $("#finishBtn").disabled = true;
  }
});

$("#answerInput").addEventListener("keydown", (e) => {
  if(e.key === "Enter") $("#checkAnswer").click();
});

$("#back3").addEventListener("click", (e) => { e.preventDefault(); setStep(2); });

$("#finishBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if(!q3Passed) return;
  setStep(4);
  confetti(28);
});

/**********************
 * Final — kisses button
 **********************/
const kissBtn = $("#kissBtn");
if (kissBtn){
  kissBtn.addEventListener("click", (e) => {
    e.preventDefault();
    kissConfetti(24);
  });
}

/**********************
 * Restart
 **********************/
$("#restartBtn").addEventListener("click", (e) => {
  e.preventDefault();
  resetAll();
  setStep(0);
});

/**********************
 * Reset
 **********************/
function resetAll(){
  renderQ1();
  renderQ2();
  resetQ3();
}

// init
resetAll();
