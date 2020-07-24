<template>
  <div class="wrraper">
    <Header :amount="displayedAmount" :orderId="orderId" />
    <main class="page-content">
      <div class="container">
        <div class="payment_info">
          Complete your payment by sending {{ name }}({{ symbol }}) amount to
          the address listed below
        </div>
        <div class="container_inner">
          <div class="label">Amount of {{ name }}({{ symbol }}) to Send</div>
          <input class="input" disabled :value="total" />
          <div class="label">Address</div>
          <input class="input" disabled :value="address" />
          <button class="showQr" @click="showQr = true">Show QR code instead</button>
        </div>

        <div class="qr" v-if="showQr">
          <img :src="qr" />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import util from "~/assets/js/util";
export default {
  async asyncData({ $axios, params, query }) {
    const { merchant_id, transaction_id } = query;
    const { qr, total, name, symbol, amount, currency } = params;
    const res = await $axios.post(
      `/transaction/status?transaction_id=${transaction_id}&merchant_id=${merchant_id}`
    );

    const address =
      res.data.request_details.transactions[0].data.currency_1_address;
    const displayedAmount = `${util.formatMoney(Number(amount))} ${currency}`;
    const orderId = transaction_id.substring(0, 8);

    return {
      qr,
      total,
      name,
      symbol,
      address,
      showQr: false,
      displayedAmount,
      orderId,
    };
  },
};
</script>
<style>
@import url("~/assets/css/payment.css");
</style>
