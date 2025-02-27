// Select elements
const form = document.getElementById('workout-form');
const workoutList = document.getElementById('workout-list');
const setsContainer = document.getElementById('sets-container');
const addSetBtn = document.getElementById('add-set');
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

const drkModeBtn = document.getElementById("toggle-dark");

drkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Function to add a new set dynamically
addSetBtn.addEventListener('click', () => {
    const setDiv = document.createElement('div');
    setDiv.classList.add('set');
    setDiv.innerHTML = `
        <input type="number" class="weight" placeholder="Weight" required>
        <input type="number" class="reps" placeholder="Reps" required>
        <button type="button" class="remove-set">X</button>
    `;
    setsContainer.appendChild(setDiv);

    // Allow removing the set
    setDiv.querySelector('.remove-set').addEventListener('click', () => {
        setDiv.remove();
    });
});

// Function to display workouts
function displayWorkouts() {
    workoutList.innerHTML = '';
    
    workouts.forEach((workout, index) => {
        let setsData = workout.sets
            .map((set, i) => `Set ${i + 1}: ${set.reps} reps @ ${set.weight}
            <button onclick="editSet(${index},${i})">Edit</button>`)
            .join('<br>'); // Ensures proper formatting

        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${workout.exercise}</strong><br>
            ${setsData} <br>
            
            <button onclick="deleteWorkout(${index})">Delete</button>
        `;
        workoutList.appendChild(li);
        
    });
}
function editSet(workoutIndex, setIndex) {
    let newWeight = prompt("Enter weight:");
    let newReps = prompt("Enter reps:");
    if (newReps && newWeight) {
        workouts[workoutIndex].sets[setIndex] = {reps: newReps, weight: newWeight};
        saveWorkoutsToStorage();
        displayWorkouts();
    }
}
// Initial display of stored workouts
displayWorkouts();

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const exercise = document.getElementById('exercise').value;
    const setElements = document.querySelectorAll('.set');
    let sets = [];

    setElements.forEach(set => {
        const reps = set.querySelector('.reps').value;
        const weight = set.querySelector('.weight').value;

        if (reps && weight) {  
            sets.push(workouts[workoutIndex].sets[setIndex]);
        }
    });

    if (sets.length === 0) {
        alert("Please add at least one valid set.");
        return;
    }

    const workout = { exercise, sets, weight, reps};
    
    workouts.push(workout);
    saveWorkoutsToStorage();
    displayWorkouts();
    
    form.reset();

    // Clear setsContainer and manually add the default set
    setsContainer.innerHTML = ''; 
    const defaultSet = document.createElement('div');
    defaultSet.classList.add('set');
    defaultSet.innerHTML = `
        <input type="number" class="weight" placeholder="Weight" required>
        <input type="number" class="reps" placeholder="Reps" required>

    `;
    setsContainer.appendChild(defaultSet);
});

function initSet() {
    setsContainer.innerHTML= ''
    const defaultSet = document.createElement('div');
    defaultSet.classList.add('set');
    defaultSet.innerHTML = `
        <input type="number" class="weight" placeholder="Weight" required>
        <input type="number" class="reps" placeholder="Reps" required>

    `;
    setsContainer.appendChild(defaultSet);
}
// Function to delete workouts
function deleteWorkout(index) {
    workouts.splice(index, 1);
    saveWorkoutsToStorage();
    displayWorkouts();
}

// Initialize workoutSessions from local storage OR create an empty array


// Function to save workout sessions to local storage
function saveWorkoutsToStorage() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Function to add a new workout session
function logWorkoutSession(exercises) {
    const workoutSession = {
        date: new Date().toLocaleString(),  // Store date and time of session
        exercises: exercises  // Array of exercise objects with sets & reps
    };

    workoutSessions.push(workoutSession);
    saveWorkoutsToStorage(); // Save updated list to local storage
}

window.onload = initSet();

