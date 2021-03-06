'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            if(document.getElementById("add-list-button").disabled == false)
            {
                appModel.addNewList();
            }
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            //ACTIVATE MODAL HERE!
            if(document.getElementById("delete-list-button").disabled == false)
            {
                let modalPop = document.getElementById("delete_modal");
                modalPop.style.display = 'block';//since we clicked on the trash icon we want to show modal
                let closeBtn =  document.getElementById("xBtn");
                let yesBtn = document.getElementById("yBtn");
                closeBtn.onmousedown = function () {
                    modalPop.style.display = 'none';
                }
                yesBtn.onmousedown = function () {
                    modalPop.style.display = 'none';
                    if(appModel.currentList != null)
                    {
                        appModel.removeCurrentList();
                    }
                }
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            if(document.getElementById("add-item-button").disabled == false)
            {
                appModel.addNewItemTransaction();
            }
        }  
        document.getElementById("close-list-button").onmousedown = function () {
            //console.log("close the List!");
            if(document.getElementById("close-list-button").disabled == false)
            {
                appModel.closeList();
            }
        }
    }
    setSelectCol(list)
    {
        for(let i = 0; i<list.items.length; i++)
        {
            let listItem = list.items[i];
            let currOp = document.getElementById("stat-op-"+list.id+"-"+listItem.id);
            if(listItem.status === 'completed')
            {
                currOp.style.color = '#add8e6';
            }
            else
            {
                currOp.style.color = '#FF7F50';
            }
        }
    }
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
    //set viewList Controls and Call Model:
    setViewControls(list)
    {
        let appModel = this.model;
        for(let i = 0; i < list.items.length; i++)
        {
            if(list.items[i] != null)
            {
                let listItem = list.items[i];
                let currDesc =  document.getElementById("desc-" + list.id + "-" + listItem.id);
                    currDesc.onchange = function () {
                        //console.log("Save Desc!");
                        appModel.addNewTaskTransaction(i, currDesc.value, listItem.description);//passes new value
                    }
                let currDue = document.getElementById("due-"+list.id+"-"+listItem.id);
                    currDue.onchange = function () {
                        //console.log("Save Date!");
                        appModel.addNewDueTransaction(i, currDue.value, listItem.dueDate);
                    }
                let currStat = document.getElementById("stat-"+list.id+"-"+listItem.id);
                    currStat.onchange = function () {
                        //console.log("Save Task!");
                        appModel.addNewStatTransaction(i, currStat.value, listItem.status);
                    }
                let upArrow = document.getElementById("up-"+list.id+"-"+listItem.id);
                if(i == 0){upArrow.style.color = "#000000";}
                else
                {
                    upArrow.style.color = "#ffffff";
                }
                    upArrow.onmousedown = function () {
                        //console.log("Go Up!");
                        if(i > 0)//cant go up after 1!
                        {
                            appModel.addNewUpTransaction(i);//current position!
                        }
                    }
                let downArrow = document.getElementById("down-"+list.id+"-"+listItem.id);
                if(i == list.items.length-1){downArrow.style.color = "#000000";}
                else
                {
                    downArrow.style.color = "#ffffff";
                }
                    downArrow.onmousedown = function () {
                        //console.log("Go Down!")
                        if(i < list.items.length - 1)
                        {
                            appModel.addNewDownTransaction(i);
                        }
                    }
                let closeBtn = document.getElementById("close-"+list.id + "-"+listItem.id);
                {
                    closeBtn.onmousedown = function () {
                        //console.log("Close List!");
                            appModel.addNewCloseTransaction(list.items[i], i);
                    }
                }
            }
        }
    }

}