'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux';
import { useGetInvoiceQuery, useGetInvoicesQuery } from '@/redux/features/invoice-api-slice';
import Skeleton from '../Skeleton';
import { formatCurrency } from '@/helpers/formatter/formatCurrency';
import { formatDate } from '@/helpers/formatter/formatDate';
import { increaseLimit } from '@/redux/features/filter-select.slice';
import { useIsError } from '@/hooks/useIsError';
import { useIsLoading } from '@/hooks/useIsLoading';
import { InvoiceStatusLabel } from '../InvoiceStatusLabel';
import { getInvoice } from '@/redux/features/invoice-slice';
import Link from 'next/link';

// #TODO FAZER ESSE COMPONENTE SER UM SERVER COMPONENT!!!!!
// #TODO FAZER ESSE COMPONENTE SER UM SERVER COMPONENT!!!!!

export default function InvoiceCards() {
	const selectedFilter = useAppSelector(state => state.filterSelect.value);
	const limit = useAppSelector(state => state.filterSelect.limit);
	const { isShowing } = useAppSelector(state => state.invoiceSelect);

	const dispatch = useAppDispatch();
	const isLoading = useIsLoading();
	const isError = useIsError();

	const onFilterLimit = () => {
		dispatch(increaseLimit(limit + 2));
	};

	const { data: invoicesData } = useGetInvoicesQuery({
		status: selectedFilter,
		limit,
	});

	const { data } = invoicesData || {};

	if (isError) return <div className="text-white">An error has occurred!</div>;

	if (isLoading) return <Skeleton />;

	if (!isShowing) return <Skeleton />;

	return (
		<>
			{data &&
				data?.map(item => (
					<Link href={`/invoice/${item.id}`} key={item.id}>
						<div className="bg-background-dark1  text-white p-5 mt-5 rounded-lg border-2 border-background-dark2 hover:border-light-purple duration-300 cursor-pointer ease-linear">
							<div className="flex justify-between">
								<div className="flex items-center text-purpleish font-bold">
									# <span className="text-white font-semibold">{item.id}</span>
								</div>
								<span className="text-light-gray">{item.client.name}</span>
							</div>

							<div className="flex justify-between items-center mt-4">
								<div className="flex flex-col">
									<span className="text-light-gray">
										{formatDate(item.paymentDue)}
									</span>
									<span className="font-bold ">
										{formatCurrency(+item.total)}
									</span>
								</div>

								<InvoiceStatusLabel status={item.status} />
							</div>
						</div>
					</Link>
				))}

			<div className="flex justify-center w-full mt-5">
				<button
					className="bg-light-purple rounded-full px-3 py-2 text-white font-bold text-sm"
					onClick={onFilterLimit}
				>
					Load More...
				</button>
			</div>
		</>
	);
}
