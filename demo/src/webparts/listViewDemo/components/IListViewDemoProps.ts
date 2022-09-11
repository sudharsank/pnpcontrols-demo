import { SPFI } from "@pnp/sp";

export interface IListViewDemoProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    sp: SPFI;
}
