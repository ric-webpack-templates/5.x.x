const MyCommonConfigurationClass = require("./webpack.config.common.js");


class MyProdConfigurationClass extends MyCommonConfigurationClass {
    getSpecificConfig() { //@override (Pattern Template Method)
        const oProdConfig = {
            mode: "production"
        };
        return oProdConfig;
    }
}


module.exports = (webPackEnvironmentVars) => { //Pour les WebPack config., lorsque module.exports 
                                               // renvoie une lambda, celle-ci peut recevoir en param. 
                                               // les vars d'env. WebPack.
                                               //(vars qui comprennent également celles perso. settées
                                               // sur la ligne de commande WebPack via param. --env MaVar=toto)

    const oConfig = MyCommonConfigurationClass.getCompleteConfig( //Méthode static
        MyProdConfigurationClass, //<<<Ma Classe enfant spécifique pour Prod.
        webPackEnvironmentVars
    );

    return oConfig; //Et bien sûr il nous faut retourner la config. !
};