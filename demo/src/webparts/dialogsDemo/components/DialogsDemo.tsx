import * as React from 'react';
import styles from './DialogsDemo.module.scss';
import { IDialogsDemoProps } from './IDialogsDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, Stack } from 'office-ui-fabric-react';
import AnimDialog from '../../../common/AnimDialog';
import { useState } from 'react';


const DialogsDemo: React.FC<IDialogsDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [showAnimDialog, setShowAnimDialog] = useState<boolean>(false);
    const [animDialogScope, setAnimDialogScope] = useState<number>(0);
    const [disableButtons, setDisableButtons] = useState<boolean>(false);

    const _setDialogStatus = () => {
        setShowAnimDialog(!showAnimDialog);
        setDisableButtons(false);
    };

    const _showNormalAnimatedDialog = () => {
        setShowAnimDialog(true);
        setAnimDialogScope(0);
        setDisableButtons(true);
    };

    const _showCustomAnimatedDialog = () => {
        setShowAnimDialog(true);
        setAnimDialogScope(1);
        setDisableButtons(true);
    };

    const _showCustomAnimatedDialogWithIcon = () => {
        setShowAnimDialog(true);
        setAnimDialogScope(2);
        setDisableButtons(true);
    };

    return (
        <section className={`${styles.dialogsDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <AnimDialog showDialog={showAnimDialog} setDialogStatus={_setDialogStatus} scope={animDialogScope} />
            <Stack tokens={{ childrenGap: 10 }} horizontal>
                <Stack.Item>
                    <PrimaryButton text="Show Animated Dialog" onClick={_showNormalAnimatedDialog}></PrimaryButton>
                </Stack.Item>
                <Stack.Item>
                    <PrimaryButton text="Show Custom Animated Dialog" onClick={_showCustomAnimatedDialog}></PrimaryButton>
                </Stack.Item>
                <Stack.Item>
                    <PrimaryButton text="Show Animated Dialog with Icon" onClick={_showCustomAnimatedDialogWithIcon}></PrimaryButton>
                </Stack.Item>
            </Stack>
        </section>
    );
};

export default DialogsDemo;
