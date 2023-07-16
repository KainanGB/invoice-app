import { InvoiceStatusLabel } from '@/components/InvoiceStatusLabel';

export default async function InvoiceForm({ params }: { params: { id: string } }) {
	const { id } = params;
	const data = await fetch(`http://localhost:3005/invoices?id=${id}`);
	const response = await data.json();
	const invoice = response[0];

	return (
		<div>
			<div className="flex items-center">
				<p>Status</p>
				<InvoiceStatusLabel status={invoice.status} />
			</div>

			<div>
				<div>
					<div className=" text-purpleish font-bold">
						#<span className="text-white font-semibold"> {`${invoice.id}`}</span>
					</div>
					<p className="text-light-gray">{invoice.client.name}</p>
				</div>
				<p className="text-light-gray">{invoice.client.country}</p>
				<p className="text-light-gray">{invoice.client.city}</p>

				<div>
					<div>
						<p className="text-light-gray">Invoice Date</p>
						<p className="text-white">{invoice.createdAt}</p>
						<p className="text-light-gray">Payment Due</p>
						<p className="text-white">{invoice.paymentDue}</p>
					</div>
					<div>
						<p className="text-light-gray">Bill To</p>
						<p className="text-white">{invoice.client.name}</p>
						<p className="text-light-gray">{invoice.client.street}</p>
						<p className="text-light-gray">{invoice.client.city}</p>
						<p className="text-light-gray">{invoice.client.postCode}</p>
						<p className="text-light-gray">{invoice.client.country}</p>
					</div>
				</div>

				<p className="text-white">Sent To</p>
				<p className="text-light-gray">{invoice.client.email}</p>

				<div className="text-light-gray">
					<p className="text-white">{invoice.client.name}</p>
					{invoice.items.map(item => {
						return (
							<div className="flex justify-between" key={item.id}>
								<div className="flex items-center">
									<p className="text-white">{item.name}</p>
									{Math.floor(item.quantity)} x
									<p className="text-white"> ${item.price}</p>
								</div>

								<div>
									<p className="text-white">${item.total}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
