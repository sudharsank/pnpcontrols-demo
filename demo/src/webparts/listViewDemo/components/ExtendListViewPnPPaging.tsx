import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './ListViewDemo.module.scss';
import { IListViewDemoProps } from './IListViewDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { useBoolean } from '@uifabric/react-hooks';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as moment from 'moment';
import ListViewContextMenu from './ListViewContextMenu';
import { Pagination } from "@pnp/spfx-controls-react/lib/Pagination";

const slice: any = require('lodash/slice');

const ExtendListViewPnPPaging: React.FC<IListViewDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [loading, { setTrue: displayLoading, setFalse: hideLoading }] = useBoolean(true);
    const [listItems, setListItems] = useState<any[]>(undefined);

    const [pagedItems, setPagedItems] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const viewFields: IViewField[] = [
        {
            name: 'CaseID',
            displayName: 'Case ID',
            minWidth: 100,
            maxWidth: 150,
            sorting: true
        },
        {
            name: '',
            displayName: '',
            sorting: false,
            maxWidth: 40,
            render: (rowItem: any): any => {
                const element: any = <ListViewContextMenu item={rowItem} />;
                return element;
            }
        },
        {
            name: 'CaseStatus',
            displayName: 'Case Status',
            minWidth: 100,
            maxWidth: 150
        },
        {
            name: 'BizSegment',
            displayName: 'Business Segment',
            minWidth: 100,
            maxWidth: 150
        },
        {
            name: 'Author.Title',
            displayName: 'Created By',
            minWidth: 200,
            maxWidth: 250,
            sorting: true,
            render: (item?: any): any => {
                const element: any = <Persona size={PersonaSize.size24} showInitialsUntilImageLoads imageShouldStartVisible
                    text={item['Author.Title']} imageUrl={`/_layouts/15/userphoto.aspx?username=${item['Author.EMail']}&size=M`} />
                return element;
            }
        },
        {
            name: 'Created',
            displayName: 'Created',
            minWidth: 200,
            maxWidth: 250,
            sorting: true,
            render: (item?: any): any => {
                const element: any = <div>{moment(item.Created).format("DD-MMM-YYYY")}</div>
                return element;
            }
        }
    ];
    const groupFields: IGrouping[] = [
        {
            name: 'Author.Title',
            order: GroupOrder.ascending
        }
    ];

    const _getListItems = async (): Promise<void> => {
        const items: any[] = await props.sp.web.lists.getByTitle('Case Master').items
            .select('CaseID', 'CaseStatus', 'BizSegment', 'Author/Title', 'Author/EMail', 'Created')
            .expand('Author')
            ();
        setListItems(items);
        hideLoading();
    };

    const _getSelectedItem = (items: any[]) => {
        console.log('Selected Item(s): ', items);
    };

    const _onPageUpdate = async (pageno?: number) => {
        var currentPge = (pageno) ? pageno : currentPage;
        var startItem = ((currentPge - 1) * pageSize);
        var endItem = currentPge * pageSize;
        let filItems = slice(listItems, startItem, endItem);
        setCurrentPage(currentPge);
        setPagedItems(filItems);
    };

    useEffect(() => {
        if (listItems) _onPageUpdate();
    }, [listItems]);

    useEffect(() => { _getListItems() }, []);

    return (
        <section className={`${styles.listViewDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
                <h2>Well done, {escape(userDisplayName)}!</h2>
            </div>
            <div>
                {loading ? (
                    <div>Loading, Please wait...</div>
                ) : (
                    <>
                        <ListView
                            items={pagedItems}
                            viewFields={viewFields}
                            compact={true}
                            selectionMode={SelectionMode.multiple}
                            selection={_getSelectedItem}
                            showFilter={true}
                            filterPlaceHolder="Search..."
                            stickyHeader={true}
                            groupByFields={groupFields}
                        />
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.round(listItems.length / pageSize)}
                                onChange={(page) => _onPageUpdate(page)}
                                limiter={3} // Optional - default value 3
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ExtendListViewPnPPaging;