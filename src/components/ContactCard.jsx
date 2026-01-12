import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
                <img
                    src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-usuario_157943-15752.jpg"
                    alt="profile"
                    className="rounded-circle me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div className="text-start">
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-1 text-muted">
                        <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                    </p>
                    <p className="mb-1 text-muted small">
                        <i className="fas fa-phone me-2"></i>{contact.phone}
                    </p>
                    <p className="mb-0 text-muted small">
                        <i className="fas fa-envelope me-2"></i>{contact.email}
                    </p>
                </div>
            </div>

            <div className="d-flex align-items-center">
                <Link to={`/edit-contact/${contact.id}`} className="btn btn-link p-2 text-dark">
                    <i className="fas fa-pencil-alt"></i>
                </Link>

                <button
                    className="btn btn-link p-2 text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => onDelete(contact.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>
    );
};