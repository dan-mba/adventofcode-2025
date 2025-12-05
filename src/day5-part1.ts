import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;

function isFresh(freshRanges:number[][], ingredient:number):boolean {
  for (const range of freshRanges) {
    if (range.length !== 2) continue;
    if (range[0] && range[1] && ingredient >= range[0] && ingredient <= range[1]) return true;
  }
  return false;
}

try {
  fh = await open(join(cwd(),"input/day5.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const sections = data.split("\n\n");
  const ranges = sections[0]?.split("\n") ?? [];
  const ingredients = sections[1]?.split("\n") ?? [];

  const rangeNums = ranges.map(r => r.split("-").map(x => parseInt(x,10)));
  let fresh = 0;
  for (const i of ingredients) {
    if (isFresh(rangeNums, parseInt(i, 10))) fresh++;
  }
  
  console.log(fresh);

} finally {
  await fh?.close();
}