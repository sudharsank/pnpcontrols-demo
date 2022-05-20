import { IPartialTheme, ITheme } from "office-ui-fabric-react";

export interface IVariantThemeProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  theme: IPartialTheme | ITheme;
}
