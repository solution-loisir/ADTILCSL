module.exports = () => {
    const data = {}
    if(process.env.ELEVENTY_ENV === "dev") {
        data.base = "";
    } else if(process.env.ELEVENTY_ENV === "prod") {
        data.base = "https://loisir.netlify.app";
    }
    data.favicon = "./images/favicon.png";
    data.shortName = "ADTILCSL";
    data.longName = "Association des diplômés en TIL du Cégep de Saint-Laurent";
    data.description = `L'Association des diplômés de la Techniques de gestion et d'intervention en loisir du Cégep de Saint-Laurent. 
    Nous mettons régulièrement des outils de gestion, formations et astuces à votre disposition. 
    Nous discutons sur notre blog des projets variés destinés à améliorer la visibilité et les conditions d'emploi des Techniciens en loisir 
    Le Séjour plein air a lieu à chaque année au mois d'octobre. c'est l'occasion pour les étudiants du cours l'Adulte le sport et le plein air de réaliser leurs projets.`;
    data.url = "/";
    data.color = "#bce7f7";
    data.display = "standalone";
    data.blogList = "PLNBg23DC-dGOf3qMUPdMiiVAlKinIn9vC";
    data.formationList = "PLNBg23DC-dGPulIwpw11eTYEDotMjh05c";
    data.facebook = "https://www.facebook.com/assoloisirsaintlaurent/";
    data.youtube = "https://www.youtube.com/channel/UCxl_ENVFqZJPHtUED_WPUPg";
    return data;
}