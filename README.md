# Hugo theme created and used by Prologin

## How to use this theme?

The Makefile has multiple useful rules needed for developing your website:
  - `deploy`: compile dependencies and zip given resources
  - `dependencies`: compile dependencies
  - `given_resources`: zip all given resources
  - `clean`: clean the dependencies and the given resources
  - `clean_resources`: clean the given resources only
  - `clean_dependencies`: clean the dependencies only
  - `preview`: preview the theme using the example site

Before deploying the website, you need to call the `deploy` rule to make sure
that your website will work correctly.


## How to customize this theme?

Every available customization can be made via variables in the hugo config file.
All the described variables have to be under the `params` section. 


### Add your logo and your favicon

1. Store them in the `static` folder in the root directory of the hugo site (not the _theme_ static directory)
2. Fill the fields `logo` and `favicon` with the hugo paths of your files
3. Fill the field `logoText` to setup alternate text for your logo


### Change tags color

To change the default tag color, you need to add colors associated to your tags
under the section `params.tags`.

For example, to define the color of the tag `Example` to _green_ (case doesn't matter), you
need to add `example = "green"` under the sections `params.tags`.


### Customize CSS

The following fields need to be written under the subsection `style` (all the
values must be in the CSS classical format):

- `primaryColor`   : Change the primary color of the website (at least site
                     header and table of content color)
- `secondaryColor` : Change the secondary color of the website (at least
                     _codeblocks_ buttons)
- `headerFont`     : Change font used for the title of the site header
- `colorScheme`    : Generate colored item list using those colors. The given
                     colors must be a list
- `menuOffset`     : Change the max random offset of the items in the list
                     layout


## Content Features

### Highlight boxes

There are different levels of highlight boxes:

- `info`     (blue)
- `warning`  (orange)
- `error`    (red)
- `exercise` (green)

You also can add a title to your boxes using the `title` parameter:

```
{{% box type="a required type" title="A optional title" %}}
> A quote inside a box
Your text inside the box.
{{% /box %}}
```


### Spoiler text

You can also use `spoiler` shortcode to hide some content until the user clic on
it to make it visible (like Discord spoilers):

```
{{< spoiler >}} My spoiling content {{< /spoiler >}}
```


### Include videos

You can include video using this shortcode:

```
{{< video src="path/to/video" type="video/type" >}}
``` 

The following types are supported:
- MP4
- WebM
- Ogg

You can use `autoplay` parameter to automatically start the video (default: no):
```
{{< video src="path/to/video" type="video/type" autoplay="yes" >}}
```


### Step-by-step codeblockcs

It is possible to display some code "step-by-step" using the `codestep`
shortcode. Here is an example of how to use it:

```
{{< codestep steps=3 lang="py" desc="If `1 < 2`, we print **Smaller**" >}}

{{< codestep-block >}}
if 1 < 2:
    print("Smaller")
{{< /codestep-block >}}

{{< codestep-block desc="Otherwise, we print _Greater_" >}}
else:
    print("Greater")
{{< /codestep-block >}}

{{< codestep-block >}}
print("End of code")
{{< /codestep-block >}}

{{< /codestep >}}
```

The required arguments for the `codestep` shortcode are:
- `steps`: the number of steps (it is the number of `codestep-block`
           sub-shortcode)
- `lang`:  the language of the codeblock

There is also an optional argument for the `codestep-block` shortcode:
- `desc`: used to describe this specific block of code. Only displayed when the
          related block of code is highlighted. Markdown is also supported.

**/!\ If _one_ `codestep-block` in a given `codestep` has a description, they
all need to have a description (that can be empty) /!\**


### Divide the subject in multiple sections

A subject can be very long... It is strongly recommanded to divide it into
multiple subsection adding this line to the front-matter of `index.md`

```toml
layout: multiple_sections
```

The different sections must be named `section-<number>.md` and
placed in the same directory as `index.md`.

In each section file, the following front matter must be added:

```toml
---
show_toc: true/false
---
```

If the value `show_toc` is set to `true`, the section will be displayed with a
table of content.

When each sections have a relatively small table of contents, it is possible
to show only *one* table for the full subject.

This can be enabled by adding `toc: general` to the front matter of `index.md`.
In general mode, the table of content will always be shown, therefore, the `show_toc`
option in each section's front matter will be ignored.

### Interactives codeblocks

You can generate interactives codeblocks (to let users directly run their code
on the website) adding the `code<lang>` tag in the codeblock types.   

For example, here is how to create interactive Python codeblocks:

````
```codepython
# Some Python code
print("Hello World!")
```
````

#### Supported languages

- Python (Turtle included)
- HTML


#### Add a new language support

1. Add a line in `dependencies` make rule to copy the javascript file related to the language you want to
   add. Available languages can be found [here](https://www-sop.inria.fr/teams/marelle/advanced-coq-16-17/jscoq/external/CodeMirror/mode/)
2. Link the script of the _CodeMirror Mode_ in `layouts/_default/single.html`
3. Create a new file named `layouts/_default/_markup/render-codeblock-code<lang>.html` by copying an existing one.
    Change the class of the main `div` and modify the output tags based on what you need.
4. In the file `codeblocks.js`, add a new `(function(){})()` block and define
   the functions `runCode<lang>()` and `initCode<lang>()` inside of the brackets.
   After defining them, you must call `initCode<lang>()` on each codeblock of
   said language found on the page.


### Hide `Copier` button on codeblocks

You can also hide the copy button if the text inside the codeblock is not
supposed to be copied. To do so, you just have to define the argument `nocopy`
in the codeblock definition, like this:

````
```python {nocopy=true}
print("Blabliblou")
```
````


## Give resources to the user

Zipping resources is made automatically by the `make given_resources` rule.
**Don't forget to call it in your init script in your hugo site!**

### Warning!

This script is based on the archetype available in `archetypes/subject/`.
Therefore, it must be used to make sure the script processes correctly given
resources.

To allow users to download the resources, you must fill the `code_stub_url`
front matter like this:

```
# If multiple resources or a folder is given
./resources/given_resources/<subject_title>.zip

# If only one file is given
./resources/given_resources/<name_of_file>
```
