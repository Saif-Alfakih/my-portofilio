// ========== DOM Elements ==========
const wordsContainer = document.querySelector(".words");
const skillsSection = document.querySelector("#skills");
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const header = document.querySelector(".header");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const form = document.getElementById("contact-form");

// ========== Word Animation ==========
let currentWordIndex = 0;
let words = [];
let maxWordIndex = 0;
let changeInterval;

function buildWordsFromArray(wordArray) {
    if (!wordsContainer) {
        console.error("Error: Element with class '.words' not found in the DOM.");
        return;
    }

    wordsContainer.innerHTML = "";
    words = [];
    const isArabic = document.documentElement.lang === "ar";

    wordArray.forEach((text) => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word");

        if (isArabic) {
            const span = document.createElement("span");
            span.textContent = text;
            span.className = "letter";
            wordDiv.appendChild(span);
        } else {
            text.split("").forEach((char) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.className = "letter";
                wordDiv.appendChild(span);
            });
        }

        wordDiv.style.opacity = "0";
        wordsContainer.appendChild(wordDiv);
        words.push(wordDiv);
    });

    currentWordIndex = 0;
    maxWordIndex = words.length - 1;
    if (words.length > 0) words[0].style.opacity = "1";
}

function changeText() {
    const currentWord = words[currentWordIndex];
    if (!currentWord) {
        console.error("currentWord is undefined. Check the 'words' array and 'currentWordIndex'.");
        return;
    }

    const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => letter.className = "letter out", i * 80);
    });

    if (nextWord) {
        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => letter.className = "letter in", 340 + i * 80);
        });
    }

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}

function updateAnimatedWords(newWords) {
    clearInterval(changeInterval);
    buildWordsFromArray(newWords);
    changeText();
    changeInterval = setInterval(changeText, 3000);
}

// ========== Skills Section ==========
function activateSkillCircles() {
    document.querySelectorAll(".circle").forEach((elem) => {
        const dots = elem.getAttribute("data-dots");
        const marked = elem.getAttribute("data-percent");
        const percent = Math.floor((dots * marked) / 100);
        const rotate = 360 / dots;
        let points = "";

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }

        elem.innerHTML = points;
        markPointsSequentially(Array.from(elem.querySelectorAll(".points")).slice(0, percent));
    });
}

function markPointsSequentially(points, index = 0) {
    if (index >= points.length) return;
    points[index].classList.add("marked");
    requestAnimationFrame(() => {
        setTimeout(() => markPointsSequentially(points, index + 1), 10);
    });
}

function animateTechnicalBars() {
    const skillPercents = {
        html: "72%",
        css: "62%",
        javascript: "80%",
        figma: "90%",
    };

    document.querySelectorAll(".skill-left .skill-bar .bar span").forEach((bar) => {
        const skillClass = Array.from(bar.classList).find(cls => cls !== "");
        if (!skillClass) return;

        bar.style.transition = "none";
        bar.style.width = "0";

        requestAnimationFrame(() => {
            bar.style.transition = "width 2s ease";
            bar.style.width = skillPercents[skillClass] || "0%";
        });
    });
}

function updateSkillsTranslation() {
    const skillsTranslation = {
        en: {
            teamwork: "Team Work",
            "problem-solving": "Problem Solving",
            "time-management": "Time Management",
            creativity: "Creativity",
        },
        ar: {
            teamwork: "العمل الجماعي",
            "problem-solving": "حل المشكلات",
            "time-management": "إدارة الوقت",
            creativity: "الإبداع",
        },
    };

    const currentLang = document.documentElement.lang || "en";
    document.querySelectorAll(".box .text small").forEach((elem) => {
        const key = elem.getAttribute("data-translate")?.replace("skill-", "");
        if (key && skillsTranslation[currentLang]?.[key]) {
            elem.textContent = skillsTranslation[currentLang][key];
        }
    });
}

// ========== Navigation ==========
function activeMenu() {
    let len = document.querySelectorAll("section").length;
    while (--len && window.scrollY + 97 < document.querySelectorAll("section")[len].offsetTop) {}
    document.querySelectorAll(".header ul li a").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".header ul li a")[len]?.classList.add("active");
}

// ========== Event Listeners ==========
document.addEventListener("DOMContentLoaded", () => {
    // Initialize word animation
    const lang = document.documentElement.lang || "en";
    const wordsList = window.translations?.[lang]?.["home-words"] || [];
    updateAnimatedWords(wordsList);

    // Initialize skills section observer
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateSkillCircles();
                    animateTechnicalBars();
                    updateSkillsTranslation();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(skillsSection);
    }

    // Initialize form submission
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            })
            .then(response => {
                if (response.ok) {
                    const messageBox = document.getElementById("form-message");
                    const currentLang = document.documentElement.lang || "en";
                    messageBox.textContent = window.translations?.[currentLang]?.["form-success"] || "Message sent successfully!";
                    messageBox.style.display = "block";
                    messageBox.style.color = "#00ffae";
                    form.reset();
                    setTimeout(() => messageBox.style.display = "none", 5000);
                }
            });
        });
    }
});

// Scroll events
window.addEventListener("scroll", () => {
    activeMenu();
    header.classList.toggle("sticky", window.scrollY > 50);
    
    if (navlist.classList.contains("open")) {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "auto";
    }
});

// Menu toggle
if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
        document.body.classList.toggle("nav-open");
        document.body.style.overflow = navlist.classList.contains("open") ? "hidden" : "auto";
    });
}

// Scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show-items", entry.isIntersecting);
    });
}, { threshold: 0.1 });

document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top").forEach(el => {
    scrollObserver.observe(el);
});

// Language switchers
document.querySelectorAll(".lang-switcher button").forEach(btn => {
    btn.addEventListener("click", () => setTimeout(updateSkillsTranslation, 300));
});

// Initialize mixitup
if (typeof mixitup !== "undefined") {
    mixitup(".portfolio-gallery");
}