import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const Home = () => {
    return (
        <>
            <h1>
                Home Page Ecoleta
            </h1>
            <Link to="/user-list">
                <span>
                    <FiLogIn />
                </span>
                <strong>
                    Acesse a lista de usuários
                </strong>               
            </Link>
        </>
    )
}

export default Home;