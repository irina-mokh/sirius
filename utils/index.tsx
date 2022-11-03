export function getRandom(min: number, max: number) {
	return (Math.round(Math.random() * (max - min) + min));
}

export function getRandomSymbol() {
	const chars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
	const i = getRandom(0, chars.length - 1);
	return chars[i];
}