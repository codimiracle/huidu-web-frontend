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
    if (!money) {
      return `HC 0`;
    }
    return `HC ${money && money.amountMinorLong || 0}`;
  }
  static format(money: Money) {
    if (!money || !money.currencyUnit) {
      return `￥ 0.00`;
    }
    return `${money.currencyUnit.symbol} ${money && money.amountMajorLong || 0}.${numberFormat(money && money.minorPart) || '00'}`
  }
}