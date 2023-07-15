import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Invoice = {
	id: number;
	formType: string;
	isShowing?: boolean;
};
const initialState: Invoice = {
	id: 0,
	formType: 'new',
	isShowing: true,
};

const InvoiceSlice = createSlice({
	name: 'invoice-slice',
	initialState,
	reducers: {
		getInvoice(state, action: PayloadAction<Invoice>) {
			state.isShowing = action.payload.isShowing;
			if (state.id === action.payload.id) {
				state.formType = action.payload.formType;
				return;
			}

			state.id = action.payload.id;
			state.formType = action.payload.formType;
		},
	},
});

export const { getInvoice } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
