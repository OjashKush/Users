import { useState, useEffect } from "react";
import "./App.css";
import axios from "./axios.jsx";


const UserDetails = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const { id, username, address, name, email, phone, website, company } = post;

  return (
    <div key={id} className="card">
      <h2>{name.slice(0, 15).toUpperCase()}</h2>
      <p>UserName: {username}</p>
      <p>City: {address.city}</p>
      {expanded && (
        <div className="more">
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Website: {website}</p>
          <p>Company: {company.name}</p>
          <p>Firm's Moto : {company.catchPhrase}</p>
          <p>Firm Details : {company.bs}</p>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide Details" : "View Details"}
      </button>
    </div>
  );
};

const App = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // using Async Await
  const getMyPostData = async () => {
    try {
      const res = await axios.get("/users");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  // NOTE:  calling the function
  useEffect(() => {
    getMyPostData();
  }, []);

  return (
    <>
      <h1>Basic Information</h1>
      {isError !== "" && <h2>{isError}</h2>}

      <div className="grid">
        {myData.slice(0, 5).map((post) => (
          <UserDetails key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default App;
