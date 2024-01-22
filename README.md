# LegalTechTales Project README

## Overview

LegalTechTales is a full-stack web application designed for legal technology solutions. It features a Node.js backend, a React frontend, and a MongoDB database, all containerized using Docker.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Git (for cloning the repository)

### Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/lisiCAO/Legal-Tech-Tales]
   cd legaltechtale
   ```

2. **Start the Services**
   ```bash
   docker-compose up
   ```

   This command will build and start the backend, frontend, and database services as defined in the `docker-compose.yml` file.

### Initial Data Seeding

After the services are up and running:

1. Access the backend container's command line:
   ```bash
   docker exec -it [backend-container-id] /bin/bash
   ```

2. Run the data seeding script:
   ```bash
   node database/seed.js
   ```

   This will populate the database with initial data sets necessary for the application.

### Accessing the Application

- The **frontend** is accessible at `http://localhost:8080`.
- The **backend** API is accessible at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please read the contributing guidelines for details.

## License

This project is licensed under [MIT].

## Support

For support, contact [lisiCAO].

