<template>
  <div class="payment-choices">
    <PaymentOption
      v-if="currencies_options_array.length >= lim"
      v-for="lim in limits"
      :key="currencies_options_array[lim - 1].name"
      :name="currencies_options_array[lim - 1].name"
      :symbol="currencies_options_array[lim - 1].symbol"
      :total="currencies_options_array[lim - 1].total"
    />
    <div
      v-if="currencies_options_array.length > limits"
      class="payment-more-option"
    >
      <h2>More Coin Options</h2>
      <span v-on:click="limits += limits" class="icon arrow-bottom"></span>
    </div>
  </div>
</template>

<script>
import util from "~/assets/js/util";
export default {
  props: ["rates", "supported_currencies"],
  data({ $props, $route }) {
    const { rates, supported_currencies } = $props;
    const { amount, currency } = $route.query;

    const currencies_options_array = util.createCurrenciesOptions(
      rates,
      supported_currencies,
      currency,
      amount
    );

    return {
      currencies_options_array,
      limits: 3
    };
  }
};
</script>

<style>
@import url("~/assets/css/paymentChoices.css");
</style>
