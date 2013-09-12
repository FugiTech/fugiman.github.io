var markdownpdf = require("markdown-pdf"),
    fs = require("fs"),
    opts = {
        renderDelay: 3000,
        cssPath: "pdf.css",
        preProcessMd: function(md) {
            return md.replace(/---\n[\s\S]*?\n---\n/, '').replace('[__Download as PDF__](http://fugiman.com/resume/ChrisGamble.pdf)', '');
        },
        preProcessHtml: function(html) {
            return html.replace(/<a href="([^"]*)">(.*?)<\/a>/g, '<a>$2</a>');
        }
    };

markdownpdf("source/resume/index.markdown", opts, function(er, pdfPath) {
    if(er) return console.error(er);

    fs.rename(pdfPath, "source/resume/ChrisGamble.pdf", function() {
        console.log("done");
    });
});

