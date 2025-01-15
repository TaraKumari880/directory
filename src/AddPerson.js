import React, { useState } from "react";

const AddPerson = () => {
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people")) || []
  );
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    aadhar: "",
    mobile: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "dob") {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      setFormData({ ...formData, age });
    }
  };

  const handleAddPerson = () => {
    const { name, dob, aadhar, mobile, age } = formData;
    if (name && dob && aadhar.length === 12 && mobile.length === 10) {
      const newPeople = [...people, formData];
      setPeople(newPeople);
      localStorage.setItem("people", JSON.stringify(newPeople));
      setFormData({ name: "", dob: "", aadhar: "", mobile: "", age: "" });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const handleDelete = (index) => {
    const newPeople = people.filter((_, i) => i !== index);
    setPeople(newPeople);
    localStorage.setItem("people", JSON.stringify(newPeople));
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleChange}
      />
      <input
        name="aadhar"
        placeholder="Aadhar Number"
        value={formData.aadhar}
        onChange={handleChange}
      />
      <input
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
      />
      <input name="age" placeholder="Age" value={formData.age} readOnly />
      <button onClick={handleAddPerson}>Add Person</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Aadhar</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPerson;
