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
    // return ({photograph:[...photographersWithId]});
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
        photograph[1].forEach((medias) => {
            console.log(medias);
         const mediaModel=mediaPageTemplate(medias);
          
         // const photographerModel = photographerTemplate(photographer);
         // const userCardDOM = photographerModel.getUserCardDOM();
         // photographersSection.appendChild(userCardDOM);
    });
        // console.log(photograph[1]);
    
}

 async function photopgraph() {
    // Récupère les datas des photographes
    const { photograph }=await getPhotographerById();
    displayData(photograph);
}

photopgraph();