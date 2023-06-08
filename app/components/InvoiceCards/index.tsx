'use client';
import { useState } from 'react';
import formatDate from '@/helpers/formatter/formatDate';
import formatCurrency from '@/helpers/formatter/formatCurrency';
import { getInvoiceStatus } from '@/constants';

function InvoiceStatusLabel({ status }: { status: number }) {
	return (
		<div
			className={`text-${getInvoiceStatus(status).color} bg-${
				getInvoiceStatus(status).color
			} bg-opacity-5 w-28 py-2 justify-center flex rounded-lg font-semibold`}
		>
			<span className="flex items-center">
				<span
					className={`p-1 mr-2 rounded-full bg-${getInvoiceStatus(status).color}`}
				></span>
				{getInvoiceStatus(status).label}
			</span>
		</div>
	);
}

type State = {
	id: string;
	name: string;
	createdAt: Date;
	value: number;
	status: number;
};

export default function InvoiceCards() {
	const [data, setData] = useState<State[]>([
		{
			id: 'RT3080',
			name: 'Jensen Huang',
			createdAt: new Date(),
			value: 1800,
			status: 0,
		},
		{
			id: 'RT308',
			name: 'Jensen Huang',
			createdAt: new Date(),
			value: 1800,
			status: 1,
		},
		{
			id: 'RT380',
			name: 'Jensen Huang',
			createdAt: new Date(),
			value: 1800,
			status: 2,
		},
	]);

	return (
		<>
			{data.map(item => (
				<div
					className="bg-background-dark1 text-white p-5 mt-5 rounded-lg border-2 border-background-dark2 hover:border-light-purple duration-300 cursor-pointer ease-linear"
					key={item.id}
				>
					<div className="flex justify-between">
						<div className="flex items-center text-purpleish font-bold">
							# <span className="text-white font-semibold">{item.id}</span>
						</div>
						<span className="text-light-gray">{item.name}</span>
					</div>

					<div className="flex justify-between items-center mt-4">
						<div className="flex flex-col">
							<span className="text-light-gray">{formatDate(item.createdAt)}</span>
							<span className="font-bold ">{formatCurrency(item.value)}</span>
						</div>

						<InvoiceStatusLabel status={item.status} />
					</div>
				</div>
			))}
		</>
	);
}
