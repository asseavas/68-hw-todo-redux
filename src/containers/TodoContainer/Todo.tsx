import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchTodos, deleteTodo, updateTodoStatus } from './todoSlice';
import TodoItems from '../../components/Todo/TodoItems';
import Spinner from '../../components/Spinner/Spinner';

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, isLoading, deleteLoading, updateLoading } = useSelector(
    (state: RootState) => state.todo,
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDeleteTodo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await dispatch(deleteTodo(id));
      dispatch(fetchTodos());
    }
  };

  const toggleTodoStatus = async (id: string, status: boolean) => {
    await dispatch(updateTodoStatus({ id, status }));
    dispatch(fetchTodos());
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <TodoItems
          todos={todos}
          deleteTodo={handleDeleteTodo}
          toggleTodoStatus={toggleTodoStatus}
          isLoading={deleteLoading || updateLoading}
        />
      )}
    </div>
  );
};

export default Todo;
