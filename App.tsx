import {SafeAreaView} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './State/store';
import TodosPage from './TodosPage';

const App = () => {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <TodosPage />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
