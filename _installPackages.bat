
REM Pour création du package.json
REM call npm init


REM ------- Récup. dern. versions ---------

REM
call npm i -D  webpack webpack-cli

REM Pour la gestion des .ts par WebPack. (REM. : pas du tout besoin de faire : npm i -D typescript)
call npm i -D  ts-loader

REM Plugin permettant que la rubrique "paths:" du tsconfig.json, soit bien prise en compte et exploitable par le code .ts.
call npm i -D tsconfig-paths-webpack-plugin

REM Pour les styles
call npm i -D css-loader
call npm i -D style-loader