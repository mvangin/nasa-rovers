import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function FormDialog({ onSave, open, setOpen }) {
	const [bookmarkTitle, setBookmarkTitle] = useState('');

	function handleClose() {
		setOpen(false);
	}

	function handleSave() {
		onSave(bookmarkTitle);
		setOpen(false);
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle> Save Bookmark </DialogTitle>
				<DialogContent>
					<TextField
						value={bookmarkTitle}
						onChange={(event) =>
							setBookmarkTitle(event.target.value)
						}
						autoFocus
						margin="dense"
						id="bookmark-title"
						label="bookmark title"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
