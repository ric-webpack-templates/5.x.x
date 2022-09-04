const oPathTool = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");


const oConfig = {

  mode: "development"  
  
  , entry: {
    //--- Ensemble des fichiers à "bundler" ----

     // 1er bundle :  ici 1 seul fichier .ts + bien sûr indirectement ses dépendances (.ts & .js) éventuelles.
     //               Le nom du bundle une fois buildé, sera (cf. output.filename ci-dessous) :  
     //                 allJS.bundle.js et il sera mis dans le sous-dossier js/
     //                 du répertoire de build.    
     // Ce allJS.bundle.js sera bien sûr à inclure dans index.html, via <script src="...">.
     // NECESSITE bien sûr un TS loader(parse/transpile des TS pour les intégrer au bundle) 
        "js/allJS": ["./_src/app/index.ts"], 


     // 2eme bundle :  plusieurs régles .css, mergées en 1 bundle à partir de fichiers .css.
     //                  (remarque: lorsque doublon de règle css, la dernière apparue fait foi).
     //                Le nom du bundle une fois buildé, sera (cf. output.filename ci-dessous) :  
     //                 allCSS.bundle.js et il sera mis dans le sous-dossier css/
     //                 du répertoire de build.    
     // Ce allCSS.bundle.js sera bien sûr à inclure dans index.html, via <script src="...">.
     //  Remarque : bien que ce bundle à inclure contiennent du code javascript,
     //             les règles .css évoquées, feront bien leur effet sur l'html !
     // NECESSITE bien sûr un css loader(lecture des css pour les intégrer au dit bundle) 
     //          + un style loader (rendre ces règles css exploitables par du html)
        "css/allCSS": [
          "./_src/app/css/styles1.css", 
          "./_src/app/css/styles2.css", 
        ],

  }
  ,output: {
      path: oPathTool.resolve(__dirname, `./_build`)        
      ,filename: "[id].bundle.js"  //[id]  = valeur de chacune des clefs de l'objet entry ci-dessus.
                                    // Génèrera donc ces bundles :
                                    //   ./_build/js/allJS.bundle.js
                                    //   ./_build/css/allCSS.bundle.js //<<< Ok il suffira de l'inclure dans index.html via <script src="...">
  }


  //--------------------------------------

  , module: {
    
    //-- Divers loader et, patterns des fichiers les concernant --
    rules: [ 
      //Pour gestion des fichiers .ts :
      {
        test: /\.ts$/  //Extension des fichiers à traiter (ne pas mettre entre guillemets !)
        ,use: [ 
          { loader: "ts-loader"  }  //Parse et rend utilisable le contenu des fichiers .ts
        ]
      },

      //Pour gestion des fichiers .css
      {
        test: /\.css$/  //Extension des fichiers à traiter (ne pas mettre entre guillemets !)
        ,use: [ 
           { loader: "style-loader" }, //Gestion de l'inclusion des styles détectés.
           { loader: "css-loader" } //Parse et rend utilisable le contenu des fichiers .css
        ] ///<<<<<< ATTENTION : IL FAUT mettre "style-loader" avant "css-loader" sinon plantage !! <<<<<<<<
      },
      
    ]
  }
  ,resolve: {
    extensions: [ ".ts", ".js" ], // ".js" juste rajouté pour pouvoir traiter aussi en entrée des .js.

    alias:{ //MAPPAGES, pour imports de : modules avec chemin non-relatifs (cf. projets Typescript d'essais)

    },

    plugins: [
      new TsconfigPathsPlugin({ //Plugin permettant que la rubrique "paths:" du tsconfig.json, soit bien prise en compte et exploitable par le code .ts.
        configFile: "./tsconfig.json"
      }),
    ]    

  }

};


module.exports = oConfig;