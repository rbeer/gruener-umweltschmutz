import 'materialize-css/dist/css/materialize.min.css';
import 'styles/index.scss';

import 'materialize-css/dist/js/materialize.min.js';
import smoothscroll from 'smoothscroll-polyfill';

import SideNav from './SideNav';

smoothscroll.polyfill();
SideNav.init();

console.log(`
Some images presented on this website are protected by their respective license.\n

Ottmar von Holtz: Foto AG Gymnasium Melle, CC-BY-SA 3.0
Renate Künast: CC-BY-SA 3.0
Robert Habeck: CC-BY-SA 4.0
Dieter Janecek: CC-BY-SA 3.0
Katrin Göring-Eckardt: CC-BY-SA 2.0
Cem Özdemir: GFDL 1.2
Katharina Schulze: CC BY-SA 3.0

Oberklassewagen, Mittelklassewagen, Kleinwagen: CC-BY-SA-3.0

https://creativecommons.org/licenses/by-sa/2.0
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/by-sa/4.0
http://www.gnu.org/licenses/old-licenses/fdl-1.2.html

`);
