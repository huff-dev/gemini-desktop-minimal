<p align="center">
  <img src="assets/Google_Gemini_icon.svg" width="128" alt="Gemini Logo">
</p>

<h1 align="center">Gemini Desktop Minimal</h1>

<p align="center">
  A lightweight, minimal desktop application for Google Gemini.
</p>

---

## Features

- **Minimal UI**: A clean, distraction-free interface focusing entirely on the Gemini experience.
- **Adaptive Theme**: The title bar automatically adapts its color to match the Gemini interface (Dark/Light mode).
- **Navigation Controls**: Integrated back, forward, and refresh functionality.
- **Auto-Updates**: Automatically checks for new releases and updates in the background.
- **Cross-Platform**: Available for Windows and Linux.

## Installation

### Windows
1. Download the `Gemini Setup 1.0.0.exe` from the [Releases](https://github.com/curlcreep/gemini-desktop-minimal/releases) page.
2. Run the installer to install the application.

### Linux
1. Download the `Gemini-1.0.0.AppImage` or `gemini_1.0.0_amd64.deb` from the [Releases](https://github.com/curlcreep/gemini-desktop-minimal/releases) page.
2. For AppImage:
   - Make it executable: `chmod +x Gemini-1.0.0.AppImage`
   - Run the file.
3. For DEB:
   - Install using: `sudo dpkg -i gemini_1.0.0_amd64.deb`

## Development

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/curlcreep/gemini-desktop-minimal.git
   cd gemini-desktop-minimal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Keyboard Shortcuts

- **Refresh**: `Ctrl+R` or `F5`
- **Back**: `Alt+Left` (standard browser shortcut)
- **Forward**: `Alt+Right` (standard browser shortcut)

## License
ISC
