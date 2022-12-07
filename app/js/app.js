import $ from "jquery";
import "slick-carousel";

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
  $(".complete__list").slick({
    arrows: false,
    infinite: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  });
  $(".slider__wrapper").slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
