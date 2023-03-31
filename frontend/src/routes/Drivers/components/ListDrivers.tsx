import React from 'react';
import { Driver } from 'types';
import { DriverListItem } from './DriverListItem';

type ListDriversProps = {
	drivers: Driver[];
};

const ListDrivers = ({ drivers }: ListDriversProps) => (
	<React.Fragment>
		{drivers.map((driver) => (
			<DriverListItem key={driver.id} item={driver} />
		))}
	</React.Fragment>
);

export default ListDrivers;
