const MyCommonConfigurationClass = require("./webpack.config.common.js");


class MyDevConfigurationClass extends MyCommonConfigurationClass {
    getSpecificConfig() { //@override Pattern Template Method
        const oDevConfig = {
            mode: "development"    //REM.: Si on commente cette ligne ce sera "production" par défaut, et donc le bundle de sortie sera illisible/minifié (sur une ligne).
        };
        return oDevConfig;
    }
}


module.exports = (webPackEnvironmentVars) => { //Pour les WebPack config., lorsque module.exports 
                                               // renvoie une lambda, celle-ci peut recevoir en param. 
                                               // les vars d'env. WebPack.
                                               //(vars qui comprennent également celles perso. settées
                                               // sur la ligne de commande WebPack via param. --env MaVar=toto)

    const oConfig = MyCommonConfigurationClass.getCompleteConfig( //Méthode static
        MyDevConfigurationClass, //<<<Ma Classe enfant spécifique pour Dev.
        webPackEnvironmentVars
    );

    return oConfig; //Et bien sûr il nous faut retourner la config. !
};