import React, { useState, useEffect } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';

function ImageGrid({ photoList }) {
	function renderPhotoList(photoList) {
		return (
			<ImageList variant="masonry" cols={3} gap={8}>
				{photoList.map((photo) => {
					return (
						<ImageListItem key={photo.id}>
							<img
								alt="rover camera shot"
								width={'100%'}
								src={photo.img_src}
								loading="lazy"
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		);
	}

	return <div>{photoList && renderPhotoList(photoList)}</div>;
}

export default ImageGrid;
