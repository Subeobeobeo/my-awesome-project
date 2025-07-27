// Đảm bảo code chỉ chạy sau khi toàn bộ trang đã được tải
document.addEventListener('DOMContentLoaded', function() {

    // --- XỬ LÝ GỬI FORM BÁO CÁO ---
    const contactForm = document.getElementById('contact-form');
    const notification = document.getElementById('notification');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const reportTitle = document.getElementById('name').value;
        showNotification(`Cảm ơn bạn! Báo cáo "${reportTitle}" đã được gửi thành công.`);
        contactForm.reset();
    });

    // --- XỬ LÝ CLICK VÀO CÁC THẺ TÍNH NĂNG ---
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('h3').textContent;
            showNotification(`Tính năng "${featureName}" đang được phát triển!`);
        });
    });


    // --- HÀM HIỂN THỊ THÔNG BÁO CHUNG ---
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
});
