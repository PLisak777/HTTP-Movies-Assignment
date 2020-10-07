import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { fetchMovie } from './Movie';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = ({ fetchMovie }) => {
    const [item, setItem] = useState(initialState);
    const { id } = useParams()
    const { push } = useHistory()

    useEffect(() => {
        fetchMovie()
            .then(res => {
                console.log('pl: UpdateForm.js: fetchMovie: fetch results: res: ', res)
                setItem(res.data)
            })
            .catch(err => {
                console.error('unable to retrieve movies', err.message)
            })
    })

    return (
        <div>
            
        </div>
    )
}

export default UpdateForm
