import { SPFI } from "@pnp/sp";

export interface IRichTextDemoProps {
    sp: SPFI;
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
}
