# HandyMirror API

Creation d'une API permettant de faire communiquer notre miroir connecté et notre application mobile.

## I - Installation

Plusieurs étapent sont à suivre, pour utiliser cette API.

```sh
# Récupération d'un projet
git clone https://github.com/StamIot/HandyMirror-API.git

# Déplacement dans le projet
cd HandyMirror-API

# Installation des dépendances
npm i
```

### II - Sécurité

A ce stade, le projet est presque prêt.
Il manque la partie sécurité du projet qui passe par l'utilisation du fichier **.env.sample** qui doit être renommé en **.env**
Ensuite il faut éditer celui-ci afin de répondre aux critères de l'API.

```perl
# Configuration de l'API
HOST=your-host # En local il s'agira ici d'indiquer localhost
PORT=your-port # only numbers here

# Configuration de la base de données
# Les identifiants sont spécifique à chacun.
MONGODB_USER=your-username
MONGODB_PASSWORD=your-password
MONGODB_CLIENT_NAME=your-client-name
MONGODB_DATABASE_NAME=your-database-name

# Collections utilisé dans les models
# /!\ Attention mongoDB ajoute un "s" à la fin alors soyez prudent.
MONGODB_COLLECTION_USERS=your-collection-name # exemple: users
MONGODB_COLLECTION_MODULES=your-collection-name # exemple: modules
```

## III - Démarrage de l'API

Il ne reste plus qu'à lancer la commande pour démarrer le projet.

```sh
# Démarrage de l'API
npm start
```

## IV - Connexion réussi

une fois connecté, vous obtiendrez ces messages :
![Exemple de connexion réussi](https://github.com/StamIot/HandyMirror-API/blob/feature/screens/connected_exemple.png)

## V - Découvrez HandyDocs

Nous avons mis en place une documentation écrite avec Swagger.
Elle permet à quiconque qui se retrouverai à la racine de l'API d'être redirigé vers le segment d'URL correspondant à cette documentation soit **/api/v1**.

voici le résultat obtenu à l'écran en **locale avec une configuration de type localhost**
![HandyDocs](https://github.com/StamIot/HandyMirror-API/blob/feature/screens/handyDocs.png)

---

## VI - A terme

Automaisation des tests unitaires avec Postman ou bien Jest.
