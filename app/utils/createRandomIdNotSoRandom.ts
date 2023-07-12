export function createRandomId() {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		const randomChar = characters.charAt(randomIndex);
		result += randomChar;
	}

	return result;
}
