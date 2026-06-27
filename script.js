// =========================
// CONNEXION
// =========================

const formConnexion = document.getElementById("formConnexion");

if (formConnexion) {

    formConnexion.addEventListener("submit", function(event) {

        event.preventDefault();

        const utilisateur = document.querySelector('input[type="text"]').value;
        const motDePasse = document.querySelector('input[type="password"]').value;

        if (utilisateur === "admin" && motDePasse === "1234") {

            window.location.href = "dashboard.html";

        } else {

            alert("Nom d'utilisateur ou mot de passe incorrect !");

        }

    });

}

// =========================
// GESTION DES SOCIÉTÉS
// =========================

const formulaire = document.getElementById("formSociete");

if (formulaire) {

    formulaire.addEventListener("submit", function(event) {

        event.preventDefault();

        const nom = document.getElementById("nom").value;
        const ville = document.getElementById("ville").value;
        const pays = document.getElementById("pays").value;

        const tableau = document.getElementById("listeSocietes");

        tableau.innerHTML += `
            <tr>
                <td>${nom}</td>
                <td>${ville}</td>
                <td>${pays}</td>
                <td>✏️ 🗑️</td>
            </tr>
        `;

        formulaire.reset();

    });

}