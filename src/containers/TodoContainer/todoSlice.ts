import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { ApiTodo, ApiTodos, Todo } from '../../types';

interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  error: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: false,
  deleteLoading: false,
  updateLoading: false,
};

export const fetchTodos = createAsyncThunk<Todo[], void, { state: RootState }>(
  'todos/fetch',
  async () => {
    const { data: todo } = await axiosApi.get<ApiTodos>('/todos.json');
    return Object.keys(todo || {}).map((id) => ({ id, ...todo[id] }));
  },
);

export const addTodo = createAsyncThunk<Todo, ApiTodo, { state: RootState }>(
  'todos/add',
  async (newTodo) => {
    const { data: todo } = await axiosApi.post<{ name: string }>(
      '/todos.json',
      newTodo,
    );
    return { ...newTodo, id: todo.name };
  },
);

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { state: RootState }
>('todos/delete', async (id) => {
  await axiosApi.delete(`/todos/${id}.json`);
  return id;
});

export const updateTodoStatus = createAsyncThunk<
  Todo,
  { id: string; status: boolean },
  { state: RootState }
>('todos/updateStatus', async ({ id, status }) => {
  await axiosApi.patch(`/todos/${id}.json`, { status });
  const { data: todo } = await axiosApi.get<ApiTodo>(`/todos/${id}.json`);
  return { id, ...todo };
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.todos = action.payload;
      },
    );
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(
      deleteTodo.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.deleteLoading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
    );
    builder.addCase(deleteTodo.rejected, (state) => {
      state.deleteLoading = false;
      state.error = true;
    });

    builder.addCase(updateTodoStatus.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(
      updateTodoStatus.fulfilled,
      (state, action: PayloadAction<{ id: string; status: boolean }>) => {
        state.updateLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index].status = action.payload.status;
        }
      },
    );
    builder.addCase(updateTodoStatus.rejected, (state) => {
      state.updateLoading = false;
      state.error = true;
    });
  },
});

export const todoReducer = todosSlice.reducer;
