import React, { useState } from 'react';
import styles from './TodoApp.module.css';
import { Button, Input, Typography } from 'antd';
import TodoItem from './TodoItem';

const { Title } = Typography;

const TodoApp: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([...todos, value]);
    setValue('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Title>Todo App with ReactJS</Title>
      <form onSubmit={handleSubmit} className={styles.inputAndButtonContainer}>
        <Input size="large" value={value} onChange={onChangeInput} placeholder="Add your todo..." />
        <Button size="large" htmlType="submit" type="primary">
          Add Todo
        </Button>
      </form>
      {todos.map((el, index) => (
        <TodoItem key={index} item={el} />
      ))}
    </div>
  );
};

export default TodoApp;
