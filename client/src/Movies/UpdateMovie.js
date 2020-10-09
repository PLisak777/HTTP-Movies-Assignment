import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = ({ setMovieList }) => {
	const [update, setUpdate] = useState({
		id: '',
		title: '',
		director: '',
		metascore: '',
		stars: [],
	});
	const { id } = useParams();
	const { push } = useHistory();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				console.log('pl: UpdateMovie.js: useEffect: axios get: res: ', res);
				setUpdate(res.data);
			})
			.catch((err) => {
				console.error('Unable to fetch data', err.message);
			});
	}, [id]);

	const handleChange = (e) => {
		setUpdate({
			...update,
			[e.target.name]: e.target.value,
		});
	};

	const handleStars = (e) => {
		setUpdate({
			...update,
			stars: update.stars.map((star) => {
				if (e.target.name === star) {
					return e.target.value;
				} else {
					return star;
				}
			}),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${update.id}`, update)
			.then((res) => {
				console.log(
					'pl: UpdateMovies.js: handleSubmit: axios put success: res: ',
					res
				);
				setMovieList(res.data);
				push(`/`);
			})
			.catch((err) => {
				console.error('Unable to update movie', err.message);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						value={update.title}
					/>
				</div>
				<div>
					<label htmlFor="director">Director: </label>
					<input
						type="text"
						name="director"
						onChange={handleChange}
						value={update.director}
					/>
				</div>
				<div>
					<label htmlFor="metascore">Metascore: </label>
					<input
						type="number"
						name="metascore"
						onChange={handleChange}
						value={update.metascore}
					/>
				</div>
				<div>
					<label htmlFor="stars">Stars: </label>
					{update.stars.map((star, i) => {
						return (
							<input
								type="text"
								name={star}
								onChange={handleStars}
								value={star}
								key={i}
							/>
						);
					})}
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
