import { SPFI } from "@pnp/sp";

export interface IToolbarDemoProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    sp: SPFI;
}
