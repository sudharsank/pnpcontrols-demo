import { BaseComponentContext } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFilePickerDemoProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
}
