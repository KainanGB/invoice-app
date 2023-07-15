export const formatFormLabel = (formatedName: string) =>
	formatedName.includes('.')
		? formatedName
				.slice(formatedName.indexOf('.') + 1)
				.slice(formatedName.indexOf(' ') + 1)
				.toLowerCase()
		: formatedName;
