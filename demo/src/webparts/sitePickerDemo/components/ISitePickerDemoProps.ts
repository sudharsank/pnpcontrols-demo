import { BaseWebPartContext } from "@microsoft/sp-webpart-base";

export interface ISitePickerDemoProps {
    context: BaseWebPartContext;
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
}
