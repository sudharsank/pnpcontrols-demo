import { ActionButton, CommandButton, DefaultButton, IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';

const menuProps: IContextualMenuProps = {
	items: [
		{
			key: 'emailMessage',
			text: 'Email message',
			iconProps: { iconName: 'Mail' },
		},
		{
			key: 'calendarEvent',
			text: 'Calendar event',
			iconProps: { iconName: 'Calendar' },
		},
	],
};
const addIcon: IIconProps = { iconName: 'Add' };
const emojiIcon: IIconProps = { iconName: 'Emoji2' };
const addFriendIcon: IIconProps = { iconName: 'AddFriend' };

const options: IChoiceGroupOption[] = [
	{ key: 'A', text: 'Option A' },
	{ key: 'B', text: 'Option B' },
];
const options1: IChoiceGroupOption[] = [
	{ key: 'day', text: 'Day', iconProps: { iconName: 'CalendarDay' } },
	{ key: 'week', text: 'Week', iconProps: { iconName: 'CalendarWeek' } },
	{ key: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];

export const SampleControls: React.FC<{}> = (props) => {
	return (
		<Stack tokens={{ childrenGap: 20, padding: 15 }} verticalAlign={'start'}>
			<Stack.Item>
				<Stack horizontal horizontalAlign='space-evenly'>
					<Stack.Item>
						<PrimaryButton text='Button 1'></PrimaryButton>
					</Stack.Item>
					<Stack.Item>
						<DefaultButton text='Default Button 1'></DefaultButton>
					</Stack.Item>
					<Stack.Item>
						<CommandButton iconProps={addIcon} text="New item" menuProps={menuProps} />
					</Stack.Item>
					<Stack.Item>
						<IconButton iconProps={emojiIcon} title="Emoji" ariaLabel="Emoji" />
					</Stack.Item>
					<Stack.Item>
						<IconButton menuProps={menuProps} iconProps={emojiIcon} title="Emoji" ariaLabel="Emoji" />
					</Stack.Item>
					<Stack.Item>
						<ActionButton iconProps={addFriendIcon} allowDisabledFocus>Create account</ActionButton>
					</Stack.Item>
				</Stack>
				<Stack horizontal horizontalAlign='space-evenly'>
					<Stack.Item>
						<Checkbox label="Unchecked checkbox (uncontrolled)" />
						<Checkbox label="Disabled checked checkbox" disabled defaultChecked />
					</Stack.Item>
					<Stack.Item>
						<ChoiceGroup defaultSelectedKey="B" options={options} label="Pick one" required={true} />
					</Stack.Item>
					<Stack.Item>
						<ChoiceGroup label="Pick one icon" defaultSelectedKey="day" options={options1} />
					</Stack.Item>
				</Stack>
				<Stack horizontal horizontalAlign='space-evenly'>
					<Stack.Item>
						<Label>I'm a Label</Label>
					</Stack.Item>
					<Stack.Item>
						<Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" />
					</Stack.Item>
					<Stack.Item>
						<Slider label="Snapping slider example" min={0} max={50} step={10} defaultValue={20} showValue snapToStep />
					</Stack.Item>
				</Stack>
				<Stack horizontal horizontalAlign='space-evenly'>
					<Stack.Item>
						When a link has an href,{' '}
						<Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
							it renders as an anchor tag.
						</Link>{' '}
						Without an href,{' '}
						<Link underline>
							the link is rendered as a button
						</Link>
					</Stack.Item>
				</Stack>
				<Stack horizontal horizontalAlign='space-evenly'>
					<Stack.Item>
						<Rating max={5} size={RatingSize.Large} ariaLabel="Large stars" ariaLabelFormat="{0} of {1} stars" />
					</Stack.Item>
					<Stack.Item>
						<Rating max={5} disabled ariaLabel="Disabled" ariaLabelFormat="{0} of {1} stars" />
					</Stack.Item>
				</Stack>
			</Stack.Item>
		</Stack>
	);
};

