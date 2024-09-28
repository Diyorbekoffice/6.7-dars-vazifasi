import React, { useState, useEffect } from 'react';
function Contact() {
    const [user, setUser] = useState([]);
    const [loading , setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=50')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(function() {
                setLoading(false)
            })
    }, []);
    return (
        <>
        { loading && <p style={{textAlign:'center'}}>loading...</p>}
       
        <div className="flex flex-wrap justify-center p-5">
            {
                user.length > 0 && user.map((value) => (
                    <div key={value.id} className="border border-gray-300 rounded-lg p-4 m-2 w-48 text-center shadow-md">
                        <img src={value.thumbnailUrl} alt={value.title} className="max-w-full rounded" />
                        <h3 className="font-semibold mb-2">{value.title}</h3>
                    </div>
                ))
            }
        </div>
        </>
    );
}
export default Contact;
