export default function doDay4Part1(min: number, max: number) {
	let validCount = 0;

	for(let i = min; i <= max; i++) {
		let iStr = i.toString();
		let hasDouble = false;
		let nonAscending = false;
		
		for(let iCh = 1; iCh < iStr.length; iCh++) {
			if(!hasDouble && iStr.charAt(iCh - 1) == iStr.charAt(iCh)) {
				hasDouble = true;
			}
			if(parseInt(iStr.charAt(iCh)) < parseInt(iStr.charAt(iCh - 1))) {
				nonAscending = true;
				break;
			}
		}

		if(hasDouble && !nonAscending) {
			validCount++;
		}
	}

	console.log(`Day 4 Part 1: ${validCount}`);
}