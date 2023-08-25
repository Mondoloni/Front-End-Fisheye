    //récupére les données des photographes dans le fichier
    //JSON photographers.json
    //et retourne un tableau
    async function getPhotographers() {
          
        let photographers=[]
        let reponse=await fetch('../../data/photographers.json')
        let data=await reponse.json()

        return ({
           photographers: [...data.photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
