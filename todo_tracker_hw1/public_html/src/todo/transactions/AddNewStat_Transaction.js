'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import ToDoList from '../../todo/ToDoList.js'
import ToDoListItem from '../../todo/ToDoListItem.js'
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewStat_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, currStat, prevStat) {
        super();
        this.model = initModel;
        this.currStat = currStat;
        this.prevStat = prevStat;
        this.itemId = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.addNewStat(this.itemId, this.currStat);
    }

    undoTransaction() {
        this.model.revertStat(this.itemId, this.prevStat);
    }
}