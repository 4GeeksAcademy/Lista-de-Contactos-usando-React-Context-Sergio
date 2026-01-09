import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (contactId && store.contacts.length > 0) {
            const existingContact = store.contacts.find(c => c.id === parseInt(contactId));
            if (existingContact) {
                setContact({
                    name: existingContact.name,
                    email: existingContact.email,
                    phone: existingContact.phone,
                    address: existingContact.address
                });
            }
        }
    }, [contactId, store.contacts]);

    const handleSubmit = () => {
        const url = `https://playground.4geeks.com/contact/agendas/agenda-de-sergio/contacts${contactId ? `/${contactId}` : ""}`;
        
        fetch(url, {
            method: contactId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        })
        .then(response => {
            if (response.ok) navigate("/");
            else if (response.status === 404) {
                fetch("https://playground.4geeks.com/contact/agendas/agenda-de-sergio", { method: "POST" })
                    .then(() => handleSubmit());
            }
        })
        .catch(error => console.error("Error:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{contactId ? "Update contact" : "Add a new contact"}</h1>
            <form className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={contact.name} 
                        onChange={e => setContact({...contact, name: e.target.value})} 
                        placeholder="Full Name" 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={contact.email} 
                        onChange={e => setContact({...contact, email: e.target.value})} 
                        placeholder="Enter email" 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={contact.phone} 
                        onChange={e => setContact({...contact, phone: e.target.value})} 
                        placeholder="Enter phone" 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={contact.address} 
                        onChange={e => setContact({...contact, address: e.target.value})} 
                        placeholder="Enter address" 
                    />
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary w-100">Save</button>
                <Link to="/" className="d-block text-center mt-3">or get back to contacts</Link>
            </form>
        </div>
    );
};