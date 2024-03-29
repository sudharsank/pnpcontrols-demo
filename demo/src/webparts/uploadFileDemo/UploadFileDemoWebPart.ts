import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPFI, spfi, SPFx } from "@pnp/sp";
import * as strings from 'UploadFileDemoWebPartStrings';
import UploadFileDemo from './components/UploadFileDemo';
import { IUploadFileDemoProps } from './components/UploadFileDemo';

export interface IUploadFileDemoWebPartProps {
}

export default class UploadFileDemoWebPart extends BaseClientSideWebPart<IUploadFileDemoWebPartProps> {

    private _isDarkTheme: boolean = false;
    private _environmentMessage: string = '';
    private sp: SPFI = null;
    protected themeVariant: IReadonlyTheme;

    public render(): void {
        const element: React.ReactElement<IUploadFileDemoProps> = React.createElement(
            UploadFileDemo,
            {
                sp: this.sp,
                theme: this.themeVariant,
                context: this.context,
                isDarkTheme: this._isDarkTheme,
                environmentMessage: this._environmentMessage,
                hasTeamsContext: !!this.context.sdks.microsoftTeams,
                userDisplayName: this.context.pageContext.user.displayName
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onInit(): Promise<void> {
        this._environmentMessage = this._getEnvironmentMessage();
        this.sp = spfi().using(SPFx(this.context));
        return super.onInit();
    }

    private _getEnvironmentMessage(): string {
        if (!!this.context.sdks.microsoftTeams) { // running in Teams
            return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
        }

        return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
    }

    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }
        this.themeVariant = currentTheme;
        this._isDarkTheme = !!currentTheme.isInverted;
        const {
            semanticColors
        } = currentTheme;

        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }

    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
