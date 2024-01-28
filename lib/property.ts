import { OpenAPIObject, ReferenceObject, SchemaObject } from 'openapi3-ts';
import { escapeId, tsComments, tsType } from './gen-utils';
import { Model } from './model';
import { Options } from './options';

/**
 * An object property
 */
export class Property {

  identifier: string;
  tsComments: string;
  type: string;
  format?: string

  constructor(
    public model: Model,
    public name: string,
    public schema: SchemaObject | ReferenceObject,
    public required: boolean,
    options: Options,
    openApi: OpenAPIObject) {

    this.type = tsType(this.schema, options, openApi, model);
    this.format = (schema as SchemaObject).format || undefined;
    this.identifier = escapeId(this.name);
    const description = (schema as SchemaObject).description || '';
    this.tsComments = tsComments(description, 1, (schema as SchemaObject).deprecated);
  }
}
