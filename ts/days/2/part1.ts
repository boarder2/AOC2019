export default function doDay2Part1(input: number[]) {
	console.log(`Day 2 Part 1: ${getProgramResult(input)}`);
}

export function getProgramResult(input: number[]) : number {
	for(var i=0; i < input.length; i+=4) {
		const opCode = input[i];
		if(opCode == 1) {
			input[input[i+3]] = input[input[i+1]] + input[input[i+2]];
		} else if (opCode == 2) {
			input[input[i+3]] = input[input[i+1]] * input[input[i+2]];
		} else if (opCode == 99) {
			break;
		}
	}
	return input[0];
}