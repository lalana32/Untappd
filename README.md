# Untappd

Untappd is an application for beer enthusiasts that allows users to browse, rate, and discover new beers.

## Technologies

- **Backend:** .NET
- **Frontend:** React, Redux
- **Database:** SQLite
  - **.NET:** Used for creating a robust and scalable backend API to manage data and business logic.
  - **React:** Utilized for building a dynamic and responsive user interface.
  - **Redux:** Employed for state management, ensuring a predictable state container for the application.
  - **SQLite:** Used for lightweight and easy-to-configure database management.

## Installation

### Backend

1. Navigate to the `API` directoy.
2. Run the backend with the following command:
   `dotnet watch run`

### Frontend

1. Navigate to the `front` directory.
2. Install the necessary dependencies with the following command:
   `npm install --legacy-peer-deps`
3. Start the frontend with the following command:
   `npm start`

## Usage

### Registration

User Registration: When you first run the application, you will need to register a few users to simulate different interactions.

### Features

Follow Users: Users can follow other users to keep track of their activities.
Notifications: Users receive notifications about the activities of the users they follow, including likes and comments on their posts.
Check In Beers: Users can check in new beers and share their experiences.
Rate Beers: Users can rate beers and provide feedback on their experiences.
View Statistics: Users can view statistics related to their beer check-ins, ratings, and user interactions.
Feed of Check-Ins: Users can view a feed of check-ins from the users they follow, including likes and comments.
Search Users: Users can search for other users within the application.
Like and Comment on Posts: Users can like and comment on check-ins shared by others to engage with their content.
