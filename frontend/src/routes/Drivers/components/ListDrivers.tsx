import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { Driver } from 'types';
import { DriverListItem } from './DriverListItem';

type ListDriversProps = {
	drivers: Driver[];
};

const ListDrivers = ({ drivers }: ListDriversProps) => {
	const sensors = useSensors(useSensor(PointerSensor));

	const projectIds = useMemo(
		() => drivers.map((driver) => driver.id),
		[drivers],
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over?.id) {
			console.log('moved');
		}
	}

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToVerticalAxis, restrictToParentElement]}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={projectIds}
				strategy={verticalListSortingStrategy}
			>
				{drivers.map((driver) => (
					<DriverListItem key={driver.id} item={driver} />
				))}
			</SortableContext>
		</DndContext>
	);
};

export default ListDrivers;
