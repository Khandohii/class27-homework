import './App.css';
import List from './List';
import {useState, useEffect} from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      description: "Get out of bed",
    },
    {
      id: 2,
      description: "Brush teeth",
    },
    {
      id: 3,
      description: "Eat breakfast",
    },
  ]);

  const [maxId, setMaxId] = useState(todoList.length);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addTodo = (description = "Random text") => {
    const newTodoItem = {
      description,
      id: maxId + 1
    }

    setMaxId(maxId => maxId + 1)

    setTodoList((oldList) => {
      return [...oldList, newTodoItem]
    })
  }

  const changeStatus = (status, id) => {
      setTodoList((oldTodo) => {
        return oldTodo.map((el) => {
          if (el.id === id) {
            el.status = status
          }

          return el;
        });
      })
  }

  const deleteItem = (id) => {
    setTodoList((oldTodo) => {
      return oldTodo.filter((el) => el.id !== id);
    })
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      
      <div className="timer">You have used {time} seconds on this website</div>

      <br />

      <button onClick={() => addTodo()}>Add todo</button>

      <List list={todoList} changeStatus={changeStatus} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
