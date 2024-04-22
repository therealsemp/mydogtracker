function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

async function loadPoopByHour() {
    const ctx = document.getElementById('poopByHourChart');

    const colors = ['#167288', '#8cdaec', '#b45248', '#d48c84', '#a89a49', '#d6cfa2', '#3cb464', '#9bddb1', '#643c6a', '#836394'];
    const reponse = await fetch("data/poop_by_hour.json");
    const poopData = await reponse.json();
    // update text
    document.getElementById("nbPoopLabel").innerHTML = poopData.avg_by_day + " cacas";
    document.getElementById("bestTimeToPoopList").innerHTML = poopData.prefered_hours.map(h => '<li>' + h + '</li>').join('');
    // update chart
    var datasets = [...groupBy(poopData.by_hour_of_day, o => o.group).values()]
        .map((a, index) => {
            dataset = {
                data: a.map(v_by_hour_of_day => { return { x: v_by_hour_of_day.hour, y: v_by_hour_of_day.day_of_week }; }),
                borderColor: colors[index],
                backgroundColor: colors[index],
                pointRadius: 4
            };
            return dataset;
        })

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        stepSize: 1,
                        callback: function (value, index, ticks) {
                            return ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][value];
                        }
                    },
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return new Date(context.parsed.x).toLocaleTimeString();
                        }
                    }
                },
            }
        }
    });
}
loadPoopByHour();