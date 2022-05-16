import { DisplayMode } from "@microsoft/sp-core-library";

export interface IPlaceholderDemoProps {
    property1: string;
    property2: string;
    displayMode: DisplayMode;
    onConfigurePropPane: () => void;
}
