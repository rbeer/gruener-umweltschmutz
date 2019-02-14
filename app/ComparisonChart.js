export default class ComparisonChart {
  constructor(category, trip, comparison) {
    this.trip = trip;
    this.comparison = comparison;
    this.category = category;

    this.data = [{
      type: 'bar',
      x: comparison.items.map(item => item.label),
      y: comparison.items.map(item => Math.round(trip.co2 / item.co2))
    }];
    this.layout = {
      margin: { t: 0 },
      font: { family: 'Roboto' },
      bargap: 0.05
    };
    this.options = {
      displayModeBar: false,
      staticPlot: true,
      responsive: true
    };
  }

  insert() {
    Plotly.react(
      document.querySelector(`[data-chart-target="${this.category}"]`),
      this.data,
      this.layout,
      this.options
    );
  }

  update(trip) {
    this.data = [{
      type: 'bar',
      x: this.comparison.items.map(item => item.label),
      y: this.comparison.items.map(item => Math.round(trip.co2 / item.co2))
    }];
    this.insert();
  }
}
