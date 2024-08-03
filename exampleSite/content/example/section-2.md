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

{{% box "info" "A title _with_ **markdown**" %}}

It is possible to highlight some paragraphs using boxes. 
The shortcode is the `box` with a mandatory parameter and an optional one.
See [this page of the wiki](https://gitlab.com/prologin/tech/packages/prolotheme/-/wikis/User-guide/Tools-Provided#highlight-boxes)
for more information.

{{% /box %}}

Code for the info block:

```text
{{%/* box "info" "The title field is optional" */%}}

This is an info box. The type can also be 'warning', 'danger' or 'exercise'.
You can see it rendered below:

{{%/* /box */%}}
```

You can also label the parameters with `type=` and `title=` as shown below.

```text
{{%/* box type="info" title="The title field is optional" */%}}

Here is an info box.

{{%/* /box */%}}
```

Here is the end of an _info_ box.

{{% box "info" %}}

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

## Custom colors

{{% box type="info" title="A box with custom colors" bgColor="#C8B1F7" titleColor="#AA84F7" %}}

You can create a box with custom colors using the `bgColor` and `titleColor` options.

Note that you *need* to label the `title` and `type` parameters to use colors.

{{% /box %}}

Code used for the box shown above:

```text
{{%/* box type="info" bgColor="#C8B1F7" titleColor="#AA84F7" */%}}

The `bgColor` and `titleColor` fields supports all named colors in CSS.

{{%/* /box */%}}
```

# Gallery

You can show images one at a time using the gallery shortcode.
It also allows you to give a little description of each image.

{{< gallery steps=3 >}}

{{< gallery-img src="./resources/images/step1.png" desc="Image 1" >}}
{{< gallery-img src="./resources/images/step2.png" desc="" >}}
{{< gallery-img src="./resources/images/step3.png" desc="*Last* image" >}}

{{< /gallery >}}

You can also activate animations between each frames.

{{< gallery steps=3 animation=true >}}

{{< gallery-img src="./resources/images/step1.png" desc="Image 1" >}}
{{< gallery-img src="./resources/images/step2.png" desc="" >}}
{{< gallery-img src="./resources/images/step3.png" desc="*Last* image" >}}

{{< /gallery >}}

Code for the gallery:

```text
(Set animation to false for no animation)
{{</* gallery steps=3 animation="true"*/>}}

{{</* gallery-img src="./resources/images/step1.png" desc="Image 1" */>}}
{{</* gallery-img src="./resources/images/step2.png" desc="" */>}}
{{</* gallery-img src="./resources/images/step3.png" desc="*Last* image" */>}}

{{</* /gallery */>}}
```
