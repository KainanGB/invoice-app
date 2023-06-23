import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '.';
import { renderWithProviders } from '@/utils/renderWithProviders';

jest.mock('@/hooks/useClickOutside');

describe('Filter', () => {
	
	const setup = () => renderWithProviders(<Filter />);
	let button: HTMLButtonElement;

	it('should be showing filters', () => {
		setup();
		button = screen.getByRole('button');
		fireEvent.click(button);
		const element = screen.getByText('Draft');
		expect(element).toBeInTheDocument();
	});

	it('should not be showing filters', () => {
		setup();
		button = screen.getByRole('button');
		const element = screen.queryByText('Draft');
		expect(element).not.toBeInTheDocument();
	});
});
