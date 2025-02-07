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
document.addEventListener('DOMContentLoaded', createTable);


// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', createTable);