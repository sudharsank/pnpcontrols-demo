import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'PlaceholderDemoWebPartStrings';
import PlaceholderDemo from './components/PlaceholderDemo';
import { IPlaceholderDemoProps } from './components/IPlaceholderDemoProps';

export interface IPlaceholderDemoWebPartProps {
    property1: string;
    property2: string;
}

export default class PlaceholderDemoWebPart extends BaseClientSideWebPart<IPlaceholderDemoWebPartProps> {

    private _isDarkTheme: boolean = false;
    private _environmentMessage: string = '';

    protected onInit(): Promise<void> {
        this._environmentMessage = this._getEnvironmentMessage();

        return super.onInit();
    }

    public render(): void {
        const element: React.ReactElement<IPlaceholderDemoProps> = React.createElement(
            PlaceholderDemo,
            {
                property1: this.properties.property1,
                property2: this.properties.property2,
                onConfigurePropPane: this.configurePropPane,
                displayMode: this.displayMode
            }
        );

        ReactDom.render(element, this.domElement);
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

        this._isDarkTheme = !!currentTheme.isInverted;
        const {
            semanticColors
        } = currentTheme;
        this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
        this.domElement.style.setProperty('--link', semanticColors.link);
        this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    public configurePropPane = (): void => {
        this.context.propertyPane.open();
    }

    protected get disableReactivePropertyChanges(): boolean {
        return true;
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
                                PropertyPaneTextField('property1', {
                                    label: 'Property 1'
                                }),
                                PropertyPaneTextField('property2', {
                                    label: 'Property 2'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
