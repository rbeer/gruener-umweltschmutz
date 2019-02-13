import AutoComplete from './AutoComplete';
import polluters from './polluters.json';

export default class SideNav {
  static instance = null;

  static init() {
    SideNav.populatePolluters();
    SideNav.instance = M.Sidenav.init(document.querySelector('.sidenav'));
    AutoComplete.init(SideNav.instance.close.bind(SideNav.instance));
  }

  static createPolluterEntry(polluter) {
    return `<li class="polluter" data-name="${polluter.name}">
              <a class="waves-effect" href="#${polluter.name}">
                <img src="./images/polluters/${polluter.avatar}" class="circle" />
                <span>${polluter.name}</span>
              </a>
            </li>`;
  }

  static populatePolluters() {
    const pollutersContainer = document.getElementById('polluters');
    const entries = polluters.map(SideNav.createPolluterEntry).join('\n');
    pollutersContainer.insertAdjacentHTML('beforeend', entries);
  }
}
