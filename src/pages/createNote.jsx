import React, { useEffect } from "react";
import { logPageView } from "../analytics";
import NoteForm from "../components/noteForm";

const CreateNote = () => {
  useEffect(() => {
    logPageView();
  }, []);

  return <NoteForm />;
};

export default CreateNote;
