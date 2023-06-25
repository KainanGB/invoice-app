import React, { ReactNode } from 'react';

export function ErrorElement(fieldError: string | undefined): string | undefined | ReactNode {
	return fieldError ? (
		<small role="alert" className="text-error">
			{fieldError}
		</small>
	) : undefined;
}
