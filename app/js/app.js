import $, { data } from "jquery";
import "slick-carousel";

// fetch get answer
const requestUrl = "https://yesno.wtf/api";
async function sendRequest(method, url) {
  const fetchData = await fetch(url);
  const responseData = await fetchData.json();
  return console.log(JSON.stringify(responseData));
}

// Rendering map from bimg map
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
  // rending map
  centerMap(GetMap());
  $(".complete__list").slick({
    arrows: false,
    infinite: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  });

  // add slider
  $(".slider__wrapper").slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  // get answer from server
  sendRequest("GET", requestUrl);

  //add preview file to form
  const fileData = document.getElementById("formFile");
  const filePreview = document.querySelector(".task__form-name");

  fileData.addEventListener("change", () => {
    uploadFile(fileData.files[0]);
  });

  function uploadFile(file) {
    if (
      ![
        "image/jpg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Разрешены изображения и файлы");
      fileData.value = "";
      return;
    }

    let readerData = new FileReader();
    readerData.onload = function (event) {
      filePreview.innerHTML = `${file.name} <div class="form__file-delete">x</div>`;
    };
    readerData.readAsDataURL(file);

    filePreview.addEventListener("click", function (event) {
      const delBtn = document.querySelector(".form__file-delete");
      if (event.target === delBtn) {
        setTimeout(() => {
          fileImg.value = "";
          filePreview.innerHTML = "Прикрепите ТЗ";
        }, 150);
      }
    });
  }

  // add preview img to form

  const fileImg = document.getElementById("formImg");
  const imgPreview = document.getElementById("form__preview-img");
  const imgLabel = document.querySelector(".task__form-text--photo");

  fileImg.addEventListener("change", () => {
    uploadImg(fileImg.files[0]);
  });

  function uploadImg(file) {
    if (!["image/jpg", "image/png", "image/gif"].includes(file.type)) {
      alert("Разрешены только изображения");
      fileImg.value = "";
      return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
      imgLabel.style.marginBottom = 0;
      imgPreview.innerHTML = `<img src="${event.target.result}"><div class="form__img-del">x</div>`;
    };
    reader.readAsDataURL(file);

    imgPreview.addEventListener("click", function (event) {
      const del = document.querySelector(".form__img-del");
      if (event.target === del) {
        setTimeout(() => {
          fileImg.value = "";
          imgPreview.innerHTML = "";
          imgLabel.style.marginBottom = 14 + "rem";
        }, 100);
      }
    });
  }
});
