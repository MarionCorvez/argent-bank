import { useState } from "react";
//import { useDispatch } from "react-redux";
//import { addTask } from "../../redux";

export default function Account() {
  const [text, setText] = useState("");
  //const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    //dispatch(addTask(text));

    setText("");
  };

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      {/*       <section className="edit-user">
        <h2>Edit user info</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ajouter une tâche"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </section> */}
    </>
  );
}
