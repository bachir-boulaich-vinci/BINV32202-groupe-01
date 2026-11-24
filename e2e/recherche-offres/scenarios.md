# Scénario 1 : Rechercher un texte contenu dans le titre sans distinguer la casse

## Etat initial : 
Rôle : étudiant
Etudiant : Inès Haddad
Titre des offres visibles pour l'étudiant (statut "publiée") : 
- Assistant conversationnel interne
- Tableau de bord de qualité des données
- Application React de gestion de flotte
- API REST de facturation

## Actions dans l'interface : 
Cliquer sur offre
Cliquer sur la barre de recherche
Ecrire "react" avec un r minuscule

## Résultat attendu : 
On devrait juste voir l'offre avec le titre : "Application React de gestion de flotte".

# Scénario 2 : Taper uniquement des espaces dans la barre de recherche 

## Etat initial : 
Rôle : étudiant
Etudiant : Inès Haddad
Titre des offres visibles pour l'étudiant (statut "publiée") : 
- Assistant conversationnel interne
- Tableau de bord de qualité des données
- Application React de gestion de flotte
- API REST de facturation

## Actions dans l'interface : 
Cliquer sur offre
Cliquer sur la barre de recherche
Ecrire "     " dans la barre de recherche

## Résultat attendu : 
Toutes les offres de l'état initial doivent encore être visibles.