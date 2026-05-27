# Four Corners

A utility Adobe After Effects script designed to quickly and accurately identify the exact pixel coordinates of an object's bounding corners within a composition. 

This tool streamlines the pre-production workflow for technical artists, motion designers, and media servers, making pixel-accurate projection mapping and asset cropping a breeze.

## 🚀 Features

* **Precise Coordinate Extraction:** Instantly find the exact $X$ and $Y$ pixel locations for the top-left, top-right, bottom-left, and bottom-right corners of any selected layer or shape.
* **FFmpeg Ready:** Eliminates the guesswork when calculating crop boundaries (`crop=w:h:x:y`) for FFmpeg command-line processing.
* **Projection Mapping Friendly:** Makes prepping complex compositions for LED walls or projection surfaces incredibly fast and mathematically exact.

## 🛠️ Installation & Usage

1. **Download** the `.jsx` script file from this repository.
2. In After Effects, navigate to **File > Scripts > Run Script File...** and select `Four Corners.jsx`.
3. *(Optional)* Move the file to your After Effects installation folder under `Support Files/Scripts/ScriptUI Panels` to run it as a dockable panel.

## 📖 How It Works

Select the layer or shape you need coordinates for, run the script, and it will output the exact pixel data relative to your composition boundaries. 

> **Tip:** Use these coordinates directly to calculate precise bounding boxes for media servers or video encoding slices.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
