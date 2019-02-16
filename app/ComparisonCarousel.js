import comparisons from './comparisons.json';

export default class ComparisonCarousel {
  constructor(polluter, tripIdx) {
    this.instance = null;
    this.polluter = polluter;
    this.trip = polluter.trips[tripIdx];
    this.indicatorTooltips = [];
  }

  static insertPoint = document.getElementById('comparisons');

  createComparisonText(template, item) {
    const _item = item;
    const tags = template.match(/\$\[(.*?)\]/g);
    const vars = tags.map(tag => tag.replace('$[', '').replace(']', ''));
    let value = Math.round(this.trip.co2 / item.co2);
    let text = template;
    let idx = 0;

    if (_item.unit === 'g' && value > 1000) {
      value = value / 1000;
      _item.unit = 'kg';
    }

    for (const tag of tags) {
      if (tag === '$[value]') {
        text = text.replace(tag, value.toLocaleString('de-DE'));
      }
      text = text.replace(tag, _item[vars[idx]]);
      idx++;
    }

    return text
  }

  createItems(comparison) {
    return comparison.items.map(item => `
      <li class="collection-item">
        <div class="valign-wrapper">
          <img src="./images/${comparison.category}/${item.image}" class="circle" />
          ${this.createComparisonText(comparison.textTemplate, item)}
        </div>
      </li>
    `).join('');
  }

  createCategory() {
    return comparisons.map(comparison => {
      return (`
          <div class="carousel-item comparison-content" data-comparison-category="${comparison.category}">
            <ul class="collection">
              ${this.createItems(comparison)}
            </ul>
          </div>
      `);
    }).join('');
  }

  createCarousel() {
    return (`
      <div class="card">
        <div class="card-content">
          <div class="card-title">
            Für ${this.polluter.name}s Flug nach ${this.trip.destination} kannst du...
          </div>
          <div class="row">
            <div class="col s12">
              <div class="carousel carousel-slider">
                ${this.createCategory()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  setIndicatorIcons() {
    Array.from(this.instance.$indicators[0].children).forEach((indicator, idx) => {
      indicator.insertAdjacentHTML(
        'beforeend',
        `<i class="material-icons">${comparisons[idx].icon}</i> `
      );
      indicator.dataset.position = "top";
      indicator.dataset.tooltip = comparisons[idx].label;
      this.indicatorTooltips.push(M.Tooltip.init(indicator));
    });
  }

  insert() {
    ComparisonCarousel.insertPoint.insertAdjacentHTML(
      'beforeend',
      this.createCarousel()
    );

    this.instance = M.Carousel.init(
      ComparisonCarousel.insertPoint.querySelector('.carousel'),
      { fullWidth: true, indicators: true }
    );

    this.setIndicatorIcons();
  }

  destroy() {
    this.indicatorTooltips.forEach(tooltip => tooltip.destroy());
    this.instance.destroy();
    ComparisonCarousel.insertPoint.firstElementChild.remove();
  }

}
