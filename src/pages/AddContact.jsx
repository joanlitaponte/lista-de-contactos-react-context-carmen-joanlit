import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddContact = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const contact = location.state;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setAddress(contact.address);
        }
    }, []);

    const saveContact = async () => {
        try {
            await fetch(
                contact
                    ? `https://playground.4geeks.com/contact/agendas/agenda_carmen/contacts/${contact.id}`
                    : "https://playground.4geeks.com/contact/agendas/agenda_carmen/contacts",
                {
                    method: contact ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        address,
                        agenda_slug: "agenda_carmen"
                    })
                }
            );

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        
        <div className="container mt-5">
            <div
                className="card p-5 shadow mx-auto"
                style={{ maxWidth: "800px" }}
            >

                
                <h1 className="text-center mb-5">
                    {contact ? " Edit Contact" : "Add New Contact"}
                </h1>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-success flex-fill"
                        onClick={saveContact}
                    >
                         Save Contact
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddContact;