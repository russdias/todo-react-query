import React from 'react';
import styles from './TodoApp.module.css';

interface Props {
  item: string;
}

const TodoItem: React.FC<Props> = ({ item }) => {
  return <div className={styles.todoItem}>{item}</div>;
};

export default TodoItem;
