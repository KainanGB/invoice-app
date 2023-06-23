import ErrorElement from '../ErrorElement';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { invoiceSchemaData } from '@/types/schema';

interface Props {
	name: any;
	displayName: string;
	errors: Record<string, any>;
	register: UseFormRegister<invoiceSchemaData>;
	args?: RegisterOptions;
	className?: string;
	props?: HTMLInputElement;
}

export default function InvoiceInput({
	className,
	displayName,
	name,
	errors,
	register,
	args,
	...props
}: Props) {
	const formatedName: string = String(name).slice(String(name).indexOf('.') + 1);
	const formattedSchemaIndex: string = String(name).substring(0, String(name).indexOf('.'));

	const inputType = {
		email: 'email',
		invoiceDate: 'date',
	} as { [key: string]: string };

	const getErrorColor = !!errors?.[formattedSchemaIndex]?.[formatedName];

	return (
		<div className={`h-24 overflow-visible ${className}`}>
			<label htmlFor={name}>{displayName}</label>
			<div className="flex flex-col">
				<input
					className={`w-full border-[.5px] text-white p-2  rounded-sm bg-background-dark1 ${
						getErrorColor
							? 'border-error focus:border-error outline-none'
							: 'border-[#252945] focus:border-purpleish'
					} ${args?.disabled ? 'bg-background-dark2 border-none' : ''}`}
					id={name}
					type={inputType[formatedName] ? inputType[formatedName] : 'text'}
					{...register(name, { ...args })}
					{...props}
				/>
				{ErrorElement(name, errors)}
			</div>
		</div>
	);
}
