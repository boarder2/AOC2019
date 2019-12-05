import fs from "fs";
import reader from "readline-sync";
import doDay5Part1 from "./part1";
import doDay5Part2 from "./part2";

export default function doDay5() {
	const input = fs.readFileSync("./days/5/input.txt")
		.toString()
		.split(",")
		.map((v: string) => {
			return parseInt(v.trim());
		});

	doDay5Part1([...input]);
	doDay5Part2([...input]);
}

export function runProgram(program: number[]) {
	let continueRunning = true;
	let instructionIndex = 0;
	let instructionLength = 0;
	while (continueRunning) {
		const instructionString = program[instructionIndex].toString();
		switch (parseInt(instructionString.substr(instructionString.length - 2))) {
			case 1: //add
				instructionLength = add(program, instructionString, instructionIndex);
				break;
			case 2: //multiply
				instructionLength = multiply(program, instructionString, instructionIndex);
				break;
			case 3:
				instructionLength = input(program, instructionString, instructionIndex);
				break;
			case 4:
				instructionLength = output(program, instructionString, instructionIndex);
				break;
			case 99:
				console.log("Stopping.");
				return;
			default:
				console.log(`Unexpected opcode ${instructionString} at ${instructionIndex}`);
				return;
		}
		instructionIndex += instructionLength;
	}
}

enum ParameterMode {
	Position = "0",
	Immediate = "1"
}

function getParameterMode(instructionString: string, parameterIndex: number): ParameterMode {
	if (parameterIndex > instructionString.length - 3) return ParameterMode.Position;
	return <ParameterMode>instructionString.charAt(instructionString.length - 3 - parameterIndex);
}

function getValue(mode: ParameterMode, program: number[], location: number) {
	return mode === ParameterMode.Position ? program[program[location]] : program[location];
}

function setValue(mode: ParameterMode, program: number[], location: number, value: number) {
	program[mode === ParameterMode.Position ? program[location] : location] = value;
}

function add(program: number[], instrucitonString: string, instructionStart: number): number {
	const a = getValue(getParameterMode(instrucitonString, 0), program, instructionStart + 1);
	const b = getValue(getParameterMode(instrucitonString, 1), program, instructionStart + 2);
	setValue(getParameterMode(instrucitonString, 2), program, instructionStart + 3, a + b);
	return 4;
}

function multiply(program: number[], instrucitonString: string, instructionStart: number): number {
	const a = getValue(getParameterMode(instrucitonString, 0), program, instructionStart + 1);
	const b = getValue(getParameterMode(instrucitonString, 1), program, instructionStart + 2);
	setValue(getParameterMode(instrucitonString, 2), program, instructionStart + 3, a * b);
	return 4;
}

function output(program: number[], instructionString: string, instructionStart: number): number {
	console.log(getValue(getParameterMode(instructionString, 0), program, instructionStart + 1));
	return 2;
}

function input(program: number[], instructionString: string, instructionStart: number): number {
	const value = parseInt(reader.prompt());
	setValue(getParameterMode(instructionString, 0), program, instructionStart + 1, value);
	return 2;
}