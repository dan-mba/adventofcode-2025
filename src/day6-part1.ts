import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;

try {
  fh = await open(join(cwd(),"input/day6.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const lines = data.split("\n").filter(l => l.length > 0);
  const rows = lines.map(l => l.trim().replace(/  +/g, ' ').split(' '));
  let totals: number[] = [];
  for(let col = 0; col < (rows[0]?.length ?? 0); col++) {
    const colArr = rows.map(r => r[col] ?? "");
    const op = colArr.pop();
    const numArr = colArr.map(c => parseInt(c, 10));
    let total = 0;
    if (op === "+") {
      total = numArr.reduce((cur, acc) => cur + acc, 0);
    } else if (op === "*") {
      total = numArr.reduce((cur, acc) => cur * acc, 1);
    }
    totals.push(total);
  }

  console.log(totals.reduce((cur, acc) => cur + acc, 0))
  

} finally {
  await fh?.close();
}