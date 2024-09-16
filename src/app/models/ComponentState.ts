import { PeriodicElement } from "./PeriodicElement";

export interface ComponentState {
    elements: PeriodicElement[];
    filteredElements: PeriodicElement[];
    filter: string;
}