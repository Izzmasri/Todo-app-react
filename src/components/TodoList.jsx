import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect,useMemo } from "react";
import { todoContetx } from "../contexts/todoContext";

//for the id generator
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todo, setTodo } = useContext(todoContetx);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodoType, setDisplayedTodoType] = useState("all");

  //filtered tasks
  const completedTodos = useMemo(() => {
    return todo.filter((t) => {
      return t.isCompleted;
    });
  }, [todo]);

  const notCompletedTodos = useMemo(() => {
    return todo.filter((t) => {
      return !t.isCompleted;
    });
  }, [todo]);

  let todosToBeRendered = todo;

  if (displayedTodoType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodoType === "inProgress") {
    todosToBeRendered = notCompletedTodos;
  }

  const todos = todosToBeRendered.map((t) => {
    return <Todo key={t.id} detail={t} />;
  });

  useEffect(() => {
    const storageTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodo(storageTodo);
  }, []);

  function handleAddTask() {
    if (titleInput !== "") {
      const newTodo = {
        id: uuidv4(),
        title: titleInput,
        description: "",
        isCompleted: false,
      };
      const updatedTodo = [...todo, newTodo];
      setTodo(updatedTodo);
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      setTitleInput("");
    }
  }

  function displayedType(e) {
    setDisplayedTodoType(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            My Tasks
          </Typography>
          <Divider variant="middle" />
          {/* Toggle Buttons */}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            value={displayedTodoType}
            exclusive
            onChange={displayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="all">All Tasks</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="inProgress">Still in progress</ToggleButton>
          </ToggleButtonGroup>
          {/* ---Toggle Buttons--- */}
          {/* Tasks */}
          <div
            style={{
              maxHeight: "50vh",
              overflowY: "auto",
              overflowX: "hidden",
              marginTop: "20px",
              paddingRight: "5px",
            }}
          >
            {todos}
          </div>
          {/* ---Tasks--- */}
          {/* Input + Button */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid size={8}>
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
              />
            </Grid>
            <Grid size={4}>
              <Button
                onClick={handleAddTask}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* ---Input + Button--- */}
        </CardContent>
      </Card>
    </Container>
  );
}
