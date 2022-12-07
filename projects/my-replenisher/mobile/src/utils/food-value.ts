import { Labels } from "../enums";

interface Foods {
  rice: "up" | "down";
  bean: "up" | "down";
  sugar: "up" | "down";
  oil: "up" | "down";
}

export default function foodValue(value: number): Foods {
  switch (value) {
    case Labels.all:
      return {
        rice: "up",
        bean: "up",
        sugar: "up",
        oil: "up",
      };

    case Labels.missing_rice:
      return {
        rice: "down",
        bean: "up",
        sugar: "up",
        oil: "up",
      };
    case Labels.missing_bean:
      return {
        rice: "up",
        bean: "down",
        sugar: "up",
        oil: "up",
      };
    case Labels.missing_oil:
      return {
        rice: "up",
        bean: "up",
        sugar: "up",
        oil: "down",
      };
    case Labels.missing_sugar:
      return {
        rice: "up",
        bean: "up",
        sugar: "down",
        oil: "up",
      };
    case Labels.missing_rice_bean:
      return {
        rice: "down",
        bean: "down",
        sugar: "up",
        oil: "up",
      };
    case Labels.missing_rice_oil:
      return {
        rice: "down",
        bean: "up",
        sugar: "up",
        oil: "down",
      };
    case Labels.missing_rice_sugar:
      return {
        rice: "down",
        bean: "up",
        sugar: "down",
        oil: "up",
      };
    case Labels.missing_bean_oil:
      return {
        rice: "up",
        bean: "down",
        sugar: "up",
        oil: "down",
      };
    case Labels.missing_bean_sugar:
      return {
        rice: "up",
        bean: "down",
        sugar: "down",
        oil: "up",
      };
    case Labels.missing_oil_sugar:
      return {
        rice: "up",
        bean: "up",
        sugar: "down",
        oil: "down",
      };
    case Labels.missing_rice_bean_oil:
      return {
        rice: "down",
        bean: "down",
        sugar: "up",
        oil: "down",
      };
    case Labels.missing_rice_bean_sugar:
      return {
        rice: "down",
        bean: "down",
        sugar: "down",
        oil: "up",
      };
    case Labels.missing_bean_oil_sugar:
      return {
        rice: "up",
        bean: "down",
        sugar: "down",
        oil: "down",
      };
    case Labels.none:
      return {
        rice: "down",
        bean: "down",
        sugar: "down",
        oil: "down",
      };

    default:
      return {
        rice: "up",
        bean: "up",
        sugar: "up",
        oil: "up",
      };
  }
}
