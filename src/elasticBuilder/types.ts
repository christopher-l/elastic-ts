// tslint:disable unified-signatures

import {AggregationName, AllAggregations} from '../types/aggregations'
import {AllQueries, QueryType} from '../types/queries'
import {PlainObject, Primitive, Optional} from './utils'

/** Represents a function that returns a builder of arbitrary type */
export type BuilderFn = () => ESBaseBuilder

/** Takes a tuple type and replaces ES builder functions with `BuilderFn` */
export type WithBuilderFns<T> = {
  [K in keyof T]: Extract<T[K], ESSubAggregationBuilderFn | ESSubFilterBuilderFn | ESSubQueryBuilderFn> extends never
    ? T[K]
    : Exclude<T[K], ESSubAggregationBuilderFn | ESSubFilterBuilderFn | ESSubQueryBuilderFn> | BuilderFn
}

export interface QueryData {
  aggregations: WithBuilderFns<AggregationArgs>[]
  filter: {
    and: WithBuilderFns<FilterArgs>[]
    or: WithBuilderFns<FilterArgs>[]
    not: WithBuilderFns<FilterArgs>[]
    minimumShouldMatch?: number | string
  }
  from?: number
  inChildContext: boolean
  parent?: 'filter' | 'query'
  size?: number
  sort: SortArgs[]
  query: {
    and: WithBuilderFns<QueryArgs>[]
    or: WithBuilderFns<QueryArgs>[]
    not: WithBuilderFns<QueryArgs>[]
    minimumShouldMatch?: number | string
  }
  rawOption: {
    [key: string]: unknown
  }
}

export interface BuiltQuery {
  aggs?: {
    [name: string]: object
  }
  filter?: object
  from?: number
  size?: number
  sort?: object[]
  query?: object
}

/** Represents all the different argument variations to the aggregation methods */
export type AggregationArgs =
  | [string, string, string | PlainObject]
  | [string, string, string, ESSubAggregationBuilderFn]
  | [string, string, string, PlainObject]
  | [string, string, PlainObject, ESSubAggregationBuilderFn]
  | [string, string, string, PlainObject, ESSubAggregationBuilderFn]

export interface ESAggregationBuilder<B = ESBuilder> {
  agg<K extends AggregationName>(name: string, type: K, field: string): B
  agg<K extends AggregationName>(name: string, type: K, config: AllAggregations[K]): B
  agg<K extends AggregationName>(name: string, type: K, field: string, subBuilder: ESSubAggregationBuilderFn): B
  agg<K extends AggregationName>(name: string, type: K, field: string, config: Omit<AllAggregations[K], 'field'>): B
  agg<K extends AggregationName>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subBuilder: ESSubAggregationBuilderFn,
  ): B
  agg<K extends AggregationName>(
    name: string,
    type: K,
    field: string,
    config: AllAggregations[K],
    subBuilder: ESSubAggregationBuilderFn,
  ): B

  aggregation<K extends AggregationName>(name: string, type: K, field: string): B
  aggregation<K extends AggregationName>(name: string, type: K, config: AllAggregations[K]): B
  aggregation<K extends AggregationName>(name: string, type: K, field: string, subBuilder: ESSubAggregationBuilderFn): B
  aggregation<K extends AggregationName>(
    name: string,
    type: K,
    field: string,
    config: Omit<AllAggregations[K], 'field'>,
  ): B
  aggregation<K extends AggregationName>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subBuilder: ESSubAggregationBuilderFn,
  ): B
  aggregation<K extends AggregationName>(
    name: string,
    type: K,
    field: string,
    config: Omit<AllAggregations[K], 'field'>,
    subBuilder: ESSubAggregationBuilderFn,
  ): B
}

export interface ESBaseBuilder {
  build(): BuiltQuery
}

/** Represents all the different argument variations to the filter methods */
export type FilterArgs =
  | [ESSubFilterBuilderFn]
  | [string, string | PlainObject]
  | [string, string, Primitive | Primitive[] | PlainObject | ESSubFilterBuilderFn]
  | [string, PlainObject, ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject | ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject, ESSubFilterBuilderFn]

export interface ESFilterBuilder<B = ESBuilder> {
  filter(subBuilder: ESSubFilterBuilderFn): B
  filter<T extends QueryType>(type: T, field: string): B
  filter<T extends QueryType>(type: T, config: AllQueries[T]): B
  filter<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  filter<T extends QueryType>(type: T, field: string, subBuilder: ESSubFilterBuilderFn): B
  filter<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  filter<T extends QueryType>(
    type: T,
    config: Optional<AllQueries[T], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  filter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  filter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  filter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[T], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  andFilter(subBuilder: ESSubFilterBuilderFn): B
  andFilter<T extends QueryType>(type: T, field: string): B
  andFilter<T extends QueryType>(type: T, config: AllQueries[T]): B
  andFilter<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  andFilter<T extends QueryType>(type: T, field: string, subBuilder: ESSubFilterBuilderFn): B
  andFilter<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  andFilter<T extends QueryType>(
    type: T,
    config: Optional<AllQueries[T], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  andFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  andFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  andFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[T], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  orFilter(subBuilder: ESSubFilterBuilderFn): B
  orFilter<T extends QueryType>(type: T, field: string): B
  orFilter<T extends QueryType>(type: T, config: AllQueries[T]): B
  orFilter<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  orFilter<T extends QueryType>(type: T, field: string, subBuilder: ESSubFilterBuilderFn): B
  orFilter<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  orFilter<T extends QueryType>(
    type: T,
    config: Optional<AllQueries[T], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  orFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  orFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  orFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[T], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  notFilter(subBuilder: ESSubFilterBuilderFn): B
  notFilter<T extends QueryType>(type: T, field: string): B
  notFilter<T extends QueryType>(type: T, config: AllQueries[T]): B
  notFilter<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  notFilter<T extends QueryType>(type: T, field: string, subBuilder: ESSubFilterBuilderFn): B
  notFilter<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  notFilter<T extends QueryType>(
    type: T,
    config: Optional<AllQueries[T], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  notFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  notFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  notFilter<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[T], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  filterMinimumShouldMatch(param: string | number): B
}

/** Represents all the different argument variations to the query methods */
export type QueryArgs =
  | [ESSubQueryBuilderFn]
  | [string, string | PlainObject]
  | [string, string, Primitive | Primitive[] | PlainObject | ESSubQueryBuilderFn]
  | [string, PlainObject, ESSubQueryBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject | ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject, ESSubQueryBuilderFn]

export interface ESQueryBuilder<B = ESBuilder> {
  query(subBuilder: ESSubQueryBuilderFn): B
  query<T extends QueryType>(type: T, field: string): B
  query<T extends QueryType>(type: T, config: AllQueries[T]): B
  query<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  query<T extends QueryType>(type: T, field: string, subBuilder: ESSubQueryBuilderFn): B
  query<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  query<T extends QueryType>(
    type: T,
    config: Optional<AllQueries[T], keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B
  query<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  query<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  query<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  andQuery(subBuilder: ESSubQueryBuilderFn): B
  andQuery<T extends QueryType>(type: T, field: string): B
  andQuery<T extends QueryType>(type: T, config: AllQueries[T]): B
  andQuery<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  andQuery<T extends QueryType>(type: T, field: string, subBuilder: ESSubQueryBuilderFn): B
  andQuery<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  andQuery<T extends QueryType>(type: T, config: AllQueries[T], subBuilder: ESSubQueryBuilderFn): B
  andQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  andQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  andQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  orQuery(subBuilder: ESSubQueryBuilderFn): B
  orQuery<T extends QueryType>(type: T, field: string): B
  orQuery<T extends QueryType>(type: T, config: AllQueries[T]): B
  orQuery<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  orQuery<T extends QueryType>(type: T, field: string, subBuilder: ESSubQueryBuilderFn): B
  orQuery<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  orQuery<T extends QueryType>(type: T, config: AllQueries[T], subBuilder: ESSubQueryBuilderFn): B
  orQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  orQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  orQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  notQuery(subBuilder: ESSubQueryBuilderFn): B
  notQuery<T extends QueryType>(type: T, field: string): B
  notQuery<T extends QueryType>(type: T, config: AllQueries[T]): B
  notQuery<T extends QueryType>(type: T, field: string, value: Primitive | Primitive[]): B
  notQuery<T extends QueryType>(type: T, field: string, subBuilder: ESSubQueryBuilderFn): B
  notQuery<T extends QueryType>(type: T, field: string, config: Omit<AllQueries[T], 'field'>): B
  notQuery<T extends QueryType>(type: T, config: AllQueries[T], subBuilder: ESSubQueryBuilderFn): B
  notQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  notQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
  ): B
  notQuery<T extends QueryType>(
    type: T,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[T], 'field'>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  queryMinimumShouldMatch(param: string | number): B
}

export type FieldSortConfig = {[field: string]: 'asc' | 'desc' | object}

/** Represents all the different argument variations to the sort method */
export type SortArgs = [string] | [(string | FieldSortConfig)[]] | [string, string] | [string, PlainObject]

export interface ESBuilder extends ESBaseBuilder, ESAggregationBuilder, ESFilterBuilder, ESQueryBuilder {
  from(quantity: number): ESBuilder
  rawOption(key: string, value: unknown): ESBuilder
  size(quantity: number): ESBuilder
  sort(field: string): ESBuilder
  sort(field: string, direction: string): ESBuilder
  sort(field: string, body: object): ESBuilder
  sort(fields: (string | FieldSortConfig)[]): ESBuilder
}

export interface ESSubAggregationBuilder
  extends ESBaseBuilder,
    ESAggregationBuilder<ESSubAggregationBuilder>,
    ESFilterBuilder<ESSubAggregationBuilder> {}
export type ESSubAggregationBuilderFn = (builder: ESSubAggregationBuilder) => ESSubAggregationBuilder

export interface ESSubFilterBuilder
  extends ESBaseBuilder,
    ESFilterBuilder<ESSubFilterBuilder>,
    ESQueryBuilder<ESSubFilterBuilder> {}
export type ESSubFilterBuilderFn = (builder: ESSubFilterBuilder) => ESSubFilterBuilder

export interface ESSubQueryBuilder
  extends ESBaseBuilder,
    ESFilterBuilder<ESSubQueryBuilder>,
    ESQueryBuilder<ESSubQueryBuilder> {}
export type ESSubQueryBuilderFn = (builder: ESSubQueryBuilder) => ESSubQueryBuilder
