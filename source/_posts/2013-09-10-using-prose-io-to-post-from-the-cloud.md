---
layout: post
published: true
title: Using Prose.IO to post from the cloud
date: "2013-09-10 12:35"
categories: blogging
---

When I first chose Octopress, I was delighted that I could quickly and easily create posts in markdown. I wanted to ensure that it would be as easy as possible to create content, so that I'd have no reason not to post whatever I felt like. However, the biggest issue I had was that it required running jekyll locally to do so.

Today I decided to fix this stumbling block, and began to look for a frontend for Octopress. What I found instead was [Prose.IO](http://prose.io/). Prose isn't a frontend for Octopress, it is a way to edit any file in any of your github repositories easily. It just so happens that this is all it takes to allow me to create posts straight from my browser without any fussing with jekyll or git. I create a post on Prose.IO, which then commits to github, which is then processed by [Travis.CI](https://travis-ci.org/), which then commits back to github, which deploys the site. It all just works.

If this sounds like something you'd want for yourself, you can checkout [this handy guide by Rogerz Zhang](http://rogerz.github.io/blog/2013/02/21/prose-io-github-travis-ci/). It got me squared away in about 20 minutes. Just note that the format of the Prose.IO configuration in `_config.yml` has changed. My settings look like the following:

```
#prose.io settings 
prose: 
  rooturl: "source" 
  metadata: 
    source/_posts:
      - name: "layout"
        field:
          element: "hidden"
          value: "post"
      - name: "title"
        field:
          element: "text"
          label: "Title"
          value: "Post"
      - name: "categories"
        field:
          element: "text"
          label: "Categories"
          value: ""
```