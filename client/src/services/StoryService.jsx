import axios from "axios";



    const http = axios.create({
        baseURL: "http://localhost:8000/api",
    });

    // export default http;

    // function getAllStorys() {
    //     return http.get('/Storys')
    //         .then(response => response.data)
    //         .catch(error=>{
    //             throw error;
    //         });
    // }



export default http;