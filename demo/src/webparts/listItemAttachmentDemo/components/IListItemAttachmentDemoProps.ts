import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import { IPartialTheme, ITheme } from "office-ui-fabric-react";

export interface IListItemAttachmentDemoProps {
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    sp: SPFI;
    theme: IPartialTheme | ITheme;
    context: WebPartContext;
}
