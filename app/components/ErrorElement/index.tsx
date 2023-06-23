import React, { ReactNode } from 'react';

export default function ErrorElement(
	fieldName: string,
	errs: Record<string, any>
): string | undefined | ReactNode {
	const formatedName = fieldName.slice(fieldName.indexOf('.') + 1) as string;
	const formattedSchemaIndex = fieldName.substring(0, fieldName.indexOf('.'));
	return errs?.[formattedSchemaIndex] ? (
		<small className="text-error">
			{errs?.[formattedSchemaIndex]?.[formatedName]?.message}
		</small>
	) : undefined;
}
