# Conventions de style frontend

## CSS et styles

- Préférer les CSS Modules (`*.module.css`) pour les styles propres à un
  composant.
- Réserver une feuille CSS globale aux styles de base réellement partagés.
- Ne pas utiliser l'attribut JSX `style`. Les styles calculés doivent utiliser
  `sx` avec Material UI ou une classe CSS Module adaptée.

## Material UI

Lorsqu'un écran utilise Material UI, l'application doit être enveloppée par un
`ThemeProvider` utilisant un thème créé avec `createTheme`, avec un
`CssBaseline` placé dans ce provider. Utiliser `sx` pour les styles des
composants MUI.

Privilégier les composants adaptés au besoin (`Typography`, `Card`, `Stack`,
`Container` et `Grid`). Une grille doit rester responsive et les composants
`Rating` utilisés uniquement pour l'affichage doivent avoir `readOnly`.

Le projet actuel n'utilise pas Material UI ; ces règles s'appliquent dès qu'une
dépendance MUI est introduite.
