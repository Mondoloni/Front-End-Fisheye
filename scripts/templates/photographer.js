//La fonction prend en paramètre un objetc contenant les données du photographe
//retourne la card du photographe (image, nom, prenom, lieu, et tarif journalier)

//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
	const { name, id, city, country, tagline, price, portrait } = data;
	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("div");
		const img = document.createElement("img");
		const lienPhotographe = document.createElement("a");

		img.setAttribute("src", picture);
		img.setAttribute("alt", name);

		lienPhotographe.setAttribute("href", `./photographer.html?id=${id}`);
		lienPhotographe.setAttribute("aria-label", `Lien vers la page du photogrape ${name}`);

		article.appendChild(lienPhotographe);

		const h2 = document.createElement("h2");
		h2.textContent = name;

		const h3 = document.createElement("h3");
		h3.textContent = `${city}, ${country}`;

		const h4 = document.createElement("h4");
		h4.textContent = tagline;

		const h5 = document.createElement("h5");
		h5.textContent = `${price}€/jour`;

		lienPhotographe.appendChild(img);
		lienPhotographe.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(h4);
		article.appendChild(h5);

		return (article);
	}
	return { name, picture, getUserCardDOM };
}