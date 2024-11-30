# 3D Shirt Designer WebApp Stack Tool 

---

Welcome to the 3D Shirt Designer WebApp repository! This application allows users to customize and design their own 3D shirts, change colors, upload logos or designs, and generate images using AI-powered tools.

  

## Features

- **3D Shirt Customization**: Users can interact with 3D models of shirts and customize various aspects such as color and design placement.
  
- **Logo and Design Upload**: Upload your own logos or designs to be applied to the shirts, either on specific areas or as an all-over print.

- **Position and Size Control**: 
  - Precise positioning controls (up/down/left/right) for logo and texture placement
  - Size adjustment controls to scale logos and designs
  - Real-time preview of position and size changes

- **AI Image Generation**: Utilizes the DALL-E AI model to generate images based on user inputs, offering creative and unique outputs.

- **Design Placement Options**:
  - Logo Mode: Place designs as logos on specific areas of the shirt
  - Full Texture Mode: Apply designs as all-over prints
  - Adjustable positioning and scaling for both modes

- **Preview and Cart Features**:
  - Real-time 3D preview of all customizations
  - Design state capture for checkout
  - Easy navigation between customization and checkout

- **Technologies Used**:
  - **Frontend**: React, Volt, HTML, Tailwind CSS
  - **Animation**: Framer Motion
  - **3D Design**: React Fiber
  - **State Management**: Valtio

## Installation and Setup

I'd be happy to guide you through the process of setting up and running the project locally. Here's a step-by-step guide:

1. First, make sure you have Node.js and npm (Node Package Manager) installed on your system.
2. Open a terminal and navigate to the project's root directory.
3. Set up the server:

cd server
npm install

This will install all the server-side dependencies.

4. Set up the client:

cd ../client
npm install

This will install all the client-side dependencies.

5. Create a .env file in the server directory and add any necessary environment variables. (You might need to check with the project maintainers for specific variables required.)

6. Start the server:

cd ../server
npm start

This will start the server using nodemon, which will automatically restart the server when changes are detected.

7. In a new terminal window, start the client:
cd client
npm run dev
This will start the Vite development server for the client-side application.

8. Open your web browser and navigate to http://localhost:5173 (or whichever port Vite assigns, which will be displayed in the terminal).


You should now see the 3D Shirt Designer WebApp running in your browser!

## Usage

- Navigate through the interface to customize shirts.
- Use the color picker to change shirt colors.
- Upload logos or designs to see them applied.
- Explore AI-generated images based on your inputs.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository and create your branch from `main`.
2. Make your changes and ensure the code lints without errors.
3. Test your changes thoroughly.
4. Create a pull request detailing the changes you made.

## License

This project is licensed under the [MIT License](link-to-license).
