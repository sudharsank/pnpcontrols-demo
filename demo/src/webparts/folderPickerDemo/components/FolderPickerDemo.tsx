import * as React from 'react';
import { FC } from 'react';
import styles from './FolderPickerDemo.module.scss';
import { IFolderPickerDemoProps } from './IFolderPickerDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FolderPicker, IFolder } from "@pnp/spfx-controls-react/lib/FolderPicker";

const FolderPickerDemo: FC<IFolderPickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;

    const _onFolderSelect = (folder: IFolder): void => {
        console.log("Selected folder: ", folder);
    };

    return (
        <section className={`${styles.folderPickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />

            </div>
            <div>
                <h3>Folder Picker Demo</h3>
                <FolderPicker context={props.context as any}
                    label='Folder Picker'
                    required={true}
                    rootFolder={{
                        Name: 'Demo Docs',
                        ServerRelativeUrl: `/Demo Docs`
                    }}
                    onSelect={_onFolderSelect}
                    canCreateFolders={true} />
            </div>
        </section>
    );
};

export default FolderPickerDemo;
