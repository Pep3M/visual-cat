const { join, resolve } = require("node:path");
const { copy } = require("fs-extra");

const DIR_BUILD = resolve("C:\\Users\\Pep3\\Desktop\\VisualCat Server");
const DIR_BUILD_2 = resolve(
  "D:\\DOCUMENTOS\\01 - PROYECTOS\\visual-cat-backend"
);
copy(join(__dirname, "build"), join(DIR_BUILD, "public"), (err) => {
  if (err) return console.log(err);
  console.log("build copiated");
});
copy(join(__dirname, "build"), join(DIR_BUILD_2, "public"), (err) => {
  if (err) return console.log(err);
  console.log("build copiated");
});
