import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Home = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [inputValue, setInputValue] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [editIndex, setEditIndex] = useState(-1);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleInputValue = () => {
        if (!firstName && !lastName) {
            return;
        }
        const status = firstName && lastName ? "completed" : "pending";
        if (editIndex === -1) {
            setInputValue((prevVal) => [
                ...prevVal,
                {
                    firstName: firstName,
                    lastName: lastName,
                    status: status
                }
            ]);
        } else {
            const updatedItems = [...inputValue];
            updatedItems[editIndex] = {
                firstName: firstName,
                lastName: lastName,
                status: status
            };
            setInputValue(updatedItems);
            setEditIndex(-1);
        }

        setFirstName("");
        setLastName("");
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFirstName(inputValue[index].firstName);
        setLastName(inputValue[index].lastName);
    };

    const DeleteItem = (index) => {
        const filteredItems = [...inputValue];
        filteredItems.splice(index, 1);
        setInputValue(filteredItems);
        setEditIndex(-1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const filteredItems = inputValue.filter(item =>
        statusFilter === "ALL" || item.status === statusFilter
    );

    return (
        <>
            <div>
                <h1>MY TODO</h1>
                <input
                    type="text"
                    placeholder="TODO Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="p-1"
                />
                 
                <input
                    type="text"
                    placeholder="DESCRIPTION"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="p-1"
                />
                 
                <Button variant="primary" onClick={handleInputValue} className="add">
                    {editIndex === -1 ? "ADD TODO" : "Update"}
                </Button>
            </div>
            <div className="mt-3">
                <div className="first">
                    <h3>MY TODO</h3>
                    <h3>Status filter:
                        <select onChange={handleStatusFilterChange} id="delete" value={statusFilter}>
                            <option value="ALL">ALL</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </h3>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            {filteredItems.map((item, index) => (
                                <div className="cards" key={index}>
                                    <h5>NAME: {item.firstName}</h5>
                                    <h5>DESCRIPTION: {item.lastName}</h5>
                                    <h5>STATUS:<span id="delete">{item.status}</span></h5>
                                    <Button variant="warning" id="edit"onClick={() => handleEdit(index)}>Edit</Button>
                                    <Button variant="danger"id="delete" onClick={() => DeleteItem(index)}>Delete</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;