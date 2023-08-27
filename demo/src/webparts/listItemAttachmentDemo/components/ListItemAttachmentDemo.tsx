import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './ListItemAttachmentDemo.module.scss';
import { IListItemAttachmentDemoProps } from './IListItemAttachmentDemoProps';
import { ListItemAttachments } from '@pnp/spfx-controls-react/lib/ListItemAttachments';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const ListItemAttachmentDemo: React.FC<IListItemAttachmentDemoProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [item, setItem] = useState<any>(undefined);

    const {
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;

    useEffect(() => {
        (async () => {
            let listItem: any = await props.sp.web.lists.getById('f0e09a02-8850-4893-83fb-a258f15f9d4f')
                .items.getById(1).select('Title')();
            setItem(listItem);
            setLoading(false);
        })();
    }, []);

    return (
        <section className={`${styles.listItemAttachmentDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div>
                {loading ? (
                    <div>loading...</div>
                ) : (
                    <>
                        {item &&
                            <>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>Title: </span>{item.Title}
                                </div>
                                <ListItemAttachments listId='f0e09a02-8850-4893-83fb-a258f15f9d4f'
                                    itemId={1}
                                    context={props.context as any}
                                    disabled={false} />
                            </>
                        }
                    </>
                )}
            </div>
        </section>
    );
};

export default ListItemAttachmentDemo;
