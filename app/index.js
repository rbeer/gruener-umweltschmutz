/**
 * Application entry point
 */

// Load application styles
import 'materialize-css/dist/css/materialize.min.css';
import 'styles/index.scss';

import 'materialize-css/dist/js/materialize.min.js';

import SideNav from './SideNav';
import PolluterCard from './PolluterCard';

import polluters from './polluters.json';

SideNav.init();
const polluterCard = new PolluterCard(polluters[0]);
polluterCard.update();
