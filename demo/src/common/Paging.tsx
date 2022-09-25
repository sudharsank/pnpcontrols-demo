import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styles from './Paging.module.scss';

export type PageUpdateCallback = (pageNumber: number) => void;

export interface IPagingProps {
    totalItems: number;
    itemsCountPerPage: number;
    onPageUpdate: PageUpdateCallback;
    currentPage: number;
}

export interface IPagingState {
    currentPage: number;
}

const Paging: React.FC<IPagingProps> = (props) => {
    const [currentPage, setcurrentPage] = useState<number>(props.currentPage);

    const _pageChange = (pageNumber: number): void => {
        setcurrentPage(pageNumber);
        props.onPageUpdate(pageNumber);
    };

    useEffect(() => {
        setcurrentPage(props.currentPage);
    }, [props.currentPage]);

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.searchWp__paginationContainer__pagination}>
                <Pagination
                    activePage={currentPage}
                    firstPageText={<Icon iconName="ChevronLeftEnd6" aria-hidden='true'></Icon>}
                    lastPageText={<Icon iconName="ChevronRightEnd6" aria-hidden='true'></Icon>}
                    prevPageText={<Icon iconName="ChevronLeftSmall" aria-hidden='true'></Icon>}
                    nextPageText={<Icon iconName="ChevronRightSmall" aria-hidden='true'></Icon>}
                    activeLinkClass={styles.active}
                    itemsCountPerPage={props.itemsCountPerPage}
                    totalItemsCount={props.totalItems}
                    pageRangeDisplayed={5}
                    onChange={_pageChange}
                />
            </div>
        </div>
    );
};

export default Paging;