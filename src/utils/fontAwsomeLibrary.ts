import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


 library.add(faHome, faBars, faXmark, faCalendar);


// there are two ways to use Font Awesome icons in react
// 1- Individual use => the icons are imported in the component where it needed and used.
// 2- Global use => imported the icons in a single module and used them throughout the project.
// Note: icons importing in each module is tedius so it's done at one place,
// one drawback of the global imort is the some type of icons imported that are not used and could impact performance.

// the rule of javascript api
// <FontAwesomeIcon icon="fa-solid fa-bars" />
// this way icons are shown
// javascript api not use prefixex => fa-solid
// javascript api not uses hypens
// and the first latter of the icon name will be capatilized like => faBars
// so it's imported this way => import {faBars} from "@fortawesome/free-solid-svg-icons";

// Note: JavaScript not use hypen, it use smaller camel casing instead.