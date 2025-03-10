# Health Tracker Application

A simple health tracker application that can be run by simply opening the index.html file in a web browser. No server or build process is required.

## Features

- Track daily calories, protein, and exercise
- Save entries for different dates
- View history of all entries
- Delete entries
- View weekly statistics (averages for the last 7 days)
- Data is stored locally in your browser

## How to Run

1. Download or clone this repository
2. Open the `index.html` file in your web browser
3. That's it! The application will load and run directly in your browser

## Project Structure

- `index.html` - The main HTML file that serves as the entry point
- `styles.css` - Contains all the styling for the application
- `app.js` - Contains the JavaScript code that powers the application

## How to Use

1. Select a date using the date picker
2. Enter your calories, protein, and exercise data for that day
3. Click "Save Entry" to store the data
4. View your history and statistics below
5. To edit an entry, simply select the date and enter new values
6. To delete an entry, click the "Delete" button next to it in the history table

## Data Storage

This application uses your browser's localStorage to save your health data. This means:
- Your data stays on your computer
- Your data will persist between sessions (when you close and reopen the browser)
- Clearing your browser data will erase your health tracker data

## Browser Compatibility

This application should work in all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT 