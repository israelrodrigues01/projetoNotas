const popup = document.querySelector('.popup'),
formTitulo = popup.querySelector('.header-popup h3'),
iconFechar = popup.querySelector('i'),
inputTitulo = document.getElementById('title-input'),
inputDescricao = document.getElementById('note-input'),
buttonAdd = document.getElementById('button-add'),
addBtn = document.getElementById('add-box'),
notes = JSON.parse(localStorage.getItem("Notação:") || "[]");

const addCheck = document.getElementById('add-check');

let update  = false, updtadid;

iconFechar.addEventListener('click', fecharPopup);
addBtn.addEventListener('click', abrirPopup)
buttonAdd.addEventListener('click', enviarNote);

// Fechar janela
function fecharPopup()  
{
	popup.classList.remove('open')
	inputTitulo.value = "";
	inputDescricao.value = "";
	formTitulo.innerText = "Nova Notação";
}

// Abrir janela
function abrirPopup()
{
	popup.classList.add('open');
	inputTitulo.focus()
}


// Criar notação HTML
function tagNote()
{
	document.querySelectorAll('.note').forEach(note => note.remove());
	notes.forEach((note, id) =>
	{
		let boxNote = 
		`
		<div class="note"> 
			<div class="header-note">
				<h3>${note.title}</h3>
				<p>${note.descricao}<p>
			</div>
			<div class="footer-note">
				<div class="date">Data: ${note.data}</div>
				<div class="edite-note">
					<i class="bx bx-edit-alt"></i>
					<div class="option-edite">
						<button onclick="atualizar(${id}, '${note.title}', '${note.descricao}')">Editar</button>
						<button onclick="deletar(${id})">Excluir</button>
					</div>
				</div>
			</div>
		</div>
		`;

		addBtn.insertAdjacentHTML("afterend", boxNote);
	})
};
tagNote();

// Envia uma notação
function enviarNote()
{

	let tituloNote = inputTitulo.value;
	let descricaoNote = inputDescricao.value;
	let data = new Date();
	let mes = data.getMonth();
	let dia = data.getDate();

	mes = mes < 10 ? "0" + mes : mes;
	dia = dia < 10 ? "0" + dia : dia;

	let dataNote = dia +" / "+ mes;

	if (tituloNote || descricaoNote) 
	{
		let infor = { title: tituloNote, descricao: descricaoNote, data: dataNote};

		if (!update) 
		{
			notes.push(infor);
		}else
		{
			notes[updtadid] = infor;
		}

		localStorage.setItem("Notação:", JSON.stringify(notes))
	}

	iconFechar.click();
	tagNote()

};

// Deletar notação
function deletar(id)
{
	let aviso = confirm("Tem certeza?")

	if(!aviso) return
	{
		notes.splice(id, 1);

		tagNote();
		localStorage.setItem("Notação:", JSON.stringify(notes));
	}

}

function atualizar(id, titulo, desc)
{
	update  = true;
	updtadid = id;

	inputTitulo.value = titulo;
	inputDescricao.value = desc;

	formTitulo.innerText = "Atualizar Notação";

	addBtn.click();
	localStorage.setItem("Notação:", JSON.stringify(notes));	
}