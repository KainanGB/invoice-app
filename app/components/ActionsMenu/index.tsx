import Image from 'next/image';
import plusIcon from '@/assets/icon-plus.svg';
import Filter from '../Filter';

export default function ActionsMenu() {
	return (
		<div className="flex items-center justify-between mt-10">
			<div>
				<h1 className="text-2xl text-white font-semibold">Invoices</h1>
				<p className="text-light-gray">7 Invoices</p>
			</div>
			<div className="flex items-center">
				<Filter />
				<button className="flex items-center bg-light-purple rounded-full px-3 py-2 text-white font-bold text-sm">
					<div className="p-2 bg-white rounded-full mr-2">
						<Image src={plusIcon} alt="plus icon" height={10} />
					</div>
					New
				</button>
			</div>
		</div>
	);
}
