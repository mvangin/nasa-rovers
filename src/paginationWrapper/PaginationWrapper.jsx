import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import React from 'react';

function PaginationWrapper({ setPage, page, totalItems}) {

	const numberOfPages = Math.ceil(totalItems / 25)

	function handlePageChange(event, value) {
		setPage(value);
	}

	return (
		<Box display="flex" justifyContent="center">
			<Pagination
				sx={{ marginBottom: '5rem', marginTop: '5rem' }}
				count={numberOfPages}
				page={page}
				onChange={handlePageChange}
			/>
		</Box>
	);
}

export default PaginationWrapper;
