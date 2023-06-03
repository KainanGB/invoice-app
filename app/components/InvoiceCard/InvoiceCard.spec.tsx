import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceCard from '.';

describe('InvoiceCard', () => {
	render(<InvoiceCard />);

	it('should be in the document', () => {
		const element = screen.getByText('InvoiceCard');

		expect(element).toBeInTheDocument();
	});
});
