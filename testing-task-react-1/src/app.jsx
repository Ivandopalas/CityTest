import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import './index.scss';

const todosTemplate = [
  {
    id: 0,
    label: 'Починить отоброжение списка задач',
    checked: false,
  },
  {
    id: 1,
    label: 'Поправить стили, чтобы список задач отображался вертикально',
    checked: false,
  },
  {
    id: 2,
    label: 'Реализовать функционал кнопки добавления новых задач',
    checked: false,
  },
  {
    id: 3,
    label: 'Починить возможно отмечать задаче в чекбоксе',
    checked: false,
  },
  {
    id: 4,
    label: 'Починить функционал удаления задачи',
    checked: false,
  },
];

export const App = () => {
  const [todos, setTodos] = React.useState([]);

  return (
    <div className="root">
      <TodosContext.Provider value={{ todos }}>
        <TodoList />
        <TodoResults />
        <TodoForm />
      </TodosContext.Provider>
    </div>
  );
};
