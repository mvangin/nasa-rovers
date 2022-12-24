import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from 'react';

function RoverImageGrid({ photoList }) {
	if (!photoList?.length) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '5rem',
					fontSize: '1.5rem;',
				}}
			>
				No photos found.
			</Box>
		);
	}

	return (
		<div>
			<ImageList variant="masonry" cols={3} gap={8}>
				{photoList.map((photo) => {
					return (
						<ImageListItem key={photo.id}>
							<img
								alt={`rover camera shot ${photo.id}`}
								width={'100%'}
								src={photo.img_src}
								loading="lazy"
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		</div>
	);
}

export default RoverImageGrid;
