document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    addEventsToCalendar();
});

function addEventToStorage(title, date, image) {
    console.log('Ajout des événements au storage');
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    var eventExists = events.some(event => event.title === title && event.date === date && event.image == image);
    console.log("Événements existants:", events);
    if (!eventExists) {
        console.log("image");
        events.push({ title: title, date: date, image: image });
        localStorage.setItem('events', JSON.stringify(events));
    }
  }
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const month = 11; // Décembre (Janvier est 0)
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let table = `<table><tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thrusday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr><tr>`;

    for (let i = 1; i <= daysInMonth; i++) {
        let day = new Date(year, month, i).getDay();
        day = day === 0 ? 7 : day; // Ajuster le dimanche de 0 à 7

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

function addEventsToCalendar() {
    console.log('Ajout des événements au calendrier');
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    const calendarCells = document.querySelectorAll('#calendar td');
    calendarCells.forEach(cell => {
        const date = cell.getAttribute('data-date');
        if (date) {
            cell.innerHTML = `<div class="date">${cell.innerText}</div>`; // Assurez-vous de conserver la date dans la cellule
        }
    });
    events.forEach(function(event) {
        const calendarCell = document.querySelector(`#calendar td[data-date="${event.date}"]`);
        if (calendarCell) {
            const eventContent = `
                <div class="calendar-event">
                    <img src="${event.image}" alt="${event.title}" style="width:100%; height:auto;">
                    <span>${event.title}</span>
                </div>`;
            // Ajouter le nouveau contenu
            calendarCell.innerHTML = eventContent;
        }
    });
}