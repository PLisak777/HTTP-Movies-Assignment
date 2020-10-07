import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {
    const [update, setUpdate] = useState(initialState);
    const { id } = useParams();
    const { push } = useHistory();

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:5000/api/movies/${id}`)
    //         .then((res) => {
    //             console.log('pl: UpdateMovie.js: useEffect: axios get: res: ', res)
    //             setUpdate(res.data)
    //         })
    //         .catch((err) => {
    //             console.error('Unable to fetch data', err.message)
    //         })
    // }, [])

    const handleChange = (e) => {
        setUpdate({
            ...update, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, update)
            .then((res) => {
                console.log('pl: UpdateMovies.js: handleSubmit: axios put success: res: ', res)
                props.setMovieList(res.data)
                push('/movies')
            })
            .catch((err) => {
                console.error('Unable to update movie', err.message)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title: </label>
                    <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={update.title}
                    />
                </div>
                <div>
                    <label htmlFor='director'>Director: </label>
                    <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    value={update.director}
                    />
                </div>
                <div>
                    <label htmlFor='metascore'>Metascore: </label>
                    <input
                    type='number'
                    name='metascore'
                    onChange={handleChange}
                    value={update.metascore}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
