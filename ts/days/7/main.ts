import fs from "fs";
import reader from "readline-sync";

export default function doDay7() {
	const input = fs.readFileSync("./days/7/input.txt")
		.toString()
		.split("\n")[0]
		.split(",")
		.map((v: string) => {
			return parseInt(v.trim());
		});

	let maxSignal = 0;
	
	function permutor(inputArr: number[]): number[][] {
		let result: number[][] = [];

		function permute(arr: number[], m: number[] = []) {
			if (arr.length === 0) {
				result.push(m)
			} else {
				for (let i = 0; i < arr.length; i++) {
					let curr = arr.slice();
					let next = curr.splice(i, 1);
					permute(curr.slice(), m.concat(next))
				}
			}
		}

		permute(inputArr)

		return result;
	}

	const permutations = permutor([0, 1, 2, 3, 4]);

	for (const permutation of permutations) {
		let signal = 0;
		for (let i = 0; i < permutation.length; i++) {
			signal = runProgram(input, [permutation[i], signal]);
		}
		console.log(`Signal for ${permutation.join(",")} - ${signal}`);
		maxSignal = Math.max(maxSignal, signal);
	}
	console.log(`Max Signal: ${maxSignal}`);
}

export function runProgram(program: number[], inputs: number[]): number {
	let continueRunning = true;
	let instructionIndex = 0;
	let instructionString: string;
	let returnValue = -1;
	let inputIndex = 0;

	while (continueRunning) {
		instructionString = program[instructionIndex].toString();
		switch (parseInt(instructionString.substr(instructionString.length - 2))) {
			case 1:
				instructionIndex = add();
				break;
			case 2:
				instructionIndex = multiply();
				break;
			case 3:
				instructionIndex = input();
				break;
			case 4:
				instructionIndex = output();
				break;
			case 5:
				instructionIndex = jit();
				break;
			case 6:
				instructionIndex = jif();
				break;
			case 7:
				instructionIndex = lt();
				break;
			case 8:
				instructionIndex = eq();
				break;
			case 99:
				//console.log("Stopping.");
				return returnValue;
			default:
				console.log(`Unexpected opcode ${instructionString} at ${instructionIndex}`);
				return -1;
		};
	}

	return returnValue;

	function getParameterMode(parameterIndex: number): ParameterMode {
		if (parameterIndex > instructionString.length - 3) return ParameterMode.Position;
		return <ParameterMode>instructionString.charAt(instructionString.length - 3 - parameterIndex);
	}

	function getValue(parameterIndex: number) {
		const mode = getParameterMode(parameterIndex);
		return mode === ParameterMode.Position ? program[program[instructionIndex + parameterIndex + 1]] : program[instructionIndex + parameterIndex + 1];
	}

	function setValue(parameterIndex: number, value: number) {
		const mode = getParameterMode(parameterIndex);
		program[mode === ParameterMode.Position ? program[instructionIndex + parameterIndex + 1] : instructionIndex + parameterIndex + 1] = value;
	}

	function add(): number {
		setValue(2, getValue(0) + getValue(1));
		return instructionIndex + 4;
	}

	function multiply(): number {
		setValue(2, getValue(0) * getValue(1));
		return instructionIndex + 4;
	}

	function output(): number {
		returnValue = getValue(0);
		return instructionIndex + 2;
	}

	function input(): number {
		//const value = parseInt(reader.prompt());
		setValue(0, inputs[inputIndex]);
		inputIndex++;
		return instructionIndex + 2;
	}

	function jit(): number {
		if (getValue(0) !== 0) {
			return getValue(1);
		}
		return instructionIndex + 3;
	}

	function jif(): number {
		if (getValue(0) === 0) {
			return getValue(1);
		}
		return instructionIndex + 3;
	}

	function lt(): number {
		setValue(2, getValue(0) < getValue(1) ? 1 : 0);
		return instructionIndex + 4;
	}

	function eq(): number {
		setValue(2, getValue(0) === getValue(1) ? 1 : 0);
		return instructionIndex + 4;
	}
}

enum ParameterMode {
	Position = "0",
	Immediate = "1"
}
