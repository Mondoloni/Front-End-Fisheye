//Recupération de la balise modal, main et lightbox modal
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const ligtBoxModal = document.getElementById("lightbox_modal");

//La fonction est utilisé au click sur le bouton Contactez-moi

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function displayModal() {

	const inputprenom = document.getElementById("prenom");
	//On modifie l'attribut aria-hidden a false pour la modal contact
	//et a true pour la modal Lightbox et la page principale
	modal.setAttribute("aria-hidden", "false");
	main.setAttribute("aria-hidden", "true");
	ligtBoxModal.setAttribute("aria-hidden", "true");
	//On affiche la modal contact et on cahe la modal LightBox
	modal.style.display = "block";
	ligtBoxModal.display = "none";
	//On met le focus sur le champ prenom
	inputprenom.focus();
}

function closeModal() {
	//La fonction est utilisé au click sur le bouton fermé X de la modal
	//On modifie l'attribut aria-hidden a true pour la modal contact
	//et a false pour la modal Lightbox et la page principale
	modal.setAttribute("aria-hidden", "true");
	main.setAttribute("aria-hidden", "false");
	//On masque la modal Contact
	modal.style.display = "none";
}

// On écoute l'appui de la touche echap et on lance la fonction closeModal()
document.addEventListener("keydown", (e) => {
	const keyCode = e.keyCode ? e.keyCode : e.which;
	if (modal.getAttribute("aria-hidden") == "false" && keyCode === 27) {
		closeModal();
	}
});

const form = document.querySelector("form");
// Ajout d'un évévement lorsque l'on submit le formulaire
form.addEventListener("submit", (event) => {
	// On empêche le comportement par défaut
	event.preventDefault();

	// Test si tous les champs sont valides à l'aide de fonction
	if (
		validerChampCivilite("prenom", "Prénom")
		&& validerChampCivilite("nom", "Nom")
		&& validerEmail("email")
		&& validerChampMessage("message", "Message")
	) {
		console.log(document.getElementById("prenom").value);
		console.log(document.getElementById("nom").value);
		console.log(document.getElementById("email").value);
		console.log(document.getElementById("message").value);
		closeModal();
	}
});

function validerChampCivilite(balise, texte) {
	// Récupération de la balise
	const baliseAValider = document.getElementById(`${balise}`);
	// Appel de la fonction viderBaliseErreur afin de supprimer le message d'erreur
	// d'une precedente valiaton du formulaire
	viderBaliseErreur(balise);
	try {
		if (baliseAValider.value.length < 2) {
			throw new Error(
				`Veuillez entrer 2 caractères ou plus pour le champ du ${texte}. `,
			);
		}
		return true;
	} catch (erreur) {
		afficherMessageErreur(erreur.message, balise);
	}
}

function validerChampMessage(balise, texte) {
	// Récupération de la balise
	const baliseAValider = document.getElementById(`${balise}`);
	// Appel de la fonction viderBaliseErreur afin de supprimer le message d'erreur
	// d'une precedente valiaton du formulaire
	viderBaliseErreur(balise);
	try {
		if (baliseAValider.value.length < 20) {
			throw new Error(
				`Veuillez entrer 20 caractères ou plus pour le champ du ${texte}. `,
			);
		}
		return true;
	} catch (erreur) {
		afficherMessageErreur(erreur.message, balise);
	}
}

/**
**Cette fonction prend un paramètre : l'id de la balise email
cette fonction valide qu'un champ email est au bon format
* ici : XX@XX.XX
*Retourne vrai si le champ est valide
*/
function validerEmail(email) {
	const baliseEmail = document.getElementById(`${email}`);
	const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
	// Appel de la fonction viderBaliseErreur afin de supprimer le message d'erreur
	// d'une precedente valiaton du formulaire
	viderBaliseErreur(email);
	try {
		if (!emailRegExp.test(baliseEmail.value)) {
			throw new Error("L'email n'est pas valide.");
		}
		return true;
	} catch (erreur) {
		afficherMessageErreur(erreur.message, email);
	}
}

/**
 **Cette fonction prend deux paramètres : le message d'erreur a affiché
 *et le champ qui n'est pas valide
 */
function afficherMessageErreur(message, balise) {
	// Récupére la balise d'un message d'erreur précedement créé
	let spanErreurMessage = document.getElementById(`erreurMessage${balise}`);
	// Si la balise n'existe pas on la créé
	if (!spanErreurMessage) {
		// Création d'une balise span
		spanErreurMessage = document.createElement("span");
		// Ajout de l'id permettant l'identification
		spanErreurMessage.id = `erreurMessage${balise}`;
		// Recupération de l'ID du champ non valide passé en paramètre
		const baliseAValider = document.getElementById(`${balise}`);
		// Récupération de la balise parent
		const baliseParent = baliseAValider.parentNode;
		// Ajout de la balise span au parent
		baliseParent.appendChild(spanErreurMessage);
		// Ajout du message d'erreur à la balise span
		spanErreurMessage.innerText = message;
	}
}

/**
 **Cette fonction prend un paramètre : l'id de la balise d'un champ
 *cette fonction supprime la balise span avec le message d'erreur lié à la balise passé en paramètre
 *
 */
function viderBaliseErreur(balise) {
	const baliseASupprimer = document.getElementById(`erreurMessage${balise}`);
	if (baliseASupprimer) {
		baliseASupprimer.remove();
	}
}
