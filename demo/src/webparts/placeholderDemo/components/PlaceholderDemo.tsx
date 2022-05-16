import * as React from 'react';
import { IPlaceholderDemoProps } from './IPlaceholderDemoProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';

export default class PlaceholderDemo extends React.Component<IPlaceholderDemoProps, {}> {
    public render(): React.ReactElement<IPlaceholderDemoProps> {
        const {
            property1,
            property2,
        } = this.props;
        return (
            <div>
                {(property1 && property2) ? (
                    <>
                        <div>Property 1: {property1}</div>
                        <div>Property 2: {property2}</div>
                    </>
                ) : (
                    <Placeholder iconName='Edit'
                        iconText='Configure your web part'
                        description='Please edit the page and configure the web part.'
                        buttonLabel='Configure'
                        hideButton={this.props.displayMode === DisplayMode.Read}
                        onConfigure={this.props.onConfigurePropPane} />
                )}
            </div>
        );
    }
}
