function GetMap() {
  let map = new Microsoft.Maps.Map("#myMap");
  map.setView({
    zoom: 17,
  });
  let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
  map.entities.push(pushpin);
  return map;
}
function centerMap(map) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        center: new Microsoft.Maps.Location(lat, long),
      });
    },
    function (error) {
      alert(JSON.stringify(error));
    },
    {
      enableHighAccuracy: true,
    }
  );
}

window.addEventListener("load", () => {
  centerMap(GetMap());
});
