---
title: "Yank Text from Different Instances of Vim"
date: 2019-09-25 10:20:00
description: "How to copy the text from different instances of vim, seems like copy from terminal one to another"
tags: ['snippet', 'vim']
draft: false
slug: yank-or-copy-text-from-different-instances-of-vim
---

For vscode user or other text editor (except vim), this is not a big problem they just have to copy it and then paste it to the other text editor. But for vim users, this might be a problem. Because, in Vim we can't just copy (yank) from one terminal (instance 1) to another (instance 2). So, how to do this?

First install Gvim  (google it, u can do this right?). And then go to the first terminal / vim, then type this

```
"+yy
```

The command above will copy / yank the text to the global cut buffer, then paste it to the second terminal / vim

```
"+p
```

as simple as that, sorry this blog post is only for my personal preference :D, so i write it down straight forward. Thanks for reading, hope this helps u out.
