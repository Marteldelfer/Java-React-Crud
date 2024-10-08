import Product from "./Product";

function App() {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          <Product/>
        </tbody>
      </table>
      
    </>
  )
}

export default App;
