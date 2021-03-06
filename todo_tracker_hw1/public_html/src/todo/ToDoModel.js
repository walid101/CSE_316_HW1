'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import AddNewTask_Transaction from './transactions/AddNewTask_Transaction.js'
import AddNewDue_Transaction from './transactions/AddNewDue_Transaction.js'
import AddNewStat_Transaction from './transactions/AddNewStat_Transaction.js'
import AddNewUp_Transaction from './transactions/AddNewUp_Transaction.js'
import AddNewDown_Transaction from './transactions/AddNewDown_Transaction.js'
import AddNewClose_Transaction from './transactions/AddNewClose_Transaction.js'
/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }
    /**
     * addNewTaskTransaction
     * 
     * Creates a new transaction for a change in task and adds it to the transaction stack
     * @param {*} desc 
     */
    addNewTaskTransaction(itemId, thisDesc, prevDesc)
    {
        let transaction = new AddNewTask_Transaction(this, itemId, thisDesc, prevDesc);
        this.tps.addTransaction(transaction);
    }
    /**
     * addNewDesc
     * 
     * Adds new Description to task area of specified list item and adds it to the transaction stack
     */
    addNewDesc(itemId, desc)
    {
        if(this.currentList!=null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setDescription(desc);
            this.view.viewList(this.currentList, this.toDoLists);
        }
    }
    /**
     * revertDesc
     * 
     */
    revertDesc(itemId, prevDesc)
    {
        if(this.currentList!=null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setDescription(prevDesc);
            this.view.viewList(this.currentList);
        }
    }

    /**
     * addNewDueTransaction
     * 
     */
    addNewDueTransaction(itemId, thisDue, prevDue)
    {
        let transaction = new AddNewDue_Transaction(this, itemId, thisDue, prevDue);
        this.tps.addTransaction(transaction);
    }
    /**
     * addNewDue
     * 
     */
    addNewDue(itemId, currDue)
    {
        if(this.currentList != null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setDueDate(currDue);
            this.view.viewList(this.currentList);
        }
    }
    /**
     * revertDue
     * 
     */
    revertDue(itemId, prevDue)
    {
        if(this.currentList != null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setDueDate(prevDue);
            this.view.viewList(this.currentList);
        }
    }

    /**
     * 
     * addNewStatTransaction(itemId, thisDue, prevDue)
     */
    addNewStatTransaction(itemId, thisDue, prevDue)
    {
        let transaction = new AddNewStat_Transaction(this, itemId, thisDue, prevDue);
        this.tps.addTransaction(transaction);
    }
    /**
     * addNewStat
     * 
     */
    addNewStat(itemId, currStat)
    {
        if(this.currentList != null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setStatus(currStat);
            this.view.viewList(this.currentList);
        }
    }
    /**
     * revertStat
     * 
     */
    revertStat(itemId, prevStat)
    {
        console.log(this.toDoLists.items);
        if(this.currentList != null)
        {
            let currItem = this.currentList.items[itemId];
            currItem.setStatus(prevStat);
            this.view.viewList(this.currentList);
        }
    }
     /**
     * 
     * goUp(this.currIndex);
     */
    addNewUpTransaction(currItemIndex)
    {
        let transaction = new AddNewUp_Transaction(this, currItemIndex);
        this.tps.addTransaction(transaction);
    }
        /**
     * 
     * goUp(this.currIndex)
     */
    goUp(index)
    {
        //Implement the go up part here
        //console.log("up index: " + index);
        if(this.currentList != null)
        {
            let currItems = this.currentList.items;
            let prevItem = currItems[index-1];
            let thisItem = currItems[index];
            currItems[index-1] = thisItem
            currItems[index] = prevItem;
            this.view.viewList(this.currentList);
        }
    }
    /**
     * 
     *revertUp(index)
     */
    revertUp(index)
    {
        //console.log("revert index: " + index);
        if(this.currentList != null)
        {
            let currItems = this.currentList.items;

            let nextItem = currItems[index+1];
            let thisItem = currItems[index];
            currItems[index+1] = thisItem;
            currItems[index] = nextItem;
            this.view.viewList(this.currentList);
        }
    }

    /**
     * 
     * addNewDownTransaction(i)
     */
    addNewDownTransaction(currItemIndex)
    {
        let transaction = new AddNewDown_Transaction(this, currItemIndex);
        this.tps.addTransaction(transaction);
    }
    /**
     * 
     * goDown(index)
     */
    goDown(index)
    {
        if(this.currentList != null)
        {
            let currItems = this.currentList.items;
            let nextItem = currItems[index+1];
            let thisItem = currItems[index];
            currItems[index+1] = thisItem;
            currItems[index] = nextItem;
            this.view.viewList(this.currentList);
        }
    }
    /**
     * 
     * revertDown
     */
    revertDown(index)
    {
        if(this.currentList != null)
        {
            let currItems = this.currentList.items;
            let prevItem = currItems[index-1];
            let thisItem = currItems[index];
            currItems[index-1] = thisItem
            currItems[index] = prevItem;
            this.view.viewList(this.currentList);
        }
    }

    /**
     * 
     * addNewCloseTransaction(itemsList, index)
     */
    addNewCloseTransaction(itemsList, index)
    {
        let transaction = new AddNewClose_Transaction(this, itemsList, index);
        this.tps.addTransaction(transaction);
    }
    /**
     * 
     * closeListItem(currIndex);
     */
    closeListItem(currIndex)
    {
        let currItems = this.currentList.items;
        currItems[currIndex] = null;
        this.view.viewList(this.currentList);
    }
    /**
     * 
     * revertClose(item, currIndex)
     */
    revertClose(item, currIndex)
    {
        let list = this.currentList.items;
        list[currIndex] = item;
        this.view.viewList(this.currentList);
    }
    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        if(this.currentList != null)
        {
            let newItem = new ToDoListItem(this.nextListItemId++);
            this.currentList.items.push(newItem);
            this.view.viewList(this.currentList);
            return newItem;
        }
    }
    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {//highlight current list!
        let addListBtn = document.getElementById("add-list-button");
        let closeBtn = document.getElementById("close-list-button");
        let delBtn = document.getElementById("delete-list-button");
        let addBtn = document.getElementById("add-item-button");

        closeBtn.style.color = '#FFFFFF';
        delBtn.style.color = '#FFFFFF';
        addBtn.style.color = '#FFFFFF';
        addListBtn.style.color = '#000000';

        addListBtn.disabled = true;
        closeBtn.disabled = false;
        delBtn.disabled = false;
        addBtn.disabled = false;
        
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            let lists = this.toDoLists;
            let tempList = lists[0];
            lists[0] = listToLoad;
            lists[listIndex] = tempList;
            this.view.viewListAlt(this.currentList, this.toDoLists.length);
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }
    /**
     * 
     * closeList()
     */
    closeList()
    {
        /**
         * Grey Out Certain Elements (FPD - Fool Proof Design)
         */
        let addListBtn = document.getElementById("add-list-button");
        let closeBtn = document.getElementById("close-list-button");
        let delBtn = document.getElementById("delete-list-button");
        let addBtn = document.getElementById("add-item-button");

        closeBtn.style.color = '#000000';
        delBtn.style.color = '#000000';
        addBtn.style.color = '#000000';
        addListBtn.style.color = '#ffffff';
        
        closeBtn.disabled = true;
        delBtn.disabled = true;
        addBtn.disabled = true;
        addListBtn.disabled = false;

        //console.log("del button disables? " + closeBtn.attributes.disabled);
        let grid = document.getElementById("todo-list-items-div");
        let currList = document.getElementById("todo_list_" + this.currentList.id);
        currList.style.background = '#40454e';
        let list = this.currentList.items;
        for(let i = 0; i<list.length; i++)
        {
            //use .remove() to remove items
            let itemIndex = list[i].id;
            let listElem = document.getElementById("todo-list-item-" + itemIndex);
            //console.log(listElem);
            grid.removeChild(listElem);
        }
        this.tps.clearAllTransactions();
    }
    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 
}