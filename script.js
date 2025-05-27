let wordsContainer = document.querySelector(".words"); // تأكد من وجود هذا العنصر الذي يحتوي على .word
if (!wordsContainer) {
    console.error("Error: Element with class '.words' not found in the DOM.");
}
let currentWordIndex = 0;
let words = [];
let maxWordIndex = 0;
let changeInterval;

function buildWordsFromArray(wordArray) {
    wordsContainer.innerHTML = "";
    words = [];

    const isArabic = document.documentElement.lang === 'ar';

    wordArray.forEach(text => {
        let wordDiv = document.createElement("div");
        wordDiv.classList.add("word");

        if (isArabic) {
            // كلمة واحدة متصلة للحروف العربية
            let span = document.createElement("span");
            span.textContent = text;
            span.className = "letter";
            wordDiv.appendChild(span);
        } else {
            // تقسيم للحروف الإنجليزية
            text.split("").forEach(char => {
                let span = document.createElement("span");
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
    if (words.length > 0) {
        words[0].style.opacity = "1";
    }
}

function changeText() {
    let currentWord = words[currentWordIndex];

    // Check if currentWord is defined before trying to access its children
    if (currentWord) {
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        // Also check if nextWord is defined before accessing its properties
        if (nextWord) {
            nextWord.style.opacity = "1";
            Array.from(nextWord.children).forEach((letter, i) => {
                letter.className = "letter behind";
                setTimeout(() => {
                    letter.className = "letter in";
                }, 340 + (i * 80));
            });
        }

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    } else {
        console.error("currentWord is undefined. Check the 'words' array and 'currentWordIndex'.");
        // You might want to add logic here to handle the undefined case,
        // for example, resetting currentWordIndex or stopping the animation.
    }
}

// تحديث النصوص مع تبديل اللغة

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
        markPointsSequentially(Array.from(pointsMarked).slice(0, percent));
    });
}

function markPointsSequentially(points, index = 0) {
    if (index >= points.length) return;
    points[index].classList.add('marked');
    requestAnimationFrame(() => {
        setTimeout(() => markPointsSequentially(points, index + 1), 10);
    });
}

function animateTechnicalBars() {
    const bars = document.querySelectorAll('.skill-left .skill-bar .bar span');

    const skillPercents = {
        html: '72%',
        css: '62%',
        javascript: '80%',
        figma: '90%'
    };

    bars.forEach(bar => {
        const classList = Array.from(bar.classList);
        const skillClass = classList.find(cls => cls !== '');
        if (!skillClass) return;

        const targetWidth = skillPercents[skillClass] || '0%';

        bar.style.transition = 'none';
        bar.style.width = '0';

        requestAnimationFrame(() => {
            bar.style.transition = 'width 2s ease';
            bar.style.width = targetWidth;
        });
    });
}
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
        markPointsSequentially(Array.from(pointsMarked).slice(0, percent));
    });
}

function markPointsSequentially(points, index = 0) {
    if (index >= points.length) return;
    points[index].classList.add('marked');
    requestAnimationFrame(() => {
        setTimeout(() => markPointsSequentially(points, index + 1), 10);
    });
}

function animateTechnicalBars() {
    const bars = document.querySelectorAll('.skill-left .skill-bar .bar span');

    const skillPercents = {
        html: '72%',
        css: '62%',
        javascript: '80%',
        figma: '90%'
    };

    bars.forEach(bar => {
        const classList = Array.from(bar.classList);
        const skillClass = classList.find(cls => cls !== '');
        if (!skillClass) return;

        const targetWidth = skillPercents[skillClass] || '0%';

        bar.style.transition = 'none';
        bar.style.width = '0';

        requestAnimationFrame(() => {
            bar.style.transition = 'width 2s ease';
            bar.style.width = targetWidth;
        });
    });
}

// ✅ مراقبة دخول وخروج قسم المهارات
// ✅ تفعيل دوائر المهارات بناءً على عدد النقاط ونسبة الإنجاز
function activateSkillCircles() {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(elem => {
        const dots = elem.getAttribute("data-dots");      // إجمالي عدد النقاط في الدائرة
        const marked = elem.getAttribute("data-percent"); // النسبة المئوية التي يجب تلوينها
        const percent = Math.floor(dots * marked / 100);  // عدد النقاط المعلّمة فعليًا
        const rotate = 360 / dots;                        // درجة الدوران لكل نقطة
        let points = "";

        // بناء جميع النقاط داخل الدائرة
        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }

        elem.innerHTML = points; // إدراج النقاط داخل العنصر

        // تفعيل النقاط المعلّمة تدريجيًا
        const pointsMarked = elem.querySelectorAll('.points');
        markPointsSequentially(Array.from(pointsMarked).slice(0, percent));
    });
}

// ✅ تلوين النقاط واحدة تلو الأخرى (مؤثر تدرّجي جميل)
function markPointsSequentially(points, index = 0) {
    if (index >= points.length) return;
    points[index].classList.add('marked'); // تلوين النقطة
    requestAnimationFrame(() => {
        setTimeout(() => markPointsSequentially(points, index + 1), 10); // مؤثر تدريجي
    });
}

// ✅ تحريك أشرطة المهارات التقنية (html, css, js...)
function animateTechnicalBars() {
    const bars = document.querySelectorAll('.skill-left .skill-bar .bar span');

    // تعريف النسب لكل مهارة
    const skillPercents = {
        html: '72%',
        css: '62%',
        javascript: '80%',
        figma: '90%'
    };

    bars.forEach(bar => {
        const classList = Array.from(bar.classList);
        const skillClass = classList.find(cls => cls !== '');
        if (!skillClass) return;

        const targetWidth = skillPercents[skillClass] || '0%';

        // إعادة ضبط أولي
        bar.style.transition = 'none';
        bar.style.width = '0';

        // تفعيل الحركة
        requestAnimationFrame(() => {
            bar.style.transition = 'width 6s ease';
            bar.style.width = targetWidth;
        });
    });
}

// ✅ مراقبة دخول وخروج قسم المهارات لتفعيل/إعادة تعيين التأثيرات
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
    let isVisible = false; // حالة تتبع إن كان القسم ظاهرًا بالكامل أم لا

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isVisible) {
                // 🟢 دخول القسم (تفعيله مرة واحدة فقط)
                isVisible = true;
                activateSkillCircles();
                animateTechnicalBars();
                updateSkillsTranslation(); // تحديث ترجمة الكلمات داخل الدوائر
            } else if (!entry.isIntersecting && isVisible) {
                // 🔴 الخروج الكامل من القسم (إعادة تعيين كل شيء)
                isVisible = false;

                // إعادة ضبط الدوائر (تفريغها)
                document.querySelectorAll('.circle').forEach(circle => {
                    circle.innerHTML = '';
                });

                // إعادة تعيين أشرطة التقدم
                document.querySelectorAll('.skill-left .skill-bar .bar span').forEach(bar => {
                    bar.style.transition = 'none';
                    bar.style.width = '0';
                });
            }
        });
    }, {
        threshold: 0.2 // القسم يجب أن يكون ظاهرًا بنسبة 40% لتفعيل التأثير
    });

    observer.observe(skillsSection); // تفعيل المراقبة على قسم المهارات
}

// ✅ ترجمة نصوص المهارات الشخصية حسب اللغة الحالية (العربية أو الإنجليزية)
function updateSkillsTranslation() {
    const skillsTranslation = {
        en: {
            teamwork: "Team Work",
            "problem-solving": "Problem Solving",
            "time-management": "Time Management",
            creativity: "Creativity"
        },
        ar: {
            teamwork: "العمل الجماعي",
            "problem-solving": "حل المشكلات",
            "time-management": "إدارة الوقت",
            creativity: "الإبداع"
        }
    };

    const currentLang = document.documentElement.lang || 'en';

    document.querySelectorAll('.box .text small').forEach(elem => {
        const key = elem.getAttribute('data-translate')?.replace("skill-", "");
        if (key && skillsTranslation[currentLang] && skillsTranslation[currentLang][key]) {
            elem.textContent = skillsTranslation[currentLang][key];
        }
    });
}

// ✅ تحديث الترجمة عند تغيير اللغة (عبر أزرار التبديل)
document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(updateSkillsTranslation, 300); // تأخير بسيط للسماح بتبديل اللغة
    });
});

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

// تأثير Scroll (parallax effect) لجميع الأقسام
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
}, { threshold: 0.1 }); // لجعل التفاعل أكثر حساسية

// راقب جميع العناصر ذات التأثير
document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top").forEach(el => {
  observer.observe(el);
});

// زر الرجوع لأعلى
const scrollTopBtn = document.getElementById("scrollTopBtn");
const footer = document.getElementById("footer");

// راقب فقط الفوتر لإظهار الزر عنده
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });
}, { threshold: 0.5 });

footerObserver.observe(footer);


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

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
    const successMessage = translations[currentLang]["form-success"];

    messageBox.textContent = successMessage;
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
});




document.addEventListener("languageChanged", () => {
    const imgWrapper = document.querySelector(".img-wrapper");
    if (!imgWrapper) return;

    imgWrapper.classList.remove("animate-profile");

    // إعادة التحريك بعد إعادة الإضافة مع delay بسيط
    void imgWrapper.offsetWidth; // إجبار المتصفح على إعادة الحساب
    setTimeout(() => {
        imgWrapper.classList.add("animate-profile");
    }, 50);
});


