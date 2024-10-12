import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ITodo} from '../types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../State/store';
import {addTodo} from '../State/todos';

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const newTodo: Partial<ITodo> = {
      title: todoTitle,
      dueDate: todoDate,
      isComplete: false,
    };
    dispatch(addTodo(newTodo));
    setTodoTitle('');
    setTodoDate('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New todo title"
        value={todoTitle}
        onChangeText={setTodoTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (DD/MM)"
        value={todoDate}
        onChangeText={setTodoDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.btnText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flex: 2,
  },
  button: {
    backgroundColor: 'lime',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 12,
  },
  btnText: {
    color: '#010010',
    alignSelf: 'center',
    fontWeight: '700',
  },
});
