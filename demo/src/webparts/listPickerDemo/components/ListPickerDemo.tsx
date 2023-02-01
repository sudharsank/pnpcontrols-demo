import * as React from 'react';
import { FC, useState } from 'react';
import styles from './ListPickerDemo.module.scss';
import { IListPickerDemoProps } from './IListPickerDemoProps';
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";

const ListPickerDemo: FC<IListPickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [selList, setSelList] = useState<string | string[]>(undefined);
    const [selMultiList, setSelMultiList] = useState<string | string[]>(undefined);
    const [selDocLib, setselDocLib] = useState<string | string[]>(undefined);

    const _onSingleListPickerChange = (lists: string | string[]) => {
        setSelList(lists);
    };

    const _onMultiListPickerChange = (lists: string | string[]) => {
        setSelMultiList(lists.toString());
    };

    const _onDocLibPickerChange = (lists: string | string[]) => {
        setselDocLib(lists.toString());
    };

    return (
        <section className={`${styles.listPickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>PnP List Picker Demo</h3>
                <div>
                    <p><b>Selected List:</b> {selList}</p>
                    <ListPicker context={props.context as any}
                        label="Select your list"
                        placeholder="Select your list"
                        baseTemplate={100}
                        includeHidden={false}
                        multiSelect={false}
                        contentTypeId='0x0108'
                        onSelectionChanged={_onSingleListPickerChange} />
                </div>
                <div>
                    <p><b>Selected Lists:</b> {selMultiList}</p>
                    <ListPicker context={props.context as any}
                        label="Select your lists"
                        placeholder="Select your lists"
                        baseTemplate={100}
                        includeHidden={false}
                        multiSelect={true}
                        onSelectionChanged={_onMultiListPickerChange} />
                </div>
                <div>
                    <p><b>Selected Document Libraries:</b> {selDocLib}</p>
                    <ListPicker context={props.context as any}
                        label="Select your document libraries"
                        placeholder="Select your document libraries"
                        baseTemplate={101}
                        includeHidden={false}
                        multiSelect={true}
                        onSelectionChanged={_onDocLibPickerChange} />
                </div>
            </div>
        </section>
    );
};

export default ListPickerDemo;
