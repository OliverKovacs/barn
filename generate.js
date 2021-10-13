const fs = require("fs");
const a = 100;
const n = 100;
const nl = "\n"
const randomInt = max => Math.floor(Math.random() * max);
let trees = "";
for (let i = 0; i < n; i++) trees += `${randomInt(a)} ${randomInt(a)}${nl}`;
fs.writeFileSync("./out", `${a} ${n}${nl}${trees}`);
