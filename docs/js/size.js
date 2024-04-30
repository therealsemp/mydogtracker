async function loadPoopDay() {
    // loading data
    const reponse = await fetch("data/size.json");
    const sizeData = await reponse.json();
    // update last size
    var size_shoulder_value = sizeData.shoulder.findLast(s => s !== null) + " cm";
    document.getElementById("size_shoulder_value").innerHTML = size_shoulder_value;
    document.getElementById("size_shoulder_value_img").innerHTML = size_shoulder_value;

    var size_back_value = sizeData.back.findLast(s => s !== null) + " cm";
    document.getElementById("size_back_value").innerHTML = size_back_value;
    document.getElementById("size_back_value_img").innerHTML = size_back_value;

    var size_date = new Date(sizeData.dates.findLast(d => d !== null)).toLocaleDateString('fr-fr', { year: "numeric", month: "long", day: "numeric" });
    document.getElementById("size_date").innerHTML = size_date;


    // chart
    const ctx = document.getElementById('sizeChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sizeData.dates,
            datasets: [{
                data: sizeData.back,
                borderColor: '#8a1a12',
                tension: 0.1
            }, {
                data: sizeData.shoulder,
                borderColor: '#2073B3',
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
                    beginAtZero: false
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