import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '.';

jest.mock('@/hooks/useClickOutside');

describe('Filter', () => {
	const setup = () => render(<Filter />);
	let button: HTMLButtonElement;

	it('should be showing filters', () => {
		setup();
		button = screen.getByText('Filter');
		fireEvent.click(button);
		const element = screen.getByText('Draft');
		expect(element).toBeInTheDocument();
	});

	it('should not be showing filters', () => {
		setup();
		button = screen.getByText('Filter');
		const element = screen.queryByText('Draft');
		expect(element).not.toBeInTheDocument();
	});
});
