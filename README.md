<!-- PROJECT SHIELDS -->
![GitHub last commit](https://img.shields.io/github/last-commit/Yatoub42/dicecord.svg?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/Yatoub42/dicecord.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Yatoub42/dicecord.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/Yatoub42/dicecord.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/Yatoub42/dicecord.svg?style=flat-square)   

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/discord.js.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/better-sqlite3.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/commander.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/moment.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Yatoub42/dicecord/chance.svg?style=flat-square)

<!-- PROJECT LOGO -->
![GitHub Logo](include/logo.png)   
Générateur de dés en NodeJS pour Discord  
[Voir les sources »](https://github.com/Yatoub42/dicecord)   
[Un bug ?](https://github.com/Yatoub42/dicecord/issues) [Une nouvelle fonctionnalité ?](https://github.com/Yatoub42/dicecord/issues)


<!-- TABLE OF CONTENTS -->
## Table des matières

- [Table des matières](#table-des-mati%C3%A8res)
- [A Propos](#a-propos)
  - [Créé avec](#cr%C3%A9%C3%A9-avec)
- [Getting Started](#getting-started)
  - [Prérequis](#pr%C3%A9requis)
  - [Installation](#installation)
- [Utilisation](#utilisation)
- [Contributions](#contributions)
- [Remerciements](#remerciements)
- [License](#license)
- [Contact](#contact)

----

<!-- ABOUT THE PROJECT -->
## A Propos

Il existe de nombreux excellents modèles de générateurs de dés disponibles sur GitHub et ou npm. Cependant, nous n'en avons trouvé aucun qui corresponde vraiment à nos besoins et en avons donc créé un amélioré. Nous avons essayé de créer un bot de génération de dés tellement incroyable que ce sera le dernier dont vous aurez besoin.

----

### Créé avec

* [NodeJS](https://nodejs.org/en/about/)
* [discord.js](https://discord.js.org/#/)

----

<!-- GETTING STARTED -->
## Getting Started

Pour obtenir une copie locale en cours d’exécution, suivez ces étapes.

### Prérequis

* npm
```sh
npm install npm@latest -g
```

### Installation

1. Cloner le repo
```sh
git clone https:://github.com/your_username_/Project-Name.git
```
2. Installer les dépendences
```sh
npm install
```
3. Mettre en place le fichier de configuration
```sh
cp include/resource.json include/resource.priv.json
```
4. Entrez les paramètres dans `resource.priv.json`
```json
{
  "token1": "YOUR-TOKEN-HERE",
}
```
5. Lancer l'instance du programme
```sh
node discord.js --test
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
<!-- REMERCIEMENTS -->
## Remerciements

1. <div>Icône de README fait par <a href="https://www.flaticon.com/authors/dimi-kazak" title="Dimi Kazak">Dimi Kazak</a> de <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> sous license <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


----
<!-- LICENSE -->
## License

Distribué sous la licence MIT. Voir `LICENCE` pour plus d'informations.


----
<!-- CONTACT -->
## Contact

[Yatoub42](https://github.com/Yatoub42)

----