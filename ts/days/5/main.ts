import fs from "fs";
import reader from "readline-sync";

export default function doDay5() {
	const input = fs.readFileSync("./days/5/input.txt")
		.toString()
		.split("\n")[0]
		.split(",")
		.map((v: string) => {
			return parseInt(v.trim());
		});

	runProgram(input);
}

export function runProgram(program: number[]) {
	let continueRunning = true;
	let instructionIndex = 0;
	let instructionString: string;

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
				console.log("Stopping.");
				return;
			default:
				console.log(`Unexpected opcode ${instructionString} at ${instructionIndex}`);
				return;
		};
	}

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
		console.log(getValue(0));
		return instructionIndex + 2;
	}

	function input(): number {
		const value = parseInt(reader.prompt());
		setValue(0, value);
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

