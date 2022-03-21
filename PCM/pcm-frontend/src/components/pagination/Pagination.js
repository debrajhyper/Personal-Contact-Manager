import React from 'react'

import './pagination.scss';

import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'



const Pagination = ({ filteredUsers, itemPerPage, currentPage,  setCurrentPage }) => {
    var pages = [];

    for(let i=1; i<=Math.ceil(filteredUsers.length/itemPerPage); i++) {
        pages.push(i);
    };

    const handleClick = e => {
        setCurrentPage(Number(e.target.id));
    };
    const handleFirstBtn = () => {
        setCurrentPage(1);
    };
    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
    };
    const renderPageNumbers = pages.map(number => {
        return (
            <li key={number}>
                <button
                    id={number}
                    className={currentPage === number ? "active" : null}
                    onClick={handleClick}
                >
                    {number}
                </button>
            </li>
        );
    });
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleLastBtn = () => {
        setCurrentPage(Math.ceil(filteredUsers.length/itemPerPage));
    };

    return (
        <nav id="Pagination" className='pagination' aria-label="Page navigation">
            <ul>
                <li>
                    <button
                        id="first"
                        name="first"
                        className={currentPage === pages[0] ? "disabled" : null}
                        onClick={handleFirstBtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >
                        <FaAngleDoubleLeft />
                    </button>
                </li>
                <li>
                    <button
                        id="prev"
                        name="prev"
                        className={currentPage === pages[0] ? "disabled" : null}
                        onClick={handlePrevBtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >
                        <FaAngleLeft />
                    </button>
                </li>
                {renderPageNumbers}
                <li>
                    <button
                        id="next"
                        name="next"
                        onClick={handleNextBtn}
                        className={currentPage === pages[pages.length - 1] ? "disabled" : null}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        <FaAngleRight />
                    </button>
                </li>
                <li>
                    <button
                        id="last"
                        name="last"
                        onClick={handleLastBtn}
                        className={currentPage === pages[pages.length - 1] ? "disabled" : null}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        <FaAngleDoubleRight />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination