document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const h1 = document.querySelector("#tl");
    const m1 = document.querySelector("#m1");
    const m2 = document.querySelector("#m2");
    const m3 = document.querySelector("#m3");
    const m4 = document.querySelector("#m4");

    menuToggle.addEventListener('click', () => {
        menu.style.opacity = 1;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    h1.addEventListener('click', () => {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = 1; 
        changeSection(-1);
    });

    const originalText = h1.innerText;
    const letters = "01001101";
    let isShuffling = false;

    const startShuffling = (callback = null) => {
        if (isShuffling) return;
        isShuffling = true;
        let iteration = 0;
        const originalValue = h1.innerText;
        const revealedIndices = new Set();
        const interval = setInterval(() => {
            h1.innerText = originalValue.split("").map((letter, index) => {
                if (revealedIndices.has(index)) {
                    return originalValue[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("");
            while (revealedIndices.size < iteration && revealedIndices.size < originalValue.length) {
                const randomIndex = Math.floor(Math.random() * originalValue.length);
                revealedIndices.add(randomIndex);
            }
            if (revealedIndices.size >= originalValue.length) {
                clearInterval(interval);
                h1.innerText = originalText;
                isShuffling = false;
                if (callback) callback();
            }
            iteration++;
        }, 40);
    };
    startShuffling(() => {
        h1.addEventListener("mouseover", () => startShuffling());
    });

    const sections = document.querySelectorAll('section');
    const image = document.getElementById('image');
    let currentSectionIndex = 0;
    let isScrolling = false;

    m1.addEventListener('click', () => {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = 0; 
        changeSection(1);
        fade();
    });
    m2.addEventListener('click', () => {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = 1; 
        changeSection(1);
        fade();
    });
    m3.addEventListener('click', () => {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = 2; 
        changeSection(1);
        fade();
    });
    m4.addEventListener('click', () => {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = 3; 
        changeSection(1);
        fade();
    });

    function fade() {
        if(window.innerWidth <= 769){
            var i = 10;
            menu.style.opacity = 1;
            var k = window.setInterval(function() {
                if (i <= 0) {
                    clearInterval(k);
                } else {
                    menu.style.opacity = i / 10;
                    i=i-0.2;
                }
            }, 10);
            setTimeout(() => {
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }, 300);
        }       
    }

    function changeSection(delta) {
        if (isScrolling) return;
        isScrolling = true;

        const nextSectionIndex = Math.min(
            Math.max(currentSectionIndex + delta, 0),
            sections.length - 1
        );

        if (nextSectionIndex === currentSectionIndex) {
            isScrolling = false;
            return;
        }

        sections[currentSectionIndex].classList.remove('active');
        sections[nextSectionIndex].classList.add('active');

        currentSectionIndex = nextSectionIndex;

        setTimeout(() => {
            isScrolling = false;
        }, 500); 
    }

    let touchStartY = 0; 

    window.addEventListener('wheel', (e) => {
        const delta = e.deltaY > 0 ? 1 : -1;
        changeSection(delta);
    });

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault();

        const touchEndY = e.touches[0].clientY;
        const delta = touchStartY - touchEndY;

        if (Math.abs(delta) > 50) {
            changeSection(delta > 0 ? 1 : -1); 
            touchStartY = touchEndY; 
        }
    }, { passive: false });

    let mouseX = 0;
    let mouseY = 0;
    let isMouseOverImage = false;

    image.addEventListener('mouseenter', () => {
        isMouseOverImage = true;
    });

    image.addEventListener('mouseleave', () => {
        isMouseOverImage = false;
    });

    window.addEventListener('mousemove', (event) => {
        if (isMouseOverImage) {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            image.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${mouseY * 10}deg)`;
        }
    });

    sections.forEach((section, index) => {
        if (index !== 0) {
            section.classList.remove('active');
        }
    });
});