<template>
  <div style="margin: 0%;padding: 0%">
    <img src="../../../../images/wx_login_ani.jpg" height="100%" width="100%">
  </div>
</template>
<script>
  export default {
    name: "before",
    data() {
      return {}
    },
    mounted() {
      setTimeout(() => {
        this.$router.push("/login")
      }, 3000)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../style/public";

</style>
