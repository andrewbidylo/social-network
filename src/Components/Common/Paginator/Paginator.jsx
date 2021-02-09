import React from 'react'
import styles from './Paginator.module.css'



let Paginator = ({ totalCount, pageSize, currentPage, onPageChanged }) => {

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={currentPage === p && styles.selectedPage}
                onClick={() => { onPageChanged(p) }}>{p}
            </span>
        })}
    </div>
}
export default Paginator