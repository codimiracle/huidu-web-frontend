import moment from 'moment';

export default class DatetimeUtil {
  static now() {
    return moment();
  }
  static format(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
  static formatNow() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
  static fromNow(date: string) {
    return moment(date).fromNow();
  }
  static formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
  static formatTinyDate(date: string) {
    return moment(date).format('MM-DD');
  }
}