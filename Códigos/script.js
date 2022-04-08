// Fecchar Popup

const formPopup = document.querySelector('.form-popup'),
iconFechar = formPopup.querySelector('i'),
inputTitulo = document.getElementById('title-input'),
inputDescricao = document.getElementById('note-input'),
buttonAdd = document.getElementById('button-add'),
addNote = document.getElementById('add'),
notes = JSON.parse(localStorage.getItem("Notação:") || "[]");


iconFechar.addEventListener('click', fecharPopup);
addNote.addEventListener('click', abrirPopup);
buttonAdd.addEventListener('click', enviarNote);

function fecharPopup()
{
	formPopup.classList.remove('open')
	inputTitulo.value = "";
	inputDescricao.value = "";
}

function abrirPopup()
{
	formPopup.classList.add('open')
}

function enviarNote()
{

	let tituloNote = inputTitulo.value;
	let descricaoNote = inputDescricao.value;

	if (tituloNote || descricaoNote) 
	{
		let infor = { title: tituloNote, descricao: descricaoNote};
		notes.push(infor);

		localStorage.setItem("Notação:", JSON.stringify(notes))
	}

	iconFechar.click();
	tagNote()

};

function tagNote()
{

	document.querySelectorAll('.note').forEach(note => note.remove());

	notes.forEach((note) =>
	{
		let boxNote = 
		'<div class="note"> <div class="header-note"><h3>'+note.title+'</h3>'+
		'<p>'+note.descricao+'</p>'+
		'</div><div class="footer-note">'+
		'<div class="date">Day, hora</div><div class="edite-note"><i class="bx bx-edit-alt"></i><div class="option-edite">'+
		'<button>Editar</button>'+
		'<button>Excluir</button></div></div></div></div>';

		addNote.insertAdjacentHTML("afterend", boxNote);
	})
};

tagNote();