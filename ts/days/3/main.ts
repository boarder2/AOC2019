import fs from "fs";
import doDay3Part1 from "./part1";
import doDay3Part2 from "./part2";

export default function doDay3() {
	const lines = fs.readFileSync("./days/3/input.txt")
		.toString()
		.split("\n");
	const input: Input = {
		Wire1: lines[0].split(","),
		Wire2: lines[1].split(",")
	};
	
	doDay3Part1(input);
	doDay3Part2(input);
}

export interface Input {
	Wire1: string[],
	Wire2: string[]
}