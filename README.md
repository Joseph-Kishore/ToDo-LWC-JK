# ToDo Component
This component is designed to manage to-do items. It allows users to view, create, update, and delete to-do items. The component is built using Salesforce Lightning Web Components (LWC) and leverages an Apex controller for backend operations.

## Features
- View a list of to-do items.
- Create new to-do items.
- Update existing to-do items by editing the description.
- Delete to-do items.
- mark to-do item as complete or finish.

## Usage
1. **View To-Do Items**: The component displays a list of to-do items.
2. **Create a To-Do Item**: Enter the description for the new to-do item and click "+" to create it.
3. **Update a To-Do Item**: Modify the description and click "pencil" icon button beside a toDo item to update the to-do item.
4. **Delete a To-Do Item**: Click the "Delete" icon button next to a to-do item to delete it.
5. **Mark as finish**: Click the "tick" icon next to a to-do item to delete it.

## Apex Controller
The `TodoHandler` class is responsible for handling backend operations for the ToDo component. It includes methods to retrieve, create, update, delete, and mark as finished to-do items.

### Methods
- `insertTodo(String taskDescription)`: Creates a new to-do item with the provided description.
- `getOpenTodos()`: Retrieves a list of up to 20 open (not finished) to-do items.
- `updateTodoItem(Id todoId, String operation, String newDescription)`: Updates a to-do item based on the specified operation. The operation can be "delete" to delete the item, "update" to change the description, or "finish" to mark the item as finished.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
