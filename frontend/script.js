const API_USER = 'http://127.0.0.1:5000/users';

const formUser = document.querySelector("#form_user");

// Vamos trabalhar populando a tabela
const userTable = document.querySelector("#corpoTabela");


// Esse é o nosso GET - select
async function fetchUsers() {
    try {
        // Fazendo a requisição para a API usando API_USER
        const response = await fetch(API_USER); // 
        // Verifica se esta acessando corretamente
        if (!response.ok) {
            console.error("Erro ao buscar usuários:", response.status);
            return;
        }

        // Obtendo os dados no formato JSON
        const users = await response.json();
        console.log(users);

        // Limpa a tabela e preenche com os dados retornados
        userTable.innerHTML = '';
        users.forEach(user => {
            console.log(user);
            userTable.innerHTML += `
                <tr>
                    <td>${user.nome}</td>
                    <td>
                    <button onclick=editUser(${user.id},${user.nome})  >Editar</button>
                    <button>Deletar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
} // Final da função fetchUsers

// Aqui inicia o nosso POST
formUser.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o reload da página no submit
    const user = {nome: document.querySelector("#name").value};
    try {
        // Enviando dados para a API
        await fetch(API_USER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });  
        formUser.reset();
    } catch (error) {
        console.error("Erro ao enviar usuário:", error);
    }
    fetchUsers()
});


fetchUsers();
