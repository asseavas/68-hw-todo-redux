import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addTodo, fetchTodos } from '../../containers/TodoContainer/todoSlice';
import { toast } from 'react-toastify';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const NewTodoForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(
        addTodo({
          title,
          status: false,
        }),
      ).unwrap();
      dispatch(fetchTodos());
      setTitle('');
    } catch (e) {
      toast.error(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="d-flex gap-3 bg-light-subtle rounded-4 p-4 px-4"
      onSubmit={onFormSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="New todo"
        className="form-control bg-body-secondary border-0 rounded-3 p-2 w-100"
        value={title}
        onChange={onFieldChange}
        required
      />
      <button
        className="btn btn-primary px-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <ButtonSpinner /> : 'Add'}
      </button>
    </form>
  );
};

export default NewTodoForm;
