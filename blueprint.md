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
  - Add new members with details such as name, contact information, address, fitness goal, gender and birthday.
  - Update existing member information.
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

### Current Task: Add Birthday to Member

**Objective**: Add a `birthday` field to the member model and integrate it into the user interface.

**Steps Completed**:

1.  **Model Update**: Added an optional `birthday: Date` field to the `Member` interface in `src/app/core/models/models/member.model.ts`.
2.  **Mock Data Update**: Updated the member mock data in `src/app/core/mock/member.mock.ts` to include birthday information for existing members.
3.  **UI Enhancement (Add Member)**:
    - Added a `<input type="date">` to the `member-add.component.html` template.
    - Updated `member-add.component.ts` to include a `birthday` control in the form group and to pass the value when creating a new member.
4.  **UI Enhancement (Update Member)**:
    - Added a `<input type="date">` to the `member-update.component.html` template.
    - Updated `member-update.component.ts` to include the `birthday` control, pre-fill it with the member's existing birthday, and include it in the update payload.
5.  **Verification**: Ran `ng build` to ensure the application compiles successfully without any errors.