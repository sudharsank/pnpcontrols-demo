import * as React from 'react';
import { FC } from 'react';
import styles from './DragDropFilesDemo.module.scss';
import { IDragDropFilesDemoProps } from './IDragDropFilesDemoProps';
import { DragDropFiles } from "@pnp/spfx-controls-react/lib/DragDropFiles";

const DragDropFilesDemo: FC<IDragDropFilesDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [selFiles, setSelFiles] = React.useState<any[]>(undefined);

    const _getDropFiles = (files) => {
        setSelFiles(files);
        for (var i = 0; i < files.length; i++) {
            console.log("File Info: ", files[i]);
        }
    }

    return (
        <section className={`${styles.dragDropFilesDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>Drag & Drop Files Demo</h3>
                <DragDropFiles
                    dropEffect="copy"
                    enable={true}
                    onDrop={_getDropFiles}
                    iconName="Upload"
                    labelMessage="My custom upload File"
                >
                    <div className={styles.divDropArea}>
                        Drag & Drop the files
                    </div>
                </DragDropFiles>
                <p><b>Dropped Files:</b></p>
                {selFiles && selFiles.length > 0 &&
                    <ul>
                        {selFiles.map((file) => {
                            return (
                                <li>{file.name}</li>
                            )
                        })}
                    </ul>
                }
            </div>
        </section>
    );
};

export default DragDropFilesDemo