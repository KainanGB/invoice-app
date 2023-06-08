const invoiceStatusColor = {
	0: 'green',
	1: 'warning',
	2: 'white',
} as any;

const invoiceStatusLabel = {
	0: 'Paid',
	1: 'Pending',
	2: 'Draft',
} as any;

export const getInvoiceStatus = (id: number) => {
	return {
		label: invoiceStatusLabel[id],
		color: invoiceStatusColor[id],
	};
};
