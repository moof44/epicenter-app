
# Epicenter: Community Event & Check-in Hub

## Overview

Epicenter is a dynamic, real-time dashboard for community events and member check-ins. It provides a visually engaging way to track event trends, monitor attendance, and celebrate member engagement. The application is built with the latest Angular features, prioritizing a reactive architecture, a beautiful user interface, and a seamless user experience.

## Style, Design, and Features

*   **Modern UI**: A dark theme with gold accents, using the 'Bebas Neue' and 'Roboto' fonts for a clean, modern look.
*   **Reactive State Management**: Utilizes Angular signals for all state management, ensuring a highly responsive and predictable application.
*   **Standalone Components**: The entire application is built with standalone components, simplifying the architecture and improving maintainability.
*   **Dashboard**: The main view of the application, displaying key metrics such as total members, checked-in members, and available lockers.
*   **Member Management**: A dedicated page for viewing and managing members, with the ability to add and update members, including their gender.
*   **Locker Management**: The application now supports gender-specific locker sections.
*   **Check-in/Check-out**: A feature for checking members in and out.
*   **Attendance Tracking**: A view for monitoring attendance records, including check-in and check-out times.

## Deployment

**IMPORTANT:** This application is deployed to **Firebase App Hosting**. Deployments are handled **automatically** when new commits are pushed to the connected GitHub repository. Do not attempt to deploy manually from the IDE.

## Completed Work: Phase 5 - Gender-Specific Locker Assignment & Bug Fixes

*   **Objective**: Enhance the check-in process to allow for assigning available lockers to members based on their gender and resolve all outstanding build errors.
*   **Completed Steps**:
    1.  **Updated Locker State Service**: Added a method to `LockerStateService` to get available lockers by gender.
    2.  **Updated Check-in Component**: Modified the `check-in` component to display available lockers filtered by the member's gender.
    3.  **Resolved Build Errors**: Fixed multiple compilation errors by:
        *   Correcting the import path for `Gender` in `locker-state.service.ts`.
        *   Consolidating duplicate `locker-state.service.ts` files.
        *   Updating import paths for `LockerStateService` in the `check-in` and `dashboard` components.
        *   Making the `lockers` signal in `LockerStateService` public.
    4.  **Build Verified**: The application now builds successfully with `ng build`.
    5.  **IDE Configuration**: Configured the development environment to properly integrate with the Firebase App Hosting backend.

