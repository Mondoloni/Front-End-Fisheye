//Recupération du parametre id de l'URL qui correspond à l'id du photographe
const params = new URL(document.location).searchParams;
const idToFetch = Number(params.get("id"));
let nbLikesTotal = 0;

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
	// let nbLikesTotal = 0;
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

//La fonction permet l'incrementation du nombre de like sur le média et l'incrementation du nombre total de likes
//Elle prend 2 paramètres : L'id du média selectionne et le nombre de likes du média
//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function ajoutLikesMedias(idMedias, likes) {
	
	const nbLikesMedias = document.getElementById(`nblikesmedias${idMedias}`);
	
	if(parseInt(nbLikesMedias.innerHTML)<(likes+1))
	{
		nbLikesMedias.textContent = likes + 1;
		const nbTotalLikesMedias = document.getElementById("likes-number");
		nbTotalLikesMedias.textContent = parseInt(nbTotalLikesMedias.innerText)+1 ;
	}
	else
	{
		nbLikesMedias.textContent = parseInt(nbLikesMedias.textContent)- 1;
		const nbTotalLikesMedias = document.getElementById("likes-number");
		nbTotalLikesMedias.textContent = parseInt(nbTotalLikesMedias.innerText)-1 ;
	}
	
}

async function changeTriMedias() {
	// Récupère les datas des photographes
	const { photograph } = await getPhotographerById();
	// const typeTri = document.getElementById("tri_medias");
	const typeTri = document.getElementById("selected-value");
	const divMedia = document.getElementById("medias-photograph");

	//Vidage des cards medias
	divMedia.innerHTML = "";
	//En fonction du select choisi on tri le tableau des medias
	switch (typeTri.innerHTML) {
	case "Popularité": photograph[1].sort((a, b) => b.likes - a.likes);
		break;
	case "Date": photograph[1].sort((a, b) => new Date(a.date) - new Date(b.date));
		break;
	case "Titre": photograph[1].sort((a, b) => a.title.localeCompare(b.title));
		
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
async function photopgraph() 
{
	// Récupère les datas des photographes et de ces medias
	const { photograph } = await getPhotographerById();
	//On appel la fonction displayData pour créé les cards des médias
	displayData(photograph);
	//On ajoute un listener sur le dropdown du tri des medias
	//A chaque chagement on appel la fonction changerTrimedias
	document.getElementById("select-dropdown").addEventListener("change", changeTriMedias);
	
	document.addEventListener("keydown", (e) => {
		//Pour chaque clique sur la touche entrée 
		const keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode === 13) {
		//si l'action est effectué sur un média
		//on appel la fonction displayLightBox (ouverture de la lightBox)
			if (e.target.dataset.type === "media") {
				// eslint-disable-next-line no-undef
				displayLightBox(parseInt(e.target.dataset.mediaid), parseInt(e.target.dataset.photographerid));
			}
			//si l'action est effectué sur un like d'un média
			//on appel la fonction ajoutLikesMedias (ajout d'un like sur le média)
			else  if (e.target.dataset.type === "likes")
			{
				//La fonction est définie dans un autre fichier js
				ajoutLikesMedias(parseInt(e.target.dataset.mediaid),parseInt(e.target.dataset.likes))
				
			}
		}

	});

	const customSelect = document.querySelector(".custom-select");
	const selectBtn = document.querySelector(".select-button");
	
	//On ajoute un listener sur le clicke du dropdown du tri des medias
	selectBtn.addEventListener("click", () => 
	{
		//Ajout/retrait de la classe custom-select.active 
		customSelect.classList.toggle("active");
		//Mise à jour de l'attribut aria-expanded en fonction de son statut
		selectBtn.setAttribute(
			"aria-expanded",
			selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
		);
	});	

	const selectedValue = document.querySelector(".selected-value");
	const optionsList = document.querySelectorAll(".select-dropdown li");
	
	optionsList.forEach((option) => {
		function changedropdown(e) {
			//Si l'evenement est un clique on modifie la valeur affiché dans le selected value
			//et on ferme le dropdown
		if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
			selectedValue.textContent = this.children[1].textContent;
			customSelect.classList.remove("active");
		}
		//Si l'evenement est la touche entrée on modifie la valeur affiché dans le selected value
		//et on ferme le dropdown
		if (e.key === "Enter") {
			selectedValue.textContent = this.textContent;
			customSelect.classList.remove("active");
		}
		}
		//Ajout d'un écouteur au clique et a l'action sur le clavier sur les balises <li> du dropdown
		//Au declenchement de l'ecouteur on execute la fonction changedropdown
		option.addEventListener("keyup", changedropdown);
		option.addEventListener("click", changedropdown);
	});
}
photopgraph();

