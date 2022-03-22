import React from 'react'

import './pagination.scss';

import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'



const Pagination = ({ filteredUsers, itemPerPage, currentPage,  setCurrentPage, pageNumberLimit, setPageNumberLimit, maxPageNumberLimit, setMaxPageNumberLimit, minPageNumberLimit, setMinPageNumberLimit }) => {
    var pages = [];

    for(let i=1; i<=Math.ceil(filteredUsers.length/itemPerPage); i++) {
        pages.push(i);
    };

    const handleClick = e => {
        setCurrentPage(Number(e.target.id));
    };
    const handleFirstBtn = () => {
        setCurrentPage(1);
        setMaxPageNumberLimit(3);
        setMinPageNumberLimit(0);
    };
    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if((currentPage -1)%pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit) {
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
        } else {
            return null;
        }
    });
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage+1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handleLastBtn = () => {
        setCurrentPage(Math.ceil(filteredUsers.length/itemPerPage));
        setMaxPageNumberLimit(Math.ceil(filteredUsers.length/itemPerPage));
        setMinPageNumberLimit(Math.ceil(filteredUsers.length/itemPerPage)-pageNumberLimit);
    };



    // let pageDecrementBtn = null;
    // if(pages.length > maxPageNumberLimit) {
    //     pageDecrementBtn = <li><button onClick={handlePrevBtn}>&hellip;</button></li>
    // }
    // let pageIncrementBtn = null;
    // if(pages.length > maxPageNumberLimit) {
    //     pageIncrementBtn = <li><button onClick={handleNextBtn}>&hellip;</button></li>
    // }
    
    console.log(currentPage, pageNumberLimit, minPageNumberLimit, maxPageNumberLimit, pages.length);
    

    return (
        <nav id="Pagination" className='pagination' aria-label="Page navigation">
            <ul>
                <li>
                    <button
                        id="first"
                        name="first"
                        className={`key ${currentPage === pages[0] ? "disabled" : null}`}
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
                        className={`key ${currentPage === pages[0] ? "disabled" : null}`}
                        onClick={handlePrevBtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >
                        <FaAngleLeft />
                    </button>
                </li>
                <li>
                    <button
                        className={` ${currentPage < pageNumberLimit+1 ? "disabled" : null}`} 
                        onClick={handlePrevBtn} 
                        disabled={currentPage < pageNumberLimit+1 ? true : false}
                    >
                        &hellip;
                    </button>
                </li>
                {/* {pageDecrementBtn} */}
                {renderPageNumbers}
                {/* {pageIncrementBtn} */}
                <li>
                    <button 
                        className={` ${currentPage > pages.length+1 - pageNumberLimit ? "disabled" : null}`}
                        onClick={handleNextBtn}
                        disabled={currentPage > pages.length+1 - pageNumberLimit ? true : false}
                    >
                        &hellip;
                    </button>
                </li>
                <li>
                    <button
                        id="next"
                        name="next"
                        onClick={handleNextBtn}
                        className={`key ${currentPage === pages[pages.length - 1] ? "disabled" : null}`}
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
                        className={`key ${currentPage === pages[pages.length - 1] ? "disabled" : null}`}
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