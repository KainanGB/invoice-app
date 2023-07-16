'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import Filter from '../Filter';
import Image from 'next/image';
import { getInvoice } from '@/redux/features/invoice-slice';
import plusIcon from '@/assets/icon-plus.svg';
import { useGetInvoicesQuery } from '@/redux/features/invoice-api-slice';
import Skeleton from '../Skeleton';

export default function ActionsMenu() {
	const dispatch = useAppDispatch();
	const { isShowing } = useAppSelector(state => state.invoiceSelect);
	const limit = useAppSelector(state => state.filterSelect.limit);
	const selectedFilter = useAppSelector(state => state.filterSelect.value);

	const { data } = useGetInvoicesQuery({
		status: selectedFilter,
		limit,
	});

	const onClickNewInvoice = () => {
		dispatch(getInvoice({ id: 0, formType: 'new', isShowing: false }));
	};

	if (!isShowing) return <Skeleton />;

	return (
		<>
			{isShowing && (
				<div className="flex items-center justify-between mt-8">
					<div>
						<h1 className="text-2xl text-white font-semibold">Invoices</h1>
						<p className="text-light-gray">{data?.totalItems} Invoices</p>
					</div>
					<div className="flex items-center">
						<Filter />
						<button
							className="flex items-center bg-light-purple rounded-full px-3 py-2 text-white font-bold text-sm"
							onClick={() => onClickNewInvoice()}
						>
							<div className="p-2 bg-white rounded-full mr-2">
								<Image src={plusIcon} alt="plus icon" height={10} />
							</div>
							New
						</button>
					</div>
				</div>
			)}
		</>
	);
}
