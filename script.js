/* =========================================
   VIOLET STUDIO
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------
       NAVBAR SCROLL EFFECT
    ------------------------------------- */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);


    /* -------------------------------------
       MOBILE MENU
    ------------------------------------- */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuButton.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Menüyü kapat" : "Menüyü aç"
            );
        });


        /* Close menu after clicking a link */

        const links = navLinks.querySelectorAll("a");

        links.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Menüyü aç"
                );

            });

        });
    }


    /* -------------------------------------
       CONTACT FORM
    ------------------------------------- */

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (!name || !email || !message) {

                formMessage.textContent =
                    "Lütfen tüm alanları doldur.";

                return;
            }


            /*
             * GitHub Pages sunucu taraflı form işlemi yapmaz.
             * Bu nedenle burada kullanıcıya demo mesajı gösteriyoruz.
             */

            formMessage.textContent =
                "Mesajın hazırlandı! Gerçek gönderim için form servisi bağlanmalı.";

            contactForm.reset();

        });

    }


    /* -------------------------------------
       SMOOTH SCROLL
    ------------------------------------- */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* -------------------------------------
       REVEAL ANIMATION
    ------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".service-card, .project, .about-content, .about-visual, .contact-box"
    );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        revealObserver.observe(element);

    });


    /* -------------------------------------
       REVEAL STYLE
    ------------------------------------- */

    const revealStyle = document.createElement("style");

    revealStyle.textContent = `
        .service-card.revealed,
        .project.revealed,
        .about-content.revealed,
        .about-visual.revealed,
        .contact-box.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(revealStyle);


    /* -------------------------------------
       CURRENT YEAR
    ------------------------------------- */

    const footerYear =
        document.querySelector(".footer p");

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.textContent =
            `© ${currentYear} Violet Studio. Tüm hakları saklıdır.`;

    }

});
