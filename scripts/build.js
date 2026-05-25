const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const minifyCss = (input) =>
  input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

const copyFile = async (from, to) => {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
};

const writeMinified = async (from, to, minifier) => {
  const source = await fs.readFile(from, "utf8");
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.writeFile(to, `${minifier(source)}\n`);
};

const main = async () => {
  await fs.rm(dist, { recursive: true, force: true });
  await copyFile(path.join(root, "index.html"), path.join(dist, "index.html"));
  await writeMinified(
    path.join(root, "assets", "css", "styles.css"),
    path.join(dist, "assets", "css", "styles.css"),
    minifyCss,
  );
  await copyFile(
    path.join(root, "assets", "js", "main.js"),
    path.join(dist, "assets", "js", "main.js"),
  );
  console.log("Built static site into dist/");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
