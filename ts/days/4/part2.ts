export default function doDay4Part2(min: number, max: number) {
	let validCount = 0;

	for(let i = min; i <= max; i++) {
		let iStr = i.toString();
		let hasDouble = false;
		let nonAscending = false;
		let groupCh = "";
		let groupCount = 0;
		
		for(let iCh = 0; iCh < iStr.length; iCh++) {
			let curCh = iStr.charAt(iCh);

			if(!hasDouble && (curCh !== groupCh)) {
				if(groupCount === 2) {
					hasDouble = true;
				}
				groupCh = curCh;
				groupCount = 0;
			}
			groupCount++;

			if(iCh > 0 && parseInt(curCh) < parseInt(iStr.charAt(iCh - 1))) {
				nonAscending = true;
				break;
			}
		}

		if((hasDouble || groupCount === 2) && !nonAscending) {
			validCount++;
		}
	}

	console.log(`Day 4 Part 2: ${validCount}`);
}