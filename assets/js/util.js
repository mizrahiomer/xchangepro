const util = {
  formatMoney(number, decPlaces, decSep, thouSep) {
    (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === "undefined" ? "." : decSep);
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces
        ? decSep +
          Math.abs(number - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  },
  createParamsArray(cryptoCurrencies, cuurency, merchant_id) {
    let req_rates_params_array = [];

    Object.keys(cryptoCurrencies).map(supported_currency => {
      let param = `currencies[]=${cuurency}_${supported_currency}`;
      req_rates_params_array.push(param);
    });

    req_rates_params_array.push(`merchant_id=${merchant_id}`);

    return req_rates_params_array.join("&");
  },
  createCurrenciesOptions(rates, supported_currencies, currency, amount) {
    const supported_currencies_names = Object.keys(supported_currencies);
    const supported_currencies_array = [];
    supported_currencies_names.forEach(supported_currency => {
      let key = `${currency}_${supported_currency}`;
      for (let rate in rates) {
        if (rate === key) {
          supported_currencies_array.push({
            symbol: supported_currency,
            name: supported_currencies[supported_currency].currency_name,
            total: amount / rates[rate]
          });
        }
      }
    });

    return supported_currencies_array;
  }
};

export default util;
