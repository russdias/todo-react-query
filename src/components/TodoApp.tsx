import React, { useEffect, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import styles from './TodoApp.module.css';
import { Button, Input, message, Spin, Typography } from 'antd';
import TodoItem from './TodoItem';
import ApiClient from '../axios';
import { useMutation, useQuery, queryCache } from 'react-query';

const { Title } = Typography;

const getData = async () => {
  try {
    const { data } = await ApiClient.get('/todos').then((data) => data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const postData = async (todo: { todo: string }) => {
  try {
    const { data } = await ApiClient.post('/add-todos', todo);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const TodoApp: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const { data, isLoading } = useQuery('todos', getData);
  const [mutate] = useMutation(postData, {
    onMutate: (newTodo) => {
      console.log(newTodo);
      // cancel query
      queryCache.cancelQueries('todos');
      //create a snapshot
      const previousTodos = queryCache.getQueryData('todos');
      //optimistically update state
      queryCache.setQueryData('todos', (old) => [...(old as any), newTodo.todo]);
      //return snapshot
      return () => queryCache.setQueryData('todos', previousTodos);
    },
    onError: (err, newTodo, rollback: any) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('todos');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue('');
    mutate({ todo: value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (isLoading && !data) {
    return (
      <div className={styles.container}>
        <div className={styles.centerTodo}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Title>Todo App with ReactJS</Title>
      <form onSubmit={handleSubmit} className={styles.inputAndButtonContainer}>
        <Input size="large" value={value} onChange={onChangeInput} placeholder="Add your todo..." />
        <Button size="large" htmlType="submit" type="primary">
          Add Todo
        </Button>
      </form>
      {data.map((el: string, index: string) => (
        <TodoItem key={index} item={el} />
      ))}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default TodoApp;
