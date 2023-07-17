import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from '../../redux/hooks/useRedux';

export const useIsLoading = () => {
	const isShowingForm = useAppSelector(state => state.invoiceSelect.isShowing);
	return useAppSelector(state =>
		Object.values(state.invoicesApi.queries).some(
			query => query && isShowingForm && query.status === QueryStatus.pending
		)
	);
};
