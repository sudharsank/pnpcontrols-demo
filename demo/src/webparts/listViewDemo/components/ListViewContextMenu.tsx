import * as React from 'react';
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import { ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import styles from './ListViewDemo.module.scss';

export interface IContextMenuProps {
    item: any;
}

const ListViewContextMenu: React.FC<IContextMenuProps> = (props) => {

    const _handleClick = (item: IContextualMenuItem, msg: string): void => {
        console.log(`Key: ${item.key} - Argument: ${msg}`);
    };

    return (
        <div className={styles.divContextMenu}>
            <IconButton id='ContextualMenuButton1'
                text=''
                width='25'
                split={false}
                iconProps={{ iconName: 'MoreVertical' }}
                menuIconProps={{ iconName: '' }}
                menuProps={{
                    shouldFocusOnMount: true,
                    items: [
                        {
                            key: 'View',
                            name: 'View Case',
                            onClick: (e, i) => _handleClick(i, props.item.CaseID + ' Case ID')
                        },
                        {
                            key: 'divider_1',
                            itemType: ContextualMenuItemType.Divider
                        },
                        {
                            key: 'edit',
                            name: 'Edit Case',
                            onClick: (e, i) => _handleClick(i, props.item.CaseStatus + ' Case Status')
                        },
                        {
                            key: 'share',
                            name: 'Share Case',
                            onClick: (e, i) => _handleClick(i, props.item.BizSegment + ' Business Segment')
                        },
                        {
                            key: 'delete',
                            name: 'Delete Case',
                            disabled: true,
                            onClick: () => console.error('Disabled action should not be clickable.')
                        }
                    ]
                }} />
        </div>
    );
}

export default ListViewContextMenu;