// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded in app.js');
    
    try {
        // Remove loading message
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
        
        // Get the app container
        const appContainer = document.getElementById('app');
        console.log('App container:', appContainer);
        
        if (!appContainer) {
            console.error('App container not found!');
            document.body.innerHTML = `
                <div style="color: red; padding: 2rem; text-align: center;">
                    <h2>Error: App container not found</h2>
                    <p>The application could not find the element with id "app".</p>
                    <p>Please make sure the HTML file is properly structured.</p>
                </div>
            `;
            return;
        }
        
        // Create the health tracker application
        const healthTracker = createHealthTracker();
        console.log('Health tracker created');
        
        appContainer.appendChild(healthTracker);
        console.log('Health tracker appended to DOM');
    } catch (error) {
        console.error('Error initializing health tracker:', error);
        
        // Show error message to user
        const errorMessage = document.createElement('div');
        errorMessage.style.color = 'red';
        errorMessage.style.padding = '1rem';
        errorMessage.style.border = '1px solid red';
        errorMessage.style.borderRadius = '4px';
        errorMessage.style.margin = '1rem';
        
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Error Loading Application';
        
        const errorText = document.createElement('p');
        errorText.textContent = 'There was an error loading the health tracker application. Please try refreshing the page.';
        
        const errorDetails = document.createElement('p');
        errorDetails.textContent = 'Error details: ' + error.message;
        
        errorMessage.appendChild(errorTitle);
        errorMessage.appendChild(errorText);
        errorMessage.appendChild(errorDetails);
        
        // Try to find the app container or fall back to body
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = '';
            appContainer.appendChild(errorMessage);
        } else {
            // If app container doesn't exist, try to find another container
            const container = document.querySelector('.container') || document.querySelector('.app-container');
            if (container) {
                container.appendChild(errorMessage);
            } else {
                // Last resort: append to body
                document.body.appendChild(errorMessage);
            }
        }
    }
});

// Function to create the health tracker application
function createHealthTracker() {
    // Create the main container
    const container = document.createElement('div');
    container.className = 'health-tracker-container';
    
    // Create the date selector
    const dateContainer = document.createElement('div');
    dateContainer.className = 'date-container';
    
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Select Date: ';
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-selector';
    // Set default value to today
    const today = new Date();
    dateInput.value = formatDate(today);
    
    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);
    
    // Create the metrics input section
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'metrics-container';
    
    // Create calorie input
    const calorieSection = createMetricInput('calories', 'Calories (kcal)', 'number', '0');
    
    // Create protein input
    const proteinSection = createMetricInput('protein', 'Protein (g)', 'number', '0');
    
    // Create exercise input
    const exerciseSection = createMetricInput('exercise', 'Exercise (minutes)', 'number', '0');
    
    // Add button
    const addButton = document.createElement('button');
    addButton.textContent = 'Save Entry';
    addButton.className = 'save-button';
    
    // History section
    const historySection = document.createElement('div');
    historySection.className = 'history-section';
    
    const historyTitle = document.createElement('h3');
    historyTitle.textContent = 'History';
    
    const historyList = document.createElement('div');
    historyList.className = 'history-list';
    historyList.id = 'history-list';
    
    historySection.appendChild(historyTitle);
    historySection.appendChild(historyList);
    
    // Stats section
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section';
    
    const statsTitle = document.createElement('h3');
    statsTitle.textContent = 'Weekly Stats';
    
    const statsContent = document.createElement('div');
    statsContent.className = 'stats-content';
    statsContent.id = 'stats-content';
    
    statsSection.appendChild(statsTitle);
    statsSection.appendChild(statsContent);
    
    // Append all sections to metrics container
    metricsContainer.appendChild(calorieSection);
    metricsContainer.appendChild(proteinSection);
    metricsContainer.appendChild(exerciseSection);
    metricsContainer.appendChild(addButton);
    
    // Append all main sections to container
    container.appendChild(dateContainer);
    container.appendChild(metricsContainer);
    container.appendChild(historySection);
    container.appendChild(statsSection);
    
    // Initialize health data from localStorage or create empty object
    let healthData = JSON.parse(localStorage.getItem('healthData')) || {};
    
    // Update the history display initially
    updateHistoryDisplay();
    updateStatsDisplay();
    
    // Add event listener to the add button
    addButton.addEventListener('click', () => {
        const date = dateInput.value;
        const calories = document.getElementById('calories-input').value;
        const protein = document.getElementById('protein-input').value;
        const exercise = document.getElementById('exercise-input').value;
        
        // Validate inputs
        if (!date || !calories || !protein || !exercise) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create or update entry for this date
        healthData[date] = {
            calories: parseInt(calories),
            protein: parseInt(protein),
            exercise: parseInt(exercise)
        };
        
        // Save to localStorage
        localStorage.setItem('healthData', JSON.stringify(healthData));
        
        // Update the history display
        updateHistoryDisplay();
        updateStatsDisplay();
        
        // Clear inputs
        document.getElementById('calories-input').value = '0';
        document.getElementById('protein-input').value = '0';
        document.getElementById('exercise-input').value = '0';
    });
    
    // Add event listener to date input to load data for selected date
    dateInput.addEventListener('change', () => {
        const date = dateInput.value;
        const entry = healthData[date];
        
        if (entry) {
            document.getElementById('calories-input').value = entry.calories;
            document.getElementById('protein-input').value = entry.protein;
            document.getElementById('exercise-input').value = entry.exercise;
        } else {
            document.getElementById('calories-input').value = '0';
            document.getElementById('protein-input').value = '0';
            document.getElementById('exercise-input').value = '0';
        }
    });
    
    // Function to update the history display
    function updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        
        // Sort dates in reverse chronological order
        const sortedDates = Object.keys(healthData).sort().reverse();
        
        if (sortedDates.length === 0) {
            const noData = document.createElement('p');
            noData.textContent = 'No entries yet. Add your first entry above!';
            historyList.appendChild(noData);
            return;
        }
        
        // Create a table for the history
        const table = document.createElement('table');
        table.className = 'history-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Date', 'Calories', 'Protein', 'Exercise', 'Actions'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        sortedDates.forEach(date => {
            const entry = healthData[date];
            const row = document.createElement('tr');
            
            // Format date for display
            const displayDate = new Date(date);
            const dateCell = document.createElement('td');
            dateCell.textContent = displayDate.toLocaleDateString();
            
            const caloriesCell = document.createElement('td');
            caloriesCell.textContent = entry.calories + ' kcal';
            
            const proteinCell = document.createElement('td');
            proteinCell.textContent = entry.protein + ' g';
            
            const exerciseCell = document.createElement('td');
            exerciseCell.textContent = entry.exercise + ' min';
            
            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this entry?')) {
                    delete healthData[date];
                    localStorage.setItem('healthData', JSON.stringify(healthData));
                    updateHistoryDisplay();
                    updateStatsDisplay();
                }
            });
            
            actionsCell.appendChild(deleteButton);
            
            row.appendChild(dateCell);
            row.appendChild(caloriesCell);
            row.appendChild(proteinCell);
            row.appendChild(exerciseCell);
            row.appendChild(actionsCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        historyList.appendChild(table);
    }
    
    // Function to update the stats display
    function updateStatsDisplay() {
        const statsContent = document.getElementById('stats-content');
        statsContent.innerHTML = '';
        
        if (Object.keys(healthData).length === 0) {
            const noData = document.createElement('p');
            noData.textContent = 'No data available for statistics.';
            statsContent.appendChild(noData);
            return;
        }
        
        // Get the last 7 days of data
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 6); // 7 days including today
        
        const lastWeekFormatted = formatDate(lastWeek);
        const todayFormatted = formatDate(today);
        
        // Filter entries within the last week
        const weekEntries = Object.entries(healthData)
            .filter(([date]) => date >= lastWeekFormatted && date <= todayFormatted);
        
        if (weekEntries.length === 0) {
            const noData = document.createElement('p');
            noData.textContent = 'No data available for the last 7 days.';
            statsContent.appendChild(noData);
            return;
        }
        
        // Calculate averages
        const totalCalories = weekEntries.reduce((sum, [_, entry]) => sum + entry.calories, 0);
        const totalProtein = weekEntries.reduce((sum, [_, entry]) => sum + entry.protein, 0);
        const totalExercise = weekEntries.reduce((sum, [_, entry]) => sum + entry.exercise, 0);
        
        const avgCalories = Math.round(totalCalories / weekEntries.length);
        const avgProtein = Math.round(totalProtein / weekEntries.length);
        const avgExercise = Math.round(totalExercise / weekEntries.length);
        
        // Create stats display
        const statsList = document.createElement('ul');
        statsList.className = 'stats-list';
        
        const caloriesStat = document.createElement('li');
        caloriesStat.innerHTML = `<strong>Average Calories:</strong> ${avgCalories} kcal/day`;
        
        const proteinStat = document.createElement('li');
        proteinStat.innerHTML = `<strong>Average Protein:</strong> ${avgProtein} g/day`;
        
        const exerciseStat = document.createElement('li');
        exerciseStat.innerHTML = `<strong>Average Exercise:</strong> ${avgExercise} min/day`;
        
        const totalDays = document.createElement('li');
        totalDays.innerHTML = `<strong>Days Tracked:</strong> ${weekEntries.length} of 7`;
        
        statsList.appendChild(caloriesStat);
        statsList.appendChild(proteinStat);
        statsList.appendChild(exerciseStat);
        statsList.appendChild(totalDays);
        
        statsContent.appendChild(statsList);
    }
    
    return container;
}

// Helper function to create metric input sections
function createMetricInput(id, labelText, type, defaultValue) {
    const section = document.createElement('div');
    section.className = 'metric-section';
    
    const label = document.createElement('label');
    label.htmlFor = `${id}-input`;
    label.textContent = labelText;
    
    const input = document.createElement('input');
    input.type = type;
    input.id = `${id}-input`;
    input.value = defaultValue;
    input.min = '0';
    
    section.appendChild(label);
    section.appendChild(input);
    
    return section;
}

// Helper function to format date as YYYY-MM-DD for input value
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
} 