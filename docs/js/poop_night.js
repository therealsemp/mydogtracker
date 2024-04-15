async function loadPoopNight() {
    const ctx = document.getElementById('poopNightChart');
    const reponse = await fetch("data/poop.json");
    const poopData = await reponse.json();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: poopData.dates,
            datasets: [{
                label: 'Dans la maison (nb)',
                data: poopData.night_nb_failure,
                borderColor: '#96126d',
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
        }
    });
}
loadPoopNight();