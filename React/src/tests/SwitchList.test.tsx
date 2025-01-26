import SwitchList from "../componants/frontend/SwitchList";
import { render, screen, waitFor } from '@testing-library/react';
import { Children } from '../classes';
import * as fetchData from '../componants/backend/fetchData';
import { wait } from "@testing-library/user-event/dist/utils";

test('renders SwitchList', () => {
  render(<SwitchList username='test' />);
  const switchList = screen.getByTestId('switchList');
  expect(switchList).toBeInTheDocument();
});

test('renders SwitchList with children', () => {
    let child1 = new Children(1, 'first', 'last', true)
    let child2 = new Children(2, 'second', 'last', false)
    let childList = [child1, child2]

    jest.spyOn(fetchData, 'createChildrenList').mockResolvedValue(childList)
    
    render(<SwitchList username='test' />);
    const switchList = screen.getByTestId('switchList');
    expect(switchList).toBeInTheDocument();
});

test('render SwitchList with child elements', async () => {
    let child1 = new Children(1, 'first', 'last', true)
    let child2 = new Children(2, 'second', 'last', false)
    let childList = [child1, child2]

    jest.spyOn(fetchData, 'createChildrenList').mockResolvedValue(childList)
    
    render(<SwitchList username='test' />);
    
    await waitFor(() => {
        const childListElement = screen.getAllByTestId('childListElement');
        expect(childListElement).toHaveLength(2);
    });
});