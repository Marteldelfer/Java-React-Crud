import {useState, useEffect, act} from 'react';
import axios from 'axios';

function Product() {

	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:8080/api/')
			.then(response => {
				setData(response.data);
			}).catch(error => console.error(error));
	}, []);

	const [nameInput, setNameInput] = useState("");
	const [quantityInput, setQuantityInput] = useState();
	const [priceInput, setPriceInput] = useState();	

	function handleNameChange(event) {
		setNameInput(event.target.value);
	}
	function handleQuantityChange(event) {
		setQuantityInput(event.target.value);
	}
	function handlePriceChange(event) {
		setPriceInput(event.target.value);
	}

	const form = (
		<>
		<label id='name'>Name: </label>
		<input type="text" value={nameInput} 
			onChange={handleNameChange} placeholder='Product Name'/><br />
		<label id='quantity'>Quantity: </label>
		<input type="number" value={quantityInput} 
			onChange={handleQuantityChange} placeholder='0'/><br />
		<label id='price'>Price: </label>
		<input type="number" value={priceInput} 
			onChange={handlePriceChange} placeholder='0' /><br />
		<button onClick={() => submitProduct()}>Create Product</button>
		</>
	);

	function submitProduct() {

		if (nameInput === "" || quantityInput === "" || priceInput === "") {
			return;
		}

		const product = {
			name: nameInput,
			quantity: quantityInput,
			price: priceInput
		};

		axios.post('http://localhost:8080/api/', product)
			.then(response => {
				setData(d => [...d, response.data]);
				
				setNameInput("");
				setQuantityInput("");
				setPriceInput("");
			});
		
	};

	function deleteProduct(id) {
		axios.delete('http://localhost:8080/api/' + id)
			.then(() => setData(d => d.filter(prod => prod.id !== id)));
	}

	return (
		<>
		{form}
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>quantity</th>
					<th>price</th>
					<th>createdAt</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{data.map(product =>
				<tr key={product.id}>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.quantity}</td>
					<td>{product.price}</td>
					<td>{product.createdAt.substring(0, 10)}</td>
					<td>
						<button className='delete' onClick={() => deleteProduct(product.id)}>Delete</button>
						<button className='edit'>Edit</button>
					</td>
				</tr>
				)}
			</tbody>
		</table>
		</>
	);
}
export default Product;