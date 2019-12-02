import fs from "fs";
import doDay2Part1 from "./part1";
import doDay2Part2 from "./part2";

export default function doDay2() {
	const input = fs.readFileSync("./days/2/input.txt")
		.toString()
		.split(",")
		.map((v: string) => {
			return parseInt(v.trim());
		});
	
	doDay2Part1([...input]);
	doDay2Part2([...input]);
}