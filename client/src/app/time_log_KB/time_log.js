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

    //header row
    const headerRow = document.createElement('tr');
    const headers = ['Days', 'Daily Total', 'Pay Code', 'Hours', 'Comments']

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Add rows
    for(let i = 0; i < 12; i++) {
        const row = document.createElement('tr');
        for(let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            cell.textContent = `Row ${i+1}, Cell ${j+1}`;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    // Get your div and append the table to it
    const interBox = document.getElementById('inter_box');
    interBox.appendChild(table);
}


// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', createTable);