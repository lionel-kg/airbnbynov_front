import moment from "moment";
import frLocal from "moment/locale/fr";


export function displayDate(date){
    moment.locale("fr", frLocal);
    return moment(date).format('LL');
}