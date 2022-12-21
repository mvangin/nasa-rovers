export default async function getPhotosByRover(rover, date, page = 1) {
	let baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

	let data = await fetch(
		`${baseUrl}/${rover}/photos?page=${page}&${date.dateType}=${date.dateString}&api_key=${process.env.REACT_APP_NASA_API_KEY ?? 'DEMO_KEY'}`
	);
	data = await data.json();
	return data.photos;
}
