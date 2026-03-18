import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    console.log("INTERCEPTOR TOKEN:", token);

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const createPost = (data) => 
    api.post("/posts", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

export const getPosts = () => {
    return api.get("/posts");
}


export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

export const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data);
};

export const getUserPosts = () => {
    return api.get("/posts/my-posts");
};

export const getSinglePost = (id) => {
    return api.get(`/posts/${id}`);
};
