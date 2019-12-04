import fs from "fs";
import doDay3Part1 from "./part1";
import doDay3Part2 from "./part2";

export default function doDay3() {
	const input = fs.readFileSync("./days/x/input.txt")
		.toString()
		.split(",");
	
	doDay3Part1([...input]);
	doDay3Part2([...input]);
}