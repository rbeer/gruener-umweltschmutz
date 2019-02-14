import comparisons from './comparisons.json';
import ComparisonChart from './ComparisonChart';

export default class ComparisonCollapsible {
  static insertPoint = document.getElementById('comparisons');

  static instance = null;

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
        <li data-comparison-category="${category}">
          <div class="collapsible-header">
            <i class="material-icons">${comparison.icon}</i>${comparison.label}
          </div>
          <div class="collapsible-body white">
            <div class="chart-title">
              ${ComparisonCollapsible.createTitle(comparison.title, name, trip.destination)}
            </div>
            <div data-chart-target="${category}"></div>
          </div>
        </li>
      `);
    }).join('');
  }

  static populateWithCharts() {
    ComparisonCollapsible.charts.forEach(chart => chart.insert());
  }

  static update(trip, name) {
    const activeIdx = Array.from(document.querySelector('.collapsible').children)
      .map(child => child.classList.contains('active'))
      .indexOf(true);

    if (activeIdx !== -1) {
      ComparisonCollapsible.instance.close(activeIdx);
    }

    window.setTimeout(() => {
      ComparisonCollapsible.charts.forEach(chart => {
        chart.update(trip);
        document.querySelector(`[data-comparison-category="${chart.category}"] .chart-title`)
          .innerText = ComparisonCollapsible.createTitle(chart.comparison.title, name, trip.destination);
      });

      if (activeIdx !== -1) {
        ComparisonCollapsible.instance.open(activeIdx);
      }
    }, ComparisonCollapsible.instance.options.inDuration + 300);
  }

  static insert(trip, name) {
    if (ComparisonCollapsible.insertPoint.children.length > 0) {
      ComparisonCollapsible.update(trip, name);
      return;
    }

    ComparisonCollapsible.insertPoint
      .insertAdjacentHTML('beforeend', ComparisonCollapsible.createCollapsible(trip, name));

    ComparisonCollapsible.instance = M.Collapsible.init(
      ComparisonCollapsible.insertPoint.querySelector('.collapsible')
    );

    ComparisonCollapsible.populateWithCharts();
  }

}
