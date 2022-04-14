// Fecchar Popup

const popup = document.querySelector('.popup'),
formTitulo = popup.querySelector('.header-popup h3'),
iconFechar = popup.querySelector('i'),
inputTitulo = document.getElementById('title-input'),
inputDescricao = document.getElementById('note-input'),
buttonAdd = document.getElementById('button-add'),
addNote = document.getElementById('add'),
notes = JSON.parse(localStorage.getItem("Notação:") || "[]");

let update  = false, updtadid;

iconFechar.addEventListener('click', fecharPopup);
addNote.addEventListener('click', abrirPopup);
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
		'<div class="note"> <div class="header-note"><h3>'+note.title+'</h3>'+
		'<p>'+note.descricao+'</p>'+
		'</div><div class="footer-note">'+
		'<div class="date">Day, hora</div><div class="edite-note"><i class="bx bx-edit-alt"></i><div class="option-edite">'+
		'<button onclick="atualizar('+id+')">Editar</button>'+
		'<button onclick="deletar('+id+')">Excluir</button></div></div></div></div>';

		addNote.insertAdjacentHTML("afterend", boxNote);
	})
};
tagNote();

// Envia uma notação
function enviarNote()
{

	let tituloNote = inputTitulo.value;
	let descricaoNote = inputDescricao.value;

	if (tituloNote || descricaoNote) 
	{
		let infor = { title: tituloNote, descricao: descricaoNote};

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
	notes.splice(id, 1);

	tagNote()
	localStorage.setItem("Notação:", JSON.stringify(notes))
}

function atualizar(id)
{
	update  = true;
	updtadid = id;

	formTitulo.innerText = "Atualizar Notação";

	addNote.click();
	localStorage.setItem("Notação:", JSON.stringify(notes));	
}