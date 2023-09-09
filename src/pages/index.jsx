import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BoardCard } from "../components/Cards";
import { Navbar } from "../components/Navbar";
import api from "../services/api";

const LandingPage = () => {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    api.get("/todo-list").then((data) => {
      setTodos(data?.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(3, 1fr)">
        <BoardCard headerText="Open" headingColor="#38B2AC" boardBg="#ebf8ff" data={todos?.open_tasks ? todos?.open_tasks : []} />
        <BoardCard headerText="In Progress" headingColor="#4299E1" data={todos?.in_progress_tasks ? todos?.in_progress_tasks : []} />
        <BoardCard headerText="Done" headingColor="#9F7AEA" boardBg="#ebf8ff" data={todos?.done_tasks ? todos?.done_tasks : []} />
      </Grid>
    </>
  );
};

export default LandingPage;
