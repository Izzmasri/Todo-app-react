import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { todoContetx } from "../contexts/todoContext";

//Icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Delete dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

//Edit dialog
import TextField from "@mui/material/TextField";

export default function Todo({ detail }) {
  const { todo, setTodo } = useContext(todoContetx);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    title: detail.title,
    description: detail.description,
  });

  // Event Handler
  function handleCheckBtn() {
    const updatedState = todo.map((t) => {
      if (t.id === detail.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodo(updatedState);
    localStorage.setItem("todos", JSON.stringify(updatedState));
  }

  function handleDeleteBtn() {
    setShowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const deleted = todo.filter((t) => {
      return t.id !== detail.id;
    });
    setTodo(deleted);
    localStorage.setItem("todos", JSON.stringify(deleted));
  }

  function handleEditClose() {
    setShowEditDialog(false);
  }

  function handleEditConfirm() {
    const updated = todo.map((t) => {
      if (t.id === detail.id) {
        return {
          ...t,
          title: editedTodo.title,
          description: editedTodo.description,
        };
      } else {
        return t;
      }
    });
    setTodo(updated);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(updated));
  }
  function handleEditBtn() {
    setShowEditDialog(true);
  }
  // ---Event Handler---
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        onClick={handleDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete it, it can't be recovered!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---Delete Dialog--- */}
      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="standard"
            value={editedTodo.title}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="description"
            fullWidth
            variant="standard"
            value={editedTodo.description}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button autoFocus onClick={handleEditConfirm}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---Edit Dialog--- */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 3,
        }}
      >
        <CardContent>
          {/* Flex container */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "nowrap",
            }}
          >
            {/* Left: Task content */}
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h5">{detail.title}</Typography>
              <Typography>{detail.description}</Typography>
            </Box>

            {/* Right: Icon Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              {/* check icon button */}
              <IconButton
                onClick={handleCheckBtn}
                className="iconButton"
                style={{
                  color: detail.isCompleted ? "white" : "#8bc34a",
                  background: detail.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ---check icon button--- */}
              {/* edit icon button */}
              <IconButton
                onClick={handleEditBtn}
                className="iconButton"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* ---edit icon button--- */}
              {/* delete icon button */}
              <IconButton
                onClick={handleDeleteBtn}
                className="iconButton"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ---delete icon button--- */}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
