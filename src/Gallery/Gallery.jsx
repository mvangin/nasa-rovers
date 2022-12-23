import { cameraMapping } from '../config/rover-cameras';
import { formatDate } from '../utils/formatDate';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import {
	getPhotosByRover,
	getTotalPicturesByRover,
} from '../Services/GalleryService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import PaginationWrapper from '../paginationWrapper/PaginationWrapper';
import React, { useEffect, useState } from 'react';
import RoverImageGrid from '../Shared/RoverImageGrid';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Gallery() {
	const [photoList, setPhotoList] = useState([]);
	const [rover, setRover] = useState('curiosity');
	const [dateObject, setDateObject] = useState({
		dateType: 'earth_date',
		dateString: formatDate(new Date()),
	});
	const [isFetchingData, setIsFetchingData] = useState(true);
	const [page, setPage] = useState(1);
	const [totalItems, setTotalItems] = useState(1);
	const [cameraList, setCameraList] = useState(cameraMapping);
	const [cameraName, setCameraName] = useState('all');

	async function getAndSetPhotosByRover(rover, date, cameraName, page) {
		setIsFetchingData(true);
		try {
			const photos = await getPhotosByRover(
				rover,
				date,
				cameraName,
				page
			);
			const totalPhotos = await getTotalPicturesByRover(rover, date);
			setPhotoList(photos);
			setTotalItems(totalPhotos);
		} catch (error) {
			console.log(error);
		}
		setIsFetchingData(false);
	}

	useEffect(() => {
		if (!rover || !dateObject || !page) {
			return;
		}

		getAndSetPhotosByRover(rover, dateObject, cameraName, page);
	}, [page, dateObject, rover, cameraName]);

	function handleSelectRover(e) {
		setRover(e.target.value);
		setPage(1);
	}

	function handleDateChange(event) {
		setDateObject((prev) => ({ ...prev, dateString: event.target.value }));
	}

	const handleToggleChange = (event) => {
		setDateObject({
			dateString:
				event.target.value === 'sol' ? 0 : formatDate(new Date()),
			dateType: event.target.value,
		});
	};

	return (
		<div>
			<Box
				display="flex"
				justifyContent="space-around"
				alignItems="center"
				marginTop="1rem"
				marginBottom="1rem"
				sx={{ flexDirection: { xs: 'column', md: 'row' } }}
			>
				<div>
					<div>
						<ToggleButtonGroup
							color="primary"
							value={dateObject.dateType}
							exclusive
							onChange={handleToggleChange}
							aria-label="Platform"
							sx={{ marginBottom: '.5rem' }}
						>
							<ToggleButton value="sol">Martian Sol</ToggleButton>
							<ToggleButton value="earth_date">Date</ToggleButton>
						</ToggleButtonGroup>
					</div>

					{dateObject.dateType === 'earth_date' && (
						<TextField
							id="outlined-basic"
							label="Enter date"
							variant="outlined"
							type="date"
							value={dateObject.dateString}
							onChange={handleDateChange}
						/>
					)}

					{dateObject.dateType === 'sol' && (
						<TextField
							value={dateObject.dateString}
							onChange={handleDateChange}
							id="standard-basic"
							label="Enter sol day"
							variant="standard"
						/>
					)}
				</div>

				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="rover-label">Select Rover</InputLabel>
					<Select
						labelId="rover-label"
						id="rover-select"
						value={rover}
						onChange={handleSelectRover}
						label="Rover"
					>
						<MenuItem value={'curiosity'}>Curiosity</MenuItem>
						<MenuItem value={'opportunity'}>Opportunity</MenuItem>
						<MenuItem value={'spirit'}>Spirit</MenuItem>
					</Select>
				</FormControl>

				<Box>
					<FormControl
						variant="standard"
						sx={{ m: 1, minWidth: 250 }}
					>
						<InputLabel id="rover-camera-label">
							Select Rover Cameras
						</InputLabel>
						<Select
							labelId="rover-camera-label"
							value={cameraName}
							onChange={(event) => {
								setCameraName(event.target.value);
							}}
						>
							<MenuItem value={'all'}> All Cameras </MenuItem>
							{cameraList.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>

			{isFetchingData ? (
				<Box display="flex" justifyContent="center" mt={5}>
					<CircularProgress />
				</Box>
			) : (
				<div>
					<RoverImageGrid photoList={photoList} />
					<PaginationWrapper
						setPage={setPage}
						page={page}
						totalItems={totalItems}
					/>
				</div>
			)}
		</div>
	);
}

export default Gallery;
