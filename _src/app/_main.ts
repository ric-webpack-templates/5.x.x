import { MaClasse } from "@MaLib/somePath";

/*
  REMARQUE : les fichiers css importés ici, donc par code, auront (grâce au css-loader), 
             leur contenu AUTOMATIQUEMENT intégré au bundle principal.
*/


//---------------    
//Import d'un css :
import "./css/styles3.css"; //<<<SYNTAXE nativement OK, mais sert à qcch GRÂCE à WebPack.
import "./css/styles4.css"; //Style appliqué au <body>
    

export class Main {
    public run(): void {
        //Classe css ci-dessous, très bien appliquée à la volée !!
        window.document.body.classList.add("italicFont");

        (new MaClasse()).saySuper();

    }

}