import * as React from 'react';
import { FC, useState } from 'react';
import styles from './FolderExplorerDemo.module.scss';
import { IFolderExplorerDemoProps } from './IFolderExplorerDemoProps';
import { FolderExplorer, IFolder } from "@pnp/spfx-controls-react/lib/FolderExplorer";

const FolderExplorerDemo: FC<IFolderExplorerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [selFolder, setSelFolder] = useState<IFolder>(undefined);

    const _onFolderSelect = (folder: IFolder): void => {
        console.log('selected folder', folder);
        setSelFolder(folder);
    }

    return (
        <section className={`${styles.folderExplorerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />

            </div>
            <div>
                <h3>Folder Explorer Demo</h3>
                {selFolder &&
                    <div>
                        <p>Selected Folder: {selFolder.Name}</p>
                    </div>
                }
                <FolderExplorer context={props.context as any}
                    rootFolder={{
                        Name: 'Demo Docs',
                        ServerRelativeUrl: `/Demo Docs`
                    }}
                    defaultFolder={{
                        Name: 'Demo Docs',
                        ServerRelativeUrl: `/Demo Docs`
                    }}
                    onSelect={_onFolderSelect}
                    canCreateFolders={true} />
            </div>
        </section>
    );
};

export default FolderExplorerDemo;
