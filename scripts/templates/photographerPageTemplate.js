
//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function photographerPageTemplate(data) {
	// console.log(data)
	const { name, city, country, tagline, price, portrait } = data[0];
	const picture = `assets/photographers/${portrait}`;
	function getPhotographTemplate() {
		// On créé la div contenant le nom prenom, ville, image, citation du phtographe
		const div_photograph_name = document.createElement("div");
		div_photograph_name.setAttribute("class", "photograph-name");
		const id_photograph = document.createElement("h2");
		id_photograph.textContent = name;
		const town_photograph = document.createElement("h3");
		town_photograph.textContent = `${city}, ${country}`;
		const tagline_photograph = document.createElement("h4");
		tagline_photograph.textContent = tagline;
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.setAttribute("alt", city);

		div_photograph_name.appendChild(id_photograph);
		div_photograph_name.appendChild(town_photograph);
		div_photograph_name.appendChild(tagline_photograph);

		// Partie des médias du photographe

		//Div correspondant à la partie du tri des médias
		const div_photograph_medias = document.createElement("div");
		div_photograph_medias.setAttribute("class", "photograph-medias");

		const label_tri_medias = document.createElement("label");
		label_tri_medias.textContent = "Trier par";

		const select_tri_medias = document.createElement("select");
		select_tri_medias.setAttribute("id", "tri_medias");

		const option_tri_popularite = document.createElement("option");
		option_tri_popularite.setAttribute("value", "popularite");
		option_tri_popularite.textContent = "Popularité";

		// const ligne_select_tri_span = document.createElement("span");
		// ligne_select_tri_span.setAttribute("class", "option-line");
		// ligne_select_tri_span.textContent = "Popularité";

		// option_tri_popularite.appendChild(ligne_select_tri_span);
		// option_tri_hr.textContent = "_________";
		const option_tri_date = document.createElement("option");
		option_tri_date.setAttribute("value", "date");
		// const ligne_select_tri_span2 = document.createElement("span");
		// ligne_select_tri_span2.setAttribute("class", "option-line");
		// ligne_select_tri_span2.textContent = "Date";
		// option_tri_date.appendChild(ligne_select_tri_span2);
		option_tri_date.textContent = "Date";
		const option_tri_titre = document.createElement("option");
		option_tri_titre.setAttribute("value", "titre");
		option_tri_titre.textContent = "Titre";

		select_tri_medias.appendChild(option_tri_popularite);
		// select_tri_medias.appendChild(ligne_select_tri_span);
		select_tri_medias.appendChild(option_tri_date);
		// select_tri_medias.appendChild(ligne_select_tri_span);
		select_tri_medias.appendChild(option_tri_titre);

		label_tri_medias.appendChild(select_tri_medias);
		div_photograph_medias.appendChild(label_tri_medias);

		// Div des likes et du tarifs journalier en bas de page
		const divLikes = document.createElement("div");
		divLikes.setAttribute("class", "photograph_likes");
		const h4LikesNbr = document.createElement("h4");
		h4LikesNbr.setAttribute("class", "likes-number");
		h4LikesNbr.setAttribute("id", "likes-number");


		const imgCoeurLikes = document.createElement("img");
		imgCoeurLikes.setAttribute("src", "assets/icons/favorite-Heart-Black.svg");
		imgCoeurLikes.setAttribute("alt", "Likes");
		const h4Tarif = document.createElement("h4");
		h4Tarif.setAttribute("class", "tarif-journalier");
		h4Tarif.textContent = `${price}€ / jour`;

		divLikes.appendChild(h4LikesNbr);
		divLikes.appendChild(imgCoeurLikes);
		divLikes.appendChild(h4Tarif);

		// On insére le nom et le prénom du photographe dans la modal de contac
		const h2NomModal = document.createElement("h2");
		h2NomModal.textContent = name;
		//On retourne 
		//div contenant le nom prenom, ville, image, citation du phtographe
		//la balise image du photographe
		//la div qui va contentir les cards des medias et le tri
		//La div de bas de pages avec le nombre de likes et letarif journalier
		//la baslise h2 avec le nom du photographe pour la modal contact
		return {
			div_photograph_name, img, div_photograph_medias, divLikes, h2NomModal,
		};
	}
	return { name, picture, getPhotographTemplate };
}
