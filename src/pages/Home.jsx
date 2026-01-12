import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [idToDelete, setIdToDelete] = useState(null);

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
        setIdToDelete(id);         
    };

    const executeDelete = () => {
        if (idToDelete) {
            fetch(`https://playground.4geeks.com/contact/agendas/agenda-de-sergio/contacts/${idToDelete}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    const newContacts = store.contacts.filter(contact => contact.id !== idToDelete);
                    dispatch({ type: 'set_contacts', payload: newContacts });
                }
            })
            .catch(error => console.error("Error:", error));
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

          
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Realmente deseas eliminar este contacto? Esta acción no se puede deshacer.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={executeDelete} 
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};