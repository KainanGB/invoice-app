import ErrorElement from '../ErrorElement';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { invoiceSchemaData, paymentTermEnum } from '@/types/schema';

interface Props {
	name: any;
	displayName: string;
	errors: Record<string, any>;
	register: UseFormRegister<invoiceSchemaData>;
	args?: RegisterOptions;
}

export default function InvoiceSelect({ displayName, name, errors, register, args }: Props) {
	const formatedName: string = String(name).slice(String(name).indexOf('.') + 1);
	const formattedSchemaIndex: string = String(name).substring(0, String(name).indexOf('.'));

	const getErrorColor = !!errors?.[formattedSchemaIndex]?.[formatedName];

	return (
		<div className="h-24 overflow-visible ">
			<label htmlFor={name}>{displayName}</label>
			<div className="flex flex-col">
				<select
					className={`border-[.5px] text-white p-3  rounded-sm bg-background-dark1 ${
						getErrorColor
							? 'border-error focus:border-error outline-none'
							: 'border-[#252945] focus:border-purpleish'
					} cursor-pointer`}
					id={name}
					{...register(name, { ...args })}
				>
					{paymentTermEnum.options.map((val, index) => (
						<option key={`${val}__${index}`} value={val}>
							{val}
						</option>
					))}
				</select>
			</div>

			{ErrorElement(name, errors)}
		</div>
	);
}
