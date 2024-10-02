import "./App.css";

import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const { data: items, httpConfig, loading, error } = useFetch(url);

	// useEffect(() => {
	// 	async function FetchData() {
	// 		const response = await fetch(url);
	// 		const data = await response.json();
	// 		setProducts(data);
	// 	}
	// 	FetchData();
	// }, []);

	// ADD products

	const handleSubmit = async (e) => {
		e.preventDefault();

		const product = {
			name,
			price,
		};

		// const res = await fetch(url, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(product),
		// });

		// const addedProduct = await res.json();

		// setProducts((prevProducts) => [...prevProducts, addedProduct]);

		httpConfig(product, "POST");

		setName("");
		setPrice("");
	};

	const handleRemove = (id) => {
		httpConfig(id, "DELETE");
	}

	return (
		<div className='App'>
			<h1>Lista de Produtos</h1>
			{loading && <p>Carregando...</p>}
			{error && <p>{error}</p>}
			{!error && <ul>
				{items &&
					items.map((product) => (
						<>
						<li key={product.id}>
							{product.name} - $ {product.price}
							<button onClick={() => handleRemove(product.id)}>Deletar</button>
						</li>
						
						</>
					))}
			</ul>}
			<div className='add-product'>
				<form onSubmit={handleSubmit}>
					<label>
						Nome:
						<input
							type='text'
							value={name}
							name='name'
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label>
						Preço:
						<input
							type='number'
							value={price}
							name='name'
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					{loading && <input type='submit' value='Aguarde' disabled />}
					{!loading && <input type='submit' value='Criar Produto' />}
				</form>
			</div>
		</div>
	);
}

export default App;
