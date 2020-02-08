import moment from 'moment';

export default {
  format(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
  formatNow() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
  fromNow(date: string) {
    return moment(date).fromNow();
  },
  formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}