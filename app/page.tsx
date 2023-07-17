'use client';
import ActionsMenu from './components/ActionsMenu';
import InvoiceCards from './components/InvoiceCards';
import InvoiceForm from './components/InvoiceForm';
import { useAppSelector } from './redux/hooks/useRedux';

export default function Home() {
	const { isShowing, formType, id } = useAppSelector(state => state.invoiceSelect);

	return (
		<div className="w-full max-w-screen-sm m-auto md:max-w-screen-lg px-6">
			{!isShowing ? (
				<InvoiceForm />
			) : (
				<>
					<ActionsMenu />
					<InvoiceCards />
				</>
			)}
		</div>
	);
}
