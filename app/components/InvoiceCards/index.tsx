'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useGetInvoiceQuery, useGetInvoicesQuery } from '@/redux/features/invoice-api-slice';

import Skeleton from '../Skeleton';
import { formatCurrency } from '@/helpers/formatter/formatCurrency';
import { formatDate } from '@/helpers/formatter/formatDate';
import { getInvoice } from '@/redux/features/invoice-slice';
import { getInvoiceStatus } from '@/constants';
import { increaseLimit } from '@/redux/features/filter-select.slice';
import { useIsError } from '@/hooks/useIsError';
import { useIsLoading } from '@/hooks/useIsLoading';

function InvoiceStatusLabel({ status }: { status: string }) {
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

export default function InvoiceCards() {
	const selectedFilter = useAppSelector(state => state.filterSelect.value);
	const limit = useAppSelector(state => state.filterSelect.limit);
	const { id, formType, isShowing } = useAppSelector(state => state.invoiceSelect);
	const dispatch = useAppDispatch();

	const isLoading = useIsLoading();
	const isError = useIsError();

	const { data: single } = useGetInvoiceQuery({ id }, { skip: formType === 'new' });

	const onFilterLimit = () => {
		dispatch(increaseLimit(limit + 2));
	};

	const onClickInvoiceDetails = (id: number) => {
		dispatch(getInvoice({ id, formType: 'edit', isShowing: false }));
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
					<div
						className="bg-background-dark1  text-white p-5 mt-5 rounded-lg border-2 border-background-dark2 hover:border-light-purple duration-300 cursor-pointer ease-linear"
						key={item.id}
						onClick={() => onClickInvoiceDetails(item.id)}
					>
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
								<span className="font-bold ">{formatCurrency(item.total)}</span>
							</div>

							<InvoiceStatusLabel status={item.status} />
						</div>
					</div>
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
