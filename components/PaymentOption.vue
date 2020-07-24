<template>
  <div class="payment-option" @click="getPayment()">
    <div class="amount">{{ name.toUpperCase() }} ({{ symbol }})</div>
    <div class="logo">
      <img :src="require(`@/assets/images/${symbol}.png`)" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "symbol", "total"],
  methods: {
    async getPayment() {
      const { name, symbol, img, total } = this.$props;
      let { merchant_id, currency, amount } = this.$route.query;

      const res = await this.$axios.post(
        `/transaction?merchant_id=${merchant_id}&currency_1_iso=${symbol}&currency_1_amount=${total}&currency=${currency}&amount=${amount}`
      );

      const transaction_id = res.data.request_details.transaction_token;
      const qr = res.data.request_details.qr;

      this.$router.push({
        name: "payment",
        query: { merchant_id, transaction_id },
        params: { qr, total, name, symbol, amount, currency },
      });
    },
  },
};
</script>

<style>
@import url("~/assets/css/paymentOption.css");
</style>
