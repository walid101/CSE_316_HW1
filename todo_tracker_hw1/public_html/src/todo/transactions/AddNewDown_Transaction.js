'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, currItemIndex) {
        super();
        this.model = initModel;
        this.currIndex = currItemIndex;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.goDown(this.currIndex);
    }

    undoTransaction() {
        this.model.revertDown(this.currIndex+1);
    }
}