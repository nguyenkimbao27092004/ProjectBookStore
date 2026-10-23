
//  tang giam so luong don hang
document.addEventListener("DOMContentLoaded", function() {
    const minusButton = document.querySelector(".minus-btn");
    const plusButton = document.querySelector(".plus-btn");
    const quantityInput = document.querySelector(".quantity-input");
  
    minusButton.addEventListener("click", function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        value--;
        quantityInput.value = value;
      }
    });
  
    plusButton.addEventListener("click", function() {
      let value = parseInt(quantityInput.value);
      value++;
      quantityInput.value = value;
    });
  });

  
// Cho phép đặt từ ngày hiện tại
  document.addEventListener("DOMContentLoaded", function() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementById("delivery-date").setAttribute("min", today);
  });
  
  function addToCart(event) {
    event.preventDefault();
    event.target.innerHTML = "<a>Đã thêm vào giỏ hàng</a>";
}



                                                                            //Slide hinh
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
                                                                    //    video background
  function resizeVideo() {
    var video = document.getElementById('background-video');
    var container = document.getElementById('background-video-container');
    var aspectRatio = video.videoWidth / video.videoHeight;

    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;
    var containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > aspectRatio) {
        video.style.width = '100%';
        video.style.height = 'auto';
    } else {
        video.style.width = 'auto';
        video.style.height = '100%';
    }
}
window.onload = function() {
    resizeVideo();
};

window.onresize = function() {
    resizeVideo();
};

                                                                            //Tat mo am thanh
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('background-video');
    var toggleSoundBtn = document.getElementById('toggle-sound-btn');

    toggleSoundBtn.addEventListener('click', function () {
        if (video.muted) {
            video.muted = false; // Bật âm lượng
            toggleSoundBtn.classList.remove('sound-off');
            toggleSoundBtn.classList.add('sound-on');
        } else {
            video.muted = true; // Tắt âm lượng
            toggleSoundBtn.classList.remove('sound-on');
            toggleSoundBtn.classList.add('sound-off');
        }
    });
});

// Hover vao bxh 
document.addEventListener('DOMContentLoaded', function () {
  const hoverables = document.querySelectorAll('.hoverable');
  const firstSach = document.querySelector('.sach1');

  hoverables.forEach(function (hoverable, index) {
    const sach = document.querySelector(`.sach${index + 1}`);
    hoverable.addEventListener('mouseover', function () {
      firstSach.classList.remove('show');
      sach.classList.add('show');
    });

    hoverable.addEventListener('mouseout', function () {
      sach.classList.remove('show');
      firstSach.classList.add('show');
    });
  });
  
  firstSach.classList.add('show');
});


