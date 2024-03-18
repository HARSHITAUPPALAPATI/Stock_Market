// Function to fetch stock data and update the chart
function getStockData() {
    const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your API key
    const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();

    if (stockSymbol === '') {
        alert('Please enter a stock symbol');
        return;
    }

    // Fetch stock data from Alpha Vantage API
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data['Time Series (Daily)']) {
                const dates = Object.keys(data['Time Series (Daily)']);
                const closingPrices = dates.map(date => data['Time Series (Daily)'][date]['4. close']);

                // Update chart using Chart.js
                updateChart(dates.reverse(), closingPrices.reverse());
            } else {
                alert('Stock data not available for the entered symbol. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            alert('Error fetching stock data. Please try again.');
        });
}

// Function to update the chart using Chart.js
function updateChart(labels, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Closing Price',
                data: data,
                borderColor: '#007bff',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}
