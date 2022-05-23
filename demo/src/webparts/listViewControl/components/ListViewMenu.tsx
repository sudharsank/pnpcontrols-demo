import * as React from "react";
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

export interface IListViewMenuProps {
	item: any;
}

const ListViewMenu: React.FC<IListViewMenuProps> = (props) => {

	const _viewItem = (item: any) => {
		console.log("View Item: ", item);
	};

	const _editItem = (item: any) => {
		console.log("Edit Item: ", item);
	};
	return (
		<IconButton id="ContextualMenuButton1" width={'30'} split={false} iconProps={{ iconName: 'MoreVertical' }} menuIconProps={{ iconName: '' }}
			menuProps={{
				shouldFocusOnMount: true,
				items: [
					{
						key: 'menu1',
						name: 'View Item',
						onClick: (ev, item) => _viewItem(props.item)
					},
					{
						key: 'menu2',
						name: 'Edit Item',
						onClick: (ev, item) => _editItem(props.item)
					},
					{
						key: 'divider_1',
						itemType: ContextualMenuItemType.Divider
					},
					{
						key: 'disabled',
						name: 'Disabled action',
						disabled: true,
						onClick: () => console.error('Disabled action should not be clickable.')
					}
				]
			}} />
	);
};

export default ListViewMenu;