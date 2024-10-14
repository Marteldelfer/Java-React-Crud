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
		<div className='row'>
      <div className='col-md-4 mx-auto rounded border p-4'>
        <div className='row'>
          <label id='name' className='col-sm-4 col-form-label'>Name: </label>
          <input type="text" className='col-sm form-control' value={nameInput}
            onChange={handleNameChange} placeholder='Product Name'/>
        </div>
        <div className='row'>
          <label id='quantity' className='col-sm-4 col-form-label'>Quantity: </label>
          <input type="number" className='col-sm form-control' value={quantityInput}
            onChange={handleQuantityChange} placeholder='0'/>
        </div>
        <div className='row'>
          <label id='price'  className='col-sm-4 col-form-label'>Price: </label>
          <input type="number" className='col-sm form-control' value={priceInput}
            onChange={handlePriceChange} placeholder='0' />
        </div>
        <div className='row'>
          <button className="btn btn-primary" onClick={() => submitProduct()}>Create Product</button>
        </div>
      </div>
		</div>
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
	};

	function editProduct(id) {
		
		if (nameInput === "" || quantityInput === "" || priceInput === "") {
			return;
		}

		const product = {
			name: nameInput,
			quantity: quantityInput,
			price: priceInput
		};

		axios.put('http://localhost:8080/api/' + id, product)
			.then(response => {
				setData(d => d.filter(prod => prod.id !== id));
				setData(d => [...d, response.data]);

				setNameInput("");
				setQuantityInput("");
				setPriceInput("");
			});

	}; 

	return (
		<>
		{form}
		<table className='table'>
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
						<button className='btn btn-danger btn-sm' 
						onClick={() => deleteProduct(product.id)}>Delete</button>
						<button className='btn btn-primary btn-sm' 
						onClick={() => editProduct(product.id)}>Edit</button>
					</td>
				</tr>
				)}
			</tbody>
		</table>
		</>
	);
}
export default Product;