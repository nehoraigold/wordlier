import { NumericalComparison } from './NumericalComparison';

export type ElementComparison = {
    atomicNumber: NumericalComparison;
    atomicRadius: NumericalComparison;
    group: NumericalComparison;
    period: NumericalComparison;
    yearDiscovered: NumericalComparison;
};
