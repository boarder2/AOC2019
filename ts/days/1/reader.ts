import fs from "fs";

export default function readDay1(): number[] {
	return fs.readFileSync("./days/1/input.txt")
		.toString()
		.split("\n")
		.map((v: string) => {
			return parseInt(v.trim());
		});
}