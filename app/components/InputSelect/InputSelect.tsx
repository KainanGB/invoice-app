import * as React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { invoiceSchemaData, paymentTermEnum } from '@/types/schema';
import { ErrorElement } from '../ErrorElement';

type InputProps = UseControllerProps<invoiceSchemaData> & {
	displayName: string;
};

export function InputSelect(props: InputProps) {
	const { field, fieldState, formState } = useController(props);
	const getErrorColor = !!fieldState.error?.message;

	return (
		<div className="h-24 overflow-visible">
			<label htmlFor={props.name}>{props.displayName}</label>
			<div className="flex flex-col">
				<select
					{...field}
					value={field.value as string}
					className={`border-[.5px] text-white p-3  rounded-sm bg-background-dark1 ${
						getErrorColor
							? 'border-error focus:border-error outline-none'
							: 'border-[#252945] focus:border-purpleish'
					} cursor-pointer`}
				>
					{paymentTermEnum.options.map((val, index) => (
						<option key={`${val}__${index}`} value={val}>
							{val}
						</option>
					))}
				</select>
			</div>
			{ErrorElement(fieldState.error?.message)}
		</div>
	);
}
