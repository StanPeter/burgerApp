import React, { useEffect, useState } from "react";
import Modal from "../components/UI/Modal/Modal";
import Aux from "./Aux";

const errorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        useEffect(() => {
            axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                setError(error);
            });
        })

        const errorCloseHandler = () => {
            setError(null);
        };

        return (
            <Aux>
                <Modal show={error} hide={errorCloseHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default errorHandler;