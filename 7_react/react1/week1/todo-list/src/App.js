import './App.css';
import List from './List';

function App() {
  const list = [
    {
      desc: "Get out of bed",
      deadline: "Wed Sep 13 2017"
    },
    {
      desc: "Brush teeth",
      deadline: "Thu Sep 14 2017"
    },
    {
      desc: "Eat breakfast",
      deadline: "Fri Sep 15 2017"
    }
  ];

  return (
    <div className="App">
      <h1>Todo list</h1>
      
      <List list={list} />
    </div>
  );
}

export default App;
