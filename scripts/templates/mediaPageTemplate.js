//La fonction prend un paramètre
//les données du medias du fichierphotographers.json 
//elle retourne la card du media

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function mediaPageTemplate(data) {
	const { photographerId, title, image, likes, video, id } = data;

	let picture;
	let media;
	function getMediaTemplate() {
		//On créé la div de la card
		const div_media_title_like = document.createElement("div");
		div_media_title_like.setAttribute("class", "medias-photograph-title-like");
		//On vérifie si le media est une image ou une video pour créé la bonne balise
		if (data.video !== undefined) {
			picture = `assets/Sample_Photos/${photographerId}/${video}`;
			media = document.createElement("video");
			media.setAttribute("src", picture);
			// media.setAttribute("alt", title);
			media.setAttribute("tabindex", "0");
			media.setAttribute("data-type", "media");
			media.setAttribute("data-mediaid", id);
			media.setAttribute("data-photographerId", photographerId);
		} else {
			picture = `assets/Sample_Photos/${photographerId}/${image}`;
			media = document.createElement("img");
			media.setAttribute("src", picture);
			media.setAttribute("alt", title);
			media.setAttribute("tabindex", "0");
			media.setAttribute("data-type", "media");
			media.setAttribute("data-mediaid", id);
			media.setAttribute("data-photographerId", photographerId);
		}
		//On créé l'evenement sur le clique du media pour ouvrir la modal LightBox
		media.setAttribute("onclick", `displayLightBox(${id},${photographerId})`);

		//On créé la div contenant le titre et le nombre de likes du media
		const divTitreCoeurMedias = document.createElement("div");
		divTitreCoeurMedias.setAttribute("class", "titre_coeur_medias");
		const NomMedias = document.createElement("h3");
		NomMedias.textContent = title;
		const NbLikesMedias = document.createElement("h4");
		NbLikesMedias.setAttribute("id", `nblikesmedias${id}`);
		NbLikesMedias.textContent = likes;
		const imgCoeur = document.createElement("img");
		imgCoeur.setAttribute("src", "assets/icons/favorite-Heart.svg");
		imgCoeur.setAttribute("alt", "Likes");
		imgCoeur.setAttribute("data-type", "likes");
		imgCoeur.setAttribute("data-mediaid", id);
		imgCoeur.setAttribute("data-likes", likes);
		imgCoeur.setAttribute("tabindex", "0");
		imgCoeur.setAttribute("onclick", `ajoutLikesMedias(${id},${likes})`);

		divTitreCoeurMedias.appendChild(NomMedias);
		divTitreCoeurMedias.appendChild(NbLikesMedias);
		divTitreCoeurMedias.appendChild(imgCoeur);
		div_media_title_like.appendChild(media);
		div_media_title_like.appendChild(divTitreCoeurMedias);

		return (div_media_title_like);
	}
	//On retourne le lien du media et la card du media
	return { picture, getMediaTemplate };

}
