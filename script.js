document.querySelector("form").addEventListener("submit", function(event){

    event.preventDefault();

    const utilisateur = document.querySelector('input[type="text"]').value;
    const motDePasse = document.querySelector('input[type="password"]').value;

    if(utilisateur === "admin" && motDePasse === "1234"){
        window.location.href = "test.html";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect !");
    }

});