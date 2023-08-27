import * as React from 'react';
import { useState, FC } from 'react';
import styles from './UploadFileDemo.module.scss';
import { UploadFiles } from '@pnp/spfx-controls-react/lib/UploadFiles';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import { IPartialTheme, ITheme } from "office-ui-fabric-react";

export interface IUploadFileDemoProps {
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    sp: SPFI;
    theme: IPartialTheme | ITheme;
    context: WebPartContext;
}

const UploadFileDemo: FC<IUploadFileDemoProps> = (props) => {


    return (
        <section className={`${styles.uploadFileDemo} ${props.hasTeamsContext ? styles.teams : ''}`}>
            <UploadFiles
                pageSize={5}
                context={props.context as any}
                title="Upload Files"
                onUploadFiles={(files) => {
                    console.log("files", files);
                }}
                themeVariant={props.theme}                
            />
        </section>
    );
};

export default UploadFileDemo;
