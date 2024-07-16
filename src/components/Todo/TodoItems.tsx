import React from 'react';
import { Todo } from '../../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodoStatus: (id: string, status: boolean) => void;
  isLoading: boolean;
}

const TodoItems: React.FC<Props> = ({
  todos,
  deleteTodo,
  toggleTodoStatus,
  isLoading,
}) => {
  return (
    <div className="d-flex flex-column align-items-center gap-3 pt-5 mb-5">
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onToggleStatus={() => toggleTodoStatus(todo.id, !todo.status)}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

export default TodoItems;
