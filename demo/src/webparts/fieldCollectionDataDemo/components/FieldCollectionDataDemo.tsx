import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import styles from './FieldCollectionDataDemo.module.scss';
import { IFieldCollectionDataDemoProps } from './IFieldCollectionDataDemoProps';
import { FieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-controls-react/lib/FieldCollectionData';
import { Toggle } from '@fluentui/react/lib/Toggle';

const FieldCollectionDataDemo: FC<IFieldCollectionDataDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [fieldValues, setFieldValues] = useState<any[]>(undefined);

    const _onFieldValuesChanged = (values: any[]) => {
        setFieldValues(values);
    };

    return (
        <section className={`${styles.fieldCollectionDataDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>PnP Field Collection Demo</h3>
                <div>
                    <FieldCollectionData
                        key={"FieldCollectionData"}
                        label={"Fields Collection"}
                        manageBtnLabel={"Manage"}
                        onChanged={_onFieldValuesChanged}
                        panelHeader={"Manage values"}

                        executeFiltering={(searchFilter: string, item: any) => {
                            return item["Field2"] === +searchFilter;
                        }}
                        itemsPerPage={3}
                        fields={[
                            { id: "Field1", title: "String field", type: CustomCollectionFieldType.string, required: true },
                            { id: "Field2", title: "Number field", type: CustomCollectionFieldType.number },
                            { id: "Field3", title: "URL field", type: CustomCollectionFieldType.url },
                            { id: "Field4", title: "Boolean field", type: CustomCollectionFieldType.boolean },
                            {
                                id: "Field5", title: "Dropdown Field", type: CustomCollectionFieldType.dropdown, options: [
                                    { key: 'Option1', text: 'Option 1' },
                                    { key: 'Option2', text: 'Option 2' },
                                    { key: 'Option3', text: 'Option 3' }]
                            },
                            { id: "Field6", title: "FabricIcon field", type: CustomCollectionFieldType.fabricIcon },
                            {
                                id: "Field7", title: "Custom Field", type: CustomCollectionFieldType.custom,
                                onCustomRender: (field, value, onUpdate, item, rowUniqueId, onCustomFieldValidation) => {
                                    console.log(field, value, item, rowUniqueId);
                                    return (
                                        <Toggle
                                            key={field.id}
                                            onText="On"
                                            offText="Off"
                                            checked={value}
                                            onChange={(ev: React.MouseEvent<HTMLElement>, checked?: boolean) => onUpdate(field.id, checked)}
                                        />
                                    );
                                },
                            }
                        ]}
                        value={fieldValues}
                    />
                    {fieldValues && fieldValues.length > 0 &&
                        <div>
                            <p>Selected Items</p>
                            <div>
                                <ul>
                                    {fieldValues.map((val) => {
                                        return (
                                            <li>
                                                <ul>
                                                    <li><b>String Field: </b>{val.Field1}</li>
                                                    <li><b>Number Field: </b>{val.Field2}</li>
                                                    <li><b>URL Field: </b>{val.Field3}</li>
                                                    <li><b>Boolean Field: </b>{val.Field4 ? 'true' : 'false'}</li>
                                                    <li><b>Dropdown Field: </b>{val.Field5}</li>
                                                    <li><b>FabricIcon Field: </b>{val.Field6}</li>
                                                    <li><b>Custom Toggle Field: </b>{val.Field7 ? 'true' : 'false'}</li>
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default FieldCollectionDataDemo;
