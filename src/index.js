import { format, getTime } from "date-fns";
import "./styles/style.css";
import tasksFns from "./scripts/app";
import projectFns from "./scripts/project";
import DOM from "./dom";
import Logo from "./images/EXEcute2.png";
import bell from "./images/bell.svg";
import bellRing from "./images/bell-ring.svg";
import Note from "./images/notebook.svg";
import Board from "./images/board.svg";
import Today from './images/today.svg';
import coming from './images/coming.svg';
import GitHub from './images/GitHub.png'

const tasks = tasksFns();
const projects = projectFns();
console.log(projects);
console.log(tasks);

// const date = new Date()
// console.log(date);



