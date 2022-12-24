const apiKeyString = `api_key=${
	process.env.REACT_APP_NASA_API_KEY ?? 'DEMO_KEY'
}`;

export async function getPhotosByRover(rover, date, camera = 'all', page = 1) {
	const baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

	const cameraFilter = camera === 'all' ? '' : `&camera=${camera}`;

	const dateString =
		date.dateType === 'earth_date' ? date.earthDate : date.solDate;

	const query = `${date.dateType}=${dateString}&page=${page}${cameraFilter}`;

	let photoData = await fetch(`${baseUrl}?${query}&${apiKeyString}`);

	photoData = await photoData.json();

	return photoData?.photos;
}

export async function getTotalPicturesByRover(rover, date) {
	let baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

	const dateString =
		date.dateType === 'earth_date' ? date.earthDate : date.solDate;

	const query = `${date.dateType}=${dateString}`;

	let totalPictures = await fetch(`${baseUrl}?${query}&${apiKeyString}`);

	totalPictures = await totalPictures.json();

	return totalPictures?.photos?.length;
}
