export async function getPhotosByRover(
	rover,
	date,
	camera = 'all',
	page = 1
) {
	let baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

	let apiKeyString = `api_key=${
		process.env.REACT_APP_NASA_API_KEY ?? 'DEMO_KEY'
	}`;

	let cameraFilter = camera === 'all' ? '' : `&camera=${camera}`;

	let query = `${date.dateType}=${date.dateString}&page=${page}${cameraFilter}`;

	let photoData = await fetch(`${baseUrl}?${query}&${apiKeyString}`);

	photoData = await photoData.json();

	return photoData?.photos;
}

export async function getTotalPicturesByRover(rover, date) {
	let baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

	let apiKeyString = `api_key=${
		process.env.REACT_APP_NASA_API_KEY ?? 'DEMO_KEY'
	}`;

	let query = `${date.dateType}=${date.dateString}`;

	let totalPictures = await fetch(`${baseUrl}?${query}&${apiKeyString}`);

	totalPictures = await totalPictures.json();

	return totalPictures?.photos?.length;
}
