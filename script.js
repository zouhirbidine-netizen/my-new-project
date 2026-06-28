document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // PROTECTION DASHBOARD
    // =========================
    // =========================
// PROTECTION DES PAGES
// =========================

const page = window.location.pathname;

if (
    page.includes("dashboard.html") ||
    page.includes("societes.html") ||
    page.includes("factures.html") ||
    page.includes("fournisseurs.html") ||
    page.includes("litiges.html")
) {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
    }
}

    // =========================
    // CONNEXION
    // =========================

    const formConnexion = document.getElementById("formConnexion");

    if (formConnexion) {
        formConnexion.addEventListener("submit", function (event) {
            event.preventDefault();

            const utilisateur = document.getElementById("utilisateur").value.trim();
            const motDePasse = document.getElementById("motDePasse").value.trim();

            if (utilisateur === "admin" && motDePasse === "1234") {
                sessionStorage.setItem("loggedIn", "true");
window.location.replace("dashboard.html");
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect !");
            }
        });
    }

    // =========================
// DECONNEXION
// =========================

document.addEventListener("click", function (event) {

    if (event.target.matches(".btn-deconnexion")) {

        sessionStorage.clear();

        window.location.replace("index.html");
    }

});

    // =========================
    // LOCALSTORAGE
    // =========================

    function getSocietes() {
        return JSON.parse(localStorage.getItem("societes")) || [];
    }

    function saveSocietes(societes) {
        localStorage.setItem("societes", JSON.stringify(societes));
    }

    // =========================
    // TABLEAU
    // =========================

    const tableau = document.getElementById("listeSocietes");

    function afficherSocietes() {
        if (!tableau) return;

        const societes = getSocietes();
        tableau.innerHTML = "";

        societes.forEach((societe, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${societe.nom}</td>
                <td>${societe.ville}</td>
                <td>${societe.pays}</td>
                <td>
                    <button class="btn-modifier" data-index="${index}">✏️</button>
                    <button class="btn-supprimer" data-index="${index}">🗑️</button>
                </td>
            `;

            tableau.appendChild(tr);
        });
    }

    if (tableau) {
        tableau.addEventListener("click", function (e) {

            const index = e.target.getAttribute("data-index");

            if (e.target.classList.contains("btn-supprimer")) {
                supprimerSociete(index);
            }

            if (e.target.classList.contains("btn-modifier")) {
                modifierSociete(index);
            }
        });
    }

    function supprimerSociete(index) {
        if (!confirm("Voulez-vous vraiment supprimer cette société ?")) return;

        const societes = getSocietes();
        societes.splice(index, 1);
        saveSocietes(societes);
        afficherSocietes();
    }

    function modifierSociete(index) {
        const societes = getSocietes();
        const societe = societes[index];

        const nouveauNom = prompt("Nom :", societe.nom);
        const nouvelleVille = prompt("Ville :", societe.ville);
        const nouveauPays = prompt("Pays :", societe.pays);

        if (nouveauNom && nouvelleVille && nouveauPays) {
            societes[index] = {
                nom: nouveauNom.trim(),
                ville: nouvelleVille.trim(),
                pays: nouveauPays.trim()
            };

            saveSocietes(societes);
            afficherSocietes();
        }
    }

    // =========================
    // AJOUT SOCIETE
    // =========================

    const formulaire = document.getElementById("formSociete");

    if (formulaire) {
        formulaire.addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("nom").value.trim();
            const ville = document.getElementById("ville").value.trim();
            const pays = document.getElementById("pays").value.trim();

            const societes = getSocietes();

            societes.push({ nom, ville, pays });

            saveSocietes(societes);
            afficherSocietes();
            formulaire.reset();
        });
    }

    // =========================
    // INIT
    // =========================

    afficherSocietes();

});
// =========================
// GESTION DES FACTURES
// =========================

const montantHT = document.getElementById("montantHT");
const tva = document.getElementById("tva");
const montantTTC = document.getElementById("montantTTC");

function calculerTTC() {

    if (!montantHT || !tva || !montantTTC) return;

    const ht = parseFloat(montantHT.value) || 0;
    const tauxTVA = parseFloat(tva.value) || 0;

    const ttc = ht + (ht * tauxTVA / 100);

    montantTTC.value = ttc.toFixed(2);
}

if (montantHT && tva) {
    montantHT.addEventListener("input", calculerTTC);
    tva.addEventListener("input", calculerTTC);
}
// =========================
// LOCALSTORAGE FACTURES
// =========================

function getFactures() {
    return JSON.parse(localStorage.getItem("factures")) || [];
}

function saveFactures(factures) {
    localStorage.setItem("factures", JSON.stringify(factures));
}
// =========================
// AFFICHAGE DES FACTURES
// =========================

const listeFactures = document.getElementById("listeFactures");

function afficherFactures() {

    if (!listeFactures) return;

    const factures = getFactures();

    listeFactures.innerHTML = "";

    factures.forEach((facture, index) => {

        listeFactures.innerHTML += `
            <tr>
                <td>${facture.numero}</td>
                <td>${facture.fournisseur}</td>
                <td>${facture.societe}</td>
                <td>${facture.date}</td>
                <td>${facture.ttc} ${facture.devise}</td>
                <td>${facture.statut}</td>
                <td>${facture.litige}</td>

                <td>
                    <button class="btn-modifier" onclick="modifierFacture(${index})">✏️</button>

                    <button class="btn-supprimer" onclick="supprimerFacture(${index})">🗑️</button>
                </td>
            </tr>
        `;
    });

}

afficherFactures();
// =========================
// AJOUT FACTURE
// =========================

const formFacture = document.getElementById("formFacture");

if (formFacture) {

    formFacture.addEventListener("submit", function(e) {

        e.preventDefault();

        const facture = {

            numero: document.getElementById("numeroFacture").value,

            fournisseur: document.getElementById("fournisseur").value,

            societe: document.getElementById("societe").value,

            date: document.getElementById("dateFacture").value,

            ttc: document.getElementById("montantTTC").value,

            devise: document.getElementById("devise").value,

            statut: document.getElementById("statut").value,

            litige: document.getElementById("litige").value

        };

        const factures = getFactures();

        factures.push(facture);

        saveFactures(factures);

        afficherFactures();

        formFacture.reset();

        montantTTC.value = "";

    });

}
// =========================
// SUPPRIMER FACTURE
// =========================

function supprimerFacture(index) {

    if (!confirm("Voulez-vous supprimer cette facture ?")) return;

    const factures = getFactures();

    factures.splice(index, 1);

    saveFactures(factures);

    afficherFactures();
}

// =========================
// MODIFIER FACTURE
// =========================

function modifierFacture(index) {

    const factures = getFactures();

    const facture = factures[index];

    const numero = prompt("Numéro de facture :", facture.numero);
    const fournisseur = prompt("Fournisseur :", facture.fournisseur);
    const societe = prompt("Société :", facture.societe);
    const date = prompt("Date :", facture.date);
    const ttc = prompt("Montant TTC :", facture.ttc);
    const devise = prompt("Devise :", facture.devise);
    const statut = prompt("Statut :", facture.statut);
    const litige = prompt("Litige :", facture.litige);

    if (
        numero &&
        fournisseur &&
        societe &&
        date &&
        ttc &&
        devise &&
        statut &&
        litige
    ) {

        factures[index] = {
            ...facture,
            numero,
            fournisseur,
            societe,
            date,
            ttc,
            devise,
            statut,
            litige
        };

        saveFactures(factures);

        afficherFactures();
    }

}