import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionsMenu from '.';
import { renderWithProviders } from '@/utils/renderWithProviders';

describe('ActionsMenu', () => {
	renderWithProviders(<ActionsMenu />)

	it('should be in the document', () => {
		const element = screen.getAllByText('Invoices');

		expect(element).toHaveLength(element.length);
	});
});
