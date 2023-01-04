# Fonctionnalités de ce thème

## Les shortcodes

4 différents shortcodes existent :
- `exemple`
- `exercice`
- `info`
- `cours`

Il permettent de différencier les parties du TP. Pour les utiliser, il faut mettre :

```
{{% Insérer_le_nom_du_shortcode %}}
```
au début de la partie à mettre dans ce style, et

```
{{% /Insérer_le_nom_du_shortcode %}}
```

à la fin.


## Diviser votre TP

Un tp peut être long à lire... Nous vous conseillons donc de le diviser en différentes sous-parties.
Pour cela il suffit de rajouter ceci à l'endroit de la séparation :

```
[SECTION-BREAK]
```

Attention à bien laisser au moins une ligne vide avant et après cette balise pour éviter tout problème.



## Les codeblocks intéractifs

Utilisables via la spécification du langage `code<lang>` dans le type des
codeblocks, cela permet d'obtenir un codeblock intéractif directement sur le
navigateur web. 

Par exemple pour afficher une console Python : 
````
```codepython
````

### Ajouter le support d'un langage pour les codeblocks intéractifs.

Pour l'instant, les langages suivants sont supportés:

- Python (module Turtle inclus)
- HTML

Dans le cas où en ajouter un nouveau serait intéressant, voici les étapes à suivre:

1. Ajouter le langage dans LANGS dans `static/js/codemirror_global.js`.
2. Ajouter le script du mode _CodeMirror_ correspondant dans `layouts/_default/single.html`
3. Ajouter un fichier `layouts/_default/_markup/render-codeblock-code<langage>.html`. S'inspirer de ceux existant.
4. Nommer le placeholder du code `code-<lang>-input-{{.Ordinal}}`. `{{.Ordinal}}` est une macro de Hugo qui est remplacée par son numéro de codeblock. C'est très important, car c'est ce qui permet au code de savoir le code de quel codeblock exécuter, et sur quel codeblock afficher la sortie.
5. Dans la partie JS, récupérer les textAreas et output dont on a besoin, créer un objet CodeMirror (se référer au code existant), et ensuite enregistrer le block en suivant le nom `<lang>{{.Ordinal}}`.
6. Dans `.../codemirror_global.js`, ajouter un commentaire `// === <lang> related ===` et créer la fonction `runItLang(content)`, où `content` est le deuxième argument passé à `addBlock()`.
7. Toujours dans `.../codemirror_global.js`, ajouter un appel à la fonction `runItLang()` dans `runIt()`.
8. Enfin, débugger pour fix les étapes que j'ai oubliées de citer.
