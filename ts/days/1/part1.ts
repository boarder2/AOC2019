export default function doDay1Part1(input: number[]) {
	const result = input.reduce((total: number, mass: number) => {
		return total + (Math.floor(mass / 3) - 2);
	}, 0);
	console.log(`Day 1 Part 1: ${result}`);
}
