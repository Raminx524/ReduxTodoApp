import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleTodoComplete,
  deleteTodoFromServer,
  fetchTodos,
} from '../State/todos';
import {ITodo} from '../types';
import CheckBox from 'react-native-check-box';
import {AppDispatch, RootState} from '../State/store';

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleComplete = (todo: ITodo) => {
    dispatch(toggleTodoComplete(todo));
  };

  const handleDelete = (todoId: string) => {
    dispatch(deleteTodoFromServer(todoId));
  };
  if (todos.isLoading) return <Text style={styles.text}>Loading...</Text>;
  return todos.data.length > 0 ? (
    <FlatList
      contentContainerStyle={styles.list}
      data={todos.data}
      keyExtractor={(item: ITodo) => item.id}
      renderItem={({item}: {item: ITodo}) => (
        <View style={styles.item}>
          <CheckBox
            isChecked={item.isComplete}
            onClick={() => handleComplete(item)}
          />
          <Text>{item.title}</Text>
          <Text>Due Date: {item.dueDate}</Text>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  ) : (
    <Text style={styles.text}>You have no todos yet!</Text>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  list: {alignItems: 'center', paddingHorizontal: 8},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});
