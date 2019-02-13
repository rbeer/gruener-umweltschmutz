export default class ChartCard {
  static init() {
    const trip = {
      type: 'bar',
      orientation: 'h',
      name: 'flight',
      x: [1],
      y: [1]
    };

    const comparison = {
      type: 'bar',
      orientation: 'h',
      name: 'comparison',
      x: [201],
      y: [1]
    };

    const data = [trip, comparison];
    const layout = {
      margin: { t: 0 },
      font: { family: 'Roboto' },
      barmode: 'stack'
    };
    const options = {
      displayModeBar: false,
      scrollZoom: false,
      responsive: true
    };

    Plotly.react(document.getElementById('plotly'), data, layout, options);
    window.setTimeout(() => {
      comparison.x = [20];
      Plotly.react(document.getElementById('plotly'), data, layout, options);
    }, 2000);
  }
}
