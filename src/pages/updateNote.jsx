import React, { useEffect } from "react";
import { logPageView } from "../analytics";
import NoteForm from "../components/noteForm";

const UpdateNote = () => {
  useEffect(() => {
    logPageView();
  }, []);

  return <NoteForm />;
};

export default UpdateNote;
