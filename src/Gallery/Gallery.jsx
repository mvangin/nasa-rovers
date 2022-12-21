import { formatDate } from '../utils/formatDate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './gallery.module.css';
import getPhotosByRover from '../Services/GalleryService';
import Pagination from '@mui/material/Pagination';
import React, { useState, useEffect } from 'react';
import RoverImageGrid from '../Shared/RoverImageGrid';

function Gallery() {
	const [photoList, setPhotoList] = useState([]);
	const [rover, setRover] = useState(null);
	const [dateObject, setDateObject] = useState(null);
	const [isFetchingData, setIsFetchingData] = useState(false);
	const [page, setPage] = useState(1);

	async function getAndSetPhotosByRover(rover, date, page) {
		setIsFetchingData(true);
		try {
			const data = await getPhotosByRover(rover, date, page);
			setPhotoList(data);
		} catch (error) {
			console.log(error);
		}
		setIsFetchingData(false);
	}

	useEffect(() => {
		const dateString = formatDate(new Date('2015-06-03'));

		let dateObject = {
			dateType: 'earth_date',
			dateString: dateString,
		};

		setDateObject(dateObject);
		setRover('curiosity');

		getAndSetPhotosByRover('curiosity', dateObject);
	}, []);

	function handleSelectRover(selectedRover) {
		setRover(selectedRover);
		setPage(1);
		getAndSetPhotosByRover(selectedRover, dateObject, 1);
	}

	function handlePageChange(event, pageValue) {
		setPage(pageValue);
		console.log(pageValue, 'va');
		getAndSetPhotosByRover(rover, dateObject, pageValue);
	}

	console.log(photoList);

	return (
		<div>
			<div style={{ marginTop: '2rem', textAlign: 'center' }}>
				Select Rover
			</div>

			<Box display="flex" justifyContent="center">
				<div>
					<Button onClick={() => handleSelectRover('curiosity')}>
						Curiosity
					</Button>
					<Button onClick={() => handleSelectRover('opportunity')}>
						Opportunity
					</Button>
					<Button onClick={() => handleSelectRover('spirit')}>
						Spirit
					</Button>
				</div>
			</Box>
			{isFetchingData ? (
				<Box display="flex" justifyContent="center" mt={5}>
					<CircularProgress />
				</Box>
			) : (
				<div>
					<RoverImageGrid photoList={photoList} />
					<Box display="flex" justifyContent="center">
						<Pagination
							sx={{ marginBottom: '5rem', marginTop: '5rem' }}
							count={10}
							page={page}
							onChange={handlePageChange}
						/>
					</Box>
				</div>
			)}
		</div>
	);
}

export default Gallery;
