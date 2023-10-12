//Recupération du parametre id de l'URL qui correspond à l'id du photographe
const params = new URL(document.location).searchParams;
const idToFetch = Number(params.get("id"));

async function getPhotographerById() {
	const photograph = [];


	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const recupData = await recuperationData("./data/photographers.json");
	if (recupData.reponse.ok) {
		//On récupére dans photographersWithId les données du photographe passé en paramètre
		const photographersWithId = recupData.data.photographers.filter((photographer) => photographer.id === idToFetch);
		//On récupére dans MediaToPhotograp les données médias correspodant au photographe selectionné
		const MediaToPhotograp = recupData.data.media.filter((medias) => medias.photographerId === idToFetch);
		photograph.push(photographersWithId);
		photograph.push(MediaToPhotograp);

		return ({ photograph });
	}
	alert(`HTTP-Error: ${recupData.response.status}`);
}

async function displayData(photograph) {
	let nbLikesTotal = 0;
	const photographersSection = document.querySelector(".photograph-header");
	//On passe en paramètre au template de la page photograph les données liées au photographe
	// qui ont été retourné par la fonction getPhotographerById

	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const photographerModel = photographerPageTemplate(photograph[0]);
	const userCardDOM = photographerModel.getPhotographTemplate();
	//on insére la div correspondant au nom, prenom, lieu et citation
	//On le positionne en premier enfant dans la div photograph-header
	photographersSection.insertBefore(userCardDOM.div_photograph_name, photographersSection.firstChild);
	//On insére l'image du photographe
	photographersSection.appendChild(userCardDOM.img);
	//On ajoute a la balise main la div qui va contenir les cards des medias du photographe
	const photographerMain = document.getElementById("main");
	photographerMain.appendChild(userCardDOM.div_photograph_medias);

	const divMedia = document.createElement("div");
	divMedia.setAttribute("class", "medias-photograph");
	divMedia.setAttribute("id", "medias-photograph");
	userCardDOM.div_photograph_medias.appendChild(divMedia);
	//On ajoute l'encart en bas de page avec les likes total et le tarif journalier du photographe
	photographerMain.appendChild(userCardDOM.divLikes);
	//On parcours les medias du photographe pour crééer les cards avec la fonction getMediaTemplate 
	photograph[1].forEach((medias) => {
		//On ajout chaque like de chaque medias
		nbLikesTotal += medias.likes;

		//La fonction est définie dans un autre fichier js
		// eslint-disable-next-line no-undef
		const mediaModel = mediaPageTemplate(medias);
		const userCardMedia = mediaModel.getMediaTemplate();
		divMedia.appendChild(userCardMedia);
	});

	// Ajout du nom du photographe dans la modal
	const modalSection = document.getElementById("header-modal-contact");
	modalSection.appendChild(userCardDOM.h2NomModal);
	//on ajoute le nombre de like au h4 correspondant
	const h4LikesNumber = document.getElementById("likes-number");
	h4LikesNumber.textContent = nbLikesTotal;
}

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function ajoutLikesMedias(idMedias, likes) {
	const nbLikesMedias = document.getElementById(`nblikesmedias${idMedias}`);
	nbLikesMedias.textContent = likes + 1;
	const nbTotalLikesMedias = document.getElementById("likes-number");
	nbTotalLikesMedias.textContent = parseInt(nbTotalLikesMedias.innerText) + 1;
}

async function changeTriMedias() {
	// Récupère les datas des photographes
	const { photograph } = await getPhotographerById();
	const typeTri = document.getElementById("tri_medias");
	const divMedia = document.getElementById("medias-photograph");
	//Vidage des cards medias
	divMedia.innerHTML = "";
	//En fonction du select choisi on tri le tableau des medias
	switch (typeTri.value) {
		case "popularite": photograph[1].sort((a, b) => b.likes - a.likes);
			break;
		case "date": photograph[1].sort((a, b) => new Date(a.date) - new Date(b.date));
			break;
		case "titre": photograph[1].sort((a, b) => a.title.localeCompare(b.title));
			break;
	}
	//On parcours la liste des medias et on appel les fonctions qui créént et ajoutent les cards des medias
	photograph[1].forEach((medias) => {
		//La fonction est définie dans un autre fichier js
		// eslint-disable-next-line no-undef
		const mediaModel = mediaPageTemplate(medias);
		const userCardMedia = mediaModel.getMediaTemplate();
		divMedia.appendChild(userCardMedia);
	});

}
async function photopgraph() {

	// import { displayLightBox } from "./utils/lightBox.js";
	// Récupère les datas des photographes et de ces medias
	const { photograph } = await getPhotographerById();
	//On appel la fonction displayData pour créé les cards des médias
	displayData(photograph);
	//On ajoute un listener sur le select du tri
	//A chaque chagement on appel la fonction changerTrimedias
	document.getElementById("tri_medias").addEventListener("change", changeTriMedias);

	document.addEventListener("keydown", (e) => {
		// const modal = document.getElementById("section_lightbox_modal");

		//Pour chaque clique sur la touche entrée si la modale lightbox n'est pas ouverte
		//on appel la fonction displayLightBox (ouverture de la lightBox)
		const keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode === 13) {
			if (e.target.id === "contact_button") {
				console.log("Okkkkk")
			}
			else {
				//La fonction est définie dans un autre fichier js
				// eslint-disable-next-line no-undef
				displayLightBox(parseInt(e.target.id), idToFetch);
			}
		}

	});
}
photopgraph();

