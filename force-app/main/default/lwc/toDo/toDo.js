import { LightningElement,track,wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import insertTodo from "@salesforce/apex/TodoHandler.insertTodo";
import getOpenTodos from "@salesforce/apex/TodoHandler.getOpenTodos";
import updateTodoItem from "@salesforce/apex/TodoHandler.updateTodoItem";

export default class ToDo extends LightningElement {
    time = '6:00 Am';
    greeting = 'Good morning';
    wiredTodosResult;
    @track resultObj='something';
    @track toDoList = [];

    @wire(getOpenTodos)
    getTodos(result){
        this.wiredTodosResult = result;
        const {data, error} = result;        
        if(data){
            this.toDoList = data;
        }else if(error){
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message:'error'+error.body.message,
                variant:'Error'
            }));
        }
    }

    connectedCallback(){
        this.setTime();

        setInterval(()=>{
            this.setTime();
        },1000*60);

    }

    setTime(){
        const date = new Date();
        const hours = date.getHours();
        const mins = date.getMinutes();

        this.time = `${this.getTwelveHours(hours)}:${this.getTwodigit(mins)} ${this.getAmPm(hours)}`;
        this.greeting = this.getTimelyGreeting(hours);
    }

    getTwelveHours(hours){
        return hours>12?hours-12:hours;
    }
    getTwodigit(mins){
        return mins<10? '0'+mins: mins;
    }
    getAmPm(hours){
        return hours<12?'am':'pm';
    }

    getTimelyGreeting(hours){
        return hours<12?'Good morning' : hours<16 ? 'Good Afternoon' : hours<20 ? 'Good Evening' : 'Good Night';
    }
    addTodo(){
        const todoItem = this.template.querySelector("lightning-input");
       
        insertTodo({taskDescription: todoItem.value}).then(result=>{
            this.resultObj = result;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message:'Inserted successfully',
                variant:'Success'
            }));
            return refreshApex(this.wiredTodosResult);
        }).catch(error=>{
            const event = new ShowToastEvent({
                title: 'Error',
                message:'error'+error.body.message,
                variant:'Error'
            });
            this.dispatchEvent(event);
        });
        
        todoItem.value = "";
    }
    get hasItems(){
        return this.toDoList.length>0?true:false;
    }

    handleEdit(event){
        const todoId = event.target.dataset.todoId;
        const operation = event.target.dataset.operation;
        const itemElement = this.template.querySelector(`[data-todo-name="${todoId}"]`);
        console.log("id:description :: "+todoId+":"+itemElement.value);
        updateTodoItem({todoId:todoId,newDescription:itemElement.value,operation:operation}).then(result=>{
            this.resultObj = todoId;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message:'Operation "' + operation+'" successful',
                variant:'Success'
            }));
            return refreshApex(this.wiredTodosResult);
        }).catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message:'error'+error.body.message,
                variant:'Error'
            }));
        });
    }
}