import DropZone from "DropZone.js";
import ProgramAPI from "./api/programapi.js";

export default class Item {
	constructor(id, content) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".program__item-input");

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
		this.elements.root.appendChild(bottomDropZone);

		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			if (newContent == this.content) {
				return;
			}

			this.content = newContent;

			ProgramAPI.updateItem(id, {
				content: this.content
			});
		};

		this.elements.input.addEventListener("blur", onBlur);
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Are you sure you want to delete this item?");

			if (check) {
				ProgramAPI.deleteItem(Item);

				this.elements.input.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});

		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="program__item" draggable="true">
				<div class="program__item-input" contenteditable></div><i class="fa-solid fa-trash-xmark delete__button"></i>
			</div>
		`).children[0];
	}
}
