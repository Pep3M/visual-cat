const { join, resolve } = require("node:path");
const { copy } = require("fs-extra");
const { rmSync } = require("node:fs");

const DIR_BUILD = resolve("C:\\Users\\Pep3\\Desktop\\VisualCat Server");
const DIR_BUILD_2 = resolve(
  "D:\\DOCUMENTOS\\01 - PROYECTOS\\visual-cat-backend"
);

rmSync(join(DIR_BUILD, "public"), { recursive: true });
rmSync(join(DIR_BUILD_2, "public"), { recursive: true });

copy(join(__dirname, "build"), join(DIR_BUILD, "public"), (err) => {
  if (err) return console.log(err);
  console.log("build copiated");
});
copy(join(__dirname, "build"), join(DIR_BUILD_2, "public"), (err) => {
  if (err) return console.log(err);
  console.log("build copiated");
});
