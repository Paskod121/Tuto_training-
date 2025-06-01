// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments principaux
    const conteneurAccueil = document.querySelector('.landing-container');
    const contenuPrincipal = document.querySelector('.main-content');
    const boutonAction = document.querySelector('.cta-button');
    const champRecherche = document.querySelector('.search-input');
    const boutonRecherche = document.querySelector('.search-button');
    const liensNavigation = document.querySelectorAll('.nav-link');
    
    // Animation subtile au chargement de la page
    window.addEventListener('load', function() {
        document.body.classList.add('charge');
        
        // Animation séquentielle des éléments
        setTimeout(() => {
            document.querySelector('.hero-title').classList.add('anime');
        }, 300);
        
        setTimeout(() => {
            document.querySelector('.hero-description').classList.add('anime');
        }, 600);
        
        setTimeout(() => {
            boutonAction.classList.add('anime');
        }, 900);
    });
    
    // Fonction pour l'effet de parallaxe sur mouvement de souris
    function effetParallaxe(e) {
        const deplacementX = (e.clientX - window.innerWidth / 2) * 0.01;
        const deplacementY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        contenuPrincipal.style.backgroundPosition = `calc(50% + ${deplacementX}px) calc(50% + ${deplacementY}px)`;
    }
    
    // Application de l'effet de parallaxe
    contenuPrincipal.addEventListener('mousemove', effetParallaxe);
    
    // Fonctions pour l'animation du bouton d'action
    function animerBoutonEntree() {
        this.classList.add('survol');
    }
    
    function animerBoutonSortie() {
        this.classList.remove('survol');
    }
    
    // Application des animations au bouton
    boutonAction.addEventListener('mouseenter', animerBoutonEntree);
    boutonAction.addEventListener('mouseleave', animerBoutonSortie);
    
    // Fonctions pour les effets du champ de recherche
    function activerRecherche() {
        document.querySelector('.search-form').classList.add('active');
    }
    
    function desactiverRecherche() {
        document.querySelector('.search-form').classList.remove('active');
    }
    
    // Application des effets au champ de recherche
    champRecherche.addEventListener('focus', activerRecherche);
    champRecherche.addEventListener('blur', desactiverRecherche);
    
    // Fonction pour traiter la recherche
    function traiterRecherche() {
        if (champRecherche.value.trim() !== '') {
            // Animation de recherche
            this.classList.add('recherche-en-cours');
            champRecherche.disabled = true;
            
            // Simuler un délai de recherche puis rediriger
            setTimeout(() => {
                window.location.href = `main.html?search=${encodeURIComponent(champRecherche.value.trim())}`;
            }, 800);
        } else {
            // Animation de secousse si vide
            champRecherche.classList.add('secouer');
            setTimeout(() => {
                champRecherche.classList.remove('secouer');
            }, 600);
        }
    }
    
    // Appliquer le traitement de recherche
    boutonRecherche.addEventListener('click', traiterRecherche);
    
    // Permettre la recherche avec la touche Entrée
    champRecherche.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            traiterRecherche.call(boutonRecherche);
        }
    });
    
    // Fonction pour animer les éléments au défilement
    function animerAuDefilement() {
        const elementsAAnimer = document.querySelectorAll('.animer-au-defilement');
        
        elementsAAnimer.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const hauteurEcran = window.innerHeight;
            
            if (position < hauteurEcran * 0.8) {
                element.classList.add('visible');
            }
        });
    }
    
    // Appliquer l'animation au défilement si nécessaire
    window.addEventListener('scroll', animerAuDefilement);
    
    // Fonction pour gérer le clic sur le conteneur principal
    function naviguerVersMain(e) {
        // Permettre le focus sur les éléments interactifs sans redirection
        if (e.target.closest('.search-form') || e.target === champRecherche || e.target === boutonRecherche) {
            e.preventDefault();
            return;
        }
        
        // Ajouter un effet de transition avant la navigation
        document.body.classList.add('transition-sortie');
        
        // Délai court pour permettre l'animation
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    }
    
    // Appliquer la navigation avec transition
    conteneurAccueil.addEventListener('click', naviguerVersMain);
});