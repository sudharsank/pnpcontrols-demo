import * as React from 'react';
import styles from './SecurityTrimmedControlDemo.module.scss';
import { ISecurityTrimmedControlDemoProps } from './ISecurityTrimmedControlDemoProps';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';

export default class SecurityTrimmedControlDemo extends React.Component<ISecurityTrimmedControlDemoProps, {}> {
    public render(): React.ReactElement<ISecurityTrimmedControlDemoProps> {
        const {
            isDarkTheme,
            environmentMessage,
            hasTeamsContext,
            userDisplayName
        } = this.props;

        return (
            <section className={`${styles.securityTrimmedControlDemo} ${hasTeamsContext ? styles.teams : ''}`}>
                <div className={styles.welcome}>
                    <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
                </div>
                <div>
                    <h3>PnP Security Trimmed Control Demo</h3>
                    <h4>Name: <b>{this.props.userDisplayName}</b></h4>
                    <div>
                        <SecurityTrimmedControl context={this.props.context as any}
                            level={PermissionLevel.currentWeb}
                            permissions={[SPPermission.enumeratePermissions]}
                            noPermissionsControl={<b>sorry, you dont have enumerate permissions!</b>}>
                            <b>This is available only for users with Enumerate Permissions!</b>
                        </SecurityTrimmedControl>
                    </div>
                    <div>
                        <SecurityTrimmedControl context={this.props.context as any}
                            level={PermissionLevel.currentWeb}
                            relativeLibOrListUrl='/Sites/CustomApps/Lists/Task%20Assignments'
                            permissions={[SPPermission.deleteListItems]}
                            noPermissionsControl={<b>sorry, you dont have permission to delete items from 'Task Assignments' list!</b>}>
                            <b>This is available only for users who can delete items!</b>
                        </SecurityTrimmedControl>
                    </div>
                    <div>
                        <SecurityTrimmedControl context={this.props.context as any}
                            level={PermissionLevel.currentWeb}
                            relativeLibOrListUrl='/Sites/CustomApps/Lists/Task%20Assignments'
                            permissions={[SPPermission.viewListItems]}
                            noPermissionsControl={<b>sorry, you dont have read access to the list!</b>}>
                            <b>This is available only for users who can view items!</b>
                        </SecurityTrimmedControl>
                    </div>
                </div>
            </section>
        );
    }
}
