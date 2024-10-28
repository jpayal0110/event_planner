# **Event Planner Application**

This is a simple event planner web application that allows users to manage events, including viewing, adding, editing, and marking events as "upcoming" or "completed." The application is built using **HTML**, **SCSS**, and **JavaScript** without the use of external libraries.

## **Folder Structure**
```
.
├── dist/
│   └── main.css          # Compiled CSS file
├── script.js         # Main JavaScript file
├── scss/
│   ├── main.scss         # Main SCSS file
│   ├── _reset.scss       # Reset styles
│   ├── _typography.scss  # Typography and text styling
│   ├── _header.scss      # Navbar and header styles
│   └── _events.scss      # Event cards and related styles
├── main.html             # Main HTML file
└── README.md             # This README file

```

## **Application Structure**
- `index.html`: The main HTML file containing the structure of the event planner.
- `styles.scss`: The SCSS file that contains the styles for the application.
- `script.js`: The JavaScript file that handles event fetching, UI updates, and user interactions.
- `events.json`: A sample JSON file containing mock event data.

## **Technologies Used**
- **HTML5**: For the structure of the web application.
- **SCSS**: For styling the application, including state-based UI changes.
- **JavaScript**: For handling user interactions, state management, and event handling.

## **Features**
1. **View Events:** Users can view a list of events fetched from a JSON file. Each event is displayed with its name and a truncated description.
2. **Event Expansion:** Users can click on an event to see the full details, including the description, event date, location, and creation date.
3. **Mark as Upcoming/Completed:** Each event can be marked as "upcoming" or "completed" using a checkbox. The event's state is visually distinguished.
4. **Edit Events:** Users can edit event details such as name, event date, location, and description.
5. **Add New Events:** Users can add new events through a form. The event creation date is automatically set to the date and time of event creation.
6. **Responsive Design:** The UI adapts to different screen sizes.

## **Features in Detail**
- **Fetching Events**: Events are fetched from a static `events.json` file using an `XMLHttpRequest`. The events are displayed in a list view with truncated descriptions.
- **Expanding Events**: Clicking on an event displays its full details.
- **Marking Events**: Each event has a checkbox to mark it as "upcoming" or "completed," and events are styled differently based on their status.
- **Event Editing**: Users can edit existing events by updating the name, date of the event, location, and description.
- **Adding Events**: Users can add new events through a form. The creation date is automatically set to the current date and time.
