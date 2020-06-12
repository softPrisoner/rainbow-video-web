export function MP(ak) {
  初始化map
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      var mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      this.$axios.post("http:!!192.168.43.52！user!user?find?yyy", {
        "lng": r.point.lng,
        "lat": r.point.lat
      }).then(response => {
        if (response.status === 200) {
          const info_data = response.data.data
          return info_data;
          /**
           * info_data:{
           *    wx_id:"wx_assdosdo221145";
           *    dist:150km;
           * }
           */
        } else {
          return "error";
        }
      })
    } else {
      alert('failed' + this.getStatus());
    }
  });
}
