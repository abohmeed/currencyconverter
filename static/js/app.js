document.getElementById("currencyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Show the spinner
    document.getElementById("loadingSpinner").style.display = "block";
    // Hide the result card initially
    document.getElementById("resultCard").style.display = "none";

    // Get the values for source currency, target currency, and amount
    const sourceCurrency = document.getElementById("sourceCurrency").value;
    const targetCurrency = document.getElementById("targetCurrency").value;
    const amount = document.getElementById("amount").value;

    fetch(`/convert?from=${sourceCurrency}&to=${targetCurrency}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
            // Construct the result text using data.result as per your note
            const resultText = `${amount} ${sourceCurrency} is ${data.result} ${targetCurrency}`;

            // Update the result text and title
            document.getElementById("result").innerText = resultText;
            document.getElementById("resultTitle").innerText = "Conversion Successful";

            // Show the result card and hide the spinner
            document.getElementById("resultCard").style.display = "block";
            document.getElementById("loadingSpinner").style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            // In case of an error, update the result title, hide the result text and spinner
            document.getElementById("resultTitle").innerText = "Conversion Failed";
            document.getElementById("result").innerText = "Please try again.";
            document.getElementById("resultCard").style.display = "block";
            document.getElementById("loadingSpinner").style.display = "none";
        });
});
