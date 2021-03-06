'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemsList, currItemIndex) {
        super();
        this.model = initModel;
        this.items = itemsList;
        this.currIndex = currItemIndex;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.closeListItem(this.currIndex);
    }

    undoTransaction() {
        this.model.revertClose(this.items, this.currIndex);
    }
}