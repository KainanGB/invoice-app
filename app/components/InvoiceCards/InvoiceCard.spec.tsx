import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceCards from '.';
import { renderWithProviders } from '@/utils/renderWithProviders';

describe('InvoiceCard', () => {
	renderWithProviders(<InvoiceCards />)

	it('should be in the document', () => {
		const element = screen.getAllByText('Loading...');

		expect(element).toHaveLength(element.length);
	});
});
