'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import ToDoList from '../../todo/ToDoList.js'
import ToDoListItem from '../../todo/ToDoListItem.js'
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, currDescription, prevDescription) {
        super();
        this.model = initModel;
        this.currDesc = currDescription;
        this.prevDesc = prevDescription;
        this.itemId = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.addNewDesc(this.itemId, this.currDesc);
    }

    undoTransaction() {
        this.model.revertDesc(this.itemId, this.prevDesc);
    }
}