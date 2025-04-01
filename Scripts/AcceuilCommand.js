// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM pour la recherche
    const champRecherche = document.getElementById('recherche');
    const boutonRecherche = document.getElementById('bouton-recherche');
    const cartesCommandes = document.querySelectorAll('.carte-commande');
    
    // Fonction pour filtrer les commandes en fonction de la recherche
    function filtrerCommandes() {
        // Récupération du texte recherché et conversion en minuscules
        const texteRecherche = champRecherche.value.toLowerCase();
        
        // Variable pour suivre si des résultats ont été trouvés
        let resultatsTrouves = false;
        
        // Parcours de toutes les cartes de commandes
        cartesCommandes.forEach(function(carte) {
            // Récupération du nom de la commande
            const nomCommande = carte.querySelector('h4').textContent.toLowerCase();
            // Récupération de la description de la commande
            const descriptionCommande = carte.querySelector('.carte-contenu p').textContent.toLowerCase();
            
            // Vérification si le texte recherché est présent dans le nom ou la description
            if (nomCommande.includes(texteRecherche) || descriptionCommande.includes(texteRecherche)) {
                carte.style.display = 'flex'; // Afficher la carte
                resultatsTrouves = true;
            } else {
                carte.style.display = 'none'; // Masquer la carte
            }
        });
        
        // Obtenir toutes les catégories de commandes
        const categories = document.querySelectorAll('.categorie-commande');
        
        // Vérifier chaque catégorie et masquer celles qui n'ont pas de commandes visibles
        categories.forEach(function(categorie) {
            const commandesVisibles = categorie.querySelectorAll('.carte-commande[style="display: flex;"]');
            if (commandesVisibles.length === 0) {
                categorie.style.display = 'none';
            } else {
                categorie.style.display = 'block';
            }
        });
        
        // Afficher un message si aucun résultat n'est trouvé
        const messageResultat = document.getElementById('message-resultats');
        if (!resultatsTrouves && texteRecherche !== '') {
            // Créer le message s'il n'existe pas
            if (!messageResultat) {
                const message = document.createElement('div');
                message.id = 'message-resultats';
                message.className = 'message-resultats';
                message.innerHTML = '<p>Aucune commande correspondant à votre recherche n\'a été trouvée.</p>';
                document.querySelector('.grille-commandes').prepend(message);
            } else {
                messageResultat.style.display = 'block';
            }
        } else if (messageResultat) {
            messageResultat.style.display = 'none';
        }
    }
    
    // Ajout d'un écouteur d'événement pour le bouton de recherche
    boutonRecherche.addEventListener('click', filtrerCommandes);
    
    // Ajout d'un écouteur d'événement pour la saisie dans le champ de recherche
    champRecherche.addEventListener('keyup', function(event) {
        // Vérification si la touche Entrée a été pressée
        if (event.key === 'Enter') {
            filtrerCommandes();
        }
    });
    
    // Ajout d'un effet de défilement fluide pour le bouton Découvrir
    document.querySelector('.bouton-decouvrir').addEventListener('click', function(e) {
        e.preventDefault();
        const cible = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: cible.offsetTop,
            behavior: 'smooth'
        });
    });
});