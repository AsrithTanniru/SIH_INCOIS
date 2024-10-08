# ShoreAlert App

ShoreAlert is a mobile application that helps users identify the nearest beaches and provides real-time weather and oceanic conditions to determine if a beach is suitable for visiting. The app also sends safety alerts if the user is in a location with active warnings, aiding in making informed decisions to vacate risky areas.

Currently, the app uses a **local JSON dataset** for beach and weather parameters, but future versions plan to integrate real-time data from **INCOIS (Indian National Centre for Ocean Information Services)** or other weather APIs for more dynamic results.

Powered by **React Native**, ShoreAlert offers users a streamlined and intuitive interface for coastal tourism safety.

## Features

- **Nearby Beaches**: Get the nearest beaches based on your current location.
- **Weather Conditions**: Check beach-specific weather parameters stored in local JSON files to determine if it's safe to visit.
- **Beach Search**: Look up any specific beach and find out if it's safe or recommended for visiting based on the available data.
- **Safety Alerts**: Receive warnings for unsafe weather conditions or risks based on predefined parameters.
- **Location-Based Alerts**: Get safety warnings when you're near hazardous coastal locations based on the current JSON data.

## Technologies Used

- **React Native**: For building the mobile app across iOS and Android.
- **Expo**: For quick and easy app development.
- **Local JSON Data**: Stores beach details and weather parameters.
- **Future Integrations**: The app is designed to eventually integrate with APIs like **INCOIS** for real-time weather and ocean data.

## Getting Started

Follow these steps to get the app running locally on your device:

### Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- **Expo Go**: Install the [Expo Go](https://expo.dev/client) app from the Play Store or App Store to run the project on your mobile device.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AsrithTanniru/SIH_INCOIS.git



   
Install Dependencies

Use npx to install all necessary packages:
                 
    npx install


*Run the App in Development Mode*
  
Start the development server using Expo:
   
    npx expo start
   


