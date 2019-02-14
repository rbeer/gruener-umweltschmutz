import ComparisonCollapsible from './ComparisonCollapsible';

export default class PolluterCard {
  static insertPoint = document.getElementById('polluter');

  constructor(polluter) {
    this.name = polluter.name;
    this.trips = polluter.trips;
    this.avatar = polluter.avatar;
    this.selectElement = null;
    this.selectInstance = null;
  }

  handleSelectionChange() {
    ComparisonCollapsible.insert(this.trips[this.selectElement.value]);
  }

  clear() {
    Array.from(PolluterCard.insertPoint.children).forEach(childElement => childElement.remove());
  }

  insert() {
    const card = (`
      <div class="card">
        <div class="card-content">
          <div class="row valign-wrapper">
            <div class="col s4 m2 center">
                <img class="polluter-avatar responsive-img circle" src="./images/polluters/${this.avatar}" />
            </div>
            <div id="trips" class="col s8 m10">
              <div class="polluter-name">${this.name}</div>
              ${this.createSelectMarkup()}
            </div>
          </div>
        </div>
      </div>
    `);

    PolluterCard.insertPoint.insertAdjacentHTML('beforeend', card);
    this.selectElement = document.querySelector('#trips select');
    this.selectElement.addEventListener('change', this.handleSelectionChange.bind(this));
    this.selectInstance = M.FormSelect.init(this.selectElement);
  }

  update() {
    this.clear();
    this.insert();
  }

  createSelectMarkup() {
    const options = this.trips.map((trip, idx) => `
      <option value="${idx}">${trip.destination}</option>
    `).join('');

    return (`
      <div class="input-field">
        <select data-type="trips">
          <option value="" disabled selected>Flüge</option>
          ${options}
        </select>
      </div>
    `);
  }
}
