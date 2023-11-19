import * as React from 'react';
import { FC } from 'react';
import styles from './ListitemCommentsDemo.module.scss';
import { ServiceScope } from "@microsoft/sp-core-library";
import { ListItemComments } from '@pnp/spfx-controls-react/lib/ListItemComments';

export interface IListitemCommentsDemoProps {
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    serviceScope: ServiceScope;
}

const ListitemCommentsDemo: FC<IListitemCommentsDemoProps> = (props) => {
    const { isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = props;

    return (
        <section className={`${styles.listitemCommentsDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <ListItemComments
                listId='a51cb9ff-e5a2-445e-8f6b-3c6dc3a22596'
                itemId='122'
                serviceScope={props.serviceScope as any}
                numberCommentsPerPage={5}
                label="ListItem Comments"
                highlightedCommentId='6'
            />
        </section>
    );
};

export default ListitemCommentsDemo;
