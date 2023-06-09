---
show_toc: true
---

# Une nouvelle section !

Cette nouvelle section est écrite dans le fichier `section-2.md`.
La section précédente était écrite dans le fichier `section-1.md`.

La ligne `layout: multiple_sections` a été ajoutée dans le front-matter de `index.md`
pour permettre au site de les reconnaitre.

Cette section contient une *Table des Matières* car l'option `show_toc: true`
a été ajoutée au front-matter de ce fichier

{{% box type="info" title="Un titre _avec_ `du` **markdown**" %}}

Il est aussi possible de mettre en valeur certaines parties d'un
TP, pour que celui-ci soit plus lisible et agréable à lire. 
Ils sont appelés des `shortcodes`. 

{{% /box %}}

Voici la fin d'une boite _info_.

{{% box type="info" %}}

Une box _info_ sans titre.

{{% /box %}}


{{% box type="warning" title="Un titre" %}}

Voici une boite _warning_.
Nous pouvons ajouter toutes sortes de balises Markdown dans des shortcodes.
# Comme des titres
## Des sous-titres, etc...
> Et des citations

{{% /box %}}

{{% box type="warning" %}}

Une box _warning_ sans titre.

{{% /box %}}


{{% box type="error" title="Un titre" %}}

Voici une box _error_.

{{% /box %}}

{{% box type="error" %}}

Voici une box _error_ sans titre.

{{% /box %}}

{{% box type="exercise" title="Un titre" %}}

Voici une box _exercise_.

{{% /box %}}

{{% box type="exercise" %}}

Voici une box _exercise_ sans titre.

{{% /box %}}

## Un block spoiler

La phrase suivante contient un spoiler. Il cache une zone de texte, qui est
révélée quand on appuie dessus.
Qu'est-ce qui est jaune et qui attend ? {{< spoiler >}}Un citron
dans un ascenseur{{</ spoiler >}}.
