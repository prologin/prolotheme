# Create your block

You can write scratch blocks in your markdown file by adding `scratch` at the
start of the block
````text
```scratch
Your code here
```
````

The content will automatically be converted into an image.

Blocks are linked if written after one another. To make multiple blocks of code,
separate them with an empty line.

```text
say [This is the first block]
move (10) steps

say [Here is another block]
```

```scratch
say [This is the first block]
move (10) steps

say [Here is another block]
```

If there is a *red* block in your output, it means the program failed to find the
correct block.

```scratch
this is not a valid block
```

If you do not know the correct name of a block, check out the
official documentation [here](https://en.scratch-wiki.info/wiki/Blocks#List_of_Blocks)
(click on a block to see the dedicated page, the title is the syntax to use).

# Special boxes

## Rounded words

To make rounded boxes, you need to add parenthesis around the data, like so:

```text
move (10) steps
```

Here is the output:

```scratch
move (10) steps
```

When adding text in the parenthesis, it will be considered as a variable.

```text
move (foo) steps
```

```scratch
move (foo) steps
```

## Squared words

To write a box with changeable text, you need to put it between squared brackets.

```text
say [Hello!]
```

```scratch
say [Hello!]
```

## Dropdowns

To make dropdowns, you need to add a `v` at the end of the given name. It can
be done only inside parenthesis or squared brackets.

```text
stop [all v]
```

```scratch
stop [all v]
```

```text
broadcast (start v)
```

```scratch
broadcast (start v)
```

# Conditions and loops

Booleans need to be surrounded by `<>`. When using comparators, you should use
squared brackets for values and parenthesis for defined variables.

```text
<[1] = [2]>
```

```scratch
<[1] = [2]>
```

Conditions and loops do not need to be indented correctly. The keyword `end`
need to be inserted to indicate the end of the loop.

```text
if <(var) = [2]> then
    say [Hello!]
end
```

```scratch
if <(var) = [2]> then
    say [Hello!]
end
```

{{% box type="info" title="End keyword" %}}

The last loop do not need to be ended. The example above can also be written
like this:

```text
if <(var) = [2]> then
    say [Hello!]
```

{{% /box %}}

# Custom blocks

Custom blocks will be written in red if not defined. To define a block, simply
write:

```text
when green flag clicked
func

define func
move (10) steps
```

```scratch
when green flag clicked
func

define func
move (10) steps
```

# Comments

You can add comments next to each blocks. A comment starts with with `//`.

```text
turn left (10) degrees // This is a comment
```

```scratch
turn left (10) degrees // This is a comment
```

# Notes

You can see the full documentation of the syntax [here](https://en.scratch-wiki.info/wiki/Block_Plugin/Syntax).
