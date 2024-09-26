# Backend Project README

## Project Overview

This backend application is built with Nest.js and provides API endpoints for retrieving information about countries. It communicates with external APIs to gather data on available countries, detailed country information, border countries, population data over time, and country flags.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Get Available Countries](#get-available-countries)
  - [Get Country Info](#get-country-info)
- [Code Quality](#code-quality)
- [License](#license)

## Requirements

- Node.js (version 14 or higher)
- npm

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SoulOfDarknes/Country-Info-App.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd BE
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

1. Set up the environment variables:

   Create a `.env` file in the root of the backend directory with the following content:

    ```env
    PORT=3000
    ```

   > **Note**: Normally, the `.env` file is not added to the repository for security reasons. However, as per the project requirements, it is included. Ensure it does not contain any sensitive data.

2. Start the server:

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file (default is 3000).

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port number on which the server runs (default is 3000).

Ensure all environment variables are set in the `.env` file.

## API Endpoints

### Get Available Countries

- **Endpoint**:

    ```http
    GET /countries/available
    ```

- **Description**:

    Retrieves a list of available countries.

- **Response Example**:

    ```json
    [
      {
        "name": "Ukraine",
        "code": "UA"
      },
      {
        "name": "Poland",
        "code": "PL"
      }
      // ...
    ]
    ```

### Get Country Info

- **Endpoint**:

    ```http
    GET /countries/info/:code
    ```

    Where `:code` is the two-letter country code (e.g., UA for Ukraine).

- **Description**:

    Retrieves detailed information about a specific country, including:
    
    - Country Name
    - Border Countries: A list of countries that share a border with the selected country.
    - Population Data: Historical population data suitable for plotting on a chart.
    - Flag URL: A URL to the country's flag image.

- **Response Example**:

    ```json
    {
      "countryCode": "UA",
      "countryName": "Ukraine",
      "borderCountries": [
        "Belarus",
        "Hungary",
        "Moldova",
        "Poland",
        "Romania",
        "Russia",
        "Slovakia"
      ],
      "populationData": [
        {
          "year": "2020",
          "value": "44134693"
        }
        // ...
      ],
      "flagUrl": "https://restcountries.com/data/ukr.svg"
    }
    ```

## Code Quality

- **Linting and Formatting**:

    The project uses ESLint and Prettier to maintain code quality and consistency.

- **Scripts**:

    - **Linting**:

        ```bash
        npm run lint
        ```

    - **Formatting**:

        ```bash
        npm run format
        ```

    Ensure to run these scripts before committing any code to maintain code standards.

## License

This project is licensed under the MIT License.
