public class TodoHandler {
	@AuraEnabled
    public static ToDo_Item__c insertTodo(String taskDescription){
        ToDo_Item__c newTask = new ToDo_Item__c(Description__c = taskDescription);
        try{
            insert newTask;
            return newTask;
        }catch(Exception e){
            Throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=TRUE)
    public static List<ToDo_Item__c> getOpenTodos(){
        return [SELECT id,Description__c from ToDo_Item__c where is_Finished__c = false limit 20];
    }
    
    @AuraEnabled
    public static ToDo_Item__c updateTodoItem(Id todoId,String operation,String newDescription){
        ToDo_Item__c taskToUpdate = new ToDo_Item__c(id=todoId);
        try{
            if(operation == 'delete'){
                delete taskToUpdate;
                return taskToUpdate;
            }
            else if(operation == 'update')
                taskToUpdate.Description__c = newDescription;
            else if(operation == 'finish')
                taskToUpdate.is_Finished__c = true;
            update taskToUpdate;
            return taskToUpdate;
        }catch(Exception e){
            Throw new AuraHandledException(e.getMessage());
        }
    }
}