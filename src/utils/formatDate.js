export function formatDate(date){
	const year = date.getFullYear();
	const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
	const month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
	return `${year}-${month}-${day}`
}
