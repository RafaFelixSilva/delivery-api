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

        try {
            const response = await fetch('http://localhost:3000/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Cadastro realizado:', result);
                alert('Conta criada com sucesso!');
                form.reset(); // limpa o formulário
            } else {
                console.error('Erro na criação:', response.statusText);
                alert('Erro ao criar conta.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro de conexão com o servidor.');
        }
    });
});