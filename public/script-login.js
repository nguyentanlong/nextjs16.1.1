// Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // Add entrance animation to login card
//     const loginCard = document.querySelector('.login-card');
//     FormUtils.addEntranceAnimation(loginCard);

//     // Initialize the login form
//     new LoginForm1();
// });
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("passwordToggle");

if (passwordInput && toggleBtn) toggleBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // đổi icon
    toggleBtn.textContent = type === "password" ? "👁️" : "🙈";
});

// Handle page visibility changes for better UX
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-focus on email field if user returns to page
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName !== 'INPUT') {
            const emailInput = document.querySelector('#email');
            if (emailInput && !emailInput.value) {
                setTimeout(() => emailInput.focus(), 100);
            }
        }
    }
});