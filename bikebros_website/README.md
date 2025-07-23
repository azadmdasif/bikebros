# BikeBros - Adventure Bike Rentals

Welcome to BikeBros, a modern, youth-oriented bike rental website designed for adventurers looking to explore mountains, beaches, and cities. This project features a dynamic, single-page application built with React, Vite, and TypeScript.

**Live Demo:** Your Render URL will work after applying the correct deployment settings.

## Features

- **Modern & Dynamic UI:** A sleek, responsive design with a dark theme and vibrant brand colors.
- **Interactive Sections:** Smooth scrolling navigation to different parts of the page: About, Our Bikes, Rates, Testimonials, and Contact.
- **Detailed Bike Fleet:** Bikes are organized into categories (Commuters, Sports, Scooters) with detailed cards.
- **Transparent Pricing:** Clear rate tables for different rental durations and a breakdown of additional charges.
- **Online Booking Form:** A multi-step form for users to select a bike, duration, pickup details, and enter their information.
- **Real-time Cost Calculation:** The booking form provides an instant summary of charges based on user selections.
- **Email Submission:** Booking requests are sent to the business via the Web3Forms API.
- **Legal Modals:** Key information like Privacy Policy and Terms & Conditions are available in clean pop-up modals.
- **WhatsApp Integration:** A floating button for easy communication.

## Tech Stack

- **Framework:** React & Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Email API:** [Web3Forms](https://web3forms.com/) for form submissions.
- **Deployment:** Render (as a Static Site)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/bikebros-rentals.git
    cd bikebros-rentals
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Configure Web3Forms API Key:**
    - Open the `src/constants.ts` file.
    - Replace the placeholder `WEB3FORMS_ACCESS_KEY` with your own key from [web3forms.com](https://web3forms.com/).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the URL provided in your terminal) to view the app in your browser.

## Deployment

This project is configured to be deployed as a **Static Site** on services like Render.

### Deploying to Render

1.  Push your code to your GitHub repository.
2.  Go to the Render Dashboard and create a **New Static Site**.
3.  Connect your GitHub repository.
4.  **Use the following settings during creation:**
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
5.  Click "Create Static Site". Render will automatically build and deploy your project.
6.  **Add a Rewrite Rule:** After the first deployment, go to the `Redirects/Rewrites` tab for your new site and add the following rule. This is essential for a single-page app to handle page refreshes correctly.
    - **Source:** `/*`
    - **Destination:** `/index.html`
    - **Action:** `Rewrite`
