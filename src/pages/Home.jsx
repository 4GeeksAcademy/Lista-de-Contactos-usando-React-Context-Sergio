import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        fetch("https://playground.4geeks.com/contact/agendas/agenda-de-sergio/contacts")
            .then(response => response.json())
            .then(data => {
                const contacts = data.contacts || [];
                dispatch({ type: 'set_contacts', payload: contacts });
            })
            .catch(error => console.error("Error al cargar contactos:", error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
            fetch(`https://playground.4geeks.com/contact/agendas/agenda-de-sergio/contacts/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    const newContacts = store.contacts.filter(contact => contact.id !== id);
                    dispatch({ type: 'set_contacts', payload: newContacts });
                }
            })
            .catch(error => console.error("Error eliminando:", error));
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Mis Contactos</h1>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.contacts.map((item) => (
                    <ContactCard
                        key={item.id}
                        contact={item}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
};