/* ========================================================================= */
/* Page Preloader
/* ========================================================================= */
$(window).on('load', function () {
    $('.preloader').fadeOut(100);
});

jQuery(function ($) {
    "use strict";

    /* ========================================================================= */
    /* lazy load initialize
    /* ========================================================================= */
    const observer = lozad(); // lazy loads elements with default selector as ".lozad"
    observer.observe();

    /* ========================================================================= */
    /* Magnific popup
    /* ========================================================================= */
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 160, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true,
        fixedContentPos: false,
        fixedBgPos: true
    });

    /* ========================================================================= */
    /* animation scroll js
    /* ========================================================================= */
    function myFunction(x) {
        if (x.matches) {
            var topOf = 50
        } else {
            var topOf = 350
        }
    }

    var html_body = $('html, body');
    $('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                html_body.animate({
                    scrollTop: target.offset().top - 50
                }, 1500, 'easeInOutExpo');
                return false;
            }
        }
    });

    // easeInOutExpo Declaration
    jQuery.extend(jQuery.easing, {
        easeInOutExpo: function (x, t, b, c, d) {
            if (t === 0) {
                return b;
            }
            if (t === d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });

    /* ========================================================================= */
    /* counter up
    /* ========================================================================= */
    function counter() {
        var oTop;
        if ($('.count').length !== 0) {
            oTop = $('.count').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.count').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }
    $(window).on('scroll', function () {
        counter();
    });

}); // Fine della funzione jQuery principale

/* ========================================================================= */
/* Contact Form Submission Handling for Netlify
/* ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Controlla se l'honeypot è stato compilato
        if (document.querySelector('input[name="bot-field"]').value !== '') {
            return; // Se l'honeypot è stato compilato, blocca l'invio
        }

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.style.display = "none"; // Nasconde il modulo
                successMessage.style.display = "block";
                errorMessage.style.display = "none";
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        errorMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        errorMessage.textContent = "Oops! C'è stato un problema con l'invio del modulo.";
                    }
                });
                successMessage.style.display = "none";
                errorMessage.style.display = "block";
            }
        })
        .catch(error => {
            errorMessage.textContent = "Oops! C'è stato un problema con l'invio del modulo.";
            console.error("Errore durante l'invio del modulo:", error);
            successMessage.style.display = "none";
            errorMessage.style.display = "block";
        });
    });
});


