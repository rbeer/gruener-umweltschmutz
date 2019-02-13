import ChartCard from './ChartCard';

export default class PolluterCard {
  static insertPoint = document.getElementById('polluter');

  constructor(polluter) {
    this.name = polluter.name;
    this.trips = polluter.trips;
    this.selectElement = null;
    this.selectInstance = null;
  }

  handleSelectionChange() {
    const trip = this.trips[this.selectElement.value];
    console.log(trip);
  }

  clear() {
    Array.from(PolluterCard.insertPoint.children).forEach(childElement => childElement.remove());
  }

  insert() {
    const card = (`
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div id="trips" class="col s12">
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
          <option value="" disabled selected>${this.name}</option>
          ${options}
        </select>
      </div>
    `);
  }
}
