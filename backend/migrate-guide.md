# Data Migration Guide

After cloning the repository, you can follow these steps to run the data migration script:

## Non-Docker Environment

### 1. Install Dependencies

In your project directory, run the `npm install` command to install all necessary dependencies.

```bash
npm install
```

### 2. Run the Data Migration Script

In your project directory, run the `node seed.js` command to execute the data migration script.

```bash
node seed.js
```

This will connect to your MongoDB database, delete all existing users, articles, and comments, and then create new users, articles, and comments using the data defined in your `./seed/users.js`, `./seed/articles.js`, and `./seed/comments.js` files.

## Docker Environment

### 1. Build Docker Images

In your project directory, run the `docker-compose build` command to build your Docker images.

```bash
docker-compose build
```

### 2. Run Docker Containers

In your project directory, run the `docker-compose up` command to start your Docker containers.

```bash
docker-compose up
```

### 3. Run the Data Migration Script Inside Docker Container

First, find the container ID of your backend service using the `docker ps` command. Then, use the `docker exec` command to run the data migration script inside your Docker container.

```bash
docker ps
docker exec -it <container-id> node seed.js
```

Replace `<container-id>` with the actual ID of your backend service container.

In both environments, if the data migration is successful, you should see the "Data seeding successful!" output, and the script should exit automatically. If an error occurs during data migration, the script will output the error message and exit with status code 1.