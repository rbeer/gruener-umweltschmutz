import find from 'lodash.find';
import sortBy from 'lodash.sortby';

import polluters from './polluters.json';

import State from './State';
import AutoComplete from './AutoComplete';

export default class SideNav {
  static instance = null;

  static init() {
    SideNav.populatePolluters();
    SideNav.instance = M.Sidenav.init(document.querySelector('.sidenav'));
    AutoComplete.init(SideNav.setSelection);
  }

  static setSelection(eventOrName) {
    const currentSelection = document.querySelector('.polluter.selected');

    let name;
    if (eventOrName instanceof Event) {
      eventOrName.preventDefault();
      name = eventOrName.currentTarget.dataset.name;
    } else {
      name = eventOrName;
    }

    if (currentSelection) {
      currentSelection.classList.remove('selected');
    }

    const selected = document.querySelector(`#polluters li[data-name="${name}`);
    selected.classList.add('selected');
    selected.scrollIntoView();
    AutoComplete.instance.el.value = '';
    SideNav.replacePolluter(name);
  }

  static replacePolluter(name) {
    const polluter = find(polluters, { name });
    State.changePolluter(polluter);
    if (window.innerWidth < 992) {
      SideNav.instance.close();
    }
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
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
    const entries = sortBy(polluters, ['name']).map(SideNav.createPolluterEntry).join('\n');
    pollutersContainer.insertAdjacentHTML('beforeend', entries);

    Array.from(document.querySelectorAll('#polluters li'))
      .forEach(entry => entry.addEventListener('click', SideNav.setSelection));
  }
}
