import React, { useState } from "react";

const RetrieveInfo = () => {
  const [aadhar, setAadhar] = useState("");
  const [person, setPerson] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = () => {
    // Retrieve the list of people from local storage
    const people = JSON.parse(localStorage.getItem("people")) || [];

    // Find the person with the matching Aadhar number
    const foundPerson = people.find((p) => p.aadhar === aadhar);

    if (foundPerson) {
      // If found, set the person state and clear any error
      setPerson(foundPerson);
      setError("");
    } else {
      // If not found, clear the person state and set an error message
      setPerson(null);
      setError("No match found");
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <h2>Retrieve Information</h2>
      <input
        type="text"
        placeholder="Enter Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve</button>

      {error && <p className="error-message">{error}</p>}

      {person && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{calculateAge(person.dob)}</td>{" "}
              {/* Calculate age based on DOB */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveInfo;
