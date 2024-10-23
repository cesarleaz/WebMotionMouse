# 🖱️ Web Motion Mouse ✨

This project allows you to control your server's mouse via a mobile device using `DeviceMotion` and touch events through a web interface. It's designed to run on a local server, utilizing `socket.io` to transmit commands for moving and clicking the mouse on the host machine.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> \[!IMPORTANT]
>
> **Star Us**, You will receive all release notifications from GitHub without any delay \~ ⭐️

## 🚀 Features
- **Touch and Motion Control:** Control the mouse using touch gestures or device movement.
- **Left and Right Clicks:** Easily simulate mouse clicks through the web interface.
- **Dynamic QR Code:** A QR code is generated to easily connect your mobile device to the server.


## 🎥 Demo Video:

[Watch the demo](https://x.com/cesarleaz/status/1849195100292682013) of this project to see it in action.

## 🏃 How to Run

> [!IMPORTANT]
> 
> 🎯 Prerequisites:
> 
> - Node.js installed (^14)
> - `openssl` for generating SSL certificates (required for DeviceMotion API). If you do not have OpenSSL, you can use other tools to generate the necessary ssl files.
> - `xdotool` This project uses `xdotool` to simulate mouse events, which is only supported on Linux systems. For other operating systems, modifications will be necessary.

### 🚀 Quick Start
1. Clone the repository and navigate into the project folder.
   
   ```bash
   git clone https://github.com/cesarleaz/WebMotionMouse.git
   cd WebMotionMouse
   ```

3. Install dependencies:
   
   ```bash
   npm install
   ```

5. Generate SSL certificates to enable `DeviceMotion` API (required for mobile motion tracking):
   
   ```bash
   openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365
   ```

7. Start the server:
   
   ```bash
   node server.js
   ```

8. A QR code will be generated in the terminal. Scan the QR code with your mobile device to access the web interface.

### Access:
- Open your mobile browser and scan the QR code or manually on terminal.

> [!NOTE]
> 
> - The server runs on any available port (automatically assigned).
> - Make sure your device is connected to the same local network as the server.

> [!WARNING]
> 
> - **DeviceMotion API requires SSL:** For motion controls to work, make sure you're serving the app via HTTPS.
> - **Tested only on Linux systems:** This project uses `xdotool` to simulate mouse events, which is only supported on Linux systems. For other operating systems, modifications will be necessary.

### 📜 Command for SSL Generation:

```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365
```

## 💡 Suggestions for Improvements:

- **Add Mouse Scrolling:** Implement a feature to allow scrolling through the web interface.
- **Click & Drag:** Add support for click-and-drag operations on the mousepad.


## 🤝🏼 Contributions:

Feel free to improve this project by opening issues or submitting pull requests. Your contributions are welcome!

- **Report bugs:** Open an issue to help us track any bugs or potential improvements.
- **Suggest features:** Do you have ideas on how to improve the app? Let us know!
- **Submit Pull Requests:** Contribute to the project by submitting your code to help enhance its functionality.


## 📜 License:

This project is open source under the [MIT License](./LICENSE).
