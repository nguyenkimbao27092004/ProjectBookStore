// Tự động đổi màu menu (class active) theo trang hiện tại
document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.href.split('?')[0].split('#')[0];
    const menuLinks = document.querySelectorAll('.menu li a');

    menuLinks.forEach(link => {
        // Xóa class active mặc định
        link.classList.remove('active');
        
        // Lấy đường dẫn gốc gõ trong HTML
        const rawHref = link.getAttribute('href');
        
        // Bỏ qua (không thắp sáng) nếu đây là link nhảy đến thẻ id (như #footer_content)
        if (rawHref && rawHref.startsWith('#')) {
            return;
        }
        
        // Nếu href khớp với URL hiện tại thì thêm class active
        if (link.href.split('?')[0].split('#')[0] === currentUrl) {
            link.classList.add('active');
        }
    });
});

//  tang giam so luong don hang
document.addEventListener("DOMContentLoaded", function() {
    const minusButton = document.querySelector(".minus-btn");
    const plusButton = document.querySelector(".plus-btn");
    const quantityInput = document.querySelector(".quantity-input");
  
    if(minusButton && plusButton && quantityInput) {
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
    }
});
  
// Cho phép đặt từ ngày hiện tại
document.addEventListener("DOMContentLoaded", function() {
    var today = new Date().toISOString().split("T")[0];
    var deliveryDate = document.getElementById("delivery-date");
    if(deliveryDate) {
        deliveryDate.setAttribute("min", today);
    }
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
    
    if(!video || !container) return; // Tránh lỗi nếu trang không có video

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

    if(video && toggleSoundBtn) {
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
    }
});

// Hover vao bxh 
document.addEventListener('DOMContentLoaded', function () {
  const hoverables = document.querySelectorAll('.hoverable');
  const firstSach = document.querySelector('.sach1');

  if(firstSach && hoverables.length > 0) {
      hoverables.forEach(function (hoverable, index) {
        const sach = document.querySelector(`.sach${index + 1}`);
        hoverable.addEventListener('mouseover', function () {
          firstSach.classList.remove('show');
          if(sach) sach.classList.add('show');
        });

        hoverable.addEventListener('mouseout', function () {
          if(sach) sach.classList.remove('show');
          firstSach.classList.add('show');
        });
      });
      
      firstSach.classList.add('show');
  }
});
$(document).ready(function() {
    // Kiểm tra xem đã có dữ liệu đăng nhập chưa
    const token = localStorage.getItem("kobosToken");
    const username = localStorage.getItem("kobosUsername");

    if (token && username) {
        // Tìm biểu tượng user ở phần Header
        const userIcon = $(".icons a[href='../html/signin.html']");
        
        if (userIcon.length > 0) {
            // Thay icon bằng tên người dùng
            userIcon.removeClass("bi-person-circle");
            userIcon.html(`<span style="font-size: 15px; font-weight: bold; margin-left: 5px;">Xin chào, ${username}</span>`);
            userIcon.attr("href", "#"); // Hủy link sang trang đăng nhập
            userIcon.css("text-decoration", "none");

            // Xử lý sự kiện Đăng xuất khi click vào tên
            userIcon.click(function(e) {
                e.preventDefault();
                if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                    localStorage.removeItem("kobosToken");
                    localStorage.removeItem("kobosUsername");
                    window.location.reload(); // Tải lại trang để xóa trạng thái
                }
            });
        }
    }
});

// Fetch dữ liệu từ Backend
fetch('http://localhost:3000/api/books')
    .then(response => response.json())
    .then(books => {
        console.log("Thành công! Đây là dữ liệu sách từ MongoDB:", books);
    })
    .catch(error => console.error('Lỗi khi gọi API:', error));