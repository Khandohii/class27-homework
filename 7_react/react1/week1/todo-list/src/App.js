import './App.css';
import List from './List';
import {useState, useEffect} from 'react';

function App() {
  const url = 'https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw';

  const [time, setTime] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [maxId, setMaxId] = useState(todoList.length);
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    addList(url);

    setCurrentDate()
  }, [])

  useEffect(() => {
    setMaxId(todoList.length)
  }, [todoList])

  const getList = async (url) => {
    return await fetch(url).then((response) => response.json());
  };

  const addList = (url) => {
    getList(url).then((item) => {
      setTodoList(() => [...item]);
    });
  };

  const setCurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDeadline(formattedDate);
  };

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addTodo = (description) => {
    if (isPastDate(deadline)) {
      return alert('The deadline is before the current day')
    }

    const newTodoItem = {
      description: description ? description : 'Empty item',
      deadline,
      id: maxId + 1
    }

    setMaxId(maxId => maxId + 1)

    setCurrentDate()
    setDescription('')

    setTodoList((oldList) => {
      return [...oldList, newTodoItem]
    })
  }

  const isPastDate = (dateString) => {
    const date = new Date(dateString);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return date < currentDate;
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

  const editItem = (id) => {
    setTodoList((oldList) => {
      return [...oldList.map((item) => {
        item.updating = (item.id === id)
        return item;
      })]
    })
  }

  const updateItem = (id, description) => {
    setTodoList((oldList) => {
      return [...oldList.map((item) => {
        if (item.id === id) {
          item.description = description
          item.updating = false
        }
        return item;
      })]
    })
  }

  return (
    <div className="App">
      <h1>Todo list</h1>

      <div className="timer">You have used {time} seconds on this website</div>

      <br />

      Todo description: <input
                          type="text"
                          name="description"
                          id=""
                          placeholder='Description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />

      <br />

      Deadline: <input type="date" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

      <br />

      <button onClick={() => addTodo(description)}>Add todo</button>

      <List list={todoList} changeStatus={changeStatus} deleteItem={deleteItem} editItem={editItem} updateItem={updateItem} />
    </div>
  );
}

export default App;
