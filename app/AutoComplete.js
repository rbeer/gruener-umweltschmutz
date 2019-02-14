import polluters from './polluters.json';

export default class AutoComplete {
  static instance = null;

  static pulluterData = polluters.reduce((data, polluter) => ({
    ...data,
    [polluter.name]: `./images/polluters/${polluter.avatar}`
  }), {});

  static init(setSelection) {
    AutoComplete.instance = M.Autocomplete.init(document.getElementById('autocomplete-search'), {
      data: AutoComplete.pulluterData,
      onAutocomplete: setSelection
    });
  }
}
