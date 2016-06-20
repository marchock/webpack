
import moment from 'moment';
// import $ from 'jQuery';


class PageController {
    constructor() {
        console.log('PAGE CONTROLLER THIS IS WORKING..........');
        console.log($('body'));
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
}

module.exports =  PageController;