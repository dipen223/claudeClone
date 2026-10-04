
export const authFetch = async (path, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    }

    return response;
};
