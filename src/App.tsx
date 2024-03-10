import {
	AppRoot,
	Group,
	Header,
	Panel,
	PanelHeader,
	View
} from '@vkontakte/vkui'
import { FactsPage } from './pages/facts'
import { GetInfoPage } from './pages/get-info'

function App() {
	// const platform = usePlatform()
	return (
		<AppRoot>
			<View activePanel='1'>
				<Panel id='1'>
					<PanelHeader>Facts Page</PanelHeader>
					<Group
						mode='card'
						header={
							<Header mode='primary' style={{ fontSize: 30 }}>
								Нажми на кнопку чтобы получить факт
							</Header>
						}
						className='flex justify-center items-center flex-col gap-6'
					>
						<FactsPage />
					</Group>
				</Panel>
				<Panel id='2'>
					<GetInfoPage />
				</Panel>
			</View>
		</AppRoot>
	)
}

export default App
