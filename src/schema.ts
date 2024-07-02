import { Camelize } from "camelize-ts";
import { array, number, object, string, type InferOutput } from "valibot";

export const ItemDto = object({
  item_id: number(),
  item_name: string(),
  dependency_list: array(
    object({
      dependency_id: number(),
      dependency_name: string(),
    })
  ),
});

export type ItemDto = InferOutput<typeof ItemDto>;
export type Item = Camelize<ItemDto>;
