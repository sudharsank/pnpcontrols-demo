import * as React from 'react';
import { FC } from 'react';
import styles from './IFrameDemo.module.scss';
import { IIFrameDemoProps } from './IIFrameDemoProps';
import { IFramePanel } from "@pnp/spfx-controls-react/lib/IFramePanel";
import { PanelType } from '@fluentui/react/lib/Panel';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { DialogType } from '@fluentui/react/lib/Dialog';

const videoUrl: string = 'https://m365devpractice-my.sharepoint.com/personal/sudharsan_m365devpractice_onmicrosoft_com/_layouts/15/embed.aspx?UniqueId=07e9df4a-6a28-487b-85bc-886e984612ad&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'

const iFrameDemo: FC<IIFrameDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [iframePanel, setOpenIFrame] = React.useState<boolean>(false);
    const [hideiframedialog, setHideIFrameDialog] = React.useState<boolean>(true);

    const _openIFrame = (event: any) => {
        setOpenIFrame(true);
    };
    const _closeIFrame = (event: any) => {
        setOpenIFrame(false);
    };

    const _openIFrameDialog = (event: any) => {
        setHideIFrameDialog(false);
    };
    const _closeIFrameDialog = (event: any) => {
        setHideIFrameDialog(true);
    };

    return (
        <section className={`${styles.iFrameDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>PnP IFrame Demo</h3>
                <p><h4>IFrame Panel</h4></p>
                <div>
                    <PrimaryButton text="Open Video Panel" onClick={_openIFrame} allowDisabledFocus />
                    <IFramePanel url={videoUrl}
                        type={PanelType.large}
                        headerText="Auto Copy Files"
                        closeButtonAriaLabel="Close"
                        isOpen={iframePanel}
                        onDismiss={_closeIFrame}
                    />
                </div>
                <p><h4>IFrame Dialog</h4></p>
                <div>
                    <PrimaryButton text="Open Video Dialog" onClick={_openIFrameDialog} allowDisabledFocus />
                    <IFrameDialog
                        url={videoUrl}
                        hidden={hideiframedialog}
                        onDismiss={_closeIFrameDialog}
                        modalProps={{
                            isBlocking: true,
                        }}
                        dialogContentProps={{
                            type: DialogType.close,
                            showCloseButton: true,
                            title: 'Auto Copy Files'
                        }}
                        width={'570px'}
                        height={'315px'} />
                </div>
            </div>
        </section>
    );
};

export default iFrameDemo;
