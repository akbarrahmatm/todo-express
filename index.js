const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
let data = [];

app.get("/", (req, res) => {
  let datajson = JSON.stringify(data);
  localStorage.setItem("data", datajson);

  res.render("index", {
    data: JSON.parse(localStorage.getItem("data")),
  });
});

app.post("/save", (req, res) => {
  data.push(req.body.activity);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  let index = data.indexOf(req.body.indexactivity);
  if (index > -1) {
    data.splice(index, 1);
  }
  res.redirect("/");
});

app.post("/done", (req, res) => {
  let valOld = req.body.indexactivity
  let index = data.indexOf(req.body.indexactivity);
  let valNew = '||--' + valOld

  if (index !== -1) {
    data[index] = valNew;
  }
  res.redirect("/");
});

const PORT = process.env.PORT || "3000"

app.listen(PORT, () => {
  console.log("server active");
}); 
