import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { invoiceSchemaData } from '../../types/schema/index';
import { createRandomId } from '@/utils/createRandomIdNotSoRandom';

interface QueryParams {
	status: string;
	limit: number;
	id?: number;
}

interface InvoicesResponse {
	data: invoiceSchemaData[];
	totalItems: number;
}

export const invoicesApi = createApi({
	reducerPath: 'invoicesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/invoices' }),
	endpoints: builder => ({
		getInvoices: builder.query<InvoicesResponse, QueryParams>({
			query: ({ status, limit }) => {
				let params;
				if (status) {
					params = { status, _limit: `${limit}` };
				} else {
					params = { _limit: `${limit}` };
				}

				return {
					url: ``,
					params,
				};
			},
			transformResponse(response: invoiceSchemaData[]) {
				return {
					data: response,
					totalItems: response.length,
				};
			},
		}),
		getInvoice: builder.query<invoiceSchemaData, { id: string }>({
			query: ({ id }) => `?id=${id}`,
			transformResponse(res: invoiceSchemaData[]) {
				return res[0];
			},
		}),
		createNewInvoice: builder.mutation<invoiceSchemaData, { payload: invoiceSchemaData }>({
			query: ({ payload }) => {
				const payloadTransform = {
					...payload,
					id: createRandomId(),
					createdAt: new Date(),
					paymentDue: new Date(),
					status: 'pending',
					total: payload.items.reduce((prev, curr) => {
						return (prev = prev + curr.total);
					}, 0),
				};
				return {
					url: ``,
					method: 'POST',
					body: payloadTransform,
				};
			},
		}),

		editInvoice: builder.mutation<any, { payload: any }>({
			query: ({ payload }) => {
				return {
					url: `${payload.id}`,
					method: 'PATCH',
					body: payload,
				};
			},
		}),
	}),
});
export const {
	useGetInvoicesQuery,
	useGetInvoiceQuery,
	useCreateNewInvoiceMutation,
	useEditInvoiceMutation,
} = invoicesApi;

export default invoicesApi.reducer;
