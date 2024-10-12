import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {ITodo} from '../types';
import {URL} from '../secret';

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const res = await axios.get(`${URL}/todos`);
  return res.data;
});

export const addTodo = createAsyncThunk(
  'addTodo',
  async (newTodo: Partial<ITodo>) => {
    const res = await axios.post(`${URL}/todos`, newTodo);
    return res.data;
  },
);

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete ',
  async (todo: ITodo) => {
    const res = await axios.patch(`${URL}/todos/${todo.id}`, {
      isComplete: !todo.isComplete,
    });
    return res.data;
  },
);

export const deleteTodoFromServer = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: string) => {
    await axios.delete(`${URL}/todos/${todoId}`);
    return todoId; // Return todoId so we can remove it from state
  },
);
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isLoading: false,
    data: [] as ITodo[],
    error: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload || [];
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(toggleTodoComplete.fulfilled, (state, action) => {
      const todo = state.data.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.isComplete = action.payload.isComplete;
      }
    });
    builder.addCase(
      deleteTodoFromServer.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.data = state.data.filter(todo => todo.id !== action.payload);
      },
    );
    builder.addCase(
      addTodo.fulfilled,
      (state, action: PayloadAction<ITodo>) => {
        state.data = [...state.data, action.payload];
      },
    );
  },
});
export default todosSlice.reducer;
