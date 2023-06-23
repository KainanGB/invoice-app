import ActionsMenu from './components/ActionsMenu';
import InvoiceCards from './components/InvoiceCards';
import InvoiceForm from './components/InvoiceForm';

export default function Home() {
	return (
		<div className="w-full max-w-screen-sm m-auto md:max-w-screen-lg px-6">
			<InvoiceForm />
			<ActionsMenu />
			<InvoiceCards />
		</div>
	);
}
