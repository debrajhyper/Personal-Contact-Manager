import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { viewContacts, setMinMaxPageNumberLimit } from '../../services/index';

import './pagination.scss';

import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaEllipsisH } from 'react-icons/fa';

const Pagination = () => {
    const { itemPerPage, pageNumberLimit, minPageNumberLimit, maxPageNumberLimit } = useSelector(state => state.pagination);
    const { totalContacts, page } = useSelector(state => state.viewContacts);
    const dispatch = useDispatch();

    const currentPage = page + 1;
    var pages = [];

    for (let i = 1; i <= Math.ceil(totalContacts / itemPerPage); i++) {
        pages.push(i);
    };

    const setCurrentPage = (page) => {
        dispatch(viewContacts(page - 1))
    }

    const handleClick = e => {
        setCurrentPage(Number(e.target.id));
    };
    const handleFirstBtn = () => {
        setCurrentPage(1);
        // setMinPageNumberLimit(0);
        // setMaxPageNumberLimit(3);
        dispatch(setMinMaxPageNumberLimit(0, 3));
    };
    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            // setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            // setMaxPageNumberLimit(minPageNumberLimit);
            dispatch(setMinMaxPageNumberLimit(minPageNumberLimit - pageNumberLimit, minPageNumberLimit));
        }
    };
    const renderPageNumbers = () => {
        return pages.map(number => {
            if (number > minPageNumberLimit && number < maxPageNumberLimit + 1) {
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
            } 
            else {
                return null;
            }
        });
    }
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            // setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            // setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            dispatch(setMinMaxPageNumberLimit(minPageNumberLimit + pageNumberLimit, maxPageNumberLimit + pageNumberLimit));
        }
    };
    const handleLastBtn = () => {
        setCurrentPage(Math.ceil(totalContacts / itemPerPage));
        if (Math.ceil(totalContacts / itemPerPage) > maxPageNumberLimit) {
            // setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            // setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            var minPageLimit = minPageNumberLimit;
            var maxPageLimit = maxPageNumberLimit;
            while(pages?.length > maxPageLimit) {
                minPageLimit += pageNumberLimit;
                maxPageLimit += pageNumberLimit;
            }
            dispatch(setMinMaxPageNumberLimit(minPageLimit, maxPageLimit));
        }
    };

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
                        className={` ${currentPage < pageNumberLimit + 1 ? "disabled" : null}`}
                        onClick={handlePrevBtn}
                        disabled={currentPage < pageNumberLimit + 1 ? true : false}
                    >
                        <FaEllipsisH />
                    </button>
                </li>
                {renderPageNumbers()}
                <li>
                    <button
                        className={` ${maxPageNumberLimit >= pages.length ? "disabled" : null}`}
                        onClick={handleNextBtn}
                        disabled={maxPageNumberLimit >= pages.length ? true : false}
                    >
                        <FaEllipsisH />
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