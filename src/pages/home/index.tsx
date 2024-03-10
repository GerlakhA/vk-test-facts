import { Group, Header, Panel, View } from '@vkontakte/vkui'
import { FactsPage } from '../facts'
import { GetInfoPage } from '../get-info'
export const HomePage = () => {
	return (
		<View activePanel='1'>
			<Panel id='1'>
				<Group
					mode='card'
					header={
						<Header mode='tertiary'>Нажми на кнопку чтобы получить факт</Header>
					}
				>
					<FactsPage />
				</Group>
			</Panel>
			<Panel id='2'>
				<GetInfoPage />
			</Panel>
		</View>
	)
}
