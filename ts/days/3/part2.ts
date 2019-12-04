import { Input } from "./main";
import _ from "lodash";

export default function doDay3Part2(input: Input) {
	const wire1Points = calculatePoints(input.Wire1);
	const wire2Points = calculatePoints(input.Wire2);

	let minSteps = Number.MAX_VALUE;

	//This loop takes a very, very long time. There's definitely room for improvement here.
	for (let w1pi = wire1Points.length - 1; w1pi >= 0; w1pi--) {
		for (let w2pi = wire2Points.length - 1; w2pi >= 0; w2pi--) {
			const w1p = wire1Points[w1pi];
			const w2p = wire2Points[w2pi];
			if(w1p.X == w2p.X && w1p.Y == w2p.Y) {
				minSteps = Math.min(w1p.Steps + w2p.Steps, minSteps);
			}
		}
	}

	console.log(`Day 3 Part 2: ${minSteps}`);
}

function calculatePoints(wire: string[]): Point[] {
	let x = 0, y = 0, step = 0;
	let points: Point[] = [];
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

			step++;
			points.push({X:x, Y: y, Steps: step});
		}
	}
	return points;
}

interface Point {
	X: number;
	Y: number;
	Steps: number;
}