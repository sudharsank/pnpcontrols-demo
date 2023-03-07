import * as React from 'react';
import { useState } from 'react';
import styles from './ToolbarDemo.module.scss';
import { IToolbarDemoProps } from './IToolbarDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Toolbar } from '@pnp/spfx-controls-react/lib/Toolbar';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { map } from 'lodash';

const ToolbarDemo: React.FC<IToolbarDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>(undefined);
    const [filitems, setFilItems] = useState<any[]>(undefined);
    const [itemCats, setItemCats] = useState<string[]>(undefined);
    const [gridCols, setGridCols] = React.useState<IColumn[]>(undefined);
    const [selectionDetails, setSelectionDetails] = useState<string>(undefined);

    const columns: IColumn[] = [
        {
            key: 'colTitle',
            name: 'Title',
            fieldName: 'Title',
            minWidth: 100,
            maxWidth: 200,
            onRender: (item?: any, index?: number, column?: IColumn) => {
                return (
                    <div>{item?.Title}</div>
                );
            }
        },
        {
            key: 'colDescription',
            name: 'Description',
            fieldName: 'Description',
            minWidth: 100,
            onRender: (item?: any, index?: number, column?: IColumn) => {
                return (
                    <div>{item?.Description}</div>
                );
            }
        },
        {
            key: 'colCategory',
            name: 'Category',
            fieldName: 'Category',
            minWidth: 80,
            onRender: (item?: any, index?: number, column?: IColumn) => {
                return (
                    <div>{item?.Category}</div>
                );
            }
        }
    ];

    const _getKey = (item: any, index?: number): string => {
        return item.key;
    };

    const _getSelectionDetails = (): string => {
        let selID: string = undefined;
        if (_selection.getSelectedCount() > 0) {
            selID = (_selection.getSelection()[0] as any).ID;
        }
        return selID;
    };

    const _selection = new Selection({
        onSelectionChanged: () => {
            setSelectionDetails(_getSelectionDetails());
        }
    });

    const _loadListitems = async () => {
        try {
            const items: any[] = await props.sp.web.lists.getByTitle('Announcements')
                .select('ID', 'Title', 'Description', 'Category')
                .items();
            const tempCats: string[] = items.map((obj) => obj.Category).filter((val, index, self) => self.indexOf(val) === index);
            const itemCats: any[] = [];
            tempCats.map((val: any) => {
                itemCats.push({ id: val, title: `${val}` });
            });
            setItemCats(itemCats);
            setItems(items);
            setFilItems(items);
            setGridCols(columns);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const _editSelection = () => {
        if (selectionDetails) console.log(`Selected item Category: ${selectionDetails}`);
        else console.log('Please select any item from the Grid!');
    };

    const _findItem = (findQuery: string) => {
        if (items && findQuery) {
            let filItems: any[] = items.filter((o: any) => o.Title?.toLowerCase().indexOf(findQuery.toLowerCase()) >= 0);
            setFilItems(filItems);
        } else setFilItems(items);
        return '';
    };

    const _filterItems = (selectedFilters: string[]): string[] => {
        console.log(selectedFilters);
        if (selectedFilters.length > 0) {
            let filItems: any[] = items.filter((item) => selectedFilters.indexOf(item.Category) !== -1);
            setFilItems(filItems);
        } else setFilItems(items);
        return selectedFilters;
    };

    React.useEffect(() => {
        _loadListitems();
    }, []);

    return (
        <section className={`${styles.toolbarDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>Welcome to SharePoint Framework!</h3>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <Toolbar actionGroups={{
                            'group1': {
                                'action1': {
                                    title: 'Edit',
                                    iconName: 'Edit',
                                    onClick: _editSelection
                                },
                                'action2': {
                                    title: 'New',
                                    iconName: 'Add',
                                    onClick: () => { console.log('New action click'); }
                                }
                            }
                        }}
                            filters={[{
                                id: "f1",
                                title:
                                    "Categories",
                                items: itemCats
                            }
                            ]}
                            find={true}
                            onFindQueryChange={_findItem}
                            onSelectedFiltersChange={_filterItems} />
                        <DetailsList
                            items={filitems || items}
                            columns={columns}
                            selectionMode={SelectionMode.single}
                            getKey={_getKey}
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                            selection={_selection}
                            selectionPreservedOnEmptyClick={true}
                            enterModalSelectionOnTouch={true}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default ToolbarDemo;
