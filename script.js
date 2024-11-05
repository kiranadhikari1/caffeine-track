// Caffeine content for each drink
const caffeineContent = {
    espressoShot: 63,
    coffee: 95,
    decafCoffee: 2,
    blackTea: 47,
    greenTea: 40,
    preWorkout: 200,
    monster: 160,
    celsius: 140,
    redBull: 110,
    caffeinePill: 200,
    soda: 34
};

// Caffeine limits for different categories
const caffeineLimits = {
    children: 100,
    adult: 400,
    elderly: 300,
    pregnant: 200
};

// Initializing variables
let drinkCounts = {
    espressoShot: 0,
    coffee: 0,
    decafCoffee: 0,
    blackTea: 0,
    greenTea: 0,
    preWorkout: 0,
    monster: 0,
    celsius: 0,
    redBull: 0,
    caffeinePill: 0,
    soda: 0
};
let totalCaffeine = 0;
let selectedCategory = null;

// This method adds caffeine to the total and updates the display
function addCaffeine(drink) {
    if (!selectedCategory) {
        alert("Please select a category to set your caffeine limit.");
        return;
    }
    drinkCounts[drink]++;
    totalCaffeine += caffeineContent[drink];
    updateDisplay();
}

// This method removes all entries and updates the display
function removeAllEntries() {
    for (const drink in drinkCounts) {
        drinkCounts[drink] = 0;
    }
    totalCaffeine = 0;
    updateDisplay();
}

// This method removes caffeine from the total and updates the display
function removeCaffeine(drink) {
    if (drinkCounts[drink] > 0) {
        drinkCounts[drink]--;
        totalCaffeine -= caffeineContent[drink];
        updateDisplay();
    }
}

// Selector for category
function selectCategory(category) {
    selectedCategory = category;

    document.querySelectorAll("#category-selection button").forEach(button => {
        button.classList.remove("active");
    });
    document.getElementById(`${category}-btn`).classList.add("active");

    updateDisplay();
}

// Method to update the display
function updateDisplay() {
    const details = document.getElementById("caffeine-details");
    const total = document.getElementById("caffeine-total");
    const limitDisplay = document.getElementById("caffeine-limit");

    if (selectedCategory) {
        limitDisplay.textContent = `Caffeine Limit: ${caffeineLimits[selectedCategory]} mg`;
    } else {
        limitDisplay.textContent = "Select category to see limit";
    }

    // Clear previous entries
    details.innerHTML = '';

    // Display each drink's count and total caffeine
    for (const drink in drinkCounts) {
        if (drinkCounts[drink] > 0) {
            const drinkCaffeine = drinkCounts[drink] * caffeineContent[drink];
            details.innerHTML += `
                <div class="drink-item">
                    ${formatDrinkName(drink)} x${drinkCounts[drink]} - ${drinkCaffeine} mg
                    <button class="remove-btn" onclick="removeCaffeine('${drink}')">X</button>
                </div>
            `;
        }
    }

    // Update the total display
    total.textContent = `Total: ${totalCaffeine} mg`;

    // Check if caffeine limit exceeds
    const caffeineLimit = selectedCategory ? caffeineLimits[selectedCategory] : Infinity;
    if (totalCaffeine > caffeineLimit) {
        total.classList.add("over-limit");
    } else {
        total.classList.remove("over-limit");
    }
}

// Helper function to format and return drink name
function formatDrinkName(drink) {
    const drinkNames = {
        espressoShot: "Espresso Shot",
        coffee: "Coffee",
        decafCoffee: "Decaf Coffee",
        blackTea: "Black Tea",
        greenTea: "Green Tea",
        preWorkout: "Pre Workout",
        monster: "Monster",
        celsius: "Celsius",
        redBull: "Red Bull",
        caffeinePill: "Caffeine Pill",
        soda: "Soda"
    };
    return drinkNames[drink] || drink;
}
