import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://s3.amazonaws.com/open-to-cors/assignment.json"
      );

      const sortedData = Object.values(response.data.products).sort(
        (a, b) => b.popularity - a.popularity
      );

      setData(sortedData);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProducts = () => {
    return data.map((ele) => (
      <tr key={uuidv4()}>
        {console.log(ele.title)}
        <td>{ele.title}</td>
        <td>{ele.subcategory}</td>
        <td>{ele.price}</td>
        <td>{ele.popularity}</td>
      </tr>
    ));
  };

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          <th key={uuidv4()}>Title</th>
          <th key={uuidv4()}>Sub-category</th>
          <th key={uuidv4()}>Price</th>
          <th key={uuidv4()}>Popularity</th>
        </tr>
      </thead>
    );
  };

  return (
    <table>
      {renderHeader()}
      <tbody>{renderProducts()}</tbody>
    </table>
  );
}

export default App;
