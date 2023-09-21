// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById() {
	const photograph = [];
	//Recupération du parametre id de l'URL qui correspond à l'id du photographe
	const params = new URL(document.location).searchParams;
	const idToFetch = Number(params.get("id"));
	const response = await fetch("./data/photographers.json");

	if (response.ok) {
		const data = await response.json();
		//On récupére dans photographersWithId les données du photographe passé en paramètre
		const photographersWithId = data.photographers.filter((photographer) => photographer.id === idToFetch);
		//On récupére dans MediaToPhotograp les données médias correspodant au photographe selectionné
		const MediaToPhotograp = data.media.filter((medias) => medias.photographerId === idToFetch);
		photograph.push(photographersWithId);
		photograph.push(MediaToPhotograp);

		return ({ photograph });
	}
	alert(`HTTP-Error: ${response.status}`);
}

async function displayData(photograph) {

	const photographersSection = document.querySelector(".photograph-header");
	//On passe en paramètre au template de la page photograph les données liées au photographe
	// qui ont été retourné par la fonction getPhotographerById
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
		// eslint-disable-next-line no-undef
		const mediaModel = mediaPageTemplate(medias);
		// const mediaModel = mediaPageTemplate(medias,photograph);
		const userCardMedia = mediaModel.getMediaTemplate();
		divMedia.appendChild(userCardMedia);
	});

	// Ajout du nom du photographe dans la modal
	const modalSection = document.getElementById("header-modal-contact");
	modalSection.appendChild(userCardDOM.h2NomModal);
}

async function photopgraph() {
	// Récupère les datas des photographes
	const { photograph } = await getPhotographerById();
	displayData(photograph);
}

photopgraph();
