async function loadPoopDay() {
    // loading data
    const reponse = await fetch("data/weight.json");
    const weightData = await reponse.json();
    // update last weight
    document.getElementById("weight_value").innerHTML = weightData.values.findLast(w => w !== null) + " kg";

    // create weight chart
    const ctx = document.getElementById('weightChart');
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
loadPoopDay();