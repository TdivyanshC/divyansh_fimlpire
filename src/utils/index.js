import axios from 'axios';

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_KEY,
    },
});

export const fetchToken = async () => {
    try {
        const { data } = await moviesApi.get('/authentication/token/new');

        if (data.success) {
            const token = data.request_token; // Extract the token from the response

            // Store the token in localStorage
            localStorage.setItem('request_token', token);

            // Redirect the user to authenticate the token
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.error('Sorry, your token could not connect:', error);
    }
};


export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if(token) {
        try {
            const {data: {session_id}} = await moviesApi.post('authentication/session/new', {
                request_token: token,
            });

            localStorage.setItem('session_id', session_id);

            return session_id;
        } catch (error) {
            console.log(error);
            
        }
    }
}