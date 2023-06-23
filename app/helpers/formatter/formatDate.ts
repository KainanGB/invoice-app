export const formatDate = (date: Date | string) => {
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	return date ? new Date(date).toLocaleDateString('en-US', options) : null;
};
