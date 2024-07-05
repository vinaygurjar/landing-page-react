import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Api() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fakestoreapi.com/products', formData);
      console.log('Data posted:', response.data);
      // Update the data after successful post
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleFormChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleFormChange} />
        </label>
        <button type="submit">Add Product</button>
      </form>

      {data.length > 0 && (
        <div>
          <h2>Products</h2>
          <table border='1'>
            <thead>
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Price</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Api;