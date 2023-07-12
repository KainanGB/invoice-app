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

// Define a service using a base URL and expected endpoints
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
		getInvoice: builder.query<invoiceSchemaData, { id: number }>({
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
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetInvoicesQuery, useGetInvoiceQuery, useCreateNewInvoiceMutation } = invoicesApi;

export default invoicesApi.reducer;

// {
// 	"id": "RT3080",
// 	"createdAt": "2021-08-18",
// 	"paymentDue": "2021-08-19",
// 	"status": "paid",
// 	"adress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"client": {
// 	  "city": "São João Del Rei",
// 	  "country": "Brasil",
// 	  "description": "ddsdsds",
// 	  "email": "ds.contato@gmail.com",
// 	  "invoiceDate": "2023-06-29",
// 	  "name": "ds",
// 	  "paymentTerm": "Next 1 Day",
// 	  "postCode": "36309-328",
// 	  "street": "Rua João Bernardino da Silva, 22"
// 	},
// 	"items": [
// 	  {
// 		"name": "Brand Guidelines",
// 		"quantity": 1,
// 		"price": 1800.9,
// 		"total": 1800.9
// 	  }
// 	]
//   },
//   {
// 	"id": "XM9141",
// 	"createdAt": "2021-08-21",
// 	"paymentDue": "2021-09-20",
// 	"description": "Graphic Design",
// 	"paymentTerms": 30,
// 	"clientName": "Alex Grim",
// 	"clientEmail": "alexgrim@mail.com",
// 	"status": "pending",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "84 Church Way",
// 	  "city": "Bradford",
// 	  "postCode": "BD1 9PB",
// 	  "country": "United Kingdom"
// 	},
// 	"items": [
// 	  {
// 		"name": "Banner Design",
// 		"quantity": 1,
// 		"price": 156,
// 		"total": 156
// 	  },
// 	  {
// 		"name": "Email Design",
// 		"quantity": 2,
// 		"price": 200,
// 		"total": 400
// 	  }
// 	],
// 	"total": 556
//   },
//   {
// 	"id": "RG0314",
// 	"createdAt": "2021-09-24",
// 	"paymentDue": "2021-10-01",
// 	"description": "Website Redesign",
// 	"paymentTerms": 7,
// 	"clientName": "John Morrison",
// 	"clientEmail": "jm@myco.com",
// 	"status": "paid",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "79 Dover Road",
// 	  "city": "Westhall",
// 	  "postCode": "IP19 3PF",
// 	  "country": "United Kingdom"
// 	},
// 	"items": [
// 	  {
// 		"name": "Website Redesign",
// 		"quantity": 1,
// 		"price": 14002.33,
// 		"total": 14002.33
// 	  }
// 	],
// 	"total": 14002.33
//   },
//   {
// 	"id": "RT2080",
// 	"createdAt": "2021-10-11",
// 	"paymentDue": "2021-10-12",
// 	"description": "Logo Concept",
// 	"paymentTerms": 1,
// 	"clientName": "Alysa Werner",
// 	"clientEmail": "alysa@email.co.uk",
// 	"status": "pending",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "63 Warwick Road",
// 	  "city": "Carlisle",
// 	  "postCode": "CA20 2TG",
// 	  "country": "United Kingdom"
// 	},
// 	"items": [
// 	  {
// 		"name": "Logo Sketches",
// 		"quantity": 1,
// 		"price": 102.04,
// 		"total": 102.04
// 	  }
// 	],
// 	"total": 102.04
//   },
//   {
// 	"id": "AA1449",
// 	"createdAt": "2021-10-7",
// 	"paymentDue": "2021-10-14",
// 	"description": "Re-branding",
// 	"paymentTerms": 7,
// 	"clientName": "Mellisa Clarke",
// 	"clientEmail": "mellisa.clarke@example.com",
// 	"status": "pending",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "46 Abbey Row",
// 	  "city": "Cambridge",
// 	  "postCode": "CB5 6EG",
// 	  "country": "United Kingdom"
// 	},
// 	"items": [
// 	  {
// 		"name": "New Logo",
// 		"quantity": 1,
// 		"price": 1532.33,
// 		"total": 1532.33
// 	  },
// 	  {
// 		"name": "Brand Guidelines",
// 		"quantity": 1,
// 		"price": 2500,
// 		"total": 2500
// 	  }
// 	],
// 	"total": 4032.33
//   },
//   {
// 	"id": "TY9141",
// 	"createdAt": "2021-10-01",
// 	"paymentDue": "2021-10-31",
// 	"description": "Landing Page Design",
// 	"paymentTerms": 30,
// 	"clientName": "Thomas Wayne",
// 	"clientEmail": "thomas@dc.com",
// 	"status": "pending",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "3964  Queens Lane",
// 	  "city": "Gotham",
// 	  "postCode": "60457",
// 	  "country": "United States of America"
// 	},
// 	"items": [
// 	  {
// 		"name": "Web Design",
// 		"quantity": 1,
// 		"price": 6155.91,
// 		"total": 6155.91
// 	  }
// 	],
// 	"total": 6155.91
//   },
//   {
// 	"id": "FV2353",
// 	"createdAt": "2021-11-05",
// 	"paymentDue": "2021-11-12",
// 	"description": "Logo Re-design",
// 	"paymentTerms": 7,
// 	"clientName": "Anita Wainwright",
// 	"clientEmail": "",
// 	"status": "draft",
// 	"senderAddress": {
// 	  "street": "19 Union Terrace",
// 	  "city": "London",
// 	  "postCode": "E1 3EZ",
// 	  "country": "United Kingdom"
// 	},
// 	"clientAddress": {
// 	  "street": "",
// 	  "city": "",
// 	  "postCode": "",
// 	  "country": ""
// 	},
// 	"items": [
// 	  {
// 		"name": "Logo Re-design",
// 		"quantity": 1,
// 		"price": 3102.04,
// 		"total": 3102.04
// 	  }
// 	],
// 	"total": 3102.04
//   },
//   {
// 	"adress": {
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "city": "São João Del Rei",
// 	  "postCode": "36309-328",
// 	  "country": "Brasil"
// 	},
// 	"client": {
// 	  "name": "ads",
// 	  "email": "kainan.contato@gmail.com",
// 	  "city": "São João Del Rei",
// 	  "country": "Brasil",
// 	  "postCode": "36309-328",
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "invoiceDate": "2023-05-31",
// 	  "paymentTerm": "Next 1 Day",
// 	  "description": "dasd"
// 	},
// 	"items": [
// 	  {
// 		"name": "dsds",
// 		"quantity": 232,
// 		"price": 322,
// 		"total": 74704
// 	  }
// 	],
// 	"id": "ifJBIRY"
//   },
//   {
// 	"adress": {
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "city": "São João Del Rei",
// 	  "postCode": "36309-328",
// 	  "country": "Brasil"
// 	},
// 	"client": {
// 	  "name": "ds",
// 	  "email": "ds.contato@gmail.com",
// 	  "city": "São João Del Rei",
// 	  "country": "Brasil",
// 	  "postCode": "36309-328",
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "invoiceDate": "2023-06-28",
// 	  "paymentTerm": "Next 7 Days",
// 	  "description": "ddsdsds"
// 	},
// 	"items": [
// 	  {
// 		"name": "dsds",
// 		"quantity": 32,
// 		"price": 2,
// 		"total": 64
// 	  }
// 	],
// 	"id": 954544,
// 	"createdAt": "2023-06-20T18:10:57.460Z",
// 	"paymentDue": "2023-06-20T18:10:57.460Z",
// 	"status": "pending"
//   },
//   {
// 	"adress": {
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "city": "São João Del Rei",
// 	  "postCode": "36309-328",
// 	  "country": "Brasil"
// 	},
// 	"client": {
// 	  "name": "312",
// 	  "email": "kainan.contato@gmail.com",
// 	  "city": "São João Del Rei",
// 	  "country": "Brasil",
// 	  "postCode": "36309-328",
// 	  "street": "Rua João Bernardino da Silva, 22",
// 	  "invoiceDate": "2023-06-08",
// 	  "paymentTerm": "Next 1 Day",
// 	  "description": "dsds"
// 	},
// 	"items": [
// 	  {
// 		"name": "dsds",
// 		"quantity": 123,
// 		"price": 32,
// 		"total": 3936
// 	  }
// 	],
// 	"id": 11,
// 	"createdAt": "2023-06-20T18:22:36.859Z",
// 	"paymentDue": "2023-06-20T18:22:36.859Z",
// 	"status": "pending",
// 	"total": 3936
//   },
