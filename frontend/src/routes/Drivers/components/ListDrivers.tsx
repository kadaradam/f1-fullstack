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
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Driver } from 'types';
import { postOvertakeApi } from '../../../react-query/api/post-overtake.api';
import { DriverListItem } from './DriverListItem';

type ListDriversProps = {
	drivers: Driver[];
};

const ListDrivers = ({ drivers }: ListDriversProps) => {
	const queryClient = useQueryClient();
	const sensors = useSensors(useSensor(PointerSensor));

	const { mutate: overtakeFront } = useMutation(postOvertakeApi);

	const driverIds = useMemo(
		() => drivers.map((driver) => driver.id),
		[drivers],
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over?.id) {
			const oldIndex = drivers.findIndex((item) => item.id === active.id);
			const newIndex = drivers.findIndex((item) => item.id === over.id);

			const stepCount = oldIndex - newIndex;

			// Update overtakes only
			if (stepCount > 0) {
				const driverId = drivers[oldIndex].id;
				const updatedDrivers = arrayMove(drivers, oldIndex, newIndex);

				// Perform an optimistic update
				queryClient.setQueryData(['drivers'], updatedDrivers);
				overtakeFront({ driverId, step: stepCount });
			}
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
				items={driverIds}
				strategy={verticalListSortingStrategy}
			>
				{drivers.map((driver, index) => (
					<DriverListItem
						key={driver.id}
						item={driver}
						index={index}
					/>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default ListDrivers;
