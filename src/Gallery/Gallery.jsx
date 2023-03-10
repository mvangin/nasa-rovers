import { cameraMapping } from '../config/rover-cameras';
import { formatDate } from '../utils/formatDate';
import {
	getPhotosByRover,
	getTotalPicturesByRover,
} from '../Services/GalleryService';
import Bookmarks from '../Bookmarks/Bookmarks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import React, { useEffect, useState, useCallback } from 'react';
import RoverImageGrid from '../Shared/RoverImageGrid';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Gallery() {
	const [photoList, setPhotoList] = useState([]);
	const [rover, setRover] = useState('');
	const [isFetchingData, setIsFetchingData] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPhotos, setTotalPhotos] = useState(1);
	const [cameraName, setCameraName] = useState('');
	const [error, setError] = useState(false);
	const [dateObject, setDateObject] = useState({});

	const getAndSetRoverPhotos = useCallback(
		async (rover, dateObject, cameraName, page) => {
			setIsFetchingData(true);
			setError(false);
			try {
				const photos = await getPhotosByRover(
					rover,
					dateObject,
					cameraName,
					page
				);
				const totalPhotos = await getTotalPicturesByRover(
					rover,
					dateObject,
					cameraName
				);
				setPhotoList(photos);
				setTotalPhotos(totalPhotos);
			} catch (error) {
				setError(true);
			}
			setIsFetchingData(false);
		},
		[]
	);

	useEffect(() => {
		const initialDateObject = {
			dateType: 'earth_date',
			earthDate: formatDate(new Date()),
			solDate: 0,
		};

		setRover('curiosity');
		setDateObject(initialDateObject);
		setCameraName('all');

		getAndSetRoverPhotos('curiosity', initialDateObject, 'all', 1);
	}, [getAndSetRoverPhotos]);

	function setFilterStates(rover, dateObject, cameraName, page) {
		setRover(rover);
		setDateObject(dateObject);
		setCameraName(cameraName);
		setPage(page);
	}

	function handleSelectRover(event) {
		setRover(event.target.value);
	}

	function handleDateChange(event, dateType) {
		setDateObject((prev) => ({ ...prev, [dateType]: event.target.value }));
	}

	const handleToggleChange = (event) => {
		setDateObject((prev) => ({
			...prev,
			dateType: event.target.value,
		}));
	};

	function handleSearch() {
		getAndSetRoverPhotos(rover, dateObject, cameraName, 1);
		setPage(1);
	}

	function updatePageNumber(pageNumber) {
		getAndSetRoverPhotos(rover, dateObject, cameraName, pageNumber);
	}

	function renderImageGrid() {
		if (error) {
			return (
				<Box display="flex" justifyContent="center" mt={5}>
					An error occurred. Please update your search parameters and
					try again.
				</Box>
			);
		}

		return isFetchingData ? (
			<Box display="flex" justifyContent="center" mt={5}>
				<CircularProgress />
			</Box>
		) : (
			<div>
				<RoverImageGrid photoList={photoList} />
				<PaginationWrapper
					updatePageNumber={updatePageNumber}
					setPage={setPage}
					page={page}
					totalItems={totalPhotos}
				/>
			</div>
		);
	}

	return (
		<>
			<Box display="flex" justifyContent="center">
				<h1> NASA Mars Rover Photo Gallery </h1>
			</Box>

			<Box
				marginBottom="2rem"
				display="flex"
				sx={{ flexDirection: { xs: 'column', md: 'row' } }}
			>
				<Box
					display="flex"
					flexDirection="column"
					marginRight="1rem"
					marginLeft="1rem"
				>
					<h1> Filters </h1>
					<div>
						<div>
							<ToggleButtonGroup
								color="primary"
								value={dateObject.dateType}
								exclusive
								onChange={handleToggleChange}
								aria-label="date type"
								sx={{ margin: '8px' }}
							>
								<ToggleButton value="earth_date">
									Date
								</ToggleButton>
								<ToggleButton value="sol">
									Martian Sol
								</ToggleButton>
							</ToggleButtonGroup>
						</div>

						{dateObject.dateType === 'earth_date' && (
							<TextField
								id="earth-date-field"
								label="Enter date"
								variant="outlined"
								type="date"
								value={dateObject?.earthDate}
								onChange={(event) =>
									handleDateChange(event, 'earthDate')
								}
								sx={{ margin: '8px' }}
							/>
						)}

						{dateObject.dateType === 'sol' && (
							<TextField
								inputProps={{
									inputMode: 'numeric',
									pattern: '[0-9]*',
									min: '0',
								}}
								type="number"
								value={dateObject?.solDate}
								onChange={(event) =>
									handleDateChange(event, 'solDate')
								}
								id="sol-input-field"
								label="Enter sol day"
								variant="standard"
								sx={{ margin: '8px' }}
							/>
						)}
					</div>

					<FormControl
						variant="standard"
						sx={{ m: 1, minWidth: 250 }}
					>
						<InputLabel id="rover-label">Select Rover</InputLabel>
						<Select
							labelId="rover-label"
							id="rover-select"
							value={rover}
							onChange={handleSelectRover}
							label="Rover"
						>
							<MenuItem value={'curiosity'}>Curiosity</MenuItem>
							<MenuItem value={'opportunity'}>
								Opportunity
							</MenuItem>
							<MenuItem value={'spirit'}>Spirit</MenuItem>
						</Select>
					</FormControl>

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
							{cameraMapping.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						variant="contained"
						color="success"
						onClick={handleSearch}
					>
						Search
					</Button>

					<Bookmarks
						rover={rover}
						dateObject={dateObject}
						cameraName={cameraName}
						getAndSetRoverPhotos={getAndSetRoverPhotos}
						setFilterStates={setFilterStates}
					/>
				</Box>

				<Box>{renderImageGrid()}</Box>
			</Box>
		</>
	);
}

export default Gallery;
