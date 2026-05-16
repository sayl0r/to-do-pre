let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const tasks = localStorage.getItem('tasks');
	if (tasks) {
		return JSON.parse(tasks);
	}else{
		return items;		
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener('click', function(){
		clone.remove();
		const item = getTasksFromDOM();
		saveTasks(items);
	})
	
	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const item = getTasksFromDOM();
		saveTasks(item)


	})

	editButton.addEventListener('click', () => {
  	textElement.setAttribute('contenteditable', 'true');
 	 textElement.focus();
	});

	textElement.addEventListener('blur', () => {
  		textElement.removeAttribute('contenteditable');
  		saveTasks(getTasksFromDOM());
	});
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach(function(element){
		tasks.push(element.textContent);
	})
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(function(item){
	const newItem = createItem(item);
	listElement.append(newItem);
});

formElement.addEventListener('submit', function(evt) {
	evt.preventDefault();
	const formText = inputElement.value;
	const newItem = createItem(formText);
	listElement.prepend(newItem);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
})