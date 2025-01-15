import React, { useState } from "react";
import AddPerson from "./AddPerson";
import RetrieveInfo from "./RetrieveInfo";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="app-container">
      <h1>Directory App</h1>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("add")}>Add New Person</button>
        <button onClick={() => setActiveTab("retrieve")}>
          Retrieve Information
        </button>
      </div>
      {activeTab === "add" ? <AddPerson /> : <RetrieveInfo />}
    </div>
  );
};

export default App;
