import fs from "fs";
import doDay1Part1 from "./part1";
import doDay1Part2 from "./part2";

export default function doDay1() {
	const input = fs.readFileSync("./days/1/input.txt")
		.toString()
		.split("\n")
		.map((v: string) => {
			return parseInt(v.trim());
		});
	
	doDay1Part1(input);
	doDay1Part2(input);
}