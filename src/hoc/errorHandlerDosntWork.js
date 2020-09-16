import React, { useEffect, useState } from 'react';

import Modal from 'components/UI/Modal/Modal';
import Aux from 'hoc/Aux';

const errorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        useEffect(() => {
            const axiosReq = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });
            const axiosRes = axios.interceptors.response.use(res => res, error => {
                setError(error);
            });

            return () => { //cleaning up the interceptors from the memory
                axios.interceptors.request.eject(axiosReq);
                axios.interceptors.response.eject(axiosRes);    
            };
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
        );
    }
}

export default errorHandler;