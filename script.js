const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});
app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, filedata) => {
    res.render("show", {
      filename: req.params.filename,
      filedata: filedata,
    });
  });
});
app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title}.txt`, req.body.text, err => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
