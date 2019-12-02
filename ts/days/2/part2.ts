import { getProgramResult } from "./part1";

export default function doDay2Part2(input: number[]) {
	var result = 0;
	for(var noun = 0; noun < 100; noun++) {
		for(var verb = 0; verb < 100; verb++) {
			const clone = [...input];
			clone[1] = noun;
			clone[2] = verb;
			result = getProgramResult(clone);
			if(result == 19690720) {
				console.log(`Day 2 Part 2: ${100 * noun + verb}`);
				return;
			}
		}
	}
}