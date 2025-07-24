import axios from 'axios';

export const getProducts = async () => {

        axios
          .get("http://127.0.0.1:8000/api/products") // or your live API endpoint
          .then((res) => {
            //setProducts(res.data.data); // because Laravel returns { data: [...] } in JSON resources
            return res.data.data;
          })
          .catch((err) => {
            console.error("Error fetching products:", err);
          });
      


};
