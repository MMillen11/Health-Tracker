# How to Run the Health Tracker Application

Follow these steps to properly run the Health Tracker application:

## Quick Solution: Use the Simple Version

If you're experiencing issues with the main application, try using the simplified version:

1. Open the `simple.html` file in your browser
2. This version has all code in a single file and should work without any issues

## Method 1: Using a Local Web Server (Recommended)

The most reliable way to run web applications is using a local web server. Here are a few options:

### Option 1: Using Python's built-in HTTP server

1. Open a command prompt or terminal
2. Navigate to the folder containing the application files
3. Run one of these commands (depending on your Python version):
   - Python 3: `python -m http.server`
   - Python 2: `python -m SimpleHTTPServer`
4. Open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js and http-server

1. Install Node.js if you don't have it already
2. Install http-server globally: `npm install -g http-server`
3. Navigate to the folder containing the application files
4. Run: `http-server`
5. Open your browser and go to the URL shown in the terminal (usually `http://localhost:8080`)

### Option 3: Using Visual Studio Code Live Server extension

1. Open the project folder in Visual Studio Code
2. Install the "Live Server" extension
3. Right-click on `index.html` and select "Open with Live Server"

## Method 2: Opening the HTML File Directly

If you can't use a local server, you can try opening the HTML file directly:

1. Right-click on the `index.html` file
2. Select "Open with" and choose your preferred web browser
3. If the application doesn't load properly, try using the simple.html file instead

## Troubleshooting

### Common Errors

1. **"Cannot set properties of null (setting 'innerHTML')"**:
   - This error occurs when JavaScript tries to modify an element that doesn't exist
   - Solution: Use the `simple.html` file which has been designed to avoid this issue

2. **Blank page or only showing the loading message**:
   - This can happen due to JavaScript errors or browser security restrictions
   - Solution: Use a local web server (Method 1) or try the `simple.html` file

3. **JavaScript not running**:
   - Check if your browser has JavaScript enabled
   - Try using a different browser (Chrome is recommended)

### General Troubleshooting Steps

1. Open your browser's developer console (F12 or right-click > Inspect > Console)
2. Check for any error messages
3. Make sure all files (index.html, styles.css, and app.js) are in the same folder
4. Try using a different browser
5. Try using a local web server as described in Method 1

## Browser Compatibility

This application should work in all modern browsers:
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Security Notes

Modern browsers have security restrictions when opening local files. Using a local web server (Method 1) helps avoid these restrictions. 