'use client';
import { setupStore } from './store';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={setupStore()}>{children}</Provider>;
}
