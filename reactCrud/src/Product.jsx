import {useState, useEffect} from 'react';
import axios from 'axios';

function Product() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/')
            .then(response => {
                setData(response.data);
            }).catch(error => console.error(error));
    }, []);

    return (
        data.map(product =>
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.createdAt.substring(0, 10)}</td>
            <td>
                <button className='delete'>Delete</button>
                <button className='edit'>Edit</button>
            </td>
        </tr>
        )
    );
}
export default Product;