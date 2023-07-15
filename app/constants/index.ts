const invoiceStatusColor = {
	PAID: 'green',
	PENDING: 'warning',
	DRAFT: 'white',
} as any;

export const invoiceStatusLabel = {
	PAID: 'Paid',
	PENDING: 'Pending',
	DRAFT: 'Draft',
} as any;

type InvoiceStatusType = {
	label: string;
	color: string;
};

export const getInvoiceStatus = (id: string): InvoiceStatusType => {
	return {
		label: invoiceStatusLabel[id],
		color: invoiceStatusColor[id],
	};
};
