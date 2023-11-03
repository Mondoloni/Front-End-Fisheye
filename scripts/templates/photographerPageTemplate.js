
//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function photographerPageTemplate(data) {
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

		//Ancienne a supprimer Div correspondant à la partie du tri des médias
		/*const div_photograph_medias = document.createElement("div");
		div_photograph_medias.setAttribute("class", "photograph-medias");

		const label_tri_medias = document.createElement("label");
		label_tri_medias.textContent = "Trier par";

		const select_tri_medias = document.createElement("select");
		select_tri_medias.setAttribute("id", "tri_medias");

		const option_tri_popularite = document.createElement("option");
		option_tri_popularite.setAttribute("value", "popularite");
		option_tri_popularite.textContent = "Popularité";

		const selectHr=document.createElement("hr");


		const option_tri_date = document.createElement("option");
		option_tri_date.setAttribute("value", "date");
		option_tri_date.textContent = "Date";
		const option_tri_titre = document.createElement("option");
		option_tri_titre.setAttribute("value", "titre");
		option_tri_titre.textContent = "Titre";

		select_tri_medias.appendChild(option_tri_popularite);
		select_tri_medias.appendChild(selectHr);
		select_tri_medias.appendChild(option_tri_date);
		select_tri_medias.appendChild(option_tri_titre);

		label_tri_medias.appendChild(select_tri_medias);
		div_photograph_medias.appendChild(label_tri_medias);*/

//Div correspondant à la partie du tri des médias

		const div_tri_medias = document.createElement("div");
		div_tri_medias.setAttribute("class","tri-medias");

		const div_photograph_medias = document.createElement("div");
		div_photograph_medias.setAttribute("class", "photograph-medias");

		const label_tri_medias = document.createElement("label");
		label_tri_medias.setAttribute("id","select-button");
		label_tri_medias.textContent = "Trier par";

		const div_custom_select=document.createElement("div");
		div_custom_select.setAttribute("class","custom-select");

		const but_select_button=document.createElement("button");
		but_select_button.setAttribute("class","select-button");
		but_select_button.setAttribute("role","combobox");
		but_select_button.setAttribute("aria-labelledby","select-button");
		but_select_button.setAttribute("aria-haspopup","listbox");
		but_select_button.setAttribute("aria-expanded","false");
		but_select_button.setAttribute("aria-controls","select-dropdown");

		const span_selected_value=document.createElement("span");
		span_selected_value.setAttribute("class","selected-value");
		span_selected_value.setAttribute("id","selected-value");
		span_selected_value.textContent="Popularité";

		const span_arrow=document.createElement("span");
		span_arrow.setAttribute("class","arrow");

		const ul_select_dropdown=document.createElement("ul");
		ul_select_dropdown.setAttribute("class","select-dropdown");
		ul_select_dropdown.setAttribute("role","listbox");
		ul_select_dropdown.setAttribute("id","select-dropdown");

		const li_option_popularite=document.createElement("li");
		li_option_popularite.setAttribute("role","option");
		li_option_popularite.setAttribute("tabindex","0");
		const input_radio_popularite=document.createElement("input");
		input_radio_popularite.setAttribute("type","radio");
		input_radio_popularite.setAttribute("id","popularite");
		input_radio_popularite.setAttribute("name","tri-popularite");
		input_radio_popularite.setAttribute("tabindex","-1");
		const label_popularite=document.createElement("label");
		label_popularite.setAttribute("for","popularite");
		// label_popularite.setAttribute("tabindex","0");
		label_popularite.textContent="Popularité";
		li_option_popularite.appendChild(input_radio_popularite);
		li_option_popularite.appendChild(label_popularite);

		const li_option_date=document.createElement("li");
		li_option_date.setAttribute("role","option");
		li_option_date.setAttribute("tabindex","0");
		const input_radio_date=document.createElement("input");
		input_radio_date.setAttribute("type","radio");
		input_radio_date.setAttribute("id","date");
		input_radio_date.setAttribute("name","tri-date");
		input_radio_date.setAttribute("tabindex","-1");
		const label_date=document.createElement("label");
		label_date.setAttribute("for","date");
		// label_date.setAttribute("tabindex","0");
		label_date.textContent="Date";
		li_option_date.appendChild(input_radio_date);
		li_option_date.appendChild(label_date);

		const li_option_titre=document.createElement("li");
		li_option_titre.setAttribute("role","option");
		li_option_titre.setAttribute("tabindex","0");
		const input_radio_titre=document.createElement("input");
		input_radio_titre.setAttribute("type","radio");
		input_radio_titre.setAttribute("id","titre");
		input_radio_titre.setAttribute("name","tri-titre");
		input_radio_titre.setAttribute("tabindex","-1");
		const label_titre=document.createElement("label");
		label_titre.setAttribute("for","titre");
		// label_titre.setAttribute("tabindex","0");
		label_titre.textContent="Titre";
		li_option_titre.appendChild(input_radio_titre);
		li_option_titre.appendChild(label_titre);

		ul_select_dropdown.appendChild(li_option_popularite);
		ul_select_dropdown.appendChild(li_option_date);
		ul_select_dropdown.appendChild(li_option_titre);
		but_select_button.appendChild(span_selected_value);
		but_select_button.appendChild(span_arrow);
		div_custom_select.appendChild(but_select_button);
		div_custom_select.appendChild(ul_select_dropdown);
		
		div_tri_medias.appendChild(label_tri_medias);
		div_tri_medias.appendChild(div_custom_select);
		div_photograph_medias.appendChild(div_tri_medias);
//Div correspondant à la partie du tri des médias

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
