import React, { useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    groupSize?: number
}

let Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, groupSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let groupCount = Math.ceil(pagesCount / groupSize)
    let [groupNumber, setGroupNumber] = useState(1)
    let leftGroupPageNumber = (groupNumber - 1) * groupSize + 1
    let rightGroupPageNumber = groupNumber * groupSize

    return <div className={cn(styles.paginator)}>
        {groupNumber > 1 &&
            <button onClick={() => { setGroupNumber(groupNumber - 1) }}>Prev</button>}
        {pages.filter(p => p >= leftGroupPageNumber && p <= rightGroupPageNumber).map((p) => {
            return <span className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
                key={p}
                onClick={(e) => { onPageChanged(p) }}>{p}
            </span>
        })}
        {groupCount > groupNumber &&
            <button onClick={() => { setGroupNumber(groupNumber + 1) }}>Next</button>}
    </div>
}
export default Paginator