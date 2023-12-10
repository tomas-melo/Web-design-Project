// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    addEventsToCalendar();
});

// Function to add an event to local storage
function addEventToStorage(title, date, image, url) {
    console.log('Adding events to storage');
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    var eventExists = events.some(event => event.title === title && event.date === date && event.image == image && event.url == url);
    console.log("Existing events:", events);
    if (!eventExists) {
        console.log("Adding new event");
        events.push({ title: title, date: date, image: image, url:url});
        localStorage.setItem('events', JSON.stringify(events));
    }
}

// Function to generate the calendar
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const month = 11; // December (January is 0)
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let table = `<table><tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr><tr>`;

    for (let i = 1; i <= daysInMonth; i++) {
        let day = new Date(year, month, i).getDay();
        day = day === 0 ? 7 : day; // Adjust Sunday from 0 to 7

        if (i === 1 && day !== 1) {
            table += `<td colspan="${day - 1}"></td>`;
        }

        table += `<td data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}">${i}</td>`;

        if (day === 7) {
            table += `</tr><tr>`;
        }
    }

    table += `</tr></table>`;
    calendar.innerHTML = table;
}

// Function to add events to the calendar
function addEventsToCalendar() {
    const events = JSON.parse(localStorage.getItem('events') || '[]');

    events.forEach(function(event) {
        const calendarCell = document.querySelector(`#calendar td[data-date="${event.date}"]`);
        if (calendarCell) {
            const eventContent = `
                <a href="${event.url}" class="calendar-event-link" target="_blank">
                    <div class="calendar-event">
                        <img src="${event.image}" alt="${event.title}" style="width:100%; height:auto;">
                        <span>${event.title}</span>
                    </div>
                </a>`;
            calendarCell.innerHTML = eventContent;
        }
    });
}