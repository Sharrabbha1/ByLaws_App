// export const API_BASE_URL = "https://39ff-142-189-92-57.ngrok-free.app"; // Replace with your Ngrok URL

// export const searchViolations = async (query) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/search`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ query }),
//         });
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error searching:", error);
//         throw error;
//     }
// };
// api.js

export const API_BASE_URL = "https://bylaw-backend.onrender.com/"; // 🔁 Replace this with your actual Render URL

export const searchViolations = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error searching:", error);
        throw error;
    }
};
