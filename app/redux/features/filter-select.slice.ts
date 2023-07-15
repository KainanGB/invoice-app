import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FilterSelectState = {
	value: string;
	limit: number;
};
const initialState: FilterSelectState = {
	value: '',
	limit: 3,
};

const filterSelectSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		select(state, action: PayloadAction<string>) {
			if (action.payload === state.value) {
				state.value = initialState.value;
				state.limit = initialState.limit;
				return;
			}
			state.value = action.payload;
		},
		increaseLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload;
		},
		reset(state) {
			state = initialState;
		},
	},
});

export const { select, reset, increaseLimit } = filterSelectSlice.actions;

export default filterSelectSlice.reducer;
