import axios from "axios";

export const axiosInstance= axios.create({
    baseURL: `http://localhost:3005/v1`,
    withCredentials:true,
    
}


)
console.log(`api`,`${import.meta.env.VITEAPI}`);


// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}/v1`, // Ensure there's a comma after this line
//     withCredentials: true,
// });

// console.log(`api`, `${import.meta.env.VITE_API_URL}`); // Log the correct environment variable
