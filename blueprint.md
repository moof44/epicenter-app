# Epicenter App Blueprint

## Overview

Epicenter is a modern, reactive gym management application built with the latest features of Angular. It provides a seamless interface for managing members, tracking attendance, and overseeing facility resources like lockers. The application is designed to be intuitive, performant, and visually appealing, leveraging signals for state management, standalone components for a modular architecture, and a clean, mobile-first design.

## Project Outline

### Core Features

- **Dashboard**: A central hub that provides an at-a-glance view of key metrics:
  - Total number of active members.
  - Number of members currently checked in.
  - Available locker count.
  - Quick access to recent check-ins.
- **Member Management**: A complete CRUD (Create, Read, Update, Delete) interface for gym members.
  - View a paginated and searchable list of all members.
  - Add new members with details such as name, contact information, address, fitness goal, gender, birthday, subscription type, and expiration date.
  - Update existing member information.
  - Delete members with a confirmation step.
  - View detailed information for a specific member.
- **Check-In System**: A streamlined process for members to check in and out of the facility.
  - Members can select their name and an available locker upon check-in.
  - The system validates that a locker is available before allowing a check-in.
  - The dashboard and locker availability are updated in real-time.

### Architecture & Design

- **Framework**: Angular (v20+)
- **Architecture**: 100% Standalone Components, Pipes, and Directives. No NgModules.
- **State Management**: Utilizes Angular Signals for reactive and efficient state management. Singleton services (`providedIn: 'root'`) hold the application's state, and components subscribe to this state using signals.
- **Styling**: Modern CSS with a focus on a clean, responsive, and mobile-first design. It features a dark theme, well-defined component styles, and a consistent visual language.
- **UI Components**: Primarily uses browser-native modern CSS for a unique look and feel. It incorporates `@angular/material` for specific, feature-rich components like `MatSnackBar` to handle application-wide notifications.
- **Control Flow**: Uses Angular's new built-in control flow (`@if`, `@for`, `@switch`) for more intuitive and performant templates.
- **Data**: Mock data is used for all features, simulating a real backend.

### Visual Design

- **Color Palette**:
  - `primary-background`: `#1a1a1a` (Dark, almost black)
  - `secondary-background`: `#242424` (Slightly lighter dark gray)
  - `ui-background`: `#3a3a3a` (Medium dark gray for UI elements)
  - `primary-accent`: `#ffd700` (Vibrant gold/yellow)
  - `primary-text`: `#fff` (White)
- **Typography**:
  - `font-family`: `'Roboto', sans-serif` for body, `'Bebas Neue', sans-serif` for headings.
- **Overall Feel**: The application has a modern, premium, and energetic feel. The dark theme with the gold accent color creates a high-contrast and visually appealing experience. The use of `Bebas Neue` for headings adds a strong, athletic feel.

### Feature History

- **Add Birthday to Member**: Integrated a `birthday` field into the member model, add/update forms, and mock data.
- **Loading Indicator**: Implemented a loading indicator for member add/update operations.
- **Refactor Messaging to `MatSnackBar`**: Replaced the initial custom-built messaging component with Angular Material's `MatSnackBar`.
    - Installed `@angular/material` and configured it in the application's `app.config.ts`.
    - Replaced the custom `MessageStateService` with the `MatSnackBar` service in `MemberStateService` and `CheckInComponent`.
    - Removed the custom `MessageComponent` and its associated service to streamline the codebase and rely on a robust, third-party library for notifications.
- **Progressive Web App (PWA)**: Enabled PWA support to allow the application to be installed on devices and work offline.
    - Added `@angular/pwa` to the project.
    - Configured the web app manifest (`manifest.webmanifest`) and service worker (`ngsw-config.json`).
    - Added a `theme-color` meta tag to `index.html`.
- **Add Optional Subscription and Expiration Fields**:
    - Updated the `Member` model to include optional `subscription` (string) and `expiration` (Date) fields.
    - Modified the "add member" and "update member" forms to include inputs for these new fields.
    - Updated the member list to display the `subscription` and `expiration` date.
    - Enhanced the member list search to allow filtering by subscription status.
- **Fix Date Handling for Firestore Timestamps**:
    - Resolved a runtime error (`NG02100: InvalidPipeArgument`) that occurred because the `DatePipe` could not handle Firestore's `Timestamp` object.
    - Implemented a data transformation in the `MemberService` to convert `Timestamp` objects from Firestore into standard JavaScript `Date` objects. This ensures that dates are correctly displayed throughout the application.
- **Resolve Firestore Field Update Bug**:
    - Fixed an issue where clearing an optional date field (like `expiration`) during an update would cause the operation to fail.
    - The `Member` model was updated to explicitly allow `null` values for optional fields.
    - The `member-add` and `member-update` components were modified to use `null` instead of `undefined` for empty optional fields. This aligns with Firestore's requirement for clearing field values, ensuring that updates and additions work correctly.
- **Fix Full-Screen Loading Indicator**:
    - Corrected a styling bug in the shared `LoadingComponent` where the loading overlay was not covering the entire screen.
    - The `position` property of the loading overlay was changed from `absolute` to `fixed`, ensuring it covers the full viewport.
    - Removed an unnecessary `border-radius` from the overlay to prevent it from having rounded corners.
- **Implement Member Deletion with Confirmation**:
    - Created a reusable, standalone `ConfirmationDialogComponent` in the `shared` module to handle confirmation prompts.
    - Integrated the confirmation dialog into the `MemberListComponent` to prompt the user before deleting a member.
    - Added a "Delete" button to each row in the member list table.
    - Implemented the `deleteMember` method in the `MemberStateService` and `MemberService` to handle the deletion logic in the application state and Firestore database.
- **Fix Check-In without Locker Bug**:
    - Resolved a critical bug where checking in a member without assigning a locker would cause a Firestore error.
    - The `checkIn` method in the `CheckInComponent` was updated to conditionally add the `lockerNumber` to the attendance record only if a locker is selected. This prevents `undefined` values from being sent to Firestore.