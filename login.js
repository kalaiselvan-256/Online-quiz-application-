
function qs(id) { return document.getElementById(id); }

function showAlert(msg) {

    alert(msg);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = qs('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = qs('name').value.trim();
        const email = qs('email').value.trim().toLowerCase();
        const password = qs('password').value;

        if (!name || !email || !password) {
            showAlert('Please fill all fields');
            return;
        }


        const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRe.test(email)) {
            showAlert('Please enter a valid email address');
            return;
        }

        const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email);

        if (!user) {
            showAlert('No account found with that email. Please sign up first.');

            return;
        }

 
        if (user.password !== password) {
            showAlert('Incorrect password. Please try again.');
            return;
        }

    
        localStorage.setItem('quizUser', JSON.stringify({ name: user.name, email: user.email }));

        window.location.href = 'quiz.html';
    });
});     