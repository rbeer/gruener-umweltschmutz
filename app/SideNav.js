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
    if (window.innerWidth < 992) {
      SideNav.instance.open();
    }
  }

  static replacePolluter(evt) {
    evt.preventDefault();
    const polluter = find(polluters, { name: evt.currentTarget.dataset.name });
    const polluterCard = new PolluterCard(polluter);
    polluterCard.update();
    if (window.innerWidth < 992) {
      SideNav.instance.close();
    }
  }

  static createPolluterEntry(polluter) {
    return (`
      <li class="polluter" data-name="${polluter.name}">
        <a class="waves-effect">
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

    Array.from(document.querySelectorAll('#polluters li'))
      .forEach(entry => entry.addEventListener('click', SideNav.replacePolluter));
  }
}
