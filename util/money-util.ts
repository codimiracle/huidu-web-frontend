import { Money } from "../types/order";

function numberFormat(n: number) {
  if (n < 10) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
}

export default class MoneyUtil {

  static formatHC(money: Money) {
    return `HC ${money && money.amountMinorLong || 0}`
  }
  static format(money: Money) {
    return `${money.currencyUnit.symbol} ${money && money.amountMajorLong || 0}.${numberFormat(money && money.minorPart) || '00'}`
  }
}