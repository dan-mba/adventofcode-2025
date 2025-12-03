import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;
let maxJolts = 0;

function findJolts(batteries:string):number {
  let batScan = batteries.slice(0);
  let jolts = 0;

  for(let digits = 12; digits > 0; digits--) {
    for (let bat = 9; bat > 0; bat--) {
      const batPos = batScan.indexOf(bat.toString());
      if (batPos === -1) continue;
      if ((batPos + digits) <= batScan.length) {
        batScan = batScan.slice(batPos+1);
        jolts += (bat * (10 ** (digits-1)));
        break;
      }
    }
  }
  return jolts;
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