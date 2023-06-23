import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from '../useRedux';

export const useIsError = () => {
	return useAppSelector(state =>
		Object.values(state.invoicesApi.queries).some(
			query => query && query.status === QueryStatus.rejected
		)
	);
};
