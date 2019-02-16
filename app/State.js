import PolluterCard from './PolluterCard';
import ComparisonCarousel from './ComparisonCarousel';

export default class State {
  static cards = {
    polluterCard: null,
    comparisonCarousel: null
  }

  static changePolluter(polluter) {
    if (State.cards.polluterCard) {
      State.cards.polluterCard.destroy();
    }
    State.cards.polluterCard = new PolluterCard(polluter);
    State.cards.polluterCard.insert();
    window.scrollTo(0, 0);
  }

  static changeComparison(polluter, tripIdx) {
    if (State.cards.comparisonCarousel) {
      State.cards.comparisonCarousel.destroy();
    }
    State.cards.comparisonCarousel = new ComparisonCarousel(polluter, tripIdx);
    State.cards.comparisonCarousel.insert();
    window.setTimeout(() => window.scrollTo(0, 200), 100);
  }
};
