
// Function to check if the input is a palindrome
function checkPalindrome() {
    // Get the input value and result element
const input = document.getElementById("text-input").value;
const result = document.getElementById("result");

    // Check if the input is empty
if (!input) {
alert("Please input a value");
return;
    }
// Clean the input by removing non-alphanumeric characters and converting to lowercase
const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
// Reverse the cleaned input
const reversedInput = cleanedInput.split('').reverse().join('');

// Compare the cleaned input with the reversed input
if (cleanedInput === reversedInput) {
result.textContent = `${input} is a palindrome`;
    } else {
result.textContent = `${input} is not a palindrome`;
    }
}

document.getElementById("check-btn").addEventListener("click", checkPalindrome);
