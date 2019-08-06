![GitHub last commit](https://img.shields.io/github/last-commit/Yatoub42/dicecord.svg?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/Yatoub42/dicecord.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Yatoub42/dicecord/master?style=flat-square)
![Github package.json devel version](https://img.shields.io/github/package-json/v/Yatoub42/dicecord/devel?style=flat-square)
![GitHub](https://img.shields.io/github/license/Yatoub42/dicecord.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/Yatoub42/dicecord.svg?style=flat-square)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Yatoub42_dicecord&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Yatoub42_dicecord)
[![Known Vulnerabilities](https://snyk.io/test/github/Yatoub42/dicecord/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Yatoub42/dicecord?targetFile=package.json)
[![DeepScan grade](https://deepscan.io/api/teams/4033/projects/5839/branches/46510/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4033&pid=5839&bid=46510)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Yatoub42_dicecord&metric=alert_status)](https://sonarcloud.io/dashboard?id=Yatoub42_dicecord)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a618051850ac45279a004c69b0e3e400)](https://www.codacy.com/app/Yatoub42/dicecord?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Yatoub42/dicecord&amp;utm_campaign=Badge_Grade)  

Dépendances :  
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/discord.js.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/better-sqlite3.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/commander.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/moment.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/chance.svg?style=flat-square)

<!-- PROJECT LOGO -->
![GitHub Logo](include/logo.png)  
Générateur de dés en NodeJS pour Discord  
[Voir les sources »](https://github.com/Yatoub42/dicecord)  
[Changelog »](https://github.com/Yatoub42/dicecord/blob/master/CHANGELOG.md)  
[Un bug ? Une nouvelle fonctionnalité ?](https://github.com/Yatoub42/dicecord/issues)

<!-- TABLE OF CONTENTS -->
## Table des matières

- [Table des matières](#Table-des-mati%C3%A8res)
- [A Propos](#A-Propos)
  - [Créé avec](#Cr%C3%A9%C3%A9-avec)
- [Getting Started](#Getting-Started)
  - [Prérequis](#Pr%C3%A9requis)
  - [Installation](#Installation)
- [Utilisation](#Utilisation)
- [Contributions](#Contributions)
- [License](#License)
- [Contact](#Contact)

----

<!-- ABOUT THE PROJECT -->
## A Propos

 Il existe de nombreux excellents générateurs de dés disponibles sur GitHub. Cependant, nous n'en avons trouvé aucun qui corresponde vraiment à nos besoins et en avons donc créé un de toute pièce. Nous avons essayé de créer un bot de génération de dés tellement incroyable que ce sera le dernier dont vous aurez besoin.

----

### Créé avec

- [NodeJS](https://nodejs.org/en/about/)  
- [discord.js](https://discord.js.org/#/)  
- [moment.js](https://momentjs.com/)  
- [chance.js](https://chancejs.com/)  
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)  
- [commander.js](https://github.com/tj/commander.js/)  

----

<!-- GETTING STARTED -->
## Getting Started

 Pour obtenir une copie locale en cours d’exécution, suivez ces étapes.

### Prérequis

 nodeJS et npm

 ``` sh
 apt-get install nodejs npm
 ```

### Installation

1. Cloner le repo  

  ``` sh
  git clone https://github.com/Yatoub42/dicecord.git
  ```

2. Installer les dépendences  

  ``` sh
  npm i
  ```

3. Mettre en place le fichier de configuration  

  ``` sh
  cp include/resource.json include/resource.priv.json
  ```

4. Entrez les paramètres dans `resource.priv.json`  

  ``` json
  {
    "token1": "YOUR-TOKEN-HERE",
  }
  ```

5. Lancer l'instance du programme  

  ``` sh
  node dicecord.js --test
  ```

----

<!-- USAGE EXAMPLES -->
## Utilisation

 Nous conseillons l'utilistion de [PM2](https://pm2.io/doc/en/runtime/overview/) pour la gestion automatisée des instances de l'application.  
 Une fois le bot connecté à un salon Discord, l'interaction se fait avec des commandes préfixés par le préfixe configuré.  

----
<!-- CONTRIBUTING -->
## Contributions

 Les contributions sont ce qui fait de la communauté open source un endroit aussi incroyable pour apprendre, inspirer et créer. Toutes les contributions que vous faites sont **grandement appréciées**.

1. Forker le projet  
2. Créez votre branche de fonctionnalités (`git checkout -b feature/AmazingFeature`)  
3. Commiter les modifications (`git commit -m 'Add some AmazingFeature`)  
4. Pusher vers la branche (`git push origin feature/AmazingFeature`)  
5. Ouvrir une Pull Request  

----
<!-- LICENSE -->
## License

 Distribué sous la licence MIT. Voir `LICENCE` pour plus d'informations.  

----
<!-- CONTACT -->
## Contact

 [Yatoub42](https://github.com/Yatoub42)

----
