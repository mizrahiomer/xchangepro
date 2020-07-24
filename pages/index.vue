<template>
  <div class="wrraper">
    <Header :amount="displayedAmount" :orderId="orderId" />
    <main class="page-content">
      <div class="container">
        <div class="info">
          SELECT COIN FOR PAYMENT
        </div>
        <PaymentChoices
          :rates="rates"
          :supported_currencies="supported_currencies"
        />
      </div>
    </main>
  </div>
</template>

<script>
import util from "~/assets/js/util";
export default {
  async asyncData({ $axios, query, app, redirect, store }) {
    let { merchant_id, amount, currency } = query;
    if (!merchant_id || merchant_id === "") {
      return redirect("/error");
    }

    const displayedAmount = `${util.formatMoney(Number(amount))} ${currency}`;

    let res = await $axios.post(`/currencies?merchant_id=${merchant_id}`);
    const supported_currencies = res.data.request_details;

    const q = util.createParamsArray(
      res.data.request_details,
      currency,
      merchant_id
    );

    res = await $axios.post(`/rates?${q}`);
    const rates = res.data.request_details;

    res = await $axios.post(`/transaction?merchant_id=${merchant_id}`);

    const orderId = res.data.request_details.transaction_token.substring(0, 8);
    return {
      displayedAmount,
      rates,
      supported_currencies,
      orderId
    };
  }
};
</script>
<style>
@import url("~/assets/css/index.css");
</style>
