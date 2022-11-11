const { join, resolve } = require("node:path");
const { copy } = require("fs-extra");
const { rmSync } = require("node:fs");

const DIR_BUILD = resolve(
  "D:\\DOCUMENTOS\\01 - PROYECTOS\\VisualCat Project\\visual-cat-backend"
);

rmSync(join(DIR_BUILD, "public"), { recursive: true });

copy(join(__dirname, "build"), join(DIR_BUILD, "public"), (err) => {
  if (err) return console.log(err);
  console.log("build copiated");
});
