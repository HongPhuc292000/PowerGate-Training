import { stat } from 'fs';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export const updateIItem = createCustomAction('home/updateItem', (data:Array<IItem>) => ({
    data,
}));

export const setIItem = createCustomAction('home/setIItem', (data:Array<IItem>) => ({
    data,
}));

export interface IItem{
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface IntlState1 {
    listItems: Array<IItem>
}

const actions = { updateIItem,setIItem };

type Action = ActionType<typeof actions>;

export default function reducerItem(state: IntlState1 = { listItems: [] } , action: Action) {
    switch (action.type) {
        case getType(updateIItem):
            return {...state, listItems: action.data};
        default:
          return state;
    }
}