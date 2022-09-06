import React from 'react';

import { Form } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const FormFavorite = ({ favorite, cName, functionClick }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Favorite">
            <div className={`field-favorite ${favorite ? 'ok' : 'no'}`} title="Favorite" onClick={functionClick}>
                {
                    favorite
                        ? <FaHeart size={25} />
                        : <FaRegHeart size={25} />
                }
            </div>
        </Form.Group>
    )
}

export default FormFavorite