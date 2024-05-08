import {
	FullscreenControl,
	GeolocationControl,
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
		<YMaps>
			<YMap defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}>
				<FullscreenControl />
				<GeolocationControl />
				<SearchControl options={{ float: 'left' }} />
				<TrafficControl />
				<TypeSelector />
				<ZoomControl />
				<RulerControl />
			</YMap>
		</YMaps>
	);
};
