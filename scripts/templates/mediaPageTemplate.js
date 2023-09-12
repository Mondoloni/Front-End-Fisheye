function mediaPageTemplate(data) {

    const {name,photographerId,title,image,likes,price, date,video}=data;
    
    let picture ;
    let media;
    function getMediaTemplate() {
        
        const lien_ligthbox=document.createElement('a');
        lien_ligthbox.setAttribute("href","#");

        let source = image;
        if(image==undefined){
             picture = `assets/Sample Photos/${photographerId}/${video}`;
            media=document.createElement("video");
            media.setAttribute("src",picture);
            media.setAttribute("alt",title);
        }
        else{
            picture = `assets/Sample Photos/${photographerId}/${image}`;
            media=document.createElement("img");
            media.setAttribute("src",picture);
            media.setAttribute("alt",title);
            
        }
       
        media.setAttribute("src",picture);
        media.setAttribute("alt",title);
        lien_ligthbox.appendChild(media);
        
        const divTitreCoeurMedias = document.createElement('div');
        divTitreCoeurMedias.setAttribute("class","titre_coeur_medias");
        const NomMedias=document.createElement("h3");
        NomMedias.textContent=title;
        const NbLikesMedias=document.createElement("h4");
        NbLikesMedias.textContent=likes;
        const imgCoeur=document.createElement("img");
        imgCoeur.setAttribute("src","assets/icons/favorite-Heart.svg");
        imgCoeur.setAttribute("alt","Likes");

        divTitreCoeurMedias.appendChild(NomMedias);
        divTitreCoeurMedias.appendChild(NbLikesMedias);
        divTitreCoeurMedias.appendChild(imgCoeur);

        lien_ligthbox.appendChild(divTitreCoeurMedias);
        // console.log(lien_ligthbox);
    return (lien_ligthbox);
    }
    return {picture,getMediaTemplate};
    // return { name, picture, getPhotographTemplate }
}