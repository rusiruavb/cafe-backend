# Online Cafe Backend API

This is the backend application of the Cafe store app. I have add few steps to compile and run the application locally and using Docker.

## Technologies

- Node JS
- Express
- TypeScript
- MySQL
- Sequelize
- AWS RDS
- AWS S3

### Before start, please check the Node and NPM versions. I have added my versions below

- Node JS - 18.13.0
- NPM - 8.19.3

### Run the application locally

1. Clone the GitHub repository to your computer using [this](https://github.com/rusiruavb/cafe-backend.git) link
2. Once cloned, run the following command to install the dependencies

```
npm install
```

3. After all the dependencies are installed, run the following command to start the application on Dev mode

```
npm run start:dev
```

4. Finally, the application will run on port 8088. Access the application via [this](http://localhost:8088) link. If the port number is already used in your machine, change the port number to a different one.

### Run the application using Docker

1. Make sure Docker is installed to your computer
2. Clone the GitHub repository to your computer using [this](https://github.com/rusiruavb/cafe-backend.git) link
3. Run the following command to build the Docker image

```
docker build -t cafe-backend-app:v1.0.0 .
```

4. Once the Docker image is built, run the following command to start the aplication via Docker container

```
docker run --name cafe-backend -p 8088:8088 cafe-backend-app:v1.0.0
```

5. Finally, the application will run on port 3000. Access the application via [this](http://localhost:8088) link
