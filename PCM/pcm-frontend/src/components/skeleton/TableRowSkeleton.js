import React from 'react'
import Skeleton from 'react-loading-skeleton'

const TableRowSkeleton = () => {
    return (
        <tr className="data-row skeleton">
            <td className="text-center"><Skeleton className='checkbox' /></td>
            <td className="text-center"><Skeleton /></td>
            <td className="text-left" >
                <Skeleton circle height="100%" containerClassName='img-border me-2' />
                <Skeleton className='contact_name' />
            </td>
            <td className="text-left"><Skeleton /></td>
            <td className="text-left"><Skeleton /></td>
            <td className="text-center">
                <Skeleton borderRadius={10} className='img-border' />
            </td>
            <td className="text-center actions">
                <Skeleton containerClassName='button' className='btn me-3' />
                <Skeleton containerClassName='button' className='btn'/>
            </td>
        </tr>
    )
}

export default TableRowSkeleton