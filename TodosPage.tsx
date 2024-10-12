import {Text, View} from 'react-native';
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const Header = () => {
  return (
    <View
      style={{
        elevation: 10,
        backgroundColor: '#fff',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 30,
        }}>
        Redux Todo App
      </Text>
    </View>
  );
};

const Main = () => {
  return (
    <View>
      <AddTodo />
      <TodoList />
    </View>
  );
};

const TodosPage = () => {
  return (
    <View>
      <Header />
      <Main />
    </View>
  );
};

export default TodosPage;
