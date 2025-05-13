let wordsContainer = document.querySelector(".words"); // تأكد من وجود هذا العنصر الذي يحتوي على .word
let currentWordIndex = 0;
let words = [];
let maxWordIndex = 0;
let changeInterval;

function buildWordsFromArray(wordArray) {
    // تنظيف الحاوية
    wordsContainer.innerHTML = "";
    words = [];

    wordArray.forEach(text => {
        let wordDiv = document.createElement("div");
        wordDiv.classList.add("word");

        text.split("").forEach(char => {
            let span = document.createElement("span");
            span.textContent = char;
            span.className = "letter";
            wordDiv.appendChild(span);
        });

        wordDiv.style.opacity = "0";
        wordsContainer.appendChild(wordDiv);
        words.push(wordDiv);
    });

    currentWordIndex = 0;
    maxWordIndex = words.length - 1;
    words[0].style.opacity = "1";
}

function changeText() {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + (i * 80));
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}

// تحديث النصوص مع تبديل اللغة
function updateAnimatedWords(newWords) {
    clearInterval(changeInterval);
    buildWordsFromArray(newWords);
    changeText();
    changeInterval = setInterval(changeText, 3000);
}

// التهيئة الأولية (يتم جلب الكلمات من lang.js)
document.addEventListener("DOMContentLoaded", () => {
    let lang = document.documentElement.lang || 'en';
    let translations = window.translations || {};
    let wordsList = translations[lang] && translations[lang]["home-words"] ? translations[lang]["home-words"] : [];
    updateAnimatedWords(wordsList);
});


function activateSkillCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        const dots = elem.getAttribute("data-dots");
        const marked = elem.getAttribute("data-percent");
        const percent = Math.floor(dots * marked / 100);
        const rotate = 360 / dots;
        let points = "";

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }

        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });
}

// تفعيل عند ظهور قسم المهارات
const skillsSection = document.querySelector('#skills'); // تأكد من أن الـ id مطابق في HTML
let skillsActivated = false;

if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsActivated) {
                activateSkillCircles();
                skillsActivated = true;
            } else if (!entry.isIntersecting) {
                skillsActivated = false; // لإعادة التفعيل في المرة القادمة
            }
        });
    }, { threshold: 0.5 }); // عند ظهور 50% من القسم

    observer.observe(skillsSection);
}

// فلترة المعرض
var mixer = mixitup('.portfolio-gallery');

// القائمة النشطة
let menu = document.querySelectorAll('.header ul li a'); // تم تصحيح اسم المتغير هنا
let sections = document.querySelectorAll('section'); // تم تصحيح اسم المتغير هنا

function activeMenu() {
    let len = sections.length;
    while(--len && window.scrollY + 97 < sections[len].offsetTop) {}
    menu.forEach(sec => sec.classList.remove("active"));
    if(menu[len]) menu[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// الهيدر الثابت
const header = document.querySelector(".header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 50);
});

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
    document.body.classList.toggle("nav-open");
    document.body.style.overflow = navlist.classList.contains("open") ? "hidden" : "auto";
});

// إغلاق القائمة عند التمرير (اختياري)
window.addEventListener("scroll", () => {
    if (navlist.classList.contains("open")) {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "auto";
    }
});

// parallax effect ...........................................
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottm = document.querySelectorAll(".scroll-bottom");
scrollBottm.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // منع الإرسال الافتراضي

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
    .then(response => {
      if (response.ok) {
        showMessage();
        form.reset();
      } else {
        alert("Something went wrong!");
      }
    })
    .catch(() => alert("Network error!"));
  });

  function showMessage() {
    const currentLang = document.documentElement.lang || "en";
    const messageBox = document.getElementById("form-message");

    if (currentLang === "ar") {
      messageBox.textContent = "تم إرسال الرسالة بنجاح!";
    } else {
      messageBox.textContent = "Message sent successfully!";
    }

    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
});
