'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import ToDoList from '../../todo/ToDoList.js'
import ToDoListItem from '../../todo/ToDoListItem.js'
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, currDue, prevDue) {
        super();
        this.model = initModel;
        this.currDue = currDue;
        this.prevDue = prevDue;
        this.itemId = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.addNewDue(this.itemId, this.currDue);
    }

    undoTransaction() {
        this.model.revertDue(this.itemId, this.prevDue);
    }
}