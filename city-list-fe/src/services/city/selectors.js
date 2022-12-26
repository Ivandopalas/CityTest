import {DOMAIN, EMPTY_LIST, KEY_LOADED_CITIES} from "./constants";
import * as R from "ramda";

export const getCities = R.pathOr(EMPTY_LIST, [DOMAIN, KEY_LOADED_CITIES])
