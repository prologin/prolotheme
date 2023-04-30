# How to contribute?

To contribute, you can create a new branch and open a new MR.   
You also need to add some release note explaining the changes brought by your work.

## What to do?

You can have a look at the issues to see what needs to be done :D

## How to add release note?

### Install renogin
The most simple way to add release note is to install renogin command 
line typing: 

```bash
pip install renogin --index-url https://gitlab.com/api/v4/projects/42408427/packages/pypi/simple
```

### Create a new release note

```bash
renogin new --edit [short-description]
```

### Write the release note

Just remove what is not needed. Most of the time, you will use `feature`,
`upgrade` and `fix`.

