window.addEventListener('load', setup);

// THX to https://gist.github.com/kettuniko/1b72bd4862797f1039c8
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomByte = () => randomNumber(0, 255)
const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`

async function setup() {
  const ctx = document.getElementById('chart').getContext('2d');
  const data = await getData();

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: data.data
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
  const data = [];

  const response = await fetch(`/data/all`);
  const productData = await response.text();
  let rows = productData.split('\n');
  const keys = rows[0].split(',').slice(1);
  const dates = [];

  keys.forEach((key) => {
    const rgba = randomCssRgba();

    data.push({
        label: key,
        data: [],
        fill: false,
        borderColor: rgba,
        backgroundColor: rgba,
        borderWidth: 2
    });
  });

  rows = rows.slice(1);

  rows.every((row) => {
    let cols = row.split(',');

    if(cols.length < 2) {
      return false;
    };

    const dateStr = new Date(parseInt(cols[0])).toLocaleDateString();
    dates.push(dateStr);

    cols = cols.slice(1);
    for(let i = 0; i < cols.length; i++) {
      data[i].data.push(cols[i]); 
    }
    return true;
  });
  
  return { dates, data };
}