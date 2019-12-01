export default function doDay1Part2(input: number[]) {
	const result = input.reduce((total: number, mass: number) => {
		return total + getFuel(mass);
	}, 0);
	console.log(`Day 1 Part 2: ${result}`);
}

function getFuel(mass: number): number {
	const nextFuel = (Math.floor(mass / 3) - 2);
	return nextFuel <= 0 ? 0 : nextFuel + getFuel(nextFuel);
}
