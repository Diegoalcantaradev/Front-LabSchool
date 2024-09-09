const url = "http://localhost:3000/api"

function getCursos(){
    axios.get(`${url}/curso`).then(
        (response) => {
            const data = response.data.result

            let html = "<option disabled selected>selecione uma opção</option>"

            for(let curso of data){
                html += `<option value=${curso.id}>${curso.nome}</option>`
            }
            document.getElementById('select-course').innerHTML = html
        }
    ).catch(err => console.error(err))
}