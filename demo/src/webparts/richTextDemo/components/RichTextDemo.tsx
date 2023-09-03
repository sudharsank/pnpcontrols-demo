import * as React from 'react';
import { FC, useState } from 'react';
import styles from './RichTextDemo.module.scss';
import { IRichTextDemoProps } from './IRichTextDemoProps';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { PrimaryButton } from '@fluentui/react';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const RichTextDemo: FC<IRichTextDemoProps> = (props) => {
    const { hasTeamsContext, isDarkTheme, userDisplayName, environmentMessage } = props;
    const [richTextValue, setRichTextValue] = useState<any>('');

    const _onTextChange = (newValue: any): string => {
        setRichTextValue(newValue);
        return newValue;
    };

    const _saveRichTextValue = React.useCallback(async () => {
        await props.sp.web.lists.getByTitle('Testing').items.add({
            Title: 'RichText Control Demo',
            RichTextField: richTextValue
        });
    }, [richTextValue]);

    return (
        <section className={`${styles.richTextDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
                <h2>RichText Control Demo</h2>
            </div>
            <div>
                <RichText value={richTextValue} onChange={(text) => _onTextChange(text)} />
                {richTextValue &&
                    <PrimaryButton onClick={_saveRichTextValue} iconProps={{ iconName: 'Save' }}>Save</PrimaryButton>
                }
            </div>
        </section>
    );
};

export default RichTextDemo;
