async function loadWeight() {
    const ctx = document.getElementById('weightChart');
    const reponse = await fetch("data/weight.json");
    const weightData = await reponse.json();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: weightData.dates,
            datasets: [{
                data: weightData.values,
                borderColor: '#FFCD91',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}
loadWeight();