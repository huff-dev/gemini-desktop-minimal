<p align="center">
  <img src="assets/Google_Gemini_icon.svg" width="128" alt="Gemini Logo">
</p>

<h1 align="center">Gemini Desktop Minimal</h1>

<p align="center">
  A lightweight, clean & minimal desktop application for Google Gemini built with Electron.
</p>

<p align="center">
  You may encounter the error <code>"Something went wrong (13)"</code> when using the "Fast" model option, I don't know what causes it.
</p>

---

## Features

- **Minimal UI**: A clean, distraction-free interface focusing entirely on the Gemini experience.
- **Adaptive Theme**: The title bar automatically adapts its color to match the Gemini interface (Dark/Light mode).
- **Cross-Platform**: Available for Windows and Linux.

## Installation

### Windows
1. Download the `Gemini Setup.exe` from the [Releases](https://github.com/huff-dev/gemini-desktop-minimal/releases) page.
2. Run the installer to install the application.

### Linux
1. Download the `Gemini.AppImage` or `gemini_amd64.deb` from the [Releases](https://github.com/huff-dev/gemini-desktop-minimal/releases) page.
2. For AppImage:
   - Make it executable: `chmod +x Gemini.AppImage`
   - Run the file.
3. For DEB:
   - Install using: `sudo dpkg -i gemini_amd64.deb`

## Development

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/huff-dev/gemini-desktop-minimal.git
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
