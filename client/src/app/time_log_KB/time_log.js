function toggleSidebar(){
    document.getElementById("sideBar_l").classList.toggle('open');
    const sidebar = document.getElementById("sideBar_l");
    const body = document.body;
    
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        body.classList.remove('sidebar-open');
    } else {
        sidebar.style.width = "250px";
        body.classList.add('sidebar-open');
    }
}

function getWeekDates(date = new Date()) {
    const currentDay = date.getDay();
    
    // Find Sunday (start of week)
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - currentDay);
    
    // Find Saturday (end of week)
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    
    return {
        start: sunday,
        end: saturday
    };
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
    });
}

function weekEdit() {
    const weekDisplay = document.getElementById('weekDisplay');
    const lButton = document.getElementById('leftButton');
    const rButton = document.getElementById('rightButton');
    const dButton = document.getElementById('downButton');
    const calendarDropdown = document.getElementById('calendarDropdown');

    // Get current week dates
    const weekDates = getWeekDates();

    // Set up button click handlers
    lButton.onclick = () => navigateWeek(-1);
    rButton.onclick = () => navigateWeek(1);
    dButton.onclick = toggleCalendar;

    // Set initial week display
    weekDisplay.textContent = `Week of ${formatDate(weekDates.start)} - ${formatDate(weekDates.end)}`;

    // Initial Calendar render
    renderCalendar(calendarDropdown);
}



function navigateWeek(direction) {
    const weekDisplay = document.getElementById('weekDisplay');
    const currentStart = getWeekDates().start;
    currentStart.setDate(currentStart.getDate() + (direction * 7));
    
    const newEnd = new Date(currentStart);
    newEnd.setDate(currentStart.getDate() + 6);
    
    weekDisplay.textContent = `Week of ${formatDate(currentStart)} - ${formatDate(newEnd)}`;
    updateTableDates(currentStart);
}

function toggleCalendar() {
    const dropdown = document.getElementById('calendar-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function renderCalendar(container) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const calendar = document.createElement('div');
    calendar.className = 'calendar';
    
    // Month header
    const monthHeader = document.createElement('h3');
    monthHeader.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    calendar.appendChild(monthHeader);

    // Weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayHeader = document.createElement('div');
    weekdayHeader.className = 'weekday-header';
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        weekdayHeader.appendChild(dayElement);
    });
    calendar.appendChild(weekdayHeader);

    // Date grid
    const dateGrid = document.createElement('div');
    dateGrid.className = 'date-grid';

    // Get the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Get the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        dateGrid.appendChild(emptyDay);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.textContent = day;
        dateElement.className = 'date';
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dateElement.classList.add('today');
        }
        dateElement.addEventListener('click', () => selectDate(new Date(currentYear, currentMonth, day)));
        dateGrid.appendChild(dateElement);
    }

    calendar.appendChild(dateGrid);
    
    container.innerHTML = '';
    container.appendChild(calendar);
}

function selectDate(date) {
    // Update the week display and table based on the selected date
    const weekDates = getWeekDates(date);
    document.getElementById('weekDisplay').textContent = `Week of ${formatDate(weekDates.start)} - ${formatDate(weekDates.end)}`;
    updateTableDates(weekDates.start);
    toggleCalendar(); // Hide the calendar after selection
}

// Update table dates when week changes
function updateTableDates(startDate) {
    // Create array of dates for the week
    const dates = [];
    for(let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
    }

    // Get all day cells (first column of each row)
    const rows = document.querySelectorAll('table tr');
    
    // Skip header row (index 0), update the rest
    for(let i = 1; i < rows.length; i++) {
        const dayCell = rows[i].cells[0];
        const date = dates[i-1];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        dayCell.textContent = dayName;
    }
}

function createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Header row
    const headerRow = document.createElement('tr');
    const headers = ['Days', 'Daily Total', 'Pay Code', 'Hours', 'Comments'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Define days of the week
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    // Create initial data structure
    const rowData = days.map(day => ({
        day: day,
        dailyTotal: '0.00',
        payCode: 'Regular',
        hours: '0.00',
        comments: ''
    }));

    // Add rows with specific days
    rowData.forEach(data => {
        const row = document.createElement('tr');
        
        // Create cells with specific data
        const dayCell = document.createElement('td');
        dayCell.textContent = data.day;
        
        const totalCell = document.createElement('td');
        totalCell.textContent = data.dailyTotal;
        
        const payCodeCell = document.createElement('td');
        payCodeCell.textContent = data.payCode;
        
        const hoursCell = document.createElement('td');
        hoursCell.textContent = data.hours;
        
        const commentsCell = document.createElement('td');
        commentsCell.textContent = data.comments;
        
        // Append all cells to the row
        row.appendChild(dayCell);
        row.appendChild(totalCell);
        row.appendChild(payCodeCell);
        row.appendChild(hoursCell);
        row.appendChild(commentsCell);
        
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Get your div and append the table to it
    const interBox = document.getElementById('inter_box');
    interBox.appendChild(table);
}

// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    weekEdit();
    createTable();
});
