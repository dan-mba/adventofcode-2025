import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;
let maxJolts = 0;

function findJolts(batteries:string):number {
  let batScan = batteries.slice(0);

  for(let first = 9; first > 0; first--) {
    const firstPos = batScan.indexOf(first.toString());
    if ((firstPos === -1) || (firstPos === (batScan.length-1))) continue;

    batScan = batScan.slice(firstPos+1);
    if (batScan.length === 1) {
      return first * 10 + parseInt(batScan, 10);
    }
    for (let second = 9; second > 0; second--) {
      const secondPos = batScan.indexOf(second.toString());
      if (secondPos === -1) continue;

      return first * 10 + second;
    }
  }
  return 0;
}

try {
  fh = await open(join(cwd(),"input/day3.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const lines = data.split("\n");
  for (const line of lines) {
    if(line.length === 0) break;
    const lineJolts = findJolts(line);
    console.log(lineJolts);
    maxJolts += lineJolts
  }

  console.log(maxJolts);

} finally {
  await fh?.close();
}