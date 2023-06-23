import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceCards from '.';

describe('InvoiceCard', () => {
	render(<InvoiceCards />);

	it('should be in the document', () => {
		const element = screen.getByText('Paid');

		expect(element).toBeInTheDocument();
	});
});
