// Caffeine content for each drink
const caffeineContent = {
    coffeeBrewed: 95,
    espresso: 63,
    blackTea: 47,
    greenTea: 28,
    energyDrink: 80,
    cola: 34,
    icedTea: 30,
    matchaLatte: 70,
    coldBrew: 200
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
    coffeeBrewed: 0,
    espresso: 0,
    blackTea: 0,
    greenTea: 0,
    energyDrink: 0,
    cola: 0,
    icedTea: 0,
    matchaLatte: 0,
    coldBrew: 0
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
        coffeeBrewed: "Coffee (Brewed)",
        espresso: "Espresso",
        blackTea: "Black Tea",
        greenTea: "Green Tea",
        energyDrink: "Energy Drink (Average)",
        cola: "Cola (Regular)",
        icedTea: "Iced Tea (Bottled)",
        matchaLatte: "Matcha Latte",
        coldBrew: "Cold Brew Coffee"
    };
    return drinkNames[drink] || drink;
}
