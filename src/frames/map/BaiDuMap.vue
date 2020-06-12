<template>
  <!--地图容器-->
  <div id="XSDFXPage" class="XSDFXPage"></div>
</template>
<script>
  export default {
    name: "BaiDuMap",
    data() {
      return {}
    },
    mounted() {
      // 百度地图API功能
      // 创建Map实例
      var map = new BMap.Map("XSDFXPage", {enableMapClick: true});
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(116.4035, 39.915), 11);
      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl());
      // 设置地图显示的城市 此项是必须设置的
      map.setCurrentCity("杭州");
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);
      // 设置定时器，对地图进行自动移动
      setTimeout(function () {
        map.panTo(new BMap.Point(113.262232, 23.154345));
      }, 2000);
    }
  }
</script>

<style scoped>

</style>
