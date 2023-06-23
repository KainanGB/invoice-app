export default (currency: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
		.format(currency)
		.replace('$', '$ ');
