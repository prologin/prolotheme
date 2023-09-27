---
show_toc: true
---

# A new section! 

This new section is written in the `section-2.md` file while the previous one is
written in the `section-1.md` file.

The front-matter `layout: multiple_sections` has been added in `index.md`
to allow the theme to render this post written in multiple sections.

This section has its own table of content thanks to the `show_toc: true` front
matter in this section file.

# Boxes

{{% box type="info" title="A title _with_ **markdown**" %}}

It is possible to highlight some paragraphs using boxes. 
The shortcode is the `box` with a mandatory parameter and an optional one.
See [this page of the wiki](https://gitlab.com/prologin/tech/packages/prolotheme/-/wikis/User-guide/Tools-Provided#highlight-boxes)
for more information.

{{% /box %}}

Here is the end of an _info_ box.

{{% box type="info" %}}

An _info_ box without title.

{{% /box %}}


{{% box type="warning" title="A title" %}}

A _warning_ box with title.

{{% /box %}}

{{% box type="warning" %}}

A _warning_ box without title.

{{% /box %}}


{{% box type="error" title="Un titre" %}}

An _error_ box with title.

{{% /box %}}

{{% box type="error" %}}

An _error_ box without title.

{{% /box %}}

{{% box type="exercise" title="Un titre" %}}

An _exercise_ box with title.

{{% /box %}}

{{% box type="exercise" %}}

An _exercise_ box without title.

{{% /box %}}
