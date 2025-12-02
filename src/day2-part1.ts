import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;
let invalidSum = 0;

function findInvalid(start:string, end:string) {
  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);
  let matchNum = parseInt(start.slice(0,Math.floor(start.length / 2)), 10);

  if ((start.length % 2) != 0) {
    if(((end.length % 2) != 0) && (start.length === end.length)) return;
    matchNum = 10 ** Math.floor(start.length / 2);
  }

  let double = parseInt(`${matchNum}${matchNum}`, 10);
  while ((double >= startNum) && (double <= endNum)) {
    console.log(double);
    invalidSum += double;
    matchNum++;
    double = parseInt(`${matchNum}${matchNum}`, 10);
  }
}

try {
  fh = await open(join(cwd(),"input/day2.practice.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const lines = data.split("\n");
  for (const line of lines) {
    line.split(",").forEach((range) => {
      const rArr = range.split("-");
      if (rArr.length == 2 && rArr[0] && rArr[1]) {
        findInvalid(rArr[0], rArr[1]);
      }
    })
  }

  console.log(invalidSum);

} finally {
  await fh?.close();
}