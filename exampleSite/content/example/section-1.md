It is strongly recommended to open the source folder to understand the syntax of
the shortcodes and the file structure.

# Markdown

This theme support all the markdown features supported by Hugo. Here is a
reminder: 
- An unordered list
- With **bold**
- _italic_
- ~~crossed out~~
- <u>underlined</u>
- and `inline codeblock`

1. And an ordered list
2. With a [link to Prologin](https://prologin.org "Prologin site")
3. and a [link to the wiki](https://gitlab.com/prologin/tech/packages/prolotheme/-/wikis/home)

> Here is a quote.

## A spoiler block

The next sentence includes a spoiler. Click on the black text to reveal
something!
What is yellow and wait? {{< spoiler >}}A lemon
in an elevator{{</ spoiler >}}.

## Overview of a page

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum mi ligula, eu dictum purus feugiat in. Nam tempor et mi a pellentesque. Nunc aliquam interdum purus euismod scelerisque. {{% overview "/example_single/" %}}**This** text can be hovered{{% /overview %}}. Nulla nisl arcu, pellentesque vitae pellentesque a, fringilla eu nisi. Quisque semper, ligula vitae porta semper, neque ligula vulputate dolor, eu porttitor quam nunc eu nisi. Pellentesque vel metus libero. Vestibulum laoreet leo ut est porttitor aliquet. Duis ut magna tincidunt, porttitor ex sed, tempus eros. In pellentesque nibh ut scelerisque viverra. 

# Codeblocks

The exhaustive list of languages coloration supported by hugo can be found 
[here](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages). 

## Classical codeblocks

```python
def function():
    """
    There is a python codeblock with a copy button

    Most of the languages are supported (see hugo supported languages)
    """
    print("An example codeblock with copy button")
```

```python {nocopy=true}
def function():
    """
    There is a python codeblock without copy button
    """
    print("An example codeblock without copy button")
```


```scratch
when flag clicked
say [This is an example of scratch blocks]
say [Go to the dedicated example if you want to know more]
```

## Codestep
{{< codestep steps=4 lang="py" run="false" >}}

{{< codestep-block desc="" >}}
# There is also a "step by step" codeblock.
 
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

## Codestep with run button

{{< codestep steps=3 lang="py" run="true" >}}

{{< codestep-block desc="" >}}
# Compared to the previous one, this codestep has a 'Run'
# button at the end of the steps
 
{{< /codestep-block >}}

{{< codestep-block >}}
answer = input("Choose a number:")
{{< /codestep-block >}}

{{< codestep-block >}}
print("You answered:", answer)
{{< /codestep-block >}}

{{< /codestep >}}


## Interactive codeblocks

```codepython
print("A codeblock to execute python code")
print(input("This is an input, write what you want:"))
```

```codehtml
<p class="test">This is an <em>HTML</em> interactive codeblock</p>
<style>
.test {
    color: red;
}
</style>
```


