import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovie = (props) => {
	const [newMovie, setNewMovie] = useState({
		id: 0,
		title: '',
		director: '',
		metascore: 0,
		stars: [],
    });
    const { push } = useHistory();
    
    const handleChange = (e) => {
        setNewMovie({
            ...newMovie, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then((res) => {
                console.log('pl: AddMovie.js: handleSubmit: axios post: res: ', res)
                props.setMovie(res.data)
                push('/')
            })
            .catch((err) => {
                console.error('Unable to add movie', err.message)
            })
    }

	// const handleStars = (e) => {
	// 	setNewMovie({
	// 		...newMovie,
	// 		stars: newMovie.stars.map((star) => {
	// 			if (e.target.name === star) {
	// 				return e.target.value;
	// 			} else {
	// 				return star;
	// 			}
	// 		}),
	// 	});
	// };

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						value={newMovie.title}
					/>
				</div>
				<div>
					<label htmlFor="director">Director: </label>
					<input
						type="text"
						name="director"
						onChange={handleChange}
						value={newMovie.director}
					/>
				</div>
				<div>
					<label htmlFor="metascore">MetaScore: </label>
					<input
						type="number"
						name="metascore"
						onChange={handleChange}
						value={newMovie.metascore}
					/>
				</div>
                {/* <div>
					<label htmlFor="stars">Stars: </label>
					{newMovie.stars.map((star, i) => {
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
				</div> */}
				<button>Add New Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;
