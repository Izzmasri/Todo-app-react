import TodoList from "./components/ToDoList";
import "./App.css";
import { useState } from "react";
import { todoContetx } from "./contexts/todoContext";

//for font style:
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  //for fonts
  typography: {
    fontFamily: ["Winky"],
  },
  //for colors
  palette: {
    primary: {
      main: "#283593",
    },
  },
});

//for the id generator
import { v4 as uuidv4 } from "uuid";

const initial = [
  {
    id: uuidv4(),
    title: "Reading a book",
    description: "sajfkjashfkjshafjk",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Reading a book",
    description: "sajfkjashfkjshafjk",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Reading a book",
    description: "sajfkjashfkjshafjk",
    isCompleted: false,
  },
];

function App() {
  const [todo, setTodo] = useState(initial);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
          textAlign: "center",
        }}
      >
        <todoContetx.Provider value={{ todo, setTodo }}>
          <TodoList />
        </todoContetx.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
