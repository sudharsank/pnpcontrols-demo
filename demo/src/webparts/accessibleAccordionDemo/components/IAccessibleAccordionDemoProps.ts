import { SPFI } from "@pnp/sp";
import { IPartialTheme, ITheme } from "office-ui-fabric-react";

export interface IAccessibleAccordionDemoProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp: SPFI;
  theme: IPartialTheme | ITheme;
}
