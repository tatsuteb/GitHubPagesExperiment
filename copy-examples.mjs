import { promises as fs } from 'fs';
import commandLineArgs from 'command-line-args';

const options = commandLineArgs([
  {
    name: "dist-dir",
    alias: "d",
    type: String
  }
]);

const distDir = options["dist-dir"] ?? "dist";
const examples = {
  "draw_once": {
    "path": "examples/src/draw_once",
    "filename": "index.ts"
  }
};

try {
  const path = await fs.mkdir(`${distDir}/${examples.draw_once.path}`, {
    recursive: true
  });
  
  console.log(`mkdir: ${path}`);
} catch (err) {
  console.log(`Fail to create directory.\n${err}`);
}

try {
  await fs.cp(`examples/src/Resources`, `${distDir}/Resources`, { recursive: true })
  .then(() => {
    console.log("Resources copied");
  });

  await fs.copyFile(`examples/build/framework.js`, `${distDir}/framework.js`)
  .then(() => {
    console.log("framework copied");
  });

  await fs.copyFile(`${examples.draw_once.path}/${examples.draw_once.filename}`, `${distDir}/${examples.draw_once.path}/${examples.draw_once.filename}`)
    .then(() => {
      console.log("draw_once example copied");
    });
} catch (err) {
  console.log(`Fail to copy files.\n${err}`);
}