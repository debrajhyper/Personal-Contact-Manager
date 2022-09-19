import React from 'react'
import TableRowSkeleton from './TableRowSkeleton'

const TableRowSkeletonStack = ({ count }) => {
    const arr = [];
    for(let i=0; i<count; i++) {
        arr.push(i);
    }
    return (
        arr.map(_ => {
            return <TableRowSkeleton key={_} />
        })
    )
}

export default TableRowSkeletonStack