import find from 'lodash.find';

import polluters from './polluters.json';
import AutoComplete from './AutoComplete';
import PolluterCard from './PolluterCard';

export default class SideNav {
  static instance = null;

  static init() {
    SideNav.populatePolluters();
    SideNav.instance = M.Sidenav.init(document.querySelector('.sidenav'));
    AutoComplete.init(SideNav.instance.close.bind(SideNav.instance));
  }

  static replacePolluter(evt) {
    evt.preventDefault();
    const polluter = find(polluters, { name: evt.currentTarget.dataset.name });
    const polluterCard = new PolluterCard(polluter);
    polluterCard.update();
  }

  static createPolluterEntry(polluter) {
    return (`
      <li class="polluter">
        <a class="waves-effect" data-name="${polluter.name}">
          <img src="./images/polluters/${polluter.avatar}" class="circle" />
          <span>${polluter.name}</span>
        </a>
      </li>
    `);
  }

  static populatePolluters() {
    const pollutersContainer = document.getElementById('polluters');
    const entries = polluters.map(SideNav.createPolluterEntry).join('\n');
    pollutersContainer.insertAdjacentHTML('beforeend', entries);
    document.querySelector('#polluters a').addEventListener('click', SideNav.replacePolluter);
  }
}
