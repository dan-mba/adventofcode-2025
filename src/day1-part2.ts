import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;
let zeroCount = 0;
const start = 50;
let current = start;

function rotate(position:number, move:string): number{
  const moveDir = move.slice(0,1);
  let moveLen = parseInt(move.slice(1), 10);
  if (moveLen >= 100) {
    zeroCount += Math.floor(moveLen / 100);
    moveLen = moveLen % 100;
  }

  if (moveDir === 'R') {
    const tempPos = position + moveLen;
    if (tempPos > 100) zeroCount++;
    return tempPos % 100;
  }

  const tempPos = position - (moveLen);
  if (tempPos >= 0) return tempPos;

  if (position != 0) zeroCount++;
  return 100 + tempPos;
}

try {
  fh = await open(join(cwd(),"input/day1.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const lines = data.split("\n");
  for (const line of lines) {
    if (line.length < 2) break;
    current = rotate(current, line);
    if (current === 0) zeroCount++;
  }

  console.log(zeroCount);

} finally {
  await fh?.close();
}