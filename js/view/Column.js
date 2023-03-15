import ProgramAPI from "../api/programapi.js";
import DropZone from "./DropZone.js" ;
import Item from "./Item.js"

export default class Column{
    constructor(id, title){
        const topDropZone = DropZone.createDropZone();

        this.elements= {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".program__column-title");
        this.elements.items = this.elements.root.querySelector(".program__column-items");
        this.elements.addItem = this.elements.root.querySelector(".program__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            const newItem = ProgramAPI.insertItem(id, "");

            this.renderItem(newItem);
        });

        ProgramAPI.getItems(id).forEach(item => {
            this.renderItem(item);
        });
    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="program__column">
                <div class="program__column-title"></div>
                <div class="program__column-items"></div>
                <button class="program__add-item" type="button"><a class="fa-regular fa-pen-to-square"></a></button>
            </div>
        `).children[0];
    }
    
    renderItem(data) {
        const item = new Item(data.id, data.content);
        
        this.elements.items.appendChild(item.elements.root);
    }
}