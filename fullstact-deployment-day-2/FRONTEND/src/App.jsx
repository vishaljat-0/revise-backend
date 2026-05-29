import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/api/get");
    setnotes(res.data.notes);
    console.log(res.data.notes);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/post", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        getData();
      });
    console.log(title.value, description.value);
  };
  const dltfn = async (e) => {
    console.log(e);
    axios.delete(`http://localhost:3000/api/delete/${e}`).then((res) => {
      console.log(res.data);
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter note title..." />
        <input
          name="description"
          type="text"
          placeholder="Enter note description..."
        />
        <button>Save Note</button>
      </form>

      {notes.map((note) => {
        return (
          <div className="card" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => dltfn(note._id)} id="btndlt">
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
