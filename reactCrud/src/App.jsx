import Product from "./Product";

function App() {

  const products = [{
    id: "example",
    name: "example",
    quantity: 100,
    price: 20,
    createdAt: "2024",
  }, {
    id: "another",
    name: "and other",
    quantity: 200,
    price: 30,
    createdAt: "2025",
  }];

  return (
    <>
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>quantity</th>
          <th>price</th>
          <th>createdAt</th>
        </tr>
        <Product products={products}/>
      </table>
      
    </>
  )
}

export default App;
