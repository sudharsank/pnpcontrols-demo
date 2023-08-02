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
            let listItem: any = await props.sp.web.lists.getById('8a698bcf-9ec5-4ba9-9b80-b0c8507eb762')
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
                                <ListItemAttachments listId='8a698bcf-9ec5-4ba9-9b80-b0c8507eb762'
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
