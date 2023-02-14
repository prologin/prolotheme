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

## Texte en spoiler

On peut mettre du texte en mode "spoiler", c'est à dire qu'il est caché sous
un bandeau noir tant qu'on ne clique pas dessus (même fonctionnement que les
spoilers discord). Pour créer un spoiler dans ton TP, il faut utiliser ceci :

```
{{< spoiler >}} My spoiling content {{< /spoiler >}}
```

Attention à utiliser des chevrons `<>` au lieu des `%`. Sinon cela ne
fonctionnera pas.


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


1. Ajouter dans `build.sh` la commande pour copier le fichier correspondant au language que vous voulez rajouter. 
    La liste des languages est disponible ici : https://www-sop.inria.fr/teams/marelle/advanced-coq-16-17/jscoq/external/CodeMirror/mode/
2. Ajouter le script du mode _CodeMirror_ correspondant dans `layouts/_default/single.html`
3. Ajouter un fichier `layouts/_default/_markup/render-codeblock-code<langage>.html`. S'inspirer de ceux existants.
4. Dans `codeblocks.js`, ajouter un block `(function(){})()` et y définir les
    fonctions `runCode<lang>()` et `initCode<lang>()`. Il faut également
    appliquer `initCode<lang>()` à tous les blocks trouvés dans le document.
