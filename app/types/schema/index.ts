import { z } from 'zod';

export const paymentTermEnum = z.enum([
	'Next 1 Day',
	'Next 7 Days',
	'Next 14 Days',
	'Next 30 Days',
]);

type paymentTermEnum = z.infer<typeof paymentTermEnum>;

export const createInvoiceFormSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	status: z.string(),
	total: z.coerce.string(),
	paymentDue: z.string(),
	adress: z.object({
		street: z.string().nonempty({ message: 'Field must not be empty' }),
		city: z.string().nonempty({ message: 'Field must not be empty' }),
		postCode: z.string().nonempty({ message: 'Field must not be empty' }),
		country: z.string().nonempty({ message: 'Field must not be empty' }),
	}),
	client: z.object({
		name: z.string().nonempty({ message: 'Field must not be empty' }),
		email: z
			.string()
			.email({ message: 'Invalid email adress' })
			.nonempty({ message: 'Field must not be empty' }),
		city: z.coerce.string().nonempty({ message: 'Field must not be empty' }),
		country: z.string().nonempty({ message: 'Field must not be empty' }),
		postCode: z.string().nonempty({ message: 'Field must not be empty' }),
		street: z.string().nonempty({ message: 'Field must not be empty' }),
		invoiceDate: z.coerce.date({ invalid_type_error: 'must be a date' }),
		paymentTerm: paymentTermEnum,
		description: z.string().nonempty({ message: 'Field must not be empty' }),
	}),
	items: z.array(
		z.object({
			name: z.string().nonempty(),
			quantity: z.coerce.number().min(1, { message: 'Field must not be empty' }),
			price: z.coerce.number().min(1, { message: 'Field must not be empty' }),
			total: z.coerce.number(),
		})
	),
});

export type invoiceSchemaData = z.infer<typeof createInvoiceFormSchema>;
