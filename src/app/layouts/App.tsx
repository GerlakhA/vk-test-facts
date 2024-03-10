import { Icon28UserOutline } from '@vkontakte/icons'
import { AppRoot, Cell, Group, Panel, PanelHeader, View } from '@vkontakte/vkui'
import { useState } from 'react'
import { CatFacts } from '../../pages/cat-facts/ui/CatFacts'
import { GetInfo } from '../../pages/get-info/ui/GetInfo'

function App() {
	const [activePanel, setActivePanel] = useState('1')
	return (
		<AppRoot>
			<View activePanel={activePanel}>
				<Panel id='1'>
					<PanelHeader>Facts Page</PanelHeader>
					<CatFacts />
					<Group>
						<Cell
							expandable='auto'
							before={<Icon28UserOutline />}
							onClick={() => setActivePanel('2')}
						>
							Получить возраст по имени
						</Cell>
					</Group>
				</Panel>
				<Panel id='2'>
					<PanelHeader>GetInfo Page</PanelHeader>
					<GetInfo />
					<Group>
						<Cell
							expandable='auto'
							before={<Icon28UserOutline />}
							onClick={() => setActivePanel('1')}
						>
							Получить факт про кошек
						</Cell>
					</Group>
				</Panel>
			</View>
		</AppRoot>
	)
}

export default App
