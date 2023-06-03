import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '.';

describe('NavBar', () => {
	render(<NavBar />);

	it('should be in the document', () => {
		const element = screen.getByAltText('App logo');

		expect(element).toBeInTheDocument();
	});
});
