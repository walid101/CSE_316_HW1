'use strict'

import AddNewItem_Transaction from "./transactions/AddNewItem_Transaction.js";

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.setAttribute("z-index", -1);
        let textElement = document.createElement("textarea");
        textElement.value = newList.name; 
        textElement.className = "inputBox";
        textElement.id = "todo_list_"+newList.id;
        textElement.onchange = function () {
            newList.name = textElement.value;
            console.log(newList.name);
        }
        //listElement.appendChild(document.createTextNode(newList.name));
        listElement.appendChild(textElement);
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }
    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }
    viewListAlt(list, len)
    {
        for(let i = 0; i<len; i++)
        {
            let currList = document.getElementById("todo_list_" + i);
            if(currList!=null)
            {
                if(i == list.id)
                {
                    currList.style.background = '#353a44';
                }
                else
                {
                    currList.style.background = '#40454e';
                }
            }
        }
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        for (let i = 0; i < list.items.length; i++) {
            let listItem = list.items[i];
            if(listItem != null)
            {
                let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                    + "<div class='task-col'>" + "<input type='text' id='desc-"+list.id+"-"+listItem.id + "' value = '"+listItem.description+"' class = 'inputBox'>"
                                    +"</div>"
                                    + "<div class='task-col'>" + "<input type='date' id='due-"+list.id+"-"+listItem.id + "' value = '"+listItem.dueDate+"' class = 'inputBox'>"
                                    +"</div>"
                                    + "<div class='status-col'>" + 
                                    "<select id ='stat-"+list.id+"-"+listItem.id+"' class = 'inputBox' value = '"+listItem.status+"'>"
                                        + "<option selected>"+listItem.status+"</option>"
                                        + "<option value = 'complete' style = 'color: #add8e6'>complete</option>"
                                        + "<option value = 'incomplete' style = 'color: #FF7F50'>incomplete</option>"
                                        + "</select>"
                                    + "</div>"
                                    + "<div class='list-controls-col'>"
                                    + " <div id = 'up-"+list.id + "-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                    + " <div id = 'down-"+list.id + "-"+listItem.id+"'class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                    + " <div id = 'close-"+list.id + "-"+listItem.id+"'class='list-item-control material-icons'>close</div>"
                                    + " <div class='list-item-control'></div>"
                                    + " <div class='list-item-control'></div>"
                                    + "</div>";
                itemsListDiv.innerHTML += listItemElement;
            }
        }
        //this.controller.setSelectCol(list);
        this.controller.setViewControls(list);
    }
    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        for (let i = 0; i < list.items.length; i++) {
            let listItem = list.items[i];
            if(listItem != null)
            {
                let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                    + "<div class='task-col'>" + "<input type='text' id='desc-"+list.id+"-"+listItem.id + "' value = '"+listItem.description+"' class = 'inputBox'>"
                                    +"</div>"
                                    + "<div class='task-col'>" + "<input type='date' id='due-"+list.id+"-"+listItem.id + "' value = '"+listItem.dueDate+"' class = 'inputBox'>"
                                    +"</div>"
                                    + "<div class='status-col'>" + 
                                    "<select id ='stat-"+list.id+"-"+listItem.id+"' class = 'inputBox' value = '"+listItem.status+"'>"
                                        + "<option selected id = 'stat-op-"+list.id+"-"+listItem.id+"'>"+listItem.status+"</option>"
                                        + "<option value = 'complete' style = 'color: #add8e6'>complete</option>"
                                        + "<option value = 'incomplete' style = 'color: #FF7F50'>incomplete</option>"
                                        + "</select>"
                                    + "</div>"
                                    + "<div class='list-controls-col'>"
                                    + " <div id = 'up-"+list.id + "-"+listItem.id+"' class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                    + " <div id = 'down-"+list.id + "-"+listItem.id+"'class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                    + " <div id = 'close-"+list.id + "-"+listItem.id+"'class='list-item-control material-icons'>close</div>"
                                    + " <div class='list-item-control'></div>"
                                    + " <div class='list-item-control'></div>"
                                    + "</div>";
                itemsListDiv.innerHTML += listItemElement;
            }
        }
        //this.controller.setSelectCol(list);
        this.controller.setViewControls(list);
    }
    saveListContent(list)
    {
        //console.log(list.items.length);
        for(let i = 0; i<list.items.length; i++)
        {
            let listItem = list.items[i];
            let listDesc = document.getElementById("desc-"+list.id+"-"+listItem.id).value;
            //console.log(listDesc);
            let listDue = document.getElementById("due-"+list.id+"-"+listItem.id).value;
            //let listStat = ...
            let listStat = document.getElementById("stat-"+list.id+"-"+listItem.id).value;
            listItem.description = listDesc;
            listItem.dueDate = listDue;
            listItem.status = listStat;
        }
        
    }
    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}