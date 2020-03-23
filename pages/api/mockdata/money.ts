import { Money } from "../../../types/order"

export const getMockMoney = function (): Money {
  return { "zero": false, "negative": false, "negativeOrZero": false, "amount": 12, "currencyUnit": { "code": "CNY", "numericCode": 156, "decimalPlaces": 2, "symbol": "￥", "countryCodes": ["CN"], "pseudoCurrency": false, "numeric3Code": "156" }, "amountMajor": 12, "positiveOrZero": true, "minorPart": 0, "amountMinor": 1200, "amountMajorLong": 12, "amountMinorInt": 1200, "amountMinorLong": 1200, "amountMajorInt": 12, "scale": 2, "positive": true }
}