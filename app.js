produits = [
    {
        image: "./images/lait_frais.jpg",
        nom: "Lait Frais Entier",
        statut: "Disponible",
        description: "Bouteille de 1L de lait frais de notre propre élevage laitier.",
        prix: 1000,
        boutton: "Ajouter au panier"
    },
    {
        image: "./images/panier_legume.png",
        nom: "Panier de Légumes",
        statut: "Disponible",
        description: "Assortiment de 5kg de légumes frais et bios récoltés ce matin.",
        prix: 10000,
        boutton: "Ajouter au panier"
    },
    {
        image: "./images/oeufs.jpg",
        nom: "Œufs de Plein Air",
        statut: "En Rupture",
        description: "Boîte de 12 œufs extra-frais pondus par nos poules élevées en plein air.",
        prix: 5000,
        boutton: "Indisponible"
    }
]

const grilleProduits = document.getElementById('grille-produits');

grilleProduits.innerHTML = ""
produits.forEach(produit => {
    let couleurBadge;
    let classeBouton;
    let etatBouton;
    if(produit.statut === "Disponible"){
        couleurBadge = "bg-success";
        classeBouton = "btn-outline-success";
        etatBouton = "";
    }
    else{
        couleurBadge = "bg-danger";
        classeBouton = "btn-secondary";
        etatBouton = "disabled"
    }
    const conteneur = `
        <div class="col carte-produit">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <img src="${produit.image}" class="card-img-top" alt="Lait Frais" data-bs-toggle="modal"
                        data-bs-target="#modalLait" style="height: 200px; object-fit: cover; cursor: pointer;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title fw-bold mb-0 nom-produit">${produit.nom}</h5>
                            <span class="badge ${couleurBadge}">${produit.statut}</span>
                        </div>
                        <p class="card-text text-muted small">${produit.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold text-dark fs-5">${produit.prix} FCFA</span>
                            <button class="btn ${classeBouton} btn-sm btn-ajouter" ${etatBouton}>${produit.boutton}</button>
                        </div>
                    </div>
                </div>
            </div>
    `;
    grilleProduits.insertAdjacentHTML('beforeend', conteneur);
});

const champRecherche = document.getElementById('champ-recherche');
const cartesProduits = document.querySelectorAll('.carte-produit');

// On ecoute chaque lettre tapée dans la barre de recherche
champRecherche.addEventListener('input', function() {
    const texteSaisi = champRecherche.value.toLowerCase().trim();

    cartesProduits.forEach(function(carte) {
        // On recupere le texte a l'interieur du h5 du produit
        const nomProduit = carte.querySelector('.nom-produit').textContent.toLowerCase();

        // Si le nom du produit contient les lettres tapees, on l'affiche, sinon on le cache
        if(nomProduit.includes(texteSaisi)){
            carte.classList.remove('d-none');
        }
        else {
            carte.classList.add('d-none');
        }
    });
});
let totalArticles = 0;
const compteurPanier = document.getElementById('compteur-panier');
const btnAjouter = document.querySelectorAll('.btn-ajouter')

btnAjouter.forEach(bouton => {
    bouton.addEventListener('click', () =>{
        totalArticles++;

        compteurPanier.textContent = totalArticles;
        compteurPanier.classList.remove('d-none');
    });
});