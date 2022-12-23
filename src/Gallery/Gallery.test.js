import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';
import userEvent from '@testing-library/user-event';


test('check if filter items display', () => {
	render(<Gallery />); 
	const earthDate = screen.getByLabelText('Enter date');
	const selectRover = screen.getByLabelText('Select Rover');
	const selectRoverCameras = screen.getByLabelText('Select Rover Cameras');
	const dateToggle = screen.getByText('Date');
	const solToggle = screen.getByText('Martian Sol');

	expect(selectRoverCameras).toBeInTheDocument();
	expect(earthDate).toBeInTheDocument();
	expect(selectRover).toBeInTheDocument();
	expect(dateToggle).toBeInTheDocument();
	expect(solToggle).toBeInTheDocument();

});

test('martian sol should replace earth date when sol toggle is clicked', () => {
	render(<Gallery />); 

	const solToggle = screen.getByRole("button", { name: "Martian Sol" });
	userEvent.click(solToggle);
	const solDay = screen.getByLabelText('Enter sol day');
	const earthDate = screen.queryByText('Enter Date')

	expect(earthDate).not.toBeInTheDocument();
	expect(solDay).toBeInTheDocument();

  });


  test('earth date input should replace martian sol when earth toggle is clicked', () => {
	render(<Gallery />); 

	const solToggle = screen.getByRole("button", { name: "Martian Sol" });
	const earthToggle = screen.getByRole("button", { name: "Date" });

	userEvent.click(solToggle);
	userEvent.click(earthToggle);

	const earthDate = screen.getByLabelText('Enter date');
	const solDay = screen.queryByText('Enter sol day');

	expect(earthDate).toBeInTheDocument();
	expect(solDay).not.toBeInTheDocument();

  });
