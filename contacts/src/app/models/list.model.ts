import {UserPreview} from "./userPreview.model";

export interface List {
  data: UserPreview[];
  total: number;
  page: number;
  limit: number;
}
