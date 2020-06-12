<template>
  <div>
  <mt-search v-model="value">
    <mt-cell
      v-for="item in result"
      :title="item.title"
      :value="item.value">
    </mt-cell>
  </mt-search>

  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>
