document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // PROTECTION DASHBOARD
    // =========================
    if (window.location.pathname.includes("dashboard.html")) {
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
                window.location.href = "dashboard.html";
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect !");
            }
        });
    }

    // =========================
    // DECONNEXION
    // =========================

    const btnDeconnexion = document.querySelector(".btn-deconnexion");

    if (btnDeconnexion) {
        btnDeconnexion.addEventListener("click", function () {
            sessionStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    }

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