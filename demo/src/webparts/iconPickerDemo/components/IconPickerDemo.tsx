import * as React from 'react';
import styles from './IconPickerDemo.module.scss';
import { IIconPickerDemoProps } from './IIconPickerDemoProps';
import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const panelIconClass = mergeStyles({
    fontSize: 50
});
const dialogIconClass = mergeStyles({
    fontSize: 50,
    color: 'Orange'
});

const IconPickerDemo: React.FC<IIconPickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [panelIcon, setPanelIcon] = React.useState<string>(undefined);
    const [dialogIcon, setDialogIcon] = React.useState<string>(undefined);

    return (
        <section className={`${styles.iconPickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div style={{textAlign: 'center'}}>
                <h3>PnP Icon Picker Demo</h3>
                <p>
                    <IconPicker buttonLabel={'Select Icon using panel'}
                        onSave={(iconName: string) => { setPanelIcon(iconName); }} />
                    {panelIcon &&
                        <p>
                            Selected Icon: <FontIcon iconName={panelIcon} className={panelIconClass} />
                        </p>
                    }
                </p>
                <p>
                    <IconPicker buttonLabel={'Select Icon using dialog'} renderOption={'dialog'}
                        onSave={(iconName: string) => { setDialogIcon(iconName); }} />
                    {panelIcon &&
                        <p>
                            Selected Icon: <FontIcon iconName={dialogIcon} className={dialogIconClass} />
                        </p>
                    }
                </p>
            </div>
        </section>
    );
}

export default IconPickerDemo;
