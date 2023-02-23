import * as React from 'react';
import { FC } from 'react';
import styles from './SitePickerDemo.module.scss';
import { ISitePickerDemoProps } from './ISitePickerDemoProps';
import { ISite, SitePicker } from "@pnp/spfx-controls-react/lib/SitePicker";

const SitePickerDemo: FC<ISitePickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [selSingleSite, setSelSingleSite] = React.useState<ISite>(undefined);
    const [selMultiWebs, setSelMultiWebs] = React.useState<ISite[]>(undefined);

    const _changeSelSites = (sites: ISite[]) => {
        console.log("Selected Sites: ", sites);
        setSelSingleSite(sites[0]);
    };

    const _changeSelWebs = (sites: ISite[]) => {
        console.log("Selected Webs: ", sites);
        setSelMultiWebs(sites);
    };

    return (
        <section className={`${styles.sitePickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <div className={styles.welcome}>
                <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            </div>
            <div>
                <h3>PnP Site Picker Demo</h3>
                <div>
                    <SitePicker
                        context={props.context as any}
                        label={'Select a site'}
                        mode={'site'}
                        allowSearch={true}
                        multiSelect={false}
                        onChange={_changeSelSites}
                        placeholder={'Select sites'}
                        searchPlaceholder={'Filter sites'} />
                    {selSingleSite &&
                        <div>
                            <p><b>Selected Site Info:</b></p>
                            <p>
                                Title: {selSingleSite.title},
                                Site Id: {selSingleSite.id},
                                Url: {selSingleSite.url},
                                Web Id: {selSingleSite.webId}
                            </p>
                        </div>
                    }
                </div>
                <div>
                    <SitePicker
                        context={props.context as any}
                        label={'Select multiple webs'}
                        mode={'web'}
                        allowSearch={true}
                        multiSelect={true}
                        onChange={_changeSelWebs}
                        placeholder={'Select webs'}
                        searchPlaceholder={'Filter webs'} />
                    {selMultiWebs &&
                        <div>
                            <p><b>Selected Webs:</b></p>
                            <p>
                                <ul>
                                    {selMultiWebs.map((web: ISite) => {
                                        return (
                                            <li>
                                                Title: {web.title},
                                                Site Id: {web.id},
                                                Url: {web.url},
                                                Web Id: {web.webId}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </p>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default SitePickerDemo;
