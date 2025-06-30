document.addEventListener('DOMContentLoaded', () => {
    console.log('Book Reading Tracker Frontend Loaded!');

    // Basic example of fetching data from the backend
    // This would be replaced by more complex UI logic
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            console.log('Users:', data);
            // You could dynamically add this to the DOM
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Uncomment to test fetching users on load
    // fetchUsers();
});
