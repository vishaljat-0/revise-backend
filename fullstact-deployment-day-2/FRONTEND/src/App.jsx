import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [description, setDescription] = useState("");

  const getData = async () => {
    const res = await axios.get("/api/get")

    setnotes(res.data.notes);
    console.log(res.data.notes);
  };

  const editbtn = async (note) => {
    alert("Edit clicked!"); // ← yeh dikhta hai?
    console.log("Edit Clicked", note);
    setEditId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      console.log("Sending title:", title); // ← yeh kya print hota hai?
      console.log("Sending description:", description);
     axios.patch(`/api/update/${editId}`, {
          title,
          description,
        })
        .then((res) => {
          console.log(res.data);
          setTitle("");
          setDescription("");
          setEditId(null);
          getData();
        });
      return;
    }

    // POST request

   axios.post("/api/post", {
        title,
        description,
      })
      .then((res) => {
        console.log(res.data);
        setTitle("");
        setDescription("");
        getData();
      });
  };
  const dltfn = async (e) => {
    console.log(e);
  axios.delete(`/api/delete/${e}`).then((res) => {
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
        <button type="submit">Save Note</button>
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
              <button type="button" onClick={() => editbtn(note)} id="btndlt">
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
