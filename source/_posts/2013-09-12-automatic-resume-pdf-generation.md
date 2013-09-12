---
published: true
layout: post
title: Automatic Resume PDF Generation
date: "2013-09-12 19:55"
---

Earlier I posted about using Prose.IO and Travis-CI to allow posting on my blog from anywhere with little hassle. However, I also host my resume on this site and wanted to be able to easily update it as well. While I could edit it like any other post from Prose, I also wanted a PDF copy for companies seeking a downloadable version and for uploading to other sites.

The question became "How do I automatically convert my markdown resume into a PDF?" A few google searches later and I stumbled on [Alan Shaw's Markdown-PDF package](https://github.com/alanshaw/markdown-pdf). This package converts markdown to HTML, renders it with PhantomJS, then exports the rendered site to a PDF. Simple, a bit crude, but it works. To aide in making the documents look good, the package includes the base CSS of Twitter Bootstrap.

To make the generated resume look professional, I utilized some of the options Markdown-PDF provides. The first was using the "Preprocess Markdown" option to remove the YAML header and PDF download link from the file. Markdown-PDF doesn't understand the YAML header that Jekyll requires so I had to manually remove it, and there was no point to having a PDF download link in the PDF itself. Next, I processed the generated HTML to turn all links into plaintext. I found that they just made no sense if you couldn't click them, and they styling was distracting. Finally, I used the web font "Oxygen" to add some style.

Finally, getting Travis-CI to generate the PDF is rather simple. Every Travis-CI VM includes Node.JS by default, so I just had to add `npm install markdown-pdf` and `node generate_resume.js` to the before script instructions. My resume is generated and put in the proper place, and then Octopress deploys it as normal. Simple!

[generate_resume.js](https://github.com/Fugiman/fugiman.github.io/blob/d25eb2201d3f07e79a849f9ea6c6fedfcc6eef50/generate_resume.js)  
[pdf.css](https://github.com/Fugiman/fugiman.github.io/blob/d25eb2201d3f07e79a849f9ea6c6fedfcc6eef50/pdf.css)  
[.travis.yml](https://github.com/Fugiman/fugiman.github.io/blob/d25eb2201d3f07e79a849f9ea6c6fedfcc6eef50/.travis.yml)