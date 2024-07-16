import React from 'react';
import { Todo } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  todo: Todo;
  onDelete: VoidFunction;
  onToggleStatus: VoidFunction;
  isLoading: boolean;
}

const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggleStatus,
  isLoading,
}) => {
  return (
    <div className="d-flex align-items-center rounded-4 bg-white p-3 w-100">
      <div className="form-check me-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={todo.status}
          onChange={onToggleStatus}
          disabled={isLoading}
        />
      </div>
      <h6 className="card-title m-0">{todo.title}</h6>
      <button
        className="btn btn-danger px-3 rounded-3 d-flex ms-auto"
        onClick={onDelete}
      >
        {isLoading ? <ButtonSpinner /> : 'Delete'}
      </button>
    </div>
  );
};

export default TodoItem;
