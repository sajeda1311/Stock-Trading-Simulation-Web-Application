(async function renderChart() {
    // Generate mock portfolio performance data (replace with actual data from backend later)
    const portfolioPerformance = [
        { date: '2024-12-01', value: 10000 },
        { date: '2024-12-02', value: 10250 },
        { date: '2024-12-03', value: 10100 },
        { date: '2024-12-04', value: 10500 },
        { date: '2024-12-05', value: 10800 },
        { date: '2024-12-06', value: 11000 },
        { date: '2024-12-07', value: 11200 },
        { date: '2024-12-08', value: 11500 },
    ];

    // Extract dates and values for the chart
    const dates = portfolioPerformance.map(entry => entry.date);
    const values = portfolioPerformance.map(entry => entry.value);

    const ctx = document.getElementById('portfolioChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, // Dates as the x-axis labels
            datasets: [{
                label: 'Portfolio Value',
                data: values, // Portfolio values as y-axis data points
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background area color
                borderWidth: 2,
                fill: true, // Fill the area under the line
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Portfolio Value ($)',
                    },
                },
            },
        },
    });
})();
