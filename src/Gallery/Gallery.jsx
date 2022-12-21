import { formatDate } from '../utils/formatDate';
import getPhotosByRover from '../Services/GalleryService';
import ImageGrid from '../Shared/ImageGrid';
import React, { useState, useEffect } from 'react';

function Gallery() {
	const [photoList, setPhotoList] = useState([]);
	const [rover, setRover] = useState(null);

	async function getAndSetPhotosByRover(rover, date) {
		try {
			const data = await getPhotosByRover(rover, date);
			setPhotoList(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const dateString = formatDate(new Date('2015-06-03'));
		console.log(dateString);

		let dateObj = {
			dateType: 'earth_date',
			dateString: dateString,
		};

		getAndSetPhotosByRover('curiosity', dateObj);
	}, []);

	console.log(photoList);

	return (
		<div >
			<ImageGrid photoList={photoList} />
		</div>
	);
}

export default Gallery;
