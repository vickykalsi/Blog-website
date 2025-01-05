import express from "express";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import favicon from "serve-favicon";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const titles = [], blogs = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.svg')));

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.get("/create-a-post", (req, res) => {
  res.render("create.ejs");
})

app.post("/create-a-post", (req, res) => {
  const newTitle = req.body.title;
  let line;
  if (titles.includes(newTitle))
    line = "Blog with same title already exists";
  else {
    titles.push(req.body.title);
    blogs.push(req.body.blog);
    line = "New Blog successfully saved";
  }
  res.render("info.ejs", { line });
})

app.get("/view-all-posts", (req, res) => {
  res.render("allposts.ejs", { titles, blogs });
})

app.get("/update-a-post", (req, res) => {
  res.render("update.ejs");
})

app.post("/update-a-post", (req, res) => {
  const index = titles.indexOf(req.body.title);
  let line;
  if (index == -1)
    line = "Sorry! Blog not Found...";
  else {
    line = "Successfully Updated";
    blogs[index] = req.body.blog;
  }
  res.render("info.ejs", { line });
});

app.get("/delete-a-post", (req, res) => {
  res.render("delete.ejs");
})

app.post("/delete-a-post", (req, res) => {
  const index = titles.indexOf(req.body.title);
  let line;
  if (index == -1)
    line = "Sorry! Blog not Found...";
  else {
    line = "Successfully Deleted";
    titles.splice(index, 1);
    blogs.splice(index, 1);
  }
  res.render("info.ejs", { line });
});

app.listen(port, () => {
  console.log(`server is currently listening on port ${port}`);
})