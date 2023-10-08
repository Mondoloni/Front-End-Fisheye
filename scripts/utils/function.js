//La fonction est utilisée dans un autre fichier js
// eslint-disable-next-line no-unused-vars
async function recuperationData(lienData) {
    const reponse = await fetch(lienData);
    const data = await reponse.json();
    return { data, reponse };
}