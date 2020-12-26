window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = await getData();
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [
                    {
                        label: 'Preis in €',
                        data: data.prices,
                        fill: false,
                        borderColor: 'rgba(81, 152, 255, 1)',
                        backgroundColor: 'rgba(81, 152, 255, 0.5)',
                        borderWidth: 2
                    }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return `${value} €`;
                        }
                    }
                }]
            }
        }
    });
}

async function getData() {
    const response = await fetch(document.querySelector('a[id="csv_file"]')['href']);
    const data = await response.text();
    const dates = [];
    const prices = [];
    const rows = data.split('\n').slice(1).slice(0, -1);
    
    rows.forEach((row) => {
        const cols = row.split(',');
        const dateStr = new Date(parseInt(cols[0])).toLocaleDateString();
        dates.push(dateStr);
        prices.push(parseFloat(cols[1]));
    });
    return { dates, prices }
};