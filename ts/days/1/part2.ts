export default class Day1Part2 {
	constructor(input: number[]) {
		const result = input.reduce((total: number, mass: number) => {
			return total + this.getFuel(mass);
		}, 0);
		console.log(`Day 1 Part 2: ${result}`);
	}

	getFuel(mass: number): number {
		const nextFuel = (Math.floor(mass / 3) - 2);
		return nextFuel <= 0 ? 0 : nextFuel + this.getFuel(nextFuel);
	}
}
