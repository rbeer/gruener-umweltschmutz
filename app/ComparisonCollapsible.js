import comparisons from './comparisons.json';
import ComparisonChart from './ComparisonChart';

export default class ComparisonCollapsible {
  static insertPoint = document.getElementById('comparisons');

  static instances = null;

  static charts = [];

  static createTitle(text, name, destination) {
    return `Für ${name}s Flug nach ${destination}, ${text}`;
  }

  static createCollapsible(trip, name) {
    return (`
      <div class="row">
        <div class="col s12">
          <ul class="collapsible">
            ${ComparisonCollapsible.createItems(trip, name)}
         </div>
        </div>
      </div>
    `);
  }

  static createItems(trip, name) {
    return Object.keys(comparisons).map(category => {
      const comparison = comparisons[category];
      ComparisonCollapsible.charts.push(new ComparisonChart(category, trip, comparison));

      return (`
        <li>
          <div class="collapsible-header">
            <i class="material-icons">${comparison.icon}</i>${comparison.label}
          </div>
          <div class="collapsible-body white"">
            <div class="chart-title">
              ${ComparisonCollapsible.createTitle(comparison.title, name, trip.destination)}
            </div>
            <div data-chart-target="${category}"></div>
          </div>
        </li>
      `);
    }).join('');
  }

  static insert(trip, name) {
    ComparisonCollapsible.insertPoint
      .insertAdjacentHTML('beforeend', ComparisonCollapsible.createCollapsible(trip, name));

    ComparisonCollapsible.instances = M.Collapsible.init(
      ComparisonCollapsible.insertPoint.querySelectorAll('.collapsible')
    );

    ComparisonCollapsible.populateWithCharts();
  }

  static populateWithCharts() {
    ComparisonCollapsible.charts.forEach(chart => chart.insert());
  }
}
