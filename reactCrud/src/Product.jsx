function Product(props) {
    const products = props.products.map(product => 
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.createdAt}</td>
        </tr>
    );

    return (
        products
    );
}
export default Product;