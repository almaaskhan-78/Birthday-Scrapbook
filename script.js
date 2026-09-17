// ===============================
// COVER PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openBtn");

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            window.location.href = "lock.html";
        });
    }

    // Start typing only on letter page
    if (document.getElementById("letterText")) {
        typeLetter();
    }

    // Create petals only if container exists
    if (document.getElementById("petals")) {
        createPetals();
    }

    // Create memory game only if grid exists
    if (document.getElementById("grid")) {
        createMemoryGame();
    }

});


// ===============================
// LOCK PAGE
// ===============================

const CORRECT_PASSWORD = "250707";

function checkPassword() {

    const input = document.getElementById("password");

    if (!input) return;

    if (input.value === CORRECT_PASSWORD) {

        document.body.style.opacity = "0";
        document.body.style.transition = "0.5s";

        setTimeout(() => {
            window.location.href = "envelope.html";
        }, 500);

    } else {

        alert("Wrong password 😭 Try again!");

    }

}


// ===============================
// ENVELOPE PAGE
// ===============================

function openEnvelope() {

    const envelope = document.querySelector(".envelope-container");

    if (envelope) {

        envelope.style.opacity = "0";
        envelope.style.transition = "0.5s";

        setTimeout(() => {
            window.location.href = "letter.html";
        }, 500);

    }

}


// ===============================
// LETTER PAGE
// ===============================

const text = `Dear Ayesha,

This is made just for you ❤️

Every page, every detail, every moment... is filled with care and memories.

On your special day, I wish you a lifetime of smiles, a heart full of dreams, and adventures that make every moment worth living.

Have a fantastic birthday and an even more incredible year!!!

— Almaas`;

let i = 0;

function typeLetter() {

    const letter = document.getElementById("letterText");

    if (!letter) return;

    if (i < text.length) {

        letter.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeLetter, 35);

    }

}


// ===============================
// PETALS
// ===============================

function createPetals() {

    const container = document.getElementById("petals");

    if (!container) return;

    for (let i = 0; i < 20; i++) {

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.innerHTML = "🌸";

        petal.style.left = Math.random() * 100 + "vw";
        petal.style.fontSize = (Math.random() * 20 + 10) + "px";
        petal.style.animationDuration = (Math.random() * 5 + 5) + "s";
        petal.style.animationDelay = Math.random() * 3 + "s";

        container.appendChild(petal);

    }

}


// ===============================
// MEMORY GAME
// ===============================

function createMemoryGame() {

    const emojis = [
        "🌸","🌸",
        "💖","💖",
        "🎀","🎀",
        "🧸","🧸",
        "⭐","⭐",
        "🍰","🍰",
        "🦋","🦋",
        "🌙","🌙",
        "💌","💌",
        "🎂","🎂"
    ];

    const grid = document.getElementById("grid");
    const msg = document.getElementById("msg");
    const nextBtn = document.getElementById("nextBtn");

    emojis.sort(() => Math.random() - 0.5);

    let first = null;
    let second = null;
    let lock = false;
    let matched = 0;

    emojis.forEach(symbol => {

        const card = document.createElement("div");

        card.className = "card";
        card.innerHTML = "❓";
        card.dataset.symbol = symbol;

        card.onclick = () => {

            if (lock || card === first) return;

            card.innerHTML = symbol;

            if (!first) {
                first = card;
                return;
            }

            second = card;

            if (first.dataset.symbol === second.dataset.symbol) {

                matched += 2;
                msg.innerHTML = "Nice! 💖";

                first = null;
                second = null;

                if (matched === emojis.length) {

                    msg.innerHTML = "🎉 You Win!";

                    if (nextBtn) {
                        nextBtn.style.display = "inline-block";
                    }

                }

            } else {

                lock = true;
                msg.innerHTML = "Try Again 🌸";

                setTimeout(() => {

                    first.innerHTML = "❓";
                    second.innerHTML = "❓";

                    first = null;
                    second = null;
                    lock = false;

                }, 800);

            }

        };

        grid.appendChild(card);

    });

}
/* ==========================================
            PHOTO PAGE
========================================== */

let photosOpened = 0;

function revealPhoto(card, number){

    // Don't reveal twice
    if(card.classList.contains("revealed")){
        return;
    }

    card.classList.add("revealed");

    const photo = card.querySelector(".photo");

    // Small zoom animation
    card.style.transform += " scale(1.03)";

    setTimeout(() => {

        photo.innerHTML = `
            <img src="images/photo${number}.jpg"
                alt="Memory ${number}"
                class="memory-photo">
        `;

        // Fade in image
        const img = photo.querySelector("img");

        img.style.opacity = "0";
        img.style.transition = "opacity .6s ease";

        setTimeout(()=>{
            img.style.opacity = "1";
        },50);

    },250);

    photosOpened++;

    if(photosOpened === 3){

        setTimeout(()=>{

            const btn = document.getElementById("finishBtn");

            btn.style.display = "block";

            btn.animate([
                {
                    opacity:0,
                    transform:"translateY(20px)"
                },
                {
                    opacity:1,
                    transform:"translateY(0)"
                }
            ],{

                duration:700,
                fill:"forwards"

            });

        },600);

    }

}
/* ==========================================
            ENDING PAGE
========================================== */

const endingMessage = `I hope this little scrapbook made you smile,
even if just for a little while. 💖
Every page...Every tiny detail...Every surprise...was made with lots of care,
just for you.
I hope this year brings you endless happiness,beautiful memories,lots of laughter,and everything your heart wishes for.thank you for taking this little journey.
Happy Birthday once again, Ayesha. 🌸

With lots of love,
— Almaas 🤍`;

let endingIndex = 0;

function typeEnding(){

    const text = document.getElementById("endingText");

    if(!text) return;

    if(endingIndex < endingMessage.length){

        text.innerHTML += endingMessage.charAt(endingIndex);

        endingIndex++;

        setTimeout(typeEnding,35);

    }else{

        const btn=document.getElementById("restartBtn");

        btn.style.display="inline-block";

        btn.style.opacity="0";

        btn.style.transition="opacity .8s";

        setTimeout(()=>{

            btn.style.opacity="1";

        },100);

    }

}

/* Start typing */

document.addEventListener("DOMContentLoaded",()=>{

    if(document.getElementById("endingText")){

        typeEnding();

        createEndingPetals();

    }

});

/* Continuous Petals */

function createEndingPetals(){

    const container=document.getElementById("petals");

    if(!container) return;

    setInterval(()=>{

        const petal=document.createElement("div");

        petal.classList.add("petal");

        petal.innerHTML="🌸";

        petal.style.left=Math.random()*100+"vw";

        petal.style.fontSize=(Math.random()*20+15)+"px";

        petal.style.animationDuration=(Math.random()*4+5)+"s";

        container.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },9000);

    },250);

}