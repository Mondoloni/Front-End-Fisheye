const contactModal = document.getElementById("contact_modal");
const divMain = document.getElementById("main");
const section_lightbox_modal = document.getElementById("section_lightbox_modal");
const lightbox_btn_close = document.getElementById("imgclosemodal");

//Fonction qui permet l'ouverture de la modal lightBox et affiche le media
//elle prend 2 paramètres : id du media et l'id du photographe

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
async function displayLightBox(idMedias, photographerId) {

	//On modifie l'attribut aria-hidden a vrai pour la modal lightbox
	//et faux pour la modal contact et la page principale
	contactModal.setAttribute("aria-hidden", "true");
	divMain.setAttribute("aria-hidden", "true");
	section_lightbox_modal.setAttribute("aria-hidden", "false");
	//On affiche la modal LightBox et on cahe la modal contact
	contactModal.style.display = "none";
	section_lightbox_modal.style.display = "block";
	//On met le focus sur le bouton de fermeture
	lightbox_btn_close.focus();
	//on récupére les donnees du fichier photographers.json

	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const recupData = await recuperationData("./data/photographers.json");

	// const response = await fetch("./data/photographers.json");
	//On vérifié si l'on accède bien au fichier
	if (recupData.reponse.ok) {
		// const data = await response.json();
		//On récupére les données du photographe 
		const MediaToPhotograp = recupData.data.media.filter((medias) => medias.photographerId === photographerId);
		const typeTri = document.getElementById("tri_medias");
		switch (typeTri.value) {
			case "popularite": MediaToPhotograp.sort((a, b) => b.likes - a.likes);
				break;
			case "date": MediaToPhotograp.sort((a, b) => new Date(a.date) - new Date(b.date));
				break;
			case "titre": MediaToPhotograp.sort((a, b) => a.title.localeCompare(b.title));
				break;
		}
		//On récupére les données des medias du photographe 
		const MediaDisplay = MediaToPhotograp.filter((medias) => medias.id === idMedias);
		const divLightboxMedia = document.getElementById("lightbox-media");
		const imgNextMedia = document.getElementById("next_media");
		const imgPreviousMedia = document.getElementById("previous_media");
		console.log("MediaDisplay")
		console.log(MediaDisplay)
		console.log("idMedias")
		console.log(idMedias)
		console.log("MediaToPhotograp")
		console.log(MediaToPhotograp)

		let mediaLightBox;
		let picture;

		/*****On vide la div contenant l'image et le titre**/
		if (document.getElementById("mediaLightBox") != null) {
			divLightboxMedia.removeChild(document.getElementById("mediaLightBox"));
			divLightboxMedia.removeChild(document.getElementById("titleLightBox"));
		}
		/****************************************************/

		/* On vérifie si le media a affiche est une image ou une video*/
		/* On créé soit une balise video soit une balise img */
		if (MediaDisplay[0].image == undefined) {
			picture = `assets/Sample Photos/${photographerId}/${MediaDisplay[0].video}`;
			mediaLightBox = document.createElement("video");
			mediaLightBox.setAttribute("src", picture);
			mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
		} else {
			picture = `assets/Sample Photos/${photographerId}/${MediaDisplay[0].image}`;
			mediaLightBox = document.createElement("img");
			mediaLightBox.setAttribute("src", picture);
			mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
		}

		mediaLightBox.setAttribute("id", "mediaLightBox");
		/* On créé la balise h3 corresponadnt au titre du média*/
		const titleLightBox = document.createElement("h3");
		titleLightBox.textContent = MediaDisplay[0].title;
		titleLightBox.setAttribute("id", "titleLightBox");

		/*On insere la balise video/image et le titre à la balise div*/
		divLightboxMedia.appendChild(mediaLightBox);
		divLightboxMedia.appendChild(titleLightBox);


		let nextMedia = null;
		let previousMedia = null;
		//On parcours les medias
		for (let i = 0; i < MediaToPhotograp.length; i++) {	//Si le media corssepond au media actuellement affiché
			if (MediaToPhotograp[i].id == idMedias) {	//Si on est au dernier media on affecte au media suivant le media actuelle
				if (i + 1 > MediaToPhotograp.length) {
					nextMedia = idMedias;
				}
				//On affecte l'id du prochain media 
				else {
					nextMedia = MediaToPhotograp[i + 1].id;
				}
				//Si le media affiché est le premier on affecte au media precedent l'id du media actuel
				if (i - 1 < 0) {
					previousMedia = MediaDisplay;
				}
				//On affecte l'id du media precedent
				else {
					previousMedia = MediaToPhotograp[i - 1].id;
				}
			}
		}
		//On attribut au bouton suivant un évenement au clique qui declanche la fonction afficherMediaSuivant
		imgNextMedia.setAttribute("OnClick", `afficherMediaSuivant(${nextMedia},${photographerId})`);
		//On attribut au bouton precedent un évenement au clique qui declanche la fonction afficherMediaPrecedent
		imgPreviousMedia.setAttribute("OnClick", `afficherMediaPrecedent(${previousMedia},${photographerId})`);
	}
	else {
		alert(`HTTP-Error: ${recupData.reponse.status}`);
	}
}

//Fonction permemettant la fermeture de la modal lightBox

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function closeLightbox() {
	//On modifie l'attribut aria-hidden a vrai pour la modalLightbox et la modal contact
	//et a vrai pour la page principale
	contactModal.setAttribute("aria-hidden", "true");
	divMain.setAttribute("aria-hidden", "false");
	section_lightbox_modal.setAttribute("aria-hidden", "true");
	//On masque les 2 modal
	contactModal.style.display = "none";
	section_lightbox_modal.style.display = "none";
}

//Fonction qui permet d'afficher le media suivant
//Prend 2 paramètres : l'id du media a afficher et l'id du photograph

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
async function afficherMediaSuivant(idMedias, photographerId) {

	// const response = await fetch("./data/photographers.json");

	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const recupData = await recuperationData("./data/photographers.json");
	const imgNextMedia = document.getElementById("next_media");
	const imgPreviousMedia = document.getElementById("previous_media");
	const divLightboxMedia = document.getElementById("lightbox-media");
	let nextMedia = null;
	let previousMedia = null;

	if (recupData.reponse.ok) {
		// const data = await response.json();
		const MediaToPhotograp = recupData.data.media.filter((medias) => medias.photographerId === photographerId);
		const typeTri = document.getElementById("tri_medias");
		switch (typeTri.value) {
			case "popularite": MediaToPhotograp.sort((a, b) => b.likes - a.likes);
				break;
			case "date": MediaToPhotograp.sort((a, b) => new Date(a.date) - new Date(b.date));
				break;
			case "titre": MediaToPhotograp.sort((a, b) => a.title.localeCompare(b.title));
				break;
		}
		const MediaDisplay = MediaToPhotograp.filter((medias) => medias.id === idMedias);
		const titleLightBox = document.getElementById("titleLightBox");
		const mediaLightBox = document.getElementById("mediaLightBox");
		let newMediaLightBox;
		let newTitleLightBox;
		titleLightBox.textContent = MediaDisplay[0].title;
		/*On identifie si le media precedement affiché et le nouveau media sont de meme type*/
		if (mediaLightBox.tagName === "IMG") {
			if (MediaDisplay[0].image !== undefined) {
				mediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].image}`);
				mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
			}
			else {
				/*Si le media precedent est une image et que le suivant est une video
				On supprime la balise image et on créé la balise video*/
				divLightboxMedia.removeChild(document.getElementById("mediaLightBox"));
				divLightboxMedia.removeChild(document.getElementById("titleLightBox"));
				newMediaLightBox = document.createElement("video");
				newMediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].video}`);
				newMediaLightBox.setAttribute("alt", MediaDisplay[0].title);
				newMediaLightBox.setAttribute("id", "mediaLightBox");
				newTitleLightBox = document.createElement("h3");
				newTitleLightBox.textContent = MediaDisplay[0].title;
				newTitleLightBox.setAttribute("id", "titleLightBox");
				/*On insere la balise video/image et le titre à la balise div*/
				divLightboxMedia.appendChild(mediaLightBox);
				divLightboxMedia.appendChild(titleLightBox);
			}
		}
		else {
			if (MediaDisplay[0].image !== undefined) {
				/*Si le media precedent est une video et que le suivant est une image
				On supprime la balise video et on créé la balise image*/
				divLightboxMedia.removeChild(document.getElementById("mediaLightBox"));
				divLightboxMedia.removeChild(document.getElementById("titleLightBox"));
				newMediaLightBox = document.createElement("img");
				newMediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].image}`);
				newMediaLightBox.setAttribute("alt", MediaDisplay[0].title);
				newMediaLightBox.setAttribute("id", "mediaLightBox");
				newTitleLightBox = document.createElement("h3");
				newTitleLightBox.textContent = MediaDisplay[0].title;
				newTitleLightBox.setAttribute("id", "titleLightBox");
				/*On insere la balise video/image et le titre à la balise div*/
				divLightboxMedia.appendChild(newMediaLightBox);
				divLightboxMedia.appendChild(newTitleLightBox);
			}
			else {
				mediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].video}`);
				mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
			}
		}
		//On parcours les medias
		for (let i = 0; i < MediaToPhotograp.length; i++) {//Si le media corssepond au media actuellement affiché
			if (MediaToPhotograp[i].id == idMedias) {//Si on est au dernier media on affecte au media suivant le media actuelle
				if (i + 1 > MediaToPhotograp.length) {
					nextMedia = idMedias;
				}
				//On affecte l'id du prochain media
				else {
					nextMedia = MediaToPhotograp[i + 1].id;
				}
				//Si le media affiché est le premier on affecte au media precedent l'id du media actuel
				if (i - 1 < 0) {
					previousMedia = idMedias;
				}
				//On affecte l'id du media precedent
				else {
					previousMedia = MediaToPhotograp[i - 1].id;
				}
			}
		}
		//On attribut au bouton suivant un évenement au clique qui declanche la fonction afficherMediaSuivant
		imgNextMedia.setAttribute("OnClick", `afficherMediaSuivant(${nextMedia},${photographerId})`);
		//On attribut au bouton precedent un évenement au clique qui declanche la fonction afficherMediaPrecedent
		imgPreviousMedia.setAttribute("OnClick", `afficherMediaPrecedent(${previousMedia},${photographerId})`);
	}
}


//Fonction qui permet d'afficher le media precedent
//Prend 2 paramètres : l'id du media a afficher et l'id du photograph

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
async function afficherMediaPrecedent(idMedias, photographerId) {

	// const response = await fetch("./data/photographers.json");

	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const recupData = await recuperationData("./data/photographers.json");
	const imgNextMedia = document.getElementById("next_media");
	const imgPreviousMedia = document.getElementById("previous_media");
	const divLightboxMedia = document.getElementById("lightbox-media");
	let nextMedia = null;
	let previousMedia = null;

	if (recupData.reponse.ok) {
		// const data = await response.json();
		const MediaToPhotograp = recupData.data.media.filter((medias) => medias.photographerId === photographerId);
		const typeTri = document.getElementById("tri_medias");
		switch (typeTri.value) {
			case "popularite": MediaToPhotograp.sort((a, b) => b.likes - a.likes);
				break;
			case "date": MediaToPhotograp.sort((a, b) => new Date(a.date) - new Date(b.date));
				break;
			case "titre": MediaToPhotograp.sort((a, b) => a.title.localeCompare(b.title));
				break;
		}
		const MediaDisplay = MediaToPhotograp.filter((medias) => medias.id === idMedias);
		const titleLightBox = document.getElementById("titleLightBox");
		const mediaLightBox = document.getElementById("mediaLightBox");
		let newMediaLightBox;
		let newTitleLightBox;
		titleLightBox.textContent = MediaDisplay[0].title;
		/*On identifie si le media precedement affiché et le nouveau media sont de meme type*/
		if (mediaLightBox.tagName === "IMG") {
			if (MediaDisplay[0].image !== undefined) {
				mediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].image}`);
				mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
			}
			else {
				/*Si le media precedent est une image et que le suivant est une video
				On supprime la balise image et on créé la balise video*/
				divLightboxMedia.removeChild(document.getElementById("mediaLightBox"));
				divLightboxMedia.removeChild(document.getElementById("titleLightBox"));
				newMediaLightBox = document.createElement("video");
				newMediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].video}`);
				newMediaLightBox.setAttribute("alt", MediaDisplay[0].title);
				newMediaLightBox.setAttribute("id", "mediaLightBox");
				newTitleLightBox = document.createElement("h3");
				newTitleLightBox.textContent = MediaDisplay[0].title;
				newTitleLightBox.setAttribute("id", "titleLightBox");
				/*On insere la balise video/image et le titre à la balise div*/
				divLightboxMedia.appendChild(newMediaLightBox);
				divLightboxMedia.appendChild(newTitleLightBox);
			}
		}
		else {
			if (MediaDisplay[0].image !== undefined) {
				/*Si le media precedent est une video et que le suivant est une image
				On supprime la balise video et on créé la balise image*/
				divLightboxMedia.removeChild(document.getElementById("mediaLightBox"));
				divLightboxMedia.removeChild(document.getElementById("titleLightBox"));
				newMediaLightBox = document.createElement("img");
				newMediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].image}`);
				newMediaLightBox.setAttribute("alt", MediaDisplay[0].title);
				newMediaLightBox.setAttribute("id", "mediaLightBox");
				newTitleLightBox = document.createElement("h3");
				newTitleLightBox.textContent = MediaDisplay[0].title;
				newTitleLightBox.setAttribute("id", "titleLightBox");
				/*On insere la balise video/image et le titre à la balise div*/
				divLightboxMedia.appendChild(newMediaLightBox);
				divLightboxMedia.appendChild(newTitleLightBox);
			}
			else {
				mediaLightBox.setAttribute("src", `assets/Sample Photos/${photographerId}/${MediaDisplay[0].video}`);
				mediaLightBox.setAttribute("alt", MediaDisplay[0].title);
			}
		}

		for (let i = 0; i < MediaToPhotograp.length; i++) {
			if (MediaToPhotograp[i].id == idMedias) {
				if (i + 1 > MediaToPhotograp.length) {
					nextMedia = idMedias;
				}
				else {
					nextMedia = MediaToPhotograp[i + 1].id;
				}

				if (i - 1 < 0) {
					previousMedia = idMedias;
				}
				else {
					previousMedia = MediaToPhotograp[i - 1].id;
				}
			}
		}

		imgNextMedia.setAttribute("OnClick", `afficherMediaSuivant(${nextMedia},${photographerId})`);
		imgPreviousMedia.setAttribute("OnClick", `afficherMediaPrecedent(${previousMedia},${photographerId})`);
	}
}

// On écoute l'appui de la touche echap et on lance la fonction closeLightbox()
document.addEventListener("keydown", (e) => {
	const mediaPrecedent = document.getElementById("previous_media").getAttribute("OnClick");
	const mediaSuivant = document.getElementById("next_media").getAttribute("OnClick");
	const keyCode = e.keyCode ? e.keyCode : e.which;
	if (section_lightbox_modal.getAttribute("aria-hidden") == "false") {
		switch (keyCode) {
			case 27: closeLightbox();//Si l'appui est sur echape on ferme la modal
				break;
			case 39: eval(mediaSuivant);//si l'appui clavier est sur la fleche droite on lance la fonction afficherMediaSuivant
				break;
			case 37: eval(mediaPrecedent);//si l'appui clavier est sur la fleche gauche on lance la fonction afficherMediaPrecedent
				break;
		}
	}
});
