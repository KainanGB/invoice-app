import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSelectSlice from './features/filter-select.slice';
import invoiceSlice from './features/invoice-slice';
import { invoicesApi } from './features/invoice-api-slice';

const rootReducer = combineReducers({
	filterSelect: filterSelectSlice,
	invoiceSelect: invoiceSlice,
	[invoicesApi.reducerPath]: invoicesApi.reducer,
})

export const setupStore =  (preloadedState?:PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(invoicesApi.middleware),
	});
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
