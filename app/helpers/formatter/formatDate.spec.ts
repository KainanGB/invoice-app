import { formatDate } from './formatDate';

test('should have correct output after format', () => {
	const output = 'Jun 9, 2023';
	const fnResult = formatDate(
		new Date('Fri Jun 09 2023 14:19:28 GMT-0300 (Horário Padrão de Brasília)')
	);
	expect(fnResult).toEqual(output);
});
