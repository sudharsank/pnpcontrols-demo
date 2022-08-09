import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './AccessibleAccordionDemo.module.scss';
import { IAccessibleAccordionDemoProps } from './IAccessibleAccordionDemoProps';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "@pnp/spfx-controls-react/lib/AccessibleAccordion";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const AccessibleAccordionDemo: React.FC<IAccessibleAccordionDemoProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>(undefined);

    const getSampleItems = async (): Promise<void> => {
        const items: any[] = await props.sp.web.lists.getByTitle('Announcements')
            .select('Title', 'Description')
            .items();
        setItems(items);
        setLoading(false);
    };

    useEffect(() => {
        getSampleItems();
    }, []);

    return (
        <section className={`${styles.accessibleAccordionDemo} ${props.hasTeamsContext ? styles.teams : ''}`}>
            <div>
                {loading ? (
                    <div>loading...</div>
                ) : (
                    <>
                        {items && items.length > 0 ? (
                            <Accordion theme={props.theme}>
                                {items.map(item => {
                                    return (
                                        <AccordionItem className={styles.accitem}>
                                            <AccordionItemHeading className={styles.accheading}>
                                                <AccordionItemButton>
                                                    {item.Title}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    {item.Description}
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem >
                                    )
                                })}
                            </Accordion >
                        ) : (
                            <div>Sorry, no items found.</div>
                        )}
                    </>
                )}
            </div >
        </section >
    );
};

export default AccessibleAccordionDemo;