document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Impede o reload da página

        // Captura os dados do formulário
        const formData = new FormData(form);
        const data = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password')
        };

        clearErrors();

        // validation

        const isValidPassword = validatePasswords(data.password, data.confirm_password);
        const isValidEmail = validateEmail(data.email);
        const isValidPhone = validatePhone(data.phone);

        if (!isValidPassword || isValidEmail || isValidPhone) return;

        try {
            const response = await fetch('http://localhost:3000/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.fullname,
                    contact: data.phone,
                    active: true,
                    email: data.email       
                })
            });

            if (response.ok) {
                alert('Account successfully created!');
                form.reset(); // limpa o formulário
                clearErrors();
            } else {
                alert('Failed to create account. Please try again.');
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Unable to connect to the server.');
        }
    });
});

function validatePasswords(password, confirmPassword) {
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm_password');

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        passwordInput.classList.add('error');
        confirmInput.classList.add('error');
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        passwordInput.classList.add('error');
        return false;
    }else {
        alert("Account successfully created.");
    }

    return true;
}

function validateEmail(email) {
    const emailInput = document.querySelector('input[name="email"]');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.classList.add('error');
        return false;
    }
    return true;
}

function validatePhone(phone) {
    const phoneInput = document.querySelector('input[name="phone"]');
    const regex = /^[0-9]{10,15}$/;
    if (!regex.test(phone)) {
        alert("Please enter a valid phone number (10 to 15 digits).");
        phoneInput.classList.add('error');
        return false;
    }
    return true;
}

function clearErrors() {
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    })
}