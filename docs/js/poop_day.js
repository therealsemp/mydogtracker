async function loadPoopDay() {
    const ctx = document.getElementById('poopDayChart');
    const reponse = await fetch("data/poop.json");
    const poopData = await reponse.json();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: poopData.dates,
            datasets: [
                /*
                {
                    label: "Dehors (%)",
                    data: poopData.day_success_rate,
                    backgroundColor: '#92B8FF',
                    order: 1,
                    yAxisID: 'y',
                    borderRadius: 5,
                    // use full with, use boder for gap
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                },
                */
                {
                    label: "Dans la maison (nb)",
                    data: poopData.day_nb_failure,
                    borderColor: '#96126d',
                    tension: 0.1,
                    type: 'line',
                    order: 0,
                    //yAxisID: 'y1',
                }
            ]
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
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                /*
                y1: {
                    position: 'right',
                    max: 10,
                    // grid line settings
                    grid: {
                        drawOnChartArea: false,
                    },
                
                }
                */
            },
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}
loadPoopDay();