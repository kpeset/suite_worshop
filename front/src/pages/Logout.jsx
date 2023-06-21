

function Logout() {
    const handleSubmit = (event) => {
        event.preventDefault();
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='submit' value='Disconnect' />
        </form>
    );
};

export default Logout;