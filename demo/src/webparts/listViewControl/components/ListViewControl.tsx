import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './ListViewControl.module.scss';
import { IListViewControlProps } from './IListViewControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import ListViewMenu from './ListViewMenu';

const ListViewControl: React.FC<IListViewControlProps> = (props) => {
	const {
		description,
		isDarkTheme,
		environmentMessage,
		hasTeamsContext,
		userDisplayName,
		_sp
	} = props;
	const [items, setItems] = useState<any[]>(undefined);
	const [selItems, setSelItems] = useState<string>(undefined);
	const viewFields: IViewField[] = [
		{ name: 'ID', displayName: 'S.No', isResizable: false, sorting: true, minWidth: 20, maxWidth: 40 },
		{ name: 'CaseID', displayName: 'Case ID', isResizable: false, sorting: true, minWidth: 100, maxWidth: 100 },
		{
			name: '', sorting: false, maxWidth: 40,
			render: (rowItem: any) => {
				return (<ListViewMenu item={rowItem} />);
			}
		},
		{ name: 'CIFStatus', displayName: 'CIF Status', sorting: true, minWidth: 100, maxWidth: 100 },
		{ name: 'CaseStatus', displayName: 'Case Status', sorting: true, minWidth: 100, maxWidth: 100 },
		{ name: 'BizSegment', displayName: 'Business Segment', sorting: true, minWidth: 100, maxWidth: 100 }
	];

	const loadListItems = async () => {
		let items = await _sp.web.lists.getByTitle('Case Master').items.getAll();
		setItems(items);
	};

	const _getSelected = async (selecteditems: any[]) => {
		if (selecteditems && selecteditems.length > 0) {
			let selItem: string[] = [];
			selecteditems.map((item: any) => {
				selItem.push(item.CaseID);
			});
			if (selItem.length > 0) setSelItems(selItem.join(', '));
			console.log(selItem);
		} else setSelItems(undefined);
	};

	useEffect(() => {
		loadListItems();
	}, []);

	return (
		<section className={`${styles.listViewControl} ${hasTeamsContext ? styles.teams : ''}`}>
			{items ? (
				<>
					{selItems && <p>Selected Item(s): {selItems}</p>}
					<ListView items={items} viewFields={viewFields} compact showFilter filterPlaceHolder='Search...' stickyHeader
						selectionMode={SelectionMode.multiple} selection={_getSelected} />
				</>
			) : (
				<p>Loading Items...</p>
			)}

		</section>
	);
};

export default ListViewControl;
