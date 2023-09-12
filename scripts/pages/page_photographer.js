//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById() 
{
    let photograph=[];
    let params = new URL(document.location).searchParams;
    let idToFetch = Number(params.get("id"));
    let response = await fetch('./data/photographers.json');

if(response.ok){
    let data=await response.json();
    // console.log(data);
    const photographersWithId = data.photographers.filter(photographer => photographer.id === idToFetch);
    const MediaToPhotograp = data.media.filter(medias=>medias.photographerId===idToFetch);
    photograph.push(photographersWithId)
    
    photograph.push(MediaToPhotograp)
   
    return ({photograph});
    }
else
    {
    alert("HTTP-Error: " + response.status);
    }
}

async function displayData(photograph) {
        const photographersSection = document.querySelector(".photograph-header");
        const photographerModel = photographerPageTemplate(photograph[0]);
        const userCardDOM = photographerModel.getPhotographTemplate();
  
        photographersSection.insertBefore(userCardDOM.div_photograph_name,photographersSection.firstChild);
        photographersSection.appendChild(userCardDOM.img);

        const photographerMain=document.getElementById("main");
        photographerMain.appendChild(userCardDOM.div_photograph_medias);

        const divMedia=document.createElement("div");
        divMedia.setAttribute("class","medias-photograph");
        userCardDOM.div_photograph_medias.appendChild(divMedia);

        photographerMain.appendChild(userCardDOM.divLikes);

        //Ajout du nom du photographe dans la modal
        const modalSection=document.getElementById("header-modal-contact");
        modalSection.appendChild(userCardDOM.h2NomModal);
        // const modalImgClose=document.getElementById("imgclosemodal");
        // modalSection.insertBefore(userCardDOM.h2NomModal,modalImgClose);


        photograph[1].forEach((medias) => {
            // console.log(medias);
            const mediaModel=mediaPageTemplate(medias);
            const userCardMedia=mediaModel.getMediaTemplate();
            divMedia.appendChild(userCardMedia);
         });
        // console.log(photograph[1]);
    }

 async function photopgraph() {
    // Récupère les datas des photographes
    const { photograph }=await getPhotographerById();
    displayData(photograph);
}

photopgraph();