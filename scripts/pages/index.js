// récupére les données des photographes dans le fichier
// JSON photographers.json
// et retourne un tableau

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
async function getPhotographers() {
	const reponse = await fetch("./data/photographers.json");
	const data = await reponse.json();
	return ({ photographers: [...data.photographers] });
}
//On passe en paramètres la liste des photographes
//La fonction créé la section des photographes 
//et les cards de chaque photographes
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographers.forEach((photographer) => {
		//La fonction est définie dans un autre fichier js
		// eslint-disable-next-line no-undef
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	// const { photographers } = await getPhotographers();
	// const tab = await getPhotographers();

	//La fonction est définie dans un autre fichier js
	// eslint-disable-next-line no-undef
	const recupData = await recuperationData("./data/photographers.json");

	if (recupData.reponse.ok) {
		displayData(recupData.data.photographers);
	}
	else {
		alert(`HTTP-Error: ${recupData.reponse.status}`);
	}
}

init();
