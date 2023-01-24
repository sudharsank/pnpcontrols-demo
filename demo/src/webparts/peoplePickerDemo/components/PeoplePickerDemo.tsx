import * as React from 'react';
import { FC } from 'react';
import styles from './PeoplePickerDemo.module.scss';
import { IPeoplePickerDemoProps } from './IPeoplePickerDemoProps';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

const PeoplePickerDemo: FC<IPeoplePickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;

    const _getPeoplePickerItems = (items: any[]) => {
        console.log('Items:', items);
    }

    return (
        <section className={`${styles.peoplePickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h2>PnP PeoplePicker Control Demo</h2>
                <div>
                    <PeoplePicker
                        context={props.context as any}
                        titleText="All Users only"
                        personSelectionLimit={3}
                        placeholder="Select the users"
                        required={true}
                        onChange={_getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                    <PeoplePicker
                        context={props.context as any}
                        titleText="All Security groups only"
                        personSelectionLimit={3}
                        placeholder="Select the Security group"
                        required={true}
                        onChange={_getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.SecurityGroup]}
                        resolveDelay={1000} />
                    <PeoplePicker
                        context={props.context as any}
                        titleText="All SharePoint groups only"
                        personSelectionLimit={3}
                        placeholder="Select the SharePoint group"
                        required={true}
                        onChange={_getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.SharePointGroup]}
                        resolveDelay={1000} />
                </div>
            </div>
        </section>
    );
};

export default PeoplePickerDemo;
