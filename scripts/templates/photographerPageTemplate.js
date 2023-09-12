function photographerPageTemplate(data) {
    const {name,id,city,country,tagline,price,portrait}=data[0];
    const picture = `assets/photographers/${portrait}`;

    function getPhotographTemplate() {
        
        //Partie avec le nom prenom, ville, image, citation du phtographe
        const div_photograph_name=document.createElement('div');
        div_photograph_name.setAttribute("class","photograph-name");
        const id_photograph = document.createElement( 'h2' );
        id_photograph.textContent=name;
        const town_photograph = document.createElement( 'h3' );
        town_photograph.textContent=`${city}, ${country}`
        const tagline_photograph =document.createElement('h4');
        tagline_photograph.textContent= tagline;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        div_photograph_name.appendChild(id_photograph);
        div_photograph_name.appendChild(town_photograph);
        div_photograph_name.appendChild(tagline_photograph);

        //Partie des médias du photographe

        const div_photograph_medias=document.createElement('div');
        div_photograph_medias.setAttribute("class","photograph-medias");
        
        const label_tri_medias=document.createElement('label');
        label_tri_medias.textContent="Trier par";

        const select_tri_medias=document.createElement('select');
        select_tri_medias.setAttribute("id","tri_medias");

        const option_tri_popularite=document.createElement('option');
        option_tri_popularite.setAttribute("value","popularite");
        // option_tri_popularite.setAttribute("selected",true);
        option_tri_popularite.textContent="Popularité"
        const option_tri_date=document.createElement('option');
        option_tri_date.setAttribute("value","date");
        option_tri_date.textContent="Date";
        const option_tri_titre=document.createElement('option');
        option_tri_titre.setAttribute("value","titre");
        option_tri_titre.textContent="Titre"
        
        select_tri_medias.appendChild(option_tri_popularite);
        select_tri_medias.appendChild(option_tri_date);
        select_tri_medias.appendChild(option_tri_titre);


        label_tri_medias.appendChild(select_tri_medias);
        div_photograph_medias.appendChild(label_tri_medias);

        //Div des likes et du tarifs journalier en bas de page
        const divLikes=document.createElement("div");
        divLikes.setAttribute("class","photograph_likes");

        const h4LikesNbr=document.createElement("h4");
        h4LikesNbr.setAttribute("class","likes-number");
        h4LikesNbr.textContent="10000";

        const imgCoeurLikes=document.createElement("img");
        imgCoeurLikes.setAttribute("src","assets/icons/favorite-Heart-Black.svg");
 
        
        const h4Tarif=document.createElement("h4");
        h4Tarif.setAttribute("class","tarif-journalier");
        h4Tarif.textContent=`${price}€ / jour`;

        divLikes.appendChild(h4LikesNbr);
        divLikes.appendChild(imgCoeurLikes);
        divLikes.appendChild(h4Tarif);

    //Pour le nom dans la modal
    const h2NomModal=document.createElement("h2");
    h2NomModal.textContent=name;
        
// console.log(label_tri_medias);


        return {div_photograph_name,img,div_photograph_medias,divLikes,h2NomModal};
    }
    return { name, picture, getPhotographTemplate };
}