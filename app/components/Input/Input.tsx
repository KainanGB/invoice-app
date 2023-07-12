import React, { useEffect } from 'react';
import { FieldValues, useController, UseControllerProps, useWatch } from 'react-hook-form';
import { ErrorElement } from '../ErrorElement';

type InputProps = {
	displayName: string;
	readonly?: boolean;
};

type ExtendedUseControllerProps<T extends FieldValues> = UseControllerProps<T> & InputProps;

export const Input = <T extends FieldValues>(props: ExtendedUseControllerProps<T>): JSX.Element => {
	const {
		field,
		fieldState: { error },
	} = useController(props);
	const getErrorStyle = !!error?.message
		? 'border-error focus:border-error outline-none'
		: 'border-[#252945] focus:border-purpleish';

	const isReadOnly = props.readonly
		? 'bg-background-dark2 border-none outline-none'
		: 'bg-background-dark1 ';

	return (
		<div className="h-24 overflow-visible">
			<label htmlFor={props.name}>{props.displayName}</label>
			<input
				{...field}
				id={props.name}
				readOnly={props.readonly}
				value={field.value as string}
				className={`w-full border-[.5px] text-white p-2  rounded-sm ${isReadOnly} ${getErrorStyle}`}
			/>
			{ErrorElement(error?.message)}
		</div>
	);
};
