# EmpManprod

EmpManprod is a comprehensive Employee Management System designed to streamline HR processes and improve workforce management within organizations. It provides tools for tracking employee information, managing leave requests, generating reports, and more.EmpManprod follows modern DevOps practices to streamline development, testing, and deployment processes. The project uses tools like Jenkins for continuous integration and Ansible for configuration management and deployment automation. 

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture Diagram](#architecture-diagram)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

EmpManprod simplifies employee management tasks, providing an  easy-to-use interface for HR professionals to manage employee records, leave requests, and reporting. We will be using this app to practice our DevOps approach using different technologies in a cloud Infrastructure . 

## Features
1. Project features:

- Ability to integrate and deploy code with ease using robust CI/CD tools
- Monitoring resources with the suitable technologies
- security , routing and load balencing 


2. website features:

- Employee record management
- Leave request and approval system
- Reporting and analytics dashboard
- User authentication and role-based access control

### Architecture Diagram
This is the simplified and very Basic architecture of the application:

![Architecture Diagram](./diagram.png)


## Getting Started

Follow these steps to set up and run EmpManprod locally.

### Prerequisites
- Jenkins
- Node.js
- Docker
- MySQL
- ansible 
- AWS account

### Installation

1. Clone the repository:

git clone git@github.com:CooBRA01/Empman-prod.git

cd EmpManprod

2. Run the compose file:

docker-compose up -f docker-compose-staging


### Usage

Access the web app in your browser: [http://localhost](http://localhost)

Log in using your admin credentials.

### Deployment

To deploy EmpManprod to a production environment:

1. Set up a production server with Docker, Nginx, and MySQL.

2. Configure environment variables for production settings.

3. Build and deploy the Docker containers:

docker stack deploy -c docker-compose-prod.yml mystack


## Technologies Used
- Jenkins 
- Ansible
- Node.js
- React.js
- Express.js
- MySQL
- Docker
- Nginx

## Contributing

We welcome contributions from the community. To contribute, email me please  bassembkhedher@gmail.com

## License

*****

## Contact

For questions or inquiries, please contact us at bassembkhedher@gmail.com.
 You can also reach out to the project maintainer at bassembkhedher@gmail.com.

