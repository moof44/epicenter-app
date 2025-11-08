## Epicenter Fitness Blueprint

### Overview

Epicenter Fitness is a modern, interactive gym management application designed to streamline daily operations. It leverages the latest Angular features to provide a visually appealing and highly responsive user experience. The application is built with a focus on performance, maintainability, and a clean, intuitive design.

### Implemented Features & Design

This section documents the current state of the application, including all major features and design decisions.

#### Core Architecture

*   **Standalone Components:** The entire application is built using Angular's standalone components, directives, and pipes, completely eliminating the need for `NgModules`.
*   **OnPush Change Detection:** All components use `ChangeDetectionStrategy.OnPush` to optimize performance and minimize change detection cycles.
*   **Signal-based State Management:** Component state is managed using Angular Signals, providing a reactive and efficient way to handle data.
*   **Modern CSS:** The application is styled using modern, browser-native CSS for a clean and maintainable stylesheet.
*   **External Templates & Styles:** For larger components, the template and styles are separated into their own dedicated files to improve organization and readability.
*   **Real-time Data & Firestore Integration:** The application uses `@angular/fire` to connect to a Firestore database for real-time data streaming.
    *   **Timestamp to Date Conversion:** A critical architectural decision is the conversion of Firestore `Timestamp` objects to JavaScript `Date` objects. This conversion is handled within the data services (e.g., `AttendanceService`).
    *   **Problem:** Firestore returns date fields as `Timestamp` objects, which are incompatible with Angular's `DatePipe` and can lead to runtime errors (`NG02100: InvalidPipeArgument`).
    *   **Solution:** The data services use an RxJS `map` operator to transform the `Timestamp` objects into `Date` objects immediately after the data is retrieved from Firestore. This ensures that the rest of the application, including all components and pipes, works with standard JavaScript `Date` objects, promoting consistency and preventing bugs.

#### Check-in Page

*   **Two-Column Layout:** The check-in page is divided into two distinct columns to provide a clear and organized user interface.
    *   **Left Column (Check-in):** This column contains the member search and check-in functionality. The search results are filtered to show only members who are not currently checked in, preventing duplicate entries.
    *   **Right Column (Currently Checked-in):** This column displays a real-time list of all members who are currently checked into the facility.
*   **Direct Check-out:** Each member in the "Currently Checked-in" list has a "Check-out" button, allowing for a quick and efficient check-out process without needing to search for the member.
*   **Visual Design:** The page follows the application's dark, modern theme, with a black and gold color scheme. It features a responsive layout that adapts to different screen sizes.

#### Attendance Dashboard

*   **Purpose:** Provides a real-time overview of the gym's daily attendance, separated into two clear sections.
*   **Visual Design:** The dashboard adheres to the project's modern, dark, and energetic theme. It uses the "Bebas Neue" font for titles and a dark color palette with yellow accents for a visually striking and easy-to-read interface.
*   **Component Structure:** The template and styles for the dashboard are maintained in separate `html` and `scss` files, promoting a clean and organized component structure.
*   **"Checked In" Section:** This card displays a list of all members who are currently inside the facility. The logic for this is based on the absence of a `checkOutTime` in the member's attendance record. It also displays the assigned locker number, if available.
*   **"Today's History" Section:** This card shows a list of members who have already checked out for the day. This is determined by the presence of a `checkOutTime` in their attendance record. The display includes both their check-in and check-out times.
