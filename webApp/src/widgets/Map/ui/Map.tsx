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
		<div className="mb-5">
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
				</YMap>
			</YMaps>
		</div>
	);
};
