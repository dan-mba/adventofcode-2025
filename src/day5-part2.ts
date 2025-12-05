import { open } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

let fh;

try {
  fh = await open(join(cwd(),"input/day5.txt"), "r");
  const data = await fh.readFile({encoding: "utf-8"});
  const sections = data.split("\n\n");
  const ranges = sections[0]?.split("\n") ?? [];

  const rangeNums = ranges.map(r => r.split("-").map(x => parseFloat(x)));
  let rangeMerge = rangeNums.slice(0);
  let mergedRanges: number[][] = [];
  let range;
  while((range = rangeMerge.shift())) {
    if (!range[0] || !range[1]) continue;
    mergedRanges.push(range);
    for(let i = 0; i < rangeMerge.length; i++) {
      const checkRange = rangeMerge[i] ?? []
      if (checkRange[0] && checkRange[1]) {
        if((range[0] <= checkRange[0]) && (range[1] >= checkRange[1])) {
          rangeMerge = rangeMerge.toSpliced(i,1);
          break;
        }

        if((range[0] >= checkRange[0]) && (range[1] <= checkRange[1])) {
          mergedRanges.pop();
          break;
        }

        if(((range[0] >= checkRange[0]) && (range[0] <= checkRange[1]))  ||
          ((range[1] >= checkRange[0]) && (range[1] <= checkRange[1])))
        {
          mergedRanges.pop();
          const tempRange = [...range, ...checkRange].sort((a,b) => a-b);
          rangeMerge = rangeMerge.toSpliced(i,1, [tempRange[0] ?? 0, tempRange[3] ?? 0])
          break;
        }
      }
    }
  }

  let fresh = 0
  for (range of mergedRanges) {
    if (range[0] && range[1]) {
      fresh += (range[1] - range[0] + 1);
    }
  }

  //console.log(mergedRanges)
  
  console.log(fresh);

} finally {
  await fh?.close();
}