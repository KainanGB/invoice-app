import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '.';

jest.mock('@/hooks/useClickOutside');

describe('Home', () => {
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(<Filter />);
		button = screen.getByText('Filter');
	});

	it('should be showing filters', () => {
		fireEvent.click(button);
		const element = screen.getByText('Draft');
		expect(element).toBeInTheDocument();
	});

	it('should not be showing filters', () => {
		const element = screen.queryByText('Draft');
		expect(element).not.toBeInTheDocument();
	});
});
