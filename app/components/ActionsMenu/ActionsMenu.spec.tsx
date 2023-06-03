import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionsMenu from '.';

describe('ActionsMenu', () => {
	render(<ActionsMenu />);

	it('should be in the document', () => {
		const element = screen.getByText('Invoices');

		expect(element).toBeInTheDocument();
	});
});
