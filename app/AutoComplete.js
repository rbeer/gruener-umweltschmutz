import polluters from './polluters.json';

export default class AutoComplete {
  static instance = null;

  static pulluterData = polluters.reduce((data, polluter) => ({
    ...data,
    [polluter.name]: `./images/polluters/${polluter.avatar}`
  }), {});

  static handleSelection(selection) {
    try {
      document.querySelector('.polluter.selected').classList.remove('selected');
    } catch (err) {}

    const selected = document.querySelector(`[data-name="${selection}`);
    selected.classList.add('selected');
    selected.scrollIntoView();
    AutoComplete.instance.el.value = '';
  }

  static init(closeSideNav) {
    AutoComplete.instance = M.Autocomplete.init(document.getElementById('autocomplete-search'), {
      data: AutoComplete.pulluterData,
      onAutocomplete: (selection) => {
        AutoComplete.handleSelection(selection);
        closeSideNav();
      }
    });
  }
}
