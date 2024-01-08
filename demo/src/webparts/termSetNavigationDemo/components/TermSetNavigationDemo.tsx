import * as React from 'react';
import { useState, FC } from 'react';
import styles from './TermSetNavigationDemo.module.scss';
import { TermSetNavigation } from '@pnp/spfx-controls-react/lib/TermSetNavigation';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Theme } from '@fluentui/react';

export interface ITermSetNavigationDemoProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
    themeVariant: IReadonlyTheme | Theme;
}

const TermSetNavigationDemo: FC<ITermSetNavigationDemoProps> = (props) => {

    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;

    const onSelect = React.useCallback((selected: any) => {
        console.log(selected);
    }, []);

    const onSelectedTermAction = React.useCallback((selected: any, option: string) => {
        console.log(selected, option);
    }, []);

    return (
        <section className={`${styles.termSetNavigationDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>PnP TermSetNavigation Control Demo</h3>
                <div>
                    <TermSetNavigation
                        context={props.context as any}
                        themeVariant={props.themeVariant}
                        termSetId={"1429fb65-5397-4434-9be7-f8ffdbbc3e1b"}
                        showContextMenu={true}
                        contextMenuItems={[
                            {
                                key: "add",
                                text: "Add",
                                iconProps: { iconName: "add" },
                            },
                            {
                                key: "adit",
                                text: "Edit",
                                iconProps: { iconName: "Edit" },
                            },
                            {
                                key: "remove",
                                text: "Remove",
                                iconProps: { iconName: "delete" },
                            },
                        ]}
                        onSelected={onSelect}
                        onSelectedTermAction={onSelectedTermAction}
                    />
                </div>
            </div>
        </section>
    );
};

export default TermSetNavigationDemo;
