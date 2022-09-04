class MyConfiguration {

  constructor(webPackEnvironmentVars) {
    this.webPackEnvironmentVars = webPackEnvironmentVars;
  }
  
  getCommonConfig() {
    const oMyCommonConfig = require("./webpack.config.common.js");
    return oMyCommonConfig;

  }// Fin getCommonConfig()

  //======================================================================

  /*** JE PROCEDE AINSI , parce-qu'avec Webpack5, je ne suis pas parvenu à faire fonctionner
    avec des fichiers de config. autres (un de dev et un de prod, exploitant chacun un autre contenant la common config.)
    ceci en utilisant l'option --config de WebPack.
    Du coup ici, je contourne en le laissant pointer vers son fichier de config. par défaut (webpack.config.js).

     Une histoire de souci avec "require" et le chemin de rech. des fichiers... 
     Ce n'est pas si grave tant pis :) .
  */
  getConfig() {
    const oCommonConfig = this.getCommonConfig();
    const oModeConfigComplement = (this.isDevMode())? 
        this.getDevModeConfigComplement() 
      : this.getProdModeConfigComplement();

    const oConfig = Object.assign(oCommonConfig, oModeConfigComplement);
    return oConfig;
  }

  isDevMode() { //IS_MODE_DEV var d'env. perso. 
                //(que j'ai settée dans les vars d'env. de WebPack en ligne de commande de webpack, param --env).
    return (this.webPackEnvironmentVars.IS_MODE_DEV==="true");
  }  

  getDevModeConfigComplement() {
    const oMyDevConfig = require("./webpack.config.dev.js");
    return oMyDevConfig;   
  }
  getProdModeConfigComplement() {
    const oMyProdConfig = require("./webpack.config.prod.js");
    return oMyProdConfig;     
  }  
}


module.exports = (webPackEnvironmentVars) => { //Lorsque module.exports renvoie une lambda, elle 
                                               //peut recevoir en param. les vars d'env. WebPack
                                               //(qui comprennent également celles perso. settées
                                               //sur la ligne de commande WebPack via param. --env
                                               //cf. package.json)
  console.log(webPackEnvironmentVars);
  //console.log(typeof(webPackEnvironmentVars.IS_MODE_DEV)); //string

  const oMyConfiguration = new MyConfiguration(webPackEnvironmentVars);
  const oConfig = oMyConfiguration.getConfig(); 

  return oConfig; //Et bien sûr il nous faut retourner la config. !
};