import { getInvoiceStatus } from '@/constants';

export function InvoiceStatusLabel({ status }: { status: string }) {
	const toUpperCaseStatus = status.toUpperCase();
	const color = getInvoiceStatus(toUpperCaseStatus).color;
	const label = getInvoiceStatus(toUpperCaseStatus).label;

	return (
		<div
			className={`text-${color} bg-${color} bg-opacity-5 w-28 py-2 justify-center flex rounded-lg font-semibold`}
		>
			<span className="flex items-center">
				<span className={`p-1 mr-2 rounded-full bg-${color}`}></span>
				{label}
			</span>
		</div>
	);
}
