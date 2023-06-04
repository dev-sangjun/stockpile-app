import GridItem, { GridItemProps } from ".";

export const renderGridItems = (gridItems: GridItemProps[]) =>
  gridItems.map(gridItem => <GridItem key={gridItem.title} {...gridItem} />);
