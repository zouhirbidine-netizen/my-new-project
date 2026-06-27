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
               <td>
    <button class="btn-modifier" onclick="modifierSociete(this)">
        ✏️
    </button>

    <button class="btn-supprimer" onclick="supprimerSociete(this)">
        🗑️
    </button>
</td>
            </tr>
        `;

        formulaire.reset();

    });

}
// =========================
// SUPPRIMER UNE SOCIÉTÉ
// =========================

function supprimerSociete(bouton) {

    const confirmation = confirm("Voulez-vous vraiment supprimer cette société ?");

    if (confirmation) {

        const ligne = bouton.parentElement.parentElement;

        ligne.remove();

    }

}
// =========================
// MODIFIER UNE SOCIÉTÉ
// =========================

function modifierSociete(bouton) {

    const ligne = bouton.parentElement.parentElement;

    const cellules = ligne.getElementsByTagName("td");

    const nouveauNom = prompt("Nom :", cellules[0].textContent);
    const nouvelleVille = prompt("Ville :", cellules[1].textContent);
    const nouveauPays = prompt("Pays :", cellules[2].textContent);

    if (nouveauNom && nouvelleVille && nouveauPays) {

        cellules[0].textContent = nouveauNom;
        cellules[1].textContent = nouvelleVille;
        cellules[2].textContent = nouveauPays;

    }

}