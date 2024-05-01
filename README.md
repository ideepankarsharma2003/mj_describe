# Minimal Node.js Server with Image Description Endpoint

This project demonstrates how to create a minimal server in Node.js using Express and the `midjourney` library to describe images via a POST request.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (Node Package Manager)
- Postman (optional, for testing API endpoints)

## Setup

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/ideepankarsharma2003/mj_describe.git
   ```

2. Navigate to the project directory:
   ```
   cd minimal-nodejs-server
   ```

3. Install project dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the project root and add your environment variables:
   ```
   SERVER_ID=your_server_id
   CHANNEL_ID=your_channel_id
   SALAI_TOKEN=your_salai_token
   ```

## Usage

1. Start the Node.js server:
   ```
   npm start
   ```

2. Open Postman or any API testing tool. I have used [py_client Notebook](py_client)

3. Make a POST request to the `/describe-image` endpoint with a JSON object containing the image URL:
   ```json
   {
       "imageUrl": "https://pingenerator.com/static/media/5662a7dd70e5af9f5a4bfdc38052ff75.webp"
   }
   ```

4. Check the server console for the image description logged by the `midjourney` library.



