import comparisons from './comparisons.json';

export default class ComparisonCollapsible {
  static insertPoint = document.getElementById('comparisons');

  static instances = null;

  static createCollapsible(trip) {
    return (`
      <div class="row">
        <div class="col s12">
          <ul class="collapsible">
            ${ComparisonCollapsible.createItems(trip)}
         </div>
        </div>
      </div>
    `);
  }

  static createItems(trip) {
    return Object.keys(comparisons).map(category => {
      const comparison = comparisons[category];

      return (`
        <li>
          <div class="collapsible-header">
            <i class="material-icons">${comparison.icon}</i>${comparison.label}
          </div>
          <div class="collapsible-body white">
            Chart for ${comparison.items} compared to ${trip};
          </div>
        </li>
      `);
    }).join('');
  }

  static insert(trip) {
    ComparisonCollapsible.insertPoint
      .insertAdjacentHTML('beforeend', ComparisonCollapsible.createCollapsible(trip));

    ComparisonCollapsible.instances = M.Collapsible.init(
      ComparisonCollapsible.insertPoint.querySelectorAll('.collapsible')
    );
  }
}
