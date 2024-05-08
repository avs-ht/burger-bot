import {
	FullscreenControl,
	GeolocationControl,
	Placemark,
	RulerControl,
	SearchControl,
	TrafficControl,
	TypeSelector,
	Map as YMap,
	YMaps,
	ZoomControl,
} from '@pbe/react-yandex-maps';

export const Map = () => {
	return (
		<div className="mb-5">
			<div className="mb-2">
				<YMaps>
					<YMap
						className="aspect-square w-full max-w-[420px]"
						defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
					>
						<FullscreenControl />
						<GeolocationControl />
						<SearchControl options={{ float: 'left' }} />
						<TrafficControl />
						<TypeSelector />
						<ZoomControl />
						<RulerControl />
						<Placemark
							geometry={[55.751574, 37.573856]}
							options={{
								iconColor: 'black',
								preset: 'islands#blackStrechyIcon',
							}}
						/>
					</YMap>
				</YMaps>
			</div>
			<h1 className="font-bold">ул. Тверская</h1>
		</div>
	);
};
