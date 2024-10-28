let events = [];

// Function to display the events
function displayEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';  // Clear previous content

    // Sort events: upcoming first, then completed
    events.sort((a, b) => {
        if (a.state === 'upcoming' && b.state === 'completed') return -1;
        if (a.state === 'completed' && b.state === 'upcoming') return 1;
        return 0; // Keep the same order if both are the same state
    });

    events.forEach((event, index) => {
        const truncatedDesc = event.description.split(' ').slice(0, 10).join(' ') + '...';
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card', event.state);
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>${truncatedDesc}</p>
            <button onclick="expandEvent(${index}, this)">Expand</button>
            <button onclick="editEvent(${index})" class="edit-btn">Edit</button><br>
            <label>
                <input type="checkbox" value="upcoming" ${event.state === 'upcoming' ? 'checked' : ''} onchange="toggleEventState(${index}, 'upcoming')">
                Mark as Upcoming
            </label><br>
            <label>
                <input type="checkbox" value="completed" ${event.state === 'completed' ? 'checked' : ''} onchange="toggleEventState(${index}, 'completed')">
                Mark as Completed
            </label>
            <p><strong>Created At:</strong> ${event.creationDate}</p>
            <div class="expanded-details hidden"></div>
        `;
        eventList.appendChild(eventCard);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const eventFormModal = document.getElementById('event-form-modal');
    const eventForm = document.getElementById('eventForm');

    // Function to fetch events from JSON
    function fetchEvents() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "events.json", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                events = JSON.parse(xhr.responseText); // Update global events array
                displayEvents(); // Display events
            }
        };
        xhr.send();
    }

    // Add event button handler
    const addEventBtn = document.getElementById('add-event');
    addEventBtn.addEventListener('click', function () {
        eventFormModal.classList.remove('hidden'); // Show the form modal
        eventForm.reset(); // Reset the form fields
        // Change button behavior for adding a new event
        document.getElementById('update-event-btn').classList.add('hidden'); // Hide update button
        document.getElementById('save-event-btn').classList.remove('hidden'); // Show save button
    });

    // Call `addNewEvent` when "Save Event" button is clicked
    document.getElementById('save-event-btn').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission
        addNewEvent(); // Call the function to add the event
    });

    fetchEvents(); // Fetch initial events when page loads
});

// Function to expand and show event details within the card
function expandEvent(index, btn) {
    const event = events[index]; // Use global events array
    const eventCard = btn.parentElement;
    const expandedDetails = eventCard.querySelector('.expanded-details');

    if (expandedDetails.classList.contains('hidden')) {
        expandedDetails.classList.remove('hidden');
        expandedDetails.innerHTML = `
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
        `;
        btn.textContent = "Collapse";
    } else {
        expandedDetails.classList.add('hidden');
        expandedDetails.innerHTML = '';
        btn.textContent = "Expand";
    }
}

// Function to edit an event
function editEvent(index) {
    const event = events[index];

    // Pre-fill form with event data
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventDescription').value = event.description;

    // Show the modal
    document.getElementById('event-form-modal').classList.remove('hidden');

    // Update the save button to handle the update
    document.getElementById('save-event-btn').classList.add('hidden'); // Hide save button
    const updateBtn = document.getElementById('update-event-btn');
    updateBtn.classList.remove('hidden'); // Show update button

    updateBtn.onclick = function (e) {
        e.preventDefault(); // Prevent traditional form submission
        updateEvent(index); // Call the update function
    };
}

// Function to add a new event
function addNewEvent() {
    const newEvent = {
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value,
        creationDate: new Date().toLocaleString(), // Capture creation date
        state: 'upcoming' // Default state for new events
    };
    events.push(newEvent); // Add new event to events array
    displayEvents(); // Refresh the event display

    // Clear form and hide modal
    document.getElementById('eventForm').reset();
    document.getElementById('event-form-modal').classList.add('hidden');
}

// Function to update an existing event
function updateEvent(index) {
    events[index].name = document.getElementById('eventName').value;
    events[index].date = document.getElementById('eventDate').value;
    events[index].location = document.getElementById('eventLocation').value;
    events[index].description = document.getElementById('eventDescription').value;

    // Refresh display
    displayEvents();

    // Clear form and hide modal
    document.getElementById('eventForm').reset();
    document.getElementById('event-form-modal').classList.add('hidden');
}

// Function to toggle event state
function toggleEventState(index, state) {
    // Update the event state based on the checkbox clicked
    if (state === 'completed') {
        events[index].state = 'completed';
    } else {
        events[index].state = 'upcoming';
    }

    // Refresh the display to reflect changes
    displayEvents();
}

// Get modal and close button elements
const modal = document.getElementById('event-form-modal');
const closeBtn = document.querySelector('.close-btn');

// Event listener to close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Optionally, you can add an event listener to close the modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.add('hidden');
  }
});
