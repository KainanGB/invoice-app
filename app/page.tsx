import ActionsMenu from './components/ActionsMenu';
import InvoiceCards from './components/InvoiceCards';

export default function Home() {
	return (
		<div className="max-w-screen-sm m-auto md:max-w-screen-lg px-4">
			<ActionsMenu />
			<InvoiceCards />
		</div>
	);
}
