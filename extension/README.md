# HS Code Lookup Browser Extension

A Chrome extension that allows users to quickly lookup HS codes and their descriptions without opening the full web application.

## Features

- 🔍 **Quick Search**: Enter any HS code and get instant results
- 📋 **Copy to Clipboard**: Copy HS code and description with one click
- 🚀 **Fast & Lightweight**: No need to open the full web app
- 🔗 **Easy Access**: Access from any webpage via the extension icon

## Installation

### Prerequisites
Make sure your HS Code Lookup server is running on `http://172.16.16.149:1000` (or update the Server URL in the extension if using a different address)

### Install the Extension

1. **Create Icons** (Required):
   - Open `icons/create_icons.html` in your browser
   - Right-click on each canvas and "Save image as":
     - Save 16x16 canvas as `icon16.png`
     - Save 32x32 canvas as `icon32.png` 
     - Save 48x48 canvas as `icon48.png`
     - Save 128x128 canvas as `icon128.png`
   - Place all PNG files in the `icons/` folder

2. **Load Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension` folder
   - The extension icon should appear in your toolbar

## Usage

### For Same Machine (Localhost)
1. **Click the extension icon** in your Chrome toolbar
2. **Enter an HS code** (e.g., `8471.30.90` or `84713090`)
3. **Click Search** or press Enter
4. **View the result** with the HS code and full description
5. **Copy to clipboard** using the Copy button if needed
6. **Open full web app** by clicking the link at the bottom

### For Different Machines (Network Setup)
The extension now defaults to `http://172.16.16.149:1000`. If your server is running on a different IP address:

1. **Find the server's IP address** from the server startup message
2. **Click the extension icon** in your Chrome toolbar
3. **Update Server URL field** to use your actual server IP (e.g., `http://192.168.x.x:1000`)
4. **Click "Test"** to verify connection - should show "✅ Connection successful!"
5. **Use normally** - enter HS codes and search

## Features

### Input Validation
- Accepts HS codes with or without dots
- Validates format (6-10 digits)
- Shows helpful error messages

### Smart Display
- Properly formatted HS codes
- Line breaks and bullet points preserved
- Responsive design that fits in popup

### Error Handling
- Connection errors (server not running)
- Invalid HS codes
- Network timeouts

## Troubleshooting

### "Cannot connect to server" error
- Make sure your Python backend server is running: `python server.py`
- Verify the server is accessible at `http://172.16.16.149:1000` (default) or your custom IP
- **For different machines**: Update the "Server URL" in the extension popup to use the correct network IP
- Click "Test" button to verify connection
- Check if your firewall is blocking the connection

### Extension not loading
- Make sure you've created all 4 icon files (see Installation step 1)
- Verify all files are in the correct locations
- Try reloading the extension in `chrome://extensions/`

### Search not working
- Verify the HS code format (numbers only, 6-10 digits)
- Check the browser console for error messages
- Make sure the backend API is responding at `/api/lookup/{code}`

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.js              # JavaScript functionality
├── icons/                # Extension icons
│   ├── create_icons.html # Icon generator
│   ├── icon16.png       # 16x16 icon
│   ├── icon32.png       # 32x32 icon
│   ├── icon48.png       # 48x48 icon
│   └── icon128.png      # 128x128 icon
└── README.md            # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `activeTab` for basic functionality
- **Host Permissions**: `http://localhost:1000/*` for API access
- **API Integration**: Connects to your existing Python FastAPI backend
- **Cross-Origin**: Configured to work with localhost development server

## Development

To modify the extension:

1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the reload button on your extension
4. Test the changes

## Compatibility

- **Chrome**: Version 88+ (Manifest V3 support)
- **Edge**: Version 88+ (Chromium-based)
- **Backend**: Requires your HS Code Lookup Python server running on localhost:1000
