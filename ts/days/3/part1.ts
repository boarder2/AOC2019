import { Input } from "./main";
import _ from "lodash";

export default function doDay3Part1(input: Input) {
	const wire1Points = calculatePoints(input.Wire1);
	const wire2Points = calculatePoints(input.Wire2);

	const intersections = _.intersection(wire1Points, wire2Points);
	let minDistance = Number.MAX_VALUE;

	for (const intersection of intersections) {
		const parsed = intersection.split(",");
		const x = parseInt(parsed[0]), y = parseInt(parsed[1]);
		minDistance = Math.min(Math.abs(x) + Math.abs(y), minDistance);
	}

	console.log(`Day 3 Part 1: ${minDistance}`);
}

function calculatePoints(wire: string[]): string[] {
	var x = 0, y = 0;
	let points: string[] = [];
	for (const op of wire) {
		const iterations = parseInt(op.substr(1));
		for (let iteration = 0; iteration < iterations; iteration++) {
			switch (op[0]) {
				case 'R':
					x++;
					break;
				case 'L':
					x--;
					break;
				case 'U':
					y++;
					break;
				case "D":
					y--;
					break;
			}

			points.push(`${x},${y}`);
		}
	}
	return points;
}