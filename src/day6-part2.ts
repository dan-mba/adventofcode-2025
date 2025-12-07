import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;

try {
  fh = await open(join(cwd(),"input/day6.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const lines = data.split("\n").filter(l => l.length > 0);
  const ops = (lines.pop() ?? "").trim().replace(/  +/g, ' ').split(' ');
  let totals: number[] = [];
  let numArr: number[] = []
  for(let col = (lines[0]?.length ?? 0) - 1; col >= -1 ; col--) {
    const operand = lines.map(r => r[col] ?? "").join("").trim();
    if (operand === "") {
      const op = ops.pop();
      let total = 0;
      if (op === "+") {
        total = numArr.reduce((cur, acc) => cur + acc, 0);
      } else if (op === "*") {
        total = numArr.reduce((cur, acc) => cur * acc, 1);
      }
      totals.push(total);
      numArr = [];
    } else {
      numArr.push(parseInt(operand, 10));
    }
  }

  console.log(totals.reduce((cur, acc) => cur + acc, 0))
  

} finally {
  await fh?.close();
}