import * as React from 'react';
import styles from './AnimDialog.module.scss';
import { AnimatedDialog } from "@pnp/spfx-controls-react/lib/AnimatedDialog";
import { useState } from 'react';
import { DialogFooter, DialogType, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { IModalProps } from '@fluentui/react/lib/Modal';


export interface IAnimDialogProps {
    showDialog: boolean;
    setDialogStatus: () => void;
    scope: number;
}

const AnimDialog: React.FC<IAnimDialogProps> = (props) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

    const animatedDialogContentProps: any = {
        type: DialogType.normal,
        title: 'Animated Dialog',
        subText: 'Do you like the animated dialog?',
    };

    const successDialogContentProps: any = {
        type: DialogType.normal,
        title: 'Good answer!'
    };

    const errorDialogContentProps: any = {
        type: DialogType.normal,
        title: 'Wrong answer!'
    };

    const animatedModalProps: any = {
        isDarkOverlay: true,
        isBlocking: true
    };

    const _hideDialog = () => {
        setShowDialog(false);
        props.setDialogStatus();
    };

    // The operation that does something - e.g. update data
    const timeout = (ms: number): Promise<void> => {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    };

    const _onYesButtonClick = () => {
        _hideDialog();
        setShowSuccessDialog(true);
    };

    const _onNoButtonClick = () => {
        _hideDialog();
        setShowErrorDialog(true);
    };

    React.useEffect(() => {
        setShowDialog(props.showDialog);
    }, [props.showDialog]);

    return (
        <div className={styles.dialogContainer}>
            {props.scope == 0 &&
                <AnimatedDialog
                    hidden={!showDialog}
                    onDismiss={() => { _hideDialog(); }}
                    modalProps={animatedModalProps}
                    dialogContentProps={animatedDialogContentProps}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={() => { _hideDialog(); }} text="Yes" />
                        <DefaultButton onClick={() => { _hideDialog(); }} text="No" />
                    </DialogFooter>
                </AnimatedDialog>
            }
            {props.scope == 1 &&
                <AnimatedDialog
                    hidden={!showDialog}
                    onDismiss={() => { _hideDialog(); }}                    
                    dialogContentProps={animatedDialogContentProps}
                    modalProps={animatedModalProps}
                    dialogAnimationInType='fadeInDown'
                    dialogAnimationOutType='fadeOutDown'
                >
                    <DialogFooter>
                        <PrimaryButton onClick={() => { _hideDialog(); }} text="Yes" />
                        <DefaultButton onClick={() => { _hideDialog(); }} text="No" />
                    </DialogFooter>
                </AnimatedDialog>
            }
            {props.scope == 2 &&
                <>
                    <AnimatedDialog
                        hidden={!showDialog}
                        onDismiss={() => { _hideDialog(); }}
                        dialogContentProps={animatedDialogContentProps}
                        modalProps={animatedModalProps}
                        iconName='UnknownSolid'
                        showAnimatedDialogFooter={true}
                        okButtonText="Yes"
                        cancelButtonText="No"
                        onOkClick={() => timeout(1500)}
                        onSuccess={() => _onYesButtonClick()}
                        onError={() => _onNoButtonClick()}
                    >
                    </AnimatedDialog>
                    <AnimatedDialog
                        hidden={!showSuccessDialog}
                        onDismiss={() => { setShowSuccessDialog(false); }}
                        dialogContentProps={successDialogContentProps}
                        modalProps={animatedModalProps}
                        iconName='CompletedSolid'
                        className={styles.dialogContainer}
                    >
                        <div className={styles.dialogContent}><span>Thank you.</span></div>
                        <div className={styles.resultDialogFooter}>
                            <PrimaryButton onClick={() => { setShowSuccessDialog(false); }} text="OK" >
                            </PrimaryButton>
                        </div>
                    </AnimatedDialog>
                    <AnimatedDialog
                        hidden={!showErrorDialog}
                        onDismiss={() => { setShowErrorDialog(false); }}
                        dialogContentProps={errorDialogContentProps}
                        modalProps={animatedModalProps}
                        iconName='StatusErrorFull'
                        className={styles.dialogContainer}
                    >
                        <div className={styles.dialogContent}><span>Try again!</span></div>
                        <div className={styles.resultDialogFooter}>
                            <PrimaryButton onClick={() => { setShowErrorDialog(false); }} text="OK" >
                            </PrimaryButton>
                        </div>
                    </AnimatedDialog>
                </>
            }
        </div>
    );
};

export default AnimDialog;