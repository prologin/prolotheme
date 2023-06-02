Il est conseillé d'ouvrir le dossier `exampleSite/exemple/` afin de comprendre la syntaxe des différentes commandes et la structure des fichiers.
Avant tout, pense à remplir les différentes `meta-data` qui sont utiles pour 
que ton TP soit correctement répertorié et affiché sur le site. 

# Voilà le premier titre principal du TP

## Et un sous-titre...

### Et un sous-sous-titre...

Ici nous avons un simple paragraphe avec vraiment beaucoup de texte, encore et
encore du texte. Du texte à foison afin d'expliquer complètement aux filles les
différentes notions abordées... 

Nous avons ici du texte en **gras**, _italique_, ~~barré~~, `inline codeblock`,
**_gras et italique_**, [un lien vers google](https://www.google.fr),
<u>souligné</u>, etc...
Toutes les balises markdown sont prises en compte par Hugo (si ce n'est pas le
cas, vous pouvez ouvrir une issue sur [gitlab](https://www.gitlab.com/prologin/tech/packages/hugo-base-theme)). 

> Nous avons aussi ici une citation.

{{< codestep steps=4 lang="py" >}}

{{< codestep-block desc="" >}}
# Nous avons aussi des codeblock du type `step-by-step`
# comme celui-ci
{{< /codestep-block >}}

{{< codestep-block desc="If `1 < 2`, we print **Smaller**" >}}
if 1 < 2:
    print("Smaller")
{{< /codestep-block >}}

{{< codestep-block desc="Otherwise, we print _Greater_" >}}
else:
    print("Greater")
{{< /codestep-block >}}

{{< codestep-block desc="" >}}
print("End of code")
{{< /codestep-block >}}

{{< /codestep >}}


```python
def function():
    """
    Nous avons ici un code block python que les participantes peuvent copier
    directement grâce au bouton prévu à cet effet.

    De très nombreux langages sont pris en compte dans cette coloration
    syntaxique.
    """
    print("Un TP d'exemple qui sert aussi de cheat-sheet")
```

La liste complète des langages ayant une coloration syntaxique est disponible 
[ici](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages). 

Il y a aussi un autre type de balise code. Ce sont des balises qui permettent
d'exécuter directement du code dans le navigateur. Elles sont disponibles en
python et en HTML. 

```codepython
print("Une balise pour exécuter du code en python")
```

```codehtml
<p class="test">Un paragraphe de <em>test</em></p>
<style>
.test {
    color: red;
}
</style>
```


