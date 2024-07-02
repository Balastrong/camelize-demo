import { GenericSchema, parse, pipe, transform } from "valibot";
import { Item, ItemDto } from "./schema";
import camelize from "camelize-ts";
import snakify from "snakify-ts";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const request = async <Schema extends GenericSchema>(
  url: string,
  options: { method: "GET" | "POST"; schema?: Schema; body?: object }
) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!options.schema) return;

  return parse(options.schema, await response.json());
};

const getItem = async () =>
  request("/item", {
    method: "GET",
    schema: pipe(ItemDto, transform(camelize)),
  });

const postItem = async (item: Item) =>
  request("/item", {
    method: "POST",
    body: snakify(item),
  });

export const httpClient = {
  getItem,
  postItem,
};
