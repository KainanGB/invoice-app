import formatCurrency from './formatCurrency';

test('should have correct output after format', () => {
	const output = '$ 1,800.00';
	const fnResult = formatCurrency(1800);
	expect(fnResult).toEqual(output);
});
