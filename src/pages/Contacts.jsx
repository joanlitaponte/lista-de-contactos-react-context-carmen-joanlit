import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();

    const navigate = useNavigate();


    const createAgenda = async () => {

        try {

            const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/agenda_carmen",
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            console.log(data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        createAgenda();
        getContacts();

    }, []);

    const getContacts = async () => {

        try {

            const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/agenda_carmen/contacts"
            );

            const data = await response.json();

            dispatch({
                type: "set_contacts",
                payload: data.contacts
            });

        } catch (error) {

            console.log(error);
        }
    };

    const deleteContact = async (id) => {

        try {

            await fetch(
                `https://playground.4geeks.com/contact/agendas/agenda_carmen/contacts/${id}`,
                {
                    method: "DELETE"
                }
            );

            getContacts();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-end mb-4">

                <Link to="/add-contact">

                    <button className="btn btn-success">
                        Add new contact
                    </button>

                </Link>

            </div>

            <div className="card p-4">

                {
                    store.contacts?.map((contact) => (

                        <div
                            key={contact.id}
                            className="row align-items-center border-bottom pb-3 mb-3"
                        >

                            <div className="col-md-2 text-center">

                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    className="rounded-circle"
                                    width="120"
                                />

                            </div>

                            <div className="col-md-8">

                                <h4>{contact.name}</h4>

                                <p>{contact.address}</p>

                                <p>{contact.phone}</p>

                                <p>{contact.email}</p>

                            </div>

                            <div className="col-md-2 d-flex justify-content-end align-items-center">

                                <button
                                    className="btn btn-light"

                                    onClick={() =>
                                        navigate("/edit-contact", {
                                            state: contact
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </button>

                                <button
                                    className="btn btn-light ms-2"
                                    onClick={() => deleteContact(contact.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Contacts;