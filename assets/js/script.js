//navbar
let lastScrollTop = 0;
navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  // scroll top est la une mesure pour dire si on scroll en haut ou en bas sur la page//
  const scrollTop =
    window.pageTOffset || //si scroll top est superieur au dernier scroll la nav bar disparait//
    this.document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "50px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

//TYPED
var typed = new Typed(".typed", {
  strings: [
    "Bonjour, à propos de moi en quelques mots Je me présente je m'appelle Laurent",
    "Après une carrière comme cuisinier puis comme responsable d'atelier en menuiserie pvc section sanitaire ainsi que d'autres petits boulots, j'ai décidé d'attaquer une reconversion professionnelle dans le Developpement informatique en integrant une formation de concepteur developpeur d'applications. Etant attiré par l'informatique ainsi que le codage je démarre une formation de 6 mois puis j'espere trouver une alternance de 12 mois me permettant de renforcer mes bases et ainsi reussir ma reconversion professionnelle dans ce domaine",
  ],
  typeSpeed: 20,
});

// COMPTEUR LIVE//
let compteur = 0;
$(window).scroll(function () {
  const top = $(".counter").offset().top - window.innerHeight;

  if (compteur == 0 && $(window).scrollTop() > top) {
    $(".counter-value").each(function () {
      let $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 10000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    compteur = 1;
  }
});
// AOS 
AOS.init();
