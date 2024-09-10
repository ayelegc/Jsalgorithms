document.getElementById("check-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;
    const resultsDiv = document.getElementById("results-div");

    if (!userInput) {
        alert("Please provide a phone number");
        return;
    }

    const phoneNumberRegex = /^(1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    const cleanedNumber = userInput.replace(/[^\d]/g, '');
    const validNumber = /^1?(\d{10})$/.test(cleanedNumber);

    if (validNumber && phoneNumberRegex.test(userInput)) {
        resultsDiv.textContent = `Valid US number: ${userInput}`;
    } else {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
    }
});

document.getElementById("clear-btn").addEventListener("click", function() {
    document.getElementById("user-input").value = '';
    document.getElementById("results-div").textContent = '';
});
