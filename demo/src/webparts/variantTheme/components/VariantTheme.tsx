import * as React from 'react';
import styles from './VariantTheme.module.scss';
import { IVariantThemeProps } from './IVariantThemeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { VariantThemeProvider, VariantType, IThemeColors } from "@pnp/spfx-controls-react/lib/VariantThemeProvider";
import { CommandBarButton, DefaultButton, IContextualMenuProps, IIconProps, ITheme, PrimaryButton, Separator, Stack } from 'office-ui-fabric-react';
import { SampleControls } from './SampleControls';



export default class VariantTheme extends React.Component<IVariantThemeProps, {}> {
	private themeVariant: ITheme = this.props.theme as ITheme;
	public render(): React.ReactElement<IVariantThemeProps> {
		const {
			description,
			isDarkTheme,
			environmentMessage,
			hasTeamsContext,
			userDisplayName
		} = this.props;

		return (
			<>
				<VariantThemeProvider theme={this.props.theme} variantType={VariantType.None}>
					<SampleControls />
				</VariantThemeProvider>
				<Separator />
				<VariantThemeProvider theme={this.props.theme} variantType={VariantType.Neutral}>
					<SampleControls />
				</VariantThemeProvider>
				<Separator />
				<VariantThemeProvider theme={this.props.theme} variantType={VariantType.Soft}>
					<SampleControls />
				</VariantThemeProvider>
				<Separator />
				<VariantThemeProvider theme={this.props.theme} variantType={VariantType.Strong}>
					<SampleControls />
				</VariantThemeProvider>
			</>
		);
	}
}
