import React, { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery';
import Container from '@mui/material/Container';

function App() {
	return (
		<Container maxWidth="md" >
			<Gallery />
		</Container>
	);
}

export default App;
