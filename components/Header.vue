<template>
  <div class="header">
    <div class="flex_wrapper">
      <div>mcdonalds</div>
      <div>
        <img class="header_logo" src="http://pngimg.com/uploads/mcdonalds/mcdonalds_PNG5.png" />
      </div>
    </div>

    <div v-if="amount" class="comic_font">${{ amount }}</div>
    <div v-if="amount" class="comic_font">payment for meal</div>
    <div v-if="amount" class="order_id">Order ID: {{ orderId }}</div>
  </div>
</template>

<script>
export default {
  props: ["amount", "orderId"],
};
</script>
<style>
@import url("~/assets/css/header.css");
</style>
