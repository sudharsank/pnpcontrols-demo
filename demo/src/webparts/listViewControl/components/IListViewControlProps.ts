import { SPFI } from "@pnp/sp";

export interface IListViewControlProps {
	description: string;
	isDarkTheme: boolean;
	environmentMessage: string;
	hasTeamsContext: boolean;
	userDisplayName: string;
	_sp: SPFI;
}
