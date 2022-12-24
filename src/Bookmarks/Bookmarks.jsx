import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BookmarkPopup from '../BookmarkPopup/BookmarkPopup';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useState } from 'react';

function Bookmarks({
	rover,
	dateObject,
	cameraName,
	getAndSetPhotosByRover,
	setFilterStates,
}) {
	const [showBookmarkDialogue, setShowBookmarkDialogue] = useState(false);
	const [bookmarkList, setBookmarkList] = useState([]);
	const [showBookmarks, setShowBookmarks] = useState(false);

	function saveBookmarkToStorage(bookmarkTitle) {
		const payload =
			JSON.parse(localStorage.getItem('rover_image_bookmarks')) || [];

		payload.push({
			bookmarkTitle,
			rover,
			dateObject,
			cameraName,
			page: '1',
		});

		localStorage.setItem('rover_image_bookmarks', JSON.stringify(payload));
	}

	function handleSaveBookmark() {
		setShowBookmarkDialogue(true);
	}

	function getBookmarkedSearches() {
		const bookmarks =
			JSON.parse(localStorage.getItem('rover_image_bookmarks')) || [];
		setBookmarkList(bookmarks);
		setShowBookmarks((prev) => !prev);
	}

	function setSearchToBookmark(bookmark) {
		setFilterStates(
			bookmark.rover,
			bookmark.dateObject,
			bookmark.cameraName,
			1
		);
		getAndSetPhotosByRover(
			bookmark.rover,
			bookmark.dateObject,
			bookmark.cameraName,
			1
		);
		setShowBookmarks(false);
	}

	function renderSavedBookmarks() {
		if (!bookmarkList.length) {
			return <ListItem component="div">No Bookmarks found</ListItem>;
		}

		return bookmarkList.map((bookmark, index) => (
			<ListItem key={index} component="div">
				<ListItemButton onClick={() => setSearchToBookmark(bookmark)}>
					{bookmark.bookmarkTitle}
				</ListItemButton>
			</ListItem>
		));
	}

	return (
		<>
			<Button
				sx={{ marginTop: '1rem' }}
				variant="outlined"
				onClick={handleSaveBookmark}
			>
				Add Bookmark
			</Button>
			<Button
				sx={{ marginTop: '1rem' }}
				variant="contained"
				onClick={getBookmarkedSearches}
			>
				Saved Bookmarks
			</Button>
			<Box
				sx={{
					bgcolor: 'background.paper',
				}}
			>
				{showBookmarks && renderSavedBookmarks()}
			</Box>
			<BookmarkPopup
				open={showBookmarkDialogue}
				setOpen={setShowBookmarkDialogue}
				onSave={saveBookmarkToStorage}
			/>
		</>
	);
}

export default Bookmarks;
