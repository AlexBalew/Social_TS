import React, {useState} from "react";
import s from './Pagination.module.css';
import cn from "classnames";


type PaginationPropsType = {
    totalItemsAmount: number
    pageSize: number
    currentPage: number
    onPageNumberChange: (p: number) => void
    numberOfPagesInOnePortion: number

}

let Pagination = ({
                      totalItemsAmount,
                      pageSize,
                      currentPage,
                      onPageNumberChange,
                      numberOfPagesInOnePortion = 8,
                      ...props
                  }: PaginationPropsType) => {

    let totalAmountOfPages = Math.ceil(totalItemsAmount / pageSize)
    let pages = []
    for (let i = 1; i <= totalAmountOfPages; i++) {
        pages.push(i)
    }

    let numberOfPortions = Math.ceil(totalAmountOfPages / numberOfPagesInOnePortion)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * numberOfPagesInOnePortion + 1
    let rightPortionPageNumber = portionNumber * numberOfPagesInOnePortion

    return (

        <div className={s.pagination}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                                 onClick={() => {
                                     onPageNumberChange(p)
                                 }}>{p} </span>
                })}

            {numberOfPortions > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>next</button>}
        </div>
    )
}

export default Pagination