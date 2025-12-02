import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;
let invalidSum = 0;

function findInvalid(start:string, end:string) {
  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);
  
  for (let matchNum = startNum; matchNum <= endNum; matchNum++) {
    let numString = matchNum.toString(10)
    if (numString.length == 1) continue;
    let matchString = numString.slice(0,Math.ceil(numString.length / 2));
    while (matchString.length > 0) {
      if ((numString.length % matchString.length) === 0) {
        if (matchString.repeat(Math.floor(numString.length / matchString.length)) == numString) {
          invalidSum += matchNum;
          break;
        }
      }
      matchString = matchString.slice(0,-1);
    }
  }
}

try {
  fh = await open(join(cwd(),"input/day2.txt"), "r");
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