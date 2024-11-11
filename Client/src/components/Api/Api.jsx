export const url = "http://localhost:3001/api";

export const setHeaders = () => {
    const token = localStorage.getItem("token");
    console.log("Token en setHeaders:", token); // Verifica que el token esté disponible
    return {
        headers: {
            "Authorization": `Bearer ${token}`, // Asegúrate de que el formato sea correcto
        },
    };
};

