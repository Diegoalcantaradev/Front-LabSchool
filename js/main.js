    const url = "http://localhost:3000/api"

function getCursos() {
    axios.get(`${url}/curso`).then(
        (response) => {
            const data = response.data.result

            let html = "<option disabled selected>selecione uma opção</option>"

            for (let curso of data) {
                html += `<option value=${curso.id}>${curso.nome}</option>`
            }
            document.getElementById('select-course').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function getAlunos() {
    axios.get(`${url}/aluno`).then(
        (response) => {
            const data = response.data.result

            let html = ""

            for (let aluno of data) {
                html += `<tr>
                <th scope="row">${aluno.id}</th>
                <td>${aluno.nome}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.email}</td>
                <td><button class="btn btn-success" onclick="redirect(${aluno.id})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="deleteAluno(${aluno.id})">Excluir</button></td>
                </tr>`
            }
            document.getElementById('table-body').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function deleteAluno(codigo) {
    axios.delete(`${url}/aluno/${codigo}`).then(
        (response) => {
            alert(response.data.result)
            getAlunos()
        }
    ).catch(err => console.error(err))
}

function saveAluno() {
    let image = document.getElementById('uploadImage').files[0]
    let nome = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let telefone = document.getElementById('inputPhone').value
    let data_nascimento = document.getElementById('inputData').value

    let select = document.getElementById('select-course')
    let option = select.options[select.selectedIndex].value

    const data = {
        image: image,
        nome: nome,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
        curso: option
    }

    axios.post(`${url}/aluno`, data, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then((response) => {
        alert(` ${response.data.result}`)
        window.location.href = "http://localhost/LabSchool/matricula-aula.html"
    }
    ).catch(err => console.error(err))
}

function redirect(id) {
    window.location.href = `http://localhost/LabSchool/atualizar-cadastro.html?id=${id}`
}

function loadfields() {
    //Capturar o parametro 'id' na URL
    //get(): obter o valor de um parametro especifico
    let params = new URLSearchParams(window.location.search)
    let idParams = params.get('id')

    axios.get(`${url}/aluno/${idParams}`).then(
        (response) => {
            const data = response.data.result

            document.getElementById("inputNome").value = data.nome
            document.getElementById("inputGmail").value = data.email
            document.getElementById("inputPhone").value = data.telefone

            const [date, time] = data.data_nascimento.split('T')

            document.getElementById("inputData").value = date
        }
    ).catch(err => console.error(err))
}
function updateAluno(){
    let image = document.getElementById('uploadImage').files[0]
    let nome = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let telefone = document.getElementById('inputPhone').value
    let data_nascimento = document.getElementById('inputData').value

    const data = {
        image: image,
        nome: nome,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
    }
    axios.put(`${url}/aluno/${idParams}`,data,{
        headers: {
            'content-type': 'multipart/from-data'
        }
    }).then(
        (response) => {
            alert(response.data.result)
            window.location.href = "http://localhost/LabSchool/index.html"
        }
    ).catch(err => console.error.err)
}
