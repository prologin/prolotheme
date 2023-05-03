# Thème utilisé par Prologin

## Comment personnaliser ce thème

Tout se passe dans votre fichier de configuration, sous la section `[params]`.

### Ajouter votre logo et votre favicon

1. Ajouter votre logo et votre favicon dans le dossier `static` à la racine de
   votre site
2. Remplir les champs `logo`, `logoText` et `favicon`

### Changer le style du site

Tout se passe dans votre fichier de configuration, sous la section
`[params.style]` (toutes les valeurs doivent être au format CSS).

Voici les possibilités actuelles :
- `primaryColor`   : Changer la couleur primaire du site (comprends au moins
                     la couleur du header et de la table des matière)
- `secondaryColor` : Changer la couleur secondaire du site (comprends au moins
                     la couleur de certains boutons)
- `headerFont`     : Changer la police utilisée pour l'entête



## Fonctionnalités de ce thème

### Les boites de mise en valeur

Il existe différents niveau de box :
- `info`     (bleue)
- `warning`  (orange)
- `error`    (rouge)
- `exercise` (vert)

Il est aussi possible d'ajouter un titre à sa box.
Le paramètre `title` est optionnel.

Voici comment les utiliser :

```
{{% box type="a type" title="A title" %}}
> A quote inside a box
Your text inside the box.
{{% /box %}}
```

### Texte en spoiler

On peut mettre du texte en mode "spoiler", c'est à dire qu'il est caché sous
un bandeau noir tant qu'on ne clique pas dessus (même fonctionnement que les
spoilers Discord). Pour créer un spoiler dans ton TP, il faut utiliser ceci :

```
{{< spoiler >}} My spoiling content {{< /spoiler >}}
```

Attention à utiliser des chevrons `<>` au lieu des `%`. Sinon cela ne
fonctionnera pas.


### Diviser votre TP

Un tp peut être long à lire... Nous vous conseillons donc de le diviser en différentes sous-parties.
Pour cela il suffit de rajouter ceci à l'endroit de la séparation :

```
[SECTION-BREAK]
```

Attention à bien laisser au moins une ligne vide avant et après cette balise pour éviter tout problème.



### Les codeblocks intéractifs

Utilisables via la spécification du langage `code<lang>` dans le type des
codeblocks, cela permet d'obtenir un codeblock intéractif directement sur le
navigateur web.

Par exemple pour afficher une console Python :
````
```codepython
````

#### Ajouter le support d'un langage pour les codeblocks intéractifs.

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

### Les vidéos

On peut inclure une vidéo comme ceci :

```
{{< video src="path/to/video" type="video/type" >}}
``` 

Les types suivants sont supportés:
- MP4
- WebM
- Ogg

On peut aussi la faire démarrer automatiquement avec l'option 'autoplay'.

```
{{< video src="path/to/video" type="video/type" autoplay="yes" >}}
```
