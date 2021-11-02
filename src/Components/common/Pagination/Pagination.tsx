import React from "react";
import s from './Pagination.module.css'


type PaginationPropsType = {
    totalUsersAmount: number
    pageSize: number
    currentPage: number
    onPageNumberChange: (p: number) => void
}

let Pagination = ({totalUsersAmount, pageSize, currentPage, onPageNumberChange, ...props}: PaginationPropsType) => {

    let amountOfPages = Math.ceil(totalUsersAmount / pageSize)
    let pages = []
    for (let i = 1; i <= amountOfPages; i++) {
        pages.push(i)
    }

    return (
        <div>

            <div style={{color: 'red'}}>
                {pages.map(p => <span key={p} className={currentPage === p ? s.selected : s.notSelected}
                                      onClick={() => {
                                          onPageNumberChange(p)
                                      }}>{p} </span>)}
            </div>

        </div>
    )
}

export default Pagination