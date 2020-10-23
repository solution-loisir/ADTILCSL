module.exports = () => {
    const data = {}
    if(process.env.ELEVENTY_ENV === "dev") {
        data.base = "";
    } else if(process.env.ELEVENTY_ENV === "prod") {
        data.base = "https://loisir.netlify.app";
    }
    return data;
}