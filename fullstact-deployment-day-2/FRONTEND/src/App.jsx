import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [description, setDescription] = useState("");

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/api/get");
    setnotes(res.data.notes);
    console.log(res.data.notes);
  };

  const editbtn = async (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      axios
        .patch(`http://localhost:3000/api/update/${editId}`, {
          title: title,
          description: description,
        })
        .then((res) => {
          console.log(res.data);  
          getData();
        });
      setEditId(null);
      return;
    }

    // POST request

    axios
      .post("http://localhost:3000/api/post", {
        title,
        description
      })
      .then((res) => {
        console.log(res.data);
        getData();
      });

   
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
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          type="text"
          placeholder="Enter note title..."
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            <div className="btndiv">
              <button onClick={() => dltfn(note._id)} id="btndlt">
                Delete
              </button>
              <button onClick={() => editbtn(note)} id="btndlt">
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
