# Project Name

This project is a Vue.js application that displays real-time weather data for multiple cities.

## API Key

To run the project, you'll need to set up your own API key:

1. Create a `.env` file in the project folder (same level as the Vue.js application)

2. Inside the `.env` file, add your API key like this:
   ```
   VITE_APP_API_KEY= ############################
   ```

3. Replace `############################` with your own API key.

## Running with Docker

You can run this project using Docker. Follow these steps:

1. Build the Docker image (replace `image-1` with your desired image name):
   ```
   docker build -t image-1 .
   ```

2. Run the Docker container (replace `vueapp-1` with your desired container name):
   ```
   docker run -it -p 8080:8080 --rm --name vueapp-1 image-1
   ```

3. Open your web browser and visit [http://localhost:8080](http://localhost:8080) to access the project.

## Project Setup

To set up the project locally, follow these steps:

1. Install project dependencies:
   ```
   npm install
   ```

2. Compile and run the project in development mode with hot-reloading:
   ```
   npm run dev
   ```

3. To compile and minify the project for production:
   ```
   npm run build
   ```
